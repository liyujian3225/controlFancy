<template>
  <div class="author">
    <el-dropdown>
      <el-avatar :src="userStore.userInfo.avatarPath"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="dumpMyStudio">我的口袋</el-dropdown-item>
          <el-dropdown-item @click="logoutBtnClick">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();

//退出
const logoutBtnClick = () => {
  userStore.logout();
}

//我的工作室
const router = useRouter();
const dumpMyStudio = () => {
  router.push({
    name: 'studiosManage',
  })
}
</script>
<style lang="scss" scoped>
div.author {
  width: 40px;
  height: 40px;
  margin-left: 25px;
  cursor: pointer;
}
</style>
