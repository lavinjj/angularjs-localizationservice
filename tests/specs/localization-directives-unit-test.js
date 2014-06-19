describe('i18n directive', function() {
    var elm;
    var multi;
    var scope;
    var localize;

    // load the localization code
    beforeEach(module('localization'));

    beforeEach(function () {

        localize = {
            getLocalizedString: function (value) {
                if (value === 'TEST_ITEM1') {
                    return 'This is a test response.';
                } else if (value === 'TEST_ITEM2') {
                    return 'This is a multi replace test response {0} {1}';
                } else {
                    return '';
                }
            }
        };

        module('localization', function ($provide) {
            $provide.value('localize', localize);
        });
    });

    beforeEach(inject(function ($rootScope, $compile) {
        // we might move this tpl into an html file as well...
        elm = angular.element('<div data-i18n="TEST_ITEM1"></div>');

        multi = angular.element('<div data-i18n="TEST_ITEM2|ABC|123"></div>');

        scope = $rootScope;
        $compile(elm)(scope);
        $compile(multi)(scope);
        scope.$digest();
    }));

    it('should set inner text', function () {
        var titles = elm.text();

        expect(titles).toBe('This is a test response.');
    });

    it('should replace placeholders with values', function () {
        var titles = multi.text();

        expect(titles).toBe('This is a multi replace test response ABC 123');
    });
});

describe('i18n directive with i18n-html', function() {
    var elm1;
    var elm2;
    var scope;
    var localize;

    // load the localization code
    beforeEach(module('localization'));

    beforeEach(function () {

        localize = {
            getLocalizedString: function (value) {
                if (value === 'TEST_ITEM1') {
                    return 'This is a test <strong>response</strong>.';
                } else {
                    return '';
                }
            }
        };

        module('localization', function ($provide) {
            $provide.value('localize', localize);
        });
    });

    beforeEach(inject(function ($rootScope, $compile) {
        // we might move this tpl into an html file as well...
        elm1 = angular.element('<div data-i18n="TEST_ITEM1"></div>');

        elm2 = angular.element('<div data-i18n="TEST_ITEM1" data-i18n-html></div>');

        scope = $rootScope;
        $compile(elm1)(scope);
        $compile(elm2)(scope);
        scope.$digest();
    }));

    it('should have html encoded content', function () {
        var titles = elm1.html();

        expect(titles).toBe('This is a test &lt;strong&gt;response&lt;/strong&gt;.');
    });

    it('should have html content', function () {
        var titles = elm2.html();

        expect(titles).toBe('This is a test <strong>response</strong>.');
    });
});

describe('i18nAttr directive', function() {
    var elm;
    var multi;
    var scope;
    var localize;

    // load the localization code
    beforeEach(module('localization'));

    beforeEach(function () {

        localize = {
            getLocalizedString: function (value) {
                if (value === 'TEST_ITEM1') {
                    return 'This is a test response.';
                } else if (value === 'TEST_ITEM2') {
                    return 'This is a multi replace test response {0} {1}';
                } else {
                    return '';
                }
            }
        };

        module('localization', function ($provide) {
            $provide.value('localize', localize);
        });
    });

    beforeEach(inject(function ($rootScope, $compile) {
        // we might move this tpl into an html file as well...
        elm = angular.element('<div data-i18n-attr="TEST_ITEM1|title" title="Not the value"></div>');

        multi = angular.element('<div data-i18n-attr="TEST_ITEM2|title|ABC|123" title="Not the value"></div>');

        scope = $rootScope;
        $compile(elm)(scope);
        $compile(multi)(scope);
        scope.$digest();
    }));

    it('should set inner text', function () {
        var titles = elm.attr('title').toString();

        expect(titles).toBe('This is a test response.');
    });

    it('should replace placeholders with values', function () {
        var titles = multi.attr('title').toString();

        expect(titles).toBe('This is a multi replace test response ABC 123');
    });
});

