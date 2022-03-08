<template>
  <h1 class="display-2 text-center mb-4">
    {{
      $store.state.locale === "ka"
        ? "სასტუმროები"
        : $store.state.locale === "en"
        ? pageTitle
        : $store.state.locale === "ru"
        ? "Отели"
        : null
    }}
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
          ><small>
            {{
              $store.state.locale === "ka"
                ? "ჩანაწერი ერთ გვერდზე"
                : $store.state.locale === "en"
                ? "records per page"
                : $store.state.locale === "ru"
                ? "записей на странице"
                : null
            }}
          </small></label
        >
      </div>
    </div>
    <div class="col-sm-6 col-md-5 col-lg-3 my-1">
      <input
        class="form-control"
        type="text"
        v-model="params.search"
        :placeholder="searchPlaceholder"
      />
    </div>
  </div>
  <button class="btn btn-sm btn-secondary mb-2" @click="showFilters">
    {{ filtersText }}
  </button>
  <div
    v-show="filters"
    class="row justify-content-center mb-2 py-4 mx-1 w-100 bg-light rounded-3"
  >
    <div class="col-sm-6 col-md-4 col-lg-3 my-1">
      <select class="form-select" v-model="params.category_id">
        <option :value="null">
          {{
            $store.state.locale === "ka"
              ? "ყველა კატეგორია"
              : $store.state.locale === "en"
              ? "All categories"
              : $store.state.locale === "ru"
              ? "Все категории"
              : null
          }}
        </option>
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category.id"
        >
          {{
            $store.state.locale === "ka"
              ? category.name_ka
              : $store.state.locale === "en"
              ? category.name_en
              : $store.state.locale === "ru"
              ? category.name_ru
              : null
          }}
        </option>
      </select>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3 my-1">
      <select class="form-select" v-model="params.municipality_id">
        <option :value="null">
          {{
            $store.state.locale === "ka"
              ? "ყველა მუნიციპალიტეტი"
              : $store.state.locale === "en"
              ? "All municipalities"
              : $store.state.locale === "ru"
              ? "Все муниципалитеты"
              : null
          }}
        </option>
        <option
          v-for="(municipality, index) in municipalities"
          :key="index"
          :value="municipality.id"
        >
          {{
            $store.state.locale === "ka"
              ? municipality.name_ka
              : $store.state.locale === "en"
              ? municipality.name_en
              : $store.state.locale === "ru"
              ? municipality.name_ru
              : null
          }}
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
      {{
        $store.state.locale === "ka"
          ? "ყველას გადმოწერა"
          : $store.state.locale === "en"
          ? "Download all"
          : $store.state.locale === "ru"
          ? "Скачать все"
          : null
      }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="allExportDropdown">
      <li>
        <h6 class="dropdown-header">
          {{
            $store.state.locale === "ka"
              ? "აირჩიეთ ენა"
              : $store.state.locale === "en"
              ? "Choose language"
              : $store.state.locale === "ru"
              ? "Выберите язык"
              : null
          }}
        </h6>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'ka')"
          >{{
            $store.state.locale === "ka"
              ? "ქართული"
              : $store.state.locale === "en"
              ? "Georgian"
              : $store.state.locale === "ru"
              ? "Грузинский"
              : null
          }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'en')"
          >{{
            $store.state.locale === "ka"
              ? "ინგლისური"
              : $store.state.locale === "en"
              ? "English"
              : $store.state.locale === "ru"
              ? "Английский"
              : null
          }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords([], 'ru')"
          >{{
            $store.state.locale === "ka"
              ? "რუსული"
              : $store.state.locale === "en"
              ? "Russian"
              : $store.state.locale === "ru"
              ? "Русский"
              : null
          }}</a
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
      {{
        $store.state.locale === "ka"
          ? "გადმოწერე"
          : $store.state.locale === "en"
          ? "Download"
          : $store.state.locale === "ru"
          ? "Скачать"
          : null
      }}
      {{ selected.length }}
      <span v-if="selected.length > 1">{{
        $store.state.locale === "ka"
          ? "ჩანაწერი"
          : $store.state.locale === "en"
          ? "records"
          : $store.state.locale === "ru"
          ? "записи"
          : null
      }}</span>
      <span v-else>{{
        $store.state.locale === "ka"
          ? "ჩანაწერი"
          : $store.state.locale === "en"
          ? "record"
          : $store.state.locale === "ru"
          ? "запись"
          : null
      }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="exportDropdown">
      <li>
        <h6 class="dropdown-header">
          {{
            $store.state.locale === "ka"
              ? "აირჩიეთ ენა"
              : $store.state.locale === "en"
              ? "Choose language"
              : $store.state.locale === "ru"
              ? "Выберите язык"
              : null
          }}
        </h6>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'ka')"
          >{{
            $store.state.locale === "ka"
              ? "ქართული"
              : $store.state.locale === "en"
              ? "Georgian"
              : $store.state.locale === "ru"
              ? "Грузинский"
              : null
          }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'en')"
          >{{
            $store.state.locale === "ka"
              ? "ინგლისური"
              : $store.state.locale === "en"
              ? "English"
              : $store.state.locale === "ru"
              ? "Английский"
              : null
          }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#!"
          @click.prevent="exportRecords(selected, 'ru')"
          >{{
            $store.state.locale === "ka"
              ? "რუსული"
              : $store.state.locale === "en"
              ? "Russian"
              : $store.state.locale === "ru"
              ? "Русский"
              : null
          }}</a
        >
      </li>
    </ul>
  </div>
  <div id="table" class="table-responsive">
    <table class="table table-striped">
      <thead class="bg-dark text-white">
        <tr>
          <th scope="col" class="text-center w-10"></th>
          <th
            scope="col"
            class="w-25 pointer"
            @click.prevent="changeSort(`name_${$store.state.locale}`)"
          >
            {{
              $store.state.locale === "ka"
                ? "დასახელება"
                : $store.state.locale === "en"
                ? "Name"
                : $store.state.locale === "ru"
                ? "Название"
                : null
            }}
            <span
              v-if="
                params.sortBy == `name_${$store.state.locale}` &&
                params.sortDirection == 'asc'
              "
              ><i class="fas fa-caret-up fa-sm"></i
            ></span>
            <span
              v-if="
                params.sortBy == `name_${$store.state.locale}` &&
                params.sortDirection == 'desc'
              "
              ><i class="fas fa-caret-down fa-sm"></i
            ></span>
          </th>
          <th
            scope="col"
            class="w-25 pointer"
            @click.prevent="changeSort('category_id')"
          >
            {{
              $store.state.locale === "ka"
                ? "კატეგორია"
                : $store.state.locale === "en"
                ? "Category"
                : $store.state.locale === "ru"
                ? "Категория"
                : null
            }}
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
            {{
              $store.state.locale === "ka"
                ? "მუნიციპალიტეტი"
                : $store.state.locale === "en"
                ? "Municipality"
                : $store.state.locale === "ru"
                ? "Муниципалитет"
                : null
            }}
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
          <th scope="col" class="w-25">
            {{
              $store.state.locale === "ka"
                ? "ტელეფონი"
                : $store.state.locale === "en"
                ? "Phone"
                : $store.state.locale === "ru"
                ? "Телефон"
                : null
            }}
          </th>
          <th scope="col" class="w-25">
            {{
              $store.state.locale === "ka"
                ? "ელ-ფოსტა"
                : $store.state.locale === "en"
                ? "Email"
                : $store.state.locale === "ru"
                ? "Эл. адрес"
                : null
            }}
          </th>
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
          <td>
            {{
              $store.state.locale === "ka"
                ? record.name_ka
                : $store.state.locale === "en"
                ? record.name_en
                : $store.state.locale === "ru"
                ? record.name_ru
                : null
            }}
          </td>
          <td>
            {{
              $store.state.locale === "ka"
                ? record.category.name_ka
                : $store.state.locale === "en"
                ? record.category.name_en
                : $store.state.locale === "ru"
                ? record.category.name_ru
                : null
            }}
          </td>
          <td>
            {{
              $store.state.locale === "ka"
                ? record.municipality.name_ka
                : $store.state.locale === "en"
                ? record.municipality.name_en
                : $store.state.locale === "ru"
                ? record.municipality.name_ru
                : null
            }}
          </td>
          <td>{{ record.mobile ?? "-" }}</td>
          <td>{{ record.email ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex align-items-center justify-content-between flex-direction">
    <div class="my-1">
      {{
        $store.state.locale === "ka"
          ? "ნაჩვენებია"
          : $store.state.locale === "en"
          ? "Showing"
          : $store.state.locale === "ru"
          ? "Показано"
          : null
      }}
      {{ pagination.from }}
      {{
        $store.state.locale === "ka"
          ? "დან"
          : $store.state.locale === "en"
          ? "to"
          : $store.state.locale === "ru"
          ? "-"
          : null
      }}
      {{ pagination.to }}
      {{
        $store.state.locale === "ka"
          ? "მდე ჩანაწერი,"
          : $store.state.locale === "en"
          ? "of"
          : $store.state.locale === "ru"
          ? "записей от"
          : null
      }}
      {{ pagination.total }}
      {{
        $store.state.locale === "ka"
          ? "ჩანაწერიდან"
          : $store.state.locale === "en"
          ? "records"
          : $store.state.locale === "ru"
          ? "записей"
          : null
      }}
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
            href="#table"
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
  name: "InformationBase",
  props: ["name"],
  data() {
    return {
      records: [],
      categories: [],
      municipalities: [],
      selected: [],
      filters: false,
      filtersText: "",
      searchPlaceholder: "",
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
    },
  },
  mounted() {
    this.getResults();
    this.getCategories();
    this.getMunicipalities();
  },
  updated() {
    this.$store.state.locale === "ka"
      ? (this.searchPlaceholder = "ძიება...")
      : this.$store.state.locale === "en"
      ? (this.searchPlaceholder = "Search...")
      : this.$store.state.locale === "ru"
      ? (this.searchPlaceholder = "Поиск...")
      : null;
    this.$store.state.locale === "ka"
      ? (this.filtersText = "ფილტრები")
      : this.$store.state.locale === "en"
      ? (this.filtersText = "Filters")
      : this.$store.state.locale === "ru"
      ? (this.filtersText = "Фильтры")
      : null;
  },
};
</script>

<style scoped>
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
