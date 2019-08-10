<template lang="pug">
  header.mini_header
    .page_name {{name}}
    .title {{title}}
</template>
<script>
export default {
  props:["name","title"]
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.mini_header{
  width: 100%;
  height: 160px;
  background-color: $theme-blue;
  background-image: url("~assets/imgs/pool_top.png");
  background-size:cover;
  padding: 30px 60px;
  .page_name{
    margin-top: 2px;
    display: block;
    width: min-content;
    background: $white;
    padding: 2px 24px;
    @include noto-font(2rem);
    font-weight: bold;
    letter-spacing: .2rem;
  }
  .title {
    margin-top: 10px;
    display: inline-block;
    width: auto;
    background: $white;
    padding: 2px 24px;
    @include noto-font(2.8rem);
    font-weight: bold;
    letter-spacing: .2rem;
  }
}
</style>