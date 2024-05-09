<script setup>
import {
  Archive,
  ArchiveRestore,
  BookmarkCheck,
  BookmarkX,
} from "lucide-vue-next";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const props = defineProps({
  feedItem: Object,
  knockFeed: Object,
});
</script>
<template>
  <div
    class="border-b border-[#333333] py-4 px-4"
    :class="feedItem.read_at ? 'opacity-70' : ''"
  >
    <div class="flex items-center mb-2 relative">
      <NewItemIcon v-if="!feedItem.read_at"></NewItemIcon>
      <Avatar>
        <AvatarImage
          alt="Colin White"
          src="https://v0.dev/placeholder.svg?height=40&width=40"
        />
      </Avatar>
      <div class="ml-2">
        <p class="font-semibold">
          {{
            `${feedItem.actors
              .map((actor) => actor.name)
              .join(" &")} took an action`
          }}
          <span class="text-sm text-[#BBBBBB]">
            {{
              new Date(feedItem.inserted_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
          </span>
        </p>
      </div>
      <div class="ml-16 place-self-end">
        <Button
          variant="outline"
          size="icon"
          class="mx-1"
          v-if="feedItem.read_at === null"
          @click="knockFeed.markAsRead(feedItem)"
        >
          <BookmarkCheck class="h-4 w-4"></BookmarkCheck>
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="mx-1"
          v-if="feedItem.read_at !== null"
          @click="knockFeed.markAsUnread(feedItem)"
        >
          <BookmarkX class="h-4 w-4"></BookmarkX>
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="mx-1"
          v-if="feedItem.archived_at === null"
          @click="knockFeed.markAsArchived(feedItem)"
        >
          <Archive class="h-4 w-4"></Archive>
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="mx-1"
          v-if="feedItem.archived_at !== null"
          @click="knockFeed.markAsUnarchived(feedItem)"
        >
          <ArchiveRestore class="h-4 w-4"></ArchiveRestore>
        </Button>
      </div>
    </div>
    <p
      class="text-sm mb-1 ml-[48px]"
      v-html="
        feedItem.blocks.filter((block) => block.name === 'body')[0].rendered
      "
    ></p>
  </div>
</template>
