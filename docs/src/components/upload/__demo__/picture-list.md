```yaml
title:
  zh-CN: 图标列表样式
  en-US: Picture List
```


通过设置 `list-type="picture"` 开启图片列表样式

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" style="width: 100%">
    <fk-upload
      list-type="picture"
      accept="*"
      action="/"
      image-preview
      :default-file-list="fileList"
    />
    <fk-upload
      draggable
      list-type="picture"
      accept="*"
      action="/"
      image-preview
      :default-file-list="fileList"
    />
  </fk-space>
</template>

<script>
export default {
  setup() {
    const fileList = [
      {
        uid: '-2',
        name: '20200717-103937.png',
        url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      },
      {
        uid: '-1',
        name: 'hahhahahahaha.png',
        url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
      },
    ];

    return {
      fileList
    }
  },
};
</script>
```
