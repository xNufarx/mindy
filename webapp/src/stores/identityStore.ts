import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { User } from '../models/authentication/user'
import { Authenticate } from '../repositories/identity.repository'

export const useIdentityStore = defineStore('identity', () => {
  const accessToken = ref<string>()
  const renewToken = ref<string>()
  const user = ref<User>()
  const isAuthenticated = computed(() => !!accessToken.value)

  const Login = async (name: string, password: string) => {
    const result = await Authenticate(name, password)

    if (result) {
      accessToken.value = result.accessToken
      renewToken.value = result.renewToken

      const { scope, ...rawUser } = result.user

      user.value = {
        ...rawUser,
        scopes: result.user.scope.split(' ')
      }
    }
  }

  const Logout = () => {
    user.value = undefined
    accessToken.value = undefined
    renewToken.value = undefined
  }

  return {
    accessToken,
    renewToken,
    user,
    isAuthenticated,
    Login,
    Logout
  }
})
