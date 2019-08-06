<template lang="pug">
.news
  .article(v-for="article in summarylist")
    .article_title {{article.title}}

</template>

<script>
import summaryJson from '~/contents/summary_news.json';
export default {
  components: {
  },
  data(){
    return {
      summarylist: []
    }
  },
  mounted(){
    var summaryJsonMap = Object.entries(summaryJson.fileMap).map(([key, value]) => ({key, ...value}))
    this.summarylist = summaryJsonMap.sort(function(a,b){
      if(a.created_at < b.created_at) return -1;
      if(a.created_at > b.created_at) return 1;
      return 0;
    });
    //this.$store.commit('summarylist',this.summarylist)
  }
}
</script>

<style lang="scss">
</style>
