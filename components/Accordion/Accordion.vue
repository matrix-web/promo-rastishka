<template>
  <div class="accordion">
    <div
      v-for="accordionItem in changedItems"
      :key="accordionItem.id"
      :class="[
        'accordion__item',
        {
          accordion__item_active: isMultiple
            ? accordionItem.isActive
            : activeItem === accordionItem
        }
      ]"
      @click="handleActive(accordionItem)"
    >
      <div class="accordion__header">
        <p class="accordion__title">
          {{ accordionItem.title }}
        </p>
        <span
          :class="[
            'accordion__arrow',
            {
              accordion__arrow_active: isMultiple
                ? accordionItem.isActive
                : activeItem === accordionItem
            }
          ]"
        ></span>
      </div>

      <Transition
        @enter="enter"
        @before-leave="enter"
        @after-enter="leave"
        @after-leave="leave"
        :duration="400"
      >
        <div
          style="overflow: hidden"
          v-if="
            isMultiple ? accordionItem.isActive : activeItem === accordionItem
          "
        >
          <div
            class="accordion__content"
            :aria-hidden="
              isMultiple ? accordionItem.isActive : activeItem === accordionItem
            "
            v-html="accordionItem.content"
            v-if="accordionItem.isActive"
          ></div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IItem {
  id: number
  title: string
  content: string
}

interface IChangedItem extends IItem {
  isActive: boolean
}

interface Props {
  items: IItem[]
  isMultiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMultiple: false
})

const activeItem = ref<IChangedItem | null>(null)

let itemsList = reactive<IChangedItem[]>(
  props.items.map(item => ({ ...item, isActive: false }))
)

let changedItems = computed<IChangedItem[]>({
  get() {
    return itemsList
  },
  set(value) {
    itemsList = value
  }
})

const enter = (el: HTMLDivElement) => {
  el.style.height = `${el.scrollHeight}px`
}

const leave = (el: HTMLDivElement) => {
  el.style.height = ''
}

const handleActive = (item: IChangedItem) => {
  if (!props.isMultiple) {
    activeItem.value = item
  } else {
    item.isActive = !item.isActive
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  display: block;
  width: 100%;
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;

    @include lg {
      padding: 15px 23px 15px 42px;
    }
  }
  &__arrow {
    display: block;
    position: absolute;
    right: 28px;
    top: 50%;
    width: 13px;
    height: 13px;
    border-bottom: 2px solid var(--color-red);
    border-right: 2px solid var(--color-red);
    transition: var(--transition-duration) ease;
    transform-origin: center;
    transform: rotate(45deg) translateY(-100%);

    @media (min-width: 480px) {
      right: 30px;
    }

    &_active {
      transform: rotate(-135deg);
      right: 17px;

      @include md {
        right: 14px;
      }
    }
  }
  &__item {
    background: var(--color-white);
    border-radius: 60px;
    cursor: pointer;
    transition: 0.3s ease;

    &_active {
      border-radius: 20px;
    }

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
  &__title {
    max-width: 90%;
    display: flex;
    font-family: var(--font-regular);
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: var(--color-black);

    @include lg {
      font-size: 21px;
      line-height: 24px;
    }
  }
  &__content {
    padding-top: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: var(--color-gray-600);
    overflow: hidden;

    padding: 0 14px 16px;
    // transition: 0.4s ease;

    @include lg {
      padding: 0 23px 15px 42px;
    }

    @include lg {
      font-size: 18px;
      line-height: 21px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  will-change: height;
  transition: height 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  height: 0 !important;
}
</style>
