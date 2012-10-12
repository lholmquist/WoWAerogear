$( function() {
    var url = "http://us.battle.net/api/wow/achievement/2144",
        baseURL = "http://us.battle.net/api/wow/";

//a jquery version for a baseline to make sure it worked
    /*$.ajax( {
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

    pipeline.add([
        {
            name: "realmStatus",
            settings: {
                baseURL: baseURL,
                endpoint: "realm/status",
                jsonp: {
                    jsonp: 'jsonp'
                    //callback: 'customCallback'
                }
            }
        }
    ]);

    var realmStatusPipe = pipeline.pipes.realmStatus;
    stores.add( "realmStatusStore" );
    var realmStatusStore = stores.stores.realmStatusStore;

    realmStatusPipe.read( {
        success:function( data ) {
            updateRealmStatus();
        },
        stores: realmStatusStore
    });


    function updateRealmStatus() {
        var realms = realmStatusStore.getData()[ 0 ];
        var outsideList = $( "#realms" );
        _.each( realms.realms, function( realm ) {
            $( "<li>" ).append( "Realm Name:" + realm.name + "Realm Status:" + realm.status ).appendTo( outsideList );
        });
    }
});
