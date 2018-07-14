import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import 'tslib';
import { SessionSaga, SessionReducer } from '@src/shared/state/session';
import { BackgroundContainerSaga, BackgroundContainerReducer } from '@src/shared/state/background_container';

// ---------------------- DYNAMIC CSS ----------------------
import { createRenderer } from 'fela';
import { Provider as FelaProvider } from 'react-fela';
// create fela renderer
const renderer = createRenderer();

// ---------------------- CLIENT SIDE ROUTING ----------------------
import { HashRouter as Router } from 'react-router-dom';

// ---------------------- APP STATE MANAGEMENT ----------------------
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import createSagaMiddleware, { SagaIterator } from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

function* rootSaga(): SagaIterator {
	yield all([fork(SessionSaga), fork(BackgroundContainerSaga)]);
}

const rootReducer = combineReducers({
	background_container: BackgroundContainerReducer,
	session: SessionReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// ---------------------- OUR OWN APPLICATION ----------------------
import App from '@src/App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<ReduxProvider store={store}>
			<FelaProvider renderer={renderer}>
				<Router>
					<App />
				</Router>
			</FelaProvider>
		</ReduxProvider>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
