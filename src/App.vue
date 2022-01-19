<template>
  <div class="container-fluid">
    <div class="container my-5">
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
      <div class="table-responsive">
        <table class="table table-striped">
          <thead class="bg-dark text-white">
            <tr>
              <th scope="col" class="text-center w-10">#</th>
              <th
                scope="col"
                class="w-25 pointer"
                @click.prevent="changeSort('name_en')"
              >
                Name
                <span
                  v-if="
                    params.sortBy == 'name_en' && params.sortDirection == 'asc'
                  "
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
                    params.sortBy == 'category_id' &&
                    params.sortDirection == 'asc'
                  "
                  ><i class="fas fa-caret-up fa-sm"></i
                ></span>
                <span
                  v-if="
                    params.sortBy == 'category_id' &&
                    params.sortDirection == 'desc'
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
              <th scope="row" class="text-center">{{ index + 1 }}</th>
              <td>{{ record.name_en ?? "-" }}</td>
              <td>{{ record.category.name_en ?? "-" }}</td>
              <td>{{ record.municipality.name_en ?? "-" }}</td>
              <td>{{ record.mobile ?? "-" }}</td>
              <td>{{ record.email ?? "-" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="col">
          Showing {{ pagination.from }} to {{ pagination.to }} of
          {{ pagination.total }} records
        </div>
        <nav>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      records: [],
      params: {
        page: 1,
        pageLength: [
          {
            value: 10,
          },
          {
            value: 25,
          },
          {
            value: 50,
          },
          {
            value: 75,
          },
          {
            value: 100,
          },
          {
            value: 500,
          },
        ],
        perPage: 10,
        search: "",
        sortBy: "id",
        sortDirection: "asc",
      },
      pagination: {},
    };
  },
  mounted() {
    this.getResults();
  },
  watch: {
    params: {
      handler() {
        this.getResults();
      },
      deep: true,
    },
  },
  methods: {
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
    getResults() {
      axios
        .get("https://intranet.infoajara.com/api/database/hotels", {
          params: {
            page: this.params.page,
            perPage: this.params.perPage,
            search: this.params.search,
            sortBy: this.params.sortBy,
            sortDirection: this.params.sortDirection,
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
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.sm-select {
  width: 80px !important;
}
</style>
