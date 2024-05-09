<script setup>
import { Inbox } from "lucide-vue-next";
import Knock from "@knocklabs/client";
const runtimeConfig = useRuntimeConfig();
const knockClient = new Knock(runtimeConfig.public.knockPublicApiKey);
knockClient.authenticate(runtimeConfig.public.knockUserId);
const knockFeed = knockClient.feeds.initialize(
  runtimeConfig.public.knockFeedChannelId,
  {
    page_size: 20,
    archived: "include",
  }
);
const feed = ref({});
await knockFeed.fetch();
const feedState = knockFeed.getState();
feed.value = feedState;

const feedItems = computed(() => {
  return feed.value.items.filter((item) => !item.archived_at);
});
const archivedItems = computed(() => {
  return feed.value.items.filter((item) => item.archived_at);
});
knockFeed.on("items.received.*", ({ items }) => {
  feed.value = knockFeed.getState();
});

knockFeed.on("items.*", () => {
  console.log("calling items.*");
  feed.value = knockFeed.getState();
});
</script>
<template>
  <Tabs defaultValue="inbox" class="w-[600px]">
    <TabsList>
      <TabsTrigger value="inbox">
        Inbox
        <Badge class="ml-2" variant="secondary">
          {{ feed?.metadata?.unread_count }}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="archived">Archived</TabsTrigger>
      <TabsTrigger value="all">All</TabsTrigger>
      <Separator orientation="vertical"></Separator>
      <Dialog>
        <DialogTrigger class="mx-6 text-xl">⚙️</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </TabsList>
    <TabsContent value="inbox">
      <div class="my-6 flex">
        <Button
          variant="outline"
          class="w-full mr-2"
          @click="knockFeed.markAllAsRead()"
        >
          Mark all as read
        </Button>
        <Button
          variant="outline"
          class="w-full ml-2"
          @click="knockFeed.markAllAsArchived()"
        >
          Archive all
        </Button>
      </div>
      <div v-if="feedItems.length > 0">
        <FeedItemCard
          v-for="item in feedItems"
          :key="item.id"
          :feedItem="item"
          :knockFeed="knockFeed"
        >
        </FeedItemCard>
        <Button
          variant="outline"
          class="w-full ml-2 mt-6"
          @click="knockFeed.fetchNextPage()"
          >Load Next Page</Button
        >
      </div>

      <div
        class="flex flex-col items-center my-12 py-12 bg-slate-50 rounded-md"
        v-if="feed.items.length < 0"
      >
        <div>
          <Inbox class="w-16 h-16"></Inbox>
          <p class="mt-6">You&apos;re all caught up</p>
        </div>
      </div>
    </TabsContent>
    <TabsContent value="archived">
      <FeedItemCard
        v-if="archivedItems.length > 0"
        v-for="item in archivedItems"
        :key="item.id"
        :feedItem="item"
        :knockFeed="knockFeed"
      >
      </FeedItemCard>
    </TabsContent>
    <TabsContent value="all">
      <FeedItemCard
        v-if="feed.items.length > 0"
        v-for="item in feed.items"
        :key="item.id"
        :feedItem="item"
        :knockFeed="knockFeed"
      >
      </FeedItemCard>
    </TabsContent>
    <Toaster />
  </Tabs>
</template>
