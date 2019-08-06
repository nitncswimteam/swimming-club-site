<template lang="pug">
.news
  header
    .title
  main
    ArticleList(:summaryJson="summaryJson" :type="'news'")
    .twitter_wrapper
      <a class="twitter-timeline" data-lang="ja" data-height="1200" href="https://twitter.com/narakosenswim?ref_src=twsrc%5Etfw">Tweets by narakosenswim</a>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</template>

<script>
import summaryJson from '~/contents/summary_news.json';
import ArticleList from '~/components/ArticleList.vue';
export default {
  components: {
    ArticleList
  },
  data(){
    return {
      summaryJson: summaryJson
    }
  }
}
</script>

<style lang="scss">
.twitter_wrapper{
  width: 400px;
  height: auto;
}
</style>
