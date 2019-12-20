<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール Footer要素
    .top_text
      p 左側の入力欄で各項目を入力すると、右側にjsonが出力されます。編集が完了したら、コピーボタンでjsonをコピーし、Githubリンクから更新しましょう。再読み込みすると編集前のデータに戻ります。
    .editor_wrapper
      .editor
        .property_wrapper
          h3.property Twitterアカウント
          input(v-model="twitter" placeholder="twitter ID").input_image
          .preview(v-if="twitter")
            .preview_link: a(:href="`https://twitter.com/${twitter}`" target="_blank") https://twitter.com/{{twitter}}
        .property_wrapper
          h3.property メールアドレス
          input(v-model="e_mail" placeholder="image.png").input_image
        .property_wrapper
          h3.property ブログリンク
          InputList(:lists="links" :id="'links'" @updateList="updateList" @addList="addList")
      .json_output
        .output_buttons_wrapper
          .op_btn(@click="jsonCopy()")
            span コピー
            .copy_button(:class="{'copy_success': copy_success}") {{copy_text}}
          a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/assets/jsons/footer.json" target="_blank").op_btn
            img(src="~/assets/imgs/edit_icon/link.svg").output_img
            span Githubへ
        h3.property index.json
        textarea(v-model="OutPut").textarea_output
    
</template>
<script>
//json
import footer_json from '~/assets/jsons/footer.json'
//components
import InputList from '~/components/atoms/InputList.vue'
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  layout: "develop",
  components:{
    GalleryImg,
    InputList
  },
  data(){
    return {
      twitter:"",
      e_mail:"",
      links:[],
      json: footer_json,
      output: "",
      copy_success:false,
      copy_text : ""
    }
  },
  mounted(){
    this.twitter = this.json.twitter
    this.e_mail = this.json.e_mail
    this.links = this.json.links
  },
  methods:{
    jsonCopy(e){
      navigator.clipboard
        .writeText(this.output)
        .then(() => {
          this.copy_text = "コピーしました"
          this.copy_success = true;
          setTimeout(() => {
            this.copy_success = false
          }, 1300)
        })
        .catch(e => {
          this.copy_text = "コピー失敗"
          this.copy_success = true;
          setTimeout(() => {
            this.copy_success = false
          }, 1300)
          console.error(e)
        })
    },
    updateList(id, list){
      if(id=="links"){
        this.links = list
      }
    },
    addList(id){
      if(id=="links"){
        let obj = {}
        obj.url = ""
        obj.text = ""
        this.links = this.links.concat(obj)
      }
    }
  },
  computed:{
    OutPut(){
      let output_object = {}
      output_object.twitter = this.twitter
      output_object.e_mail = this.e_mail.replace('@','◇')
      output_object.links = this.links
      let escape = JSON.stringify(output_object,undefined,2)
      this.output = escape
      return escape
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