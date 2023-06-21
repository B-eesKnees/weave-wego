<template></template>

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

<style></style>
