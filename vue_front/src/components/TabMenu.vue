<template>
  <div class="tab-menu">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: tab.isActive }"
        @click="selectTab(tab)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <div class="tab-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { id: 1, title: "Tab 1", isActive: true },
        { id: 2, title: "Tab 2", isActive: false },
        // Add more tabs as needed
      ],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.id === selectedTab.id;
      });
    },
  },
};
</script>

<style>
/* .tab-menu {
  }
  
  .tab-menu ul {
  }
  
  .tab-menu ul li {
  }
  
  .tab-menu ul li.active {
  }
  
  .tab-content {
  }  */
</style>
