```yaml
title:
  zh-CN: 不同尺寸
  en-US: Size
```


不同尺寸的树。

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
  <fk-tree
    style="margin-right: 20px;"
    :block-node="true"
    :checkable="true"
    :size="size"
    :data="treeData" />
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
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            }
          ]
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ]
        },
      ],
    },
  ];
</script>
```
