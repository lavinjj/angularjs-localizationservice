#AngularJS Resource Localization Service

## Overview

This is a simple service module that allows you to localize your AngularJS applications. A tutorial that covers the service is located at [Coding Smackdown TV](http://codingsmackdown.tv/blog/2012/12/14/localizing-your-angularjs-app/)

The service returns a localized string based on the current locale of the browser.

You can inject the service into a controller or use it via the i18n filter or the i18n directive provided in the code.

## Wiring It Up

You need to follow a few steps to wire the service into your app:

1. Include the script localize.js in your project.
2. Ensure you add 'localization' to your app's dependency list.
2. Create a folder off the root of your web app named i18n and create a resource-locale_default.js file in it.
3. For every language you want to provide localized strings for you will also need to create a resource file that ends in the languageId-countryId (e.g. resource-locale_en-us.js).
5. To get the translated string using the filter with either ng-bind="'_HomeTitle_' | i18n" or {{'_HomeTitle_' | i18n}} in your HTML. You can use the directive by adding the data-i18n="_HomeTitle_" attribute to your markup.

## Localization File Format

The localization file is pretty simple. It consists of a JSON array of the following object:

    {
        "key":"_Greeting_",
        "value":"iteSa ocalizationla xampleea singua heta esourcera ocalizationla ervicesa",
        "description":"Home page greeting text"
    }

The key is used to look up the localized string, the value will be returned from the lookup and the description is an aide to developers and translators what the string is used for.

## Sample App

I've created a sample app that uses the Resource Localization Service to provide the text for the entire application. I registered 'localization' in my app's dependency list and I then use a combination of ng-bind="'_HomeTitle_' | i18n" and data-i18n="_HomeTitle_" to insert the text into the page at run time.

There is a delay loading the resource file, you may need to use the filter instead of the directive on the home page. This is due to the fact that the directive is only called once per instance where a filter is re-evaluated each time the DOM is compiled.

## LICENSE

The MIT License

Copyright (c) 2012-2013 Coding Smackdown TV, http://codingsmackdown.tv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Enjoy!
