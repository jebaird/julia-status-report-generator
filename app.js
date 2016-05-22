(function() {
    /*

        Todo: 
         * add clear button
         * restore table markup
         * print styles
         * print button
     */


    var LOG_DATA_STORAGE_KEY = 'logData';






    var Storage = {
        _frame: document.createElement('iframe'),
        get: function(key, mode) {
            var data = window.localStorage.getItem(key);

            // if the key hasn't been set it returns a null, which is "true" in js
            return (data === null) ? undefined : JSON.parse(data);

        },
        set: function(key, data) {
            this._frame.contentWindow.localStorage.setItem(key, JSON.stringify(data));
        },
        'clear': function() {
            window.localStorage.clear();
        },
        'remove': function(key) {
            window.localStorage.removeItem(key);
        }
    };

    document.body.appendChild( Storage._frame );

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


    getFormattedTime = function(fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = fourDigitTime.substring(2);

        return hours + minutes + amPm;
    };
        /*

            aapp gud
         */

    $('form').on('submit', function(e) {
console.log('jquery')


        this.reset();
        $this.parents('.log-form').slideUp()

    });


    // actions
    // 
    $('.action--print').click(function(e) {

        var printVars = {
            'report-date': $('[name="report-date"]').val(),
            'wokeupatnumber': getFormattedTime($('[name="wokeupatnumber"]').val()),
            'logdata': $('<div>').append($('.log-table').clone()).html()
        };
        var printTemplate = t($('#printFormat').html(), printVars);


        var printWindow = window.open('print.html');
        console.log(printWindow)
        printWindow.onload = function() {
            $(printWindow.document.body).append(printTemplate);
            $(printWindow.document.head).append('<title>Medication report for ' + printVars['report-date'] + '</title>');


            setTimeout(function() {
                printWindow.print()
            }, 1000)
        }
    });

    // show log form
    $('.action--show-log-form').click(function() {
        $('.log-form').slideDown();
    });

    $('.action--cleardata').click(function() {
        if (confirm('Are you sure you want to clear all data? This action can\'t be undone')) {
            Storage.clear();
            location = location
        }
    })

})()