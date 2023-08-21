<script>
import BasePagination from "./BasePagination.vue";
import BaseSearchInput from "./BaseSearchInput.vue";
import { useStore } from "../stores";
import { mapWritableState, mapActions, mapState } from "pinia";
import { debounce } from "lodash";

export default {
  data: () => ({
    currentPage: 1,
  }),
  props: {
    currentTab: {
      type: String,
      required: true,
    },
  },
  components: {
    BasePagination,
    BaseSearchInput,
  },
  computed: {
    ...mapWritableState(useStore, [
      "comics",
      "stories",
      "series",
      "events",
      "comicsId",
      "storiesId",
      "seriesId",
      "eventsId",
      "detailSearch",
    ]),
    ...mapState(useStore, [
      "character",
      "comicsCount",
      "storiesCount",
      "seriesCount",
      "eventsCount",
    ]),
    pageCount() {
      return Math.ceil(this[this.currentTab + "Count"] / 12);
    },
  },
  methods: {
    ...mapActions(useStore, ["getDataById"]),
  },
  created() {
    if (this.$route.params.id != this[this.currentTab + "Id"]) {
      this[this.currentTab] = [];
      this[this.currentTab + "Id"] = this.$route.params.id;
      this.getDataById({
        id: this.$route.params.id,
        dataType: `${this.currentTab}`,
        limit: 12,
        page: this.currentPage - 1,
      });
    }
  },
  watch: {
    currentPage() {
      this.getDataById({
        id: this.$route.params.id,
        dataType: this.currentTab,
        limit: 12,
        page: this.currentPage - 1,
      });
    },
    detailSearch: debounce(function () {
      this.getDataById({
        id: this.$route.params.id,
        dataType: this.currentTab,
        limit: 12,
        page: this.currentPage - 1,
        search: this.detailSearch,
      });
    }, 1000),
    currentTab() {
      if (this[this.currentTab + "Id"] == this.$route.params.id) return;

      this[this.currentTab] = [];
      this[this.currentTab + "Id"] = this.$route.params.id;
      this.currentPage = 1;
      this.detailSearch = "";
      this.getDataById({
        id: this.$route.params.id,
        dataType: this.currentTab,
        limit: 12,
        page: this.currentPage - 1,
      });
    },
  },
};
</script>

<template>
  <div style="width: 100%">
    <BaseSearchInput
      @handle-search="detailSearch = $event"
      :placeholder="`Search for ${currentTab}...`"
      style="margin-bottom: 2rem"
    />
    <div v-if="this[currentTab].length">
      <ul class="results">
        <li v-for="item in this[currentTab]" :key="item.id" class="result">
          <div class="img-box">
            <img
              v-if="item.thumbnail"
              :src="`${
                item.thumbnail
                  ? item.thumbnail.path
                  : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
              }/standard_amazing.${item.thumbnail.extension}`"
              :alt="item.title"
              class="thumbnail"
            />
          </div>
          <h2 class="title">{{ item.title }}</h2>
        </li>
      </ul>
      <base-pagination
        v-if="pageCount > 1"
        :pageCount="pageCount"
        :currentPage="currentPage"
        @page-update="currentPage = $event"
      />
    </div>
    <p v-else>No {{ currentTab }} found</p>
  </div>
</template>

<style scoped>
.results {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
  height: 100%;
}

.result {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result:hover {
  border-color: #000;
}

.result .title {
  display: block;
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
}

.img-box {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem 0 0;
}
</style>
