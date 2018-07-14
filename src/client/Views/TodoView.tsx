import * as React from 'react';

import { Helmet } from 'react-helmet';
import { Todo } from '@src/client/Components/Todo/Todo';

export interface TodoViewState {}
export interface TodoViewProps {}

export class TodoView extends React.PureComponent<TodoViewProps, TodoViewState> {
	public render(): JSX.Element {
		return (
			<div className="" style={{ width: '100%' }}>
				<Helmet>
					<title>Open Todos for NX4 (still incomplete)</title>
					<meta
						name="description"
						content="An incomplete list of things I want to play around with.. and hopefully make the prototype a bit better."
					/>
				</Helmet>

				<Todo />
			</div>
		);
	}
}
