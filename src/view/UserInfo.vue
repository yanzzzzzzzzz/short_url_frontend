<template>
  <div class="center-container">
    <h2>User profile</h2>
    <div class="form-container">
      <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText id="username" v-model="userInfo.username" data-cy="username" />
      </div>
      <div class="flex flex-column gap-2">
        <label for="email">Email</label>
        <InputText id="email" v-model="userInfo.email" disabled />
      </div>
      <Button
        class="mt-4"
        label="Update"
        :loading="loading"
        @click="updateUser"
        data-cy="update"
      ></Button>
      <Button
        class="mt-4"
        severity="danger"
        label="Delete Account"
        @click="deleteUser"
        :deleteLoading="deleteLoading"
        data-cy="deleteAccount"
      ></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import userService from '../service/user';
import { UserInfoModel } from '../models/UserModel';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useUrlStore } from '../stores/UrlStore';
const UrlStore = useUrlStore();

const userInfo = ref<UserInfoModel>({
  username: '',
  email: ''
});
const loading = ref(false);
const deleteLoading = ref(false);
onMounted(async () => {
  const data = await userService.getUser();
  userInfo.value = data;
});
const updateUser = async () => {
  try {
    loading.value = true;
    const { data } = await userService.updateUser(userInfo.value);
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
const deleteUser = async () => {
  try {
    deleteLoading.value = true;
    await userService.deleteUser();
    UrlStore.clearUrl();
    router.push({ name: 'home' });
  } catch (error) {
  } finally {
    deleteLoading.value = false;
  }
};
</script>
<style scoped>
.center-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.form-container {
  display: flex;
  flex-direction: column;
}
</style>
