<template lang="pug">
  img(src="" :alt="alt" v-lazy="src").image
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>


</style>