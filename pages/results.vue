<template lang="pug">
.results
  header
    .title
  main
    ArticleList(:summaryJson="summaryJson" :type="'results'")
    

</template>

<script>
import summaryJson from '~/contents/summary_results.json';
import ArticleList from '~/components/ArticleList.vue';
export default {
  components: {
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


<style lang="scss">
</style>
