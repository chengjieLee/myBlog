(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e6a65c4"],{"3daf":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"components-container"},[i("div",{staticClass:"title-set-box"},[i("el-form",{attrs:{model:t.headForm}},[i("el-form-item",{attrs:{label:"文章标题","label-width":"80px"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.headForm.title,callback:function(e){t.$set(t.headForm,"title",e)},expression:"headForm.title"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"editor-container"},[i("el-alert",{attrs:{closable:!1,type:"success"}}),t._v(" "),i("markdown-editor",{ref:"markdownEditor",attrs:{language:t.language,height:"720px"},on:{editChange:t.handleEditChange},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),i("div",{staticClass:"edit-button"},[t.isModify?i("el-button",{attrs:{type:"primary",icon:"el-icon-edit-outline"},on:{click:t.modifyEdit}},[t._v("修改")]):i("el-button",{attrs:{type:"primary",icon:"el-icon-edit-outline"},on:{click:t.saveEdit}},[t._v("保存")])],1)])},o=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:t.id}})},s=[],r=i("db72"),d=(i("a7be"),i("44f8"),i("a6e0"),i("547e")),l=i.n(d),u={minHeight:"200px",previewStyle:"vertical",useCommandShortcut:!0,useDefaultHTMLSanitizer:!0,usageStatistics:!1,hideModeSwitch:!1,toolbarItems:["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"]},c={name:"MarkdownEditor",props:{value:{type:String,default:""},id:{type:String,required:!1,default:function(){return"markdown-editor-"+ +new Date+(1e3*Math.random()).toFixed(0)}},options:{type:Object,default:function(){return u}},mode:{type:String,default:"markdown"},height:{type:String,required:!1,default:"300px"},language:{type:String,required:!1,default:"en_US"}},data:function(){return{editor:null}},computed:{editorOptions:function(){var t=Object.assign({},u,this.options);return t.initialEditType=this.mode,t.height=this.height,t.language=this.language,t}},watch:{value:function(t,e){t!==e&&t!==this.editor.getValue()&&this.editor.setValue(t)},language:function(t){this.destroyEditor(),this.initEditor()},height:function(t){this.editor.height(t)},mode:function(t){this.editor.changeMode(t)}},mounted:function(){this.initEditor()},destroyed:function(){this.destroyEditor()},methods:{initEditor:function(){var t=this;this.editor=new l.a(Object(r["a"])({el:document.getElementById(this.id)},this.editorOptions)),this.value&&(console.log(this.value),this.editor.setValue(this.value)),this.editor.on("change",(function(){t.$emit("input",t.editor.getValue()),t.$emit("editChange")}))},destroyEditor:function(){this.editor&&(this.editor.off("change"),this.editor.remove())},setValue:function(t){this.editor.setValue(t)},getValue:function(){return this.editor.getValue()},setHtml:function(t){this.editor.setHtml(t)},getHtml:function(){return this.editor.getHtml()}}},h=c,m=i("2877"),g=Object(m["a"])(h,a,s,!1,null,null,null),f=g.exports,p=function(t){window.localStorage.setItem("edited",t)},v=function(){var t="undefined"!==window.localStorage.getItem("edited")?window.localStorage.getItem("edited"):void 0;return t},b=i("b775"),y=i("5f87"),w="",E=v()||w,k={name:"Edit",components:{MarkdownEditor:f},data:function(){return{content:E,html:"",languageTypeList:{zh:"zh_CN"},isSave:!0,headForm:{title:"",author:Object(y["a"])()},isModify:!1,blogId:null}},computed:{language:function(){return this.languageTypeList["zh"]}},methods:{handleClearInput:function(){this.headForm.title="",this.headForm.author=""},handleEditChange:function(){this.isSave=!1},setHtml:function(t){this.$refs.markdownEditor.setHtml(t)},getHtml:function(){this.html=this.$refs.markdownEditor.getHtml()},saveEdit:function(){var t=this;this.$confirm("是否保存此文档？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){t.saveArticle().then((function(e){0===e.code?(t.$message({type:"success",message:e.msg}),t.content="",t.headForm.title=""):t.$message({type:"warning",message:e.msg})}))})).catch((function(){t.$message({type:"info",message:"已取消保存"})})),this.isSave=!0,p("")},modifyEdit:function(){var t=this;this.$confirm("是否修改此文档？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then((function(){t.modifyArticle().then((function(e){0===e.code?(t.$message({type:"success",message:e.msg}),t.content="",t.headForm.title=""):t.$message({type:"warning",message:e.msg})}))})).catch((function(){t.$message({type:"info",message:"已取消修改"})})),this.isSave=!0,p("")},saveArticle:function(){var t={user:Object(y["a"])(),blogContent:this.$refs.markdownEditor.getHtml(),blogTitle:this.headForm.title,blogAuthor:this.headForm.author};return b["a"].post("/blog/add",t).then((function(t){return t.data}))},modifyArticle:function(){if(this.blogId&&this.headForm.title){var t={user:Object(y["a"])(),blogContent:this.$refs.markdownEditor.getHtml(),blogTitle:this.headForm.title,blogAuthor:this.headForm.author,blogId:this.blogId};return b["a"].post("/blog/modify",t).then((function(t){return t.data}))}},getArticleHtml:function(t){var e=this;b["a"].get("/blog/detail",{params:{blogId:t}}).then((function(t){if(0===t.data.code){var i=t.data.data.blogContent;e.headForm.title=t.data.data.blogTitle,e.setHtml(i)}}))}},mounted:function(){var t=this;window.onunload=function(){t.isSave||p(t.content)};var e=this.$route.query.blogId;e?(this.isModify=!0,this.blogId=e,this.getArticleHtml(e)):(this.isModify=!1,this.blogId=null)}},S=k,$=(i("5a3c"),Object(m["a"])(S,n,o,!1,null,"9705a728",null));e["default"]=$.exports},"5a3c":function(t,e,i){"use strict";var n=i("7efe"),o=i.n(n);o.a},"7efe":function(t,e,i){}}]);