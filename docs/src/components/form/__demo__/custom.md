```yaml
title:
  zh-CN: 自定义表单组件
  en-US: Custom Form Item
```


通过 `useFormItem` 自定义表单组件。2.18.0 版本后可用。

---


```vue { "component": true } 
<template>
  <fk-space style="margin-bottom: 20px;">
    <fk-switch v-model="disabled" />
    Disabled: {{disabled}}
  </fk-space>
  <Form :model="form" :disabled="disabled" :style="{width:'600px'}">
    <FormItem
field="name" label="Username"
              :rules="[{required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}]">
      <MyInput v-model="form.name" placeholder="please enter your username..." />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { h, reactive, ref } from 'vue';
import { Form, FormItem, useFormItem } from '@erp/common';

const MyInput = {
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const { mergedDisabled, eventHandlers } = useFormItem();
    const handleInput = (ev) => {
      const { value } = ev.target;
      emit('update:modelValue', value)
      eventHandlers.value?.onChange?.(ev)
    }
    return () => h('input', { disabled: mergedDisabled.value, onInput: handleInput })
  }
}

export default {
  components: {
    Form,
    FormItem,
    MyInput
  },
  setup() {
    const disabled = ref(false);
    const form = reactive({
      name: ''
    })

    return {
      disabled,
      form
    }
  },
}
</script>
```
