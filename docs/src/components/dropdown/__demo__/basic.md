```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```

下拉菜单的基本用法。下拉菜单开启后会为触发元素添加 `fk-dropdown-open` 类名。

---

```vue { "component": true }
<template>
  <fk-space size="large">
    <fk-dropdown @select="handleSelect" @popupVisibleChange="handlePopupVisibleChange">
      <fk-button>Click Me</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption disabled>Option 2</fk-doption>
        <fk-doption :value="{ value: 'Option3' }">Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown disabled @select="handleSelect">
      <fk-button disabled>Click Me</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption disabled>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown :popup-max-height="false" @select="handleSelect">
      <fk-button>No Max Height <icon-down/></fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption disabled>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
        <fk-doption>Option 4</fk-doption>
        <fk-doption>Option 5</fk-doption>
        <fk-doption>Option 6</fk-doption>
        <fk-doption>Option 7</fk-doption>
        <fk-doption>Option 8</fk-doption>
        <fk-doption>Option 9</fk-doption>
      </template>
    </fk-dropdown>
  </fk-space>
</template>

<script>
export default {
  setup() {
    const handleSelect = (v) => {
      console.log(v)
    };

    const handlePopupVisibleChange = (v) => {
      console.log('handlePopupVisibleChange >>', v);
    }

    return {
      handleSelect,
      handlePopupVisibleChange
    }
  },
}
</script>

<style>
.fk-dropdown-open .fk-icon-down {
  transform: rotate(180deg);
}
</style>
```
