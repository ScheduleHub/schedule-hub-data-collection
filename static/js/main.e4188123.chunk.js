(this["webpackJsonpschedule-planner"]=this["webpackJsonpschedule-planner"]||[]).push([[0],{106:function(e,a,t){},110:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),l=t.n(o),c=t(36),s=t(24),i=t(58),u=t(59),m=t(67),d=t(66),h=t(144),p=t(165),g=t(169),f=t(168),b=t(149),E=t(150),k=t(151),S=t(152),C=t(28),w=t(153),y=t(154),v=t(164),O=t(155),x=t(156),P=t(157),I=t(158),N=t(159),A=t(160),j=t(161),D=t(162),T=t(111),q=t(163),z=t(167),W=t(44),G=t(43),R=t.n(G),J=t(17),L=t.n(J),U=(t(106),function(e){return void 0===e?null:"".concat(e.subject," ").concat(e.catalog_number)}),Z=t(60),$=t.n(Z),_=t(61),B=t.n(_),F=t(62),M=t.n(F),Q="Your course info cannot be read. Please try again and make sure the text is not modified.",Y=Object(d.a)({palette:{primary:{main:W.a[300],dark:"#ba2d65",light:"#ff94c2"}}}),H=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(i.a)(this,Object(u.a)(a).call(this,e))).validate=function(e,a){var n=L.a.uniq(e).sort(),r=a.sort();L.a.isEqual(n,r)?t.setState({dialogOpen:!0}):(console.log("original courses and courses from course code do not match"),t.showSnackbar("warning",Q))},t.loadCourseInfo=function(e,a){t.setState({fullPageOverlayOpen:!0});var n=R.a.create({baseURL:"https://api.uwaterloo.ca/v2/courses",timeout:1e4}),r=e.map((function(e){return n.get("/".concat(e,"/schedule.json"),{params:{key:"e11fd522920fbd64cb49ecd93464e8a3"}})}));R.a.all(r).then((function(e){var n=e.map((function(e){return e.data.data})).map((function(e){return U(e[0])}));t.setState({fullPageOverlayOpen:!1}),n.includes(null)?(console.log("course not found with 4-digit course number"),t.showSnackbar("warning",Q)):t.validate(n,a)})).catch((function(e){e.message==="timeout of ".concat(1e4,"ms exceeded")?t.showSnackbar("error","Network Timeout. Could be the problem of the server. Please try again later."):t.showSnackbar("error",e.message),console.log(e),t.setState({fullPageOverlayOpen:!1})}))},t.parseCourses=function(e){var a=e.match(/^\d{4}$/gm),n=e.match(/[A-Z]{2,6} \d{1,3}[A-Z]? - /g).map((function(e){return e.substring(0,e.length-3)}));if(e.match(/^\d{3}$/gm).length!==a.length)return console.log("number of course numbers and catlog numbers doesn't match"),void t.showSnackbar("warning",Q);t.setState({courseCodes:a.map((function(e){return parseInt(e,10)}))}),t.loadCourseInfo(a,n)},t.showSnackbar=function(e,a){t.setState({snackbarTheme:e,snackbarText:a,snackbarOpen:!0})},t.hideSnackbar=function(e,a){"clickaway"!==a&&t.setState({snackbarOpen:!1})},t.handleDialogClose=function(){t.hideSnackbar(),t.setState({dialogOpen:!1,rawCourses:""})},t.handleRawCoursesInputChange=function(e){t.setState({rawCourses:e})},t.handleNextStepClick=function(){t.hideSnackbar();var e=t.state.rawCourses;try{t.parseCourses(e)}catch(a){console.log(a),t.showSnackbar("warning",Q)}},t.handleEmailAddressChange=function(e){t.setState({questId:e})},t.handleSubmitClick=function(){var e=t.state,a=e.questId,n=e.courseCodes;if(a){t.setState({fullPageOverlayOpen:!0});R.a.post("https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/handlescheduleinput",{id:a,sections:n},{timeout:8e3}).then((function(e){console.log(e),t.showSnackbar("success","Thank you! We will notify you by email if you win the prize."),t.setState({fullPageOverlayOpen:!1})})).catch((function(e){e.message==="timeout of ".concat(8e3,"ms exceeded")?t.showSnackbar("error","Network Timeout. Please check your internet connection."):t.showSnackbar("error",e.message),console.log(e),t.setState({fullPageOverlayOpen:!1})})),t.handleDialogClose()}else t.showSnackbar("warning","Email address cannot be empty!")},t.handlePaste=function(e){t.hideSnackbar(),console.log(e),t.setState({rawCourses:e});try{t.parseCourses(e)}catch(a){console.log(a),t.showSnackbar("warning",Q)}},t.state={rawCourses:"",snackbarOpen:!1,fullPageOverlayOpen:!1,dialogOpen:!1,questId:"",courseCodes:"",snackbarTheme:"",snackbarText:""},t}return Object(m.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this,a=this.state,t=a.snackbarOpen,n=a.fullPageOverlayOpen,o=a.dialogOpen,l=a.snackbarTheme,c=a.snackbarText,s=a.rawCourses;return r.a.createElement(h.a,{theme:Y},r.a.createElement(p.a,{p:2},r.a.createElement(g.a,null),r.a.createElement(f.a,{open:t,onClose:this.hideSnackbar,anchorOrigin:{vertical:"top",horizontal:"center"}},r.a.createElement(z.a,{severity:l,onClose:this.hideSnackbar},c)),r.a.createElement("img",{src:$.a,alt:"Logo",className:"logo"}),r.a.createElement(b.a,{container:!0,justify:"center",spacing:6},r.a.createElement(b.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(E.a,{className:"card",raised:!0},r.a.createElement(k.a,{title:"Step 1",className:"header"}),r.a.createElement(S.a,null,r.a.createElement(C.a,{variant:"body1"},"Go to\xa0",r.a.createElement(w.a,{href:"https://quest.pecs.uwaterloo.ca/psp/SS/ACADEMIC/SA/?cmd=login&languageCd=ENG",target:"_blank"},"Quest"),'\xa0and click "Class Schedule".')),r.a.createElement(y.a,{image:B.a,title:"Go to Class Schedule",className:"step-img"}))),r.a.createElement(b.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(E.a,{className:"card",raised:!0},r.a.createElement(k.a,{title:"Step 2",className:"header"}),r.a.createElement(S.a,null,r.a.createElement(C.a,{variant:"body1"},"Choose your term, select all and copy.")),r.a.createElement(y.a,{image:M.a,title:"Select All and Copy",className:"step-img"}))),r.a.createElement(b.a,{item:!0,xs:12,md:4,lg:3},r.a.createElement(E.a,{raised:!0,style:{display:"flex",flexDirection:"column",height:"100%"}},r.a.createElement(k.a,{title:"Step 3",className:"header"}),r.a.createElement(S.a,null,r.a.createElement(p.a,{mb:2},r.a.createElement(C.a,{variant:"body1"},"Paste into the box below.")),r.a.createElement(v.a,{value:s,onPaste:function(a){return e.handlePaste(a.clipboardData.getData("text/plain"))},multiline:!0,required:!0,variant:"outlined",fullWidth:!0,rows:14,onChange:function(a){return e.handleRawCoursesInputChange(a.target.value)}})),r.a.createElement(O.a,{className:"stick-bottom"},r.a.createElement(p.a,{p:1,width:1},r.a.createElement(x.a,{open:o,onClose:this.handleDialogClose,"aria-labelledby":"form-dialog-title"},r.a.createElement(P.a,{id:"form-dialog-title"},"Submit"),r.a.createElement(I.a,null,r.a.createElement(N.a,null,"Please enter your UWaterloo ID for a chance win a prize!"),r.a.createElement(v.a,{autoFocus:!0,margin:"dense",id:"name",label:"Email Address",fullWidth:!0,InputProps:{endAdornment:r.a.createElement(A.a,{position:"end"},"@uwaterloo.ca")},onChange:function(a){return e.handleEmailAddressChange(a.target.value)}})),r.a.createElement(j.a,null,r.a.createElement(D.a,{onClick:this.handleDialogClose,color:"primary"},"Cancel"),r.a.createElement(D.a,{onClick:this.handleSubmitClick,color:"primary"},"Submit"))))))))),r.a.createElement(T.a,{style:{zIndex:Y.zIndex.drawer+1,color:"#fff"},open:n},r.a.createElement(q.a,{color:"inherit"})))}}]),a}(r.a.Component);l.a.render(r.a.createElement(H,null),document.getElementById("root"))},60:function(e,a,t){e.exports=t.p+"static/media/icon.a7b1598b.svg"},61:function(e,a,t){e.exports=t.p+"static/media/calendar-step-1.5a0cc442.png"},62:function(e,a,t){e.exports=t.p+"static/media/calendar-step-2.514203ac.png"},81:function(e,a,t){e.exports=t(110)}},[[81,1,2]]]);
//# sourceMappingURL=main.e4188123.chunk.js.map