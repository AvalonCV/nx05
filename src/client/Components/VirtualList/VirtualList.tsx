/**
 * VirtualList
 * Renders only the visible parts of a list. It adds a list-container and list-item-elements
 * and calls the actual given item from the options.items array inside of the list item.
 * It tries to automagically measure the size and number of items in a row to calculate
 * the complete height of the container
 *
 * TODO:
 * - Contain list-items in parent-container (currently only works for window/document scroller
 * - measure performance?
 */

import * as React from 'react';

import { connect, FelaWithStylesProps } from 'react-fela';
import { VirtualListStyles, virtual_list_styles } from './VirtualListStyles';

import { throttleByRequestAnimationFrame } from '@src/shared/utils/throttle';
import { debounce } from 'lodash';
import browser_has_passive_events from '@src/shared/utils/hasPassiveEvents';

interface VirtualListState {
	first_item_index: number;
	last_item_index: number;
	items_per_row: number | null;
	item_height: number | null;
	max_visible_rows_in_viewport: number;
	first_item_distance_to_document_top: number;
	container_min_height: number | null;
	container_padding_top: number;
}

interface VirtualListProps {}

type mapItemToProperties<T> = (item: T) => object;

export interface VirtualListOptions<T> {
	items: ReadonlyArray<T>;
	contain_list_children: boolean;
	className?: string;
	mapItemToProperties?: mapItemToProperties<T>;
}

type Properties = VirtualListProps & FelaWithStylesProps<VirtualListProps, VirtualListStyles>;
type Reference = HTMLElement | null;

export const VirtualList = <T extends object>(options: VirtualListOptions<T>) => (
	ListItemComponent: React.ComponentType<T>
) => {
	const VList = class VirtualListInner extends React.PureComponent<Properties, VirtualListState> {
		private _list_container_element_ref: Reference;
		private _is_component_fully_mounted: boolean;

		constructor(props: Properties) {
			super(props);

			this.state = {
				container_min_height: 0,
				container_padding_top: 0,
				first_item_index: 0,
				last_item_index: Math.min(20, options.items.length),
				first_item_distance_to_document_top: 0,
				max_visible_rows_in_viewport: 0,
				items_per_row: null,
				item_height: null
			};

			this._list_container_element_ref = null;
			this._is_component_fully_mounted = false;
			this.setListContainerElement = this.setListContainerElement.bind(this);
			this.updateStateIfRequired = this.updateStateIfRequired.bind(this);
			this.onResize = debounce(this.onResize.bind(this), 200);
			this.onScroll = throttleByRequestAnimationFrame(this.onScroll, this);
		}

		public setListContainerElement(element: Reference): void {
			if (element) {
				this._list_container_element_ref = element;
			}
		}

		public updateStateIfRequired(): void {
			// TODO: try to make the following code more elegant!
			if (this._list_container_element_ref) {
				// TODO: item-height and / or offset calculations do not work on mobile
				// devices (or something like that).
				let max_item_heigth_of_current_row = 0;
				let current_offset_top: null | number = null;
				let calculation_done: boolean = false;

				const getDistanceToDocumentTop = (element: HTMLElement): number => {
					let retval = 0;
					while (element) {
						retval += element.offsetTop - element.scrollTop + element.clientTop;
						if (element.offsetParent instanceof HTMLElement) {
							element = element.offsetParent;
						} else {
							break;
						}
					}
					return retval;
				};

				const new_state: VirtualListState = Array.prototype.reduce.call(
					this._list_container_element_ref.children,
					(state: VirtualListState, element: HTMLElement, index: number) => {
						if (!calculation_done) {
							const { offsetTop, offsetHeight } = element;
							max_item_heigth_of_current_row = Math.max(max_item_heigth_of_current_row, offsetHeight);

							if (current_offset_top === null) {
								current_offset_top = offsetTop;
								state.items_per_row = 1;
							} else if (current_offset_top === offsetTop && state.items_per_row) {
								state.items_per_row++;
							} else {
								// Done. We have reached the next row
								state.item_height = max_item_heigth_of_current_row;
								calculation_done = true;
							}
						}
						return state;
					},
					{ ...this.state }
				);

				// number of vertical elements in viewport
				new_state.max_visible_rows_in_viewport = Math.ceil(window.innerHeight / max_item_heigth_of_current_row);
				// tslint:disable-next-line:max-line-length
				new_state.last_item_index =
					new_state.first_item_index +
					new_state.max_visible_rows_in_viewport * (new_state.items_per_row || 0);
				new_state.container_min_height = Math.ceil(
					(max_item_heigth_of_current_row * options.items.length) / (new_state.items_per_row || 0)
				);
				new_state.first_item_distance_to_document_top = getDistanceToDocumentTop(
					this._list_container_element_ref
				);

				this.setState(new_state);
			}
		}

		protected onResize(): void {
			if (this.state && this.state.item_height) {
				this.updateStateIfRequired();
			}
		}

		protected onScroll(): void {
			if (this.state && this.state.item_height) {
				// tslint:disable-next-line:max-line-length
				const number_of_new_rows = Math.floor(
					Math.max(0, window.scrollY - this.state.first_item_distance_to_document_top) /
						this.state.item_height
				);
				const last_row = this.state.max_visible_rows_in_viewport + number_of_new_rows;
				const last_item_index = last_row * (this.state.items_per_row || 0);

				if (last_item_index !== this.state.last_item_index) {
					const new_state = {
						...this.state,
						last_item_index,
						container_padding_top:
							(last_row - this.state.max_visible_rows_in_viewport) * this.state.item_height,
						first_item_index:
							last_item_index - this.state.max_visible_rows_in_viewport * (this.state.items_per_row || 0)
					};
					this.setState(new_state);
				}
			}
		}

		// lifecycle methods
		public componentDidMount(): void {
			// console.log('componentDidMount', this);

			if (!this._is_component_fully_mounted) {
				// I assume that react-fela initially adds the new classes to the <style
				// in its connect-HOC didUpdate/Mount. Because of that the list-items
				// might not have CSS applied to them -> dimensions are wrong and thus
				// the calculation is incorrect. Update the state in the next frame:
				// 1) css should then be applied to the page, and
				// 2) it should not require another re-render: the *<list>-ref-callback
				//    would lead to one re-render anyways
				window.requestAnimationFrame(this.updateStateIfRequired);
			}
			// add listeners
			window.addEventListener('scroll', this.onScroll, browser_has_passive_events ? { passive: true } : false);
			window.addEventListener('resize', this.onResize, browser_has_passive_events ? { passive: true } : false);
			this._is_component_fully_mounted = true;
		}

		public componentWillUnmount(): void {
			// remove listeners
			window.removeEventListener('scroll', this.onScroll);
			window.removeEventListener('resize', this.onResize);
		}

		public render(): JSX.Element | null {
			const items = this.state
				? options.items.slice(this.state.first_item_index, this.state.last_item_index)
				: [];
			if (this.state === null || items.length === 0) {
				return null;
			} else {
				const { first_item_index } = this.state;
				return (
					<ol
						style={{
							minHeight: this.state.container_min_height + 'px',
							paddingTop: this.state.container_padding_top + 'px'
						}}
						className={this.props.styles.list}
						ref={this.setListContainerElement}
					>
						{items.map((item, index: number) => {
							let props = {};
							if (options.mapItemToProperties) {
								props = options.mapItemToProperties(item);
							}
							return (
								<li className={this.props.styles.list_item} key={first_item_index + index}>
									<ListItemComponent {...props} />
								</li>
							);
						})}
					</ol>
				);
			}
		}
	};

	return connect<VirtualListProps, VirtualListStyles>(virtual_list_styles)(VList);
};
