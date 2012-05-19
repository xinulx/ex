YUI.add("juicer",function(d){var b=function(){var e=[].slice.call(arguments);e.push(b.options);if(arguments.length==1){return b.compile.apply(b,e);}if(arguments.length>=2){return b.to_html.apply(b,e);}};var c={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return this.escapehash[e];},escaping:function(e){return typeof(e)!=="string"?e:e.replace(/[&<>"]/igm,this.escapereplace);},detection:function(e){return typeof(e)==="undefined"?"":e;}};var a=function(e){if(console){if(console.warn){console.warn(e);return;}if(console.log){console.log(e);return;}}throw (e);};b.__cache={};b.version="0.4.0-dev";b.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)\s*(,\s*\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,elseifstart:/{@else if\s*([^}]*?)}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm,inlinecomment:/{#[^}]*?}/igm,rangestart:/{@each\s*(\w*?)\s*in\s*range\((\d+?),(\d+?)\)}/igm};b.options={cache:true,strip:true,errorhandling:true,detection:true,__escapehtml:c,__throw:a};b.set=function(e,g){if(arguments.length===2){this.options[e]=g;return;}if(e===Object(e)){for(var f in e){if(e.hasOwnProperty(f)){this.options[f]=e[f];}}}};b.template=function(){var e=this;this.__interpolate=function(f,j,h){var g=f.split("|"),i="";if(g.length>1){f=g.shift();i="_method."+g.shift();}return"<%= "+(j?"_method.__escapehtml.escaping":"")+"("+(!h||h.detection!==false?"_method.__escapehtml.detection":"")+"("+i+"("+f+"))) %>";};this.__removeShell=function(g,f){var h=0;g=g.replace(b.settings.forstart,function(m,j,l,k){var l=l||"value",k=k&&k.substr(1);var i="i"+h++;return"<% for(var "+i+"=0, l"+i+"="+j+".length;"+i+"<l"+i+";"+i+"++) {var "+l+"="+j+"["+i+"];"+(k?("var "+k+"="+i+";"):"")+" %>";}).replace(b.settings.forend,"<% } %>").replace(b.settings.ifstart,function(i,j){return"<% if("+j+") { %>";}).replace(b.settings.ifend,"<% } %>").replace(b.settings.elsestart,function(i){return"<% } else { %>";}).replace(b.settings.elseifstart,function(i,j){return"<% } else if("+j+") { %>";}).replace(b.settings.noneencode,function(j,i){return e.__interpolate(i,false,f);}).replace(b.settings.interpolate,function(j,i){return e.__interpolate(i,true,f);}).replace(b.settings.inlinecomment,"").replace(b.settings.rangestart,function(l,k,m,j){var i="j"+h++;return"<% for(var "+i+"=0;"+i+"<"+(j-m)+";"+i+"++) {var "+k+"="+i+"; %>";});if(!f||f.errorhandling!==false){g+="<% try { %>"+g;g+='<% } catch(e) {__throw("Juicer Render Exception: "+e.message);} %>';}return g;};this.__toNative=function(g,f){return this.__convert(g,!f||f.strip);};this.__lexicalAnalyze=function(h){var g=[];var l="";var k=function(o,n){if(Array.prototype.indexOf&&o.indexOf===Array.prototype.indexOf){return o.indexOf(n);}for(var m=0;m<o.length;m++){if(o[m]===n){return m;}}return -1;};var f=function(m,i){i=i.match(/\w+/igm)[0];if(k(g,i)===-1){g.push(i);}};h.replace(b.settings.forstart,f).replace(b.settings.interpolate,f).replace(b.settings.ifstart,f);for(var j=0;j<g.length;j++){l+="var "+g[j]+"=_."+g[j]+";";}return"<% "+l+" %>";};this.__convert=function(g,h){var f=[].join("");f+="'use strict';";f+="var _=_||{};";f+="var _out='';_out+='";if(h!==false){f+=g.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;";return f;}f+=g.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";return f;};this.parse=function(g,f){if(!f||f.loose!==false){g=this.__lexicalAnalyze(g)+g;}g=this.__removeShell(g,f);g=this.__toNative(g,f);this.render=new Function("_, _method",g);return this;};};b.compile=function(g,f){try{var h=this.__cache[g]?this.__cache[g]:new this.template().parse(g,f);if(!f||f.cache!==false){this.__cache[g]=h;}return h;}catch(i){a("Juicer Compile Exception: "+i.message);return{render:function(){}};}};b.to_html=function(f,g,e){return this.compile(f,e).render(g,e);};d.juicer=b;},"0.4.0-dev");