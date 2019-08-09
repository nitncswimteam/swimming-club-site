<template lang="pug">
.about
  header

  main
    .container
      .left_wrapper
        .top_text
          .top_text_box(v-for="(toptext, toptext_id) in about.top_text" :key="`about_top_text_${toptext_id}`")
            p(v-for="(prg,prg_id) in toptext" :key="`about_prg_${prg_id}`") {{prg}}
        .main_activities
          h2.header2
            .header2_title 今後の主な活動
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
            Members(:members="members")

      .right_wrapper

</template>

<script>
//json
import about_json from '~/assets/jsons/about.json'
import members_json from '~/assets/jsons/members.json'
//component
import Members from '~/components/Members.vue'

export default {
  components: {
    Members
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
</style>
