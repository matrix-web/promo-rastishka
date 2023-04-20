<template>
  <div class="pagination">
    <ul class="pagination__list">
      <button
        @click="handlePrev"
        aria-label="previous"
        class="pagination__button pagination__button--left"
        :disabled="currentPage === 1"
      >
        <svg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.09443 1.14276L1.12874 6.5909L6.16285 11.9759"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <li
        :class="['pagination__item', { active: pageNumber === currentPage }]"
        v-for="pageNumber of paginationRange"
        :key="pageNumber"
        @click="handlePageChange(pageNumber)"
      >
        {{ pageNumber === DOTS ? DOTS : pageNumber }}
      </li>
      <button
        aria-label="next"
        @click="handleNext"
        class="pagination__button pagination__button--right"
        :disabled="currentPage === lastPage"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16061 12.1005L6.12631 6.65236L1.0922 1.26738"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { range } from "~/helpers";
const DOTS = "...";

interface Props {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
});

const page = toRef(props, "currentPage");

const emit = defineEmits<{
  (event: "pageChange", page: number): void;
}>();

const paginationRange = computed(() => {
  const totalPageCount = Math.ceil(props.totalCount / props.pageSize);
  const totalPageNumbers = props.siblingCount + 5;
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }
  const leftSiblingIndex = Math.max(page.value - props.siblingCount, 1);
  const rightSiblingIndex = Math.min(
    page.value + props.siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * props.siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, props.totalCount];
  }
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * props.siblingCount;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      props.totalCount
    );

    return [firstPageIndex, DOTS, ...rightRange];
  }
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
});

const lastPage =
  paginationRange.value &&
  paginationRange.value[paginationRange.value.length - 1];

const handlePageChange = (pageNum: number | string) => {
  if (typeof pageNum === "number") {
    emit("pageChange", pageNum);
  }
};

const handleNext = () => {
  emit("pageChange", page.value + 1);
};

const handlePrev = () => {
  if (page.value - 1 > 0) {
    emit("pageChange", page.value - 1);
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  &__list {
    position: relative;
    display: inline-flex;
    align-items: center;
    // min-width: 177px;
    padding: 12px 30px;
    background-color: var(--color-white);
    border-radius: 30px;
    font-family: var(--font-regular);
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark-blue);
    transition: var(--transition-duration) ease;
    padding: 0 10px;
    cursor: pointer;

    &.active {
      color: var(--color-red);
    }

    &:hover {
      color: rgba(222, 26, 61, 0.8);
    }
  }

  &__button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: var(--color-red);
    transition: var(--transition-duration) ease;

    &:hover {
      background-color: rgba(222, 26, 61, 0.8);
    }

    &:disabled {
      background-color: var(--color-gray-100);
    }

    &--right {
      right: -10px;
    }

    &--left {
      left: -10px;
    }
  }
}
</style>
