<template>
  <div class="row justify-content-center my-5 pt-5">
    <div class="col-6 col-md-4 col-lg-3 my-2">
      <div class="card h-100 border-0 rounded-3 shadow">
        <div class="card-body text-center">
          <i class="fas fa-bed fa-3x text-primary"></i>
          <div class="mt-2">
            <router-link
              class="stretched-link text-decoration-none fs-5"
              :to="{ name: 'Category', params: { category: 'hotels' } }"
              >{{
                $store.state.locale === "ka"
                  ? "სასტუმროები"
                  : $store.state.locale === "en"
                  ? "Hotels"
                  : $store.state.locale === "ru"
                  ? "Отели"
                  : null
              }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-lg-3 my-2">
      <div class="card h-100 border-0 rounded-3 shadow">
        <div class="card-body text-center">
          <i class="fas fa-utensils fa-3x text-primary"></i>
          <div class="mt-2">
            <router-link
              class="stretched-link text-decoration-none fs-5"
              :to="{ name: 'Category', params: { category: 'restaurants' } }"
              >{{
                $store.state.locale === "ka"
                  ? "რესტორნები"
                  : $store.state.locale === "en"
                  ? "Restaurants"
                  : $store.state.locale === "ru"
                  ? "Рестораны"
                  : null
              }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-lg-3 my-2">
      <div class="card h-100 border-0 rounded-3 shadow">
        <div class="card-body text-center">
          <i class="fas fa-compass fa-3x text-primary"></i>
          <div class="mt-2">
            <router-link
              class="stretched-link text-decoration-none fs-5"
              :to="{ name: 'Category', params: { category: 'sights' } }"
              >{{
                $store.state.locale === "ka"
                  ? "ღირსშესანიშნაობები"
                  : $store.state.locale === "en"
                  ? "Sights"
                  : $store.state.locale === "ru"
                  ? "Достопримечательности"
                  : null
              }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-lg-3 my-2">
      <div class="card h-100 border-0 rounded-3 shadow">
        <div class="card-body text-center">
          <i class="fas fa-theater-masks fa-3x text-primary"></i>
          <div class="mt-2">
            <router-link
              class="stretched-link text-decoration-none fs-5"
              :to="{ name: 'Category', params: { category: 'entertainments' } }"
              >{{
                $store.state.locale === "ka"
                  ? "გართობა"
                  : $store.state.locale === "en"
                  ? "Entertainment"
                  : $store.state.locale === "ru"
                  ? "Развлечение"
                  : null
              }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-lg-3 my-2">
      <div class="card h-100 border-0 rounded-3 shadow">
        <div class="card-body text-center">
          <i class="fas fa-car fa-3x text-primary"></i>
          <div class="mt-2">
            <router-link
              class="stretched-link text-decoration-none fs-5"
              :to="{ name: 'Category', params: { category: 'transports' } }"
              >{{
                $store.state.locale === "ka"
                  ? "ტრანსპორტი"
                  : $store.state.locale === "en"
                  ? "Transport"
                  : $store.state.locale === "ru"
                  ? "Транспорт"
                  : null
              }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
