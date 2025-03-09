```yaml
title:
  zh-CN: 多选
  en-US: Multiple Selection
```

`Tree` 设置 `multiple` 属性为`true`，可以启用多选。

---

```vue { "component": true } 
<template>
  <fk-checkbox
    v-model="multiple"
    style="marginBottom: 24px;"
    @change="() => {
      selectedKeys = [];
    }"
  >
    multiple
  </fk-checkbox>
  <br/>
  <fk-typography-text>
    Current: {{ selectedKeys?.join(' , ') }}
  </fk-typography-text>
  <br/>
  <fk-tree
    v-model:selected-keys="selectedKeys"
    :multiple="multiple"
    :data="treeData"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const selectedKeys = ref([]);
      const multiple = ref(true);
      const treeData = [
        {
          title: 'Trunk 0-0',
          key: '0-0',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1',
            },
            {
              title: 'Branch 0-0-2',
              key: '0-0-2',
              children: [
                {
                  title: 'Leaf',
                  key: '0-0-2-1'
                }
              ]
            },
          ],
        },
        {
          title: 'Trunk 0-1',
          key: '0-1',
          children: [
            {
              title: 'Branch 0-1-1',
              key: '0-1-1',
              children: [
                {
                  title: 'Leaf',
                  key: '0-1-1-1',
                },
                {
                  title: 'Leaf',
                  key: '0-1-1-2',
                },
              ]
            },
            {
              title: 'Leaf',
              key: '0-1-2',
            },
          ],
        },
      ];

      return {
        selectedKeys,
        multiple,
        treeData,
      };
    },
  }
</script>
```
