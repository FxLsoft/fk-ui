```yaml
title:
  zh-CN: 滚动容器
  en-US: Scroll Container
```


通过设置 `update-at-scroll` 监听容器的滚动。

---


```vue { "component": true } 
<template>
  <div :style="{height:'100px',overflowY:'scroll'}">
    <div :style="{height:'200px'}">
      <fk-trigger trigger="click" update-at-scroll>
        <fk-button :style="{marginTop:'80px'}">Click Me</fk-button>
        <template #content>
          <div class="demo-basic">
            <fk-empty />
          </div>
        </template>
      </fk-trigger>
    </div>
  </div>
</template>

<style scoped>
.demo-basic {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
```
