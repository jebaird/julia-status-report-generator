(function() {
    /*
media--screen
        Todo: 
         * add clear button
         * restore table markup
         * print styles
         * print button
     */



        /*
         * super small templating engine
         * http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
         *
         * used to display the status messages when contacting the server
         */
    function t(s, d) {
        for (var p in d)
            s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
        return s;
    }



    function getPrettyDate( date ) {
        var dateParts = date.toString().split( ' ' ).slice(0, 4);
        return ( (dateParts.shift() + ', ' ) + dateParts.join( ' ' ) )
    }


    var togglePrinterFriendlyTitleTag = (function togglePrinterFriendlyTitleTag( orgTitle ){

        return function( mediaIsPrint ) {

            document.querySelector('title').innerHTML = ( mediaIsPrint ) ? window.sessionStorage.getItem( 'report-date' ) : orgTitle;

        }

    })( document.querySelector('title').innerHTML );


    function setTitleTag(){
            $('title').html( t($('title').html(),{
        'report-date': $('[name="report-date"]').val()
    }));
    }



    /*
        print version

        keep the prinable version
     */ 
    
     var syncPrintableElement = function( key ) {
        var target = document.querySelector( '[data-storage="' + key + '"]' );

        var data = window.localStorage.getItem( key );

        target.innerHTML = data;

     }

     window.addEventListener( 'storage', (function( syncPrintableElement ){

        return function( e ){
            console.log( e )
            //syncPrintableElement()
        }
     })(syncPrintableElement))

     $( '[data-storage]' )
     var elements = [].slice.call( document.querySelectorAll( '[data-storage]' ), 0 ).forEach( function( element ) {

        syncPrintableElement( element.getAttribute( 'data-storage' ) );

    } );






    if (window.matchMedia) {

        var mediaQueryList = window.matchMedia('print');

        mediaQueryList.addListener(function(mql) {

            togglePrinterFriendlyTitleTag( mql.matches );

 
        });
    }


    $('.action--print').click(function(e) {

        window.print()

    });


    $('.action--cleardata').click(function() {
        if (confirm('Are you sure you want to clear all data? This action can\'t be undone')) {
            Storage.clear();
            location = location
        }
    })

})()