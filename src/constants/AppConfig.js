const AppConfig = {
  googleApiKey: "AIzaSyDbVnsfMzmkGO2s2d-4JbblamUuJLeeAO4",
  appLogo: require("Assets/img/site-logo.png"), // App Logo
  brandName: "AdminApp", // Brand Name
  navCollapsed: false, // Sidebar collapse
  darkMode: false, // Dark Mode
  boxLayout: false, // Box Layout
  rtlLayout: false, // RTL Layout
  miniSidebar: false, // Mini Sidebar
  enableSidebarBackgroundImage: true, // Enable Sidebar Background Image
  sidebarImage: require("Assets/img/sidebar-4.jpg"), // Select sidebar image
  isDarkSidenav: true, // Set true to dark sidebar
  enableThemeOptions: true, // Enable Theme Options
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "en",
  },
  copyRightText: "", // Copy Right Text
  // light theme colors
  themeColors: {
    primary: "#5D92F4",
    secondary: "#677080",
    success: "#00D014",
    danger: "#FF3739",
    warning: "#FFB70F",
    info: "#00D0BD",
    dark: "#464D69",
    default: "#FAFAFA",
    greyLighten: "#A5A7B2",
    grey: "#677080",
    white: "#FFFFFF",
    purple: "#896BD6",
    yellow: "#D46B08",
  },
  // dark theme colors
  darkThemeColors: {
    darkBgColor: "#424242",
  },
  // dev
  // publicUrl:''
  // prod
  publicUrl: "/adminwebapp",
};

export default AppConfig;
