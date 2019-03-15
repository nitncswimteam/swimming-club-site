<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
@import "~/assets/scss/normalize.scss";
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/mixin.scss";

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
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
a:link,a:visited {
  text-decoration: none;
}
:focus {
  outline: none;
}
</style>
