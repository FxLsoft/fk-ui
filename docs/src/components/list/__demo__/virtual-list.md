```yaml
title:
  zh-CN: 无限长列表
  en-US: Infinite List
```


通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。
在使用虚拟列表时，如果列表元素之间高度变化较大可能导致滚动时视口出现空白区域，可通过调整 `virtualListProps.buffer` 属性解决，[使用方式](/vue/docs/faq#%E8%99%9A%E6%8B%9F%E5%88%97%E8%A1%A8%E7%9A%84%E4%BD%BF%E7%94%A8)。

---


```vue { "component": true } 

<template>
  <h3 :style="{ color: 'var(--color-text-2)' }">10000 items</h3>
  <fk-list
    :style="{ width: `600px` }"
    :virtual-list-props="{
      height: 560,
    }"
    :data="list"
  >
    <template #item="{ item, index }">
      <fk-list-item :key="index">
        <fk-list-item-meta
          :title="item.title"
          :description="item.description"
        >
          <template #avatar>
            <fk-avatar shape="square">
              A
            </fk-avatar>
          </template>
        </fk-list-item-meta>
      </fk-list-item>
    </template>
  </fk-list>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const list = reactive(Array.from({length: 10000}).fill(null).map((_, index) => {
      const prefix = `0000${index}`.slice(-5);
      return {
        title: 'Beijing Aaaa Technology Co., Ltd.',
        description: `(${prefix}) Beijing Aaaa Technology Co., Ltd. is an enterprise located in China.`,
      };
    }))

    return {
      list
    }
  },
}
</script>
```
