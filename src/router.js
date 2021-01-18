import { createWebHistory, createRouter } from "vue-router";
import Issues from "./views/Issues.vue";
import Issue from "./views/Issue.vue";
import NotFound from "./views/NotFound.vue";

// [vue-router 導入編 | Vite 環境で Vue 3.0 の CompositionAPI に触れてみる - OVERFLOW: AUTO;](https://overflow-auto.hatenablog.com/entry/2020/09/07/022108)

const history = createWebHistory();

const routes = [
  { path: "/", template: '<router-link to="/issues">Enter</router-link>' },
  { path: "/issues", component: Issues },
  { path: "/issue", component: Issue },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({ history, routes });

export default router;
