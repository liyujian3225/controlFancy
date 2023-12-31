<template>
  <div class="attentionLevel">
    <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E4%BC%81%E9%B9%85.png" alt="">
    <div class="mainTxt">
      <p class="level">S</p>
      <p class="chWord">硅基进化水平</p>
      <p class="enWord">
        <i>Level of Evolution of</i>
      </p>
      <p class="enWord">
        <i>Silicon-based Organisms</i>
      </p>
    </div>
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <video id="video" autoplay muted width="1920" height="1080" style="transform: translateX(-145px)">
      <source
        type="video/mp4"
        src="../../assets/video/rect6.mp4">
      您的当前设备不支持video标签
    </video>
  </div>
</template>
<script setup>

const router = useRouter();
const dumpHome =  () => {
  router.push({
    name: "home",
  })
}

let timer = null;
onUnmounted(() => { if(timer)clearTimeout(timer) })
timer = setTimeout(() => {
  router.push({
    name: "guide",
  })
}, 5000)

</script>
<style scoped lang="scss">
div.attentionLevel {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  >img {
    width: 760px;
    height: 760px;
    position: absolute;
    top: 158px;
    left: 159px;
    z-index: 10;
  }
  div.mainTxt {
    width: 460px;
    position: absolute;
    top: 380px;
    right: 255px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p.level {
      height: 180px;
      line-height: 180px;
      margin-bottom: 120px;
      color: #FFFFFF;
      font-size: 400px;
      font-weight: bold;
      font-family: "VolteBold";
    }
    p.chWord {
      color: #FFFFFF;
      font-size: 55px;
      font-weight: bold;
      font-family: "SourceHanSansCN";
      margin-bottom: 14px;
    }
    p.enWord {
      color: #FFFFFF;
      font-size: 35px;
      font-weight: bold;
      font-family: "Volte";
    }
  }
  >div.homeBtn {
    width: 100px;
    height: 100px;
    background: rgba(255,255,255,0.27);
    border-radius: 50%;
    position: absolute;
    top: 77px;
    right: 71px;
    z-index: 10;
    cursor: pointer;
    transition: background-color .35s linear;
    &:hover {
      background: #0049B7;
    }
  }
}
</style>
