```yaml
title:
  zh-CN: 滚动到指定表单字段
  en-US: Scroll To Field
```


展示了提交失败自动滚动到第一个错误字段和手动滚动对应字段的使用方法。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button @click="formRef && formRef.validate()">Submit</fk-button>
    <fk-button @click="formRef && formRef.resetFields()">Reset</fk-button>
    <fk-button @click="formRef && formRef.scrollToField('name19')">Scroll to the last field</fk-button>
  </fk-space>
  <fk-form
    ref="formRef"
    style="width: 500px;height: 300px;margin-top:20px;padding-right: 16px;overflow: auto"
    :model="form"
    :scroll-to-first-error="true"
  >
    <template v-for="(fieldName, index) in fieldNames" :key="index">
      <fk-form-item
        :field="fieldName"
        :label="'user' + index"
        :rules="[
          { required: true, message: 'Name is required' },
        ]"
      >
        <fk-input v-model="form[fieldName]" />
      </fk-form-item>
    </template>
  </fk-form>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const formRef = ref(null);
    const fieldCount = 20;
    const fieldNames = Array.from({ length: fieldCount }, (_, index) => `name${index}`);
    const form = reactive(Object.fromEntries(
      fieldNames.map((fieldName, index) => [fieldName, index === 7 ? '' : index.toString()])
    ));

    return {
      form,
      formRef,
      fieldCount,
      fieldNames
    };
  },
};
</script>
```
