import * as React from 'react';

import { Helmet } from 'react-helmet';

export interface TodoViewState {}
export interface TodoViewProps {}

export class TodoView extends React.PureComponent<TodoViewProps, TodoViewState> {
	public render(): JSX.Element {
		return (
			<div className="">
				<Helmet>
					<title>Open Todos for NX4 (still incomplete)</title>
					<meta
						name="description"
						content="An incomplete list of things I want to play around with.. and hopefully make the prototype a bit better."
					/>
				</Helmet>

				<ul>
					<li>
						<del>Virtualized List -> v1 done</del>
					</li>
					<li>Translations -> probably react-i18next</li>
					<li>Page Transitions</li>
					<li>Background Logic / API</li>
					<li>Authentification</li>
					<li>Forms &amp; Inputs</li>
					<li>Design-Guide</li>
					<li>View / Component Splitting</li>
					<li>Pages / Title / Meta-Handling</li>
					<li>Actual Features</li>
					<li>understanding TypeScript &rarr; probably never</li>
					<li>A more serious test coverage</li>
					<li>Performance</li>
					<li>&hellip;</li>
				</ul>
			</div>
		);
	}
}
