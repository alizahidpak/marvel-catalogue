<script>
import { useStore } from "../stores";
import { mapWritableState } from "pinia";
import { mapActions } from "pinia";
import TitleTab from "../components/TitleTab.vue";

export default {
  components: {
    TitleTab,
  },
  computed: {
    ...mapWritableState(useStore, ["character", "detailSearch"]),
  },
  data() {
    return {
      currentTab: "comics",
      tabs: ["comics", "series", "stories", "events"],
    };
  },
  methods: {
    toggleTab(tab) {
      this.currentTab = tab;
      this.detailSearch = "";
      this.getDataById({ id: this.$route.params.id, dataType: "" });
    },
    ...mapActions(useStore, ["getDataById"]),
  },
  created() {
    if (this.character.id != this.$route.params.id) {
      this.character = {};
      this.getDataById({ id: this.$route.params.id, dataType: "" });
    }
  },
};
</script>

<template>
  <div class="character-details">
    <div class="character-details__header">
      <router-link to="/" class="character-details__back-btn">
        &lAarr;</router-link
      >
      <div class="character-details__header__img-box">
        <img
          v-if="character.thumbnail"
          :src="`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`"
          :alt="character.name"
          class="character-details__header__img-box__img"
        />
      </div>
      <div class="character-details__header__info">
        <h1 class="character-details__header__info__name">
          {{ character.name }}
        </h1>
        <p class="character-details__header__info__description">
          {{ character.description }}
        </p>
        <p v-if="!character.description">No description available.</p>
      </div>
    </div>
    <div class="wrapper">
      <div class="character-details__tabs">
        <ul class="character-details__tabs__list">
          <li
            v-for="tab in tabs"
            :key="tab"
            class="character-details__tabs__list__item"
            :class="{ active: currentTab === tab }"
            @click="toggleTab(tab)"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </li>
        </ul>
      </div>
      <div class="character-details__content">
        <TitleTab
          :character="character"
          :currentTab="currentTab"
          v-if="character.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-details {
  padding: 2rem;
}
.character-details__back-btn {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  margin-bottom: 2rem;
  color: #fff;
  text-decoration: none;
  font-size: 2.4rem;
  font-weight: 700;
}

.character-details__back-btn:hover {
  color: #ccc;
}

.character-details__header {
  display: flex;
  position: relative;
  gap: 2rem;
}

.character-details__header__img-box {
  width: 100%;
  max-width: 300px;
  margin-bottom: 2rem;
}

.character-details__header__img-box__img {
  width: 100%;
  height: auto;
}

.character-details__header__info__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.character-details__header__info__description {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.wrapper {
  display: flex;
  gap: 2rem;
}

.character-details__tabs {
  margin-bottom: 2rem;
}

.character-details__tabs__list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}

.character-details__tabs__list__item {
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.character-details__tabs__list__item:hover {
  background-color: #ccc;
}

.character-details__tabs__list__item.active {
  background-color: #ccc;
}

.character-details__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
