<jb-log-form>

<style scoped>
    .__amount .form-control{
        width: 6em !important;
        display: inline;
    }
</style>

<form class="form-inline" type="post" onsubmit="{ submit }" id="form">

    <div class="form-group">
        <label for="time" class="control-label">Time</label>
            <input type="time" class="form-control" id="time" placeholder="" name="time" required onfocus="{ timeToNow }">
    </div>
    <div class="form-group">
        <label for="" class="control-label">Item</label>
            
            <select name="item" class="form-control" required>
                <option value="">Select...</option>
                <option value="Peidasure">Peidasure</optoin>
                <option value="Baclofen">Baclofen</optoin>
                <option value="Clonidine">Clonidine</optoin>
                <option value="Cypoheptadine / Periatctin">Cypoheptadine / Periatctin</optoin>
                <option value="Omeprazole">Omeprazole</optoin>
                <option value="Topiramate">Topiramate</optoin>
                <option value="Mrialax">Mrialax</optoin>
                <option value="Rubionol / Cuvposa">Rubionol / Cuvposa</optoin>
                <option value="Hycent / HYDROcodeone">Hycent / HYDROcodeone</optoin>
                <option value="Valium / Diazepam">Valium / Diazepam</optoin>

            </select>
    </div>


    <div class="form-group __amount">
        <label for="inputPassword3" class="control-label">Amount</label>
            <input type="number" step=".25" min="0" value="1" class="form-control form-control-small" name="amount" placeholder="" autocomplete="off">
            
            <select name="unit" class="form-control form-control-small">
                <option value="ml">ml</optoin>
                <option value="tsp">tsp</optoin>

            </select>
    </div>


    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-success">submit</button>
        </div>
    </div>
</form>

<script>

submit( e ) {
    e.preventDefault();

    e.target.checkValidity();

    var values = {};

    // todo check if values gets cleaned up if we set the context to this
    [].slice.call( e.target ).forEach(function( input ){
        var name = input.getAttribute('name');

        if ( name ) {
            values[ name ] = input.value
        }
        
    }, this );

    
    

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

timeToNow( e ){
    console.log( e.target )
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