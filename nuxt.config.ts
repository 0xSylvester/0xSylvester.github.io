// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    pages: true,
    app: {
        head: {
            title: "0xSylvester",
        },
    },

    css: ["~/assets/css/theme.css", "~/assets/css/tailwind.css"],

    modules: ["@nuxt/icon", "@nuxtjs/i18n", "@nuxtjs/color-mode"],

    vite: {
        plugins: [tailwindcss()],
    },

    i18n: {
        defaultLocale: "en",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "ar", name: "Arabic", file: "ar.json" },
        ],
    },

    colorMode: {
        preference: "system",
        fallback: "light",
        classSuffix: "",
    },
});
