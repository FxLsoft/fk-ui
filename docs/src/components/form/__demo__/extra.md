```yaml
title:
  zh-CN: 额外信息和帮助信息
  en-US: Extra Message & Help Message
```


可以使用 `extra` 添加额外信息。
如果需要在外部自定义校验信息，可以使用 `help` 属性或插槽。设置 `help` 时校验信息会被屏蔽。

---


```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{width:'600px'}">
    <fk-form-item field="name" label="Username" validate-trigger="input" required>
      <fk-input v-model="form.name" placeholder="please enter your username..." />
      <template #extra>
        <div>Used to login</div>
      </template>
    </fk-form-item>
    <fk-form-item field="post" label="Post" validate-trigger="input" required>
      <fk-input v-model="form.post" placeholder="please enter your post..." />
      <template #extra>
        <div>Used to login</div>
      </template>
      <template #help>
        <div>Custom valitae message</div>
      </template>
    </fk-form-item>
    <fk-form-item field="isRead">
      <fk-checkbox v-model="form.isRead">
        I have read the manual
      </fk-checkbox>
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
