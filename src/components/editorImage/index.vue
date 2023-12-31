<template>
  <div class="drawing-container">
    <div id="tui-image-editor"></div>
    <el-button class="reset" type="primary" size="small" @click="reset">重置</el-button>
    <el-button class="save" type="primary" size="small" @click="save">保存</el-button>
    <el-button class="download" type="primary" size="small" @click="download">下载</el-button>
  </div>
</template>
<script setup>
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";
import { locale_zh } from "./locale_zh";
import { customTheme } from "./customTheme";
import { ref, onMounted, defineProps, watch } from 'vue';

const props = defineProps({
  imageUrl: String
});

const imageEditor = ref(null);
const initImageEditor = () => {
  const options = {
    includeUI: {
      loadImage: {
        path: props.imageUrl,
        name: "image",
      },
      menu: ["resize", "crop", "flip", "rotate", "draw", "shape", "icon", "text", "filter"], // 底部菜单按钮列表 遮罩mask
      initMenu: "draw", // 默认打开的菜单项
      menuBarPosition: "bottom", // 菜单所在的位置
      locale: locale_zh, // 本地化语言为中文
      theme: customTheme, // 自定义样式
    },
    cssMaxHeight: 600, // canvas 最大高度
    cssMaxWidth: 800, // canvas 最大宽度
  };
  imageEditor.value = new ImageEditor('#tui-image-editor', options);

  document.getElementsByClassName("tui-image-editor-main")[0].style.top ="45px"; // 调整图片显示位置
  document.getElementsByClassName("tie-btn-reset tui-image-editor-item help") [0].style.display = "none";  // 隐藏顶部重置按钮
  document.getElementsByClassName( "tui-image-editor-controls")[0].style.backgroundColor = "#fff";  //底部按钮栏背景颜色

  /* 对一些不需要的按钮进行样式隐藏*/
  document.querySelector('[tooltip-content="反撤销"]').style.display = "none";
  document.querySelector('[tooltip-content="放大"]').style.display = "none";
  document.querySelector('[tooltip-content="缩小"]').style.display = "none";
  document.querySelector('[tooltip-content="手掌"]').style.display = "none";
  document.querySelector('[tooltip-content="重置"]').style.display = "none";
  document.querySelector('[tooltip-content="历史"]').style.display = "none";

  document.querySelectorAll(".tui-image-editor-icpartition").forEach((item) => {
    item.parentNode.style.display = "none";
  });
}

onMounted(() => {
  initImageEditor();
})

const reset = () => {
  initImageEditor();
}

const download = () => {
  const el = document.createElement("a");
  el.href = imageEditor.value.toDataURL();
  el.download = "文件";
  const event = new MouseEvent("click");
  el.dispatchEvent(event);
}

const save = () => {
  const base64String = imageEditor.value.toDataURL(); // base64 文件
  const data = window.atob(base64String.split(",")[1]);
  const ia = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  const blob = new Blob([ia], { type: "image/png" }); // blob 文件
  const form = new FormData();
  form.append("image", blob);
  // upload file
}
</script>
<style lang="scss" scoped>
.drawing-container {
  height: 800px;
  width: 880px;
  margin: 0 auto;
  position: relative;
  .reset {
    position: absolute;
    right: 164px;
    top: 15px;
  }
  .save {
    position: absolute;
    right: 50px;
    top: 15px;
  }
  .download {
    position: absolute;
    right: 108px;
    top: 15px;
  }
}
</style>
