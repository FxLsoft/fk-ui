```yaml
title:
  zh-CN: 交互按钮
  en-US: Trigger Icon
```


可以通过 `trigger-icon` `trigger-type` 来定制交互按钮，类型有 `mask (遮罩)` 和 `button (按钮)` 两种。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      :style="{ backgroundColor: '#168CFF' }"
      @click="toast"
    >
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </fk-avatar>
    <fk-avatar :style="{ backgroundColor: '#14C9C9' }" @click="toast">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </fk-avatar>
    <fk-avatar
      shape="square"
      :style="{ backgroundColor: '#FFC72E' }"
      @click="toast"
    >
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </fk-avatar>
    <fk-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </fk-avatar>
  </fk-space>
</template>

<script>
import { IconCamera, IconEdit, IconUser } from '@erp/common';

export default {
  components: { IconCamera, IconEdit },
  methods: {
    toast() {
      this.$message.info('Uploading...');
    },
  },
};
</script>
```
