import { Rules } from 'react-fela';
import { FelaCSSElements } from './../../../shared/css/FelaStyles';

export const virtual_list_styles: FelaCSSElements = {
	list: {
		boxSizing: 'border-box'
	},
	list_item: {
		display: 'inline-block',
		width: '200px',
		minHeight: '150px',
		border: '1px dotted lightgray',
		boxSizing: 'border-box'
	}
};

export type VirtualListStyles = typeof virtual_list_styles;
export function VirtualListStyles(props: object): Rules<object, FelaCSSElements> {
	return virtual_list_styles;
}
