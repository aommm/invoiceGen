/**
 * Created by Niklas on 2015-04-05.
 */

var pages = [
    {url: '/company', name: 'Företagsinformation', templateUrl: 'pages/company/index.html', controller: 'CompanyCtrl'},
    {url: '/invoice', name: 'Fakturainformation', templateUrl: 'pages/invoice/index.html', controller: 'InvoiceCtrl'},
    {url: '/view', name: 'Visa faktura', templateUrl: 'pages/view/index.html', controller: 'ViewCtrl'}
];

angular.module('invoiceGen', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        // console.log("dododo", pages);
        // Default route goes to first url
        $routeProvider.when('/', {
            redirectTo: pages[0].url // TODO: check localstorage here, if company info already exists
        });
        // Create routes dynamically
        // console.log(pages.length);
        _.forEach(pages, function(page) {
            // console.log("creating route for ",page);
            $routeProvider.when(page.url, {
                templateUrl: page.templateUrl,
                controller: page.controller
            });
        });
        // console.log("hallå");
    }])
    .filter('showCurrency', function() {
        return function(n) {
            if (n) return n+" kr";
            else return "";
        }
    })
    .filter('showPercent', function() {
        return function(n) {
            if (n) return n*100 + "%";
            else return "";
        }
    })
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
        $scope.invoice = {nr: 136};
        $scope.company = {};
        $scope.company.yours = {};
        $scope.company.theirs = {};

    }])
    .controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {

        $scope.isActive = function(page) {
            var currPageUrl = $location.path();
            // console.log("checking if active at index ", currPageUrl);
            if(page.url === currPageUrl) {
                return "active";
            } else {
                return "";
            }
        };

    }])
    .controller('CompanyCtrl', ['$scope', '$location', function($scope, $location) {
        console.log("CompanyCtrl created");

        $scope.saveAndNext = function() {
            // TODO ? Save data to localstorage
            $scope.nextPage();
        }

    }])
    .controller('InvoiceCtrl', ['$scope', function($scope) {
        console.log("invoice view cr8td");
        $scope.x = $scope.company.yours.name;
    }])
    .controller('ViewCtrl', ['$scope', function($scope) {
        console.log("view view cr8td");
        $scope.x = 5;
    }]);