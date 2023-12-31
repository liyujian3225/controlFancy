<template>
  <div class="meditation">
    <img class="mainImg" src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png" alt="">
    <div class="layer" :style="{'backdrop-filter': `blur(${blur}px)`}" v-if="showFilter">
      <span v-if="showNum">{{ num }}</span>
    </div>
    <div class="mainText">
      <p>
        <i>PERPARE</i>
      </p>
      <p>进化水平将由您的想</p>
      <p>象力发散程度决定</p>
      <p>
        <i>Your Level of Evolution Will Be Determined by Your Ability to Meditate</i>
      </p>
    </div>
    <video autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect4.mp4">
      您的当前设备不支持video标签
    </video>
  </div>
</template>
<script setup>

const sleep = (timer = 4000) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer)
  })
}

const router = useRouter();
onMounted(() => { initTimer() })
const showFilter = ref(false);
const showNum = ref(false)
const blur = ref(1);
const num = ref(3);
const initTimer = async () => {
  await sleep(100);
  showFilter.value = true;
  blur.value = 2;
  await sleep(100);
  blur.value = 3;
  await sleep(100);
  blur.value = 4;
  await sleep(100);
  blur.value = 5;
  await sleep(100);
  blur.value = 6;
  await sleep(100);
  blur.value = 7;
  await sleep(100);
  blur.value = 8;
  await sleep(100);
  blur.value = 9;
  await sleep(100);
  blur.value = 10;
  await sleep(2000);
  showNum.value = true;
  await sleep(1000);
  num.value = 2;
  await sleep(1000);
  num.value = 1;
  await sleep(1000);
  num.value = 0;
  await sleep(1000);
  router.push({ name: 'exampleEffect' })
}

</script>
<style scoped lang="scss">
div.meditation {
  width: 100%;
  height: 100%;
  position: relative;
  .mainImg {
    width: 570px;
    height: 760px;
    position: absolute;
    top: 159px;
    left: 279px;
    z-index: 10;
  }
  div.layer {
    width: 570px;
    height: 760px;
    text-align: center;
    background: rgba(0,0,0,0.4);
    position: absolute;
    top: 159px;
    left: 279px;
    z-index: 11;
    padding-top: 100px;
    box-sizing: border-box;
    span {
      font-size: 500px;
      font-weight: bold;
      color: #FFFFFF;
      font-family: "Volte";
    }
  }
  .mainText {
    width: 810px;
    height: 760px;
    position: absolute;
    top: 280px;
    left: 985px;
    p:first-child {
      height: 130px;
      font-size: 120px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #FFFFFF;
      font-family: "Volte";
    }
    p:nth-child(2) {
      height: 110px;
      font-size: 90px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
    }
    p:nth-child(3) {
      font-size: 90px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
      margin-bottom: 30px;
    }
    p:last-child {
      font-size: 40px;
      color: #FFFFFF;
      font-family: "Volte";
    }
  }
}
</style>
