<template>
  <div
    class="absolute rounded-xl border-def-l right-0 top-0 bg-def-opacity backdrop-filter backdrop-blur-sm h-full w-80"
    ref="activeItemBlock"
  >
    <div class="absolute top-0 left-0 w-full flex items-center justify-center">
      <img
        :src="activeItem?.image"
        alt="Item Image"
        class="max-w-40 max-h-40 py-7 object-contain"
        v-if="activeItem?.image"
      />
    </div>
    <div class="absolute bottom-0 left-0 w-full bg-def border-def-t p-3">
      <div class="btn-danger" v-show="!showDeleteInput" @click="showDeleteInput = true">
        Delete item
      </div>
      <div class="flex flex-col space-y-2" v-show="showDeleteInput">
        <input
          type="text"
          class="py-2 px-3 bg-def-600 rounded-lg placeholder:text-gray-500 text-gray-500 focus:outline-none"
          :class="{ 'border border-red-600': invalidInput }"
          placeholder="Count..."
          pattern="[0-9]*"
          inputmode="numeric"
          v-model="itemsCount"
          @input="filterItemsCount"
          @keyup.enter="updateItemCount"
        />
        <div class="flex space-x-2 w-full">
          <div class="btn-white w-1/2" @click="() => close()">Cancel</div>
          <div class="btn-danger w-1/2" @click="updateItemCount">Delete item</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ItemType } from "@/types"

const props = defineProps<{
  activeItem: ItemType | undefined
}>()

const emit = defineEmits<{
  (e: "close", payload?: boolean): void
}>()

const isActiveItemClosable = ref(false)
const activeItemBlock = ref(null)
const showDeleteInput = ref(false)
const itemsCount = ref("")
const invalidInput = ref(false)

const filterItemsCount = (event: Event) =>
  (itemsCount.value = event.target!.value.replace(/[^0-9]/g, ""))

const close = (removeItem?: boolean) => {
  isActiveItemClosable.value = false
  invalidInput.value = false
  itemsCount.value = ""
  showDeleteInput.value = false
  document.body.removeEventListener("click", exitActiveItem)
  emit("close", removeItem)
}

const updateItemCount = () => {
  if (!itemsCount.value) return
  else if (+itemsCount.value > props.activeItem!.count!) {
    invalidInput.value = true
    return
  }

  props.activeItem!.count = props.activeItem!.count! - +itemsCount.value

  close(props.activeItem!.count === 0 ? true : undefined)
}

const exitActiveItem = (event: Event) => {
  if (isActiveItemClosable.value && !activeItemBlock.value!.contains(event.target)) close()
  else isActiveItemClosable.value = true
}

watch(props, newProps => {
  if (newProps.activeItem) document.body.addEventListener("click", exitActiveItem)
})
</script>
