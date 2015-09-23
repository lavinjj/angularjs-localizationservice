'use strict';

/*
 * An AngularJS Localization Service
 *
 * Written by Jim Lavin
 * http://codingsmackdown.tv
 *
 */

angular.module('localization', [])
    // localization service responsible for retrieving resource files from the server and
    // managing the translation dictionary
    .provider('localize', function localizeProvider() {

        this.languages = ['en-US'];
        this.defaultLanguage = 'en-US';
        this.ext = 'js';
        this.baseUrl = 'i18n/';

        var provider = this;

        this.$get = ['$http', '$rootScope', '$window', '$filter', function ($http, $rootScope, $window, $filter) {

            var localize = {
                // use the $window service to get the language of the user's browser
                language:'',
                // array to hold the localized resource string entries
                dictionary:[],
                // location of the resource file
                url: undefined,
                // flag to indicate if the service hs loaded the resource file
                resourceFileLoaded:false,

                // success handler for all server communication
                successCallback:function (data) {
                    // store the returned array in the dictionary
                    localize.dictionary = data;
                    // set the flag that the resource are loaded
                    localize.resourceFileLoaded = true;
                    // broadcast that the file has been loaded
                    $rootScope.$broadcast('localizeResourcesUpdated');
                },

                // allows setting of language on the fly
                setLanguage: function(value) {
                    localize.language = this.fallbackLanguage(value);
                    localize.initLocalizedResources();
                },

                fallbackLanguage: function(value) {

                    value = String(value);

                    if (provider.languages.indexOf(value) > -1) {
                        return value;
                    }

                    value = value.split('-')[0];

                    if (provider.languages.indexOf(value) > -1) {
                        return value;
                    }

                    return provider.defaultLanguage;
                },

                // allows setting of resource url on the fly
                setUrl: function(value) {
                    localize.url = value;
                    localize.initLocalizedResources();
                },
                // builds the url for locating an image
                buildImgUrl: function(imageUrl) {
                    return $http({ method: "GET", url: imageUrl, cache: false });
                },
                // builds the url for locating the resource file
                buildUrl: function(baseUrl) {
                    if(!localize.language){
                        var lang, androidLang;
                        // works for earlier version of Android (2.3.x)
                        if ($window.navigator && $window.navigator.userAgent && (androidLang = $window.navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
                            lang = androidLang[1];
                        } else {
                            // works for iOS, Android 4.x and other devices
                            lang = $window.navigator.userLanguage || $window.navigator.language;
                        }
                        // set language
                        localize.language = this.fallbackLanguage(lang);
                    }
                    return baseUrl + 'resources-locale_' + localize.language + '.' + provider.ext;
                },

                // loads the language resource file from the server
                initLocalizedResources:function () {
                    // build the url to retrieve the localized resource file
                    var url = localize.url || localize.buildUrl(provider.baseUrl);
                    // request the resource file
                    $http({ method:"GET", url:url, cache:false }).success(localize.successCallback).error(function () {
                        // the request failed set the url to the default resource file
                        var url = provider.baseUrl + 'resources-locale_default' + '.' + provider.ext;
                        // request the default resource file
                        $http({ method:"GET", url:url, cache:false }).success(localize.successCallback);
                    });
                },

                // checks the dictionary for a localized resource string
                getLocalizedString: function(KEY) {
                    // default the result to an empty string
                    var result = '';

                    // make sure the dictionary has valid data
                    if (localize.resourceFileLoaded) {
                        // use the filter service to only return those entries which match the KEY
                        // and only take the first result
                        var entry = $filter('filter')(localize.dictionary, function(element) {
                                return element.key === KEY;
                            }
                        )[0];
                        // set the result
                        result = entry.value ? entry.value : KEY;
                    }
                    // return the value to the call
                    return result;
                }
            };

            // force the load of the resource file
            localize.initLocalizedResources();

            // return the local instance when called
            return localize;
        } ];
    })
    // simple translation filter
    // usage {{ TOKEN | i18n }}
    .filter('i18n', ['localize', function (localize) {
        return function (input) {
            return localize.getLocalizedString(input);
        };
    }])
    // translation directive that can handle dynamic strings
    // updates the text value of the attached element
    // usage <span data-i18n="TOKEN" ></span>
    // or
    // <span data-i18n="TOKEN|VALUE1|VALUE2" ></span>
    .directive('i18n', ['localize', function(localize){
        var i18nDirective = {
            restrict:"EAC",
            updateText:function(elm, token, html){
                var values = token.split('|');
                if (values.length >= 1) {
                    // construct the tag to insert into the element
                    var tag = localize.getLocalizedString(values[0]);
                    // update the element only if data was returned
                    if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                        if (values.length > 1) {
                            for (var index = 1; index < values.length; index++) {
                                var target = '{' + (index - 1) + '}';
                                tag = tag.replace(target, values[index]);
                            }
                        }
                        // insert the text into the element
                        elm[html ? 'html':'text'](tag);
                    };
                }
            },

            link:function (scope, elm, attrs) {
                scope.$on('localizeResourcesUpdated', function() {
                    i18nDirective.updateText(elm, attrs.i18n, angular.isDefined(attrs.i18nHtml));
                });

                attrs.$observe('i18n', function (value) {
                    i18nDirective.updateText(elm, attrs.i18n, angular.isDefined(attrs.i18nHtml));
                });
            }
        };

        return i18nDirective;
    }])
    // translation directive that can handle dynamic strings
    // updates the attribute value of the attached element
    // usage <span data-i18n-attr="TOKEN|ATTRIBUTE" ></span>
    // or
    // <span data-i18n-attr="TOKEN|ATTRIBUTE|VALUE1|VALUE2" ></span>
    .directive('i18nAttr', ['localize', function (localize) {
        var i18NAttrDirective = {
            restrict: "EAC",
            updateText:function(elm, token){
                var values = token.split('|');
                // construct the tag to insert into the element
                var tag = localize.getLocalizedString(values[0]);
                // update the element only if data was returned
                if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                    if (values.length > 2) {
                        for (var index = 2; index < values.length; index++) {
                            var target = '{' + (index - 2) + '}';
                            tag = tag.replace(target, values[index]);
                        }
                    }
                    // insert the text into the element
                    elm.attr(values[1], tag);
                }
            },
            link: function (scope, elm, attrs) {
                scope.$on('localizeResourcesUpdated', function() {
                    i18NAttrDirective.updateText(elm, attrs.i18nAttr);
                });

                attrs.$observe('i18nAttr', function (value) {
                    i18NAttrDirective.updateText(elm, value);
                });
            }
        };

        return i18NAttrDirective;
    }])
    // translation directive that handles the localization of images.
    // usage <img data-i18n-img-src="IMAGE" />
    .directive('i18nImgSrc', [
        'localize', function(localize) {
            var i18NImageDirective = {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var i18Nsrc = attrs.i18nImgSrc;
                    var imagePath = provider.baseUrl + '/images/' + localize.language + '/';
                    var imageUrl = imagePath + i18Nsrc;
                    localize.buildImgUrl(imageUrl).success(function() {
                        element[0].src = imageUrl;
                    }).error(function() { element[0].src = provider.baseUrl + '/images/default/' + i18Nsrc; });
                }
            };
            return i18NImageDirective;
        }
    ]);
