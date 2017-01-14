(function() {
    /*
media--screen
        Todo: 
         * add clear button
         * restore table markup
         * print styles
         * print button
     */



    function getPrettyDate( date ) {
        var dateParts = date.toString().split( ' ' ).slice(0, 4);
        return ( (dateParts.shift() + ', ' ) + dateParts.join( ' ' ) )
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };


    function getHashParam( name ) {
        var lochash    = location.hash.substr(1);
        return lochash.substr(lochash.indexOf( name + '=' ) ).split('&')[0].split('=')[1];
    }


    var togglePrinterFriendlyTitleTag = (function togglePrinterFriendlyTitleTag( orgTitle ){

        return function( mediaIsPrint ) {

            document.querySelector('title').innerHTML = ( mediaIsPrint ) ? window.sessionStorage.getItem( 'report-date' ) : orgTitle;

        }

    })( document.querySelector('title').innerHTML );





    /*
        print version

        keep the prinable version
     */ 
    
     var syncPrintableElement = function( key ) {
        
        var target = document.querySelector( '[data-storage="' + key + '"]' );

        if ( target == null ) {
            return;
        }

        var data = window.localStorage.getItem( key );

        target.innerHTML = data;

     }

     var iframe = document.createElement( 'iframe' );

     iframe.style.display = 'none';

     document.body.appendChild( iframe );


     iframe.contentWindow.addEventListener( 'storage',  function( e ){
            syncPrintableElement( e.key )
        }, false )


     var elements = [].slice.call( document.querySelectorAll( '[data-storage]' ), 0 ).forEach( function( element ) {

        syncPrintableElement( element.getAttribute( 'data-storage' ) );

    } );






    if (window.matchMedia) {

        var mediaQueryList = window.matchMedia('print');

        mediaQueryList.addListener(function(mql) {

            togglePrinterFriendlyTitleTag( mql.matches );

 
        });
    }



    var dataFromHash = getHashParam('d');
    
    if ( dataFromHash !== undefined ) {

        try {
            dataFromHash = JSONC.unpack( decodeURIComponent( dataFromHash ) );
        } catch( e ) {
            alert( "There was an error loading that " + e )
        }
        

        for( var key in dataFromHash ) {
            window.localStorage.setItem( key, dataFromHash[ key ] );
        }

        // prevent them from overriding any changes they may have made if they refresh
        history.replaceState(null, null, '#!/');


        alert( 'Data loaded from shared URL')
    }

    /*
    App Actions
    ############################################## */

    document.querySelector( '.action--print' ).onclick = function() {
        window.print()
    }


    document.querySelector( '.action--cleardata' ).onclick = function() {
        if (confirm('Are you sure you want to clear all data? This action can\'t be undone')) {
            window.localStorage.clear();
            location = location
        }
    }


    document.querySelector( '.action--json' ).onclick = function(){
        console.log( window.localStorage );
        

        // console.log( JSONC.compress( window.localStorage ) )

        // console.log( JSONC.compress( JSON.stringify( window.localStorage )  ) )
        // 
        var packed = encodeURIComponent( JSONC.pack( window.localStorage ) );

        if ( packed.length > 2000 ) {
            alert( "Data could be corrupted")
        }

        console.log( packed )

        console.log( JSONC.unpack( decodeURIComponent( packed ) ))

    }


})()