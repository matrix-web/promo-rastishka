<script setup lang="ts">
import Button from '~/components/Button/Button.vue'
import { useBreakpoints } from '#imports'

import cross from '@/assets/icons/cross.svg'
import burger from '@/assets/icons/burger.svg'
import { useVfm } from 'vue-final-modal'
import { useMainStore } from '~/store'

const props = defineProps({
  isAuth: {
    type: Boolean,
    default: false
  },
  isMenuOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'menu'): void
}>()
const { open } = useVfm()
const store = useMainStore()

const handleMenuClick = () => emit('menu')
const handleLoginClick = () => {
  open('login')
  if (props.isMenuOpen) handleMenuClick()
}

const handleLogoutClick = () => {
  store.logout()
}
const { width, type } = useBreakpoints()
</script>

<template>
  <header class="header">
    <picture>
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/background-red-s.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/background-red-s.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/background-red-m.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/background-red-m.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <img
        class="header__background"
        src="@/assets/images/backgrounds/background-red-m.png"
        srcset="@/assets/images/backgrounds/background-red-m.png 1x"
        alt="background"
        sizes="100vw"
      />
    </picture>

    <div class="header__container container">
      <NuxtLink
        to="/"
        @click="
          () => {
            if (isMenuOpen) handleMenuClick()
          }
        "
      >
        <img
          class="header__logo"
          src="@/assets/images/logo.svg"
          alt="Растишка"
          width="117"
          height="40"
      /></NuxtLink>

      <NuxtLink
        v-if="isAuth && type !== 'mobile'"
        class="header__button"
        to="/account"
        v-slot="{ navigate }"
      >
        <Button
          class="header__button"
          type="button"
          variant="primary"
          :isRounded="true"
          @click="navigate"
          >Личный кабинет</Button
        ></NuxtLink
      >

      <Button
        v-if="!isAuth"
        class="header__button"
        type="button"
        variant="primary"
        :isRounded="true"
        :isOutline="isMenuOpen"
        @click="handleLoginClick"
        >Вход</Button
      >
      <Button
        v-if="isAuth && type === 'mobile'"
        class="header__button"
        type="button"
        variant="primary"
        :isRounded="true"
        :isOutline="isMenuOpen"
        @click="handleLogoutClick"
        >Выйти</Button
      >
      <button
        v-if="isAuth && type !== 'mobile'"
        class="header__logout"
        aria-label="logout"
        @click="handleLogoutClick"
      >
        <img
          src="@/assets/icons/logout.svg"
          alt="Выйти"
          width="25"
          height="25"
        />
      </button>

      <button class="header__burger" aria-label="menu" @click="handleMenuClick">
        <img
          :src="isMenuOpen ? cross : burger"
          alt="Меню"
          width="31"
          height="23"
        />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  overflow: hidden;
  position: relative;

  &__container {
    display: flex;
    padding: 8px 13px;
    justify-content: space-between;
    align-items: center;
    // gap: 16px;
    z-index: 101;
    position: relative;

    @include s {
      padding: 10px 15px;
    }

    @include lg {
      // gap: 26px;
      padding: 20px 32px;
    }

    @include xl {
      padding: 20px 60px;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  &__logo {
    width: 100px;
    height: 35px;

    @include s {
      width: 117px;
      height: 40px;
    }

    @include lg {
      width: 214px;
      height: 73px;
    }
  }

  &__logout {
    margin-right: 16px;
    @include lg {
      margin-right: 26px;
    }
  }

  &__button {
    margin-left: auto;
    margin-right: 16px;

    @include lg {
      margin-right: 26px;
    }

    &.button {
      min-width: 72px;
      min-height: 26px;
      font-size: 12px;
      line-height: 14px;
      padding: 5px 22px;
      border-radius: 8px;

      @include s {
        font-size: 16px;
        line-height: 16px;
        min-width: 86px;
        min-height: 31px;
        padding: 7px 24px;
        border-radius: 10px;
      }

      @include lg {
        font-size: 18px;
        line-height: 21px;
        padding: 16px 24px;
        min-width: 118px;
        min-height: 50px;
      }
    }
  }

  &__burger {
    img {
      width: 26px;
      height: 20px;

      @include s {
        width: 31px;
        height: 23px;
      }
    }
  }
}
</style>
