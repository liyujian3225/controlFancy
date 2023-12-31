<template>
  <div class="thought">
    <div class="mainTxt">
      <p class="level">S</p>
      <p class="chWord">想象力发散程度</p>
      <p class="enWord"><i>Imagination divergence level</i></p>
    </div>
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <video id="video" autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect5.mp4">
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
};


let timer = null;
onUnmounted(() => { if(timer)clearTimeout(timer) })
timer = setTimeout(() => {
  router.push({
    name: "generate",
  })
}, 5000)

</script>
<style scoped lang="scss">
div.thought {
  width: 100%;
  height: 100%;
  position: relative;
  div.mainTxt {
    width: 600px;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p.level {
      height: 180px;
      line-height: 180px;
      margin-bottom: 20px;
      color: #FFFFFF;
      font-size: 250px;
      font-weight: 900;
      font-family: "Volte";
    }
    p.chWord {
      color: #FFFFFF;
      font-size: 80px;
      font-weight: bold;
      font-family: "SourceHanSansCN";
    }
    p.enWord {
      color: #FFFFFF;
      font-size: 35px;
      letter-spacing: 3px;
      font-weight: normal;
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
