<template>
  <div class="attentionLevel">
    <video id="video" autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect4.mp4">
      您的当前设备不支持video标签
    </video>
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <img class="mainImage" src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E4%BC%81%E9%B9%85.png" alt="">

    <div class="mainTxtStepFirst" :style="{opacity: firstTxtOpacity}">
      <p class="level">{{ level }}</p>
      <p class="chWord">专注力水平</p>
      <p class="enWord">
        <span>Level of</span>
        <span><i>concentration</i></span>
      </p>
    </div>

    <div class="mainTxtStepSecond" :style="{opacity: secondTxtOpacity}">
      <p> <i>NEXT</i></p>
      <p>此生物将会</p>
      <p>由碳基向硅基进化</p>
      <p><i>This Organism Will Evolve from Carbon-based to Silicon-based</i></p>
    </div>

    <div class="mainTxtStepThird" :style="{opacity: thirdTxtOpacity}">
      <p> <i>PERPARE</i></p>
      <p>进化水平将由您的想</p>
      <p>象力发散程度决定</p>
      <p><i>Your Level of Evolution Will Be Determined by Your Ability to Meditate</i></p>
    </div>
    <div
      class="layer"
      :style="{'backdrop-filter': `blur(${blur}px)`}"
      v-if="showFilter">
      <span v-if="showNum">{{ num }}</span>
    </div>

  </div>
</template>
<script setup>
const route = useRoute();
const level = ref(route.params.x);

const sleep = (timer = 4000) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer)
  })
}

//返回桌面
const router = useRouter();
const dumpHome =  () => {
  router.push({
    name: "home",
  })
}

const firstTxtOpacity = ref(0);
const secondTxtOpacity = ref(0);
const thirdTxtOpacity = ref(0);

const showFilter = ref(false);
const blur = ref(1);
const num = ref(3);
const showNum = ref(false)

onMounted(async () => {
  firstTxtOpacity.value = 1;
  await sleep(6000);
  firstTxtOpacity.value = 0;
  secondTxtOpacity.value = 1;
  await sleep(6000);
  firstTxtOpacity.value = 0;
  secondTxtOpacity.value = 0;
  thirdTxtOpacity.value = 1;
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
  // router.push({ name: 'exampleEffect' })
})

</script>
<style scoped lang="scss">
div.attentionLevel {
  width: 100%;
  height: 100%;
  position: relative;
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
  >img.mainImage {
    width: 570px;
    height: 760px;
    position: absolute;
    top: 159px;
    left: 279px;
    z-index: 10;
  }
  div.mainTxtStepFirst {
    width: 360px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 400px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity .35s linear;
    p.level {
      height: 180px;
      line-height: 180px;
      margin-bottom: 20px;
      color: #FFFFFF;
      font-size: 250px;
      font-weight: bold;
      font-family: "Volte";
    }
    p.chWord {
      color: #FFFFFF;
      font-size: 55px;
      font-weight: bold;
      font-family: "SourceHanSansCN";
    }
    p.enWord {
      span:first-child {
        color: #FFFFFF;
        font-size: 35px;
        font-weight: bold;
        font-family: "Volte";
      }
      span:last-child {
        color: #FFFFFF;
        font-size: 35px;
        font-weight: normal;
      }
    }
  }
  div.mainTxtStepSecond {
    width: 745px;
    height: 760px;
    position: absolute;
    top: 290px;
    left: 985px;
    z-index: 9;
    transition: opacity .35s linear;
    p:first-child {
      height: 130px;
      font-size: 120px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #FFFFFF;
      font-family: "Volte";
    }
    p:nth-child(2) {
      height: 120px;
      font-size: 90px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
    }
    p:nth-child(3) {
      height: 120px;
      margin-bottom: 30px;
      font-size: 90px;
      font-weight: 400;
      color: #FFFFFF;
      font-family: "SourceHanSansCN";
    }
    p:last-child {
      font-size: 42px;
      color: #FFFFFF;
      font-family: "Volte";
    }
  }
  div.mainTxtStepThird {
    width: 810px;
    height: 760px;
    position: absolute;
    top: 280px;
    left: 985px;
    z-index: 8;
    transition: opacity .35s linear;
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
}
</style>
