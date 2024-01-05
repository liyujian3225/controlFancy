<template>
  <div class="prepare1">
    <div class="mainTxt">
      <div class="logoTxt">
        <img src="../../assets/img/prepare1logo.png" alt="">
      </div>
      <p class="txt1" :style="{opacity: opacity1}">
        <img src="../../assets/img/lineLeft.png" alt="">
        <span>开启想象力交互体验</span>
        <img src="../../assets/img/lineRight.png" alt="">
      </p>
      <p class="txt2" :style="{opacity: opacity2}">您的「专注力」和「冥想力」将会成为生物进化的控制器</p>
      <p class="txt3" :style="{opacity: opacity2}">
        <i>Your Ability To Focus And Meditate Will Be The Controller Of Biological Evolution</i>
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

const router = useRouter();
const opacity1 = ref(0);
const opacity2 = ref(0);
onMounted(async () => {
  await sleep(1000);
  opacity1.value = 1;
  await sleep(1000);
  opacity2.value = 1;
  await sleep(4000);
  router.push({ name: "prepare2" })
})

</script>
<style lang="scss" scoped>
div.prepare1 {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  div.mainTxt {
    width: 1290px;
    height: 500px;
    position: absolute;
    top: 295px;
    left: 326px;
    div.logoTxt {
      width: 490px;
      height: 179px;
      margin: 0 auto;
      margin-bottom: 50px;
      img {
        display: block;
        width: 100%;
        transform: translateX(10px);
      }
    }
    p.txt1 {
      height: 70px;
      line-height: 60px;
      margin-bottom: 88px;
      text-align: center;
      letter-spacing: 1px;
      color: #ffffff;
      font-size: 47px;
      font-family: "SourceHanSansCN";
      transition: opacity .35s linear;
      span {
        margin: 0 43px;
      }
      img {
        vertical-align: middle;
      }
    }
    p.txt2 {
      margin-bottom: 30px;
      text-align: center;
      letter-spacing: 1px;
      color: #ffffff;
      font-size: 45px;
      font-family: "SourceHanSansCN";
      transition: opacity .35s linear;
    }
    p.txt3 {
      text-align: center;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 27px;
      font-weight: bold;
      font-family: "Volte";
      transition: opacity .35s linear;
    }
  }
}
</style>
