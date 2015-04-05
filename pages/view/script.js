/**
 * Created by Niklas on 2015-04-05.
 */

angular.module('viewPage', ['filters'])
    .controller('ViewCtrl', ['$scope', function($scope) {
        console.log("view view cr8td");

        // Calculated properties. Whenever underlying variables change, these will be recalculated
        $scope.price = {};
        $scope.price.withoutTax = function() {return $scope.invoice.hours * $scope.invoice.hourlyRate};
        $scope.price.tax = function() { return $scope.price.withoutTax()*$scope.invoice.taxRate };
        $scope.price.withTax = function() {return $scope.price.withoutTax() + $scope.price.tax()};

    }]);
