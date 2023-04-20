<template>
  <div :class="['check-status', `${variant}`]">
    <div class="check-steps">
      <div class="check-steps__step" data-text="1">1</div>
      <div class="check-steps__step" data-text="2">2</div>
      <div class="check-steps__step" data-text="3">3</div>
      <div class="check-steps__step">
        <div class="check-steps__step-circle">
          <span class="check-steps__step-text" data-text="100000">
            100000 <span data-text="рублей">рублей</span>
          </span>
        </div>
      </div>
    </div>
    <div class="check-text">
      <span class="check-text__item" data-text="чек">чек</span>
      <span class="check-text__item" data-text="чека">чека</span>
      <span class="check-text__item" data-text="чека">чека</span>
      <span class="check-text__item" data-text="главный приз на твою мечту"
        >главный приз на твою мечту</span
      >
    </div>
    <div class="check-line">
      <ul class="check-dots">
        <li
          ref="dots"
          v-for="dot in dotsList"
          :key="dot"
          class="check-dot"
        ></li>
      </ul>
      <div style="width: 0%" class="check-progress" ref="progress"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, watch } from '#imports'
import { onMounted, ref } from 'vue'

interface Props {
  count: number
  variant?: 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const countCheck = toRef(props, 'count')

const progress = ref<HTMLDivElement | null>(null)
const dots = ref<HTMLLIElement[] | null>(null)
const dotsList = [0, 1, 2, 3]

const update = (activeItem: number) => {
  dots.value?.forEach((item, idx) => {
    if (idx < activeItem) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }

    const activeDots = dots.value
      ? dots.value.filter(item => item.classList.contains('active'))
      : []
    if (progress.value && dots.value) {
      progress.value.style.width = `${
        ((activeDots.length - 1) / (dots.value?.length - 1)) * 100
      }%`
    }
  })
}

watch(
  () => props.count,
  value => {
    update(value)
  }
)

onMounted(() => {
  update(countCheck.value)
})
</script>

<style lang="scss" scoped>
.check-status {
  position: relative;
  max-width: 1036px;
  width: 100%;
  margin: 0 auto;
  padding: 11px;
  background-color: var(--color-gray-100);
  border-radius: 20px;
  box-shadow: 0px 10px 12px rgba(168, 199, 201, 0.18);
  @include lg {
    padding: 24px 20px;
  }

  &.secondary {
    .check-steps {
      top: -44px;
      min-height: 53px;

      @include md {
        top: -78px;
      }

      @include lg {
        top: -68px;
        min-height: 83px;
      }

      &__step {
        font-size: 24px;

        @include md {
          font-size: 40px;
        }

        &:first-child {
          left: 0;
        }

        &:nth-child(2) {
          left: 3.5%;

          @media (min-width: 480px) {
            left: 3%;
          }

          @media (min-width: 576px) {
            left: 2.5%;
          }

          @include md {
            left: 2.5%;
          }

          @include xl {
            left: 1.5%;
          }
        }

        &:nth-child(3) {
          left: 5.5%;

          @media (min-width: 480px) {
            left: 4.5%;
          }

          @media (min-width: 576px) {
            left: 4.5%;
          }

          @include md {
            left: 4%;
          }

          @include lg {
            left: 3%;
          }

          @include xl {
            left: 2%;
          }
        }

        &:last-child {
          left: 1%;

          @media (min-width: 480px) {
            left: 2%;
          }

          @include md {
            left: 0;
          }

          @include lg {
            left: -2%;
          }
        }

        &-circle {
          width: 53px;
          height: 53px;

          @include md {
            width: 83px;
            height: 83px;
          }
        }

        &-text {
          font-size: 15px;

          @include md {
            font-size: 24px;
          }

          span {
            font-size: 13px;

            &::before {
              left: 3px;

              @include md {
                left: 10px;
              }
            }

            @include md {
              font-size: 21px;
            }
          }
        }
      }
    }

    .check-text {
      bottom: -48px;

      @include md {
        bottom: -68px;
      }

      @include lg {
        bottom: -38px;
      }

      &__item {
        font-size: 12px;
        line-height: 24px;

        @include md {
          font-size: 18px;
        }

        &:first-child {
          left: 0;
        }

        &:nth-child(2) {
          left: 2.5%;

          @media (min-width: 480px) {
            left: 3.5%;
          }

          @media (min-width: 576px) {
            left: 2.5%;
          }

          @include md {
            left: 2.5%;
          }

          @include lg {
            left: 4.5%;
          }
        }

        &:nth-child(3) {
          left: 5%;

          @media (min-width: 480px) {
            left: 6%;
          }

          @media (min-width: 576px) {
            left: 5.5%;
          }

          @include md {
            left: 5.5%;
          }

          @include lg {
            left: 8.5%;
          }

          @include xl {
            left: 7.5%;
          }
        }

        &:last-child {
          left: 4%;
          max-width: 70px;
          font-size: 12px;
          line-height: 1.2;

          @include md {
            max-width: 108px;
            left: 0;
            font-size: 16px;
            line-height: 24px;
          }

          @include lg {
            max-width: 140px;
          }

          @include xl {
            max-width: 155px;
          }
        }
      }
    }

    .check-line {
      padding: 6px 10px 6px 5px;

      @include md {
        padding: 3px 5px;
      }
    }
  }
}
.check-line {
  position: relative;
  height: 20px;
  padding: 6px 5px;
  border-radius: 40px;
  background-color: var(--color-blue);
  @include md {
    padding: 3px 5px;
  }
  @include lg {
    padding: 3px 42px 3px 5px;
  }
}
.check-dots {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}
.check-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-white);
  border-radius: 50%;
  outline: 4px solid transparent;
  @include md {
    width: 14px;
    height: 14px;
    outline-width: 8px;
  }
  &.active {
    outline-color: var(--color-red);
  }
}
.check-progress {
  position: absolute;
  width: 35%;
  height: 20px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background-color: var(--color-light-green);
  z-index: 0;
  transition: 0.15s linear;
}
.check-text {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 96%;
  bottom: -45px;

  @include md {
    bottom: -48px;
    width: 100%;
  }
  @include lg {
    bottom: -38px;
  }
  &__item {
    display: block;
    font-weight: 700;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-blue);
    position: relative;
    z-index: 0;
    @include lg {
      font-size: 24px;
      line-height: 24px;
    }
    &:first-child {
      left: 0%;
      @include xl {
        left: -1%;
      }
    }
    &:nth-child(2) {
      left: 4.5%;
      @include md {
        left: 1.5%;
      }

      @media (min-width: 576px) {
        left: 2.5%;
      }

      @include md {
        left: 1.5%;
      }

      @include lg {
        left: 3%;
      }
      @include xl {
        left: 2%;
      }
    }
    &:nth-child(3) {
      left: 8.5%;
      @media (min-width: 480px) {
        left: 6.5%;
      }
      @media (min-width: 576px) {
        left: 5.5%;
      }
      @include md {
        left: 2.5%;
      }
      @include lg {
        left: 4.5%;
      }
    }
    &:last-child {
      left: 2%;
      max-width: 70px;
      width: 100%;
      color: var(--color-white);
      @include s {
        left: 3%;
      }

      @include md {
        left: 0;
      }

      @include lg {
        left: -1%;
        max-width: 188px;
      }
      &::before {
        -webkit-text-stroke-color: var(--color-blue);
      }
    }
    &::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;
      -webkit-text-stroke: 5px var(--color-white);
    }
  }
}
.check-steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  width: 96%;
  top: -110px;
  min-height: 120px;

  @include md {
    width: 100%;
  }

  &__step {
    font-size: 20px;
    font-weight: 700;
    line-height: 44px;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-blue);
    position: relative;
    z-index: 0;
    &::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      z-index: -1;
      -webkit-text-stroke: 4px var(--color-white);
    }
    @include s {
      font-size: 24px;
    }

    @include lg {
      font-size: 54px;
    }
    &:first-child {
      left: 1.5%;
      @media (min-width: 480px) {
        left: 0.5%;
      }
      @include lg {
        left: 0;
      }
    }
    &:nth-child(2) {
      left: 4.5%;

      @media (min-width: 480px) {
        left: 3.5%;
      }
      @media (min-width: 576px) {
        left: 3.5%;
      }
      @include md {
        left: 1.5%;
      }
    }
    &:nth-child(3) {
      left: 7%;
      @media (min-width: 480px) {
        left: 5.5%;
      }
      @include md {
        left: 1.5%;
      }
    }
    &:last-child {
      left: 2%;

      @media (min-width: 576px) {
        left: 3%;
      }

      @include md {
        left: -1%;
      }
      @include lg {
        left: -3%;
      }
    }
    &-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 53px;
      height: 53px;
      background-color: var(--color-red);
      border-radius: 50%;
      @include lg {
        width: 126px;
        height: 126px;
      }
    }
    &-text {
      max-width: 130px;
      position: relative;
      display: block;
      z-index: 0;
      font-size: 16px;
      line-height: 0.9;
      font-weight: 700;
      color: var(--color-white);
      text-transform: initial;
      @include lg {
        font-size: 38px;
      }
      span {
        display: block;
        position: relative;
        z-index: 0;
        font-size: 13px;
        @include lg {
          font-size: 32px;
        }
        &::before {
          content: attr(data-text);
          position: absolute;
          left: 5px;
          z-index: -1;
          -webkit-text-stroke: 6px var(--color-red);
        }
      }
      &::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        z-index: -1;
        -webkit-text-stroke: 6px var(--color-red);
      }
    }
  }
}
</style>
