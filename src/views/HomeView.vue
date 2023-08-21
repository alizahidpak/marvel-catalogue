<script>
import BaseSearchInput from "../components/BaseSearchInput.vue";
import CharacterSearchResults from "../components/CharacterSearchResults.vue";
import { mapWritableState } from "pinia";
import { useStore } from "../stores";

export default {
  components: {
    CharacterSearchResults,
    BaseSearchInput,
  },
  computed: {
    ...mapWritableState(useStore, ["characterSearch"]),
  },
};
</script>

<template>
  <main>
    <CharacterSearchResults />
    <BaseSearchInput
      placeholder="Search for a character..."
      :value="characterSearch"
      @handle-search="characterSearch = $event"
    />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
