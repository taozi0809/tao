import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'
import state from './state'

import login from './modules/page/user'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		login,
	},
    // plugins: [createPersistedState()],//localStorage
    // plugins: [createPersistedState({	//sessionStorage
    //     storage: window.sessionStorage
    // })]
})