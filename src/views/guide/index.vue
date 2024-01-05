<template>
  <div class="guide">
    <div class="mainText">
      <p :style="{opacity: opacity}">{{ mainTxt }}</p>
      <p :style="{opacity: opacity}">
        <i>{{ subTxt }}</i>
      </p>
    </div>
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

//自动跳转
const router = useRouter();
const mainTxt = ref("当你可以打破身体的界限");
const subTxt = ref("When you can break the boundaries of your body");
const opacity = ref(0)
onMounted(() => { autoSwitchTxt() });
const autoSwitchTxt = async () => {
  await sleep(500);
  opacity.value = 1;
  await sleep(3000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  mainTxt.value = "用想象与AI进行沟通";
  subTxt.value = "using imagination to communicate with AI";
  await sleep(3000);
  opacity.value = 0;
  await sleep(1000);
  opacity.value = 1;
  mainTxt.value = "你是否能控制你的想象呢?";
  subTxt.value = "can you control your imagination?";
  await sleep(3000);
  opacity.value = 0;
  await sleep(1000);
  router.push({ name: 'share' })
}

</script>
<style lang="scss" scoped>
div.guide {
  width: 100%;
  height: 100%;
  background: #000000;
  position: relative;
  .mainText {
    width: 80%;
    height: 400px;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    p:first-child {
      text-align: center;
      font-size: 80px;
      color: #ffffff;
      transition: opacity 1s linear;
      font-family: "SourceHanSansCN";
    }
    p:last-child {
      text-align: center;
      font-size: 38px;
      color: #ffffff;
      transition: opacity 1s linear;
      font-family: "SourceHanSansCN";
    }
  }
}
</style>
