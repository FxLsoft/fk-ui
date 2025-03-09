```yaml
title:
  zh-CN: 自定义预览操作栏
  en-US: Preview action bar
```


通过设置 `actionsLayout` 可以调整预览操作栏中功能按钮的顺序，同时可以过滤功能按钮，只有在 `actionsLayout` 中的按钮才会出现。
此外从 `0.0.1` 开始，预览组件 `fk-image-preview` 提供了 `actions` 插槽，支持自定义额外的操作项，同时还提供了操作项组件 `fk-image-preview-action`。

---


```vue { "component": true } 
<template>
  <fk-image
    width="200"
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?_=31"
    :preview-props="{
      actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
    }"
  >
    <template #preview-actions>
      <fk-image-preview-action name="下载" @click="download"><icon-download /></fk-image-preview-action>
    </template>
  </fk-image>
</template>

<script>
export default {
  setup() {
    const download = () => {
      console.log('点击下载图片')
    };

    return {
      download
    }
  },
}
</script>
```
