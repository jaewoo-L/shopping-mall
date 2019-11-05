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
		isAdmin: null,
		postcode: null,
    	roadAddress: null,
    	jibunAddress:null,
    	extraAddress: null
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
	    },
	    postcode({state}) {
	      new daum.Postcode({
	            oncomplete: function(data) {
	                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var roadAddr = data.roadAddress; // 도로명 주소 변수
	                var extraRoadAddr = ''; // 참고 항목 변수

	                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	                    extraRoadAddr += data.bname;
	                }
	                // 건물명이 있고, 공동주택일 경우 추가한다.
	                if(data.buildingName !== '' && data.apartment === 'Y'){
	                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                }
	                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                if(extraRoadAddr !== ''){
	                    extraRoadAddr = ' (' + extraRoadAddr + ')';
	                }

	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                document.getElementById('postcode').value = data.zonecode;
	                document.getElementById("roadAddress").value = roadAddr;
	                document.getElementById("jibunAddress").value = data.jibunAddress;
	                state.postcode = data.zonecode;
	                state.roadAddress = roadAddr;
	                state.jibunAddress = data.jibunAddress;
	                
	                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
	                if(roadAddr !== ''){
	                    document.getElementById("extraAddress").value = extraRoadAddr;
	                    state.extraAddress = extraRoadAddr;
	                } else {
	                    document.getElementById("extraAddress").value = '';
	                }

	                var guideTextBox = document.getElementById("guide");
	                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
	                if(data.autoRoadAddress) {
	                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
	                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
	                    guideTextBox.style.display = 'block';

	                } else if(data.autoJibunAddress) {
	                    var expJibunAddr = data.autoJibunAddress;
	                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
	                    guideTextBox.style.display = 'block';
	                } else {
	                    guideTextBox.innerHTML = '';
	                    guideTextBox.style.display = 'none';
	                }
	            }
	        }).open();
	    }
	}
});