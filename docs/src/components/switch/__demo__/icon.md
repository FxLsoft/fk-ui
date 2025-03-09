```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```


自定义开关按钮上显示的图标。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-switch>
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </fk-switch>
    <fk-switch type="round">
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </fk-switch>
    <fk-switch type="line">
      <template #checked-icon>
        <icon-check/>
      </template>
      <template #unchecked-icon>
        <icon-close/>
      </template>
    </fk-switch>
  </fk-space>
</template>
```
