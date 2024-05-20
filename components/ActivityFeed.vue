<script setup>
import { Inbox } from "lucide-vue-next";
import Knock from "@knocklabs/client";
const runtimeConfig = useRuntimeConfig();

const feedItems = [];
const archivedItems = [];
</script>
<template>
  <Tabs defaultValue="inbox" class="w-[600px]">
    <TabsList>
      <TabsTrigger value="inbox">
        Inbox
        <Badge class="ml-2" variant="secondary"> 0 </Badge>
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
      <div v-if="feedItems && feedItems.length > 0">
        <div class="my-6 flex">
          <Button variant="outline" class="w-full mr-2">
            Mark all as read
          </Button>
          <Button variant="outline" class="w-full ml-2"> Archive all </Button>
        </div>

        <Button variant="outline" class="w-full ml-2 mt-6"
          >Load Next Page</Button
        >
      </div>

      <div
        class="flex flex-col items-center content-center my-12 py-12 bg-slate-50 rounded-md"
        v-if="!feedItems || feedItems.length === 0"
      >
        <Inbox class="w-16 h-16"></Inbox>
        <p class="mt-6">You&apos;re all caught up</p>
      </div>
    </TabsContent>
    <TabsContent value="archived"> </TabsContent>
    <TabsContent value="all"> </TabsContent>
    <Toaster />
  </Tabs>
</template>
