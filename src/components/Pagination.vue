<script setup lang="ts">
const props = defineProps({
    pagination: Object,
})

const emit = defineEmits(['page-change']);

const goToPage = (page: number) => {
	emit('page-change', page);
}
</script>

<template>
	<nav>
		<button
			v-if="props.pagination?.current_page > 1"
			@click="goToPage(props.pagination.current_page - 1)"
		>
			Previous
		</button>
		
		<button
			v-if="props.pagination?.last_page !== props.pagination?.current_page"
			@click="goToPage(props.pagination.current_page + 1)"
		>
			Next
		</button>
	</nav>
</template>
