<template lang="pug">
.about
  MiniHeader(:name="'ABOUT'" :title="'水泳部について'")
  main
    .container
      .about_wrapper
        .left_wrapper
          .top_text
            .top_text_box(v-for="(toptext, toptext_id) in about.top_text" :key="`about_top_text_${toptext_id}`")
              p(v-for="(prg,prg_id) in toptext" :key="`about_prg_${prg_id}`") {{prg}}
          .main_activities
            h2.header2
              .header2_wrapper
                .header2_title 今後の主な活動~2021~
              .naminami: img(src="~/assets/imgs/wave_blue.svg").naminami_img
            .contents_wrapper
              ul.activities_lists
                li(v-for="(act,act_id) in about.main_activities" :key="`about_act_${act_id}`" v-if="act.name" ).activities_list
                  .act_name {{act.name}}
                  .act_discription(v-if="act.discription") {{act.discription}}
          .members
            h2.header2
              .header2_wrapper
                .header2_title MEMBER
                .header2_sub {{members.update}}
              .naminami: img(src="~/assets/imgs/wave_blue.svg").naminami_img
            .contents_wrapper
              Members(:members="members").members_com

        .right_wrapper
          .photo_lists
            .photo_list(v-for="(abtPhoto, abtPhoto_id) in about.photo" :key="`about_photo_${abtPhoto_id}`")
              .about_imgs_discription {{abtPhoto.discription}}
              img(:src="`/image/about/${abtPhoto.file}`" :alt="abtPhoto.discription").about_imgs

</template>

<script>
//json
import about_json from '~/assets/jsons/about.json'
import members_json from '~/assets/jsons/members.json'
//component
import MiniHeader from '~/components/MiniHeader.vue'
import Members from '~/components/Members.vue'

export default {
  components: {
    Members,
    MiniHeader
  },
  data(){
    return{
      about:about_json,
      members: members_json
    }
  },
  head() {
    const title = `ABOUT｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/about/`;
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

.about_wrapper{
  display: flex;
  flex-wrap: nowrap;
  margin: 48px 0;
  @include noto-font(1.8rem);
}
.left_wrapper{
  flex-grow: 1;
  padding-left: 24px;
}
.right_wrapper{
  flex-grow: 0;
}

.top_text {
  .top_text_box {
    margin-top: 20px;
    margin-bottom: 40px;
  }
}


.header2 {
  margin-top: 60px;
  margin-bottom: 38px;
}
.header2_wrapper{
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
}
.header2_title {
  @include noto-font(2.6rem);
  font-weight: bold;
  letter-spacing: .2rem;
}
.header2_sub {
  @include noto-font(1.6rem);
  font-weight: normal;
  padding-left: 20px;
}
@import "~/assets/style/naminami.scss";

.activities_list {
  margin: 4px 0;
}
.act_discription {
  padding-left: 24px;
  @include noto-font(1.6rem);
}

.members_com {
  margin-left: 20px;
}

.photo_list{
  position: relative;
  margin: 8px;
  &:hover{
    .about_imgs_discription {
      opacity: 1;
    }
  }
}
.about_imgs_discription {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 0;
  padding: 2px 8px;
  background: rgba(#fff,.8);
  transition: .2s $bezier-ease-out;
}
.about_imgs{
  display: block;
  width: 640px;
}
</style>
