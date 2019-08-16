<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 Jsonアウトプットツール footer情報
    .top_text
      p 簡単な入力UIで入力したデータを、それぞれのJsonのファイル形式にして出力するツールです。
    .editor
</template>
<script>
export default {
  layout: "develop"
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";
@import "~/assets/style/button.scss";

.top_text {
  margin: 10px 0;
  background: rgba($theme-blue,.1);
  padding: 12px;
  border-radius: 6px;
  p { margin: .5rem 0; }
}

</style>