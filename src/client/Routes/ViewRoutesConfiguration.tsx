import * as React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import { Location } from 'history';
import Helmet from 'react-helmet';

import { MainAuthenticatedLayout, MainExternalLayout } from '@src/client/Components/Layout/MainLayout';
// import View-Components
import { Login } from '@src/client/Components/Login/Login';
import { TodoView } from '@src/client/Views/TodoView';
import { DocumentView } from '@src/client/Views/DocumentView';
import { FadeTransitionContainer } from '@src/client/Components/PageElements/TransitionContainer';

// put them in a separate file
const Home: React.StatelessComponent<{}> = props => {
	return (
		<div className="background">
			<h1>Home</h1>
			<ul>
				<li>
					<Link to="/pwrequest">Request</Link>
				</li>
				<li>
					<Link to="/">Login</Link>
				</li>
			</ul>
		</div>
	);
};
const PasswordRequest: React.StatelessComponent<{}> = props => {
	return (
		<div className="background">
			<h1>PW Request Page</h1>
			<ul>
				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/">Login</Link>
				</li>
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

/*
	Put these in /Views/* and register them
	a) when loading the site and
	b) any needs_authentification=true views if the login action has been successful
*/
const route_configuration: ViewRouteElement[] = [
	{
		component: Home,
		exact: true,
		needs_authentification: true,
		path: '/home',
		sensitive: false
	},
	{
		component: PasswordRequest,
		exact: true,
		needs_authentification: false,
		path: '/pwrequest',
		sensitive: false
	},
	{
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/login',
		sensitive: false
	},
	{
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/register',
		sensitive: false
	},
	{
		component: TodoView,
		exact: true,
		needs_authentification: false,
		path: '/todo',
		sensitive: false
	},
	{
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/privacy',
		sensitive: false
	},
	{
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/legal',
		sensitive: false
	},
	{
		component: Login,
		exact: true,
		needs_authentification: false,
		path: '/',
		sensitive: false
	},
	{
		component: DocumentView,
		exact: true,
		needs_authentification: false,
		path: '/:shorturl?/d/:document_objid', // e.g. /privacy-statement/d/123
		sensitive: false
	}
];

const is_session_authenticaed = false;

const RouteHandler = (props: ViewRouteElement): JSX.Element | null => {
	const { path, needs_authentification, component: Component, exact = true, sensitive = true } = props;

	if (Component) {
		if (!is_session_authenticaed && needs_authentification) {
			return <Redirect to="/login" />;
		} else {
			return (
				<Route
					path={path}
					exact={exact}
					sensitive={sensitive}
					// tslint:disable-next-line:typedef
					children={({ match: match }) => {
						return (
							<React.Fragment>
								<Helmet>
									<title>NX04</title>
									<meta name="description" content="" />
								</Helmet>
								<Component {...(match ? match.params : {})} />
							</React.Fragment>
						);
					}}
				/>
			);
		}
	} else {
		return null;
	}
};

/* 	use the location object to have a property that changes
	every time a link is clicked -> external libraries (like redux)
	implement a shallow compare algorithm to determine if connected
	components should be re-drawn.
	-> if nothing (but the URL) changes the components will not update
	(https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates)
*/
interface RouterStatus {
	location: Location;
}

export const ViewRoutes = (props: RouterStatus): JSX.Element => {
	const LayoutComponent = is_session_authenticaed ? MainAuthenticatedLayout : MainExternalLayout;

	const routes = route_configuration.map((route_element, index) => {
		return <RouteHandler key={index} {...route_element} />;
	});

	return (
		<LayoutComponent>
			<FadeTransitionContainer transition_key={props.location.pathname} timeout={300}>
				<Switch location={props.location}>{routes}</Switch>
			</FadeTransitionContainer>
		</LayoutComponent>
	);
};
