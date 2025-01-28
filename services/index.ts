import type { ItemType } from "~/types"
import type { Ref } from "vue"

export const getItemClassesByIndex = (
  index: number,
  gridElementsX: Ref<number>,
  gridElementsAll: Ref<number>
) => ({
  "border-def-br":
    (index + 1) % gridElementsX.value !== 0 &&
    index + 1 < gridElementsAll.value - gridElementsX.value,
  "border-def-b": (index + 1) % gridElementsX.value === 0 && index + 1 !== gridElementsAll.value,
  "border-def-r":
    gridElementsAll.value - gridElementsX.value < index + 1 && index + 1 < gridElementsAll.value,
})

export const initItems = () =>
  [
    {
      id: 1,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fminecraft_zh_gamepedia%2Fimages%2Fb%2Fb1%2FNetherite_Chestplate_(item%252C_netherite_trimmed)_JE2.png",
      count: 4,
      position: 17,
    },
    {
      id: 2,
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages3.wikia.nocookie.net%2F__cb20111001070117%2Fminecraft%2Fimages%2F6%2F67%2FCobblestone.png",
      count: 1,
      position: 3,
    },
    {
      id: 3,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwiki.hypixel.net%2Fimages%2F2%2F22%2FMinecraft_items_hopper.png",
      count: 5,
    },
  ] as ItemType[]
