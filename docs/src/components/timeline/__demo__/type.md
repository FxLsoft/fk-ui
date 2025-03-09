```yaml
title:
  zh-CN: 自定义轴线样式
  en-US: Type
```


自定义轴线的示例。

---


```vue { "component": true } 
<template>
  <fk-timeline>
    <fk-timeline-item label="2017-03-10" line-type="dashed">
      The first milestone
      <br />
      <fk-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </fk-typography-text>
    </fk-timeline-item>
    <fk-timeline-item label="2018-05-12" line-type="dashed">
      The second milestone
      <br />
      <fk-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </fk-typography-text>
    </fk-timeline-item>
    <fk-timeline-item label="2020-09-30" line-type="dashed">
      The third milestone
      <br />
      <fk-typography-text
        type="secondary"
        :style="{ fontSize: '12px', marginTop: '4px' }"
      >
        This is a descriptive message
      </fk-typography-text>
    </fk-timeline-item>
  </fk-timeline>
</template>
```
