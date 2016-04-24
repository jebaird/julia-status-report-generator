(function() {
    /*

        Todo: 
         * add clear button
         * restore table markup
         * print styles
         * print button
     */


    $('.phoenix-input').phoenix()
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

    $.fn.setInputTypeTimeToNow = function() {
        return this.each(function() {

            var d = new Date(),
                h = d.getHours(),
                m = d.getMinutes();
            if (h < 10) h = '0' + h;
            if (m < 10) m = '0' + m;
            $(this).attr({
                'value': h + ':' + m
            });
        })
    }

    getFormattedTime = function(fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = fourDigitTime.substring(2);

        return hours + minutes + amPm;
    };


    function serializeFormToObject($form) {
        var fields = {}

        $.each($form.serializeArray(), function(i, field) {
            console.log(field)
            var value = field.value;
            if (field.name == 'time') {
                value = getFormattedTime(value)
            }
            fields[field.name] = value;

        });


        return fields;
    }


    $('[type="time"').setInputTypeTimeToNow();
    var $documentBody = $(document.body);
    var $logTableBody = $('.log-table tbody');
    var makeRow = function(data) {
        var template = $('#table-row').html();

        data.amount += data.unit

        return t(template, data);
    }


    $('form').on('submit', function(e) {

        console.log('submit')
        e.preventDefault();

        $this = $(this);

        var fields = $this.serializeArray();
        if (fields[1].value == '') {
            $this.find('button').addClass('btn-danger')
            $this.find('[name="item"]').parents('.form-group').addClass('has-error')
            return;
        }

        $logTableBody.prepend(makeRow(serializeFormToObject($this)));
        // todo store current markup in session storage
    })

})()