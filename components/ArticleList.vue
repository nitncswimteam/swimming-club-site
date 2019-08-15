<template lang="pug">
.articles
  .article_year(v-for="(eachYear,eachYear_id) in articles"  :key="`year_${eachYear_id}`")
    .article_year_box
      .article_year_text {{eachYear.year}}
      .naminami: img(src="~/assets/imgs/wave_blue.svg").naminami_img
    .article_list(v-for="(list, list_id) in eachYear.list" :key="`${type}list_${list_id}`" v-if="list.publish")
      ArticleLink(:list="list" :type="type")
</template>
<script>
//component
import ArticleLink from '~/components/atoms/ArticleLink.vue';

export default {
  props:["summaryJson","type"],
  components:{
    ArticleLink
  },
  methods:{
    sort(array){
      return array.sort(function(a,b){
        if(a.created_at < b.created_at) return 1;
        if(a.created_at > b.created_at) return -1;
        return 0;
      });
    }
  },
  computed:{
    articles(){
      let summaryJsonMap = Object.entries(this.summaryJson.fileMap).map(([key, value]) => ({key, ...value}))
      let eachYears = summaryJsonMap.map((sJM) => sJM.created_at.slice(0,4) )
      let eachYearsOne = eachYears.filter((x,i,self) => self.indexOf(x)===i )
      let sortedEachYearsOne = eachYearsOne.sort((a,b) => {
          if(a<b) return 1;
          if(a>b) return -1;
        })

      let eachYearsSummary = []
      for (let i = 0; i < sortedEachYearsOne.length; i++) {
        let listOfEachYear = summaryJsonMap.filter((x) => x.created_at.slice(0,4) == sortedEachYearsOne[i])
        let sortedListOfEachYear = this.sort(listOfEachYear)
        eachYearsSummary.push({year: sortedEachYearsOne[i],list:sortedListOfEachYear})
      }
      return eachYearsSummary
      //this.$store.commit('articles_${this.type}',eachYearsSummary)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.articles {
  margin: 12px 0;
  padding: 0 16px;
}

.article_year{
  margin-bottom: 36px;
}

.article_year_box {
  margin: 12px 0 24px;
}

.article_year_text {
  @include noto-font(2.6rem);
  font-weight: bold;
  letter-spacing: .2rem;
}
@import "~/assets/style/naminami.scss";

</style>
