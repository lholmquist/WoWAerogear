$( function() {
    var url = "http://us.battle.net/api/wow/achievement/2144";

    $.ajax( {
        type:'GET',
        url:url,
        contentType: 'application/json',
        dataType: 'jsonp',
        jsonp: 'jsonp',
        success: function( data ){
            console.log( data );
        }
    });

    var pipeline = AeroGear.Pipeline();

    pipeline.add( {
        name: "wowPipe",
        settings: {
            baseURL: "http://us.battle.net/api/wow/",
            endpoint: "achievement/2144", //this should be in the read method, need datamanager for that?
            jsonp: true,
            callback: "myCallback"
        }
    } );

    var wowPipe = pipeline.pipes.wowPipe;

    wowPipe.read( {
        success:function( data ) {
            console.log( data );
        }
    });


});