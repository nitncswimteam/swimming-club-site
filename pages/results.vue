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
  }
}
</script>


<style lang="scss">
</style>
