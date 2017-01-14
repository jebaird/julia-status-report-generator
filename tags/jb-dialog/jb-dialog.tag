<jb-dialog>

    <style scoped>
        .modal {
            background-color: rgba( 0, 0, 0, .5);
        }
        
        .modal-dialog {
            display: block;
        }
    </style>


    <div class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" onclick="{ closeHandler }" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{ opts.title }</h4>
                </div>
                <div class="modal-body">
                    <yield from="content" />

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="{ closeHandler }">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>


        <script>
            this.on('submit', function(argument) {
                console.log(arguments)
            })


            closeHandler(e) {
                this.root.parentNode.removeChild(this.root)
            }
        </script>

</jb-dialog>