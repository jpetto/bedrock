(function(Mozilla) {
    'use strict';

    var carl = new Mozilla.TrafficCop({
        id: 'experiment-carl-rocks',
        variations: {
            'v=a': 50, // control
            'v=b': 25, // install instructions
            'v=c': 25  // mobile app store buttons
        }
    });

    var lenny = new Mozilla.TrafficCop({
        id: 'experiment-lenny-rules',
        variations: {
            'v=d': 50, // control
            'v=e': 25, // install instructions
            'v=f': 25  // mobile app store buttons
        }
    });

    function molemanCalling(variation) {
        document.addEventListener('DOMContentLoaded', function() {
            var realHeadline = document.getElementById('real-headline');
            var newHeadline;

            switch (variation) {
                case 'v=g':
                    newHeadline = 'Good Moleman to you';
                    break;
                case 'v=h':
                    newHeadline = 'I was saying boourns';
                    break;
            }

            realHeadline.innerText = newHeadline;
        });
    }

    var moleman = new Mozilla.TrafficCop({
        id: 'experiment-moleman-boourns',
        customCallback: molemanCalling,
        variations: {
            'v=g': 50,
            'v=h': 50
        }
    });

    // does visitor have any of the above already set?
    var choice;

    if (Mozilla.Cookies.hasItem('experiment-carl-rocks')) {
        console.log('already in carl experiment...');
        choice = 0;
    } else if (Mozilla.Cookies.hasItem('experiment-lenny-rules')) {
        console.log('already in lenny experiment...');
        choice = 1;
    } else if (Mozilla.Cookies.hasItem('experiment-moleman-boourns')) {
        console.log('already in moleman experiment...');
        choice = 2;
    } else {
        console.log('choosing new experiment...');
        choice = Math.floor(Math.random() * Math.floor(3));
    }

    switch (choice) {
        case 0:
            console.log('initializing carl');
            carl.init();
            break;
        case 1:
            console.log('initializing lenny');
            lenny.init();
            break;
        case 2:
            console.log('initializing moleman');
            moleman.init();
            break;
    }
})(window.Mozilla);
