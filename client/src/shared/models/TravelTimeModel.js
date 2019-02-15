import { v4 } from 'node-uuid';
import * as moment from 'moment';

//1 clustering algorithm 2 percentile
export class TravelTimeModel {
    constructor({
                    name = '',
                    dateRange = null,
                    realTimeResolutionPeriodInMinutes = 0,
                    realTimeOffsetInMinutes = 0,
                    devices = [],
                    percentile = 80,
                    algorithmId = 1,
                    params = {
                        visibleOnMap: false,
                        addedOn: moment().valueOf(),
                        expectedTravelTimeRanges: {},
                        showTravelTimeValues: true
                    },
                }) {

        this.id = v4();
        this.name = name;
        this.dateRange = { ...dateRange };
        this.realTimeResolutionPeriodInMinutes = realTimeResolutionPeriodInMinutes;
        this.realTimeOffsetInMinutes = realTimeOffsetInMinutes;
        this.devices = [...devices];
        this.percentile = percentile;
        this.algorithmId = algorithmId;
        this.params = { ...params };
    }

    setAsNewlyAdded() {
        this.newlyAddedId = this.id;
    }

    isNewlyAdded() {
        return this.newlyAddedId;
    }

    static clone(props) {
        const instance = new TravelTimeModel({ ...props });
        instance.id = props.id;
        return instance;
    }

    static fromJson(json) {
        const instance = new TravelTimeModel({});

        instance.id = json.id;
        instance.name = json.name;
        instance.dateRange = Object.values(json.dateRange).find(k => k !== null) ? json.dateRange : null;
        instance.realTimeResolutionPeriodInMinutes = json.realTimeResolutionPeriodInMinutes;
        instance.realTimeOffsetInMinutes = json.realTimeOffsetInMinutes;
        instance.devices = json.devices;
        instance.percentile = json.percentile;
        instance.algorithmId = json.algorithmId;
        instance.params = json.params || {
            visibleOnMap: false,
            addedOn: moment().valueOf(),
            expectedTravelTimeRanges: {},
            showTravelTimeValues: true
        };

        return instance;
    }
}
