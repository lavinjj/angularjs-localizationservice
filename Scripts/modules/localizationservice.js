/**
 * Created with JetBrains WebStorm.
 * User: jim.lavin
 * Date: 12/8/12
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

/* Services */

var services = angular.module('localization.service', []);

services.factory('localize', ['$http', '$rootScope', '$locale', '$filter', function ($http, $rootScope, $locale, $filter) {
    var localize = {
        dictionary: [],

        successCallback:function(data) {
            localize.dictionary = data;
            $rootScope.$broadcast('localizeResourcesUpdates');
        },

        getLocalizedResources:function() {
            var url = '/i18n/resources-locale_' + $locale.id + '.js';

            return $http({ method:"GET", url:url, cache:false }).success(localize.successCallback).error(function(){
                var url = '/i18n/resources-locale_default.js';

                $http({ method:"GET", url:url, cache:false }).success(localize.successCallback);
            });
        },

        getLocalizedString:function(key) {
            var result = '';

            if((localize.dictionary !== {}) && (localize.dictionary.length > 0)){
                var entry = $filter('filter')(localize.dictionary, {key: key})[0];

                if((entry !== null) && (entry != undefined)) {
                    result = entry.value;
                }
            }

            return result;
        }
    };

    return localize;
} ]);
