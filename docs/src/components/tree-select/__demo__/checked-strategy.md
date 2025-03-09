```yaml
title:
  zh-CN: 定制回填方式
  en-US: Check Strategy
```


可以通过`treeCheckStrategy`属性定制回填方式。

---


```vue { "component": true } 
<template>
  <div style="margin-bottom: 24px;">
    <fk-radio-group
      v-model="treeCheckedStrategy"
      type='button'
      @change="(value) => {
        selected = []
      }"
    >
      <fk-radio
        v-for="item in strategyOptions"
        :key="item?.value"
        :value="item?.value"
      >
        {{ item?.label }}
      </fk-radio>
    </fk-radio-group>
  </div>
  <fk-tree-select
    v-model="selected"
    :allow-search="true"
    :allow-clear="true"
    :tree-checkable="true"
    :tree-checked-strategy="treeCheckedStrategy"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const selected = ref([]);
      const treeCheckedStrategy = ref('all');

      return {
        selected,
        treeCheckedStrategy,
        strategyOptions,
        treeData,
      };
    },
  };

  const strategyOptions = [
    {
      value: 'all',
      label: 'show all'
    },
    {
      value: 'parent',
      label: 'show parent'
    },
    {
      value: 'child',
      label: 'show child'
    }
  ];

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
