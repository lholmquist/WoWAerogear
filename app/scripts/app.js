$( function() {
    var url = "http://us.battle.net/api/wow/achievement/2144";


//a jquery version for a baseline to make sure it worked
   /* $.ajax( {
        type:'GET',
        url:url,
        contentType: 'application/json',
        dataType: 'jsonp',
        jsonp: 'jsonp',
        jsonpCallback: 'customCallback',
        success: function( data ){
            console.log( data );
        }
    });*/


// AeroGear.Pipeline version
    var pipeline = AeroGear.Pipeline();
    var stores = AeroGear.DataManager();

    pipeline.add([ {
        name: "achievements",
        settings: {
            baseURL: "http://us.battle.net/api/wow/",
            endpoint: "achievement", //this should be in the read method, need datamanager for that?
            jsonp: true
        }
    },"other" ]);

    var achievementsPipe = pipeline.pipes.achievements;
    stores.add( "achievementsStore" );
    var achievementsStore = stores.stores.achievementsStore;

    achievementsPipe.read( {
        id: 2144,
        success:function( data ) {
            console.log( achievementsStore.getData()[0] );
            console.log( data );
        },
        stores: achievementsStore
    });
});
