<template>
  <div class="prepare">
    <div class="carousel">
      <el-carousel
        class="imgCarousel"
        height="600px"
        :interval="3000"
        indicator-position="outside"
        arrow="never">
        <el-carousel-item v-for="item in imgCarouselList" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainText">
      <p>请确认佩戴右方脑电采集设备</p>
      <p>
        <i>Please Wear The BCI Collection Device Right</i>
      </p>
    </div>
    <div class="dumpNext" @click="dumpNext">
      <span>确认</span>
    </div>
    <div class="homeBtn" @click="dumpHome">
      <img src="http://aigcassset.oss-cn-beijing.aliyuncs.com/%E5%9B%9E%E5%88%B0%E9%A6%96%E9%A1%B5.png" alt="">
    </div>
  </div>
</template>
<script setup>

//跳转到下一页
import { useRouter } from 'vue-router';
const router = useRouter();
const dumpNext = () => {
  router.push({
    name: "concentration",
  })
}
const dumpHome =  () => {
  router.push({
    name: "home",
  })
}

//轮播图处理
import slideImg1 from "../../assets/img/slideImg1.jpg";
import slideImg2 from "../../assets/img/slideImg2.jpg";
import slideImg3 from "../../assets/img/slideImg3.jpg";
const imgCarouselList = [slideImg1, slideImg2, slideImg3 ]

</script>
<style scoped lang="scss">
div.prepare {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000000;
  >div.carousel {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 243px;
    left: 181px;
    z-index: 10;
    img {
      width: 600px;
      height: 600px;
    }
  }
  >div.mainText {
    width: 715px;
    height: 130px;
    position: absolute;
    top: 390px;
    right: 240px;
    z-index: 10;
    p:first-child {
      margin-bottom: 10px;
      text-align: center;
      letter-spacing: 1px;
      color: #ffffff;
      font-size: 54px;
      font-family: "SourceHanSansCN";
    }
    p:last-child {
      text-align: center;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 32px;
      font-weight: bold;
      font-family: "Volte";
    }
  }
  >div.dumpNext {
    width: 696px;
    height: 104px;
    line-height: 104px;
    text-align: center;
    background: linear-gradient(90deg, #DA3DDC 0%, #157CF5 100%);
    border-radius: 52px;
    cursor: pointer;
    position: absolute;
    right: 240px;
    bottom: 269px;
    &:hover {
      background: linear-gradient(195deg, #D969DA 0%, #66B9D5 100%);
    }
    span {
      font-size: 50px;
      font-weight: 600;
      color: #FFFFFF;
    }
  }
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
}
</style>
