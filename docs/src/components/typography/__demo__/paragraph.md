```yaml
title:
  zh-CN: 段落
  en-US: Paragraph
```


文本段落样式。

---


```vue { "component": true } 
<template>
  <fk-typography>
    <fk-typography-title :heading="5">Default</fk-typography-title>
    <fk-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </fk-typography-paragraph>
    <fk-typography-title :heading="5">Secondary</fk-typography-title>
    <fk-typography-paragraph type="secondary">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </fk-typography-paragraph>
    <fk-typography-title :heading="5">Spacing default</fk-typography-title>
    <fk-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </fk-typography-paragraph>
    <fk-typography-title :heading="5">Spacing close</fk-typography-title>
    <fk-typography-paragraph type="secondary" spacing="close">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </fk-typography-paragraph>
  </fk-typography>
</template>
```
