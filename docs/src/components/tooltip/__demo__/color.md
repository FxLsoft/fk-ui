```yaml
title:
    zh-CN: 自定义背景颜色
    en-US: Custom Background Color
```

通过 `background-color` 属性自定义背景颜色。

---

```vue { "component": true }
<template>
	<fk-space>
		<fk-tooltip content="This is tooltip content" background-color="#3491FA">
			<fk-button>#3491FA</fk-button>
		</fk-tooltip>
		<fk-tooltip content="This is tooltip content" background-color="#165DFF">
			<fk-button>#165DFF</fk-button>
		</fk-tooltip>
		<fk-tooltip content="This is tooltip content" background-color="#722ED1">
			<fk-button>#722ED1</fk-button>
		</fk-tooltip>
		<fk-tooltip
			content="This is tooltip content"
			background-color="#FFFFFF"
			:content-style="{ color: '#000', border: '1px solid var(--color-border-2)' }"
			:arrow-style="{ borderRight: '1px solid var(--color-border-2)', borderBottom: '1px solid var(--color-border-2)' }"
		>
			<fk-button>#FFFFFF</fk-button>
		</fk-tooltip>
	</fk-space>
</template>
```
