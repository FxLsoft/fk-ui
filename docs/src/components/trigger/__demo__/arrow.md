```yaml
title:
  zh-CN: 显示箭头元素
  en-US: Show Arrow
```


通过`show-arrow`属性，可以展示默认的箭头元素。也可以通过`arrow-class`或`arrow-style`进行定制。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-trigger trigger="click">
      <fk-button>Click Me</fk-button>
      <template #content>
        <div class="demo-arrow">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
    <fk-trigger trigger="click" show-arrow>
      <fk-button>Click Me (Arrow)</fk-button>
      <template #content>
        <div class="demo-arrow">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
  </fk-space>
</template>

<style scoped>
.demo-arrow {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
}
</style>
```
