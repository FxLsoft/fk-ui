```yaml
title:
    zh-CN: 面板分割嵌套
    en-US: Panel Split Nesting
```

面板分割可以嵌套使用。

---

```vue { "component": true }
<template>
	<div>
		<fk-split
			:style="{
				height: '200px',
				width: '100%',
				minWidth: '500px',
				border: '1px solid var(--color-border)',
			}"
		>
			<template #first>
				<fk-typography-paragraph>Left</fk-typography-paragraph>
			</template>
			<template #second>
				<div>
					<fk-split direction="vertical" :style="{ height: '200px' }">
						<template #first><fk-typography-paragraph>Top</fk-typography-paragraph></template>
						<template #second><fk-typography-paragraph>Bottom</fk-typography-paragraph></template>
					</fk-split>
				</div>
			</template>
		</fk-split>
	</div>
</template>
```
