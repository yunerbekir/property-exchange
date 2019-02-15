import { toastr } from 'react-redux-toastr';
import { logoutAction } from '../+store/reducers/auth/logout.reducer';
import { store } from '../+store/store';

function getAuthHeader() {
    return localStorage.token ? `Bearer ${localStorage.token}` : null;
}

function getAbsoluteUrl() {
    if (window.API_BASE_URL.split(':').length === 3) {
        return window.API_BASE_URL;
    }

    return `${window.location.protocol}//${window.location.hostname}:${window.API_BASE_URL}`;
}

export const ajax = {
    get: ({ url, getData }) => {
        return fetch(`${getAbsoluteUrl()}${url}${getData ? '?data=' + encodeURIComponent(JSON.stringify(getData)) : ''}`, {
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            method: 'GET',
            mode: 'cors'
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    post: ({ url, postData }) => {
        return fetch(`${getAbsoluteUrl()}${url}`, {
            body: JSON.stringify(postData), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *omit
            headers: {
                'content-type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            method: 'POST', // *GET, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *same-origin
            redirect: 'follow', // *manual, error
            referrer: 'no-referrer', // *client
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    put: ({ url, postData }) => {
        return fetch(`${getAbsoluteUrl()}${url}`, {
            body: JSON.stringify(postData),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            method: 'PUT',
            mode: 'cors',
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    delete: ({ url }) => {
        return fetch(`${getAbsoluteUrl()}${url}`, {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                'Authorization': getAuthHeader(),
            },
            method: 'DELETE',
            mode: 'cors',
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    updateReportingTab: ({ tabId, tab }) => {
        return ajax.put({ url: `intersection-settings/tabs/${tabId}`, postData: tab });
    },
};


function checkIfSuccess(response) {
    if (!response.ok) {
        return Promise.reject({
            status: response.status,
            messagePromise: response.json()
        });
    }

    return response.json();
}

function handleSuccess(responseJson) {
    if (responseJson.confirmMessage) {
        toastr.confirm(responseJson.confirmMessage, {
            okText: 'OK',
            disableCancel: true
        });
    }
    responseJson.toastMessages.forEach(toast => toastr[toast.type](toast.message));

    return responseJson.result;
}

function handleFailure(err) {
    if (err.status === 401) {
        logoutAction()(store.dispatch, store.getState);
    }

    if (typeof err === 'string') {
        toastr.error(err);
    }
    else if (err.messagePromise && err.messagePromise.constructor === Promise) {
        err.messagePromise.then(errJson => {
            toastr.error(errJson.error, errJson.message);
        });
    } else if (err && err.message) {
        toastr.error(err.message);
    }

    throw Error('');
}
