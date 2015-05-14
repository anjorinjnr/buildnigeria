define(function () {

    /**
     * Shared code to load more items
     */
    var Loader = function ($http) {
        this.$http = $http;
        this.loading = false;
    };

    Loader.prototype.loadMore = function (item) {

        var self = this;
        if (!this.loading && item.next_page_url !== null) {
            console.log('loading');
            this.loading = true;
            this.$http.get(item.next_page_url).success(function (more) {
                self.loading = false;
                item.next_page_url = more.next_page_url;
                item.data = item.data.concat(more.data);
            });
        }
    };
    Loader.$inject = ['$http'];

    return Loader;

});