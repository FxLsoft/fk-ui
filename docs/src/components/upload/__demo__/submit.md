```yaml
title:
  zh-CN: 手动上传
  en-US: manual upload
```


设置 `auto-upload` 为 `false` 时候，可以通过调用 `submit` 方法进行手动上传。

---


```vue { "component": true } 
<template>
  <div>
    <fk-upload
      ref="uploadRef"
      action="/"
      :auto-upload="false"
      multiple
      @change="onChange"
    >
      <template #upload-button>
        <fk-space>
          <fk-button> select file</fk-button>
          <fk-button type="primary" @click="submit"> start upload</fk-button>
          <fk-button type="primary" @click="submitOne">
            only upload one
          </fk-button>
        </fk-space>
      </template>
    </fk-upload>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadRef = ref();
    const files = ref([]);

    const submitOne = (e) => {
      e.stopPropagation();
      console.log(files.value);
      uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
    };

    const submit = (e) => {
      e.stopPropagation();
      uploadRef.value.submit();
    };

    const onChange = (fileList) => {
      files.value = fileList;
    };

    return {
      uploadRef,
      files,
      submitOne,
      submit,
      onChange,
    };
  },
};
</script>
```
