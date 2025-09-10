<script setup>
import { reactive } from 'vue';

const form = reactive({})

const save = async () => {
	fetch('http://api.test/api/categories/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
		},
		body: JSON.stringify(form)
	})
		.then(response => response.json())
		.then(response => {
			// Do something with response.
			// Redirect to another page.
			console.log(response.data)
		});
}
</script>

<template>
	<form @submit.prevent="save">
		<div class="flex flex-col gap-4">
			<div>
				<label class="block" for="name">Name</label>
				<input v-model="form.name" type="text" name="name" id="name" class="border border-gray-300 rounded p-2" />
			</div>
			
			<div>
				<label class="block" for="description">Description</label>
				<textarea v-model="form.description" type="text" name="description" id="description" class="border border-gray-300 rounded p-2"></textarea>
			</div>
	
			<div>
				<button class="bg-gray-800 text-white rounded text-xs uppercase py-2 px-4">
					Save
				</button>
			</div>
		</div>
	</form>
</template>