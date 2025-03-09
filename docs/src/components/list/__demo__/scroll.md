```yaml
title:
  zh-CN: 滚动
  en-US: Scroll
```


通过设置 `max-height` 属性限制列表的最大高度。通过 `reach-bottom` 事件可以监听列表触底的事件。

---


```vue { "component": true } 
<template>
  <div style="margin-bottom: 10px">
    <fk-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <fk-list :max-height="240" :scrollbar="scrollbar" @reach-bottom="fetchData">
    <template #header>
      List title
    </template>
    <template #scroll-loading>
      <div v-if="bottom">No more data</div>
      <fk-spin v-else />
    </template>
    <fk-list-item v-for="item of data">{{item}}</fk-list-item>
  </fk-list>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const current = ref(1);
    const bottom = ref(false);
    const data = reactive([]);
    const scrollbar = ref(true);

    const fetchData = () => {
      console.log('reach bottom!');
      if (current.value <= 5) {
        window.setTimeout(() => {
          const index = data.length;
          data.push(
            `Beijing Aaaa Technology Co., Ltd. ${index + 1}`,
            `Aaaa Technology Co., Ltd. ${index + 2}`,
            `Aaaa Technology Co., Ltd. ${index + 3}`,
            `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
            `China Beijing Aaaa Technology Co., Ltd. ${index + 5}`
          );
          current.value += 1
        }, 2000)
      } else {
        bottom.value = true
      }
    }

    return {
      current,
      bottom,
      data,
      fetchData,
      scrollbar
    }
  },
}
</script>
```
