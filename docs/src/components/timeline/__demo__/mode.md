```yaml
title:
  zh-CN: 时间轴展示类型
  en-US: Mode
```


设置 `mode=alternate`时将会交替展示内容。同时可以通过设置 `TimelineItem` 的 `positon`属性控制时间轴节点的位置.

---


```vue { "component": true } 
<template>
  <fk-row justify="space-between">
    <fk-timeline mode="alternate" :style="{ flex: 1 }">
      <fk-timeline-item label="2017-03-10">The first milestone</fk-timeline-item>
      <fk-timeline-item label="2018-05-12">The second milestone</fk-timeline-item>
      <fk-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>
    <fk-timeline mode="right" :style="{ flex: 1 }">
      <fk-timeline-item label="2017-03-10">The first milestone</fk-timeline-item>
      <fk-timeline-item label="2018-05-12">The second milestone</fk-timeline-item>
      <fk-timeline-item label="2020-09-30" position="bottom">
        The third milestone
      </fk-timeline-item>
    </fk-timeline>
  </fk-row>
</template>
```
