import { v4 } from 'node-uuid';
import * as moment from 'moment';

//ROLE_VIEWER - ROLE_ADMIN
export class UserModel {
    constructor({
                    id = v4(),
                    username = '',
                    password = '',
                    params = {
                        addedOn: moment().valueOf()
                    },
                    role = 'ROLE_VIEWER'
                }) {

        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.params = { ...params };
    }

    static fromJson(json) {
        const instance = new UserModel({});

        instance.id = json.id;
        instance.username = json.username;
        instance.password = json.password;
        instance.role = json.role;
        instance.params = json.params || {
            addedOn: moment().valueOf()
        };

        return instance;
    }
}
