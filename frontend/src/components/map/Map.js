import React, { useEffect, useRef, useState } from 'react';

const Map = ({ setNearbyChurches, distance }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAHbrprZ2-514b9KtV5ixaoBaQLgYq_oM0&libraries=places,geometry`;
        window.document.body.appendChild(googleMapsScript);

        googleMapsScript.addEventListener('load', () => {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 10,
            });
            setMap(mapInstance);
        });
    }, []);

    useEffect(() => {
        if (map) {
            const infoWindow = new window.google.maps.InfoWindow();

            const fetchChurches = async (pos) => {
                try {
                    const response = await fetch(`/api/churches?lat=${pos.lat}&lng=${pos.lng}&distance=${distance}`);
                    const data = await response.json();
                    if (data.length > 0) {
                        setNearbyChurches(data);
                        data.forEach(church => {
                            const marker = new window.google.maps.Marker({
                                map,
                                position: { lat: church.lat, lng: church.lng },
                                title: church.name,
                            });

                            marker.addListener('click', () => {
                                infoWindow.setContent(church.name);
                                infoWindow.open(map, marker);
                            });
                        });
                    } else {
                        fetchFromGoogle(pos);
                    }
                } catch (error) {
                    console.error('Error fetching churches from DB:', error);
                    fetchFromGoogle(pos);
                }
            };

            const fetchFromGoogle = (pos) => {
                const request = {
                    location: pos,
                    radius: distance * 1609.34, // convert miles to meters
                    keyword: 'Catholic Church',
                };

                const service = new window.google.maps.places.PlacesService(map);
                service.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        const churches = results.map(place => ({
                            name: place.name,
                            address: place.vicinity,
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            distance: window.google.maps.geometry.spherical.computeDistanceBetween(pos, place.geometry.location),
                        }));
                        setNearbyChurches(churches);
                        saveChurchesToDB(churches);

                        churches.forEach(church => {
                            const marker = new window.google.maps.Marker({
                                map,
                                position: { lat: church.lat, lng: church.lng },
                                title: church.name,
                            });

                            marker.addListener('click', () => {
                                infoWindow.setContent(church.name);
                                infoWindow.open(map, marker);
                            });
                        });
                    }
                });
            };

            const saveChurchesToDB = async (churches) => {
                try {
                    await fetch('/api/churches', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(churches),
                    });
                } catch (error) {
                    console.error('Error saving churches to DB:', error);
                }
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.setCenter(pos);
                        fetchChurches(pos);
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
        }
    }, [map, distance, setNearbyChurches]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default Map;
