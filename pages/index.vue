<template>
  <div class="bg-def-600 h-screen py-5 px-16 text overflow-hidden">
    <div class="flex flex-col space-y-3 h-full">
      <div class="flex space-x-3 h-[90%] w-full">
        <div class="bg-def rounded-xl border-def h-full w-[28%]"></div>
        <div class="bg-def rounded-xl border-def h-full w-[72%] relative">
          <VueDraggable
            ref="draggable"
            v-model="sortedItems"
            :animation="0"
            class="grid-cols-5 grid-rows-5 h-full w-full grid"
            @end="onEnd"
          >
            <div
              class="relative size-full flex items-center justify-center"
              v-for="(item, index) in sortedItems"
              @click="() => showDetailedItem(item)"
              :class="getItemClasses(index)"
              :key="index"
            >
              <img
                :src="item?.image"
                alt="Item Image"
                class="p-3 max-w-full max-h-full object-contain"
                v-if="item?.image"
              />
              <div
                class="absolute bottom-0 right-0 size-5 flex items-center justify-center border-def-tl text-gray-500 rounded-tl text-sm"
                v-if="item?.count && item?.count !== 1"
              >
                {{ item?.count }}
              </div>
            </div>
          </VueDraggable>
          <transition name="slide">
            <ItemSidebar :activeItem="activeItem" v-show="showActiveItem" @close="close" />
          </transition>
        </div>
      </div>
      <div class="w-full bg-def rounded-xl h-[10%] border-def"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ItemType } from "@/types"
import { type DraggableEvent, VueDraggable } from "vue-draggable-plus"
import { initItems, getItemClassesByIndex } from "@/services"
import useSortedItems from "@/composables/useSortedItems"

const gridElementsX = ref(5)
const gridElementsY = ref(5)
const showActiveItem = ref(false)
const draggable = ref(null)

const activeItem = ref(undefined as ItemType | undefined)

const gridElementsAll = computed(() => gridElementsX.value * gridElementsY.value)

const items = useCookie<ItemType[] | null | undefined>("items")

if (!items.value) {
  items.value = initItems()
}

const { sortedItems } = useSortedItems(items, gridElementsAll)

const onEnd = (event: DraggableEvent) => {
  const movedItem = sortedItems.value[event.oldIndex!]
  const newPosition = event.newIndex

  if (movedItem && newPosition !== undefined) {
    movedItem.position = newPosition
    items.value = [...items.value!]
  }
}

const getItemClasses = (index: number) =>
  getItemClassesByIndex(index, gridElementsX, gridElementsAll)

const showDetailedItem = (item: ItemType | null) => {
  if (!item || showActiveItem.value) return
  showActiveItem.value = true
  activeItem.value = item
}

const close = (removeItem?: boolean) => {
  showActiveItem.value = false

  if (removeItem) items.value = items.value!.filter(item => item.id !== activeItem.value!.id!)

  activeItem.value = undefined
}
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
