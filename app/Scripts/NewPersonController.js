/**
 * Created with JetBrains WebStorm.
 * User: jim.lavin
 * Date: 12/8/12
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'

function NewPersonController($scope, $location) {
    $scope.person = {FirstName: '', LastName: '', Email: '', Bio: ''};

    $scope.savePerson = function() {
        $scope.People.push($scope.person);
        $location.path('/');
    };

    $scope.cancel = function() {
        $location.path('/');
    };
}
