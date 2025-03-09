```yaml
title:
  zh-CN: 组合按钮
  en-US: Button Group
```

通过 `<fk-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-button-group>
      <fk-button>Publish</fk-button>
      <fk-button>
        <template #icon>
          <icon-down />
        </template>
      </fk-button>
    </fk-button-group>
    <fk-button-group>
      <fk-button>Publish</fk-button>
      <fk-button>
        <template #icon>
          <icon-more />
        </template>
      </fk-button>
    </fk-button-group>
    <fk-button-group>
      <fk-button type="primary">
        <icon-left />
        Prev
      </fk-button>
      <fk-button type="primary">
        Next
        <icon-right />
      </fk-button>
    </fk-button-group>
    <fk-space size="large">
      <fk-button-group type="primary">
        <fk-button> copy </fk-button>
        <fk-button> cut </fk-button>
        <fk-button> find </fk-button>
      </fk-button-group>
      <fk-button-group type="primary" status="warning">
        <fk-button> <template #icon><icon-heart-fill /></template> </fk-button>
        <fk-button> <template #icon><icon-star-fill /></template> </fk-button>
        <fk-button> <template #icon><icon-thumb-up-fill /></template> </fk-button>
      </fk-button-group>
      <fk-button-group size="small" disabled>
        <fk-button> prev </fk-button>
        <fk-button> next </fk-button>
      </fk-button-group>
    </fk-space>
  </fk-space>
</template>
```
