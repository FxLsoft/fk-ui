import { TransitionGroup, computed, defineComponent, inject } from 'vue';
import { configProviderInjectionKey } from '../config-provider/context';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';
import Checkbox from '../checkbox';
import { useI18n } from '../locale';
import CascaderColumn from './cascader-column';
import { cascaderInjectionKey } from './context';
import { getCheckedStatus } from './utils';
import type { CascaderOptionInfo } from './interface';
import type { CascaderContext } from './context';
import type { VirtualListProps } from '../_components/virtual-list-v2/interface';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'BaseCascaderPanel',
	props: {
		displayColumns: {
			type: Array as PropType<CascaderOptionInfo[][]>,
			required: true,
		},
		selectedPath: {
			type: Array as PropType<string[]>,
			required: true,
		},
		activeKey: String,
		totalLevel: {
			type: Number,
			required: true,
		},
		multiple: Boolean,
		checkStrictly: Boolean,
		loading: Boolean,
		dropdown: Boolean,
		virtualListProps: {
			type: Object as PropType<VirtualListProps>,
		},
		optionInfos: {
			type: Array as PropType<CascaderOptionInfo[]>,
		},
	},
	setup(props, { slots }) {
		const { t } = useI18n();
		const prefixCls = getPrefixCls('cascader');
		const configCtx = inject(configProviderInjectionKey, undefined);
		const cascaderCtx = inject<Partial<CascaderContext>>(cascaderInjectionKey, {});

		const checkedStatus = computed(() => {
			const checkeds =
				props.optionInfos?.map(option => {
					return getCheckedStatus(option, cascaderCtx.valueMap);
				}) || [];
			let disabled = false;
			let checked = false;
			let indeterminate = false;
			if (props.optionInfos?.length == 0) {
				disabled = true;
			} else if (checkeds.every(v => v.checked)) {
				checked = true;
			} else if (checkeds.some(v => v.indeterminate || v.checked)) {
				indeterminate = true;
			}
			return {
				disabled,
				checked,
				indeterminate,
			};
		});

		const handleCheckAll = (checked: boolean) => {
			console.log('handleCheckAll >>', checked);
			cascaderCtx.onClickOption(props.optionInfos || [], checked);
		};

		const handleInvertCheck = () => {
			const options = props.optionInfos || [];
			const values: any[] = [];
			function deepTraversal(list: CascaderOptionInfo[]) {
				for (const el of list) {
					if (Array.isArray(el.children) && el.children) {
						deepTraversal(el.children);
					} else {
						if (!el.disabled) {
							const checked = cascaderCtx.valueMap?.has(el.key);
							if (!checked) {
								values.push(el);
							}
						}
					}
				}
			}
			deepTraversal(options);
			cascaderCtx.updateValueByOption?.(values);
		};

		const renderEmpty = () => {
			return slots.empty?.() ?? configCtx?.slots.empty?.({ component: 'cascader' }) ?? <Empty />;
		};

		const renderContent = () => {
			if (props.loading) {
				return (
					<div key="panel-column-loading" class={[`${prefixCls}-panel-column`, `${prefixCls}-panel-column-loading`]}>
						<Spin />
					</div>
				);
			}
			if (props.displayColumns.length === 0) {
				return (
					<div key="panel-column-empty" class={`${prefixCls}-panel-column`}>
						<div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
					</div>
				);
			}
			return props.displayColumns.map((column, index) => (
				<CascaderColumn
					key={`column-${index}`}
					column={column}
					level={index}
					selectedPath={props.selectedPath}
					activeKey={props.activeKey}
					totalLevel={props.totalLevel}
					multiple={props.multiple}
					checkStrictly={props.checkStrictly}
					virtualListProps={props.virtualListProps}
				/>
			));
		};

		return () => (
			<TransitionGroup
				tag="div"
				name="cascader-slide"
				class={[
					`${prefixCls}-panel`,
					{
						[`${prefixCls}-dropdown-panel`]: props.dropdown,
					},
				]}
			>
				<div key="panel-body" class={[`${prefixCls}-panel-body`]}>
					{renderContent()}
				</div>
				{props.multiple && !props.checkStrictly && (
					<div key="panel-footer" class={[`${prefixCls}-panel-footer`]}>
						<Checkbox
							class={[`${prefixCls}-panel-allcheckbox`]}
							modelValue={checkedStatus.value.checked}
							indeterminate={checkedStatus.value.indeterminate}
							disabled={checkedStatus.value.disabled}
							onChange={(value: any, ev: Event) => {
								ev.stopPropagation();
								handleCheckAll(value);
							}}
						>
							{t('cascader.allCheck')}
						</Checkbox>
						<Checkbox
							class={[`${prefixCls}-panel-invertcheckbox`]}
							onChange={(value: any, ev: Event) => {
								ev.stopPropagation();
								handleInvertCheck();
							}}
						>
							{t('cascader.invertCheck')}
						</Checkbox>
					</div>
				)}
			</TransitionGroup>
		);
	},
});
