<template>
  <router-view class="routerView" v-slot="{ Component }">
    <transition name="fade">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
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
  background: #000000;
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

.fade-enter-from{   /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */
  opacity: 0;
  //transform: translateX(100%);
}

.fade-enter-to{   /*定义进入完成后的位置 和 透明度 */
  //transform: translateX(0%);
  opacity: 1;
}

.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-from { /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
  //transform: translateX(0%);
  opacity: 1;
}

.fade-leave-to{   /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */
  //transform: translateX(-100%);
  opacity: 0;
}

</style>
