```yaml
title:
  zh-CN: 允许搜索
  en-US: Allow Search
```


通过设置 `allow-search` ，可以让选择器支持对选项的搜索，配合 `filter-option` 可以自定义搜索。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-select :style="{width:'320px'}" placeholder="Please select ..." allow-search>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
    <fk-select :style="{width:'320px'}" placeholder="Please select ..." :allow-search="{ retainInputValue: true }">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
    <fk-select
:options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              @search="handleSearch" />
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const options = ref(['Option1', 'Option2', 'Option3']);
    const loading = ref(false);
    const inputValue = ref('');

    const handleSearch = (value) => {
      if (value) {
        loading.value = true;
        window.setTimeout(() => {
          options.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`]
          loading.value = false;
        }, 2000)
      } else {
        options.value = []
      }
    };

    return {
      options,
      loading,
      inputValue,
      handleSearch
    }
  },
}
</script>
```
