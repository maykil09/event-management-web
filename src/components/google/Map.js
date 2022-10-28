import React, {useMemo, useState, useCallback, useRef} from "react";

import axios from "axios";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import {Box, IconButton, Tooltip} from "@mui/material";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "500px",
    position: "relative"
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 5,
    maxZoom: 20
};

const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?";

function Map({userAddress, setUserAddress}) {
    const [marker, setMarker] = useState({
        lat: parseFloat(userAddress.coordinates.latitude),
        lng: parseFloat(userAddress.coordinates.longitude)
    });
    const [formattedAddress, setFormattedAddress] = useState(null);

    const center = useMemo(
        () => ({
            lat: parseFloat(userAddress.coordinates.latitude),
            lng: parseFloat(userAddress.coordinates.longitude)
        }),
        []
    );

    const onMapClick = useCallback(async (e) => {
        setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
        console.log({lat: e.latLng.lat(), lng: e.latLng.lng()});
        try {
            const {data} = await axios.get(
                googleURL +
                    `latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=${
                        process.env.REACT_APP_GOOGLE_API_KEY
                    }`
            );
            console.log(data.results[0].formatted_address);
            setUserAddress({
                name: data.results[0].formatted_address,
                coordinates: {
                    latitude: parseFloat(e.latLng.lat()),
                    longitude: parseFloat(e.latLng.lng())
                }
            });
        } catch (error) {}
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(16);
        setMarker({lat, lng});
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    if (loadError) return <div> Error in loading Map</div>;

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <Box
            sx={{
                position: "relative"
            }}>
            <Search panTo={panTo} setUserAddress={setUserAddress} />
            <Locate panTo={panTo} setUserAddress={setUserAddress} />
            <GoogleMap
                zoom={14}
                center={center}
                mapContainerStyle={mapContainerStyle}
                onLoad={onMapLoad}
                options={options}
                onClick={onMapClick}>
                <MarkerF position={marker} onClick={() => console.log("try")} />
            </GoogleMap>
        </Box>
    );
}

const Locate = ({panTo, setUserAddress}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: "1rem",
                left: "90%",
                zIndex: "10"
            }}>
            <Tooltip title="Use current location">
                <IconButton
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition(
                            async (position) => {
                                console.log(position);
                                panTo({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                });
                                try {
                                    const {data} = await axios.get(
                                        googleURL +
                                            `latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                                    );
                                    setUserAddress({
                                        name: data.results[0].formatted_address,
                                        coordinates: {
                                            latitude: parseFloat(
                                                position.coords.latitude
                                            ),
                                            longitude: parseFloat(
                                                position.coords.longitude
                                            )
                                        }
                                    });
                                } catch (error) {
                                    console.log(error);
                                }
                            },
                            () => console.log("My location failed")
                        );
                    }}>
                    <MyLocationIcon fontSize="large" color="info" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

const Search = ({panTo, setUserAddress}) => {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 8.4542, lng: () => 124.6319},
            radius: 200 * 1000 // convert to kilometers
        }
    });
    return (
        <div
            style={{
                position: "absolute",
                top: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "200px",
                zIndex: "10"
            }}>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                    try {
                        const results = await getGeocode({address});
                        console.log(results[0]);
                        const {lat, lng} = await getLatLng(results[0]);
                        panTo({lat, lng});
                        setUserAddress({
                            name: results[0].formatted_address,
                            coordinates: {
                                latitude: parseFloat(lat),
                                latitude: parseFloat(lng)
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }}>
                <ComboboxInput
                    style={{
                        padding: "0.25rem",
                        fontSize: "1.5rem",
                        width: "100%"
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Enter an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({place_id, description}) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};

export default Map;
