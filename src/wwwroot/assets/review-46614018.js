import{v as t}from"./index-ddeb11e4.js";const v=e=>t({url:"review/addReview",method:"post",data:e}),a=(e,r,s)=>t({url:`review/getReviews/${e}/${r}?search=${s}`,method:"get"}),d=e=>t({url:`review/getReviewsBasic?search=${e}`,method:"get"}),o=e=>t({url:"review/deleteReviews",method:"delete",data:e}),w=e=>t({url:"review/updateReview",method:"post",data:e});export{v as a,d as b,o as d,a as g,w as u};
