<template>
	<fk-modal v-model:visible="visible" width="520px" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
		<fk-form :model="form">
			<fk-form-item field="name" label="Name">
				<fk-input v-model="form.name" />
			</fk-form-item>
			<fk-form-item field="post" label="Post">
				<fk-select v-model="form.post">
					<fk-option value="post1">Post1</fk-option>
					<fk-option value="post2">Post2</fk-option>
					<fk-option value="post3">Post3</fk-option>
					<fk-option value="post4">Post4</fk-option>
				</fk-select>
			</fk-form-item>
		</fk-form>
	</fk-modal>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, reactive } from 'vue';

const visible = ref(true);
const form = reactive({
	name: '',
	post: '',
});

const handleBeforeOk = done => {
	console.log(form);
	setTimeout(() => {
		done(form);
		// prevent close
		// done(false)
	}, 1000);
};
const handleCancel = () => {
	visible.value = false;
};
const app = getCurrentInstance();

console.log(app);
</script>

<style lang="scss" scoped></style>
