```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

表单的基本用法。

---

```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <fk-form-item field="name" tooltip="Please enter username" label="Username">
      <fk-input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </fk-form-item>
    <fk-form-item field="post" label="Post">
      <fk-input v-model="form.post" placeholder="please enter your post..." />
    </fk-form-item>
    <fk-form-item field="isRead">
      <fk-checkbox v-model="form.isRead"> I have read the manual </fk-checkbox>
    </fk-form-item>
    <fk-form-item>
      <fk-button type="primary" html-type="submit">Submit</fk-button>
    </fk-form-item>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    });
    const handleSubmit = (data) => {
      console.log(data);
    };

    return {
      form,
      handleSubmit,
    };
  },
};
</script>
```

```vue { "component": true } 
<template>
    <fk-space direction="vertical" size="large">
      <fk-radio-group v-model="status" type="button">
        <fk-radio value="validating">validating</fk-radio>
        <fk-radio value="success">success</fk-radio>
        <fk-radio value="error">error</fk-radio>
        <fk-radio value="warning">warning</fk-radio>
      </fk-radio-group>
      <fk-radio-group v-model="size" type="button">
        <fk-radio value="mini">mini</fk-radio>
        <fk-radio value="small">small</fk-radio>
        <fk-radio value="medium">medium</fk-radio>
        <fk-radio value="large">large</fk-radio>
      </fk-radio-group>
    </fk-space>
    <fk-form
      :model="form"
      :style="{ width: '600px', marginTop: '20px' }"
      :size="size"
    >
      <fk-form-item
        field="name"
        label="Username"
        help="This is custom message"
        extra="This is extra text"
        :validate-status="status"
        feedback
      >
        <fk-input
          v-model="form.name"
          placeholder="please enter your username..."
        />
      </fk-form-item>
      <fk-form-item
        field="post"
        label="Post"
        help="This is custom message"
        extra="This is extra text"
        :validate-status="status"
        feedback
      >
        <fk-input-number
          v-model="form.post"
          placeholder="please enter your post..."
        />
      </fk-form-item>
      <fk-form-item
        field="tags"
        label="Tags"
        help="This is custom message"
        extra="This is extra text"
        :validate-status="status"
        feedback
      >
        <fk-input-tag
          v-model="form.tags"
          placeholder="please enter your post..."
        />
      </fk-form-item>
      <fk-form-item
        field="section"
        label="Section"
        :rules="[{ match: /section one/, message: 'must select one' }]"
        :validate-status="status"
        feedback
      >
        <fk-select v-model="form.section" placeholder="Please select ...">
          <fk-option value="section one">Section One</fk-option>
          <fk-option value="section two">Section Two</fk-option>
          <fk-option value="section three">Section Three</fk-option>
        </fk-select>
      </fk-form-item>
      <fk-form-item label="DateRange" :validate-status="status" feedback>
        <fk-range-picker/>
      </fk-form-item>

      <fk-form-item field="date" label="Date" :validate-status="status" feedback>
        <fk-date-picker/>
      </fk-form-item>

      <fk-form-item field="time" label="Time" :validate-status="status" feedback>
        <fk-time-picker/>
      </fk-form-item>
    </fk-form> 
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const status = ref('success');
    const size = ref('medium');
    const form = reactive({
      name: '',
      post: undefined,
      tags: ['tag1'],
      section: '',
    });

    return {
      status,
      size,
      form,
    };
  },
};
</script>
```
