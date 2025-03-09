```yaml
title:
  zh-CN: 动态表单
  en-US: Dynamic Form
```


通过数据动态控制表单内容。

---


```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{width:'600px'}">
    <fk-form-item field="name" label="Username">
      <fk-input v-model="form.name" placeholder="please enter your username..." />
    </fk-form-item>
    <fk-form-item v-for="(post,index) of form.posts" :key="index" :field="`posts[${index}].value`" :label="`Post-${index}`">
      <fk-input v-model="post.value" placeholder="please enter your post..." />
      <fk-button :style="{marginLeft:'10px'}" @click="handleDelete(index)">Delete</fk-button>
    </fk-form-item>
  </fk-form>
  <div>
    <fk-button @click="handleAdd">Add Post</fk-button>
  </div>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      posts: [{value: ''}]
    })
    const handleAdd = () => {
      form.posts.push({
        value: ''
      })
    };
    const handleDelete = (index) => {
      form.posts.splice(index, 1)
    }

    return {
      form,
      handleAdd,
      handleDelete
    }
  },
}
</script>
```
