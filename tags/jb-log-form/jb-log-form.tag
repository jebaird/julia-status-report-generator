<jb-log-form>

<style scoped>
    .__amount .form-control{
        width: calc(100% / 3 ) !important;
        display: inline;
    }
    .__amount .control-label {
        display: block;
    }

    form {

    }

    .form-group--event {
        display: none;
    }

    /* remove after adding support for events */
    .radio {
        display: none;
    }

</style>

<form class="" type="post" onsubmit="{ submitHandler }" id="form" oninvalid="{ formInvalidHandler }">


    <div class="form-group">
        <div class="radio">
        <label class="control-label">
            <input type="radio" name="type" value="item" checked onchange="{ typeHandler }">
            Medication
            </label>
        </div>
        <div class="radio">
        <label class="control-label">
            <input type="radio" name="type" value="event" onchange="{ typeHandler }">
            Event
            </label>
        </div>
    </div>

    <div class="form-group">
        <label for="time" class="control-label">Time</label>
            <input type="time" class="form-control form-control-sm" id="time" placeholder="" name="time" required onfocus="{ timeToNow }">
    </div>


    <div class="form-group form-group--item">
        <label for="item" >Item</label>
            
            <input list="medications" name="item" required oninput="{ itemInputHandler }" class="form-control form-control-sm" placeholder="Enter in a medicaiton ">

            <datalist id="medications" >

                <option value="Baclofen" data-amount="1" data-unit="ml" >Baclofen</option>
                <option value="Omeprazole" data-amount="10" data-unit="ml">Omeprazole</option>
                
                <option value="Cypoheptadine" data-amount="3" data-unit="ml">Cypoheptadine</option>
                <option value="Rubionol" data-amount="3.5" data-unit="ml">Rubionol</option>
                
                <option value="Topiramate" data-amount="8" data-unit="ml">Topiramate</option>

                <option value="Mrialax" data-amount="3" data-unit="tsp">Mrialax</option>
                <option value="Peidasure" data-amount="3" data-unit="oz">Peidasure</option>
                <option value="Peidalite" data-amount="3" data-unit="oz">Peidalite</option>
                <option value="Water" data-amount="2" data-unit="oz">Water</option>
                

                <option value="Tylenol" data-amount="5" data-unit="ml">Tylenol</option>
                <option value="Benadryl" data-amount="5" data-unit="ml">Benadryl</option>


            </datalist>
    </div>

        <div class="form-group __amount form-group--item">

        <label for="amount" class="control-label">Amount</label>
        <input type="number" required step=".25" min="0" value="1" class="form-control form-control-small" name="amount" placeholder="" autocomplete="off" size="4">
                
        <select name="unit" required class="form-control form-control-small" title="Select the amount">
            <option value="ml" title="Milliliter">ml</option>
            <option value="oz" title="Ounce">oz</option>
            <option value="tsp" title="Teaspoon">Tsp</option>
            <option value="tbsp" title="Tablespoon">tsp</option>
        </select>
        
            
    </div>

    <div class="form-group form-group--event">
        <label for="item" >Event</label>
            
            <input list="events" name="event" class="form-control form-control-sm" placeholder="Event an event">

            <datalist id="events" >
                <option>Puked / Threw up</option>
                <option>Napped</option>
                <option>Fussy</option>
                <option>In Pain / Discomfort</option>

            </datalist>
    </div>







    <div class="form-group">
        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>submit</button>
    </div>
</form>

<script>


this.on( 'input', function(){
    console.log( 'test')
})
/*

    submit handler
 */
submitHandler( e ) {

    e.preventDefault();

    // TODO add btn-danger class on error
    e.target.checkValidity()


    var values = {};
    // todo check if values gets cleaned up if we set the context to this
    [].slice.call( e.target ).forEach(function( input ){
        var name = input.getAttribute('name');

        if ( name ) {
            values[ name ] = input.value
        }

        // clear out item on submit, datalists only show the searched for options, bad user exp when entering many things
        if ( name == 'item' ) {
            input.value = '';
        }
        
    }, this );

    
    

    // add the submitted data to localStorage
    var iframe = document.createElement('iframe');

    iframe.style.display = 'none';

    document.body.appendChild( iframe );

    var data = JSON.parse( iframe.contentWindow.localStorage.getItem( 'logData' ) );

    if( !data ) {
        data = [];
    }

    data.push( values );

    iframe.contentWindow.localStorage.setItem( 'logData', JSON.stringify( data ) )

    document.body.removeChild( iframe )

    iframe = null;



}

typeHandler( e ) {

    var value = e.target.value;

    

    var groups = [].slice.call( this.root.querySelectorAll( '.form-group--event, .form-group--item') )

    

    

}


/* medication handler */
itemInputHandler( e ) {
    

    // try to find the selected item in the data list
    var selected = e.target.value.toLowerCase();

    // can't have a blank value
    if ( selected == "" ) {

        return;
    }

    // look for the selected option in the list
    var option = [].slice.call( this.root.querySelectorAll( '#medications [data-amount][data-unit]' ) ).filter( function( option ) {

            return selected === option.getAttribute('value').toLowerCase();
    }, this );
    
    // do we have a match?
    // TODO: on form submit if we don't have an option save the value and amount to localStorage, then add that option to the list
    if ( option.length === 0 ) {
        return;
    }

    option = option[ 0 ];

    // select the prefilled values
    this.root.querySelector( '[name="amount"]' ).value = option.getAttribute( 'data-amount' );
    this.root.querySelector( '[name="unit"] option[value="'+ option.getAttribute('data-unit')+'"]' ).selected = true;

    option = null;
}

timeToNow( e ){
    if ( !e.target.value ) {

          var d = new Date(),
            h = d.getHours(),
            m = d.getMinutes();
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;


        e.target.value = h + ':' + m;
    }
}

</script>

</jb-log-form>