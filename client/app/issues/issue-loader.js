define(function () {

    /**
     * Shared code to load more issues
     */
    return function (self) {
        if (_.isUndefined(self)) throw 'Invalid parameter, cannot be null';
        if (_.isUndefined(self.$http)) throw 'Expects an instance of $http';
        if (_.isUndefined(self.issues)) throw 'Expects a property "issues"';
        if (!self.loading && self.issues.next_page_url !== null) {
            self.loading = true;
            self.$http.get(self.issues.next_page_url).success(function (issues) {
                self.loading = false;
                self.issues.next_page_url = issues.next_page_url;
                self.issues.data = self.issues.data.concat(issues.data);
            });
        }
    };
});