/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
    'use strict';

    console.log('**** BEGIN optimizely-snippet.js ****');

    function getOptimizelyReferrer(referrer) {
        var it = referrer || document.referrer || 'direct';

        return it;
    }

    var OPTIMIZELY_PROJECT_ID = document.getElementsByTagName('html')[0].getAttribute('data-optimizely-project-id');

    // If doNotTrack is not enabled, it is ok to add Optimizely
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=1217896 for more details
    if (typeof Mozilla.dntEnabled === 'function' && !Mozilla.dntEnabled() && OPTIMIZELY_PROJECT_ID) {
        /*
        var domain = 'www.mozilla.org';
        var cookieDomain = '.' + domain;
        var originalReferrer = Mozilla.Cookies.getItem('optimizely-original-referrer');

        // if we don't have an original referrer, or document.referrer is from another
        //if (originalReferrer === 'undefined' || document.referrer.indexOf(domain) === -1) {
        if (originalReferrer === 'undefined') {
            Mozilla.Cookies.setItem('optimizely-original-referrer', document.referrer, null, null, cookieDomain);
        // if checkReferrer is not undefined and current referrer is from our domain,
        // update the session_referrer cookie to what was previously stored
        // (why the fuck? is this necessary at all? isn't this just updating the cookie with the same value?)
        } else {
            Mozilla.Cookies.setItem('optimizely-original-referrer', checkReferrer, null, null, cookieDomain);
        }
        */

        // store the original referrer in the event Optimizely performs a redirect
        //Mozilla.Cookies.setItem('optimizely-original-referrer', getOptimizelyReferrer());

        if (Mozilla.Cookies) {
            // check to see if referrer was already stored
            var originalReferrer = Mozilla.Cookies.getItem('optimizely-original-referrer');
            var optlyDidRedirect = Mozilla.Cookies.getItem('optimizelyRedirect');

            console.log('Original referrer is: ' + originalReferrer);
            console.log('Did redirect is: ' + optlyDidRedirect);

            // we don't want to overwrite the referrer after a redirect if it was previously set
            // TODO: check optlyDidRedirect here as well!
            if (!originalReferrer && !optlyDidRedirect) {
                var ref = getOptimizelyReferrer();
                console.log('Updating optimizely-original-referrer to ' + ref);
                Mozilla.Cookies.setItem('optimizely-original-referrer', ref);
            }
        }

        console.log('**** END optimizely-snippet.js ****');

        // now that referrer dance is complete, load optimizely
        (function(d, optID) {
            var newScriptTag = d.createElement('script');
            var target = d.getElementsByTagName('script')[0];
            newScriptTag.src = 'https://cdn.optimizely.com/js/' + optID + '.js';
            target.parentNode.insertBefore(newScriptTag, target);
        }(document, OPTIMIZELY_PROJECT_ID));
    }
})();
