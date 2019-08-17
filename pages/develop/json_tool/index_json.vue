<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール indexページ
    .top_text
      p 簡単な入力UIで入力したデータを、それぞれのJsonのファイル形式にして出力するツールです。
    .editor_wrapper
      .editor
        .property_wrapper
          h3.property トップのテキスト
          textarea(v-model="intro_text" placeholder="トップのテキスト" autofocus).textarea_intro_text
        .property_wrapper
          h3.property トップの画像ファイル名
          input(v-model="image_file_name" placeholder="image.png" autofocus).input_image
          .preview(v-if="image_file_name")
            .preview_img: GalleryImg(:src="`../../image/top/${image_file_name}`" :alt="'TOP画像'").preview_img_com
        .property_wrapper
          h3.property ブログリンク
          input(v-model="blog" placeholder="https://" autofocus).input_blog
          .preview(v-if="blog")
            .preview_link: a(:href="blog" target="_blank") {{blog}}
      .json_output
        h3.property Json Output
        textarea(v-model="OutPut").textarea_output
    
</template>
<script>
//json
import index_json from '~/assets/jsons/index.json'
//components
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  layout: "develop",
  components:{
    GalleryImg
  },
  data(){
    return {
      intro_text:"",
      image_file_name:"",
      blog:"",
      json: index_json,
    }
  },
  mounted(){
    this.intro_text = this.json.intro_text.join(`\n`)
    this.image_file_name = this.json.image_file_name
    this.blog = this.json.blog
  },
  computed:{
    OutPut(){
      let output_object = {}
      output_object.intro_text = this.intro_text.split(`\n`)
      output_object.image_file_name = this.image_file_name
      output_object.blog = this.blog
      let escape = JSON.stringify(output_object,undefined,2)
      return escape
      console.log(output_object)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
@import "~/assets/style/json_output.scss";



</style>