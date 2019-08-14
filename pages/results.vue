<template lang="pug">
.results
  MiniHeader(:name="'RESULTS'" :title="'大会結果報告'")
  main
    .container
      .top_text
        p ここでは、各種大会の結果を掲載しています。
      ArticleList(:summaryJson="summaryJson" :type="'results'")
    

</template>

<script>
import summaryJson from '~/contents/summary_results.json';
//component
import MiniHeader from '~/components/MiniHeader.vue'
import ArticleList from '~/components/ArticleList.vue';

export default {
  components: {
    MiniHeader,
    ArticleList
  },
  data(){
    return {
      summaryJson: summaryJson
    }
  },
  head() {
    const title = `RESULTS｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/results/`;
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

.container {
  padding: 24px 0;
}

.top_text {
  @include noto-font(1.7rem);
  padding: 12px 16px;
}

</style>
