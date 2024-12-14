<template>
    <a-switch
      :checked="isDark"
      @change="toggleTheme"
      :checkedChildren="$t('dark')"
      :unCheckedChildren="$t('light')"
    />
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { themeManager } from '../main';
  
  export default {
    setup() {
      const isDark = ref(false);
      const autoTheme = ref(true);
  
      const toggleTheme = (checked) => {
        isDark.value = checked;
        themeManager.setTheme(checked);
      };
  
      onMounted(() => {
        // 初始化主题
        if (autoTheme.value) {
          isDark.value = themeManager.isSystemDark();
          themeManager.setTheme(isDark.value);
          themeManager.watchSystemTheme(true);
        }
      });
  
      return {
        isDark,
        toggleTheme
      };
    }
  };
  </script>wo1zhiq