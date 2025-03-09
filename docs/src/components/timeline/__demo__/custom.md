```yaml
title:
  zh-CN: 自定义标签
  en-US: Custom Label
```


可以通过 `label` 插槽自定义标签

---


```vue { "component": true } 
<template>
  <fk-timeline>
    <fk-timeline-item>
      Code Review
      <template #label>
        <fk-tag>
          <template #icon>
            <icon-check-circle-fill />
          </template>
          Passed
        </fk-tag>
      </template>
    </fk-timeline-item>
  </fk-timeline>
</template>
```
