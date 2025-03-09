```yaml
title:
  zh-CN: 复选框多选
  en-US: Checkable
```


可以通过设置 `treeCheckable` 属性开启复选框勾选。

---


```vue { "component": true } 
<template>
  <div style="marginBottom: 24px;">
    <fk-checkbox
      v-model="treeCheckStrictly"
      @change="() => {
        selected = [];
      }"
    >
    treeCheckStrictly
    </fk-checkbox>
  </div>
  <fk-tree-select
    v-model="selected"
    :allow-search="true"
    :allow-clear="true"
    :tree-checkable="true"
    :tree-check-strictly="treeCheckStrictly"
    :data="treeData"
    :tree-props="{onlyCheckLeaf: true, }"
    tree-checked-strategy="child"
    placeholder="Please select ..."
    style="width: 300px;"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const selected = ref([]);
      const treeCheckStrictly = ref(false);

      return {
        selected,
        treeCheckStrictly,
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk 0-0',
      value: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          value: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          value: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              value: 'Leaf 0-0-2-1',
              key: '0-0-2-1'
            }
          ]
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      value: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          value: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              value: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              value: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
              disabled: true
            },
          ]
        },
        {
          title: 'Leaf 0-1-2',
          value: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];
</script>
```
