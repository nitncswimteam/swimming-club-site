<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール メンバーリスト
    .top_text
      p 左側の入力欄で各項目を入力すると、右側にjsonが出力されます。編集が完了したら、コピーボタンでjsonをコピーし、Githubリンクから更新しましょう。再読み込みすると編集前のデータに戻ります。
    .editor_wrapper
      .editor
        .property_wrapper
          h3.property 更新年月日
          input(v-model="update" placeholder="20xx/xx/xx 現在").input_update
        .property_wrapper
          h3.property メンバー数
          ul.numberlists
            li: .numberlist
              .numberlist_property 部員数（現役）
              input(v-model="number.all" :placeholder="list.length" type="number").input_number
              .numberlist_text 名
            li: .numberlist
              .numberlist_property 男子選手
              input(v-model="number.male" placeholder="00" type="number").input_number
              .numberlist_text 名
            li: .numberlist
              .numberlist_property 女子選手
              input(v-model="number.female" placeholder="00" type="number").input_number
              .numberlist_text 名
            li: .numberlist
              .numberlist_property その他の選手
              input(v-model="number.othergender" placeholder="00" type="number").input_number
              .numberlist_text 名　<small>※性別不詳など。0なら表示されません。</small>
            li: .numberlist
              .numberlist_property マネージャー(MG)
              input(v-model="number.manager" placeholder="00" type="number").input_number
              .numberlist_text 名
            li: .numberlist
              .numberlist_property 顧問教員
              input(v-model="number.teacher" placeholder="00" type="number").input_number
              .numberlist_text 名
        .property_wrapper
          h3.property メンバーリスト　<small>※部長,副部長,会計,MGはどの順番にあってもTOPに表示されます。</small>
          .memberlists
            .memli_input_wrapper.memli_input_wrapper_th
              .input_member_th.input_position 役職
              .input_member_th.input_grade 学年
              .input_member_th.input_department 学科
              .input_member_th.input_name 氏名
            .memberlist(v-for="(li,li_id) in list" :key="`dev_mem_li_${li_id}`")
              .list_updown
                button.inlist_btn(@click="listUp(li_id)" v-if="li_id!=0"): .up <
                button.inlist_btn(@click="listDown(li_id)" v-if="li_id!=list.length-1"): .down <
              .memli_input_wrapper
                input(v-model="li.position" placeholder="役職なし").input_member.input_position
                input(v-model="li.grade" placeholder="学年").input_member.input_grade
                input(v-model="li.department" placeholder="学科").input_member.input_department
                input(v-model="li.name" placeholder="氏名").input_member.input_name
              button.inlist_btn(@click="listDelete(li_id)") ×
            .add_list: button(@click="addList()").add_list_button +
      .json_output
        .output_buttons_wrapper
          .op_btn(@click="jsonCopy()")
            span コピー
            .copy_button(:class="{'copy_success': copy_success}") {{copy_text}}
          a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/assets/jsons/membersjson" target="_blank").op_btn
            img(src="~/assets/imgs/edit_icon/link.svg").output_img
            span Githubへ
        h3.property index.json
        textarea(v-model="OutPut").textarea_output
    
</template>
<script>
//json
import members_json from '~/assets/jsons/members.json'
//components
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  layout: "develop",
  components:{
    GalleryImg
  },
  data(){
    return {
      update:"",
      number:[],
      list:[],
      json: members_json,
      output: "",
      copy_success:false,
      copy_text : ""
    }
  },
  mounted(){
    this.update = this.json.update
    this.number = this.json.number
    this.list = this.json.list
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
    listUp(id){
      let content = this.list[id]
      let deleteArray = this.list.filter((n,i) => i !== id);
      deleteArray.splice(id-1,0,content);
      this.list = deleteArray
    },
    listDown(id){
      let content = this.list[id]
      let deleteArray = this.list.filter((n,i) => i !== id);
      deleteArray.splice(id+1,0,content);
      this.list = deleteArray
    },
    listDelete(id){
      let deleteArray = this.list.filter((n,i) => i !== id);
      this.list = deleteArray
    },
    addList(){
      let obj = {}
      obj.name = ""
      obj.grade = ""
      obj.department = ""
      obj.position = ""
      this.list = this.list.concat(obj)
    }
  },
  computed:{
    OutPut(){
      let output_obj = {}
      output_obj.update = this.update
      output_obj.number = this.number
      output_obj.list = this.list
      let escape = JSON.stringify(output_obj,undefined,2)
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

.property {
  small {
    font-weight: normal;
  }
}

.numberlists {
  list-style: circle;
}
li:first-child {
  input.input_number {
    border: 1px solid $theme-blue;
  }
}
.numberlist {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.numberlist_property {
  min-width: 160px;
}
input.input_number {
  display: inline-block;
  width: 56px;
  text-align: right;
  border-top: none;
  padding: 8px;
  padding-right: 0;
}
.numberlist_text {
  padding-left: 6px;
}

.memli_input_wrapper {
  display: flex;
  flex-wrap: nowrap;
  &_th {
    margin-left: 21px;
  }
}
.memberlist {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &:hover{
    input {
      background: rgba($theme-blue,.1);
    }
  }
}
input.input_member {
  display: inline-block;
  border-left: none;
  &:first-child{
    border: 1px solid $theme-blue;
  }
}
.input_member_th {
  display: inline-block;
  width: 100%;
  text-align: center;
  background: $theme-blue;
  font-weight: bold;
  padding: 2px 12px;
  color: #fff;
}

.input_{
  &position {
    width: 120px;
  }
  &grade {
    width: 60px;
  }
  &department {
    width: 150px;
  }
  &name {
    width: 150px;
  }
}

button.inlist_btn{
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  transition: .2s $bezier-ease-out;
  cursor: pointer;
  &:hover{
    background: $theme-blue;
    color: #fff;
  }
}
.list_updown {
  width: 21px;
  button.inlist_btn {
    display: block;
    width: 21px;
    height: 21px;
    margin: 0;
  }
}
.up {
  transform: rotateZ(90deg);
}
.down {
  transform: rotateZ(-90deg);
}

.add_list {
  margin: 4px 0;
  margin-left: 21px;
}
.add_list_button {
  width: 30px;
  height: 30px;
  font-size: 22px;
  border: none;
  border-radius: 15px;
  background: $theme-blue;
  color: #fff;
  transition: .2s $bezier-ease-out;
  cursor: pointer;
  &:hover{
    background: rgba($theme-blue,.7å);
  }
}
</style>