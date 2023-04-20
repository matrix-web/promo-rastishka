<template>
  <div class="display">
    <span
      class="display__final-text"
      v-if="isShowResult && type !== 'mobile' && type !== 'tablet'"
      >Итого:</span
    >
    <ul class="display__vitamins" v-if="isShowResult">
      <li
        class="display__vitamin"
        v-for="(item, index) in vitaminsData"
        :key="index"
      >
        <div class="display__vitamin-block">
          <p
            class="display__vitamin-circle"
            :class="{ 'm-blue': item.eng === 'Са' }"
          >
            {{ item.eng }}
          </p>
          <p class="display__vitamin-name">{{ item.ru }}</p>
        </div>
        <p class="display__equals">
          = {{ Math.round(vitamins[item.equals]) }}%
        </p>
      </li>
    </ul>
    <div class="display__final" v-if="isShowResult">
      <span
        class="display__final-text"
        v-if="type === 'mobile' && type === 'tablet'"
        >Итого:</span
      >
      <p class="display__final-result">
        Запаса Растишки хватит на
        <span class="m-red">{{ enough }}</span>
        {{ `вкусн${pluralizeRussianWord(enoughRounded, ["ый", "ых", "ых"])}` }}
        и
        {{ `полезн${pluralizeRussianWord(enoughRounded, ["ый", "ых", "ых"])}` }}
        {{ `д${pluralizeRussianWord(enoughRounded, ["ень", "ня", "ня"])}` }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "~/composables/breakpoints";
import { pluralizeRussianWord } from "~/utils";
import { computed } from "#imports";

const props = defineProps({
  enough: {
    type: String,
    required: true,
  },
  vitamins: {
    type: Object,
    required: true,
  },
  isShowResult: {
    type: Boolean,
    default: false,
  },
});

const vitaminsData = [
  {
    eng: "Са",
    ru: "кальций",
    equals: "ca",
  },
  {
    eng: "D",
    ru: "витамин д",
    equals: "d",
  },
];

const enoughRounded = computed(() => {
  const [integer] = props.enough.split(",");
  return integer;
});

const { width, type } = useBreakpoints();
</script>

<style scoped lang="scss">
.display {
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
}
</style>
