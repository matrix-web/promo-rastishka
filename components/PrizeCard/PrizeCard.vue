<template>
  <section class="prize-card">
    <div class="prize-card__img">
      <template v-if="isSlideImg">
        <Swiper
          :loop="true"
          :navigation="{
            nextEl: '.nav-button--next',
            prevEl: '.nav-button--prev',
          }"
          :space-between="50"
          :slides-per-view="1"
          :modules="[SwiperNavigation]"
          @slide-change="handleChangeSlide"
        >
          <SwiperSlide
            class="prize-card__slide"
            v-for="slide in slides"
            :key="slide.id"
          >
            <Image class="prize-card__picture" :img="slide.img" />
          </SwiperSlide>
        </Swiper>
        <button class="nav-button nav-button--prev" aria-label="previous">
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
        <button class="nav-button nav-button--next" aria-label="next">
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
      </template>
      <Image class="prize-card__img-item" v-else-if="img" :img="img" />
    </div>
    <div class="prize-card__content">
      <p
        v-if="
          (activeItem.name === 'prize-100-m' && activeItem.content?.title) ||
          isSpecialTitle
        "
        :data-text="activeItem.content?.title || title"
        class="prize-card__special-title"
      >
        {{ activeItem.content?.title || title }}
      </p>
      <TheTitle v-else class="prize-card__title" :level="5" is-upper-case>{{
        activeItem.content?.title || title
      }}</TheTitle>
      <p
        v-if="activeItem.content?.subtitle || subtitle"
        class="prize-card__text"
      >
        {{ activeItem.content ? activeItem.content.subtitle : subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IImage, ISlideImgItem } from "@/helpers/interfaces";
import type { Swiper } from "swiper";

const activeItem = ref<ISlideImgItem>({} as ISlideImgItem);

interface Props {
  title: string;
  subtitle?: string;
  isSlideImg?: boolean;
  isSpecialTitle?: boolean;
  img?: IImage;
  slides?: ISlideImgItem[];
}

const props = defineProps<Props>();

const handleChangeSlide = (swiper: Swiper) => {
  if (props.slides) {
    activeItem.value = props.slides[swiper.realIndex];
  }
};
</script>

<style lang="scss">
.prize-card {
  max-width: 283px;
  &__img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 247px;
    height: 247px;
    margin: 0 auto;
    margin-bottom: 22px;
    border-radius: 50%;
    background-image: url("~/assets/images/backgrounds/circle-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &-item img {
      max-height: 202px;
    }
  }
  &__picture img {
    max-height: 178px;
    max-width: 250px;
  }

  &__content {
    text-align: center;
    font-family: var(--font-regular);
  }
  &__title {
    margin-bottom: 4px;
  }
  &__special-title {
    margin-top: -5px;
    position: relative;
    z-index: 0;
    font-family: var(--font-regular);
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.1;
    color: var(--color-white);

    &::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;
      -webkit-text-stroke: 10px var(--color-blue);
    }
  }
  &__text {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: var(--color-gray-600);
  }
}
.nav-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-red);
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  &--prev {
    left: -20px;
  }
  &--next {
    right: -20px;
  }
}
</style>
