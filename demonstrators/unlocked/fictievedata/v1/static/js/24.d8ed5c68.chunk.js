(this["webpackJsonpviewer-builder-client"]=this["webpackJsonpviewer-builder-client"]||[]).push([[24],{1064:function(e,t,n){e.exports={"rct-title":"BBCheckboxTree_rct-title__3rmTQ"}},1281:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var r=n(5),a=n(6),i=n(7),l=n(8),s=n(0),o=n.n(s),u=(n(1064),n(1297)),c=n(1),d=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,i=new Array(a),l=0;l<a;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={checked:[],expanded:[]},e.nodes=null,e}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.getNodes()}},{key:"shouldComponentUpdate",value:function(e,t){try{return e.data!=this.props.data&&this.getNodes(),!0}catch(n){}return!0}},{key:"getNodes",value:function(){try{var e={},t=[];if(null==this.props.data)return;if(null==this.props.data.results)return;if(null==this.props.data.results.bindings)return;var n=this.props.data.results.bindings;for(var r in n){var a=n[r],i=a.uri.value;null!=(o=a.parent)&&(o=o.value);var l=a.text,s={id:r,uri:i,name:l=null==l?"nolabel":l.value,parent:o};e[i]=s,null==o&&t.push(s)}for(var i in e){if(null!=(s=e[i]).parent){var o;if(null==(o=e[s.parent])){console.log("error in tree, parent not found");break}null==o.children&&(o.children=[]),o.children.push(s)}}this.nodes=t}catch(u){this.nodes=[]}}},{key:"render",value:function(){try{null==this.nodes&&this.getNodes()}catch(e){}return null==this.nodes?Object(c.jsx)("div",{children:"sparql error"}):0==this.nodes.length?Object(c.jsx)("div",{children:"empty"}):(console.log(this.nodes),Object(c.jsx)(u.a,{"aria-label":"rich object",defaultExpanded:["root"],sx:{height:110,flexGrow:1,maxWidth:400,overflowY:"auto"},data:this.nodes}))}}]),n}(o.a.Component)}}]);
//# sourceMappingURL=24.d8ed5c68.chunk.js.map