<template>
  <Modal class="restore" :modal-id="modalId">
    <header class="restore__header">
      <p class="restore__title">На указанный e-mail был отправлен пароль</p>
    </header>
    <div class="restore__action">
      <Button @click="handleLogin" variant="secondary" is-small is-upper-case
        >Войти в лк</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ModalId, useVfm } from 'vue-final-modal'

interface Props {
  modalId: ModalId
  clickToClose?: boolean
  escToClose?: boolean
}

defineProps<Props>()

const { close, open } = useVfm()

const handleLogin = () => {
  close('restore')
  open('login')
}
</script>

<style lang="scss" scoped>
.restore {
  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 26px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: var(--color-black);

    @include md {
      font-size: 28px;
    }
  }

  &__action {
    display: flex;
    justify-content: center;
  }
}
</style>
