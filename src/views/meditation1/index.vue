<template>
  <div class="meditation">
    <img class="mainImg" :src="imageUrl" alt="">
    <div class="mainText">
      <p>
        <i>NEXT</i>
      </p>
      <p>此生物将会</p>
      <p>由碳基向硅基进化</p>
      <p>
        <i>This Organism Will Evolve from Carbon-based to Silicon-based</i>
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
const imageUrl = "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png";

//自动跳转
const router = useRouter();
let timer = null;
onUnmounted(() => { if(timer)clearTimeout(timer) })
timer = setTimeout(() => {
  router.push({ name: 'meditation2' })
}, 6000);

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
  .mainText {
    width: 745px;
    height: 760px;
    position: absolute;
    top: 290px;
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
}
</style>
