/**
 * Created with JetBrains WebStorm.
 * User: jim.lavin
 * Date: 12/8/12
 * Time: 11:49 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

/* App Module */

angular.module('localizeApp', ['localization', 'ui.bootstrap']).
    config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {templateUrl:'partials/home.html', controller:HomeController}).
        when('/edit/:index', {templateUrl:'partials/form.html', controller:EditPersonController}).
        when('/new', {templateUrl:'partials/form.html', controller:NewPersonController}).
        otherwise({redirectTo:'/'});
}]);