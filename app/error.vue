<template>
	<div class="error-page">
		<div class="card" role="alert" aria-live="polite">
			<div class="status">{{ status }}</div>

			<h1 class="title">{{ title }}</h1>

			<p class="message" v-if="message">{{ message }}</p>
			<p class="message" v-else>
				An unexpected error occurred. Try refreshing or contact support.
			</p>

			<div class="actions">
				<NuxtLink to="/" class="btn">Go Home</NuxtLink>
				<button
					class="btn btn-outline"
					@click="tryAgain"
					:disabled="isReloading"
				>
					{{ isReloading ? "Reloading…" : "Try Again" }}
				</button>
			</div>

			<details class="debug" v-if="showDetails">
				<summary>Details</summary>
				<pre>{{ debugInfo }}</pre>
			</details>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRuntimeConfig } from "#imports";

// Nuxt provides `error` prop; in layouts/error.vue you can access with defineProps
const props = defineProps({
	error: { type: Object, required: true },
});

const isReloading = ref(false);
const route = useRoute();
const config = useRuntimeConfig();

const status = computed(
	() => props.error.statusCode || props.error.status || 500,
);
const title = computed(
	() =>
		props.error.statusMessage ||
		props.error.message ||
		(status.value === 404 ? "Page Not Found" : "Server Error"),
);
const message = computed(() => {
	// avoid exposing stack/messages in production
	if (config.public?.showErrorDetails) return props.error.message;
	return undefined;
});
const debugInfo = computed(() =>
	JSON.stringify(
		{
			url: route.fullPath,
			status: status.value,
			error: props.error?.stack ? props.error.stack : props.error,
		},
		null,
		2,
	),
);

const showDetails = computed(() => config.public?.showErrorDetails === true);

function tryAgain() {
	isReloading.value = true;
	// simple reload — keeps user on same route
	window.location.reload();
}
</script>

<style scoped>
.error-page {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: linear-gradient(180deg, #f7fafc, #fff);
}
.card {
	width: 100%;
	max-width: 720px;
	background: #fff;
	padding: 2rem;
	border-radius: 12px;
	box-shadow: 0 10px 30px rgba(12, 20, 40, 0.06);
	text-align: center;
}
.status {
	font-weight: 700;
	color: #ef4444;
	font-size: 32px;
	margin-bottom: 0.5rem;
}
.title {
	font-size: 1.6rem;
	margin: 0.25rem 0 1rem;
	color: #0f172a;
}
.message {
	color: #334155;
	margin-bottom: 1.25rem;
}
.actions {
	display: flex;
	gap: 0.75rem;
	justify-content: center;
	margin-bottom: 1rem;
}
.btn {
	padding: 0.6rem 1rem;
	border-radius: 8px;
	background: #0b77f5;
	color: #fff;
	text-decoration: none;
	border: none;
	cursor: pointer;
}
.btn-outline {
	background: transparent;
	color: #0b77f5;
	border: 1px solid rgba(11, 119, 245, 0.15);
}
.debug {
	text-align: left;
	margin-top: 1rem;
	background: #0f172a10;
	padding: 0.75rem;
	border-radius: 6px;
	overflow: auto;
}
pre {
	white-space: pre-wrap;
	word-break: break-word;
	font-size: 0.85rem;
	color: #0b1724;
}
</style>
