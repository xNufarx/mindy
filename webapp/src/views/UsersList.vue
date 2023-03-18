<template>
  <Page>
    <section class="p-4">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Avatar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>
              <Avatar
                v-if="user.avatar"
                :avatar="user.avatar"
                class="is-24x24" />
            </td>
            <td>
              <button @click="Delete(user)" class="button is-small is-danger">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </Page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Avatar from '../components/Avatar.vue'
  import Page from '../components/layout/Page.vue'
  import { UserDto } from '../models/user'
  import { DeleteUser, GetAllUsers } from '../repositories/user.repository'
  import { router } from '../router'
  import { useIdentityStore } from '../stores/identityStore'

  const users = ref<UserDto[]>([])

  const LoadUsers = async () => {
    users.value = await GetAllUsers()
  }

  const Delete = async (user: UserDto): Promise<void> => {
    const identityStore = useIdentityStore()

    await DeleteUser(user.id)
    await LoadUsers()

    if (user.id === identityStore.user?.id) {
      identityStore.Logout()
      router.push('/login')
    }
  }

  onMounted(LoadUsers)
</script>
