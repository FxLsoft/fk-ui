```yaml
title:
  zh-CN: 组合示例
  en-US: Content
```


页头的完整示例。

---


```vue { "component": true } 
<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }" >
    <fk-page-header
      :style="{ background: 'var(--color-bg-2)' }"
      title="AaaaDesign"
    >
      <template #breadcrumb>
        <fk-breadcrumb>
          <fk-breadcrumb-item>Home</fk-breadcrumb-item>
          <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
          <fk-breadcrumb-item>News</fk-breadcrumb-item>
        </fk-breadcrumb>
      </template>
      <template #subtitle>
        <fk-space>
          <span>AaaaDesign Vue 2.0</span>
          <fk-tag color="red" size="small">Default</fk-tag>
        </fk-space>
      </template>
      <template #extra>
        <fk-space>
          <fk-button>Cancel</fk-button>
          <fk-button type="primary">Save</fk-button>
        </fk-space>
      </template>
      <p>
        For other uses, see Design
      </p>
      <p>
        A design is a plan or specification for the construction of an object or system or for the
        implementation of an activity or process, or the result of that plan or specification in the
        form of a prototype, product or process. The verb to design expresses the process of
        developing a design. In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
        considered to be a design activity. The design usually has to satisfy certain goals and
        constraints, may take into account aesthetic, functional, economic, or socio-political
        considerations, and is expected to interact with a certain environment. Major examples of
        designs include architectural blueprints,engineering drawings, business processes, circuit
        diagrams, and sewing patterns.Major examples of designs include architectural
        blueprints,engineering drawings, business processes, circuit diagrams, and sewing patterns.
      </p>
    </fk-page-header>
  </div>
</template>

<script>
export default {
}
</script>
```
