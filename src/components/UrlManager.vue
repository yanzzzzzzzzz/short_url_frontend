<template>
  <div class="container pt-2">
    <UrlHeader />
    <UrlShortenForm @fetchData="fetchData" />
    <h1 class="text-left">Links</h1>
    <SearchBar v-model:searchKeyword="searchKeyword" @search="fetchData" />
    <hr />
    <UrlDisplayList @fetchData="fetchData" />
    <Paginator
      v-if="userStore.user.username !== '' && UrlStore.getUrls.length > 0"
      v-model="pageInfo"
      @page="onPage($event)"
      :rows="pageInfo.rows"
      :totalRecords="messageCount"
      :rowsPerPageOptions="[5, 10, 20]"
    ></Paginator>
  </div>
</template>
<script setup lang="ts">
import UrlHeader from './UrlHeader.vue';
import UrlDisplayList from './UrlDisplayList.vue';
import UrlShortenForm from './UrlShortenForm.vue';
import SearchBar from './SearchBar.vue';
import Paginator, { PageState } from 'primevue/paginator';
import { useUrlStore } from '../stores/UrlStore';
import { useUserStore } from '../stores/UserStore';
import { ref, onMounted } from 'vue';
import urlService from '../service/url';
import { transferIdModel } from '../utils/transfer';
import {
  showLoginSuccessNotification,
  showTokenExpireNotification,
  showErrorNotification
} from '../utils/notifications';

const messageCount = ref<number>(0);
const pageInfo = ref<PageState>({ page: 0, first: 0, rows: 5, pageCount: 0 });
const UrlStore = useUrlStore();
const userStore = useUserStore();
const searchKeyword = ref<string>('');

const fetchData = async (goToFirstPage: boolean = false) => {
  if (goToFirstPage) {
    pageInfo.value.page = 0;
  }
  if (!userStore.getIsLogin) {
    return;
  }
  const data = await urlService.getAllUrl(searchKeyword.value, pageInfo.value);
  messageCount.value = data.pagination.pageCount * data.pagination.size;
  UrlStore.setUrl(data.content.map((item) => transferIdModel(item)));
};
onMounted(async () => {
  if (userStore.getIsLogin) {
    try {
      await fetchData();
      showLoginSuccessNotification(userStore.user.username);
    } catch (error) {
      if (error.response.status === 401) {
        console.log('token expired error');

        showTokenExpireNotification();
        userStore.clearUser();
        UrlStore.clearUrl();
      } else {
        showErrorNotification(error.response.data.error);
      }
    }
  }
});
async function onPage(event: PageState) {
  try {
    pageInfo.value = event;
    await fetchData();
  } catch {
    showErrorNotification('Session has expired. Please log in again to continue.');
    userStore.clearUser();
    UrlStore.clearUrl();
  }
}
</script>
