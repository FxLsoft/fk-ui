```yaml
title:
  zh-CN: 弹窗偏移量
  en-US: Popup Translate
```


通过`popup-translate`属性，可以设置弹窗在原本位置的基础上进行额外的位置调整。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-trigger>
      <fk-button>BOTTOM</fk-button>
      <template #content>
        <div class="trigger-demo-translate">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
    <fk-trigger :popup-translate="[100, 20]">
      <fk-button>BOTTOM OFFSET[100, 20]</fk-button>
      <template #content>
        <div class="trigger-demo-translate">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
    <fk-trigger :popup-translate="[-100, 20]">
      <fk-button>BOTTOM OFFSET[-100, 20]</fk-button>
      <template #content>
        <div class="trigger-demo-translate">
          <fk-empty />
        </div>
      </template>
    </fk-trigger>
  </fk-space>
</template>

<style scoped>
.trigger-demo-translate {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
```
