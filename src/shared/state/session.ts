import { Dispatch } from 'react-redux';
import { createAction, getType, ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';


export const session_actions = {
	login: createAction('SESSION_LOGIN', resolve => {
		return (
			login: string,
			username: string
		) => resolve({login, username});
	}),
	login_fail: createAction('SESSION_LOGIN_FAILURE'),
	login_success: createAction('SESSION_LOGIN_SUCCESS'),

	logout: createAction('SESSION_LOGOUT'),
	logout_fail: createAction('SESSION_LOGOUT_FAILURE'),
	logout_success: createAction('SESSION_LOGOUT_SUCCESS'),

	refresh: createAction('SESSION_REFRESH'),
	request_pending: createAction('SESSION_REQUEST_PENDING'),
	timeout: createAction('SESSION_TIMEOUT')
};

export interface SessionState {
	is_valid: boolean;
	is_user_identified: boolean;
	is_user_authenticathed: boolean;
	is_request_pending: boolean;
}

type SessionAction = ActionType<typeof session_actions>;

export interface ExecutableSessionActions {
	executeLogin: (login: string, username: string) => void;
	executeLogout: () => void;
	executeRefresh: () => void;
}

export const getExecutableSessionActions = (dispatch: Dispatch<SessionAction>): ExecutableSessionActions => {
	return {
		executeLogin: (login: string, username: string): void => {
			dispatch({
				payload: {
					login,
					username
				},
				type: getType(session_actions.login)
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
					is_request_pending: false,
					is_user_authenticathed: false,
					is_user_identified: true,
					is_valid: true
				};
				break;

			default:
		}
		return new_state;
	} else {
		return {
			is_request_pending: false,
			is_user_authenticathed: false,
			is_user_identified: false,
			is_valid: true
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