(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[18],{443:function(e,a,c){},492:function(e,a,c){},793:function(e,a,c){},826:function(e,a,c){"use strict";c.r(a);var t=c(29),n=c(1),r=c(15),i=c(0),o=c(114),s=c(548),d=c(539),l=c(448),m=c.n(l),j=(c(793),c(453)),u=(c(443),c(445)),b=c(449),g=c.n(b),O=c(532),p=c(450),h=c.n(p),R=c(808),v=c(842),x=c(809),f=c(811),y=c(790),S=c(471),T=c(472),C=c(815),U=c(816),N=c(440),k=c(843),w=c(812),D=c(813),E=c(814),P=c(806),A=c(452),I=(c(581),c(451)),L=c.n(I),q=(c(492),c(6)),z=[{value:"ETH-USD",label:"ETH"},{value:"BTC-USD",label:"BTC"}],G={filter:{gameRecordUnit:"BTC-USD"},skip:0,limit:20,order:{key:"createdAt",value:"desc"}},H=function(){var e=[{name:"Id",selector:"gameRecordId",sortable:!0},{name:"Price",selector:"gameRecordPrice",sortable:!0,cell:function(e){var a=e.gameRecordPrice;return Object(q.jsx)("div",{children:Object(A.c)(a)})}},{name:"Unit",selector:"gameRecordUnit",sortable:!0,cell:function(e){var a=e.gameRecordUnit;return Object(q.jsx)("div",{children:a.replace("-USD","")})}},{name:"Section",selector:"gameRecordSection",sortable:!0,cell:function(e){var a=e.gameRecordSection;return Object(q.jsx)("div",{children:a})}},{name:"Note",selector:"gameRecordNote",sortable:!0,cell:function(e){var a=e.gameRecordNote;return Object(q.jsx)("div",{children:a})}},{name:"Up/Down",selector:"gameRecordStatus",sortable:!0,cell:function(e){var a=e.gameRecordTypeUp;return Object(q.jsx)("div",{className:a?"gameRecordTypeUp":"gameRecordTypeDonw",children:a?"L":"X"})}},{name:"Odd/Even",selector:"gameRecordStatus",sortable:!0,cell:function(e){var a=e.gameRecordTypeOdd;return Object(q.jsx)("div",{className:a?"gameRecordTypeOdd":"gameRecordTypeEven",children:a?"L":"C"})}},{name:"Status",selector:"gameRecordStatus",sortable:!0},{name:"Action",selector:"action",cell:function(e){var a=e.gameRecordPrice,c=e.gameRecordTypeUp,t=e.gameRecordTypeDown,n=e.gameRecordTypeOdd,r=e.gameRecordTypeEven,i=e.gameRecordUnit,o=e.gameRecordSection,l=e.gameRecordNote,m=e.gameRecordStatus,j=e.gameRecordId;return Object(q.jsxs)(R.a,{children:[Object(q.jsx)(v.a,{className:"icon-btn hide-arrow",color:"transparent",size:"sm",caret:!0,children:Object(q.jsx)(s.a,{size:15})}),Object(q.jsx)(x.a,{right:!0,children:Object(q.jsxs)(f.a,{href:"/",onClick:function(e){e.preventDefault(),B(!0),ke({gameRecordPrice:a,gameRecordTypeUp:c,gameRecordTypeDown:t,gameRecordTypeOdd:n,gameRecordTypeEven:r,gameRecordUnit:i,gameRecordSection:o,gameRecordNote:l,gameRecordStatus:m,gameRecordId:j})},children:[Object(q.jsx)(d.a,{className:"mr-50",size:15})," ",Object(q.jsx)("span",{className:"align-middle",children:"Edit"})]})})]})}}],a=Object(i.useState)(G),c=Object(r.a)(a,2),l=c[0],b=c[1],p=Object(i.useState)(!1),I=Object(r.a)(p,2),H=I[0],B=I[1],M=Object(i.useState)(!1),F=Object(r.a)(M,2),J=F[0],V=F[1],X=Object(i.useState)(1),K=Object(r.a)(X,2),Q=K[0],W=K[1],Y=Object(i.useState)(20),Z=Object(r.a)(Y,2),$=Z[0],_=Z[1],ee=Object(i.useState)(20),ae=Object(r.a)(ee,2),ce=ae[0],te=ae[1],ne=Object(i.useState)([]),re=Object(r.a)(ne,2),ie=re[0],oe=re[1],se=Object(i.useState)(!1),de=Object(r.a)(se,2),le=de[0],me=de[1],je=Object(i.useState)(""),ue=Object(r.a)(je,2),be=(ue[0],ue[1],Object(i.useState)("username")),ge=Object(r.a)(be,2),Oe=(ge[0],ge[1],Object(i.useState)(!1)),pe=Object(r.a)(Oe,2),he=(pe[0],pe[1],Object(i.useState)([])),Re=Object(r.a)(he,2),ve=Re[0],xe=Re[1],fe=Object(j.a)({defaultValues:{}}),ye=fe.register,Se=fe.errors,Te=fe.handleSubmit,Ce=Object(i.useState)({}),Ue=Object(r.a)(Ce,2),Ne=Ue[0],ke=Ue[1];function we(e,a){var c=Object(n.a)({},e);a||me(!0),Object.keys(c.filter).forEach((function(e){c.filter[e]&&""!==c.filter[e]||delete c.filter[e]}));var t=window.localStorage.getItem("accessToken");if(t){var r=t.replace(/"/g,"");u.a.send({method:"POST",path:"Game/getList",data:c,query:null,headers:{Authorization:"Bearer "+r}}).then((function(e){if(e){var t=e.statusCode,n=e.data,r=e.message;b(c),200===t?(te(n.total),oe(n.data)):o.c.warn(r||"Something was wrong!")}else te(1),oe([]);a||me(!1)}))}else window.localStorage.clear()}m.a.debounce((function(e){we(e,!0)}),2e3);Object(i.useEffect)((function(){we(l),u.a.send({method:"POST",path:"Game/gameSectionList",data:{},query:null}).then((function(e){if(e){var a=e.statusCode,c=e.data;200===a&&xe(c.data)}}))}),[]);var De=function(e,a){ke(Object(n.a)(Object(n.a)({},Ne),{},Object(t.a)({},e,a)))};return Object(q.jsx)(i.Fragment,{children:Object(q.jsxs)(y.a,{className:"accountAdmin",children:[Object(q.jsxs)(S.a,{className:"mx-0 mt-1 mb-50",children:[Object(q.jsx)(T.a,{sm:"8",children:Object(q.jsxs)("div",{className:"d-flex align-items-center",children:[Object(q.jsx)(C.a,{for:"sort-select",children:"show"}),Object(q.jsxs)(U.a,{className:"dataTable-select",type:"select",bsSize:"sm",id:"sort-select",value:$,onChange:function(e){return function(e){we(Object(n.a)(Object(n.a)({},l),{},{limit:parseInt(e.target.value),skip:0})),W(1),_(parseInt(e.target.value))}(e)},children:[Object(q.jsx)("option",{value:20,children:"20"}),Object(q.jsx)("option",{value:50,children:"50"}),Object(q.jsx)("option",{value:100,children:"100"})]}),Object(q.jsx)(C.a,{for:"sort-select",children:"entries"})]})}),Object(q.jsx)(T.a,{sm:"2",children:Object(q.jsx)(U.a,{onChange:function(e){var a=e.target;!function(e,a){we(Object(n.a)(Object(n.a)({},l),{},{filter:Object(n.a)(Object(n.a)({},l.filter),{},Object(t.a)({},e,a)),skip:0}))}(a.name,a.value)},type:"select",value:l.filter&&l.filter.gameRecordUnit||"",name:"gameRecordUnit",bsSize:"sm",children:z.map((function(e){return Object(q.jsx)("option",{value:e.value,children:e.label})}))})}),Object(q.jsx)(T.a,{sm:"1",children:Object(q.jsx)(N.a.Ripple,{color:"primary",size:"sm",onClick:function(){V(!0),ke({gameRecordUnit:"ETH-USD",gameRecordCount:10,gameRecordSection:L()().format("HH:mm")+":00"})},children:"Records"})}),Object(q.jsx)(T.a,{sm:"1",children:Object(q.jsx)(N.a.Ripple,{color:"primary",size:"sm",onClick:function(){B(!0),ke({gameRecordTypeUp:1,gameRecordTypeOdd:1,gameRecordUnit:"ETH-USD",gameRecordStatus:"New",gameRecordSection:L()().format("HH:mm")+":00"})},children:"Add"})})]}),Object(q.jsx)(h.a,{noHeader:!0,pagination:!0,paginationServer:!0,className:"react-dataTable",columns:e,sortIcon:Object(q.jsx)(O.a,{size:10}),paginationComponent:function(){var e=Number(Math.ceil(ce/$).toFixed(0));return Object(q.jsx)(g.a,{previousLabel:"",nextLabel:"",breakLabel:"...",pageCount:e||1,marginPagesDisplayed:2,pageRangeDisplayed:2,activeClassName:"active",forcePage:0!==Q?Q-1:0,onPageChange:function(e){return function(e){we(Object(n.a)(Object(n.a)({},l),{},{skip:e.selected*l.limit})),W(e.selected+1)}(e)},pageClassName:"page-item",nextLinkClassName:"page-link",nextClassName:"page-item next",previousClassName:"page-item prev",previousLinkClassName:"page-link",pageLinkClassName:"page-link",breakClassName:"page-item",breakLinkClassName:"page-link",containerClassName:"pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"})},data:ie,progressPending:le}),Object(q.jsxs)(k.a,{isOpen:H,toggle:function(){return B(!1)},className:"modal-dialog-centered ",children:[Object(q.jsxs)(w.a,{toggle:function(){return B(!1)},children:[Ne.gameRecordId?"Edit":"Add"," Game Control"]}),Object(q.jsx)(D.a,{children:Object(q.jsxs)(E.a,{onSubmit:Te((function(){var e,a,c={gameRecordTypeUp:Ne.gameRecordTypeUp||0,gameRecordTypeDown:Ne.gameRecordTypeDown||0,gameRecordTypeOdd:Ne.gameRecordTypeOdd||0,gameRecordTypeEven:Ne.gameRecordTypeEven||0,gameRecordUnit:Ne.gameRecordUnit,gameRecordSection:Ne.gameRecordSection,gameRecordNote:Ne.gameRecordNote};Ne.gameRecordId?(e={id:Ne.gameRecordId,data:c},u.a.send({method:"POST",path:"Game/updateById",data:e,query:null}).then((function(e){if(e){var c=e.statusCode,t=e.message;200===c?(o.c.success(a||"Action update successful!"),we(l)):o.c.warn(t||"Something was wrong!")}}))):function(e,a){u.a.send({method:"POST",path:"Game/insert",data:e,query:null}).then((function(e){if(e){var c=e.statusCode,t=e.message;200===c?(o.c.success(a||"Action Add Game Control successful!"),we(l)):o.c.warn(t||"Something was wrong!")}}))}(c),B(!1)})),children:[Object(q.jsxs)(P.a,{children:[Object(q.jsx)(C.a,{for:"gameRecordSection",children:"Section"}),Object(q.jsx)(U.a,{type:"select",name:"gameRecordSection",innerRef:ye({required:!0}),invalid:Se.gameRecordSection&&!0,value:Ne.gameRecordSection,onChange:function(e){var a=e.target,c=a.name,t=a.value;De(c,t)},children:ve.map((function(e,a){return Object(q.jsx)("option",{value:e.value,children:e.label})}))})]}),Object(q.jsx)(P.a,{children:Object(q.jsxs)("div",{className:"demo-inline-spacing",children:[Object(q.jsx)(P.a,{check:!0,inline:!0,children:Object(q.jsxs)(C.a,{check:!0,children:[Object(q.jsx)(U.a,{onChange:function(e){ke(Object(n.a)(Object(n.a)({},Ne),{},{gameRecordTypeUp:1,gameRecordTypeDown:0}))},type:"radio",name:"gameRecordTypeUp",checked:Ne.gameRecordTypeUp})," Up"]})}),Object(q.jsx)(P.a,{check:!0,inline:!0,children:Object(q.jsxs)(C.a,{check:!0,children:[Object(q.jsx)(U.a,{onChange:function(e){ke(Object(n.a)(Object(n.a)({},Ne),{},{gameRecordTypeUp:0,gameRecordTypeDown:1}))},type:"radio",name:"gameRecordTypeDown",checked:Ne.gameRecordTypeDown})," Down"]})})]})}),Object(q.jsx)(P.a,{children:Object(q.jsxs)("div",{className:"demo-inline-spacing",children:[Object(q.jsx)(P.a,{check:!0,inline:!0,children:Object(q.jsxs)(C.a,{check:!0,children:[Object(q.jsx)(U.a,{onChange:function(e){ke(Object(n.a)(Object(n.a)({},Ne),{},{gameRecordTypeOdd:1,gameRecordTypeEven:0}))},type:"radio",name:"gameRecordTypeOdd",checked:Ne.gameRecordTypeOdd})," Odd"]})}),Object(q.jsx)(P.a,{check:!0,inline:!0,children:Object(q.jsxs)(C.a,{check:!0,children:[Object(q.jsx)(U.a,{onChange:function(e){ke(Object(n.a)(Object(n.a)({},Ne),{},{gameRecordTypeOdd:0,gameRecordTypeEven:1}))},type:"radio",name:"gameRecordTypeEven",checked:Ne.gameRecordTypeEven})," Even"]})})]})}),Object(q.jsxs)(P.a,{children:[Object(q.jsx)(C.a,{children:"Unit"}),Object(q.jsx)(U.a,{type:"select",name:"gameRecordUnit",innerRef:ye({required:!0}),invalid:Se.gameRecordUnit&&!0,value:Ne.gameRecordUnit,onChange:function(e){var a=e.target,c=a.name,t=a.value;De(c,t)},children:z.map((function(e,a){return Object(q.jsx)("option",{value:e.value,children:e.label})}))})]}),Object(q.jsx)(P.a,{className:"d-flex mb-0",children:Object(q.jsx)(N.a.Ripple,{className:"mr-1",color:"primary",type:"submit",children:"Submit"})})]})})]}),Object(q.jsxs)(k.a,{isOpen:J,toggle:function(){return V(!1)},className:"modal-dialog-centered ",children:[Object(q.jsx)(w.a,{toggle:function(){return V(!1)},children:"Add Many Game Control"}),Object(q.jsx)(D.a,{children:Object(q.jsxs)(E.a,{onSubmit:Te((function(){var e,a;e=Ne,u.a.send({method:"POST",path:"Game/insertMany",data:e,query:null}).then((function(e){if(e){var c=e.statusCode,t=e.message;200===c?(o.c.success(a||"Action Add Many Game Control successful!"),we(l)):o.c.warn(t||"Something was wrong!")}})),V(!1)})),children:[Object(q.jsxs)(P.a,{children:[Object(q.jsx)(C.a,{for:"gameRecordSection",children:"Section"}),Object(q.jsx)(U.a,{type:"select",name:"gameRecordSection",innerRef:ye({required:!0}),invalid:Se.gameRecordSection&&!0,value:Ne.gameRecordSection,onChange:function(e){var a=e.target,c=a.name,t=a.value;De(c,t)},children:ve.map((function(e,a){return Object(q.jsx)("option",{value:e.value,children:e.label})}))})]}),Object(q.jsxs)(P.a,{children:[Object(q.jsx)(C.a,{children:"Record"}),Object(q.jsxs)(U.a,{type:"select",name:"gameRecordCount",innerRef:ye({required:!0}),invalid:Se.gameRecordCount&&!0,value:Ne.gameRecordCount,onChange:function(e){var a=e.target,c=a.name,t=a.value;De(c,t)},children:[Object(q.jsx)("option",{value:10,children:"10"}),Object(q.jsx)("option",{value:20,children:"20"}),Object(q.jsx)("option",{value:30,children:"30"}),Object(q.jsx)("option",{value:40,children:"40"}),Object(q.jsx)("option",{value:50,children:"50"})]})]}),Object(q.jsxs)(P.a,{children:[Object(q.jsx)(C.a,{children:"Unit"}),Object(q.jsx)(U.a,{type:"select",name:"gameRecordUnit",innerRef:ye({required:!0}),invalid:Se.gameRecordUnit&&!0,value:Ne.gameRecordUnit,onChange:function(e){var a=e.target,c=a.name,t=a.value;De(c,t)},children:z.map((function(e,a){return Object(q.jsx)("option",{value:e.value,children:e.label})}))})]}),Object(q.jsx)(P.a,{className:"d-flex mb-0",children:Object(q.jsx)(N.a.Ripple,{className:"mr-1",color:"primary",type:"submit",children:"Submit"})})]})})]})]})})};a.default=Object(i.memo)(H)}}]);
//# sourceMappingURL=18.6e11fbfa.chunk.js.map