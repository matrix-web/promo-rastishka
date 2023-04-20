<template>
  <div class="interface">
    <ul class="interface__products">
      <li
        class="interface__product"
        v-for="(product, index) in products"
        :key="product.id"
        :style="`order: ${index + 1}`"
      >
        <div class="interface__pin" v-if="isSelected(product)">
          {{ count(product) ? `+${count(product)}` : 0 }}
        </div>
        <button
          class="interface__product-img"
          :class="{
            'm-active': clickedProducts.find((item) => item.id === product.id),
            'm-selected': isSelected(product),
          }"
          aria-label="продукт"
          @click="handleProductClick(product)"
        >
          <picture>
            <source
              :srcset="`/images/products/${product.id}.webp  1x,
                /images/products/${product.id}@2x.webp 2x`"
              type="image/webp"
            />

            <img
              :src="`/images/products/${product.id}.png`"
              :srcset="`/images/products/${product.id}.png   1x,
                /images/products/${product.id}@2x.png 2x`"
              :alt="product.name"
            />
          </picture>
        </button>
        <p class="interface__name">
          {{ product.name + " " + product.weight }}
        </p>
      </li>
      <li class="interface__product">
        <button
          :class="{ 'm-small': isReset }"
          class="interface__control m-plus"
          aria-label="плюс"
          @click="handlePlusClick"
        >
          {{ isReset ? "обновить" : "+" }}
        </button>
      </li>
      <li class="interface__product">
        <button
          class="interface__control"
          aria-label="равно"
          :disabled="!selectedProducts || selectedProducts.length < 2"
          @click="handleEqualsClick"
        >
          =
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import products from "@/data/products";
import { ref } from "#imports";
import { Product } from "~/helpers/interfaces";

interface Props {
  selectedProducts: Product[];
}

const props = defineProps<Props>();
let clickedProducts = ref<Product[]>([]);
const isReset = ref<boolean>(false);

const isSelected = (product: Product) => {
  if (!props.selectedProducts || !props.selectedProducts.length) return false;

  return !!props.selectedProducts.find(
    (item: Product) => item.id === product.id
  );
};

const count = (product: Product) => {
  if (!props.selectedProducts || !props.selectedProducts.length)
    return undefined;

  return props.selectedProducts.find((item: Product) => item.id === product.id)
    ?.count;
};

const emit = defineEmits<{
  (event: "product", ev: Product): void;
  (event: "plus", ev: Product[]): void;
  (event: "equals"): void;
  (event: "reset"): void;
}>();

const handleProductClick = (product: Product) => {
  if (!isReset.value) {
    const selectedProduct = props.selectedProducts.find(
      (item) => item.id === product.id
    );
    const clickedProduct = clickedProducts.value.find(
      (item) => item.id === product.id
    );

    if (!clickedProduct) {
      if (selectedProduct) {
        clickedProducts.value.push({
          ...product,
          count: selectedProduct.count ? selectedProduct.count + 1 : 0,
        });
      } else {
        clickedProducts.value.push({
          ...product,
          count: 1,
        });
      }
    }

    emit("product", product);
  }
};

const handlePlusClick = () => {
  if (!isReset.value) {
    let products: Product[] =
      props.selectedProducts && props.selectedProducts.length
        ? props.selectedProducts
        : [];

    clickedProducts.value.forEach((item) => {
      const clickedInSelected = props.selectedProducts.find(
        (el) => el.id === item.id
      );

      if (clickedInSelected) {
        products = products.filter((el) => el.id !== item.id);
        products.push(item);
      } else products.push(item);
    });

    emit("plus", products);
    clickedProducts.value = [];
  } else {
    isReset.value = false;
    emit("reset");
  }
};

const handleEqualsClick = () => {
  isReset.value = true;
  emit("equals");
};
</script>

<style scoped lang="scss">
.interface {
  width: 100%;

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

    &.m-active {
      box-shadow: inset 0 6px 0 rgba(0, 0, 0, 0.15),
        inset 0 10px 0 var(--color-white);
    }
    &.m-selected {
      border: 1px solid var(--color-light-green);
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

    picture {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
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
    transition: box-shadow 0.2s;

    &.m-small {
      font-size: 16px;

      @include lg {
        font-size: 23px;
      }
    }

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
}
</style>
