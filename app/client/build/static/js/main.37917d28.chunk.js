(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){e.exports={bubble:"globals_bubble__2iKJc",inline:"globals_inline__oEJv6",flex:"globals_flex__3XGsp",margin:"globals_margin__3fqZc",padding:"globals_padding__3NnhQ",main:"globals_main__2uw_J",align_center:"globals_align_center__Am27K",vertical_space_10:"globals_vertical_space_10__273Cj",vertical_space_20:"globals_vertical_space_20__3kQ7D",text_align:"globals_text_align__3Cv2t"}},14:function(e,t,a){e.exports={profile_pic:"Media_profile_pic__3D8xg",video_div:"Media_video_div__39cN9",video:"Media_video__3bwYS",image:"Media_image__3EY7D",link_info:"Media_link_info__QbnS3"}},16:function(e,t,a){e.exports={profile:"Profile_profile__36MGf",profile_pic:"Profile_profile_pic__3pYRa"}},22:function(e,t,a){e.exports={align_end:"Auth_align_end__2AnBq",g_sign_in:"Auth_g_sign_in__2_TB9"}},23:function(e,t,a){e.exports={header:"Header_header__1HgZT",icon:"Header_icon__vHi87"}},24:function(e,t,a){e.exports={picture_div:"GymProblems_picture_div__3vl2q",picture:"GymProblems_picture__3lpYg"}},25:function(e,t,a){e.exports={new_problem_container:"NewProblem_new_problem_container__O1FQt",new_problem:"NewProblem_new_problem__QVZkH"}},26:function(e,t,a){e.exports={gym:"Gyms_gym__1rDWb",gyms:"Gyms_gyms__1axa3",gyms_parent:"Gyms_gyms_parent__hj_Hs"}},30:function(e,t,a){e.exports={filters:"Filters_filters__18lyb"}},31:function(e,t,a){e.exports={new_gym:"GymsAdmin_new_gym__3lGYi"}},35:function(e,t,a){e.exports=a(63)},63:function(e,t,a){"use strict";a.r(t);var n=a(34),i=a(0),r=a.n(i),l=a(29),c=a.n(l);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,s,m=a(67),u=(a(41),a(3)),p=a(7),d=a(5),h=a(4),b=a(6),v=a(15),f=a(68),E=a(65),g=a(9),_=a.n(g),y=a(13);!function(e){e.Text="text",e.Checkbox="checkbox"}(s||(s={}));var O,j=(o={},Object(y.a)(o,s.Text,"value"),Object(y.a)(o,s.Checkbox,"checked"),o),k=function(e,t,a){var n;if(void 0===e.state[t])throw new Error("bad name - ".concat(t," - ").concat(JSON.stringify(e.state)));var i=void 0===a?"value":j[a];return n={name:t,type:a},Object(y.a)(n,i,e.state[t]),Object(y.a)(n,"onChange",function(t){var a=t.target,n=Object(y.a)({},t.target.name,a[i]);return e.setState(n),n}),n};function w(e){return O._refresh(e)}var N=Object();var S=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).componentDidMount=function(){document.title=a.props.title},a.render=function(){return null},a}return Object(b.a)(t,e),t}(i.Component),x={req:function(e,t,a){return fetch("/api".concat(e),{method:t,body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.status>=400)throw e;return e})},input:k,refresh:w,common:function(){return O._common()},setApp:function(e){O=e},unready:function(){w(N)},unready_o:N,inputDate:function(e){return(void 0===e?new Date:new Date(e)).toISOString().slice(0,10)},Title:S,formatDate:function(e){return new Date(e).toDateString()},dateInput:function(e,t){var a=k(e,t);return Object.assign(a,{type:"date",min:"2019-01-01",max:"2030-12-31"})}},C=a(1),D=a.n(C),P=a(22),T=a.n(P);function A(e){if(!z()){var t=e.Zi.id_token;x.req("/auth/login","POST",{id_token:t}).then(x.unready)}}function q(){var e=window.gapi.auth2.getAuthInstance().signOut(),t=x.req("/auth/logout","POST");Promise.all([e,t]).then(x.unready)}function z(){return void 0!==x.common().user.id}var B=function(){if(void 0===window.onSignIn){var e=document.getElementById("google-platform-preload"),t=document.createElement("script");t.src=e.href,document.head.appendChild(t),window.onSignIn=A}return r.a.createElement("div",{className:T.a.align_end},r.a.createElement("meta",{name:"google-signin-client_id",content:x.common().google_signin_client_id}),r.a.createElement("div",{hidden:z(),id:"sign-in-button",className:"g-signin2 ".concat(T.a.g_sign_in),"data-onsuccess":"onSignIn"}),z()&&r.a.createElement("div",null,r.a.createElement(_.a,{onClick:q,variant:"primary"},"Sign out"),r.a.createElement(E.a,{to:"/user/".concat(x.common().user.id),className:D.a.margin},"Profile")))},I=a(23),F=a.n(I);var M,G=function(){return r.a.createElement("div",{className:"".concat(F.a.header," ").concat(D.a.bubble)},r.a.createElement(E.a,{to:"/"},r.a.createElement("img",{src:"/favicon.ico",className:F.a.icon})),x.common().user.is_admin&&r.a.createElement(E.a,{to:"/admin/user/latest",className:D.a.margin},"Latest Users"),r.a.createElement(B,null))},H=a(66),J=a(62),L=a(30),R=a.n(L);!function(e){e.difficulty="difficulty",e.location="location",e.color="color",e.setter="setter"}(M||(M={}));var Q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={name:"",difficulty:"",location:"",date:"",active:"",color:"",setter:"",climbed:""},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"inputProperties",value:function(e){var t=this,a=x.input(this,e),n=a.onChange;return Object.assign(a,{onChange:function(e){var a=n(e);return t.props.updateFilter(a),a}})}},{key:"selectAction",value:function(e){this.props.updateFilter(Object(y.a)({},e.target.name,e.target.value))}},{key:"getSelectOptions",value:function(e){return this.props.problemsBank.map(function(t){return t[e]}).sort()}},{key:"selectComponent",value:function(e){return r.a.createElement("select",{name:e,onChange:this.selectAction.bind(this)},r.a.createElement("option",{value:""},"All"),this.getSelectOptions(e).map(function(e){return r.a.createElement("option",{key:e},e)}))}},{key:"render",value:function(){return r.a.createElement("div",{className:D.a.bubble},r.a.createElement("h4",null,"Filters"),r.a.createElement("div",{className:"".concat(R.a.filters," ").concat(D.a.flex)},r.a.createElement("div",null,r.a.createElement("div",null,"Name"),r.a.createElement("input",Object.assign({},this.inputProperties("name"),{size:7}))),r.a.createElement("div",null,r.a.createElement("div",null,"Climbed"),r.a.createElement("select",{name:"climbed",onChange:this.selectAction.bind(this)},r.a.createElement("option",{value:""},"All"),r.a.createElement("option",{value:"true"},"yes"),r.a.createElement("option",{value:"false"},"no"))),r.a.createElement("div",null,r.a.createElement("div",null,"Difficulty"),this.selectComponent(M.difficulty)),r.a.createElement("div",null,r.a.createElement("div",null,"Location"),this.selectComponent(M.location)),r.a.createElement("div",null,r.a.createElement("div",null,"Status"),r.a.createElement("select",{name:"active",onChange:this.selectAction.bind(this)},r.a.createElement("option",{value:""},"All"),r.a.createElement("option",{value:"true"},"Active"),r.a.createElement("option",{value:"false"},"Retired"))),r.a.createElement("div",null,r.a.createElement("div",null,"Color"),this.selectComponent(M.color)),r.a.createElement("div",null,r.a.createElement("div",null,"Setter"),this.selectComponent(M.setter))))}}],[{key:"shouldDisplayProblem",value:function(e,a,n){return null===a||(void 0===a.name||-1!==e.name.toLowerCase().indexOf(a.name.toLowerCase()))&&((!Boolean(a.climbed)||"true"===a.climbed!==(-1===n.indexOf(e.id)))&&(!t.shouldFilterSelect(M.difficulty,e,a)&&(!t.shouldFilterSelect(M.location,e,a)&&((!Boolean(a.active)||Boolean(e.active)===("true"===a.active))&&(!t.shouldFilterSelect(M.color,e,a)&&!t.shouldFilterSelect(M.setter,e,a))))))}},{key:"shouldFilterSelect",value:function(e,t,a){return void 0!==a[e]&&""!==a[e]&&a[e]!==t[e]}}]),t}(i.Component),Y=a(24),U=a.n(Y),Z=function(e){function t(e){var a;Object(u.a)(this,t),a=Object(d.a)(this,Object(h.a)(t).call(this,e));var n={};return e.problems.forEach(function(t){n[t.id]=-1!==e.climbed_problems.indexOf(t.id)}),a.state=n,a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=x.input(this,e.toString(),s.Checkbox),n=a.onChange;return Object.assign(a,{onChange:function(a){var i=Object.assign({},t.state),r=n(a);return x.req("/gym/".concat(t.props.gym.path,"/problem/").concat(e,"/climb"),"POST",{climbed:r[e]}).then(x.refresh).catch(function(e){t.setState(i),console.error(e)}),r}})}},{key:"renderProblem",value:function(e){return r.a.createElement(E.a,{to:"".concat(this.props.gym.path,"/problem/").concat(e.id),key:e.id,className:"".concat(D.a.bubble," ").concat(D.a.flex)},r.a.createElement("div",null,r.a.createElement("h4",null,"".concat(e.name," (").concat(e.id,")")),r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("span",null,e.difficulty," "),r.a.createElement("input",this.checkboxProps(e.id)))),r.a.createElement("p",null,x.formatDate(e.date)),r.a.createElement("p",null,e.location,!Boolean(e.active)&&r.a.createElement("span",null," (retired)")),r.a.createElement("p",null,e.color,Boolean(e.setter)&&r.a.createElement("span",null," - set by ",e.setter))),Boolean(e.picture)&&r.a.createElement("div",{className:U.a.picture_div},r.a.createElement("img",{className:U.a.picture,src:e.picture})))}},{key:"render",value:function(){var e=this.props.problems.filter(this.props.shouldDisplayProblem);return e.length>0?r.a.createElement("div",{className:D.a.flex},e.map(this.renderProblem.bind(this))):r.a.createElement("div",{className:D.a.text_align},r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(D.a.inline)},"No problems match your filter"))}}]),t}(i.Component),W=function(e){function t(e){var a;Object(u.a)(this,t),a=Object(d.a)(this,Object(h.a)(t).call(this,e));var n={};return e.pictures.forEach(function(e){n[e.problem_id]=e.picture}),e.problems.forEach(function(e){e.picture=n[e.id]}),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"updateFilter",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(x.Title,{title:this.props.gym.name}),r.a.createElement("div",{className:"".concat(D.a.inline," ").concat(D.a.bubble)},r.a.createElement("h2",null,this.props.gym.name),r.a.createElement("div",null,this.props.gym.description),x.common().user.is_verified&&r.a.createElement(E.a,{to:"".concat(this.props.gym.path,"/edit")},"Edit")),r.a.createElement(Q,{problemsBank:this.props.problems,updateFilter:this.updateFilter.bind(this)}),r.a.createElement(Z,Object.assign({},this.props,{shouldDisplayProblem:function(t){return Q.shouldDisplayProblem(t,e.state,e.props.climbed_problems)}})))}}]),t}(i.Component),K=a(14),X=a.n(K);var V={keyById:function(e){var t={};return e.forEach(function(e){t[e.id]=e}),t},mediaData:function(e){if(e.data){if("video"===e.mime){var t=encodeURIComponent("https://www.facebook.com".concat(e.data)),a=100*e.height/e.width;return r.a.createElement("div",{className:X.a.video_div,style:{paddingTop:"".concat(a,"%")}},r.a.createElement("iframe",{className:X.a.video,src:"https://www.facebook.com/plugins/video.php?href=".concat(t),width:e.width,height:e.height,style:{border:"none"},scrolling:"no",allowFullScreen:!0}),r.a.createElement("div",{className:D.a.vertical_space_10}))}return"image"===e.mime?r.a.createElement("img",{className:X.a.image,src:e.data}):r.a.createElement("pre",null,e.data)}return r.a.createElement("p",null,"received - handling")}},$=a(16),ee=a.n($);var te=function(e){var t=V.keyById(e.users);return r.a.createElement("div",null,r.a.createElement("div",null,e.media.map(function(e){return r.a.createElement("div",{key:e.id,className:D.a.bubble},function(e,t){return r.a.createElement(E.a,{to:"/user/".concat(e.user_id)},r.a.createElement("div",{className:D.a.margin},r.a.createElement("img",{className:"".concat(ee.a.profile_pic," ").concat(D.a.inline),src:t[e.user_id].image}),r.a.createElement("div",{className:"".concat(D.a.inline," ").concat(X.a.link_info)},r.a.createElement("div",null,t[e.user_id].name," (",e.user_id,")"),r.a.createElement("div",null,x.formatDate(new Date(e.timestamp).toString())," (",e.id,")"))))}(e,t),V.mediaData(e))})))},ae=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).new_media_ref=r.a.createRef(),a.state={progress_log:[]},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return void 0===x.common().user.id?r.a.createElement("div",null,r.a.createElement("p",null,"Login and become verified to upload media.")):x.common().user.is_verified?r.a.createElement("div",null,r.a.createElement("p",null,"New Media"),r.a.createElement("div",{className:D.a.padding},r.a.createElement("input",{ref:this.new_media_ref,type:"file",name:"upload"}),r.a.createElement("div",{className:D.a.vertical_space_10}),r.a.createElement(_.a,{onClick:this.submitNewMedia.bind(this)},"Submit"),void 0!==this.state.progress&&r.a.createElement("span",{className:D.a.margin},this.progress()))):r.a.createElement("div",null,r.a.createElement("p",null,"Email climb.nomorerice@gmail.com with a link to your profile to become verified to upload media."))}},{key:"progress",value:function(){if(void 0===this.state.progress)return null;if(void 0===this.state.uploading_file)return"upload complete";if(void 0===this.state.last_progress)return"upload starting";var e=this.state.progress_log[0],t=(this.state.progress.t-e.t)/1e3/(this.state.progress.p-e.p);return"".concat((100*this.state.progress.p).toFixed(2),"% - ").concat(Math.ceil((1-this.state.progress.p)*t)," seconds remaining")}},{key:"markProgress",value:function(e){var t={p:e,t:Date.now()};void 0!==this.state.progress&&this.state.progress_log.push(this.state.progress),this.state.progress_log.length>20&&this.state.progress_log.shift(),this.setState({progress:t,last_progress:this.state.progress})}},{key:"submitNewMedia",value:function(){var e=this,t=this.new_media_ref.current;if(null!==t){var a=t.files;if(a){var n=a[0];if(null!==this.state&&void 0!==this.state.uploading_file)return alert("already uploading ".concat(this.state.uploading_file));this.setState({uploading_file:n.name});var i,r=n.type.split("/")[0];if(-1===["image","video"].indexOf(r))return alert("invalid file - ".concat(r));var l=this;x.req("/get_gcs_key").then(function(e){return e.json()}).then(function(e){i=e.token;var t=e.folder,a=e.bucket,r="".concat(t,"/").concat((new Date).getTime(),"_").concat(n.name),c="https://www.googleapis.com/upload/storage/v1/b/".concat(a,"/o?uploadType=media&name=").concat(r);return new Promise(function(e,t){var a=new XMLHttpRequest;a.upload.onprogress=function(e){l.markProgress(e.loaded/e.total)},a.open("POST",c),a.onload=function(n){if(200!==a.status)return t(a.statusText);e(a)},a.setRequestHeader("Authorization","Bearer ".concat(i)),a.setRequestHeader("Content-Type",n.type),a.send(n)})}).then(function(e){return e.response}).then(JSON.parse).then(function(t){return x.req("/gym/".concat(e.props.gym_path,"/problem/").concat(e.props.id,"/upload"),"POST",{gcs_path:t.name,gcs_id:t.id,mime:n.type,size:n.size,gcs_key:i})}).then(x.refresh).then(function(){return e.setState({uploading_file:void 0,last_progress:void 0,progress_log:[]})})}}}}]),t}(i.Component);var ne=function(e){return r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement(E.a,{to:"/gym/".concat(e.problem.gym_path)},"To ",e.gym_name)),r.a.createElement("p",null,e.problem.name," (",e.problem.id,")"),r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("span",null,e.problem.difficulty," "),r.a.createElement("input",{type:"checkbox"}))),r.a.createElement("p",null,x.formatDate(e.problem.date)),r.a.createElement("p",null,e.problem.location,!Boolean(e.problem.active)&&r.a.createElement("span",null," (retired)")),r.a.createElement("p",null,e.problem.color,Boolean(e.problem.setter)&&r.a.createElement("span",null," - set by ",e.problem.setter)),x.common().user.is_admin&&r.a.createElement(_.a,{onClick:function(){return e.setShow(!1)}},"Edit"))},ie=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){var e="/gym/".concat(a.props.problem.gym_path,"/problem/").concat(a.props.problem.id,"/edit");x.req(e,"POST",a.state).then(x.refresh).then(function(){return a.props.setShow(!0)})},a.state=Object.assign({},e.problem,{date:x.inputDate(e.problem.date)}),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement(E.a,{to:"/gym/".concat(this.props.problem.gym_path)},"To ",this.props.gym_name)),r.a.createElement("p",null,r.a.createElement("input",Object.assign({},x.input(this,"name"),{size:10})),r.a.createElement("span",null," (",this.props.problem.id,")")),r.a.createElement("p",null,r.a.createElement("input",Object.assign({},x.input(this,"difficulty"),{size:5}))),r.a.createElement("p",null,r.a.createElement("input",x.dateInput(this,"date"))),r.a.createElement("p",null,r.a.createElement("input",Object.assign({},x.input(this,"location"),{size:8})),r.a.createElement("label",null,r.a.createElement("span",null," active "),r.a.createElement("input",x.input(this,"active",s.Checkbox)))),r.a.createElement("p",null,r.a.createElement("input",Object.assign({},x.input(this,"color"),{size:5})),r.a.createElement("span",null," set by "),r.a.createElement("input",Object.assign({},x.input(this,"setter"),{size:6}))),r.a.createElement(_.a,{onClick:this.submit.bind(this)},"Submit"),r.a.createElement("span",null," "),r.a.createElement(_.a,{onClick:function(){return e.props.setShow(!0)}},"Cancel"))}}]),t}(i.Component),re=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={showing:!0},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"setShow",value:function(e){this.setState({showing:e})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:D.a.flex},r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(D.a.inline)},this.state.showing?r.a.createElement(ne,Object.assign({},this.props,{setShow:this.setShow.bind(this)})):r.a.createElement(ie,Object.assign({},this.props,{setShow:this.setShow.bind(this)}))),r.a.createElement("div",null,r.a.createElement("div",{className:D.a.bubble},r.a.createElement(ae,this.props.problem)))),r.a.createElement(te,{media:this.props.media,users:this.props.users}))}}]),t}(i.Component),le=a(25),ce=a.n(le),oe={id:0,name:"",difficulty:"",location:"",date:"",setter:"",color:"",active:!0,gym_path:""},se=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){x.req("/gym/".concat(a.props.gym_path,"/new_problem"),"POST",a.state).then(function(){return a.setState(oe)}).then(x.refresh)},a.state=Object.assign({},oe,{date:x.inputDate()}),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(D.a.inline," ").concat(ce.a.new_problem_container)},r.a.createElement("h5",null,"New Problem"),r.a.createElement("div",{className:ce.a.new_problem},r.a.createElement("div",null,r.a.createElement("div",null,"name"),r.a.createElement("input",Object.assign({},x.input(this,"name"),{size:11}))),r.a.createElement("div",null,r.a.createElement("div",null,"difficulty"),r.a.createElement("input",Object.assign({},x.input(this,"difficulty"),{size:5}))),r.a.createElement("div",null,r.a.createElement("div",null,"location"),r.a.createElement("input",Object.assign({},x.input(this,"location"),{size:10}))),r.a.createElement("div",null,r.a.createElement("div",null,"color"),r.a.createElement("input",Object.assign({},x.input(this,"color"),{size:7}))),r.a.createElement("div",null,r.a.createElement("div",null,"setter"),r.a.createElement("input",Object.assign({},x.input(this,"setter"),{size:8}))),r.a.createElement("div",null,r.a.createElement("div",null,"date"),r.a.createElement("input",x.dateInput(this,"date")))),r.a.createElement("div",{className:D.a.vertical_space_20}),r.a.createElement(_.a,{onClick:this.submit},"Submit"))}}]),t}(i.Component),me=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){var e="/gym/".concat(a.props.gym_path,"/problem/").concat(a.props.id,"/edit");x.req(e,"POST",a.state).then(x.refresh)},a.state=Object.assign({},e,{date:x.inputDate(e.date)}),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:D.a.bubble},r.a.createElement("div",null,"id: ",this.props.id),r.a.createElement("div",{className:D.a.flex},r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"name"),r.a.createElement("input",Object.assign({},x.input(this,"name"),{size:7}))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"difficulty"),r.a.createElement("input",Object.assign({},x.input(this,"difficulty"),{size:4}))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"location"),r.a.createElement("input",Object.assign({},x.input(this,"location"),{size:5}))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"color"),r.a.createElement("input",Object.assign({},x.input(this,"color"),{size:5}))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"setter"),r.a.createElement("input",Object.assign({},x.input(this,"setter"),{size:5}))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,"date"),r.a.createElement("input",x.dateInput(this,"date"))),r.a.createElement("div",{className:D.a.padding},r.a.createElement("label",null,r.a.createElement("div",null,"active"),r.a.createElement("input",x.input(this,"active",s.Checkbox)))),r.a.createElement("div",{className:"".concat(D.a.align_center," ").concat(D.a.margin)},r.a.createElement(_.a,{onClick:this.submit},"Submit"))))}}]),t}(i.Component),ue=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){x.req("/gym/".concat(a.props.gym.path,"/edit"),"POST",a.state).then(x.refresh)},a.state=Object.assign({},e.gym),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(x.Title,{title:"Edit: ".concat(this.props.gym.name)}),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(D.a.inline)},r.a.createElement(E.a,{to:"/gym/".concat(this.props.gym.path)},"To ",this.props.gym.name),r.a.createElement("div",{className:D.a.vertical_space_20}),r.a.createElement("p",null,r.a.createElement("div",null,"name"),r.a.createElement("input",x.input(this,"name"))),r.a.createElement("p",null,r.a.createElement("div",null,"description"),r.a.createElement("textarea",x.input(this,"description"))),r.a.createElement(_.a,{onClick:this.submit,variant:"primary"},"Edit"))),r.a.createElement(se,{gym_path:this.props.gym.path})),r.a.createElement("div",{className:D.a.flex},this.props.problems.map(function(t){return r.a.createElement(me,Object.assign({key:t.id,gym_path:e.props.gym.path},t))})))}}]),t}(i.Component),pe=a(31),de=a.n(pe),he={id:0,name:"",path:"",description:""},be=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).submit=function(){x.req("/admin/new_gym","POST",a.state).then(function(){return a.setState(he)}).then(x.refresh).catch(function(e){return e.text()}).then(function(e){return alert(e.split("\n")[0])})},a.state=he,a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(D.a.margin," ").concat(de.a.new_gym)},r.a.createElement("h3",null,"New Gym"),r.a.createElement("p",null,r.a.createElement("div",null,"path"),r.a.createElement("input",x.input(this,"path",s.Text))),r.a.createElement("p",null,r.a.createElement("div",null,"name"),r.a.createElement("input",x.input(this,"name",s.Text))),r.a.createElement("p",null,r.a.createElement("div",null,"description"),r.a.createElement("textarea",x.input(this,"description"))),r.a.createElement(_.a,{onClick:this.submit,variant:"primary"},"Submit"))}}]),t}(i.Component),ve=a(26),fe=a.n(ve);var Ee=function(e){return r.a.createElement("div",null,r.a.createElement(x.Title,{title:"The Climbing App"}),r.a.createElement("div",{className:"".concat(D.a.flex," ").concat(fe.a.gyms_parent)},r.a.createElement("div",{className:D.a.flex},e.gyms.map(function(e){return r.a.createElement("div",{key:e.id,className:"".concat(D.a.bubble," ").concat(fe.a.gym)},r.a.createElement(E.a,{to:"/gym/".concat(e.path)},r.a.createElement("h3",null,e.name),r.a.createElement("div",null,e.description)))})),x.common().user.is_admin&&r.a.createElement(be,null)))};var ge=function(e){var t=V.keyById(e.problems);return r.a.createElement("div",null,r.a.createElement("div",null,e.media.map(function(e){return r.a.createElement("div",{key:e.id,className:D.a.bubble},function(e,t){return r.a.createElement(E.a,{to:"/gym/".concat(e.gym_path,"/problem/").concat(e.problem_id)},r.a.createElement("div",{className:D.a.padding},r.a.createElement("div",null,t[e.problem_id].name),r.a.createElement("div",null,x.formatDate(new Date(e.timestamp).toString())," (",e.id,")")))}(e,t),V.mediaData(e))})))},_e=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={is_verified:e.user.is_verified,is_admin:e.user.is_admin},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"checkboxProps",value:function(e){var t=this,a=Object.assign({},this.state),n=x.input(this,e,s.Checkbox),i=n.onChange,r=!x.common().user.is_admin;return Object.assign(n,{onChange:function(e){var n="/admin/user/".concat(t.props.user.id,"/edit"),r=i(e);return x.req(n,"POST",r).then(x.unready).catch(function(e){t.setState(a),console.error(e)}),r},disabled:r})}},{key:"permissionDiv",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null,"is admin: ",r.a.createElement("input",this.checkboxProps("is_admin"))),r.a.createElement("p",null,"is verified:"," ",r.a.createElement("input",this.checkboxProps("is_verified"))))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"".concat(D.a.bubble," ").concat(ee.a.profile)},r.a.createElement(x.Title,{title:this.props.user.name}),r.a.createElement("div",null,t.profileDiv(this.props.user),x.common().user.is_admin&&this.permissionDiv())),r.a.createElement(ge,{media:this.props.media,problems:this.props.problems}))}}],[{key:"profileDiv",value:function(e){return r.a.createElement("div",null,r.a.createElement("p",null,e.name," (",e.id,")"),r.a.createElement("p",null,e.email),r.a.createElement("p",null,new Date(e.timestamp).toLocaleString()),r.a.createElement("img",{className:ee.a.profile_pic,src:e.image}))}}]),t}(i.Component);var ye=function(e){return r.a.createElement("div",null,r.a.createElement(x.Title,{title:"Latest Users"}),r.a.createElement("div",{className:D.a.flex},e.users.map(function(e){return r.a.createElement("div",{key:e.id,className:D.a.bubble},r.a.createElement(E.a,{to:"/user/".concat(e.id)},_e.profileDiv(e)))})))};function Oe(e,t){return{exact:!0,path:e,render:function(e){return x.common().path===encodeURI(e.location.pathname)&&t(e.match.params)}}}var je=function(e){return r.a.createElement("div",null,r.a.createElement(H.a,null,r.a.createElement(J.a,Oe("/",function(){return r.a.createElement(Ee,{gyms:e.gyms})})),r.a.createElement(J.a,Oe("/admin/user/latest",function(){return r.a.createElement(ye,{users:e.users})})),r.a.createElement(J.a,Oe("/user/:user_id",function(){return r.a.createElement(_e,{user:e.user,media:e.media,problems:e.problems})})),r.a.createElement(J.a,Oe("/gym/:gym_path",function(){return r.a.createElement(W,{gym:e.gym,climbed_problems:e.climbed_problems,problems:e.problems,pictures:e.pictures})})),r.a.createElement(J.a,Oe("/gym/:gym_path/edit",function(){return r.a.createElement(ue,{gym:e.gym,problems:e.problems})})),r.a.createElement(J.a,Oe("/gym/:gym_path/problem/:problem_id",function(){return r.a.createElement(re,{problem:e.problem,gym_name:e.gym_name,media:e.media,users:e.users})}))))};var ke=function(e){return r.a.createElement("div",{className:D.a.main},r.a.createElement(G,null),r.a.createElement(je,e))},we=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e)))._refresh=function(e){var t=e===x.unready_o;return console.log("refresh",t,a.props.history.location.pathname),t&&location.reload(),x.req("".concat(a.props.history.location.pathname)).then(function(e){return e.json()}).then(function(e){return a.setState(Object.assign({ready:!0},{data:e})),e})},a._common=function(){return a.state.data.common},a.state={ready:!1},x.setApp(Object(v.a)(Object(v.a)(a))),a.props.history.listen(x.refresh),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){x.refresh()}},{key:"render",value:function(){return this.state.ready?r.a.createElement(ke,this.state.data):null}}]),t}(i.Component),Ne=Object(f.a)(we),Se=console.log;console.log=function(){var e=Array.from(arguments);return Se.apply(void 0,Object(n.a)(e)),e[0]},c.a.render(r.a.createElement(m.a,null,r.a.createElement(Ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,2,1]]]);
//# sourceMappingURL=main.37917d28.chunk.js.map