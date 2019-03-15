<template lang="pug">
.menu
  .logo: nuxt-link(to="./")
    img.top-logo(src="~/assets/images/logo.svg")
  nav.navigation
    .nav-item: nuxt-link(to="./about")
      .nav-item-text ABOUT
      .nav-item-wave: img(src="~/assets/images/wave_white.svg")
    .nav-item: nuxt-link(to="./gallery")
      .nav-item-text GALLERY
      .nav-item-wave: img(src="~/assets/images/wave_white.svg")
    .nav-item: nuxt-link(to="./result")
      .nav-item-text RESULT
      .nav-item-wave: img(src="~/assets/images/wave_white.svg")
    .nav-item: nuxt-link(to="./news")
      .nav-item-text NEWS
      .nav-item-wave: img(src="~/assets/images/wave_white.svg")
    
</template>

<script>
export default {
  data(){
    return {
      now_page:"index"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.menu{
  width: 100%;
  height: 80px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: $theme-blue;
}
.logo{
  padding-left: 20px;
  img.top-logo{
    display: block;
    width: auto;
    height: 48px;
    opacity: 1;
    transition: .3s $bezier-ease-out;
    &:hover{
      opacity: .7;
    }
  }
}
.navigation {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  padding-right: 20px;
  .nav-item{
    position: relative;
    height: 100%;
    padding: 0 18px;
    background-color: $theme-blue;
    transition: .5s $bezier-ease-out;
    .nav-item-text {
      @include noto-font(2rem,$white);
      padding: 24px 18px;
    }
    .nav-item-wave {
      position: absolute;
      display: block;
      margin: auto;
      width: 0px;
      height:4px;
      left: 0;
      right: 0;
      bottom: 16px;
      overflow: hidden;
      transform: translateX(0);
      transition: .5s $bezier-ease-out;
      img{
        display: block;
        width: 92px;
        height:4px;
        transform: translateX((-92px/2));
        transition: .5s $bezier-ease-out;
      }
    }
    &:hover{
      background-color: $theme-sky;
    }
    .nuxt-link-active {
      .nav-item-wave {
        width: 92px;
        img{
          transform: translateX(0);
        }
      }
    }
  }
}
</style>