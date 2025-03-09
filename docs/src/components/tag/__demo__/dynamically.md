```yaml
title:
  zh-CN: 动态编辑标签
  en-US: Dynamically Edit
```


可动态添加和删除标签。

---


```vue { "component": true } 
<template>
  <fk-space wrap>
    <fk-tag
      v-for="(tag, index) of tags"
      :key="tag"
      :closable="index !== 0"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </fk-tag>

    <fk-input
      v-if="showInput"
      ref="inputRef"
      v-model.trim="inputVal"
      :style="{ width: '90px'}"
      size="mini"
      @keyup.enter="handleAdd"
      @blur="handleAdd"
    />
    <fk-tag
      v-else
      :style="{
        width: '90px',
        backgroundColor: 'var(--color-fill-2)',
        border: '1px dashed var(--color-fill-3)',
        cursor: 'pointer',
      }"
      @click="handleEdit"
    >
      <template #icon>
        <icon-plus />
      </template>
      Add Tag
    </fk-tag>
  </fk-space>
</template>

<script>
import { nextTick, ref } from 'vue';

export default {
  setup() {
    const tags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
    const inputRef = ref(null);
    const showInput = ref(false);
    const inputVal = ref('');

    const handleEdit = () => {
      showInput.value = true;

      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
      });
    };

    const handleAdd = () => {
      if (inputVal.value) {
        tags.value.push(inputVal.value);
        inputVal.value = '';
      }
      showInput.value = false;
    };

    const handleRemove = (key) => {
      tags.value = tags.value.filter((tag) => tag !== key);
    };

    return {
      tags,
      inputRef,
      showInput,
      inputVal,
      handleEdit,
      handleAdd,
      handleRemove,
    };
  },
};
</script>

```
