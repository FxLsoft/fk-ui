import { computed, ref, toRefs, watchEffect } from 'vue';
import { getFlattenTreeData, getKey2TreeNode } from '../utils';
import { generateTreeData } from '../utils/tree-data';
import type { CheckableType, FilterTreeNode, LoadMore, Node, SelectableType, TreeFieldNames, TreeNodeData } from '../interface';

export default function useTreeData(props: {
	treeData: TreeNodeData[];
	fieldNames?: TreeFieldNames;
	selectable?: SelectableType;
	showLine?: boolean;
	blockNode?: boolean;
	checkable?: CheckableType;
	loadMore?: LoadMore;
	draggable?: boolean;
	filterTreeNode?: FilterTreeNode;
}) {
	const { treeData: propTreeData, fieldNames, selectable, showLine, blockNode, checkable, loadMore, draggable, filterTreeNode } = toRefs(props);

	const treeData = ref<Node[]>([]);

	watchEffect(() => {
		treeData.value = generateTreeData(propTreeData.value || [], {
			selectable: selectable?.value ?? false,
			showLine: !!showLine?.value,
			blockNode: !!blockNode?.value,
			checkable: checkable?.value ?? false,
			fieldNames: fieldNames?.value,
			loadMore: !!loadMore?.value,
			draggable: !!draggable?.value,
		});
	});

	const flattenTreeData = computed(() => getFlattenTreeData(treeData.value));
	const key2TreeNode = computed(() => getKey2TreeNode(flattenTreeData.value));
	/**
	 * 过滤后的节点列表
	 */
	const filterTreeData = computed(() => {
		return flattenTreeData.value.filter(node => {
			return !filterTreeNode || !filterTreeNode.value || filterTreeNode.value?.(node.treeNodeData);
		});
	});

	return { treeData, flattenTreeData, key2TreeNode, filterTreeData };
}
