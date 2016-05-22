<jb-input>
<script>

this.on('before-mount', function(){

    var value = window.localStorage.getItem( this.root.getAttribute('name') );

    if ( value != null ) {

        this.root.value = value;
    }

    this.root.addEventListener('change', function(){
        window.localStorage.setItem( this.getAttribute('name'), this.value )
    })
})
</script>

</jb-input>