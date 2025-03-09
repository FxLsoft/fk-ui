```yaml
title:
  zh-CN: 自定义图标
  en-US: custom icon
```


自定义图标

---


```vue { "component": true } 

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <fk-space>
        <span>Type: </span>
        <fk-radio-group v-model="type">
          <fk-radio value="text">text</fk-radio>
          <fk-radio value="picture">picture</fk-radio>
          <fk-radio value="picture-card">picture-card</fk-radio>
        </fk-radio-group>
      </fk-space>
    </div>
    <fk-upload
      action="/"
      :list-type="type"
      :default-file-list="[
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-3',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]"
      :custom-icon="getCustomIcon()"
    />
  </div>
</template>

<script>
import { h, ref } from 'vue';
import { IconClose, IconFaceFrownFill, IconFileAudio, IconUpload } from '@erp/common';

export default {
  setup() {
    const type = ref('text');
    const getCustomIcon = () => {
      return {
        retryIcon: () => h(IconUpload),
        cancelIcon: () => h(IconClose),
        fileIcon: () => h(IconFileAudio),
        removeIcon: () => h(IconClose),
        errorIcon: () => h(IconFaceFrownFill),
        fileName: (file) => {
          return `文件名： ${file.name}`
        },
      };
    };

    return {
      type,
      getCustomIcon
    }
  },
};
</script>
```
