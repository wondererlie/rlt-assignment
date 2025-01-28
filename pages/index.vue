<template>
  <div class="bg-def-600 h-screen py-5 px-16 text overflow-hidden">
    <div class="flex flex-col space-y-3 h-full">
      <div class="flex space-x-3 h-[90vh] w-full">
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
              class="size-full"
              v-for="(item, index) in sortedItems"
              @click="() => showDetailedItem(item)"
              :class="getItemClasses(index)"
              :key="index"
            >
              <div class="m-auto">{{ item?.count }}</div>
            </div>
          </VueDraggable>
          <transition name="slide">
            <ItemSidebar :activeItem="activeItem" v-show="showActiveItem" @close="close" />
          </transition>
        </div>
      </div>
      <div class="w-full bg-def rounded-xl h-[10vh] border-def"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ItemType } from "@/types"
import { type DraggableEvent, VueDraggable } from "vue-draggable-plus"

const gridElementsX = ref(5)
const gridElementsY = ref(5)
const showActiveItem = ref(false)
const draggable = ref(null)

const activeItem = ref(undefined as ItemType | undefined)

const gridElementsAll = computed(() => gridElementsX.value * gridElementsY.value)

const items = useCookie<ItemType[] | null | undefined>("items")

if (!items.value) {
  items.value = [
    { id: 1, image: "image", count: 4, position: 17 },
    { id: 2, image: "image", count: 2, position: 3 },
    { id: 3, image: "image", count: 5 },
  ] as ItemType[]
}

const sortedItems = computed((): Array<ItemType | null> => {
  const result = Array(gridElementsAll.value).fill(null)

  items.value!.forEach(item => {
    if (item.position !== undefined && item.position < gridElementsAll.value) {
      result[item.position] = item
    }
  })

  let nextAvailableIndex = result.findIndex(item => !item)

  items.value!.forEach(item => {
    if (item.position === undefined) {
      while (nextAvailableIndex < gridElementsAll.value) {
        if (result[nextAvailableIndex] === null) {
          result[nextAvailableIndex] = item
          item.position = nextAvailableIndex
          break
        }
        nextAvailableIndex++
      }
    }
  })

  return result
})

const onEnd = (event: DraggableEvent) => {
  const movedItem = sortedItems.value[event.oldIndex!]
  const newPosition = event.newIndex

  if (movedItem && newPosition !== undefined) {
    movedItem.position = newPosition
    items.value = [...items.value!]
  }
}

const getItemClasses = (index: number) => ({
  "border-def-br":
    (index + 1) % gridElementsX.value !== 0 &&
    index + 1 < gridElementsAll.value - gridElementsX.value,
  "border-def-b": (index + 1) % gridElementsX.value === 0 && index + 1 !== gridElementsAll.value,
  "border-def-r":
    gridElementsAll.value - gridElementsX.value < index + 1 && index + 1 < gridElementsAll.value,
})

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
