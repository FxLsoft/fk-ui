```yaml
title:
  zh-CN: Grid 布局
  en-US: Grid Layout
```


基于 CSS 的 Grid 布局实现的布局组件，支持折叠，并且可以设置后缀节点，后缀节点会显示在一行的结尾。

---


```vue { "component": true } 

<template>
  <div style="margin-bottom: 20px;">
    <fk-typography-text>折叠：</fk-typography-text>
    <fk-switch :checked="collapsed" @click="collapsed = !collapsed" />
  </div>
  <fk-grid :cols="3" :col-gap="12" :row-gap="16" class="grid-demo-grid" :collapsed="collapsed">
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item" :offset="1">item | offset - 1</fk-grid-item>
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item" :span="3">item | span - 3</fk-grid-item>
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item">item</fk-grid-item>
    <fk-grid-item class="demo-item" suffix #="{ overflow }">
      suffix | overflow: {{ overflow }}
    </fk-grid-item>
  </fk-grid>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const collapsed = ref(false);

    return {
      collapsed
    }
  },
}
</script>

<style scoped>
.grid-demo-grid .demo-item,
.grid-demo-grid .demo-suffix {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo-grid .demo-item:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}

.grid-demo-grid .demo-item:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
