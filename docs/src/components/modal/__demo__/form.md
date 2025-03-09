```yaml
title:
  zh-CN: 弹出层表单
  en-US: Modal Form
```


在对话框中使用表单

---


```vue { "component": true } 

<template>
  <fk-button @click="handleClick">Open Form Modal</fk-button>
  <fk-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <fk-form :model="form">
      <fk-form-item field="name" label="Name">
        <fk-input v-model="form.name" />
      </fk-form-item>
      <fk-form-item field="post" label="Post">
        <fk-select v-model="form.post">
          <fk-option value="post1">Post1</fk-option>
          <fk-option value="post2">Post2</fk-option>
          <fk-option value="post3">Post3</fk-option>
          <fk-option value="post4">Post4</fk-option>
        </fk-select>
      </fk-form-item>
    </fk-form>
  </fk-modal>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const form = reactive({
      name: '',
      post: ''
    });

    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(form)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      form,
      handleClick,
      handleBeforeOk,
      handleCancel
    }
  },
}
</script>
```
