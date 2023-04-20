<template>
  <Table
    variant="secondary"
    :headers="headers"
    :table-data="tableData"
    :limit="limit"
    :total-count="store.receiptsTotalCount"
    :current-page="currentPage"
    is-paginate
    is-block
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { IReceipt, ITableHeader } from '~/helpers/interfaces'
import { useMainStore } from '~/store'
import { formatPrice } from '~/utils'
import moment from 'moment'

const store = useMainStore()

interface Props {
  headers: ITableHeader[]
  receipts: IReceipt[] | null
  nonClickedRows?: number[]
  isPaginate?: boolean
  totalCount?: number
  limit?: number
  currentPage?: number
  isBlock?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 10,
  isBlock: true
})

const currentPage = ref<number>(1)

const tableData = computed(() => {
  return props.receipts?.length
    ? props.receipts.map(item => {
        return {
          id: item.id,
          date: moment(item.created_at).format('DD.MM.YYYY HH:mm'),
          checkdata: `${formatPrice(+item.s)}`,
          status: item.description,
          prize: item.prizes.length
            ? item.prizes.map(item => item.prize.name).join(', ')
            : '-'
        }
      })
    : []
})

const handlePageChange = (page: number) => (currentPage.value = page)
</script>
