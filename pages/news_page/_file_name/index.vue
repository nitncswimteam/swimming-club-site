<template lang="pug">
.news_one_page(v-if="publish")
  nuxt-link(to="/news").back 戻る
  h1 {{title}}
  .post-meta
    .time {{created_at.split('T')[0]}}
    .body(v-html="bodyHtml")

.news_one_page(v-else="publish")
  p お探しのページは見つかりません。
</template>
<script>
import summaryJson from '~/contents/summary_news.json';

export default {
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/news/${params.file_name.slice(0,4)}/${params.file_name}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/_output_file/news/${params.file_name}.json`), { params });
  },
  head() {
    const title = `${this.title} - NEWS|奈良高専水泳部`;
    //const url = `https://jmblog.jp/news/${this.params.file_name}/`;
    return {
      title: title,
      meta: [
        //{ hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title },
      ],
      //link: [{ rel: 'canonical', href: url }],
    };
  },
};
</script>

