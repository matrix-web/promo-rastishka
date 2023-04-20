<template>
  <table
    :class="['table', { block: isBlock, [`${variant}`]: Boolean(variant) }]"
  >
    <thead class="table-head">
      <tr class="table-head__row">
        <th
          v-for="head in headers"
          :key="head.field"
          class="table-head__heading"
        >
          {{ head.title }}
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr
        v-for="(row, idx) in isPaginate ? currentPageData : pageData"
        :key="idx"
        :class="[
          'table-body__row',
          { 'non-clicked': nonClickedRows.includes(idx) }
        ]"
        @click="
          () => (nonClickedRows.includes(idx) ? null : handleRowClick(row))
        "
      >
        <td v-for="(cell, idx) in fields" :key="idx" class="table-body__cell">
          {{
            //@ts-ignore
            row[cell]
          }}
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="isPaginate && tableDataPagination.length > 1"
    class="pagination-wrapper"
  >
    <Pagination
      :total-count="totalCount"
      :page-size="limit"
      :current-page="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ITableHeader } from '~/helpers/interfaces'

interface Props {
  headers: ITableHeader[]
  tableData: any
  nonClickedRows?: number[]
  isPaginate?: boolean
  totalCount?: number
  limit?: number
  currentPage?: number
  isBlock?: boolean
  variant?: 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  nonClickedRows: () => [],
  isPaginate: false,
  totalCount: 10,
  limit: 2,
  currentPage: 1
})

const emit = defineEmits<{
  (event: 'page-change', page: number): void
  (event: 'row-click', row: any): void
}>()

const page = toRef(props, 'currentPage')

const fields = computed<string[]>(() =>
  props.headers.map(header => header.field)
)

const handlePageChange = (page: number) => emit('page-change', page)

const handleRowClick = (row: any) => {
  emit('row-click', row)
}

const tableDataPagination = computed(() => {
  let devidedData = []

  for (let i = 0; i <= props.tableData.length; i += props.limit) {
    devidedData.push(props.tableData.slice(i, i + props.limit))
  }

  return devidedData
})

const currentPageData = computed(() => {
  // @ts-ignore
  return tableDataPagination.value[page.value - 1]
})

const pageData = computed(() => props.tableData)
</script>

<style lang="scss" scoped>
.table {
  border-collapse: separate;
  border-spacing: 0 7px;

  &.block {
    width: 100%;
  }

  &.secondary {
    .table-body__row {
      &:nth-child(odd) {
        background-color: transparent;
      }
    }
  }
}

.table-head {
  &__row {
    background-image: url('~/assets/images/backgrounds/background-red-m.webp');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px 20px 0 0;
  }

  &__heading {
    padding: 14px 4px;
    font-family: var(--font-regular);
    font-weight: 700;
    font-size: 11px;
    line-height: 1;
    text-align: center;
    letter-spacing: 0.03em;
    color: var(--color-white);

    @include s {
      padding: 14px 8px;
    }

    @include lg {
      padding: 21px 40px;
      font-size: 18px;
    }

    &:first-child {
      border-radius: 60px 0 0 60px;
    }
    &:last-child {
      border-radius: 0 60px 60px 0;
    }
  }
}

.table-body {
  &__row {
    background-color: var(--color-white);

    &.non-clicked {
      pointer-events: none;
    }
  }

  &__cell {
    padding: 14px 4px;
    font-family: var(--font-regular);
    font-weight: 400;
    font-size: 10px;
    line-height: 1;
    text-align: center;
    letter-spacing: 0.03em;
    color: var(--color-black);
    white-space: revert;

    &:first-child {
      border-radius: 60px 0 0 60px;
    }
    &:last-child {
      border-radius: 0 60px 60px 0;
    }

    @include s {
      padding: 14px 8px;
    }

    @include lg {
      padding: 21px 40px;
      font-size: 18px;
    }
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 27px;
}
</style>
