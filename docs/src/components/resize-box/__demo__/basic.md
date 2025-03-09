```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```


`ResizeBox` 伸缩框组件的基础使用。通过设置 `directions`，可以指定四条边中的哪几条边可以进行伸缩。

---


```vue { "component": true } 
<template>
  <div>
    <fk-resize-box
      :directions="['right', 'bottom']"
      :style="{ width: '500px', minWidth: '100px', maxWidth: '100%', height: '200px', textAlign: 'center' }"
    >
      <fk-typography-paragraph>We are building the future of content discovery and creation.</fk-typography-paragraph>
      <fk-divider />
      <fk-typography-paragraph>
        Aaaa's content platforms enable people to enjoy content powered by AI technology. We
        inform, entertain, and inspire people across language, culture and geography.
      </fk-typography-paragraph>
      <fk-divider>Aaaa</fk-divider>
      <fk-typography-paragraph>Yiming Zhang is the founder and CEO of Aaaa.</fk-typography-paragraph>
    </fk-resize-box>
  </div>
</template>
```
