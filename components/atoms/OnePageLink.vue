<template lang="pug">
.one_page_links
  .one_page_link.prev(v-if="PrevPageLink")
    nuxt-link(:to="PrevPageLink").one_page_link_a
      img(src="~/assets/imgs/arrow.svg").page_link_img.page_link_img_prev
      .page_link_text 前の記事
    .page_link_title {{PrevPageTitle}}
  .one_page_link.next(v-if="NextPageLink")
    nuxt-link(:to="NextPageLink").one_page_link_a
      .page_link_text 次の記事
      img(src="~/assets/imgs/arrow.svg").page_link_img.page_link_img_next
    .page_link_title {{NextPageTitle}}
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
    PageLink(n){
      let summarylists = this.summaryLists()
      let now_index = summarylists.findIndex(({sourceBase}) => sourceBase === this.id);
      if(n < 0 && now_index <= 0){
        return null
      }else if(n > 0 && now_index >= summarylists.length　-　1){
        return null
      }else{
        let link = summarylists[now_index + n].sourceBase.slice(0,-3)
        return `/${this.type}_page/${link}`
      }
    },
    PageTitle(n){
      let summarylists = this.summaryLists()
      let now_index = summarylists.findIndex(({sourceBase}) => sourceBase === this.id);
      if(n < 0 && now_index <= 0){
        return null
      }else if(n > 0 && now_index >= summarylists.length　-　1){
        return null
      }else{
        let title = summarylists[now_index + n].title
        return title
      }
    }
  },
  computed:{
    PrevPageLink(){
      return this.PageLink(-1)
    },
    NextPageLink(){
      return this.PageLink(1)
    },
    PrevPageTitle(){
      return this.PageTitle(-1)
    },
    NextPageTitle(){
      return this.PageTitle(1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.one_page_links {
  display: flex;
  flex-wrap: wrap;
  margin: 60px 0 20px;
}
.one_page_link {
  position: relative;
  margin: 4px;
  background: $theme-blue;
  transition: .3s $bezier-ease-out;
  &:hover{
    background: rgba($theme-blue,.9);
    .page_link_title {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
.one_page_link_a {
  display: flex;
  flex-wrap: nowrap;
  padding: 4px 12px;
  color: rgba(#fff,.8);
}
.page_link_img {
  width: 24px;
  padding: 2px;
  &_prev {
    margin-right: 8px;
  }
  &_next {
    margin-left: 8px;
    transform: scale(-1, 1);
  }
}
.page_link_text {
  margin: 4px 2px;
}

.page_link_title {
  position: absolute;
  top: -36px;
  left: 0;
  width: max-content;
  border: 1px solid $theme-blue;
  padding: 4px 12px;
  border-radius: 6px;
  background: #fff;
  font-size: 1.3rem;
  z-index: 1;
  opacity: 0;
  transform: translateY(10px);
  transition: .3s $bezier-ease-out;
  &::before {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 16px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: (10px * 1.14) 10px 0 10px;
    border-color: $theme-blue transparent transparent transparent;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 17px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: (9px * 1.14) 9px 0 9px;
    border-color: #fff transparent transparent transparent;
  }
}
</style>