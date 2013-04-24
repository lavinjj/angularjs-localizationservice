describe('localization service', function () {
    var rootScope;
    var $httpBackend;
    var injector;

    beforeEach(module('localization'));

    beforeEach(inject(function ($injector) {
        injector = $injector;
        rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should request language resource file with right parameters', function () {
        $httpBackend.expectGET('/i18n/resources-locale_en-US.js').
            respond([
            {
                "key":"_HomeTitle_",
                "value":"Welcome to Brew Everywhere!",
                "description":"Home page greeting text"
            },
            {
                "key":"_HomeText_",
                "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                "description":"Home page introductory text"
            },
            {
                "key":"_HomeSlogan_",
                "value":"We'd like to think \"You don't need an app for that!\"",
                "description":"Home page slogan text"
            },
            {
                "key":"_TopRecipeTitle_",
                "value":"Highest Rated Recipes",
                "description":"Top Rated Recipe Title"
            },
            {
                "key":"_ViewDetails_Button_Title_",
                "value":"View details &raquo;",
                "description":"View Details Button Title Text"
            },
            {
                "key":"_TopContributorTitle_",
                "value":"Highest Contributors",
                "description":"Top Contributors Title text"
            },
            {
                "key":"_WhatsFermentingTitle_",
                "value":"What's Fermenting",
                "description":"What's Fermenting section Title text"
            },
            {
                "key":"_MyRecipesTitle_",
                "value":"My Recipes",
                "description":"My Recipes Section Title text"
            },
            {
                "key":"_MyCalendarTitle_",
                "value":"My Calender",
                "description":"My Calendar Section Title text"
            },
            {
                "key":"_MyInventoryTitle_",
                "value":"My Inventory",
                "description":"My Inventory Section Title text"
            }
        ]);

        var service = injector.get('localize');

        $httpBackend.flush();
    });

    it('should request default resource file on request error', function () {
        $httpBackend.whenGET('/i18n/resources-locale_en-pl.js').respond(400, { "Message": "It's broke" });
        $httpBackend.whenGET('/i18n/resources-locale_en-US.js').
            respond([
                {
                    "key":"_HomeTitle_",
                    "value":"Welcome to Brew Everywhere!",
                    "description":"Home page greeting text"
                },
                {
                    "key":"_HomeText_",
                    "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                    "description":"Home page introductory text"
                },
                {
                    "key":"_HomeSlogan_",
                    "value":"We'd like to think \"You don't need an app for that!\"",
                    "description":"Home page slogan text"
                },
                {
                    "key":"_TopRecipeTitle_",
                    "value":"Highest Rated Recipes",
                    "description":"Top Rated Recipe Title"
                },
                {
                    "key":"_ViewDetails_Button_Title_",
                    "value":"View details &raquo;",
                    "description":"View Details Button Title Text"
                },
                {
                    "key":"_TopContributorTitle_",
                    "value":"Highest Contributors",
                    "description":"Top Contributors Title text"
                },
                {
                    "key":"_WhatsFermentingTitle_",
                    "value":"What's Fermenting",
                    "description":"What's Fermenting section Title text"
                },
                {
                    "key":"_MyRecipesTitle_",
                    "value":"My Recipes",
                    "description":"My Recipes Section Title text"
                },
                {
                    "key":"_MyCalendarTitle_",
                    "value":"My Calender",
                    "description":"My Calendar Section Title text"
                },
                {
                    "key":"_MyInventoryTitle_",
                    "value":"My Inventory",
                    "description":"My Inventory Section Title text"
                }
            ]);

        $httpBackend.expectGET('/i18n/resources-locale_default.js').
            respond([
            {
                "key":"_HomeTitle_",
                "value":"Welcome to Brew Everywhere!",
                "description":"Home page greeting text"
            },
            {
                "key":"_HomeText_",
                "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                "description":"Home page introductory text"
            },
            {
                "key":"_HomeSlogan_",
                "value":"We'd like to think \"You don't need an app for that!\"",
                "description":"Home page slogan text"
            },
            {
                "key":"_TopRecipeTitle_",
                "value":"Highest Rated Recipes",
                "description":"Top Rated Recipe Title"
            },
            {
                "key":"_ViewDetails_Button_Title_",
                "value":"View details &raquo;",
                "description":"View Details Button Title Text"
            },
            {
                "key":"_TopContributorTitle_",
                "value":"Highest Contributors",
                "description":"Top Contributors Title text"
            },
            {
                "key":"_WhatsFermentingTitle_",
                "value":"What's Fermenting",
                "description":"What's Fermenting section Title text"
            },
            {
                "key":"_MyRecipesTitle_",
                "value":"My Recipes",
                "description":"My Recipes Section Title text"
            },
            {
                "key":"_MyCalendarTitle_",
                "value":"My Calender",
                "description":"My Calendar Section Title text"
            },
            {
                "key":"_MyInventoryTitle_",
                "value":"My Inventory",
                "description":"My Inventory Section Title text"
            }
        ]);

        var service = injector.get('localize');

        service.setLanguage('en-pl');

        $httpBackend.flush();
    });

    it('should broadcast a notice once localized resources are loaded', function(){
        $httpBackend.whenGET('/i18n/resources-locale_en-US.js').
            respond([
                {
                    "key":"_HomeTitle_",
                    "value":"Welcome to Brew Everywhere!",
                    "description":"Home page greeting text"
                },
                {
                    "key":"_HomeText_",
                    "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                    "description":"Home page introductory text"
                },
                {
                    "key":"_HomeSlogan_",
                    "value":"We'd like to think \"You don't need an app for that!\"",
                    "description":"Home page slogan text"
                },
                {
                    "key":"_TopRecipeTitle_",
                    "value":"Highest Rated Recipes",
                    "description":"Top Rated Recipe Title"
                },
                {
                    "key":"_ViewDetails_Button_Title_",
                    "value":"View details &raquo;",
                    "description":"View Details Button Title Text"
                },
                {
                    "key":"_TopContributorTitle_",
                    "value":"Highest Contributors",
                    "description":"Top Contributors Title text"
                },
                {
                    "key":"_WhatsFermentingTitle_",
                    "value":"What's Fermenting",
                    "description":"What's Fermenting section Title text"
                },
                {
                    "key":"_MyRecipesTitle_",
                    "value":"My Recipes",
                    "description":"My Recipes Section Title text"
                },
                {
                    "key":"_MyCalendarTitle_",
                    "value":"My Calender",
                    "description":"My Calendar Section Title text"
                },
                {
                    "key":"_MyInventoryTitle_",
                    "value":"My Inventory",
                    "description":"My Inventory Section Title text"
                }
            ]);

        spyOn(rootScope, '$broadcast').andCallThrough();

        var service = injector.get('localize');

        $httpBackend.flush();

        expect(rootScope.$broadcast).toHaveBeenCalled();
    });

    it('should provide localized resource string', function(){
        $httpBackend.whenGET('/i18n/resources-locale_en-US.js').
            respond([
                {
                    "key":"_HomeTitle_",
                    "value":"Welcome to Brew Everywhere!",
                    "description":"Home page greeting text"
                },
                {
                    "key":"_HomeText_",
                    "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                    "description":"Home page introductory text"
                },
                {
                    "key":"_HomeSlogan_",
                    "value":"We'd like to think \"You don't need an app for that!\"",
                    "description":"Home page slogan text"
                },
                {
                    "key":"_TopRecipeTitle_",
                    "value":"Highest Rated Recipes",
                    "description":"Top Rated Recipe Title"
                },
                {
                    "key":"_ViewDetails_Button_Title_",
                    "value":"View details &raquo;",
                    "description":"View Details Button Title Text"
                },
                {
                    "key":"_TopContributorTitle_",
                    "value":"Highest Contributors",
                    "description":"Top Contributors Title text"
                },
                {
                    "key":"_WhatsFermentingTitle_",
                    "value":"What's Fermenting",
                    "description":"What's Fermenting section Title text"
                },
                {
                    "key":"_MyRecipesTitle_",
                    "value":"My Recipes",
                    "description":"My Recipes Section Title text"
                },
                {
                    "key":"_MyCalendarTitle_",
                    "value":"My Calender",
                    "description":"My Calendar Section Title text"
                },
                {
                    "key":"_MyInventoryTitle_",
                    "value":"My Inventory",
                    "description":"My Inventory Section Title text"
                }
            ]);

        var service = injector.get('localize');

        $httpBackend.flush();

        var test = service.getLocalizedString('_HomeTitle_');

        expect(test).toBe('Welcome to Brew Everywhere!');
    });

    it('should request a new language resource file when setLanguage is called', function () {
        $httpBackend.whenGET('/i18n/resources-locale_en-US.js').
            respond([
                {
                    "key":"_HomeTitle_",
                    "value":"Welcome to Brew Everywhere!",
                    "description":"Home page greeting text"
                },
                {
                    "key":"_HomeText_",
                    "value":"The web site that allows you to manage all your brewing in one place. Brew Everywhere allows you to access your recipes, equipment, brewing inventory and brewing calendar from anywhere on any device.",
                    "description":"Home page introductory text"
                },
                {
                    "key":"_HomeSlogan_",
                    "value":"We'd like to think \"You don't need an app for that!\"",
                    "description":"Home page slogan text"
                },
                {
                    "key":"_TopRecipeTitle_",
                    "value":"Highest Rated Recipes",
                    "description":"Top Rated Recipe Title"
                },
                {
                    "key":"_ViewDetails_Button_Title_",
                    "value":"View details &raquo;",
                    "description":"View Details Button Title Text"
                },
                {
                    "key":"_TopContributorTitle_",
                    "value":"Highest Contributors",
                    "description":"Top Contributors Title text"
                },
                {
                    "key":"_WhatsFermentingTitle_",
                    "value":"What's Fermenting",
                    "description":"What's Fermenting section Title text"
                },
                {
                    "key":"_MyRecipesTitle_",
                    "value":"My Recipes",
                    "description":"My Recipes Section Title text"
                },
                {
                    "key":"_MyCalendarTitle_",
                    "value":"My Calender",
                    "description":"My Calendar Section Title text"
                },
                {
                    "key":"_MyInventoryTitle_",
                    "value":"My Inventory",
                    "description":"My Inventory Section Title text"
                }
            ]);

        $httpBackend.expectGET('/i18n/resources-locale_es.js').
            respond([
                {
                    "key":"_Greeting_",
                    "value":"iteSa ocalizationla xampleea singua heta esourcera ocalizationla ervicesa",
                    "description":"Home page greeting text"
                },
                {
                    "key":"_HomeTitle_",
                    "value":"esourceRa ocalizationLa erviceSa",
                    "description":"Home page title text"
                },
                {
                    "key":"_HomeControllerTitle_",
                    "value":"istLa xampleEa",
                    "description":"Home Pane Title"
                },
                {
                    "key":"_FormControllerTitle_",
                    "value":"ormFa xampleEa",
                    "description":"Add/Edit Person Form Title"
                },
                {
                    "key":"_FirstNameLabel_",
                    "value":"irstFa ameNa",
                    "description":"Label for first name field"
                },
                {
                    "key":"_LastNameLabel_",
                    "value":"astLa ameNa",
                    "description":"Label for last name field"
                }
            ]);

        var service = injector.get('localize');

        spyOn(rootScope, '$broadcast').andCallThrough();

        service.setLanguage('es');

        $httpBackend.flush();

        expect(rootScope.$broadcast).toHaveBeenCalled();

    });
});