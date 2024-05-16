# Nuxt & Vue Feed Example

![notion-style feed example](./images/activity-feed.png)

## Getting Started

This is a custom activity feed modeled after Notion and built using the [Knock JavaScript SDK](https://docs.knock.app/sdks/javascript/quick-start). It's purpose is to show you how to build custom feed implementations using other UI libraries or your own design system. This example uses Nuxt, Vue, and [shadcn/vue](https://www.shadcn-vue.com/).

To clone the repository locally, run this command:

```bash
git clone https://github.com/knocklabs/notion-feed-example.git
```

Then create a new `.env` file from the sample with this command:

```bash
cp .env.sample .env
```

To use this example, you'll need [an account on Knock](https://dashboard.knock.app/), as well as an in-app feed channel with a workflow that produces in-app feed messages.

You'll also need:

- A public API key for the Knock environment (set as NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY)
- The channel ID for the in-app feed (set as NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID)
- A Knock user ID (set as NEXT_PUBLIC_KNOCK_USER_ID)

Once you've added those values and environment variables, you can run the project locally on `http://localhost:3000`:

```bash
npm run dev
```

## Tutorials

You can reference the following resources as you get started. We created blog posts and videos for creating both the base feed experience and integrating toasts.

### Create a Notion-style feed
