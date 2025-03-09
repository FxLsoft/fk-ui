```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```


可以通过 on-before-ok 更简洁的实现异步关闭功能

---


```vue { "component": true } 
<template>
  <fk-popconfirm title="更简洁的实现异步关闭功能" @before-ok="handleBeforeOk">
    <fk-button>Click To Show</fk-button>
    <template #content>
      <fk-form>
        <fk-form-item label="Name">
          <fk-input/>
        </fk-form-item>
        <fk-form-item label="Post">
          <fk-input/>
        </fk-form-item>
      </fk-form>
    </template>
  </fk-popconfirm>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)

const handleClick = () => {
  visible.value = true;
}

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done()
  }, 1000)
}

const handleCancel = () => {
  visible.value = false;
}
</script>
```
