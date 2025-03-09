```yaml
title:
    zh-CN: 基本使用
    en-US: Basic Usage
```

列表的基本使用方法。可用于承载文字、列表、图片和段落。

---

```vue { "component": true }
<template>
	<fk-list :data="list" draggable>
		<template #header> List title </template>
		<template #item="{ item }">
			<fk-list-item class="list-demo-item"
				>{{ item.label }}
				<template #actions>
					<fk-button type="text" class="draggable-handle">
            <template #icon>
              <IconDragDotVertical/>
            </template>
					</fk-button>
        </template>
      </fk-list-item>
		</template>
	</fk-list>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const list = reactive([]);

for (let i = 0; i < 10; i++) {
	list.push({
		label: `label label label ${i}`,
		value: i,
	});
}
</script>
<style lang="less">
.list-demo-item {
  padding: 0 12px;
  align-items: center;
}
.draggable-handle {
  cursor: grab;
	color: var(--color-text-3);
}
.fk-list-item-action {
  li+li {
    margin-top: 0px;
  }
}
</style>
```
