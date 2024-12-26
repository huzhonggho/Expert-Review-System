import{u as Z,g as ee,d as ae,i as te,r as le}from"./expert-5e2cb0cb.js";import{b as j}from"./review-46614018.js";import{d as D,r as f,u as A,g as z,m as se,a as g,o as M,c as K,b as x,e as t,w as o,f as C,_ as G,h as b,n as oe,q as re,F as ne,N,l as V,t as ue,j as E,s as ie,k as pe}from"./index-ddeb11e4.js";const de={class:"expert-update-container"},ve={class:"form"},ce={class:"btns"},me=D({__name:"update",props:["updateExpertForm","close-modal","update-after","updateReviewName"],setup(O){const d=O,y=f(null),U=A(),h=f(!1),l=f({expertId:0,expertNumber:"",expertName:"",affiliate:"",password:"",reviewId:"",duty:"",memo:""});l.value=d.updateExpertForm;let i=null;const n=f(""),_=z([]),k=z([]);n.value=d.updateReviewName,_.push(d.updateReviewName),k.push({id:l.value.reviewId,reviewName:n.value});const R=f(!1);se(n,()=>{i!=null&&(clearTimeout(i),i=null),i=setTimeout(async()=>{R.value=!0;const{data:w}=await j(n.value);if(R.value=!1,k.splice(0),_.splice(0),w.list.length==0){U.error("无相关评审");return}w.list.forEach(s=>{let r={id:s.reviewId,reviewName:s.reviewName};k.push(r),_.push(s.reviewName)})},1e3)});const v={expertNumber:{required:!0,message:"请输入专家号",trigger:"blur"},expertName:{required:!0,message:"请输入专家名称",trigger:"blur"},affiliate:{required:!0,message:"请输入专家单位",trigger:"blur"},reviewName:{validator:()=>(console.log(_),!!_.includes(n.value)),message:"请正确输入所属评审项目名",trigger:"blur"},duty:{required:!0,message:"请输入专家职务",trigger:"blur"}},c=()=>{var w;l.value=d.updateExpertForm,n.value="",(w=y.value)==null||w.restoreValidation(),d.closeModal()},S=()=>{var w;(w=y.value)==null||w.validate(async s=>{if(s)U.error("请将表单填写完整");else{let r={expertId:l.value.expertId,expertName:l.value.expertName,affiliate:l.value.affiliate,password:l.value.password,reviewId:k[_.indexOf(n.value)].id,duty:l.value.duty,memo:l.value.memo},p;h.value=!0;try{p=await Z(r)}catch{h.value=!1;return}h.value=!1,U.success(p.message),d.updateAfter()}})};return(w,s)=>{const r=g("n-input"),p=g("n-form-item"),q=g("n-auto-complete"),P=g("n-button"),B=g("n-form");return M(),K("div",de,[x("div",ve,[t(B,{ref_key:"formRef",ref:y,model:l.value,rules:v,size:"medium","label-placement":"left","label-width":100,"label-align":"left","show-require-mark":!1},{default:o(()=>[t(p,{label:"专家号",path:"expertNumber"},{default:o(()=>[t(r,{value:l.value.expertNumber,"onUpdate:value":s[0]||(s[0]=u=>l.value.expertNumber=u),placeholder:"输入专家号",clearable:""},null,8,["value"])]),_:1}),t(p,{label:"专家名称",path:"expertName"},{default:o(()=>[t(r,{value:l.value.expertName,"onUpdate:value":s[1]||(s[1]=u=>l.value.expertName=u),placeholder:"输入专家名称",clearable:""},null,8,["value"])]),_:1}),t(p,{label:"专家密码",path:"password"},{default:o(()=>[t(r,{value:l.value.password,"onUpdate:value":s[2]||(s[2]=u=>l.value.password=u),placeholder:"密码置空表示不修改密码",clearable:""},null,8,["value"])]),_:1}),t(p,{label:"专家单位",path:"affiliate"},{default:o(()=>[t(r,{value:l.value.affiliate,"onUpdate:value":s[3]||(s[3]=u=>l.value.affiliate=u),placeholder:"输入专家单位",clearable:""},null,8,["value"])]),_:1}),t(p,{label:"专家职务",path:"duty"},{default:o(()=>[t(r,{value:l.value.duty,"onUpdate:value":s[4]||(s[4]=u=>l.value.duty=u),placeholder:"输入专家职务",clearable:""},null,8,["value"])]),_:1}),t(p,{label:"所属评审项目",path:"reviewName"},{default:o(()=>[t(q,{value:n.value,"onUpdate:value":s[5]||(s[5]=u=>n.value=u),"input-props":{autocomplete:"disabled"},options:_,placeholder:"请输入评审项目名",loading:R.value,clearable:""},null,8,["value","options","loading"])]),_:1}),t(p,{label:"备注",path:"memo"},{default:o(()=>[t(r,{value:l.value.memo,"onUpdate:value":s[6]||(s[6]=u=>l.value.memo=u),type:"textarea",placeholder:"备注可以为空",clearable:""},null,8,["value"])]),_:1}),t(p,null,{default:o(()=>[x("div",ce,[t(P,{"attr-type":"button",onClick:c},{default:o(()=>[C(" 取消 ")]),_:1}),t(P,{loading:h.value,"attr-type":"submit",type:"primary",onClick:S},{default:o(()=>[C(" 修改 ")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["model"])])])}}});const fe=G(me,[["__scopeId","data-v-e9f543e9"]]),ge={class:"expert-manage-container"},_e={class:"header"},we={class:"importBtn"},xe={class:"search-box"},ye={class:"table"},be={class:"footer"},Ne={class:"delBtn"},he={class:"pagination"},ke=D({__name:"manage",setup(O){const d=A(),y=f([]),h=(()=>[{type:"selection"},{title:"专家号",key:"expertNumber"},{title:"专家名称",key:"expertName"},{title:"部门",key:"affiliate"},{title:"职务",key:"duty"},{title:"所属评审项目",key:"reviewName"},{title:"操作",key:"actions",width:"300",render(e){return E(V,{},{default:()=>[E(ie,{trigger:"hover"},{default:()=>"点击此按钮会重置该专家密码，重置后密码为 123456",trigger:()=>[E(N,{size:"small",onClick:()=>{w(e.id)}},{default:()=>"重置密码"})]}),E(N,{size:"small",type:"warning",onClick:()=>{q(e)}},{default:()=>"修改"}),E(pe,{onPositiveClick:()=>{S([e.id])}},{default:()=>"确定要删除吗",trigger:()=>E(N,{size:"small",type:"error"},{default:()=>"删除"})})]})}}])(),l=z([]),i=z({currentPage:1,pageCount:1,pageSize:15,pageSizes:[10,15,20]}),n=z({currentReview:0,options:[{label:"全部",value:0}]}),_=f("");(async()=>{const{data:e}=await j("");n.options=[{label:"全部",value:0}],e.list.forEach(a=>{n.options.push({label:a.reviewName,value:a.reviewId})})})();const k=e=>{n.currentReview=e,c()},R=e=>{i.currentPage=e,c()},$=e=>{i.pageSize=e,c()},v=f(!1),c=async()=>{v.value=!0;const{data:e}=await ee(i.currentPage,i.pageSize,_.value,n.currentReview);if(v.value=!1,l.splice(0),i.pageCount=Math.ceil(e.total/i.pageSize),e.total==0){d.error("无相关数据");return}e.list.forEach(a=>{let I={key:a.expertId,id:a.expertId,expertNumber:a.expertNumber,expertName:a.expertName,affiliate:a.affiliate,duty:a.duty,reviewId:a.reviewId,reviewName:a.reviewName,memo:a.memo};l.push(I)})};c();const S=async e=>{const a=await ae({ids:e});y.value=[],d.success(a.message),c()},w=async e=>{const a=await le({expertId:e});d.success(a.message),c()},s=f(!1),r=z({expertId:0,expertNumber:"",expertName:"",affiliate:"",password:"",reviewId:"",duty:"",memo:""}),p=f(""),q=e=>{r.expertId=e.id,r.expertNumber=e.expertNumber,r.expertName=e.expertName,r.affiliate=e.affiliate,r.reviewId=e.reviewId,r.password="",r.duty=e.duty,r.memo=e.memo,p.value=e.reviewName,s.value=!0},P=()=>{s.value=!1},B=()=>{s.value=!1,c()},u=f(),T=f(null),H=()=>{var e;(e=T.value)==null||e.click()},J=async e=>{const a=e.target.files;if(a==null){d.warning("请上传文件"),e.target.value="";return}if(u.value==null){d.warning("请选择评审项目"),e.target.value="";return}const I=a[0],L=u.value,F=new FormData;F.append("file",I),F.append("reviewId",L.toString()),v.value=!0;try{await te(F)}catch{v.value=!1,e.target.value="";return}v.value=!1,e.target.value="",c()};return(e,a)=>{const I=g("n-select"),L=g("n-popover"),F=g("n-input"),Q=g("n-input-group"),W=g("n-data-table"),X=g("n-pagination"),Y=g("n-modal");return M(),K(ne,null,[x("div",ge,[x("div",_e,[x("div",we,[t(L,{trigger:"click",placement:"bottom-start"},{trigger:o(()=>[t(b(N),{loading:v.value},{default:o(()=>[C("Excel 导入")]),_:1},8,["loading"])]),default:o(()=>[t(b(V),null,{default:o(()=>[t(I,{style:{width:"10vw"},value:u.value,"onUpdate:value":a[0]||(a[0]=m=>u.value=m),options:n.options.slice(1)},null,8,["value","options"]),t(b(N),{onClick:H,loading:v.value},{default:o(()=>[C("导入文件")]),_:1},8,["loading"]),x("input",{ref_key:"uploadIpt",ref:T,onChange:a[1]||(a[1]=m=>J(m)),class:"upload-ipt",type:"file",accept:".xlsx"},null,544)]),_:1})]),_:1})]),x("div",xe,[t(b(V),null,{default:o(()=>[t(I,{style:{width:"10vw"},value:n.currentReview,"onUpdate:value":a[2]||(a[2]=m=>n.currentReview=m),options:n.options,"on-update:value":k},null,8,["value","options"]),t(Q,null,{default:o(()=>[t(F,{style:{width:"20vw"},placeholder:"通过专家名称搜索",value:_.value,"onUpdate:value":a[3]||(a[3]=m=>_.value=m),loading:v.value,onChange:c},null,8,["value","loading"]),t(b(N),{type:"primary",onClick:c,ghost:"",loading:v.value},{default:o(()=>[C(" 搜索 ")]),_:1},8,["loading"])]),_:1})]),_:1})])]),x("div",ye,[t(W,{"flex-height":!0,style:{height:"100%"},"checked-row-keys":y.value,"onUpdate:checkedRowKeys":a[4]||(a[4]=m=>y.value=m),bordered:!1,"single-line":!1,columns:b(h),data:l,loading:v.value},null,8,["checked-row-keys","columns","data","loading"])]),x("div",be,[x("div",Ne,[y.value.length!=0?(M(),oe(b(N),{key:0,type:"error",onClick:a[5]||(a[5]=m=>S(y.value))},{default:o(()=>[C("删除"+ue(y.value.length)+" 项",1)]),_:1})):re("",!0)]),x("div",he,[t(X,{"display-order":["quick-jumper","pages","size-picker"],"page-count":i.pageCount,"default-page":i.currentPage,"page-sizes":i.pageSizes,"page-size":i.pageSize,"show-quick-jumper":"","show-size-picker":"","on-update:page":R,"on-update:page-size":$},null,8,["page-count","default-page","page-sizes","page-size"])])])]),t(Y,{show:s.value,"onUpdate:show":a[6]||(a[6]=m=>s.value=m),"mask-closable":!1},{default:o(()=>[t(fe,{updateExpertForm:r,updateReviewName:p.value,"close-modal":P,"update-after":B},null,8,["updateExpertForm","updateReviewName"])]),_:1},8,["show"])],64)}}});const Ce=G(ke,[["__scopeId","data-v-e8e9fb75"]]);export{Ce as default};