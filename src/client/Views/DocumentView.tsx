import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { DataPrivacyContent } from '@src/shared/data/data-privacy.js';
import { PageElementLoader } from '@src/client/Components/Loaders/PageElement';
import { ResponsivePicture } from '@src/client/Components/PageElements/Picture';
import { FadeTransitionContainer } from '@src/client/Components/PageElements/TransitionContainer';

export interface DocumentViewState {
	request_pending: boolean;
	document_loaded: boolean;
}
export interface DocumentViewProps {
	shorturl?: string;
	document_objid: number;
}

interface DocumentPageProps {
	children: JSX.Element | JSX.Element[];
}

const Page: React.StatelessComponent<DocumentPageProps> = (props: DocumentPageProps) => {
	return (
		<div className="page-container">
			<div className="breadcrumb">
				<Link to="/home">Home</Link> > Current > bla
			</div>
			<div className="page">
				<div className="content">{props.children}</div>
			</div>
		</div>
	);
};

// tslint:disable-next-line:max-classes-per-file
export class DocumentView extends React.Component<DocumentViewProps, DocumentViewState> {
	constructor(props: DocumentViewProps) {
		super(props);

		this.state = {
			request_pending: false,
			document_loaded: false
		};
	}

	public componentDidMount() {
		if (!this.state.document_loaded && !this.state.request_pending) {
			this.setState({ ...this.state, request_pending: true });
			window.setTimeout(() => {
				this.setState({
					request_pending: false,
					document_loaded: true
				});
				// tslint:disable-next-line:align
			}, 200);
		}
	}

	public componentWillUnmount() {
		if (this.state.request_pending) {
			// cancel request
		}
	}

	public render(): JSX.Element {
		return (
			<div className="document-view">
				<Helmet>
					<title>Document: blabla</title>
					<meta name="description" content="A nice document" />
				</Helmet>

				<Page>
					<FadeTransitionContainer transition_key={'' + this.state.document_loaded}>
						{this.state.document_loaded ? (
							<ReactMarkdown
								source={DataPrivacyContent}
								skipHtml={true}
								renderers={{
									image: props => {
										return <ResponsivePicture src={props.src} height={1200} width={1920} />;
									},

									paragraph: props => {
										if (
											props.children &&
											props.children.length === 1 &&
											(props.children[0].type === 'img' ||
												('' + props.children[0].key).indexOf('image-') === 0)
										) {
											return props.children;
										} else {
											return <p {...props} />;
										}
									}
								}}
							/>
						) : (
							<PageElementLoader />
						)}
					</FadeTransitionContainer>
				</Page>
			</div>
		);
	}
}
