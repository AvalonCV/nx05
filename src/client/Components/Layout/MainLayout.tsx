/**
 * Layout used for for all 'external' visible pages / views
 * as long as the use is not yet authenticated.
 */

import * as React from 'react';
import { connect, FelaWithStylesProps } from 'react-fela';
import { Link } from 'react-router-dom';

import { MainLayoutStyles, main_layout_styles } from '@src/client/Components/Layout/MainLayoutStyles';
import { FelaStylesForUnconnectedProps } from '@src/shared/css/FelaStyles';

import HeaderLogo from '@src/shared/images/Puma_Cat_black.svg';

interface LayoutProps {
	children: JSX.Element | JSX.Element[];
}
interface HeaderProps {
	styles: FelaStylesForUnconnectedProps<MainLayoutStyles>;
}

type LayoutProperties = LayoutProps & FelaWithStylesProps<LayoutProps, MainLayoutStyles>;
type HeaderProperties = HeaderProps;

const Header: React.StatelessComponent<HeaderProperties> = (props: HeaderProperties) => {
	const { styles } = props;
	return (
		<header className={styles.header}>
			<div className={styles.header_content_area}>
				<div className={styles.header_logo_container}>
					<Link to="/">
						<img className={styles.header_logo_image} src={HeaderLogo} />
					</Link>
				</div>
				<span> | {Date.now()} | | Change Language</span>
			</div>
		</header>
	);
};

const main_external_layout: React.StatelessComponent<LayoutProperties> = (props: LayoutProperties) => {
	const { children, styles } = props;
	return (
		<div className={styles.main_layout}>
			<Header styles={styles} />
			<main className={styles.content_area}>{children}</main>
		</div>
	);
};
export const MainExternalLayout = connect<LayoutProps, MainLayoutStyles>(main_layout_styles)(main_external_layout);

const main_authenticated_layout: React.StatelessComponent<LayoutProperties> = (props: LayoutProperties) => {
	const { children } = props;
	return (
		<div className="main_layout">
			<div className="top_navigation" />
			<div className="left_navigation" />
			<div className="content_area">
				{children}
				<div className="content_footer" />
			</div>
		</div>
	);
};
// tslint:disable-next-line:max-line-length
export const MainAuthenticatedLayout = connect<LayoutProps, MainLayoutStyles>(main_layout_styles)(
	main_authenticated_layout
);
