
$(document).ready
{

    //TODO move this to external file
    const apiKey = "AIzaSyD9Hxr-55XV9DtkcRQqR7bPtFMX8EM5kqI";
    const mapSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

    $.getScript(mapSrc, function () {
        console.log("map api loaded");
    });

    function initMap() {
        let sdMap = new google.maps.Map(document.getElementById("sdMap"), {
            zoom: 11,
            center: {
                lat: 32.808800,
                lng: -117.152970
            }
        });

        let tjMap = new google.maps.Map(document.getElementById("tjMap"), {
            zoom: 12,
            center: {
                lat: 32.516529,
                lng: -117.016479
            }
        });

        let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let sdLocations = assembleCoordinates(sd_dentists);
        let tjLocations = assembleCoordinates(tj_dentists);

        //this is a JS function, not a Google one
        let sdMarkers = sdLocations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        let tjMarkers = tjLocations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        let sdMarkerCluster = new MarkerClusterer(sdMap, sdMarkers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        let tjMarkerCluster = new MarkerClusterer(tjMap, tjMarkers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    function assembleCoordinates(dentists) {
        let coordinates = [];

        $(dentists).each(function (i, item) {
            coordinates.push({lat: item.latitude, lng: item.longitude});
        });

        return coordinates;
    }

}