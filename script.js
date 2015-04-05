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

        // Handle pasting of invoices
        $scope.invoicePasted = function(e) {

            // Takes a string and creates a Date object
            var makeDate = function(d) {
                // (moment is quite unnecessary afaik)
                var date = moment(new Date(d));
                return date.toDate();
            };

            // read clipboard data, and check if it is from e.g. excel
            if (e.clipboardData.types.length > 0) {
                key = e.clipboardData.types[0];
                if (key === "text/plain") {
                    // input from excel is a line-broken string, so break it
                    var val = e.clipboardData.getData(key);
                    var vals = val.split("\n");

                    // All Invoice properties paired with a conversion function
                    var properties = [['nr',Number], ['startDate',makeDate], ['endDate',makeDate], ['hours',Number], ['hourlyRate',Number]];

                    // For each row in pasted input, try to convert it to a property and add to model
                    _.forEach(vals, function(v,k) {
                        console.log("k:",k,"v:",v);
                        if (k<properties.length) {
                            var prop = properties[k]; // property key in model and its conversion fn
                            $scope.invoice[prop[0]] = prop[1](v);
                        }
                    });
                }
            } // end if

            // Paste shouldn't do anything else
            e.preventDefault();
            return false;
        }
    }])
    .controller('ViewCtrl', ['$scope', function($scope) {
        console.log("view view cr8td");
        $scope.x = 5;
    }]);