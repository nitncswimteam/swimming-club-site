<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 MarkDownリアルタイム確認ツール
    .top_text
      p MarkDown形式の記事を、リアルタイムで表示確認しながら記述できるツールです。
    .editor
      MarkdownEditor

</template>
<script>
import MarkdownEditor from "~/components/MarkdownEditor.vue"

export default {
  layout: "develop",
  components:{
    MarkdownEditor
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

.top_text {
  margin: 10px 0;
  background: rgba($theme-blue,.1);
  padding: 12px;
  border-radius: 6px;
  p { margin: .5rem 0; }
}


</style>
<style>
@import "assets/style/tomorrow-night.css";
</style>