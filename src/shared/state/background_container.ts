import { Dispatch } from 'react-redux';
import { createAction, getType, ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';



export const background_container_actions = {
	hide_video: createAction('BACKGROUND_HIDE_VIDEO'),
	show_video: createAction('BACKGROUND_SHOW_VIDEO'),
	show_video_fail: createAction('SESSION_LOGIN_FAILURE'),
	show_video_success: createAction('SESSION_LOGIN_SUCCESS')
};


export interface BackgroundContainerState {
	is_video_visible: boolean;
	is_video_loading: boolean;
}

export type BackgroundContainerAction = ActionType<typeof background_container_actions>;

export interface ExecutableBackgroundContainerActions {
	showBackgroundVideo: () => void;
	hideBackgroundVideo: () => void;
}

// tslint:disable-next-line:max-line-length
export const getExecutableBackgroundContainerActions = (dispatch: Dispatch<BackgroundContainerAction>): ExecutableBackgroundContainerActions => {
	return {
		hideBackgroundVideo: (): void => {
			dispatch({ type: getType(background_container_actions.hide_video) });
		},
		showBackgroundVideo: (): void => {
			dispatch({ type: getType(background_container_actions.show_video) });
		}
	};
};

// tslint:disable-next-line:max-line-length
export const BackgroundContainerReducer = (state: BackgroundContainerState | undefined, action: BackgroundContainerAction): BackgroundContainerState => {
	if (state) {
		let new_state = state;
		switch (action.type) {
			case getType(background_container_actions.show_video):
				new_state = { ...state, is_video_visible: false, is_video_loading: true};
				break;
			case getType(background_container_actions.show_video_success):
				new_state = { ...state, is_video_visible: true, is_video_loading: false};
				break;

			case getType(background_container_actions.hide_video):
				new_state = { ...state, is_video_visible: false, is_video_loading: false};
				break;
			default:
		}
		return new_state;
	} else {
		return {
			is_video_loading: true,
			is_video_visible: false
		};
	}
};


function* handleShowVideo(): SagaIterator {

	// yield put({ type: getType(background_container_actions.show_video) });

	// try to load video
	try {
		yield put({ type: getType(background_container_actions.show_video_success) });
	} catch (e) {
		yield put({ type: getType(background_container_actions.show_video_fail) });
	}
}

export function* BackgroundContainerSaga(): SagaIterator {
	/* TODO: change to takeLeading with new Redux-Saga version */
	yield takeEvery(getType(background_container_actions.show_video), handleShowVideo);
}