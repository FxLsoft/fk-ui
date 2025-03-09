```yaml
title:
  zh-CN: 垂直布局
  en-US: Vertical Layout
```


通过 `align` 来进行垂直布局。

---


```vue { "component": true } 
<template>
  <div>
    <p>Arrange top</p>
    <fk-row class="grid-demo" align="start">
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
    </fk-row>
    <p>Arrange center</p>
    <fk-row class="grid-demo" align="center">
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
    </fk-row>
    <p>Arrange bottom</p>
    <fk-row class="grid-demo" align="end">
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
      <fk-col :span="6">
        <div>col - 6</div>
      </fk-col>
    </fk-row>
  </div>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .fk-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .fk-col:nth-of-type(1) {
  height: 90px;
  line-height: 90px;
}
.grid-demo .fk-col:nth-of-type(2) {
  height: 48px;
  line-height: 48px;
}
.grid-demo .fk-col:nth-of-type(3) {
  height: 120px;
  line-height: 120px;
}
.grid-demo .fk-col:nth-of-type(4) {
  height: 60px;
  line-height: 60px;
}
.grid-demo .fk-col:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}
.grid-demo .fk-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
