import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCustomers() {
      this.loading = true
      this.error = null
      try {
        const data = await $fetch('http://127.0.0.1:8000/api/customers')
        this.customers = data // Adapter selon la réponse de l'API
      } catch (err) {
        this.error = err.message || 'Erreur lors du chargement'
      } finally {
        this.loading = false
      }
    },

    async addCustomer(payload) {
      this.loading = true
      this.error = null
      try {
        const data = await $fetch('http://127.0.0.1:8000/api/customers', {
          method: 'POST',
          body: payload
        })
        this.customers.push(data.data)
      } catch (err) {
        this.error = err.data?.message || 'Erreur lors de l\'ajout'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
