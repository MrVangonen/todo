<template>
  <div class="container">
    <div class="logo-wrapper">
      <span class="">Job</span>
      <img class="logo logo_vue-image logo_animation" alt="have" />
      <span class="">to be done</span>
    </div>
    <ToDoList />
  </div>
</template>

<script>
import ToDoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    ToDoList,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
@font-face {
  font-family: "IndieFlower";
  src: url("./assets/fonts/IndieFlower.ttf");
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%; // default 10px (from 10px)
}

body {
  color: $text;
  background-color: lighten($primary, 30);
}

/* кнопка по умолчанию */

a,
button {
  display: inline-block;
  vertical-align: top;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
  line-height: 1.1;
  background-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji"; // default font for any Browser
  font-size: 2rem;
  font-weight: medium;
}

@keyframes salto {
  from {
    content: url("./assets/images/logo.png");
    bottom: 0;
    left: 0;
  }
  50% {
    bottom: 11rem;
    transform: rotate(120deg);
    left: 2rem;
  }
  100% {
    bottom: 0;
    transform: rotate(360deg);
    left: 0;
  }
}

@keyframes change {
  0% {
    opacity: 1;
  }
  72% {
    opacity: 0.75;
    content: url("./assets/images/vue.png");
  }
  82% {
    opacity: 0.2;
    content: url("./assets/images/logo.png");
  }
  100% {
    opacity: 1;
    content: url("./assets/images/logo.png");
  }
}

.container {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "indieFlower";
  font-size: 3rem;
}

.logo {
  position: relative;
  width: 10rem;
  margin: 2rem 0;
  background-repeat: no-repeat;
  background-size: cover;

  &_vue-image {
    content: url("./assets/images/vue.png");
  }

  &_animation {
    animation: salto 2s ease-in 1, change 5s ease-in 1;
    animation-fill-mode: forwards;
  }
}

#app {
  position: relative;
  min-height: 100vh;
  text-align: center;
  padding-top: 60px;
}
</style>
