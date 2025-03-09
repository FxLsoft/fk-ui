import { Commander, Component, ContentType, Registry, Selection, onBreak, useContext } from '@textbus/core';
import type { ComponentStateLiteral, Slot, Textbus } from '@textbus/core';

export interface ParagraphComponentState {
	slot: Slot;
}

// 创建 Textbus 段落组件
export class ParagraphComponent extends Component<ParagraphComponentState> {
	static componentName = 'ParagraphComponent';
	static type = ContentType.BlockComponent;

	static fromJSON(textbus: Textbus, state: ComponentStateLiteral<ParagraphComponentState>) {
		const registry = textbus.get(Registry);
		return new ParagraphComponent(textbus, {
			slot: registry.createSlot(state.slot),
		});
	}

	getSlots() {
		return [this.state.slot];
	}

	setup() {
		const context = useContext();
		const commander = useContext(Commander);
		const selection = useContext(Selection);

		onBreak(ev => {
			ev.preventDefault();
			const nextContent = ev.target.cut(ev.data.index);
			const p = new ParagraphComponent(context, {
				slot: nextContent,
			});
			commander.insertAfter(p, this);
			selection.setPosition(p.state.slot, 0);
		});
	}
}
