<template>
  <div class="d-flex justify-content-center gap-2 mt-5">
    <router-link :to="{ name: 'Category', params: { category: 'hotels' } }"
      >Hotels</router-link
    >
    <router-link :to="{ name: 'Category', params: { category: 'restaurants' } }"
      >Restaurants</router-link
    >
    <router-link :to="{ name: 'Category', params: { category: 'sights' } }"
      >Sights</router-link
    >
    <router-link
      :to="{ name: 'Category', params: { category: 'entertainments' } }"
      >Entertainment</router-link
    >
    <router-link :to="{ name: 'Category', params: { category: 'transports' } }"
      >Transport</router-link
    >
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
