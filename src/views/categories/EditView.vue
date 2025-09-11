<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

const route = useRoute()
const router = useRouter()
const form = reactive({})
const errors = ref({})

const getCategory = async () => {
	await fetch(`http://api.test/api/categories/${route.params.id}`)
		.then(response => response.json())
		.then(data => {
			Object.assign(form, data.data)
		})
		.catch((error) => console.log(error))
}

const save = async () => {
	const response = await fetch(`http://api.test/api/categories/${route.params.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
		},
		body: JSON.stringify(form)
	})
	
	const data = await response.json()
	
	if (response.ok) {
		// Do something with response.
		// Redirect to another page.
	} else {
		errors.value = data.errors;
	}
}

const destroy = async () => {
	if (confirm('Are you sure?')) {
		const response = await fetch(`http://api.test/api/categories/${route.params.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		
		if (response.ok) {
			await router.push({ name: 'home' })
		} else {
			console.error('Delete failed:', response.status)
		}
	}
}

onMounted(() => {
	getCategory()
})
</script>

<template>
	<div>
		<button @click="destroy" type="button" class="bg-red-500 text-white px-3 mb-4 py-1 rounded-md">Delete</button>
		
		<form @submit.prevent="save">
			<div class="flex flex-col gap-4">
				<div>
					<label class="block" for="name">Name</label>
					<input v-model="form.name" type="text" name="name" id="name" class="border border-gray-300 rounded p-2" />
					<div v-if="errors.name" class="text-xs text-rose-400">{{ errors.name[0] }}</div>
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
	</div>
</template>