<template lang="pug">
.gallery
  MiniHeader(:name="'GALLERY'" :title="'水泳部ギャラリー'")
  main
    .container
      .top_text
        p ここでは、水泳部の普段の練習風景等を公開しています。
      .gallery_wrapper
        GalleryCard(v-for="(x,i) in photos"
          :key="`gallery_card_${i}`"
          :photo="x" :id="i"
          @openDetail="openDetail"
          v-if="x.type=='image'"
          )
  transition
    .gallery_detail(v-if="detail")
      .detail_wrapper
        GalleryImg(:src="`/image/gallery/${detail.file}`", :alt="detail.title" v-if="detail.type=='image'").image
        .detail_title {{detail.title}}
        .detail_body {{detail.body}}
          .detail_date(v-if="detail.date") {{(detail.body?' ｜ ':'') + detail.date}} 撮影
      img(src="~/assets/imgs/arrow.svg" @click="prevDetail(now_id)").detail_arrow.detail_arrow_left
      img(src="~/assets/imgs/arrow.svg" @click="nextDetail(now_id)").detail_arrow.detail_arrow_right
      img(src="~/assets/imgs/batsu.svg" @click="closeDetail(now_id)").detail_close
</template>

<script>
//json
import gallery_json from '~/assets/jsons/gallery.json'
//component
import MiniHeader from '~/components/MiniHeader.vue'
import GalleryCard from '~/components/GalleryCard.vue'
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  components: {
    MiniHeader,
    GalleryCard,
    GalleryImg
  },
  data(){
    return{
      photos: gallery_json,
      detail: null,
      now_id: null
    }
  },
  methods:{
    openDetail(id){
      this.detail = this.photos[id]
      this.now_id = id
    },
    prevDetail(id){
      if(id-1 >= 0){
        this.detail = this.photos[id-1]
        this.now_id = id-1
      }else{
        this.detail = this.photos[this.photos.length-1]
        this.now_id = this.photos.length-1
      }
    },
    nextDetail(id){
      if(id < this.photos.length-1){
        this.detail = this.photos[id+1]
        this.now_id = id+1
      }else{
        this.detail = this.photos[0]
        this.now_id = 0
      }
    },
    closeDetail(){
      this.detail = null
    },
    
  },
  head() {
    const title = `GALLERY｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/gallery/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      link: [{ rel: 'canonical', href: url }],
    };
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.gallery{
  margin-bottom: 60px;
}

.top_text {
  @include noto-font(1.8rem);
  padding: 24px 16px 40px;
}

.gallery_wrapper{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
}

.gallery_detail{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000,.9);
  z-index: 2000;
  .detail_wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: calc(100% - 180px);
    height: calc(100% - 120px);
    padding-bottom: 60px;
    .detail_img{
      width: 100%;
      height: 100%;
    }
    .image{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .detail_title{
    @include noto-font(2.2rem,#ddd);
    font-weight: bold;
    text-align: center;
    padding: 4px 0;
  }
  .detail_body{
    @include noto-font(1.6rem,#ddd);
    text-align: center;
  }
  .detail_date{
    display: inline;
    padding-left: 4px;
  }

  .detail_arrow{
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: 100px;
    height: 100px;
    padding: 24px;
    cursor: pointer;
    opacity: .7;
    transition: .2s $bezier-ease-out;
    &:hover{
      padding: 26px;
      opacity: 1;
    }
    &_left{
      left: 24px;
    }
    &_right{
      right: 24px;
      transform: scale(-1, 1);
    }
  }
  .detail_close{
    position: fixed;
    top: 0;
    right: 24px;
    margin: auto;
    display: block;
    width: 100px;
    height: 100px;
    padding: 28px;
    cursor: pointer;
    opacity: .7;
    transition: .2s $bezier-ease-out;
    &:hover{
      padding: 30px;
      opacity: 1;
    }
  }
}
</style>