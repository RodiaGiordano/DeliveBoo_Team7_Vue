<script>
export default {
  data() {
    return {
      title: 'Hello world',
    };
  },

  props: { elements: Array },
};
</script>

<template>
  <div class="form-check">
    <div v-for="element in elements">
      <input @change="$emit('checked', element.id)" class="form-check-input" type="checkbox" :value="element.id" :id="'check-' + element.id" />

      <label class="form-check-label" :for="'check-' + element.id">
        {{ element.name }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
