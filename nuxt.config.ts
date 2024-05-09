// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  runtimeConfig: {
    public: {
      knockUserId: process.env.NUXT_PUBLIC_KNOCK_USER_ID,
      knockPublicApiKey: process.env.NUXT_PUBLIC_KNOCK_PUBLIC_API_KEY,
      knockFeedChannelId: process.env.NUXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
    },
  },
});
