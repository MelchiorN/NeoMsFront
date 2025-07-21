<template>
  <div class="flex min-h-screen">
    <div
      v-if="mobileSidebarOpen"
      @click="mobileSidebarOpen = false"
      class="fixed inset-0 transition-opacity duration-300 bg-black/50 backdrop-blur-sm lg:hidden"
    ></div>

    <aside >
      <div class="flex flex-col h-full shadow-xl bg-[#000080]">
        <div class="flex items-center justify-between flex-shrink-0 px-6 py-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-xl"
            >
              <span class="text-lg font-bold text-white">NS</span>
            </div>
            <div>
              <h1 class="text-lg text-white">Neo Start Tech</h1>
              <p class="text-xs font-medium text-white">Business Manager</p>
            </div>
          </div>

          <button
            @click="mobileSidebarOpen = false"
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
                <p class="text-white nav-label">Tableau de bord</p>
                <p class="text-white nav-description">Vue d'ensemble</p>
              </div>
            </router-link>

            <router-link
              to="/clients"
              class="text-white nav-item hover:text-gray-300"
              :class="{ 'nav-item-active': $route.path === '/clients' }"
            >
              <div class="nav-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  ></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-white nav-label">Clients</p>
                <p class="text-white nav-description">Gestion clientèle</p>
              </div>
            </router-link>

            <div class="nav-section">
              <button
                @click="toggleSection('sales')"
                class="w-full nav-section-header"
                :class="{ 'nav-section-header-active': expandedSections.sales }"
              >
                <div class="flex items-center justify-between w-full">
                  <h3 class="nav-section-title">Ventes</h3>
                  <svg
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedSections.sales }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>

              <transition name="slide-down">
                <div v-show="expandedSections.sales" class="mt-2 pace-y-1">
                  <router-link
                    to="/quotes"
                    class="nav-item nav-item-nested"
                    :class="{ 'nav-item-active': $route.path === '/quotes' }"
                  >
                    <div class="nav-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-white nav-label">Propositions commerciales</p>
                      <p class="text-white nav-description">Propositions commerciales</p>
                    </div>
                  </router-link>

                  <router-link
                    to="/orders"
                    class="nav-item nav-item-nested"
                    :class="{ 'nav-item-active': $route.path === '/orders' }"
                  >
                    <div class="nav-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-white nav-label">Commandes</p>
                      <p class="text-white nav-description">Suivi des ventes</p>
                    </div>
                  </router-link>

                  <router-link
                    to="/invoices"
                    class="nav-item nav-item-nested"
                    :class="{ 'nav-item-active': $route.path === '/invoices' }"
                  >
                    <div class="nav-icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-white nav-label">Factures</p>
                      <p class="text-white nav-description">Facturation client</p>
                    </div>
                  </router-link>
                </div>
              </transition>
            </div>

            
            <router-link
              to="/suppliers"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/suppliers' }"
            >
              
            </router-link>
          </div>
        </nav>
   
      </div>
    </aside>

    <div class="flex flex-col flex-1">
      <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
        <div class="flex items-center space-x-4">
          <button
            @click="mobileSidebarOpen = !mobileSidebarOpen"
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

      <div class="flex-1 p-6 bg-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State for user menu dropdown
const showUserMenu = ref(false)
// State for mobile sidebar visibility
const mobileSidebarOpen = ref(false)

// State for collapsible sections in the sidebar
const expandedSections = ref({
  sales: false,
  tenders: false,
  inventory: false,
  finance: false
})

// Computed property for dynamic page title based on current route path
const pageTitle = computed(() => {
  const titleMap: Record<string, string> = {
    '/': 'Tableau de bord',
    '/dashboard': 'Tableau de bord',
    '/clients': 'Gestion des Clients',
    '/quotes': 'Devis',
    '/orders': 'Commandes',
    '/invoices': 'Factures',
    '/tenders': "Appels d'Offres",
    '/tenders/documents': "Documents Appels d'Offres",
    '/tenders/submissions': "Soumissions Appels d'Offres",
    '/tenders/projects': 'Pilotage Projet',
    '/suppliers': 'Fournisseurs'
  }
  return titleMap[route.path] || 'ERP Neo Start Technology'
})

// Computed property for dynamic sidebar classes (mobile responsiveness)

// Logout function
const logout = () => {
  authStore.logout()
  router.push('/login')
  showUserMenu.value = false
}

// Handler for closing user menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  // Ensure the click is outside the user menu's containing div
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

// Toggles a sidebar section (e.g., Sales, Tenders) and saves state to local storage
const toggleSection = (section: keyof typeof expandedSections.value) => {
  expandedSections.value[section] = !expandedSections.value[section]
  localStorage.setItem('sidebar-expanded-sections', JSON.stringify(expandedSections.value))
}

// Automatically expands sidebar sections based on the current route
const autoExpandBasedOnRoute = () => {
  const path = route.path
  if (path.startsWith('/quotes') || path.startsWith('/orders') || path.startsWith('/invoices')) {
    expandedSections.value.sales = true
  }
  if (path.startsWith('/tenders')) {
    expandedSections.value.tenders = true
  }
}

// Loads saved sidebar expansion state from local storage
const loadSavedState = () => {
  const savedState = localStorage.getItem('sidebar-expanded-sections')
  if (savedState) {
    try {
      expandedSections.value = { ...expandedSections.value, ...JSON.parse(savedState) }
    } catch (error) {
      console.warn('Could not parse saved sidebar state:', error)
    }
  }
}

// Lifecycle hooks for event listeners and state loading
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  loadSavedState()
  autoExpandBasedOnRoute()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Import Tailwind CSS utilities */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Navigation item base styles */
.nav-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200;
  @apply text-gray-700 hover:bg-gray-50 hover:text-gray-900;
}

/* Active navigation item styling */
.nav-item-active {
  @apply bg-green-50 border-l-4 border-green-600 text-green-900;
  @apply shadow-sm;
}

/* Nested navigation items (under sections) */
.nav-item-nested {
  @apply ml-4 relative;
}

/* Vertical line for nested items */
.nav-item-nested::before {
  content: '';
  @apply absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200;
}

.nav-item-nested.nav-item-active::before {
  @apply bg-green-600;
}

/* Icon container styling */
.nav-icon {
  @apply p-2 rounded-lg transition-all duration-200;
  @apply bg-gray-100 text-gray-600;
}

.nav-item-active .nav-icon {
  @apply bg-green-100 text-green-600;
}

.nav-item:hover .nav-icon {
  @apply bg-gray-200 text-gray-700;
}

.nav-item-active:hover .nav-icon {
  @apply bg-green-200 text-green-700;
}

/* Text labels for navigation items */
.nav-label {
  @apply font-semibold text-sm;
}

.nav-description {
  @apply text-xs opacity-70 font-medium;
}

/* Section styling for collapsible menus */
.nav-section {
  @apply mt-6;
}

.nav-section-header {
  @apply w-full px-4 py-2 text-left rounded-lg transition-all duration-200;
  @apply text-gray-600 hover:bg-gray-50 hover:text-gray-900;
  @apply focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-2 focus:ring-green-500/50;
}

.nav-section-header-active {
  @apply bg-gray-50 text-gray-900;
}

.nav-section-title {
  @apply text-xs font-bold text-gray-500 uppercase tracking-wider border-b-0;
}


/* Custom scrollbar styling for better appearance */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f9fafb;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Slide down animation for collapsible sections */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.slide-down-enter-from {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

/* Smooth animations for navigation items */
.nav-item {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  transform: translateX(2px);
}

.nav-item-active:hover {
  transform: translateX(0);
}

/* Rotate animation for chevron icons in collapsible headers */
.rotate-180 {
  transform: rotate(180deg);
}
</style> le separer en utilisant components(header,et sidebar)