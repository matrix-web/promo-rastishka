<template>
  <section class="hero">
    <div class="container">
      <div class="hero__content">
        <div class="hero__column">
          <div class="badge hero__badge">
            <svg
              width="166"
              height="39"
              viewBox="0 0 166 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.610779 26.5732C3.50577 33.3572 10.0853 38.0128 17.7176 38.0128C14.9542 31.3619 8.37463 26.5732 0.610779 26.5732Z"
                fill="#12B36A"
              />
              <path
                d="M17.7175 38.1463C23.3759 38.1463 28.2447 34.6879 30.4818 29.8992C24.8234 29.7662 19.9545 33.2247 17.7175 38.1463Z"
                fill="#12B36A"
              />
              <ellipse
                cx="16.3514"
                cy="14.5356"
                rx="9.44431"
                ry="9.44428"
                fill="#133E90"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.7175 28.7015C25.4814 28.7015 31.6662 22.3166 31.6662 14.6016C31.7978 6.75352 25.4814 0.368652 17.7175 0.368652C10.0853 0.368652 3.76892 6.75352 3.76892 14.4686C3.76892 22.3166 10.0853 28.7015 17.7175 28.7015ZM17.7175 21.5185C21.5337 21.5185 24.6918 18.3261 24.6918 14.4686C24.6918 10.611 21.6653 7.41861 17.7175 7.41861C13.9014 7.41861 10.7432 10.611 10.7432 14.4686C10.7432 18.3261 13.9014 21.5185 17.7175 21.5185Z"
                fill="#FEBE10"
              />
              <path
                d="M107.726 14.4686H113.516V37.3477H107.726V28.4355H97.4616V37.3477H91.6716V14.4686H97.4616V22.9818H107.726V14.4686ZM116.411 20.1884H123.648V37.4807H129.57V20.1884H136.807V14.4686H116.411V20.1884ZM165.099 32.426V37.3477C164.046 37.8798 162.862 38.1458 161.415 38.1458C158.388 38.1458 156.809 36.8156 156.283 34.6873L156.151 34.8204C154.44 37.0817 151.94 38.1458 148.782 38.1458C145.755 38.1458 143.124 36.9486 141.018 34.6873C138.913 32.293 137.86 29.4996 137.86 26.0412C137.86 22.7157 138.913 19.7893 141.018 17.528C143.255 15.1337 145.755 13.9365 148.782 13.9365C151.809 13.9365 154.177 15.0007 155.888 16.9959V14.6016H161.678V30.8298C161.678 32.16 162.336 32.9581 163.52 32.9581C164.178 32.8251 164.704 32.6921 165.099 32.426ZM156.151 25.9081C156.151 24.0459 155.625 22.4497 154.309 21.2525C153.124 20.0554 151.677 19.3903 149.835 19.3903C147.992 19.3903 146.545 19.9223 145.361 21.2525C144.176 22.4497 143.65 24.0459 143.65 25.9081C143.65 27.7704 144.176 29.3666 145.361 30.5638C146.545 31.7609 147.992 32.293 149.835 32.293C151.677 32.293 153.124 31.7609 154.309 30.5638C155.493 29.3666 156.151 27.9034 156.151 25.9081ZM43.5094 14.4686L43.3778 23.1148C43.3778 26.5732 43.2462 28.3025 42.7198 30.2977C42.325 32.16 41.4039 32.6921 39.9564 32.6921C39.5616 32.6921 39.0353 32.6921 38.7721 32.5591V37.4807C39.1669 37.7468 39.9564 37.8798 41.0091 37.8798C45.0885 37.7468 47.0623 35.7515 48.115 32.293C48.773 29.7657 48.9046 27.9034 49.0362 24.977L49.1678 20.3214H56.4053V37.6137H62.1952V14.4686H43.5094ZM71.6698 27.5044C72.3277 31.3619 75.3543 32.6921 78.5125 32.6921C80.6179 32.6921 82.7234 31.894 84.0393 30.6968L87.5923 34.4213C85.4868 36.8156 82.4602 38.1458 78.3809 38.1458C72.5909 38.1458 65.7482 34.6873 65.7482 26.0412C65.7482 17.395 72.4593 13.9365 78.1177 13.9365C85.2236 13.9365 88.2502 17.395 88.2502 21.1195C88.2502 27.3713 80.3548 30.1647 71.6698 27.5044ZM81.8023 21.7846C81.8023 20.0554 80.0916 19.2572 78.1177 19.2572C75.0911 19.2572 72.5909 20.5874 71.8014 23.7799C77.8545 25.5091 81.8023 24.1789 81.8023 21.7846Z"
                fill="#133E90"
              />
            </svg>
          </div>
          <TheTitle
            class-name="hero__title"
            :level="4"
            is-upper-case
            is-stroke
            text="ПОТОМУ ЧТО ПОЛЕЗНОЕ ДОЛЖНО БЫТЬ КАЖДЫЙ ДЕНЬ"
          >
            ПОТОМУ ЧТО ПОЛЕЗНОЕ ДОЛЖНО БЫТЬ КАЖДЫЙ ДЕНЬ
          </TheTitle>

          <Button
            class="hero__button"
            variant="secondary"
            @click="$emit('register')"
            >Зарегистрировать чек</Button
          >
        </div>
        <div class="hero__img-wrapper">
          <picture class="hero__picture">
            <source
              media="(max-width: 767px)"
              srcset="@/assets/images/products/product.webp 1x"
              type="image/webp"
            />
            <source
              media="(max-width: 767px)"
              srcset="@/assets/images/products/product.png 1x"
              type="image/png"
            />
            <source
              media="(min-width: 768px)"
              srcset="@/assets/images/products/product.png 1x"
              type="image/png"
            />
            <source
              media="(min-width: 768px)"
              srcset="@/assets/images/products/product.webp 1x"
              type="image/webp"
            />
            <img
              class="hero__img"
              loading="lazy"
              src="@/assets/images/products/product.png"
              srcset="@/assets/images/products/product.png 1x"
              alt="background"
              sizes="100vw"
            />
          </picture>
        </div>
      </div>
      <div class="info">
        <InfoBlock
          class="hero__info-block"
          v-for="infoItem of infoList"
          :key="infoItem.step"
          :step="infoItem.step"
          :title="infoItem.title"
          :description="infoItem.description"
        />
      </div>
    </div>

    <picture class="hero__background">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-320.png 1x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-320.png 1x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-320@2x.png 2x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-320@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 479.5px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-375.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 479.5px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-375.png 1x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 479.5px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-375@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 479.5px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-375@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1024@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1440@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1440@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <img
        src="@/assets/images/backgrounds/hero/hero-bg-1440.png"
        srcset="@/assets/images/backgrounds/hero/hero-bg-1440.png 1x"
        sizes="100vw"
        alt="green background"
      />
    </picture>
    <picture class="hero__decor-item hero__decor-item--raspberry">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/raspberry-320.png 1x"
        type="image/png"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/raspberry-320.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/decor/raspberry-375.png 1x"
        type="image/png"
      />

      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/decor/raspberry-375.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/raspberry-1024.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/raspberry-1024.png 1x"
        type="image/png"
      />

      <source
        media="(max-width: 1024px)"
        srcset="@/assets/images/decor/raspberry-1024.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 1024px)"
        srcset="@/assets/images/decor/raspberry-1024.png 1x"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/raspberry-1440.png"
        srcset="@/assets/images/decor/raspberry-1440.png 1x"
        alt="raspberry"
      />
    </picture>
    <picture class="hero__decor-item hero__decor-item--strawberry">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/strawberry-320.png 1x"
        type="image/png"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/strawberry-320.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/strawberry-375.png 1x"
        type="image/png"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/strawberry-375.webp 1x"
        type="image/webp"
      />

      <img
        src="@/assets/images/decor/strawberry.png"
        srcset="@/assets/images/decor/strawberry.png 1x"
        alt="strawberry"
      />
    </picture>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const infoList = ref([
  {
    step: 1,
    title: 'Покупайте',
    description: 'продукты «Растишка» в магазинах «Лента»'
  },
  {
    step: 2,
    title: 'Регистрируйте',
    description: 'чеки на сайте'
  },
  {
    step: 3,
    title: 'Выигрывайте',
    description: 'классные призы!'
  }
])
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding-top: 38px;
  overflow: hidden;

  @include lg {
    padding-top: 46px;
    max-height: 630px;
    overflow: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  @include xl {
    padding-top: 60px;
    max-height: 650px;
    overflow: initial;

    &::-webkit-scrollbar {
      width: initial;
    }
  }

  &__button.secondary {
    font-size: 18px;
    line-height: 20px;
    border-radius: 60px;

    @include md {
      font-size: 21px;
      line-height: 24px;
      border-radius: 10px;
    }
  }

  &__info-block {
    &:not(:last-child) {
      margin-bottom: 24px;
    }

    @include md {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
  }

  &__background {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2;

    @include md {
      top: -33%;
      height: initial;
    }

    @include lg {
      top: -24%;
    }

    @include xl {
      top: -14%;
    }

    img {
      width: 100%;

      @media (min-width: 480px) {
        width: initial;
      }

      @include lg {
        width: 99.97vw;
        max-height: 660px;
      }
    }
  }

  &__decor-item {
    &--raspberry {
      position: absolute;
      z-index: -3;
      top: 39%;

      @media (min-width: 330px) {
        top: 45%;
      }

      @include s {
        top: 49%;
      }

      @media (min-width: 440px) {
        top: 55%;
      }

      @media (min-width: 480px) {
        top: 49%;
      }

      @include md {
        display: block;
        top: 55%;
      }

      @include lg {
        top: 62%;
      }

      @include xl {
        left: -3px;
        top: 69%;
      }
    }

    &--strawberry {
      position: absolute;
      right: 0;
      bottom: 10%;

      @include md {
        display: none;
      }

      @include xl {
        display: block;
      }

      // @media (min-width: 1500px) {
      //   bottom: 3%;
      // }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 10;

    @include md {
      flex-direction: row;
    }
  }

  &__title {
    margin-bottom: 16px;

    @include lg {
      margin-bottom: 22px;
    }

    @include xl {
      margin-bottom: 26px;
    }
  }

  &__column {
    max-width: 100%;
    margin-bottom: 25px;

    @media (min-wdith: 768px) {
      max-width: 420px;
      margin-bottom: 0;
    }

    @include lg {
      max-width: 561px;
    }

    @include xl {
      margin-right: 63px;
    }
  }

  &__badge {
    margin-bottom: 14px;

    @include xl {
      margin-bottom: 38px;
    }
  }

  &__img-wrapper {
    max-width: 400px;
    margin: 0 auto;

    @include md {
      max-width: 400px;
      width: 100%;
    }

    @include lg {
      max-width: 412px;
      flex-shrink: 0;
      width: initial;
    }

    @include xl {
      flex-shrink: initial;
      max-width: 496px;
    }
  }

  &__img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.container {
  padding: 0 15px 0 17px;

  @include md {
    max-width: 730px;
    margin: 0 auto;
    padding: 0;
  }

  @include lg {
    max-width: 953px;
    margin: 0 auto;
  }

  @include xl {
    max-width: 1120px;
    margin: 0 auto;
  }
}

.badge {
  background-color: var(--color-white);
  display: inline-block;
  padding: 6px 15px;
  border-radius: 60px;

  @include md {
    padding: 12px 25px 19px 25px;
  }
}

.info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0 60px 0;
  z-index: 10;
  border-bottom: 3px dashed var(--color-blue);

  @include md {
    flex-direction: row;
  }
}
</style>
