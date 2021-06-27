<template>
  <div class="list">
    <div class="list__header">
      <h1 class="list__title">List of teams</h1>
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
    <el-table
      v-else
      :data="filteredTeams"
      style="width: 100%"
      @cell-click="cellClickHandler"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column
        v-if="windowWidth > 420"
        prop="area.name"
        label="Area"
        :width="windowWidth < 800 ? 100 : null"
      />
      <el-table-column
        prop="founded"
        label="Founded"
        :width="windowWidth < 800 ? 80 : null"
      />
      <el-table-column v-if="windowWidth > 700" prop="venue" label="Venue">
      </el-table-column>
      <el-table-column label="Action" :width="windowWidth < 800 ? 70 : null">
        <a @click.prevent class="list__show-link">show</a>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/teamsList";
import { mapGetters } from "vuex";
import AppLoader from "@/components/Loader";

export default {
  name: "TeamsList",
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
      allTeams: getterTypes.getAllTeams,
      isLoading: getterTypes.isLoading
    }),
    filteredTeams() {
      let allTeams = [...this.allTeams];

      // фильтрация по названию
      if (this.searchFilter) {
        allTeams = allTeams.filter(team => {
          return team.name.toLowerCase().match(this.searchFilter.toLowerCase());
        });
      }

      // фильтрация по дате
      if (this.yearFilter !== "") {
        allTeams = allTeams.filter(team => {
          return String(team.founded).startsWith(String(this.yearFilter));
        });
      }

      return allTeams;
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
    // если новызе значения филтров пустые, то убираем их из get параметров
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
    cellClickHandler(team) {
      this.$router.push({ name: "teamsCalendar", params: { id: team.id } });
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
    this.$store.dispatch(actionTypes.getTeams);
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
