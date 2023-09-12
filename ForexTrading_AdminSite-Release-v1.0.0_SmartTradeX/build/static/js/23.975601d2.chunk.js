(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[23],{457:function(e,t,a){"use strict";var c=a(14),n=a(20),s=a(0),r=a.n(s),i=a(5),l=a.n(i),o=a(55),b=a.n(o),d=a(77),u={tag:d.q,size:l.a.string,className:l.a.string,cssModule:l.a.object},j=function(e){var t=e.className,a=e.cssModule,s=e.tag,i=e.size,l=Object(n.a)(e,["className","cssModule","tag","size"]),o=Object(d.m)(b()(t,"input-group",i?"input-group-"+i:null),a);return r.a.createElement(s,Object(c.a)({},l,{className:o}))};j.propTypes=u,j.defaultProps={tag:"div"},t.a=j},459:function(e,t,a){"use strict";var c=a(0),n=a.n(c),s=a(5),r=a.n(s),i=a(456),l={addonType:r.a.oneOf(["prepend","append"]).isRequired,children:r.a.node},o=function(e){return n.a.createElement(i.a,e)};o.propTypes=l,t.a=o},829:function(e,t,a){"use strict";a.r(t);var c=a(29),n=a(1),s=a(15),r=a(0),i=a(114),l=a(448),o=a.n(l),b=a(445),d=a(449),u=a.n(d),j=a(532),m=a(450),p=a.n(m),O=a(451),f=a.n(O),g=a(452),h=a(790),v=a(471),x=a(472),N=a(815),S=a(816),k=a(457),R=a(459),y=a(842),C=a(809),T=a(811),w=a(843),I=a(813),z=a(6),L={filter:{status:""},skip:0,limit:20,order:{key:"createdAt",value:"desc"}},A=["userName","phoneNumber"],D=function(){var e=[{name:"ID",selector:"betRecordId",sortable:!0},{name:"Username",selector:"username",sortable:!0,minWidth:"200px"},{name:"Daily Date",selector:"createdAt",sortable:!0,cell:function(e){var t=e.createdAt;return Object(z.jsx)("div",{children:f()(t).format("lll")})}},{name:"Total Bet",selector:"betRecordAmountIn",sortable:!0,cell:function(e){var t=e.betRecordAmountIn;return Object(z.jsx)("div",{children:Object(g.c)(t)})}},{name:"Total Win/Lose",selector:"betRecordWin",sortable:!0,cell:function(e){var t=e.betRecordWin;return Object(z.jsx)("div",{children:Object(g.c)(t)})}},{name:"Type",selector:"betRecordType",sortable:!0,cell:function(e){var t=e.betRecordType;return Object(z.jsx)("div",{children:t.replace("Bet","")})}},{name:"Section",selector:"betRecordSection",sortable:!0,cell:function(e){var t=e.betRecordSection;return Object(z.jsx)("div",{children:t})}},{name:"Note",selector:"betRecordNote",sortable:!0,cell:function(e){var t=e.betRecordNote;return Object(z.jsx)(z.Fragment,{children:t})}},{name:"Unit",selector:"betRecordUnit",sortable:!0,cell:function(e){var t=e.betRecordUnit;return Object(z.jsx)("div",{children:t.replace("-USD","")})}},{name:"Result",selector:"betRecordResult",sortable:!0,cell:function(e){var t=e.betRecordResult;return Object(z.jsx)("div",{children:t})}}],t=Object(r.useState)(L),a=Object(s.a)(t,2),l=a[0],d=a[1],m=Object(r.useState)(1),O=Object(s.a)(m,2),D=O[0],P=O[1],E=Object(r.useState)(20),U=Object(s.a)(E,2),B=U[0],F=U[1],M=Object(r.useState)(20),W=Object(s.a)(M,2),q=W[0],J=W[1],H=Object(r.useState)([]),G=Object(s.a)(H,2),K=G[0],Q=G[1],V=Object(r.useState)(!1),X=Object(s.a)(V,2),Y=X[0],Z=X[1],$=Object(r.useState)(""),_=Object(s.a)($,2),ee=_[0],te=_[1],ae=Object(r.useState)("username"),ce=Object(s.a)(ae,2),ne=ce[0],se=ce[1],re=Object(r.useState)(!1),ie=Object(s.a)(re,2),le=ie[0],oe=ie[1],be=Object(r.useState)(!1),de=Object(s.a)(be,2),ue=de[0],je=de[1],me=Object(r.useState)(""),pe=Object(s.a)(me,2),Oe=pe[0],fe=(pe[1],Object(r.useState)(0)),ge=Object(s.a)(fe,2),he=(ge[0],ge[1]);function ve(e,t){var a=Object(n.a)({},e);t||Z(!0),Object.keys(a.filter).forEach((function(e){a.filter[e]&&""!==a.filter[e]||delete a.filter[e]}));var c=window.localStorage.getItem("accessToken");if(c){var s=c.replace(/"/g,"");b.a.send({method:"POST",path:"BetRecords/staffFind",data:a,query:null,headers:{Authorization:"Bearer "+s}}).then((function(e){if(e){var c=e.statusCode,n=e.data,s=e.message;d(a),200===c?(J(n.total),Q(n.data),he(n.totalSum)):i.c.warn(s||"Something was wrong!")}else J(1),Q([]);t||Z(!1)}))}else window.localStorage.clear()}var xe=o.a.debounce((function(e){ve(e,!0)}),2e3);Object(r.useEffect)((function(){ve(l)}),[]);return Object(z.jsxs)(r.Fragment,{children:[Object(z.jsxs)(h.a,{children:[Object(z.jsxs)(v.a,{className:"mx-0 mt-1 mb-50",children:[Object(z.jsx)(x.a,{sm:"8",children:Object(z.jsxs)("div",{className:"d-flex align-items-center",children:[Object(z.jsx)(N.a,{for:"sort-select",children:"show"}),Object(z.jsxs)(S.a,{className:"dataTable-select",type:"select",bsSize:"sm",id:"sort-select",value:B,onChange:function(e){return function(e){ve(Object(n.a)(Object(n.a)({},l),{},{limit:parseInt(e.target.value),skip:0})),P(1),F(parseInt(e.target.value))}(e)},children:[Object(z.jsx)("option",{value:20,children:"20"}),Object(z.jsx)("option",{value:50,children:"50"}),Object(z.jsx)("option",{value:100,children:"100"})]}),Object(z.jsx)(N.a,{for:"sort-select",children:"entries"})]})}),Object(z.jsxs)(x.a,{className:"d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1",sm:"4",children:[Object(z.jsx)(N.a,{className:"mr-1",for:"search-input",children:"Search"}),Object(z.jsxs)(k.a,{className:"input-search-group",children:[Object(z.jsxs)(R.a,{addonType:"prepend",isOpen:le,toggle:function(){oe(!le)},children:[Object(z.jsx)(y.a,{size:"sm",color:"primary",caret:!0,outline:!0,children:ne}),Object(z.jsx)(C.a,{children:A.map((function(e){return Object(z.jsx)(T.a,{className:"dropdownItem-search",onClick:function(){!function(e){var t=Object(n.a)(Object(n.a)({},l),{},{skip:0});A.forEach((function(e){delete t.filter[e]})),t.filter[e]="",te(""),se(e),ve(t)}(e)},children:e},e)}))})]}),Object(z.jsx)(S.a,{className:"dataTable-filter",type:"text",bsSize:"sm",id:"search-input",value:ee,onChange:function(e){!function(e){var t=e.target.value;te();var a=Object(n.a)(Object(n.a)({},l),{},{filter:Object(n.a)(Object(n.a)({},l.filter),{},Object(c.a)({},ne,t)),skip:0});xe(a)}(e)}})]})]})]}),Object(z.jsx)(p.a,{noHeader:!0,pagination:!0,paginationServer:!0,className:"react-dataTable",columns:e,sortIcon:Object(z.jsx)(j.a,{size:10}),paginationComponent:function(){var e=Number(Math.ceil(q/B).toFixed(0));return Object(z.jsx)(u.a,{previousLabel:"",nextLabel:"",breakLabel:"...",pageCount:e||1,marginPagesDisplayed:2,pageRangeDisplayed:2,activeClassName:"active",forcePage:0!==D?D-1:0,onPageChange:function(e){return function(e){ve(Object(n.a)(Object(n.a)({},l),{},{skip:e.selected*l.limit})),P(e.selected+1)}(e)},pageClassName:"page-item",nextLinkClassName:"page-link",nextClassName:"page-item next",previousClassName:"page-item prev",previousLinkClassName:"page-link",pageLinkClassName:"page-link",breakClassName:"page-item",breakLinkClassName:"page-link",containerClassName:"pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"})},data:K,progressPending:Y})]}),Object(z.jsx)(w.a,{isOpen:ue,toggle:function(){return je(!1)},className:"modal-dialog-centered ",children:Object(z.jsx)(I.a,{children:Oe})})]})};t.default=Object(r.memo)(D)}}]);
//# sourceMappingURL=23.975601d2.chunk.js.map