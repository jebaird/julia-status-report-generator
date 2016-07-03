<jb-log-form>

<style scoped>
    /*.__amount .form-control{
        width: 6em !important;
        display: inline;
    }*/

    form {
        border: 1px solid #eee;
        padding: 1em;
        background: #f2f2f2;
    }

</style>

<form class="form-inline" type="post" onsubmit="{ submitHandler }" id="form" oninvalid="{ formInvalidHandler }">

    <div class="form-group">
        <label for="time" class="control-label">Time</label>
            <input type="time" class="form-control" id="time" placeholder="" name="time" required onfocus="{ timeToNow }">
    </div>
    <div class="form-group">
        <label for="item" >Item</label>
            
            <input list="medications" name="item" required oninput="{ itemInputHandler }" class="form-control">

            <datalist id="medications" >

                <option value="Baclofen" data-amount="1" data-unit="ml" >Baclofen</option>
                <option value="Clonidine" data-amount=".5" data-unit="ml">Clonidine</option>
                <option value="Cypoheptadine / Periatctin" data-amount="3" data-unit="ml">Cypoheptadine / Periatctin</option>
                <option value="Rubionol / Cuvposa" data-amount="3.5" data-unit="ml">Rubionol / Cuvposa</option>
                
                <option value="Omeprazole" data-amount="10" data-unit="ml">Omeprazole</option>
                <option value="Topiramate" data-amount="6" data-unit="ml">Topiramate</option>
                <option value="Mrialax" data-amount="2" data-unit="tsp">Mrialax</option>

                <option value="Peidasure" data-amount="2" data-unit="ml">Peidasure</option>
                <option value="Hycent / HYDROcodeone">Hycent / HYDROcodeone</option>
                <option value="Valium / Diazepam">Valium / Diazepam</option>

            </datalist>
    </div>


    <div class="form-group __amount">
        <label for="amount" class="control-label">Amount</label>
            <input type="number" step=".25" min="0" value="1" class="form-control form-control-small" name="amount" placeholder="" autocomplete="off">
            
            <select name="unit" class="form-control form-control-small">
                <option value="ml" title="Miilaliters">ml</option>
                <option value="tsp" title="Teaspoon">Tsp</option>
                <option value="tbsp" title="Tablespoon">tsp</option>

            </select>
    </div>


    <div class="form-group">
        <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>submit</button>
    </div>
</form>

<script>

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