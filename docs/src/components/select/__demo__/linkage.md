```yaml
title:
  zh-CN: 联动选择框
  en-US: Linkage Select
```


展示联动选择框的实现方法。

---


```vue { "component": true } 

<template>
  <fk-space>
    <fk-select v-model="province" :style="{width:'200px'}">
      <fk-option v-for="value of Object.keys(data)">{{value}}</fk-option>
    </fk-select>
    <fk-select v-model="city" :style="{width:'200px'}" :options="data[province] || []" />
  </fk-space>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const province = ref('Sichuan');
    const city = ref('Chengdu');
    const data = {
      Beijing: ['Haidian', 'Chaoyang', 'Changping'],
      Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
      Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
    };

    watch(province, () => {
      city.value = ''
    })

    return {
      province,
      city,
      data
    }
  },
}
</script>
```
