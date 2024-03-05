import{o as e,e as a,b as t,_ as s,d as l,C as i,r,a as o,w as c,F as n,J as d,c as u,L as v,t as m,a0 as p,n as w,u as h,g as b,f as y}from"./index-4336d1e5.js";const f={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},g=[t("path",{d:"M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4l260.7-260.7c6.2-6.2 16.4-6.2 22.6 0"},null,-1)];const x={render:function(t,s){return e(),a("svg",f,[...g])}},k={class:"page-header"},z={class:"ph-text"},_=t("h2",{class:"title"},"UI Form Wizard",-1),C=["href","onClick"],S={class:"bi-label"},B={class:"bi-label"},D={class:"wizard-wrapper"},q=t("div",{class:"wizard-progress"},[t("span",{class:"wp-value"})],-1),F={class:"wizard-steps"},W={class:"ws-item-icon"},L={key:1},T={class:"ws-item-title"},j={class:"wizard-content"},H=["data-index"],I={class:"wc-action"},J=s({__name:"form-wizard",setup(s){l(""),l(""),l("");var f=l(1);const g=l([{id:1,title:"Registration",text:"This is the registration content"},{id:2,title:"Contact Details",text:"This is where you add the contact details"},{id:3,title:"College Details",text:"College Details are here"}]),J=l([{label:"Home",route:"/home"},{label:"Bidder",route:"/home"},{label:"Components",route:"/ui/form-wizard"},{label:"Form Wizard"}]);function M(){const e=document.querySelector(".wizard-progress"),a=document.querySelector(".wizard-progress .wp-value"),t=document.querySelector(".wizard-steps .ws-item"),s=g.value.length,l=t.scrollWidth,i=l*(s-1);e.style.width=i+"px",a.style.width=l*f.value+"px"}return i((()=>{M()})),(s,l)=>{const i=r("router-link"),N=r("Breadcrumb"),P=r("Button");return e(),a("div",null,[t("div",k,[t("div",z,[_,o(N,{model:J.value},{item:c((({item:s,props:l})=>[s.route?(e(),u(i,{key:0,to:s.route,custom:""},{default:c((({href:e,navigate:a})=>[t("a",v({href:e},l.action,{onClick:a}),[t("span",S,m(s.label),1)],16,C)])),_:2},1032,["to"])):(e(),a("span",p(v({key:1},l.action)),[t("span",B,m(s.label),1)],16))])),_:1},8,["model"])])]),t("div",D,[q,t("div",F,[(e(!0),a(n,null,d(g.value,((s,l)=>(e(),a("div",{class:w(["ws-item",[{active:l==h(f)},{completed:l<h(f)}]]),key:l},[t("div",W,[l<h(f)?(e(),u(h(x),{key:0})):(e(),a("span",L,m(l+1),1))]),t("div",T,m(s.title),1)],2)))),128))]),t("div",j,[(e(!0),a(n,null,d(g.value,((t,s)=>(e(),a(n,{key:s},[s==h(f)?(e(),a("div",{key:0,class:"wc-item","data-index":s}," Step "+m(s),9,H)):b("",!0)],64)))),128)),t("div",I,[o(P,{severity:"secondary",class:"btn-prev",onClick:l[0]||(l[0]=e=>(f.value=f.value-1,void M()))},{default:c((()=>[y("Previous")])),_:1}),o(P,{severity:"secondary",class:"btn-next",onClick:l[1]||(l[1]=e=>(f.value=f.value+1,void M()))},{default:c((()=>[y("Next")])),_:1}),o(P,{class:"btn-submit"},{default:c((()=>[y("Submit")])),_:1})])])])])}}},[["__file","D:/acution-live/auction-server/auction-live/src/views/ui/form-wizard.vue"]]);export{J as default};
//# sourceMappingURL=form-wizard-22c0144a.js.map
