```yaml
order: 4
title:
  zh-CN: 加载状态
  en-US: Loading
```


默认情况下，加载效果是不显示的，可通过设置 `showLoader` 为 `true` 显示默认加载效果。如果默认加载效果不符合需求, 还可以通过 具名插槽 `loader` 自行设置加载样式。

---


```vue { "component": true } 
<template>
  <div>
    <fk-button
      type="primary"
      style="margin-bottom: 20px;"
      @click="() => {timestamp = Date.now()}"
    >
      reload
    </fk-button>
  </div>
  <fk-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}&_=51`"
    show-loader
  />
  <fk-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}&_=52`"
    style="marginLeft: 67px"
  >
    <template #loader>
      <div class="loader-animate"/>
    </template>
  </fk-image>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const timestamp = ref('');
      return {
        timestamp,
      }
    }
  }
</script>
<style scoped>
  .loader-animate {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -60deg,
      var(--color-fill-2) 25%,
      var(--color-neutral-3) 40%,
      var(--color-fill-3) 55%
    );
    background-size: 400% 100%;
    animation: loop-circle 1.5s cubic-bezier(0.34, 0.69, 0.1, 1) infinite;
  }

  @keyframes loop-circle {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
```
