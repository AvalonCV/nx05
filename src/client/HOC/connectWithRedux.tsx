import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// custom actions
// tslint:disable-next-line:max-line-length
import { getExecutableSessionActions, SessionState } from './../../shared/state/session';
// tslint:disable-next-line:max-line-length
import {
	getExecutableBackgroundContainerActions,
	BackgroundContainerState
} from './../../shared/state/background_container';
import { Action } from 'redux';

// These props will be subtracted from original component type
interface WrappedComponentProps {
	action_types?: string[];
}

type DispatchActionTypes = 'session' | 'background_container' | undefined;
type StateProps = SessionState | BackgroundContainerState | object;

// https://github.com/piotrwitek/react-redux-typescript-guide#higher-order-components
export const connectWithRedux = <P extends WrappedComponentProps>(
	WrappedComponent: React.ComponentType<P>,
	action_types: DispatchActionTypes[]
) => {
	// These props will be added to original component type
	// interface Props {
	// 	initialCount?: number;
	// }
	// interface State {
	// 	count: number;
	// }

	// tslint:disable-next-line:no-any
	const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => {
		return action_types.reduce((prev: object, current_action: DispatchActionTypes) => {
			switch (current_action) {
				case 'session':
					return { ...prev, ...getExecutableSessionActions(dispatch) };
				case 'background_container':
					return { ...prev, ...getExecutableBackgroundContainerActions(dispatch) };
				default:
					return { ...prev };
			}
			// tslint:disable-next-line:align
		}, {});
	};

	const mapStateToProps = (state: Readonly<StateProps>): StateProps => {
		return action_types.reduce((prev: object, current_action: DispatchActionTypes) => {
			switch (current_action) {
				case 'session':
				case 'background_container':
					return { ...prev, ...state[current_action] };
				default:
					return { ...prev };
			}
			// tslint:disable-next-line:align
		}, {});
	};

	return connect(
		mapStateToProps,
		mapDispatchToProps
		// tslint:disable-next-line:no-any
	)(WrappedComponent as any);
};
