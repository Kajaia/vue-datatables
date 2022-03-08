<template>
  <InformationBase :name="category" />
</template>

<script>
import InformationBase from "../components/InformationBase";

export default {
  name: "HomeView",
  props: ["category"],
  components: { InformationBase },
};
</script>
