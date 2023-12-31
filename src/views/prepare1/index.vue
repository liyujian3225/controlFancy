<template>
  <div class="prepare1">
    <div class="mainTxt">
      <div class="logoTxt">
        <img src="../../assets/img/prepare1logo.png" alt="">
      </div>
      <p class="txt1">
        <img src="../../assets/img/lineLeft.png" alt="">
        <span>开启想象力交互体验</span>
        <img src="../../assets/img/lineRight.png" alt="">
      </p>
      <p class="txt2">您的「专注力」和「冥想力」将会成为生物进化的控制器</p>
      <p class="txt3">
        <i>Your Ability To Focus And Meditate Will Be The Controller Of Biological Evolution</i>
      </p>
    </div>
  </div>
</template>
<script setup>

const router = useRouter();
let timer = null;
onUnmounted(() => { if(timer)clearTimeout(timer) })
timer = setTimeout(() => {
  router.push({
    name: "prepare2",
  })
}, 4000)

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
    }
    p.txt3 {
      text-align: center;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 27px;
      font-weight: bold;
      font-family: "Volte";
    }
  }
}
</style>
