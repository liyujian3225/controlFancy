<template>
  <div class="carousel">
    <div class="topProgress">
      <div class="progressBox">
        <el-progress
          color="#00FFF0"
          :stroke-width="13"
          :show-text="false"
          :percentage="focusNum" />
      </div>
      <div
        class="dot"
        :style="{opacity: opacity, background: `${dotBackground}`}">
        <span v-if="showDotNum">{{ dotNum }}</span>
      </div>
      <div class="home" @click="dumpHome">
        <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
      </div>
    </div>
    <div class="textProgress">
      <div>
        <span>{{ focusNum }}</span>
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
          :key="index"
          :class="[
            {focusBackground: index === loopImageFocusIndex && isStop1},
            {focusImage: index === loopImageFocusIndex && isStop2}
          ]">
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
import dayjs from 'dayjs'

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

//根据专注力计算轮播图的速度
const getFocusSpeed = (focusNum) => {
  //(专注力：79 - 41 = 38)(距离：15 - 1 = 14) 14 / 38 = 0.368
  let diffDistance = 0;
  if(focusNum > 0 && focusNum <= 40) diffDistance = 15;
  if(focusNum > 40 && focusNum < 80) diffDistance = 15 - ((focusNum - 41) * 0.368)
  if(focusNum >= 80) diffDistance = 1;
  return diffDistance;
}

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
let carouseWidth = 1920 - ((mixSplideImageList.length * 300) + ((mixSplideImageList.length - 1) * 28));
let loopImageTimer = null;
onUnmounted(() => { if(loopImageTimer) clearInterval(loopImageTimer) })
let left = ref(0);
let isStop1 = ref(false)
let isStop2 = ref(false)
let loopImageFocusIndex = ref("") //计算最中间图片的位置
let level = ref("")
const loopImage = (diffDistance, callBack) => {
  if(loopImageTimer) clearInterval(loopImageTimer);
  loopImageTimer = setInterval(() => {
    if(left.value <= carouseWidth) left.value = 0;
    left.value -= diffDistance;
    //达到跳转的条件
    if(diffDistance === 0.9) {
      if(!loopImageFocusIndex.value) {
        loopImageFocusIndex.value = Math.floor(((left.value * -1) / 328) + 4);
      }
      const targetLeft = (window.innerWidth - 355) / 2
      const fDom = document.getElementsByClassName("carouselItemBox");
      const sDom = fDom[loopImageFocusIndex.value];
      const sDomLeft = sDom.getBoundingClientRect().left;

      if(sDomLeft <= targetLeft) {
        loopImage(0, async function() {
          isStop1.value = true;
          await sleep(1000)
          isStop2.value = true;
          await sleep(1000)

          const { left, top } = sDom.getBoundingClientRect();
          const { left: bodyLeft, top: bodyTop } = document.getElementsByTagName("body")[0].getBoundingClientRect();

          const ratioWH = window.innerWidth / window.innerHeight;
          let ratio;
          if(ratioWH < 1.7777) {
            ratio = 1920 / window.innerWidth;
          }else {
            ratio = 1080 / window.innerHeight;
          }
          const nLeft = (left - bodyLeft) * ratio;
          const nTop = (top - bodyTop) * ratio;

          router.push({
            name: 'attentionLevel',
            query: {
              left: nLeft,
              top: nTop,
              focusImage: mixSplideImageList[loopImageFocusIndex.value],
              level: level.value,
            }
          });

        });
      }

    }
    if(callBack) callBack()
  }, 10)
};

//获取专注力数值
const focusNum = ref(5);
let t = null;
onUnmounted(() => { if(t) clearInterval(t) })
onMounted(async () => {
  t = setInterval(() => {
    if(focusNum.value > 120) focusNum.value = 120
    focusNum.value += 10;
  }, 1000)
})

//监听专注力数值
const startUnix = dayjs().unix();  //组件加载时时间戳
const focusNumList = [];
watch(focusNum, function(v) {
  let endUnix = dayjs().unix();
  let diffSecond = (endUnix - startUnix);

  //最多存储近三次专注力的数值
  let diffDistance = 0;
  if(focusNumList.length >= 4) focusNumList.shift();
  focusNumList.push(v);
  if(focusNumList.length >= 4) {
    //跳转的核心逻辑
    //【路径一】如果在15s内，专注力达到80及以上，且从第一次达到80以上开始计算，连续三秒实时收到的数据都保持在80以上，轮播速度线性降低直到停止，选择轮播界面中中心的图片（需要控制速度停下时，有一张图片在画面中心），根据耗用时间区间跟等级定级
    //第一级：x=S，10<t<=15，
    //第二级：x=SS, 6<t<=9
    //第三级：x=SSS, 0<t<=6
    //【路径二】如果在15内，专注力达到80及以上，且从第一次达到80以上开始计算连续三秒实时收到的数据中存在低于80的，则轮播速度还原到用户专注力水平的速度，等待用户下一次完成图【路径一】
    //【路径三】若超过15s，则在16秒的时候跳转【进程终止页面】（页面跳转动画为渐隐渐现）
    const trueCondition = focusNumList.every(num => num > 80);
    if(diffSecond < 15) {
      if(trueCondition) {
        let x;
        if(diffSecond > 10 && diffSecond <= 15) x = "S";
        if(diffSecond > 6 && diffSecond <= 9) x = "SS";
        if(diffSecond > 0 && diffSecond <= 6) x = "SSS";
        level.value = x;
        loopImage(0.9);
      }else {
        diffDistance = getFocusSpeed(v);
        loopImage(diffDistance);
      }
    }else {
      router.push({ name: 'processTermination' });
    }
  }else {
    diffDistance = getFocusSpeed(v);
    loopImage(diffDistance);
  }
}, { immediate: true })

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

const dumpHome =  () => {
  router.push({
    name: "home",
  })
}

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
    height: 500px;
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
        &.focusBackground {
          width: 300px;
          height: 400px;
          box-sizing: border-box;
          background-image: url("../../assets/img/acitveImage.gif");
          background-size: 100% 100%;
          box-shadow: 0 0 24px 0 rgba(235,61,61,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 90%;
            height: 92%;
          }
        }
        &.focusImage {
          width: 375px;
          height: 501px;
          transition: all .5s linear;
        }
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
    bottom: 55px;
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
