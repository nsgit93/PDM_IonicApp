(this.webpackJsonpmyApp=this.webpackJsonpmyApp||[]).push([[1],{109:function(e,t,n){},110:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(33),c=n.n(i),o=n(23),s=n(2),l=n(64),u=n(13),p=function(e){var t=e._id,n=e.name,a=(e.age,e.participationsNo,e.onEdit);return r.a.createElement(s.m,{onClick:function(){return a(t)}},r.a.createElement(s.q,null,n))},d="http://192.168.1.5:3000",f=function(e){return function(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=console).log.apply(t,[e].concat(a))}},E=f("api");function m(e,t){return E("".concat(t," - started")),e.then((function(e){return E("".concat(t," - succeeded")),Promise.resolve(e.data)})).catch((function(e){return E("".concat(t," - failed")),Promise.reject(e)}))}var g={headers:{"Content-Type":"application/json"}},h=function(e){return{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}},v=n(8),j=n.n(v),b=n(16),y=n(15),O=n(36),_=n(5),P=n(27),k=n.n(P),w="http://".concat(d,"/api/participant"),S=function(e){return m(k.a.get(w,h(e)),"getParticipants")},A=function(e,t){return m(k.a.post(w,t,h(e)),"createParticipant")},C=function(e,t){return m(k.a.put("".concat(w,"/").concat(t._id),t,h(e)),"updateParticipant")},x=function(e,t){return m(k.a.delete("".concat(w,"/").concat(t._id),h(e)),"deleteParticipant")},D=f("ws"),T="http://".concat(d,"/api/auth/login"),N=function(e,t){return m(k.a.post(T,{username:e,password:t},g),"login")},L=f("AuthProvider"),F={isAuthenticated:!1,isAuthenticating:!1,authenticationError:null,pendingAuthentication:!1,token:""},I=r.a.createContext(F),U=function(e){var t=e.children,n=Object(a.useState)(F),i=Object(y.a)(n,2),c=i[0],o=i[1],s=c.isAuthenticated,l=c.isAuthenticating,u=c.authenticationError,p=c.pendingAuthentication,d=c.token,f=Object(a.useCallback)((function(e,t){L("login"),o(Object(_.a)(Object(_.a)({},c),{},{pendingAuthentication:!0,username:e,password:t}))}),[]);Object(a.useEffect)((function(){var e=!1;return function(){t.apply(this,arguments)}(),function(){e=!0};function t(){return(t=Object(b.a)(j.a.mark((function t(){var n,a,r,i;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(p){t.next=3;break}return L("authenticate, !pendingAuthentication, return"),t.abrupt("return");case 3:return t.prev=3,L("authenticate..."),o(Object(_.a)(Object(_.a)({},c),{},{isAuthenticating:!0})),n=c.username,a=c.password,t.next=9,N(n,a);case 9:if(r=t.sent,i=r.token,!e){t.next=13;break}return t.abrupt("return");case 13:L("authenticate succeeded"),o(Object(_.a)(Object(_.a)({},c),{},{token:i,pendingAuthentication:!1,isAuthenticated:!0,isAuthenticating:!1})),t.next=23;break;case 17:if(t.prev=17,t.t0=t.catch(3),!e){t.next=21;break}return t.abrupt("return");case 21:L("authenticate failed"),o(Object(_.a)(Object(_.a)({},c),{},{authenticationError:t.t0,pendingAuthentication:!1,isAuthenticating:!1}));case 23:case"end":return t.stop()}}),t,null,[[3,17]])})))).apply(this,arguments)}}),[p]);var E={isAuthenticated:s,login:f,isAuthenticating:l,authenticationError:u,token:d};return L("render"),r.a.createElement(I.Provider,{value:E},t)},R=n(69),q=f("Login"),H=function(e){var t=e.component,n=Object(R.a)(e,["component"]),i=Object(a.useContext)(I).isAuthenticated;return q("render, isAuthenticated",i),r.a.createElement(o.b,Object.assign({},n,{render:function(e){return i?r.a.createElement(t,e):r.a.createElement(o.a,{to:{pathname:"/login"}})}}))},J=n(29),V=J.a.App,z={isActive:!0},B=function(){var e=Object(a.useState)(z),t=Object(y.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){var e=V.addListener("appStateChange",n);V.getState().then(n);var t=!1;return function(){t=!0,e.remove()};function n(e){console.log("useAppState - state change",e),t||r(e)}}),[]),{appState:n}},W=J.a.Network,M={connected:!1,connectionType:"unknown"},$=function(){var e=Object(a.useState)(M),t=Object(y.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){var e=W.addListener("networkStatusChange",n);W.getStatus().then(n);var t=!1;return function(){t=!0,e.remove()};function n(e){console.log("useNetwork - status change",e),t||r(e)}}),[]),{networkStatus:n}},G=f("Login"),K=function(e){e.history;var t=Object(a.useContext)(I),n=t.isAuthenticated,i=t.isAuthenticating,c=t.login,l=t.authenticationError,p=Object(a.useState)({}),d=Object(y.a)(p,2),f=d[0],E=d[1],m=f.username,g=f.password;G("render");var h=B().appState,v=$().networkStatus;return n?r.a.createElement(o.a,{to:{pathname:"/"}}):r.a.createElement(s.t,null,r.a.createElement(s.j,null,r.a.createElement(s.y,null,r.a.createElement(s.x,null,"Login - ",h.isActive?"Online --- Network: "+v.connectionType.toString():"Offline"))),r.a.createElement(s.f,{fullscreen:!0,className:"ion-padding ion-text-center"},r.a.createElement(s.i,null,r.a.createElement(s.w,null,r.a.createElement(s.e,null,r.a.createElement(s.s,{isOpen:i}),r.a.createElement(s.a,{isOpen:null!=l,header:"Error!",message:"Username sau password gresite",buttons:["Dismiss"]}))),r.a.createElement(s.w,null,r.a.createElement(s.e,null,r.a.createElement(s.k,{style:{fontSize:"80px",color:"#0040ff"},icon:u.k}))),r.a.createElement(s.w,null,r.a.createElement(s.e,null,r.a.createElement(s.m,null,r.a.createElement(s.q,{position:"floating"},"Username"),r.a.createElement(s.l,{value:m,onIonChange:function(e){return E(Object(_.a)(Object(_.a)({},f),{},{username:e.detail.value||""}))}})))),r.a.createElement(s.w,null,r.a.createElement(s.e,null,r.a.createElement(s.m,null,r.a.createElement(s.q,{position:"floating"},"Password"),r.a.createElement(s.l,{type:"password",value:g,onIonChange:function(e){return E(Object(_.a)(Object(_.a)({},f),{},{password:e.detail.value||""}))}})))),r.a.createElement(s.w,null,r.a.createElement(s.e,null,r.a.createElement(s.c,{expand:"block",onClick:function(){G("handleLogin..."),null===c||void 0===c||c(m,g)}},"Login"))))))},Q=J.a.Storage,X=f("ParticipantProvider"),Y={fetching:!1,saving:!1,deleting:!1},Z=function(e,t){var n=t.type,a=t.payload;switch(n){case"FETCH_ParticipantS_STARTED":return Object(_.a)(Object(_.a)({},e),{},{fetching:!0,fetchingError:null});case"FETCH_ParticipantS_SUCCEEDED":return Object(_.a)(Object(_.a)({},e),{},{Participants:a.Participants,fetching:!1});case"FETCH_ParticipantS_FAILED":return Object(_.a)(Object(_.a)({},e),{},{fetchingError:a.error,fetching:!1});case"SAVE_Participant_STARTED":return Object(_.a)(Object(_.a)({},e),{},{savingError:null,saving:!0});case"DELETE_Participant_STARTED":return Object(_.a)(Object(_.a)({},e),{},{deletingError:null,deleting:!0});case"SAVE_Participant_SUCCEEDED":var r=Object(O.a)(e.Participants||[]),i=a.Participant,c=r.findIndex((function(e){return e._id===i._id}));return-1===c?r.splice(0,0,i):r[c]=i,Object(_.a)(Object(_.a)({},e),{},{Participants:r,saving:!1});case"DELETE_Participant_SUCCEDED":var o=a.Participant,s=Object(O.a)(e.Participants||[]),l=null===s||void 0===s?void 0:s.findIndex((function(e){return e._id==o._id}));return 0==l?s.shift():l>0&&(null===s||void 0===s||s.splice(l,1)),console.log(e),console.log(s),Object(_.a)(Object(_.a)({},e),{},{Participants:s,deleting:!1});case"SAVE_Participant_FAILED":return Object(_.a)(Object(_.a)({},e),{},{savingError:a.error,saving:!1});case"DELETE_Participant_FAILED":return Object(_.a)(Object(_.a)({},e),{},{deletingError:a.error,deleting:!1});default:return e}},ee=r.a.createContext(Y),te=function(e){var t=e.children,n=Object(a.useContext)(I).token,i=Object(a.useReducer)(Z,Y),c=Object(y.a)(i,2),o=c[0],s=c[1],l=o.Participants,u=o.fetching,p=o.fetchingError,f=o.saving,E=o.savingError,m=o.deleting,g=o.deletingError;Object(a.useEffect)((function(){var e=!1;return function(){t.apply(this,arguments)}(),function(){e=!0};function t(){return(t=Object(b.a)(j.a.mark((function t(){var a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===n||void 0===n?void 0:n.trim()){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,X("fetchParticipants started"),s({type:"FETCH_ParticipantS_STARTED"}),t.next=7,S(n);case 7:a=t.sent,X("fetchParticipants succeeded"),Q.clear(),a.forEach((function(e){Q.set({key:e._id,value:JSON.stringify({id:e._id,name:e.name,age:e.age,participationsNo:e.participationsNo})})})),e||s({type:"FETCH_ParticipantS_SUCCEEDED",payload:{Participants:a}}),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(2),X("fetchParticipants failed"),s({type:"FETCH_ParticipantS_FAILED",payload:{error:t.t0}});case 18:case"end":return t.stop()}}),t,null,[[2,14]])})))).apply(this,arguments)}}),[n]),Object(a.useEffect)((function(){var e,t=!1;X("wsEffect - connecting"),(null===n||void 0===n?void 0:n.trim())&&(e=function(e,t){var n=new WebSocket("ws://".concat(d));return n.onopen=function(){D("web socket onopen"),n.send(JSON.stringify({type:"authorization",payload:{token:e}}))},n.onclose=function(){D("web socket onclose")},n.onerror=function(e){D("web socket onerror",e)},n.onmessage=function(e){D("web socket onmessage"),t(JSON.parse(e.data))},function(){n.close()}}(n,(function(e){if(console.log("am primit"),console.log(e.payload),!t){var n=e.type,a=e.payload;X("ws message, Participant ".concat(n)),"created"===n||"updated"===n?s({type:"SAVE_Participant_SUCCEEDED",payload:{Participant:a}}):"deleted"===n&&s({type:"DELETE_Participant_SUCCEDED",payload:{Participant:a}})}})));return function(){var n;X("wsEffect - disconnecting"),t=!0,null===(n=e)||void 0===n||n()}}),[n]);var h={Participants:l,fetching:u,fetchingError:p,saving:f,savingError:E,saveParticipant:Object(a.useCallback)((function(e){return O.apply(this,arguments)}),[n]),deleting:m,deletingError:g,deleteParticipant:Object(a.useCallback)((function(e){return v.apply(this,arguments)}),[n])};return X("returns"),r.a.createElement(ee.Provider,{value:h},t);function v(){return(v=Object(b.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("in delete"),console.log(n),s({type:"DELETE_Participant_STARTED"}),e.next=6,x(n,t);case 6:e.sent,X("saveParticipant succeeded"),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),X("saveParticipant failed"),s({type:"DELETE_Participant_FAILED",payload:{error:e.t0}});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function O(){return(O=Object(b.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("in save"),console.log(n),X("saveParticipant started"),s({type:"SAVE_Participant_STARTED"}),e.next=7,t._id?C(n,t):A(n,t);case 7:e.sent,X("saveParticipant succeeded"),Q.set({key:t._id,value:JSON.stringify({id:t._id,name:t.name,age:t.age,participationsNo:t.participationsNo})}),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),X("saveParticipant failed"),s({type:"SAVE_Participant_FAILED",payload:{error:e.t0}});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}},ne=f("ParticipantList"),ae=function(e){var t=e.history,n=Object(a.useContext)(ee),i=n.Participants,c=n.fetching,o=n.fetchingError,l=n.deleteParticipant,d=B().appState,f=$().networkStatus;return ne("render"),r.a.createElement(s.t,null,r.a.createElement(s.j,null,r.a.createElement(s.y,null,r.a.createElement(s.x,null,"Participanti - ",d.isActive?"Online --- Network: "+f.connectionType.toString():"Offline"))),r.a.createElement(s.f,null,r.a.createElement(s.s,{isOpen:c,message:"Fetching Participants"}),i&&r.a.createElement(s.r,null,i.map((function(e){var n=e._id,a=e.name,c=e.age,o=e.participationsNo;return r.a.createElement(s.p,{key:n},r.a.createElement(s.o,{side:"start"},r.a.createElement(s.n,{color:"danger",onClick:function(){return function(e){var t=null===i||void 0===i?void 0:i.find((function(t){return t._id==e}));t&&l&&l(t).then((function(e){}))}(n)}},r.a.createElement(s.k,{slot:"start",icon:u.p}))),r.a.createElement(s.m,null,r.a.createElement(p,{key:n,_id:n,name:a,age:c,participationsNo:o,onEdit:function(e){return t.push("/participant/".concat(e))}})))}))),o&&r.a.createElement("div",null,o.message||"Failed to fetch Participants"),r.a.createElement(s.g,{vertical:"bottom",horizontal:"end",slot:"fixed"},r.a.createElement(s.h,{onClick:function(){return t.push("/participant")}},r.a.createElement(s.k,{icon:u.a})))))},re=f("ParticipantEdit"),ie=function(e){var t=e.history,n=e.match,i=Object(a.useContext)(ee),c=i.Participants,o=i.saving,l=i.savingError,u=i.saveParticipant,p=Object(a.useState)(""),d=Object(y.a)(p,2),f=d[0],E=d[1],m=Object(a.useState)(""),g=Object(y.a)(m,2),h=g[0],v=g[1],j=Object(a.useState)(""),b=Object(y.a)(j,2),O=b[0],P=b[1],k=Object(a.useState)(),w=Object(y.a)(k,2),S=w[0],A=w[1];Object(a.useEffect)((function(){re("useEffect");var e=n.params.id||"",t=null===c||void 0===c?void 0:c.find((function(t){return t._id===e}));A(t),t&&(E(t.name),v(t.age),P(t.participationsNo))}),[n.params.id,c]);return re("render"),r.a.createElement(s.t,null,r.a.createElement(s.j,null,r.a.createElement(s.y,null,r.a.createElement(s.x,null,"Edit"),r.a.createElement(s.d,{slot:"end"},r.a.createElement(s.c,{onClick:function(){var e=S?Object(_.a)(Object(_.a)({},S),{},{name:f,age:h,participationsNo:O}):{name:f,age:h,participationsNo:O};u&&u(e).then((function(){return t.goBack()}))}},"Save")))),r.a.createElement(s.f,null,r.a.createElement(s.m,null,r.a.createElement(s.q,{position:"floating"},"Name"),r.a.createElement(s.l,{value:f,onIonChange:function(e){return E(e.detail.value||"")}})),r.a.createElement(s.m,null,r.a.createElement(s.q,{position:"floating"},"Age"),r.a.createElement(s.l,{value:h,onIonChange:function(e){return v(e.detail.value||"")}})),r.a.createElement(s.m,null,r.a.createElement(s.q,{position:"floating"},"ParticipationsNo"),r.a.createElement(s.l,{value:O,onIonChange:function(e){return P(e.detail.value||"")}})),r.a.createElement(s.s,{isOpen:o}),l&&r.a.createElement("div",null,l.message||"Failed to save Participant")))},ce=(n(99),n(100),n(101),n(102),n(103),n(104),n(105),n(106),n(107),n(108),n(109),function(){return r.a.createElement(s.b,null,r.a.createElement(l.a,null,r.a.createElement(s.v,null,r.a.createElement(U,null,r.a.createElement(o.b,{path:"/login",component:K,exact:!0}),r.a.createElement(te,null,r.a.createElement(H,{path:"/participants",component:ae,exact:!0}),r.a.createElement(H,{path:"/participant",component:ie,exact:!0}),r.a.createElement(H,{path:"/participant/:id",component:ie,exact:!0})),r.a.createElement(o.b,{exact:!0,path:"/",render:function(){return r.a.createElement(o.a,{to:"/participants"})}})))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},70:function(e,t,n){e.exports=n(110)},76:function(e,t,n){var a={"./ion-action-sheet.entry.js":[112,5],"./ion-alert.entry.js":[113,6],"./ion-app_8.entry.js":[114,7],"./ion-avatar_3.entry.js":[115,18],"./ion-back-button.entry.js":[116,19],"./ion-backdrop.entry.js":[117,43],"./ion-button_2.entry.js":[118,20],"./ion-card_5.entry.js":[119,21],"./ion-checkbox.entry.js":[120,22],"./ion-chip.entry.js":[121,23],"./ion-col_3.entry.js":[122,44],"./ion-datetime_3.entry.js":[123,10],"./ion-fab_3.entry.js":[124,24],"./ion-img.entry.js":[125,45],"./ion-infinite-scroll_2.entry.js":[126,46],"./ion-input.entry.js":[127,25],"./ion-item-option_3.entry.js":[128,26],"./ion-item_8.entry.js":[129,27],"./ion-loading.entry.js":[130,28],"./ion-menu_3.entry.js":[131,29],"./ion-modal.entry.js":[132,8],"./ion-nav_2.entry.js":[133,15],"./ion-popover.entry.js":[134,9],"./ion-progress-bar.entry.js":[135,30],"./ion-radio_2.entry.js":[136,31],"./ion-range.entry.js":[137,32],"./ion-refresher_2.entry.js":[138,11],"./ion-reorder_2.entry.js":[139,17],"./ion-ripple-effect.entry.js":[140,47],"./ion-route_4.entry.js":[141,33],"./ion-searchbar.entry.js":[142,34],"./ion-segment_2.entry.js":[143,35],"./ion-select_3.entry.js":[144,36],"./ion-slide_2.entry.js":[145,48],"./ion-spinner.entry.js":[146,13],"./ion-split-pane.entry.js":[147,49],"./ion-tab-bar_2.entry.js":[148,37],"./ion-tab_2.entry.js":[149,16],"./ion-text.entry.js":[150,38],"./ion-textarea.entry.js":[151,39],"./ion-toast.entry.js":[152,40],"./ion-toggle.entry.js":[153,12],"./ion-virtual-scroll.entry.js":[154,50]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=76,e.exports=r},78:function(e,t,n){var a={"./ion-icon.entry.js":[158,57]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=78,e.exports=r}},[[70,3,4]]]);
//# sourceMappingURL=main.61c2553d.chunk.js.map