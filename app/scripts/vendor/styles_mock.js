(function( $ ) {
// Use mockjax to intercept the rest calls and return data to the tests
// Clean up any mocks from previous tests first
$.mockjaxClear();

// read mocks
$.mockjax({
    url: "http://us.battle.net/api/wow/realm/status",
    type: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    proxy: "scripts/realms.json"
});

})( jQuery );

