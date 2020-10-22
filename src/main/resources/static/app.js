var app = (function () {


    function getWeatherOfACity(ciudad) {
        var body = $("tbody");
        if (body !== null) {
            body.remove();
        }
        if (ciudad != null && ciudad != "") {
            apiclient.getWeatherOfACity(ciudad, actualizarTabla);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter a valid city!',
            })
        }

    }

    function actualizarTabla(data) {
        var tabla = $("table");
        var body = $("tbody");
        if (body != null) {
            body.remove();
        }
        tabla.append("<tbody>");
        var tblBody = $("tbody");

        var fila = '<tr> <td>' + data.countryCode + '</td> <td>' + data.city + '</td> <td>' + data.weather + '</td> <td>' + data.description + '</td> <td>' + data.temperatura + '</td><td>' + data.thermalSensation + '</td></tr>';
        tblBody.append(fila);

        tabla.append("</tbody>");

        initMap(data);
    }


    var map;

    function initMap(data) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        plotMarkers(data);
    }

    var markers;
    var bounds;

    function plotMarkers(m) {
        markers = [];
        bounds = new google.maps.LatLngBounds();

        var position = new google.maps.LatLng(m.latitud, m.longitud);

        markers.push(
            new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            })
        );

        bounds.extend(position);
        map.fitBounds(bounds);

    }


    return {
        getWeatherOfACity: getWeatherOfACity
    }

})();