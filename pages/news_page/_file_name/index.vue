<template lang="pug">
.news_one_page
  MiniHeader(:name="'NEWS'" :title="'お知らせ'")
  .container
    nuxt-link(to="/news").back 戻る
    .contents(v-if="publish")
      h1 {{title}}
      .post-meta
        .time {{created_at.split('T')[0]}}
        .body(v-html="bodyHtml")

    .contents(v-else="publish")
      p お探しのページは見つかりません。
</template>
<script>
import summaryJson from '~/contents/summary_news.json';
//component
import MiniHeader from '~/components/MiniHeader.vue'

export default {
  components: {
    MiniHeader
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/news/${params.file_name.slice(0,4)}/${params.file_name}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/_output_file/news/${params.file_name}.json`), { params });
  },
  head() {
    const title = `${this.title} - NEWS｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/news_page/${this.params.file_name}/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      link: [{ rel: 'canonical', href: url }],
    };
  },
};
</script>

<style lang="scss">
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
.news_one_page .body {
  @import "~/assets/style/markdown.scss";
}
</style>

<style>
@import "assets/style/tomorrow-night.css";
</style>