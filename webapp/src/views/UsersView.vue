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
            <td class="has-text-centered">
              <button
                v-if="identityStore.user?.scopes.includes('admin')"
                @click="Delete(user)"
                :class="{ 'is-loading': deletingUser === user }"
                class="button is-small is-danger">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="isLoading">
          <tr>
            <td colspan="4">
              <progress max="100" class="progress is-small is-info" />
            </td>
          </tr>
        </tfoot>
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
  import { useConfigurationStore } from '../stores/configurationStore'
  import { useIdentityStore } from '../stores/identityStore'

  const identityStore = useIdentityStore()
  const users = ref<UserDto[]>([])
  const isLoading = ref(false)
  const deletingUser = ref<UserDto>()

  const LoadUsers = async () => {
    isLoading.value = true
    users.value = await GetAllUsers()
    isLoading.value = false
  }

  const Delete = async (user: UserDto): Promise<void> => {
    deletingUser.value = user
    await DeleteUser(user.id)
    await LoadUsers()
    deletingUser.value = undefined

    if (users.value.length === 0) {
      const configurationStore = useConfigurationStore()
      await configurationStore.Reload()
    }

    if (user.id === identityStore.user?.id) {
      identityStore.Logout()
      router.push('/login')
    }
  }

  onMounted(LoadUsers)
</script>
