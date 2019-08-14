<template lang="pug">
.one_page_links
  .prev_one_page(v-if="PrevPageLink")
    nuxt-link(:to="PrevPageLink") 前の記事
  .next_one_page(v-if="NextPageLink")
    nuxt-link(:to="NextPageLink") 次の記事
</template>
<script>
//json
import summaryNews from '~/contents/summary_news.json';
import summaryResults from '~/contents/summary_results.json';

export default {
  props:["id","type"],
  methods:{
    dataFormating(data){
      let summaryJsonMap = Object.entries(data.fileMap).map(([key, value]) => ({key, ...value}));
      let deleteNoDisplayArray = summaryJsonMap.filter(x => x.publish === true);
      deleteNoDisplayArray.sort(function(a,b){
          if(a.created_at < b.created_at) return 1;
          if(a.created_at > b.created_at) return -1;
          return 0;
      });
      return deleteNoDisplayArray
    },
    summaryLists(){
      if(this.type=="news"){
        return this.dataFormating(summaryNews)
      }else if(this.type=="results"){
        return this.dataFormating(summaryResults)
      }
    },
  },
  computed:{
    PrevPageLink(){
      let summarylists = this.summaryLists()
      let now_index = summarylists.findIndex(({sourceBase}) => sourceBase === this.id);
      if(now_index == 0){
        return null
      }else{
        let link = summarylists[now_index - 1].sourceBase.slice(0,-3)
        return `/${this.type}_page/${link}`
      }
    },
    NextPageLink(){
      let summarylists = this.summaryLists()
      let now_index = summarylists.findIndex(({sourceBase}) => sourceBase === this.id);
      if(now_index == summarylists.length　-　1){
        return null
      }else{
        let link = summarylists[now_index + 1].sourceBase.slice(0,-3)
        return `/${this.type}_page/${link}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>