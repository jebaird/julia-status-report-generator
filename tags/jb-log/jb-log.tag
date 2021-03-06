<jb-log>

<style scoped>
    :scope {
        display: block;
    }

    .jb-log__time{
        text-align: left;
    }
    .jb-log__item{
         width: 75%;
    }
    .jb-log__amount{
        text-align: right;
    }

    .btn-danger {
        visibility: hidden;
        pointer-events: none;
    }

    tr:hover .btn-danger {
        visibility: visible;
        pointer-events: initial;
    }

    tbody > tr.empty {
        display: none;
    }

    tbody > tr.empty:only-of-type {
        display: table-row;
    }

    tr.empty td {
        
        padding: 5em 2em !important;
        text-align: center;
        font-weight: bold;


        background-color: #f8f8f8;
        border-color: #e7e7e7;
    }

/*     tr > td:first-of-type {
        visibility: hidden;
        opacity: 0;
        transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
    }
    tr:hover > td:first-of-type{
        visibility: visible;
        opacity: 1;
    }*/


</style>


<table class="table table-striped log-table">
    <thead>
        <tr>
            <th class="jb-log__time">Time</th>
            <th class="jb-log__amount">Amt</th>
            <th class="jb-log__item">Item</th>
            <th class="no-print">
                <button class="jb-log__sort btn btn-default btn-xs" title="Sort by time" onclick="{sort}">Sort</button>
            </th>

        </tr>
    </thead>
    <tbody>

    <tr class="empty">
        <td colspan="4">Nothing scheduled, Why not add an event?</td>
    </tr>

        <tr each="{ opts.entries }">

            <td class="jb-log__time"><time>{ getFormattedTime( time ) }</time></td>
            <td class="jb-log__amount">{ amount } { unit }</td>
            <td class="jb-log__item">{ item }</td>
            <td class="no-print">
                <button class="btn btn-danger btn-sm" onclick="{remove}" title="remove this entry"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
            </td>
        </tr>



    </tbody>
</table>

<script>


    var Storage = {
        _iframe: ( function(){
            var iframe = document.createElement('iframe')

            iframe.style.display = 'none';

            return iframe;

        }() ),
        get: function(key, mode) {
            var data = window.localStorage.getItem(key);

            // if the key hasn't been set it returns a null, which is "true" in js
            return (data === null) ? undefined : JSON.parse(data);

        },
        set: function(key, data) {

            if ( !this._iframe.parentNode ) {
                document.body.appendChild( this._iframe )
            }

            this._iframe.contentWindow.localStorage.setItem(key, JSON.stringify(data));
        },
        'clear': function() {
            window.localStorage.clear();
        },
        'remove': function(key) {
            window.localStorage.removeItem(key);
        }
    };


    getFormattedTime(fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = fourDigitTime.substring(2);

        return hours + minutes + amPm;
    }


this.LOG_DATA_STORAGE_KEY = 'logData';

this._storageEventHander = function(e){

    if ( e.key != this.LOG_DATA_STORAGE_KEY ) {
        return;
    }
    opts.entries = Storage.get( this.LOG_DATA_STORAGE_KEY );
    this.update()

}

this.on('before-mount', function() {

    // before the tag is mounted
    window.addEventListener( 'storage', this._storageEventHander.bind( this ), false )

        opts.entries = Storage.get( this.LOG_DATA_STORAGE_KEY )
    this.update()

    
  })

this.on('unmount', function() {
    // when the tag is removed from the page
    window.removeEventListener( 'storage', this._storageEventHander )
  })

/*
    remove a row
 */
remove( e ) {
    console.log( this, e)
  if (!confirm('Are you sure you want to remove this row?')) {

    return;

    }


    var index = [].slice.call( this.root.querySelectorAll('tbody tr:not(.empty)'), 0 ).indexOf( e.target.parentNode.parentNode )

    var data = Storage.get( this.LOG_DATA_STORAGE_KEY )

    data.splice( index, 1 );

    Storage.set( this.LOG_DATA_STORAGE_KEY, data );

}
/*
    sort entries by date and time
 */
sort(){

    var data = Storage.get( this.LOG_DATA_STORAGE_KEY );

    data.sort( function( a, b ) {
        var atime = +( a.time.replace(':', '' ) )
        var btime = +( b.time.replace(':', '' ) )
        
        return atime > btime;
    } )

    
    Storage.set( this.LOG_DATA_STORAGE_KEY, data );
}

</script>

</jb-log>