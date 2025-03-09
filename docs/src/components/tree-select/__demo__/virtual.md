```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

通过指定 `treeProps.virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

---

```vue { "component": true } 
<template>
  <fk-tree-select
    :data="treeData"
    :allow-search="{
      retainInputValue: true
    }"
    multiple
    tree-checkable
    :scrollbar="false"
    tree-checked-strategy="parent"
    :tree-props="{
      virtualListProps: {
        height: 200,
      },
    }"
  />
</template>
<script>
export default {
  setup() {
    const treeData = loop();
    return {
      treeData
    }
  }
}

function loop(path = '0', level = 2) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}
</script>
```
