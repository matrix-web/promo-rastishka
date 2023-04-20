<template>
  <picture>
    <source
      v-for="source in img.sources"
      :media="source.media || ''"
      :srcset="source.srcset"
      :type="source.type"
    />
    <img
      :src="img.path"
      :alt="img.alt"
      :sizes="img.sizes"
      :srcset="img.srcset || ''"
      :loading="img.loading"
    />
  </picture>
</template>

<script setup lang="ts">
import { IImage } from '~/helpers/interfaces'

interface Props {
  img: IImage
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
