import screenSize from '../utilities/helpers/screenSize';

/* global google */
export default function initMap() {
    const position = new google.maps.LatLng(48.31533, 18.0877);
    const mapContainer = document.getElementById('map');

    const panorama = new google.maps.StreetViewPanorama(mapContainer, {
        addressControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        panControl: false,
        enableCloseButton: true,
        visible: false
    });
    const map = new google.maps.Map(mapContainer, {
        zoom: 16,
        center: position,
        mapTypeControl: false,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        addressControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        styles: [{ stylers: [{ saturation: -100 }] }],
        streetView: panorama
    });
    google.maps.event.addListener(map, 'resize', () => {
        map.panTo(position);
        if (screenSize.ns()) {
            map.panBy((-mapContainer.offsetWidth / 3.5), 0);
        } else {
            map.panBy(0, (mapContainer.offsetHeight / 3.5));
        }
    });

    const marker = new google.maps.OverlayView();
    marker.setValues({ position, map});
    marker.draw = function () {
        const self = this;
        let div = this.div;
        if (!div) {
            div = this.div = document.createElement('div');
            div.classList.add('c-marker');
            div.innerHTML =
                    `<div class="c-marker_shadow"></div>
                     <div class="c-marker_pulse"></div>
                     <div class="c-marker_pin-wrap">
                        <div class="c-marker_pin"></div>
                     </div>`;
            this.getPanes().overlayImage.appendChild(div);
        }
        const point = this.getProjection().fromLatLngToDivPixel(this.position);
        if (point) {
            div.style.left = `${point.x}px`;
            div.style.top = `${point.y}px`;
        }
    };

    window.addEventListener('resize', () => {
        google.maps.event.trigger(map, 'resize');
    });

    window.dispatchEvent(new Event('resize'));
}
