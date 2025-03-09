```yaml
title:
  zh-CN: 不同尺寸
  en-US: Size
```


设置 `size` 可以使用四种尺寸（small, default, large, huge）的选择器。高度分别对应 24px、28px、32px、36px。

---


```vue { "component": true } 
<template>
  <div style="margin-bottom: 20px;">
    <fk-radio-group v-model="size" type='button'>
      <fk-radio value="mini">mini</fk-radio>
      <fk-radio value="small">small</fk-radio>
      <fk-radio value="medium">medium</fk-radio>
      <fk-radio value="large">large</fk-radio>
    </fk-radio-group>
  </div>
  <fk-tree-select
    default-value="node1"
    :size="size"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const size = ref('medium');

      return {
        size,
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      title: 'node1',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'node2',
        },
      ],
    },
    {
      key: 'node3',
      title: 'node3',
      children: [
        {
          key: 'node4',
          title: 'node4',
          isLeaf: true,
        },
        {
          key: 'node5',
          title: 'node5',
          isLeaf: true,
        },
      ],
    },
  ];
</script>
```
