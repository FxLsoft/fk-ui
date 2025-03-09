```yaml
title:
  zh-CN: 组合使用
  en-US: Basic
```


排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。

---


```vue { "component": true } 
<template>
  <fk-typography :style="{ marginTop: '-40px' }">
    <fk-typography-title>
      Design system
    </fk-typography-title>
    <fk-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </fk-typography-paragraph>
    <fk-typography-paragraph>
      In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered <fk-typography-text bold>to be a design activity.</fk-typography-text>
    </fk-typography-paragraph>
    <fk-typography-title :heading="2">AaaaDesign</fk-typography-title>
    <fk-typography-paragraph>
      The AaaaDesign component library defines a set of default particle variables, and a custom theme is to <fk-typography-text mark>customize</fk-typography-text> and <fk-typography-text underline>overwrite</fk-typography-text> this variable list.
    </fk-typography-paragraph>
    <fk-typography-paragraph blockquote>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a <fk-typography-text code>prototype</fk-typography-text>, <fk-typography-text code>product</fk-typography-text> or <fk-typography-text code>process</fk-typography-text>. The verb to design expresses the process of developing a design.
    </fk-typography-paragraph>
    <fk-typography-paragraph mark underline delete>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.</fk-typography-paragraph>
    <fk-typography-paragraph>
      <ul>
        <li>
          Architectural blueprints
          <ul>
            <li>Architectural blueprints</li>
          </ul>
        </li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ul>
    </fk-typography-paragraph>
    <fk-typography-paragraph>
      <ol>
        <li>Architectural blueprints</li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ol>
    </fk-typography-paragraph>
  </fk-typography>
</template>
```

