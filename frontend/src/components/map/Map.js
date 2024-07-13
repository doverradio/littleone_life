import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ setSelectedChurch }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyAHbrprZ2-514b9KtV5ixaoBaQLgYq_oM0',
            version: 'weekly',
            libraries: ['places'],
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });

            const infoWindow = new window.google.maps.InfoWindow();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.setCenter(pos);

                        const request = {
                            location: pos,
                            radius: '16093', // 10 miles in meters
                            keyword: 'Catholic Church',
                        };

                        const service = new window.google.maps.places.PlacesService(map);
                        service.nearbySearch(request, (results, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                for (let i = 0; i < results.length; i++) {
                                    const place = results[i];
                                    const marker = new window.google.maps.Marker({
                                        map,
                                        position: place.geometry.location,
                                        title: place.name,
                                    });

                                    marker.addListener('click', () => {
                                        infoWindow.setContent(place.name);
                                        infoWindow.open(map, marker);
                                        setSelectedChurch({
                                            name: place.name,
                                            address: place.vicinity,
                                        });
                                    });
                                }
                            }
                        });
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(
                    browserHasGeolocation
                        ? 'Error: The Geolocation service failed.'
                        : 'Error: Your browser doesn\'t support geolocation.'
                );
                infoWindow.open(map);
            }
        });
    }, [setSelectedChurch]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default Map;
