```yaml
title:
  zh-CN: 渐进加载
  en-US: Progressive Loading
```


大图可通过给 `loader` 传递一个小一些的图片，让其在原图未被加载成功时显示，以此来模拟渐进加载。

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
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}?_=81`"
  >
    <template #loader>
      <img
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?_=82"
        style="filter: blur(5px);"
      />
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
```
