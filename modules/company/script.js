/**
 * Created by Niklas on 2015-04-05.
 */

angular.module('companyPage', [])
    .controller('CompanyCtrl', ['$scope', function($scope) {
        console.log("CompanyCtrl created");

        $scope.saveAndNext = function() {
            // TODO ? Save data to localstorage
            $scope.nextPage();
        }

    }]);