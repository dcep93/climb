(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){e.exports={bubble:"globals_bubble__2iKJc",inline:"globals_inline__oEJv6",flex:"globals_flex__3XGsp",margin:"globals_margin__3fqZc",padding:"globals_padding__3NnhQ",main:"globals_main__2uw_J",vertical_space_10:"globals_vertical_space_10__273Cj",vertical_space_20:"globals_vertical_space_20__3kQ7D",text_align:"globals_text_align__3Cv2t"}},15:function(e,t,a){e.exports={profile:"Profile_profile__36MGf",profile_pic:"Profile_profile_pic__3pYRa"}},18:function(e,t,a){e.exports={profile_pic:"Media_profile_pic__3YdOs",video_div:"Media_video_div__3Q2Yf",video:"Media_video__FLVHK",image:"Media_image__eUwmt"}},22:function(e,t,a){e.exports={align_end:"Auth_align_end__2AnBq",g_sign_in:"Auth_g_sign_in__2_TB9"}},23:function(e,t,a){e.exports={header:"Header_header__1HgZT",icon:"Header_icon__vHi87"}},24:function(e,t,a){e.exports={picture_div:"GymProblems_picture_div__2qdMV",picture:"GymProblems_picture__cBfHP"}},25:function(e,t,a){e.exports={new_problem_container:"NewProblem_new_problem_container__GOaJt",new_problem:"NewProblem_new_problem__3zCKq"}},26:function(e,t,a){e.exports={gym:"Gyms_gym__1rDWb",gyms:"Gyms_gyms__1axa3",gyms_parent:"Gyms_gyms_parent__hj_Hs"}},30:function(e,t,a){e.exports={filters:"Filters_filters__Ro1fw"}},31:function(e,t,a){e.exports={new_gym:"GymsAdmin_new_gym__3lGYi"}},35:function(e,t,a){e.exports=a(63)},63:function(e,t,a){"use strict";a.r(t);var n=a(34),r=a(0),l=a.n(r),i=a(29),c=a.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,m,s=a(67),u=(a(41),a(3)),p=a(7),d=a(5),b=a(4),h=a(6),f=a(14),E=a(68),v=a(65),g=a(11),_=a.n(g),y=a(13);!function(e){e.Text="text",e.Checkbox="checkbox"}(m||(m={}));var O,j=(o={},Object(y.a)(o,m.Text,"value"),Object(y.a)(o,m.Checkbox,"checked"),o),w=console.error;function k(e){return O._refresh(e)}var N=Object();var x=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){document.title=a.props.title},a.render=function(){return null},a}return Object(h.a)(t,e),t}(r.Component),C={req:function(e,t,a){return fetch("/api".concat(e),{method:t,body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.status>=400)throw e;return e})},input:function(e,t,a){var n;if(void 0===e.state[t])throw new Error("bad name - ".concat(t," - ").concat(JSON.stringify(e.state)));var r=void 0===a?"value":j[a];return n={name:t,type:a},Object(y.a)(n,r,e.state[t]),Object(y.a)(n,"onChange",function(t){var a=t.target,n=Object(y.a)({},t.target.name,a[r]);return e.setState(n),n}),n},err:w,refresh:k,common:function(){return O._common()},setApp:function(e){O=e},unready:function(){k(N)},unready_o:N,inputDate:function(e){return(void 0===e?new Date:new Date(e)).toISOString().slice(0,10)},Title:x,formatDate:function(e){return new Date(e).toDateString()}},S=a(1),P=a.n(S),T=a(22),D=a.n(T);function A(e){if(!q()){var t=e.Zi.id_token;C.req("/auth/login","POST",{id_token:t}).then(C.unready)}}function B(){var e=window.gapi.auth2.getAuthInstance().signOut(),t=C.req("/auth/logout","POST");Promise.all([e,t]).then(C.unready)}function q(){return void 0!==C.common().user.id}var z=function(){if(void 0===window.onSignIn){var e=document.getElementById("google-platform-preload"),t=document.createElement("script");t.src=e.href,document.head.appendChild(t),window.onSignIn=A}return l.a.createElement("div",{className:D.a.align_end},l.a.createElement("meta",{name:"google-signin-client_id",content:C.common().google_signin_client_id}),l.a.createElement("div",{hidden:q(),id:"sign-in-button",className:"g-signin2 ".concat(D.a.g_sign_in),"data-onsuccess":"onSignIn"}),q()&&l.a.createElement("div",null,l.a.createElement(_.a,{onClick:B,variant:"primary"},"Sign out"),l.a.createElement(v.a,{to:"/user/".concat(C.common().user.id),className:P.a.margin},"Profile")))},F=a(23),G=a.n(F);var M,I=function(){return l.a.createElement("div",{className:"".concat(G.a.header," ").concat(P.a.bubble)},l.a.createElement(v.a,{to:"/"},l.a.createElement("img",{src:"/favicon.ico",className:G.a.icon})),C.common().user.is_admin&&l.a.createElement(v.a,{to:"/admin/user/latest",className:P.a.margin},"Latest Users"),l.a.createElement(z,null))},J=a(66),L=a(62),H=a(30),R=a.n(H);!function(e){e.difficulty="difficulty",e.location="location",e.color="color",e.setter="setter"}(M||(M={}));var U=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).state={name:"",difficulty:"",location:"",date:"",active:"",color:"",setter:""},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"inputProperties",value:function(e){var t=this,a=C.input(this,e),n=a.onChange;return Object.assign(a,{onChange:function(e){var a=n(e);return t.props.updateFilter(a),a}})}},{key:"selectAction",value:function(e){this.props.updateFilter(Object(y.a)({},e.target.name,e.target.value))}},{key:"getSelectOptions",value:function(e){return this.props.problemsBank.map(function(t){return t[e]}).sort()}},{key:"selectComponent",value:function(e){return l.a.createElement("select",{name:e,onChange:this.selectAction.bind(this)},l.a.createElement("option",{value:""},"All"),this.getSelectOptions(e).map(function(e){return l.a.createElement("option",{key:e},e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:P.a.bubble},l.a.createElement("h4",null,"Filters"),l.a.createElement("div",{className:"".concat(R.a.filters," ").concat(P.a.flex)},l.a.createElement("div",null,l.a.createElement("p",null,"Name"),l.a.createElement("input",Object.assign({},this.inputProperties("name"),{size:7}))),l.a.createElement("div",null,l.a.createElement("p",null,"Climbed"),l.a.createElement("select",{name:"climbed",onChange:this.selectAction.bind(this)},l.a.createElement("option",{value:""},"All"),l.a.createElement("option",{value:"true"},"yes"),l.a.createElement("option",{value:"false"},"no"))),l.a.createElement("div",null,l.a.createElement("p",null,"Difficulty"),this.selectComponent(M.difficulty)),l.a.createElement("div",null,l.a.createElement("p",null,"Location"),this.selectComponent(M.location)),l.a.createElement("div",null,l.a.createElement("p",null,"Status"),l.a.createElement("select",{name:"active",onChange:this.selectAction.bind(this)},l.a.createElement("option",{value:""},"All"),l.a.createElement("option",{value:"true"},"Active"),l.a.createElement("option",{value:"false"},"Retired"))),l.a.createElement("div",null,l.a.createElement("p",null,"Color"),this.selectComponent(M.color)),l.a.createElement("div",null,l.a.createElement("p",null,"Setter"),this.selectComponent(M.setter))))}}],[{key:"shouldDisplayProblem",value:function(e,a,n){return null===a||(void 0===a.name||-1!==e.name.toLowerCase().indexOf(a.name.toLowerCase()))&&((!Boolean(a.climbed)||"true"===a.climbed!==(-1===n.indexOf(e.id)))&&(!t.shouldFilterSelect(M.difficulty,e,a)&&(!t.shouldFilterSelect(M.location,e,a)&&((!Boolean(a.active)||Boolean(e.active)!==("true"===a.active))&&(!t.shouldFilterSelect(M.color,e,a)&&!t.shouldFilterSelect(M.setter,e,a))))))}},{key:"shouldFilterSelect",value:function(e,t,a){return void 0!==a[e]&&""!==a[e]&&a[e]!==t[e]}}]),t}(r.Component),Y=a(24),K=a.n(Y),Q=function(e){function t(e){var a;Object(u.a)(this,t),a=Object(d.a)(this,Object(b.a)(t).call(this,e));var n={};return e.gym.problems.forEach(function(t){n[t.id]=-1!==e.gym.climbed_problems.indexOf(t.id)}),a.state=n,a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=C.input(this,e.toString(),m.Checkbox),n=a.onChange;return Object.assign(a,{onChange:function(a){var r=Object.assign({},t.state),l=n(a);return C.req("/gym/".concat(t.props.gym.path,"/problem/").concat(e,"/climb"),"POST",{climbed:l[e]}).then(C.refresh).catch(function(e){t.setState(r),C.err(e)}),l}})}},{key:"renderProblem",value:function(e){return l.a.createElement(v.a,{to:"".concat(this.props.gym.path,"/problem/").concat(e.id),key:e.id,className:"".concat(P.a.bubble," ").concat(P.a.flex)},l.a.createElement("div",null,l.a.createElement("h4",null,"".concat(e.name," (").concat(e.id,")")),l.a.createElement("p",null,l.a.createElement("label",null,l.a.createElement("span",null,e.difficulty," "),l.a.createElement("input",this.checkboxProps(e.id)))),l.a.createElement("p",null,C.formatDate(e.date)),l.a.createElement("p",null,e.location,Boolean(e.active)&&l.a.createElement("span",null," (retired)")),l.a.createElement("p",null,e.color,Boolean(e.setter)&&l.a.createElement("span",null," - set by ",e.setter))),Boolean(e.picture)&&l.a.createElement("div",{className:K.a.picture_div},l.a.createElement("img",{className:K.a.picture,src:e.picture})))}},{key:"render",value:function(){var e=this.props.gym.problems.filter(this.props.shouldDisplayProblem);return e.length>0?l.a.createElement("div",{className:P.a.flex},e.map(this.renderProblem.bind(this))):l.a.createElement("div",{className:P.a.text_align},l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat(P.a.inline)},"No problems match your filter"))}}]),t}(r.Component),W=function(e){function t(e){var a;Object(u.a)(this,t),a=Object(d.a)(this,Object(b.a)(t).call(this,e));var n={};return e.gym.pictures.forEach(function(e){n[e.problem_id]=e.picture}),e.gym.problems.forEach(function(e){e.picture=n[e.id]}),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"updateFilter",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(C.Title,{title:this.props.gym.name}),l.a.createElement("div",{className:"".concat(P.a.inline," ").concat(P.a.bubble)},l.a.createElement("h2",null,this.props.gym.name),l.a.createElement("div",null,this.props.gym.description),C.common().user.is_verified&&l.a.createElement(v.a,{to:"".concat(this.props.gym.path,"/edit")},"Edit")),l.a.createElement(U,{problemsBank:this.props.gym.problems,updateFilter:this.updateFilter.bind(this)}),l.a.createElement(Q,Object.assign({},this.props,{shouldDisplayProblem:function(t){return U.shouldDisplayProblem(t,e.state,e.props.gym.climbed_problems)}})))}}]),t}(r.Component),Z=a(18),V=a.n(Z),X=a(15),$=a.n(X),ee=l.a.createRef();function te(e){var t={};return e.users.forEach(function(e){t[e.id]=e}),l.a.createElement("div",null,l.a.createElement("div",null,e.media.map(function(e){return l.a.createElement("div",{key:e.id,className:P.a.bubble},l.a.createElement(v.a,{className:P.a.margin,to:"/user/1"},l.a.createElement("div",null,l.a.createElement("img",{className:"".concat($.a.profile_pic," ").concat(P.a.inline),src:t[e.user_id].image}),l.a.createElement("p",{className:"".concat(P.a.inline," ").concat(P.a.margin)},t[e.user_id].name," (",e.user_id,")"))),function(e){if(e.data){if("video"===e.mime){var t=encodeURIComponent("https://www.facebook.com".concat(e.data)),a=100*e.height/e.width;return l.a.createElement("div",{className:V.a.video_div,style:{paddingTop:"".concat(a,"%")}},l.a.createElement("iframe",{className:V.a.video,src:"https://www.facebook.com/plugins/video.php?href=".concat(t),width:e.width,height:e.height,style:{border:"none"},scrolling:"no",allowFullScreen:!0}),l.a.createElement("div",{className:P.a.vertical_space_10}))}return"image"===e.mime?l.a.createElement("img",{className:V.a.image,src:e.data}):l.a.createElement("pre",null,e.data)}return l.a.createElement("p",null,"received - handling")}(e))})))}te.newMedia=function(e,t){return void 0===C.common().user.id?l.a.createElement("p",null,"Login and become verified to upload media."):C.common().user.is_verified?l.a.createElement("div",null,l.a.createElement("div",{className:P.a.bubble},l.a.createElement("p",null,"New Media"),l.a.createElement("div",null,l.a.createElement("input",{ref:ee,type:"file",name:"upload"}),l.a.createElement("br",null),l.a.createElement(_.a,{onClick:function(){return function(e,t){var a=ee.current;if(null!==a){var n=a.files;if(n){var r,l=n[0],i=l.type.split("/")[0];if(-1===["image","video"].indexOf(i))return alert("invalid file");C.req("/get_gcs_key").then(function(e){return e.json()}).then(function(e){r=e.token;var t=e.folder,a=e.bucket,n="".concat(t,"/").concat((new Date).getTime(),"_").concat(l.name),i="https://www.googleapis.com/upload/storage/v1/b/".concat(a,"/o?uploadType=media&name=").concat(n);return fetch(i,{method:"POST",body:l,headers:{Authorization:"Bearer ".concat(r),"Content-Type":l.type}})}).then(function(e){return e.json()}).then(function(a){return C.req("/gym/".concat(e,"/problem/").concat(t,"/upload"),"POST",{gcs_path:a.name,gym_path:e,gcs_id:a.id,mime:l.type,size:l.size,gcs_key:r})}).then(C.refresh)}}}(e,t)}},"Submit")))):l.a.createElement("p",null,"Email climb.nomorerice@gmail.com with a link to your profile to become verified to upload media.")};var ae=te;var ne=function(e){return l.a.createElement("div",null,l.a.createElement("div",{className:P.a.flex},l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat(P.a.inline)},l.a.createElement("p",null,e.problem.name," (",e.problem.id,")"),l.a.createElement("p",null,l.a.createElement(v.a,{to:"/gym/".concat(e.problem.gym_path)},"To ",e.problem.gym_name)),l.a.createElement("p",null,l.a.createElement("label",null,l.a.createElement("span",null,e.problem.difficulty," "),l.a.createElement("input",{type:"checkbox"}))),l.a.createElement("p",null,C.formatDate(e.problem.date)),l.a.createElement("p",null,e.problem.location,Boolean(e.problem.active)&&l.a.createElement("span",null," (retired)")),l.a.createElement("p",null,e.problem.color,Boolean(e.problem.setter)&&l.a.createElement("span",null," - set by ",e.problem.setter))),ae.newMedia(e.problem.gym_path,e.problem.id)),l.a.createElement(ae,{gym_path:e.problem.gym_path,problem_id:e.problem.id,media:e.problem.media,users:e.problem.users}))},re=a(25),le=a.n(re),ie={id:0,name:"",difficulty:"",location:"",date:"",setter:"",color:"",active:!0,gym_path:""},ce=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).submit=function(){C.req("/gym/".concat(a.props.gym_path,"/new_problem"),"POST",a.state).then(function(){return a.setState(ie)}).then(C.refresh)},a.state=Object.assign({},ie,{date:C.inputDate()}),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat(P.a.inline," ").concat(le.a.new_problem_container)},l.a.createElement("p",null,"New Problem"),l.a.createElement("div",{className:le.a.new_problem},l.a.createElement("div",null,"name",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"name"),{size:11}))),l.a.createElement("div",null,"difficulty",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"difficulty"),{size:5}))),l.a.createElement("br",null),l.a.createElement("div",null,"location",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"location"),{size:10}))),l.a.createElement("div",null,"color",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"color"),{size:7}))),l.a.createElement("div",null,"setter",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"setter"),{size:8}))),l.a.createElement("div",null,"date",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"date"),{type:"date",min:"2019-01-01",max:"2030-12-31"})))),l.a.createElement("div",{className:P.a.vertical_space_20}),l.a.createElement(_.a,{onClick:this.submit},"Submit"))}}]),t}(r.Component),oe=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).submit=function(){var e="/gym/".concat(a.props.gym_path,"/problem/").concat(a.props.id,"/edit");C.req(e,"POST",a.state).then(C.refresh)},a.state=Object.assign({},e,{date:C.inputDate(e.date)}),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:P.a.bubble},l.a.createElement("div",null,l.a.createElement("label",null,l.a.createElement("span",null,"id: ",this.props.id," - active "),l.a.createElement("input",C.input(this,"active",m.Checkbox)))),l.a.createElement("div",{className:P.a.flex},l.a.createElement("div",{className:P.a.padding},"name",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"name"),{size:10}))),l.a.createElement("div",{className:P.a.padding},"difficulty",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"difficulty"),{size:4}))),l.a.createElement("div",{className:P.a.padding},"location",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"location"),{size:9}))),l.a.createElement("div",{className:P.a.padding},"color",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"color"),{size:6}))),l.a.createElement("div",{className:P.a.padding},"setter",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"setter"),{size:7}))),l.a.createElement("div",{className:P.a.padding},"date",l.a.createElement("br",null),l.a.createElement("input",Object.assign({},C.input(this,"date"),{type:"date",min:"2019-01-01",max:"2030-12-31"}))),l.a.createElement("div",null,l.a.createElement(_.a,{onClick:this.submit},"Submit"))))}}]),t}(r.Component),me=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).submit=function(){C.req("/gym/".concat(a.props.gym.path,"/edit"),"POST",a.state).then(C.refresh)},a.state=Object.assign({},e.gym),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(C.Title,{title:"Edit: ".concat(this.props.gym.name)}),l.a.createElement("div",null,l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat(P.a.inline)},l.a.createElement(v.a,{to:"/gym/".concat(this.props.gym.path)},"To Gym Page"),l.a.createElement("div",{className:P.a.vertical_space_20}),l.a.createElement("p",null,"name",l.a.createElement("br",null),l.a.createElement("input",C.input(this,"name"))),l.a.createElement("p",null,"description",l.a.createElement("br",null),l.a.createElement("textarea",C.input(this,"description"))),l.a.createElement(_.a,{onClick:this.submit,variant:"primary"},"Edit")),l.a.createElement("br",null),l.a.createElement(ce,{gym_path:this.props.gym.path})),l.a.createElement("div",{className:P.a.flex},this.props.gym.problems.map(function(t){return l.a.createElement(oe,Object.assign({key:t.id,gym_path:e.props.gym.path},t))})))}}]),t}(r.Component),se=a(31),ue=a.n(se),pe={id:0,name:"",path:"",description:""},de=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).submit=function(){C.req("/admin/new_gym","POST",a.state).then(function(){return a.setState(pe)}).then(C.refresh).catch(function(e){return e.text()}).then(function(e){return alert(e.split("\n")[0])})},a.state=pe,a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat(P.a.margin," ").concat(ue.a.new_gym)},l.a.createElement("h3",null,"New Gym"),l.a.createElement("p",null,"path",l.a.createElement("br",null),l.a.createElement("input",C.input(this,"path",m.Text))),l.a.createElement("p",null,"name",l.a.createElement("br",null),l.a.createElement("input",C.input(this,"name",m.Text))),l.a.createElement("p",null,"description",l.a.createElement("br",null),l.a.createElement("textarea",C.input(this,"description"))),l.a.createElement(_.a,{onClick:this.submit,variant:"primary"},"Submit"))}}]),t}(r.Component),be=a(26),he=a.n(be);var fe=function(e){return l.a.createElement("div",null,l.a.createElement(C.Title,{title:"The Climbing App"}),l.a.createElement("div",{className:"".concat(P.a.flex," ").concat(he.a.gyms_parent)},l.a.createElement("div",{className:P.a.flex},e.gyms.map(function(e){return l.a.createElement("div",{key:e.id,className:"".concat(P.a.bubble," ").concat(he.a.gym)},l.a.createElement(v.a,{to:"/gym/".concat(e.path)},l.a.createElement("h3",null,e.name),l.a.createElement("p",null,e.description)))})),C.common().user.is_admin&&l.a.createElement(de,null)))},Ee=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e))).state=Object.assign({},e.user),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=Object.assign({},this.state),n=C.input(this,e,m.Checkbox),r=n.onChange,l=!C.common().user.is_admin;return Object.assign(n,{onChange:function(e){var n="/admin/user/".concat(t.props.user.id,"/edit"),l=r(e);return C.req(n,"POST",l).then(C.unready).catch(function(e){t.setState(a),C.err(e)}),l},disabled:l})}},{key:"permissionDiv",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"is admin: ",l.a.createElement("input",this.checkboxProps("is_admin"))),l.a.createElement("p",null,"is verified:"," ",l.a.createElement("input",this.checkboxProps("is_verified"))))}},{key:"render",value:function(){return l.a.createElement("div",{className:"".concat(P.a.bubble," ").concat($.a.profile)},l.a.createElement(C.Title,{title:this.props.user.name}),l.a.createElement("div",null,t.profileDiv(this.props.user),C.common().user.is_admin&&this.permissionDiv()))}}],[{key:"profileDiv",value:function(e){return l.a.createElement("div",null,l.a.createElement("p",null,e.name," (",e.id,")"),l.a.createElement("p",null,e.email),l.a.createElement("p",null,new Date(e.timestamp).toLocaleString()),l.a.createElement("img",{className:$.a.profile_pic,src:e.image}))}}]),t}(r.Component);var ve=function(e){return l.a.createElement("div",null,l.a.createElement(C.Title,{title:"Latest Users"}),l.a.createElement("div",{className:P.a.flex},e.users.map(function(e){return l.a.createElement("div",{key:e.id,className:P.a.bubble},l.a.createElement(v.a,{to:"/user/".concat(e.id)},Ee.profileDiv(e)))})))};function ge(e,t){return{exact:!0,path:e,render:function(e){return C.common().path===encodeURI(e.location.pathname)&&t(e.match.params)}}}var _e=function(e){return l.a.createElement("div",null,l.a.createElement(J.a,null,l.a.createElement(L.a,ge("/",function(){return l.a.createElement(fe,{gyms:e.gyms})})),l.a.createElement(L.a,ge("/admin/user/latest",function(){return l.a.createElement(ve,{users:e.users})})),l.a.createElement(L.a,ge("/user/:user_id",function(){return l.a.createElement(Ee,{user:e.user})})),l.a.createElement(L.a,ge("/gym/:gym_path",function(){return l.a.createElement(W,{gym:e.gym})})),l.a.createElement(L.a,ge("/gym/:gym_path/edit",function(){return l.a.createElement(me,{gym:e.gym})})),l.a.createElement(L.a,ge("/gym/:gym_path/problem/:problem_id",function(){return l.a.createElement(ne,{problem:e.problem})}))))};var ye=function(e){return l.a.createElement("div",{className:P.a.main},l.a.createElement(I,null),l.a.createElement(_e,e))},Oe=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(b.a)(t).call(this,e)))._refresh=function(e){var t=e===C.unready_o;return console.log("refresh",t,a.props.history.location.pathname),t&&location.reload(),C.req("".concat(a.props.history.location.pathname)).then(function(e){return e.json()}).then(function(e){return a.setState(Object.assign({ready:!0},e)),e})},a._common=function(){return a.state.common},a.state={ready:!1},C.setApp(Object(f.a)(Object(f.a)(a))),a.props.history.listen(C.refresh),a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){C.refresh()}},{key:"render",value:function(){return this.state.ready?l.a.createElement(ye,this.state):null}}]),t}(r.Component),je=Object(E.a)(Oe),we=console.log;console.log=function(){var e=Array.from(arguments);return we.apply(void 0,Object(n.a)(e)),e[0]},c.a.render(l.a.createElement(s.a,null,l.a.createElement(je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,2,1]]]);
//# sourceMappingURL=main.be859c28.chunk.js.map