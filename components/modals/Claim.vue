<template>
  <Modal
    class="claim"
    :modal-id="modalId"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
  >
    <header class="claim__header">
      <p class="claim__title">Добрый день</p>
    </header>
    <div class="claim__content">
      <p>
        Ваше обращение Вы можете направить на электронную почту Акции -
        <a href="mailto:info@promo.rastishka.ru" class="claim__link"
          >info@promo.rastishka.ru.</a
        >
      </p>
      <p>
        Все обращения обрабатываются в течение 3 рабочих дней с момента
        получения.
      </p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ModalId } from 'vue-final-modal'

interface Props {
  modalId: ModalId
  clickToClose?: boolean
  escToClose?: boolean
}

withDefaults(defineProps<Props>(), {
  clickToClose: true,
  escToClose: true
})
</script>

<style lang="scss" scoped>
.claim {
  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    color: var(--color-black);
  }

  &__content {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: var(--color-black);

    p:not(:last-of-type) {
      margin-bottom: 30px;
    }
  }

  &__link {
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    text-decoration: underline;
    color: inherit;
    cursor: pointer;
    transition: var(--transition-duration);

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
