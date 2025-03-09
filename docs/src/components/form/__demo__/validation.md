```yaml
title:
  zh-CN: 验证表单
  en-US: Validation
```


展示了表单校验的使用方法。

---


```vue { "component": true } 
<template>
  <fk-form ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
    <fk-form-item field="size" label="Form Size" >
      <fk-radio-group v-model="form.size" type="button">
        <fk-radio value="mini">Mini</fk-radio>
        <fk-radio value="small">Small</fk-radio>
        <fk-radio value="medium">Medium</fk-radio>
        <fk-radio value="large">Large</fk-radio>
      </fk-radio-group>
    </fk-form-item>
    <fk-form-item
field="name" label="Username"
                 :rules="[{required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                 :validate-trigger="['change','input']"
    >
      <fk-input v-model="form.name" placeholder="please enter your username..." />
    </fk-form-item>
    <fk-form-item
field="age" label="Age"
                 :rules="[{required:true,message:'age is required'},{type:'number', max:200,message:'age is max than 200'}]"
    >
      <fk-input-number v-model="form.age" placeholder="please enter your age..." />
    </fk-form-item>
    <fk-form-item field="section" label="Section" :rules="[{match:/section one/,message:'must select one'}]">
      <fk-select v-model="form.section" placeholder="Please select ..." allow-clear>
        <fk-option value="section one">Section One</fk-option>
        <fk-option value="section two">Section Two</fk-option>
        <fk-option value="section three">Section Three</fk-option>
      </fk-select>
    </fk-form-item>
    <fk-form-item field="province" label="Province" :rules="[{required:true,message:'province is required'}]">
      <fk-cascader v-model="form.province" :options="options" placeholder="Please select ..." allow-clear />
    </fk-form-item>
    <fk-form-item
field="options" label="Options"
                 :rules="[{type:'array',minLength:2,message:'must select greater than two options'}]"
    >
      <fk-checkbox-group v-model="form.options">
        <fk-checkbox value="option one">Section One</fk-checkbox>
        <fk-checkbox value="option two">Option Two</fk-checkbox>
        <fk-checkbox value="option three">Option Three</fk-checkbox>
        <fk-checkbox value="option four">Option Four</fk-checkbox>
      </fk-checkbox-group>
    </fk-form-item>
    <fk-form-item field="date" label="Date">
      <fk-date-picker v-model="form.date" placeholder="Please select ..."/>
    </fk-form-item>
    <fk-form-item field="time" label="Time">
      <fk-time-picker v-model="form.time" placeholder="Please select ..."/>
    </fk-form-item>
    <fk-form-item field="radio" label="Radio" :rules="[{match:/one/,message:'must select one'}]">
      <fk-radio-group v-model="form.radio">
        <fk-radio value="radio one">Radio One</fk-radio>
        <fk-radio value="radio two">Radio Two</fk-radio>
      </fk-radio-group>
    </fk-form-item>
    <fk-form-item field="slider" label="Slider" :rules="[{type:'number', min:5,message:'slider is min than 5'}]">
      <fk-slider v-model="form.slider" :max="10" />
    </fk-form-item>
    <fk-form-item field="score" label="Score">
      <fk-rate v-model="form.score" allow-clear />
    </fk-form-item>
    <fk-form-item field="switch" label="Switch" :rules="[{type:'boolean', true:true,message:'must be true'}]">
      <fk-switch v-model="form.switch" />
    </fk-form-item>
    <fk-form-item field="multiSelect" label="Multiple Select">
      <fk-select v-model="form.multiSelect" placeholder="Please select ..." multiple>
        <fk-option value="section one">Section One</fk-option>
        <fk-option value="section two">Section Two</fk-option>
        <fk-option value="section three">Section Three</fk-option>
      </fk-select>
    </fk-form-item>
    <fk-form-item field="treeSelect" label="Tree Select">
      <fk-tree-select v-model="form.treeSelect" :data="treeData" placeholder="Please select ..."/>
    </fk-form-item>
    <fk-form-item>
      <fk-space>
        <fk-button html-type="submit">Submit</fk-button>
        <fk-button @click="$refs.formRef.resetFields()">Reset</fk-button>
      </fk-space>
    </fk-form-item>
  </fk-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const handleSubmit = ({values, errors}) => {
      console.log('values:', values, '\nerrors:', errors)
    }

    const form = reactive({
      size: 'medium',
      name: '',
      age: undefined,
      section: '',
      province: 'haidian',
      options: [],
      date: '',
      time: '',
      radio: 'radio one',
      slider: 5,
      score: 5,
      switch: false,
      multiSelect: ['section one'],
      treeSelect: ''
    });
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'XiCheng',
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];
    const treeData = [
      {
        key: 'node1',
        title: 'Node1',
        children: [
          {
            key: 'node2',
            title: 'Node2',
          },
        ],
      },
      {
        key: 'node3',
        title: 'Node3',
        children: [
          {
            key: 'node4',
            title: 'Node4',
          },
          {
            key: 'node5',
            title: 'Node5',
          },
        ],
      },
    ]

    return {
      form,
      options,
      treeData,
      handleSubmit
    }
  },
}
</script>
```
