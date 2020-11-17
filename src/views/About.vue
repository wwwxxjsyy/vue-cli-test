<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svg-icon iconClass="beian" class="className"></svg-icon>

    <img :src="img" alt />
  </div>
</template>

<script>
import img from "@img/logo.png";
// import "@scss/test.scss";
export default {
  name: "",
  data() {
    return {};
  },
  created() {
    // console.log(img);
  },
  computed: {
    img() {
      return img;
    },
  },
};
</script>

<style lang="scss" scoped>
.className {
  color: black;
}
</style>
