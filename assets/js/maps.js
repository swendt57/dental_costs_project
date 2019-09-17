
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

//    TESTING*****************************************************************
//     let nestedData = [
//         {
//             "name": "San Diego Smile Dentistry",
//             "abbreviation": "SD Smile",
//             "address": "7710 Balboa Ave",
//             "area": "Kearny Mesa",
//             "city": "San Diego",
//             "state": "CA",
//             "zip": 92111,
//             "phone": "(619) 737-6453",
//             "latitude": 32.82225,
//             "longitude": -117.157913,
//             "procedures": {
//                 "adult_cleaning": 105,
//                 "composite_filling": 140,
//                 "extraction": 110,
//                 "root_canal": 725,
//                 "porcelain_crown": 850
//             },
//             "website": "https://sd-smile.com/",
//             "fake_data": "*"
//         },
//         {
//             "name": "Great Smile Dental",
//             "abbreviation": "Great Smile",
//             "address": "5210 Balboa Ave",
//             "area": "Clairemont",
//             "city": "San Diego",
//             "state": "CA",
//             "zip": 92117,
//             "phone": "(858) 598-5842",
//             "latitude": 32.81897,
//             "longitude": -117.183968,
//             "procedures": {
//                 "adult_cleaning": 95,
//                 "composite_filling": 120,
//                 "extraction": 110,
//                 "root_canal": 765,
//                 "porcelain_crown": 1105
//             },
//             "website": "https://great-smile-dental-orthodontics-and-periodontics.business.site/",
//             "fake_data": "*"
//         },
//         {
//             "name": "Dental Express",
//             "abbreviation": "Express",
//             "address": "4110 W Point Loma Blvd",
//             "area": "Midway",
//             "city": "San Diego",
//             "state": "CA",
//             "zip": 92110,
//             "phone": "(619) 304-7327",
//             "latitude": 32.753737,
//             "longitude": -117.223805,
//             "procedures": {
//                 "adult_cleaning": 100,
//                 "composite_filling": 120,
//                 "extraction": 125,
//                 "root_canal": 785,
//                 "porcelain_crown": 950
//             },
//             "website": "https://thedentalexpress.com/w-point-loma-blvd/",
//             "fake_data": "*"
//         }
//         ];
//
//     function parseData(data) {
//         var result = {};
//         function recurse (cur, prop) {
//             if (Object(cur) !== cur) {
//                 result[prop] = cur;
//             } else if (Array.isArray(cur)) {
//                 for(var i=0, l=cur.length; i<l; i++)
//                     recurse(cur[i], prop ? prop+"."+i : ""+i);
//                 if (l == 0)
//                     result[prop] = [];
//             } else {
//                 var isEmpty = true;
//                 for (var p in cur) {
//                     isEmpty = false;
//                     recurse(cur[p], prop ? prop+"."+p : p);
//                 }
//                 if (isEmpty)
//                     result[prop] = {};
//             }
//         }
//         recurse(data, "");
//         return result;
//     }
//
//     console.log(parseData(nestedData));


}