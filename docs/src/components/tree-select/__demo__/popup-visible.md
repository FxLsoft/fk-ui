```yaml
title:
  zh-CN: 控制下拉框的展开收起
  en-US: Control Collapse
```


通过 `popupVisible` (支持 `v-model`) 控制下拉框的展开和收起。

---


```vue { "component": true } 
<template>
  <div style="margin-bottom: 24px;">
    <fk-button type="primary" @click="onClick">toggle</fk-button>
  </div>
  <fk-tree-select
    :popup-visible="popupVisible"
    :allow-clear="true"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const popupVisible = ref(false);
      function onClick() {
        popupVisible.value = !popupVisible.value;
      }

      return {
        onClick,
        popupVisible,
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      title: 'Trunk',
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];
</script>
```
