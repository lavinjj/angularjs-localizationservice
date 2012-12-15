#AngularJS Resource Localization Service

## Overview

This is a simple service module that allows you to localize your AngularJS applications. A tutorial that covers the service is located at [Coding Smackdown TV](http://codingsmackdown.tv/blog/2012/12/14/localizing-your-angularjs-app/)

The service returns a localized string based on the current locale of the browser.

You can inject the service into a controller or use it via the i18n filter provided in the code.

## Wiring It Up

You need to follow a few steps to wire the service into your app:

1. Include the script localize.js in your project.
2. Ensure you add 'localization' to your app's dependency list.
2. Create a folder off the root of your web app named i18n and create a resource-locale_default.js file in it.
3. For every language you want to provide localized strings for you will also need to create a resource file that ends in the languageId-countryId (e.g. resource-locale_en-us.js).
5. To get the translated string use either ng-bind="'_HomeTitle_' | i18n" or {{'_HomeTitle_' | i18n}} in your HTML.

## Localization File Format

The localization file is pretty simple. It consists of a JSON array of the following object:

    {
        "key":"_Greeting_",
        "value":"iteSa ocalizationla xampleea singua heta esourcera ocalizationla ervicesa",
        "description":"Home page greeting text"
    }

The key is used to look up the localized string, the value will be returned from the lookup and the description is an aide to developers and translators what the string is used for.

## Sample App

I've created a sample app that uses the Resource Localization Service to provide the text for the entire application. I registered 'localization' in my app's dependency list and I then use ng-bind="'_HomeTitle_' | i18n" to insert the text into the page at run time.

Enjoy!
