/**
 * Created by Niklas on 2015-04-05.
 */

angular.module('invoicePage', [])

    .controller('InvoiceCtrl', ['$scope', function($scope) {

        // Default tax rate
        $scope.invoice.taxRate = 0.25;

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
                    var properties = [['nr',Number], ['startDate',makeDate], ['endDate',makeDate], ['hours',Number],
                        ['hourlyRate',Number], ['taxRate',Number]];

                    // For each row in pasted input, try to convert it to a property and add to model
                    _.forEach(vals, function(v,k) {
                        // console.log("k:",k,"v:",v);
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
    }]);
