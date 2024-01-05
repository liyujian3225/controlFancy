<template>
  <div class="concentration1">
    <div class="mainTxt" :style="{opacity: mainTxtOpacity}">
      <p class="txt2">接下来</p>
      <p class="txt2">请提高您的专注力</p>
      <p class="txt3">
        <i>Try to improve your concentration</i>
      </p>
    </div>
    <div class="mainTxt2" :style="{opacity: mainTxt2Opacity}">
      <p class="txt2">IUI会基于你的</p>
      <p class="txt2" style="margin-bottom: 30px">专注想象力选择进化类型</p>
      <p class="txt3" style="margin-bottom: 8px">
        <i>The Higher the Concentration, the Slower</i>
      </p>
      <p class="txt3">
        <i>the Rotation Until it Stops</i>
      </p>
    </div>
    <div class="layer" :style="{opacity: layerOpacity}">
      <span>{{ layerNum }}</span>
    </div>
    <video id="video" autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect10.mp4">
      您的当前设备不支持video标签
    </video>
  </div>
</template>
<script setup>

const sleepTimeOutList = [];
onUnmounted(() => {
  sleepTimeOutList.forEach(t => clearTimeout(t))
})
const sleep = (timer = 4000) => {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, timer);
    sleepTimeOutList.push(t);
  })
}

const router = useRouter();
const mainTxtOpacity = ref(0)
const mainTxt2Opacity = ref(0);
const layerOpacity = ref(0);
const layerNum = ref(3);
onMounted(() => { watchVideoProgress()})
const watchVideoProgress = () => {
  const video = document.getElementById("video");
  video.addEventListener("timeupdate", async function() {
    const { currentTime } = video;
    if(currentTime > 0.829023) mainTxtOpacity.value = 1;
    if(currentTime > 5.448102) mainTxtOpacity.value = 0;
    if(currentTime > 5.678488) mainTxt2Opacity.value = 1;
    if(currentTime > 12.053629) layerOpacity.value = 1;
  })
  video.addEventListener("play", async function() {
    await sleep(12053);
    layerNum.value = 3;
    await sleep(1000);
    layerNum.value = 2;
    await sleep(1000);
    layerNum.value = "1";
    await sleep(1000);
    layerNum.value = "GO";
    await sleep(1000);
    router.push({
      name: 'carousel',
    })
  })
}

</script>
<style lang="scss" scoped>
div.concentration1 {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  div.mainTxt {
    width: 1290px;
    height: 500px;
    position: absolute;
    top: 385px;
    left: 326px;
    z-index: 2;
    transition: opacity .35s linear;
    p.txt2 {
      height: 117px;
      line-height: 117px;
      text-align: center;
      letter-spacing: 1px;
      color: #ffffff;
      font-size: 90px;
      font-family: "SourceHanSansCN";
    }
    p.txt3 {
      text-align: center;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 54px;
      font-weight: bold;
      font-family: "Volte";
      margin-top: 20px;
    }
  }
  div.mainTxt2 {
    width: 1290px;
    height: 500px;
    position: absolute;
    top: 190px;
    left: 326px;
    z-index: 2;
    transition: opacity .35s linear;
    p.txt2 {
      height: 80px;
      line-height: 80px;
      text-align: center;
      letter-spacing: 1px;
      color: #ffffff;
      font-size: 60px;
      font-family: "SourceHanSansCN";
    }
    p.txt3 {
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      font-size: 35px;
      font-weight: bold;
      font-family: "Volte";
    }
  }
  div.layer {
    width: 80%;
    height: 612px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
    position: absolute;
    top: -74px; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    transition: opacity .35s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 50px;
    span {
      font-size: 600px;
      color: #ffffff;
      font-family: "Volte";
      font-weight: bold;
    }
  }
}
</style>
