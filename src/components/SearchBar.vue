<template>
  <div class="text-left pb-2">
    <IconField iconPosition="left">
      <InputIcon class="pi pi-search"> </InputIcon>
      <InputText
        type="search"
        placeholder="Search..."
        v-model="searchKeyword"
        @keyup.enter="search"
      ></InputText>
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const searchKeyword = defineModel('searchKeyword') as Ref<string | undefined>;
const emits = defineEmits(['search']);

const search = () => {
  emits('search');
};
</script>

<style scoped></style>
