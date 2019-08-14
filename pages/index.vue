<template lang="pug">
mixin linkButton(link,text)
  .link-button: nuxt-link(to=link)
    .lb-innerBox: .lb-innerText=text
mixin littleLinkButton(link,text)
  .little-link-button: nuxt-link(to=link)
    .little-lb-innerBox: .little-lb-innerText=text

.index
  header
    .title
      img.title-img(src="~/assets/imgs/title.svg" alt="We are NITNC SWIMMERS!!")
    .subtitle 奈良高専水泳部へようこそ！
  main
    section.intro
      .container
        .culumns
          .message-wrapper
            .message
              p(v-for="intro_text in index.intro_text" v-html="intro_text")
            .link-button-wrapper
              .link-button: nuxt-link(to="/about")
                .lb-innerBox: .lb-innerText ABOUTページへ
              .link-button: a(:href="index.blog")
                .lb-innerBox: .lb-innerText 水泳部ブログはこちら
          .photo
            img(:src="`../image/top/${index.image_file_name}`")
    section.cushion
      img.cushion_img(src="~/assets/imgs/pool_course.png")
    section.little_results_news
      .container
        .little_lists.little_results
          .list_title RESULTS
          ul.lists
            li.list(v-for="(results_data,results_key) in resultsDatas" :key="`topresult_${results_key}`")
              nuxt-link(:to="`/results_page/${results_data.sourceBase.slice(0,-3)}`").list_wrapper
                .created_at {{results_data.created_at.split('T')[0].split('-').join('/')}} 更新
                .article_title {{results_data.title}}
          .read_more: +littleLinkButton('/results','READ MORE')
        .little_lists.little_news
          .list_title NEWS
          ul.lists
            li.list(v-for="(news_data,news_key) in newsDatas" :key="`topresult_${news_key}`")
              nuxt-link(:to="`/news_page/${news_data.sourceBase.slice(0,-3)}`").list_wrapper
                .created_at {{news_data.created_at.split('T')[0].split('-').join('/')}} 更新
                .article_title {{news_data.title}}
          .read_more: +littleLinkButton('/news','READ MORE')
</template>

<script>
//json
import summaryNews from '~/contents/summary_news.json';
import summaryResults from '~/contents/summary_results.json';
import index_json from '~/assets/jsons/index.json'

export default {
  data(){
    return{
      index:index_json
    }
  },
  methods:{
    dataFormating(data,n){
      let summaryJsonMap = Object.entries(data.fileMap).map(([key, value]) => ({key, ...value}));
      let deleteNoDisplayArray = summaryJsonMap.filter(x => x.publish === true);
      return deleteNoDisplayArray.slice(0,n-1)
    }
  },
  computed:{
    newsDatas(){
      return this.dataFormating(summaryNews,3)
    },
    resultsDatas(){
      return this.dataFormating(summaryResults,3)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
@import "~/assets/style/button.scss";

header {
  width: 100%;
  height: 340px;
  background-color: $theme-blue;
  background-image: url("~assets/imgs/pool_top.png");
  background-size:cover;
  padding: 60px;
  .title {
    margin-top: 18px;
    background: $white;
    padding: 28px 36px;
    width: min-content;
    .title-img {
      width: auto;
      display: block;
      height: 50px;
      padding-right: 8px;
    }
  }
  .subtitle {
    margin-top: 12px;
    display: inline-block;
    width: auto;
    background: $white;
    padding: 4px 30px;
    @include noto-font(2.4rem);
    font-weight: bold;
    letter-spacing: 0.2rem;
  }
}
.culumns {
  display: flex;
  flex-wrap: nowrap;
}
section {
  margin: 60px 0;
}
.intro {
  .message-wrapper{
    width: 100%;
    padding-right: 60px;
    overflow: auto;
  }
  .message{
    padding: 28px;
    @include noto-font(2rem);
    letter-spacing: 0.2rem;
    p {
      margin-bottom: 1.6rem;
    }
  }
  .link-button-wrapper{
    width: auto;
    float: right;
  }
  .photo {
    width: 120%;
    img{
      width: 100%;
      height: auto;
    }
  }
}

.cushion{
  width: 100%;
  .cushion_img{
    display: block;
    width: 100%;
  }
}

.little_lists{
  width: 860px;
  margin: auto;
  margin-top: 20px;

  .list_title{
    position: relative;
    font-size: 2.6rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 36px;
    letter-spacing: .1rem;
    &::after{
      content: "";
      position: absolute;
      bottom: -6px;
      right: 0;
      left: 0;
      margin: auto;
      display: block;
      width: 92px;
      height: 4px;
      background-image: url("~assets/imgs/wave_blue.svg");
      background-size: 92px 4px;
      background-repeat: no-repeat;
    }
  }
  .lists{
    list-style: none;
  }
  .list_wrapper{
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 12px;
    color: $theme-blue;
    transition: .2s $bezier-ease-out;
    &:hover{
      color: $theme-sky;
    }
  }
  .created_at{
    line-height: 3rem;
    padding-right: 30px;
  }
  .article_title{
    font-size: 2rem;
    line-height: 3rem;
  }
  .read_more{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
