```yaml
title:
  zh-CN: 全局禁用
  en-US: Global Disabled
```


通过 `disabled` 属性可以禁用整个表单。

---


```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{width:'600px'}" disabled>
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
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    })

    return {
      form,
    }
  },
}
</script>
```
