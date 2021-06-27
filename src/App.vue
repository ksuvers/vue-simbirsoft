<template>
  <el-container>
    <el-header>
      <AppHeader />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss">
ul {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.el-main {
  min-height: calc(100vh - 60px);
}
</style>

<script>
import AppHeader from "@/components/Header";

export default {
  name: "App",
  components: {
    AppHeader
  }
};
</script>
