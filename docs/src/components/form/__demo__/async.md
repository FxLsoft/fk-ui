```yaml
title:
  zh-CN: 表单异步校验
  en-US: Asynchronous validation
```

通过异步的方法校验表单功能。

---

```vue { "component": true } 
<template>
  <fk-form ref="formRef" :model="form" :style="{width:'600px'}">
    <fk-form-item field="name" label="Username" :rules="rules">
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
      <fk-button @click="handleClick">Set Status</fk-button>
    </fk-form-item>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const formRef = ref()
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    })
    const rules = [{
      validator: (value, cb) => {
        return new Promise(resolve => {
          window.setTimeout(() => {
            if (value !== 'admin') {
              cb('name must be admin')
            }
            resolve()
          }, 2000)
        })
      }
    }];
    const handleClick = () => {
      formRef.value.setFields({
        name: {
          status: 'error',
          message: 'async name error'
        },
        post: {
          status: 'error',
          message: 'valid post'
        }
      })
    }

    return {
      formRef,
      form,
      rules,
      handleClick
    }
  },
}
</script>
```
