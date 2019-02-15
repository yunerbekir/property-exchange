import { v4 } from 'node-uuid';
import * as moment from 'moment';

export class DeviceModel {
    constructor({
                    id = v4(),
                    name = '',
                    deviceId = '',
                    longitude = 0,
                    latitude = 0,
                    configuratorUrl = '',
                    params = {
                        travelTimeMarkerSettings: {},
                        addedOn: moment().valueOf()
                    },
                }) {

        this.id = id;
        this.name = name;
        this.deviceId = deviceId;
        this.longitude = +longitude;
        this.latitude = +latitude;
        this.configuratorUrl = configuratorUrl;
        this.params = { ...params };
    }

    static fromJson(json) {
        const instance = new DeviceModel({});

        instance.id = json.id;
        instance.name = json.name;
        instance.deviceId = json.deviceId;
        instance.longitude = +json.longitude;
        instance.latitude = +json.latitude;
        instance.configuratorUrl = json.configuratorUrl;
        instance.params = json.params || {
            travelTimeMarkerSettings: {},
            addedOn: moment().valueOf()
        };

        return instance;
    }
}
