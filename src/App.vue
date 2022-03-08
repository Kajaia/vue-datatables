<template>
  <div class="container-fluid">
    <div class="container my-3">
      <InformationBase :name="'hotels'" />
    </div>
  </div>
</template>

<script>
import InformationBase from "./components/InformationBase";

export default {
  name: "app",
  components: { InformationBase },
};
</script>
