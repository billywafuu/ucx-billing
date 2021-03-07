import Vue from 'vue'

import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Quasar, Notify, Loading, Dialog } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Loading,
    Dialog
  },
  iconSet: iconSet
 })