<template lang="pug">
.twitter
  a(:href="`https://twitter.com/${twitter_id}`").twitter_info
    img(src="~/assets/imgs/twitter.svg").twitter_logo
    .twitter_text
      .twitter_name Twitter
      .twitter_follow
        .twitter_id @{{twitter_id}}
        .twitter_comment フォローお待ちしています!!
</template>
<script>
export default {
  props:["twitter_id"]
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.twitter_info{
  display: inline-flex;
  flex-wrap: nowrap;
  position: relative;
  padding-right: 20px;
  &::before{
    opacity: 0;
    content: "ツイートを見る !";
    position: absolute;
    top: -28px;
    left: 140px;
    padding: 8px 16px;
    color: $theme-blue;
    font-weight: bold;
    background-color: white;
    transform: translateY(6px);
    transition: .2s $bezier-ease-out;
  }
  &::after{
    opacity: 0;
    content: "";
    position: absolute;
    top: 12px;
    left: 156px;
    width: 15px;
    height: 15px;
    background: linear-gradient(135deg, #fff 0%, #fff 50%, transparent 50%, transparent 100%);
    transform: translateY(6px);
    transition: .2s $bezier-ease-out;
  }
  .twitter_text{
    margin-left: 12px;
  }
  .twitter_logo{
    width: 50px;
    margin: 16px 0;
  }
  .twitter_name{
    padding-top: 12px;
    font-weight: bold;
    letter-spacing: 0rem;
    color: white;
  }
  .twitter_follow{
    display: flex;
    flex-wrap: nowrap;
  }
  .twitter_id{
    font-size: 2.4rem;
    line-height: 2.6rem;
    font-weight: bold;
    letter-spacing: 0rem;
    color: white;
    border-bottom: 1px solid transparent;
    transition: .4s $bezier-ease-out;
  }
  .twitter_comment{
    padding-left: 20px;
    line-height: 2.6rem;
    color: white;
  }
  &:hover{
    .twitter_id{
      border-bottom: 1px solid white;
    }
    &::before,&::after{
      transform: translateY(0);
      opacity: 1;
    }
  }
}

</style>