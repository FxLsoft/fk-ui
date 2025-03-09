```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

---

```vue { "component": true } 
<template>
  <fk-button
    type="primary"
    :style="{ marginBottom: '20px' }"
    @click="scrollIntoView"
  >
    Scroll to 0-0-2-2, i.e. the 26th.
  </fk-button>
  <fk-tree
    ref="treeRef"
    block-node
    checkable
    :data="treeData"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const treeRef = ref();
      const treeData = loop();
      return {
        treeRef,
        treeData,
        scrollIntoView() {
          treeRef.value && treeRef.value.scrollIntoView({ key: '0-0-2-2' });
        }
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
