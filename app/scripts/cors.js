$( function() {

    function doAeroGearCors() {
        var pipeline = AeroGear.Pipeline();
            cors = pipeline.add( {
                name: "cors",
                settings: {
                    baseURL: "http://localhost:8080",
                    endpoint: "/"
                }
            });

            pipeline.pipes.cors.read({
                success: function( data, xhr, thing1 ) {
                    console.log( data );

                    pipeline.pipes.cors.remove({
                        id: 1,
                        title: "Another Created Task",
                        date: "2012-07-13"
                    },
                    { success:function( data ) {
                        console.log( data );
                    },
                    error: function( data ) {
                        console.log( error );
                    }
                    });
                },
                error: function( error ) {
                    console.log( error );
                },
                jsonp: {
                    callback: "jsonp"
                }
            });
    }

    doAeroGearCors();

});
