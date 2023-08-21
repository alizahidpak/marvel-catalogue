<script>
export default {};
</script>

<template>
  <input
    type="text"
    class="searchInput"
    @input="$emit('handle-search', $event.target.value)"
    autofocus
  />
</template>

<style scoped>
.searchInput {
  width: 100%;
  padding: 1rem;
  margin: auto;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #555;
  background-color: #fff;
  transition: all 0.5s;
}
</style>
