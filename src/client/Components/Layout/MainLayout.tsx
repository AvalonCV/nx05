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
	is_authenticated: boolean;
}
interface LayoutStyleProperties {
	styles: FelaStylesForUnconnectedProps<MainLayoutStyles>;
}

type LayoutProperties = LayoutProps & FelaWithStylesProps<LayoutProps, MainLayoutStyles>;
type HeaderProperties = LayoutStyleProperties;
type SideNavigationProperties = LayoutStyleProperties;

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

interface MenuItem {
	link_to: string;
	fa_icon: string;
	text: string;
}

const SideNavigation: React.StatelessComponent<SideNavigationProperties> = (props: SideNavigationProperties) => {
	const { styles } = props;

	const menu_items_top: MenuItem[] = [
		{ link_to: '/', fa_icon: 'fas fa-home', text: 'Home' },
		{ link_to: '', fa_icon: 'fas fa-cubes', text: 'Assortment' },
		{ link_to: '', fa_icon: 'fas fa-shopping-cart', text: 'Orders' },
		{ link_to: '', fa_icon: 'fas fa-user', text: 'Account' },
		{ link_to: '', fa_icon: 'fas fa-question-circle', text: 'Help' }
	];
	const menu_items_buttom: MenuItem[] = [{ link_to: '', fa_icon: 'fas fa-sign-out-alt', text: 'Sign out' }];

	const createList = (menu_items: MenuItem[], key: string, className: string) => {
		return (
			<ul className={className} key={key}>
				{menu_items.map((item: MenuItem, index) => {
					return (
						<li key={index} className={styles.side_navigation_list_item}>
							<Link to={item.link_to} className={styles.side_navigation_list_item_link}>
								<i className={item.fa_icon + ' ' + styles.side_navigation_list_item_icon} />
								<span className={styles.side_navigation_list_item_text}>{item.text}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className={styles.side_navigation}>
			{createList(menu_items_top, 'menu_items_top', styles.side_navigation_list_top)}
			{createList(menu_items_buttom, 'menu_items_buttom', styles.side_navigation_list_bottom)}
		</div>
	);
};

const main_layout: React.StatelessComponent<LayoutProperties> = (props: LayoutProperties) => {
	const { children, styles, is_authenticated } = props;
	return (
		<div className={styles.main_layout}>
			<Header styles={styles} />
			{is_authenticated && <SideNavigation styles={styles} />}
			<main className={styles.content_area}>
				{children}
				<div className="content_footer" />
			</main>
		</div>
	);
};

export const MainLayout = connect<LayoutProps, MainLayoutStyles>(main_layout_styles)(main_layout);
