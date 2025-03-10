```yaml
title:
  zh-CN: 自定义节点
  en-US: Dot
```


可以通过属性 `dotColor`, `dotType` 设置节点的颜色以及节点类型。同时可通过 `dot` 直接传入 DOM 自定义节点样式。优先级高于 `dotColor` 和 `dotType`

---


```vue { "component": true } 
<template>
  <div :style="{ display: 'flex' }">
    <fk-timeline :style="{ marginRight: '40px' }">
      <fk-timeline-item label="2020-04-12" dot-color="#00B42A">
        The first milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-05-17">
        The second milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-06-22">
        <template #dot>
          <IconClockCircle :style="{ fontSize: '12px', color: '#F53F3F' }" />
        </template>
        The third milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-06-22" dot-color="var(--color-fill-4)">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>

    <fk-timeline :style="{ marginRight: '40px' }">
      <fk-timeline-item label="2020-04-12">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
        The first milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-05-17">
        <template #dot>
          <IconCheck
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
      </fk-timeline-item>
      <fk-timeline-item label="2020-06-22">The third milestone</fk-timeline-item>
      <fk-timeline-item label="2020-06-22" dot-color="var(--color-fill-4)">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>

    <fk-timeline>
      <fk-timeline-item label="2020-04-12">The first milestone</fk-timeline-item>
      <fk-timeline-item label="2020-05-17" dot-color="var(--color-fill-4)">
        The second milestone
      </fk-timeline-item>
      <fk-timeline-item label="2020-06-22" dot-color="var(--color-fill-4)">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>
  </div>
</template>

<script>
import { IconCheck } from '@erp/common';

export default {
  components: { IconCheck },
};
</script>
```
