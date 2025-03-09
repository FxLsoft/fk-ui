```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```


为每个节点赋予全局唯一的 `key`（必填项），`title` 为该节点显示的内容。

---


```vue { "component": true } 
<template>
  <fk-tree
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
  >
    <template #title="data, nodeStatus, node">
      <!-- 
        data 是数据模型 
        nodeStatus 节点状态(响应式，直接操作节点状态)  
        node 是节点所有方法和属性(不建议使用，破坏性大) 类型为 Node
      -->
      <fk-input v-model="data.value"/>
    </template>
  </fk-tree>
</template>
<script>
  export default {
    data() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      value: 12,
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: true,
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
