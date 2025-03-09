```yaml
title:
  zh-CN: 下拉菜单的页脚
  en-US: Dropdown Footer
```


自定义下拉菜单的页脚

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." allow-search>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
      <template #footer>
        <div style="padding: 6px 0; text-align: center;">
          <fk-button>Click Me</fk-button>
        </div>
      </template>
    </fk-select>
    <fk-select :default-value="'Beijing'" :style="{width:'360px'}" placeholder="Please select ..." allow-search show-footer-on-empty>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
      <template #footer>
        <div style="padding: 6px 0; text-align: center;">
          <fk-button>Click Me</fk-button>
        </div>
      </template>
    </fk-select>
  </fk-space>
</template>
```
