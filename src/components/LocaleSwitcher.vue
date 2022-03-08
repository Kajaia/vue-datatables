<template>
  <div class="d-flex justify-content-center gap-2">
    <img
      class="flag pointer"
      src="https://intranet.infoajara.com/storage/images/XCHGW8ozItkGLE4BAmzUwc85MoIMSXksj72xyVaw.svg"
      alt="ka"
      @click="changeLanguage('ka')"
    />
    <img
      class="flag pointer"
      src="https://intranet.infoajara.com/storage/images/6mPOmyZqbc3iDJ3Bi5jzl4TnIAI6iNImaHH362qE.svg"
      alt="en"
      @click="changeLanguage('en')"
    />
    <img
      class="flag pointer"
      src="https://intranet.infoajara.com/storage/images/6lv6OB5unPT5r6KTy2Nqnaff72ud4Zih1g3me8ns.svg"
      alt="ru"
      @click="changeLanguage('ru')"
    />
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  methods: {
    changeLanguage(lang) {
      this.$store.commit("changeLanguage", lang);
      localStorage.locale = lang;
    },
  },
};
</script>

<style scoped>
.flag {
  height: 24px;
}
</style>
