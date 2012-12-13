$( function() {


    // Handle form submissions
    $( ".submit-btn" ).on( "click", function( event ) {
        event.preventDefault();
        $( this ).closest( "form" ).submit();
    });

    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();

        doAeroGearCors();
    });

    function doAeroGearCors() {
        var pipeline = AeroGear.Pipeline();
            cors = pipeline.add( {
                name: "cors",
                settings: {
                    baseURL: "http://localhost:8080/",
                    endpoint: "/"
                }
            });

            pipeline.pipes.cors.read({
                success: function( data, xhr, thing1 ) {
                    console.log( data );
                },
                error: function( error ) {
                    console.log( error );
                },
                jsonp: true
            });

        var restAuth = AeroGear.Auth({
        name: "auth",
        settings: {
            agAuth: true,
            baseURL: "http://localhost:8080/aerogear-controller-demo/",
            endpoints : {
                enroll: "register",
                login: "login"
            }
        }
    }).modules.auth;


    /*var data = $( "form" ).serialize();

    restAuth.logout(
        JSON.stringify( data ),
        {
            contentType: "application/json",
            dataType: "json",
            success: function( data ) {
                console.log( data );
            },
            error: function( data ) {
                console.log( data );
            }
    });*/



    }

});
