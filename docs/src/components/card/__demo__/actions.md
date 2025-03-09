```yaml
title:
  zh-CN: 支持更多内容配置
  en-US: With Actions
```


`actions` slot 可以用于展示底部按钮组。

---


```vue { "component": true } 
<template>
  <fk-card :style="{ width: '360px' }">
    <template #actions>
      <span class="icon-hover"> <IconThumbUp /> </span>
      <span class="icon-hover"> <IconShareInternal /> </span>
      <span class="icon-hover"> <IconMore /> </span>
    </template>
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)' }"
          alt="dessert"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
        />
      </div>
    </template>
    <fk-card-meta title="Card Title" description="This is the description">
      <template #avatar>
        <div
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <fk-avatar :size="24" :style="{ marginRight: '8px' }">
            A
          </fk-avatar>
          <fk-typography-text>Username</fk-typography-text>
        </div>
      </template>
    </fk-card-meta>
  </fk-card>
</template>

<script>
import {
  IconMore,
  IconShareInternal,
  IconThumbUp,
} from '@erp/common';

export default {
  components: { IconThumbUp, IconShareInternal, IconMore },
};
</script>
<style scoped>
.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}
.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
</style>
```
