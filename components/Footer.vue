<template lang="pug">
footer
  .footer_img: img(src="~/assets/imgs/under_water.png")
  .container
    .footer_wrapper
      .footer_left
        Twitter(:twitter_id="twitter_id")
        .naminami
          img(src="~/assets/imgs/wave_white.svg").naminami_img
        .contact
          .contact_text
            p 何か疑問、質問等ございましたら以下のメールへご連絡ください。
            p ※ 巡回ロボット対先によりメールアドレスの@を◇に変えています。◇を@に変えて送信してください。
          .e_mail E-mail : {{e_mail}}
      .footer_right
        .links
          .links_title LINKS
          ul.links_list
            li.link(v-for="(link,link_id) in links" :key="`footerlinks_${link_id}`")
              a(:href="link.url").link_url
                .link_text {{link.text}}

</template>
<script>
//json
import FooterJson from '~/assets/jsons/footer.json'
//components
import Twitter from '~/components/atoms/Twitter.vue'

export default {
  components:{
    Twitter
  },
  data(){
    return{
      twitter_id: FooterJson.twitter,
      links: FooterJson.links
    }
  },
  computed:{
    e_mail(){
      return FooterJson.e_mail.split('@').join('◇');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

footer{
  background: $theme-blue;
  color: white;
}
.footer_img{
  width: 100%;
  img{
    display: block;
    width: 100%;
  }
}
.footer_wrapper{
  display: flex;
  flex-wrap: nowrap;
  padding: 24px 0 50px;
}
.naminami{
  margin-top: 4px;
  margin-bottom: 36px;
  .naminami_img{
    width: 92px;
  }
}
.contact{
  margin-bottom: 10px;
  .contact_text{
    p {margin: .2rem 0}
    font-size: 1.6rem;
    color: rgba(#fff,0.7)
  }
  .e_mail{
    margin-top: 8px;
    font-size: 2.2rem;
  }
}

.footer_left{
  flex-grow: 0;
}
.footer_right{
  flex-grow: 1;
  align-self: flex-end;
}

.links{
  text-align: right;
  .links_title{
    font-size:  2.6rem;
    margin-bottom: 12px;
  }
  .links_list{
    list-style: none;
  }
  .link_url{
    &:hover{
      .link_text{
        color: $theme-sky;
        border-bottom: 1px solid $theme-sky;
      }
    }
  }
  .link_text{
    font-size: 1.8rem;
    margin: 5px 0;
    display: inline-block;
    color: #fff;
    border-bottom: 1px solid #fff;
    transition: .2s $bezier-ease-out;
  }
}

</style>