(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31bbf059"],{4342:function(e,t,r){},"863a":function(e,t,r){"use strict";var a=r("4342"),s=r.n(a);s.a},b953:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"register-container"},[r("div",{attrs:{id:"particles"}}),e._v(" "),r("el-form",{ref:"registerForm",staticClass:"register-form",attrs:{model:e.registerForm,rules:e.registerRules,"auto-complete":"on","label-position":"left"}},[r("div",{staticClass:"title-container"},[r("div",{staticClass:"title"},[e._v("注册")])]),e._v(" "),r("el-form-item",{attrs:{prop:"username"}},[r("span",{staticClass:"svg-container"},[r("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),r("el-input",{ref:"username",attrs:{placeholder:"用户名",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.registerForm.username,callback:function(t){e.$set(e.registerForm,"username",t)},expression:"registerForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("span",{staticClass:"svg-container"},[r("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),r("el-input",{key:"1",ref:"password",attrs:{type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2","auto-complete":"on"},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password",t)},expression:"registerForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"confirmPassword"}},[r("span",{staticClass:"svg-container"},[r("svg-icon",{attrs:{"icon-class":"queren"}})],1),e._v(" "),r("el-input",{key:"2",ref:"cPassword",attrs:{type:e.passwordType,placeholder:"确认密码",name:"confirmPassword",tabindex:"3","auto-complete":"on"},model:{value:e.registerForm.confirmPassword,callback:function(t){e.$set(e.registerForm,"confirmPassword",t)},expression:"registerForm.confirmPassword"}})],1),e._v(" "),r("el-form-item",[r("span",{staticClass:"svg-container"},[r("svg-icon",{attrs:{"icon-class":"confirm"}})],1),e._v(" "),r("el-input",{key:"3",ref:"captcha",attrs:{type:"text",placeholder:"请输入验证码",name:"captcha",tabindex:"4","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleRegister(t)}},model:{value:e.registerForm.captcha,callback:function(t){e.$set(e.registerForm,"captcha",t)},expression:"registerForm.captcha"}}),e._v(" "),r("div",{staticClass:"captImg-box",on:{click:e.refreshCaptchaPng}},[r("img",{attrs:{src:e.captUrl,alt:""}})])],1),e._v(" "),r("div",{staticClass:"register-row"},[r("div",{staticClass:"right-box"},[r("span",{staticClass:"to-login",on:{click:e.linkToLogin}},[e._v("已有账号，登录")])])]),e._v(" "),r("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"success"},nativeOn:{click:function(t){return t.preventDefault(),e.handleRegister(t)}}},[e._v("注册")]),e._v(" "),r("div",{staticClass:"tips"})],1)],1)},s=[],i=r("61f7"),n=(r("572f"),r("cf07")),o=(r("5c96"),r("b775")),c={name:"register",data:function(){var e=this,t=function(e,t,r){Object(i["b"])(t)?r():r(new Error("请输入您的用户名"))},r=function(e,t,r){t.length<6?r(new Error("密码小于六位")):r()},a=function(t,r,a){r!==e.registerForm.password?a(new Error("确认密码和密码不符")):a()};return{checked:!1,passwordType:"password",registerForm:{username:"",password:"",confirmPassword:"",captcha:""},registerRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:r}],confirmPassword:[{required:!0,trigger:"blur",validator:a}]},loading:!1,redirect:void 0,captUrl:"",bgUrl:""}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{linkToLogin:function(){this.$router.push({path:"/login"})},refreshCaptchaPng:function(){this.getCaptchaPng()},handleRegister:function(){var e=this,t=this.registerForm;this.$refs.registerForm.validate((function(r){if(!r)return e.$message("error submit!!"),!1;e.loading=!0,o["a"].post("/register",{registerFormData:t}).then((function(t){e.loading=!1,0===t.data.code?(e.$confirm("注册成功，是否进入登录页？","注册成功",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){e.$router.push({path:"/login"})})).catch((function(t){e.$message({type:"info",message:"已取消"})})),e.$refs.registerForm.resetFields()):e.$message({type:"error",message:t.data.msg})})).catch((function(t){e.loading=!1,console.log(t)}))}))},getCaptchaPng:function(){var e=this;o["a"].get("/register/captcha").then((function(t){e.captUrl=t.data.data.imgUrl}))}},created:function(){this.getCaptchaPng()},mounted:function(){particlesJS("particles",n)}},l=c,d=(r("f28e"),r("863a"),r("2877")),u=Object(d["a"])(l,a,s,!1,null,"2f8524f1",null);t["default"]=u.exports},cf07:function(e){e.exports={particles:{number:{value:160,density:{enable:!0,value_area:800}},color:{value:"#fff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:1,random:!0,anim:{enable:!0,speed:1,opacity_min:0,sync:!0}},size:{value:3,random:!0,anim:{enable:!1,speed:4,size_min:.3,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"bubble"},onclick:{enable:!1,mode:"repulse"},resize:!0},modes:{grab:{distance:100,line_linked:{opacity:.8}},bubble:{distance:250,size:4,duration:2,opacity:1,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0}},ead3:function(e,t,r){},f28e:function(e,t,r){"use strict";var a=r("ead3"),s=r.n(a);s.a}}]);