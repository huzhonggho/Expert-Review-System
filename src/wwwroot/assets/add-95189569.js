import{a as q}from"./expert-5e2cb0cb.js";import{b as C}from"./review-46614018.js";import{d as R,r as d,u as B,g as x,m as V,a as p,o as E,c as F,b as N,e as l,w as u,f as y,_ as O}from"./index-ddeb11e4.js";const T={class:"expert-add-container"},L={class:"form"},z={class:"btns"},M=R({__name:"add",setup(j){const f=d(null),c=B(),m=d(!1),e=d({expertNumber:"",expertName:"",affiliate:"",password:"123456",reviewId:"",duty:"",memo:""});let v=null;const n=d(""),i=x([]),_=x([]),b=d(!1);V(n,()=>{v!=null&&(clearTimeout(v),v=null),v=setTimeout(async()=>{b.value=!0;const{data:s}=await C(n.value);if(b.value=!1,_.splice(0),i.splice(0),s.list.length==0){c.error("无相关评审");return}s.list.forEach(a=>{let o={id:a.reviewId,reviewName:a.reviewName};_.push(o),i.push(a.reviewName)})},1e3)});const h={expertNumber:{required:!0,message:"请输入专家号",trigger:"blur"},expertName:{required:!0,message:"请输入专家名称",trigger:"blur"},affiliate:{required:!0,message:"请输入专家单位",trigger:"blur"},password:{required:!0,message:"请输入专家密码",trigger:"blur"},reviewName:{validator:()=>!!i.includes(n.value),message:"请正确输入所属评审项目名",trigger:"blur"},duty:{required:!0,message:"请输入专家职务",trigger:"blur"}},g=()=>{var s;e.value={expertNumber:"",expertName:"",affiliate:"",password:"123456",reviewId:"",duty:"",memo:""},n.value="",(s=f.value)==null||s.restoreValidation()},I=()=>{var s;(s=f.value)==null||s.validate(async a=>{if(a)c.error("请将表单填写完整");else{let o={expertNumber:e.value.expertNumber,expertName:e.value.expertName,affiliate:e.value.affiliate,password:e.value.password,reviewId:_[i.indexOf(n.value)].id,duty:e.value.duty,memo:e.value.memo},r;m.value=!0;try{r=await q(o)}catch{m.value=!1;return}m.value=!1,c.success(r.message),g()}})};return(s,a)=>{const o=p("n-input"),r=p("n-form-item"),U=p("n-auto-complete"),w=p("n-button"),k=p("n-form");return E(),F("div",T,[N("div",L,[l(k,{ref_key:"formRef",ref:f,model:e.value,rules:h,size:"medium","label-placement":"left","label-width":100,"label-align":"left","show-require-mark":!1},{default:u(()=>[l(r,{label:"专家号",path:"expertNumber"},{default:u(()=>[l(o,{value:e.value.expertNumber,"onUpdate:value":a[0]||(a[0]=t=>e.value.expertNumber=t),placeholder:"输入专家号",clearable:""},null,8,["value"])]),_:1}),l(r,{label:"专家名称",path:"expertName"},{default:u(()=>[l(o,{value:e.value.expertName,"onUpdate:value":a[1]||(a[1]=t=>e.value.expertName=t),placeholder:"输入专家名称",clearable:""},null,8,["value"])]),_:1}),l(r,{label:"专家密码",path:"password"},{default:u(()=>[l(o,{value:e.value.password,"onUpdate:value":a[2]||(a[2]=t=>e.value.password=t),placeholder:"输入专家密码",clearable:""},null,8,["value"])]),_:1}),l(r,{label:"专家单位",path:"affiliate"},{default:u(()=>[l(o,{value:e.value.affiliate,"onUpdate:value":a[3]||(a[3]=t=>e.value.affiliate=t),placeholder:"输入专家单位",clearable:""},null,8,["value"])]),_:1}),l(r,{label:"专家职务",path:"duty"},{default:u(()=>[l(o,{value:e.value.duty,"onUpdate:value":a[4]||(a[4]=t=>e.value.duty=t),placeholder:"输入专家职务",clearable:""},null,8,["value"])]),_:1}),l(r,{label:"所属评审项目",path:"reviewName"},{default:u(()=>[l(U,{value:n.value,"onUpdate:value":a[5]||(a[5]=t=>n.value=t),"input-props":{autocomplete:"disabled"},options:i,placeholder:"请输入评审项目名",loading:b.value,clearable:""},null,8,["value","options","loading"])]),_:1}),l(r,{label:"备注",path:"memo"},{default:u(()=>[l(o,{value:e.value.memo,"onUpdate:value":a[6]||(a[6]=t=>e.value.memo=t),type:"textarea",placeholder:"备注可以为空",clearable:""},null,8,["value"])]),_:1}),l(r,null,{default:u(()=>[N("div",z,[l(w,{"attr-type":"button",onClick:g},{default:u(()=>[y(" 重置 ")]),_:1}),l(w,{loading:m.value,"attr-type":"submit",type:"primary",onClick:I},{default:u(()=>[y(" 添加 ")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["model"])])])}}});const J=O(M,[["__scopeId","data-v-9ff80fce"]]);export{J as default};
