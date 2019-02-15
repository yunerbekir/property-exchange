import { v4 } from 'node-uuid';

export class TravelTimeComparePeriodsChartModel {
    constructor({
                    name = '',
                    durationInMinutes = 0,
                    timezoneOffsetInMinutes = 0,
                    startDates = []
                }) {

        this.id = v4();
        this.name = name;
        this.durationInMinutes = durationInMinutes;
        this.timezoneOffsetInMinutes = timezoneOffsetInMinutes;
        this.startDates = [...startDates];
    }

    setAsNewlyAdded() {
        this.newlyAddedId = this.id;
    }

    isNewlyAdded() {
        return this.newlyAddedId;
    }

    static clone(props) {
        const instance = new TravelTimeComparePeriodsChartModel({ ...props });
        instance.id = props.id;
        return instance;
    }

    static fromJson(json) {
        const instance = new TravelTimeComparePeriodsChartModel({});

        instance.id = json.id;
        instance.name = json.name;
        instance.durationInMinutes = json.durationInMinutes || 0;
        instance.timezoneOffsetInMinutes = json.timezoneOffsetInMinutes || 0;
        instance.startDates = json.startDates || [];

        return instance;
    }
}
