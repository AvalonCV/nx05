import { Dispatch } from 'react-redux';
import { createAction, getType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { $call } from 'utility-types';


export const session_actions = {
	login: createAction('SESSION_LOGIN', (login: string, username: string) => ({
		type: 'SESSION_LOGIN',
		login,
		username
	})),
	login_success: createAction('SESSION_LOGIN_SUCCESS'),
	login_fail: createAction('SESSION_LOGIN_FAILURE'),

	logout: createAction('SESSION_LOGOUT'),
	logout_success: createAction('SESSION_LOGOUT_SUCCESS'),
	logout_fail: createAction('SESSION_LOGOUT_FAILURE'),

	timeout: createAction('SESSION_TIMEOUT'),
	refresh: createAction('SESSION_REFRESH'),
	request_pending: createAction('SESSION_REQUEST_PENDING')
};

export interface SessionState {
	is_valid: boolean;
	is_user_identified: boolean;
	is_user_authenticathed: boolean;
	is_request_pending: boolean;
}


const returnsOfActions = Object.values(session_actions).map($call);
export type SessionAction = typeof returnsOfActions[number];

export interface ExecutableSessionActions {
	executeLogin: (login: string, username: string) => void;
	executeLogout: () => void;
	executeRefresh: () => void;
}

export const getExecutableSessionActions = (dispatch: Dispatch<SessionAction>): ExecutableSessionActions => {
	return {
		executeLogin: (login: string, username: string): void => {
			dispatch({
				type: getType(session_actions.login),
				login,
				username
			});
		},
		executeLogout: (): void => {
			dispatch({ type: getType(session_actions.logout) });
		},
		executeRefresh: (): void => {
			dispatch({ type: getType(session_actions.refresh) });
		}
	};
};

export const SessionReducer = (state: SessionState | undefined, action: SessionAction): SessionState => {
	if (state) {
		let new_state = state;
		switch (action.type) {
			case getType(session_actions.request_pending):
				new_state = { ...state, is_request_pending: true };
				break;

			case getType(session_actions.logout_success):
				new_state = {
					is_valid: true,
					is_user_identified: true,
					is_user_authenticathed: false,
					is_request_pending: false
				};
				break;

			default:
		}
		return new_state;
	} else {
		return {
			is_valid: true,
			is_user_identified: false,
			is_user_authenticathed: false,
			is_request_pending: false
		};
	}
};


function* handleLogout(): SagaIterator {

	yield put({ type: getType(session_actions.request_pending) });

	// dispatch to
	// * API - if we are online, or
	// * do noting, but set state to inactive (if offline), or
	// * logout user (if we are the offline app with multiple users)

	yield put({ type: getType(session_actions.logout_success) });
}

export function* SessionSaga(): SagaIterator {
	/* TODO: change to takeLeading with new Redux-Saga version */
	yield takeEvery(getType(session_actions.logout), handleLogout);
}