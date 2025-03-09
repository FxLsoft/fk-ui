```yaml
title:
  zh-CN: 远程搜索
  en-US: Remote search
```

使用 `search` 事件进行远程搜索，并改变选项。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <div>Show selections after search options</div>
    <fk-select
:style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              :filter-option="false" @search="handleSearch">
      <fk-option v-for="item of options" :value="item">{{item}}</fk-option>
    </fk-select>
    <div>Hide selections after search options</div>
    <fk-select
:options="options" :style="{width:'320px'}" :loading="loading" placeholder="Please select ..." multiple
              :filter-option="false" :show-extrfk-options="false" @search="handleSearch" />
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const options = ref(['Option1', 'Option2', 'Option3']);
    const loading = ref(false);

    const handleSearch = (value) => {
      if (value) {
        loading.value = true;
        window.setTimeout(() => {
          options.value = [`${value}-Option1`, `${value}-Option2`, `${value}-Option3`]
          loading.value = false;
        }, 500)
      } else {
        options.value = []
      }
    };

    return {
      options,
      loading,
      handleSearch
    }
  },
}
</script>
```
