import { scaleLinear } from 'd3-scale';

function getTanOfRotation(originX, originY, destinationX, destinationY) {
    return Math.atan(Math.abs(originX - destinationX) / Math.abs(originY - destinationY)) * (180 / Math.PI);
}

const firstQuantileColor = '#5d9732';
const secondQuantileColor = '#8fe50f';
const thirdQuantileColor = '#faad14';
const fourthQuantileColor = '#f5222d';
const grayColor = 'gray';
export const getColorBetween = (range, value) => {
    const domainMin = range ? range.minTravelTimeValue : 0,
        domainMax = range ? range.maxTravelTimeValue : 0;

    const colorStep = (domainMax - domainMin) / 4;
    let backgroundColor = scaleLinear()
        .domain([domainMin, domainMin + colorStep, domainMin + 2 * colorStep, domainMin + 3 * colorStep, domainMax])
        .range([firstQuantileColor, secondQuantileColor, thirdQuantileColor, fourthQuantileColor])(value);

    if (value < domainMin) {
        backgroundColor = firstQuantileColor;
    }
    if (value > domainMax) {
        backgroundColor = fourthQuantileColor;
    }

    if (domainMax === 0 && domainMin === 0) {
        backgroundColor = grayColor;
    }

    return backgroundColor;
};

export const getDistanceInPixels = (map, origin, destination) => {
    if (!map.current) {
        return [0, 0];
    }

    const { x: originX, y: originY } = map.current.leafletElement.latLngToLayerPoint({
        lng: origin.longitude,
        lat: origin.latitude
    });

    const { x: destinationX, y: destinationY } = map.current.leafletElement.latLngToLayerPoint({
        lng: destination.longitude,
        lat: destination.latitude
    });

    const a = Math.abs(originX - destinationX);
    const b = Math.abs(originY - destinationY);

    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
};

export const getDefaultMarkerAngles = (map, origin, destination) => {
    if (!map.current) {
        return 0;
    }

    const { x: originX, y: originY } = map.current.leafletElement.latLngToLayerPoint({
        lng: origin.longitude,
        lat: origin.latitude
    });

    const { x: destinationX, y: destinationY } = map.current.leafletElement.latLngToLayerPoint({
        lng: destination.longitude,
        lat: destination.latitude
    });

    if (originX === destinationX) {
        return (originY > destinationY) ? 0 : 180;
    }

    if (originY === destinationY) {
        return (originX > destinationX) ? -90 : 90;
    }

    if (originY < destinationY) {
        return Math.sign(destinationX - originX) * (180 - getTanOfRotation(destinationX, destinationY, originX, originY));
    } else {
        return Math.sign(destinationX - originX) * (getTanOfRotation(originX, originY, destinationX, destinationY));
    }
};
