```yaml
title:
  zh-CN: 栅格偏移
  en-US: Offset of Col
```


指定 `offset` 可以对栅格进行平移操作。

---


```vue { "component": true } 
<template>
  <div>
    <fk-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <fk-col :span="8">col - 8</fk-col>
      <fk-col :span="8" :offset="8">
        col - 8 | offset - 8
      </fk-col>
    </fk-row>
    <fk-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <fk-col :span="6" :offset="8">
        col - 6 | offset - 8
      </fk-col>
      <fk-col :span="6" :offset="4">
        col - 6 | offset - 4
      </fk-col>
    </fk-row>
    <fk-row class="grid-demo" style="backgroundColor: var(--color-fill-2)">
      <fk-col :span="12" :offset="8">
        col - 12 | offset - 8
      </fk-col>
    </fk-row>
  </div>
</template>

<style scoped>
.grid-demo .fk-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .fk-col:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}
.grid-demo .fk-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
