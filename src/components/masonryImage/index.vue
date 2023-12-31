<template>
  <div class="masonryImage">
    <div
      v-masonry
      transition-duration="0"
      item-selector=".item">
      <div
        class="item"
        :style="imgStyle"
        v-masonry-tile
        v-for="(item, index) in imageBlocks"
        :key="index">
        <img
          v-if="item.id !== -1"
          :src="item.content.url"
          @click="selectImage(item)"
        >
        <p v-if="showInfo" :style="{ width: imgStyle.width }">
          <span>{{ item.name}}</span>
          <span>{{ item.createTime.substr(0, 10) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['selectImage'])
const props = defineProps({
  imageBlocks: Array,
  imgStyle: Object,
  showInfo: {
    type: Boolean,
    default: false,
  }
});



const selectImage = (item) => {
  emit("selectImage", item);
}
</script>
<style lang="scss" scoped>
div.masonryImage {
  height: 100%;
  div.item {
    padding: 0 2px;
    box-sizing: border-box;
    img {
      width: 100%;
      border-radius: 10px;
      cursor: pointer;
    }
    p {
      height: 20px;
      line-height: 20px;
      padding-right: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
}
</style>
