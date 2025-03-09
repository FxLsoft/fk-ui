```yaml
title:
  zh-CN: 标题
  en-US: Title
```


展示不同级别的标题。

---


```vue { "component": true } 
<template>
  <fk-typography>
    <fk-typography-title>
      H1. The Pragmatic Romanticism
    </fk-typography-title>
    <fk-typography-title :heading="2">
      H2. The Pragmatic Romanticism
    </fk-typography-title>
    <fk-typography-title :heading="3">
      H3. The Pragmatic Romanticism
    </fk-typography-title>
    <fk-typography-title :heading="4">
      H4. The Pragmatic Romanticism
    </fk-typography-title>
    <fk-typography-title :heading="5">
      H5. The Pragmatic Romanticism
    </fk-typography-title>
    <fk-typography-title :heading="6">
      H6. The Pragmatic Romanticism
    </fk-typography-title>
  </fk-typography>
</template>
```
