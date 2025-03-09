<template>
	<header :class="classNames">
		<slot />
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
	name: 'LayoutHeader',
	/**
	 * @zh 内容
	 * @en Content
	 * @slot default
	 */
	setup() {
		const prefixCls = getPrefixCls('layout-header');
		const classNames = [prefixCls];

		return {
			classNames,
		};
	},
});
</script>
