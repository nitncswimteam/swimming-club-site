<template lang="pug">
.markdown_editor
  .editor_wrapper
    textarea(v-model="md_text" placeholder="markdownをかく").md_textarea
    .preview
      .preview_html(v-html="$md.render(md_text)")
</template>
<script>
export default {
  data(){
    return {
      md_text:""
    }
  }
}
</script>

<style lang="scss" scoped>
.md_textarea {

}
</style>