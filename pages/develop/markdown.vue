<template lang="pug">
.develop
  .container
    nuxt-link(to="/develop") トップに戻る
    h1 MarkDownリアルタイム確認ツール
    .top_text
      p MarkDown形式の記事を、リアルタイムで表示確認しながら記述できるツールです。
    .editor
      editor(v-model="editorText" :options="editorOptions" :visible="editorVisible" height="500px" previewStyle="vertical")
      viewer(:value="editorText")

</template>
<script>
import {
    Editor,
    Viewer
  } from '@toast-ui/vue-editor'

export default {
  layout: "develop",
  components: {
      'editor': Editor,
      'viewer': Viewer
    },
    data() {
      return {
        editorText: '',
        editorOptions: {
          hideModeSwitch: true
        },
        editorVisible: true
      }
    }
}
</script>

<style>
@import "assets/style/tui-editor/tui-editor.css";
@import "assets/style/tui-editor/tui-editor-contents.css";
@import "assets/style/tui-editor/codemirror.css";
</style>

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