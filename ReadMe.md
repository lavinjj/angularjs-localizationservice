#Resource Localization Service

## Overview

This is a simple service module that allows you to localize your AngularJS applications.

The service returns a localized string based on the current locale of the browser.

You can inject the service into every controller or use an Application Level controller that loads the service and handles the calls.

## Wiring It Up

You need to follow a few steps to wire the service into your app:

1. Include the script localizationservice.js in your project.
2. Create a folder off the root of your web app named i18n and create a resource-locale_default.js file in it.
3. For every language you want to provide localized strings for you will also need to create a resource file that ends in the languageId-countryId (e.g. resource-locale_en-us.js).
4. You will need to inject the service into your controllers.
5. create a scope level method called getLocalizedString() that will call the localization service and return the localized string.

## Localization File Format

The localization file is pretty simple. It consists of a JSON array of the following object:

    {
        "key":"_Greeting_",
        "value":"iteSa ocalizationla xampleea singua heta esourcera ocalizationla ervicesa",
        "description":"Home page greeting text"
    }

The key is used to look up the localized string, the value will be returned from the lookup and the description is an aide to developers and translators what the string is used for.

## Sample App

I've created a sample app that uses the Resource Localization Service to provide the text for the entire application. This is done setting a ng-controller at the body level that exposes the scope level method getLocalizedString().

In turn each of the partials will have access to method via scope inheritance. I then use ng-bind="getLocalizedString('_HomeTitle_')" to insert the text into the page at run time.

Enjoy!

