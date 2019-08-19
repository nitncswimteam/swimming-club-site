<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール Galleryページ
    .top_text
      p 左側の入力欄で各項目を入力すると、右側にjsonが出力されます。編集が完了したら、コピーボタンでjsonをコピーし、Githubリンクから更新しましょう。再読み込みすると編集前のデータに戻ります。
        a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/static/image/gallery" target="_blank") ＞画像アップ先
    .editor_wrapper
      .editor
        .property_wrapper
          h3.property ギャラリーリスト
          .gallery_list(v-for="(gal, gal_id) in gallery" :key="`dev_gal_${gal_id}`")
            .list_updown
              button.inlist_btn(@click="listUp(gal_id)" v-if="gal_id!=0"): .up <
              button.inlist_btn(@click="listDown(gal_id)" v-if="gal_id!=gallery.length-1"): .down <
              button.inlist_btn(@click="listDelete(gal_id)") ×
            .gal_property
              .gal_property_text タイプ
              .gal_select_box: select(v-model="gal.type" @change="changeType(gal_id,gal.type)").gal_select
                option youtube
                option image
            .gal_property(v-if="gal.type=='youtube'")
              .gal_property_text Youtube 動画ID
              input(v-model="gal.video_id" placeholder="").gal_input.input_video
            .gal_property(v-if="gal.type=='image'")
              .gal_property_text 画像ファイル名
              input(v-model="gal.file" placeholder="xxxxxxxxxxx").gal_input.input_image
            .gal_property
              .gal_property_text タイトル
              input(v-model="gal.title" placeholder="画像タイトル").gal_input.input_title
            .gal_property
              .gal_property_text 説明
              input(v-model="gal.body" placeholder="画像の説明").gal_input.input_body
            .gal_property
              .gal_property_text(v-if="gal.type=='youtube'") 公開日
              .gal_property_text(v-if="gal.type=='image'") 撮影日
              input(v-model="gal.date" placeholder="0000/00/00").gal_input.input_date
            .preview(v-if="gal.type=='youtube' && gal.video_id")
                .preview_img: img(:src="`https://img.youtube.com/vi/${gal.video_id}/sddefault.jpg`" :alt="gal.title").preview_img_com
            .preview(v-if="gal.type=='image' && gal.file")
              .preview_img: GalleryImg(:src="`../../image/gallery/${gal.file}`" :alt="gal.title").preview_img_com
          .add_list: button(@click="addList()").add_list_button +
      .json_output
        .output_buttons_wrapper
          .op_btn(@click="jsonCopy()")
            span コピー
            .copy_button(:class="{'copy_success': copy_success}") {{copy_text}}
          a(href="https://github.com/nitncswimteam/swimming-club-site/blob/temporary/assets/jsons/gallery.json" target="_blank").op_btn
            img(src="~/assets/imgs/edit_icon/link.svg").output_img
            span Githubへ
        h3.property index.json
        textarea(v-model="OutPut").textarea_output
    
</template>
<script>
//json
import gallery_json from '~/assets/jsons/gallery.json'
//components
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  layout: "develop",
  components:{
    GalleryImg
  },
  data(){
    return {
      gallery:[],
      json: gallery_json,
      output: "",
      copy_success:false,
      copy_text : ""
    }
  },
  mounted(){
    this.gallery = this.json
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
      let content = this.gallery[id]
      let deleteArray = this.gallery.filter((n,i) => i !== id);
      deleteArray.splice(id-1,0,content);
      this.gallery = deleteArray
    },
    listDown(id){
      let content = this.gallery[id]
      let deleteArray = this.gallery.filter((n,i) => i !== id);
      deleteArray.splice(id+1,0,content);
      this.gallery = deleteArray
    },
    listDelete(id){
      let deleteArray = this.gallery.filter((n,i) => i !== id);
      this.gallery = deleteArray
    },
    addList(){
      let obj = {}
      obj.type = 'image'
      obj.file = ""
      obj.video_id = null
      obj.title = ""
      obj.body = ""
      obj.date = ""
      this.gallery = this.gallery.concat(obj)
    },
    changeType(id,type) {
      if(type=='image'){
        delete this.gallery[id].video_id
        this.gallery[id].file = ""
      }
      if(type=='youtube'){
        delete this.gallery[id].file
        this.gallery[id].video_id = ""
      }
    }
  },
  computed:{
    OutPut(){
      let output_object = {}
      output_object.gallery = this.gallery
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

.gallery_list {
  position: relative;
  background: rgba($theme-blue,.1);
  padding: 16px;
  margin-bottom: 12px;
  &:last-child {
    margin: 0;
  }
}

.list_updown {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px * 3;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
}

button.inlist_btn{
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  transition: .2s $bezier-ease-out;
  margin: 2px;
  cursor: pointer;
  &:hover{
    background: $theme-blue;
    color: #fff;
  }
}
.add_list {
  margin: 4px 0;
  margin-left: 24px;
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

.up {
  transform: rotateZ(90deg);
}
.down {
  transform: rotateZ(-90deg);
}

.gal_property {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  letter-spacing: 0;
}
.gal_select_box {
  width: 100%;
}
.gal_select {
  border: 1px solid $theme-blue;
  background: #fff;
  margin: 4px 0;
}
.gal_property_text {
  width: 150px;
}
.input_title, .input_body, .input_date {
  border-top: 0;
}
.input_video, .input_image, .input_body {
  background: rgba(#fff,.4);
}
.input_body {
  padding: 8px 12px;
  font-size: 90%;
}
</style>