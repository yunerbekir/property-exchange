import L from 'leaflet';

export const getMarkerIconSize = (mapRef) => {
    let width = 32;
    if (mapRef) {
        if (mapRef.contextValue.map.getZoom() > 12) {
            width = 32;
        } else if (mapRef.contextValue.map.getZoom() > 9) {
            width = 24;
        } else {
            width = 12;
        }
    }

    return [width, width];
};

export const deviceIconNotInTravelTime = (map) => {
    const iconSize = getMarkerIconSize(map);

    return new L.DivIcon({
        className: 'marker',
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
        html: `<div class='travel-time-device-icon-not-selected'>
                <div class='travel-time-device-icon-id-container'></div>
           </div>` // eslint-disable-line
    });
};

export const deviceIconInTravelTime = (map, id) => {
    const iconSize = getMarkerIconSize(map);

    return new L.DivIcon({
        className: 'marker',
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
        html: `<div class='travel-time-device-icon'>
                <div class='travel-time-device-icon-id-container'><div>${id}</div></div>
           </div>` // eslint-disable-line
    });
};
