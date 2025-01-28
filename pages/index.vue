<template>
  <div class="bg-def-600 h-screen py-5 px-16 text overflow-hidden">
    <div class="flex flex-col space-y-3 h-full">
      <div class="flex space-x-3 h-[90vh] w-full">
        <div class="bg-def rounded-xl border-def h-full w-[28%]"></div>
        <div class="bg-def rounded-xl border-def h-full w-[72%] relative">
          <div class="grid-cols-5 grid-rows-5 h-full w-full grid">
            <div
              class="size-full"
              v-for="(item, index) in items"
              @click="() => showDetailedItem(item)"
              :class="getItemClasses(index)"
            >
              {{ item.count }}
            </div>
          </div>
          <transition name="slide">
            <div
              class="absolute rounded-xl border-def right-0 top-0 bg-def-600 h-full w-80"
              v-show="showActiveItem"
              ref="activeItemBlock"
            >
              HELLO
            </div>
          </transition>
        </div>
      </div>
      <div class="w-full bg-def rounded-xl h-[10vh] border-def"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
type ItemType = { image?: string; count?: number }

const gridElementsX = ref(5)
const gridElementsY = ref(5)
const showActiveItem = ref(false)
const isActiveItemClosable = ref(false)
const activeItem = ref(undefined as ItemType | undefined)

const activeItemBlock = ref(null)

const items = ref([
  { image: "image", count: 4 },
  { image: "image", count: 2 },
  { image: "image", count: 5 },
] as ItemType[])

const gridElementsAll = computed(() => gridElementsX.value * gridElementsY.value)

const getItemClasses = (index: number) => ({
  "border-def-br":
    (index + 1) % gridElementsX.value !== 0 &&
    index + 1 < gridElementsAll.value - gridElementsX.value,
  "border-def-b": (index + 1) % gridElementsX.value === 0 && index + 1 !== gridElementsAll.value,
  "border-def-r":
    gridElementsAll.value - gridElementsX.value < index + 1 && index + 1 < gridElementsAll.value,
})

const showDetailedItem = (item: ItemType) => {
  if (!item.image) return
  showActiveItem.value = true
  activeItem.value = item
}

const exitActiveItem = (event: Event) => {
  if (isActiveItemClosable.value && !activeItemBlock.value!.contains(event.target)) {
    showActiveItem.value = false
    activeItem.value = undefined
    isActiveItemClosable.value = false
  } else if (showActiveItem.value) isActiveItemClosable.value = true
}

while (items.value.length < 25) {
  items.value.push({})
}

onMounted(() => document.body.addEventListener("click", exitActiveItem))
onUnmounted(() => document.body.removeEventListener("click", exitActiveItem))
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1
}
</style>
