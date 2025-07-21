<template>
  <div>
    <div
      v-if="mobileSidebarOpen"
      @click="$emit('close-sidebar')"
      class="fixed inset-0 transition-opacity duration-300 bg-black/50 backdrop-blur-sm lg:hidden"
    ></div>

    <aside :class="sidebarClasses">
      <div class="flex flex-col h-full bg-white shadow-xl">
        <div class="flex items-center justify-between flex-shrink-0 px-6 py-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-xl"
            >
              <span class="text-lg font-bold text-white">NS</span>
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900">Neo Start Tech</h1>
              <p class="text-xs font-medium text-gray-500">Business Manager</p>
            </div>
          </div>

          <button
            @click="$emit('close-sidebar')"
            class="p-2 text-gray-400 transition-colors rounded-lg lg:hidden hover:text-gray-600 hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <nav class="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div class="space-y-1">
            <router-link
              to="/dashboard"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/dashboard' }"
            >
              <div class="nav-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z"
                  ></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="nav-label">Tableau de bord</p>
                <p class="nav-description">Vue d'ensemble</p>
              </div>
            </router-link>

            <!-- Autres liens de navigation... -->
          </div>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  mobileSidebarOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close-sidebar'])

const sidebarClasses = computed(() => {
  return props.mobileSidebarOpen
    ? 'fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0'
    : 'fixed inset-y-0 left-0 z-40 w-72 transform -translate-x-full transition-transform duration-300 ease-in-out lg:translate-x-0'
})
</script>

<style scoped>
/* Styles du sidebar... */
</style>