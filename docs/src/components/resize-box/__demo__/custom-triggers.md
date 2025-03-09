```yaml
title:
  zh-CN: 定制伸缩杆内容
  en-US: Customize Trigger
```


可通过插槽 `resize-trigger` 定制各个方向的伸缩杆的内容。

---


```vue { "component": true } 
<template>
  <fk-resize-box
    :directions="['right', 'bottom']"
    style="width: 500px; min-width: 100px; max-width: 100%; height: 200px; text-align: center;"
  >
    <template #resize-trigger="{ direction }">
      <div
        :class="[
          `resizebox-demo`,
          `resizebox-demo-${direction === 'right' ? 'vertical' : 'horizontal'}`
        ]"
      >
        <div class="resizebox-demo-line"/>
      </div>
    </template>
    <fk-typography-paragraph>We are building the future of content discovery and creation.</fk-typography-paragraph>
    <fk-divider />
    <fk-typography-paragraph>
      Aaaa's content platforms enable people to enjoy content powered by AI technology. We
      inform, entertain, and inspire people across language, culture and geography.
    </fk-typography-paragraph>
    <fk-divider>Aaaa</fk-divider>
    <fk-typography-paragraph>Yiming Zhang is the founder and CEO of Aaaa.</fk-typography-paragraph>
  </fk-resize-box>
</template>

<style scoped>
  .resizebox-demo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
  }
  .resizebox-demo::before,
  .resizebox-demo::after {
    width: 6px;
    height: 6px;
    border: 1px solid rgb(var(--fkblue-6));
    content: '';
}
  .resizebox-demo-line {
    flex: 1;
    background-color: rgb(var(--fkblue-6));
  }
  .resizebox-demo-vertical {
    flex-direction: column;
  }
  .resizebox-demo-vertical .resizebox-demo-line {
    width: 1px;
    height: 100%;
  }
  .resizebox-demo-horizontal .resizebox-demo-line {
    height: 1px;
  }
</style>
```
