<template lang="pug">
.index
  header
    .title
      img.title-img(src="~/assets/imgs/title.svg" alt="We are NITNC SWIMMERS!!")
    .subtitle 奈良高専水泳部へようこそ！
  main
    section.intro
      .container
        .culumns
          .message-wrapper
            .message
              p(v-for="intro_text in index.intro_text" v-html="intro_text")
            .link-button
          .photo
            img(:src="`../image/${index.image_file_name}`")
              
    section
  footer
</template>

<script>
import index_json from '~/assets/jsons/index.json'
export default {
  data(){
    return{
      index:index_json
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
header {
  width: 100%;
  height: 340px;
  background-color: $theme-blue;
  background-image: url("~assets/imgs/pool_top.png");
  background-size:cover;
  padding: 60px;
  .title {
    margin-top: 18px;
    background: $white;
    padding: 28px 36px;
    width: min-content;
    .title-img {
      width: auto;
      display: block;
      height: 50px;
      padding-right: 8px;
    }
  }
  .subtitle {
    margin-top: 12px;
    display: inline-block;
    width: auto;
    background: $white;
    padding: 4px 30px;
    @include noto-font(2.4rem);
    font-weight: bold;
    letter-spacing: 0.2rem;
  }
}
.culumns {
  display: flex;
  flex-wrap: nowrap;
}
section {
  margin: 60px 0;
}
.intro {
  .message-wrapper{
    width: 100%;
    padding-right: 60px;
  }
  .message{
    padding: 28px;
    @include noto-font(2rem);
    letter-spacing: 0.2rem;
    p {
      margin-bottom: 1.6rem;
    }
  }
  .photo {
    width: 800px;
    img{
      width: 800px;
      height: auto;
    }
  }
}
</style>
