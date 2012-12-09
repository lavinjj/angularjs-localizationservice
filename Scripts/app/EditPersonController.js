/**
 * Created with JetBrains WebStorm.
 * User: jim.lavin
 * Date: 12/8/12
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */


'use strict'

function EditPersonController($scope, $location, $routeParams) {
    $scope.person = $scope.People[$routeParams.index];

    $scope.savePerson = function() {
        $location.path('/');
    };

    $scope.cancel = function() {
        $location.path('/');
    };
}
