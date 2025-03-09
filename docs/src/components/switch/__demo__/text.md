```yaml
title:
  zh-CN: 自定义文案
  en-US: Custom Text
```


自定义开关的打开/关闭状态的文字。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-switch>
      <template #checked>
        ON
      </template>
      <template #unchecked>
        OFF
      </template>
    </fk-switch>
    <fk-switch type="round">
      <template #checked>
        ON
      </template>
      <template #unchecked>
        OFF
      </template>
    </fk-switch>
  </fk-space>
</template>
```
