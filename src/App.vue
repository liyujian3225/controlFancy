<template>
  <router-view></router-view>
</template>
<script setup>
</script>
<style lang="scss">
*{
  padding:0;
  margin:0;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 1920px;
  height: 1080px;
  background: #f7f8fa;
  box-sizing: border-box;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  /*background-image: linear-gradient(45deg, #ffbd61 25%,#ffbd61 25%, #ff8800 25%, #ff8800 50%,#ffbd61 50%, #ffbd61 75%, #ff8800 75%, #ff8800 100%)!important;*/
}

::-webkit-scrollbar-button { /*滚动条上的按钮 (上下箭头)*/
  background: #434343;
  display: none;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-track-piece { /*滚动条没有滑块的轨道部分*/
  background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-corner { /*当同时有垂直滚动条和水平滚动条时交汇的部分*/
  background: #141414;
}

::-webkit-resizer {

}

/*   IE美化  */
html, body {
  scrollbar-arrow-color: #D6D6D6; /**//*三角箭头的颜色*/
  scrollbar-face-color: #D6D6D6; /**//*立体滚动条的颜色*/
  scrollbar-3dlight-color: #f1f1f1; /**//*立体滚动条亮边的颜色*/
  scrollbar-highlight-color: #fff; /**//*滚动条空白部分的颜色*/
  scrollbar-shadow-color: #fff; /**//*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: #fff; /**//*立体滚动条强阴影的颜色*/
  scrollbar-track-color: #f1f1f1; /**//*立体滚动条背景颜色*/
  scrollbar-base-color: #f1f1f1; /**//*滚动条的基本颜色*/
}

@font-face {
  font-family: "Volte";
  src: url("./assets/font/Volte.woff.ttf") format("opentype");
}

@font-face {
  font-family: "SourceHanSansCN";
  src: url("./assets/font/SourceHanSansCN-Bold.otf") format("opentype");
}

@font-face {
  font-family: "VolteBold";
  src: url("./assets/font/Volte.woff.bold.otf") format("opentype");
}

</style>
