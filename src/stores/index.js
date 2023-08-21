import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    characterSearch: "",
    detailSearch: "",
    characters: [],
    charactersCount: 0,
    character: {},
    comics: [],
    series: [],
    stories: [],
    events: [],
    comicsId: 0,
    seriesId: 0,
    storiesId: 0,
    eventsId: 0,
    comicsCount: 0,
    seriesCount: 0,
    storiesCount: 0,
    eventsCount: 0,
    loading: false,
    error: null,
  }),
  actions: {
    async getCharacters({ limit, page }) {
      const apiURL = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.characterSearch}`;

      this.getData(apiURL, "characters", limit, page);
    },
    async getDataById({ id, dataType, limit, page, search = "" }) {
      const apiURL = `https://gateway.marvel.com/v1/public/characters/${id}${
        dataType === "" ? "" : "/" + dataType
      }?${search === "" ? "" : "titleStartsWith=" + search}`;
      this.getData(apiURL, dataType, limit, page);
    },
    async getData(apiURL, type, limit, page) {
      this.loading = true;
      try {
        const results = [];

        const response = await axios.get(apiURL, {
          params: {
            limit: limit,
            offset: page * 12,
            apikey: import.meta.env.VITE_MARVEL_API_KEY,
          },
        });
        const data = response.data.data.results;
        this[type + "Count"] = response.data.data.total;

        if (data.length === 0) {
          this[type] = [];
          this[type].hasResults = false;
        } else if (data.length === 1 && type === "") {
          this.character = data[0];
        } else {
          results.push(...data);
          page++;
        }
        this[type] = results;
        this.loading = false;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
  },
});
