```yaml
title:
  zh-CN: 列表元素
  en-US: List Item Meta
```


使用 `list-item-meta` 组件可快速指定头像、标题、文字。

---


```vue { "component": true } 
<template>
  <fk-list>
    <fk-list-item v-for="idx in 4" :key="idx">
      <fk-list-item-meta
        title="Beijing Aaaa Technology Co., Ltd."
        description="Beijing Aaaa Technology Co., Ltd. is an enterprise located in China."
      >
        <template #avatar>
          <fk-avatar shape="square">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </fk-avatar>
        </template>
      </fk-list-item-meta>
    </fk-list-item>
  </fk-list>
</template>
```
