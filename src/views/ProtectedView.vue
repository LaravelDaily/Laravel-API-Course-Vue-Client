<script setup>
import { onMounted, ref } from 'vue';

const user = ref({})

const getUser = async () => {
	await fetch('http://demo.test/api/user', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			'Authorization': 'Bearer ' + localStorage.getItem('access_token')
		},
	})
		.then(response => response.json())
		.then(data => {
			user.value = data
		})
		.catch((error) => console.log(error))
}

onMounted(() => {
	getUser()
})
</script>

<template>
	<div>
		<div>This page is protected by auth.</div>
	
		<div>Current user is: <strong>{{ user.name }}</strong></div>
	</div>
</template>
