/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

if (typeof Mozilla == 'undefined') {
    var Mozilla = {};
}

(function(Mozilla) {
    // init dataLayer object
    var dataLayer = window.dataLayer = window.dataLayer || [];
    var Analytics = {};

    /** Returns page ID used in Event Category for GA events tracked on page.
    * @param {String} path - URL path name fallback if page ID does not exist.
    * @return {String} GTM page ID.
    */
    Analytics.getPageId = function(path) {
        var pageId = document.getElementsByTagName('html')[0].getAttribute('data-gtm-page-id');
        var pathName = path ? path : document.location.pathname;

        return pageId ? pageId : pathName.replace(/^(\/\w{2}\-\w{2}\/|\/\w{2,3}\/)/, '/');
    };

    Analytics.getTrafficCopReferrer = function() {
        var referrer;

        // if referrer cookie exists, store the value and remove the cookie
        if (Mozilla.Cookies.hasItem('mozilla-traffic-cop-original-referrer')) {
            referrer = Mozilla.Cookies.getItem('mozilla-traffic-cop-original-referrer');

            // referrer shouldn't persist
            Mozilla.Cookies.removeItem('mozilla-traffic-cop-original-referrer');
        }

        return referrer;
    };

    Analytics.getOptimizelyReferrer = function() {
        console.log('!!!! BEGIN Analytics.getOptimizelyReferrer !!!!');
        var referrer;

        // This is set by Optimizely's JS *only after a redirect*. Necessary
        // because 'optimizely-original-referrer' is set every time Optimizely
        // loads. We need to make sure a redirect was performed (as opposed to
        // an in-place content change).
        var optlyDidRedirect = Mozilla.Cookies.getItem('optimizelyRedirect');

        // if a redirect was performed, and an original referrer was stored
        if (optlyDidRedirect && Mozilla.Cookies.hasItem('optimizely-original-referrer')) {
            console.log('Optimizely did a redirect, so we grab the original referrer...');
            referrer = Mozilla.Cookies.getItem('optimizely-original-referrer');

            // referrer shouldn't persist
            Mozilla.Cookies.removeItem('optimizely-original-referrer');
        }

        console.log('...determined referrer to be: ' + referrer);

        console.log('!!!! END Analytics.getOptimizelyReferrer !!!!');

        return referrer;
    };

    Analytics.getExperimentToolReferrer = function() {
        var referrer;

        // make sure we can work with cookies
        if (Mozilla.Cookies) {
            // first check referrer from Traffic Cop
            referrer = Analytics.getTrafficCopReferrer();

            // if no Traffic Cop referrer exists, check Optimizely
            if (!referrer) {
                referrer = Analytics.getOptimizelyReferrer();
            }
        }

        return referrer;
    };

    Analytics.buildDataObject = function() {
        var dataObj = {
            'event': 'page-id-loaded',
            'pageId': Analytics.getPageId()
        };


        var referrer = Analytics.getExperimentToolReferrer();

        // if original referrer exists, pass it to GTM
        if (referrer) {
            console.log('Sending this referer to GTM: ' + referrer);
            // Traffic Cop sets the referrer to 'direct' if document.referer is empty
            // prior to the redirect, so this value will either be a URL or the string 'direct'.
            dataObj.customReferrer = referrer;
        }

        return dataObj;
    };

    // Push page ID into dataLayer so it's ready when GTM container loads.
    dataLayer.push(Analytics.buildDataObject());

    Mozilla.Analytics = Analytics;
})(window.Mozilla);
