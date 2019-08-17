<template lang="pug">
.develop
  .container
    .top_text
      p このページは、奈良高専水泳部のサイト更新担当者専用ページです。
      p サイトの更新はGithubから行いますが、ここではそのサイト更新がより楽になるツールを提供しています。
      small ※このページは検索からはヒットしませんが、公開されており誰でもアクセスが可能です。
    .tool_lists
      h2 ツールリスト
      .tool_category
        h3 Jsonアウトプットツール
        p 簡単な入力UIで入力したデータを、それぞれのJsonのファイル形式にして出力するツールです。
        ul.tools
          li.tool: nuxt-link(to="/develop/json_tool/index_json") index.json（トップのテキスト, トップ画像, Blogリンク）
          li.tool: nuxt-link(to="/develop/json_tool/about_json") about.json（トップのテキスト, 主な活動内容, 画像リスト）
          li.tool: nuxt-link(to="/develop/json_tool/members_json") members.json（メンバーの一覧）
          li.tool: nuxt-link(to="/develop/json_tool/gallery_json") gallery.json（写真とYoutube動画の一覧）
          li.tool: nuxt-link(to="/develop/json_tool/footer_json") footer.json（Twitter, Mail, Links）
      .tool_category
        h3 MarkDownリアルタイム確認ツール
        p MarkDown形式の記事を、リアルタイムで表示確認しながら記述できるツールです。
        ul.tools
          li.tool: nuxt-link(to="/develop/markdown") Markdown Viewer
</template>
<script>
export default {
  layout: "develop"
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
.tool_lists {
  margin: 36px 0;
}
.tool_category {
  margin: 12px 0;
  padding-left: 16px;
}

</style>