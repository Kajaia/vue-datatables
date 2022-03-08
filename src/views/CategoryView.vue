<template>
  <div class="text-center">
    <router-link class="text-decoration-none" :to="{ name: 'Home' }">
      <i class="fas fa-angle-left fa-sm"></i>
      {{
        $store.state.locale === "ka"
          ? "უკან"
          : $store.state.locale === "en"
          ? "Back"
          : $store.state.locale === "ru"
          ? "Назад"
          : null
      }}
    </router-link>
  </div>
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
