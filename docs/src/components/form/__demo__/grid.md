```yaml
title:
  zh-CN: 栅格布局
  en-US: Grid
```


展示了使用栅格布局的方式。可以使用 `label-col-flex` 属性指定标签的具体宽度。

---


```vue { "component": true } 
<template>
  <fk-form :model="form">
    <fk-row :gutter="16">
      <fk-col :span="8">
        <fk-form-item field="value1" label="Value 1" label-col-flex="100px">
          <fk-input v-model="form.value1" placeholder="please enter..." />
        </fk-form-item>
      </fk-col>
      <fk-col :span="8">
        <fk-form-item field="value2" label="Value 2" label-col-flex="80px">
          <fk-input v-model="form.value2" placeholder="please enter..." />
        </fk-form-item>
      </fk-col>
      <fk-col :span="8">
        <fk-form-item field="value3" label="Value 3" label-col-flex="80px">
          <fk-input v-model="form.value3" placeholder="please enter..." />
        </fk-form-item>
      </fk-col>
    </fk-row>
    <fk-row :gutter="16">
      <fk-col :span="16">
        <fk-form-item field="value4" label="Value 4" label-col-flex="100px">
          <fk-input v-model="form.value4" placeholder="please enter..." />
        </fk-form-item>
      </fk-col>
      <fk-col :span="8">
        <fk-form-item field="value5" label="Value 5" label-col-flex="80px">
          <fk-input v-model="form.value5" placeholder="please enter..." />
        </fk-form-item>
      </fk-col>
    </fk-row>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
    })

    return {
      form,
    }
  },
}
</script>
```
