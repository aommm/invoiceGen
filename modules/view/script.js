/**
 * Created by Niklas on 2015-04-05.
 */

angular.module('viewPage', ['filters', 'ngSanitize'])
    .controller('ViewCtrl', ['$scope', function($scope) {
        console.log("view view cr8td");

        // Calculated properties. Whenever underlying variables change, these will be recalculated
        $scope.price = {};
        $scope.price.withoutTax = function() {return $scope.invoice.hours * $scope.invoice.hourlyRate};
        $scope.price.tax = function() { return $scope.price.withoutTax()*$scope.invoice.taxRate };
        $scope.price.withTax = function() {return $scope.price.withoutTax() + $scope.price.tax()};

        $scope.printInvoice = function() {
            var printContents = document.getElementById("wrapper").innerHTML;
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            var bootstrap = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/'
                + 'bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/'
                + '3.3.4/css/bootstrap-theme.min.css">';
            var css = '<link rel="stylesheet" type="text/css" href="css/invoice.css" />'+bootstrap;
            var printHtml = '<html><head>'+css+'</head><body onload="window.print()">' +
                printContents + '</body></html>';
            popupWin.document.write(printHtml);
            popupWin.document.close();
        }

    }]);
