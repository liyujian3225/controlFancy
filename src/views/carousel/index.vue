<template>
  <div class="carousel">
    <div class="topProgress">
      <div class="progressBox">
        <el-progress
          color="#00FFF0"
          :stroke-width="13"
          :show-text="false"
          :percentage="50" />
      </div>
      <div
        class="dot"
        :style="{opacity: opacity, background: `${dotBackground}`}">
        <span v-if="showDotNum">{{ dotNum }}</span>
      </div>
      <div class="home">
        <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
      </div>
    </div>
    <div class="textProgress">
      <div>
        <span>48</span>
      </div>
      <div>
        <span>专注力</span>
        <span><i>concentration</i></span>
      </div>
    </div>
    <div class="carouselContain">
      <div class="carouselContainInner" :style="{left: `${left}px`}">
        <div
          class="carouselItemBox"
          v-for="(item, index) in mixSplideImageList"
          :key="index">
          <img :src="item" alt="">
      </div>
      </div>
    </div>
    <div class="tipBox">
      <div class="tipInner" :style="{width: tipsWidth + 'px', background: tipsBackGround}">
        <img src="../../assets/img/tip.png" alt="">
        <span class="tip" v-if="showTipWord">Tips</span>
        <span class="txt">{{ tipsText }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>

//图片轮播图相关
const mixSplideImageList_ = [
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E4%BC%81%E9%B9%85.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%8F%98%E8%89%B2%E9%BE%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%AD%94%E9%9B%80.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%B0%8F%E4%B8%91%E9%B1%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E6%B2%B3%E9%A9%AC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E6%B5%B7%E8%B1%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%89%9B.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%97.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%AE%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%9E%AA%E7%BE%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%80%81%E8%99%8E.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9C%82.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9D%B4%E8%9D%B6.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9E%83%E8%9F%B9.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%B1%A1.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%9D%92%E8%9B%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%A9%AC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%AA%86%E9%A9%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B8%BD%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%A6%E9%B9%89.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%BE%9F.png",
]
const mixSplideImageList = [...mixSplideImageList_, ...mixSplideImageList_, ...mixSplideImageList_, ...mixSplideImageList_];

const sleep = (timer = 4000) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer)
  })
}

//dot呼吸灯效果
const router = useRouter();
onMounted(() => { breathLight() })
const opacity = ref(1);
const dotBackground = ref("#04FFFA");
const dotNum = ref(3);
const showDotNum = ref(false)
const breathLight = async () => {
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  await sleep(1000);
  opacity.value = 0;
  showDotNum.value = true;
  dotBackground.value = "#FF0000";
  dotNum.value = 3;
  await sleep(1000);
  opacity.value = 1;
  dotNum.value = 2;
  await sleep(1000);
  opacity.value = 0;
  dotNum.value = 1;
  await sleep(1000);
  router.push({ name: 'processTermination' })
}

//tips文字轮动
onMounted(() => { loopTipsText() });
const showTipWord = ref(true);
const tipsText = ref("");
const tipsWidth = ref(140);
const tipsBackGround = ref("linear-gradient(234deg, #04BCB7 0%, #2489FA 100%)");
const loopTipsText = async () => {
  await sleep(500);
  showLongWord("如何提升专注力? 尝试想象界面轮播速度下降")
  await sleep(4000);
  showShortWord()
  await sleep(500);
  showLongWord("如何提升专注力? 尝试集中注意力在某个物体上")
  await sleep(4000);
  showShortWord()
  await sleep(500);
  showLongWord("时间耗尽后专注力仍未达标，进程将会结束")
}

const showShortWord = () => {
  tipsWidth.value = 140;
}
const showLongWord = (txt) => {
  tipsText.value = txt;
  tipsWidth.value = 800;
  showTipWord.value = false;
  tipsBackGround.value = "rgba(123,123,123,0.38)"
}

//自定义轮动效果
let left = ref(0);
let carouseWidth = (mixSplideImageList.length * 300) + ((mixSplideImageList.length - 1) * 28);
carouseWidth = 1920 - carouseWidth;
const timer = setInterval(() => {
  if(left.value <= carouseWidth) left.value = 0;
  left.value -= 1;
}, 5)

</script>
<style scoped lang="scss">
div.carousel {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  div.topProgress {
    position: absolute;
    top: 80px;
    left: 85px;
    right: 85px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.progressBox {
      width: 1360px;
      margin-right: 150px;
    }
    div.dot {
      width: 54px;
      height: 54px;
      line-height: 54px;
      text-align: center;
      margin-right: 100px;
      border-radius: 50%;
      transition: all 1s linear;
      span {
        color: #ffffff;
        font-size: 45px;
      }
    }
    >div.home {
      width: 100px;
      height: 100px;
      background: rgba(255,255,255,0.27);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color .35s linear;
      &:hover {
        background: #0049B7;
      }
    }
  }
  div.textProgress {
    position: absolute;
    top: 155px;
    left: 85px;
    z-index: 10;
    display: flex;
    justify-content: start;
    align-items: center;
    >div:first-child {
      margin-right: 20px;
      span {
        font-size: 120px;
        color: #fff;
        font-family: "Volte";
      }
    }
    >div:last-child {
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      span:first-child {
        font-size: 40px;
        color: #fff;
        font-family: "SourceHanSansCN";
      }
      span:last-child {
        font-size: 50px;
        color: #fff;
        font-family: "Volte";
      }
    }
  }
  div.carouselContain {
    width: 100%;
    height: 400px;
    overflow-y: hidden;
    position: absolute;
    top: 380px;
    left: 0;
    z-index: 10;
    div.carouselContainInner {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: start;
      align-items: center;
      div.carouselItemBox {
        width: 300px;
        height: 400px;
        &:not(:last-child) {
          margin-right: 28px;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  div.tipBox {
    position: absolute;
    bottom: 110px;
    left: 85px;
    z-index: 10;
    div.tipInner {
      overflow: hidden;
      height: 82px;
      line-height: 78px;
      padding: 0 36px 0 130px;
      border-radius: 50px;
      transition: all .5s linear;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 36px;
      }
      span.tip {
        font-size: 48px;
        color: #ffffff;
        font-family: "Volte";
      }
      span.txt {
        font-size: 40px;
        color: #ffffff;
        font-family: "SourceHanSansCN";
      }
    }
  }
}
</style>
