import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import scrollIntoView from 'scroll-into-view-if-needed';
import Tooltip from '../tooltip';
import { omit } from '../_utils/omit';
import useMenu from './hooks/use-menu';
import useLevel from './hooks/use-level';
import MenuIndent from './indent.vue';
import useMenuContext from './hooks/use-menu-context';
import { useMenuDataCollectorContext } from './hooks/use-menu-data-collector';

export default defineComponent({
	name: 'MenuItem',
	inheritAttrs: false,
	props: {
		/**
		 * @zh 是否禁用
		 * @en Whether to disable
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['click'],
	/**
	 * @zh 菜单的图标
	 * @en the icon of menu item
	 * @slot icon
	 */
	/**
	 * @zh 菜单的后缀
	 * @en the icon of menu item
	 * @slot suffix
	 */
	setup(props, { emit }) {
		const { key } = useMenu();
		const { level } = useLevel();
		const menuContext = useMenuContext();
		const refItemElement = ref<HTMLDivElement>();
		const isSelected = computed(() => (menuContext.selectedKeys || []).includes(key.value));

		const menuDataCollector = useMenuDataCollectorContext();

		onMounted(() => {
			menuDataCollector?.collectMenuItem(key.value);
		});

		onUnmounted(() => {
			menuDataCollector?.removeMenuItem(key.value);
		});

		function scrollTo() {
			if (menuContext.autoScrollIntoView && refItemElement.value && isSelected.value) {
				scrollIntoView(refItemElement.value as HTMLDivElement, {
					behavior: 'smooth',
					block: 'nearest',
					scrollMode: 'if-needed',
					boundary: document.documentElement,
					...(menuContext.scrollConfig || {}),
				});
			}
		}

		let timer: number;
		onMounted(() => {
			timer = setTimeout(() => {
				scrollTo();
			}, 500);
		});
		onUnmounted(() => {
			clearTimeout(timer);
		});
		watch([isSelected], () => {
			scrollTo();
		});

		return {
			menuContext,
			level,
			isSelected,
			refItemElement,
			onClick(e: MouseEvent) {
				if (props.disabled) return;
				menuContext.onMenuItemClick && menuContext.onMenuItemClick(key.value);
				emit('click', e);
			},
		};
	},
	render() {
		const { level, menuContext, disabled, isSelected, onClick } = this;
		const { prefixCls, collapsed, inTrigger, mode, tooltipProps } = menuContext;

		const needTooltip = collapsed && !inTrigger && level === 1;
		const needTextIndent = mode === 'vertical' && level > 1;
		const children = this.$slots.default?.() || [];
		const showIndent = needTextIndent && !inTrigger && !collapsed;
		const iconElement = this.$slots.icon && this.$slots.icon();

		const content = [
			showIndent && <MenuIndent level={level} />,
			iconElement && <span class={`${prefixCls}-icon`}>{iconElement}</span>,
			showIndent || iconElement ? (
				<span
					class={[
						`${prefixCls}-item-inner`,
						{
							[`${prefixCls}-title`]: iconElement,
						},
					]}
				>
					{children}
				</span>
			) : (
				children
			),
			this.$slots.suffix && this.$slots.suffix(),
		].filter(Boolean);

		const itemElement = (
			<div
				ref="refItemElement"
				class={[
					`${prefixCls}-item`,
					{
						[`${prefixCls}-disabled`]: disabled,
						[`${prefixCls}-selected`]: isSelected,
						[`${prefixCls}-has-icon`]: iconElement,
					},
				]}
				{...this.$attrs}
				onClick={onClick}
			>
				{/* 内容 */}
				{content}
				{/* 选中的下横线 */}
				{isSelected && mode === 'horizontal' && <div class={`${prefixCls}-selected-label`} />}
			</div>
		);

		if (needTooltip) {
			const tooltipClassNames = [`${prefixCls}-item-tooltip`, tooltipProps?.class];
			return (
				<Tooltip
					trigger="hover"
					position="right"
					class={tooltipClassNames}
					{...omit(tooltipProps || {}, ['class'])}
					v-slots={{
						default: () => itemElement,
						content: () => children,
					}}
				/>
			);
		}

		return itemElement;
	},
});
