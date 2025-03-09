```yaml
title:
  zh-CN: 水平布局
  en-US: Horizontal Layout
```


通过 `justify` 来进行水平布局。

---


```vue { "component": true } 
<template>
  <div>
    <p>Arrange left</p>
    <fk-row class="grid-demo" justify="start">
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
    </fk-row>
    <p>Arrange center</p>
    <fk-row class="grid-demo" justify="center">
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
    </fk-row>
    <p>Arrange right</p>
    <fk-row class="grid-demo" justify="end">
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
    </fk-row>
    <p>Space around</p>
    <fk-row class="grid-demo" justify="space-around">
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
    </fk-row>
    <p>Space between</p>
    <fk-row class="grid-demo" justify="space-between">
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
      </fk-col>
      <fk-col :span="4">
        <div>col - 4</div>
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
.grid-demo .fk-col:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}
.grid-demo .fk-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
