(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78371258"],{"25f0":function(t,e,r){"use strict";var a=r("6eeb"),n=r("825a"),i=r("d039"),o=r("ad6d"),c="toString",l=RegExp.prototype,s=l[c],u=i((function(){return"/a/b"!=s.call({source:"a",flags:"b"})})),d=s.name!=c;(u||d)&&a(RegExp.prototype,c,(function(){var t=n(this),e=String(t.source),r=t.flags,a=String(void 0===r&&t instanceof RegExp&&!("flags"in l)?o.call(t):r);return"/"+e+"/"+a}),{unsafe:!0})},2909:function(t,e,r){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=t[r];return a}function n(t){if(Array.isArray(t))return a(t)}r.d(e,"a",(function(){return l}));r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}r("fb6a"),r("b0c0"),r("25f0");function o(t,e){if(t){if("string"===typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return n(t)||i(t)||o(t)||c()}},"3ca3":function(t,e,r){"use strict";var a=r("6547").charAt,n=r("69f3"),i=r("7dd0"),o="String Iterator",c=n.set,l=n.getterFor(o);i(String,"String",(function(t){c(this,{type:o,string:String(t),index:0})}),(function(){var t,e=l(this),r=e.string,n=e.index;return n>=r.length?{value:void 0,done:!0}:(t=a(r,n),e.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,e,r){"use strict";var a=r("0366"),n=r("7b0b"),i=r("9bdd"),o=r("e95a"),c=r("50c4"),l=r("8418"),s=r("35a1");t.exports=function(t){var e,r,u,d,f,p,h=n(t),b="function"==typeof this?this:Array,g=arguments.length,m=g>1?arguments[1]:void 0,v=void 0!==m,y=s(h),w=0;if(v&&(m=a(m,g>2?arguments[2]:void 0,2)),void 0==y||b==Array&&o(y))for(e=c(h.length),r=new b(e);e>w;w++)p=v?m(h[w],w):h[w],l(r,w,p);else for(d=y.call(h),f=d.next,r=new b;!(u=f.call(d)).done;w++)p=v?i(d,m,[u.value,w],!0):u.value,l(r,w,p);return r.length=w,r}},"92eb":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",{staticClass:"calendar__title"},[t._v("Team calendar")]),t.isLoading?r("AppLoader"):[r("div",{staticClass:"list__filters-wrapper"},[r("el-input",{staticClass:"search-input",attrs:{placeholder:"Year"},model:{value:t.yearFilter,callback:function(e){t.yearFilter=e},expression:"yearFilter"}}),r("el-date-picker",{staticClass:"search-input",attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"To","start-placeholder":"Start date","end-placeholder":"End date"},model:{value:t.rangeFilter,callback:function(e){t.rangeFilter=e},expression:"rangeFilter"}})],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.filteredMatches}},[r("el-table-column",{attrs:{prop:"homeTeam.name",label:"Home Team"}}),r("el-table-column",{attrs:{prop:"awayTeam.name",label:"Away Team"}}),t.windowWidth>1e3?r("el-table-column",{attrs:{prop:"competition.name",label:"Competition"}}):t._e(),r("el-table-column",{attrs:{prop:"localDate",label:"Date"}})],1)]],2)},n=[],i=(r("4de4"),r("d81d"),r("b0c0"),r("a9e3"),r("8ba4"),r("ac1f"),r("5319"),r("2ca0"),r("2909")),o=r("5530"),c=r("d8ed"),l=r("2f62"),s=r("555f"),u={name:"TeamsCalendar",components:{AppLoader:s["a"]},props:{id:{type:Number,required:!0},year:{type:Number}},data:function(){return{rangeFilter:null,windowWidth:0}},computed:Object(o["a"])(Object(o["a"])({},Object(l["c"])({calendar:c["c"].calendar,isLoading:c["c"].isLoading})),{},{yearFilter:{get:function(){return this.year||""},set:function(t){Number.isInteger(+t)&&this.$router.replace({name:this.$route.name,query:Object(o["a"])(Object(o["a"])({},this.$route.query),{},{year:t})}).catch((function(){}))}},preparedMatches:function(){if(this.calendar){var t=Object(i["a"])(this.calendar);return t.map((function(t){return t.localDate=new Date(t.utcDate).toLocaleDateString(),t}))}return[]},filteredMatches:function(){var t=this,e=Object(i["a"])(this.preparedMatches);return this.rangeFilter&&(e=e.filter((function(e){var r=new Date(e.utcDate),a=t.rangeFilter[0],n=t.rangeFilter[1];return r>=a&&r<=n}))),this.yearFilter&&!this.rangeFilter&&(e=e.filter((function(e){var r=new Date(e.utcDate).getFullYear();return String(r).startsWith(String(t.yearFilter))}))),e}}),watch:{yearFilter:function(t){this.rangeFilter=null,""===t&&this.deleteQueryFromRoute("year")}},methods:Object(o["a"])(Object(o["a"])({},Object(l["b"])({getTeamCalendar:c["a"].getTeamCalendar})),{},{deleteQueryFromRoute:function(t){var e=Object(o["a"])({},this.$route.query);delete e[t],this.$router.replace({name:this.$route.name,query:Object(o["a"])({},e)})},setWindowWidth:function(){this.windowWidth=document.documentElement.clientWidth}}),created:function(){this.getTeamCalendar({teamId:this.id}),this.setWindowWidth(),window.addEventListener("resize",this.setWindowWidth)}},d=u,f=(r("b32c"),r("2877")),p=Object(f["a"])(d,a,n,!1,null,"63069f42",null);e["default"]=p.exports},"9bdd":function(t,e,r){var a=r("825a"),n=r("2a62");t.exports=function(t,e,r,i){try{return i?e(a(r)[0],r[1]):e(r)}catch(o){throw n(t),o}}},a630:function(t,e,r){var a=r("23e7"),n=r("4df4"),i=r("1c7e"),o=!i((function(t){Array.from(t)}));a({target:"Array",stat:!0,forced:o},{from:n})},b32c:function(t,e,r){"use strict";r("e7bc")},d28b:function(t,e,r){var a=r("746f");a("iterator")},d81d:function(t,e,r){"use strict";var a=r("23e7"),n=r("b727").map,i=r("1dde"),o=r("ae40"),c=i("map"),l=o("map");a({target:"Array",proto:!0,forced:!c||!l},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,e,r){var a=r("da84"),n=r("fdbc"),i=r("e260"),o=r("9112"),c=r("b622"),l=c("iterator"),s=c("toStringTag"),u=i.values;for(var d in n){var f=a[d],p=f&&f.prototype;if(p){if(p[l]!==u)try{o(p,l,u)}catch(b){p[l]=u}if(p[s]||o(p,s,d),n[d])for(var h in i)if(p[h]!==i[h])try{o(p,h,i[h])}catch(b){p[h]=i[h]}}}},e01a:function(t,e,r){"use strict";var a=r("23e7"),n=r("83ab"),i=r("da84"),o=r("5135"),c=r("861d"),l=r("9bf2").f,s=r("e893"),u=i.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};s(f,u);var p=f.prototype=u.prototype;p.constructor=f;var h=p.toString,b="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;l(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=h.call(t);if(o(d,t))return"";var r=b?e.slice(7,-1):e.replace(g,"$1");return""===r?void 0:r}}),a({global:!0,forced:!0},{Symbol:f})}},e7bc:function(t,e,r){},fb6a:function(t,e,r){"use strict";var a=r("23e7"),n=r("861d"),i=r("e8b5"),o=r("23cb"),c=r("50c4"),l=r("fc6a"),s=r("8418"),u=r("b622"),d=r("1dde"),f=r("ae40"),p=d("slice"),h=f("slice",{ACCESSORS:!0,0:0,1:2}),b=u("species"),g=[].slice,m=Math.max;a({target:"Array",proto:!0,forced:!p||!h},{slice:function(t,e){var r,a,u,d=l(this),f=c(d.length),p=o(t,f),h=o(void 0===e?f:e,f);if(i(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?n(r)&&(r=r[b],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return g.call(d,p,h);for(a=new(void 0===r?Array:r)(m(h-p,0)),u=0;p<h;p++,u++)p in d&&s(a,u,d[p]);return a.length=u,a}})}}]);
//# sourceMappingURL=chunk-78371258.daa946ea.js.map