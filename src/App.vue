<template>
  <div class="container-fluid">
    <div class="container my-3">
      <LocaleSwitcher />
      <RouterView />
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from "./components/LocaleSwitcher";

export default {
  name: "app",
  components: { LocaleSwitcher },
};
</script>

<style>
@font-face {
  font-family: "FiraGO";
  font-style: normal;
  font-weight: 400;
  src: url("./assets/firago.woff") format("woff");
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "FiraGO", sans-serif !important;
}

.pointer {
  cursor: pointer;
}
</style>
