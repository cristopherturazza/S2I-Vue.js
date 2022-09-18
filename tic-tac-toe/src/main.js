import { createApp } from "vue";
import App from "./App.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { GiPodiumWinner } from "oh-vue-icons/icons";

addIcons(GiPodiumWinner);

import "./assets/css/main.css";

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
