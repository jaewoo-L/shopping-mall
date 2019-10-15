//vuex 를 사용하기위해서는 npm install --save vuex 패키지를 설치한다.
//store.js 가 center store
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export const store = new Vuex.Store({
	//응용 프로그램의 모든 속성을 저장할 수 있는 객체입니다.
	state: {
		username: null,
		nickname: null,
		token:null,
		isAdmin: null
	},
	//데이터 중복을 막기위해 함수를 한곳에 모으고 중복을 최소화한다.
	getters: {
		username: state => {
			return state.username;
		},
		nickname: state => {
			return state.nickname;
		},
		isAuthenticated: state => {
			return state.token !== null
		},
		isAdmin: state => { 
			return state.isAdmin == 'true'
		},
		token: state => {
			return state.token;
		}
	},
	//state 를 변경할 때도 동일한 문제가 생길 수 있다. 그래서 Mutations 를 이용할 수 있다. 상태(state)를 변경하고 저장한다.
	//mutations 은 항상 동기적이다. 비동기활동(setTimeout() 사용이 안된다.) 그렇다면 비동기작업을 수행하게 하려면 어떻게 해야할까. Actions 을통해 요소와 mutations 사이에서  문제를 해결.
	//mutations.js 를 export해서 이용.
	mutations: {
		clearAuthData (state) {
	    	state.username = null;
	    	state.nickname = null;
	    	state.token = null;
	    	state.isAdmin = null;
	    },
		authUser(state, userData) {
      //토큰을 vuex에 저장하지만 vuex역시 js파일이기 때문에 새로고침하면 손실된다. 그래서 로그인 유지가 불가능하다.
      //우리는 브라우저 API를 통해 토큰을 저장하여 로그인을 유지한다. localStorage 이다.
  			state.token = userData.token
  			state.username = userData.username
  			state.nickname = userData.nickname
  			state.isAdmin = userData.isAdmin
  		},
	},
	//Actions 이용 ./actioins.js 에서 내보낸 값들.
	actions: {
		 tryAutoLogin({commit}) {
		  const token = localStorage.getItem("access_token")
	      const username = localStorage.getItem("username")
	      const nickname = localStorage.getItem("nickname")
	      const isAdmin = localStorage.getItem("isAdmin")
	      if (!token) {
	        return
	      }   
	      commit('authUser',{token: token, username: username, nickname: nickname, isAdmin: isAdmin})
	    },
	    logout({commit}) {
	      commit('clearAuthData')
	      localStorage.removeItem("access_token")
	      localStorage.removeItem("username")
	      localStorage.removeItem("nickname")
	      localStorage.removeItem("isAdmin")
	    }
	}
});