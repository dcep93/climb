(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports={bubble:"globals_bubble__2iKJc"}},19:function(e,t,n){e.exports={align_end:"Auth_align_end__2AnBq"}},20:function(e,t,n){e.exports={header:"Header_header__1HgZT"}},21:function(e,t,n){e.exports={new_gym:"GymsAdmin_new_gym__3lGYi"}},22:function(e,t,n){e.exports={gyms:"Gyms_gyms__1axa3"}},23:function(e,t,n){e.exports={users:"LatestUsers_users__3aJge"}},24:function(e,t,n){e.exports={profile:"Profile_profile__36MGf"}},29:function(e,t,n){e.exports=n(48)},48:function(e,t,n){"use strict";n.r(t);var a=n(27),r=n(0),l=n.n(r),c=n(18),i=n.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,u=n(52),m=(n(35),n(4)),s=n(7),p=n(6),d=n(2),h=n(5),f=n(14),E=n(53),b=n(50),v=n(13),g=n(28);window.addEventListener("unhandledrejection",function(e){e.reason instanceof O&&e.preventDefault()});var y,O=function(e){function t(){return Object(m.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),t}(Object(g.a)(Error));!function(e){e.Text="text",e.Checkbox="checkbox"}(y||(y={}));var j,w=(o={},Object(v.a)(o,y.Text,"value"),Object(v.a)(o,y.Checkbox,"checked"),o),_=console.error;function k(e){return j._refresh(e)}var x=Object();var C=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){document.title=n.props.title},n.render=function(){return null},n}return Object(h.a)(t,e),t}(r.Component),S={req:function(e,t,n){return fetch("/api".concat(e),{method:t,body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.status>=400)throw new O(e.statusText);return e}).catch(function(e){return Promise.reject(new O(e))})},input:function(e,t,n){var a;if(void 0===e.state[t])throw new Error("bad name - ".concat(t," - ").concat(JSON.stringify(e.state)));var r=void 0===n?"value":w[n];return a={name:t,type:n},Object(v.a)(a,r,e.state[t]),Object(v.a)(a,"onChange",function(t){var n=t.target,a=Object(v.a)({},t.target.name,n[r]);return e.setState(a),a}),a},err:_,refresh:k,common:function(){return j._common()},setApp:function(e){j=e},unready:function(){k(x)},unready_o:x,Title:C},T=n(19),P=n.n(T);function N(e){if(!A()){var t=e.Zi.id_token;S.req("/auth/login","POST",{id_token:t}).then(S.unready)}}function q(){var e=window.gapi.auth2.getAuthInstance().signOut(),t=S.req("/auth/logout","POST");Promise.all([e,t]).then(S.unready)}function A(){return void 0!==S.common().user.id}var D=function(){if(void 0===window.onSignIn){var e=document.getElementById("google-platform-preload"),t=document.createElement("script");t.src=e.href,document.head.appendChild(t),window.onSignIn=N}return l.a.createElement("div",{className:P.a.align_end},l.a.createElement("meta",{name:"google-signin-client_id",content:S.common().google_signin_client_id}),l.a.createElement("div",{hidden:A(),id:"sign-in-button",className:"g-signin2","data-onsuccess":"onSignIn"}),A()&&l.a.createElement("div",null,l.a.createElement("button",{onClick:q},"Sign out"),l.a.createElement("br",null),l.a.createElement(b.a,{to:"/user/".concat(S.common().user.id)},"Profile")))},I=n(10),J=n.n(I),B=n(20),G=n.n(B);var M=function(){return l.a.createElement("div",{className:"".concat(G.a.header," ").concat(J.a.bubble)},l.a.createElement(b.a,{to:"/"},"Home"),S.common().user.is_admin&&l.a.createElement(b.a,{to:"/admin/user/latest"},"Latest Users"),l.a.createElement(D,null))},U=n(51),W=n(47),L=function(e){function t(e){var n;Object(m.a)(this,t),n=Object(p.a)(this,Object(d.a)(t).call(this,e));var a={};return e.gym.walls.forEach(function(t){a[t.id]=-1!==e.gym.climbed_walls.indexOf(t.id)}),n.state=a,n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"checkboxProps",value:function(e){var t=this,n=S.input(this,e.toString(),y.Checkbox),a=n.onChange;return Object.assign(n,{onChange:function(n){n.preventDefault();var r=Object.assign({},t.state),l=a(n);return S.req("/".concat(S.common().path,"/wall/").concat(e,"/climb"),"POST",{climbed:l[e]}).then(S.refresh).catch(function(e){t.setState(r),S.err(e)}),l}})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("div",null,this.props.gym.name),l.a.createElement("div",null,this.props.gym.description),l.a.createElement("br",null),l.a.createElement("div",null,l.a.createElement("p",null,"Walls"),l.a.createElement("br",null),S.common().user.is_verified&&l.a.createElement(b.a,{to:"".concat(S.common().path,"/edit")},"Edit"),this.props.gym.walls.map(function(t){return l.a.createElement("div",{key:t.id},l.a.createElement(b.a,{to:"".concat(S.common().path,"/wall/").concat(t.id)},l.a.createElement("p",null,"id: ",t.id),l.a.createElement("p",null,"name: ",t.name),l.a.createElement("p",null,"difficulty: ",t.difficulty),l.a.createElement("p",null,"location: ",t.location),l.a.createElement("p",null,"date: ",t.date),l.a.createElement("p",null,"setter: ",t.setter),l.a.createElement("p",null,"color: ",t.color),l.a.createElement("p",null,"status: ",t.active?"active":"retired")),l.a.createElement("p",null,"climbed:"," ",l.a.createElement("input",e.checkboxProps(t.id))))})))}}]),t}(r.Component),z=l.a.createRef();function H(e){e.preventDefault();var t=z.current;if(null!==t){var n=t.files;if(n){var a,r=n[0],l=r.type.split("/")[0];if(-1===["image","video"].indexOf(l))return alert("invalid file");S.req("/get_gcs_key").then(function(e){return e.json()}).then(function(e){a=e.token;var t=e.folder,n=e.bucket,l="".concat(t,"/").concat((new Date).getTime(),"_").concat(r.name),c="https://www.googleapis.com/upload/storage/v1/b/".concat(n,"/o?uploadType=media&name=").concat(l);return fetch(c,{method:"POST",body:r,headers:{Authorization:"Bearer ".concat(a),"Content-Type":r.type}})}).then(function(e){return e.json()}).then(function(e){return S.req("/".concat(S.common().path,"/upload"),"POST",{gcs_path:e.name,gcs_id:e.id,mime:r.type,size:r.size,gcs_key:a})}).then(S.refresh)}}}var R=function(e){return l.a.createElement("div",null,l.a.createElement("p",null,"Media"),l.a.createElement("br",null),void 0===S.common().user.id?l.a.createElement("p",null,"Create an account and become verified to upload media."):S.common().user.is_verified?l.a.createElement("div",null,l.a.createElement("p",null,"New Media"),l.a.createElement("div",null,l.a.createElement("input",{ref:z,type:"file",name:"upload"}),l.a.createElement("input",{type:"submit",onClick:H}))):l.a.createElement("p",null,"Email climb.nomorerice@gmail.com to become verified to upload media."),l.a.createElement("div",null,e.media.map(function(e){return l.a.createElement("div",{key:e.id},l.a.createElement("p",null,"id: ",e.id),l.a.createElement("p",null,"mime: ",e.mime),function(e){if(e.data){if("video"===e.mime){var t=encodeURIComponent("https://www.facebook.com".concat(e.data));return l.a.createElement("iframe",{src:"https://www.facebook.com/plugins/video.php?href=".concat(t),width:e.width,height:e.height,style:{border:"none",overflow:"hidden"},scrolling:"no",allowFullScreen:!0})}return"image"===e.mime?l.a.createElement("img",{src:e.data}):l.a.createElement("pre",null,e.data)}return l.a.createElement("p",null,"received - handling")}(e))})))};var Z=function(e){return l.a.createElement("div",null,l.a.createElement("p",null,"id: ",e.wall.id),l.a.createElement("p",null,"name: ",e.wall.name),l.a.createElement("p",null,"difficulty: ",e.wall.difficulty),l.a.createElement("p",null,"location: ",e.wall.location),l.a.createElement("p",null,"date: ",e.wall.date),l.a.createElement("p",null,"setter: ",e.wall.setter),l.a.createElement("p",null,"color: ",e.wall.color),l.a.createElement("p",null,"status: ",e.wall.active?"active":"retired"),l.a.createElement(R,{media:e.wall.media}))},F={id:0,name:"",difficulty:"",location:"",date:"",setter:"",color:"",active:!1},K=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).submit=function(e){e.preventDefault(),S.req("/gym/".concat(n.props.gym_path,"/new_wall"),"POST",n.state).then(function(){return n.setState(F)}).then(S.refresh)},n.state=F,n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"New Wall"),l.a.createElement("p",null,"name: ",l.a.createElement("input",S.input(this,"name"))),l.a.createElement("p",null,"difficulty: ",l.a.createElement("input",S.input(this,"difficulty"))),l.a.createElement("p",null,"location: ",l.a.createElement("input",S.input(this,"location"))),l.a.createElement("p",null,"date: ",l.a.createElement("input",S.input(this,"date"))),l.a.createElement("p",null,"setter: ",l.a.createElement("input",S.input(this,"setter"))),l.a.createElement("p",null,"color: ",l.a.createElement("input",S.input(this,"color"))),l.a.createElement("p",null,"active:"," ",l.a.createElement("input",S.input(this,"active",y.Checkbox))),l.a.createElement("input",{type:"submit",onClick:this.submit}))}}]),t}(r.Component),Y=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).submit=function(e){e.preventDefault();var t="/gym/".concat(n.props.gym_path,"/wall/").concat(n.props.id,"/edit");S.req(t,"POST",n.state).then(S.refresh)},n.state=Object.assign({},e),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"id: ",this.props.id),l.a.createElement("p",null,"name: ",l.a.createElement("input",S.input(this,"name"))),l.a.createElement("p",null,"difficulty: ",l.a.createElement("input",S.input(this,"difficulty"))),l.a.createElement("p",null,"location: ",l.a.createElement("input",S.input(this,"location"))),l.a.createElement("p",null,"date: ",l.a.createElement("input",S.input(this,"date"))),l.a.createElement("p",null,"setter: ",l.a.createElement("input",S.input(this,"setter"))),l.a.createElement("p",null,"color: ",l.a.createElement("input",S.input(this,"color"))),l.a.createElement("p",null,"active:"," ",l.a.createElement("input",S.input(this,"active",y.Checkbox))),l.a.createElement("input",{type:"submit",onClick:this.submit}))}}]),t}(r.Component),$=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).submit=function(e){e.preventDefault(),S.req("/gym/".concat(n.props.gym.path,"/edit"),"POST",n.state).then(S.refresh)},n.state=Object.assign({},e.gym),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("p",null,"name: ",l.a.createElement("input",S.input(this,"name"))),l.a.createElement("p",null,"description:"," ",l.a.createElement("textarea",S.input(this,"description"))),l.a.createElement("input",{type:"submit",onClick:this.submit})),l.a.createElement("div",null,l.a.createElement("p",null,"Walls"),l.a.createElement("br",null),l.a.createElement(K,{gym_path:this.props.gym.path}),this.props.gym.walls.map(function(t){return l.a.createElement(Y,Object.assign({gym_path:e.props.gym.path,key:t.id},t))})))}}]),t}(r.Component),Q=n(21),V=n.n(Q),X={id:0,name:"",path:"",description:""},ee=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).submit=function(e){S.req("/admin/new_gym","POST",n.state).then(function(){return n.setState(X)}).then(S.refresh),e.preventDefault()},n.state=X,n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(J.a.bubble," ").concat(V.a.new_gym)},l.a.createElement("h3",null,"New Gym"),l.a.createElement("p",null,"path:"," ",l.a.createElement("input",S.input(this,"path",y.Text))),l.a.createElement("p",null,"name:"," ",l.a.createElement("input",S.input(this,"name",y.Text))),l.a.createElement("p",null,"description: ",l.a.createElement("textarea",S.input(this,"description"))),l.a.createElement("input",{type:"submit",onClick:this.submit}))}}]),t}(r.Component),te=n(22),ne=n.n(te);var ae=function(e){return l.a.createElement("div",null,l.a.createElement(S.Title,{title:"The Climbing App"}),l.a.createElement("div",{className:ne.a.gyms},e.gyms.map(function(e){return l.a.createElement("div",{key:e.id,className:J.a.bubble},l.a.createElement(b.a,{to:"/gym/".concat(e.path)},l.a.createElement("h3",null,e.name),l.a.createElement("p",null,e.description)))})),S.common().user.is_admin&&l.a.createElement(ee,null))},re=n(23),le=n.n(re);var ce=function(e){return l.a.createElement("div",null,l.a.createElement(S.Title,{title:"Latest Users"}),l.a.createElement("div",{className:le.a.users},e.users.map(function(e){return l.a.createElement("div",{key:e.id,className:J.a.bubble},l.a.createElement(b.a,{to:"/user/".concat(e.id)},l.a.createElement("p",null,"id: ",e.id),l.a.createElement("p",null,"name: ",e.name),l.a.createElement("p",null,"email: ",e.email),l.a.createElement("p",null,"timestamp: ",e.timestamp),l.a.createElement("img",{src:e.image})))})))},ie=n(24),oe=n.n(ie),ue=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).state=Object.assign({},e.user),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"checkboxProps",value:function(e){var t=this,n=Object.assign({},this.state),a=S.input(this,e,y.Checkbox),r=a.onChange,l=!S.common().user.is_admin;return Object.assign(a,{onChange:function(e){var a="/admin/user/".concat(t.props.user.id,"/edit"),l=r(e);return S.req(a,"POST",l).then(S.unready).catch(function(e){t.setState(n),S.err(e)}),l},disabled:l})}},{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(J.a.bubble," ").concat(oe.a.profile)},l.a.createElement(S.Title,{title:this.props.user.name}),l.a.createElement("div",null,l.a.createElement("p",null,this.props.user.name),l.a.createElement("img",{src:this.props.user.image})),l.a.createElement("div",null,l.a.createElement("p",null,"is admin: ",l.a.createElement("input",this.checkboxProps("is_admin"))),l.a.createElement("p",null,"is verified:"," ",l.a.createElement("input",this.checkboxProps("is_verified")))))}}]),t}(r.Component);function me(e,t){return{exact:!0,path:e,render:function(e){return S.common().path===encodeURI(e.location.pathname)&&t(e.match.params)}}}var se=function(e){return l.a.createElement("div",null,l.a.createElement(U.a,null,l.a.createElement(W.a,me("/",function(){return l.a.createElement(ae,{gyms:e.gyms})})),l.a.createElement(W.a,me("/admin/user/latest",function(){return l.a.createElement(ce,{users:e.users})})),l.a.createElement(W.a,me("/user/:user_id",function(){return l.a.createElement(ue,{user:e.user})})),l.a.createElement(W.a,me("/gym/:gym_path",function(){return l.a.createElement(L,{gym:e.gym})})),l.a.createElement(W.a,me("/gym/:gym_path/edit",function(){return l.a.createElement($,{gym:e.gym})})),l.a.createElement(W.a,me("/gym/:gym_path/wall/:wall_id",function(){return l.a.createElement(Z,{wall:e.wall})}))))};var pe=function(e){return l.a.createElement("div",null,l.a.createElement(M,null),l.a.createElement(se,e))},de=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e)))._refresh=function(e){var t=e===S.unready_o;return console.log("refresh",t,n.props.history.location.pathname),t&&n.setState({ready:!1}),S.req("".concat(n.props.history.location.pathname)).then(function(e){return e.json()}).then(function(e){return n.setState(Object.assign({ready:!0},e)),e})},n._common=function(){return n.state.common},n.state={ready:!1},S.setApp(Object(f.a)(Object(f.a)(n))),n.props.history.listen(S.refresh),n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){S.refresh()}},{key:"render",value:function(){return this.state.ready?l.a.createElement(pe,this.state):null}}]),t}(r.Component),he=Object(E.a)(de),fe=console.log;console.log=function(){var e=Array.from(arguments);return fe.apply(void 0,Object(a.a)(e)),e[0]},i.a.render(l.a.createElement(u.a,null,l.a.createElement(he,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[29,2,1]]]);
//# sourceMappingURL=main.9d308e32.chunk.js.map