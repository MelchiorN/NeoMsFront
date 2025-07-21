<template>
  <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
    <div class="flex items-center space-x-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="p-2 text-gray-600 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-900">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center space-x-4">
      <div class="relative hidden md:block">
        <input
          type="text"
          placeholder="Rechercher..."
          class="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <button class="relative p-2 text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.586V11a6 6 0 10-12 0v3.586c0 .53-.21 1.04-.595 1.414L4 17h5m6 0a3 3 0 11-6 0h6z"
          ></path>
        </svg>
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div class="relative">
        <button
          @click="showUserMenu = !showUserMenu"
          class="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          v-if="showUserMenu"
          class="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-lg shadow-lg"
          @click.stop
        >
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
          <div class="border-t border-gray-100"></div>
          <button
            @click="logout"
            class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showUserMenu = ref(false)

const pageTitle = computed(() => {
  const titleMap: Record<string, string> = {
    '/': 'Tableau de bord',
    '/dashboard': 'Tableau de bord',
    '/clients': 'Gestion des Clients',
    // ... autres titres
  }
  return titleMap[route.path] || 'ERP Neo Start Technology'
})

const logout = () => {
  authStore.logout()
  router.push('/login')
  showUserMenu.value = false
}

defineEmits(['toggle-sidebar'])
</script>