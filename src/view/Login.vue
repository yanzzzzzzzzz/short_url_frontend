<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" data-cy="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" data-cy="password" />
      </div>
      <button type="submit" data-cy="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import loginService from '../service/login';
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/UserStore';
import { UserModel } from '../models/UserModel';
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  if (username.value && password.value) {
    try {
      const { data } = await loginService.login({
        username: username.value,
        password: password.value
      });

      if (data.token) {
        const userLoginInfo: UserModel = {
          token: data.token,
          username: data.username,
          name: data.name
        };
        userStore.setUser(userLoginInfo);
        localStorage.setItem('loginInfo', JSON.stringify(userLoginInfo));
        router.push({ name: 'home' });
      }
    } catch (error) {
      errorMessage.value = 'Login failed. Please check your credentials.';
    }
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};
</script>
<style>
input[type='text'],
input[type='password'] {
  margin: 10px 0;
}
</style>
