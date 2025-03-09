```yaml
title:
  zh-CN: 表单布局
  en-US: Form Layout
```


表单支持三种布局方式： `horizontal` - 水平排列 **（默认）**， `vertical` - 垂直排列， `inline` - 行内排列。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" :style="{width: '600px'}">
    <fk-radio-group v-model="layout" type="button">
      <fk-radio value="horizontal">horizontal</fk-radio>
      <fk-radio value="vertical">vertical</fk-radio>
      <fk-radio value="inline">inline</fk-radio>
    </fk-radio-group>
    <fk-form :model="form" :layout="layout">
      <fk-form-item field="name" label="Username">
        <fk-input v-model="form.name" placeholder="please enter your username..." />
      </fk-form-item>
      <fk-form-item field="post" label="Post">
        <fk-input v-model="form.post" placeholder="please enter your post..." />
      </fk-form-item>
      <fk-form-item field="isRead">
        <fk-checkbox v-model="form.isRead">
          I have read the manual
        </fk-checkbox>
      </fk-form-item>
      <fk-form-item>
        <fk-button>Submit</fk-button>
      </fk-form-item>
    </fk-form>
    <div>
      {{ form }}
    </div>
  </fk-space>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const layout = ref('horizontal')
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    })

    return {
      layout,
      form,
    }
  },
}
</script>
```
