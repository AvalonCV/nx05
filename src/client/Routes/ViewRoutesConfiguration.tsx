import * as React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

// import View-Components
import { Login } from '@src/client/Components/Login/Login';
import { MainAuthenticatedLayout, MainExternalLayout } from '@src/client/Components/Layout/MainLayout';

// put them in a separate file
const Home: React.StatelessComponent<{}> = (props) => {
	return (
		<div className="background">
			<h1>Home</h1>
			<ul>
				<li><Link to="/pwrequest">Request</Link></li>
				<li><Link to="/">Login</Link></li>
			</ul>
		</div>
	);
};
const PasswordRequest: React.StatelessComponent<{}> = (props) => {
	return (
		<div className="background">
			<h1>PW Request Page</h1>
			<ul>
				<li><Link to="/home">Home</Link></li>
				<li><Link to="/">Login</Link></li>
			</ul>
		</div>
	);
};

interface ViewRouteElement {
	path: string;
	exact?: boolean;
	sensitive?: boolean;
	component: React.ComponentType;
	needs_authentification: boolean;
}

const route_configuration: ViewRouteElement[] = [{
		component: Home,
		exact: true,
		needs_authentification: true,
		path: '/home',
		sensitive: false
	}, {
		component: PasswordRequest,
		exact: true,
		needs_authentification: false,
		path: '/pwrequest',
		sensitive: false
	}, {
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/login',
		sensitive: false
	}, {
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/',
		sensitive: false
	}
];

const is_session_authenticaed = false;

const RouteHandler = (props: ViewRouteElement): JSX.Element | null => {
	const { path, needs_authentification, component: Component, exact = true, sensitive = true } = props;

	if (Component) {
		if (is_session_authenticaed) {
			return (
				<MainAuthenticatedLayout>
					<div>Logged In</div>
				</MainAuthenticatedLayout>
			);
		} else if (needs_authentification) {
			return <Redirect to="/" />;
		} else {
			return (
				<Route
					path={path}
					exact={exact}
					sensitive={sensitive}
					render={(newprops: object) => {
						return (
							<MainExternalLayout>
								<Component />
							</MainExternalLayout>
						);
					}}
				/>
			);
		}
	} else {
		return null;
	}
};


export const ViewRoutes = (props: object): JSX.Element => {
	return (
		<Switch>
			{route_configuration.map((route_element, index) => {
				return <RouteHandler key={index} {...route_element} />;
			})};
		</Switch>
	);
};