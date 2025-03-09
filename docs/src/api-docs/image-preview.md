# 图片预览

```vue { "component": true }
<template>
  <fk-space>
    <fk-button type="primary" @click="handleViewSingle">单图片预览</fk-button>
    <fk-button type="primary" @click="handleViewMultiple">多图片预览</fk-button>
    <fk-button type="primary" @click="handleViewCustom">自定义复制/下载</fk-button>
    <fk-button type="primary" @click="handleViewPreview">自定义预览小图</fk-button>
  </fk-space>
</template>

<script lang="ts" setup>
import { createImagePreviewPop, pop } from '@erp/biz';

const handleViewSingle = () => {
  createImagePreviewPop('//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png');
}

const handleViewMultiple = () => {
  createImagePreviewPop([
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png','//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png'
  ], 2);
}

const handleViewCustom = () => {
  createImagePreviewPop([
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png'
  ], {
    current: 1,
    copy: (url) => {
      pop.info(`复制[${url}]`);
    },
    download: (url) => {
      pop.info(`下载[${url}]`);
    }
  });
}

const handleViewPreview = () => {
  createImagePreviewPop([
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png'
  ], {
    current: 1,
    copy: (url) => {
      pop.info(`复制[${url}]`);
    },
    download: (url) => {
      pop.info(`下载[${url}]`);
    },
    previewUrlFormatter: (url) => {
      return compressImg(url, 60, 40);
    }
  });
}

function compressImg(url: string, w = 100, h = w) {
	return `${url}?x-oss-process=image/resize,m_lfit,w_${w},h_${h}`
}

</script>
```
