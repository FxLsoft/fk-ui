```yaml
title:
  zh-CN: 自动标签宽度
  en-US: Auto Label Width
```


设置 `auto-label-width` 开启自动标签宽度。仅在 `layout="horizontal"` 布局下生效。
_* 目前仅在首次加载后生效。_

---


```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{width:'600px'}" auto-label-width @submit="handleSubmit">
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
      <fk-button html-type="submit">Submit</fk-button>
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
    const handleSubmit = (data) => {
      console.log(data)
    }

    return {
      form,
      handleSubmit
    }
  },
}
</script>
```
