import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './index.scss';

import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import registerServiceWorker from './registerServiceWorker';

import { store, history } from './core/+store/store';
import { MainContainer } from './routes/main.container';

import * as moment from 'moment';

fontAwesomeLibrary.add(fas, far, fab);

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <MainContainer/>
                <ReduxToastr
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'
                    progressBar/>
            </div>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
    window.store = store;
    window.moment = moment;
}
process.env.NODE_ENV === 'production' ?
    console.log('Running on PRODUCTION mode') :
    console.log('Running on DEVELOPMENT mode');

registerServiceWorker();
