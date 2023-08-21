<script>
import BasePagination from "./BasePagination.vue";
import { useStore } from "../stores";
import { mapWritableState, mapActions, mapState } from "pinia";
import { debounce } from "lodash";

export default {
  data: () => ({
    currentPage: 1,
    itemsPerPage: 12,
  }),
  components: {
    BasePagination,
  },
  computed: {
    ...mapWritableState(useStore, [
      "characters",
      "characterSearch",
      "character",
    ]),
    ...mapState(useStore, ["loading", "error", "charactersCount"]),
    pageCount() {
      return Math.ceil(this.charactersCount / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(useStore, ["getCharacters"]),
  },
  watch: {
    characterSearch: debounce(function () {
      this.getCharacters({ limit: 12, page: this.currentPage - 1 });
    }, 1000),
    currentPage() {
      this.getCharacters({ limit: 12, page: this.currentPage - 1 });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div
      v-if="!characters.length && !characterSearch"
      class="projectDescription"
    >
      <h1 class="title">Marvel Characters</h1>
      <p class="description">
        This is a simple app that uses the Marvel API to display a list of
        characters. You can search for a character by name and click on a
        character to see more details.
      </p>
    </div>
    <div v-if="loading && !characters.length" class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div v-else style="height: 100%">
      <ul v-if="characters.length" class="results">
        <li v-for="character in characters" :key="character.id" class="result">
          <div class="img-box">
            <img
              :src="`${character.thumbnail.path}/standard_amazing.${character.thumbnail.extension}`"
              :alt="character.name"
              class="thumbnail"
            />
          </div>
          <h2 class="title">{{ character.name }}</h2>
          <router-link :to="`/character/${character.id}`" class="btn">
            Details
          </router-link>
        </li>
      </ul>
      <div v-else-if="characterSearch && !characters.length" class="no-results">
        <h1 class="title">No Results</h1>
        <p class="description">
          Your search for "{{ characterSearch }}" did not return any results.
        </p>
      </div>
    </div>
    <div v-if="characters.length">
      <base-pagination
        :pageCount="pageCount"
        :currentPage="currentPage"
        @page-update="currentPage = $event"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 2rem;
}

.projectDescription {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bounce 1.4s infinite ease-in-out both;
  animation: sk-bounce 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

.results {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.result {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.img-box {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 5px;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result .title {
  display: block;
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  width: 100%;
}

.btn:hover {
  background-color: #444;
}
</style>
