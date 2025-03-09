# 图片预览

```vue { "component": true }
<template>
	<fk-row v-for="el in imgs" :key="el">
        <img v-lazy="el" />
    </fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { vLazy } from '@erp/common';

const imgs = reactive([
	'//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//static.erp.91spyc.com/default/1EzWlF4f1I5umcaik9LU1c86zlH9ZNjIeRT99yfY.png',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	'//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
]);
</script>

<style lang="less" scoped>
img {
    width: 200px;
    margin-bottom: 10px;
}
</style>
```
