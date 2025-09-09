<script setup>
import { onMounted, ref } from 'vue';
import Pagination from '@/components/Pagination.vue';

const categories = ref({})
const products = ref({})

const getCategories = async () => {
	await fetch('http://api.test/api/categories')
		.then(response => response.json())
		.then(data => {
			categories.value = data.data
		})
		.catch((error) => console.log(error))
}

const getProducts = async (page = 1) => {
	await fetch(`http://api.test/api/products?page=${page}`)
		.then(response => response.json())
		.then(data => {
			products.value = data
		})
		.catch((error) => console.log(error))
}

onMounted(() => {
	getCategories()
	getProducts()
})
</script>

<template>
	<div>
		<ul style="display: inline-block;margin-bottom: 10px;">
			<li style="display: inline-block;" v-for="category in categories" :key="category.id">
				<a href="#">{{ category.name }}</a>
			</li>
		</ul>
		
		<ul>
			<li v-for="product in products.data" :key="product.id">
				<strong>{{ product.name }}</strong> ${{ product.price }} <em>({{ product.category.name }})</em>
			</li>
		</ul>
		
		<Pagination :pagination="products.meta" @page-change="getProducts" />
	</div>
</template>
