(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{4955:function(t,e,n){Promise.resolve().then(n.bind(n,3607))},9077:function(t){var e,n,r,s,i,a,u,c,o,f,d,h,l,$,m,y,g,p,w,v,M,D;t.exports=(e="millisecond",n="second",r="minute",s="hour",i="week",a="month",u="quarter",c="year",o="date",f="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},(m={})[$="en"]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||"th")+"]"}},y="$isDayjsObject",g=function(t){return t instanceof M||!(!t||!t[y])},p=function t(e,n,r){var s;if(!e)return $;if("string"==typeof e){var i=e.toLowerCase();m[i]&&(s=i),n&&(m[i]=n,s=i);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var u=e.name;m[u]=e,s=u}return!r&&s&&($=s),s||!r&&$},w=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new M(n)},(v={s:l,z:function(t){var e=-t.utcOffset(),n=Math.abs(e);return(e<=0?"+":"-")+l(Math.floor(n/60),2,"0")+":"+l(n%60,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,a),i=n-s<0,u=e.clone().add(r+(i?-1:1),a);return+(-(r+(n-s)/(i?s-u:u-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return({M:a,y:c,w:i,d:"day",D:o,h:s,m:r,s:n,ms:e,Q:u})[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}}).l=p,v.i=g,v.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})},D=(M=function(){function t(t){this.$L=p(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[y]=!0}var l=t.prototype;return l.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(v.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(d);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},l.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},l.$utils=function(){return v},l.isValid=function(){return this.$d.toString()!==f},l.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},l.isAfter=function(t,e){return w(t)<this.startOf(e)},l.isBefore=function(t,e){return this.endOf(e)<w(t)},l.$g=function(t,e,n){return v.u(t)?this[e]:this.set(n,t)},l.unix=function(){return Math.floor(this.valueOf()/1e3)},l.valueOf=function(){return this.$d.getTime()},l.startOf=function(t,e){var u=this,f=!!v.u(e)||e,d=v.p(t),h=function(t,e){var n=v.w(u.$u?Date.UTC(u.$y,e,t):new Date(u.$y,e,t),u);return f?n:n.endOf("day")},l=function(t,e){return v.w(u.toDate()[t].apply(u.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),u)},$=this.$W,m=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(d){case c:return f?h(1,0):h(31,11);case a:return f?h(1,m):h(0,m+1);case i:var p=this.$locale().weekStart||0,w=($<p?$+7:$)-p;return h(f?y-w:y+(6-w),m);case"day":case o:return l(g+"Hours",0);case s:return l(g+"Minutes",1);case r:return l(g+"Seconds",2);case n:return l(g+"Milliseconds",3);default:return this.clone()}},l.endOf=function(t){return this.startOf(t,!1)},l.$set=function(t,i){var u,f=v.p(t),d="set"+(this.$u?"UTC":""),h=((u={}).day=d+"Date",u[o]=d+"Date",u[a]=d+"Month",u[c]=d+"FullYear",u[s]=d+"Hours",u[r]=d+"Minutes",u[n]=d+"Seconds",u[e]=d+"Milliseconds",u)[f],l="day"===f?this.$D+(i-this.$W):i;if(f===a||f===c){var $=this.clone().set(o,1);$.$d[h](l),$.init(),this.$d=$.set(o,Math.min(this.$D,$.daysInMonth())).$d}else h&&this.$d[h](l);return this.init(),this},l.set=function(t,e){return this.clone().$set(t,e)},l.get=function(t){return this[v.p(t)]()},l.add=function(t,e){var u,o=this;t=Number(t);var f=v.p(e),d=function(e){var n=w(o);return v.w(n.date(n.date()+Math.round(e*t)),o)};if(f===a)return this.set(a,this.$M+t);if(f===c)return this.set(c,this.$y+t);if("day"===f)return d(1);if(f===i)return d(7);var h=((u={})[r]=6e4,u[s]=36e5,u[n]=1e3,u)[f]||1,l=this.$d.getTime()+t*h;return v.w(l,this)},l.subtract=function(t,e){return this.add(-1*t,e)},l.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=v.z(this),i=this.$H,a=this.$m,u=this.$M,c=n.weekdays,o=n.months,d=n.meridiem,l=function(t,n,s,i){return t&&(t[n]||t(e,r))||s[n].slice(0,i)},$=function(t){return v.s(i%12||12,t,"0")},m=d||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(h,function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return v.s(e.$y,4,"0");case"M":return u+1;case"MM":return v.s(u+1,2,"0");case"MMM":return l(n.monthsShort,u,o,3);case"MMMM":return l(o,u);case"D":return e.$D;case"DD":return v.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return l(n.weekdaysMin,e.$W,c,2);case"ddd":return l(n.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(i);case"HH":return v.s(i,2,"0");case"h":return $(1);case"hh":return $(2);case"a":return m(i,a,!0);case"A":return m(i,a,!1);case"m":return String(a);case"mm":return v.s(a,2,"0");case"s":return String(e.$s);case"ss":return v.s(e.$s,2,"0");case"SSS":return v.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")})},l.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},l.diff=function(t,e,o){var f,d=this,h=v.p(e),l=w(t),$=(l.utcOffset()-this.utcOffset())*6e4,m=this-l,y=function(){return v.m(d,l)};switch(h){case c:f=y()/12;break;case a:f=y();break;case u:f=y()/3;break;case i:f=(m-$)/6048e5;break;case"day":f=(m-$)/864e5;break;case s:f=m/36e5;break;case r:f=m/6e4;break;case n:f=m/1e3;break;default:f=m}return o?f:v.a(f)},l.daysInMonth=function(){return this.endOf(a).$D},l.$locale=function(){return m[this.$L]},l.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=p(t,e,!0);return r&&(n.$L=r),n},l.clone=function(){return v.w(this.$d,this)},l.toDate=function(){return new Date(this.valueOf())},l.toJSON=function(){return this.isValid()?this.toISOString():null},l.toISOString=function(){return this.$d.toISOString()},l.toString=function(){return this.$d.toUTCString()},t}()).prototype,w.prototype=D,[["$ms",e],["$s",n],["$m",r],["$H",s],["$W","day"],["$M",a],["$y",c],["$D",o]].forEach(function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),w.extend=function(t,e){return t.$i||(t(e,M,w),t.$i=!0),w},w.locale=p,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=m[$],w.Ls=m,w.p={},w)},5818:function(t,e,n){"use strict";n.d(e,{j:function(){return d}});var r=n(8754),s=n(2779),i=n(1986),a=n(9077),u=n.n(a),c=n(3894),o=n.n(c),f=n(2123);function d(t){let{src:e,alt:n,...a}=t,[c,d]=(0,f.useState)(void 0);return(0,f.useEffect)(()=>((async()=>{if(e){let t=await (0,i.by)(e),n=u()().format("YYYYMMDD"),r="IMAGE_CACHE_".concat(t,"_").concat(n),a=await o().getItem(r);if(a)d(a);else try{let t=(0,s.X5)(e),n=await fetch(t),i=await n.blob(),a=new FileReader;a.readAsDataURL(i),a.onloadend=async()=>{let t=a.result;d(t),await o().setItem(r,t)}}catch(t){console.error("Error fetching image:",t)}}})(),()=>{}),[e]),(0,r.jsx)("img",{src:c||e,alt:n,...a})}},3607:function(t,e,n){"use strict";n.r(e),n.d(e,{FeaturedPodcastList:function(){return y}});var r=n(8754),s=n(7586),i=n(4599),a=n(361),u=n(1986),c=n(3894),o=n.n(c),f=n(8812);async function d(){let t=(0,a.X)("https://typlog.com/featured/podcasts");return h((await s.Z.get(t)).data)}async function h(t){let e=i.zD(t);return Promise.all(e("div.item_2Qq2h").map(async function(){let t=e(this).find("a").attr("href"),n=(0,f.$)(t,"feed/audio.xml"),r=await (0,u.by)(n);return await o().setItem("FEED_URL_".concat(r),n),{id:r,link:t,image:e(this).find("img").attr("src"),name:e(this).find("h3").text(),desc:e(this).find("h4").text(),feedUrl:n}}).toArray())}var l=n(2123),$=n(5818),m=n(8603);function y(t){let{keyword:e}=t,[n,s]=(0,l.useState)([]),[i,a]=(0,l.useState)(void 0);return(0,l.useEffect)(()=>{d().then(t=>{if(e){let n=t.filter(t=>t.name.includes(e)||t.desc.includes(e));s(n),0===n.length&&a(!0)}else s(t)})},[e]),(0,r.jsxs)("div",{className:"grid grid-cols-6 gap-4",children:[n.map((t,e)=>(0,r.jsxs)(m.default,{href:"/podcast/?id=".concat(t.id),className:"bg-white border p-2 rounded shadow-sm hover:border-pink-500",children:[(0,r.jsx)($.j,{src:t.image,alt:"Image for ".concat(t.name),className:"rounded"}),(0,r.jsx)("h3",{className:"text-sm font-bold my-1",children:t.name}),(0,r.jsx)("h4",{className:"text-xs text-ellipsis line-clamp-1 text-gray-500",children:t.desc})]},"podcast-".concat(e))),i&&(0,r.jsxs)("span",{className:"bg-white border p-2 rounded shadow-sm text-sm flex justify-center items-center text-center text-gray-500 min-h-[176px]",children:["没有符合",(0,r.jsx)("br",{}),"条件的结果"]})]})}},361:function(t,e,n){"use strict";function r(t){let e=encodeURIComponent(t);return"".concat("https://easy-cors-proxy.longzai.net.cn","/proxy?ACCESS_TOKEN=").concat("xyQNZeBJ0TpiRLYRNXQdb6BZCJLDajHM","&URL=").concat(e)}n.d(e,{X:function(){return r}})},2779:function(t,e,n){"use strict";n.d(e,{X5:function(){return r.X},DO:function(){return a},jI:function(){return f}});var r=n(361),s=n(6537),i=n.n(s);async function a(t){let e=new(i());return await e.parseURL((0,r.X)(t))}var u=n(7586),c=n(4599),o=n(9043);async function f(t){var e;return e=(await u.Z.post((0,r.X)("https://www.getrssfeed.com/"),o.Z.stringify({url:t}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})).data,c.zD(e)("#result-container > a").attr("href")}},8812:function(t,e,n){"use strict";function r(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return t||e?t&&e?(t.endsWith("/")?t.slice(0,-1):t)+"/"+(e.startsWith("/")?e.slice(1):e):(t||"")+(e||""):""}function s(t){try{return new URL(t),!0}catch(t){return!1}}n.d(e,{$:function(){return r},j:function(){return s}})}},function(t){t.O(0,[611,715,934,603,986,146,672,744],function(){return t(t.s=4955)}),_N_E=t.O()}]);