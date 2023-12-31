<template>
  <div class="tagGroup">
    <el-space :size="10">
      <div
        :class="['tag', { active: item.value === tagValue }]"
        v-for="item in tagList"
        :key="item.value"
        @click="handleChangeTag(item)"
      >{{ item.name }}
      </div>
    </el-space>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(['tagValue', 'tagList']);
const emit = defineEmits(['update:tagValue']);

let tagValue = $ref(props.tagValue);
const handleChangeTag = (item) => {
  const { value } = item;
  tagValue = value;
  emit("update:tagValue", value)
}

</script>
<style lang="scss" scoped>
div.tagGroup {
  div.tag {
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #cccccc;
    cursor: pointer;
    &.active {
      background: #A19D9D;
      color: #FFFFFF;
    }
  }
}
</style>
