<script setup lang="ts">
import {
  computed,
  onMounted,
  onBeforeUnmount,
  useBreakpoints,
  useRoute
} from '#imports'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

const props = defineProps({
  isAuth: {
    type: Boolean,
    default: false
  }
})

const { width, type } = useBreakpoints()
const route = useRoute()

const menu: {
  id: string
  title: string
  link: string
  hash?: string
  isActive?: boolean
  type?: 'link' | 'pdf'
}[] = [
  {
    id: 'home',
    title: 'Главная',
    link: '/',
    hash: '',
    isActive: route.hash === '' && route.path === '/'
  },
  {
    id: 'lk',
    title: 'Личный кабинет',
    link: '/account',
    hash: '',
    isActive: route.name === 'account'
  },
  {
    id: 'rules',
    title: 'Правила',
    link: '/rules.pdf',
    hash: '',
    type: 'pdf',
    isActive: false
  },
  {
    id: 'prizes',
    title: 'Призы',
    link: '/',
    hash: '#prizes',
    isActive: route.hash === '#prizes'
  },
  {
    id: 'winners',
    title: 'Победители',
    link: '/',
    hash: '#winners',
    isActive: route.hash === '#winners'
  },
  {
    id: 'account',
    title: 'Калькулятор пользы',
    link: '/calculator',
    hash: '',
    isActive: route.name === 'calculator'
  },
  {
    id: 'questions',
    title: 'Вопрос-ответ',
    link: '/',
    hash: '#questions',
    isActive: route.hash === '#questions'
  }
]

const links = computed(() => {
  return props.isAuth && type.value === 'mobile'
    ? menu
    : menu.filter(item => item.id !== 'lk')
})

const emit = defineEmits<{
  (event: 'click', ev: MouseEvent): void
}>()
const handleMenuClick = (event: MouseEvent) => emit('click', event)

onMounted(() => {
  const el = document.querySelector('#menu')

  if (el) {
    disableBodyScroll(el)
  }
})

onBeforeUnmount(() => clearAllBodyScrollLocks())
</script>

<template>
  <div class="menu" ref="el" id="menu">
    <div class="menu__overlay" @click="handleMenuClick"></div>
    <nav class="menu__nav container">
      <ul class="menu__list">
        <li v-for="(item, index) in links" :key="index" class="menu__item">
          <NuxtLink
            v-if="item.type !== 'pdf'"
            :to="{ path: item.link, hash: item.hash }"
            class="menu__link"
            :class="{ 'm-active': item.isActive }"
            @click="handleMenuClick"
            >{{ item.title }}</NuxtLink
          >
          <a
            v-if="item.type === 'pdf'"
            class="menu__link"
            target="_blank"
            :href="item.link"
            :class="{ 'm-active': item.isActive }"
            >{{ item.title }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 100;
  left: 0;
  top: 0;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(217, 217, 217, 0.01);
    backdrop-filter: blur(10.5px);
    width: 100%;
    height: 100%;

    @include md {
      top: 65px;
    }

    @include lg {
      top: 115px;
    }
  }
  &__nav {
    position: relative;
    padding-top: 78px;
    padding-bottom: 48px;
    z-index: 102;

    @include s {
      padding-top: 100px;
      padding-bottom: 73px;
    }

    @include md {
      margin-left: 50%;
    }
    @include lg {
      margin-left: 55%;
    }
    @include xl {
      margin-left: 67%;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 300%;
      height: 300%;
      background-color: var(--color-red);
      border-radius: 50%;
      box-shadow: -4px 10px 28px rgba(0, 0, 0, 0.25);
      z-index: -1;

      @include md {
        width: 972px;
        height: 978px;
        transform: none;
        bottom: -20%;
        left: -40%;
      }
      @include lg {
        left: -36%;
      }
      @include xl {
        left: -50%;
        transform: translateX(10%);
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__link {
    font-family: inherit;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: var(--color-white);

    @include s {
      font-size: 32px;
      line-height: 37px;
    }
    @include lg {
      font-size: 36px;
      line-height: 42px;
    }

    &.m-active {
      border-bottom: 4px dotted #ffffff;
    }
  }
}
</style>
