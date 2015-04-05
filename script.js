/**
 * Created by Niklas on 2015-04-05.
 */

var pages = [
    {url: '/company', name: 'Företagsinformation', templateUrl: 'pages/company/index.html', controller: 'CompanyCtrl'},
    {url: '/invoice', name: 'Fakturainformation', templateUrl: 'pages/invoice/index.html', controller: 'InvoiceCtrl'},
    {url: '/view', name: 'Visa faktura', templateUrl: 'pages/view/index.html', controller: 'ViewCtrl'}
];

angular.module('invoiceGen', ['ngRoute', 'menu', 'companyPage', 'invoicePage', 'viewPage'])


    .config(['$routeProvider', function($routeProvider) {

        // Default route goes to first url
        $routeProvider.when('/', {
            redirectTo: pages[0].url // TODO: check localstorage here, if company info already exists
        });
        // Create routes dynamically
        _.forEach(pages, function(page) {
            $routeProvider.when(page.url, {
                templateUrl: page.templateUrl,
                controller: page.controller
            });
        });
    }])
    // Topmost controller, for the whole page
    .controller('IndexCtrl', ['$scope', '$location', function($scope, $location) {

        // Page handling
        $scope.pages = pages;
        $scope.nextPage = function() {
            var newPageIndex = 1 + _.findIndex($scope.pages, _.matchesProperty('url', $location.path()));
            if (newPageIndex>0 && newPageIndex < $scope.pages.length) {
                var newPage = $scope.pages[newPageIndex];
                console.log("idx:",newPageIndex, "newPage:",newPage, "url",newPage.url);
                $location.path(newPage.url);
            }
        };
        $scope.previousPage = function() {
            var newPageIndex = -1 + _.findIndex($scope.pages, _.matchesProperty('url', $location.path()));
            if (newPageIndex >= 0) {
                console.log("newPage:",newPage);
                var newPage = $scope.pages[newPageIndex];
                $location.path(newPage.url);
            }
        };

        // Data handling: initialize everything to empty
        $scope.invoice = {};
        $scope.company = {};
        $scope.company.yours = {};
        $scope.company.theirs = {};

    }]);