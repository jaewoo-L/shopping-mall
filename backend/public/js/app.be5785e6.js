(function(t){function e(e){for(var n,o,l=e[0],i=e[1],c=e[2],p=0,m=[];p<l.length;p++)o=l[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&m.push(r[o][0]),r[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(e);while(m.length)m.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,l=1;l<a.length;l++){var i=a[l];0!==r[i]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},r={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=i;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("64a9"),r=a.n(n);r.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view",{attrs:{name:"header"}}),a("router-view")],1)},s=[],o={created:function(){this.$store.dispatch("tryAutoLogin")}},l=o,i=(a("034f"),a("2877")),c=Object(i["a"])(l,r,s,!1,null,null,null),u=c.exports,p=a("8c4f"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("nav",{staticClass:"navbar navbar-default"},[a("div",{staticClass:"container-fluid"},[t._m(0),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"bs-example-navbar-collapse-1"}},[t.auth?a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:{name:"orders"},tag:"a"}},[t._v("주문조회")])],1):t._e(),t.auth?a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:{name:"basket"},tag:"a"}},[t._v("장바구니")])],1):t._e(),t.auth?t._e():a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:{name:"signUp"},tag:"a"}},[t._v("회원가입")])],1),t.auth?t._e():a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:{name:"login"},tag:"a"}},[t._v("로그인")])],1),t.auth?a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:{name:"logout"},tag:"a"}},[t._v("로그아웃")])],1):t._e(),t.auth?a("li",{staticClass:"navbar-text navbar-right"},[a("router-link",{staticClass:"navbar-link",attrs:{to:"",tag:"a"}},[t._v(t._s(t.username))])],1):t._e()]),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"bs-example-navbar-collapse-1"}},[a("ul",{staticClass:"nav navbar-nav mL"},[a("router-link",{attrs:{tag:"li",to:{name:"products"},"active-class":"active",exact:""}},[a("a",[t._v("All Products")])]),a("router-link",{attrs:{tag:"li",to:{name:"tops"},"active-class":"active"}},[a("a",[t._v("Tops")])]),a("router-link",{attrs:{tag:"li",to:{name:"bottoms"},"active-class":"active"}},[a("a",[t._v("Bottoms")])]),a("router-link",{attrs:{tag:"li",to:{name:"accs"},"active-class":"active"}},[a("a",[t._v("Accs")])])],1),t._m(1)])])])])},d=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-header"},[a("button",{staticClass:"navbar-toggle collapsed",attrs:{type:"button","data-toggle":"collapse","data-target":"#bs-example-navbar-collapse-1","aria-expanded":"false"}},[a("span",{staticClass:"sr-only"},[t._v("Toggle navigation")]),a("span",{staticClass:"icon-bar"}),a("span",{staticClass:"icon-bar"}),a("span",{staticClass:"icon-bar"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"navbar-form navbar-right",attrs:{role:"search"}},[a("div",{staticClass:"form-group"},[a("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Search"}})]),a("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[t._v("Search")])])}],v={computed:{auth:function(){return this.$store.getters.isAuthenticated},username:function(){return this.$store.getters.username}}},f=v,h=(a("9eb3"),Object(i["a"])(f,m,d,!1,null,"466ab36c",null)),_=h.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("h1",[t._v("영화 목록")]),t._l(t.movies,(function(e){return a("div",{staticClass:"movie"},[a("img",{staticClass:"poster",attrs:{src:e.poster}}),a("div",[a("strong",[t._v(t._s(e.name))]),t._v(", "),a("i",[t._v(t._s(e.director))]),t._v(" ["+t._s(e.year)+"]\n      "),a("router-link",{attrs:{to:{name:"show",params:{id:e.id}}}},[t._v("더보기")])],1)])}))],2)},b=[],w={created:function(){var t=this;this.$http.get("/api/movies").then((function(e){t.movies=e.data}))},data:function(){return{movies:[]}}},$=w,C=Object(i["a"])($,g,b,!1,null,null,null),x=C.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",[t._v("Show Page")]),a("p",[t._v(t._s(t.test.title))]),a("p",[t._v(t._s(t.test.description))])])},E=[],y={created:function(){var t=this;this.$http.get("/exercise").then((function(e){t.test=e.data}))},data:function(){return{movie:{},test:{}}}},O=y,j=Object(i["a"])(O,k,E,!1,null,null,null),S=j.exports,P=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},U=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("tops page")])])}],I={},A=I,D=Object(i["a"])(A,P,U,!1,null,null,null),T=D.exports,L=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},M=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("bottoms page")])])}],N={},J=N,B=Object(i["a"])(J,L,M,!1,null,null,null),q=B.exports,z=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},F=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("accs page")])])}],G={},H=G,K=Object(i["a"])(H,z,F,!1,null,null,null),Q=K.exports,R=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},V=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("details page")])])}],W={},X=W,Y=Object(i["a"])(X,R,V,!1,null,null,null),Z=Y.exports,tt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},et=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("createProduct page")])])}],at={},nt=at,rt=Object(i["a"])(nt,tt,et,!1,null,null,null),st=rt.exports,ot=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},lt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("editProduct page")])])}],it={},ct=it,ut=Object(i["a"])(ct,ot,lt,!1,null,null,null),pt=ut.exports,mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"login"}},[a("div",[t._v(" Login ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{name:"username",placeholder:"ID"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password",placeholder:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("button",{on:{click:t.login}},[t._v("login")]),a("hr"),a("a",{attrs:{href:t.url.signUpUrl}},[t._v(" Sign up ")])])},dt=[],vt={data:function(){return{username:"",password:"",url:{signUpUrl:"/signUp"}}},methods:{login:function(t){var e=this;this.$http.post("/api/login",{username:this.username,password:this.password}).then((function(t){alert("success login"+t.data.username),console.log(t.data.session);var a=t.data.session,n=t.data.username;localStorage.setItem("access_token",a),localStorage.setItem("username",n),e.$store.state.username=n,e.$store.state.token=a}),(function(t){alert("undifind error: "+t.response.data.error)})).catch((function(t){alert("catch error: "+t)}))}}},ft=vt,ht=Object(i["a"])(ft,mt,dt,!1,null,null,null),_t=ht.exports,gt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div")},bt=[],wt={created:function(){var t=this;this.$http.get("/api/login/logout").then((function(e){alert(e.data.msg),t.$store.dispatch("logout"),t.$router.push("/login")}))}},$t=wt,Ct=Object(i["a"])($t,gt,bt,!1,null,null,null),xt=Ct.exports,kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"SignUp"}},[a("div",[t._v(" Sign Up ")]),t._v("\n  ID : "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{name:"username",placeholder:"ID"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),a("br"),t._v("\n  Password : "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{name:"password",type:"password",placeholder:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("button",{on:{click:t.signUp}},[t._v("SignUp")])])},Et=[],yt={data:function(){return{username:"",password:""}},methods:{signUp:function(t){var e=this;this.$http.post("/api/login/signUp",{username:this.username,password:this.password}).then((function(t){console.log("response"),console.log(t.data),0==t.data.result&&alert("Error, please, try again"),1==t.data.result&&(alert("Success"),e.$router.push("/login"))})).catch((function(t){alert("frontend error"),console.log(t)}))}}},Ot=yt,jt=Object(i["a"])(Ot,kt,Et,!1,null,null,null),St=jt.exports,Pt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Ut=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("basket page")])])}],It={},At=It,Dt=Object(i["a"])(At,Pt,Ut,!1,null,null,null),Tt=Dt.exports,Lt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Mt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("orders page")])])}],Nt={},Jt=Nt,Bt=Object(i["a"])(Jt,Lt,Mt,!1,null,null,null),qt=Bt.exports,zt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Ft=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("new comments page")])])}],Gt={},Ht=Gt,Kt=Object(i["a"])(Ht,zt,Ft,!1,null,null,null),Qt=Kt.exports,Rt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Vt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"movies"},[a("p",[t._v("edit comments page")])])}],Wt={},Xt=Wt,Yt=Object(i["a"])(Xt,Rt,Vt,!1,null,null,null),Zt=Yt.exports,te=a("2f62");n["a"].use(te["a"]);var ee=new te["a"].Store({state:{username:null,token:null},getters:{username:function(t){return t.username},isAuthenticated:function(t){return null!==t.token}},mutations:{clearAuthData:function(t){t.username=null,t.token=null},authUser:function(t,e){t.token=e.token,t.username=e.username}},actions:{tryAutoLogin:function(t){var e=t.commit,a=localStorage.getItem("access_token"),n=localStorage.getItem("username");a&&e("authUser",{token:a,username:n})},logout:function(t){var e=t.commit;e("clearAuthData"),localStorage.removeItem("access_token"),localStorage.removeItem("username")}}});n["a"].use(p["a"]);var ae=new p["a"]({mode:"history",base:"/",routes:[{path:"/",name:"index",components:{header:_,default:x}},{path:"/products",name:"products",components:{header:_,default:S}},{path:"/products/tops",name:"tops",components:{header:_,default:T}},{path:"/products/bottoms",name:"bottoms",components:{header:_,default:q}},{path:"/products/accs",name:"accs",components:{header:_,default:Q}},{path:"/products/:id",name:"details",components:{header:_,default:Z}},{path:"/products/:id/edit",name:"editProduct",components:{header:_,default:pt}},{path:"/products/new",name:"createProduct",components:{header:_,default:st}},{path:"/login",name:"login",components:{header:_,default:_t}},{path:"/logout",name:"logout",components:{header:_,default:xt}},{path:"/signup",name:"signUp",components:{header:_,default:St}},{path:"/basket",name:"basket",components:{header:_,default:Tt},beforeEnter:function(t,e,a){ee.state.token?a():(alert("login first please"),a("/login"))}},{path:"/orders",name:"orders",components:{header:_,default:qt},beforeEnter:function(t,e,a){ee.state.token?a():(alert("login first please"),a("/login"))}},{path:"/products/:id/comments/new",name:"newComments",components:{header:_,default:Qt}},{path:"/products/:id/comments/:comments_id/edit",name:"editComments",components:{header:_,default:Zt}}]}),ne=a("bc3a"),re=a.n(ne);n["a"].prototype.$http=re.a,n["a"].config.productionTip=!1,new n["a"]({router:ae,store:ee,render:function(t){return t(u)}}).$mount("#app")},"64a9":function(t,e,a){},"9eb3":function(t,e,a){"use strict";var n=a("cd3a"),r=a.n(n);r.a},cd3a:function(t,e,a){}});
//# sourceMappingURL=app.be5785e6.js.map