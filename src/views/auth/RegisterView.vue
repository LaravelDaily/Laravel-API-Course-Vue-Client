<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
	name: '',
	email: '',
	password: '',
	password_confirmation: '',
});

const errors = ref({});

async function handleSubmit() {
	try {
		const response = await fetch('http://demo.test/api/register', {
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
			<h1 class="">Register</h1>
			<div>
				<label for="name" class="required">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					required
					v-model="form.name"
				/>
				<div v-if="errors.name" style="color:orangered;">{{ errors.name[0] }}</div>
			</div>
			
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
				<div v-if="errors.password" style="color:orangered;">{{ errors.password[0] }}</div>
			</div>
			
			<div>
				<label for="password_confirmation" class="required">Confirm password</label>
				<input
					id="password_confirmation"
					name="password_confirmation"
					type="password"
					autocomplete="new-password"
					required
					v-model="form.password_confirmation"
				/>
			</div>
			
				<button type="submit">
					Register
				</button>
		</div>
	</form>
</template>
