```yaml
title:
  zh-CN: 增加操作项
  en-US: With Actions
```


通过 `actions` 来为列表添加操作项。

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
      <template #actions>
        <icon-edit />
        <icon-delete />
      </template>
    </fk-list-item>
  </fk-list>
</template>
```
