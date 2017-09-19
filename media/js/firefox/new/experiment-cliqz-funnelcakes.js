/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function(Mozilla) {
    'use strict';

    Mozilla.TCFCGeoExp.init({
        countryCode: 'de',
        experimentConfig: {
            id: 'experiment_cliqz_funnelcake',
            variations: {
                // TODO: update these percentages - currently just guesses
                'f=119': 33,
                'f=120': 33,
                'f=121': 33
            }
        }
    });
})(window.Mozilla);
