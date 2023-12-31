<template>
  <div class="exampleEffect">
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
    <div class="countdownBtn">
      <span>{{ num }}</span>
    </div>
    <video id="video" autoplay muted width="1920" height="1080">
      <source
        type="video/mp4"
        src="../../assets/video/rect11.mp4">
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

const num = ref(15);
const sleep = (timer = 4000) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer)
  })
}
onMounted(() => { initTimer() })
const initTimer = async () => {
  await sleep(1000);
  num.value = 14;
  await sleep(1000);
  num.value = 13;
  await sleep(1000);
  num.value = 12;
  await sleep(1000);
  num.value = 11;
  await sleep(1000);
  num.value = 10;
  await sleep(1000);
  num.value = 9;
  await sleep(1000);
  num.value = 8;
  await sleep(1000);
  num.value = 7;
  await sleep(1000);
  num.value = 6;
  await sleep(1000);
  num.value = 5;
  await sleep(1000);
  num.value = 4;
  await sleep(1000);
  num.value = 3;
  await sleep(1000);
  num.value = 2;
  await sleep(1000);
  num.value = 1;
  await sleep(1000);
  num.value = 0;
  await sleep(1000);
  router.push({
    name: "thought",
  })
}

</script>
<style scoped lang="scss">
div.exampleEffect {
  width: 100%;
  height: 100%;
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
  >div.countdownBtn {
    width: 164px;
    height: 164px;
    line-height: 164px;
    text-align: center;
    background: #3C3C3C;
    border-radius: 50%;
    position: absolute;
    top: 45px;
    right: 240px;
    z-index: 10;
    span {
      color: #FFFFFF;
      font-size: 100px;
      font-weight: bold;
    }
  }
}
</style>
