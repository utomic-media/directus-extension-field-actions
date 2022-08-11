<template>
	<input :value="value" @input="handleChange($event.target.value)" />
	<!-- TODO: create interface -->
	<!-- TODO: share button stuff with display -->
	<!-- TODO: add input for different types, add readonly support -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		return { handleChange };

		function handleChange(value: string): void {
			emit('input', value);
		}
	},
});
</script>
