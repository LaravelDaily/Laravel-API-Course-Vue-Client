<script setup>
import { nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
	email: '',
	password: '',
});

const errors = ref({});

async function handleSubmit() {
	try {
		const response = await fetch('http://demo.test/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(form),
		})
		
		const data = await response.json();
		
		if (response.ok) {
			localStorage.setItem('access_token', data.token)
			await router.push({ name: 'protected' })
		} else {
			errors.value = data.errors;
		}
	} catch (error) {
		console.log('Network error: ' + error)
	} finally {
		form.password = '';
		form.password_confirmation = '';
	}
}
</script>

<template>
	<form @submit.prevent="handleSubmit" novalidate>
		<div>
			<h1>Login</h1>
			<div>
				<label for="email" class="required">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					v-model="form.email"
				/>
				<div v-if="errors.email" style="color:orangered;">{{ errors.email[0] }}</div>
			</div>
			
			<div>
				<label for="password" class="required">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="new-password"
					required
					v-model="form.password"
				/>
			</div>
			
				<button type="submit">
					Login
				</button>
		</div>
	</form>
</template>
