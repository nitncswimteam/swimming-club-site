<template lang="pug">
.markdown_editor
  .assist_btns
    button.assist_btn(@click="inputAssist('# ')") h1
  button.assist_btn(@click="inputAssist('[text](https)',1,4)") Link
  button.assist_btn(@click="inputAssist(assist.img,17,4)") img
  button.assist_btn(@click="inputAssist(assist.img_ad,23,4)") imgAd
  button.assist_btn(@click="inputAssist(assist.table,0,1)") 表
  
  .editor_wrapper
    .textarea
      textarea(v-model="md_text" placeholder="markdownをかく" @keyup="textareaHeight" rows="2" ref="input" autofocus).md_textarea#ta
      .textarea_view
        pre(v-highlightjs="md_text"): code(class="markdown")
    .md_preview
      .preview_html(v-html="$md.render(md_text)")
</template>
<script>
export default {
  data(){
    return {
      md_text:"",
      assist_header:0,
      assist:{
        img: '![](/image/other/file.png)',
        img_ad: '<img src="/image/other/file.png" alt="" style="width:400px;">',
        table :`a | b | c\n---|---|---\na1 | b1 | c1\na2 | b2 | c2`
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const $input = this.$refs.input;
      $input.addEventListener('keyup', this.textareaUpdate);
      $input.addEventListener('compositionend', this.textareaUpdate);
    });
  },
  beforeDestroy(){
    if (process.browser) {
      const $input = this.$refs.input;
      $input.removeEventListener("keyup", this.textareaUpdate)
      $input.removeEventListener('compositionend', this.textareaUpdate);
    }
  },
  methods:{
    textareaUpdate(e){
      this.md_text = e.target.value;
    },
    textareaHeight(event){
      let elem_id
      try {
        elem_id = event.srcElement.id;
      } catch ( e ) {
        elem_id = event.target.id;
      }
      let num = this.md_text.match(/\r\n|\n/g);
      let line = 1
      if(num!=null){
          line = num.length +1;
      }
      for (let i = 0; i < line; i++) {
        var m = document.getElementById(elem_id);
        var r = m.getAttribute("rows");
        m.setAttribute("rows", line + 2);
      }
    },
    inputAssist(text,st,en){
      let pos = this.textareaInsert(text)
      this.textareaCursor(pos,text,st,en)
    },
    textareaInsert(text){
      var textarea = document.querySelector('textarea');
      var sentence = textarea.value;
      var len      = sentence.length;
      var pos      = textarea.selectionStart;
      var before   = sentence.substr(0, pos);
      var after    = sentence.substr(pos, len);
      sentence = before + text + after;
      this.md_text = sentence;
      textarea.value = sentence;
      return pos
    },
    textareaCursor(pos,text,st,en){
      var textarea = document.querySelector('textarea');
      textarea.focus();
      let st_cur,en_cur
      if(st == null && en == null){
        st_cur = pos + text.length;
        en_cur = pos + text.length;
      }else if(st != null && en == null){
        st_cur = pos + st
        en_cur = pos + st
      }else if(st != null && en != null){
        st_cur = pos + st
        en_cur = pos + st + en
      }
      textarea.setSelectionRange(st_cur, en_cur);
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~/assets/style/normalize.scss";
@import "~/assets/style/variables.scss";
@import "~/assets/style/mixin.scss";

  .editor_wrapper {
    display: flex;
    flex-wrap: nowrap;
  }
  .textarea {
    width: 50%;
    position: relative;
    min-height: 300px;
  }
  .md_textarea {
    width: 100%;
    height: 100%;
    display: block;
    min-height: 300px;
    border: none;
    padding: 12px;
    background-color: #1d1f21;
    color: transparent;
    caret-color: #fff;
    font-family: monospace, monospace;
    _font-family: 'courier new', monospace;
    font-size: 1.7rem;
    letter-spacing: 0;
    line-height: 1.6;
    resize: none;
    &::selection{
      background: rgba(#c5c8c6,.5);
      color: #fff;
    }
  }
  .textarea_view {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    min-height: 300px;
    pointer-events: none;
    
  }

</style>

<style lang="scss">
@import "~/assets/style/variables.scss";
.md_preview {
  width: 50%;
  display: block;
  height: 100%;
  min-height: 300px;
  border: 1px solid $theme-blue;
  padding: 12px;
  @import "~/assets/style/markdown.scss";
  @import "assets/style/tomorrow-night.css";
}

code.markdown.hljs{
    min-height: 300px;
    font-family: monospace, monospace;
    _font-family: 'courier new', monospace;
    background: transparent !important;
    font-size: 1.7rem !important;
    letter-spacing: 0;
    line-height: 1.6;
    padding: 12px !important;
  }
</style>