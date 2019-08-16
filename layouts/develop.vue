<template lang="pug">
  .develop
    .menu
      .logo: nuxt-link(to="/")
        img.top-logo(src="~/assets/imgs/logo.svg")
      .title Developers site
    nuxt.nuxt
</template>
<script>
export default {
  head() {
    const title = `奈良高専水泳部 Developers site`;
    return {
      title: title,
      meta: [
        { name: 'robots', content: 'noindex' },
      ]
    };
  }
}
</script>
<style lang="scss">
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.develop{
  .menu{
    width: 100%;
    height: 80px;
    display: flex;
    flex-wrap: nowrap;
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
  .title {
    padding-left: 30px;
    @include noto-font(2.5rem);
    color: #fff;
  }
  .nuxt{
    padding: 30px 0;
  }
}

html{
  font-family: $noto-font, "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 62.5%;
  color: $theme-blue;
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
  @include noto-font(1.5rem);
}

.container {
  width: calc(100% - 120px);
  margin: auto;
}

p {
  margin-bottom: 1rem;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
a:link,a:visited {
  color: $theme-sky;
  text-decoration: none;
}
:focus {
  outline: none;
}
</style>