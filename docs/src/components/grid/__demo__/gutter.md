```yaml
title:
  zh-CN: 区块间隔
  en-US: Interval of Grid
```


通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。

---


```vue { "component": true } 
<template>
  <div>
    <p>Horizontal</p>
    <fk-row class="grid-demo" :gutter="24">
      <fk-col :span="12">
        <div>col - 12</div>
      </fk-col>
      <fk-col :span="12">
        <div>col - 12</div>
      </fk-col>
    </fk-row>
    <p>Responsive</p>
    <fk-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
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
    <p>Horizontal and Vertical</p>
    <fk-row class="grid-demo" :gutter="[24, 12]">
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
.grid-demo .fk-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .fk-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .fk-col:nth-child(2n) > div {
  background-color: rgba(var(--fkblue-6), 0.9);
}
.grid-demo .fk-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}
</style>
```
