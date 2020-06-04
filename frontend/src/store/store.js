import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router'
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		username: null,
		nickname: null,
		token:null,
		isAdmin: null,
		postcode: null,
    roadAddress: null,
    jibunAddress: null,
    extraAddress: null,
    products: null,
    tops: null,
  	bottoms: null,
    accs: null,
    searchProducts: null,
<<<<<<< HEAD
<<<<<<< HEAD
		searchUsers:null,
		management:null,
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
		noMatch:null,
		product:null,
		current:null,
		pages:null,
		page:null,
		productsNum:null,
		list:[]
	},

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
		},
		products: state => {
			return state.products;
		},
		tops: state => {
			return state.tops;
		},
		bottoms: state => {
			return state.bottoms;
		},
		accs: state => {
			return state.accs;
		},
		searchProducts: state => {
			return state.searchProducts;
		},
<<<<<<< HEAD
<<<<<<< HEAD
		searchUsers: state => {
			return state.searchUsers;
		},
		management: state => {
			return state.management;
		},
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
		list: state => {
			return {
							productsNum:state.productsNum,
							current:state.current,
							pages:state.pages,
							page:state.page,
							product:state.product,
							noMatch:state.noMatch
						}
		},
		pager: state => {
			while (state.list.length) {
        state.list.pop();
      }
      if(Number(state.current) < 6) {
        for(var i= (Number(state.current) % 6 == 0 ? Number(state.current) : Number(state.current) - Number(state.current) % 6 + 1 ), j= i;   i <= (j + 4) && i <= state.pages; i++) state.list.push(i);
        return state.list;
      } else {
        for(var i= (Number(state.current) % 6 == 0 ? Number(state.current) : Number(state.current) - Number(state.current) % 6), j= i; i <= (j + 5) && i <= state.pages; i++) state.list.push(i);
        return state.list;
      }
		}
	},
	mutations: {
		clearAuthData (state) {
	    	state.username = null;
	    	state.nickname = null;
	    	state.token = null;
	    	state.isAdmin = null;
	    },
		authUser(state, userData) {
  			state.token = userData.token
  			state.username = userData.username
  			state.nickname = userData.nickname
  			state.isAdmin = userData.isAdmin
  		},
  		page(state, page) {
  			state.products = page.products
  			state.tops = page.tops
  			state.bottoms = page.bottoms
<<<<<<< HEAD
<<<<<<< HEAD
				state.accs = page.accs
  			state.management = page.management
				state.searchProducts = page.searchProducts
  			state.searchUsers = page.searchUsers
=======
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
  			state.accs = page.accs
  			state.searchProducts = page.searchProducts
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
  		}
	},

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
	    eachPage({commit}) {
	    	const products = localStorage.getItem("products")
	    	const tops = localStorage.getItem("tops")
	    	const bottoms = localStorage.getItem("bottoms")
<<<<<<< HEAD
<<<<<<< HEAD
				const accs = localStorage.getItem("accs")
	    	const management = localStorage.getItem("management")
				const searchProducts = localStorage.getItem("searchProducts")
				const searchUsers = localStorage.getItem("searchUsers")
	    	commit('page',{products: products, tops: tops, bottoms: bottoms, accs: accs, management:management, searchProducts: searchProducts,searchUsers:searchUsers})
=======
	    	const accs = localStorage.getItem("accs")
	    	const searchProducts = localStorage.getItem("searchProducts")
	    	commit('page',{products: products, tops: tops, bottoms: bottoms, accs: accs, searchProducts: searchProducts})
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
	    	const accs = localStorage.getItem("accs")
	    	const searchProducts = localStorage.getItem("searchProducts")
	    	commit('page',{products: products, tops: tops, bottoms: bottoms, accs: accs, searchProducts: searchProducts})
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
	    },
	    searchDelete({state}) {
				state.searchProducts = null
	    	state.searchUsers = null
				localStorage.removeItem("searchProducts")
	    	localStorage.removeItem("searchUsers")
	    },
			pullList({state},prodObj) {
				if(prodObj.key=='products/bottoms')state.current = state.bottoms;
				if(prodObj.key=='products/tops')state.current = state.tops;
				if(prodObj.key=='products/accs')state.current = state.accs;
				if(prodObj.key=='products')state.current = state.products;
				if(prodObj.search){
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current)) + '&search=' + prodObj.search)
	        .then((response) => {
<<<<<<< HEAD
<<<<<<< HEAD
						if(response.data.result == 'fail') {
		          alert('관리자가 아닙니다.')
		          this.$router.push('/');
		        } else {
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
<<<<<<< HEAD
<<<<<<< HEAD
						}
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
	        })
				} else {
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current)))
					.then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
<<<<<<< HEAD
<<<<<<< HEAD
							return new Promise((resolve,reject)=>{
								resolve();
							})
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
=======
>>>>>>> 19699c4f20baa1989577d9047093cb68a6d3772c
					})
				}
			},
			//pager controller
			mipageProduct({state},prodObj) {
				if(prodObj.search) {
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current) - 1) + '&search=' + prodObj.search)
	        .then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
	            router.push('/'+prodObj.key+'?page=' + (Number(state.current)) + '&search=' + prodObj.search);
	        })
				} else {
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current) - 1))
					.then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
							router.push('/'+prodObj.key+'?page=' + (Number(state.current)));
					})
				}
			},
			numpageProduct({state},prodObj) {
				if(prodObj.search) {
					axios.get('/api/'+prodObj.key+'?page=' + prodObj.page + '&search=' + prodObj.search)
	        .then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
	            router.push('/'+prodObj.key+'?page=' + (Number(state.current)) + '&search=' + prodObj.search);
	        })
				} else {
					axios.get('/api/'+prodObj.key+'?page=' + prodObj.page)
					.then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
							router.push('/'+prodObj.key+'?page=' + (Number(state.current)));
					})
				}
			},
			pluspageProduct({state},prodObj) {
				if(prodObj.search) {
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current) + 1) + '&search=' + prodObj.search)
	        .then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
	            router.push('/'+prodObj.key+'?page=' + (Number(state.current)) + '&search=' + prodObj.search);
	        })
				} else {
					axios.get('/api/'+prodObj.key+'?page=' + (Number(state.current) + 1))
					.then((response) => {
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
							if(prodObj.key=='products/bottoms'){localStorage.setItem("bottoms", state.current);state.bottoms = state.current;}
							if(prodObj.key=='products/tops'){localStorage.setItem("tops", state.current);state.tops = state.current;}
							if(prodObj.key=='products/accs'){localStorage.setItem("accs", state.current);state.accs = state.current;}
							if(prodObj.key=='products'){localStorage.setItem("products", state.current);state.products = state.current;}
							router.push('/'+prodObj.key+'?page=' + (Number(state.current)));
					})
				}
			},
			searchProduct({state},prodObj) {
				if(prodObj.search) {
					axios.get('/api/'+prodObj.key+'?page=' + 1 + '&search=' + prodObj.search)
          .then((response) => {
              if(response.data.noMatch) {
                state.noMatch = response.data.noMatch;
              }
              else {
								state.product = response.data.products;
								state.current = response.data.current;
								state.pages = response.data.pages;
								state.page = response.data.page;
								state.productsNum = response.data.productsNum;
                localStorage.setItem("products", 1);
                localStorage.setItem("searchProducts", prodObj.search);
                router.push('/'+prodObj.key+'?page=' + 1 +'&search=' + prodObj.search);
              }
          })
				} else {
					axios.get('/api/'+prodObj.key+'?page=' + 1)
	        .then((response) => {
							state.noMatch = false;
							state.product = response.data.products;
							state.current = response.data.current;
							state.pages = response.data.pages;
							state.page = response.data.page;
							state.productsNum = response.data.productsNum;
	            localStorage.setItem("products", 1);
	            router.push('/'+prodObj.key+'?page=' + 1);
	        })
				}
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
