<template>
  <div class="list">
    <h1 class="list__title">Calendar of league</h1>
    <app-loader v-if="isLoading" />
    <template v-else>
      <div class="list__filters-wrapper">
        <el-input
          v-model="yearFilter"
          placeholder="Year"
          class="search-input"
        ></el-input>
        <el-date-picker
          v-model="rangeFilter"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          class="search-input"
        >
        </el-date-picker>
      </div>
      <el-table :data="filteredMatches" style="width: 100%">
        <el-table-column prop="homeTeam.name" label="Home Team" />
        <el-table-column prop="awayTeam.name" label="Away Team" />
        <el-table-column prop="localDate" label="Date" />
      </el-table>
    </template>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/leagueCalendar";
import { mapGetters } from "vuex";
import AppLoader from "@/components/Loader";

export default {
  name: "LeagueCalendar",
  components: {
    AppLoader
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    year: {
      type: Number
    }
  },
  data() {
    return {
      rangeFilter: null
    };
  },
  computed: {
    ...mapGetters({
      allMatches: getterTypes.getAllMatches,
      isLoading: getterTypes.isLoading
    }),
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
    preparedMatches() {
      const matches = [...this.allMatches];

      return matches.map(match => {
        match.localDate = new Date(match.utcDate).toLocaleString();
        return match;
      });
    },
    filteredMatches() {
      let matches = [...this.preparedMatches];

      // фильтрация по диапазону дат
      if (this.rangeFilter) {
        matches = matches.filter(match => {
          const matchDateInstance = new Date(match.utcDate);
          const startDateInstance = this.rangeFilter[0];
          const endDateInstance = this.rangeFilter[1];
          return (
            matchDateInstance >= startDateInstance &&
            matchDateInstance <= endDateInstance
          );
        });
      }

      // фильтрация по году
      // не производится, если стоит фильтр по диапазону дат
      if (this.yearFilter && !this.rangeFilter) {
        matches = matches.filter(match => {
          const yearOfMatch = new Date(match.utcDate).getFullYear();
          return String(yearOfMatch).startsWith(String(this.yearFilter));
        });
      }

      return matches;
    }
  },
  watch: {
    yearFilter(newValue) {
      this.rangeFilter = null; // если выбирается фильтр по дате, то сбрасывается фильтр по диапазону дат
      if (newValue === "") {
        // если новое значение фильтра пустое, то убираем этот фильтр из get параметров
        this.deleteQueryFromRoute("year");
      }
    }
  },
  methods: {
    deleteQueryFromRoute(queryName) {
      const query = { ...this.$route.query };
      delete query[queryName];
      this.$router.replace({ name: this.$route.name, query: { ...query } });
    }
  },
  created() {
    this.$store.dispatch(actionTypes.getLeagueCalendar, {
      id: this.$route.params.id
    });
  }
};
</script>

<style scoped lang="scss">
.list {
  text-align: center;
}

.list__show-link {
  cursor: pointer;
}

.list__filters-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.search-input {
  max-width: 250px;
  margin-right: 20px;
}

@media (max-width: 600px) {
  .search-input {
    margin-bottom: 10px;
  }
}
</style>
