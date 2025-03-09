# 视频播放器

```vue { "component": true }
<template>
	<h2>组件</h2>
	<VideoPlayer v-bind="props" />
	<h2>命令模式</h2>
	<fk-button type="primary" @click="handleOpen">打开视频播放弹窗</fk-button>
	<h2>命令模式2</h2>
	<fk-button type="primary" @click="handleOpen2">打开视频播放弹窗</fk-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VideoPlayer, createVideoPlayerPop } from '@erp/biz';

const props = {
	title: '视频名称',
	src: 'https://muiplayer.js.org/media/media.mp4',
	poster: 'https://muiplayer.oss-cn-shanghai.aliyuncs.com/static/image/poster.jpg',
};

const handleOpen = () => {
	createVideoPlayerPop(props).then(res => {});
};
const props2 = {
	title: '视频名称',
	// src: 'https://static.erp.91spyc.com/default/e8317c4aa29f4c6afa1919538d279b4d.mp4',
	src: 'https://test.img.fukerp.com/default/QVI4H5709rTUZkCSar7v6ddzC5VDxlRj5tKOsIKe.m4v',
	poster: 'https://muiplayer.oss-cn-shanghai.aliyuncs.com/static/image/poster.jpg',
};
const handleOpen2 = () => {
	createVideoPlayerPop(props2).then(res => {});
};
</script>
```
