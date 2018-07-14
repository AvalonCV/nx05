import * as React from 'react';
import { connect, FelaWithStylesProps } from 'react-fela';
import { Link } from 'react-router-dom';

import { TodoStyles, todo_styles } from '@src/client/Components/Todo/TodoStyles';

export interface TodoState {}
export interface TodoProps {}

type Properties = TodoProps & FelaWithStylesProps<TodoProps, TodoStyles, {}>;

class TodoForFela extends React.PureComponent<Properties, TodoState> {
	public render(): JSX.Element {
		return (
			<ul className={this.props.styles.container}>
				<li>
					<Link to="/login">Home</Link>
				</li>
				<li>
					<del>Virtualized List -> v1 done</del>
				</li>
				<li>Translations -> probably react-i18next</li>
				<li>
					<del>Page Transitions -> v1 done</del>
				</li>
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
		);
	}
}

export const Todo = connect<TodoProps, TodoStyles>(todo_styles as TodoStyles)(TodoForFela);
