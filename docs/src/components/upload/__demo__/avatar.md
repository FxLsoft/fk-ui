```yaml
title:
  zh-CN: 用户头像上传
  en-US: Avatar Upload
```


点击上传用户头像，可使用 beforeUpload 限制用户上传的图片格式和大小。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" :style="{ width: '100%' }">
    <fk-upload
      action="/"
      :file-list="file ? [file] : []"
      :show-file-list="false"
      @change="onChange"
      @progress="onProgress"
    >
      <template #upload-button>
        <div
          :class="`fk-upload-list-item${
            file && file.status === 'error' ? ' fk-upload-list-item-error' : ''
          }`"
        >
          <div
            v-if="file && file.url"
            class="fk-upload-list-picture custom-upload-avatar"
          >
            <img :src="file.url" />
            <div class="fk-upload-list-picture-mask">
              <IconEdit />
            </div>
            <fk-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
            />
          </div>
          <div v-else class="fk-upload-picture-card">
            <div class="fk-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">Upload</div>
            </div>
          </div>
        </div>
      </template>
    </fk-upload>
  </fk-space>
</template>

<script>
import { ref } from 'vue';
import { IconEdit, IconPlus } from '@erp/common';

export default {
  components: {IconPlus, IconEdit},
  setup() {
    const file = ref();

    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };
    return {
      file,
      onChange,
      onProgress
    }
  },
};
</script>
```
