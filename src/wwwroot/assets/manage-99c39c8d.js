import{u as Y,g as Z,d as ee,i as ae,a as le}from"./cadres-c7405279.js";import{b as L}from"./review-46614018.js";import{d as A,r as m,u as K,g as P,m as te,a as p,o as M,c as G,b,e,w as a,f as C,h as N,x as ue,y as ne,_ as H,n as oe,q as de,F as re,N as z,l as E,t as se,j as V,k as ie}from"./index-ddeb11e4.js";const pe={class:"cadres-update-container"},ve={class:"form"},ce={class:"btns"},me=A({__name:"update",props:["updateCadresForm","close-modal","update-after"],setup($){const y=$,w=m(null),S=K(),U=m(!1),u=m({cadresId:0,cadresNumber:"",cadresName:"",dept:"",position:"",orders:1,reviewId:0,gender:null,birth:null,nation:null,party:null,joinTime:null,title:"",dutyTime:null,getTime:null,publishTime:null,teachingTitle:"",duties:"",education:"",degree:"",graduation:"",major:"",graduateTime:null,nativePlace:"",introduction:"",description:"",memo:""});let v=null;const i=m(""),h=P([]),I=P([]);i.value=y.updateCadresForm.reviewName,u.value=y.updateCadresForm,h.push(i.value),I.push({id:u.value.reviewId,reviewName:i.value});const F=m(!1);te(i,()=>{v!=null&&(clearTimeout(v),v=null),v=setTimeout(async()=>{F.value=!0;const{data:c}=await L(i.value);if(F.value=!1,I.splice(0),h.splice(0),c.list.length==0){S.error("无相关评审");return}c.list.forEach(t=>{let T={id:t.reviewId,reviewName:t.reviewName};I.push(T),h.push(t.reviewName)})},1e3)});const f={cadresNumber:{required:!0,message:"请输入干部工号",trigger:"blur"},cadresName:{required:!0,message:"请输入干部姓名",trigger:"blur"},reviewName:{validator:()=>!!h.includes(i.value),message:"请正确输入所属评审项目名",trigger:"blur"}},_=()=>{var c;u.value=y.updateCadresForm,i.value="",(c=w.value)==null||c.restoreValidation(),y.closeModal()},B=()=>{var c;(c=w.value)==null||c.validate(async t=>{if(t)S.error("请将表单填写完整");else{let T={...u.value};T.reviewId=I[h.indexOf(i.value)].id;let s;U.value=!0;try{s=await Y(T)}catch{U.value=!1;return}U.value=!1,S.success(s.message),y.updateAfter()}})};return(c,t)=>{const T=p("n-divider"),s=p("n-input"),r=p("n-form-item"),o=p("n-gi"),x=p("n-input-number"),O=p("n-auto-complete"),q=p("n-grid"),R=p("n-select"),d=p("n-date-picker"),l=p("n-button"),k=p("n-form");return M(),G("div",pe,[b("div",ve,[e(k,{ref_key:"formRef",ref:w,model:u.value,rules:f,size:"medium","label-placement":"left","label-width":100,"label-align":"left","show-require-mark":!1},{default:a(()=>[e(T,{"title-placement":"left"},{default:a(()=>[C("必填项")]),_:1}),e(q,{"x-gap":"100",cols:3,"layout-shift-disabled":""},{default:a(()=>[e(o,null,{default:a(()=>[e(r,{label:"干部工号",path:"cadresNumber"},{default:a(()=>[e(s,{value:u.value.cadresNumber,"onUpdate:value":t[0]||(t[0]=n=>u.value.cadresNumber=n),placeholder:"输入干部工号",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"姓名",path:"cadresName"},{default:a(()=>[e(s,{value:u.value.cadresName,"onUpdate:value":t[1]||(t[1]=n=>u.value.cadresName=n),placeholder:"输入干部姓名",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"序号",path:"orders"},{default:a(()=>[e(x,{value:u.value.orders,"onUpdate:value":t[2]||(t[2]=n=>u.value.orders=n),min:1},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"所属评审项目",path:"reviewName"},{default:a(()=>[e(O,{value:i.value,"onUpdate:value":t[3]||(t[3]=n=>i.value=n),"input-props":{autocomplete:"disabled"},options:h,placeholder:"请输入评审项目名",loading:F.value,clearable:""},null,8,["value","options","loading"])]),_:1})]),_:1}),e(o)]),_:1}),e(T,{"title-placement":"left"},{default:a(()=>[C("选填项")]),_:1}),e(q,{"x-gap":"100",cols:3,"layout-shift-disabled":""},{default:a(()=>[e(o,null,{default:a(()=>[e(r,{label:"部门",path:"dept"},{default:a(()=>[e(s,{value:u.value.dept,"onUpdate:value":t[4]||(t[4]=n=>u.value.dept=n),placeholder:"输入部门",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"职称",path:"position"},{default:a(()=>[e(s,{value:u.value.position,"onUpdate:value":t[5]||(t[5]=n=>u.value.position=n),placeholder:"输入职称",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"性别",path:"gender"},{default:a(()=>[e(R,{value:u.value.gender,"onUpdate:value":t[6]||(t[6]=n=>u.value.gender=n),placeholder:"请选择性别",clearable:"",options:[{label:"男",value:"男"},{label:"女",value:"女"}]},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"出生年月",path:"birth"},{default:a(()=>[e(d,{value:u.value.birth,"onUpdate:value":t[7]||(t[7]=n=>u.value.birth=n),placeholder:"请选择出生年月",clearable:"",type:"date"},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"籍贯",path:"nativePlace"},{default:a(()=>[e(s,{value:u.value.nativePlace,"onUpdate:value":t[8]||(t[8]=n=>u.value.nativePlace=n),placeholder:"输入籍贯",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"民族",path:"nation"},{default:a(()=>[e(R,{value:u.value.nation,"onUpdate:value":t[9]||(t[9]=n=>u.value.nation=n),placeholder:"请选择民族",clearable:"",options:N(ue)},null,8,["value","options"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"党派",path:"party"},{default:a(()=>[e(R,{value:u.value.party,"onUpdate:value":t[10]||(t[10]=n=>u.value.party=n),placeholder:"请选择党派",clearable:"",options:N(ne)},null,8,["value","options"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"职务",path:"duties"},{default:a(()=>[e(s,{value:u.value.duties,"onUpdate:value":t[11]||(t[11]=n=>u.value.duties=n),placeholder:"输入职务",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"职称级别",path:"title"},{default:a(()=>[e(s,{value:u.value.title,"onUpdate:value":t[12]||(t[12]=n=>u.value.title=n),placeholder:"请输入职称级别",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"教学职称",path:"teachingTitle"},{default:a(()=>[e(s,{value:u.value.teachingTitle,"onUpdate:value":t[13]||(t[13]=n=>u.value.teachingTitle=n),placeholder:"输入教学职称",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"来院工作时间",path:"joinTime"},{default:a(()=>[e(d,{value:u.value.joinTime,"onUpdate:value":t[14]||(t[14]=n=>u.value.joinTime=n),placeholder:"请选择来院工作时间",clearable:"",type:"datetime"},null,8,["value"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"任职时间",path:"dutyTime"},{default:a(()=>[e(d,{value:u.value.dutyTime,"onUpdate:value":t[15]||(t[15]=n=>u.value.dutyTime=n),placeholder:"请选择任职时间",clearable:"",type:"datetime"},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"取得资格时间",path:"getTime"},{default:a(()=>[e(d,{value:u.value.getTime,"onUpdate:value":t[16]||(t[16]=n=>u.value.getTime=n),placeholder:"请选择取得资格时间",clearable:"",type:"datetime"},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"公示时间",path:"publishTime"},{default:a(()=>[e(d,{value:u.value.publishTime,"onUpdate:value":t[17]||(t[17]=n=>u.value.publishTime=n),placeholder:"请选择公示时间",clearable:"",type:"datetime"},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"学历",path:"education"},{default:a(()=>[e(s,{value:u.value.education,"onUpdate:value":t[18]||(t[18]=n=>u.value.education=n),placeholder:"输入学历",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"学位",path:"degree"},{default:a(()=>[e(s,{value:u.value.degree,"onUpdate:value":t[19]||(t[19]=n=>u.value.degree=n),placeholder:"输入学位",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o),e(o,null,{default:a(()=>[e(r,{label:"毕业学校",path:"graduation"},{default:a(()=>[e(s,{value:u.value.graduation,"onUpdate:value":t[20]||(t[20]=n=>u.value.graduation=n),placeholder:"输入毕业学校",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"毕业专业",path:"major"},{default:a(()=>[e(s,{value:u.value.major,"onUpdate:value":t[21]||(t[21]=n=>u.value.major=n),placeholder:"输入毕业专业",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"毕业时间",path:"graduateTime"},{default:a(()=>[e(d,{value:u.value.graduateTime,"onUpdate:value":t[22]||(t[22]=n=>u.value.graduateTime=n),placeholder:"请选择毕业时间",clearable:"",type:"date"},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"简介",path:"introduction"},{default:a(()=>[e(s,{value:u.value.introduction,"onUpdate:value":t[23]||(t[23]=n=>u.value.introduction=n),type:"textarea",placeholder:"输入简介",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"其他",path:"description"},{default:a(()=>[e(s,{value:u.value.description,"onUpdate:value":t[24]||(t[24]=n=>u.value.description=n),type:"textarea",placeholder:"输入其他",clearable:""},null,8,["value"])]),_:1})]),_:1}),e(o,null,{default:a(()=>[e(r,{label:"备注",path:"memo"},{default:a(()=>[e(s,{value:u.value.memo,"onUpdate:value":t[25]||(t[25]=n=>u.value.memo=n),type:"textarea",placeholder:"输入备注",clearable:""},null,8,["value"])]),_:1})]),_:1})]),_:1}),e(r,null,{default:a(()=>[b("div",ce,[e(l,{"attr-type":"button",onClick:_},{default:a(()=>[C(" 取消 ")]),_:1}),e(l,{loading:U.value,"attr-type":"submit",type:"primary",onClick:B},{default:a(()=>[C(" 修改 ")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["model"])])])}}});const fe=H(me,[["__scopeId","data-v-3777d8f6"]]),ge={class:"cadres-manage-container"},_e={class:"header"},be={class:"importBtn"},ye={class:"search-box"},we={class:"table"},he={class:"footer"},Te={class:"delBtn"},Ne={class:"pagination"},ke=A({__name:"manage",setup($){const y=K(),w=m([]),U=(()=>[{type:"selection"},{title:"干部工号",key:"cadresNumber"},{title:"姓名",key:"cadresName"},{title:"部门",key:"dept"},{title:"职称",key:"position"},{title:"序号",key:"orders"},{title:"所属评审项目",key:"reviewName"},{title:"操作",key:"actions",render(d){return V(E,{},{default:()=>[V(z,{size:"small",type:"warning",onClick:()=>{s(d.id)}},{default:()=>"修改"}),V(ie,{onPositiveClick:()=>{B([d.id])}},{default:()=>"确定要删除吗",trigger:()=>V(z,{size:"small",type:"error"},{default:()=>"删除"})})]})}}])(),u=P([]),v=P({currentPage:1,pageCount:1,pageSize:15,pageSizes:[10,15,20]}),i=P({currentReview:0,options:[{label:"全部",value:0}]}),h=m("");(async()=>{const{data:d}=await L("");i.options=[{label:"全部",value:0}],d.list.forEach(l=>{i.options.push({label:l.reviewName,value:l.reviewId})})})();const I=d=>{i.currentReview=d,_()},F=d=>{v.currentPage=d,_()},D=d=>{v.pageSize=d,_()},f=m(!1),_=async()=>{f.value=!0;const{data:d}=await Z(v.currentPage,v.pageSize,h.value,i.currentReview);if(f.value=!1,u.splice(0),v.pageCount=Math.ceil(d.total/v.pageSize),d.total==0){y.error("无相关数据");return}d.list.forEach(l=>{let k={key:l.cadresId,id:l.cadresId,cadresNumber:l.cadresNumber,cadresName:l.cadresName,dept:l.dept,position:l.position,orders:l.orders,reviewName:l.reviewName};u.push(k)})};_();const B=async d=>{const l=await ee({ids:d});w.value=[],y.success(l.message),_()},c=m(!1),t=m({}),T=m(""),s=async d=>{const l=await le(d);l.data.gender=l.data.gender==""?null:l.data.gender,l.data.birth=l.data.birth==""?null:parseInt(l.data.birth),l.data.nation=l.data.nation==""?null:l.data.nation,l.data.party=l.data.party==""?null:l.data.party,l.data.joinTime=l.data.joinTime==""?null:parseInt(l.data.joinTime),l.data.dutyTime=l.data.dutyTime==""?null:parseInt(l.data.dutyTime),l.data.getTime=l.data.getTime==""?null:parseInt(l.data.getTime),l.data.publishTime=l.data.publishTime==""?null:parseInt(l.data.publishTime),l.data.graduateTime=l.data.graduateTime==""?null:parseInt(l.data.graduateTime),t.value=l.data,c.value=!0},r=()=>{c.value=!1},o=()=>{c.value=!1,_()},x=m(),O=m(null),q=()=>{var d;(d=O.value)==null||d.click()},R=async d=>{const l=d.target.files;if(l==null){y.warning("请上传文件"),d.target.value="";return}if(x.value==null){y.warning("请选择评审项目"),d.target.value="";return}const k=l[0],n=x.value,j=new FormData;j.append("file",k),j.append("reviewId",n.toString()),f.value=!0;try{await ae(j)}catch{f.value=!1,d.target.value="";return}f.value=!1,d.target.value="",_()};return(d,l)=>{const k=p("n-select"),n=p("n-popover"),j=p("n-input"),J=p("n-input-group"),Q=p("n-data-table"),W=p("n-pagination"),X=p("n-modal");return M(),G(re,null,[b("div",ge,[b("div",_e,[b("div",be,[e(n,{trigger:"click",placement:"bottom-start"},{trigger:a(()=>[e(N(z),{loading:f.value},{default:a(()=>[C("Excel 导入")]),_:1},8,["loading"])]),default:a(()=>[e(N(E),null,{default:a(()=>[e(k,{style:{width:"10vw"},value:x.value,"onUpdate:value":l[0]||(l[0]=g=>x.value=g),options:i.options.slice(1)},null,8,["value","options"]),e(N(z),{onClick:q,loading:f.value},{default:a(()=>[C("导入文件")]),_:1},8,["loading"]),b("input",{ref_key:"uploadIpt",ref:O,onChange:l[1]||(l[1]=g=>R(g)),class:"upload-ipt",type:"file",accept:".xlsx"},null,544)]),_:1})]),_:1})]),b("div",ye,[e(N(E),null,{default:a(()=>[e(k,{style:{width:"10vw"},value:i.currentReview,"onUpdate:value":l[2]||(l[2]=g=>i.currentReview=g),options:i.options,"on-update:value":I},null,8,["value","options"]),e(J,null,{default:a(()=>[e(j,{style:{width:"20vw"},placeholder:"通过参评人员名称搜索",value:h.value,"onUpdate:value":l[3]||(l[3]=g=>h.value=g),loading:f.value,onChange:_},null,8,["value","loading"]),e(N(z),{type:"primary",onClick:_,ghost:"",loading:f.value},{default:a(()=>[C(" 搜索 ")]),_:1},8,["loading"])]),_:1})]),_:1})])]),b("div",we,[e(Q,{"flex-height":!0,style:{height:"100%"},"checked-row-keys":w.value,"onUpdate:checkedRowKeys":l[4]||(l[4]=g=>w.value=g),bordered:!1,"single-line":!1,columns:N(U),data:u,loading:f.value},null,8,["checked-row-keys","columns","data","loading"])]),b("div",he,[b("div",Te,[w.value.length!=0?(M(),oe(N(z),{key:0,type:"error",onClick:l[5]||(l[5]=g=>B(w.value))},{default:a(()=>[C("删除"+se(w.value.length)+" 项",1)]),_:1})):de("",!0)]),b("div",Ne,[e(W,{"display-order":["quick-jumper","pages","size-picker"],"page-count":v.pageCount,"default-page":v.currentPage,"page-sizes":v.pageSizes,"page-size":v.pageSize,"show-quick-jumper":"","show-size-picker":"","on-update:page":F,"on-update:page-size":D},null,8,["page-count","default-page","page-sizes","page-size"])])])]),e(X,{show:c.value,"onUpdate:show":l[6]||(l[6]=g=>c.value=g),"mask-closable":!1},{default:a(()=>[e(fe,{updateCadresForm:t.value,updateReviewName:T.value,"close-modal":r,"update-after":o},null,8,["updateCadresForm","updateReviewName"])]),_:1},8,["show"])],64)}}});const xe=H(ke,[["__scopeId","data-v-56ea4049"]]);export{xe as default};
