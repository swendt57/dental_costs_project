


//TODO move this to external file
const apiKey = "AIzaSyD9Hxr-55XV9DtkcRQqR7bPtFMX8EM5kqI";
const mapSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

$.getScript(mapSrc, function() {
    console.log("map api loaded");
});

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: {
            lat: 32.715736,
            lng: -117.161087
        }
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // let oldLocations = [
    //     {lat: 32.82225, lng: -117.157913},
    //     {lat: 32.81897, lng: -117.183968},
    //     {lat: 32.753737, lng: -117.223805}
    // ];
    //
    // console.log(oldLocations);

    let locations = assembleCoordinates();

    //this is a JS function, not a Google one
    let markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    let markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}

function assembleCoordinates() {
    let coordinates = [];

    $(sd_dentists).each(function(i, item){
        coordinates.push({lat: item.latitude, lng: item.longitude});
    });

    console.log(coordinates);

    return coordinates;
}