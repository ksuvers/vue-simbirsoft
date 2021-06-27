<template>
  <div>
    <h1 class="calendar__title">Team calendar</h1>
    <AppLoader v-if="isLoading" />
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
        <el-table-column
          v-if="windowWidth > 1000"
          prop="competition.name"
          label="Competition"
        />
        <el-table-column prop="localDate" label="Date" />
      </el-table>
    </template>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/teamCalendar";
import { mapActions, mapGetters } from "vuex";
import AppLoader from "@/components/Loader";

export default {
  name: "TeamsCalendar",
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
      rangeFilter: null,
      windowWidth: 0
    };
  },
  computed: {
    ...mapGetters({
      calendar: getterTypes.calendar,
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
      if (this.calendar) {
        const calendar = [...this.calendar];
        return calendar.map(match => {
          match.localDate = new Date(match.utcDate).toLocaleDateString();
          return match;
        });
      } else {
        return [];
      }
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
      // если выбирается фильтр по году, то фильтр по диапазону дат сбрасывается
      this.rangeFilter = null;
      // если новое значение фильтра пустое, то удаляется get параметр
      if (newValue === "") {
        this.deleteQueryFromRoute("year");
      }
    }
  },
  methods: {
    ...mapActions({
      getTeamCalendar: actionTypes.getTeamCalendar
    }),
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
    this.getTeamCalendar({ teamId: this.id });
    this.setWindowWidth();
    window.addEventListener("resize", this.setWindowWidth);
  }
};
</script>

<style scoped lang="scss">
.calendar__title {
  display: block;
  text-align: center;
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
