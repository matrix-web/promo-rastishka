<template>
  <section class="winners" id="winners">
    <div class="container">
      <header class="winners__header">
        <TheTitle :level="2" text="Победители" is-upper-case is-stroke
          >Победители</TheTitle
        >
      </header>
      <div class="winners__table" v-if="false">
        <div class="winners__search">
          <Input
            class="winners__search-field"
            placeholder="Поиск..."
            is-search
            name="search"
            v-model="search"
            @on-search="handleSearch"
          />
        </div>
        <Table
          class="winners__table"
          :headers="headers"
          :table-data="tableData"
          :total-count="meta?.last_page"
          :limit="meta?.per_page"
          :current-page="meta?.current_page"
          is-block
          is-paginate
          @page-change="page => emit('page-change', page)"
        />
      </div>
      <p class="winners__text">Победители будут определены позднее</p>
    </div>
    <picture class="winners__background">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-320.png 1x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-320.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-320@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-320@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-375.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-375.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-375@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-375@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024.png 1x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1024@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1440@2x.webp 2x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1440@2x.png 2x"
        sizes="100vw"
        type="image/png"
      />

      <source
        media="(min-width: 1920px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1440@2x.webp 1x"
        sizes="100vw"
        type="image/webp"
      />

      <source
        media="(min-width: 1920px)"
        srcset="@/assets/images/backgrounds/winners/green-bg-1440@2x.png 1x"
        sizes="100vw"
        type="image/png"
      />

      <img
        src="@/assets/images/backgrounds/winners/green-bg-1440.png"
        srcset="@/assets/images/backgrounds/winners/green-bg-1440.png 1x"
        sizes="100vw"
        loading="lazy"
        alt="green background"
      />
    </picture>
    <picture class="winners__decor winners__decor-1">
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/strawberry-rotated-320.png 1x"
        type="image/png"
      />
      <source
        media="(max-width: 320px)"
        srcset="@/assets/images/decor/strawberry-rotated-320.webp 1x"
        type="image/webp"
      />
      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/decor/strawberry-rotated-375.png 1x"
        type="image/png"
      />
      <source
        media="(max-width: 375px)"
        srcset="@/assets/images/decor/strawberry-rotated-375.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/strawberry-rotated.webp 1x"
        type="image/webp"
      />

      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/decor/strawberry-rotated.png 1x"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/strawberry-rotated.png"
        srcset="@/assets/images/decor/strawberry-rotated.png 1x"
        alt="background"
        loading="lazy"
      />
    </picture>
    <picture class="winners__decor winners__decor-2">
      <img
        src="@/assets/images/decor/bag.png"
        srcset="@/assets/images/decor/bag.png 1x"
        alt="background"
        loading="lazy"
      />
    </picture>
    <picture class="winners__decor winners__decor-3">
      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/decor/plum-1440.webp 1x"
        type="image/webp"
      />

      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/decor/plum-1440.png 1x"
        type="image/png"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-rotated-1024.webp 1x"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-rotated-1024.png 1x"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/plum-1440.png"
        srcset="@/assets/images/decor/plum-1440.png 1x"
        alt="background"
        loading="lazy"
      />
    </picture>
    <picture class="winners__decor winners__decor-4">
      <source
        media="(min-width: 1440px)"
        srcset="@/assets/images/decor/grape-1440.webp 1x"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/grape-1024.webp 1x"
        type="image/webp"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/grape-1024.png 1x"
        type="image/png"
      />

      <img
        src="@/assets/images/decor/grape-1440.png"
        srcset="@/assets/images/decor/grape-1440.png 1x"
        alt="background"
        loading="lazy"
      />
    </picture>
  </section>
</template>

<script setup lang="ts">
import { headers, tableData } from '~/helpers/mocks'
import { computed, ref, watch } from '#imports'
import { useMainStore } from '~/store'

const search = ref<string>('')
const store = useMainStore()

const emit = defineEmits<{
  (event: 'search', ev: string): void
  (event: 'page-change', ev: number): void
}>()

const handleSearch = () => {
  if (search.value) emit('search', search.value)
}
//
// watch(search, (newSearch) => {
//   emit("search", newSearch);
// });

// const tableData = computed(() => {
//   if (store.winners && store.winners.data?.length) {
//     return store.winners.data.map((item) => {
//       return {
//         date: item.created_at,
//         name: item.name,
//         email: item.email,
//         prize: item.prize,
//       };
//     });
//   }
//
//   return [];
// });

const meta = computed(() => {
  if (store.winners && store.winners?.meta) {
    return store.winners.meta
  }
  return undefined
})
</script>

<style lang="scss" scoped>
.winners {
  position: relative;
  padding: 0 0 50px;

  @include s {
    padding: 40px 0 25px;
  }

  @include md {
    padding: 0 0 90px;
  }

  @include lg {
    padding: 0 0 96px;
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 13px;
    z-index: 10;

    @include s {
      margin-bottom: 31px;
    }

    @include md {
      margin-bottom: 14px;
    }
  }

  &__search {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 26px;
    padding: 0 15px;

    @include s {
      margin-bottom: 14px;
      padding: 0 20px;
    }

    @include md {
      padding: 0;
    }

    &-field {
      max-width: 464px;
      width: 100%;

      @include md {
        max-width: 364px;
      }
    }
  }

  &__table {
    position: relative;
    z-index: 10;
  }

  &__text {
    text-align: center;
    position: relative;
    z-index: 10;

    max-width: 260px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: var(--color-blue);

    @include s {
      font-size: 18px;
      line-height: 21px;
      max-width: 270px;
    }

    @include lg {
      font-size: 31px;
      line-height: 31px;
      max-width: 472px;
    }
  }

  &__background {
    position: absolute;
    left: 0;
    top: -115px;
    z-index: 1;

    @include s {
      top: -132px;
    }

    @include xl {
      //top: -33%;
    }

    img {
      width: 99.97vw;
      height: 830px;
      display: block;
      object-fit: cover;
      object-position: center;

      @include lg {
        object-fit: initial;
        object-position: initial;
      }
    }
  }

  &__decor {
    position: absolute;

    &-1 {
      bottom: -13%;
      z-index: 4;
    }

    &-2 {
      display: none;

      @include xl {
        display: block;
        right: 0;
        bottom: -10%;
        z-index: 10;
      }
    }

    &-3 {
      display: none;
      @include lg {
        display: block;
        position: absolute;
        z-index: 10;
        left: 0;
        top: -16%;
      }

      @include xl {
        left: 9%;
        top: -18%;
      }
    }

    &-4 {
      z-index: 1;
      display: none;

      @include lg {
        display: block;
        top: -36%;
        right: 0;
      }

      @include xl {
        top: -80%;
        right: 0;
      }
    }
  }
}

.container {
  max-width: 100%;

  @include md {
    max-width: 730px;
  }

  @include lg {
    max-width: 952px;
    margin: 0 auto;
  }

  @include xl {
    max-width: 1120px;
  }
}
</style>
