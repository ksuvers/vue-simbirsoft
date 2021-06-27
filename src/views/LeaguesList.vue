<template>
  <div class="list">
    <div class="list__header">
      <h1 class="list__title">List of leagues</h1>
      <div class="list__handlers-wrapper">
        <el-input
          placeholder="Search"
          v-model="searchFilter"
          class="search-input"
        ></el-input>
        <el-input
          v-model="yearFilter"
          placeholder="Year"
          class="search-input"
        ></el-input>
      </div>
    </div>
    <app-loader v-if="isLoading" />
    <template v-else>
      <el-table
        :data="filteredLeagues"
        style="width: 100%"
        @cell-click="cellClickHandler"
      >
        <el-table-column prop="name" label="Name" />
        <el-table-column
          v-if="windowWidth > 700"
          prop="area.name"
          label="Area"
        />
        <el-table-column
          prop="currentSeason.startDate"
          label="Start date"
          :width="windowWidth < 1000 ? 100 : null"
        />
        <el-table-column
          v-if="windowWidth > 550"
          prop="currentSeason.endDate"
          label="End date"
          :width="windowWidth < 1000 ? 100 : null"
        />
        <el-table-column label="Action" :width="windowWidth < 1000 ? 70 : null">
          <a @click.prevent class="list__show-link">show</a>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/leaguesList";
import { mapGetters } from "vuex";
import AppLoader from "@/components/Loader";

export default {
  name: "LeaguesList",
  components: {
    AppLoader
  },
  props: {
    year: {
      type: Number
    },
    search: {
      type: String
    }
  },
  data() {
    return {
      windowWidth: 0
    };
  },
  computed: {
    ...mapGetters({
      allLeagues: getterTypes.getAll,
      isLoading: getterTypes.isLoading
    }),
    filteredLeagues() {
      return this.allLeagues
        .filter(league => {
          return this.searchFilter
            ? league.name.toLowerCase().match(this.searchFilter.toLowerCase())
            : true;
        })
        .filter(league => {
          const fullYear = new Date(
            league.currentSeason.startDate
          ).getFullYear();
          return this.yearFilter !== ""
            ? String(fullYear).startsWith(String(this.yearFilter))
            : true;
        });
    },
    yearFilter: {
      get() {
        return this.year || "";
      },
      set(value) {
        if (Number.isInteger(+value)) {
          this.$router
            .replace({
              name: this.$route.name,
              query: { ...this.$route.query, year: value }
            })
            .catch(() => {});
        }
      }
    },
    searchFilter: {
      get() {
        return this.search;
      },
      set(value) {
        this.$router
          .replace({
            name: this.$route.name,
            query: { ...this.$route.query, search: value }
          })
          .catch(() => {});
      }
    }
  },
  watch: {
    yearFilter(newValue) {
      if (newValue === "") {
        this.deleteQueryFromRoute("year");
      }
    },
    searchFilter(newValue) {
      if (newValue === "") {
        this.deleteQueryFromRoute("search");
      }
    }
  },
  methods: {
    cellClickHandler(league) {
      this.$router.push({ name: "leagueCalendar", params: { id: league.id } });
    },
    deleteQueryFromRoute(queryName) {
      const query = { ...this.$route.query };
      delete query[queryName];
      this.$router.replace({ name: this.$route.name, query: { ...query } });
    },
    setWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  created() {
    this.$store.dispatch(actionTypes.getLeagues);
    this.setWindowWidth();
    window.addEventListener("resize", this.setWindowWidth);
  }
};
</script>

<style scoped lang="scss">
.list__title {
  display: block;
  text-align: center;
}

.list__show-link {
  cursor: pointer;
}

.search-input {
  max-width: 250px;

  &:not(:last-child) {
    margin-right: 20px;
  }
}

.list__handlers-wrapper {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .search-input {
    margin-bottom: 10px;
  }
}
</style>
