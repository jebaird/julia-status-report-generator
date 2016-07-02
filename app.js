(function() {
    /*

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

    function setDocTitle( date ) {
        console.log( date )
        if ( date === null || typeof date != 'string' ) {

            date = date.getFullYear() + '-' + ( date.getMonth() + 1 )+ '-' + ( date.getDate() + 1 )
        }
        document.title = "" + date + ' - Medication Report'
    }

    $('[name="report-date"]').on('input', function(){
        setDocTitle( this.valueAsDate )
    })

    setDocTitle( window.localStorage.getItem('report-date') )

    // actions
    
 //https://www.tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/
    var beforePrint = function() {


        var date = $('[name="report-date"]')[0].valueAsDate;

        // fir jul 01 2016
               var printVars = {
            'report-date': getPrettyDate( date ),
            'wokeupatnumber': $('[name="wokeupatnumber"]').val(),
            'logdata': $('<div>').append($('.log-table').clone()).html(),
            'notes': $('[name="notes"]').val().replace(/\n/g, "<br />")
        };

      
        var printTemplate = t($('#printFormat').html(), printVars );
        
        $( 'body' )
            .append( printTemplate );
            };

            var afterPrint = function() {

                
                 $( 'body' ).find('.media--print').remove()
            };

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (mql.matches) {
                        beforePrint();
                    } else {
                        afterPrint();
                    }
                });
            }

            window.onbeforeprint = beforePrint;
            window.onafterprint = afterPrint;


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