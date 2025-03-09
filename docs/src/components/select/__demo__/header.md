```yaml
title:
  zh-CN: 下拉菜单的页头
  en-US: Dropdown Header
```


自定义下拉菜单的页头

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." multiple>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
      <template #header>
        <div style="padding: 6px 12px;" >
          <fk-checkbox value="1">全选</fk-checkbox>
        </div>
      </template>
    </fk-select>

    <fk-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." multiple show-header-on-empty>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
      <template #header>
        <div style="padding: 6px 12px;" >
          <fk-checkbox value="1">全选</fk-checkbox>
        </div>
      </template>
    </fk-select>
  </fk-space>
</template>
```
