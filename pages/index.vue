<template lang="pug">
mixin linkButton(link,text)
  .link-button: nuxt-link(to=link)
    .lb-innerBox: .lb-innerText=text
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
            .link-button-wrapper
              +linkButton('/about','ABOUTページへ')
              +linkButton('/about','水泳部ブログはこちら')
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
    overflow: auto;
  }
  .message{
    padding: 28px;
    @include noto-font(2rem);
    letter-spacing: 0.2rem;
    p {
      margin-bottom: 1.6rem;
    }
  }
  .link-button-wrapper{
    width: auto;
    float: right;
  }
  .link-button {
    position: relative;
    width: min-content;
    height: auto;
    margin: 10px;
    background-color: $theme-blue;
    background-image: url("~assets/imgs/wave_white.svg");
    background-repeat: repeat-x;
    background-size: 100px 30px;
    background-position: 0 center;
    transition: .3s $bezier-ease-out;
    .lb-innerBox {
      width: 300px - (48px * 2);
      height: 60px;
      margin: 0 48px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      background-color: $theme-blue;
      transition: .3s $bezier-ease-out;
      z-index: 1;
      .lb-innerText {
        width: auto;
        height: auto;
        color: #fff;
        font-size: 1.8rem;
      }
    }
    &:hover {
      background-color: $accent-red;
      animation: leftSlide 4s linear infinite;
      .lb-innerBox{
        background-color: $accent-red;
      }
    }
  }
  .photo {
    width: 120%;
    img{
      width: 100%;
      height: auto;
    }
  }
}

@keyframes leftSlide {
  0%    { background-position: 0px center;  }
  100%  { background-position: -100px center;  }
}
</style>
