<template>
  <div class="attentionLevel">
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <div
      class="carouselItemBox"
      :style="{
         width: width + 'px',
         height: height + 'px',
         top: top + 'px',
         left: left + 'px',
       }">
      <img :src="focusImage" alt="" >
    </div>
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
      <span v-if="showNum" :style="{opacity: opacityNum}">{{ num }}</span>
    </div>

  </div>
</template>
<script setup>
const route = useRoute();
const level = route.query.level;
const focusImage = route.query.focusImage;

const width = ref(375);  //570
const height = ref(501); //760
const top = ref(route.query.top);  //160
const left = ref(route.query.left); //279

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
const showNum = ref(false);
const opacityNum = ref(0);

onMounted(async () => {
  await sleep(2000);
  width.value = 570;
  height.value = 760;
  top.value = 159;
  left.value = 279;
  await sleep(500);
  firstTxtOpacity.value = 1;
  await sleep(4000);
  firstTxtOpacity.value = 0;
  await sleep(1000);
  secondTxtOpacity.value = 1;
  await sleep(4000);
  secondTxtOpacity.value = 0;
  await sleep(1000);
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
  opacityNum.value = 1;
  await sleep(1000);

  opacityNum.value = 0;
  await sleep(1000);

  num.value = 2;
  opacityNum.value = 1;
  await sleep(1000);

  opacityNum.value = 0;
  await sleep(1000);

  num.value = 1;
  opacityNum.value = 1;
  await sleep(1000);

  opacityNum.value = 0;
  await sleep(1000);

  num.value = 0;
  opacityNum.value = 1;

  await sleep(1000);
  router.push({ name: 'exampleEffect' })
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
  >div.carouselItemBox {
    width: 375px;
    height: 501px;
    position: fixed;
    box-sizing: border-box;
    background-image: url("../../assets/img/acitveImage.png");


    background-size: 100% 100%;
    box-shadow: 0 0 24px 0 rgba(235,61,61,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s linear;
    img {
      display: block;
      width: 90%;
      height: 92%;
    }
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
    transition: opacity 1s linear;
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
    transition: opacity 1s linear;
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
    transition: opacity 1s linear;
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
      transition: opacity 1s linear;
    }
  }
}
</style>
