<template>
  <section class="prizes" id="prizes">
    <div class="container">
      <TheTitle
        :level="2"
        is-stroke
        is-upper-case
        text="Призы"
        class="prizes__title"
      >
        Призы
      </TheTitle>

      <div class="prizes-cards">
        <PrizeCard
          class="prizes__card"
          :is-slide-img="false"
          :img="{
            path: getImageUrlLocal('сoloring-book', 'png'),
            alt: 'coloring book',
            srcset: `${getImageUrlLocal('сoloring-book', 'png')} 1x`,
            sources: [
              {
                media: '(min-width: 768px)',
                srcset: `${getImageUrlLocal('сoloring-book', 'png')} 1x`,
                type: 'image/png'
              },
              {
                media: '(max-width: 767px)',
                srcset: `${getImageUrlLocal('сoloring-book', 'webp')}} 1x`,
                type: 'image/webp'
              }
            ]
          }"
          title="Гарантированно"
          subtitle="диджитал раскраска"
        />
        <PrizeCard
          class="prizes__card"
          :is-slide-img="true"
          :slides="newSlides"
          title="Каждую неделю"
          subtitle="Велосипед и другие призы"
        />
        <PrizeCard
          class="prizes__card"
          :is-slide-img="false"
          :isSpecialTitle="true"
          :img="{
            path: getImageUrlLocal('prize-100', 'png'),
            alt: '100 000 рублей',
            srcset: `${getImageUrlLocal('prize-100', 'png')} 1x`,
            sources: [
              {
                media: '(min-width: 768px)',
                srcset: `${getImageUrlLocal('prize-100', 'png')} 1x`,
                type: 'image/png'
              },
              {
                media: '(max-width: 767px)',
                srcset: `${getImageUrlLocal('prize-100', 'webp')} 1x`,
                type: 'image/webp'
              }
            ]
          }"
          title="главный приз на твою мечту"
        />
      </div>
      <div class="prizes__action">
        <Button variant="secondary" @click="$emit('register')"
          >Зарегистрировать чек</Button
        >
      </div>
    </div>
    <picture class="prizes__decor-img prizes__decor-img--apple">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/apple-320.webp"
        type="image/webp"
      />
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/apple-320.png"
        type="image/png"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/apple-375.webp"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/apple-375.png"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/apple.png"
        srcset="@/assets/images/decor/apple.png"
        alt="apple"
        loading="lazy"
      />
    </picture>
    <picture class="prizes__decor-img prizes__decor-img--plum">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/plum-320.webp"
        type="image/webp"
      />
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/plum-320.png"
        type="image/png"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/plum-375.webp"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/plum-375.png"
        type="image/png"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-1024.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-1024.png"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/plum.png"
        srcset="@/assets/images/decor/plum.png"
        alt="apple"
        loading="lazy"
      />
    </picture>
  </section>
</template>

<script setup lang="ts">
import { prizeSlides, prizeSlidesMobile } from '@/helpers/mocks'
import { ExtType, ISlideImgItem } from '~/helpers/interfaces'

const isMobile = ref<boolean>(false)

const getImageUrlLocal = (name: string, ext: ExtType) => {
  return getImageUrl(`../../../images/prizes/${name}`, ext, import.meta.url)
}
const newSlides = ref()

const handleResize = () => {
  isMobile.value = window.matchMedia('(max-width: 1023.5px)').matches
}

const changePrizeList = (prizes: ISlideImgItem[]) => {
  return prizes.map(item => {
    const regExpExt = /\w{3,4}$/
    const imgExt = regExpExt.exec(item.img.path)?.[0] as ExtType
    return {
      ...item,
      img: {
        ...item.img,
        path: getImageUrlLocal(item.name, imgExt),
        srcset: getImageUrlLocal(item.name, imgExt),
        sources: item.img.sources?.map(source => {
          const sourceExt = regExpExt.exec(source.type)?.[0] as ExtType
          return {
            ...source,
            srcset: getImageUrlLocal(item.name, sourceExt)
          }
        })
      }
    }
  })
}

watch(isMobile, prev => {
  newSlides.value = prev
    ? changePrizeList(prizeSlidesMobile)
    : changePrizeList(prizeSlides)
})

onMounted(() => {
  newSlides.value = changePrizeList(prizeSlides)
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<style lang="scss" scoped>
.prizes {
  position: relative;
  padding: 120px 0 65px;

  @include s {
    padding: 90px 0 56px;
  }

  @include md {
    padding: 60px 0 84px;
    background-position: -6% -3%;
  }

  @include lg {
    padding: 0 0 84px;
    background-position: 0 102%;
  }

  @include xl {
    padding: 80px 0 70px;
    background-position: 0 90%;
  }

  &__title {
    text-align: center;
    margin-bottom: 33px;

    @include md {
      margin-bottom: 32px;
    }
  }

  &__card {
    &:first-child {
      display: none;
    }
    &:last-child {
      display: none;
    }

    @include lg {
      &:first-child {
        display: block;
      }
      &:last-child {
        display: block;
      }
    }
  }

  &-cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 32px;

    @include md {
      margin-bottom: 22px;
    }

    @include lg {
      justify-content: space-around;
    }

    @include xl {
      justify-content: space-between;
      margin-bottom: 70px;
    }
  }

  &__action {
    display: flex;
    justify-content: center;
  }

  &__decor-img {
    position: absolute;

    &--apple {
      right: 0;
      z-index: 10;

      @include s {
        right: 0;
        bottom: -10%;
      }

      @include md {
        display: none;
      }

      @include xl {
        display: block;
        bottom: -20%;
        right: 0;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    &--plum {
      top: 2%;

      @include lg {
        top: initial;
        bottom: 4%;
      }
    }
  }
}

.container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
