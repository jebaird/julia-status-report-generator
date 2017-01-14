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
        var packed = JSONC.pack( window.localStorage );

        if ( packed.length > 2000 ) {
            alert( "Data could be corrupted")
        }

        console.log( packed )

        console.log( JSONC.unpack( packed ))

    }


})()