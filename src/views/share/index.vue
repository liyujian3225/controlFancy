<template>
  <div class="meditation">
    <img class="mainImg" src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%90%8E%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E4%B9%8C%E9%BE%9F-after.png" alt="">
    <div class="mainText">
      <div>
        <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A1%B5%E9%9D%A2%E5%9B%BA%E5%AE%9A%E6%96%87%E5%AD%97%E5%88%87%E5%9B%BE/%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="">
      </div>
      <p>扫码关注公众号</p>
      <p>获取图片、专注力冥想力报告</p>
      <div class="back" @click="dump">
        <span>Back</span>
      </div>
    </div>
    <video autoplay muted width="1920" height="1080" style="transform: translateX(-145px)">
      <source
        type="video/mp4"
        src="../../assets/video/rect6.mp4">
      您的当前设备不支持video标签
    </video>
  </div>
</template>
<script setup>

const router = useRouter();
const dump = () => {
  router.push({ name: 'home' })
}

</script>
<style scoped lang="scss">
div.meditation {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  .mainImg {
    width: 760px;
    height: 760px;
    position: absolute;
    top: 158px;
    left: 159px;
    z-index: 10;
  }
  .mainText {
    width: 407px;
    height: 760px;
    position: absolute;
    top: 325px;
    right: 300px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      width: 251px;
      height: 244px;
      background: rgba(255,255,255,0.15);
      border-radius: 0;
      opacity: 1;
      margin-bottom: 30px;
    }
    p {
      height: 50px;
      line-height: 50px;
      font-size: 31px;
      color: #ffffff;
      &:nth-child(3) {
        margin-bottom: 140px;
      }
    }
    div.back {
      width: 257px;
      height: 82px;
      line-height: 82px;
      text-align: center;
      background: #3F3F3F;
      border-radius: 41px 41px 41px 41px;
      opacity: 1;
      cursor: pointer;
      transition: background-color .35s linear;
      &:hover {
        background: #0049B7;
      }
      span {
        font-size: 47px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }
}
</style>
