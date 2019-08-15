<template lang="pug">
.news
  MiniHeader(:name="'NEWS'" :title="'お知らせ'")
  main
    .container
      .news_wrapper
        .left
          .top_text 
            p ここでは、本校水泳部に関するお知らせや、これから行われる大会についての説明・集合時間などを掲載しています。
            p OB・OGの方の応援・ご参加等、お待ちしております！
          ArticleList(:summaryJson="summaryJson" :type="'news'")
        .twitter_wrapper
          a(class="twitter-timeline" data-lang="ja" data-height="100%" :href="`https://twitter.com/${twitter_id}?ref_src=twsrc%5Etfw`") Tweets by {{twitter_id}}
          script(async src="https://platform.twitter.com/widgets.js" charset="utf-8")
</template>

<script>
//json
import FooterJson from '~/assets/jsons/footer.json'
import summaryJson from '~/contents/summary_news.json';
//component
import MiniHeader from '~/components/MiniHeader.vue'
import ArticleList from '~/components/ArticleList.vue';
import Twitter from '~/components/atoms/Twitter.vue'

export default {
  components: {
    MiniHeader,
    ArticleList,
    Twitter
  },
  data(){
    return {
      twitter_id: FooterJson.twitter,
      summaryJson: summaryJson
    }
  },
  head() {
    const title = `NEWS｜奈良高専水泳部`;
    const url = `https://nitnc_swim.netlify.com/news/`;
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
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.container {
  padding: 24px 0;
}

.news_wrapper{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.top_text {
  @include noto-font(1.7rem);
  padding: 12px 16px;
}

.twitter_wrapper{
  width: 420px;
  height: auto;
  border-left: 3px double $theme-blue;
  padding-left: 12px;
  iframe{
    min-height: 500px !important;
  }
}
</style>
