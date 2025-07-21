import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; avatar: string; role: string },
    token: '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    login(userData: { name: string; avatar: string; role: string }, token: string) {
      this.user = userData
      this.token = token
    },

    logout() {
      this.user = null
      this.token = ''
    },
  },
})
