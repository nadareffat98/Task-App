import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter} from "@fortawesome/free-solid-svg-icons";
import { faPrint} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFilter,faPrint);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
