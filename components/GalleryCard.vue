<template lang="pug">
  .gallery_card
    .gallery_button(@click="openDetail")
      figure.card_img(v-if="photo.type=='image'")
        GalleryImg(:src="`/image/gallery/${photo.file}`", :alt="photo.title").image
      .card_img(v-if="photo.type=='youtube'")
        img(:src="`${youtube_thumbnail_1}${photo.video_id}${youtube_thumbnail_2}`" :alt="photo.title").image
      .card_content
        .title {{photo.title}}
        .body {{photo.body}}
</template>
<script>
import GalleryImg from '~/components/atoms/GalleryImg.vue'

export default {
  components:{
    GalleryImg
  },
  data() {
    return {
      youtube_thumbnail_1: 'https://i.ytimg.com/vi/',
      youtube_thumbnail_2: '/hqdefault.jpg'
    }
  },
  props: ["photo","id"],
  methods:{
    openDetail(){
      this.$emit("openDetail", this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.gallery_card {
  width: calc(100% / 3);
  padding: 2px;
  padding-bottom: 24px;
  display: inline-block;
}
.gallery_button{
  border-radius: 6px;
  height: 100%;
  cursor: pointer;
  transition: .3s $bezier-ease-out;
  &:hover{
    background: rgba($theme-blue,.08);
    .image {
      transform: scale(1.06);
    }
  }
}
.image {
  display: block;
  border-radius: 6px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: .2s $bezier-ease-out;
}
.card_img{
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 6px;
}

.card_content {
  padding: 4px 8px 12px;
}
.title{
  @include noto-font(1.8rem);
  font-weight: bold;
}


</style>
