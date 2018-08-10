import * as React from 'react';
import { Link } from 'react-router-dom';

import { connect, FelaWithStylesProps } from 'react-fela';
import { LoginStyles, login_styles } from './LoginStyles';

import { connectWithRedux } from '@src/client/HOC/connectWithRedux';
import { ExecutableSessionActions } from '@src/shared/state/session';

import { Formik, FormikProps, Form, Field, FieldProps, FormikActions } from 'formik';

import { VirtualList } from '@src/client/Components/VirtualList/VirtualList';

import logo from '@src/shared/images/Puma_Cat.svg';
import logoGooglePlay from '@src/shared/images/Get_it_on_Google_play.svg';
import logoAppleAppStore from '@src/shared/images/Download_on_the_App_Store_Badge.svg';

export interface LoginState {}
export interface LoginProps {}

type Properties = LoginProps & ExecutableSessionActions & FelaWithStylesProps<LoginProps, LoginStyles, {}>;

interface ListItemProperties {
	i: number; // most likely a simple index
}
const MyListItems: React.StatelessComponent<ListItemProperties> = (props: ListItemProperties) => {
	return <div style={{ margin: '1em', border: '1px solid gray', padding: '1em' }}>Test [{props.i}]</div>;
};

interface LoginFormProps {
	login: string;
	password?: string;
}

class LoginForFela extends React.PureComponent<Properties, LoginState> {
	private items: ListItemProperties[];

	constructor(props: Properties) {
		super(props);

		this.items = [];
		for (let i = 0; i < 0; i++) {
			this.items.push({ i });
		}
	}

	public render(): JSX.Element {
		const VList = VirtualList<ListItemProperties>({
			items: this.items,
			contain_list_children: false,
			className: 'xxx',
			mapItemToProperties: (item: ListItemProperties) => ({ i: item.i })
		})(MyListItems);

		//  (e: React.FormEvent<HTMLFormElement>) => void;

		const LoginForm = (
			<Formik
				initialValues={{ login: '', password: '' }}
				onSubmit={(values: LoginFormProps, formikBag: FormikActions<LoginFormProps>) => {
					console.log('form state', JSON.stringify(values));
					window.setTimeout(() => {
						formikBag.setSubmitting(false);
						// tslint:disable-next-line:align
					}, 1000);
				}}
				render={(formikBag: FormikProps<LoginFormProps>) => (
					<Form method="get">
						<Field
							name="login"
							render={({ field }: FieldProps<LoginFormProps>) => (
								<div className="inner_field_wrapper">
									<label htmlFor="login">E-Mail</label>
									<input
										type="email"
										placeholder="Login with your email"
										autoComplete="email"
										id="login"
										required={true}
										{...field}
									/>
								</div>
							)}
						/>
						<Field
							name="password"
							render={({ field }: FieldProps<LoginFormProps>) => (
								<div className="inner_field_wrapper">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										placeholder="Something very secret"
										autoComplete="current-password"
										id="password"
										required={true}
										{...field}
									/>
								</div>
							)}
						/>
						<button disabled={formikBag.isSubmitting} type="submit">
							Submit
						</button>
					</Form>
				)}
			/>
		);

		return (
			<div className={this.props.styles.container} data-test={1}>
				<div className={this.props.styles.login_input}>
					<h1>Welcome</h1>
					<p>Please have a great day</p>
					<ul>
						<li>
							<Link to="/home">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/pwrequest">Request</Link>
						</li>
						<li>
							<Link to="/todo">TODO</Link>
						</li>
						<li>
							<Link to="/privacy-statement/d/1">Privacy Statement</Link>
						</li>
					</ul>
					{LoginForm}

					<VList />

					<img className={this.props.styles.logo} src={logo} />

					<div className={this.props.styles.footer}>
						<ul>
							<li>
								<a href="#">
									<img src={logoGooglePlay} />
								</a>
							</li>
							<li>
								<a href="#">
									<img src={logoAppleAppStore} />
								</a>
							</li>
							<li>3</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export const Login = connectWithRedux(
	// tslint:disable-next-line:no-any
	connect<LoginProps, LoginStyles>(login_styles as LoginStyles)(LoginForFela as any),
	['session']
);
