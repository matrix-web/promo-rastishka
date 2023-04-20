<template>
  <div class="calculator">
    <picture>
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/light-375.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/light-375.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="
          @/assets/images/calculator/backgrounds/1024.png    1x,
          @/assets/images/calculator/backgrounds/1024@2x.png 2x
        "
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="
          @/assets/images/calculator/backgrounds/1024.webp    1x,
          @/assets/images/calculator/backgrounds/1024@2x.webp 2x
        "
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(min-width: 1440px)"
        srcset="
          @/assets/images/calculator/backgrounds/1440.png    1x,
          @/assets/images/calculator/backgrounds/1440@2x.png 2x
        "
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 1440px)"
        srcset="
          @/assets/images/calculator/backgrounds/1440.webp    1x,
          @/assets/images/calculator/backgrounds/1440@2x.webp 2x
        "
        sizes="100vw"
        type="image/webp"
      />
      <img
        class="calculator__background"
        src="@/assets/images/calculator/backgrounds/1024.png"
        srcset="
          @/assets/images/calculator/backgrounds/1024.png    1x,
          @/assets/images/calculator/backgrounds/1024@2x.png 2x
        "
        alt="background"
        sizes="100vw"
      />
    </picture>

    <TheTitle
      :level="2"
      is-stroke
      is-upper-case
      text="калькулятор пользы растишки"
      class="calculator__title"
    >
      калькулятор пользы растишки
    </TheTitle>

    <div class="calculator__calculator container">
      <Display
        :enough="vitaminsSum"
        :vitamins="vitamins"
        :is-show-result="isEquals"
      />
      <Interface
        :selected-products="selectedProducts"
        @plus="handlePlus"
        @equals="handleEquals"
        @reset="handleReset"
      />
    </div>

    <p class="calculator__footnote">
      Вся продукция представлена на&nbsp;<a
        class="calculator__link"
        href="https://rastishka.ru/products"
        target="_blank"
        >сайте</a
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import Display from "~/components/calculator/Display.vue";
import Interface from "~/components/calculator/Interface.vue";
import { Product } from "~/helpers/interfaces";
import { computed, ref } from "#imports";

let selectedProducts = ref<Product[]>([]);
const isEquals = ref<boolean>(false);

const vitaminsSum = computed(() => {
  if (!selectedProducts.value.length) return "0";
  let sum = 0;

  selectedProducts.value.forEach((item) => {
    sum += item.ca + item.d * (item.count ? item.count : 1);
  });

  return `${(sum / 100 / 2).toFixed(1).replace(".", ",")}`;
});

const vitamins = computed(() => {
  if (!selectedProducts.value.length) return { ca: 0, d: 0 };
  const sum = { ca: 0, d: 0 };

  selectedProducts.value.forEach((item) => {
    sum.ca += item.ca * (item.count ? item.count : 1);
    sum.d += item.d * (item.count ? item.count : 1);
  });

  return sum;
});

const handlePlus = (products: Product[]) => {
  selectedProducts.value = [...products];
};
const handleEquals = () => {
  isEquals.value = true;
};
const handleReset = () => {
  selectedProducts.value = [];
  isEquals.value = false;
};
</script>

<style scoped lang="scss">
.calculator {
  position: relative;
  padding: 44px 10px 18px;
  min-height: calc(100vh - 56px - 130px);

  @include s {
    padding: 35px 10px 60px;
    min-height: calc(100vh - 65px - 130px);
  }

  @include lg {
    padding: 74px 40px 80px;
    min-height: calc(100vh - 118px - 68px);
  }

  @include xl {
    padding: 74px 160px 88px;
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

  &__title {
    font-size: 30px;
    line-height: 33px;
    margin-bottom: 30px;
    text-align: center;

    @include s {
      font-size: 36px;
      line-height: 42px;
      margin-bottom: 35px;
    }

    @include lg {
      font-size: 44px;
      line-height: 60px;
      margin-bottom: 38px;
    }

    @include xl {
      margin-bottom: 28px;
    }
  }

  &__calculator {
    background-color: #f4f4f4;
    box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.25),
      inset 0 8px 0 var(--color-white);
    border-radius: 40px;
    padding: 18px 10px 30px;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 18px;

    @include s {
      padding: 22px 18px 24px;
    }

    @include lg {
      max-width: 1119px;
      padding: 38px 39px 32px;
      box-shadow: inset 0px -8.5076px 0px rgba(0, 0, 0, 0.25),
        inset 0px 8.5076px 0px var(--color-white);
      border-radius: 34px;
      margin-bottom: 38px;
    }

    @include xl {
      box-shadow: inset 0px -10px 0px rgba(0, 0, 0, 0.25),
        inset 0px 10px 0px var(--color-white);
      border-radius: 40px;
      padding: 44px 45px 39px;
      margin-bottom: 28px;
    }
  }

  &__display {
    background-color: var(--color-white);
    box-shadow: inset 0 6px 0 #b7b7b7;
    border-radius: 40px;
    width: 100%;
    min-height: 161px;
    overflow: inherit;
    margin-bottom: 13px;
    padding: 24px 14px 9px;

    @include s {
      margin-bottom: 24px;
      padding: 20px 28px 15px;
    }

    @include lg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 36px;
      box-shadow: inset 0 8.5076px 0 #b7b7b7;
      border-radius: 34px;
      min-height: 136px;
      margin-bottom: 32px;
    }

    @include xl {
      padding: 29px 39px;
      min-height: 161px;
      box-shadow: inset 0 10px 0 #b7b7b7;
      border-radius: 40px;
      margin-bottom: 38px;
    }
  }

  &__vitamins {
    display: flex;
    gap: 12px;
    border-bottom: 3px dashed var(--color-blue);
    padding-bottom: 15px;
    margin-bottom: 10px;
    justify-content: center;

    @include s {
      gap: 15px;
    }

    @include lg {
      border-bottom: none;
      border-right: 3px dashed var(--color-blue);
      padding-bottom: 0;
      padding-right: 26px;
      margin-bottom: 0;
      margin-right: 26px;
    }

    @include xl {
      gap: 19px;
      padding-right: 31px;
      margin-right: 31px;
    }
  }
  &__vitamin {
    display: flex;
    gap: 5px;
    align-items: center;

    @include lg {
      gap: 7px;
    }

    @include xl {
      gap: 8px;
    }
  }

  &__vitamin-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__vitamin-circle {
    font-weight: 700;
    font-size: 23px;
    line-height: 23px;
    color: var(--color-white);

    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #f7a707;
    margin-bottom: 3px;

    &.m-blue {
      background-color: #1cbbee;
    }

    @include lg {
      width: 45px;
      height: 45px;
      font-size: 27px;
      line-height: 27px;
    }

    @include xl {
      width: 53px;
      height: 53px;
      margin-bottom: 4px;
      font-size: 32px;
      line-height: 32px;
    }
  }

  &__vitamin-name {
    font-weight: 700;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    color: #a8a8a8;

    @include lg {
      font-size: 12px;
      line-height: 12px;
    }

    @include xl {
      font-size: 14px;
      line-height: 14px;
    }
  }

  &__equals {
    font-weight: 700;
    font-size: 21px;
    line-height: 21px;
    text-align: center;
    color: var(--color-gray-600);

    @include s {
      font-size: 23px;
    }

    @include lg {
      font-size: 27px;
      line-height: 25px;
    }

    @include xl {
      font-size: 32px;
      line-height: 29px;
    }
  }

  &__final {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  &__final-text {
    font-weight: 700;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    text-transform: uppercase;
    color: #da291c;

    @include lg {
      margin-right: 30px;
      font-size: 36px;
      line-height: 51px;
    }

    @include xl {
      font-size: 44px;
      line-height: 60px;
    }
  }

  &__final-result {
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: var(--color-gray-600);
    max-width: 161px;

    @include lg {
      font-size: 20px;
      line-height: 27px;
      max-width: 258px;
    }

    @include xl {
      font-size: 24px;
      line-height: 32px;
      max-width: 341px;
    }

    .m-red {
      color: var(--color-red);
    }
  }

  &__interface {
    width: 100%;
  }

  &__products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    column-gap: 20px;
    row-gap: 14px;

    @include lg {
      column-gap: 30px;
      grid-template-columns: repeat(6, 1fr);
    }
    @include xl {
      row-gap: 18px;
    }
  }

  &__product {
    max-width: 79px;
    position: relative;
    margin: 0 auto;
    width: 100%;

    @include s {
      max-width: 90px;
    }

    @include lg {
      max-width: 119px;
    }

    @include xl {
      max-width: 140px;
    }

    &:nth-child(11) {
      order: 8;

      @include lg {
        order: 5;
      }
    }
    &:nth-child(12) {
      order: 12;
    }
  }

  &__pin {
    position: absolute;
    top: -14px;
    right: -14px;
    font-weight: 900;
    font-size: 18px;
    line-height: 26px;
    color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--color-light-green);

    @include s {
      width: 36px;
      height: 36px;
      font-size: 24px;
      line-height: 34px;
    }
  }

  &__product-img {
    background-color: var(--color-white);
    box-shadow: inset 0px -3.35842px 0px rgba(0, 0, 0, 0.15),
      inset 0px 5.59737px 0px var(--color-white);
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    height: 79px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    transition: 0.2s;

    &:active {
      box-shadow: none;
    }

    @include s {
      height: 90px;
      box-shadow: inset 0px -3.87339px 0px rgba(0, 0, 0, 0.15),
        inset 0px 6.45565px 0px var(--color-white);
    }

    @include lg {
      box-shadow: inset 0px -5.10456px 0px rgba(0, 0, 0, 0.15),
        inset 0px 8.5076px 0px var(--color-white);
      border-radius: 17px;
      height: 119px;
      margin-bottom: 6px;
    }

    @include xl {
      box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.15),
        inset 0px 10px 0px var(--color-white);
      border-radius: 20px;
      height: 140px;
      margin-bottom: 8px;
    }

    img {
      max-width: 80%;
      max-height: 80%;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__name {
    font-weight: 700;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    color: var(--color-gray-600);

    @include s {
      font-size: 12px;
      line-height: 12px;
    }

    @include lg {
      font-size: 15px;
      line-height: 15px;
    }

    @include xl {
      font-size: 18px;
      line-height: 18px;
    }
  }

  &__control {
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 13px;
    color: var(--color-white);

    width: 79px;
    height: 79px;
    background-color: var(--color-red);
    box-shadow: inset 0px -3.35842px 0px rgba(0, 0, 0, 0.15);
    border-radius: 11px;
    transition: 0.2s;

    &.m-plus {
      background-color: var(--color-green);
    }

    @include s {
      font-size: 56px;
      line-height: 15px;
      width: 90px;
      height: 90px;
    }

    @include lg {
      font-size: 75px;
      line-height: 20px;
      width: 119px;
      height: 119px;
      box-shadow: inset 0px -5.10456px 0px rgba(0, 0, 0, 0.15);
      border-radius: 17px;
    }

    @include xl {
      width: 140px;
      height: 140px;
      box-shadow: inset 0px -6px 0px rgba(0, 0, 0, 0.15);
      border-radius: 20px;
      font-size: 88px;
      line-height: 24px;
    }

    &:active {
      box-shadow: none;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: var(--color-gray);
    }
  }

  &__footnote {
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    color: var(--color-blue);

    @include s {
      font-size: 18px;
      line-height: 32px;
    }

    @include lg {
      font-size: 32px;
      line-height: 32px;
    }
  }

  &__link {
    font-size: inherit;
    line-height: inherit;
    color: var(--color-red);
    text-decoration: underline;
  }
}
</style>
