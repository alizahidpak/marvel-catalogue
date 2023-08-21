<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: false,
    },
    pageCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="pagination">
    <button
      @click="$emit('page-update', currentPage - 1)"
      class="btn btn--prev"
      :class="{ disabled: currentPage === 1 }"
    >
      Prev
    </button>
    <ul class="page-list">
      <span
        v-if="currentPage > 3 && pageCount > 5"
        class="page-list__item"
        @click="$emit('page-update', 1)"
        >1</span
      >
      <span v-if="currentPage > 4 && pageCount > 6" class="page-list__item"
        >...</span
      >
      <span
        v-for="(page, index) in currentPage - 3 < 0 && pageCount > 5
          ? [1, 2, 3, 4, 5].slice(0, pageCount)
          : pageCount < 7
          ? pageCount
          : currentPage + 3 > pageCount
          ? [
              pageCount - 4,
              pageCount - 3,
              pageCount - 2,
              pageCount - 1,
              pageCount,
            ]
          : [
              currentPage - 2,
              currentPage - 1,
              currentPage,
              currentPage + 1,
              currentPage + 2,
            ]"
        :key="index"
        @click="$emit('page-update', page)"
        :class="['page-list__item', currentPage === page ? 'active' : '']"
        >{{ page }}
      </span>
      <span
        v-if="currentPage + 3 < pageCount && pageCount > 6"
        class="page-list__item"
        >...</span
      >
      <span
        v-if="currentPage + 2 < pageCount && pageCount > 5"
        class="page-list__item"
        @click="$emit('page-update', pageCount)"
      >
        {{ pageCount }}
      </span>
    </ul>

    <!-- Dropdown select to be positioned -->
    <!-- <select
      class="page-select"
      @change="$emit('page-update', parseInt($event.target.value))"
      :value="currentPage"
    >
      <option v-for="(page, index) in pageCount" :key="index" :value="page">
        {{ page }}
      </option>
    </select> -->

    <button
      @click="$emit('page-update', currentPage + 1)"
      class="btn btn--next"
      :class="{ disabled: currentPage === pageCount }"
    >
      Next
    </button>
  </div>
</template>

<style>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.page-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
}

.page-list__item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.page-list__item:hover {
  background-color: #333;
}

.page-list__item.active {
  background-color: #fff;
  color: #000;
}

.page-select {
  width: 5rem;
  height: 2rem;
  margin: 0 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.page-select:hover {
  background-color: #333;
}

.page-select:focus {
  outline: none;
}

.btn {
  width: 5rem;
  height: 2rem;
  margin: 0 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background-color: #333;
}

.btn:focus {
  outline: none;
}

.btn--prev {
  margin-right: 0;
}

.btn--next {
  margin-left: 0;
}
</style>
