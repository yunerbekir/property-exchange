This describes the api end points
 + Base url: ``http://localhost:7070/api/``
 + The frontend will be responsible for creating the IDS of the data
 + Response structure:
    + HTTP response codes should be used:
        + 20*s for success
        + 40*s for client errors
            + 400 Bad Request - in cases where the user input is not correct (examples: username and password does not match; old with new password does not match)
            + 401 Unauthorized - in cases where the front end does not send Authorization header or it is expired
            + 403 Forbidden - in cases where you are logged, but do not have permissions (example: view user trying to create a device or user)
            + 404 - API NOT FOUND
        + 50*s for server errors
    + Error response structure: ``{error:'string', stack:'stack trace for development only'}``
    + Success response structure: ```{
                                            toastMessages: toastMessages || [{type:'/*one of 'light', 'message', 'info', 'success', 'warning', 'error'*/', message:'string'}],
                                            confirmMessage: 'string',
                                            result: {data from each request}
                                        }```
    + Authentication: the client will send a token in **Authorization** header
     



|METHOD | API | PARAMS | RESPONSE | DETAILS |
|-----|--------|-------------|-----|-------------|
| POST | login | {username, password} | {token} | after successful login the backend will return token, which the frontend can parse the public part and send it on each request |
| POST | logout      | NO PARAMS | EMPTY | The front-end will erase the token |
| POST | changePassword | {oldPassword, newPassword} | EMPTY |
| GET | users | NO PARAMS | [users] |
| POST | users | {id, username, password} |  EMPTY | |
| DELETE | users/:userId | NO PARAMS | EMPTY | |
| GET | devices | NO PARAMS | [devices] |
| POST | devices | {id, name, longitude, latitude, configuratorUrl} | EMPTY | |
| PUT | devices | {id, name, longitude, latitude, configuratorUrl} | EMPTY | |
| DELETE | devices/:deviceId | NO PARAMS | EMPTY | |
| GET | travelTimes | NO PARAMS | [travelTimes] | |
| POST | travelTimes | {id, name, dateObject, devicesList } | EMPTY | |
| PUT | travelTimes | {id, name, dateObject, devicesList } | EMPTY | |
| DELETE | travelTimes/:travelTimeId | NO PARAMS | EMPTY | |
| GET | travelTimeData | {date:{}, devicePairs:[]} | [data] | |
| POST | comparePeriodsCharts/:travelTimeId | {id, name, dateRange, comareStartDates:[] } | EMPTY | |
| PUT | /comparePeriodsCharts | {id, name, dateRange, comareStartDates:[] } | EMPTY | |
| DELETE | comparePeriodsCharts/:comparePeriodsChartId | NO PARAMS | EMPTY | |
| GET | comparePeriodsCharts | NO PARAMS | [travelTimeComparePeriodsCharts] | |
| GET | comparePeriodsCharts/:comparePeriodsChartId | {origin, destination} | [data] | |
