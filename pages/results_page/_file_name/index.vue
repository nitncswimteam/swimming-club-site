<template lang="pug">
.results_one_page
  MiniHeader(:name="'RESULTS'" :title="'大会結果報告'")
  .container
    nuxt-link(to="/results").back
      img(src="~/assets/imgs/back.svg").back_img
      .back_text 一覧に戻る
    .one_page_contents(v-if="publish")
      .one_page_top
        .time {{createdAt}} 作成
        h1.title {{title}}
        .naminami: img(src="~/assets/imgs/wave_blue.svg").naminami_img
      .post-meta
        .body(v-html="bodyHtml")
      OnePageLink(:id="sourceBase" :type="'results'")
    .contents(v-else="publish")
      p お探しのページは見つかりません。
</template>
<script>
import summaryJson from '~/contents/summary_results.json';
//component
import MiniHeader from '~/components/MiniHeader.vue'
import OnePageLink from '~/components/atoms/OnePageLink.vue'

export default {
  components: {
    MiniHeader,
    OnePageLink
  },
    computed: {
    createdAt(){
      return this.created_at.split('T')[0].split('-').join('/')
    }
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/results/${params.file_name.slice(0,4)}/${params.file_name}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/_output_file/results/${params.file_name}.json`), { params });
  },
  head() {
    const title = `${this.title} - RESULTS｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/results_page/${this.params.file_name}/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      link: [{ rel: 'canonical', href: url }],
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
.results_one_page{
  @import "~/assets/style/onepage.scss";
  @import "~/assets/style/naminami.scss";
  .naminami{
    margin-top: 12px;
  }
  .body{
    margin: 40px 0;
    @import "~/assets/style/markdown.scss";
  }
}
</style>

<style>
@import "assets/style/tomorrow-night.css";
</style>