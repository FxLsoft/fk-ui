```yaml
title:
  zh-CN: 定制节点图标
  en-US: Node Icon
```


节点图标可以通过 `tree` 的 `icon` 插槽全局指定，也可以通过节点的 `icon` 属性单独指定。

---


```vue { "component": true } 
<template>
  <fk-tree :data="treeData">
    <template #icon>
      <IconStar />
    </template>
  </fk-tree>
</template>
<script>
  import { h } from 'vue';
  import { IconDriveFile, IconStar } from '@erp/common';

  export default {
    components: {
      IconStar
    },
    setup() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk',
      key: 'node1',
      children: [
        {
          title: 'Leaf',
          key: 'node2',
        },
      ],
    },
    {
      title: 'Trunk',
      key: 'node3',
      children: [
        {
          title: 'Leaf',
          key: 'node4',
          icon: () => h(IconDriveFile),
        },
        {
          title: 'Leaf',
          key: 'node5',
          icon: () => h(IconDriveFile),
        },
      ],
    },
  ];
</script>
```
