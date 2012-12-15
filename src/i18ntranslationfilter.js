/**
 * Created with JetBrains WebStorm.
 * User: jim.lavin
 * Date: 12/8/12
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */

var filters = angular.module('localization.filters', []);

filters.filter('i18n', ['localize', function(localize) {
    return function (input) {
        return localize.getLocalizedString(input);
    };
}]);