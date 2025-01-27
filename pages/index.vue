<template>
  <div class="bg-def-600 h-screen py-5 px-16 text">
    <div class="flex flex-col space-y-3 h-full">
      <div class="flex space-x-3 h-[90vh] w-full">
        <div class="bg-def rounded-xl border-def h-full w-[28%]"></div>
        <div class="bg-def rounded-xl border-def h-full w-[72%]">
          <div class="grid-cols-5 grid-rows-5 h-full w-full grid">
            <div class="size-full" v-for="(item, index) in items" :class="getItemClasses(index)">
              {{ item.count }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full bg-def rounded-xl h-[10vh] border-def"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const gridElementsX = ref(5)
const gridElementsY = ref(5)

const items = ref([
  { image: "image", count: 4 },
  { image: "image", count: 2 },
  { image: "image", count: 5 },
] as { image?: string; count?: number }[])

const gridElementsAll = computed(() => gridElementsX.value * gridElementsY.value)

const getItemClasses = (index: number) => ({
  "border-def-br":
    (index + 1) % gridElementsX.value !== 0 &&
    index + 1 < gridElementsAll.value - gridElementsX.value,
  "border-def-b": (index + 1) % gridElementsX.value === 0 && index + 1 !== gridElementsAll.value,
  "border-def-r":
    gridElementsAll.value - gridElementsX.value < index + 1 && index + 1 < gridElementsAll.value,
})

while (items.value.length < 25) {
  items.value.push({})
}
</script>
