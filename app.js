(function() {
    /*
media--screen
        Todo: 
         * add clear button
         * restore table markup
         * print styles
         * print button
     */



    function getPrettyDate(date) {
        var dateParts = date.toString().split(' ').slice(0, 4);
        return ((dateParts.shift() + ', ') + dateParts.join(' '))
    }
    /*
        Copy text from any appropriate field to the clipboard
      By Craig Buckler, @craigbuckler
      use it, abuse it, do whatever you like with it!
    */
    (function() {

        'use strict';

        // click events
        document.body.addEventListener('click', copy, true);

        // event handler
        function copy(e) {

            // find target element
            var
                t = e.target,
                c = t.dataset.copytarget,
                inp = (c ? document.querySelector(c) : null);

            // is element selectable?
            if (inp && inp.select) {

                // select text
                inp.select();

                try {
                    // copy text
                    document.execCommand('copy');
                    inp.blur();

                    // copied animation
                    t.classList.add('copied');
                    setTimeout(function() {
                        t.classList.remove('copied');
                    }, 1500);
                } catch (err) {
                    alert('please press Ctrl/Cmd+C to copy');
                }

            }

        }

    })();


    function getHashParam(name) {
        var lochash = location.hash.substr(1);
        return lochash.substr(lochash.indexOf(name + '=')).split('&')[0].split('=')[1];
    }


    var togglePrinterFriendlyTitleTag = (function togglePrinterFriendlyTitleTag(orgTitle) {

        return function(mediaIsPrint) {

            document.querySelector('title').innerHTML = (mediaIsPrint) ? window.sessionStorage.getItem('report-date') : orgTitle;

        }

    })(document.querySelector('title').innerHTML);




    /*
        print version

        keep the prinable version
     */

    var syncPrintableElement = function(key) {

        var target = document.querySelector('[data-storage="' + key + '"]');

        if (target == null) {
            return;
        }

        var data = window.localStorage.getItem(key);

        target.innerHTML = data;

    }

    var iframe = document.createElement('iframe');

    iframe.style.display = 'none';

    document.body.appendChild(iframe);


    iframe.contentWindow.addEventListener('storage', function(e) {
        syncPrintableElement( e.key )

        // update the url for sharing
        
        document.querySelector( '.share-url' ).value = window.location.origin + '#!/d=' + encodeURIComponent( JSONC.pack( window.localStorage ) );

    }, false)


    var elements = [].slice.call(document.querySelectorAll('[data-storage]'), 0).forEach(function(element) {

        syncPrintableElement(element.getAttribute('data-storage'));

    });
    
    // update the url for sharing
    document.querySelector( '.share-url' ).value = window.location.origin + '#!/d=' + encodeURIComponent( JSONC.pack( window.localStorage ) );



    if (window.matchMedia) {

        var mediaQueryList = window.matchMedia('print');

        mediaQueryList.addListener(function(mql) {

            togglePrinterFriendlyTitleTag(mql.matches);


        });
    }


    /* Load data from a url 
    ############################
    */

    var dataFromHash = getHashParam('d');

    if (dataFromHash !== undefined) {

        try {
            dataFromHash = JSONC.unpack(decodeURIComponent(dataFromHash));
        } catch (e) {
            alert("There was an error loading that " + e)
        }


        for (var key in dataFromHash) {
            window.localStorage.setItem(key, dataFromHash[key]);
        }

        // prevent them from overriding any changes they may have made if they refresh
        history.replaceState(null, null, '#!/');


        //alert('Data loaded from shared URL')
    }




    /*
    App Actions
    ############################################## */

    document.querySelector('.action--log').onclick = function() {
        document.querySelector('jb-dialog.log-form').style.display = "block"
    }

    document.querySelector('.action--print').onclick = function() {
        window.print()
    }


    document.querySelector('.action--cleardata').onclick = function() {
        if (confirm('Are you sure you want to clear all data? This action can\'t be undone')) {
            window.localStorage.clear();
            location = location.origin
        }
    }


    // document.querySelector( '.action--json' ).onclick = function(){
    //     console.log( window.localStorage );


    //     // console.log( JSONC.compress( window.localStorage ) )

    //     // console.log( JSONC.compress( JSON.stringify( window.localStorage )  ) )
    //     // 
    //     var packed = encodeURIComponent( JSONC.pack( window.localStorage ) );

    //     if ( packed.length > 2000 ) {
    //         alert( "Data could be corrupted")
    //     }

    //     console.log( packed )

    //     console.log( JSONC.unpack( decodeURIComponent( packed ) ))

    // }


})()