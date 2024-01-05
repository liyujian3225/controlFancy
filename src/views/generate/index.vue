<template>
  <div class="generate">
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <video autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect5.mp4">
      您的当前设备不支持video标签
    </video>
    <div class="lightEffects" :style="{ width: num + 'px', height: num + 'px', opacity: opacity4 }">
      <img src="../../assets/img/generate1.png" alt="">
    </div>
    <div class="photoContain">
      <img
        :style="{transform: `rotateY(${turn}turn)`}"
        :src="tureImg"
        alt="">
    </div>
    <div class="dotContain">
      <div class="dot" :style="{opacity: opacity1}"></div>
      <div class="dot" :style="{opacity: opacity2}"></div>
      <div class="dot" :style="{opacity: opacity3}"></div>
    </div>
  </div>
</template>
<script setup>

const router = useRouter();
const dumpHome =  () => {
  router.push({
    name: "home",
  })
}

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

//背景动画
const num = ref(1400);
const opacity4 = ref(1);
let rectTimer = null;
onMounted(() => { initRectAnimate() });
onUnmounted(() => { if(rectTimer) clearInterval(rectTimer) })
const initRectAnimate = () => {
  rectTimer = setInterval(() => {
    num.value = num.value === 1400 ? 1200 : 1400;
    opacity4.value = opacity4.value === 0.8 ? 1 : 0.8;
  }, 1000)
}

//最终生成图片
setTimeout(() => {
  resultImage.value = "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%BE%9F.png"
}, 1000 * 10)

//小圆点动画
const opacity1 = ref(0);
const opacity2 = ref(0);
const opacity3 = ref(0);
const resultImage = ref("")
import normalImg from "../../assets/img/generate2.png"
import specialImg from "../../assets/img/generate2_.gif"
const turn = ref(0);
const tureImg = ref(normalImg)
let turnTimer = null;
onUnmounted(() => { if(turnTimer) clearInterval(turnTimer) })
onMounted(() => { initDotAnimate() });
const initDotAnimate = () => {
  turnTimer = setInterval(async () => {
    await sleep(500);
    opacity1.value = 1;
    await sleep(500);
    opacity2.value = 1;
    await sleep(500);
    opacity3.value = 1;
    await sleep(1000); //开始翻转
    opacity1.value = 0;
    opacity2.value = 0;
    opacity3.value = 0;
    turn.value += 0.5;
    await sleep(250);
    tureImg.value = tureImg.value === normalImg ? specialImg : normalImg;

    //生成图片时跳转
    if(resultImage.value) {
      tureImg.value = resultImage.value;
      clearInterval(turnTimer);
      await sleep(2000);
      router.push({ name: "lastLevel" })
    }

  }, 3000)
}

</script>
<style scoped lang="scss">
div.generate {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
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
  >div.lightEffects {
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    margin: auto;
    transition: all .35s linear;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  >div.photoContain {
    width: 750px;
    height: 750px;
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    margin: auto;
    perspective: 1500px;		/* 脱离平面屏幕束缚，元素离观察者眼睛的距离, 只能用在3d动画 */
    img {
      display: block;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;	/* 动画方式 3d */
      transition: .5s linear;  /* 运动速度，变速运动 */
    }
  }
  >div.dotContain {
    width: 350px;
    height: 20px;
    position: absolute;
    left: 0; right: 0;
    bottom: 260px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    div.dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      transition: all .10s linear;
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
}
</style>
