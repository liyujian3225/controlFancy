<template>
  <div class="wangEditorArea">
    <Toolbar
      class="toolbar_top"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <div class="toolbar_bottom">
      <div class="editorContain">
        <div id="title-container">
          <input type="text" v-model="title">
        </div>
        <Editor
          class="editor_bottom"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {SlateNode} from "@wangeditor/editor"

const title = ref("华为 P60 系列 4488 元起，10+ 款鸿蒙新品一同到来")

//工具栏配置相关
const editorRef = shallowRef();
const toolbarConfig = {};
const mode = "simple";

//编辑器配置相关
const valueHtml = ref('<p>hello</p>')
const editorConfig = {
  placeholder: '请输入内容...',
}
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleChange = (editor) => {
  const headers = editor.getElemsByTypePrefix('header');
  const catalogValue = headers.map(header => {
    const text = SlateNode.string(header)
    const {id, type} = header
    return { id, type, text }
  })
}
const scrollToElem = (id) => {
  editorRef.value.scrollToElem(id);
}

//编辑器初始化内容回显
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>我是编辑器的异步设置内容！</p>'
  }, 500)
})

//组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style lang="scss">
div.wangEditorArea {
  height: 100%;
  overflow: hidden;
  >div.toolbar_top {
    border-bottom: 1px solid #ccc;
    ::v-deep {
      .w-e-toolbar {
        margin: 0 auto;
        background: #F7F8FC;
      }
    }
  }
  >div.toolbar_bottom {
    height: calc(100% - 41px);
    overflow-y: auto;
    overflow-x: hidden;
    div.editorContain {
      width: 850px;
      margin: 30px auto 30px auto;
      background-color: #fff;
      padding: 20px 50px 50px 50px;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      div#title-container {
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e8;
        input {
          font-size: 30px;
          border: 0;
          outline: none;
          width: 100%;
        }
      }
      div.editor_bottom {
        min-height: 900px;
      }
    }
  }
}
</style>
