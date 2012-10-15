$( function() {
    var url = "http://us.battle.net/api/wow/achievement/2",
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
        error:function( data ) {
            console.log( data );
        },
        stores: realmStatusStore
    });


    function updateRealmStatus() {
        realmStatusStore.save(realmStatusStore.read()[ 0 ].realms,true);
        //did the above because datamanger can't filter beyond one layer yet
        var outsideList = $( "#realms" );
        _.each( realmStatusStore.read(), function( realm ) {
            buildTable( realm ).appendTo( outsideList );
        });
    }

    function buildTable( realm ) {
        var row = $( "<tr>" );

        row.append( $( "<td>" ).append( $( "<span>" ).append( realm.status ? "Up" : "Down" ).addClass( "label" ).addClass( realm.status ? "label-success" : "label-important" ) ) );
        row.append( $( "<td>" ).append( realm.name ) );
        row.append( $( "<td>" ).append( realm.type ) );
        row.append( $( "<td>" ).append( realm.population ) );

        return row;
    }
});
