export class TravelTimesDataModel {
    constructor({
                    travelTimeId = null,
                    data = {},
                }) {
        this.travelTimeId = travelTimeId;
        this.data = { ...data };
    }

    static fromJson(json) {
        const instance = new TravelTimesDataModel({});

        instance.travelTimeId = json.travelTimeId;
        instance.data = json.data;

        return instance;
    }
}
