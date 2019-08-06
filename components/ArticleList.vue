<template lang="pug">
.articleList
  .article
    .article_year(v-for="(eachYear,eachYear_id) in articles"  :key="`year_${eachYear_id}`")
      .article_year_text {{eachYear.year}}
      .article_list(v-for="(list, list_id) in eachYear.list" :key="`${type}list_${list_id}`" v-if="list.publish")
        nuxt-link(:to="`/${type}_page/${list.sourceBase.slice(0,-3)}`")
          .article_title {{list.title}}
</template>
<script>
export default {
  props:["summaryJson","type"],
  computed:{
    articles(){
      let summaryJsonMap = Object.entries(this.summaryJson.fileMap).map(([key, value]) => ({key, ...value}))
      let eachYears = summaryJsonMap.map((sJM) => sJM.created_at.slice(0,4) )
      let eachYearsOne = eachYears.filter((x,i,self) => self.indexOf(x)===i )

      let eachYearsSummary = []
      for (let i = 0; i < eachYearsOne.length; i++) {
        let listOfEachYear = summaryJsonMap.filter((x) => x.created_at.slice(0,4) == eachYearsOne[i])
        let filterdListOfEachYear = listOfEachYear.sort(function(a,b){
          if(a.created_at < b.created_at) return -1;
          if(a.created_at > b.created_at) return 1;
          return 0;
        });
        eachYearsSummary.push({year: eachYearsOne[i],list:listOfEachYear})
      }
      return eachYearsSummary
      //this.$store.commit('articles_${this.type}',eachYearsSummary)
    }
  }
}
</script>
