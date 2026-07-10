import { defineNuxtPlugin } from "#app";
import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin(nuxtApp => {
	// Initialize on client only
	nuxtApp.hook?.("app:mounted", () => {
		AOS.init({ once: true, duration: 800 });
	});

	// Optional: refresh on route change to re-run animations
	nuxtApp.hook("page:finish", () => AOS.refresh());
});
