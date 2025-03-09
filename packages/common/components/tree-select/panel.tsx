import { computed, defineComponent, shallowRef, toRefs } from 'vue';
import Tree from '../tree';
import { useScrollbar } from '../_hooks/use-scrollbar';
import { Scrollbar } from '..';
import { getPrefixCls } from '../_utils/global-config';
import type { ScrollbarProps } from '../scrollbar';
import type { TreeNodeKey, TreeProps } from '../tree/interface';
import type { PropType, Slots } from 'vue';

export default defineComponent({
	name: 'TreeSelectPanel',
	components: {
		Tree,
	},
	props: {
		treeProps: {
			type: Object as PropType<Partial<TreeProps>>,
			default: () => ({}),
		},
		selectedKeys: {
			type: Array as PropType<TreeNodeKey[]>,
		},
		showCheckable: {
			type: Boolean,
		},
		treeSlots: {
			type: Object as PropType<Slots>,
			default: () => ({}),
		},
		scrollbar: {
			type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
			default: true,
		},
	},
	emits: ['change'],
	setup(props, { emit }) {
		const { showCheckable, selectedKeys, treeProps, scrollbar } = toRefs(props);
		const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar);
		const prefixCls = getPrefixCls('tree-select');
		const refTree = shallowRef();

		const computedTreeProps = computed(() => {
			return {
				...treeProps.value,
				disableSelectActionOnly: true,
				checkedKeys: showCheckable.value ? selectedKeys.value : [],
				selectedKeys: showCheckable.value ? [] : selectedKeys.value,
			};
		});

		const onSelect = (newVal: TreeNodeKey[], e: Event) => {
			if (showCheckable.value) {
				refTree.value?.toggleCheck?.(newVal[0], e);
			} else {
				emit('change', newVal);
			}
		};

		const onCheck = (newVal: TreeNodeKey[]) => {
			emit('change', newVal);
		};

		const renderTree = () => {
			return (
				<Tree
					class={`${prefixCls}-tree-container`}
					ref={refTree}
					{...computedTreeProps.value}
					onSelect={onSelect}
					onCheck={onCheck}
					v-slots={props.treeSlots}
				/>
			);
		};

		return () => {
			if (displayScrollbar.value) {
				return (
					<Scrollbar class={`${prefixCls}-tree-wrapper`} {...scrollbarProps.value}>
						{renderTree()}
					</Scrollbar>
				);
			}
			return <div class={`${prefixCls}-tree-wrapper`}>{renderTree()}</div>;
		};
	},
});
