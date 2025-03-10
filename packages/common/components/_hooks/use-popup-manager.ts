import { onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue';
import type { Ref } from 'vue';

export type PopupType = 'popup' | 'dialog' | 'message' | 'table';

const POPUP_BASE_Z_INDEX = 3000;
const MESSAGE_BASE_Z_INDEX = 5000;
const Z_INDEX_STEP = 1;

class PopupManager {
	private popupStack = {
		popup: new Set<number>(),
		dialog: new Set<number>(),
		message: new Set<number>(),
		table: new Set<number>(),
	};

	public setCurrent = (type: PopupType, zIndex: number) => {
		this.popupStack[type].add(zIndex);
	};

	public getNextZIndex = (type: PopupType) => {
		const current = this.getCurrentZIndex(type);
		return current + Z_INDEX_STEP;
	};

	public getCurrentZIndex = (type: PopupType) => {
		const current =
			type === 'message'
				? Array.from(this.popupStack.message).pop() || MESSAGE_BASE_Z_INDEX
				: Array.from(this.popupStack.popup).pop() || POPUP_BASE_Z_INDEX;
		return current;
	};

	public add = (type: PopupType) => {
		const zIndex = this.getNextZIndex(type);
		this.popupStack[type].add(zIndex);
		if (type === 'dialog') {
			this.popupStack.popup.add(zIndex);
		}
		return zIndex;
	};

	public delete = (zIndex: number, type: PopupType) => {
		this.popupStack[type].delete(zIndex);
		if (type === 'dialog') {
			this.popupStack.popup.delete(zIndex);
		}
	};

	public isLastDialog = (zIndex: number) => {
		if (this.popupStack.dialog.size > 1) {
			return zIndex === Array.from(this.popupStack.dialog).pop();
		}
		return true;
	};
}

export const popupManager = new PopupManager();

export default function usePopupManager(
	type: PopupType,
	{
		visible,
		runOnMounted,
	}: {
		visible?: Ref<boolean>;
		runOnMounted?: boolean;
	} = {},
) {
	const zIndex = ref(0);

	const open = () => {
		zIndex.value = popupManager.add(type);
	};

	const close = () => {
		popupManager.delete(zIndex.value, type);
	};

	const isLastDialog = () => {
		if (type === 'dialog') {
			return popupManager.isLastDialog(zIndex.value);
		}
		return false;
	};

	watch(
		() => visible?.value,
		visible => {
			if (visible) {
				open();
			} else {
				close();
			}
		},
		{
			immediate: true,
		},
	);

	if (runOnMounted) {
		onMounted(() => {
			open();
		});

		onBeforeUnmount(() => {
			close();
		});
	}

	return {
		zIndex: readonly(zIndex),
		open,
		close,
		isLastDialog,
	};
}
