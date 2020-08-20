<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svg-icon iconClass="beian" className="className"></svg-icon>
  </div>
</template>

<script>
import img from "@img/logo.png";
export default {
  name: "",
  data() {
    return {};
  },
  created() {
    console.log(img);
  },
  computed: {
    img() {
      return img;
    }
  }
};
</script>

<style lang="scss" scoped>
.className {
  color: black;
}
</style>
