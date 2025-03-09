```yaml
title:
  zh-CN: 嵌套数据
  en-US: Nest Data
```


展示了多种表单项嵌套的方式。
表单项组件默认会将表单项状态和事件绑定到第一子组件，如果想要使用表单项进行布局设置，请设置 `:merge-props="false"` 以关闭绑定，或者使用函数指定需要绑定的数据。
如果使用 grid 组件进行布局，请设置 `:content-flex="false"` 关闭表单项内容的 flex 布局。

---


```vue { "component": true } 
<template>
  <fk-form :model="form" :style="{width:'600px'}">
    <fk-form-item label="Username" :content-flex="false" :merge-props="false" extra="Show error message together">
      <fk-row :gutter="8">
        <fk-col :span="12">
          <fk-form-item
field="together.firstname" validate-trigger="input"
                       :rules="[{required:true,message:'firstname is required'}]" no-style>
            <fk-input v-model="form.together.firstname" placeholder="please enter your firstname..." />
          </fk-form-item>
        </fk-col>
        <fk-col :span="12">
          <fk-form-item
field="together.lastname" validate-trigger="input"
                       :rules="[{required:true,message:'lastname is required'}]" no-style>
            <fk-input v-model="form.together.lastname" placeholder="please enter your lastname..." />
          </fk-form-item>
        </fk-col>
      </fk-row>
    </fk-form-item>
    <fk-form-item label="Username" :content-flex="false" :merge-props="false">
      <fk-row :gutter="8">
        <fk-col :span="12">
          <fk-form-item
field="separate.firstname" validate-trigger="input"
                       extra="Show error message separate"
                       :rules="[{required:true,message:'firstname is required'}]" hide-label>
            <fk-input v-model="form.separate.firstname" placeholder="please enter your firstname..." />
          </fk-form-item>
        </fk-col>
        <fk-col :span="12">
          <fk-form-item
field="separate.lastname" validate-trigger="input"
                       :rules="[{required:true,message:'lastname is required'}]" hide-label>
            <fk-input v-model="form.separate.lastname" placeholder="please enter your lastname..." />
          </fk-form-item>
        </fk-col>
      </fk-row>
    </fk-form-item>
    <fk-form-item label="Posts" :content-flex="false" :merge-props="false">
      <fk-space direction="vertical" fill>
        <fk-form-item field="posts.post1" label="Post1">
          <fk-input v-model="form.posts.post1" placeholder="please enter your post..." />
        </fk-form-item>
        <fk-form-item field="posts.post2" label="Post2">
          <fk-input v-model="form.posts.post2" placeholder="please enter your post..." />
        </fk-form-item>
      </fk-space>
    </fk-form-item>
    <fk-form-item field="isRead">
      <fk-checkbox v-model="form.isRead">
        I have read the manual
      </fk-checkbox>
    </fk-form-item>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      together: {
        firstname: '',
        lastname: '',
      },
      separate: {
        firstname: '',
        lastname: '',
      },
      posts: {
        post1: '',
        post2: ''
      },
      isRead: false,
    })

    return {
      form,
    }
  },
}
</script>
```
