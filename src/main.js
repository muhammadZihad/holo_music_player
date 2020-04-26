import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
require("firebase/firestore");
Vue.config.productionTip = false;

const config = {
	apiKey: "AIzaSyDdSrtQZfmUSvtCGfOK4BvfV3zS99soErY",
	authDomain: "musicapp-fb09b.firebaseapp.com",
	databaseURL: "https://musicapp-fb09b.firebaseio.com",
	projectId: "musicapp-fb09b",
	storageBucket: "musicapp-fb09b.appspot.com",
	messagingSenderId: "128207439090",
	appId: "1:128207439090:web:bdff25b898661318927c6b",
	measurementId: "G-8MQVBK2J9F",
};

/* Initialize firebase with your configuration */
firebase.initializeApp(config);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount("#app");
