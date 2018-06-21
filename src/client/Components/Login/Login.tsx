import * as React from 'react';

import { Link } from 'react-router-dom';

import { connect, FelaWithStylesProps } from 'react-fela';
import { LoginStyles, login_styles } from './LoginStyles';

import { connectWithRedux } from '@src/client/HOC/connectWithRedux';
import { ExecutableSessionActions } from '@src/shared/state/session';

import { VirtualList } from '@src/client/Components/VirtualList/VirtualList';

const logo = require('@src/shared/images/Puma_Cat.svg');

export interface LoginState {
}

export interface LoginProps {
}

type Properties = LoginProps & ExecutableSessionActions & FelaWithStylesProps<LoginProps, LoginStyles, {}>;

interface ListItemProperties {
	i: number; // most likely a simple index
}
const MyListItems: React.StatelessComponent<ListItemProperties> = (props: ListItemProperties) => {
	return <div style={{margin: '1em', border: '1px solid gray', padding: '1em'}}>Test [{props.i}]</div>;
};

class LoginForFela extends React.PureComponent<Properties, LoginState> {

	private items: ListItemProperties[];

	constructor(props: Properties) {
		super(props);

		this.items = [];
		for (let i = 0; i < 0; i++) {
			this.items.push({i});
		}
	}

	render(): JSX.Element {

		const VList = VirtualList<ListItemProperties>({
			items: this.items,
			contain_list_children: false,
			className: 'xxx',
			mapItemToProperties: (item: ListItemProperties) => {return {i: item.i}; }
		})(MyListItems);

		return (
			<div className={this.props.styles.container}>
				<div className={this.props.styles.login_input}>
					<h1>Welcome</h1>
					<p>Please have a great day</p>
					<ul>
						<li><Link to="/home">Home</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/pwrequest">Request</Link></li>
					</ul>
					<h3>TODO:</h3>
					<ul>
						<li><del>Virtualized List -> v1 done</del></li>
						<li>Translations -> probably react-i18next</li>
						<li>Page Transitions</li>
						<li>Background Logic / API</li>
						<li>Authentification</li>
						<li>Forms &amp; Inputs</li>
						<li>Design-Guide</li>
						<li>View / Component Splitting</li>
						<li>Pages / Title / Meta-Handling</li>
						<li>Actual Features</li>
						<li>understanding TypeScript -> probably never</li>
						<li>A more serious test coverage</li>
						<li>Performance</li>
						<li>&hellip;</li>
					</ul>

					<VList />


					<img className={this.props.styles.logo} src={logo} />
				</div>
			</div>
		);
	}
}

export const Login = connectWithRedux(
	connect<LoginProps, LoginStyles>(login_styles as LoginStyles)(LoginForFela),
	['session']
);