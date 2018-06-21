import * as React from 'react';

// import { Link } from 'react-router-dom';

export interface LoginViewState {
}

export interface LoginViewProps {
}


export class LoginView extends React.PureComponent<LoginViewProps, LoginViewState> {

	render(): JSX.Element {
		return (
			<div className="">

				Login View
			</div>
		);
	}
}