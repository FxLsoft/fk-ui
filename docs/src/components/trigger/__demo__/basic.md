```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


这个例子展示了触发器的最基础的使用。触发器默认是没有弹出框的样式的。以下示例均为官网添加的样式。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-trigger position="top" auto-fit-position :unmount-on-close="false">
      <span>Hover Me</span>
      <template #content>
        <div class="demo-basic">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
    <fk-trigger trigger="click" :unmount-on-close="false">
      <fk-button>Click Me</fk-button>
      <template #content>
        <div class="demo-basic">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
    <fk-trigger trigger="focus">
      <fk-input placeholder="Focus on me" />
      <template #content>
        <div class="demo-basic">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
  </fk-space>
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
