import{v as t}from"./index-ddeb11e4.js";const o=e=>t({url:"expert/addExpert",method:"post",data:e}),a=e=>t({url:"expert/addManyExperts",method:"post",data:e}),x=(e,r,s,p)=>t({url:`expert/getExperts/${e}/${r}?search=${s}&reviewId=${p}`,method:"get"}),u=e=>t({url:"expert/deleteExperts",method:"delete",data:e}),n=e=>t({url:"expert/updateExpert",method:"post",data:e}),E=e=>t({url:"expert/resetExpertPassword",method:"post",data:e});export{o as a,u as d,x as g,a as i,E as r,n as u};