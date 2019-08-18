<template lang="pug">
.markdown_editor
  .assist_tool
    .assist_btns
      button.assist_btn(@click="inputAssist('# Header1',2,7)"): img(src="~/assets/imgs/edit_icon/h1.svg").edit_icon
      .sub_assist_btns
        button.assist_btn(@click="inputAssist('## Header2',3,7)"): img(src="~/assets/imgs/edit_icon/h2.svg").edit_icon
        button.assist_btn(@click="inputAssist('### Header3',4,7)"): img(src="~/assets/imgs/edit_icon/h3.svg").edit_icon
        button.assist_btn(@click="inputAssist('#### Header4',5,7)"): img(src="~/assets/imgs/edit_icon/h4.svg").edit_icon
        button.assist_btn(@click="inputAssist('##### Header5',6,7)"): img(src="~/assets/imgs/edit_icon/h5.svg").edit_icon
        button.assist_btn(@click="inputAssist('###### Header6',7,7)"): img(src="~/assets/imgs/edit_icon/h6.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist('**Bold**',2,4)"): img(src="~/assets/imgs/edit_icon/bold.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist('*italic*',1,6)"): img(src="~/assets/imgs/edit_icon/italic.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist(assist.text_color,21,6)"): img(src="~/assets/imgs/edit_icon/text_color.svg").edit_icon
      .sub_assist_btns
        button.assist_btn(@click="inputAssist(assist.marker,6,6)"): img(src="~/assets/imgs/edit_icon/marker.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist(`- \n- \n- `,2)"): img(src="~/assets/imgs/edit_icon/ul_list.svg").edit_icon
      .sub_assist_btns
        button.assist_btn(@click="inputAssist(`1. \n1. \n1. `,3)"): img(src="~/assets/imgs/edit_icon/ol_list.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist('> ')"): img(src="~/assets/imgs/edit_icon/quote.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist('[text](https)',1,4)"): img(src="~/assets/imgs/edit_icon/link.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist(assist.img,17,4)"): img(src="~/assets/imgs/edit_icon/img.svg").edit_icon
      .sub_assist_btns
        button.assist_btn(@click="inputAssist(assist.img_ad,23,4)"): img(src="~/assets/imgs/edit_icon/img_width.svg").edit_icon
    .assist_btns
      button.assist_btn(@click="inputAssist(assist.table,0,1)"): img(src="~/assets/imgs/edit_icon/table.svg").edit_icon
  
  .editor_wrapper
    .textarea
      textarea(v-model="md_text" placeholder="markdownをかく" @keyup="textareaUpdate" @compositionend="textareaUpdate" ref="input" autofocus).md_textarea#ta
      .textarea_view(ref="view")
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
        text_color: `<span style="color: #ff0000;">Color</span>`,
        marker: `<mark>Marker</mark>`,
        img: '![](/image/other/file.png)',
        img_ad: '<img src="/image/other/file.png" alt="" style="width:400px;">',
        table :`a | b | c\n---|---|---\na1 | b1 | c1\na2 | b2 | c2`
      }
    }
  },
  mounted(){
    let height = this.$refs.view.clientHeight;
    this.$refs.input.style.height = `${height + 20}px`;
  },
  methods:{
    textareaUpdate(e){
      this.md_text = e.target.value;
      let height = this.$refs.view.clientHeight;
      this.$refs.input.style.height = `${height + 20}px`;
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

  .assist_tool {
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    align-items:stretch;
  }
  .assist_btns {
    position: relative;
    .sub_assist_btns{
      position: absolute;
      top: 37px;
      left: 0;
      height:0;
      background: #c1c4d8;
      z-index: 1;
      overflow: hidden;
      opacity: .9;
    }
    &:hover {
      background: #c1c4d8;
      .sub_assist_btns {
        height: auto;
      }
    }
  }

  .assist_btn {
    display: block;
    padding: 4px;
    background: #fff;
    border: 1px solid #eee;
    margin: 2px;
    cursor: pointer;
    &:hover {
      background: #c1c4d8;
    }
  }
  .edit_icon {
    display: block;
    width: 22px;
    height: 22px;
  }

  .editor_wrapper {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 400px;
  }
  .textarea {
    width: 50%;
    position: relative;
    min-height: 300px;
    overflow: hidden;
  }
  .md_textarea {
    width: 100%;
    height: 100%;
    display: block;
    min-height: 300px;
    border: none;
    padding: 12px;
    padding-bottom: 40px;
    background-color: #1d1f21;
    color: transparent;
    caret-color: #fff;
    font-family: monospace, monospace;
    _font-family: 'courier new', monospace;
    font-size: 1.7rem;
    letter-spacing: 0;
    line-height: 1.6;
    resize: none;
    overflow: hidden;
    &::selection{
      background: rgba(#c5c8c6,.5);
      color: transparent;
    }
  }
  .textarea_view {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    max-width: 100%;
    height: min-content;
    min-height: 300px;
    pointer-events: none;
    word-wrap: break-word;
    padding-bottom: 40px;
    pre {
      white-space: pre-wrap ;
    }
  }

.md_preview {
  width: 50%;
  display: block;
  min-height: 300px;
  border: 1px solid $theme-blue;
  padding: 12px;
  word-wrap: break-word;
  @import "~/assets/style/markdown.scss";
  @import "assets/style/tomorrow-night.css";
}
code.markdown.hljs {
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
