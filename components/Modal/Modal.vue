<template>
  <VueFinalModal
    :modalId="modalId"
    :clickToClose="clickToClose"
    :escToClose="escToClose"
    :overlayTransition="overlayTransition"
    :contentTransition="contentTransition"
    class="custom-modal"
    @before-close="$emit('beforeClose')"
    @before-open="$emit('beforeOpen')"
    @closed="$emit('closed')"
  >
    <div class="custom-modal__scroll" @click="close">
      <div class="custom-modal-window" @click.stop>
        <button class="custom-modal__close-btn" @click="close">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.28263 7.01147L13.734 1.55998C14.0887 1.20538 14.0887 0.632049 13.734 0.277453C13.3794 -0.077144 12.806 -0.077144 12.4514 0.277453L6.99994 5.72894L1.5486 0.277453C1.19384 -0.077144 0.62067 -0.077144 0.266073 0.277453C-0.0886909 0.632049 -0.0886909 1.20538 0.266073 1.55998L5.71741 7.01147L0.266073 12.463C-0.0886909 12.8176 -0.0886909 13.3909 0.266073 13.7455C0.44279 13.9224 0.675147 14.0112 0.907338 14.0112C1.13953 14.0112 1.37172 13.9224 1.5486 13.7455L6.99994 8.294L12.4514 13.7455C12.6283 13.9224 12.8605 14.0112 13.0927 14.0112C13.3249 14.0112 13.5571 13.9224 13.734 13.7455C14.0887 13.3909 14.0887 12.8176 13.734 12.463L8.28263 7.01147Z"
              fill="#333333"
            />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal, useVfm, ModalId } from 'vue-final-modal'
type TransitionType =
  | 'vfm-fade'
  | 'vfm-slide-down'
  | 'vfm-slide-up'
  | 'vfm-slide-right'
  | 'vfm-slide-left'
  | string

interface Props {
  modalId: ModalId
  clickToClose?: boolean
  escToClose?: boolean
  overlayTransition?: TransitionType
  contentTransition?: TransitionType
}

const vfm = useVfm()
const { modalId } = withDefaults(defineProps<Props>(), {
  clickToClose: true,
  escToClose: true,
  overlayTransition: 'vfm-fade',
  contentTransition: 'vfm-fade'
})

const close = () => {
  vfm.close(modalId)
}
</script>

<style lang="scss">
.custom-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &__scroll {
    position: absolute;
    inset: 0;
    overflow: overlay;
    min-height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-gray);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-red);
    }
  }

  &-window {
    display: flex;
    flex-direction: column;
    max-width: 370px;
    position: relative;
    background-color: var(--color-white);
    border: 1px solid var(--color-white);
    box-shadow: 0px 10px 12px rgb(168 199 201 / 18%);
    border-radius: 10px;
    padding: 31px 12px 25px;

    @include md {
      min-width: 492px;
      padding: 40px;
    }
  }

  &__close-btn {
    position: absolute;
    right: 15px;
    top: 15px;

    @include md {
      right: 24px;
      top: 24px;
    }
  }
}
</style>
