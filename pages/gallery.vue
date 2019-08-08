<template lang="pug">
</template>

<script>
export default {
  components: {
  },
  head() {
    const title = `GALLERY｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/gallery/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      link: [{ rel: 'canonical', href: url }],
    };
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
</style>