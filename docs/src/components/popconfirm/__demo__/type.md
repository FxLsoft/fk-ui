```yaml
title:
  zh-CN: 确认框类型
  en-US: Type
```


通过 `type` 属性可以设置确认框类型。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-popconfirm title="Are you sure you want to delete?" type="info">
      <fk-button>Click To Delete</fk-button>
    </fk-popconfirm>
    <fk-popconfirm title="Are you sure you want to delete?" type="success">
      <fk-button>Click To Delete</fk-button>
    </fk-popconfirm>
    <fk-popconfirm title="Are you sure you want to delete?" type="warning">
      <fk-button>Click To Delete</fk-button>
    </fk-popconfirm>
    <fk-popconfirm title="Are you sure you want to delete?" type="error">
      <fk-button>Click To Delete</fk-button>
    </fk-popconfirm>
  </fk-space>
</template>
```
