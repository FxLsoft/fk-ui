```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-avatar>A</fk-avatar>
    <fk-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </fk-avatar>
    <fk-avatar :style="{ backgroundColor: '#14a9f8' }">Fuke</fk-avatar>
    <fk-avatar :style="{ backgroundColor: '#00d0b6' }">Design</fk-avatar>
    <fk-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </fk-avatar>
  </fk-space>
</template>

<script>
import { IconUser } from '@erp/common';

export default {
  components: { IconUser },
};
</script>
```
