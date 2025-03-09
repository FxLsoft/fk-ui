```yaml
title:
  zh-CN: 网络型内嵌卡片
  en-US: Card Grid
```


通过 `Card.Grid` 来使用卡片内容区隔模式。

---


```vue { "component": true } 
<template>
  <fk-card :bordered="false" :style="{ width: '100%' }">
    <fk-card-grid
      v-for="(_, index) in new Array(7)"
      :key="index"
      :hoverable="index % 2 === 0"
      :style="{ width: '25%' }"
    >
      <fk-card
        class="card-demo"
        title="Aaaa Card"
        :bordered="false"
      >
        <template #extra>
          <fk-link>More</fk-link>
        </template>
        <p :style="{ margin: 0 }">
          {{ index % 2 === 0 ? 'Card allow to hover' : 'Card content' }}
        </p>
      </fk-card>
    </fk-card-grid>
  </fk-card>
</template>
<style scoped>
.card-demo {
  width: 100%;
}
.card-demo :deep(.fk-card-header) {
  border: none;
}
</style>
```
