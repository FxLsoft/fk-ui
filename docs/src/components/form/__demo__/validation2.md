```yaml
title:
  zh-CN: 验证表单2
  en-US: Validation2
```


展示了表单校验`rules`使用在`fk-form`上的使用方法，以及可以直接校验`email`、`ip`、`url`

---


```vue { "component": true } 
<template>
  <fk-form ref="formRef" :rules="rules" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
    <fk-form-item field="name" label="Username" validate-trigger="blur">
      <fk-input v-model="form.name" placeholder="please enter your username..." />
    </fk-form-item>
    <fk-form-item field="password" label="密码" validate-trigger="blur">
      <fk-input-password v-model="form.password" placeholder="please enter your password..." />
    </fk-form-item>
    <fk-form-item field="password2" label="确认密码" validate-trigger="blur">
      <fk-input-password v-model="form.password2" placeholder="please confirm your password..." />
    </fk-form-item>
    <fk-form-item field="email" label="email">
      <fk-input v-model="form.email" placeholder="please enter your email..." />
    </fk-form-item>
    <fk-form-item field="ip" label="IP">
      <fk-input v-model="form.ip" placeholder="please enter your ip..." />
    </fk-form-item>
    <fk-form-item field="url" label="URL">
      <fk-input v-model="form.url" placeholder="please enter your url..." />
    </fk-form-item>
    <fk-form-item field="match" label="match">
      <fk-input v-model="form.match" placeholder="please enter your match..." />
    </fk-form-item>
    <fk-form-item>
      <fk-space>
        <fk-button html-type="submit">Submit</fk-button>
        <fk-button @click="$refs.formRef.resetFields()">Reset</fk-button>
      </fk-space>
    </fk-form-item>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const handleSubmit = ({values, errors}) => {
      console.log('values:', values, '\nerrors:', errors)
    }

    const form = reactive({
      name: '',
      password: '',
      password2: '',
      email: '',
      ip: '192.168.2.1',
      url: '',
      match: ''
    });

    const rules = {
      name: [
        {
          required: true,
          message:'name is required',
        },
      ],
      password: [
        {
          required: true,
          message:'password is required',
        },
      ],
      password2: [
        {
          required: true,
          message:'password is required',
        },
        {
          validator: (value, cb) => {
            if (value !== form.password) {
              cb('two passwords do not match')
            } else {
              cb()
            }
          }
        }
      ],
      email: [
        {
          type: 'email',
          required: true,
        }
      ],
      ip: [
        {
          type: 'ip',
          required: true,
        }
      ],
      url: [
        {
          type: 'url',
          required: true,
        }
      ],
      match: [
        {
          required: true,
          validator: (value, cb) => {
            return new Promise((resolve) => {
              if (!value) {
                cb('Please enter match')
              }
              if (value !== 'match') {
                cb('match must be match!')
              }
              resolve()
            })
          }
        }
      ],
    }

    return {
      form,
      rules,
      handleSubmit
    }
  },
}
</script>
```
