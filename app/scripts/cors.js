$( function() {

    function doAeroGearCors() {
        var pipeline = AeroGear.Pipeline();
            cors = pipeline.add( {
                name: "cors",
                settings: {
                    baseURL: "http://localhost:8080/aerogear-controller-demo/",
                    endpoint: "login/"
                }
            });

            pipeline.pipes.cors.read({
                success: function( data, xhr, thing1 ) {
                    console.log( data );
                },
                error: function( error ) {
                    console.log( error );
                }
            });
    }

    doAeroGearCors();

});
