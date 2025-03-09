```yaml
title:
  zh-CN: 输入框组合
  en-US: Input group
```


通过 `input-group` 可以组合使用输入框。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-group>
      <fk-input :style="{width:'160px'}" placeholder="first" />
      <fk-input :style="{width:'160px'}" placeholder="second" />
    </fk-input-group>
    <fk-input-group>
      <fk-select :options="['Option1','Option2','Option3']" :style="{width:'160px'}" placeholder="first" />
      <fk-input :style="{width:'160px'}" placeholder="second" />
    </fk-input-group>
  </fk-space>
</template>
```
