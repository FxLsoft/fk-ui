```yaml
title:
  zh-CN: 多图预览
  en-US: Multi-image preview
```


用 `<fk-image-preview-group>` 包裹 `<fk-image>` 组件即可进行多图预览。

---


```vue { "component": true } 
<template>
  <fk-image-preview-group infinite>
    <fk-space>
      <fk-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp?_=61" width="160" />
      <fk-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp?_=62" width="160" />
      <fk-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp?_=63" width="160" />
      <fk-image src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp?_=64" width="160" />
    </fk-space>
  </fk-image-preview-group>
</template>
```
