/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {
    /**
     *
     * @param user
     * @param issues
     * @param solutions
     * @param $http
     * @param util
     * @param userService
     * @param $cacheFactory
     * @constructor
     */
    var DraftsCtrl = function (user, issues, solutions, $http, util, userService, $cacheFactory) {
        this.user = user;
        this.drafts = {issues: issues, solutions: solutions};
        this.$http = $http;
        this.util = util;
        this.userService = userService;
        this.selects = {
            issues: [],
            solutions: []
        };
        this.$cacheFactory = $cacheFactory;
        //the solution maybe a rich text, so the limitTo filter will not work
        //so we use jquery to get the text content and do a substring.
        solutions.data.forEach(function (row) {
            var body;
            try {
                 body = $(row.detail).text();
            } catch (er) {
                body = row.detail;

            }
            var text = body.substring(0, 120);
            row.detail = (body.length > 120) ? text + '...' : text;
        });
    };

    /**
     * Added or remove item id from delete list
     * @param type (issues|solutions)
     * @param id
     */
    DraftsCtrl.prototype.select = function (type, id) {

        var i = this.selects[type].indexOf(id);
        if (i >= 0) {
            this.selects[type].splice(i, 1);
        } else {
            this.selects[type].push(id);
        }
    };

    /**
     * Delete all selected rows.
     * Make call to server to delete rows, and adjust view
     * @param type (issues|solutions)
     */
    DraftsCtrl.prototype.delete = function (type) {
        var self = this;
        if (this.selects[type].length > 0) {
            this.util.loading();
            this.userService.deleteDrafts({
                    user_id: this.user.id,
                    type: (type == 'issues') ? 'issue' : 'solution'
                }, {
                    ids: this.selects[type]
                }, function (resp) {
                    var deleted = angular.copy(self.selects[type]);
                    //clear select list
                    self.selects[type] = [];
                    if (resp.status === 'success') {
                        var drafts = self.drafts[type];
                        var url = null;
                        //user deleted all messages on current page
                        if (drafts.data.length == deleted.length) {
                            //if there was a next page, just reload the current page
                            //otherwise load the prev page if there is one.
                            //if there is no next and prev page, then all data has been deleted
                            if (drafts.next_page_url != null) {
                                url = drafts.next_page_url.split("?")[0] + '?page=' + drafts.current_page;
                            } else if (drafts.prev_page_url != null) {
                                url = drafts.prev_page_url;
                            } else {
                                self.util.dismissToast();
                                drafts.total = 0;
                                drafts.data = [];
                            }
                        } else if (drafts.next_page_url != null) {
                            //not all data on current page was deleted, so reload current page
                            url = drafts.next_page_url.split("?")[0] + '?page=' + drafts.current_page;
                        } else {
                            //not all data on current page was deleted, and there is no next page
                            //so just remove the deleted rows from the current page.
                            //and adjust counts
                            self.util.dismissToast();
                            drafts.total -= deleted.length;
                            drafts.to = drafts.total;
                            var temp = [];
                            drafts.data.forEach(function (item) {
                                if (deleted.indexOf(item.id) < 0) {
                                    temp.push(item);
                                }
                            });
                            drafts.data = temp;
                            self.user.drafts -= deleted.length;
                        }
                        if (url != null) {
                            //if we are loading a new page
                            //be sure to remove the cache data
                            //then load the data
                            self.$cacheFactory.get('$http').remove(url);
                            self.$http.get(url).success(function (data) {
                                self.util.dismissToast();
                                self.paginationCallback_(type, data);
                            });
                        }
                    }

                }
            )
        }
    };

    /**
     * Load next or prev page
     * @param type
     * @param url
     */
    DraftsCtrl.prototype.paginate = function (type, url) {
        var self = this;
        this.util.loading();
        this.$http.get(url, {cache: true}).success(function (data) {
            self.util.dismissToast();
            self.paginationCallback_(type, data);
        });
    };

    /**
     * Update drafts data when new page of data is loaded
     * @param type
     * @param data
     * @private
     */
    DraftsCtrl.prototype.paginationCallback_ = function (type, data) {
        this.drafts[type] = data;
        this.user.drafts = this.drafts.issues.total + this.drafts.solutions.total;

    };

    DraftsCtrl.$inject = ['user', 'issues', 'solutions', '$http', 'util', 'userService', '$cacheFactory'];
    return DraftsCtrl;
})
;