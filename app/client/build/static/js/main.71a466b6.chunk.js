(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{2:function(e,t,a){e.exports={bubble:"globals_bubble__2iKJc",inline:"globals_inline__oEJv6",flex:"globals_flex__3XGsp",margin:"globals_margin__3fqZc",main:"globals_main__2uw_J",vertical_space:"globals_vertical_space__261eE"}},20:function(e,t,a){e.exports={align_end:"Auth_align_end__2AnBq",g_sign_in:"Auth_g_sign_in__2_TB9"}},21:function(e,t,a){e.exports={header:"Header_header__1HgZT",icon:"Header_icon__vHi87"}},22:function(e,t,a){e.exports={gym:"Gyms_gym__1rDWb",gyms:"Gyms_gyms__1axa3",gyms_parent:"Gyms_gyms_parent__hj_Hs"}},23:function(e,t,a){e.exports={profile:"Profile_profile__36MGf",profile_pic:"Profile_profile_pic__3pYRa"}},27:function(e,t,a){e.exports={wall:"NewWall_wall__1d4MT"}},28:function(e,t,a){e.exports={new_gym:"GymsAdmin_new_gym__3lGYi"}},32:function(e,t,a){e.exports=a(57)},57:function(e,t,a){"use strict";a.r(t);var n=a(31),r=a(0),l=a.n(r),c=a(26),i=a.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,m,u=a(61),s=(a(38),a(4)),p=a(8),d=a(6),h=a(5),f=a(7),E=a(14),b=a(62),g=a(59),v=a(12),y=a.n(v),_=a(13);!function(e){e.Text="text",e.Checkbox="checkbox"}(m||(m={}));var O,w=(o={},Object(_.a)(o,m.Text,"value"),Object(_.a)(o,m.Checkbox,"checked"),o),j=console.error;function k(e){return O._refresh(e)}var x=Object();var N=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){document.title=a.props.title},a.render=function(){return null},a}return Object(f.a)(t,e),t}(r.Component),S={req:function(e,t,a){return fetch("/api".concat(e),{method:t,body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.status>=400)throw e;return e})},input:function(e,t,a){var n;if(void 0===e.state[t])throw new Error("bad name - ".concat(t," - ").concat(JSON.stringify(e.state)));var r=void 0===a?"value":w[a];return n={name:t,type:a},Object(_.a)(n,r,e.state[t]),Object(_.a)(n,"onChange",function(t){var a=t.target,n=Object(_.a)({},t.target.name,a[r]);return e.setState(n),n}),n},err:j,refresh:k,common:function(){return O._common()},setApp:function(e){O=e},unready:function(){k(x)},unready_o:x,inputDate:function(e){return(void 0===e?new Date:new Date(e)).toISOString().slice(0,10)},Title:N},C=a(2),T=a.n(C),D=a(20),P=a.n(D);function q(e){if(!G()){var t=e.Zi.id_token;S.req("/auth/login","POST",{id_token:t}).then(S.unready)}}function A(){var e=window.gapi.auth2.getAuthInstance().signOut(),t=S.req("/auth/logout","POST");Promise.all([e,t]).then(S.unready)}function G(){return void 0!==S.common().user.id}var I=function(){if(void 0===window.onSignIn){var e=document.getElementById("google-platform-preload"),t=document.createElement("script");t.src=e.href,document.head.appendChild(t),window.onSignIn=q}return l.a.createElement("div",{className:P.a.align_end},l.a.createElement("meta",{name:"google-signin-client_id",content:S.common().google_signin_client_id}),l.a.createElement("div",{hidden:G(),id:"sign-in-button",className:"g-signin2 ".concat(P.a.g_sign_in),"data-onsuccess":"onSignIn"}),G()&&l.a.createElement("div",null,l.a.createElement(y.a,{onClick:A,variant:"primary"},"Sign out"),l.a.createElement(g.a,{to:"/user/".concat(S.common().user.id),className:T.a.margin},"Profile")))},z=a(21),B=a.n(z);var J=function(){return l.a.createElement("div",{className:"".concat(B.a.header," ").concat(T.a.bubble)},l.a.createElement(g.a,{to:"/"},l.a.createElement("img",{src:"/favicon.ico",className:B.a.icon})),S.common().user.is_admin&&l.a.createElement(g.a,{to:"/admin/user/latest",className:T.a.margin},"Latest Users"),l.a.createElement(I,null))},M=a(60),H=a(56);var W=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(d.a)(this,Object(h.a)(t).call(this,e));var n={};return e.gym.walls.forEach(function(t){n[t.id]=-1!==e.gym.climbed_walls.indexOf(t.id)}),a.state=n,a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=S.input(this,e.toString(),m.Checkbox),n=a.onChange;return Object.assign(a,{onChange:function(a){var r=Object.assign({},t.state),l=n(a);return S.req("/gym/".concat(t.props.gym.path,"/wall/").concat(e,"/climb"),"POST",{climbed:l[e]}).then(S.refresh).catch(function(e){t.setState(r),S.err(e)}),l}})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(S.Title,{title:this.props.gym.name}),l.a.createElement("div",{className:"".concat(T.a.inline," ").concat(T.a.bubble)},l.a.createElement("h2",null,this.props.gym.name),l.a.createElement("div",null,this.props.gym.description),S.common().user.is_verified&&l.a.createElement(g.a,{to:"".concat(this.props.gym.path,"/edit")},"Edit")),l.a.createElement("div",{className:T.a.flex},this.props.gym.walls.map(function(t){return l.a.createElement("div",{key:t.id,className:T.a.bubble},l.a.createElement(g.a,{to:"".concat(e.props.gym.path,"/wall/").concat(t.id)},l.a.createElement("h4",null,"".concat(t.name," (").concat(t.id,")"))),l.a.createElement("p",null,l.a.createElement("label",null,l.a.createElement("span",null,t.difficulty," "),l.a.createElement("input",e.checkboxProps(t.id)))),l.a.createElement("p",null,(a=t.date,new Date(a).toDateString())),l.a.createElement("p",null,t.location,Boolean(t.active)&&l.a.createElement("span",null," (retired)")),l.a.createElement("p",null,t.color,Boolean(t.setter)&&l.a.createElement("span",null," - set by ",t.setter)));var a})))}}]),t}(r.Component),R=l.a.createRef();function U(e,t){return void 0===S.common().user.id?l.a.createElement("p",null,"Create an account and become verified to upload media."):S.common().user.is_verified?l.a.createElement("div",null,l.a.createElement("p",null,"New Media"),l.a.createElement("div",null,l.a.createElement("input",{ref:R,type:"file",name:"upload"}),l.a.createElement("input",{type:"submit",onClick:function(a){return function(e,t,a){a.preventDefault();var n=R.current;if(null===n)return;var r=n.files;if(!r)return;var l,c=r[0],i=c.type.split("/")[0];if(-1===["image","video"].indexOf(i))return alert("invalid file");S.req("/get_gcs_key").then(function(e){return e.json()}).then(function(e){l=e.token;var t=e.folder,a=e.bucket,n="".concat(t,"/").concat((new Date).getTime(),"_").concat(c.name),r="https://www.googleapis.com/upload/storage/v1/b/".concat(a,"/o?uploadType=media&name=").concat(n);return fetch(r,{method:"POST",body:c,headers:{Authorization:"Bearer ".concat(l),"Content-Type":c.type}})}).then(function(e){return e.json()}).then(function(a){return S.req("/gym/".concat(e,"/wall/").concat(t,"/upload"),"POST",{gcs_path:a.name,gcs_id:a.id,mime:c.type,size:c.size,gcs_key:l})}).then(S.refresh)}(e,t,a)}}))):l.a.createElement("p",null,"Email climb.nomorerice@gmail.com to become verified to upload media.")}var L=function(e){return l.a.createElement("div",null,l.a.createElement("p",null,"Media"),l.a.createElement("br",null),U(e.gym_path,e.wall_id),l.a.createElement("div",null,e.media.map(function(e){return l.a.createElement("div",{key:e.id},l.a.createElement("p",null,"id: ",e.id),l.a.createElement("p",null,"mime: ",e.mime),function(e){if(e.data){if("video"===e.mime){var t=encodeURIComponent("https://www.facebook.com".concat(e.data));return l.a.createElement("iframe",{src:"https://www.facebook.com/plugins/video.php?href=".concat(t),width:e.width,height:e.height,style:{border:"none",overflow:"hidden"},scrolling:"no",allowFullScreen:!0})}return"image"===e.mime?l.a.createElement("img",{src:e.data}):l.a.createElement("pre",null,e.data)}return l.a.createElement("p",null,"received - handling")}(e))})))};var Z=function(e){return l.a.createElement("div",null,l.a.createElement("div",{className:T.a.margin},l.a.createElement(g.a,{to:"/gym/".concat(e.wall.gym_path)},"To Gym Page")),l.a.createElement("div",{className:"".concat(T.a.bubble," ").concat(T.a.inline)},l.a.createElement("p",null,"id: ",e.wall.id),l.a.createElement("p",null,"name: ",e.wall.name),l.a.createElement("p",null,"difficulty: ",e.wall.difficulty),l.a.createElement("p",null,"location: ",e.wall.location),l.a.createElement("p",null,"date: ",new Date(e.wall.date).toDateString()),l.a.createElement("p",null,"setter: ",e.wall.setter),l.a.createElement("p",null,"color: ",e.wall.color),l.a.createElement("p",null,"status: ",e.wall.active?"active":"retired")),l.a.createElement("br",null),l.a.createElement(L,{gym_path:e.wall.gym_path,wall_id:e.wall.id,media:e.wall.media}))},Y=a(27),F=a.n(Y),K={id:0,name:"",difficulty:"",location:"",date:"",setter:"",color:"",active:!0,gym_path:""},X=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){S.req("/gym/".concat(a.props.gym_path,"/new_wall"),"POST",a.state).then(function(){return a.setState(K)}).then(S.refresh)},a.state=Object.assign({},K,{date:S.inputDate()}),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(T.a.bubble," ").concat(T.a.inline)},l.a.createElement("p",null,"New Wall"),l.a.createElement("div",{className:F.a.wall},l.a.createElement("div",null,"name",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"name"),{size:11}))),l.a.createElement("div",null,"difficulty",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"difficulty"),{size:5}))),l.a.createElement("div",null,"date",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"date"),{type:"date",min:"2019-01-01",max:"2030-12-31"}))),l.a.createElement("div",null,"location",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"location"),{size:10}))),l.a.createElement("div",null,"color",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"color"),{size:7}))),l.a.createElement("div",null,"setter",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},S.input(this,"setter"),{size:8})))),l.a.createElement("div",{className:T.a.vertical_space}),l.a.createElement(y.a,{onClick:this.submit},"Submit"))}}]),t}(r.Component),$=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(e){e.preventDefault();var t="/gym/".concat(a.props.gym_path,"/wall/").concat(a.props.id,"/edit");S.req(t,"POST",a.state).then(S.refresh)},a.state=Object.assign({},e,{date:S.inputDate(e.date)}),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:T.a.bubble},l.a.createElement("p",null,"id: ",this.props.id),l.a.createElement("p",null,"name: ",l.a.createElement("input",S.input(this,"name"))),l.a.createElement("p",null,"difficulty: ",l.a.createElement("input",S.input(this,"difficulty"))),l.a.createElement("p",null,"location: ",l.a.createElement("input",S.input(this,"location"))),l.a.createElement("p",null,"date: ",l.a.createElement("input",Object.assign({},S.input(this,"date"),{type:"date"}))),l.a.createElement("p",null,"setter: ",l.a.createElement("input",S.input(this,"setter"))),l.a.createElement("p",null,"color: ",l.a.createElement("input",S.input(this,"color"))),l.a.createElement("p",null,"active:"," ",l.a.createElement("input",S.input(this,"active",m.Checkbox))),l.a.createElement("input",{type:"submit",onClick:this.submit}))}}]),t}(r.Component),Q=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){S.req("/gym/".concat(a.props.gym.path,"/edit"),"POST",a.state).then(S.refresh)},a.state=Object.assign({},e.gym),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(S.Title,{title:"Edit: ".concat(this.props.gym.name)}),l.a.createElement("div",null,l.a.createElement("div",{className:"".concat(T.a.bubble," ").concat(T.a.inline)},l.a.createElement(g.a,{to:"/gym/".concat(this.props.gym.path)},"To Gym Page"),l.a.createElement("div",{className:T.a.vertical_space}),l.a.createElement("p",null,"name",l.a.createElement("br",null),l.a.createElement("input",S.input(this,"name"))),l.a.createElement("p",null,"description",l.a.createElement("br",null),l.a.createElement("textarea",S.input(this,"description"))),l.a.createElement(y.a,{onClick:this.submit,variant:"primary"},"Edit")),l.a.createElement("br",null),l.a.createElement(X,{gym_path:this.props.gym.path})),l.a.createElement("div",{className:T.a.flex},this.props.gym.walls.map(function(t){return l.a.createElement($,Object.assign({key:t.id,gym_path:e.props.gym.path},t))})))}}]),t}(r.Component),V=a(28),ee=a.n(V),te={id:0,name:"",path:"",description:""},ae=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){S.req("/admin/new_gym","POST",a.state).then(function(){return a.setState(te)}).then(S.refresh).catch(function(e){return e.text()}).then(function(e){return alert(e.split("\n")[0])})},a.state=te,a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(T.a.bubble," ").concat(T.a.margin," ").concat(ee.a.new_gym)},l.a.createElement("h3",null,"New Gym"),l.a.createElement("p",null,"path",l.a.createElement("br",null),l.a.createElement("input",S.input(this,"path",m.Text))),l.a.createElement("p",null,"name",l.a.createElement("br",null),l.a.createElement("input",S.input(this,"name",m.Text))),l.a.createElement("p",null,"description",l.a.createElement("br",null),l.a.createElement("textarea",S.input(this,"description"))),l.a.createElement(y.a,{onClick:this.submit,variant:"primary"},"Submit"))}}]),t}(r.Component),ne=a(22),re=a.n(ne);var le=function(e){return l.a.createElement("div",null,l.a.createElement(S.Title,{title:"The Climbing App"}),l.a.createElement("div",{className:"".concat(T.a.flex," ").concat(re.a.gyms_parent)},l.a.createElement("div",{className:T.a.flex},e.gyms.map(function(e){return l.a.createElement("div",{key:e.id,className:"".concat(T.a.bubble," ").concat(re.a.gym)},l.a.createElement(g.a,{to:"/gym/".concat(e.path)},l.a.createElement("h3",null,e.name),l.a.createElement("p",null,e.description)))})),S.common().user.is_admin&&l.a.createElement(ae,null)))},ce=a(23),ie=a.n(ce),oe=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state=Object.assign({},e.user),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=Object.assign({},this.state),n=S.input(this,e,m.Checkbox),r=n.onChange,l=!S.common().user.is_admin;return Object.assign(n,{onChange:function(e){var n="/admin/user/".concat(t.props.user.id,"/edit"),l=r(e);return S.req(n,"POST",l).then(S.unready).catch(function(e){t.setState(a),S.err(e)}),l},disabled:l})}},{key:"permissionDiv",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"is admin: ",l.a.createElement("input",this.checkboxProps("is_admin"))),l.a.createElement("p",null,"is verified:"," ",l.a.createElement("input",this.checkboxProps("is_verified"))))}},{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(T.a.bubble," ").concat(ie.a.profile)},l.a.createElement(S.Title,{title:this.props.user.name}),l.a.createElement("div",null,t.profileDiv(this.props.user),S.common().user.is_admin&&this.permissionDiv()))}}],[{key:"profileDiv",value:function(e){return l.a.createElement("div",null,l.a.createElement("p",null,e.name," (",e.id,")"),l.a.createElement("p",null,e.email),l.a.createElement("p",null,new Date(e.timestamp).toLocaleString()),l.a.createElement("img",{className:ie.a.profile_pic,src:e.image}))}}]),t}(r.Component);var me=function(e){return l.a.createElement("div",null,l.a.createElement(S.Title,{title:"Latest Users"}),l.a.createElement("div",{className:T.a.flex},e.users.map(function(e){return l.a.createElement("div",{key:e.id,className:T.a.bubble},l.a.createElement(g.a,{to:"/user/".concat(e.id)},oe.profileDiv(e)))})))};function ue(e,t){return{exact:!0,path:e,render:function(e){return S.common().path===encodeURI(e.location.pathname)&&t(e.match.params)}}}var se=function(e){return l.a.createElement("div",null,l.a.createElement(M.a,null,l.a.createElement(H.a,ue("/",function(){return l.a.createElement(le,{gyms:e.gyms})})),l.a.createElement(H.a,ue("/admin/user/latest",function(){return l.a.createElement(me,{users:e.users})})),l.a.createElement(H.a,ue("/user/:user_id",function(){return l.a.createElement(oe,{user:e.user})})),l.a.createElement(H.a,ue("/gym/:gym_path",function(){return l.a.createElement(W,{gym:e.gym})})),l.a.createElement(H.a,ue("/gym/:gym_path/edit",function(){return l.a.createElement(Q,{gym:e.gym})})),l.a.createElement(H.a,ue("/gym/:gym_path/wall/:wall_id",function(){return l.a.createElement(Z,{wall:e.wall})}))))};var pe=function(e){return l.a.createElement("div",{className:T.a.main},l.a.createElement(J,null),l.a.createElement(se,e))},de=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e)))._refresh=function(e){var t=e===S.unready_o;return console.log("refresh",t,a.props.history.location.pathname),t&&location.reload(),S.req("".concat(a.props.history.location.pathname)).then(function(e){return e.json()}).then(function(e){return a.setState(Object.assign({ready:!0},e)),e})},a._common=function(){return a.state.common},a.state={ready:!1},S.setApp(Object(E.a)(Object(E.a)(a))),a.props.history.listen(S.refresh),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){S.refresh()}},{key:"render",value:function(){return this.state.ready?l.a.createElement(pe,this.state):null}}]),t}(r.Component),he=Object(b.a)(de),fe=console.log;console.log=function(){var e=Array.from(arguments);return fe.apply(void 0,Object(n.a)(e)),e[0]},i.a.render(l.a.createElement(u.a,null,l.a.createElement(he,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,2,1]]]);
//# sourceMappingURL=main.71a466b6.chunk.js.map