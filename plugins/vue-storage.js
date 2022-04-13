import Vue from "vue";
import { Plugin } from "vue2-storage";

Vue.use(Plugin, {
  prefix: 'dl_',
  ttl: 60 * 60 * 24 * 30 * 1000 // 30 дней
});