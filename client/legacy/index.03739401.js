import{_ as t,a as n,b as r,c as a,i as e,d as o,S as c,s as f,e as s,t as i,f as u,g as h,h as l,j as v,k as p,l as d,m,n as g,o as y,p as R,q as E,r as b,u as j,v as x}from"./client.62a6ff71.js";import{p as k}from"./posts.e04fd61b.js";function q(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,o=n(t);if(a){var c=n(this).constructor;e=Reflect.construct(o,arguments,c)}else e=o.apply(this,arguments);return r(this,e)}}function A(t,n,r){var a=t.slice();return a[0]=n[r],a}function C(t){var n,r,a,e,o,c,f,E,b,j=t[0].title+"",x=t[0].summary+"";return{c:function(){n=s("article"),r=s("a"),a=s("h2"),e=i(j),o=u(),c=s("p"),f=i(x),E=u(),b=s("br"),this.h()},l:function(t){n=h(t,"ARTICLE",{});var s=l(n);r=h(s,"A",{href:!0});var i=l(r);a=h(i,"H2",{});var u=l(a);e=v(u,j),u.forEach(p),i.forEach(p),o=d(s),c=h(s,"P",{});var m=l(c);f=v(m,x),m.forEach(p),s.forEach(p),E=d(t),b=h(t,"BR",{}),this.h()},h:function(){m(r,"href","/posts/".concat(t[0].permalink))},m:function(t,s){g(t,n,s),y(n,r),y(r,a),y(a,e),y(n,o),y(n,c),y(c,f),g(t,E,s),g(t,b,s)},p:R,d:function(t){t&&p(n),t&&p(E),t&&p(b)}}}function D(t){for(var n,r,a=k,e=[],o=0;o<a.length;o+=1)e[o]=C(A(t,a,o));return{c:function(){n=u();for(var t=0;t<e.length;t+=1)e[t].c();r=E(),this.h()},l:function(t){b('[data-svelte="svelte-dsez7q"]',document.head).forEach(p),n=d(t);for(var a=0;a<e.length;a+=1)e[a].l(t);r=E(),this.h()},h:function(){document.title="Codex"},m:function(t,a){g(t,n,a);for(var o=0;o<e.length;o+=1)e[o].m(t,a);g(t,r,a)},p:function(t,n){var o=j(n,1)[0];if(0&o){var c;for(a=k,c=0;c<a.length;c+=1){var f=A(t,a,c);e[c]?e[c].p(f,o):(e[c]=C(f),e[c].c(),e[c].m(r.parentNode,r))}for(;c<e.length;c+=1)e[c].d(1);e.length=a.length}},i:R,o:R,d:function(t){t&&p(n),x(e,t),t&&p(r)}}}var P=function(n){t(s,c);var r=q(s);function s(t){var n;return a(this,s),n=r.call(this),e(o(n),t,null,D,f,{}),n}return s}();export default P;
