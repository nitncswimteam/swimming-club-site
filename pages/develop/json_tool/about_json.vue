<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール indexページ
    .top_text
      p 左側の入力欄で各項目を入力すると、右側にjsonが出力されます。編集が完了したら、コピーボタンでjsonをコピーし、Githubリンクから更新しましょう。再読み込みすると編集前のデータに戻ります。
        a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/static/image/about" target="_blank") ＞画像アップ先
    .editor_wrapper
      .editor
        .property_wrapper
          h3.property トップのテキスト
          textarea(v-model="top_text" placeholder="トップのテキスト").textarea_top_text
        .property_wrapper
          h3.property 今後の主な活動
          InputList(:lists="main_activities" :id="'act'" @updateList="updateList" @addList="addList")
        .property_wrapper
          h3.property Aboutページ掲載用写真
          InputList(:lists="photo" :id="'photo'" @updateList="updateList" @addList="addList")
      .json_output
        .output_buttons_wrapper
          .op_btn(@click="jsonCopy()")
            span コピー
            .copy_button(:class="{'copy_success': copy_success}") {{copy_text}}
          a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/assets/jsons/about.json" target="_blank").op_btn
            img(src="~/assets/imgs/edit_icon/link.svg").output_img
            span Githubへ
        h3.property about.json
        textarea(v-model="OutPut").textarea_output
</template>
<script>
//json
import about_json from '~/assets/jsons/about.json'
//components
import InputList from '~/components/atoms/InputList.vue'

export default {
  layout: "develop",
  components:{
    InputList
  },
  data(){
    return {
      top_text:"",
      main_activities:[],
      photo:[],
      json: about_json,
      output: "",
      copy_success:false,
      copy_text : ""
    }
  },
  mounted(){
    let txt_arry2 = this.json.top_text
    let txt_arry1 = []
    for (let i = 0; i < txt_arry2.length; i++) {
      txt_arry1.push(txt_arry2[i].join(`\n`))
    }
    this.top_text = txt_arry1.join(`\n\n`)
    this.main_activities = this.json.main_activities
    this.photo = this.json.photo
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
      if(id=="act"){
        this.main_activities = list
      }
      if(id=="photo"){
        this.photo = list
      }
    },
    addList(id){
      if(id=="act"){
        let obj = {}
        obj.name = ""
        obj.discription = ""
        this.main_activities = this.main_activities.concat(obj)
      }
      if(id="photo"){
        let obj = {}
        obj.file = ""
        obj.discription = ""
        this.photo = this.photo.concat(obj)
      }

    }
  },
  computed:{
    OutPut(){
      let output_object = {}
      let txt_arry2 = this.top_text.split(`\n\n`)
      let txt_arry1 = []
      for (let i = 0; i < txt_arry2.length; i++) {
        txt_arry1.push(txt_arry2[i].split(`\n`))
      }
      output_object.top_text = txt_arry1
      output_object.main_activities = this.main_activities
      output_object.photo = this.photo
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

.textarea_top_text {
  min-height: 170px;
}
</style>