```yaml
title:
    zh-CN: 基本用法
    en-US: Basic
```

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

---

```vue { "component": true }
<template>
	<div>
		<fk-split
			v-model:size="size"
			:style="{
				height: '200px',
				width: '100%',
				minWidth: '500px',
				border: '1px solid var(--color-border)',
			}"
			min="80px"
		>
			<template #first>
				<fk-typography-paragraph>Left</fk-typography-paragraph>
			</template>
			<template #second>
				<fk-typography-paragraph>Right</fk-typography-paragraph>
			</template>
		</fk-split>
	</div>
</template>
<script>
export default {
	data() {
		return {
			size: 0.5,
		};
	},
};
</script>
```
