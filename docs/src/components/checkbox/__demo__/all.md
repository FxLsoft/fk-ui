```yaml
title:
  zh-CN: 全选
  en-US: Check All
```


在实现全选的功能时，可以通过 `indeterminate` 属性展示半选效果。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">Check All
    </fk-checkbox>
    <fk-checkbox-group v-model="data" @change="handleChange">
      <fk-checkbox value="1">Option 1</fk-checkbox>
      <fk-checkbox value="2">Option 2</fk-checkbox>
      <fk-checkbox value="3">Option 3</fk-checkbox>
    </fk-checkbox-group>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const indeterminate = ref(false)
    const checkedAll = ref(false)
    const data = ref([])

    const handleChangeAll = (value) => {
      indeterminate.value = false;
      if (value) {
        checkedAll.value = true;
        data.value = ['1', '2', '3']
      } else {
        checkedAll.value = false;
        data.value = []
      }
    }

    const handleChange = (values) => {
      if (values.length === 3) {
        checkedAll.value = true
        indeterminate.value = false;
      } else if (values.length === 0) {
        checkedAll.value = false
        indeterminate.value = false;
      } else {
        checkedAll.value = false
        indeterminate.value = true;
      }
    }

    return {
      indeterminate,
      checkedAll,
      data,
      handleChangeAll,
      handleChange
    }
  },
}
</script>
```
