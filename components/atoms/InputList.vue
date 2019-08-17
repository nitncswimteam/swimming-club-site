<template lang="pug">
.inputList
  .input_lists(v-for="(list,list_id) in lists" :key="`dev_${id}_${list_id}`")
    .list_updown
      button.inlist_btn(@click="listUp(list_id)" v-if="list_id!=0"): .up <
      button.inlist_btn(@click="listDown(list_id)" v-if="list_id!=lists.length-1"): .down <
    .input_list_wrapper(v-if="id=='act'")
      input(v-model="list.name" placeholder="活動名").input_act.input_act_name
      input(v-model="list.discription" placeholder="説明").input_act.input_act_disc
    .input_list_wrapper(v-if="id=='photo'")
      input(v-model="list.file" placeholder="ファイル名")
      input(v-model="list.discription" placeholder="説明").input_photo_disc
    .preview(v-if="id=='photo'")
      .preview_img.preview_img_photo: GalleryImg(:src="`/image/about/${list.file}`" :alt="'TOP画像'").preview_img_com_photo
    .delete_button
      button.inlist_btn(@click="listDelete(list_id)") ×
  .add_list: button(@click="addList()").add_list_button +
</template>
<script>
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  props:["lists","id"],
  components:{
    GalleryImg,
  },
  methods:{
    listUp(id){
      let content = this.lists[id]
      let deleteArray = this.lists.filter((n,i) => i !== id);
      deleteArray.splice(id-1,0,content);
      this.$emit('updateList',this.id, deleteArray)
    },
    listDown(id){
      let content = this.lists[id]
      let deleteArray = this.lists.filter((n,i) => i !== id);
      deleteArray.splice(id+1,0,content);
      this.$emit('updateList',this.id, deleteArray)
    },
    listDelete(id){
      let deleteArray = this.lists.filter((n,i) => i !== id);
      this.$emit('updateList',this.id, deleteArray)
    },
    addList(id){
      this.$emit('addList', this.id,)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
@import "~/assets/style/json_output.scss";
.input_lists {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  &:hover{
    input {
      background: rgba($theme-blue,.2);
    }
  }
}

.input_list_wrapper {
  width: 100%;
  margin-bottom: 2px;
}

.list_updown {
  width: 24px;
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

//act
.input_act_disc{
  padding: 8px 12px;
  border-top: 0;
  background: rgba($theme-blue,.05)
}
//photo
.preview {
  margin: 0;
  margin-bottom: 2px;
  align-self: stretch;
}
.preview_img_photo {
  display: block;
  width: auto;
  height: 85px;
  border: 1px solid $theme-blue;
  border-left: none;
}
.preview_img_com_photo {
  display: inline-block;
  width: auto;
  height: 100%;
}
.input_photo_disc {
  border-top: none;
  background: rgba($theme-blue,.05)
}
</style>