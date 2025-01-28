import { computed, type Ref } from "vue"
import { type CookieRef } from "#app"
import type { ItemType } from "~/types"

type ResultType = Array<ItemType | null>

const useSortedItems = (
  items: CookieRef<ItemType[] | null | undefined>,
  gridElementsAll: Ref<number>
) => {
  const initializeResultArray = () => {
    return Array(gridElementsAll.value).fill(null)
  }

  const fillResultWithPositionedItems = (result: ResultType) => {
    items.value!.forEach((item: ItemType | null) => {
      if (item?.position !== undefined && item?.position < gridElementsAll.value) {
        result[item!.position] = item
      }
    })
  }

  const findNextAvailableIndex = (result: ResultType) => {
    return result.findIndex((item: ItemType | null) => !item)
  }

  const fillResultWithUnpositionedItems = (result: ResultType) => {
    let nextAvailableIndex = findNextAvailableIndex(result)

    items.value!.forEach((item: ItemType | null) => {
      if (item?.position === undefined) {
        while (nextAvailableIndex < gridElementsAll.value) {
          if (result[nextAvailableIndex] === null) {
            result[nextAvailableIndex] = item
            item!.position = nextAvailableIndex
            break
          }
          nextAvailableIndex++
        }
      }
    })
  }

  const sortedItems = computed(() => {
    const result = initializeResultArray()
    fillResultWithPositionedItems(result)
    fillResultWithUnpositionedItems(result)
    return result
  })

  return { sortedItems }
}

export default useSortedItems
