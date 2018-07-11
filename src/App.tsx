import * as React from 'react';
import { connect as connectWithFela, FelaWithStylesProps } from 'react-fela';
import { withRouter } from 'react-router-dom';

import { debounce } from 'lodash';

import AppStyles, { Styles } from '@src/AppStyles';

import { ViewRoutes as MainApplicationRoutes } from '@src/client/Routes/ViewRoutesConfiguration';
import { BackgroundVideoContainer } from '@src/client/Layout/BackgroundVideo';

// const article_data = require('./shared/data/article-data.json');
// tslint:disable-next-line:max-line-length
// const preview_image_data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAB71BMVEX////+/v5gXmcfHioqKTAgHywcGiMXFiAXFRsNCxX8/Pz5+vrh4OFQUFsREBb39vfX19nT09bIyMmxr7SWlpqGhIt1dH1iYWpZWGZeXGRaWV9OTl1NTFhQT1VER1VBP0slJzImJSsjIikeGyUgHiQaGCTz8/Pl5OW9vL+5uLy3tbimpKujoqWcm6CPkpqLi5OAfYdud4JtbXZvbnJqaW1WXGplZGl4V2dWVWRYV2BRUV9WU1xHR1lHRlVKSVQ9QlBHRk0/Pko8O0o4OEo8O0EuL0E1NTsxMDszMTgnJzh5Ji8lJC0lISgVFyYbGiARESAVEx4REBoJCBADAgkAAAPy+Pn/8fHu7e7p6erp5eb34uX+3ODe3d322t3mycvJycvLysrBwcXBv8LJvsD/tLysrreysrado7Wrqq2fnqadm6GzmZzvkJmGjZXMgIZxc4SBgINxc35wb3Z8Z3T8ZXRta3H7XG7eYGzMXWlaW2hUVGdoVmNdXGD/TV/rTV/TVl5fUl3YR1h1TFb/Q1ZwUFV8S1JLSlFGRU5SRUxZP0w5P0xGRUsrL0syM0raOklKPUjsN0hYQUY+PUU/PUM2NUMnK0JNOD0qLD1GMDqYLjodIDYYHTZuJzCyHyoPEyovIykuIykdHChGHyevGyUnGyH/A7f3AAABeklEQVQoz7WRRVMDAQxGs75bpe7e4u7u7hXc3d3d3d2dH0pLpzAwMJx4k0tevksS+A8QFoAwODwaDamEb9SipVnTCl26lPXVdyaW6BKSYhWKOC9APrWXksxLknMzYuPUKQL3AHGWT3caQ1nS1MkZKjRnwBOuCpRoTFaMoE7jk7k6tK/MnYb6zby9i1KCsDCWLO3i8mR1Xf9CjdO3HGAl1wRGkIxRGTa1NjG3cvdy2Argk7B7RmJPGMWLFkD56sPV/tL8+GgvAn5WPWUii25kjQA95/m3vMuZrZiYETY0MLQJsxV1AAQd5T+bX/Xb2pSosGAOsAeL7fdR/hyxhkc/FuJ6dXxiqMh/qAkAhO1tYinOmHHSkJOukksDBF1y7vvy/MgTPDcz22jYCeeqZEEBIccFs2xwEshDc4tpypCpGZNoh8VoYYSoGVxwlGa7w2Gjjdmp6xIhy9uXAx58N1IjcLogUhbq7lkf12V7A1/kB/wKQH7740/OJf/mDXhuRi8JboUDAAAAAElFTkSuQmCC';
// const preview_image = require('./shared/images/product-hits-guetzli.jpg');

// interface Article {
// 	objid: number;
// 	color_id: string;
// 	style_id: string;
// 	name: string;
// }

// maybe use data from 'http://www.product-open-data.com/'?

// // third-party actions
// type ReactRouterAction = RouterAction | LocationChangeAction;

// export type RootAction =
//   | AppAction
//   | ReactRouterAction;

interface OwnProps {
	location: object;
}

type Props = OwnProps & FelaWithStylesProps<OwnProps, Styles, {}>;

interface AppState {
	is_session_valid: boolean;
}
interface App {
	state: AppState;
}

type AppProps = App & Props;

class App extends React.PureComponent<AppProps, object> {
	public componentDidMount() {
		let is_scroll_active = false;
		const body_class = this.props.styles.body_no_pointer_events;
		const removePointerEvents = debounce(() => {
			document.body.className = '';
			is_scroll_active = false;
			// tslint:disable-next-line:align
		}, 250);
		window.addEventListener('scroll', () => {
			if (!is_scroll_active) {
				is_scroll_active = true;
				document.body.className = body_class;
			}
			removePointerEvents();
		});
	}

	public render(): JSX.Element {
		return (
			<div className={this.props.styles.app}>
				{/*<React.StrictMode>
				</React.StrictMode>*/}
				<BackgroundVideoContainer />
				<MainApplicationRoutes location={this.props.location} />
			</div>
		);
	}
}

// tslint:disable-next-line:no-any
export default withRouter(connectWithFela<OwnProps, object, object>(AppStyles)(App) as any);
