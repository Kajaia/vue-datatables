<template>
  <h1 class="display-2 text-center mb-4">
    {{ pageTitle }}
  </h1>
  <div class="row justify-content-between my-2">
    <div class="col-sm-6 col-md-4 col-lg-3 my-1">
      <div class="d-flex align-items-center">
        <select
          id="perPage"
          class="form-select sm-select"
          v-model="params.perPage"
        >
          <option
            v-for="(length, index) in params.pageLength"
            :key="index"
            :value="length.value"
          >
            {{ length.value }}
          </option>
        </select>
        <label for="perPage" class="form-label ms-1 mt-1"
          ><small>records per page</small></label
        >
      </div>
    </div>
    <div class="col-sm-6 col-md-5 col-lg-3 my-1">
      <input
        class="form-control"
        type="text"
        v-model="params.search"
        placeholder="Search..."
      />
    </div>
  </div>
  <button class="btn btn-sm btn-secondary mb-2" @click="showFilters">
    {{ filtersText }} filters
  </button>
  <div
    v-show="filters"
    class="row justify-content-center mb-2 py-4 mx-1 w-100 bg-light rounded-3"
  >
    <div class="col-sm-6 col-md-4 col-lg-3 my-1">
      <select class="form-select" v-model="params.category_id">
        <option :value="null">All categories</option>
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category.id"
        >
          {{ category.name_en }}
        </option>
      </select>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3 my-1">
      <select class="form-select" v-model="params.municipality_id">
        <option :value="null">All municipalities</option>
        <option
          v-for="(municipality, index) in municipalities"
          :key="index"
          :value="municipality.id"
        >
          {{ municipality.name_en }}
        </option>
      </select>
    </div>
  </div>
  <div class="d-flex gap-1 my-1">
    <button
      class="btn btn-sm btn-primary dropdown-toggle"
      type="button"
      id="allExportDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Download all
    </button>
    <ul class="dropdown-menu" aria-labelledby="allExportDropdown">
      <li><h6 class="dropdown-header">Choose language</h6></li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'ka')"
          >Georgian</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'en')"
          >English</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'ru')"
          >Russian</a
        >
      </li>
    </ul>
    <button
      class="btn btn-sm btn-primary dropdown-toggle"
      type="button"
      id="exportDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      v-show="selected.length"
    >
      Download {{ selected.length }}
      <span v-if="selected.length > 1">records</span>
      <span v-else>record</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="exportDropdown">
      <li><h6 class="dropdown-header">Choose language</h6></li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'ka')"
          >Georgian</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'en')"
          >English</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'ru')"
          >Russian</a
        >
      </li>
    </ul>
  </div>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead class="bg-dark text-white">
        <tr>
          <th scope="col" class="text-center w-10"></th>
          <th
            scope="col"
            class="w-25 pointer"
            @click.prevent="changeSort('name_en')"
          >
            Name
            <span
              v-if="params.sortBy == 'name_en' && params.sortDirection == 'asc'"
              ><i class="fas fa-caret-up fa-sm"></i
            ></span>
            <span
              v-if="
                params.sortBy == 'name_en' && params.sortDirection == 'desc'
              "
              ><i class="fas fa-caret-down fa-sm"></i
            ></span>
          </th>
          <th
            scope="col"
            class="w-25 pointer"
            @click.prevent="changeSort('category_id')"
          >
            Category
            <span
              v-if="
                params.sortBy == 'category_id' && params.sortDirection == 'asc'
              "
              ><i class="fas fa-caret-up fa-sm"></i
            ></span>
            <span
              v-if="
                params.sortBy == 'category_id' && params.sortDirection == 'desc'
              "
              ><i class="fas fa-caret-down fa-sm"></i
            ></span>
          </th>
          <th
            scope="col"
            class="w-25 pointer"
            @click.prevent="changeSort('municipality_id')"
          >
            Municipality
            <span
              v-if="
                params.sortBy == 'municipality_id' &&
                params.sortDirection == 'asc'
              "
              ><i class="fas fa-caret-up fa-sm"></i
            ></span>
            <span
              v-if="
                params.sortBy == 'municipality_id' &&
                params.sortDirection == 'desc'
              "
              ><i class="fas fa-caret-down fa-sm"></i
            ></span>
          </th>
          <th scope="col" class="w-25">Mobile</th>
          <th scope="col" class="w-25">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <th scope="row" class="text-center">
            <input
              class="form-check-input"
              type="checkbox"
              :value="'&selected[]=' + record.id"
              v-model="selected"
            />
          </th>
          <td>{{ record.name_en ?? "-" }}</td>
          <td>{{ record.category.name_en ?? "-" }}</td>
          <td>{{ record.municipality.name_en ?? "-" }}</td>
          <td>{{ record.mobile ?? "-" }}</td>
          <td>{{ record.email ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex align-items-center justify-content-between flex-direction">
    <div class="my-1">
      Showing {{ pagination.from }} to {{ pagination.to }} of
      {{ pagination.total }} records
    </div>
    <nav class="my-1">
      <ul class="pagination flex-wrap">
        <li
          v-for="(link, index) in pagination.links"
          :key="index"
          class="page-item"
          :class="link.active === true ? 'active' : ''"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(link.label)"
            v-if="link.label.length <= 3"
            >{{ link.label }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "../helpers/index";

export default {
  props: ["name"],
  data() {
    return {
      records: [],
      categories: [],
      municipalities: [],
      selected: [],
      filters: false,
      filtersText: "Show",
      params: {
        page: 1,
        pageLength: [
          { value: 10 },
          { value: 25 },
          { value: 50 },
          { value: 75 },
          { value: 100 },
          { value: 500 },
        ],
        perPage: 10,
        search: "",
        sortBy: "id",
        sortDirection: "asc",
        category_id: null,
        municipality_id: null,
      },
      pagination: {},
    };
  },
  watch: {
    params: {
      handler() {
        this.getResults();
      },
      deep: true,
    },
  },
  computed: {
    pageTitle() {
      let title = this.name;
      return title.split("")[0].toUpperCase() + title.slice(1, title.length);
    },
  },
  methods: {
    getResults() {
      axios
        .get(`${API_URL}/api/database/${this.name}`, {
          params: {
            page: this.params.page,
            perPage: this.params.perPage,
            search: this.params.search,
            sortBy: this.params.sortBy,
            sortDirection: this.params.sortDirection,
            category_id: this.params.category_id,
            municipality_id: this.params.municipality_id,
          },
        })
        .then((res) => {
          this.records = res.data.data;
          this.pagination = {
            current_page: res.data.current_page,
            first_page_url: res.data.first_page_url,
            from: res.data.from,
            last_page: res.data.last_page,
            last_page_url: res.data.last_page_url,
            links: res.data.links,
            next_page_url: res.data.next_page_url,
            prev_page_url: res.data.prev_page_url,
            to: res.data.to,
            total: res.data.total,
          };
        })
        .catch(console.error());
    },
    getCategories() {
      axios
        .get(`${API_URL}/api/database/${this.name}-categories`)
        .then((res) => {
          this.categories = res.data;
        })
        .catch(console.error());
    },
    getMunicipalities() {
      axios
        .get(`${API_URL}/api/map/municipalities`)
        .then((res) => {
          this.municipalities = res.data.municipalities;
        })
        .catch(console.error());
    },
    exportRecords(selected, lang) {
      axios
        .get(
          `${API_URL}/api/database/${this.name}-export?lang=${lang}${selected}`,
          { responseType: "blob" }
        )
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
      this.selected = [];
    },
    changeSort(column) {
      if (this.params.sortBy === column) {
        this.params.sortDirection =
          this.params.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.params.sortBy = column;
        this.params.sortDirection = "asc";
      }
    },
    changePage(page) {
      this.params.page = page;
    },
    showFilters() {
      this.filters = !this.filters;
      if (this.filters === true) this.filtersText = "Hide";
      else this.filtersText = "Show";
    },
  },
  mounted() {
    this.getResults();
    this.getCategories();
    this.getMunicipalities();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.sm-select {
  width: 80px !important;
}

.flex-direction {
  flex-direction: row;
}

@media only screen and (max-width: 1023px) {
  .flex-direction {
    flex-direction: column;
  }
}
</style>
