!
    function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("hls.js"), require("flv.js"), require("dashjs")) : "function" == typeof define && define.amd ? define(["hls.js", "flv.js", "dashjs"], e) : t.TCPlayer = e(t.Hls, t.flvjs, t.dashjs)
    }(this, function (t, e, n) {
        function r(t, e) {
            return e = {
                exports: {}
            },
                t(e, e.exports),
                e.exports
        }
        function i(t, e) {
            Gn(t).forEach(function (n) {
                return e(t[n], n)
            })
        }
        function o(t, e) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            return Gn(t).reduce(function (n, r) {
                return e(n, t[r], r)
            }, n)
        }
        function s(t) {
            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            return Object.assign ? Object.assign.apply(Object, [t].concat(n)) : (n.forEach(function (e) {
                e && i(e, function (e, n) {
                    t[n] = e
                })
            }), t)
        }
        function a(t) {
            return !!t && "object" === (void 0 === t ? "undefined" : zn(t))
        }
        function l(t) {
            return a(t) && "[object Object]" === Qn.call(t) && t.constructor === Object
        }
        function c(t) {
            return "function" == typeof t && "number" != typeof t.nodeType
        }
        function u(t) {
            return t.replace(/\n\r?\s*/g, "")
        }
        function h(t, e) {
            if (!t || !e) return "";
            if ("function" == typeof Ke.getComputedStyle) {
                var n = Ke.getComputedStyle(t);
                return n ? n[e] : ""
            }
            return t.currentStyle[e] || ""
        }
        function p(t) {
            return "string" == typeof t && /\S/.test(t)
        }
        function d(t) {
            if (/\s/.test(t)) throw new Error("class has illegal whitespace characters")
        }
        function f(t) {
            return new RegExp("(^|\\s)" + t + "($|\\s)")
        }
        function y() {
            return Ye === Ke.document && "undefined" != typeof Ye.createElement
        }
        function g(t) {
            return a(t) && 1 === t.nodeType
        }
        function v() {
            try {
                return Ke.parent !== Ke.self
            } catch (t) {
                return !0
            }
        }
        function m(t) {
            return function (e, n) {
                if (!p(e)) return Ye[t](null);
                p(n) && (n = Ye.querySelector(n));
                var r = g(n) ? n : Ye;
                return r[t] && r[t](e)
            }
        }
        function _() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div",
                e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                r = arguments[3],
                i = Ye.createElement(t);
            return Object.getOwnPropertyNames(e).forEach(function (t) {
                var n = e[t]; - 1 !== t.indexOf("aria-") || "role" === t || "type" === t ? (tr.warn(er(nr, t, n)), i.setAttribute(t, n)) : "textContent" === t ? b(i, n) : i[t] = n
            }),
                Object.getOwnPropertyNames(n).forEach(function (t) {
                    i.setAttribute(t, n[t])
                }),
            r && F(i, r),
                i
        }
        function b(t, e) {
            return "undefined" == typeof t.textContent ? t.innerText = e : t.textContent = e,
                t
        }
        function T(t, e) {
            e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
        }
        function C(t, e) {
            return d(e),
                t.classList ? t.classList.contains(e) : f(e).test(t.className)
        }
        function E(t, e) {
            return t.classList ? t.classList.add(e) : C(t, e) || (t.className = (t.className + " " + e).trim()),
                t
        }
        function k(t, e) {
            return t.classList ? t.classList.remove(e) : (d(e), t.className = t.className.split(/\s+/).filter(function (t) {
                return t !== e
            }).join(" ")),
                t
        }
        function w(t, e, n) {
            var r = C(t, e);
            if ("function" == typeof n && (n = n(t, e)), "boolean" != typeof n && (n = !r), n !== r) return n ? E(t, e) : k(t, e),
                t
        }
        function S(t, e) {
            Object.getOwnPropertyNames(e).forEach(function (n) {
                var r = e[n];
                null === r || void 0 === r || !1 === r ? t.removeAttribute(n) : t.setAttribute(n, !0 === r ? "" : r)
            })
        }
        function P(t) {
            var e = {};
            if (t && t.attributes && t.attributes.length > 0) for (var n = t.attributes, r = n.length - 1; r >= 0; r--) {
                var i = n[r].name,
                    o = n[r].value;
                "boolean" != typeof t[i] && -1 === ",autoplay,controls,playsinline,loop,muted,default,defaultMuted,".indexOf("," + i + ",") || (o = null !== o),
                    e[i] = o
            }
            return e
        }
        function x(t, e) {
            return t.getAttribute(e)
        }
        function I(t, e, n) {
            t.setAttribute(e, n)
        }
        function M(t, e) {
            t.removeAttribute(e)
        }
        function D() {
            Ye.body.focus(),
                Ye.onselectstart = function () {
                    return !1
                }
        }
        function A() {
            Ye.onselectstart = function () {
                return !0
            }
        }
        function R(t) {
            if (t && t.getBoundingClientRect && t.parentNode) {
                var e = t.getBoundingClientRect(),
                    n = {};
                return ["bottom", "height", "left", "right", "top", "width"].forEach(function (t) {
                    e[t] !== undefined && (n[t] = e[t])
                }),
                n.height || (n.height = parseFloat(h(t, "height"))),
                n.width || (n.width = parseFloat(h(t, "width"))),
                    n
            }
        }
        function j(t) {
            var e = void 0;
            if (t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), !e) return {
                left: 0,
                top: 0
            };
            var n = Ye.documentElement,
                r = Ye.body,
                i = n.clientLeft || r.clientLeft || 0,
                o = Ke.pageXOffset || r.scrollLeft,
                s = e.left + o - i,
                a = n.clientTop || r.clientTop || 0,
                l = Ke.pageYOffset || r.scrollTop,
                c = e.top + l - a;
            return {
                left: Math.round(s),
                top: Math.round(c)
            }
        }
        function O(t, e) {
            var n = {},
                r = j(t),
                i = t.offsetWidth,
                o = t.offsetHeight,
                s = r.top,
                a = r.left,
                l = e.pageY,
                c = e.pageX;
            return e.changedTouches && (c = e.changedTouches[0].pageX, l = e.changedTouches[0].pageY),
                n.y = Math.max(0, Math.min(1, (s - l + o) / o)),
                n.x = Math.max(0, Math.min(1, (c - a) / i)),
                n
        }
        function L(t) {
            return a(t) && 3 === t.nodeType
        }
        function N(t) {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            return t
        }
        function B(t) {
            return "function" == typeof t && (t = t()),
                (Array.isArray(t) ? t : [t]).map(function (t) {
                    return "function" == typeof t && (t = t()),
                        g(t) || L(t) ? t : "string" == typeof t && /\S/.test(t) ? Ye.createTextNode(t) : void 0
                }).filter(function (t) {
                    return t
                })
        }
        function F(t, e) {
            return B(e).forEach(function (e) {
                return t.appendChild(e)
            }),
                t
        }
        function H(t, e) {
            return F(N(t), e)
        }
        function V(t) {
            return t.button === undefined && t.buttons === undefined || (0 === t.button && t.buttons === undefined || (9 === Tn || 0 === t.button && 1 === t.buttons))
        }
        function U() {
            return sr++
        }
        function z(t) {
            var e = t[lr];
            return e || (e = t[lr] = U()),
            ar[e] || (ar[e] = {}),
                ar[e]
        }
        function q(t) {
            var e = t[lr];
            return !!e && !! Object.getOwnPropertyNames(ar[e]).length
        }
        function W(t) {
            var e = t[lr];
            if (e) {
                delete ar[e];
                try {
                    delete t[lr]
                } catch (n) {
                    t.removeAttribute ? t.removeAttribute(lr) : t[lr] = null
                }
            }
        }
        function K(t, e) {
            var n = z(t);
            0 === n.handlers[e].length && (delete n.handlers[e], t.removeEventListener ? t.removeEventListener(e, n.dispatcher, !1) : t.detachEvent && t.detachEvent("on" + e, n.dispatcher)),
            Object.getOwnPropertyNames(n.handlers).length <= 0 && (delete n.handlers, delete n.dispatcher, delete n.disabled),
            0 === Object.getOwnPropertyNames(n).length && W(t)
        }
        function X(t, e, n, r) {
            n.forEach(function (n) {
                t(e, n, r)
            })
        }
        function Q(t) {
            function e() {
                return !0
            }
            function n() {
                return !1
            }
            if (!t || !t.isPropagationStopped) {
                var r = t || Ke.event;
                t = {};
                for (var i in r)"layerX" !== i && "layerY" !== i && "keyLocation" !== i && "webkitMovementX" !== i && "webkitMovementY" !== i && ("returnValue" === i && r.preventDefault || (t[i] = r[i]));
                if (t.target || (t.target = t.srcElement || Ye), t.relatedTarget || (t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement), t.preventDefault = function () {
                    r.preventDefault && r.preventDefault(),
                        t.returnValue = !1,
                        r.returnValue = !1,
                        t.defaultPrevented = !0
                }, t.defaultPrevented = !1, t.stopPropagation = function () {
                    r.stopPropagation && r.stopPropagation(),
                        t.cancelBubble = !0,
                        r.cancelBubble = !0,
                        t.isPropagationStopped = e
                }, t.isPropagationStopped = n, t.stopImmediatePropagation = function () {
                    r.stopImmediatePropagation && r.stopImmediatePropagation(),
                        t.isImmediatePropagationStopped = e,
                        t.stopPropagation()
                }, t.isImmediatePropagationStopped = n, null !== t.clientX && t.clientX !== undefined) {
                    var o = Ye.documentElement,
                        s = Ye.body;
                    t.pageX = t.clientX + (o && o.scrollLeft || s && s.scrollLeft || 0) - (o && o.clientLeft || s && s.clientLeft || 0),
                        t.pageY = t.clientY + (o && o.scrollTop || s && s.scrollTop || 0) - (o && o.clientTop || s && s.clientTop || 0)
                }
                t.which = t.charCode || t.keyCode,
                null !== t.button && t.button !== undefined && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
            }
            return t
        }
        function G(t, e, n) {
            if (Array.isArray(e)) return X(G, t, e, n);
            var r = z(t);
            if (r.handlers || (r.handlers = {}), r.handlers[e] || (r.handlers[e] = []), n.guid || (n.guid = U()), r.handlers[e].push(n), r.dispatcher || (r.disabled = !1, r.dispatcher = function (e, n) {
                if (!r.disabled) {
                    e = Q(e);
                    var i = r.handlers[e.type];
                    if (i) for (var o = i.slice(0), s = 0, a = o.length; s < a && !e.isImmediatePropagationStopped(); s++) try {
                        o[s].call(t, e, n)
                    } catch (l) {
                        tr.error(l)
                    }
                }
            }), 1 === r.handlers[e].length) if (t.addEventListener) {
                var i = !1;
                cr && ur.indexOf(e) > -1 && (i = {
                    passive: !0
                }),
                    t.addEventListener(e, r.dispatcher, i)
            } else t.attachEvent && t.attachEvent("on" + e, r.dispatcher)
        }
        function $(t, e, n) {
            if (q(t)) {
                var r = z(t);
                if (r.handlers) {
                    if (Array.isArray(e)) return X($, t, e, n);
                    var i = function (t, e) {
                        r.handlers[e] = [],
                            K(t, e)
                    };
                    if (e !== undefined) {
                        var o = r.handlers[e];
                        if (o) {
                            if (!n) return void i(t, e);
                            if (n.guid) for (var s = 0; s < o.length; s++) o[s].guid === n.guid && o.splice(s--, 1);
                            K(t, e)
                        }
                    } else for (var a in r.handlers) Object.prototype.hasOwnProperty.call(r.handlers || {}, a) && i(t, a)
                }
            }
        }
        function Y(t, e, n) {
            var r = q(t) ? z(t) : {},
                i = t.parentNode || t.ownerDocument;
            if ("string" == typeof e && (e = {
                type: e,
                target: t
            }), e = Q(e), r.dispatcher && r.dispatcher.call(t, e, n), i && !e.isPropagationStopped() && !0 === e.bubbles) Y.call(null, i, e, n);
            else if (!i && !e.defaultPrevented) {
                var o = z(e.target);
                e.target[e.type] && (o.disabled = !0, "function" == typeof e.target[e.type] && e.target[e.type](), o.disabled = !1)
            }
            return !e.defaultPrevented
        }
        function J(t, e, n) {
            if (Array.isArray(e)) return X(J, t, e, n);
            var r = function i() {
                $(t, e, i),
                    n.apply(this, arguments)
            };
            r.guid = n.guid = n.guid || U(),
                G(t, e, r)
        }
        function Z(t, e) {
            e && (dr = e),
                Ke.setTimeout(fr, t)
        }
        function tt(t) {
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                n = e.eventBusKey;
            if (n) {
                if (!t[n].nodeName) throw new Error('The eventBusKey "' + n + '" does not refer to an element.');
                t.eventBusEl_ = t[n]
            } else t.eventBusEl_ = _("span", {
                className: "vjs-event-bus"
            });
            return s(t, Pr),
                t.on("dispose", function () {
                    t.off(),
                        Ke.setTimeout(function () {
                            t.eventBusEl_ = null
                        }, 0)
                }),
                t
        }
        function et(t, e) {
            return s(t, xr),
                t.state = s({}, t.state, e),
            "function" == typeof t.handleStateChanged && br(t) && t.on("statechanged", t.handleStateChanged),
                t
        }
        function nt(t) {
            return "string" != typeof t ? t : t.charAt(0).toUpperCase() + t.slice(1)
        }
        function rt(t, e) {
            return nt(t) === nt(e)
        }
        function it() {
            for (var t = {}, e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
            return n.forEach(function (e) {
                e && i(e, function (e, n) {
                    if (!l(e)) return void(t[n] = e);
                    l(t[n]) || (t[n] = {}),
                        t[n] = it(t[n], e)
                })
            }),
                t
        }
        function ot() {
            var t, e, n, r, i, o, s = arguments[0] || {},
                a = 1,
                u = arguments.length,
                h = !1;
            for ("boolean" == typeof s && (h = s, s = arguments[a] || {}, a++), "object" === (void 0 === s ? "undefined" : zn(s)) || c(s) || (s = {}), a === u && (s = this, a--); a < u; a++) if (null != (t = arguments[a])) for (e in t) n = s[e],
                r = t[e],
            s !== r && (h && r && (l(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && l(n) ? n : {}, s[e] = ot(h, o, r)) : r !== undefined && (s[e] = r));
            return s
        }
        function st(t, e, n) {
            if ("number" != typeof e || e < 0 || e > n) throw new Error("Failed to execute '" + t + "' on 'TimeRanges': The index provided (" + e + ") is non-numeric or out of bounds (0-" + n + ").")
        }
        function at(t, e, n, r) {
            return st(t, r, n.length - 1),
                n[r][e]
        }
        function lt(t) {
            return t === undefined || 0 === t.length ? {
                length: 0,
                start: function () {
                    throw new Error("This TimeRanges object is empty")
                },
                end: function () {
                    throw new Error("This TimeRanges object is empty")
                }
            } : {
                length: t.length,
                start: at.bind(null, "start", 0, t),
                end: at.bind(null, "end", 1, t)
            }
        }
        function ct(t, e) {
            return Array.isArray(t) ? lt(t) : t === undefined || e === undefined ? lt() : lt([
                [t, e]
            ])
        }
        function ut(t, e) {
            var n = 0,
                r = void 0,
                i = void 0;
            if (!e) return 0;
            t && t.length || (t = ct(0, 0));
            for (var o = 0; o < t.length; o++) r = t.start(o),
                i = t.end(o),
            i > e && (i = e),
                n += i - r;
            return n / e
        }
        function ht(t) {
            if (t instanceof ht) return t;
            "number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : a(t) && ("number" == typeof t.code && (this.code = t.code), s(this, t)),
            this.message || (this.message = ht.defaultMessages[this.code] || "")
        }
        function pt(t, e) {
            var n, r = null;
            try {
                n = JSON.parse(t, e)
            } catch (i) {
                r = i
            }
            return [r, n]
        }
        function dt(t) {
            return t !== undefined && "function" == typeof t.then
        }
        function ft(t) {
            dt(t) && t.then(null, function (t) {})
        }
        function yt(t) {
            var e = ui.call(t);
            return "[object Function]" === e || "function" == typeof t && "[object RegExp]" !== e || "undefined" != typeof window && (t === window.setTimeout || t === window.alert || t === window.confirm || t === window.prompt)
        }
        function gt() {
            for (var t = {}, e = 0; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) Ii.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        function vt(t) {
            for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0
        }
        function mt(t, e, n) {
            var r = t;
            return ci(e) ? (n = e, "string" == typeof t && (r = {
                uri: t
            })) : r = xi(e, {
                uri: t
            }),
                r.callback = n,
                r
        }
        function _t(t, e, n) {
            return e = mt(t, e, n),
                bt(e)
        }
        function bt(t) {
            function e() {
                4 === a.readyState && setTimeout(i, 0)
            }
            function n() {
                var t = undefined;
                if (t = a.response ? a.response : a.responseText || Tt(a), g) try {
                    t = JSON.parse(t)
                } catch (e) {}
                return t
            }
            function r(t) {
                return clearTimeout(u),
                t instanceof Error || (t = new Error("" + (t || "Unknown XMLHttpRequest Error"))),
                    t.statusCode = 0,
                    s(t, v)
            }
            function i() {
                if (!c) {
                    var e;
                    clearTimeout(u),
                        e = t.useXDR && a.status === undefined ? 200 : 1223 === a.status ? 204 : a.status;
                    var r = v,
                        i = null;
                    return 0 !== e ? (r = {
                        body: n(),
                        statusCode: e,
                        method: p,
                        headers: {},
                        url: h,
                        rawRequest: a
                    }, a.getAllResponseHeaders && (r.headers = Pi(a.getAllResponseHeaders()))) : i = new Error("Internal XMLHttpRequest Error"),
                        s(i, r, r.body)
                }
            }
            if ("undefined" == typeof t.callback) throw new Error("callback argument missing");
            var o = !1,
                s = function (e, n, r) {
                    o || (o = !0, t.callback(e, n, r))
                },
                a = t.xhr || null;
            a || (a = t.cors || t.useXDR ? new _t.XDomainRequest : new _t.XMLHttpRequest);
            var l, c, u, h = a.url = t.uri || t.url,
                p = a.method = t.method || "GET",
                d = t.body || t.data,
                f = a.headers = t.headers || {},
                y = !! t.sync,
                g = !1,
                v = {
                    body: undefined,
                    headers: {},
                    statusCode: 0,
                    method: p,
                    url: h,
                    rawRequest: a
                };
            if ("json" in t && !1 !== t.json && (g = !0, f.accept || f.Accept || (f.Accept = "application/json"), "GET" !== p && "HEAD" !== p && (f["content-type"] || f["Content-Type"] || (f["Content-Type"] = "application/json"), d = JSON.stringify(!0 === t.json ? d : t.json))), a.onreadystatechange = e, a.onload = i, a.onerror = r, a.onprogress = function () {}, a.onabort = function () {
                c = !0
            }, a.ontimeout = r, a.open(p, h, !y, t.username, t.password), y || (a.withCredentials = !! t.withCredentials), !y && t.timeout > 0 && (u = setTimeout(function () {
                if (!c) {
                    c = !0,
                        a.abort("timeout");
                    var t = new Error("XMLHttpRequest timeout");
                    t.code = "ETIMEDOUT",
                        r(t)
                }
            }, t.timeout)), a.setRequestHeader) for (l in f) f.hasOwnProperty(l) && a.setRequestHeader(l, f[l]);
            else if (t.headers && !vt(t.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
            return "responseType" in t && (a.responseType = t.responseType),
            "beforeSend" in t && "function" == typeof t.beforeSend && t.beforeSend(a),
                a.send(d || null),
                a
        }
        function Tt(t) {
            if ("document" === t.responseType) return t.responseXML;
            var e = t.responseXML && "parsererror" === t.responseXML.documentElement.nodeName;
            return "" !== t.responseType || e ? null : t.responseXML
        }
        function Ct() {}
        function Et(t, e) {
            this.name = "ParsingError",
                this.code = t.code,
                this.message = e || t.message
        }
        function kt(t) {
            function e(t, e, n, r) {
                return 3600 * (0 | t) + 60 * (0 | e) + (0 | n) + (0 | r) / 1e3
            }
            var n = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
            return n ? n[3] ? e(n[1], n[2], n[3].replace(":", ""), n[4]) : n[1] > 59 ? e(n[1], n[2], 0, n[4]) : e(0, n[1], n[2], n[4]) : null
        }
        function wt() {
            this.values = Ui(null)
        }
        function St(t, e, n, r) {
            var i = r ? t.split(r) : [t];
            for (var o in i) if ("string" == typeof i[o]) {
                var s = i[o].split(n);
                if (2 === s.length) {
                    var a = s[0],
                        l = s[1];
                    e(a, l)
                }
            }
        }
        function Pt(t, e, n) {
            function r() {
                var e = kt(t);
                if (null === e) throw new Et(Et.Errors.BadTimeStamp, "Malformed timestamp: " + o);
                return t = t.replace(/^[^\sa-zA-Z-]+/, ""),
                    e
            }
            function i() {
                t = t.replace(/^\s+/, "")
            }
            var o = t;
            if (i(), e.startTime = r(), i(), "--\x3e" !== t.substr(0, 3)) throw new Et(Et.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + o);
            t = t.substr(3),
                i(),
                e.endTime = r(),
                i(),


                function (t, e) {
                    var r = new wt;
                    St(t, function (t, e) {
                        switch (t) {
                            case "region":
                                for (var i = n.length - 1; i >= 0; i--) if (n[i].id === e) {
                                    r.set(t, n[i].region);
                                    break
                                }
                                break;
                            case "vertical":
                                r.alt(t, e, ["rl", "lr"]);
                                break;
                            case "line":
                                var o = e.split(","),
                                    s = o[0];
                                r.integer(t, s),
                                r.percent(t, s) && r.set("snapToLines", !1),
                                    r.alt(t, s, ["auto"]),
                                2 === o.length && r.alt("lineAlign", o[1], ["start", "middle", "end"]);
                                break;
                            case "position":
                                o = e.split(","),
                                    r.percent(t, o[0]),
                                2 === o.length && r.alt("positionAlign", o[1], ["start", "middle", "end"]);
                                break;
                            case "size":
                                r.percent(t, e);
                                break;
                            case "align":
                                r.alt(t, e, ["start", "middle", "end", "left", "right"])
                        }
                    }, /:/, /\s/),
                        e.region = r.get("region", null),
                        e.vertical = r.get("vertical", ""),
                        e.line = r.get("line", "auto"),
                        e.lineAlign = r.get("lineAlign", "start"),
                        e.snapToLines = r.get("snapToLines", !0),
                        e.size = r.get("size", 100),
                        e.align = r.get("align", "middle"),
                        e.position = r.get("position", {
                            start: 0,
                            left: 0,
                            middle: 50,
                            end: 100,
                            right: 100
                        }, e.align),
                        e.positionAlign = r.get("positionAlign", {
                            start: "start",
                            left: "start",
                            middle: "middle",
                            end: "end",
                            right: "end"
                        }, e.align)
                }(t, e)
        }
        function xt(t, e) {
            function n(t) {
                return zi[t]
            }
            for (var r, i = t.document.createElement("div"), o = i, s = []; null !== (r = function () {
                if (!e) return null;
                var t = e.match(/^([^<]*)(<[^>]+>?)?/);
                return function (t) {
                    return e = e.substr(t.length),
                        t
                }(t[1] ? t[1] : t[2])
            }());) if ("<" !== r[0]) o.appendChild(t.document.createTextNode(function (t) {
                for (; c = t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) t = t.replace(c[0], n);
                return t
            }(r)));
            else {
                if ("/" === r[1]) {
                    s.length && s[s.length - 1] === r.substr(2).replace(">", "") && (s.pop(), o = o.parentNode);
                    continue
                }
                var a, l = kt(r.substr(1, r.length - 2));
                if (l) {
                    a = t.document.createProcessingInstruction("timestamp", l),
                        o.appendChild(a);
                    continue
                }
                var c = r.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                if (!c) continue;
                if (!(a = function (e, n) {
                    var r = qi[e];
                    if (!r) return null;
                    var i = t.document.createElement(r);
                    i.localName = r;
                    var o = Wi[e];
                    return o && n && (i[o] = n.trim()),
                        i
                }(c[1], c[3]))) continue;
                if (!
                    function (t, e) {
                        return !Ki[e.localName] || Ki[e.localName] === t.localName
                    }(o, a)) continue;
                c[2] && (a.className = c[2].substr(1).replace(".", " ")),
                    s.push(c[1]),
                    o.appendChild(a),
                    o = a
            }
            return i
        }
        function It(t) {
            for (var e = 0; e < Xi.length; e++) {
                var n = Xi[e];
                if (t >= n[0] && t <= n[1]) return !0
            }
            return !1
        }
        function Mt(t) {
            function e(t, e) {
                for (var n = e.childNodes.length - 1; n >= 0; n--) t.push(e.childNodes[n])
            }
            function n(t) {
                if (!t || !t.length) return null;
                var r = t.pop(),
                    i = r.textContent || r.innerText;
                if (i) {
                    var o = i.match(/^.*(\n|\r)/);
                    return o ? (t.length = 0, o[0]) : i
                }
                return "ruby" === r.tagName ? n(t) : r.childNodes ? (e(t, r), n(t)) : void 0
            }
            var r, i = [],
                o = "";
            if (!t || !t.childNodes) return "ltr";
            for (e(i, t); o = n(i);) for (var s = 0; s < o.length; s++) if (r = o.charCodeAt(s), It(r)) return "rtl";
            return "ltr"
        }
        function Dt(t) {
            if ("number" == typeof t.line && (t.snapToLines || t.line >= 0 && t.line <= 100)) return t.line;
            if (!t.track || !t.track.textTrackList || !t.track.textTrackList.mediaElement) return -1;
            for (var e = t.track, n = e.textTrackList, r = 0, i = 0; i < n.length && n[i] !== e; i++)"showing" === n[i].mode && r++;
            return -1 * ++r
        }
        function At() {}
        function Rt(t, e, n) {
            var r = /MSIE\s8\.0/.test(navigator.userAgent),
                i = "rgba(255, 255, 255, 1)",
                o = "rgba(0, 0, 0, 0.8)";
            r && (i = "rgb(255, 255, 255)", o = "rgb(0, 0, 0)"),
                At.call(this),
                this.cue = e,
                this.cueDiv = xt(t, e.text);
            var s = {
                color: i,
                backgroundColor: o,
                position: "relative",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "inline"
            };
            r || (s.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl", s.unicodeBidi = "plaintext"),
                this.applyStyles(s, this.cueDiv),
                this.div = t.document.createElement("div"),
                s = {
                    textAlign: "middle" === e.align ? "center" : e.align,
                    font: n.font,
                    whiteSpace: "pre-line",
                    position: "absolute"
                },
            r || (s.direction = Mt(this.cueDiv), s.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"),
                this.applyStyles(s),
                this.div.appendChild(this.cueDiv);
            var a = 0;
            switch (e.positionAlign) {
                case "start":
                    a = e.position;
                    break;
                case "middle":
                    a = e.position - e.size / 2;
                    break;
                case "end":
                    a = e.position - e.size
            }
            "" === e.vertical ? this.applyStyles({
                left: this.formatStyle(a, "%"),
                width: this.formatStyle(e.size, "%")
            }) : this.applyStyles({
                top: this.formatStyle(a, "%"),
                height: this.formatStyle(e.size, "%")
            }),
                this.move = function (t) {
                    this.applyStyles({
                        top: this.formatStyle(t.top, "px"),
                        bottom: this.formatStyle(t.bottom, "px"),
                        left: this.formatStyle(t.left, "px"),
                        right: this.formatStyle(t.right, "px"),
                        height: this.formatStyle(t.height, "px"),
                        width: this.formatStyle(t.width, "px")
                    })
                }
        }
        function jt(t) {
            var e, n, r, i, o = /MSIE\s8\.0/.test(navigator.userAgent);
            if (t.div) {
                n = t.div.offsetHeight,
                    r = t.div.offsetWidth,
                    i = t.div.offsetTop;
                var s = (s = t.div.childNodes) && (s = s[0]) && s.getClientRects && s.getClientRects();
                t = t.div.getBoundingClientRect(),
                    e = s ? Math.max(s[0] && s[0].height || 0, t.height / s.length) : 0
            }
            this.left = t.left,
                this.right = t.right,
                this.top = t.top || i,
                this.height = t.height || n,
                this.bottom = t.bottom || i + (t.height || n),
                this.width = t.width || r,
                this.lineHeight = e !== undefined ? e : t.lineHeight,
            o && !this.lineHeight && (this.lineHeight = 13)
        }
        function Ot(t, e, n, r) {
            var i = new jt(e),
                o = e.cue,
                s = Dt(o),
                a = [];
            if (o.snapToLines) {
                var l;
                switch (o.vertical) {
                    case "":
                        a = ["+y", "-y"],
                            l = "height";
                        break;
                    case "rl":
                        a = ["+x", "-x"],
                            l = "width";
                        break;
                    case "lr":
                        a = ["-x", "+x"],
                            l = "width"
                }
                var c = i.lineHeight,
                    u = c * Math.round(s),
                    h = n[l] + c,
                    p = a[0];
                Math.abs(u) > h && (u = u < 0 ? -1 : 1, u *= Math.ceil(h / c) * c),
                s < 0 && (u += "" === o.vertical ? n.height : n.width, a = a.reverse()),
                    i.move(p, u)
            } else {
                var d = i.lineHeight / n.height * 100;
                switch (o.lineAlign) {
                    case "middle":
                        s -= d / 2;
                        break;
                    case "end":
                        s -= d
                }
                switch (o.vertical) {
                    case "":
                        e.applyStyles({
                            top: e.formatStyle(s, "%")
                        });
                        break;
                    case "rl":
                        e.applyStyles({
                            left: e.formatStyle(s, "%")
                        });
                        break;
                    case "lr":
                        e.applyStyles({
                            right: e.formatStyle(s, "%")
                        })
                }
                a = ["+y", "-x", "+x", "-y"],
                    i = new jt(e)
            }
            var f = function (t, e) {
                for (var i, o = new jt(t), s = 1, a = 0; a < e.length; a++) {
                    for (; t.overlapsOppositeAxis(n, e[a]) || t.within(n) && t.overlapsAny(r);) t.move(e[a]);
                    if (t.within(n)) return t;
                    var l = t.intersectPercentage(n);
                    s > l && (i = new jt(t), s = l),
                        t = new jt(o)
                }
                return i || o
            }(i, a);
            e.move(f.toCSSCompatValues(n))
        }
        function Lt() {}
        function Nt(t) {
            return "string" == typeof t && ( !! $i[t.toLowerCase()] && t.toLowerCase())
        }
        function Bt(t) {
            return "string" == typeof t && ( !! Yi[t.toLowerCase()] && t.toLowerCase())
        }
        function Ft(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n) t[r] = n[r]
            }
            return t
        }
        function Ht(t, e, n) {
            var r = this,
                i = /MSIE\s8\.0/.test(navigator.userAgent),
                o = {};
            i ? r = document.createElement("custom") : o.enumerable = !0,
                r.hasBeenReset = !1;
            var s = "",
                a = !1,
                l = t,
                c = e,
                u = n,
                h = null,
                p = "",
                d = !0,
                f = "auto",
                y = "start",
                g = 50,
                v = "middle",
                m = 50,
                _ = "middle";
            if (Object.defineProperty(r, "id", Ft({}, o, {
                get: function () {
                    return s
                },
                set: function (t) {
                    s = "" + t
                }
            })), Object.defineProperty(r, "pauseOnExit", Ft({}, o, {
                get: function () {
                    return a
                },
                set: function (t) {
                    a = !! t
                }
            })), Object.defineProperty(r, "startTime", Ft({}, o, {
                get: function () {
                    return l
                },
                set: function (t) {
                    if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                    l = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "endTime", Ft({}, o, {
                get: function () {
                    return c
                },
                set: function (t) {
                    if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                    c = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "text", Ft({}, o, {
                get: function () {
                    return u
                },
                set: function (t) {
                    u = "" + t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "region", Ft({}, o, {
                get: function () {
                    return h
                },
                set: function (t) {
                    h = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "vertical", Ft({}, o, {
                get: function () {
                    return p
                },
                set: function (t) {
                    var e = Nt(t);
                    if (!1 === e) throw new SyntaxError("An invalid or illegal string was specified.");
                    p = e,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "snapToLines", Ft({}, o, {
                get: function () {
                    return d
                },
                set: function (t) {
                    d = !! t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "line", Ft({}, o, {
                get: function () {
                    return f
                },
                set: function (t) {
                    if ("number" != typeof t && t !== Gi) throw new SyntaxError("An invalid number or illegal string was specified.");
                    f = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "lineAlign", Ft({}, o, {
                get: function () {
                    return y
                },
                set: function (t) {
                    var e = Bt(t);
                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                    y = e,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "position", Ft({}, o, {
                get: function () {
                    return g
                },
                set: function (t) {
                    if (t < 0 || t > 100) throw new Error("Position must be between 0 and 100.");
                    g = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "positionAlign", Ft({}, o, {
                get: function () {
                    return v
                },
                set: function (t) {
                    var e = Bt(t);
                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                    v = e,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "size", Ft({}, o, {
                get: function () {
                    return m
                },
                set: function (t) {
                    if (t < 0 || t > 100) throw new Error("Size must be between 0 and 100.");
                    m = t,
                        this.hasBeenReset = !0
                }
            })), Object.defineProperty(r, "align", Ft({}, o, {
                get: function () {
                    return _
                },
                set: function (t) {
                    var e = Bt(t);
                    if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                    _ = e,
                        this.hasBeenReset = !0
                }
            })), r.displayState = undefined, i) return r
        }
        function Vt(t) {
            return "string" == typeof t && ( !! Zi[t.toLowerCase()] && t.toLowerCase())
        }
        function Ut(t) {
            return "number" == typeof t && t >= 0 && t <= 100
        }
        function zt() {
            var t = 100,
                e = 3,
                n = 0,
                r = 100,
                i = 0,
                o = 100,
                s = "";
            Object.defineProperties(this, {
                width: {
                    enumerable: !0,
                    get: function () {
                        return t
                    },
                    set: function (e) {
                        if (!Ut(e)) throw new Error("Width must be between 0 and 100.");
                        t = e
                    }
                },
                lines: {
                    enumerable: !0,
                    get: function () {
                        return e
                    },
                    set: function (t) {
                        if ("number" != typeof t) throw new TypeError("Lines must be set to a number.");
                        e = t
                    }
                },
                regionAnchorY: {
                    enumerable: !0,
                    get: function () {
                        return r
                    },
                    set: function (t) {
                        if (!Ut(t)) throw new Error("RegionAnchorX must be between 0 and 100.");
                        r = t
                    }
                },
                regionAnchorX: {
                    enumerable: !0,
                    get: function () {
                        return n
                    },
                    set: function (t) {
                        if (!Ut(t)) throw new Error("RegionAnchorY must be between 0 and 100.");
                        n = t
                    }
                },
                viewportAnchorY: {
                    enumerable: !0,
                    get: function () {
                        return o
                    },
                    set: function (t) {
                        if (!Ut(t)) throw new Error("ViewportAnchorY must be between 0 and 100.");
                        o = t
                    }
                },
                viewportAnchorX: {
                    enumerable: !0,
                    get: function () {
                        return i
                    },
                    set: function (t) {
                        if (!Ut(t)) throw new Error("ViewportAnchorX must be between 0 and 100.");
                        i = t
                    }
                },
                scroll: {
                    enumerable: !0,
                    get: function () {
                        return s
                    },
                    set: function (t) {
                        var e = Vt(t);
                        if (!1 === e) throw new SyntaxError("An invalid or illegal string was specified.");
                        s = e
                    }
                }
            })
        }
        function qt(t, e, n, r) {
            var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
                o = t.textTracks();
            i.kind = e,
            n && (i.label = n),
            r && (i.language = r),
                i.tech = t;
            var s = new Vi.text.TrackClass(i);
            return o.addTrack(s),
                s
        }
        function Wt(t, e) {
            ro[t] = ro[t] || [],
                ro[t].push(e)
        }
        function Kt(t, e, n) {
            t.setTimeout(function () {
                return Yt(e, ro[e.type], n, t)
            }, 1)
        }
        function Xt(t, e) {
            t.forEach(function (t) {
                return t.setTech && t.setTech(e)
            })
        }
        function Qt(t, e, n) {
            return t.reduceRight($t(n), e[n]())
        }
        function Gt(t, e, n, r) {
            return e[n](t.reduce($t(n), r))
        }
        function $t(t) {
            return function (e, n) {
                return n[t] ? n[t](e) : e
            }
        }
        function Yt() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [],
                n = arguments[2],
                r = arguments[3],
                i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [],
                o = arguments.length > 5 && arguments[5] !== undefined && arguments[5],
                a = e[0],
                l = e.slice(1);
            if ("string" == typeof a) Yt(t, ro[a], n, r, i, o);
            else if (a) {
                var c = a(r);
                c.setSource(s({}, t), function (e, s) {
                    if (e) return Yt(t, l, n, r, i, o);
                    i.push(c),
                        Yt(s, t.type === s.type ? l : ro[s.type], n, r, i, o)
                })
            } else l.length ? Yt(t, l, n, r, i, o) : o ? n(t, i) : Yt(t, ro["*"], n, r, i, !0)
        }
        function Jt(t, e) {
            return "rgba(" + parseInt(t[1] + t[1], 16) + "," + parseInt(t[2] + t[2], 16) + "," + parseInt(t[3] + t[3], 16) + "," + e + ")"
        }
        function Zt(t, e, n) {
            try {
                t.style[e] = n
            } catch (r) {
                return
            }
        }
        function te(t) {
            var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t;
            t = t < 0 ? 0 : t;
            var n = Math.floor(t % 60),
                r = Math.floor(t / 60 % 60),
                i = Math.floor(t / 3600),
                o = Math.floor(e / 60 % 60),
                s = Math.floor(e / 3600);
            return (isNaN(t) || t === Infinity) && (i = r = n = "-"),
                i = i > 0 || s > 0 ? i + ":" : "",
                r = ((i || o >= 10) && r < 10 ? "0" + r : r) + ":",
                n = n < 10 ? "0" + n : n,
            i + r + n
        }
        function ee(t, e) {
            if (e && (t = e(t)), t && "none" !== t) return t
        }
        function ne(t, e) {
            return ee(t.options[t.options.selectedIndex].value, e)
        }
        function re(t, e, n) {
            if (e) for (var r = 0; r < t.options.length; r++) if (ee(t.options[r].value, n) === e) {
                t.selectedIndex = r;
                break
            }
        }
        function ie(t, e, n) {
            var r = void 0;
            if ("string" == typeof t) {
                var i = ie.getPlayers();
                if (0 === t.indexOf("#") && (t = t.slice(1)), i[t]) return e && tr.warn('Player "' + t + '" is already initialised. Options will not be applied.'),
                n && i[t].ready(n),
                    i[t];
                r = rr("#" + t)
            } else r = t;
            if (!r || !r.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
            if (r.player || Is.players[r.playerId]) return r.player || Is.players[r.playerId];
            g(r) && !Ye.body.contains(r) && tr.warn("The element supplied is not included in the DOM"),
                e = e || {},
                ie.hooks("beforesetup").forEach(function (t) {
                    var n = t(r, it(e));
                    if (!a(n) || Array.isArray(n)) return void tr.error("please return an object in beforesetup hooks");
                    e = it(e, n)
                });
            var o = Ir.getComponent("Player"),
                s = new o(r, e, n);
            return ie.hooks("setup").forEach(function (t) {
                return t(s)
            }),
                s
        }
        function oe(t) {
            if (null === t || t === undefined) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }
        function se(t, e) {
            try {
                return decodeURIComponent(t.join(""))
            } catch (i) {}
            if (1 === t.length) return t;
            e = e || 1;
            var n = t.slice(0, e),
                r = t.slice(e);
            return Array.prototype.concat.call([], se(n), se(r))
        }
        function ae(t) {
            try {
                return decodeURIComponent(t)
            } catch (r) {
                for (var e = t.match($s), n = 1; n < e.length; n++) t = se(e, n).join(""),
                    e = t.match($s);
                return t
            }
        }
        function le(t) {
            for (var e = {
                "%FE%FF": "��",
                "%FF%FE": "��"
            }, n = Ys.exec(t); n;) {
                try {
                    e[n[0]] = decodeURIComponent(n[0])
                } catch (a) {
                    var r = ae(n[0]);
                    r !== n[0] && (e[n[0]] = r)
                }
                n = Ys.exec(t)
            }
            e["%C2"] = "�";
            for (var i = Object.keys(e), o = 0; o < i.length; o++) {
                var s = i[o];
                t = t.replace(new RegExp(s, "g"), e[s])
            }
            return t
        }
        function ce(t) {
            switch (t.arrayFormat) {
                case "index":
                    return function (e, n, r) {
                        return null === n ? [he(e, t), "[", r, "]"].join("") : [he(e, t), "[", he(r, t), "]=", he(n, t)].join("")
                    };
                case "bracket":
                    return function (e, n) {
                        return null === n ? he(e, t) : [he(e, t), "[]=", he(n, t)].join("")
                    };
                default:
                    return function (e, n) {
                        return null === n ? he(e, t) : [he(e, t), "=", he(n, t)].join("")
                    }
            }
        }
        function ue(t) {
            var e;
            switch (t.arrayFormat) {
                case "index":
                    return function (t, n, r) {
                        if (e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), !e) return void(r[t] = n);
                        r[t] === undefined && (r[t] = {}),
                            r[t][e[1]] = n
                    };
                case "bracket":
                    return function (t, n, r) {
                        return e = /(\[\])$/.exec(t),
                            t = t.replace(/\[\]$/, ""),
                            e ? r[t] === undefined ? void(r[t] = [n]) : void(r[t] = [].concat(r[t], n)) : void(r[t] = n)
                    };
                default:
                    return function (t, e, n) {
                        if (n[t] === undefined) return void(n[t] = e);
                        n[t] = [].concat(n[t], e)
                    }
            }
        }
        function he(t, e) {
            return e.encode ? e.strict ? Ws(t) : encodeURIComponent(t) : t
        }
        function pe(t) {
            return Array.isArray(t) ? t.sort() : "object" == typeof t ? pe(Object.keys(t)).sort(function (t, e) {
                return Number(t) - Number(e)
            }).map(function (e) {
                return t[e]
            }) : t
        }
        function de(t) {
            var e = t.indexOf("?");
            return -1 === e ? "" : t.slice(e + 1)
        }
        function fe(t, e) {
            e = Gs({
                arrayFormat: "none"
            }, e);
            var n = ue(e),
                r = Object.create(null);
            return "string" != typeof t ? r : (t = t.trim().replace(/^[?#&]/, "")) ? (t.split("&").forEach(function (t) {
                var e = t.replace(/\+/g, " ").split("="),
                    i = e.shift(),
                    o = e.length > 0 ? e.join("=") : undefined;
                o = o === undefined ? null : Js(o),
                    n(Js(i), o, r)
            }), Object.keys(r).sort().reduce(function (t, e) {
                var n = r[e];
                return Boolean(n) && "object" == typeof n && !Array.isArray(n) ? t[e] = pe(n) : t[e] = n,
                    t
            }, Object.create(null))) : r
        }
        function ye(t, e, n) {
            function r() {
                c.parentNode && c.parentNode.removeChild(c),
                    window[a] = "",
                u && clearTimeout(u)
            }
            function i() {
                window[a] && r()
            }
            "function" == typeof e && (n = e, e = {}),
            e || (e = {});
            var o, s = e.prefix || "__jp",
                a = e.name || s + ia++,
                l = e.funcKey || "callback";
            o = "object" == zn(e.param) ? ra.stringify(e.param) : e.param;
            var c, u, h = null != e.timeout ? e.timeout : 6e3,
                p = encodeURIComponent,
                d = document.getElementsByTagName("script")[0] || document.head;
            return h && (u = setTimeout(function () {
                r(),
                n && n(new Error("Timeout"))
            }, h)),
                window[a] = function (t) {
                    r(),
                    n && n(null, t)
                },
                t += (~t.indexOf("?") ? "&" : "?") + o + "&" + l + "=" + p(a),
                t = t.replace("?&", "?"),
                c = document.createElement("script"),
                c.setAttribute("src", t),
                c.setAttribute("async", !0),
                c.onload = function (t) {},
                c.onreadystatechange = function () {
                    "loaded" === this.readyState && window[a] && (r(), n && n(new Error("ServerError")))
                },
                c.onerror = function (t) {
                    r(),
                    n && n(new Error("ServerError"))
                },
                d.parentNode.insertBefore(c, d),
                i
        }
        function ge(t, e) {
            var n = e.split("?")[1];
            if (n) {
                var r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                    i = n.match(r);
                return null != i ? decodeURIComponent(i[2]) : null
            }
        }
        function ve(t) {
            t = t.replace(/^(http|https):/, "");
            var e = window.location.protocol;
            return "http:" != e && "https:" != e && (e = "http:"),
                t = e + t
        }
        function me(t, e) {
            var n = /^http(s)?:\/\/(.*?)\//,
                r = t.match(n);
            return t.replace(r[2], e)
        }
        function _e() {
            var t = document,
                e = t.documentElement,
                n = t.body;
            return {
                width: e && e.clientWidth || n && n.offsetWidth || window.innerWidth || 0,
                height: e && e.clientHeight || n && n.offsetHeight || window.innerHeight || 0
            }
        }
        function be() {
            return (new Date).getTime()
        }
        function Te(t, e, n) {
            var r = arguments.length > 3 && arguments[3] !== undefined && arguments[3],
                i = document.createElement("script");
            if (i.onload = i.onreadystatechange = function () {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(), i.onload = i.onreadystatechange = null, i.parentNode && !r && i.parentNode.removeChild(i))
            }, n) for (var o in n) if (n.hasOwnProperty(o)) {
                var s = n[o];
                null === s ? i.removeAttribute(s) : i.setAttribute(o, s)
            }
            i.src = t,
                document.getElementsByTagName("head")[0].appendChild(i)
        }
        function Ce(t) {
            var e = [],
                n = function (t, n) {
                    n = "function" == typeof n ? n() : n,
                        n = null === n ? "" : n === undefined ? "" : n,
                        e[e.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
                };
            return function r(t, i) {
                var o = void 0,
                    s = void 0,
                    a = void 0;
                if (t) if (Array.isArray(i)) for (o = 0, s = i.length; o < s; o++) r(t + "[" + ("object" === zn(i[o]) && i[o] ? o : "") + "]", i[o]);
                else if ("[object Object]" === String(i)) for (a in i) r(t + "[" + a + "]", i[a]);
                else n(t, i);
                else if (Array.isArray(i)) for (o = 0, s = i.length; o < s; o++) n(i[o].name, i[o].value);
                else for (a in i) r(a, i[a]);
                return e
            }("", t).join("&")
        }
        function Ee(t) {
            return t.length ? String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\//g, "&#x2F;") : ""
        }
        function ke() {
            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0,
                e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fill",
                n = t,
                r = "draw-" + e;
            return ['<svg height="100%" width="100%" viewBox="0 0 484 348">\n      <path class="' + r + '" transform="translate(4 4)" d="M383,124C350-42,122.3-40.5,90.6,123.5c-110.4,18.5-131,185,.6,216.5H381.6C519.7,310.7,494.1,137.8,383,124Z"/>\n      <path transform="translate(4 4)" d="M200.4,110.2c-9.4-5.8-19.6,2.7-19.4,11.7V256.2c0,8,10.4,16.7,19.4,10.8,2.2-1.4,111.8-65.9,114-67.3,7.4-4,10.1-15.8,0-22.2Z" style="fill:#fff ;"/>\n    </svg>', '<svg height="100%" width="100%" viewBox="0 0 476 340">\n      <path class="' + r + '" d="M383,124C350-42,122.3-40.5,90.6,123.5c-110.4,18.5-131,185,.6,216.5H381.6C519.7,310.7,494.1,137.8,383,124Z"/>\n      <path d="M200.4,110.2c-9.4-5.8-19.6,2.7-19.4,11.7V256.2c0,8,10.4,16.7,19.4,10.8,2.2-1.4,111.8-65.9,114-67.3,7.4-4,10.1-15.8,0-22.2Z" style="fill:#fff ;"/>\n    </svg>', '<svg height="100%" width="100%" viewBox="0 14 96 68">\n      <path class="' + r + '" d="M96,44.3v7.3c-0.1,7.7-1,15.5-1,15.5s-0.9,6.6-3.8,9.5c-3.6,3.8-7.7,3.8-9.6,4c-13.4,1-33.5,0.9-33.5,0.9 c-0.8,0-25-0.2-32.5-0.9c-2.1-0.4-6.9-0.3-10.6-4.1c-2.9-2.9-3.8-9.5-3.8-9.5s-1-7.7-1.1-15.5v-7.3c0.2-7.8,1.1-15.5,1.1-15.5 s0.9-6.6,3.8-9.5c3.6-3.8,7.7-3.8,9.6-4.1c13.4-1,33.5-0.9,33.5-0.9s20.1-0.1,33.5,0.9c1.9,0.2,5.9,0.2,9.6,4.1 c2.9,2.9,3.8,9.5,3.8,9.5S95.9,36.6,96,44.3z M38.3,61.4L64,47.9L38.3,34.4V61.4z"/>\n      <polygon points="64,47.9 38.3,61.4 38.3,34.4" fill="#fff"/>\n    </svg>'][n]
        }
        function we(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e)
        }
        function Se(t) {
            var e = Ya.call(t, Za),
                n = t[Za];
            try {
                t[Za] = undefined;
                var r = !0
            } catch (o) {}
            var i = Ja.call(t);
            return r && (e ? t[Za] = n : delete t[Za]),
                i
        }
        function Pe(t) {
            return nl.call(t)
        }
        function xe(t) {
            return null == t ? t === undefined ? ol : il : sl && sl in Object(t) ? tl(t) : rl(t)
        }
        function Ie(t) {
            return null != t && "object" == typeof t
        }
        function Me(t) {
            return "symbol" == typeof t || ll(t) && al(t) == cl
        }
        function De(t) {
            if ("number" == typeof t) return t;
            if (ul(t)) return hl;
            if (Ha(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = Ha(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(pl, "");
            var n = fl.test(t);
            return n || yl.test(t) ? gl(t.slice(2), n ? 2 : 8) : dl.test(t) ? hl : +t
        }
        function Ae(t, e, n) {
            function r(e) {
                var n = p,
                    r = d;
                return p = d = undefined,
                    m = e,
                    y = t.apply(r, n)
            }
            function i(t) {
                return m = t,
                    g = setTimeout(a, e),
                    _ ? r(t) : y
            }
            function o(t) {
                var n = t - v,
                    r = t - m,
                    i = e - n;
                return b ? bl(i, f - r) : i
            }
            function s(t) {
                var n = t - v,
                    r = t - m;
                return v === undefined || n >= e || n < 0 || b && r >= f
            }
            function a() {
                var t = Xa();
                if (s(t)) return l(t);
                g = setTimeout(a, o(t))
            }
            function l(t) {
                return g = undefined,
                    T && p ? r(t) : (p = d = undefined, y)
            }
            function c() {
                g !== undefined && clearTimeout(g),
                    m = 0,
                    p = v = d = g = undefined
            }
            function u() {
                return g === undefined ? y : l(Xa())
            }
            function h() {
                var t = Xa(),
                    n = s(t);
                if (p = arguments, d = this, v = t, n) {
                    if (g === undefined) return i(v);
                    if (b) return g = setTimeout(a, e),
                        r(v)
                }
                return g === undefined && (g = setTimeout(a, e)),
                    y
            }
            var p, d, f, y, g, v, m = 0,
                _ = !1,
                b = !1,
                T = !0;
            if ("function" != typeof t) throw new TypeError(ml);
            return e = vl(e) || 0,
            Ha(n) && (_ = !! n.leading, b = "maxWait" in n, f = b ? _l(vl(n.maxWait) || 0, e) : f, T = "trailing" in n ? !! n.trailing : T),
                h.cancel = c,
                h.flush = u,
                h
        }
        function Re(t, e, n) {
            var r = !0,
                i = !0;
            if ("function" != typeof t) throw new TypeError(Cl);
            return Ha(n) && (r = "leading" in n ? !! n.leading : r, i = "trailing" in n ? !! n.trailing : i),
                Tl(t, e, {
                    leading: r,
                    maxWait: e,
                    trailing: i
                })
        }
        function je(e) {
            if (t && t.isSupported() && !ie.browser.IS_TBS && !ie.browser.IS_MQQB && !ie.browser.IS_SAFARI || e) try {
                var n = ie.getTech && ie.getTech("Html5");
                n && n.registerSourceHandler(Uu, 0)
            } catch (r) {}
        }
        function Oe(t, e) {
            function r(t) {
                return "dash-audio-" + t
            }
            function i(t, e) {
                return t.find(function (t) {
                    return r(t.index) === e.id
                })
            }
            var o = t.dash.mediaPlayer,
                s = o.getTracksFor("audio"),
                a = t.audioTracks();
            a.length && e.clearTracks(["audio"]);
            var l = o.getCurrentTrackFor("audio");
            s.forEach(function (t) {
                var e = t.lang;
                t.roles && t.roles.length && (e += " (" + t.roles.join(", ") + ")"),
                    a.addTrack(new ie.AudioTrack({
                        enabled: t === l,
                        id: r(t.index),
                        kind: t.kind || "main",
                        label: e,
                        language: t.lang
                    }))
            });
            var c = function () {
                for (var t = 0; t < a.length; t++) {
                    var e = a[t];
                    if (e.enabled) {
                        var n = i(s, e);
                        o.setCurrentTrack(n)
                    } else;
                }
            };
            a.addEventListener("change", c),
                t.dash.mediaPlayer.on(n.MediaPlayer.events.STREAM_TEARDOWN_COMPLETE, function () {
                    a.removeEventListener("change", c)
                })
        }
        function Le(t, e) {
            t.dash.mediaPlayer.on(n.MediaPlayer.events.PLAYBACK_METADATA_LOADED, Oe.bind(null, t, e))
        }
        function Ne(t, e) {
            for (var n = 0; n < t.length; n++) if (e(t[n])) return t[n]
        }
        function Be(t, e, r) {
            function i() {
                for (var e = t.dash.mediaPlayer, n = t.textTracks(), i = -1, s = 0; s < n.length; s += 1)!
                    function (t) {
                        var e = n[t];
                        if ("showing" === e.mode) {
                            var s = Ne(o, function (t) {
                                    return t.textTrack === e
                                }),
                                a = s ? s.dashTrack : null;
                            a && (i = r.indexOf(a))
                        }
                    }(s);
                i !== e.getCurrentTextTrackIndex() && e.setTextTrack(i)
            }
            var o = [],
                s = r.map(function (t) {
                    return {
                        dashTrack: t,
                        trackConfig: {
                            label: t.lang,
                            language: t.lang,
                            srclang: t.lang,
                            kind: t.kind
                        }
                    }
                }).map(function (e) {
                    var n = e.trackConfig,
                        r = e.dashTrack,
                        i = t.addRemoteTextTrack(n, !1);
                    return o.push({
                        textTrack: i.track,
                        dashTrack: r
                    }),
                        i
                });
            return t.textTracks().on("change", i),
                t.dash.mediaPlayer.on(n.MediaPlayer.events.STREAM_TEARDOWN_COMPLETE, function () {
                    t.textTracks().off("change", i)
                }),
                i(),
                s
        }
        function Fe(t, e, r) {
            function i() {
                s.forEach(t.removeRemoteTextTrack.bind(t)),
                    s = []
            }
            function o(l) {
                var c = (l.index, l.tracks);
                a.off(n.MediaPlayer.events.TEXT_TRACKS_ADDED, o),
                    i(),
                c.length && (s = Be(t, e, c, r))
            }
            Ke.VTTCue && !/\[native code\]/.test(Ke.VTTCue.toString()) && (Ke.VTTCue = !1);
            var s = [];
            if (e.featuresNativeTextTracks) return void ie.log.error("You must pass {html: {nativeCaptions: false}} in the videojs constructor to use text tracks in videojs-contrib-dash");
            var a = t.dash.mediaPlayer;
            a.on(n.MediaPlayer.events.TEXT_TRACKS_ADDED, o),
                a.on(n.MediaPlayer.events.CAN_PLAY, function () {
                    a.off(n.MediaPlayer.events.TEXT_TRACKS_ADDED, o)
                })
        }
        function He(t) {
            (Ke.MediaSource && n || t) && ie.getTech("Html5").registerSourceHandler(ie.DashSourceHandler(), 0)
        }
        function Ve(t) {
            ah[t] = function () {
                return this.el_.vjs_getProperty(t)
            }
        }
        function Ue(t, e, n) {
            var r = void 0,
                i = (new Date).getTime(),
                o = ie.dom;
            if ("string" == typeof t) r = document.querySelector("#" + t);
            else {
                if (!t || !t.nodeName) throw new TypeError("The ID or element supplied is not valid.");
                r = t
            }
            if ("video" != r.nodeName.toLowerCase() && "audio" != r.nodeName.toLowerCase()) throw new TypeError("The element type must be <video>.");
            o.hasClass(r, "tcplayer") || o.addClass(r, "tcplayer"),
            o.hasClass(r, "video-js") || o.addClass(r, "video-js"),
            ie.browser.IE_VERSION && (r.style.width || r.offsetWidth && 300 !== r.offsetWidth) && (Ke.VIDEOJS_NO_DYNAMIC_STYLE = !0);
            var s = {
                controls: !0,
                language: "zh-CN",
                playbackRates: [.5, 1, 1.25, 1.5, 2],
                controlBar: {
                    volumePanel: {
                        inline: "video" != r.nodeName.toLowerCase()
                    },
                    fullscreenToggle: "video" == r.nodeName.toLowerCase(),
                    QualitySwitcherMenuButton: !0
                },
                plugins: {
                    Skin: "",
                    VID: "",
                    QualitySwitcher: {},
                    MultiResolution: {},
                    Errors: {},
                    Reporter: {},
                    ContextMenu: {},
                    VttThumbnail: {},
                    PlayerMetrics: {}
                }
            };
            e = ie.mergeOptions(s, e),
            ie.browser.IE_VERSION && ie.browser.IE_VERSION < 11 && Ke.top,
            e.autoplay && ie.browser.IS_ANDROID && ie.browser.IS_WECHAT && (e.autoplay = !1),
                dh("player initializing", e),
                ie.getComponent("player").prototype.options_.children.splice(1, 0, "logoImage");
            var a = ie(t, e, n);
            return a.PlayerMetrics().setTimingData({
                initStart: i
            }),
                dh("player initialized", e),
                a
        }
        t = t && t.hasOwnProperty("default") ? t["default"] : t,
            e = e && e.hasOwnProperty("default") ? e["default"] : e,
            n = n && n.hasOwnProperty("default") ? n["default"] : n;
        var ze, qe = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
        ze = "undefined" != typeof window ? window : void 0 !== qe ? qe : "undefined" != typeof self ? self : {};
        var We, Ke = ze,
            Xe = {},
            Qe = (Object.freeze || Object)({
                "default": Xe
            }),
            Ge = Qe && Xe || Qe,
            $e = void 0 !== qe ? qe : "undefined" != typeof window ? window : {};
        "undefined" != typeof document ? We = document : (We = $e["__GLOBAL_DOCUMENT_CACHE@4"]) || (We = $e["__GLOBAL_DOCUMENT_CACHE@4"] = Ge);
        var Ye = We,
            Je = Ke.navigator && Ke.navigator.userAgent || "",
            Ze = /AppleWebKit\/([\d.]+)/i.exec(Je),
            tn = Ze ? parseFloat(Ze.pop()) : null,
            en = /iPad/i.test(Je),
            nn = /iPhone/i.test(Je) && !en,
            rn = /iPod/i.test(Je),
            on = nn || en || rn,
            sn = function () {
                var t = Je.match(/OS (\d+)_/i);
                return t && t[1] ? t[1] : null
            }(),
            an = /Android/i.test(Je),
            ln = function () {
                var t = Je.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                if (!t) return null;
                var e = t[1] && parseFloat(t[1]),
                    n = t[2] && parseFloat(t[2]);
                return e && n ? parseFloat(t[1] + "." + t[2]) : e || null
            }(),
            cn = /TBS\/\d+/i.test(Je),
            un = function () {
                var t = Je.match(/TBS\/(\d+)/i);
                if (t && t[1]) return t[1]
            }(),
            hn = !cn && /MQQBrowser\/\d+/i.test(Je),
            pn = !cn && / QQBrowser\/\d+/i.test(Je),
            dn = /(micromessenger|webbrowser)/i.test(Je),
            fn = an && /webkit/i.test(Je) && ln < 2.3,
            yn = an && ln < 5 && tn < 537,
            gn = /Firefox/i.test(Je),
            vn = /Edge/i.test(Je),
            mn = function () {
                return !(vn || !/Chrome/i.test(Je)) || !(!/Safari/i.test(Je) || !/CriOS/i.test(Je))
            }() && !dn && !hn && !pn,
            _n = function () {
                var t = Je.match(/Chrome\/(\d+)/),
                    e = Je.match(/CriOS\/(\d+)/);
                return t && t[1] ? parseFloat(t[1]) : e && e[1] ? parseFloat(e[1]) : null
            }(),
            bn = /MSIE\s8\.0/.test(Je),
            Tn = function () {
                var t = /MSIE\s(\d+)\.\d/.exec(Je),
                    e = t && parseFloat(t[1]);
                return !e && /Trident\/7.0/i.test(Je) && /rv:11.0/.test(Je) && (e = 11),
                    e
            }(),
            Cn = /Safari/i.test(Je) && !mn && !an && !vn && !hn && !pn,
            En = Cn || on,
            kn = y() && ("ontouchstart" in Ke || Ke.DocumentTouch && Ke.document instanceof Ke.DocumentTouch),
            wn = y() && "backgroundSize" in Ke.document.createElement("video").style,
            Sn = /Windows/i.test(Je),
            Pn = /MAC OS X/i.test(Je),
            xn = function () {
                return /Windows NT ([.\w]+)/.test(Je),
                "win" + RegExp.$1
            }(),
            In = function () {
                return /Mac OS X (\w+)/.test(Je),
                "mac" + RegExp.$1
            }(),
            Mn = function () {
                return /QQBrowser\/([.\d]+)/.test(Je),
                "qq" + RegExp.$1
            }(),
            Dn = function () {
                return /Edge\/([.\d]+)/.test(Je),
                "edge" + RegExp.$1
            }(),
            An = function () {
                return /Version\/([.\d]+)/.test(Je),
                "safari" + RegExp.$1
            }(),
            Rn = function () {
                return /Firefox\/([.\d]+)/.test(Je),
                "firefox" + RegExp.$1
            }(),
            jn = /HUAWEI|honor|HMA/i.test(Je),
            On = /HM|RedMi|Mi/i.test(Je) && !jn,
            Ln = /OPPO/i.test(Je),
            Nn = /VIVO/i.test(Je),
            Bn = /GT-|SM-|SCH-/i.test(Je),
            Fn = /ONE/i.test(Je),
            Hn = /Coolpad/i.test(Je),
            Vn = /ZTE/i.test(Je),
            Un = (Object.freeze || Object)({
                IS_IPAD: en,
                IS_IPHONE: nn,
                IS_IPOD: rn,
                IS_IOS: on,
                IOS_VERSION: sn,
                IS_ANDROID: an,
                ANDROID_VERSION: ln,
                IS_TBS: cn,
                TBS_VERSION: un,
                IS_MQQB: hn,
                IS_QQB: pn,
                IS_WECHAT: dn,
                IS_OLD_ANDROID: fn,
                IS_NATIVE_ANDROID: yn,
                IS_FIREFOX: gn,
                IS_EDGE: vn,
                IS_CHROME: mn,
                CHROME_VERSION: _n,
                IS_IE8: bn,
                IE_VERSION: Tn,
                IS_SAFARI: Cn,
                IS_ANY_SAFARI: En,
                TOUCH_ENABLED: kn,
                BACKGROUND_SIZE_SUPPORTED: wn,
                IS_WIN: Sn,
                IS_MAC: Pn,
                WIN_VER: xn,
                MAC_VER: In,
                QQ_VER: Mn,
                EDGE_VER: Dn,
                SAFARI_VER: An,
                FIREFOX_VER: Rn,
                IS_HUAWEI: jn,
                IS_XIAOMI: On,
                IS_OPPO: Ln,
                IS_VIVO: Nn,
                IS_SX: Bn,
                IS_ONE: Fn,
                IS_CP: Hn,
                IS_ZX: Vn
            }),
            zn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
                function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
            qn = function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            Wn = function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            },
            Kn = function (t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            },
            Xn = function (t, e) {
                return t.raw = e,
                    t
            },
            Qn = Object.prototype.toString,
            Gn = function (t) {
                return a(t) ? Object.keys(t) : []
            },
            $n = void 0,
            Yn = "info",
            Jn = [],
            Zn = function (t, e) {
                var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !! Tn && Tn < 11,
                    r = $n.levels[Yn],
                    i = new RegExp("^(" + r + ")$");
                if ("log" !== t && e.unshift(t.toUpperCase() + ":"), Jn && Jn.push([].concat(e)), ($n.enableLog || "log" != t) && (e.unshift("TCPlayer:"), Ke.console)) {
                    var o = Ke.console[t];
                    o || "debug" !== t || (o = Ke.console.info || Ke.console.log),
                    o && r && i.test(t) && (n && (e = e.map(function (t) {
                        if (a(t) || Array.isArray(t)) try {
                            return JSON.stringify(t)
                        } catch (e) {
                            return String(t)
                        }
                        return String(t)
                    }).join(" ")), o.apply ? o[Array.isArray(e) ? "apply" : "call"](Ke.console, e) : o(e))
                }
            };
        $n = function () {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            Zn("log", e)
        },
            $n.levels = {
                all: "debug|log|warn|error",
                off: "",
                debug: "debug|log|warn|error",
                info: "log|warn|error",
                warn: "warn|error",
                error: "error",
                DEFAULT: Yn
            },
            $n.level = function (t) {
                if ("string" == typeof t) {
                    if (!$n.levels.hasOwnProperty(t)) throw new Error('"' + t + '" in not a valid log level');
                    Yn = t
                }
                return Yn
            },
            $n.history = function () {
                return Jn ? [].concat(Jn) : []
            },
            $n.history.clear = function () {
                Jn && (Jn.length = 0)
            },
            $n.history.disable = function () {
                null !== Jn && (Jn.length = 0, Jn = null)
            },
            $n.history.enable = function () {
                null === Jn && (Jn = [])
            },
            $n.enableLog = !1,
            $n.error = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return Zn("error", e)
            },
            $n.warn = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return Zn("warn", e)
            },
            $n.debug = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return Zn("debug", e)
            };
        var tr = $n,
            er = function (t) {
                for (var e = "", n = 0; n < arguments.length; n++) e += u(t[n]) + (arguments[n + 1] || "");
                return e
            },
            nr = Xn(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."]),
            rr = m("querySelector"),
            ir = m("querySelectorAll"),
            or = (Object.freeze || Object)({
                isReal: y,
                isEl: g,
                isInFrame: v,
                createEl: _,
                textContent: b,
                prependTo: T,
                hasClass: C,
                addClass: E,
                removeClass: k,
                toggleClass: w,
                setAttributes: S,
                getAttributes: P,
                getAttribute: x,
                setAttribute: I,
                removeAttribute: M,
                blockTextSelection: D,
                unblockTextSelection: A,
                getBoundingClientRect: R,
                findPosition: j,
                getPointerPosition: O,
                isTextNode: L,
                emptyEl: N,
                normalizeContent: B,
                appendContent: F,
                insertContent: H,
                isSingleLeftClick: V,
                $: rr,
                $$: ir
            }),
            sr = 1,
            ar = {},
            lr = "vdata" + (new Date).getTime(),
            cr = !1;
        !
            function () {
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function () {
                            cr = !0
                        }
                    });
                    Ke.addEventListener("test", null, t),
                        Ke.removeEventListener("test", null, t)
                } catch (e) {}
            }();
        var ur = ["touchstart", "touchmove"],
            hr = (Object.freeze || Object)({
                fixEvent: Q,
                on: G,
                off: $,
                trigger: Y,
                one: J
            }),
            pr = !1,
            dr = void 0,
            fr = function () {
                if (y()) {
                    var t = Ye.getElementsByTagName("video"),
                        e = Ye.getElementsByTagName("audio"),
                        n = Ye.getElementsByTagName("video-js"),
                        r = [];
                    if (t && t.length > 0) for (var i = 0, o = t.length; i < o; i++) r.push(t[i]);
                    if (e && e.length > 0) for (var s = 0, a = e.length; s < a; s++) r.push(e[s]);
                    if (n && n.length > 0) for (var l = 0, c = n.length; l < c; l++) r.push(n[l]);
                    if (r && r.length > 0) for (var u = 0, h = r.length; u < h; u++) {
                        var p = r[u];
                        if (!p || !p.getAttribute) {
                            Z(1);
                            break
                        }
                        if (p.player === undefined) {
                            var d = p.getAttribute("data-setup");
                            null !== d && dr(p)
                        }
                    } else pr || Z(1)
                }
            };
        y() && "complete" === Ye.readyState ? pr = !0 : J(Ke, "load", function () {
            pr = !0
        });
        var yr = function (t) {
                var e = Ye.createElement("style");
                return e.className = t,
                    e
            },
            gr = function (t, e) {
                t.styleSheet ? t.styleSheet.cssText = e : t.textContent = e
            },
            vr = function (t, e, n) {
                e.guid || (e.guid = U());
                var r = function () {
                    return e.apply(t, arguments)
                };
                return r.guid = n ? n + "_" + e.guid : e.guid,
                    r
            },
            mr = function (t, e) {
                var n = Date.now();
                return function () {
                    var r = Date.now();
                    r - n >= e && (t.apply(undefined, arguments), n = r)
                }
            },
            _r = function () {};
        _r.prototype.allowedEvents_ = {},
            _r.prototype.on = function (t, e) {
                var n = this.addEventListener;
                this.addEventListener = function () {},
                    G(this, t, e),
                    this.addEventListener = n
            },
            _r.prototype.addEventListener = _r.prototype.on,
            _r.prototype.off = function (t, e) {
                $(this, t, e)
            },
            _r.prototype.removeEventListener = _r.prototype.off,
            _r.prototype.one = function (t, e) {
                var n = this.addEventListener;
                this.addEventListener = function () {},
                    J(this, t, e),
                    this.addEventListener = n
            },
            _r.prototype.trigger = function (t) {
                var e = t.type || t;
                "string" == typeof t && (t = {
                    type: e
                }),
                    t = Q(t),
                this.allowedEvents_[e] && this["on" + e] && this["on" + e](t),
                    Y(this, t)
            },
            _r.prototype.dispatchEvent = _r.prototype.trigger;
        var br = function (t) {
                return t instanceof _r || !! t.eventBusEl_ && ["on", "one", "off", "trigger"].every(function (e) {
                    return "function" == typeof t[e]
                })
            },
            Tr = function (t) {
                return "string" == typeof t && /\S/.test(t) || Array.isArray(t) && !! t.length
            },
            Cr = function (t) {
                if (!t.nodeName && !br(t)) throw new Error("Invalid target; must be a DOM node or evented object.")
            },
            Er = function (t) {
                if (!Tr(t)) throw new Error("Invalid event type; must be a non-empty string or array.")
            },
            kr = function (t) {
                if ("function" != typeof t) throw new Error("Invalid listener; must be a function.")
            },
            wr = function (t, e) {
                var n = e.length < 3 || e[0] === t || e[0] === t.eventBusEl_,
                    r = void 0,
                    i = void 0,
                    o = void 0;
                return n ? (r = t.eventBusEl_, e.length >= 3 && e.shift(), i = e[0], o = e[1]) : (r = e[0], i = e[1], o = e[2]),
                    Cr(r),
                    Er(i),
                    kr(o),
                    o = vr(t, o),
                    {
                        isTargetingSelf: n,
                        target: r,
                        type: i,
                        listener: o
                    }
            },
            Sr = function (t, e, n, r) {
                Cr(t),
                    t.nodeName ? hr[e](t, n, r) : t[e](n, r)
            },
            Pr = {
                on: function () {
                    for (var t = this, e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    var i = wr(this, n),
                        o = i.isTargetingSelf,
                        s = i.target,
                        a = i.type,
                        l = i.listener;
                    if (Sr(s, "on", a, l), !o) {
                        var c = function () {
                            return t.off(s, a, l)
                        };
                        c.guid = l.guid;
                        var u = function () {
                            return t.off("dispose", c)
                        };
                        u.guid = l.guid,
                            Sr(this, "on", "dispose", c),
                            Sr(s, "on", "dispose", u)
                    }
                },
                one: function () {
                    for (var t = this, e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    var i = wr(this, n),
                        o = i.isTargetingSelf,
                        s = i.target,
                        a = i.type,
                        l = i.listener;
                    if (o) Sr(s, "one", a, l);
                    else {
                        var c = function u() {
                            for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                            t.off(s, a, u),
                                l.apply(null, n)
                        };
                        c.guid = l.guid,
                            Sr(s, "one", a, c)
                    }
                },
                off: function (t, e, n) {
                    if (!t || Tr(t)) Tr(e) ? $(this.eventBusEl_, e, n) : $(this.eventBusEl_, t, e);
                    else {
                        var r = t,
                            i = e;
                        Cr(r),
                            Er(i),
                            kr(n),
                            n = vr(this, n),
                            this.off("dispose", n),
                            r.nodeName ? ($(r, i, n), $(r, "dispose", n)) : br(r) && (r.off(i, n), r.off("dispose", n))
                    }
                },
                trigger: function (t, e) {
                    return Y(this.eventBusEl_, t, e)
                }
            },
            xr = {
                state: {},
                setState: function (t) {
                    var e = this;
                    "function" == typeof t && (t = t());
                    var n = void 0;
                    return i(t, function (t, r) {
                        e.state[r] !== t && (n = n || {}, n[r] = {
                            from: e.state[r],
                            to: t
                        }),
                            e.state[r] = t
                    }),
                    n && br(this) && this.trigger({
                        changes: n,
                        type: "statechanged"
                    }),
                        n
                }
            },
            Ir = function () {
                function t(e, n, r) {
                    if (qn(this, t), !e && this.play ? this.player_ = e = this : this.player_ = e, this.options_ = ot(!0, {}, this.options_), n = this.options_ = it(this.options_, n), this.id_ = n.id || n.el && n.el.id, !this.id_) {
                        var i = e && e.id && e.id() || "no_player";
                        this.id_ = i + "_component_" + U()
                    }
                    this.name_ = n.name || null,
                        n.el ? this.el_ = n.el : !1 !== n.createEl && (this.el_ = this.createEl()),
                    !1 !== n.evented && tt(this, {
                        eventBusKey: this.el_ ? "el_" : null
                    }),
                        et(this, this.constructor.defaultState),
                        this.children_ = [],
                        this.childIndex_ = {},
                        this.childNameIndex_ = {},
                    !1 !== n.initChildren && this.initChildren(),
                        this.ready(r),
                    !1 !== n.reportTouchActivity && this.enableTouchActivity()
                }
                return t.prototype.dispose = function () {
                    if (this.trigger({
                        type: "dispose",
                        bubbles: !1
                    }), this.children_) for (var t = this.children_.length - 1; t >= 0; t--) this.children_[t].dispose && this.children_[t].dispose();
                    this.children_ = null,
                        this.childIndex_ = null,
                        this.childNameIndex_ = null,
                    this.el_ && (this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), W(this.el_), this.el_ = null),
                        this.player_ = null
                },
                    t.prototype.player = function () {
                        return this.player_
                    },
                    t.prototype.options = function (t) {
                        return tr.warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),
                            t ? (this.options_ = it(this.options_, t), this.options_) : this.options_
                    },
                    t.prototype.el = function () {
                        return this.el_
                    },
                    t.prototype.createEl = function (t, e, n) {
                        return _(t, e, n)
                    },
                    t.prototype.localize = function (t, e) {
                        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t,
                            r = this.player_.language && this.player_.language(),
                            i = this.player_.languages && this.player_.languages(),
                            o = i && i[r],
                            s = r && r.split("-")[0],
                            a = i && i[s],
                            l = n;
                        return o && o[t] ? l = o[t] : a && a[t] && (l = a[t]),
                        e && (l = l.replace(/\{(\d+)\}/g, function (t, n) {
                            var r = e[n - 1],
                                i = r;
                            return void 0 === r && (i = t),
                                i
                        })),
                            l
                    },
                    t.prototype.contentEl = function () {
                        return this.contentEl_ || this.el_
                    },
                    t.prototype.id = function () {
                        return this.id_
                    },
                    t.prototype.name = function () {
                        return this.name_
                    },
                    t.prototype.children = function () {
                        return this.children_
                    },
                    t.prototype.getChildById = function (t) {
                        return this.childIndex_[t]
                    },
                    t.prototype.getChild = function (t) {
                        if (t) return t = nt(t),
                            this.childNameIndex_[t]
                    },
                    t.prototype.addChild = function (e) {
                        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                            r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.children_.length,
                            i = void 0,
                            o = void 0;
                        if ("string" == typeof e) {
                            o = nt(e);
                            var s = n.componentClass || o;
                            n.name = o;
                            var a = t.getComponent(s);
                            if (!a) throw new Error("Component " + s + " does not exist");
                            if ("function" != typeof a) return null;
                            i = new a(this.player_ || this, n)
                        } else i = e;
                        if (this.children_.splice(r, 0, i), "function" == typeof i.id && (this.childIndex_[i.id()] = i), o = o || i.name && nt(i.name()), o && (this.childNameIndex_[o] = i), "function" == typeof i.el && i.el()) {
                            var l = this.contentEl().children,
                                c = l[r] || null;
                            this.contentEl().insertBefore(i.el(), c)
                        }
                        return i
                    },
                    t.prototype.removeChild = function (t) {
                        if ("string" == typeof t && (t = this.getChild(t)), t && this.children_) {
                            for (var e = !1, n = this.children_.length - 1; n >= 0; n--) if (this.children_[n] === t) {
                                e = !0,
                                    this.children_.splice(n, 1);
                                break
                            }
                            if (e) {
                                this.childIndex_[t.id()] = null,
                                    this.childNameIndex_[t.name()] = null;
                                var r = t.el();
                                r && r.parentNode === this.contentEl() && this.contentEl().removeChild(t.el())
                            }
                        }
                    },
                    t.prototype.initChildren = function () {
                        var e = this,
                            n = this.options_.children;
                        if (n) {
                            var r = this.options_,
                                i = function (t) {
                                    var n = t.name,
                                        i = t.opts;
                                    if (r[n] !== undefined && (i = r[n]), !1 !== i) {
                                        !0 === i && (i = {}),
                                            i.playerOptions = e.options_.playerOptions;
                                        var o = e.addChild(n, i);
                                        o && (e[n] = o)
                                    }
                                },
                                o = void 0,
                                s = t.getComponent("Tech");
                            o = Array.isArray(n) ? n : Object.keys(n),
                                o.concat(Object.keys(this.options_).filter(function (t) {
                                    return !o.some(function (e) {
                                        return "string" == typeof e ? t === e : t === e.name
                                    })
                                })).map(function (t) {
                                    var r = void 0,
                                        i = void 0;
                                    return "string" == typeof t ? (r = t, i = n[r] || e.options_[r] || {}) : (r = t.name, i = t),
                                        {
                                            name: r,
                                            opts: i
                                        }
                                }).filter(function (e) {
                                    var n = t.getComponent(e.opts.componentClass || nt(e.name));
                                    return n && !s.isTech(n)
                                }).forEach(i)
                        }
                    },
                    t.prototype.buildCSSClass = function () {
                        return ""
                    },
                    t.prototype.ready = function (t) {
                        var e = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
                        if (t) return this.isReady_ ? void(e ? t.call(this) : this.setTimeout(t, 1)) : (this.readyQueue_ = this.readyQueue_ || [], void this.readyQueue_.push(t))
                    },
                    t.prototype.triggerReady = function () {
                        this.isReady_ = !0,
                            this.setTimeout(function () {
                                var t = this.readyQueue_;
                                this.readyQueue_ = [],
                                t && t.length > 0 && t.forEach(function (t) {
                                    t.call(this)
                                }, this),
                                    this.trigger("ready")
                            }, 1)
                    },
                    t.prototype.$ = function (t, e) {
                        return rr(t, e || this.contentEl())
                    },
                    t.prototype.$$ = function (t, e) {
                        return ir(t, e || this.contentEl())
                    },
                    t.prototype.hasClass = function (t) {
                        return C(this.el_, t)
                    },
                    t.prototype.addClass = function (t) {
                        E(this.el_, t)
                    },
                    t.prototype.removeClass = function (t) {
                        k(this.el_, t)
                    },
                    t.prototype.toggleClass = function (t, e) {
                        w(this.el_, t, e)
                    },
                    t.prototype.show = function () {
                        this.removeClass("vjs-hidden")
                    },
                    t.prototype.hide = function () {
                        this.addClass("vjs-hidden")
                    },
                    t.prototype.lockShowing = function () {
                        this.addClass("vjs-lock-showing")
                    },
                    t.prototype.unlockShowing = function () {
                        this.removeClass("vjs-lock-showing")
                    },
                    t.prototype.getAttribute = function (t) {
                        return x(this.el_, t)
                    },
                    t.prototype.setAttribute = function (t, e) {
                        I(this.el_, t, e)
                    },
                    t.prototype.removeAttribute = function (t) {
                        M(this.el_, t)
                    },
                    t.prototype.width = function (t, e) {
                        return this.dimension("width", t, e)
                    },
                    t.prototype.height = function (t, e) {
                        return this.dimension("height", t, e)
                    },
                    t.prototype.dimensions = function (t, e) {
                        this.width(t, !0),
                            this.height(e)
                    },
                    t.prototype.dimension = function (t, e, n) {
                        if (e !== undefined) return null !== e && e === e || (e = 0),
                            -1 !== ("" + e).indexOf("%") || -1 !== ("" + e).indexOf("px") ? this.el_.style[t] = e : this.el_.style[t] = "auto" === e ? "" : e + "px",
                            void(n || this.trigger("componentresize"));
                        if (!this.el_) return 0;
                        var r = this.el_.style[t],
                            i = r.indexOf("px");
                        return -1 !== i ? parseInt(r.slice(0, i), 10) : parseInt(this.el_["offset" + nt(t)], 10)
                    },
                    t.prototype.currentDimension = function (t) {
                        var e = 0;
                        if ("width" !== t && "height" !== t) throw new Error("currentDimension only accepts width or height value");
                        if ("function" == typeof Ke.getComputedStyle) {
                            var n = Ke.getComputedStyle(this.el_);
                            e = n.getPropertyValue(t) || n[t]
                        }
                        if (0 === (e = parseFloat(e))) {
                            var r = "offset" + nt(t);
                            e = this.el_[r]
                        }
                        return e
                    },
                    t.prototype.currentDimensions = function () {
                        return {
                            width: this.currentDimension("width"),
                            height: this.currentDimension("height")
                        }
                    },
                    t.prototype.currentWidth = function () {
                        return this.currentDimension("width")
                    },
                    t.prototype.currentHeight = function () {
                        return this.currentDimension("height")
                    },
                    t.prototype.focus = function () {
                        this.el_.focus()
                    },
                    t.prototype.blur = function () {
                        this.el_.blur()
                    },
                    t.prototype.emitTapEvents = function () {
                        var t = 0,
                            e = null,
                            n = void 0;
                        this.on("touchstart", function (r) {
                            1 === r.touches.length && (e = {
                                pageX: r.touches[0].pageX,
                                pageY: r.touches[0].pageY
                            }, t = (new Date).getTime(), n = !0)
                        }),
                            this.on("touchmove", function (t) {
                                if (t.touches.length > 1) n = !1;
                                else if (e) {
                                    var r = t.touches[0].pageX - e.pageX,
                                        i = t.touches[0].pageY - e.pageY,
                                        o = Math.sqrt(r * r + i * i);
                                    o > 10 && (n = !1)
                                }
                            });
                        var r = function () {
                            n = !1
                        };
                        this.on("touchleave", r),
                            this.on("touchcancel", r),
                            this.on("touchend", function (r) {
                                if (e = null, !0 === n) {
                                    (new Date).getTime() - t < 200 && (r.preventDefault(), this.trigger("tap"))
                                }
                            })
                    },
                    t.prototype.enableTouchActivity = function () {
                        if (this.player() && this.player().reportUserActivity) {
                            var t = vr(this.player(), this.player().reportUserActivity),
                                e = void 0;
                            this.on("touchstart", function () {
                                t(),
                                    this.clearInterval(e),
                                    e = this.setInterval(t, 250)
                            });
                            var n = function (n) {
                                t(),
                                    this.clearInterval(e)
                            };
                            this.on("touchmove", t),
                                this.on("touchend", n),
                                this.on("touchcancel", n)
                        }
                    },
                    t.prototype.setTimeout = function (t, e) {
                        var n = this;
                        t = vr(this, t);
                        var r = Ke.setTimeout(t, e),
                            i = function () {
                                return n.clearTimeout(r)
                            };
                        return i.guid = "vjs-timeout-" + r,
                            this.on("dispose", i),
                            r
                    },
                    t.prototype.clearTimeout = function (t) {
                        Ke.clearTimeout(t);
                        var e = function () {};
                        return e.guid = "vjs-timeout-" + t,
                            this.off("dispose", e),
                            t
                    },
                    t.prototype.setInterval = function (t, e) {
                        var n = this;
                        t = vr(this, t);
                        var r = Ke.setInterval(t, e),
                            i = function () {
                                return n.clearInterval(r)
                            };
                        return i.guid = "vjs-interval-" + r,
                            this.on("dispose", i),
                            r
                    },
                    t.prototype.clearInterval = function (t) {
                        Ke.clearInterval(t);
                        var e = function () {};
                        return e.guid = "vjs-interval-" + t,
                            this.off("dispose", e),
                            t
                    },
                    t.prototype.requestAnimationFrame = function (t) {
                        var e = this;
                        if (this.supportsRaf_) {
                            t = vr(this, t);
                            var n = Ke.requestAnimationFrame(t),
                                r = function () {
                                    return e.cancelAnimationFrame(n)
                                };
                            return r.guid = "vjs-raf-" + n,
                                this.on("dispose", r),
                                n
                        }
                        return this.setTimeout(t, 1e3 / 60)
                    },
                    t.prototype.cancelAnimationFrame = function (t) {
                        if (this.supportsRaf_) {
                            Ke.cancelAnimationFrame(t);
                            var e = function () {};
                            return e.guid = "vjs-raf-" + t,
                                this.off("dispose", e),
                                t
                        }
                        return this.clearTimeout(t)
                    },
                    t.registerComponent = function (e, n) {
                        if ("string" != typeof e || !e) throw new Error('Illegal component name, "' + e + '"; must be a non-empty string.');
                        var r = t.getComponent("Tech"),
                            i = r && r.isTech(n),
                            o = t === n || t.prototype.isPrototypeOf(n.prototype);
                        if (i || !o) {
                            var s = void 0;
                            throw s = i ? "techs must be registered using Tech.registerTech()" : "must be a Component subclass",
                                new Error('Illegal component, "' + e + '"; ' + s + ".")
                        }
                        e = nt(e),
                        t.components_ || (t.components_ = {});
                        var a = t.getComponent("Player");
                        if ("Player" === e && a && a.players) {
                            var l = a.players,
                                c = Object.keys(l);
                            if (l && c.length > 0 && c.map(function (t) {
                                return l[t]
                            }).every(Boolean)) throw new Error("Can not register Player component after player has been created.")
                        }
                        return t.components_[e] = n,
                            n
                    },
                    t.getComponent = function (e) {
                        if (e) return e = nt(e),
                            t.components_ && t.components_[e] ? t.components_[e] : void 0
                    },
                    t
            }();
        Ir.prototype.supportsRaf_ = "function" == typeof Ke.requestAnimationFrame && "function" == typeof Ke.cancelAnimationFrame,
            Ir.registerComponent("Component", Ir);
        for (var Mr = {}, Dr = [
            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
        ], Ar = Dr[0], Rr = void 0, jr = 0; jr < Dr.length; jr++) if (Dr[jr][1] in Ye) {
            Rr = Dr[jr];
            break
        }
        if (Rr) for (var Or = 0; Or < Rr.length; Or++) Mr[Ar[Or]] = Rr[Or];
        ht.prototype.code = 0,
            ht.prototype.message = "",
            ht.prototype.status = null,
            ht.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"],
            ht.defaultMessages = {
                1: "You aborted the media playback",
                2: "A network error caused the media download to fail part-way.",
                3: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
                4: "The media could not be loaded, either because the server or network failed or because the format is not supported.",
                5: "The media is encrypted and we do not have the keys to decrypt it."
            };
        for (var Lr = 0; Lr < ht.errorTypes.length; Lr++) ht[ht.errorTypes[Lr]] = Lr,
            ht.prototype[ht.errorTypes[Lr]] = Lr;
        var Nr = pt,
            Br = function (t) {
                return ["kind", "label", "language", "id", "inBandMetadataTrackDispatchType", "mode", "src"].reduce(function (e, n, r) {
                    return t[n] && (e[n] = t[n]),
                        e
                }, {
                    cues: t.cues && Array.prototype.map.call(t.cues, function (t) {
                        return {
                            startTime: t.startTime,
                            endTime: t.endTime,
                            text: t.text,
                            id: t.id
                        }
                    })
                })
            },
            Fr = function (t) {
                var e = t.$$("track"),
                    n = Array.prototype.map.call(e, function (t) {
                        return t.track
                    });
                return Array.prototype.map.call(e, function (t) {
                    var e = Br(t.track);
                    return t.src && (e.src = t.src),
                        e
                }).concat(Array.prototype.filter.call(t.textTracks(), function (t) {
                    return -1 === n.indexOf(t)
                }).map(Br))
            },
            Hr = function (t, e) {
                return t.forEach(function (t) {
                    var n = e.addRemoteTextTrack(t).track;
                    !t.src && t.cues && t.cues.forEach(function (t) {
                        return n.addCue(t)
                    })
                }),
                    e.textTracks()
            },
            Vr = {
                textTracksToJson: Fr,
                jsonToTextTracks: Hr,
                trackToJson_: Br
            },
            Ur = "vjs-modal-dialog",
            zr = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.opened_ = i.hasBeenOpened_ = i.hasBeenFilled_ = !1,
                        i.closeable(!i.options_.uncloseable),
                        i.content(i.options_.content),
                        i.contentEl_ = _("div", {
                            className: Ur + "-content"
                        }, {
                            role: "document"
                        }),
                        i.descEl_ = _("p", {
                            className: Ur + "-description vjs-control-text",
                            id: i.el().getAttribute("aria-describedby")
                        }),
                        b(i.descEl_, i.description()),
                        i.el_.appendChild(i.descEl_),
                        i.el_.appendChild(i.contentEl_),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: this.buildCSSClass(),
                            tabIndex: -1
                        }, {
                            "aria-describedby": this.id() + "_description",
                            "aria-hidden": "true",
                            "aria-label": this.label(),
                            role: "dialog"
                        })
                    },
                    e.prototype.dispose = function () {
                        this.contentEl_ = null,
                            this.descEl_ = null,
                            this.previouslyActiveEl_ = null,
                            t.prototype.dispose.call(this)
                    },
                    e.prototype.buildCSSClass = function () {
                        return Ur + " vjs-hidden " + t.prototype.buildCSSClass.call(this)
                    },
                    e.prototype.handleKeyPress = function (t) {
                        27 === t.which && this.closeable() && this.close()
                    },
                    e.prototype.label = function () {
                        return this.localize(this.options_.label || "Modal Window")
                    },
                    e.prototype.description = function () {
                        var t = this.options_.description || this.localize("This is a modal window.");
                        return this.closeable() && (t += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),
                            t
                    },
                    e.prototype.open = function () {
                        if (!this.opened_) {
                            var t = this.player();
                            this.trigger("beforemodalopen"),
                                this.opened_ = !0,
                            (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill(),
                                this.wasPlaying_ = !t.paused(),
                            this.options_.pauseOnOpen && this.wasPlaying_ && t.pause(),
                            this.closeable() && this.on(this.el_.ownerDocument, "keydown", vr(this, this.handleKeyPress)),
                                this.hadControls_ = t.controls(),
                                t.controls(!1),
                                this.show(),
                                this.conditionalFocus_(),
                                this.el().setAttribute("aria-hidden", "false"),
                                this.trigger("modalopen"),
                                this.hasBeenOpened_ = !0
                        }
                    },
                    e.prototype.opened = function (t) {
                        return "boolean" == typeof t && this[t ? "open" : "close"](),
                            this.opened_
                    },
                    e.prototype.close = function () {
                        if (this.opened_) {
                            var t = this.player();
                            this.trigger("beforemodalclose"),
                                this.opened_ = !1,
                            this.wasPlaying_ && this.options_.pauseOnOpen && t.play(),
                            this.closeable() && this.off(this.el_.ownerDocument, "keydown", vr(this, this.handleKeyPress)),
                            this.hadControls_ && t.controls(!0),
                                this.hide(),
                                this.el().setAttribute("aria-hidden", "true"),
                                this.trigger("modalclose"),
                                this.conditionalBlur_(),
                            this.options_.temporary && this.dispose()
                        }
                    },
                    e.prototype.closeable = function (t) {
                        if ("boolean" == typeof t) {
                            var e = this.closeable_ = !! t,
                                n = this.getChild("closeButton");
                            if (e && !n) {
                                var r = this.contentEl_;
                                this.contentEl_ = this.el_,
                                    n = this.addChild("closeButton", {
                                        controlText: "Close Modal Dialog"
                                    }),
                                    this.contentEl_ = r,
                                    this.on(n, "close", this.close)
                            }!e && n && (this.off(n, "close", this.close), this.removeChild(n), n.dispose())
                        }
                        return this.closeable_
                    },
                    e.prototype.fill = function () {
                        this.fillWith(this.content())
                    },
                    e.prototype.fillWith = function (t) {
                        var e = this.contentEl(),
                            n = e.parentNode,
                            r = e.nextSibling;
                        this.trigger("beforemodalfill"),
                            this.hasBeenFilled_ = !0,
                            n.removeChild(e),
                            this.empty(),
                            H(e, t),
                            this.trigger("modalfill"),
                            r ? n.insertBefore(e, r) : n.appendChild(e);
                        var i = this.getChild("closeButton");
                        i && n.appendChild(i.el_)
                    },
                    e.prototype.empty = function () {
                        this.trigger("beforemodalempty"),
                            N(this.contentEl()),
                            this.trigger("modalempty")
                    },
                    e.prototype.content = function (t) {
                        return void 0 !== t && (this.content_ = t),
                            this.content_
                    },
                    e.prototype.conditionalFocus_ = function () {
                        var t = Ye.activeElement,
                            e = this.player_.el_;
                        this.previouslyActiveEl_ = null,
                        (e.contains(t) || e === t) && (this.previouslyActiveEl_ = t, this.focus(), this.on(Ye, "keydown", this.handleKeyDown))
                    },
                    e.prototype.conditionalBlur_ = function () {
                        this.previouslyActiveEl_ && (this.previouslyActiveEl_.focus(), this.previouslyActiveEl_ = null),
                            this.off(Ye, "keydown", this.handleKeyDown)
                    },
                    e.prototype.handleKeyDown = function (t) {
                        if (9 === t.which) {
                            for (var e = this.focusableEls_(), n = this.el_.querySelector(":focus"), r = void 0, i = 0; i < e.length; i++) if (n === e[i]) {
                                r = i;
                                break
                            }
                            Ye.activeElement === this.el_ && (r = 0),
                                t.shiftKey && 0 === r ? (e[e.length - 1].focus(), t.preventDefault()) : t.shiftKey || r !== e.length - 1 || (e[0].focus(), t.preventDefault())
                        }
                    },
                    e.prototype.focusableEls_ = function () {
                        var t = this.el_.querySelectorAll("*");
                        return Array.prototype.filter.call(t, function (t) {
                            return (t instanceof Ke.HTMLAnchorElement || t instanceof Ke.HTMLAreaElement) && t.hasAttribute("href") || (t instanceof Ke.HTMLInputElement || t instanceof Ke.HTMLSelectElement || t instanceof Ke.HTMLTextAreaElement || t instanceof Ke.HTMLButtonElement) && !t.hasAttribute("disabled") || t instanceof Ke.HTMLIFrameElement || t instanceof Ke.HTMLObjectElement || t instanceof Ke.HTMLEmbedElement || t.hasAttribute("tabindex") && -1 !== t.getAttribute("tabindex") || t.hasAttribute("contenteditable")
                        })
                    },
                    e
            }(Ir);
        zr.prototype.options_ = {
            pauseOnOpen: !0,
            temporary: !0
        },
            Ir.registerComponent("ModalDialog", zr);
        var qr = function (t) {
            function e() {
                var n, r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
                    i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                qn(this, e);
                var o = Kn(this, t.call(this));
                if (!i && (i = o, bn)) {
                    i = Ye.createElement("custom");
                    for (var s in e.prototype)"constructor" !== s && (i[s] = e.prototype[s])
                }
                i.tracks_ = [],
                    Object.defineProperty(i, "length", {
                        get: function () {
                            return this.tracks_.length
                        }
                    });
                for (var a = 0; a < r.length; a++) i.addTrack(r[a]);
                return n = i,
                    Kn(o, n)
            }
            return Wn(e, t),
                e.prototype.addTrack = function (t) {
                    var e = this.tracks_.length;
                    "" + e in this || Object.defineProperty(this, e, {
                        get: function () {
                            return this.tracks_[e]
                        }
                    }),
                    -1 === this.tracks_.indexOf(t) && (this.tracks_.push(t), this.trigger({
                        track: t,
                        type: "addtrack"
                    }))
                },
                e.prototype.removeTrack = function (t) {
                    for (var e = void 0, n = 0, r = this.length; n < r; n++) if (this[n] === t) {
                        e = this[n],
                        e.off && e.off(),
                            this.tracks_.splice(n, 1);
                        break
                    }
                    e && this.trigger({
                        track: e,
                        type: "removetrack"
                    })
                },
                e.prototype.getTrackById = function (t) {
                    for (var e = null, n = 0, r = this.length; n < r; n++) {
                        var i = this[n];
                        if (i.id === t) {
                            e = i;
                            break
                        }
                    }
                    return e
                },
                e
        }(_r);
        qr.prototype.allowedEvents_ = {
            change: "change",
            addtrack: "addtrack",
            removetrack: "removetrack"
        };
        for (var Wr in qr.prototype.allowedEvents_) qr.prototype["on" + Wr] = null;
        var Kr = function (t, e) {
                for (var n = 0; n < t.length; n++) Object.keys(t[n]).length && e.id !== t[n].id && (t[n].enabled = !1)
            },
            Xr = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    qn(this, e);
                    for (var o = void 0, s = i.length - 1; s >= 0; s--) if (i[s].enabled) {
                        Kr(i, i[s]);
                        break
                    }
                    if (bn) {
                        o = Ye.createElement("custom");
                        for (var a in qr.prototype)"constructor" !== a && (o[a] = qr.prototype[a]);
                        for (var l in e.prototype)"constructor" !== l && (o[l] = e.prototype[l])
                    }
                    return o = n = Kn(this, t.call(this, i, o)),
                        o.changing_ = !1,
                        r = o,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e.prototype.addTrack = function (e) {
                        var n = this;
                        e.enabled && Kr(this, e),
                            t.prototype.addTrack.call(this, e),
                        e.addEventListener && e.addEventListener("enabledchange", function () {
                            n.changing_ || (n.changing_ = !0, Kr(n, e), n.changing_ = !1, n.trigger("change"))
                        })
                    },
                    e
            }(qr),
            Qr = function (t, e) {
                for (var n = 0; n < t.length; n++) Object.keys(t[n]).length && e.id !== t[n].id && (t[n].selected = !1)
            },
            Gr = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    qn(this, e);
                    for (var o = void 0, s = i.length - 1; s >= 0; s--) if (i[s].selected) {
                        Qr(i, i[s]);
                        break
                    }
                    if (bn) {
                        o = Ye.createElement("custom");
                        for (var a in qr.prototype)"constructor" !== a && (o[a] = qr.prototype[a]);
                        for (var l in e.prototype)"constructor" !== l && (o[l] = e.prototype[l])
                    }
                    return o = n = Kn(this, t.call(this, i, o)),
                        o.changing_ = !1,
                        Object.defineProperty(o, "selectedIndex", {
                            get: function () {
                                for (var t = 0; t < this.length; t++) if (this[t].selected) return t;
                                return -1
                            },
                            set: function () {}
                        }),
                        r = o,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e.prototype.addTrack = function (e) {
                        var n = this;
                        e.selected && Qr(this, e),
                            t.prototype.addTrack.call(this, e),
                        e.addEventListener && e.addEventListener("selectedchange", function () {
                            n.changing_ || (n.changing_ = !0, Qr(n, e), n.changing_ = !1, n.trigger("change"))
                        })
                    },
                    e
            }(qr),
            $r = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    qn(this, e);
                    var o = void 0;
                    if (bn) {
                        o = Ye.createElement("custom");
                        for (var s in qr.prototype)"constructor" !== s && (o[s] = qr.prototype[s]);
                        for (var a in e.prototype)"constructor" !== a && (o[a] = e.prototype[a])
                    }
                    return o = n = Kn(this, t.call(this, i, o)),
                        r = o,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e.prototype.addTrack = function (e) {
                        if ("disabled" === e.mode && !e.label) return !1;
                        t.prototype.addTrack.call(this, e),
                            e.addEventListener("modechange", vr(this, function () {
                                this.trigger("change")
                            })),
                        -1 === ["metadata", "chapters"].indexOf(e.kind) && e.addEventListener("modechange", vr(this, function () {
                            this.trigger("selectedlanguagechange")
                        }))
                    },
                    e
            }(qr),
            Yr = function () {
                function t() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    qn(this, t);
                    var n = this;
                    if (bn) {
                        n = Ye.createElement("custom");
                        for (var r in t.prototype)"constructor" !== r && (n[r] = t.prototype[r])
                    }
                    n.trackElements_ = [],
                        Object.defineProperty(n, "length", {
                            get: function () {
                                return this.trackElements_.length
                            }
                        });
                    for (var i = 0, o = e.length; i < o; i++) n.addTrackElement_(e[i]);
                    if (bn) return n
                }
                return t.prototype.addTrackElement_ = function (t) {
                    var e = this.trackElements_.length;
                    "" + e in this || Object.defineProperty(this, e, {
                        get: function () {
                            return this.trackElements_[e]
                        }
                    }),
                    -1 === this.trackElements_.indexOf(t) && this.trackElements_.push(t)
                },
                    t.prototype.getTrackElementByTrack_ = function (t) {
                        for (var e = void 0, n = 0, r = this.trackElements_.length; n < r; n++) if (t === this.trackElements_[n].track) {
                            e = this.trackElements_[n];
                            break
                        }
                        return e
                    },
                    t.prototype.removeTrackElement_ = function (t) {
                        for (var e = 0, n = this.trackElements_.length; e < n; e++) if (t === this.trackElements_[e]) {
                            this.trackElements_.splice(e, 1);
                            break
                        }
                    },
                    t
            }(),
            Jr = function () {
                function t(e) {
                    qn(this, t);
                    var n = this;
                    if (bn) {
                        n = Ye.createElement("custom");
                        for (var r in t.prototype)"constructor" !== r && (n[r] = t.prototype[r])
                    }
                    if (t.prototype.setCues_.call(n, e), Object.defineProperty(n, "length", {
                        get: function () {
                            return this.length_
                        }
                    }), bn) return n
                }
                return t.prototype.setCues_ = function (t) {
                    var e = this.length || 0,
                        n = 0,
                        r = t.length;
                    this.cues_ = t,
                        this.length_ = t.length;
                    var i = function (t) {
                        "" + t in this || Object.defineProperty(this, "" + t, {
                            get: function () {
                                return this.cues_[t]
                            }
                        })
                    };
                    if (e < r) for (n = e; n < r; n++) i.call(this, n)
                },
                    t.prototype.getCueById = function (t) {
                        for (var e = null, n = 0, r = this.length; n < r; n++) {
                            var i = this[n];
                            if (i.id === t) {
                                e = i;
                                break
                            }
                        }
                        return e
                    },
                    t
            }(),
            Zr = {
                alternative: "alternative",
                captions: "captions",
                main: "main",
                sign: "sign",
                subtitles: "subtitles",
                commentary: "commentary"
            },
            ti = {
                alternative: "alternative",
                descriptions: "descriptions",
                main: "main",
                "main-desc": "main-desc",
                translation: "translation",
                commentary: "commentary"
            },
            ei = {
                subtitles: "subtitles",
                captions: "captions",
                descriptions: "descriptions",
                chapters: "chapters",
                metadata: "metadata"
            },
            ni = {
                disabled: "disabled",
                hidden: "hidden",
                showing: "showing"
            },
            ri = function (t) {
                function e() {
                    var n, r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    qn(this, e);
                    var i = Kn(this, t.call(this)),
                        o = i;
                    if (bn) {
                        o = Ye.createElement("custom");
                        for (var s in e.prototype)"constructor" !== s && (o[s] = e.prototype[s])
                    }
                    var a = {
                        id: r.id || "vjs_track_" + U(),
                        kind: r.kind || "",
                        label: r.label || "",
                        language: r.language || ""
                    };
                    for (var l in a)!
                        function (t) {
                            Object.defineProperty(o, t, {
                                get: function () {
                                    return a[t]
                                },
                                set: function () {}
                            })
                        }(l);
                    return n = o,
                        Kn(i, n)
                }
                return Wn(e, t),
                    e
            }(_r),
            ii = function (t) {
                var e = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
                    n = Ye.createElement("a");
                n.href = t;
                var r = "" === n.host && "file:" !== n.protocol,
                    i = void 0;
                r && (i = Ye.createElement("div"), i.innerHTML = '<a href="' + t + '"></a>', n = i.firstChild, i.setAttribute("style", "display:none; position:absolute;"), Ye.body.appendChild(i));
                for (var o = {}, s = 0; s < e.length; s++) o[e[s]] = n[e[s]];
                return "http:" === o.protocol && (o.host = o.host.replace(/:80$/, "")),
                "https:" === o.protocol && (o.host = o.host.replace(/:443$/, "")),
                o.protocol || (o.protocol = Ke.location.protocol),
                r && Ye.body.removeChild(i),
                    o
            },
            oi = function (t) {
                if (!t.match(/^https?:\/\//)) {
                    var e = Ye.createElement("div");
                    e.innerHTML = '<a href="' + t + '">x</a>',
                        t = e.firstChild.href
                }
                return t
            },
            si = function (t) {
                if ("string" == typeof t) {
                    var e = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,
                        n = e.exec(t);
                    if (n) return n.pop().toLowerCase()
                }
                return ""
            },
            ai = function (t) {
                var e = Ke.location,
                    n = ii(t);
                return (":" === n.protocol ? e.protocol : n.protocol) + n.host !== e.protocol + e.host
            },
            li = (Object.freeze || Object)({
                parseUrl: ii,
                getAbsoluteURL: oi,
                getFileExtension: si,
                isCrossOrigin: ai
            }),
            ci = yt,
            ui = Object.prototype.toString,
            hi = r(function (t, e) {
                function n(t) {
                    return t.replace(/^\s*|\s*$/g, "")
                }
                e = t.exports = n,
                    e.left = function (t) {
                        return t.replace(/^\s*/, "")
                    },
                    e.right = function (t) {
                        return t.replace(/\s*$/, "")
                    }
            }),
            pi = Function.prototype.toString,
            di = /^\s*class\b/,
            fi = function (t) {
                try {
                    var e = pi.call(t);
                    return di.test(e)
                } catch (n) {
                    return !1
                }
            },
            yi = function (t) {
                try {
                    return !fi(t) && (pi.call(t), !0)
                } catch (e) {
                    return !1
                }
            },
            gi = Object.prototype.toString,
            vi = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
            mi = function (t) {
                if (!t) return !1;
                if ("function" != typeof t && "object" != typeof t) return !1;
                if ("function" == typeof t && !t.prototype) return !0;
                if (vi) return yi(t);
                if (fi(t)) return !1;
                var e = gi.call(t);
                return "[object Function]" === e || "[object GeneratorFunction]" === e
            },
            _i = Object.prototype.toString,
            bi = Object.prototype.hasOwnProperty,
            Ti = function (t, e, n) {
                for (var r = 0, i = t.length; r < i; r++) bi.call(t, r) && (null == n ? e(t[r], r, t) : e.call(n, t[r], r, t))
            },
            Ci = function (t, e, n) {
                for (var r = 0, i = t.length; r < i; r++) null == n ? e(t.charAt(r), r, t) : e.call(n, t.charAt(r), r, t)
            },
            Ei = function (t, e, n) {
                for (var r in t) bi.call(t, r) && (null == n ? e(t[r], r, t) : e.call(n, t[r], r, t))
            },
            ki = function (t, e, n) {
                if (!mi(e)) throw new TypeError("iterator must be a function");
                var r;
                arguments.length >= 3 && (r = n),
                    "[object Array]" === _i.call(t) ? Ti(t, e, r) : "string" == typeof t ? Ci(t, e, r) : Ei(t, e, r)
            },
            wi = ki,
            Si = function (t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            Pi = function (t) {
                if (!t) return {};
                var e = {};
                return wi(hi(t).split("\n"), function (t) {
                    var n = t.indexOf(":"),
                        r = hi(t.slice(0, n)).toLowerCase(),
                        i = hi(t.slice(n + 1));
                    "undefined" == typeof e[r] ? e[r] = i : Si(e[r]) ? e[r].push(i) : e[r] = [e[r], i]
                }),
                    e
            },
            xi = gt,
            Ii = Object.prototype.hasOwnProperty,
            Mi = _t;
        _t.XMLHttpRequest = Ke.XMLHttpRequest || Ct,
            _t.XDomainRequest = "withCredentials" in new _t.XMLHttpRequest ? _t.XMLHttpRequest : Ke.XDomainRequest,


            function (t, e) {
                for (var n = 0; n < t.length; n++) e(t[n])
            }(["get", "put", "post", "patch", "head", "delete"], function (t) {
                _t["delete" === t ? "del" : t] = function (e, n, r) {
                    return n = mt(e, n, r),
                        n.method = t.toUpperCase(),
                        bt(n)
                }
            });
        var Di = function (t, e) {
                var n = new Ke.WebVTT.Parser(Ke, Ke.vttjs, Ke.WebVTT.StringDecoder()),
                    r = [];
                n.oncue = function (t) {
                    e.addCue(t)
                },
                    n.onparsingerror = function (t) {
                        r.push(t)
                    },
                    n.onflush = function () {
                        e.trigger({
                            type: "loadeddata",
                            target: e
                        })
                    },
                    n.parse(t),
                r.length > 0 && (Ke.console && Ke.console.groupCollapsed && Ke.console.groupCollapsed("Text Track parsing errors for " + e.src), r.forEach(function (t) {
                    return tr.error(t)
                }), Ke.console && Ke.console.groupEnd && Ke.console.groupEnd()),
                    n.flush()
            },
            Ai = function (t, e) {
                var n = {
                        uri: t
                    },
                    r = ai(t);
                r && (n.cors = r),
                    Mi(n, vr(this, function (t, n, r) {
                        if (t) return tr.error(t, n);
                        if (e.loaded_ = !0, "function" != typeof Ke.WebVTT) {
                            if (e.tech_) {
                                var i = function () {
                                    return Di(r, e)
                                };
                                e.tech_.on("vttjsloaded", i),
                                    e.tech_.on("vttjserror", function () {
                                        tr.error("vttjs failed to load, stopping trying to process " + e.src),
                                            e.tech_.off("vttjsloaded", i)
                                    })
                            }
                        } else Di(r, e)
                    }))
            },
            Ri = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    if (qn(this, e), !i.tech) throw new Error("A tech was not provided.");
                    var o = it(i, {
                            kind: ei[i.kind] || "subtitles",
                            language: i.language || i.srclang || ""
                        }),
                        s = ni[o.mode] || "disabled",
                        a = o["default"];
                    "metadata" !== o.kind && "chapters" !== o.kind || (s = "hidden");
                    var l = n = Kn(this, t.call(this, o));
                    if (l.tech_ = o.tech, bn) for (var c in e.prototype)"constructor" !== c && (l[c] = e.prototype[c]);
                    l.cues_ = [],
                        l.activeCues_ = [];
                    var u = new Jr(l.cues_),
                        h = new Jr(l.activeCues_),
                        p = !1,
                        d = vr(l, function () {
                            this.activeCues,
                            p && (this.trigger("cuechange"), p = !1)
                        });
                    return "disabled" !== s && l.tech_.ready(function () {
                        l.tech_.on("timeupdate", d)
                    }, !0),
                        Object.defineProperty(l, "default", {
                            get: function () {
                                return a
                            },
                            set: function () {}
                        }),
                        Object.defineProperty(l, "mode", {
                            get: function () {
                                return s
                            },
                            set: function (t) {
                                var e = this;
                                ni[t] && (s = t, "showing" === s && this.tech_.ready(function () {
                                    e.tech_.on("timeupdate", d)
                                }, !0), this.trigger("modechange"))
                            }
                        }),
                        Object.defineProperty(l, "cues", {
                            get: function () {
                                return this.loaded_ ? u : null
                            },
                            set: function () {}
                        }),
                        Object.defineProperty(l, "activeCues", {
                            get: function () {
                                if (!this.loaded_) return null;
                                if (0 === this.cues.length) return h;
                                for (var t = this.tech_.currentTime(), e = [], n = 0, r = this.cues.length; n < r; n++) {
                                    var i = this.cues[n];
                                    i.startTime <= t && i.endTime >= t ? e.push(i) : i.startTime === i.endTime && i.startTime <= t && i.startTime + .5 >= t && e.push(i)
                                }
                                if (p = !1, e.length !== this.activeCues_.length) p = !0;
                                else for (var o = 0; o < e.length; o++) - 1 === this.activeCues_.indexOf(e[o]) && (p = !0);
                                return this.activeCues_ = e,
                                    h.setCues_(this.activeCues_),
                                    h
                            },
                            set: function () {}
                        }),
                        o.src ? (l.src = o.src, Ai(o.src, l)) : l.loaded_ = !0,
                        r = l,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e.prototype.addCue = function (t) {
                        var e = t;
                        if (Ke.vttjs && !(t instanceof Ke.vttjs.VTTCue)) {
                            e = new Ke.vttjs.VTTCue(t.startTime, t.endTime, t.text);
                            for (var n in t) n in e || (e[n] = t[n]);
                            e.id = t.id,
                                e.originalCue_ = t
                        }
                        for (var r = this.tech_.textTracks(), i = 0; i < r.length; i++) r[i] !== this && r[i].removeCue(e);
                        this.cues_.push(e),
                            this.cues.setCues_(this.cues_)
                    },
                    e.prototype.removeCue = function (t) {
                        for (var e = this.cues_.length; e--;) {
                            var n = this.cues_[e];
                            if (n === t || n.originalCue_ && n.originalCue_ === t) {
                                this.cues_.splice(e, 1),
                                    this.cues.setCues_(this.cues_);
                                break
                            }
                        }
                    },
                    e
            }(ri);
        Ri.prototype.allowedEvents_ = {
            cuechange: "cuechange"
        };
        var ji = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    qn(this, e);
                    var o = it(i, {
                            kind: ti[i.kind] || ""
                        }),
                        s = n = Kn(this, t.call(this, o)),
                        a = !1;
                    if (bn) for (var l in e.prototype)"constructor" !== l && (s[l] = e.prototype[l]);
                    return Object.defineProperty(s, "enabled", {
                        get: function () {
                            return a
                        },
                        set: function (t) {
                            "boolean" == typeof t && t !== a && (a = t, this.trigger("enabledchange"))
                        }
                    }),
                    o.enabled && (s.enabled = o.enabled),
                        s.loaded_ = !0,
                        r = s,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e
            }(ri),
            Oi = function (t) {
                function e() {
                    var n, r, i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    qn(this, e);
                    var o = it(i, {
                            kind: Zr[i.kind] || ""
                        }),
                        s = n = Kn(this, t.call(this, o)),
                        a = !1;
                    if (bn) for (var l in e.prototype)"constructor" !== l && (s[l] = e.prototype[l]);
                    return Object.defineProperty(s, "selected", {
                        get: function () {
                            return a
                        },
                        set: function (t) {
                            "boolean" == typeof t && t !== a && (a = t, this.trigger("selectedchange"))
                        }
                    }),
                    o.selected && (s.selected = o.selected),
                        r = s,
                        Kn(n, r)
                }
                return Wn(e, t),
                    e
            }(ri),
            Li = 0,
            Ni = 2,
            Bi = function (t) {
                function e() {
                    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    qn(this, e);
                    var r = Kn(this, t.call(this)),
                        i = void 0,
                        o = r;
                    if (bn) {
                        o = Ye.createElement("custom");
                        for (var s in e.prototype)"constructor" !== s && (o[s] = e.prototype[s])
                    }
                    var a = new Ri(n);
                    if (o.kind = a.kind, o.src = a.src, o.srclang = a.language, o.label = a.label, o["default"] = a["default"], Object.defineProperty(o, "readyState", {
                        get: function () {
                            return i
                        }
                    }), Object.defineProperty(o, "track", {
                        get: function () {
                            return a
                        }
                    }), i = Li, a.addEventListener("loadeddata", function () {
                        i = Ni,
                            o.trigger({
                                type: "load",
                                target: o
                            })
                    }), bn) {
                        var l;
                        return l = o,
                            Kn(r, l)
                    }
                    return r
                }
                return Wn(e, t),
                    e
            }(_r);
        Bi.prototype.allowedEvents_ = {
            load: "load"
        },
            Bi.NONE = Li,
            Bi.LOADING = 1,
            Bi.LOADED = Ni,
            Bi.ERROR = 3;
        var Fi = {
            audio: {
                ListClass: Xr,
                TrackClass: ji,
                capitalName: "Audio"
            },
            video: {
                ListClass: Gr,
                TrackClass: Oi,
                capitalName: "Video"
            },
            text: {
                ListClass: $r,
                TrackClass: Ri,
                capitalName: "Text"
            }
        };
        Object.keys(Fi).forEach(function (t) {
            Fi[t].getterName = t + "Tracks",
                Fi[t].privateName = t + "Tracks_"
        });
        var Hi = {
                remoteText: {
                    ListClass: $r,
                    TrackClass: Ri,
                    capitalName: "RemoteText",
                    getterName: "remoteTextTracks",
                    privateName: "remoteTextTracks_"
                },
                remoteTextEl: {
                    ListClass: Yr,
                    TrackClass: Bi,
                    capitalName: "RemoteTextTrackEls",
                    getterName: "remoteTextTrackEls",
                    privateName: "remoteTextTrackEls_"
                }
            },
            Vi = it(Fi, Hi);
        Hi.names = Object.keys(Hi),
            Fi.names = Object.keys(Fi),
            Vi.names = [].concat(Hi.names).concat(Fi.names);
        var Ui = Object.create ||
            function () {
                function t() {}
                return function (e) {
                    if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
                    return t.prototype = e,
                        new t
                }
            }();
        Et.prototype = Ui(Error.prototype),
            Et.prototype.constructor = Et,
            Et.Errors = {
                BadSignature: {
                    code: 0,
                    message: "Malformed WebVTT signature."
                },
                BadTimeStamp: {
                    code: 1,
                    message: "Malformed time stamp."
                }
            },
            wt.prototype = {
                set: function (t, e) {
                    this.get(t) || "" === e || (this.values[t] = e)
                },
                get: function (t, e, n) {
                    return n ? this.has(t) ? this.values[t] : e[n] : this.has(t) ? this.values[t] : e
                },
                has: function (t) {
                    return t in this.values
                },
                alt: function (t, e, n) {
                    for (var r = 0; r < n.length; ++r) if (e === n[r]) {
                        this.set(t, e);
                        break
                    }
                },
                integer: function (t, e) {
                    /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                },
                percent: function (t, e) {
                    return !!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (e = parseFloat(e)) >= 0 && e <= 100) && (this.set(t, e), !0)
                }
            };
        var zi = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&lrm;": "‎",
                "&rlm;": "‏",
                "&nbsp;": " "
            },
            qi = {
                c: "span",
                i: "i",
                b: "b",
                u: "u",
                ruby: "ruby",
                rt: "rt",
                v: "span",
                lang: "span"
            },
            Wi = {
                v: "title",
                lang: "lang"
            },
            Ki = {
                rt: "ruby"
            },
            Xi = [
                [1470, 1470],
                [1472, 1472],
                [1475, 1475],
                [1478, 1478],
                [1488, 1514],
                [1520, 1524],
                [1544, 1544],
                [1547, 1547],
                [1549, 1549],
                [1563, 1563],
                [1566, 1610],
                [1645, 1647],
                [1649, 1749],
                [1765, 1766],
                [1774, 1775],
                [1786, 1805],
                [1807, 1808],
                [1810, 1839],
                [1869, 1957],
                [1969, 1969],
                [1984, 2026],
                [2036, 2037],
                [2042, 2042],
                [2048, 2069],
                [2074, 2074],
                [2084, 2084],
                [2088, 2088],
                [2096, 2110],
                [2112, 2136],
                [2142, 2142],
                [2208, 2208],
                [2210, 2220],
                [8207, 8207],
                [64285, 64285],
                [64287, 64296],
                [64298, 64310],
                [64312, 64316],
                [64318, 64318],
                [64320, 64321],
                [64323, 64324],
                [64326, 64449],
                [64467, 64829],
                [64848, 64911],
                [64914, 64967],
                [65008, 65020],
                [65136, 65140],
                [65142, 65276],
                [67584, 67589],
                [67592, 67592],
                [67594, 67637],
                [67639, 67640],
                [67644, 67644],
                [67647, 67669],
                [67671, 67679],
                [67840, 67867],
                [67872, 67897],
                [67903, 67903],
                [67968, 68023],
                [68030, 68031],
                [68096, 68096],
                [68112, 68115],
                [68117, 68119],
                [68121, 68147],
                [68160, 68167],
                [68176, 68184],
                [68192, 68223],
                [68352, 68405],
                [68416, 68437],
                [68440, 68466],
                [68472, 68479],
                [68608, 68680],
                [126464, 126467],
                [126469, 126495],
                [126497, 126498],
                [126500, 126500],
                [126503, 126503],
                [126505, 126514],
                [126516, 126519],
                [126521, 126521],
                [126523, 126523],
                [126530, 126530],
                [126535, 126535],
                [126537, 126537],
                [126539, 126539],
                [126541, 126543],
                [126545, 126546],
                [126548, 126548],
                [126551, 126551],
                [126553, 126553],
                [126555, 126555],
                [126557, 126557],
                [126559, 126559],
                [126561, 126562],
                [126564, 126564],
                [126567, 126570],
                [126572, 126578],
                [126580, 126583],
                [126585, 126588],
                [126590, 126590],
                [126592, 126601],
                [126603, 126619],
                [126625, 126627],
                [126629, 126633],
                [126635, 126651],
                [1114109, 1114109]
            ];
        At.prototype.applyStyles = function (t, e) {
            e = e || this.div;
            for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n])
        },
            At.prototype.formatStyle = function (t, e) {
                return 0 === t ? 0 : t + e
            },
            Rt.prototype = Ui(At.prototype),
            Rt.prototype.constructor = Rt,
            jt.prototype.move = function (t, e) {
                switch (e = e !== undefined ? e : this.lineHeight, t) {
                    case "+x":
                        this.left += e,
                            this.right += e;
                        break;
                    case "-x":
                        this.left -= e,
                            this.right -= e;
                        break;
                    case "+y":
                        this.top += e,
                            this.bottom += e;
                        break;
                    case "-y":
                        this.top -= e,
                            this.bottom -= e
                }
            },
            jt.prototype.overlaps = function (t) {
                return this.left < t.right && this.right > t.left && this.top < t.bottom && this.bottom > t.top
            },
            jt.prototype.overlapsAny = function (t) {
                for (var e = 0; e < t.length; e++) if (this.overlaps(t[e])) return !0;
                return !1
            },
            jt.prototype.within = function (t) {
                return this.top >= t.top && this.bottom <= t.bottom && this.left >= t.left && this.right <= t.right
            },
            jt.prototype.overlapsOppositeAxis = function (t, e) {
                switch (e) {
                    case "+x":
                        return this.left < t.left;
                    case "-x":
                        return this.right > t.right;
                    case "+y":
                        return this.top < t.top;
                    case "-y":
                        return this.bottom > t.bottom
                }
            },
            jt.prototype.intersectPercentage = function (t) {
                return Math.max(0, Math.min(this.right, t.right) - Math.max(this.left, t.left)) * Math.max(0, Math.min(this.bottom, t.bottom) - Math.max(this.top, t.top)) / (this.height * this.width)
            },
            jt.prototype.toCSSCompatValues = function (t) {
                return {
                    top: this.top - t.top,
                    bottom: t.bottom - this.bottom,
                    left: this.left - t.left,
                    right: t.right - this.right,
                    height: this.height,
                    width: this.width
                }
            },
            jt.getSimpleBoxPosition = function (t) {
                var e = t.div ? t.div.offsetHeight : t.tagName ? t.offsetHeight : 0,
                    n = t.div ? t.div.offsetWidth : t.tagName ? t.offsetWidth : 0,
                    r = t.div ? t.div.offsetTop : t.tagName ? t.offsetTop : 0;
                return t = t.div ? t.div.getBoundingClientRect() : t.tagName ? t.getBoundingClientRect() : t,
                    {
                        left: t.left,
                        right: t.right,
                        top: t.top || r,
                        height: t.height || e,
                        bottom: t.bottom || r + (t.height || e),
                        width: t.width || n
                    }
            },
            Lt.StringDecoder = function () {
                return {
                    decode: function (t) {
                        if (!t) return "";
                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(t))
                    }
                }
            },
            Lt.convertCueToDOMTree = function (t, e) {
                return t && e ? xt(t, e) : null
            };
        Lt.processCues = function (t, e, n) {
            if (!t || !e || !n) return null;
            for (; n.firstChild;) n.removeChild(n.firstChild);
            var r = t.document.createElement("div");
            if (r.style.position = "absolute", r.style.left = "0", r.style.right = "0", r.style.top = "0", r.style.bottom = "0", r.style.margin = "1.5%", n.appendChild(r), function (t) {
                for (var e = 0; e < t.length; e++) if (t[e].hasBeenReset || !t[e].displayState) return !0;
                return !1
            }(e)) {
                var i = [],
                    o = jt.getSimpleBoxPosition(r),
                    s = Math.round(.05 * o.height * 100) / 100,
                    a = {
                        font: s + "px sans-serif"
                    };
                !
                    function () {
                        for (var n, s, l = 0; l < e.length; l++) s = e[l],
                            n = new Rt(t, s, a),
                            r.appendChild(n.div),
                            Ot(t, n, o, i),
                            s.displayState = n.div,
                            i.push(jt.getSimpleBoxPosition(n))
                    }()
            } else for (var l = 0; l < e.length; l++) r.appendChild(e[l].displayState)
        },
            Lt.Parser = function (t, e, n) {
                n || (n = e, e = {}),
                e || (e = {}),
                    this.window = t,
                    this.vttjs = e,
                    this.state = "INITIAL",
                    this.buffer = "",
                    this.decoder = n || new TextDecoder("utf8"),
                    this.regionList = []
            },
            Lt.Parser.prototype = {
                reportOrThrowError: function (t) {
                    if (!(t instanceof Et)) throw t;
                    this.onparsingerror && this.onparsingerror(t)
                },
                parse: function (t) {
                    function e() {
                        for (var t = i.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];)++e;
                        var n = t.substr(0, e);
                        return "\r" === t[e] && ++e,
                        "\n" === t[e] && ++e,
                            i.buffer = t.substr(e),
                            n
                    }
                    function n(t) {
                        var e = new wt;
                        if (St(t, function (t, n) {
                            switch (t) {
                                case "id":
                                    e.set(t, n);
                                    break;
                                case "width":
                                    e.percent(t, n);
                                    break;
                                case "lines":
                                    e.integer(t, n);
                                    break;
                                case "regionanchor":
                                case "viewportanchor":
                                    var r = n.split(",");
                                    if (2 !== r.length) break;
                                    var i = new wt;
                                    if (i.percent("x", r[0]), i.percent("y", r[1]), !i.has("x") || !i.has("y")) break;
                                    e.set(t + "X", i.get("x")),
                                        e.set(t + "Y", i.get("y"));
                                    break;
                                case "scroll":
                                    e.alt(t, n, ["up"])
                            }
                        }, /=/, /\s/), e.has("id")) {
                            var n = new(i.vttjs.VTTRegion || i.window.VTTRegion);
                            n.width = e.get("width", 100),
                                n.lines = e.get("lines", 3),
                                n.regionAnchorX = e.get("regionanchorX", 0),
                                n.regionAnchorY = e.get("regionanchorY", 100),
                                n.viewportAnchorX = e.get("viewportanchorX", 0),
                                n.viewportAnchorY = e.get("viewportanchorY", 100),
                                n.scroll = e.get("scroll", ""),
                            i.onregion && i.onregion(n),
                                i.regionList.push({
                                    id: e.get("id"),
                                    region: n
                                })
                        }
                    }
                    function r(t) {
                        var e = new wt;
                        St(t, function (t, n) {
                            switch (t) {
                                case "MPEGT":
                                    e.integer(t + "S", n);
                                    break;
                                case "LOCA":
                                    e.set(t + "L", kt(n))
                            }
                        }, /[^\d]:/, /,/),
                        i.ontimestampmap && i.ontimestampmap({
                            MPEGTS: e.get("MPEGTS"),
                            LOCAL: e.get("LOCAL")
                        })
                    }
                    var i = this;
                    t && (i.buffer += i.decoder.decode(t, {
                        stream: !0
                    }));
                    try {
                        var o;
                        if ("INITIAL" === i.state) {
                            if (!/\r\n|\n/.test(i.buffer)) return this;
                            o = e();
                            var s = o.match(/^WEBVTT([ \t].*)?$/);
                            if (!s || !s[0]) throw new Et(Et.Errors.BadSignature);
                            i.state = "HEADER"
                        }
                        for (var a = !1; i.buffer;) {
                            if (!/\r\n|\n/.test(i.buffer)) return this;
                            switch (a ? a = !1 : o = e(), i.state) {
                                case "HEADER":
                                    /:/.test(o) ?
                                        function (t) {
                                            t.match(/X-TIMESTAMP-MAP/) ? St(t, function (t, e) {
                                                switch (t) {
                                                    case "X-TIMESTAMP-MAP":
                                                        r(e)
                                                }
                                            }, /=/) : St(t, function (t, e) {
                                                switch (t) {
                                                    case "Region":
                                                        n(e)
                                                }
                                            }, /:/)
                                        }(o) : o || (i.state = "ID");
                                    continue;
                                case "NOTE":
                                    o || (i.state = "ID");
                                    continue;
                                case "ID":
                                    if (/^NOTE($|[ \t])/.test(o)) {
                                        i.state = "NOTE";
                                        break
                                    }
                                    if (!o) continue;
                                    if (i.cue = new(i.vttjs.VTTCue || i.window.VTTCue)(0, 0, ""), i.state = "CUE", -1 === o.indexOf("--\x3e")) {
                                        i.cue.id = o;
                                        continue
                                    }
                                case "CUE":
                                    try {
                                        Pt(o, i.cue, i.regionList)
                                    } catch (c) {
                                        i.reportOrThrowError(c),
                                            i.cue = null,
                                            i.state = "BADCUE";
                                        continue
                                    }
                                    i.state = "CUETEXT";
                                    continue;
                                case "CUETEXT":
                                    var l = -1 !== o.indexOf("--\x3e");
                                    if (!o || l && (a = !0)) {
                                        i.oncue && i.oncue(i.cue),
                                            i.cue = null,
                                            i.state = "ID";
                                        continue
                                    }
                                    i.cue.text && (i.cue.text += "\n"),
                                        i.cue.text += o;
                                    continue;
                                case "BADCUE":
                                    o || (i.state = "ID");
                                    continue
                            }
                        }
                    } catch (c) {
                        i.reportOrThrowError(c),
                        "CUETEXT" === i.state && i.cue && i.oncue && i.oncue(i.cue),
                            i.cue = null,
                            i.state = "INITIAL" === i.state ? "BADWEBVTT" : "BADCUE"
                    }
                    return this
                },
                flush: function () {
                    var t = this;
                    try {
                        if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new Et(Et.Errors.BadSignature)
                    } catch (e) {
                        t.reportOrThrowError(e)
                    }
                    return t.onflush && t.onflush(),
                        this
                }
            };
        var Qi = Lt,
            Gi = "auto",
            $i = {
                "": !0,
                lr: !0,
                rl: !0
            },
            Yi = {
                start: !0,
                middle: !0,
                end: !0,
                left: !0,
                right: !0
            };
        Ht.prototype.getCueAsHTML = function () {
            return WebVTT.convertCueToDOMTree(window, this.text)
        };
        var Ji = Ht,
            Zi = {
                "": !0,
                up: !0
            },
            to = zt,
            eo = r(function (t) {
                var e = t.exports = {
                    WebVTT: Qi,
                    VTTCue: Ji,
                    VTTRegion: to
                };
                Ke.vttjs = e,
                    Ke.WebVTT = e.WebVTT;
                var n = e.VTTCue,
                    r = e.VTTRegion,
                    i = Ke.VTTCue,
                    o = Ke.VTTRegion;
                e.shim = function () {
                    Ke.VTTCue = n,
                        Ke.VTTRegion = r
                },
                    e.restore = function () {
                        Ke.VTTCue = i,
                            Ke.VTTRegion = o
                    },
                Ke.VTTCue || e.shim()
            }),
            no = function (t) {
                function e(n) {
                    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
                    qn(this, e),
                        r.reportTouchActivity = !1;
                    var o = Kn(this, t.call(this, n, r, i));
                    return o.hasStarted_ = !1,
                        o.on("playing", function () {
                            this.hasStarted_ = !0
                        }),
                        o.on("loadstart", function () {
                            this.hasStarted_ = !1
                        }),
                        Vi.names.forEach(function (t) {
                            var e = Vi[t];
                            r && r[e.getterName] && (o[e.privateName] = r[e.getterName])
                        }),
                    o.featuresProgressEvents || o.manualProgressOn(),
                    o.featuresTimeupdateEvents || o.manualTimeUpdatesOn(),
                        ["Text", "Audio", "Video"].forEach(function (t) {
                            !1 === r["native" + t + "Tracks"] && (o["featuresNative" + t + "Tracks"] = !1)
                        }),
                        !1 === r.nativeCaptions || !1 === r.nativeTextTracks ? o.featuresNativeTextTracks = !1 : !0 !== r.nativeCaptions && !0 !== r.nativeTextTracks || (o.featuresNativeTextTracks = !0),
                    o.featuresNativeTextTracks || o.emulateTextTracks(),
                        o.autoRemoteTextTracks_ = new Vi.text.ListClass,
                        o.initTrackListeners(),
                    r.nativeControlsForTouch || o.emitTapEvents(),
                    o.constructor && (o.name_ = o.constructor.name || "Unknown Tech"),
                        o
                }
                return Wn(e, t),
                    e.prototype.manualProgressOn = function () {
                        this.on("durationchange", this.onDurationChange),
                            this.manualProgress = !0,
                            this.one("ready", this.trackProgress)
                    },
                    e.prototype.manualProgressOff = function () {
                        this.manualProgress = !1,
                            this.stopTrackingProgress(),
                            this.off("durationchange", this.onDurationChange)
                    },
                    e.prototype.trackProgress = function (t) {
                        this.stopTrackingProgress(),
                            this.progressInterval = this.setInterval(vr(this, function () {
                                var t = this.bufferedPercent();
                                this.bufferedPercent_ !== t && this.trigger("progress"),
                                    this.bufferedPercent_ = t,
                                1 === t && this.stopTrackingProgress()
                            }), 500)
                    },
                    e.prototype.onDurationChange = function (t) {
                        this.duration_ = this.duration()
                    },
                    e.prototype.buffered = function () {
                        return ct(0, 0)
                    },
                    e.prototype.bufferedPercent = function () {
                        return ut(this.buffered(), this.duration_)
                    },
                    e.prototype.stopTrackingProgress = function () {
                        this.clearInterval(this.progressInterval)
                    },
                    e.prototype.manualTimeUpdatesOn = function () {
                        this.manualTimeUpdates = !0,
                            this.on("play", this.trackCurrentTime),
                            this.on("pause", this.stopTrackingCurrentTime)
                    },
                    e.prototype.manualTimeUpdatesOff = function () {
                        this.manualTimeUpdates = !1,
                            this.stopTrackingCurrentTime(),
                            this.off("play", this.trackCurrentTime),
                            this.off("pause", this.stopTrackingCurrentTime)
                    },
                    e.prototype.trackCurrentTime = function () {
                        this.currentTimeInterval && this.stopTrackingCurrentTime(),
                            this.currentTimeInterval = this.setInterval(function () {
                                this.trigger({
                                    type: "timeupdate",
                                    target: this,
                                    manuallyTriggered: !0
                                })
                            }, 250)
                    },
                    e.prototype.stopTrackingCurrentTime = function () {
                        this.clearInterval(this.currentTimeInterval),
                            this.trigger({
                                type: "timeupdate",
                                target: this,
                                manuallyTriggered: !0
                            })
                    },
                    e.prototype.dispose = function () {
                        this.clearTracks(Fi.names),
                        this.manualProgress && this.manualProgressOff(),
                        this.manualTimeUpdates && this.manualTimeUpdatesOff(),
                            t.prototype.dispose.call(this)
                    },
                    e.prototype.clearTracks = function (t) {
                        var e = this;
                        t = [].concat(t),
                            t.forEach(function (t) {
                                for (var n = e[t + "Tracks"]() || [], r = n.length; r--;) {
                                    var i = n[r];
                                    "text" === t && e.removeRemoteTextTrack(i),
                                        n.removeTrack(i)
                                }
                            })
                    },
                    e.prototype.cleanupAutoTextTracks = function () {
                        for (var t = this.autoRemoteTextTracks_ || [], e = t.length; e--;) {
                            var n = t[e];
                            this.removeRemoteTextTrack(n)
                        }
                    },
                    e.prototype.reset = function () {},
                    e.prototype.error = function (t) {
                        return t !== undefined && (this.error_ = new ht(t), this.trigger("error")),
                            this.error_
                    },
                    e.prototype.played = function () {
                        return this.hasStarted_ ? ct(0, 0) : ct()
                    },
                    e.prototype.setCurrentTime = function () {
                        this.manualTimeUpdates && this.trigger({
                            type: "timeupdate",
                            target: this,
                            manuallyTriggered: !0
                        })
                    },
                    e.prototype.initTrackListeners = function () {
                        var t = this;
                        Fi.names.forEach(function (e) {
                            var n = Fi[e],
                                r = function () {
                                    t.trigger(e + "trackchange")
                                },
                                i = t[n.getterName]();
                            i.addEventListener("removetrack", r),
                                i.addEventListener("addtrack", r),
                                t.on("dispose", function () {
                                    i.removeEventListener("removetrack", r),
                                        i.removeEventListener("addtrack", r)
                                })
                        })
                    },
                    e.prototype.addWebVttScript_ = function () {
                        var t = this;
                        if (!Ke.WebVTT) if (Ye.body.contains(this.el())) {
                            if (!this.options_["vtt.js"] && l(eo) && Object.keys(eo).length > 0) return void this.trigger("vttjsloaded");
                            var e = Ye.createElement("script");
                            e.src = this.options_["vtt.js"] || "https://vjs.zencdn.net/vttjs/0.12.4/vtt.min.js",
                                e.onload = function () {
                                    t.trigger("vttjsloaded")
                                },
                                e.onerror = function () {
                                    t.trigger("vttjserror")
                                },
                                this.on("dispose", function () {
                                    e.onload = null,
                                        e.onerror = null
                                }),
                                Ke.WebVTT = !0,
                                this.el().parentNode.appendChild(e)
                        } else this.ready(this.addWebVttScript_)
                    },
                    e.prototype.emulateTextTracks = function () {
                        var t = this,
                            e = this.textTracks(),
                            n = this.remoteTextTracks(),
                            r = function (t) {
                                return e.addTrack(t.track)
                            },
                            i = function (t) {
                                return e.removeTrack(t.track)
                            };
                        n.on("addtrack", r),
                            n.on("removetrack", i),
                            this.addWebVttScript_();
                        var o = function () {
                                return t.trigger("texttrackchange")
                            },
                            s = function () {
                                o();
                                for (var t = 0; t < e.length; t++) {
                                    var n = e[t];
                                    n.removeEventListener("cuechange", o),
                                    "showing" === n.mode && n.addEventListener("cuechange", o)
                                }
                            };
                        s(),
                            e.addEventListener("change", s),
                            e.addEventListener("addtrack", s),
                            e.addEventListener("removetrack", s),
                            this.on("dispose", function () {
                                n.off("addtrack", r),
                                    n.off("removetrack", i),
                                    e.removeEventListener("change", s),
                                    e.removeEventListener("addtrack", s),
                                    e.removeEventListener("removetrack", s);
                                for (var t = 0; t < e.length; t++) {
                                    e[t].removeEventListener("cuechange", o)
                                }
                            })
                    },
                    e.prototype.addTextTrack = function (t, e, n) {
                        if (!t) throw new Error("TextTrack kind is required but was not provided");
                        return qt(this, t, e, n)
                    },
                    e.prototype.createRemoteTextTrack = function (t) {
                        var e = it(t, {
                            tech: this
                        });
                        return new Hi.remoteTextEl.TrackClass(e)
                    },
                    e.prototype.addRemoteTextTrack = function () {
                        var t = this,
                            e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                            n = arguments[1],
                            r = this.createRemoteTextTrack(e);
                        return !0 !== n && !1 !== n && (tr.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), n = !0),
                            this.remoteTextTrackEls().addTrackElement_(r),
                            this.remoteTextTracks().addTrack(r.track),
                        !0 !== n && this.ready(function () {
                            return t.autoRemoteTextTracks_.addTrack(r.track)
                        }),
                            r
                    },
                    e.prototype.removeRemoteTextTrack = function (t) {
                        var e = this.remoteTextTrackEls().getTrackElementByTrack_(t);
                        this.remoteTextTrackEls().removeTrackElement_(e),
                            this.remoteTextTracks().removeTrack(t),
                            this.autoRemoteTextTracks_.removeTrack(t)
                    },
                    e.prototype.getVideoPlaybackQuality = function () {
                        return {}
                    },
                    e.prototype.setPoster = function () {},
                    e.prototype.playsinline = function () {},
                    e.prototype.setPlaysinline = function () {},
                    e.prototype.canPlayType = function () {
                        return ""
                    },
                    e.canPlayType = function () {
                        return ""
                    },
                    e.canPlaySource = function (t, n) {
                        return e.canPlayType(t.type)
                    },
                    e.isTech = function (t) {
                        return t.prototype instanceof e || t instanceof e || t === e
                    },
                    e.registerTech = function (t, n) {
                        if (e.techs_ || (e.techs_ = {}), !e.isTech(n)) throw new Error("Tech " + t + " must be a Tech");
                        if (!e.canPlayType) throw new Error("Techs must have a static canPlayType method on them");
                        if (!e.canPlaySource) throw new Error("Techs must have a static canPlaySource method on them");
                        return t = nt(t),
                            e.techs_[t] = n,
                        "Tech" !== t && e.defaultTechOrder_.push(t),
                            n
                    },
                    e.getTech = function (t) {
                        if (t) return t = nt(t),
                            e.techs_ && e.techs_[t] ? e.techs_[t] : Ke && Ke.videojs && Ke.videojs[t] ? (tr.warn("The " + t + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), Ke.videojs[t]) : void 0
                    },
                    e
            }(Ir);
        Vi.names.forEach(function (t) {
            var e = Vi[t];
            no.prototype[e.getterName] = function () {
                return this[e.privateName] = this[e.privateName] || new e.ListClass,
                    this[e.privateName]
            }
        }),
            no.prototype.featuresVolumeControl = !0,
            no.prototype.featuresMuteControl = !0,
            no.prototype.featuresFullscreenResize = !1,
            no.prototype.featuresPlaybackRate = !1,
            no.prototype.featuresProgressEvents = !1,
            no.prototype.featuresTimeupdateEvents = !1,
            no.prototype.featuresNativeTextTracks = !1,
            no.withSourceHandlers = function (t) {
                t.registerSourceHandler = function (e, n) {
                    var r = t.sourceHandlers;
                    r || (r = t.sourceHandlers = []),
                    n === undefined && (n = r.length),
                        r.splice(n, 0, e)
                },
                    t.canPlayType = function (e) {
                        for (var n = t.sourceHandlers || [], r = void 0, i = 0; i < n.length; i++) if (r = n[i].canPlayType(e)) return r;
                        return ""
                    },
                    t.selectSourceHandler = function (e, n) {
                        for (var r = t.sourceHandlers || [], i = 0; i < r.length; i++) if (r[i].canHandleSource(e, n)) return r[i];
                        return null
                    },
                    t.canPlaySource = function (e, n) {
                        var r = t.selectSourceHandler(e, n);
                        return r ? r.canHandleSource(e, n) : ""
                    },
                    ["seekable", "duration"].forEach(function (t) {
                        var e = this[t];
                        "function" == typeof e && (this[t] = function () {
                            return this.sourceHandler_ && this.sourceHandler_[t] ? this.sourceHandler_[t].apply(this.sourceHandler_, arguments) : e.apply(this, arguments)
                        })
                    }, t.prototype),
                    t.prototype.setSource = function (e) {
                        var n = t.selectSourceHandler(e, this.options_);
                        n || (t.nativeSourceHandler ? n = t.nativeSourceHandler : tr.error("No source hander found for the current source.")),
                            this.disposeSourceHandler(),
                            this.off("dispose", this.disposeSourceHandler),
                        n !== t.nativeSourceHandler && (this.currentSource_ = e),
                            this.sourceHandler_ = n.handleSource(e, this, this.options_),
                            this.on("dispose", this.disposeSourceHandler)
                    },
                    t.prototype.disposeSourceHandler = function () {
                        this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null),
                            this.cleanupAutoTextTracks(),
                        this.sourceHandler_ && (this.sourceHandler_.dispose && this.sourceHandler_.dispose(), this.sourceHandler_ = null)
                    }
            },
            Ir.registerComponent("Tech", no),
            no.registerTech("Tech", no),
            no.defaultTechOrder_ = [];
        var ro = {},
            io = {
                buffered: 1,
                currentTime: 1,
                duration: 1,
                seekable: 1,
                played: 1
            },
            oo = {
                setCurrentTime: 1
            },
            so = function mh(t) {
                if (Array.isArray(t)) {
                    var e = [];
                    t.forEach(function (t) {
                        t = mh(t),
                            Array.isArray(t) ? e = e.concat(t) : a(t) && e.push(t)
                    }),
                        t = e
                } else t = "string" == typeof t && t.trim() ? [{
                    src: t
                }] : a(t) && "string" == typeof t.src && t.src && t.src.trim() ? [t] : [];
                return t
            },
            ao = function (t) {
                function e(n, r, i) {
                    qn(this, e);
                    var o = it({
                            createEl: !1
                        }, r),
                        s = Kn(this, t.call(this, n, o, i));
                    if (r.playerOptions.sources && 0 !== r.playerOptions.sources.length) n.src(r.playerOptions.sources);
                    else for (var a = 0, l = r.playerOptions.techOrder; a < l.length; a++) {
                        var c = nt(l[a]),
                            u = no.getTech(c);
                        if (c || (u = Ir.getComponent(c)), u && u.isSupported()) {
                            n.loadTech_(c);
                            break
                        }
                    }
                    return s
                }
                return Wn(e, t),
                    e
            }(Ir);
        Ir.registerComponent("MediaLoader", ao);
        var lo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.emitTapEvents(),
                    i.enable(),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div",
                        n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    n = s({
                        innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
                        className: this.buildCSSClass(),
                        tabIndex: 0
                    }, n),
                    "button" === e && tr.error("Creating a ClickableComponent with an HTML element of " + e + " is not supported; use a Button instead."),
                        r = s({
                            role: "button",
                            "aria-live": "polite"
                        }, r),
                        this.tabIndex_ = n.tabIndex;
                    var i = t.prototype.createEl.call(this, e, n, r);
                    return this.createControlTextEl(i),
                        i
                },
                e.prototype.dispose = function () {
                    this.controlTextEl_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.createControlTextEl = function (t) {
                    return this.controlTextEl_ = _("span", {
                        className: "vjs-control-text"
                    }),
                    t && t.appendChild(this.controlTextEl_),
                        this.controlText(this.controlText_, t),
                        this.controlTextEl_
                },
                e.prototype.controlText = function (t) {
                    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.el();
                    if (t === undefined) return this.controlText_ || "Need Text";
                    var n = this.localize(t);
                    this.controlText_ = t,
                        b(this.controlTextEl_, n),
                    this.nonIconControl || e.setAttribute("title", n)
                },
                e.prototype.buildCSSClass = function () {
                    return "vjs-control vjs-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.enable = function () {
                    this.enabled_ || (this.enabled_ = !0, this.removeClass("vjs-disabled"), this.el_.setAttribute("aria-disabled", "false"), "undefined" != typeof this.tabIndex_ && this.el_.setAttribute("tabIndex", this.tabIndex_), this.on(["tap", "click"], this.handleClick), this.on("focus", this.handleFocus), this.on("blur", this.handleBlur))
                },
                e.prototype.disable = function () {
                    this.enabled_ = !1,
                        this.addClass("vjs-disabled"),
                        this.el_.setAttribute("aria-disabled", "true"),
                    "undefined" != typeof this.tabIndex_ && this.el_.removeAttribute("tabIndex"),
                        this.off(["tap", "click"], this.handleClick),
                        this.off("focus", this.handleFocus),
                        this.off("blur", this.handleBlur)
                },
                e.prototype.handleClick = function (t) {},
                e.prototype.handleFocus = function (t) {
                    G(Ye, "keydown", vr(this, this.handleKeyPress))
                },
                e.prototype.handleKeyPress = function (e) {
                    32 === e.which || 13 === e.which ? (e.preventDefault(), this.trigger("click")) : t.prototype.handleKeyPress && t.prototype.handleKeyPress.call(this, e)
                },
                e.prototype.handleBlur = function (t) {
                    $(Ye, "keydown", vr(this, this.handleKeyPress))
                },
                e
        }(Ir);
        Ir.registerComponent("ClickableComponent", lo);
        var co = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.update(),
                    n.on("posterchange", vr(i, i.update)),
                    i
            }
            return Wn(e, t),
                e.prototype.dispose = function () {
                    this.player().off("posterchange", this.update),
                        t.prototype.dispose.call(this)
                },
                e.prototype.createEl = function () {
                    var t = _("div", {
                        className: "vjs-poster",
                        tabIndex: -1
                    });
                    if (!wn) {
                        this.fallbackImg_ = _("img");
                        var e = this.player().height() || parseInt(this.player().el().style.height);
                        this.player().width() || parseInt(this.player().el().style.width);
                        this.fallbackImg_.onload = function () {
                            this.width;
                            this.height > e && (this.style.maxHeight = e + "px", this.style.width = "auto")
                        };
                        var n = _("div"),
                            r = _("span");
                        r.appendChild(this.fallbackImg_),
                            n.appendChild(r),
                            t.appendChild(n)
                    }
                    return t
                },
                e.prototype.update = function (t) {
                    var e = this.player().poster();
                    this.setSrc(e),
                        e ? this.show() : this.hide()
                },
                e.prototype.setSrc = function (t) {
                    if (this.fallbackImg_) this.fallbackImg_.src = t;
                    else {
                        var e = "";
                        t && (e = 'url("' + t + '")'),
                            this.el_.style.backgroundImage = e
                    }
                },
                e.prototype.handleClick = function (t) {
                    this.player_.controls() && (this.player_.paused() ? this.player_.play() : this.player_.pause())
                },
                e
        }(lo);
        Ir.registerComponent("PosterImage", co);
        var uo = {
                monospace: "monospace",
                sansSerif: "sans-serif",
                serif: "serif",
                monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
                monospaceSerif: '"Courier New", monospace',
                proportionalSansSerif: "sans-serif",
                proportionalSerif: "serif",
                casual: '"Comic Sans MS", Impact, fantasy',
                script: '"Monotype Corsiva", cursive',
                smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
            },
            ho = function (t) {
                function e(n, r, i) {
                    qn(this, e);
                    var o = Kn(this, t.call(this, n, r, i));
                    return n.on("loadstart", vr(o, o.toggleDisplay)),
                        n.on("texttrackchange", vr(o, o.updateDisplay)),
                        n.on("loadstart", vr(o, o.preselectTrack)),
                        n.ready(vr(o, function () {
                            if (n.tech_ && n.tech_.featuresNativeTextTracks) return void this.hide();
                            n.on("fullscreenchange", vr(this, this.updateDisplay));
                            for (var t = this.options_.playerOptions.tracks || [], e = 0; e < t.length; e++) this.player_.addRemoteTextTrack(t[e], !0);
                            this.preselectTrack()
                        })),
                        o
                }
                return Wn(e, t),
                    e.prototype.preselectTrack = function () {
                        for (var t = {
                            captions: 1,
                            subtitles: 1
                        }, e = this.player_.textTracks(), n = this.player_.cache_.selectedLanguage, r = void 0, i = void 0, o = void 0, s = 0; s < e.length; s++) {
                            var a = e[s];
                            n && n.enabled && n.language === a.language ? a.kind === n.kind ? o = a : o || (o = a) : n && !n.enabled ? (o = null, r = null, i = null) : a["default"] && ("descriptions" !== a.kind || r ? a.kind in t && !i && (i = a) : r = a)
                        }
                        o ? o.mode = "showing" : i ? i.mode = "showing" : r && (r.mode = "showing")
                    },
                    e.prototype.toggleDisplay = function () {
                        this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show()
                    },
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-text-track-display"
                        }, {
                            "aria-live": "off",
                            "aria-atomic": "true"
                        })
                    },
                    e.prototype.clearDisplay = function () {
                        "function" == typeof Ke.WebVTT && Ke.WebVTT.processCues(Ke, [], this.el_)
                    },
                    e.prototype.updateDisplay = function () {
                        var t = this.player_.textTracks();
                        this.clearDisplay();
                        for (var e = null, n = null, r = t.length; r--;) {
                            var i = t[r];
                            "showing" === i.mode && ("descriptions" === i.kind ? e = i : n = i)
                        }
                        n ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(n)) : e && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(e))
                    },
                    e.prototype.updateForTrack = function (t) {
                        if ("function" == typeof Ke.WebVTT && t.activeCues) {
                            for (var e = this.player_.textTrackSettings.getValues(), n = [], r = 0; r < t.activeCues.length; r++) n.push(t.activeCues[r]);
                            Ke.WebVTT.processCues(Ke, n, this.el_);
                            for (var i = n.length; i--;) {
                                var o = n[i];
                                if (o) {
                                    var s = o.displayState;
                                    if (e.color && (s.firstChild.style.color = e.color), e.textOpacity && Zt(s.firstChild, "color", Jt(e.color || "#fff", e.textOpacity)), e.backgroundColor && (s.firstChild.style.backgroundColor = e.backgroundColor), e.backgroundOpacity && Zt(s.firstChild, "backgroundColor", Jt(e.backgroundColor || "#000", e.backgroundOpacity)), e.windowColor && (e.windowOpacity ? Zt(s, "backgroundColor", Jt(e.windowColor, e.windowOpacity)) : s.style.backgroundColor = e.windowColor), e.edgeStyle && ("dropshadow" === e.edgeStyle ? s.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === e.edgeStyle ? s.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === e.edgeStyle ? s.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === e.edgeStyle && (s.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")), e.fontPercent && 1 !== e.fontPercent) {
                                        var a = Ke.parseFloat(s.style.fontSize);
                                        s.style.fontSize = a * e.fontPercent + "px",
                                            s.style.height = "auto",
                                            s.style.top = "auto",
                                            s.style.bottom = "2px"
                                    }
                                    e.fontFamily && "default" !== e.fontFamily && ("small-caps" === e.fontFamily ? s.firstChild.style.fontVariant = "small-caps" : s.firstChild.style.fontFamily = uo[e.fontFamily])
                                }
                            }
                        }
                    },
                    e
            }(Ir);
        Ir.registerComponent("TextTrackDisplay", ho);
        var po = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-loading-spinner",
                        dir: "ltr"
                    })
                },
                e
        }(Ir);
        Ir.registerComponent("LoadingSpinner", po);
        var fo = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function (t) {
                    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    t = "button",
                        e = s({
                            innerHTML: '<span aria-hidden="true" class="vjs-icon-placeholder"></span>',
                            className: this.buildCSSClass()
                        }, e),
                        n = s({
                            type: "button",
                            "aria-live": "polite"
                        }, n);
                    var r = Ir.prototype.createEl.call(this, t, e, n);
                    return this.createControlTextEl(r),
                        r
                },
                e.prototype.addChild = function (t) {
                    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        n = this.constructor.name;
                    return tr.warn("Adding an actionable (user controllable) child to a Button (" + n + ") is not supported; use a ClickableComponent instead."),
                        Ir.prototype.addChild.call(this, t, e)
                },
                e.prototype.enable = function () {
                    t.prototype.enable.call(this),
                        this.el_.removeAttribute("disabled")
                },
                e.prototype.disable = function () {
                    t.prototype.disable.call(this),
                        this.el_.setAttribute("disabled", "disabled")
                },
                e.prototype.handleKeyPress = function (e) {
                    32 !== e.which && 13 !== e.which && t.prototype.handleKeyPress.call(this, e)
                },
                e
        }(lo);
        Ir.registerComponent("Button", fo);
        var yo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.mouseused_ = !1,
                    i.on("mousedown", i.handleMouseDown),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-big-play-button"
                },
                e.prototype.handleClick = function (t) {
                    var e = this.player_.play();
                    if (!(this.mouseused_ && t.clientX && t.clientY)) {
                        var n = this.player_.getChild("controlBar"),
                            r = n && n.getChild("playToggle");
                        if (!r) return void this.player_.focus();
                        var i = function () {
                            return r.focus()
                        };
                        dt(e) ? e.then(i, function () {}) : this.setTimeout(i, 1)
                    }
                },
                e.prototype.handleKeyPress = function (e) {
                    this.mouseused_ = !1,
                        t.prototype.handleKeyPress.call(this, e)
                },
                e.prototype.handleMouseDown = function (t) {
                    this.mouseused_ = !0
                },
                e
        }(fo);
        yo.prototype.controlText_ = "Play Video",
            Ir.registerComponent("BigPlayButton", yo);
        var go = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.controlText(r && r.controlText || i.localize("Close")),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-close-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.handleClick = function (t) {
                    this.trigger({
                        type: "close",
                        bubbles: !1
                    })
                },
                e
        }(fo);
        Ir.registerComponent("CloseButton", go);
        var vo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "play", i.handlePlay),
                    i.on(n, "pause", i.handlePause),
                    i.on(n, "ended", i.handleEnded),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-play-control " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.handleClick = function (t) {
                    this.player_.paused() ? this.player_.play() : this.player_.pause()
                },
                e.prototype.handleSeeked = function (t) {
                    this.removeClass("vjs-ended"),
                        this.player_.paused() ? this.handlePause(t) : this.handlePlay(t)
                },
                e.prototype.handlePlay = function (t) {
                    this.removeClass("vjs-ended"),
                        this.removeClass("vjs-paused"),
                        this.addClass("vjs-playing"),
                        this.controlText("Pause")
                },
                e.prototype.handlePause = function (t) {
                    this.removeClass("vjs-playing"),
                        this.addClass("vjs-paused"),
                        this.controlText("Play")
                },
                e.prototype.handleEnded = function (t) {
                    this.removeClass("vjs-playing"),
                        this.addClass("vjs-ended"),
                        this.controlText("Replay"),
                        this.one(this.player_, "seeked", this.handleSeeked)
                },
                e
        }(fo);
        vo.prototype.controlText_ = "Play",
            Ir.registerComponent("PlayToggle", vo);
        var mo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.throttledUpdateContent = mr(vr(i, i.updateContent), 25),
                    i.on(n, "timeupdate", i.throttledUpdateContent),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function (e) {
                    var n = this.buildCSSClass(),
                        r = t.prototype.createEl.call(this, "div", {
                            className: n + " vjs-time-control vjs-control"
                        });
                    return this.contentEl_ = _("div", {
                        className: n + "-display"
                    }, {
                        "aria-live": "off"
                    }, _("span", {
                        className: "vjs-control-text",
                        textContent: this.localize(this.controlText_)
                    })),
                        this.updateTextNode_(),
                        r.appendChild(this.contentEl_),
                        r
                },
                e.prototype.dispose = function () {
                    this.contentEl_ = null,
                        this.textNode_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.updateTextNode_ = function () {
                    if (this.contentEl_) {
                        for (; this.contentEl_.firstChild;) this.contentEl_.removeChild(this.contentEl_.firstChild);
                        this.textNode_ = Ye.createTextNode(this.formattedTime_ || "0:00"),
                            this.contentEl_.appendChild(this.textNode_)
                    }
                },
                e.prototype.formatTime_ = function (t) {
                    return te(t)
                },
                e.prototype.updateFormattedTime_ = function (t) {
                    var e = this.formatTime_(t);
                    e !== this.formattedTime_ && (this.formattedTime_ = e, this.requestAnimationFrame(this.updateTextNode_))
                },
                e.prototype.updateContent = function (t) {},
                e
        }(Ir);
        mo.prototype.controlText_ = "Time",
            Ir.registerComponent("TimeDisplay", mo);
        var _o = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "ended", i.handleEnded),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-current-time"
                },
                e.prototype.updateContent = function (t) {
                    var e = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
                    this.updateFormattedTime_(e)
                },
                e.prototype.handleEnded = function (t) {
                    this.player_.duration() && this.updateFormattedTime_(this.player_.duration())
                },
                e
        }(mo);
        _o.prototype.controlText_ = "Current Time",
            Ir.registerComponent("CurrentTimeDisplay", _o);
        var bo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "durationchange", i.updateContent),
                    i.on(n, "loadedmetadata", i.throttledUpdateContent),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-duration"
                },
                e.prototype.updateContent = function (t) {
                    var e = this.player_.duration();
                    e && this.duration_ !== e && (this.duration_ = e, this.updateFormattedTime_(e))
                },
                e
        }(mo);
        bo.prototype.controlText_ = "Duration Time",
            Ir.registerComponent("DurationDisplay", bo);
        var To = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-time-control vjs-time-divider",
                        innerHTML: "<div><span>/</span></div>"
                    })
                },
                e
        }(Ir);
        Ir.registerComponent("TimeDivider", To);
        var Co = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "durationchange", i.throttledUpdateContent),
                    i.on(n, "ended", i.handleEnded),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-remaining-time"
                },
                e.prototype.formatTime_ = function (e) {
                    return "-" + t.prototype.formatTime_.call(this, e)
                },
                e.prototype.updateContent = function (t) {
                    this.player_.duration() && (this.player_.remainingTimeDisplay ? this.updateFormattedTime_(this.player_.remainingTimeDisplay()) : this.updateFormattedTime_(this.player_.remainingTime()))
                },
                e.prototype.handleEnded = function (t) {
                    this.player_.duration() && this.updateFormattedTime_(0)
                },
                e
        }(mo);
        Co.prototype.controlText_ = "Remaining Time",
            Ir.registerComponent("RemainingTimeDisplay", Co);
        var Eo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.updateShowing(),
                    i.on(i.player(), "durationchange", i.updateShowing),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var e = t.prototype.createEl.call(this, "div", {
                        className: "vjs-live-control vjs-control"
                    });
                    return this.contentEl_ = _("div", {
                        className: "vjs-live-display",
                        innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")
                    }, {
                        "aria-live": "off"
                    }),
                        e.appendChild(this.contentEl_),
                        e
                },
                e.prototype.dispose = function () {
                    this.contentEl_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.updateShowing = function (t) {
                    this.player().duration() === Infinity ? this.show() : this.hide()
                },
                e
        }(Ir);
        Ir.registerComponent("LiveDisplay", Eo);
        var ko = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.bar = i.getChild(i.options_.barName),
                    i.vertical( !! i.options_.vertical),
                    i.enable(),
                    i
            }
            return Wn(e, t),
                e.prototype.enabled = function () {
                    return this.enabled_
                },
                e.prototype.enable = function () {
                    this.enabled() || (this.on("mousedown", this.handleMouseDown), this.on("touchstart", this.handleMouseDown), this.on("focus", this.handleFocus), this.on("blur", this.handleBlur), this.on("click", this.handleClick), this.on(this.player_, "controlsvisible", this.update), this.playerEvent && this.on(this.player_, this.playerEvent, this.update), this.removeClass("disabled"), this.setAttribute("tabindex", 0), this.enabled_ = !0)
                },
                e.prototype.disable = function () {
                    if (this.enabled()) {
                        var t = this.bar.el_.ownerDocument;
                        this.off("mousedown", this.handleMouseDown),
                            this.off("touchstart", this.handleMouseDown),
                            this.off("focus", this.handleFocus),
                            this.off("blur", this.handleBlur),
                            this.off("click", this.handleClick),
                            this.off(this.player_, "controlsvisible", this.update),
                            this.off(t, "mousemove", this.handleMouseMove),
                            this.off(t, "mouseup", this.handleMouseUp),
                            this.off(t, "touchmove", this.handleMouseMove),
                            this.off(t, "touchend", this.handleMouseUp),
                            this.removeAttribute("tabindex"),
                            this.addClass("disabled"),
                        this.playerEvent && this.off(this.player_, this.playerEvent, this.update),
                            this.enabled_ = !1
                    }
                },
                e.prototype.createEl = function (e) {
                    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    return n.className = n.className + " vjs-slider",
                        n = s({
                            tabIndex: 0
                        }, n),
                        r = s({
                            role: "slider",
                            "aria-valuenow": 0,
                            "aria-valuemin": 0,
                            "aria-valuemax": 100,
                            tabIndex: 0
                        }, r),
                        t.prototype.createEl.call(this, e, n, r)
                },
                e.prototype.handleMouseDown = function (t) {
                    var e = this.bar.el_.ownerDocument;
                    t.preventDefault(),
                        D(),
                        this.addClass("vjs-sliding"),
                        this.trigger("slideractive"),
                        this.on(e, "mousemove", this.handleMouseMove),
                        this.on(e, "mouseup", this.handleMouseUp),
                        this.on(e, "touchmove", this.handleMouseMove),
                        this.on(e, "touchend", this.handleMouseUp),
                        this.handleMouseMove(t)
                },
                e.prototype.handleMouseMove = function (t) {},
                e.prototype.handleMouseUp = function () {
                    var t = this.bar.el_.ownerDocument;
                    A(),
                        this.removeClass("vjs-sliding"),
                        this.trigger("sliderinactive"),
                        this.off(t, "mousemove", this.handleMouseMove),
                        this.off(t, "mouseup", this.handleMouseUp),
                        this.off(t, "touchmove", this.handleMouseMove),
                        this.off(t, "touchend", this.handleMouseUp),
                        this.update()
                },
                e.prototype.update = function () {
                    if (this.el_) {
                        var t = this.getPercent(),
                            e = this.bar;
                        if (e) {
                            ("number" != typeof t || t !== t || t < 0 || t === Infinity) && (t = 0);
                            var n = (100 * t).toFixed(2) + "%",
                                r = e.el().style;
                            return this.vertical() ? r.height = n : r.width = n,
                                t
                        }
                    }
                },
                e.prototype.calculateDistance = function (t) {
                    var e = O(this.el_, t);
                    return this.vertical() ? e.y : e.x
                },
                e.prototype.handleFocus = function () {
                    this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
                },
                e.prototype.handleKeyPress = function (t) {
                    37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepBack()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepForward())
                },
                e.prototype.handleBlur = function () {
                    this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress)
                },
                e.prototype.handleClick = function (t) {
                    t.stopImmediatePropagation(),
                        t.preventDefault()
                },
                e.prototype.vertical = function (t) {
                    if (t === undefined) return this.vertical_ || !1;
                    this.vertical_ = !! t,
                        this.vertical_ ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal")
                },
                e
        }(Ir);
        Ir.registerComponent("Slider", ko);
        var wo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.partEls_ = [],
                    i.on(n, "progress", i.update),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-load-progress",
                        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
                    })
                },
                e.prototype.dispose = function () {
                    this.partEls_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.update = function (t) {
                    var e = this.player_.buffered(),
                        n = this.player_.duration(),
                        r = this.player_.bufferedEnd(),
                        i = this.partEls_,
                        o = function (t, e) {
                            var n = t / e || 0;
                            return 100 * (n >= 1 ? 1 : n) + "%"
                        };
                    this.el_.style.width = o(r, n);
                    for (var s = 0; s < e.length; s++) {
                        var a = e.start(s),
                            l = e.end(s),
                            c = i[s];
                        c || (c = this.el_.appendChild(_()), i[s] = c),
                            c.style.left = o(a, r),
                            c.style.width = o(l - a, r)
                    }
                    for (var u = i.length; u > e.length; u--) this.el_.removeChild(i[u - 1]);
                    i.length = e.length
                },
                e
        }(Ir);
        Ir.registerComponent("LoadProgressBar", wo);
        var So = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-time-tooltip"
                    })
                },
                e.prototype.update = function (t, e, n) {
                    var r = R(this.el_),
                        i = R(this.player_.el()),
                        o = t.width * e;
                    if (i && r) {
                        var s = t.left - i.left + o,
                            a = t.width - o + (i.right - t.right),
                            l = r.width / 2;
                        s < l ? l += l - s : a < l && (l = a),
                            l < 0 ? l = 0 : l > r.width && (l = r.width),
                            this.el_.style.right = "-" + l + "px",
                            b(this.el_, n)
                    }
                },
                e
        }(Ir);
        Ir.registerComponent("TimeTooltip", So);
        var Po = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-play-progress vjs-slider-bar",
                        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                    })
                },
                e.prototype.update = function (t, e) {
                    var n = this;
                    this.rafId_ && this.cancelAnimationFrame(this.rafId_),
                        this.rafId_ = this.requestAnimationFrame(function () {
                            var r = n.player_.scrubbing() ? n.player_.getCache().currentTime : n.player_.currentTime(),
                                i = te(r, n.player_.duration()),
                                o = n.getChild("timeTooltip");
                            o && o.update(t, e, i)
                        })
                },
                e
        }(Ir);
        Po.prototype.options_ = {
            children: []
        },
        Tn && !(Tn > 8) || on || an || Po.prototype.options_.children.push("timeTooltip"),
            Ir.registerComponent("PlayProgressBar", Po);
        var xo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.update = mr(vr(i, i.update), 25),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-mouse-display"
                    })
                },
                e.prototype.update = function (t, e) {
                    var n = this;
                    this.rafId_ && this.cancelAnimationFrame(this.rafId_),
                        this.rafId_ = this.requestAnimationFrame(function () {
                            var r = n.player_.duration(),
                                i = te(e * r, r);
                            n.el_.style.left = t.width * e + "px",
                                n.getChild("timeTooltip").update(t, e, i)
                        })
                },
                e
        }(Ir);
        xo.prototype.options_ = {
            children: ["timeTooltip"]
        },
            Ir.registerComponent("MouseTimeDisplay", xo);
        var Io = 30,
            Mo = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.update = mr(vr(i, i.update), Io),
                        i.on(n, "timeupdate", i.update),
                        i.on(n, "ended", i.handleEnded),
                        i.updateInterval = null,
                        i.on(n, ["playing"], function () {
                            i.clearInterval(i.updateInterval),
                                i.updateInterval = i.setInterval(function () {
                                    i.requestAnimationFrame(function () {
                                        i.update()
                                    })
                                }, Io)
                        }),
                        i.on(n, ["ended", "pause", "waiting"], function () {
                            i.clearInterval(i.updateInterval)
                        }),
                        i.on(n, ["timeupdate", "ended"], i.update),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-progress-holder"
                        }, {
                            "aria-label": this.localize("Progress Bar")
                        })
                    },
                    e.prototype.update_ = function (t, e) {
                        var n = this.player_.duration();
                        this.el_.setAttribute("aria-valuenow", (100 * e).toFixed(2)),
                            this.el_.setAttribute("aria-valuetext", this.localize("progress bar timing: currentTime={1} duration={2}", [te(t, n), te(n, n)], "{1} of {2}")),
                            this.bar.update(R(this.el_), e)
                    },
                    e.prototype.update = function (e) {
                        var n = t.prototype.update.call(this);
                        return this.update_(this.getCurrentTime_(), n),
                            n
                    },
                    e.prototype.getCurrentTime_ = function () {
                        return this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime()
                    },
                    e.prototype.handleEnded = function (t) {
                        this.update_(this.player_.duration(), 1)
                    },
                    e.prototype.getPercent = function () {
                        var t = this.getCurrentTime_() / this.player_.duration();
                        return t >= 1 ? 1 : t
                    },
                    e.prototype.handleMouseDown = function (e) {
                        V(e) && (this.player_.scrubbing(!0), this.videoWasPlaying = !this.player_.paused(), this.player_.pause(), t.prototype.handleMouseDown.call(this, e))
                    },
                    e.prototype.handleMouseMove = function (t) {
                        if (V(t)) {
                            var e = this.calculateDistance(t) * this.player_.duration();
                            e === this.player_.duration() && (e -= .1),
                                this.player_.currentTime(e)
                        }
                    },
                    e.prototype.enable = function () {
                        t.prototype.enable.call(this);
                        var e = this.getChild("mouseTimeDisplay");
                        e && e.show()
                    },
                    e.prototype.disable = function () {
                        t.prototype.disable.call(this);
                        var e = this.getChild("mouseTimeDisplay");
                        e && e.hide()
                    },
                    e.prototype.handleMouseUp = function (e) {
                        t.prototype.handleMouseUp.call(this, e),
                            this.player_.scrubbing(!1),
                            this.player_.trigger({
                                type: "timeupdate",
                                target: this,
                                manuallyTriggered: !0
                            }),
                        this.videoWasPlaying && ft(this.player_.play())
                    },
                    e.prototype.stepForward = function () {
                        this.player_.currentTime(this.player_.currentTime() + 5)
                    },
                    e.prototype.stepBack = function () {
                        this.player_.currentTime(this.player_.currentTime() - 5)
                    },
                    e.prototype.handleAction = function (t) {
                        this.player_.paused() ? this.player_.play() : this.player_.pause()
                    },
                    e.prototype.handleKeyPress = function (e) {
                        32 === e.which || 13 === e.which ? (e.preventDefault(), this.handleAction(e)) : t.prototype.handleKeyPress && t.prototype.handleKeyPress.call(this, e)
                    },
                    e
            }(ko);
        Mo.prototype.options_ = {
            children: ["loadProgressBar", "playProgressBar"],
            barName: "playProgressBar"
        },
        Tn && !(Tn > 8) || on || an || Mo.prototype.options_.children.splice(1, 0, "mouseTimeDisplay"),
            Mo.prototype.playerEvent = "timeupdate",
            Ir.registerComponent("SeekBar", Mo);
        var Do = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.handleMouseMove = mr(vr(i, i.handleMouseMove), 25),
                    i.throttledHandleMouseSeek = mr(vr(i, i.handleMouseSeek), 25),
                    i.enable(),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-progress-control vjs-control"
                    })
                },
                e.prototype.handleMouseMove = function (t) {
                    var e = this.getChild("seekBar"),
                        n = e.getChild("mouseTimeDisplay"),
                        r = e.el(),
                        i = R(r),
                        o = O(r, t).x;
                    o > 1 ? o = 1 : o < 0 && (o = 0),
                    n && n.update(i, o)
                },
                e.prototype.handleMouseSeek = function (t) {
                    this.getChild("seekBar").handleMouseMove(t)
                },
                e.prototype.enabled = function () {
                    return this.enabled_
                },
                e.prototype.disable = function () {
                    this.children().forEach(function (t) {
                        return t.disable && t.disable()
                    }),
                    this.enabled() && (this.off(["mousedown", "touchstart"], this.handleMouseDown), this.off(this.el_, "mousemove", this.handleMouseMove), this.handleMouseUp(), this.addClass("disabled"), this.enabled_ = !1)
                },
                e.prototype.enable = function () {
                    this.children().forEach(function (t) {
                        return t.enable && t.enable()
                    }),
                    this.enabled() || (this.on(["mousedown", "touchstart"], this.handleMouseDown), this.on(this.el_, "mousemove", this.handleMouseMove), this.removeClass("disabled"), this.enabled_ = !0)
                },
                e.prototype.handleMouseDown = function (t) {
                    var e = this.el_.ownerDocument;
                    this.on(e, "mousemove", this.throttledHandleMouseSeek),
                        this.on(e, "touchmove", this.throttledHandleMouseSeek),
                        this.on(e, "mouseup", this.handleMouseUp),
                        this.on(e, "touchend", this.handleMouseUp)
                },
                e.prototype.handleMouseUp = function (t) {
                    var e = this.el_.ownerDocument;
                    this.off(e, "mousemove", this.throttledHandleMouseSeek),
                        this.off(e, "touchmove", this.throttledHandleMouseSeek),
                        this.off(e, "mouseup", this.handleMouseUp),
                        this.off(e, "touchend", this.handleMouseUp)
                },
                e
        }(Ir);
        Do.prototype.options_ = {
            children: ["seekBar"]
        },
            Ir.registerComponent("ProgressControl", Do);
        var Ao = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "fullscreenchange", i.handleFullscreenChange),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-fullscreen-control " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.handleFullscreenChange = function (t) {
                    this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen")
                },
                e.prototype.handleClick = function (t) {
                    this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen()
                },
                e
        }(fo);
        Ao.prototype.controlText_ = "Fullscreen",
            Ir.registerComponent("FullscreenToggle", Ao);
        var Ro = function (t, e) {
                !e.tech_ || e.tech_.featuresVolumeControl || e.tech_.featuresMuteControl ? e.tech_ && e.tech_.featuresVolumeControl && t.addClass("enable-volume-control") : t.addClass("vjs-hidden"),
                    t.on(e, "loadstart", function () {
                        e.tech_.featuresVolumeControl || e.tech_.featuresMuteControl ? e.tech_.featuresVolumeControl && (t.removeClass("vjs-hidden"), t.addClass("enable-volume-control")) : t.addClass("vjs-hidden")
                    })
            },
            jo = function (t) {
                function e() {
                    return qn(this, e),
                        Kn(this, t.apply(this, arguments))
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-volume-level",
                            innerHTML: '<span class="vjs-control-text"></span>'
                        })
                    },
                    e
            }(Ir);
        Ir.registerComponent("VolumeLevel", jo);
        var Oo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on("slideractive", i.updateLastVolume_),
                    i.on(n, "volumechange", i.updateARIAAttributes),
                    n.ready(function () {
                        return i.updateARIAAttributes()
                    }),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-volume-bar vjs-slider-bar"
                    }, {
                        "aria-label": this.localize("Volume Level"),
                        "aria-live": "polite"
                    })
                },
                e.prototype.handleMouseDown = function (e) {
                    V(e) && t.prototype.handleMouseDown.call(this, e)
                },
                e.prototype.handleMouseMove = function (t) {
                    V(t) && (this.checkMuted(), this.player_.volume(this.calculateDistance(t)))
                },
                e.prototype.checkMuted = function () {
                    this.player_.muted() && this.player_.muted(!1)
                },
                e.prototype.getPercent = function () {
                    return this.player_.muted() ? 0 : this.player_.volume()
                },
                e.prototype.stepForward = function () {
                    this.checkMuted(),
                        this.player_.volume(this.player_.volume() + .1)
                },
                e.prototype.stepBack = function () {
                    this.checkMuted(),
                        this.player_.volume(this.player_.volume() - .1)
                },
                e.prototype.updateARIAAttributes = function (t) {
                    var e = this.player_.muted() ? 0 : this.volumeAsPercentage_();
                    this.el_.setAttribute("aria-valuenow", e),
                        this.el_.setAttribute("aria-valuetext", e + "%")
                },
                e.prototype.volumeAsPercentage_ = function () {
                    return Math.round(100 * this.player_.volume())
                },
                e.prototype.updateLastVolume_ = function () {
                    var t = this,
                        e = this.player_.volume();
                    this.one("sliderinactive", function () {
                        0 === t.player_.volume() && t.player_.lastVolume_(e)
                    })
                },
                e
        }(ko);
        Oo.prototype.options_ = {
            children: ["volumeLevel"],
            barName: "volumeLevel"
        },
            Oo.prototype.playerEvent = "volumechange",
            Ir.registerComponent("VolumeBar", Oo);
        var Lo = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                qn(this, e),
                    r.vertical = r.vertical || !1,
                ("undefined" == typeof r.volumeBar || l(r.volumeBar)) && (r.volumeBar = r.volumeBar || {}, r.volumeBar.vertical = r.vertical);
                var i = Kn(this, t.call(this, n, r));
                return Ro(i, n),
                    i.throttledHandleMouseMove = mr(vr(i, i.handleMouseMove), 25),
                    i.on("mousedown", i.handleMouseDown),
                    i.on("touchstart", i.handleMouseDown),
                    i.on(i.volumeBar, ["focus", "slideractive"], function () {
                        i.volumeBar.addClass("vjs-slider-active"),
                            i.addClass("vjs-slider-active"),
                            i.trigger("slideractive")
                    }),
                    i.on(i.volumeBar, ["blur", "sliderinactive"], function () {
                        i.volumeBar.removeClass("vjs-slider-active"),
                            i.removeClass("vjs-slider-active"),
                            i.trigger("sliderinactive")
                    }),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var e = "vjs-volume-horizontal";
                    return this.options_.vertical && (e = "vjs-volume-vertical"),
                        t.prototype.createEl.call(this, "div", {
                            className: "vjs-volume-control vjs-control " + e
                        })
                },
                e.prototype.handleMouseDown = function (t) {
                    var e = this.el_.ownerDocument;
                    this.on(e, "mousemove", this.throttledHandleMouseMove),
                        this.on(e, "touchmove", this.throttledHandleMouseMove),
                        this.on(e, "mouseup", this.handleMouseUp),
                        this.on(e, "touchend", this.handleMouseUp)
                },
                e.prototype.handleMouseUp = function (t) {
                    var e = this.el_.ownerDocument;
                    this.off(e, "mousemove", this.throttledHandleMouseMove),
                        this.off(e, "touchmove", this.throttledHandleMouseMove),
                        this.off(e, "mouseup", this.handleMouseUp),
                        this.off(e, "touchend", this.handleMouseUp)
                },
                e.prototype.handleMouseMove = function (t) {
                    this.volumeBar.handleMouseMove(t)
                },
                e
        }(Ir);
        Lo.prototype.options_ = {
            children: ["volumeBar"]
        },
            Ir.registerComponent("VolumeControl", Lo);
        var No = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return Ro(i, n),
                    i.on(n, ["loadstart", "volumechange"], i.update),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-mute-control " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.handleClick = function (t) {
                    var e = this.player_.volume(),
                        n = this.player_.lastVolume_();
                    if (0 === e) {
                        var r = n < .1 ? .1 : n;
                        this.player_.volume(r),
                            this.player_.muted(!1)
                    } else this.player_.muted(!this.player_.muted())
                },
                e.prototype.update = function (t) {
                    this.updateIcon_(),
                        this.updateControlText_()
                },
                e.prototype.updateIcon_ = function () {
                    var t = this.player_.volume(),
                        e = 3;
                    0 === t || this.player_.muted() ? e = 0 : t < .33 ? e = 1 : t < .67 && (e = 2);
                    for (var n = 0; n < 4; n++) k(this.el_, "vjs-vol-" + n);
                    E(this.el_, "vjs-vol-" + e)
                },
                e.prototype.updateControlText_ = function () {
                    var t = this.player_.muted() || 0 === this.player_.volume(),
                        e = t ? "Unmute" : "Mute";
                    this.controlText() !== e && this.controlText(e)
                },
                e
        }(fo);
        No.prototype.controlText_ = "Mute",
            Ir.registerComponent("MuteToggle", No);
        var Bo = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                qn(this, e),
                    "undefined" != typeof r.inline ? r.inline = r.inline : r.inline = !0,
                ("undefined" == typeof r.volumeControl || l(r.volumeControl)) && (r.volumeControl = r.volumeControl || {}, r.volumeControl.vertical = !r.inline);
                var i = Kn(this, t.call(this, n, r));
                return Ro(i, n),
                    i.on(i.volumeControl, ["slideractive"], i.sliderActive_),
                    i.on(i.muteToggle, "focus", i.sliderActive_),
                    i.on(i.volumeControl, ["sliderinactive"], i.sliderInactive_),
                    i.on(i.muteToggle, "blur", i.sliderInactive_),
                    i
            }
            return Wn(e, t),
                e.prototype.sliderActive_ = function () {
                    this.addClass("vjs-slider-active")
                },
                e.prototype.sliderInactive_ = function () {
                    this.removeClass("vjs-slider-active")
                },
                e.prototype.createEl = function () {
                    var e = "vjs-volume-panel-horizontal";
                    return this.options_.inline || (e = "vjs-volume-panel-vertical"),
                        t.prototype.createEl.call(this, "div", {
                            className: "vjs-volume-panel vjs-control " + e
                        })
                },
                e
        }(Ir);
        Bo.prototype.options_ = {
            children: ["muteToggle", "volumeControl"]
        },
            Ir.registerComponent("VolumePanel", Bo);
        var Fo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return r && (i.menuButton_ = r.menuButton),
                    i.focusedChild_ = -1,
                    i.on("keydown", i.handleKeyPress),
                    i
            }
            return Wn(e, t),
                e.prototype.addItem = function (t) {
                    this.addChild(t),
                        t.on("click", vr(this, function (e) {
                            this.menuButton_ && (this.menuButton_.unpressButton(), "CaptionSettingsMenuItem" !== t.name() && this.menuButton_.focus())
                        }))
                },
                e.prototype.createEl = function () {
                    var e = this.options_.contentElType || "ul";
                    this.contentEl_ = _(e, {
                        className: "vjs-menu-content"
                    }),
                        this.contentEl_.setAttribute("role", "menu");
                    var n = t.prototype.createEl.call(this, "div", {
                        append: this.contentEl_,
                        className: "vjs-menu"
                    });
                    return n.appendChild(this.contentEl_),
                        G(n, "click", function (t) {
                            t.preventDefault(),
                                t.stopImmediatePropagation()
                        }),
                        n
                },
                e.prototype.dispose = function () {
                    this.contentEl_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.handleKeyPress = function (t) {
                    37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepForward()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepBack())
                },
                e.prototype.stepForward = function () {
                    var t = 0;
                    this.focusedChild_ !== undefined && (t = this.focusedChild_ + 1),
                        this.focus(t)
                },
                e.prototype.stepBack = function () {
                    var t = 0;
                    this.focusedChild_ !== undefined && (t = this.focusedChild_ - 1),
                        this.focus(t)
                },
                e.prototype.focus = function () {
                    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0,
                        e = this.children().slice();
                    e.length && e[0].className && /vjs-menu-title/.test(e[0].className) && e.shift(),
                    e.length > 0 && (t < 0 ? t = 0 : t >= e.length && (t = e.length - 1), this.focusedChild_ = t, e[t].el_.focus())
                },
                e
        }(Ir);
        Ir.registerComponent("Menu", Fo);
        var Ho = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                i.menuButton_ = new fo(n, r),
                    i.menuButton_.controlText(i.controlText_),
                    i.menuButton_.el_.setAttribute("aria-haspopup", "true");
                var o = fo.prototype.buildCSSClass();
                return i.menuButton_.el_.className = i.buildCSSClass() + " " + o,
                    i.menuButton_.removeClass("vjs-control"),
                    i.addChild(i.menuButton_),
                    i.update(),
                    i.enabled_ = !0,
                    i.on(i.menuButton_, "tap", i.handleClick),
                    i.on(i.menuButton_, "click", i.handleClick),
                    i.on(i.menuButton_, "focus", i.handleFocus),
                    i.on(i.menuButton_, "blur", i.handleBlur),
                    i.on("keydown", i.handleSubmenuKeyPress),
                    i
            }
            return Wn(e, t),
                e.prototype.update = function () {
                    var t = this.createMenu();
                    this.menu && (this.menu.dispose(), this.removeChild(this.menu)),
                        this.menu = t,
                        this.addChild(t),
                        this.buttonPressed_ = !1,
                        this.menuButton_.el_.setAttribute("aria-expanded", "false"),
                        this.items && this.items.length <= this.hideThreshold_ ? this.hide() : this.show()
                },
                e.prototype.createMenu = function () {
                    var t = new Fo(this.player_, {
                        menuButton: this
                    });
                    if (this.hideThreshold_ = 0, this.options_.title) {
                        var e = _("li", {
                            className: "vjs-menu-title",
                            innerHTML: nt(this.options_.title),
                            tabIndex: -1
                        });
                        this.hideThreshold_ += 1,
                            t.children_.unshift(e),
                            T(e, t.contentEl())
                    }
                    if (this.items = this.createItems(), this.items) for (var n = 0; n < this.items.length; n++) t.addItem(this.items[n]);
                    return t
                },
                e.prototype.createItems = function () {},
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: this.buildWrapperCSSClass()
                    }, {})
                },
                e.prototype.buildWrapperCSSClass = function () {
                    var e = "vjs-menu-button";
                    return !0 === this.options_.inline ? e += "-inline" : e += "-popup",
                    "vjs-menu-button " + e + " " + fo.prototype.buildCSSClass() + " " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildCSSClass = function () {
                    var e = "vjs-menu-button";
                    return !0 === this.options_.inline ? e += "-inline" : e += "-popup",
                    "vjs-menu-button " + e + " " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.controlText = function (t) {
                    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.menuButton_.el();
                    return this.menuButton_.controlText(t, e)
                },
                e.prototype.handleClick = function (t) {
                    this.one(this.menu.contentEl(), "mouseleave", vr(this, function (t) {
                        this.unpressButton(),
                            this.el_.blur()
                    })),
                        this.buttonPressed_ ? this.unpressButton() : this.pressButton()
                },
                e.prototype.focus = function () {
                    this.menuButton_.focus()
                },
                e.prototype.blur = function () {
                    this.menuButton_.blur()
                },
                e.prototype.handleFocus = function () {
                    G(Ye, "keydown", vr(this, this.handleKeyPress))
                },
                e.prototype.handleBlur = function () {
                    $(Ye, "keydown", vr(this, this.handleKeyPress))
                },
                e.prototype.handleKeyPress = function (t) {
                    27 === t.which || 9 === t.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== t.which && (t.preventDefault(), this.menuButton_.el_.focus())) : 38 !== t.which && 40 !== t.which || this.buttonPressed_ || (this.pressButton(), t.preventDefault())
                },
                e.prototype.handleSubmenuKeyPress = function (t) {
                    27 !== t.which && 9 !== t.which || (this.buttonPressed_ && this.unpressButton(), 9 !== t.which && (t.preventDefault(), this.menuButton_.el_.focus()))
                },
                e.prototype.pressButton = function () {
                    if (this.enabled_) {
                        if (this.buttonPressed_ = !0, this.menu.lockShowing(), this.menuButton_.el_.setAttribute("aria-expanded", "true"), on && v()) return;
                        this.menu.focus()
                    }
                },
                e.prototype.unpressButton = function () {
                    this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.menuButton_.el_.setAttribute("aria-expanded", "false"))
                },
                e.prototype.disable = function () {
                    this.unpressButton(),
                        this.enabled_ = !1,
                        this.addClass("vjs-disabled"),
                        this.menuButton_.disable()
                },
                e.prototype.enable = function () {
                    this.enabled_ = !0,
                        this.removeClass("vjs-disabled"),
                        this.menuButton_.enable()
                },
                e
        }(Ir);
        Ir.registerComponent("MenuButton", Ho);
        var Vo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = r.tracks,
                    o = Kn(this, t.call(this, n, r));
                if (o.items.length <= 1 && o.hide(), !i) return Kn(o);
                var s = vr(o, o.update);
                return i.addEventListener("removetrack", s),
                    i.addEventListener("addtrack", s),
                    o.player_.on("ready", s),
                    o.player_.on("dispose", function () {
                        i.removeEventListener("removetrack", s),
                            i.removeEventListener("addtrack", s)
                    }),
                    o
            }
            return Wn(e, t),
                e
        }(Ho);
        Ir.registerComponent("TrackButton", Vo);
        var Uo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.selectable = r.selectable,
                    i.selected(r.selected),
                    i.selectable ? i.el_.setAttribute("role", "menuitemcheckbox") : i.el_.setAttribute("role", "menuitem"),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function (e, n, r) {
                    return this.nonIconControl = !0,
                        t.prototype.createEl.call(this, "li", s({
                            className: "vjs-menu-item",
                            innerHTML: '<span class="vjs-menu-item-text">' + this.localize(this.options_.label) + "</span>",
                            tabIndex: -1
                        }, n), r)
                },
                e.prototype.handleClick = function (t) {
                    this.selected(!0)
                },
                e.prototype.selected = function (t) {
                    this.selectable && (t ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText("")))
                },
                e
        }(lo);
        Ir.registerComponent("MenuItem", Uo);
        var zo = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = r.track,
                    o = n.textTracks();
                r.label = i.label || i.language || "Unknown",
                    r.selected = "showing" === i.mode;
                var s = Kn(this, t.call(this, n, r));
                s.track = i;
                var a = function () {
                        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        s.handleTracksChange.apply(s, e)
                    },
                    l = function () {
                        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        s.handleSelectedLanguageChange.apply(s, e)
                    };
                if (n.on(["loadstart", "texttrackchange"], a), o.addEventListener("change", a), o.addEventListener("selectedlanguagechange", l), s.on("dispose", function () {
                    n.off(["loadstart", "texttrackchange"], a),
                        o.removeEventListener("change", a),
                        o.removeEventListener("selectedlanguagechange", l)
                }), o.onchange === undefined) {
                    var c = void 0;
                    s.on(["tap", "click"], function () {
                        if ("object" !== zn(Ke.Event)) try {
                            c = new Ke.Event("change")
                        } catch (t) {}
                        c || (c = Ye.createEvent("Event"), c.initEvent("change", !0, !0)),
                            o.dispatchEvent(c)
                    })
                }
                return s.handleTracksChange(),
                    s
            }
            return Wn(e, t),
                e.prototype.handleClick = function (e) {
                    var n = this.track.kind,
                        r = this.track.kinds,
                        i = this.player_.textTracks();
                    if (r || (r = [n]), t.prototype.handleClick.call(this, e), i) for (var o = 0; o < i.length; o++) {
                        var s = i[o];
                        s === this.track && r.indexOf(s.kind) > -1 ? "showing" !== s.mode && (s.mode = "showing") : "disabled" !== s.mode && (s.mode = "disabled")
                    }
                },
                e.prototype.handleTracksChange = function (t) {
                    this.selected("showing" === this.track.mode)
                },
                e.prototype.handleSelectedLanguageChange = function (t) {
                    if ("showing" === this.track.mode) {
                        var e = this.player_.cache_.selectedLanguage;
                        if (e && e.enabled && e.language === this.track.language && e.kind !== this.track.kind) return;
                        this.player_.cache_.selectedLanguage = {
                            enabled: !0,
                            language: this.track.language,
                            kind: this.track.kind
                        }
                    }
                },
                e.prototype.dispose = function () {
                    this.track = null,
                        t.prototype.dispose.call(this)
                },
                e
        }(Uo);
        Ir.registerComponent("TextTrackMenuItem", zo);
        var qo = function (t) {
            function e(n, r) {
                return qn(this, e),
                    r.track = {
                        player: n,
                        kind: r.kind,
                        kinds: r.kinds,
                        "default": !1,
                        mode: "disabled"
                    },
                r.kinds || (r.kinds = [r.kind]),
                    r.label ? r.track.label = r.label : r.track.label = r.kinds.join(" and ") + " off",
                    r.selectable = !0,
                    Kn(this, t.call(this, n, r))
            }
            return Wn(e, t),
                e.prototype.handleTracksChange = function (t) {
                    for (var e = this.player().textTracks(), n = !0, r = 0, i = e.length; r < i; r++) {
                        var o = e[r];
                        if (this.options_.kinds.indexOf(o.kind) > -1 && "showing" === o.mode) {
                            n = !1;
                            break
                        }
                    }
                    this.selected(n)
                },
                e.prototype.handleSelectedLanguageChange = function (t) {
                    for (var e = this.player().textTracks(), n = !0, r = 0, i = e.length; r < i; r++) {
                        var o = e[r];
                        if (["captions", "descriptions", "subtitles"].indexOf(o.kind) > -1 && "showing" === o.mode) {
                            n = !1;
                            break
                        }
                    }
                    n && (this.player_.cache_.selectedLanguage = {
                        enabled: !1
                    })
                },
                e
        }(zo);
        Ir.registerComponent("OffTextTrackMenuItem", qo);
        var Wo = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return qn(this, e),
                    r.tracks = n.textTracks(),
                    Kn(this, t.call(this, n, r))
            }
            return Wn(e, t),
                e.prototype.createItems = function () {
                    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
                        e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : zo,
                        n = void 0;
                    this.label_ && (n = this.label_ + " off"),
                        t.push(new qo(this.player_, {
                            kinds: this.kinds_,
                            kind: this.kind_,
                            label: n
                        })),
                        this.hideThreshold_ += 1;
                    var r = this.player_.textTracks();
                    Array.isArray(this.kinds_) || (this.kinds_ = [this.kind_]);
                    for (var i = 0; i < r.length; i++) {
                        var o = r[i];
                        if (this.kinds_.indexOf(o.kind) > -1) {
                            var s = new e(this.player_, {
                                track: o,
                                selectable: !0
                            });
                            s.addClass("vjs-" + o.kind + "-menu-item"),
                                t.push(s)
                        }
                    }
                    return t
                },
                e
        }(Vo);
        Ir.registerComponent("TextTrackButton", Wo);
        var Ko = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = r.track,
                    o = r.cue,
                    s = n.currentTime();
                r.selectable = !0,
                    r.label = o.text,
                    r.selected = o.startTime <= s && s < o.endTime;
                var a = Kn(this, t.call(this, n, r));
                return a.track = i,
                    a.cue = o,
                    i.addEventListener("cuechange", vr(a, a.update)),
                    a
            }
            return Wn(e, t),
                e.prototype.handleClick = function (e) {
                    t.prototype.handleClick.call(this),
                        this.player_.currentTime(this.cue.startTime),
                        this.update(this.cue.startTime)
                },
                e.prototype.update = function (t) {
                    var e = this.cue,
                        n = this.player_.currentTime();
                    this.selected(e.startTime <= n && n < e.endTime)
                },
                e
        }(Uo);
        Ir.registerComponent("ChaptersTrackMenuItem", Ko);
        var Xo = function (t) {
            function e(n, r, i) {
                return qn(this, e),
                    Kn(this, t.call(this, n, r, i))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-chapters-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-chapters-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e.prototype.update = function (e) {
                    this.track_ && (!e || "addtrack" !== e.type && "removetrack" !== e.type) || this.setTrack(this.findChaptersTrack()),
                        t.prototype.update.call(this)
                },
                e.prototype.setTrack = function (t) {
                    if (this.track_ !== t) {
                        if (this.updateHandler_ || (this.updateHandler_ = this.update.bind(this)), this.track_) {
                            var e = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                            e && e.removeEventListener("load", this.updateHandler_),
                                this.track_ = null
                        }
                        if (this.track_ = t, this.track_) {
                            this.track_.mode = "hidden";
                            var n = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
                            n && n.addEventListener("load", this.updateHandler_)
                        }
                    }
                },
                e.prototype.findChaptersTrack = function () {
                    for (var t = this.player_.textTracks() || [], e = t.length - 1; e >= 0; e--) {
                        var n = t[e];
                        if (n.kind === this.kind_) return n
                    }
                },
                e.prototype.getMenuCaption = function () {
                    return this.track_ && this.track_.label ? this.track_.label : this.localize(nt(this.kind_))
                },
                e.prototype.createMenu = function () {
                    return this.options_.title = this.getMenuCaption(),
                        t.prototype.createMenu.call(this)
                },
                e.prototype.createItems = function () {
                    var t = [];
                    if (!this.track_) return t;
                    var e = this.track_.cues;
                    if (!e) return t;
                    for (var n = 0, r = e.length; n < r; n++) {
                        var i = e[n],
                            o = new Ko(this.player_, {
                                track: this.track_,
                                cue: i
                            });
                        t.push(o)
                    }
                    return t
                },
                e
        }(Wo);
        Xo.prototype.kind_ = "chapters",
            Xo.prototype.controlText_ = "Chapters",
            Ir.registerComponent("ChaptersButton", Xo);
        var Qo = function (t) {
            function e(n, r, i) {
                qn(this, e);
                var o = Kn(this, t.call(this, n, r, i)),
                    s = n.textTracks(),
                    a = vr(o, o.handleTracksChange);
                return s.addEventListener("change", a),
                    o.on("dispose", function () {
                        s.removeEventListener("change", a)
                    }),
                    o
            }
            return Wn(e, t),
                e.prototype.handleTracksChange = function (t) {
                    for (var e = this.player().textTracks(), n = !1, r = 0, i = e.length; r < i; r++) {
                        var o = e[r];
                        if (o.kind !== this.kind_ && "showing" === o.mode) {
                            n = !0;
                            break
                        }
                    }
                    n ? this.disable() : this.enable()
                },
                e.prototype.buildCSSClass = function () {
                    return "vjs-descriptions-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-descriptions-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e
        }(Wo);
        Qo.prototype.kind_ = "descriptions",
            Qo.prototype.controlText_ = "Descriptions",
            Ir.registerComponent("DescriptionsButton", Qo);
        var Go = function (t) {
            function e(n, r, i) {
                return qn(this, e),
                    Kn(this, t.call(this, n, r, i))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-subtitles-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-subtitles-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e
        }(Wo);
        Go.prototype.kind_ = "subtitles",
            Go.prototype.controlText_ = "Subtitles",
            Ir.registerComponent("SubtitlesButton", Go);
        var $o = function (t) {
            function e(n, r) {
                qn(this, e),
                    r.track = {
                        player: n,
                        kind: r.kind,
                        label: r.kind + " settings",
                        selectable: !1,
                        "default": !1,
                        mode: "disabled"
                    },
                    r.selectable = !1,
                    r.name = "CaptionSettingsMenuItem";
                var i = Kn(this, t.call(this, n, r));
                return i.addClass("vjs-texttrack-settings"),
                    i.controlText(", opens " + r.kind + " settings dialog"),
                    i
            }
            return Wn(e, t),
                e.prototype.handleClick = function (t) {
                    this.player().getChild("textTrackSettings").open()
                },
                e
        }(zo);
        Ir.registerComponent("CaptionSettingsMenuItem", $o);
        var Yo = function (t) {
            function e(n, r, i) {
                return qn(this, e),
                    Kn(this, t.call(this, n, r, i))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-captions-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-captions-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e.prototype.createItems = function () {
                    var e = [];
                    return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || (e.push(new $o(this.player_, {
                        kind: this.kind_
                    })), this.hideThreshold_ += 1),
                        t.prototype.createItems.call(this, e)
                },
                e
        }(Wo);
        Yo.prototype.kind_ = "captions",
            Yo.prototype.controlText_ = "Captions",
            Ir.registerComponent("CaptionsButton", Yo);
        var Jo = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function (e, n, r) {
                    var i = '<span class="vjs-menu-item-text">' + this.localize(this.options_.label);
                    return "captions" === this.options_.track.kind && (i += '\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> ' + this.localize("Captions") + "</span>\n      "),
                        i += "</span>",
                        t.prototype.createEl.call(this, e, s({
                            innerHTML: i
                        }, n), r)
                },
                e
        }(zo);
        Ir.registerComponent("SubsCapsMenuItem", Jo);
        var Zo = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.label_ = "subtitles",
                ["en", "en-us", "en-ca", "fr-ca"].indexOf(i.player_.language_) > -1 && (i.label_ = "captions"),
                    i.menuButton_.controlText(nt(i.label_)),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-subs-caps-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-subs-caps-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e.prototype.createItems = function () {
                    var e = [];
                    return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || (e.push(new $o(this.player_, {
                        kind: this.label_
                    })), this.hideThreshold_ += 1),
                        e = t.prototype.createItems.call(this, e, Jo)
                },
                e
        }(Wo);
        Zo.prototype.kinds_ = ["captions", "subtitles"],
            Zo.prototype.controlText_ = "Subtitles",
            Ir.registerComponent("SubsCapsButton", Zo);
        var ts = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = r.track,
                    o = n.audioTracks();
                r.label = i.label || i.language || "Unknown",
                    r.selected = i.enabled;
                var s = Kn(this, t.call(this, n, r));
                s.track = i;
                var a = function () {
                    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    s.handleTracksChange.apply(s, e)
                };
                return o.addEventListener("change", a),
                    s.on("dispose", function () {
                        o.removeEventListener("change", a)
                    }),
                    s
            }
            return Wn(e, t),
                e.prototype.handleClick = function (e) {
                    var n = this.player_.audioTracks();
                    t.prototype.handleClick.call(this, e);
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        i.enabled = i === this.track
                    }
                },
                e.prototype.handleTracksChange = function (t) {
                    this.selected(this.track.enabled)
                },
                e
        }(Uo);
        Ir.registerComponent("AudioTrackMenuItem", ts);
        var es = function (t) {
            function e(n) {
                var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return qn(this, e),
                    r.tracks = n.audioTracks(),
                    Kn(this, t.call(this, n, r))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-audio-button " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-audio-button " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e.prototype.createItems = function () {
                    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                    this.hideThreshold_ = 1;
                    for (var e = this.player_.audioTracks(), n = 0; n < e.length; n++) {
                        var r = e[n];
                        t.push(new ts(this.player_, {
                            track: r,
                            selectable: !0
                        }))
                    }
                    return t
                },
                e
        }(Vo);
        es.prototype.controlText_ = "Audio Track",
            Ir.registerComponent("AudioTrackButton", es);
        var ns = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = r.rate,
                    o = parseFloat(i, 10);
                r.label = i,
                    r.selected = 1 === o,
                    r.selectable = !0;
                var s = Kn(this, t.call(this, n, r));
                return s.label = i,
                    s.rate = o,
                    s.on(n, "ratechange", s.update),
                    s
            }
            return Wn(e, t),
                e.prototype.handleClick = function (e) {
                    t.prototype.handleClick.call(this),
                        this.player().playbackRate(this.rate)
                },
                e.prototype.update = function (t) {
                    this.selected(this.player().playbackRate() === this.rate)
                },
                e
        }(Uo);
        ns.prototype.contentElType = "button",
            Ir.registerComponent("PlaybackRateMenuItem", ns);
        var rs = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.updateVisibility(),
                    i.updateLabel(),
                    i.on(n, "loadstart", i.updateVisibility),
                    i.on(n, "ratechange", i.updateLabel),
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var e = t.prototype.createEl.call(this);
                    return this.labelEl_ = _("div", {
                        className: "vjs-playback-rate-value",
                        innerHTML: "1x"
                    }),
                        e.appendChild(this.labelEl_),
                        e
                },
                e.prototype.dispose = function () {
                    this.labelEl_ = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.buildCSSClass = function () {
                    return "vjs-playback-rate " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.buildWrapperCSSClass = function () {
                    return "vjs-playback-rate " + t.prototype.buildWrapperCSSClass.call(this)
                },
                e.prototype.createMenu = function () {
                    var t = new Fo(this.player()),
                        e = this.playbackRates();
                    if (e) for (var n = e.length - 1; n >= 0; n--) t.addChild(new ns(this.player(), {
                        rate: e[n] + "x"
                    }));
                    return t
                },
                e.prototype.updateARIAAttributes = function () {
                    this.el().setAttribute("aria-valuenow", this.player().playbackRate())
                },
                e.prototype.handleClick = function (t) {
                    for (var e = this.player().playbackRate(), n = this.playbackRates(), r = n[0], i = 0; i < n.length; i++) if (n[i] > e) {
                        r = n[i];
                        break
                    }
                    this.player().playbackRate(r)
                },
                e.prototype.playbackRates = function () {
                    return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates
                },
                e.prototype.playbackRateSupported = function () {
                    return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && this.playbackRates().length > 0
                },
                e.prototype.updateVisibility = function (t) {
                    this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
                },
                e.prototype.updateLabel = function (t) {
                    this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
                },
                e
        }(Ho);
        rs.prototype.controlText_ = "Playback Rate",
            Ir.registerComponent("PlaybackRateMenuButton", rs);
        var is = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-spacer " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: this.buildCSSClass()
                    })
                },
                e
        }(Ir);
        Ir.registerComponent("Spacer", is);
        var os = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-custom-control-spacer " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.createEl = function () {
                    var e = t.prototype.createEl.call(this, {
                        className: this.buildCSSClass()
                    });
                    return e.innerHTML = " ",
                        e
                },
                e
        }(is);
        Ir.registerComponent("CustomControlSpacer", os);
        var ss = function (t) {
            function e() {
                return qn(this, e),
                    Kn(this, t.apply(this, arguments))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-control-bar",
                        dir: "ltr"
                    }, {
                        role: "group"
                    })
                },
                e
        }(Ir);
        ss.prototype.options_ = {
            children: ["playToggle", "volumePanel", "currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "liveDisplay", "remainingTimeDisplay", "customControlSpacer", "playbackRateMenuButton", "chaptersButton", "descriptionsButton", "subsCapsButton", "audioTrackButton", "fullscreenToggle"]
        },
            Ir.registerComponent("ControlBar", ss);
        var as = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.on(n, "error", i.open),
                    i
            }
            return Wn(e, t),
                e.prototype.buildCSSClass = function () {
                    return "vjs-error-display " + t.prototype.buildCSSClass.call(this)
                },
                e.prototype.content = function () {
                    var t = this.player().error();
                    return t ? this.localize(t.message) : ""
                },
                e
        }(zr);
        as.prototype.options_ = it(zr.prototype.options_, {
            pauseOnOpen: !1,
            fillAlways: !0,
            temporary: !1,
            uncloseable: !0
        }),
            Ir.registerComponent("ErrorDisplay", as);
        var ls = ["#000", "Black"],
            cs = ["#00F", "Blue"],
            us = ["#0FF", "Cyan"],
            hs = ["#0F0", "Green"],
            ps = ["#F0F", "Magenta"],
            ds = ["#F00", "Red"],
            fs = ["#FFF", "White"],
            ys = ["#FF0", "Yellow"],
            gs = ["1", "Opaque"],
            vs = ["0.5", "Semi-Transparent"],
            ms = ["0", "Transparent"],
            _s = {
                backgroundColor: {
                    selector: ".vjs-bg-color > select",
                    id: "captions-background-color-%s",
                    label: "Color",
                    options: [ls, fs, ds, hs, cs, ys, ps, us]
                },
                backgroundOpacity: {
                    selector: ".vjs-bg-opacity > select",
                    id: "captions-background-opacity-%s",
                    label: "Transparency",
                    options: [gs, vs, ms]
                },
                color: {
                    selector: ".vjs-fg-color > select",
                    id: "captions-foreground-color-%s",
                    label: "Color",
                    options: [fs, ls, ds, hs, cs, ys, ps, us]
                },
                edgeStyle: {
                    selector: ".vjs-edge-style > select",
                    id: "%s",
                    label: "Text Edge Style",
                    options: [
                        ["none", "None"],
                        ["raised", "Raised"],
                        ["depressed", "Depressed"],
                        ["uniform", "Uniform"],
                        ["dropshadow", "Dropshadow"]
                    ]
                },
                fontFamily: {
                    selector: ".vjs-font-family > select",
                    id: "captions-font-family-%s",
                    label: "Font Family",
                    options: [
                        ["proportionalSansSerif", "Proportional Sans-Serif"],
                        ["monospaceSansSerif", "Monospace Sans-Serif"],
                        ["proportionalSerif", "Proportional Serif"],
                        ["monospaceSerif", "Monospace Serif"],
                        ["casual", "Casual"],
                        ["script", "Script"],
                        ["small-caps", "Small Caps"]
                    ]
                },
                fontPercent: {
                    selector: ".vjs-font-percent > select",
                    id: "captions-font-size-%s",
                    label: "Font Size",
                    options: [
                        ["0.50", "50%"],
                        ["0.75", "75%"],
                        ["1.00", "100%"],
                        ["1.25", "125%"],
                        ["1.50", "150%"],
                        ["1.75", "175%"],
                        ["2.00", "200%"],
                        ["3.00", "300%"],
                        ["4.00", "400%"]
                    ],
                    "default": 2,
                    parser: function (t) {
                        return "1.00" === t ? null : Number(t)
                    }
                },
                textOpacity: {
                    selector: ".vjs-text-opacity > select",
                    id: "captions-foreground-opacity-%s",
                    label: "Transparency",
                    options: [gs, vs]
                },
                windowColor: {
                    selector: ".vjs-window-color > select",
                    id: "captions-window-color-%s",
                    label: "Color"
                },
                windowOpacity: {
                    selector: ".vjs-window-opacity > select",
                    id: "captions-window-opacity-%s",
                    label: "Transparency",
                    options: [ms, vs, gs]
                }
            };
        _s.windowColor.options = _s.backgroundColor.options;
        var bs = function (t) {
            function e(n, r) {
                qn(this, e),
                    r.temporary = !1;
                var o = Kn(this, t.call(this, n, r));
                return o.updateDisplay = vr(o, o.updateDisplay),
                    o.fill(),
                    o.hasBeenOpened_ = o.hasBeenFilled_ = !0,
                    o.endDialog = _("p", {
                        className: "vjs-control-text",
                        textContent: o.localize("End of dialog window.")
                    }),
                    o.el().appendChild(o.endDialog),
                    o.setDefaults(),
                r.persistTextTrackSettings === undefined && (o.options_.persistTextTrackSettings = o.options_.playerOptions.persistTextTrackSettings),
                    o.on(o.$(".vjs-done-button"), "click", function () {
                        o.saveSettings(),
                            o.close()
                    }),
                    o.on(o.$(".vjs-default-button"), "click", function () {
                        o.setDefaults(),
                            o.updateDisplay()
                    }),
                    i(_s, function (t) {
                        o.on(o.$(t.selector), "change", o.updateDisplay)
                    }),
                o.options_.persistTextTrackSettings && o.restoreSettings(),
                    o
            }
            return Wn(e, t),
                e.prototype.dispose = function () {
                    this.endDialog = null,
                        t.prototype.dispose.call(this)
                },
                e.prototype.createElSelect_ = function (t) {
                    var e = this,
                        n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "",
                        r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "label",
                        i = _s[t],
                        o = i.id.replace("%s", this.id_);
                    return ["<" + r + ' id="' + o + '" class="' + ("label" === r ? "vjs-label" : "") + '">', this.localize(i.label), "</" + r + ">", '<select aria-labelledby="' + ("" !== n ? n + " " : "") + o + '">'].concat(i.options.map(function (t) {
                        var r = o + "-" + t[1];
                        return ['<option id="' + r + '" value="' + t[0] + '" ', 'aria-labelledby="' + ("" !== n ? n + " " : "") + o + " " + r + '">', e.localize(t[1]), "</option>"].join("")
                    })).concat("</select>").join("")
                },
                e.prototype.createElFgColor_ = function () {
                    var t = "captions-text-legend-" + this.id_;
                    return ['<fieldset class="vjs-fg-color vjs-track-setting">', '<legend id="' + t + '">', this.localize("Text"), "</legend>", this.createElSelect_("color", t), '<span class="vjs-text-opacity vjs-opacity">', this.createElSelect_("textOpacity", t), "</span>", "</fieldset>"].join("")
                },
                e.prototype.createElBgColor_ = function () {
                    var t = "captions-background-" + this.id_;
                    return ['<fieldset class="vjs-bg-color vjs-track-setting">', '<legend id="' + t + '">', this.localize("Background"), "</legend>", this.createElSelect_("backgroundColor", t), '<span class="vjs-bg-opacity vjs-opacity">', this.createElSelect_("backgroundOpacity", t), "</span>", "</fieldset>"].join("")
                },
                e.prototype.createElWinColor_ = function () {
                    var t = "captions-window-" + this.id_;
                    return ['<fieldset class="vjs-window-color vjs-track-setting">', '<legend id="' + t + '">', this.localize("Window"), "</legend>", this.createElSelect_("windowColor", t), '<span class="vjs-window-opacity vjs-opacity">', this.createElSelect_("windowOpacity", t), "</span>", "</fieldset>"].join("")
                },
                e.prototype.createElColors_ = function () {
                    return _("div", {
                        className: "vjs-track-settings-colors",
                        innerHTML: [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()].join("")
                    })
                },
                e.prototype.createElFont_ = function () {
                    return _("div", {
                        className: 'vjs-track-settings-font">',
                        innerHTML: ['<fieldset class="vjs-font-percent vjs-track-setting">', this.createElSelect_("fontPercent", "", "legend"), "</fieldset>", '<fieldset class="vjs-edge-style vjs-track-setting">', this.createElSelect_("edgeStyle", "", "legend"), "</fieldset>", '<fieldset class="vjs-font-family vjs-track-setting">', this.createElSelect_("fontFamily", "", "legend"), "</fieldset>"].join("")
                    })
                },
                e.prototype.createElControls_ = function () {
                    var t = this.localize("restore all settings to the default values");
                    return _("div", {
                        className: "vjs-track-settings-controls",
                        innerHTML: ['<button class="vjs-default-button" title="' + t + '">', this.localize("Reset"), '<span class="vjs-control-text"> ' + t + "</span>", "</button>", '<button class="vjs-done-button">' + this.localize("Done") + "</button>"].join("")
                    })
                },
                e.prototype.content = function () {
                    return [this.createElColors_(), this.createElFont_(), this.createElControls_()]
                },
                e.prototype.label = function () {
                    return this.localize("Caption Settings Dialog")
                },
                e.prototype.description = function () {
                    return this.localize("Beginning of dialog window. Escape will cancel and close the window.")
                },
                e.prototype.buildCSSClass = function () {
                    return t.prototype.buildCSSClass.call(this) + " vjs-text-track-settings"
                },
                e.prototype.getValues = function () {
                    var t = this;
                    return o(_s, function (e, n, r) {
                        var i = ne(t.$(n.selector), n.parser);
                        return i !== undefined && (e[r] = i),
                            e
                    }, {})
                },
                e.prototype.setValues = function (t) {
                    var e = this;
                    i(_s, function (n, r) {
                        re(e.$(n.selector), t[r], n.parser)
                    })
                },
                e.prototype.setDefaults = function () {
                    var t = this;
                    i(_s, function (e) {
                        var n = e.hasOwnProperty("default") ? e["default"] : 0;
                        t.$(e.selector).selectedIndex = n
                    })
                },
                e.prototype.restoreSettings = function () {
                    var t = void 0;
                    try {
                        t = JSON.parse(Ke.localStorage.getItem("vjs-text-track-settings"))
                    } catch (e) {
                        tr.warn(e)
                    }
                    t && this.setValues(t)
                },
                e.prototype.saveSettings = function () {
                    if (this.options_.persistTextTrackSettings) {
                        var t = this.getValues();
                        try {
                            Object.keys(t).length ? Ke.localStorage.setItem("vjs-text-track-settings", JSON.stringify(t)) : Ke.localStorage.removeItem("vjs-text-track-settings")
                        } catch (e) {
                            tr.warn(e)
                        }
                    }
                },
                e.prototype.updateDisplay = function () {
                    var t = this.player_.getChild("textTrackDisplay");
                    t && t.updateDisplay()
                },
                e.prototype.conditionalBlur_ = function () {
                    this.previouslyActiveEl_ = null,
                        this.off(Ye, "keydown", this.handleKeyDown);
                    var t = this.player_.controlBar,
                        e = t && t.subsCapsButton,
                        n = t && t.captionsButton;
                    e ? e.focus() : n && n.focus()
                },
                e
        }(zr);
        Ir.registerComponent("TextTrackSettings", bs);
        var Ts = Xn(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),
            Cs = function (t) {
                function e(n, r, i) {
                    qn(this, e);
                    var o = Kn(this, t.call(this, n, r, i)),
                        s = r.source,
                        a = !1;
                    if (s && (o.el_.currentSrc !== s.src || r.tag && 3 === r.tag.initNetworkState_) ? o.setSource(s) : o.handleLateInit_(o.el_), o.el_.hasChildNodes()) {
                        for (var l = o.el_.childNodes, c = l.length, u = []; c--;) {
                            var h = l[c];
                            "track" === h.nodeName.toLowerCase() && (o.featuresNativeTextTracks ? (o.remoteTextTrackEls().addTrackElement_(h), o.remoteTextTracks().addTrack(h.track), o.textTracks().addTrack(h.track), a || o.el_.hasAttribute("crossorigin") || !ai(h.src) || (a = !0)) : u.push(h))
                        }
                        for (var p = 0; p < u.length; p++) o.el_.removeChild(u[p])
                    }
                    return o.proxyNativeTracks_(),
                    o.featuresNativeTextTracks && a && tr.warn(er(Ts)),
                        o.restoreMetadataTracksInIOSNativePlayer_(),
                    (kn || nn || yn) && !0 === r.nativeControlsForTouch && o.setControls(!0),
                        o.proxyWebkitFullscreen_(),
                        o.triggerReady(),
                        o
                }
                return Wn(e, t),
                    e.prototype.dispose = function () {
                        e.disposeMediaElement(this.el_),
                            this.options_ = null,
                            t.prototype.dispose.call(this)
                    },
                    e.prototype.restoreMetadataTracksInIOSNativePlayer_ = function () {
                        var t = this.textTracks(),
                            e = void 0,
                            n = function () {
                                e = [];
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    "metadata" === r.kind && e.push({
                                        track: r,
                                        storedMode: r.mode
                                    })
                                }
                            };
                        n(),
                            t.addEventListener("change", n),
                            this.on("dispose", function () {
                                return t.removeEventListener("change", n)
                            });
                        var r = function i() {
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                "disabled" === r.track.mode && r.track.mode !== r.storedMode && (r.track.mode = r.storedMode)
                            }
                            t.removeEventListener("change", i)
                        };
                        this.on("webkitbeginfullscreen", function () {
                            t.removeEventListener("change", n),
                                t.removeEventListener("change", r),
                                t.addEventListener("change", r)
                        }),
                            this.on("webkitendfullscreen", function () {
                                t.removeEventListener("change", n),
                                    t.addEventListener("change", n),
                                    t.removeEventListener("change", r)
                            })
                    },
                    e.prototype.proxyNativeTracks_ = function () {
                        var t = this;
                        Fi.names.forEach(function (e) {
                            var n = Fi[e],
                                r = t.el()[n.getterName],
                                i = t[n.getterName]();
                            if (t["featuresNative" + n.capitalName + "Tracks"] && r && r.addEventListener) {
                                var o = {
                                        change: function (t) {
                                            i.trigger({
                                                type: "change",
                                                target: i,
                                                currentTarget: i,
                                                srcElement: i
                                            })
                                        },
                                        addtrack: function (t) {
                                            i.addTrack(t.track)
                                        },
                                        removetrack: function (t) {
                                            i.removeTrack(t.track)
                                        }
                                    },
                                    s = function () {
                                        for (var t = [], e = 0; e < i.length; e++) {
                                            for (var n = !1, o = 0; o < r.length; o++) if (r[o] === i[e]) {
                                                n = !0;
                                                break
                                            }
                                            n || t.push(i[e])
                                        }
                                        for (; t.length;) i.removeTrack(t.shift())
                                    };
                                Object.keys(o).forEach(function (e) {
                                    var n = o[e];
                                    r.addEventListener(e, n),
                                        t.on("dispose", function (t) {
                                            return r.removeEventListener(e, n)
                                        })
                                }),
                                    t.on("loadstart", s),
                                    t.on("dispose", function (e) {
                                        return t.off("loadstart", s)
                                    })
                            }
                        })
                    },
                    e.prototype.createEl = function () {
                        var t = this.options_.tag;
                        if (!t || !this.options_.playerElIngest && !this.movingMediaElementInDOM) {
                            if (t) {
                                var n = t.cloneNode(!0);
                                t.parentNode && t.parentNode.insertBefore(n, t),
                                    e.disposeMediaElement(t),
                                    t = n
                            } else {
                                t = Ye.createElement("video");
                                var r = this.options_.tag && P(this.options_.tag),
                                    i = it({}, r);
                                kn && !0 === this.options_.nativeControlsForTouch || delete i.controls,
                                    S(t, s(i, {
                                        id: this.options_.techId,
                                        "class": "vjs-tech"
                                    }))
                            }
                            t.playerId = this.options_.playerId
                        }
                        "undefined" != typeof this.options_.preload && I(t, "preload", this.options_.preload);
                        for (var o = ["loop", "muted", "playsinline", "autoplay"], a = 0; a < o.length; a++) {
                            var l = o[a],
                                c = this.options_[l];
                            void 0 !== c && (c ? I(t, l, l) : M(t, l), t[l] = c)
                        }
                        return t
                    },
                    e.prototype.handleLateInit_ = function (t) {
                        if (0 !== t.networkState && 3 !== t.networkState) {
                            if (0 === t.readyState) {
                                var e = !1,
                                    n = function () {
                                        e = !0
                                    };
                                this.on("loadstart", n);
                                var r = function () {
                                    e || this.trigger("loadstart")
                                };
                                return this.on("loadedmetadata", r),
                                    void this.ready(function () {
                                        this.off("loadstart", n),
                                            this.off("loadedmetadata", r),
                                        e || this.trigger("loadstart")
                                    })
                            }
                            var i = ["loadstart"];
                            i.push("loadedmetadata"),
                            t.readyState >= 2 && i.push("loadeddata"),
                            t.readyState >= 3 && i.push("canplay"),
                            t.readyState >= 4 && i.push("canplaythrough"),
                                this.ready(function () {
                                    i.forEach(function (t) {
                                        this.trigger(t)
                                    }, this)
                                })
                        }
                    },
                    e.prototype.setCurrentTime = function (t) {
                        try {
                            this.el_.currentTime = t
                        } catch (e) {
                            tr(e, "Video is not ready. (Video.js)")
                        }
                    },
                    e.prototype.duration = function () {
                        var t = this;
                        if (this.el_.duration === Infinity && an && mn && 0 === this.el_.currentTime) {
                            var e = function n() {
                                t.el_.currentTime > 0 && (t.el_.duration === Infinity && t.trigger("durationchange"), t.off("timeupdate", n))
                            };
                            return this.on("timeupdate", e),
                                NaN
                        }
                        return this.el_.duration || NaN
                    },
                    e.prototype.width = function () {
                        return this.el_.offsetWidth
                    },
                    e.prototype.height = function () {
                        return this.el_.offsetHeight
                    },
                    e.prototype.proxyWebkitFullscreen_ = function () {
                        var t = this;
                        if ("webkitDisplayingFullscreen" in this.el_) {
                            var e = function () {
                                    this.trigger("fullscreenchange", {
                                        isFullscreen: !1
                                    })
                                },
                                n = function () {
                                    "webkitPresentationMode" in this.el_ && "picture-in-picture" !== this.el_.webkitPresentationMode && (this.one("webkitendfullscreen", e), this.trigger("fullscreenchange", {
                                        isFullscreen: !0
                                    }))
                                };
                            this.on("webkitbeginfullscreen", n),
                                this.on("dispose", function () {
                                    t.off("webkitbeginfullscreen", n),
                                        t.off("webkitendfullscreen", e)
                                })
                        }
                    },
                    e.prototype.supportsFullScreen = function () {
                        if ("function" == typeof this.el_.webkitEnterFullScreen) {
                            var t = Ke.navigator && Ke.navigator.userAgent || "";
                            if (/Android/.test(t) || !/Chrome|Mac OS X 10.5/.test(t)) return !0
                        }
                        return !1
                    },
                    e.prototype.enterFullScreen = function () {
                        var t = this.el_;
                        t.paused && t.networkState <= t.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function () {
                            t.pause(),
                                t.webkitEnterFullScreen()
                        }, 0)) : t.webkitEnterFullScreen()
                    },
                    e.prototype.exitFullScreen = function () {
                        this.el_.webkitExitFullScreen()
                    },
                    e.prototype.src = function (t) {
                        if (t === undefined) return this.el_.src;
                        this.setSrc(t)
                    },
                    e.prototype.reset = function () {
                        e.resetMediaElement(this.el_)
                    },
                    e.prototype.currentSrc = function () {
                        return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc
                    },
                    e.prototype.setControls = function (t) {
                        this.el_.controls = !! t
                    },
                    e.prototype.addTextTrack = function (e, n, r) {
                        return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, n, r) : t.prototype.addTextTrack.call(this, e, n, r)
                    },
                    e.prototype.createRemoteTextTrack = function (e) {
                        if (!this.featuresNativeTextTracks) return t.prototype.createRemoteTextTrack.call(this, e);
                        var n = Ye.createElement("track");
                        return e.kind && (n.kind = e.kind),
                        e.label && (n.label = e.label),
                        (e.language || e.srclang) && (n.srclang = e.language || e.srclang),
                        e["default"] && (n["default"] = e["default"]),
                        e.id && (n.id = e.id),
                        e.src && (n.src = e.src),
                            n
                    },
                    e.prototype.addRemoteTextTrack = function (e, n) {
                        var r = t.prototype.addRemoteTextTrack.call(this, e, n);
                        return this.featuresNativeTextTracks && this.el().appendChild(r),
                            r
                    },
                    e.prototype.removeRemoteTextTrack = function (e) {
                        if (t.prototype.removeRemoteTextTrack.call(this, e), this.featuresNativeTextTracks) for (var n = this.$$("track"), r = n.length; r--;) e !== n[r] && e !== n[r].track || this.el().removeChild(n[r])
                    },
                    e.prototype.getVideoPlaybackQuality = function () {
                        if ("function" == typeof this.el().getVideoPlaybackQuality) return this.el().getVideoPlaybackQuality();
                        var t = {};
                        return "undefined" != typeof this.el().webkitDroppedFrameCount && "undefined" != typeof this.el().webkitDecodedFrameCount && (t.droppedVideoFrames = this.el().webkitDroppedFrameCount, t.totalVideoFrames = this.el().webkitDecodedFrameCount),
                            Ke.performance && "function" == typeof Ke.performance.now ? t.creationTime = Ke.performance.now() : Ke.performance && Ke.performance.timing && "number" == typeof Ke.performance.timing.navigationStart && (t.creationTime = Ke.Date.now() - Ke.performance.timing.navigationStart),
                            t
                    },
                    e
            }(no);
        if (y()) {
            Cs.TEST_VID = Ye.createElement("video");
            var Es = Ye.createElement("track");
            Es.kind = "captions",
                Es.srclang = "en",
                Es.label = "English",
                Cs.TEST_VID.appendChild(Es)
        }
        Cs.isSupported = function () {
            try {
                Cs.TEST_VID.volume = .5
            } catch (t) {
                return !1
            }
            return !(!Cs.TEST_VID || !Cs.TEST_VID.canPlayType)
        },
            Cs.canPlayType = function (t) {
                return Cs.TEST_VID.canPlayType(t)
            },
            Cs.canPlaySource = function (t, e) {
                return Cs.canPlayType(t.type)
            },
            Cs.canControlVolume = function () {
                try {
                    var t = Cs.TEST_VID.volume;
                    return Cs.TEST_VID.volume = t / 2 + .1,
                    t !== Cs.TEST_VID.volume
                } catch (e) {
                    return !1
                }
            },
            Cs.canControlMute = function () {
                try {
                    var t = Cs.TEST_VID.muted;
                    return Cs.TEST_VID.muted = !0,
                    t !== Cs.TEST_VID.muted
                } catch (e) {
                    return !1
                }
            },
            Cs.canControlPlaybackRate = function () {
                if (an && mn && _n < 58) return !1;
                try {
                    var t = Cs.TEST_VID.playbackRate;
                    return Cs.TEST_VID.playbackRate = t / 2 + .1,
                    t !== Cs.TEST_VID.playbackRate
                } catch (e) {
                    return !1
                }
            },
            Cs.supportsNativeTextTracks = function () {
                return En
            },
            Cs.supportsNativeVideoTracks = function () {
                return !(!Cs.TEST_VID || !Cs.TEST_VID.videoTracks)
            },
            Cs.supportsNativeAudioTracks = function () {
                return !(!Cs.TEST_VID || !Cs.TEST_VID.audioTracks)
            },
            Cs.Events = ["loadstart", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "progress", "play", "pause", "ratechange", "resize", "volumechange"],
            Cs.prototype.featuresVolumeControl = Cs.canControlVolume(),
            Cs.prototype.featuresMuteControl = Cs.canControlMute(),
            Cs.prototype.featuresPlaybackRate = Cs.canControlPlaybackRate(),
            Cs.prototype.movingMediaElementInDOM = !on,
            Cs.prototype.featuresFullscreenResize = !0,
            Cs.prototype.featuresProgressEvents = !0,
            Cs.prototype.featuresTimeupdateEvents = !0,
            Cs.prototype.featuresNativeTextTracks = Cs.supportsNativeTextTracks(),
            Cs.prototype.featuresNativeVideoTracks = Cs.supportsNativeVideoTracks(),
            Cs.prototype.featuresNativeAudioTracks = Cs.supportsNativeAudioTracks();
        var ks = Cs.TEST_VID && Cs.TEST_VID.constructor.prototype.canPlayType,
            ws = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
            Ss = /^video\/mp4/i;
        Cs.patchCanPlayType = function () {
            ln >= 4 && !gn ? Cs.TEST_VID.constructor.prototype.canPlayType = function (t) {
                return t && ws.test(t) ? "maybe" : ks.call(this, t)
            } : fn && (Cs.TEST_VID.constructor.prototype.canPlayType = function (t) {
                return t && Ss.test(t) ? "maybe" : ks.call(this, t)
            })
        },
            Cs.unpatchCanPlayType = function () {
                var t = Cs.TEST_VID.constructor.prototype.canPlayType;
                return Cs.TEST_VID.constructor.prototype.canPlayType = ks,
                    t
            },
            Cs.patchCanPlayType(),
            Cs.disposeMediaElement = function (t) {
                if (t) {
                    for (t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
                    t.removeAttribute("src"),
                    "function" == typeof t.load &&
                    function () {
                        try {
                            t.load()
                        } catch (e) {}
                    }()
                }
            },
            Cs.resetMediaElement = function (t) {
                if (t) {
                    for (var e = t.querySelectorAll("source"), n = e.length; n--;) t.removeChild(e[n]);
                    t.removeAttribute("src"),
                    "function" == typeof t.load &&
                    function () {
                        try {
                            t.load()
                        } catch (e) {}
                    }()
                }
            },
            ["muted", "defaultMuted", "autoplay", "controls", "loop", "playsinline"].forEach(function (t) {
                Cs.prototype[t] = function () {
                    return this.el_[t] || this.el_.hasAttribute(t)
                }
            }),
            ["muted", "defaultMuted", "autoplay", "loop", "playsinline"].forEach(function (t) {
                Cs.prototype["set" + nt(t)] = function (e) {
                    this.el_[t] = e,
                        e ? this.el_.setAttribute(t, t) : this.el_.removeAttribute(t)
                }
            }),
            ["paused", "currentTime", "buffered", "volume", "poster", "preload", "error", "seeking", "seekable", "ended", "playbackRate", "defaultPlaybackRate", "played", "networkState", "readyState", "videoWidth", "videoHeight"].forEach(function (t) {
                Cs.prototype[t] = function () {
                    return this.el_[t]
                }
            }),
            ["volume", "src", "poster", "preload", "playbackRate", "defaultPlaybackRate"].forEach(function (t) {
                Cs.prototype["set" + nt(t)] = function (e) {
                    this.el_[t] = e
                }
            }),
            ["pause", "load", "play"].forEach(function (t) {
                Cs.prototype[t] = function () {
                    return this.el_[t]()
                }
            }),
            no.withSourceHandlers(Cs),
            Cs.nativeSourceHandler = {},
            Cs.nativeSourceHandler.canPlayType = function (t) {
                try {
                    return Cs.TEST_VID.canPlayType(t)
                } catch (e) {
                    return ""
                }
            },
            Cs.nativeSourceHandler.canHandleSource = function (t, e) {
                if (t.type) return Cs.nativeSourceHandler.canPlayType(t.type);
                if (t.src) {
                    var n = si(t.src);
                    return Cs.nativeSourceHandler.canPlayType("video/" + n)
                }
                return ""
            },
            Cs.nativeSourceHandler.handleSource = function (t, e, n) {
                e.setSrc(t.src)
            },
            Cs.nativeSourceHandler.dispose = function () {},
            Cs.registerSourceHandler(Cs.nativeSourceHandler),
            no.registerTech("Html5", Cs);
        var Ps = Xn(["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "], ["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "]),
            xs = ["progress", "abort", "suspend", "emptied", "stalled", "loadedmetadata", "loadeddata", "timeupdate", "ratechange", "resize", "volumechange", "texttrackchange"],
            Is = function (t) {
                function e(n, r, i) {
                    if (qn(this, e), n.id = n.id || "vjs_video_" + U(), r = s(e.getTagSettings(n), r), r.initChildren = !1, r.createEl = !1, r.evented = !1, r.reportTouchActivity = !1, !r.language) if ("function" == typeof n.closest) {
                        var o = n.closest("[lang]");
                        o && o.getAttribute && (r.language = o.getAttribute("lang"))
                    } else for (var a = n; a && 1 === a.nodeType;) {
                        if (P(a).hasOwnProperty("lang")) {
                            r.language = a.getAttribute("lang");
                            break
                        }
                        a = a.parentNode
                    }
                    var l = Kn(this, t.call(this, null, r, i));
                    if (l.isReady_ = !1, l.hasStarted_ = !1, l.userActive_ = !1, !l.options_ || !l.options_.techOrder || !l.options_.techOrder.length) throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
                    if (l.tag = n, l.tagAttributes = n && P(n), l.language(l.options_.language), r.languages) {
                        var c = {};
                        Object.getOwnPropertyNames(r.languages).forEach(function (t) {
                            c[t.toLowerCase()] = r.languages[t]
                        }),
                            l.languages_ = c
                    } else l.languages_ = e.prototype.options_.languages;
                    l.cache_ = {},
                        l.poster_ = r.poster || "",
                        l.controls_ = !! r.controls,
                        l.cache_.lastVolume = 1,
                        n.controls = !1,
                        n.removeAttribute("controls"),
                        l.scrubbing_ = !1,
                        l.el_ = l.createEl(),
                        tt(l, {
                            eventBusKey: "el_"
                        });
                    var u = it(l.options_);
                    if (r.plugins) {
                        var h = r.plugins;
                        Object.keys(h).forEach(function (t) {
                            if ("function" != typeof this[t]) throw new Error('plugin "' + t + '" does not exist');
                            this[t](h[t])
                        }, l)
                    }
                    return l.options_.playerOptions = u,
                        l.middleware_ = [],
                        l.initChildren(),
                        l.isAudio("audio" === n.nodeName.toLowerCase()),
                        l.controls() ? l.addClass("vjs-controls-enabled") : l.addClass("vjs-controls-disabled"),
                        l.el_.setAttribute("role", "region"),
                        l.isAudio() ? l.el_.setAttribute("aria-label", l.localize("Audio Player")) : l.el_.setAttribute("aria-label", l.localize("Video Player")),
                    l.isAudio() && l.addClass("vjs-audio"),
                    l.flexNotSupported_() && l.addClass("vjs-no-flex"),
                    on || l.addClass("vjs-workinghover"),
                        e.players[l.id_] = l,
                        l.userActive(!0),
                        l.reportUserActivity(),
                        l.listenForUserActivity_(),
                        l.on("fullscreenchange", l.handleFullscreenChange_),
                        l.on("stageclick", l.handleStageClick_),
                        l.changingSrc_ = !1,
                        l.playWaitingForReady_ = !1,
                        l.playOnLoadstart_ = null,
                        l.forceAutoplayInChrome_(),
                        l
                }
                return Wn(e, t),
                    e.prototype.dispose = function () {
                        this.trigger("dispose"),
                            this.off("dispose"),
                        this.styleEl_ && this.styleEl_.parentNode && (this.styleEl_.parentNode.removeChild(this.styleEl_), this.styleEl_ = null),
                            e.players[this.id_] = null,
                        this.tag && this.tag.player && (this.tag.player = null),
                        this.el_ && this.el_.player && (this.el_.player = null),
                        this.tech_ && this.tech_.dispose(),
                        this.playerElIngest_ && (this.playerElIngest_ = null),
                        this.tag && (this.tag = null),
                            t.prototype.dispose.call(this)
                    },
                    e.prototype.createEl = function () {
                        var e = this.tag,
                            n = void 0,
                            r = this.playerElIngest_ = e.parentNode && e.parentNode.hasAttribute && e.parentNode.hasAttribute("data-vjs-player"),
                            i = "video-js" === this.tag.tagName.toLowerCase();
                        r ? n = this.el_ = e.parentNode : i || (n = this.el_ = t.prototype.createEl.call(this, "div"));
                        var o = P(e);
                        if (i) {
                            for (n = this.el_ = e, e = this.tag = Ye.createElement("video"); n.children.length;) e.appendChild(n.firstChild);
                            C(n, "video-js") || E(n, "video-js"),
                                n.appendChild(e),
                                r = this.playerElIngest_ = n
                        }
                        if (e.setAttribute("tabindex", "-1"), e.removeAttribute("width"), e.removeAttribute("height"), Object.getOwnPropertyNames(o).forEach(function (t) {
                            "class" === t ? (n.className += " " + o[t], i && (e.className += " " + o[t])) : (n.setAttribute(t, o[t]), i && e.setAttribute(t, o[t]))
                        }), e.playerId = e.id, e.id += "_html5_api", e.className = "vjs-tech", e.player = n.player = this, this.addClass("vjs-paused"), !0 !== Ke.VIDEOJS_NO_DYNAMIC_STYLE) {
                            this.styleEl_ = yr("vjs-styles-dimensions");
                            var s = rr(".vjs-styles-defaults"),
                                a = rr("head");
                            a.insertBefore(this.styleEl_, s ? s.nextSibling : a.firstChild)
                        }
                        this.width(this.options_.width),
                            this.height(this.options_.height),
                            this.fluid(this.options_.fluid),
                            this.aspectRatio(this.options_.aspectRatio);
                        for (var l = e.getElementsByTagName("a"), c = 0; c < l.length; c++) {
                            var u = l.item(c);
                            E(u, "vjs-hidden"),
                                u.setAttribute("hidden", "hidden")
                        }
                        return e.initNetworkState_ = e.networkState,
                        e.parentNode && !r && e.parentNode.insertBefore(n, e),
                            T(e, n),
                            this.children_.unshift(e),
                            this.el_.setAttribute("lang", this.language_),
                            this.el_ = n,
                            n
                    },
                    e.prototype.width = function (t, e) {
                        return this.dimension("width", t, e)
                    },
                    e.prototype.height = function (t, e) {
                        return this.dimension("height", t, e)
                    },
                    e.prototype.dimension = function (t, e, n) {
                        var r = t + "_";
                        if (e === undefined) return this[r] || 0;
                        if ("" === e) return this[r] = undefined,
                            void this.updateStyleEl_();
                        var i = parseFloat(e);
                        if (isNaN(i)) return void tr.error('Improper value "' + e + '" supplied for for ' + t);
                        this[r] = i,
                            this.updateStyleEl_(),
                        this.isReady_ && !n && this.trigger("playerresize")
                    },
                    e.prototype.fluid = function (t) {
                        if (t === undefined) return !!this.fluid_;
                        this.fluid_ = !! t,
                            t ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid"),
                            this.updateStyleEl_()
                    },
                    e.prototype.aspectRatio = function (t) {
                        if (t === undefined) return this.aspectRatio_;
                        if (!/^\d+\:\d+$/.test(t)) throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
                        this.aspectRatio_ = t,
                            this.fluid(!0),
                            this.updateStyleEl_()
                    },
                    e.prototype.updateStyleEl_ = function () {
                        if (!0 === Ke.VIDEOJS_NO_DYNAMIC_STYLE) {
                            var t = "number" == typeof this.width_ ? this.width_ : this.options_.width,
                                e = "number" == typeof this.height_ ? this.height_ : this.options_.height,
                                n = this.tech_ && this.tech_.el();
                            return void(n && (t >= 0 && (n.width = t), e >= 0 && (n.height = e)))
                        }
                        var r = void 0,
                            i = void 0,
                            o = void 0,
                            s = void 0;
                        o = this.aspectRatio_ !== undefined && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : this.videoWidth() > 0 ? this.videoWidth() + ":" + this.videoHeight() : "16:9";
                        var a = o.split(":"),
                            l = a[1] / a[0];
                        r = this.width_ !== undefined ? this.width_ : this.height_ !== undefined ? this.height_ / l : this.videoWidth() || 300,
                            i = this.height_ !== undefined ? this.height_ : r * l,
                            s = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions",
                            this.addClass(s),
                            gr(this.styleEl_, "\n      ." + s + " {\n        width: " + r + "px;\n        height: " + i + "px;\n      }\n\n      ." + s + ".vjs-fluid {\n        padding-top: " + 100 * l + "%;\n      }\n    ")
                    },
                    e.prototype.loadTech_ = function (t, e) {
                        var n = this;
                        this.tech_ && this.unloadTech_();
                        var r = nt(t),
                            i = t.charAt(0).toLowerCase() + t.slice(1);
                        "Html5" !== r && this.tag && (no.getTech("Html5").disposeMediaElement(this.tag), this.tag.player = null, this.tag = null),
                            this.techName_ = r,
                            this.isReady_ = !1;
                        var o = {
                            source: e,
                            nativeControlsForTouch: this.options_.nativeControlsForTouch,
                            playerId: this.id(),
                            techId: this.id() + "_" + r + "_api",
                            autoplay: this.options_.autoplay,
                            playsinline: this.options_.playsinline,
                            preload: this.options_.preload,
                            loop: this.options_.loop,
                            muted: this.options_.muted,
                            poster: this.poster(),
                            language: this.language(),
                            playerElIngest: this.playerElIngest_ || !1,
                            "vtt.js": this.options_["vtt.js"],
                            swf: this.options_.swf,
                            hlsConfig: this.options_.hlsConfig,
                            dashConfig: this.options_.dashConfig
                        };
                        Vi.names.forEach(function (t) {
                            var e = Vi[t];
                            o[e.getterName] = n[e.privateName]
                        }),
                            s(o, this.options_[r]),
                            s(o, this.options_[i]),
                            s(o, this.options_[t.toLowerCase()]),
                        this.tag && (o.tag = this.tag),
                        e && e.src === this.cache_.src && this.cache_.currentTime > 0 && (o.startTime = this.cache_.currentTime);
                        var a = no.getTech(t);
                        if (!a) throw new Error("No Tech named '" + r + "' exists! '" + r + "' should be registered using videojs.registerTech()'");
                        this.tech_ = new a(this, o),
                            this.tech_.ready(vr(this, this.handleTechReady_), !0),
                            Vr.jsonToTextTracks(this.textTracksJson_ || [], this.tech_),
                            xs.forEach(function (t) {
                                n.on(n.tech_, t, n["handleTech" + nt(t) + "_"])
                            }),
                            this.on(this.tech_, "loadstart", this.handleTechLoadStart_),
                            this.on(this.tech_, "waiting", this.handleTechWaiting_),
                            this.on(this.tech_, "canplay", this.handleTechCanPlay_),
                            this.on(this.tech_, "canplaythrough", this.handleTechCanPlayThrough_),
                            this.on(this.tech_, "playing", this.handleTechPlaying_),
                            this.on(this.tech_, "ended", this.handleTechEnded_),
                            this.on(this.tech_, "seeking", this.handleTechSeeking_),
                            this.on(this.tech_, "seeked", this.handleTechSeeked_),
                            this.on(this.tech_, "play", this.handleTechPlay_),
                            this.on(this.tech_, "firstplay", this.handleTechFirstPlay_),
                            this.on(this.tech_, "pause", this.handleTechPause_),
                            this.on(this.tech_, "durationchange", this.handleTechDurationChange_),
                            this.on(this.tech_, "fullscreenchange", this.handleTechFullscreenChange_),
                            this.on(this.tech_, "error", this.handleTechError_),
                            this.on(this.tech_, "loadedmetadata", this.updateStyleEl_),
                            this.on(this.tech_, "posterchange", this.handleTechPosterChange_),
                            this.on(this.tech_, "textdata", this.handleTechTextData_),
                            this.usingNativeControls(this.techGet_("controls")),
                        this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_(),
                        this.tech_.el().parentNode === this.el() || "Html5" === r && this.tag || T(this.tech_.el(), this.el()),
                        this.tag && (this.tag.player = null, this.tag = null)
                    },
                    e.prototype.unloadTech_ = function () {
                        var t = this;
                        Vi.names.forEach(function (e) {
                            var n = Vi[e];
                            t[n.privateName] = t[n.getterName]()
                        }),
                            this.textTracksJson_ = Vr.textTracksToJson(this.tech_),
                            this.isReady_ = !1,
                            this.tech_.dispose(),
                            this.tech_ = !1
                    },
                    e.prototype.tech = function (t) {
                        return t === undefined && tr.warn(er(Ps)),
                            this.tech_
                    },
                    e.prototype.addTechControlsListeners_ = function () {
                        this.tech_ && (this.removeTechControlsListeners_(), this.on(this.tech_, "mousedown", this.handleTechClick_), this.on(this.tech_, "touchstart", this.handleTechTouchStart_), this.on(this.tech_, "touchmove", this.handleTechTouchMove_), this.on(this.tech_, "touchend", this.handleTechTouchEnd_), this.on(this.tech_, "tap", this.handleTechTap_))
                    },
                    e.prototype.removeTechControlsListeners_ = function () {
                        this.tech_ && (this.off(this.tech_, "tap", this.handleTechTap_), this.off(this.tech_, "touchstart", this.handleTechTouchStart_), this.off(this.tech_, "touchmove", this.handleTechTouchMove_), this.off(this.tech_, "touchend", this.handleTechTouchEnd_), this.off(this.tech_, "mousedown", this.handleTechClick_))
                    },
                    e.prototype.handleTechReady_ = function () {
                        if (this.triggerReady(), this.cache_.volume && this.techCall_("setVolume", this.cache_.volume), this.handleTechPosterChange_(), this.handleTechDurationChange_(), (this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) try {
                            delete this.tag.poster
                        } catch (t) {
                            tr("deleting tag.poster throws in some browsers", t)
                        }
                    },
                    e.prototype.handleTechLoadStart_ = function () {
                        this.removeClass("vjs-ended"),
                            this.removeClass("vjs-seeking"),
                            this.error(null),
                            this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"))
                    },
                    e.prototype.hasStarted = function (t) {
                        if (t === undefined) return this.hasStarted_;
                        t !== this.hasStarted_ && (this.hasStarted_ = t, this.hasStarted_ ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started"))
                    },
                    e.prototype.handleTechPlay_ = function () {
                        this.removeClass("vjs-ended"),
                            this.removeClass("vjs-paused"),
                            this.addClass("vjs-playing"),
                            this.hasStarted(!0),
                            this.trigger("play")
                    },
                    e.prototype.handleTechWaiting_ = function () {
                        var t = this;
                        this.addClass("vjs-waiting"),
                            this.trigger("waiting"),
                            this.one("timeupdate", function () {
                                return t.removeClass("vjs-waiting")
                            })
                    },
                    e.prototype.handleTechCanPlay_ = function () {
                        this.removeClass("vjs-waiting"),
                            this.trigger("canplay")
                    },
                    e.prototype.handleTechCanPlayThrough_ = function () {
                        this.removeClass("vjs-waiting"),
                            this.trigger("canplaythrough")
                    },
                    e.prototype.handleTechPlaying_ = function () {
                        this.removeClass("vjs-waiting"),
                            this.trigger("playing")
                    },
                    e.prototype.handleTechSeeking_ = function () {
                        this.addClass("vjs-seeking"),
                            this.trigger("seeking")
                    },
                    e.prototype.handleTechSeeked_ = function () {
                        this.removeClass("vjs-seeking"),
                            this.trigger("seeked")
                    },
                    e.prototype.handleTechFirstPlay_ = function () {
                        this.options_.starttime && (tr.warn("Passing the `starttime` option to the player will be deprecated in 6.0"), this.currentTime(this.options_.starttime)),
                            this.addClass("vjs-has-started"),
                            this.trigger("firstplay")
                    },
                    e.prototype.handleTechPause_ = function () {
                        this.removeClass("vjs-playing"),
                            this.addClass("vjs-paused"),
                            this.trigger("pause")
                    },
                    e.prototype.handleTechEnded_ = function () {
                        this.addClass("vjs-ended"),
                            this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause(),
                            this.trigger("ended")
                    },
                    e.prototype.handleTechDurationChange_ = function () {
                        this.duration(this.techGet_("duration"))
                    },
                    e.prototype.handleTechClick_ = function (t) {
                        V(t) && this.controls_ && (this.paused() ? this.play() : this.pause())
                    },
                    e.prototype.handleTechTap_ = function () {
                        this.userActive(!this.userActive())
                    },
                    e.prototype.handleTechTouchStart_ = function () {
                        this.userWasActive = this.userActive()
                    },
                    e.prototype.handleTechTouchMove_ = function () {
                        this.userWasActive && this.reportUserActivity()
                    },
                    e.prototype.handleTechTouchEnd_ = function (t) {
                        t.preventDefault()
                    },
                    e.prototype.handleFullscreenChange_ = function () {
                        this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
                    },
                    e.prototype.handleStageClick_ = function () {
                        this.reportUserActivity()
                    },
                    e.prototype.handleTechFullscreenChange_ = function (t, e) {
                        e && this.isFullscreen(e.isFullscreen),
                            this.trigger("fullscreenchange")
                    },
                    e.prototype.handleTechError_ = function () {
                        var t = this.tech_.error();
                        this.error(t)
                    },
                    e.prototype.handleTechTextData_ = function () {
                        var t = null;
                        arguments.length > 1 && (t = arguments[1]),
                            this.trigger("textdata", t)
                    },
                    e.prototype.getCache = function () {
                        return this.cache_
                    },
                    e.prototype.techCall_ = function (t, e) {
                        this.ready(function () {
                            if (t in oo) return Gt(this.middleware_, this.tech_, t, e);
                            try {
                                this.tech_ && this.tech_[t](e)
                            } catch (n) {
                                throw tr(n),
                                    n
                            }
                        }, !0)
                    },
                    e.prototype.techGet_ = function (t) {
                        if (this.tech_ && this.tech_.isReady_) {
                            if (t in io) return Qt(this.middleware_, this.tech_, t);
                            try {
                                return this.tech_[t]()
                            } catch (e) {
                                if (this.tech_[t] === undefined) throw tr("Video.js: " + t + " method not defined for " + this.techName_ + " playback technology.", e),
                                    e;
                                if ("TypeError" === e.name) throw tr("Video.js: " + t + " unavailable on " + this.techName_ + " playback technology element.", e),
                                    this.tech_.isReady_ = !1,
                                    e;
                                throw tr(e),
                                    e
                            }
                        }
                    },
                    e.prototype.play = function () {
                        var t = this;
                        if (this.playOnLoadstart_ && this.off("loadstart", this.playOnLoadstart_), this.isReady_) {
                            if (!this.changingSrc_ && (this.src() || this.currentSrc())) return this.techGet_("play");
                            this.playOnLoadstart_ = function () {
                                t.playOnLoadstart_ = null,
                                    ft(t.play())
                            },
                                this.one("loadstart", this.playOnLoadstart_)
                        } else {
                            if (this.playWaitingForReady_) return;
                            this.playWaitingForReady_ = !0,
                                this.ready(function () {
                                    t.playWaitingForReady_ = !1,
                                        ft(t.play())
                                })
                        }
                    },
                    e.prototype.pause = function () {
                        this.techCall_("pause")
                    },
                    e.prototype.paused = function () {
                        return !1 !== this.techGet_("paused")
                    },
                    e.prototype.played = function () {
                        return this.techGet_("played") || ct(0, 0)
                    },
                    e.prototype.scrubbing = function (t) {
                        if (void 0 === t) return this.scrubbing_;
                        this.scrubbing_ = !! t,
                            t ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing")
                    },
                    e.prototype.currentTime = function (t) {
                        return void 0 !== t ? (t < 0 && (t = 0), void this.techCall_("setCurrentTime", t)) : (this.cache_.currentTime = this.techGet_("currentTime") || 0, this.cache_.currentTime)
                    },
                    e.prototype.duration = function (t) {
                        if (t === undefined) return this.cache_.duration !== undefined ? this.cache_.duration : NaN;
                        t = parseFloat(t),
                        t <= 0 && (t = Infinity),
                        t !== this.cache_.duration && (this.cache_.duration = t, t === Infinity ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange"))
                    },
                    e.prototype.remainingTime = function () {
                        return this.duration() - this.currentTime()
                    },
                    e.prototype.remainingTimeDisplay = function () {
                        return Math.floor(this.duration()) - Math.floor(this.currentTime())
                    },
                    e.prototype.buffered = function () {
                        var t = this.techGet_("buffered");
                        return t && t.length || (t = ct(0, 0)),
                            t
                    },
                    e.prototype.bufferedPercent = function () {
                        return ut(this.buffered(), this.duration())
                    },
                    e.prototype.bufferedEnd = function () {
                        var t = this.buffered(),
                            e = this.duration(),
                            n = t.end(t.length - 1);
                        return n > e && (n = e),
                            n
                    },
                    e.prototype.volume = function (t) {
                        var e = void 0;
                        return t !== undefined ? (e = Math.max(0, Math.min(1, parseFloat(t))), this.cache_.volume = e, this.techCall_("setVolume", e), void(e > 0 && this.lastVolume_(e))) : (e = parseFloat(this.techGet_("volume")), isNaN(e) ? 1 : e)
                    },
                    e.prototype.muted = function (t) {
                        return t !== undefined ? void this.techCall_("setMuted", t) : this.techGet_("muted") || !1
                    },
                    e.prototype.defaultMuted = function (t) {
                        return t !== undefined ? this.techCall_("setDefaultMuted", t) : this.techGet_("defaultMuted") || !1
                    },
                    e.prototype.lastVolume_ = function (t) {
                        return t !== undefined && 0 !== t ? void(this.cache_.lastVolume = t) : this.cache_.lastVolume
                    },
                    e.prototype.supportsFullScreen = function () {
                        return this.techGet_("supportsFullScreen") || !1
                    },
                    e.prototype.isFullscreen = function (t) {
                        return t !== undefined ? void(this.isFullscreen_ = !! t) : !! this.isFullscreen_
                    },
                    e.prototype.requestFullscreen = function () {
                        var t = Mr;
                        this.isFullscreen(!0),
                            t.requestFullscreen ? (G(Ye, t.fullscreenchange, vr(this, function e(n) {
                                this.isFullscreen(Ye[t.fullscreenElement]),
                                !1 === this.isFullscreen() && $(Ye, t.fullscreenchange, e),
                                    this.trigger("fullscreenchange")
                            })), this.el_[t.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange"))
                    },
                    e.prototype.exitFullscreen = function () {
                        var t = Mr;
                        this.isFullscreen(!1),
                            t.requestFullscreen ? Ye[t.exitFullscreen]() : this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange"))
                    },
                    e.prototype.enterFullWindow = function () {
                        this.isFullWindow = !0,
                            this.docOrigOverflow = Ye.documentElement.style.overflow,
                            G(Ye, "keydown", vr(this, this.fullWindowOnEscKey)),
                            Ye.documentElement.style.overflow = "hidden",
                            E(Ye.body, "vjs-full-window"),
                            this.trigger("enterFullWindow")
                    },
                    e.prototype.fullWindowOnEscKey = function (t) {
                        27 === t.keyCode && (!0 === this.isFullscreen() ? this.exitFullscreen() : this.exitFullWindow())
                    },
                    e.prototype.exitFullWindow = function () {
                        this.isFullWindow = !1,
                            $(Ye, "keydown", this.fullWindowOnEscKey),
                            Ye.documentElement.style.overflow = this.docOrigOverflow,
                            k(Ye.body, "vjs-full-window"),
                            this.trigger("exitFullWindow")
                    },
                    e.prototype.canPlayType = function (t) {
                        for (var e = void 0, n = 0, r = this.options_.techOrder; n < r.length; n++) {
                            var i = r[n],
                                o = no.getTech(i);
                            if (o || (o = Ir.getComponent(i)), o) {
                                if (o.isSupported() && (e = o.canPlayType(t))) return e
                            } else tr.error('The "' + i + '" tech is undefined. Skipped browser support check for that tech.')
                        }
                        return ""
                    },
                    e.prototype.selectSource = function (t) {
                        var e = this,
                            n = this.options_.techOrder.map(function (t) {
                                return [t, no.getTech(t)]
                            }).filter(function (t) {
                                var e = t[0],
                                    n = t[1];
                                return n ? n.isSupported() : (tr.error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.'), !1)
                            }),
                            r = function (t, e, n) {
                                var r = void 0;
                                return t.some(function (t) {
                                    return e.some(function (e) {
                                        if (r = n(t, e)) return !0
                                    })
                                }),
                                    r
                            },
                            i = function (t, n) {
                                var r = t[0];
                                if (t[1].canPlaySource(n, e.options_[r.toLowerCase()])) return {
                                    source: n,
                                    tech: r
                                }
                            };
                        return (this.options_.sourceOrder ? r(t, n, function (t) {
                            return function (e, n) {
                                return t(n, e)
                            }
                        }(i)) : r(n, t, i)) || !1
                    },
                    e.prototype.src = function (t) {
                        var e = this;
                        if (void 0 === t) return this.cache_.src || this.techGet_("src");
                        var n = so(t);
                        if (!n.length) return void this.setTimeout(function () {
                            this.error({
                                code: 4,
                                message: this.localize(this.options_.notSupportedMessage)
                            })
                        }, 0);
                        this.cache_.sources = n,
                            this.changingSrc_ = !0,
                            this.cache_.source = n[0],
                            Kt(this, n[0], function (t, r) {
                                if (e.middleware_ = r, e.src_(t)) return n.length > 1 ? e.src(n.slice(1)) : (e.setTimeout(function () {
                                    this.error({
                                        code: 4,
                                        message: this.localize(this.options_.notSupportedMessage)
                                    })
                                }, 0), void e.triggerReady());
                                e.changingSrc_ = !1,
                                    e.cache_.src = t.src,
                                    Xt(r, e.tech_)
                            })
                    },
                    e.prototype.src_ = function (t) {
                        var e = this.selectSource([t]);
                        return !e || (rt(e.tech, this.techName_) ? (this.ready(function () {
                            this.tech_.constructor.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", t) : this.techCall_("src", t.src),
                            "auto" === this.options_.preload && this.load()
                        }, !0), !1) : (this.changingSrc_ = !0, this.loadTech_(e.tech, e.source), !1))
                    },
                    e.prototype.load = function () {
                        this.techCall_("load")
                    },
                    e.prototype.reset = function () {
                        this.loadTech_(this.options_.techOrder[0], null),
                            this.techCall_("reset")
                    },
                    e.prototype.currentSources = function () {
                        var t = this.currentSource(),
                            e = [];
                        return 0 !== Object.keys(t).length && e.push(t),
                        this.cache_.sources || e
                    },
                    e.prototype.currentSource = function () {
                        return this.cache_.source || {}
                    },
                    e.prototype.currentSrc = function () {
                        return this.currentSource() && this.currentSource().src || ""
                    },
                    e.prototype.currentType = function () {
                        return this.currentSource() && this.currentSource().type || ""
                    },
                    e.prototype.preload = function (t) {
                        return t !== undefined ? (this.techCall_("setPreload", t), void(this.options_.preload = t)) : this.techGet_("preload")
                    },
                    e.prototype.autoplay = function (t) {
                        return t !== undefined ? (this.techCall_("setAutoplay", t), this.options_.autoplay = t, void this.ready(this.forceAutoplayInChrome_)) : this.techGet_("autoplay", t)
                    },
                    e.prototype.forceAutoplayInChrome_ = function () {
                        this.paused() && (this.autoplay() || this.options_.autoplay) && mn && !an && this.play()
                    },
                    e.prototype.playsinline = function (t) {
                        return t !== undefined ? (this.techCall_("setPlaysinline", t), this.options_.playsinline = t, this) : this.techGet_("playsinline")
                    },
                    e.prototype.loop = function (t) {
                        return t !== undefined ? (this.techCall_("setLoop", t), void(this.options_.loop = t)) : this.techGet_("loop")
                    },
                    e.prototype.poster = function (t) {
                        if (t === undefined) return this.poster_;
                        t || (t = ""),
                            this.poster_ = t,
                            this.trigger("posterchange")
                    },
                    e.prototype.handleTechPosterChange_ = function () {
                        !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"))
                    },
                    e.prototype.controls = function (t) {
                        if (t === undefined) return !!this.controls_;
                        t = !! t,
                        this.controls_ !== t && (this.controls_ = t, this.usingNativeControls() && this.techCall_("setControls", t), this.controls_ ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_()))
                    },
                    e.prototype.usingNativeControls = function (t) {
                        if (t === undefined) return !!this.usingNativeControls_;
                        t = !! t,
                        this.usingNativeControls_ !== t && (this.usingNativeControls_ = t, this.usingNativeControls_ ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols")))
                    },
                    e.prototype.error = function (t) {
                        return t === undefined ? this.error_ || null : null === t ? (this.error_ = t, this.removeClass("vjs-error"), void(this.errorDisplay && this.errorDisplay.close())) : (this.error_ = new ht(t), this.addClass("vjs-error"), tr.error("(CODE:" + this.error_.code + " " + ht.errorTypes[this.error_.code] + ")", this.error_.message, this.error_), void this.trigger({
                            type: "error",
                            data: this.error_
                        }))
                    },
                    e.prototype.reportUserActivity = function (t) {
                        this.userActivity_ = !0
                    },
                    e.prototype.userActive = function (t) {
                        if (t === undefined) return this.userActive_;
                        if ((t = !! t) !== this.userActive_) {
                            if (this.userActive_ = t, this.userActive_) return this.userActivity_ = !0,
                                this.removeClass("vjs-user-inactive"),
                                this.addClass("vjs-user-active"),
                                void this.trigger("useractive");
                            this.tech_ && this.tech_.one("mousemove", function (t) {
                                t.stopPropagation(),
                                    t.preventDefault()
                            }),
                                this.userActivity_ = !1,
                                this.removeClass("vjs-user-active"),
                                this.addClass("vjs-user-inactive"),
                                this.trigger("userinactive")
                        }
                    },
                    e.prototype.listenForUserActivity_ = function () {
                        var t = void 0,
                            e = void 0,
                            n = void 0,
                            r = vr(this, this.reportUserActivity),
                            i = function (t) {
                                t.screenX === e && t.screenY === n || (e = t.screenX, n = t.screenY, r())
                            },
                            o = function () {
                                r(),
                                    this.clearInterval(t),
                                    t = this.setInterval(r, 250)
                            },
                            s = function (e) {
                                r(),
                                    this.clearInterval(t)
                            };
                        this.on("mousedown", o),
                            this.on("mousemove", i),
                            this.on("mouseup", s),
                            this.on("keydown", r),
                            this.on("keyup", r);
                        var a = void 0;
                        this.setInterval(function () {
                            if (this.userActivity_) {
                                this.userActivity_ = !1,
                                    this.userActive(!0),
                                    this.clearTimeout(a);
                                var t = this.options_.inactivityTimeout;
                                t <= 0 || (a = this.setTimeout(function () {
                                    this.userActivity_ || this.userActive(!1)
                                }, t))
                            }
                        }, 250)
                    },
                    e.prototype.playbackRate = function (t) {
                        return t !== undefined ? void this.techCall_("setPlaybackRate", t) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1
                    },
                    e.prototype.defaultPlaybackRate = function (t) {
                        return t !== undefined ? this.techCall_("setDefaultPlaybackRate", t) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("defaultPlaybackRate") : 1
                    },
                    e.prototype.isAudio = function (t) {
                        return t !== undefined ? void(this.isAudio_ = !! t) : !! this.isAudio_
                    },
                    e.prototype.addTextTrack = function (t, e, n) {
                        if (this.tech_) return this.tech_.addTextTrack(t, e, n)
                    },
                    e.prototype.addRemoteTextTrack = function (t, e) {
                        if (this.tech_) return this.tech_.addRemoteTextTrack(t, e)
                    },
                    e.prototype.removeRemoteTextTrack = function () {
                        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                            e = t.track,
                            n = e === undefined ? arguments[0] : e;
                        if (this.tech_) return this.tech_.removeRemoteTextTrack(n)
                    },
                    e.prototype.getVideoPlaybackQuality = function () {
                        return this.techGet_("getVideoPlaybackQuality")
                    },
                    e.prototype.videoWidth = function () {
                        return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0
                    },
                    e.prototype.videoHeight = function () {
                        return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0
                    },
                    e.prototype.language = function (t) {
                        if (t === undefined) return this.language_;
                        this.language_ = String(t).toLowerCase()
                    },
                    e.prototype.languages = function () {
                        return it(e.prototype.options_.languages, this.languages_)
                    },
                    e.prototype.toJSON = function () {
                        var t = it(this.options_),
                            e = t.tracks;
                        t.tracks = [];
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            r = it(r),
                                r.player = undefined,
                                t.tracks[n] = r
                        }
                        return t
                    },
                    e.prototype.createModal = function (t, e) {
                        var n = this;
                        e = e || {},
                            e.content = t || "";
                        var r = new zr(this, e);
                        return this.addChild(r),
                            r.on("dispose", function () {
                                n.removeChild(r)
                            }),
                            r.open(),
                            r
                    },
                    e.getTagSettings = function (t) {
                        var e = {
                                sources: [],
                                tracks: []
                            },
                            n = P(t),
                            r = n["data-setup"];
                        if (C(t, "vjs-fluid") && (n.fluid = !0), null !== r) {
                            var i = Nr(r || "{}"),
                                o = i[0],
                                a = i[1];
                            o && tr.error(o),
                                s(n, a)
                        }
                        if (s(e, n), t.hasChildNodes()) for (var l = t.childNodes, c = 0, u = l.length; c < u; c++) {
                            var h = l[c],
                                p = h.nodeName.toLowerCase();
                            "source" === p ? e.sources.push(P(h)) : "track" === p && e.tracks.push(P(h))
                        }
                        return e
                    },
                    e.prototype.flexNotSupported_ = function () {
                        var t = Ye.createElement("i");
                        return !("flexBasis" in t.style || "webkitFlexBasis" in t.style || "mozFlexBasis" in t.style || "msFlexBasis" in t.style || "msFlexOrder" in t.style)
                    },
                    e
            }(Ir);
        Vi.names.forEach(function (t) {
            var e = Vi[t];
            Is.prototype[e.getterName] = function () {
                return this.tech_ ? this.tech_[e.getterName]() : (this[e.privateName] = this[e.privateName] || new e.ListClass, this[e.privateName])
            }
        }),
            Is.players = {};
        var Ms = Ke.navigator;
        Is.prototype.options_ = {
            techOrder: no.defaultTechOrder_,
            html5: {},
            flash: {},
            inactivityTimeout: 2e3,
            playbackRates: [],
            children: ["mediaLoader", "posterImage", "textTrackDisplay", "loadingSpinner", "bigPlayButton", "controlBar", "errorDisplay", "textTrackSettings"],
            language: Ms && (Ms.languages && Ms.languages[0] || Ms.userLanguage || Ms.language) || "en",
            languages: {},
            notSupportedMessage: "No compatible source was found for this media."
        },
            ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function (t) {
                Is.prototype[t] = function () {
                    return this.techGet_(t)
                }
            }),
            xs.forEach(function (t) {
                Is.prototype["handleTech" + nt(t) + "_"] = function () {
                    return this.trigger(t)
                }
            }),
            Ir.registerComponent("Player", Is);
        var Ds = {},
            As = function (t) {
                return Ds.hasOwnProperty(t)
            },
            Rs = function (t) {
                return As(t) ? Ds[t] : undefined
            },
            js = function (t, e) {
                t.activePlugins_ = t.activePlugins_ || {},
                    t.activePlugins_[e] = !0
            },
            Os = function (t, e, n) {
                var r = (n ? "before" : "") + "pluginsetup";
                t.trigger(r, e),
                    t.trigger(r + ":" + e.name, e)
            },
            Ls = function (t, e) {
                var n = function () {
                    Os(this, {
                        name: t,
                        plugin: e,
                        instance: null
                    }, !0);
                    var n = e.apply(this, arguments);
                    return js(this, t),
                        Os(this, {
                            name: t,
                            plugin: e,
                            instance: n
                        }),
                        n
                };
                return Object.keys(e).forEach(function (t) {
                    n[t] = e[t]
                }),
                    n
            },
            Ns = function (t, e) {
                return e.prototype.name = t,


                    function () {
                        Os(this, {
                            name: t,
                            plugin: e,
                            instance: null
                        }, !0);
                        for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        var o = new(Function.prototype.bind.apply(e, [null].concat([this].concat(r))));
                        return this[t] = function () {
                            return o
                        },
                            Os(this, o.getEventHash()),
                            o
                    }
            },
            Bs = function () {
                function t(e) {
                    if (qn(this, t), this.constructor === t) throw new Error("Plugin must be sub-classed; not directly instantiated.");
                    this.player = e,
                        tt(this),
                        delete this.trigger,
                        et(this, this.constructor.defaultState),
                        js(e, this.name),
                        this.dispose = vr(this, this.dispose),
                        e.on("dispose", this.dispose)
                }
                return t.prototype.version = function () {
                    return this.constructor.VERSION
                },
                    t.prototype.getEventHash = function () {
                        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        return t.name = this.name,
                            t.plugin = this.constructor,
                            t.instance = this,
                            t
                    },
                    t.prototype.trigger = function (t) {
                        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                        return Y(this.eventBusEl_, t, this.getEventHash(e))
                    },
                    t.prototype.handleStateChanged = function (t) {},
                    t.prototype.dispose = function () {
                        var t = this.name,
                            e = this.player;
                        this.trigger("dispose"),
                            this.off(),
                            e.off("dispose", this.dispose),
                            e.activePlugins_[t] = !1,
                            this.player = this.state = null,
                            e[t] = Ns(t, Ds[t])
                    },
                    t.isBasic = function (e) {
                        var n = "string" == typeof e ? Rs(e) : e;
                        return "function" == typeof n && !t.prototype.isPrototypeOf(n.prototype)
                    },
                    t.registerPlugin = function (e, n) {
                        if ("string" != typeof e) throw new Error('Illegal plugin name, "' + e + '", must be a string, was ' + (void 0 === e ? "undefined" : zn(e)) + ".");
                        if (As(e)) tr.warn('A plugin named "' + e + '" already exists. You may want to avoid re-registering plugins!');
                        else if (Is.prototype.hasOwnProperty(e)) throw new Error('Illegal plugin name, "' + e + '", cannot share a name with an existing player method!');
                        if ("function" != typeof n) throw new Error('Illegal plugin for "' + e + '", must be a function, was ' + (void 0 === n ? "undefined" : zn(n)) + ".");
                        return Ds[e] = n,
                        "plugin" !== e && (t.isBasic(n) ? Is.prototype[e] = Ls(e, n) : Is.prototype[e] = Ns(e, n)),
                            n
                    },
                    t.deregisterPlugin = function (t) {
                        if ("plugin" === t) throw new Error("Cannot de-register base plugin.");
                        As(t) && (delete Ds[t], delete Is.prototype[t])
                    },
                    t.getPlugins = function () {
                        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.keys(Ds),
                            e = void 0;
                        return t.forEach(function (t) {
                            var n = Rs(t);
                            n && (e = e || {}, e[t] = n)
                        }),
                            e
                    },
                    t.getPluginVersion = function (t) {
                        var e = Rs(t);
                        return e && e.VERSION || ""
                    },
                    t
            }();
        Bs.getPlugin = Rs,
            Bs.BASE_PLUGIN_NAME = "plugin",
            Bs.registerPlugin("plugin", Bs),
            Is.prototype.usingPlugin = function (t) {
                return !!this.activePlugins_ && !0 === this.activePlugins_[t]
            },
            Is.prototype.hasPlugin = function (t) {
                return !!As(t)
            };
        var Fs = function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : zn(e)));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                e && (t.super_ = e)
            },
            Hs = function (t) {
                var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                    n = function () {
                        t.apply(this, arguments)
                    },
                    r = {};
                "object" === (void 0 === e ? "undefined" : zn(e)) ? (e.constructor !== Object.prototype.constructor && (n = e.constructor), r = e) : "function" == typeof e && (n = e),
                    Fs(n, t);
                for (var i in r) r.hasOwnProperty(i) && (n.prototype[i] = r[i]);
                return n
            };
        if ("undefined" == typeof HTMLVideoElement && y() && (Ye.createElement("video"), Ye.createElement("audio"), Ye.createElement("track"), Ye.createElement("video-js")), ie.hooks_ = {}, ie.hooks = function (t, e) {
            return ie.hooks_[t] = ie.hooks_[t] || [],
            e && (ie.hooks_[t] = ie.hooks_[t].concat(e)),
                ie.hooks_[t]
        }, ie.hook = function (t, e) {
            ie.hooks(t, e)
        }, ie.hookOnce = function (t, e) {
            ie.hooks(t, [].concat(e).map(function (e) {
                return function n() {
                    return ie.removeHook(t, n),
                        e.apply(undefined, arguments)
                }
            }))
        }, ie.removeHook = function (t, e) {
            var n = ie.hooks(t).indexOf(e);
            return !(n <= -1) && (ie.hooks_[t] = ie.hooks_[t].slice(), ie.hooks_[t].splice(n, 1), !0)
        }, !0 !== Ke.VIDEOJS_NO_DYNAMIC_STYLE && y()) {
            var Vs = rr(".vjs-styles-defaults");
            if (!Vs) {
                Vs = yr("vjs-styles-defaults");
                var Us = rr("head");
                Us && Us.insertBefore(Vs, Us.firstChild),
                    gr(Vs, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")
            }
        }
        Z(1, ie),
            ie.VERSION = "6.6.2",
            ie.options = Is.prototype.options_,
            ie.getPlayers = function () {
                return Is.players
            },
            ie.players = Is.players,
            ie.getComponent = Ir.getComponent,
            ie.registerComponent = function (t, e) {
                no.isTech(e) && tr.warn("The " + t + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),
                    Ir.registerComponent.call(Ir, t, e)
            },
            ie.getTech = no.getTech,
            ie.registerTech = no.registerTech,
            ie.use = Wt,
            ie.browser = Un,
            ie.TOUCH_ENABLED = kn,
            ie.extend = Hs,
            ie.mergeOptions = it,
            ie.bind = vr,
            ie.registerPlugin = Bs.registerPlugin,
            ie.plugin = function (t, e) {
                return tr.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),
                    Bs.registerPlugin(t, e)
            },
            ie.getPlugins = Bs.getPlugins,
            ie.getPlugin = Bs.getPlugin,
            ie.getPluginVersion = Bs.getPluginVersion,
            ie.addLanguage = function (t, e) {
                var n;
                return t = ("" + t).toLowerCase(),
                    ie.options.languages = it(ie.options.languages, (n = {}, n[t] = e, n)),
                    ie.options.languages[t]
            },
            ie.log = tr,
            ie.createTimeRange = ie.createTimeRanges = ct,
            ie.formatTime = te,
            ie.parseUrl = ii,
            ie.isCrossOrigin = ai,
            ie.EventTarget = _r,
            ie.on = G,
            ie.one = J,
            ie.off = $,
            ie.trigger = Y,
            ie.xhr = Mi,
            ie.TextTrack = Ri,
            ie.AudioTrack = ji,
            ie.VideoTrack = Oi,
            ["isEl", "isTextNode", "createEl", "hasClass", "addClass", "removeClass", "toggleClass", "setAttributes", "getAttributes", "emptyEl", "appendContent", "insertContent"].forEach(function (t) {
                ie[t] = function () {
                    return tr.warn("videojs." + t + "() is deprecated; use videojs.dom." + t + "() instead"),
                        or[t].apply(null, arguments)
                }
            }),
            ie.computedStyle = h,
            ie.dom = or,
            ie.url = li;
        var zs = {
                m3u8: "application/x-mpegURL",
                flv: "video/flv",
                mp4: "video/mp4",
                webm: "video/webm",
                rtmp: "rtmp/flv",
                mpd: "application/dash+xml"
            },
            qs = "https://drm.vod2.myqcloud.com/getlicense/v1",
            Ws = function (t) {
                return encodeURIComponent(t).replace(/[!'()*]/g, function (t) {
                    return "%" + t.charCodeAt(0).toString(16).toUpperCase()
                })
            },
            Ks = Object.getOwnPropertySymbols,
            Xs = Object.prototype.hasOwnProperty,
            Qs = Object.prototype.propertyIsEnumerable,
            Gs = function () {
                try {
                    if (!Object.assign) return !1;
                    var t = new String("abc");
                    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                    for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                        return e[t]
                    }).join("")) return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                        r[t] = t
                    }),
                    "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (i) {
                    return !1
                }
            }() ? Object.assign : function (t, e) {
                for (var n, r, i = oe(t), o = 1; o < arguments.length; o++) {
                    n = Object(arguments[o]);
                    for (var s in n) Xs.call(n, s) && (i[s] = n[s]);
                    if (Ks) {
                        r = Ks(n);
                        for (var a = 0; a < r.length; a++) Qs.call(n, r[a]) && (i[r[a]] = n[r[a]])
                    }
                }
                return i
            },
            $s = new RegExp("%[a-f0-9]{2}", "gi"),
            Ys = new RegExp("(%[a-f0-9]{2})+", "gi"),
            Js = function (t) {
                if ("string" != typeof t) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof t + "`");
                try {
                    return t = t.replace(/\+/g, " "),
                        decodeURIComponent(t)
                } catch (e) {
                    return le(t)
                }
            },
            Zs = de,
            ta = fe,
            ea = function (t, e) {
                e = Gs({
                    encode: !0,
                    strict: !0,
                    arrayFormat: "none"
                }, e),
                !1 === e.sort && (e.sort = function () {});
                var n = ce(e);
                return t ? Object.keys(t).sort(e.sort).map(function (r) {
                    var i = t[r];
                    if (i === undefined) return "";
                    if (null === i) return he(r, e);
                    if (Array.isArray(i)) {
                        var o = [];
                        return i.slice().forEach(function (t) {
                            t !== undefined && o.push(n(r, t, o.length))
                        }),
                            o.join("&")
                    }
                    return he(r, e) + "=" + he(i, e)
                }).filter(function (t) {
                    return t.length > 0
                }).join("&") : ""
            },
            na = function (t, e) {
                return {
                    url: t.split("?")[0] || "",
                    query: fe(de(t), e)
                }
            },
            ra = {
                extract: Zs,
                parse: ta,
                stringify: ea,
                parseUrl: na
            },
            ia = 0,
            oa = function (t) {
                function e(n, r, i) {
                    qn(this, e),
                        tr("MediaAsyncLoader initializing");
                    var o = it({
                            createEl: !1
                        }, r),
                        s = Kn(this, t.call(this, n, o, i)),
                        a = o.playerOptions || o;
                    return s.getInfo(a),
                        n.loadVideoByID = vr(s, s.loadVideoByID),
                        tr("MediaAsyncLoader initialized"),
                        s
                }
                return Wn(e, t),
                    e.prototype.getInfo = function (t) {
                        t && t.fileID && t.appID && (t.playDefinition ? this.getInfoV3(t) : this.getInfoV2(t))
                    },
                    e.prototype.getInfoV2 = function (t) {
                        var e = this.player(),
                            n = this.assemblyPath("getplayinfo", t.appID, t.fileID),
                            r = t.t,
                            i = t.us,
                            o = t.exper,
                            s = t.sign,
                            a = {};
                        t.ssign ? a.super_sign = t.ssign : s && (a = {
                            t: r,
                            sign: s
                        }, (i || 0 == i) && (a.us = i), (o || 0 == o) && (a.exper = o, e.trigger({
                            type: "feature",
                            data: "exper"
                        })), e.trigger({
                            type: "feature",
                            data: "key"
                        })),
                        t.playerID && (a.playerid = t.playerID),
                            this.requestTimestamp = +(new Date).getTime(),
                            e.trigger({
                                type: "playcgistart",
                                data: {
                                    time: this.requestTimestamp,
                                    url: n
                                }
                            }),
                            tr("playcgi loading");
                        var l = ra.stringify(a);
                        l && (n += (~n.indexOf("?") ? "&" : "?") + l, n = n.replace("?&", "?")),
                            this.getInfoRetryTimes = 0,
                            this.getInfoRequest = function () {
                                Tn && Tn < 10 ? ye(n, {
                                    param: a,
                                    timeout: 3e3,
                                    prefix: "TcCallBack"
                                }, vr(this, this.onResult)) : Mi({
                                    url: n,
                                    timeout: 3e3
                                }, vr(this, this.onResult))
                            },
                            this.getInfoRequest()
                    },
                    e.prototype.onResult = function (t, e, n) {
                        try {
                            n ? e = JSON.parse(n) : t || e || (t = new Error("ServerError"))
                        } catch (l) {
                            t = new Error("ServerError")
                        }
                        var r = this.player();
                        if (t) {
                            if (tr("playcgi loaded failure"), this.getInfoRetryTimes < 3) return this.getInfoRetryTimes++,
                                void this.getInfoRequest();
                            r.trigger({
                                type: "playcgiend",
                                data: {
                                    time: +(new Date).getTime(),
                                    startTime: this.requestTimestamp,
                                    error: t,
                                    result: e
                                }
                            });
                            var i = 12;
                            switch (t.message) {
                                case "XMLHttpRequest timeout":
                                case "Timeout":
                                    i = 10;
                                    break;
                                case "ServerError":
                                    i = 11
                            }
                            this.player().error({
                                code: i
                            })
                        } else {
                            if (r.trigger({
                                type: "playcgiend",
                                data: {
                                    time: +(new Date).getTime(),
                                    startTime: this.requestTimestamp,
                                    error: t,
                                    result: e
                                }
                            }), 0 != e.code) return tr("playcgi loaded failure"),
                                void this.player().error({
                                    code: e.code
                                });
                            tr("playcgi loaded success");
                            var o = e.coverInfo,
                                s = e.videoInfo,
                                a = e.playerInfo;
                            this.setPoster(o),
                                this.setLogo(a),
                                this.setSrc(e),
                                this.setPatch(a),
                                this.setVttThumbnail(e),
                                this.setDots(e),
                                this.setOriginDuration(s),
                                this.setPlayList(a)
                        }
                    },
                    e.prototype.getInfoV3 = function (t) {
                        var e = this.player(),
                            n = this.assemblyPathV3("getplayinfo", t.appID, t.fileID, t.playDefinition),
                            r = t.t,
                            i = t.us,
                            o = t.rlimit,
                            s = t.sign,
                            a = {};
                        t.ssign ? a.super_sign = t.ssign : s && (a = {
                            t: r,
                            sign: s
                        }, (i || 0 == i) && (a.us = i), o && (a.rlimit = o), e.trigger({
                            type: "feature",
                            data: "key"
                        })),
                        t.playerID && (a.playerid = t.playerID),
                            this.requestTimestamp = +(new Date).getTime(),
                            e.trigger({
                                type: "playcgistart",
                                data: {
                                    time: this.requestTimestamp,
                                    url: n
                                }
                            }),
                            tr("playcgi v3 loading");
                        var l = ra.stringify(a);
                        l && (n += (~n.indexOf("?") ? "&" : "?") + l, n = n.replace("?&", "?")),
                            this.getInfoRetryTimes = 0,
                            this.getInfoRequest = function () {
                                Tn && Tn < 10 ? ye(n, {
                                    param: a,
                                    timeout: 3e3,
                                    prefix: "TcCallBack"
                                }, vr(this, this.onResultV3)) : Mi({
                                    url: n,
                                    timeout: 3e3
                                }, vr(this, this.onResultV3))
                            },
                            this.getInfoRequest()
                    },
                    e.prototype.onResultV3 = function (t, e, n) {
                        try {
                            n ? e = JSON.parse(n) : t || e.body || (t = new Error("ServerError"))
                        } catch (a) {
                            t = new Error("ServerError")
                        }
                        var r = this.player();
                        if (t) {
                            if (tr("playcgi v3 loaded failure"), this.getInfoRetryTimes < 3) return this.getInfoRetryTimes++,
                                void this.getInfoRequest();
                            r.trigger({
                                type: "playcgiend",
                                data: {
                                    time: +(new Date).getTime(),
                                    startTime: this.requestTimestamp,
                                    error: t,
                                    result: e
                                }
                            });
                            var i = 12;
                            switch (t.message) {
                                case "XMLHttpRequest timeout":
                                case "Timeout":
                                    i = 10;
                                    break;
                                case "ServerError":
                                    i = 11
                            }
                            this.player().error({
                                code: i
                            })
                        } else {
                            if (r.trigger({
                                type: "playcgiend",
                                data: {
                                    time: +(new Date).getTime(),
                                    startTime: this.requestTimestamp,
                                    error: t,
                                    result: e
                                }
                            }), 0 != e.code) return tr("playcgi v3 loaded failure"),
                                void this.player().error({
                                    code: e.code
                                });
                            tr("playcgi v3 loaded success");
                            var o = e.mediaInfo,
                                s = e.playerInfo;
                            this.setPoster({
                                coverUrl: o.basicInfo.coverUrl
                            }),
                                this.setLogo(s),
                                this.setSrcV3(o),
                                this.setPatch(s),
                                this.setVttThumbnail(o),
                                this.setDots(o)
                        }
                    },
                    e.prototype.setSrcV3 = function (t, e) {
                        var n = this,
                            r = this.player(),
                            i = r.options_.plugins,
                            o = r.DRM().options || i.DRM,
                            s = void 0,
                            a = void 0,
                            l = void 0,
                            c = [],
                            u = {},
                            h = {};
                        if (e = e || (o ? o.skipPlan : ""), t.previewStreamingInfo && t.previewStreamingInfo.previewStreamingList.length > 0) t.previewStreamingInfo.previewStreamingList.forEach(function (t, e) {
                            t.mineType = n.getMIMEType(t.url),
                                u[si(t.url)] = t
                        });
                        else {
                            if (!(t.dynamicStreamingInfo.adaptiveStreamingInfoList && t.dynamicStreamingInfo.adaptiveStreamingInfoList.length > 0)) return void this.player().error({
                                code: 13,
                                message: "no video stream"
                            });
                            if (t.dynamicStreamingInfo.adaptiveStreamingInfoList.forEach(function (t, e) {
                                t.mineType = n.getMIMEType(t.url),
                                    h[t.drmType.toLowerCase() || si(t.url)] = t
                            }), o && o.token ? (s = o.token, l = o.certificateUri, e = Cn && !l ? "fairplay" : e, a = Ke.encodeURIComponent(s)) : e = "all", (mn || gn) && Ke.navigator.requestMediaKeySystemAccess && h.widevine && "widevine" != e && "all" != e ? (c.push({
                                src: ve(h.widevine.url),
                                type: this.getMIMEType(h.widevine.url),
                                keySystems: {
                                    "com.widevine.alpha": {
                                        serverURL: qs + "?token=" + a + "&drmType=" + h.widevine.drmType
                                    }
                                }
                            }), tr("DRM source widevine", c)) : Cn && !hn && h.fairplay && "fairplay" != e && "all" != e && (c.push({
                                src: ve(h.fairplay.url),
                                type: this.getMIMEType(h.fairplay.url),
                                keySystems: {
                                    "com.apple.fps.1_0": {
                                        certificateUri: l,
                                        licenseUri: qs + "?token=" + a + "&drmType=" + h.fairplay.drmType
                                    }
                                }
                            }), tr("DRM source fairplay", c)), h.simpleaes && "all" != e) {
                                var p = h.simpleaes.url.split("/");
                                p[p.length - 1] = "voddrm.token." + a + "." + p[p.length - 1],
                                    c.push({
                                        src: ve(p.join("/")),
                                        type: this.getMIMEType(h.simpleaes.url)
                                    }),
                                    tr("DRM source simpleaes", c)
                            }
                            h.m3u8 && c.push({
                                src: ve(h.m3u8.url),
                                type: this.getMIMEType(h.m3u8.url)
                            }),
                            h.mpd && c.push({
                                src: ve(h.mpd.url),
                                type: this.getMIMEType(h.mpd.url)
                            })
                        }
                        if (!(c.length > 0)) return void this.player().error({
                            code: 4
                        });
                        r.src(c);
                        var d = function (e) {
                            return tr("DRM init Error", c),
                                5 !== e.data.code && 2 !== e.data.code || !c[0].keySystems["com.widevine.alpha"] ? 3 === e.data.code && c[0].keySystems["com.apple.fps.1_0"] ? void n.setSrcV3(t, "fairplay") : 14 === e.data.code || 3 === e.data.code ? void n.setSrcV3(t, "all") : void 0 : void n.setSrcV3(t, "widevine")
                        };
                        "all" !== e && (Ke.setTimeout(function () {
                            r.one("error", d)
                        }, 0), r.one("playing", function (t) {}))
                    },
                    e.prototype.setLogo = function (t) {
                        var e = this.player();
                        t.logoPic ? (e.logoImage.update({
                            img: {
                                url: ve(t.logoPic),
                                position: t.logoLocation
                            },
                            link: ve(t.logoUrl)
                        }), e.trigger({
                            type: "feature",
                            data: "logo"
                        })) : e.logoImage.reset()
                    },
                    e.prototype.setPoster = function (t) {
                        var e = this.player();
                        t && t.coverUrl ? e.poster(ve(t.coverUrl)) : e.options_.playerOptions.poster || e.poster("")
                    },
                    e.prototype.setDots = function (t) {
                        var e = this.player();
                        if (e.options_.dots = null, t.keyFrameDescInfo && t.keyFrameDescInfo.keyFrameDescList && t.keyFrameDescInfo.keyFrameDescList.length > 0) {
                            var n = t.keyFrameDescInfo.keyFrameDescList;
                            e.options_.dots = n
                        }
                        var r = e.options_.plugins;
                        r && r.ProgressMarker && r.ProgressMarker.markers && r.ProgressMarker.markers.length > 0 && (e.options_.dots = e.options_.dots.concat(r.ProgressMarker.markers)),
                            e.ProgressMarker().init()
                    },
                    e.prototype.setSrc = function (t) {
                        var e = this.player(),
                            n = t.videoInfo;
                        if ((null != e.options_.definition || e.options_.definition != undefined) && n.transcodeList && n.transcodeList.length > 0) {
                            e.trigger({
                                type: "feature",
                                data: "definition"
                            });
                            var r = this.getSrcByDefinition(n, e.options_.definition);
                            if (r) return e.src({
                                src: ve(r.url),
                                type: this.getMIMEType(r.url)
                            }),
                                !0
                        }
                        if (e.MultiResolution().reset(), n.masterPlayList) e.src(this.getMasterSouces(n)),
                            e.MultiResolution().store(this.getMultiResolutionData(t));
                        else if (n.transcodeList && n.transcodeList.length > 0) {
                            var i = this.getMultiResolutionData(t);
                            if (i.showOrder.length > 0) e.MultiResolution().init(i);
                            else {
                                var o = n.transcodeList[0].url;
                                e.src({
                                    src: ve(o),
                                    type: this.getMIMEType(o)
                                })
                            }
                        } else n.sourceVideo && this.getMIMEType(n.sourceVideo.url) ? e.src({
                            src: ve(n.sourceVideo.url),
                            type: this.getMIMEType(n.sourceVideo.url)
                        }) : this.player().error({
                            code: 13
                        })
                    },
                    e.prototype.setPatch = function (t) {
                        var e = this.player();
                        t.patchInfo ? e.ImagePatch().init(t.patchInfo) : e.ImagePatch().reset()
                    },
                    e.prototype.setVttThumbnail = function (t) {
                        var e = this.player();
                        t.imageSpriteInfo && t.imageSpriteInfo.imageSpriteList ? e.ready(vr(this, function () {
                            e.VttThumbnail().init({
                                vttUrl: ve(t.imageSpriteInfo.imageSpriteList[0].webVttUrl)
                            })
                        })) : e.VttThumbnail().reset()
                    },
                    e.prototype.setOriginDuration = function (t) {
                        var e = this.player();
                        if (e.options_.exper > 0) {
                            var n = t.sourceVideo ? t.sourceVideo.floatDuration : t.transcodeList[0].floatDuration;
                            e.one("play", function () {
                                e.duration(n)
                            })
                        }
                    },
                    e.prototype.getMasterSouces = function (t) {
                        var e = t.masterPlayList,
                            n = [];
                        return n.push({
                            src: ve(e.url),
                            type: zs.m3u8
                        }),
                            n
                    },
                    e.prototype.getMultiResolutionData = function (t) {
                        var e = {
                                sources: {},
                                labels: {},
                                showOrder: [],
                                defaultRes: ""
                            },
                            n = [],
                            r = t.videoInfo.transcodeList,
                            i = this;
                        return t.playerInfo.videoClassification.forEach(function (t, o) {
                            r.length > 0 && (r = r.filter(function (r) {
                                if (!(t.definitionList.indexOf(r.definition) > -1)) return !0;
                                n[t.id] || (e.showOrder.push(t.id), e.labels[t.id] = t.name, n[t.id] = []),
                                    n[t.id].push({
                                        src: ve(r.url),
                                        type: i.getMIMEType(r.url)
                                    })
                            }))
                        }),
                            e.sources = n,
                            e.defaultRes = t.playerInfo.defaultVideoClassification || Object.keys(n)[0],
                            e
                    },
                    e.prototype.getSrcByDefinition = function (t, e) {
                        var n = t.transcodeList,
                            r = t.sourceVideo;
                        if (0 == e) return r;
                        for (var i = 0; i < n.length; i++) if (n[i].definition == e) return n[i]
                    },
                    e.prototype.getMIMEType = function (t) {
                        var e = zs[si(t)];
                        return e || (tr.error("MIME type no found! Ext = " + si(t)), "")
                    },
                    e.prototype.assemblyPath = function (t, e, n) {
                        var r = Ke.location.protocol;
                        return "http:" != r && "https:" != r && (r = "https:"),
                        r + "//playvideo.qcloud.com/" + t + "/v2/" + e + "/" + n
                    },
                    e.prototype.assemblyPathV3 = function (t, e, n, r) {
                        var i = Ke.location.protocol;
                        return "http:" != i && "https:" != i && (i = "https:"),
                        i + "//playvideo.qcloud.com/" + t + "/v3/" + e + "/" + n + "/" + r
                    },
                    e.prototype.customHost = function (t) {
                        var e = this.player();
                        e.options_.customHost && /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(e.options_.customHost) && (t.masterPlayList && (t.masterPlayList.url = me(t.masterPlayList.url, e.options_.customHost)), t.sourceVideo && (t.sourceVideo.url = me(t.sourceVideo.url, e.options_.customHost)), t.transcodeList.length > 0 && t.transcodeList.forEach(function (t, n) {
                            t.url = me(t.url, e.options_.customHost)
                        }), e.trigger({
                            type: "feature",
                            data: "customHost"
                        }))
                    },
                    e.prototype.loadVideoByID = function (t) {
                        var e = this.player();
                        e.hasStarted(!1),
                            this.getInfo(t),
                            e.playbackRate(1),
                            e.options_.appID = t.appID,
                            e.options_.fileID = t.fileID,
                        e.bigPlayButton && e.bigPlayButton.show(),
                        e.options_.plugins.ContinuePlay && e.ContinuePlay().init()
                    },
                    e.prototype.setPlayList = function (t) {
                        this.player().options_.plugins.PlayList || t.playlist && t.playlist.data instanceof Array && t.playlist.data.length > 0 && this.player_.PlayList(t.playlist)
                    },
                    e
            }(Ir);
        Ir.registerComponent("MediaAsyncLoader", oa);
        var sa = (ie.getComponent("Component"), ie.getComponent("ClickableComponent")),
            aa = ["left-top", "left-bottom", "right-top", "right-bottom"],
            la = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return n.on("logochange", ie.bind(i, function (t) {
                        this.update(t.data)
                    })),
                    r.img && i.update(r),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = ie.dom.createEl("div", {
                                className: "tcp-logo vjs-hidden"
                            }),
                            e = ie.dom.createEl("a", {
                                className: "tcp-logo-link",
                                target: "_blank"
                            }),
                            n = ie.dom.createEl("img", {
                                className: "tcp-logo-img"
                            });
                        return this.linkEl_ = e,
                            this.imgEl_ = n,
                            e.appendChild(n),
                            t.appendChild(e),
                            t
                    },
                    e.prototype.update = function (t) {
                        var e = t.img,
                            n = t.link;
                        this.setImg(e),
                            this.setHref(n),
                            this.options_ = ie.mergeOptions(this.options_, t),
                            this.show()
                    },
                    e.prototype.setImg = function (t) {
                        if (this.imgEl_) {
                            this.imgEl_.src = t.url;
                            var e = aa[t.position] || t.position || "left-top";
                            ie.dom.addClass(this.el_, e)
                        }
                    },
                    e.prototype.setHref = function (t) {
                        this.linkEl_ && t && (this.linkEl_.href = t)
                    },
                    e.prototype.reset = function () {
                        this.hide(),
                            this.imgEl_.removeAttribute("src"),
                            this.linkEl_.removeAttribute("href")
                    },
                    e
            }(sa);
        ie.registerComponent("LogoImage", la);
        var ca = ie.getComponent("Component"),
            ua = ie.getComponent("Button"),
            ha = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.init(r),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return ie.dom.createEl("div", {
                            className: "tcp-continue-play-tips"
                        })
                    },
                    e.prototype.close = function () {
                        this.hide()
                    },
                    e.prototype.init = function (t) {
                        var e = this.addChild("closeButton", {
                            controlText: "Close"
                        });
                        this.on(e, "close", this.close),
                            this.addChild("ContinuePlayTipsContent", t);
                        var n = this.addChild("ContinuePlayButton", t);
                        this.on(n, ["tap", "click"], this.close),
                            this.setTimeout(function () {
                                this.close()
                            }, 3500)
                    },
                    e
            }(ca);
        ie.registerComponent("ContinuePlayTips", ha);
        var pa = function (t) {
            function e(n, r) {
                return qn(this, e),
                    Kn(this, t.call(this, n, r))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var t = ie.dom.createEl("span", {
                            className: "tcp-continue-play-tips-content"
                        }),
                        e = ie.dom.createEl("span", {
                            className: "tcp-text",
                            textContent: this.localize(this.options_.text || "Last time play at ")
                        }),
                        n = ie.dom.createEl("span", {
                            className: "tcp-time",
                            textContent: ie.formatTime(this.options_.time)
                        });
                    return this.textEl_ = e,
                        this.timeEl_ = n,
                        t.appendChild(e),
                        t.appendChild(n),
                        t
                },
                e
        }(ca);
        ie.registerComponent("ContinuePlayTipsContent", pa);
        var da = function (t) {
            function e(n, r) {
                return qn(this, e),
                    Kn(this, t.call(this, n, r))
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "button", {
                        className: "tcp-continue-play-buttom",
                        textContent: this.localize(this.options_.btnText || "Resume play")
                    })
                },
                e.prototype.handleClick = function () {
                    this.options_.resumeCallback.call()
                },
                e
        }(ua);
        ie.registerComponent("ContinuePlayButton", da);
        var fa = ie.getComponent("MenuItem"),
            ya = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.addClass("tc-menu-list"),
                        i.open = !1,
                        i.hasOpen = !1,
                        i.player = n,
                        i.setup(),
                        i
                }
                return Wn(e, t),
                    e.prototype.setup = function () {
                        var t = this;
                        this.on(["tap", "click"], function () {
                            var e = t.player.tech().el();
                            t.hasOpen || (window.MtaH5 && MtaH5.clickStat("mirror", {
                                appid: t.player.options_.appID,
                                fileid: t.player.options_.fileID
                            }), t.player.trigger({
                                type: "feature",
                                data: "mirror"
                            })),
                                t.open ? (ie.dom.removeClass(e, "tcp-mirror"), ie.dom.removeClass(t.el_, "tcp-menu-item-select")) : (ie.dom.addClass(e, "tcp-mirror"), ie.dom.addClass(t.el_, "tcp-menu-item-select"), t.hasOpen = !0),
                                t.open = !t.open
                        })
                    },
                    e
            }(fa);
        ie.registerComponent("MirrorMenuItem", ya);
        var ga = ie.getComponent("MenuItem"),
            va = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.addClass("tc-menu-list"),
                        i
                }
                return Wn(e, t),
                    e
            }(ga);
        ie.registerComponent("PoweredByMenuItem", va);
        var ma = (ie.getComponent("Component"), ie.getComponent("Menu")),
            _a = (ie.getComponent("MenuItem"), function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    i.hide(),
                        // i.addChild("PoweredByMenuItem", {
                        //     // label: "Powered by Tencent Cloud."
                        //     label: ""
                        // }),
                    r.mirror && i.addChild("MirrorMenuItem", {
                        label: "Mirror"
                    }),
                        n.on("contextmenu", ie.bind(i, i.onContextmenu)),
                        n.on(["tap", "click"], ie.bind(i, function (t) {
                            if (this.popped) return this.hide(),
                                t.stopPropagation(),
                                t.preventDefault(),
                                !1
                        })),
                        ie.on(document, ["tap", "click"], ie.bind(i, function (t) {
                            this.popped && this.hide()
                        }));
                    var o = i;
                    return i.children().forEach(function (t) {
                        t.on(["tap", "click"], function () {
                            o.hide()
                        })
                    }),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var e = t.prototype.createEl.call(this);
                        return ie.dom.addClass(e, "tcp-right-click-popup-menu"),
                            e
                    },
                    e.prototype.show = function () {
                        t.prototype.show.call(this),
                            this.popped = !0
                    },
                    e.prototype.hide = function () {
                        t.prototype.hide.call(this),
                            this.popped = !1
                    },
                    e.prototype.onContextmenu = function (t) {
                        t.preventDefault(),
                            this.show();
                        var e = this.el(),
                            n = t.clientX,
                            r = t.clientY,
                            i = _e(),
                            o = i.width,
                            s = i.height,
                            a = n + e.offsetWidth - o + 5;
                        a = Math.max(0, a);
                        var l = r + e.offsetHeight - s + 5;
                        l = Math.max(0, l);
                        var c = this.player().el().getBoundingClientRect();
                        e.style.left = Math.max(0, n - c.left - a) + "px",
                            e.style.top = Math.max(0, r - c.top - l) + "px"
                    },
                    e
            }(ma));
        ie.registerComponent("RightClickPopupMenu", _a);
        var ba = ie.getComponent("ClickableComponent"),
            Ta = ie.getComponent("TimeTooltip"),
            Ca = ie.getComponent("Component"),
            Ea = ie.dom,
            ka = ie.formatTime,
            wa = {
                POPUP_CONTAINER_OFFSET: -130,
                POPUP_CONTAINER_OFFSET_WITHOUTGIT: -100,
                TRIANGLE_OFFEST: 96,
                TRIANGLE_OFFEST_WITHOUTGIF: 95
            },
            Sa = {
                TRIANGLE_OFFEST: 6,
                POPUP_CONTAINER_OFFSET: 0
            },
            Pa = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.duration = 0,
                        i.registerListener(),
                        i
                }
                return Wn(e, t),
                    e.prototype.registerListener = function () {
                        this.player_.one("canplay", ie.bind(this, this.resetDotsElement))
                    },
                    e.prototype.resetDotsElement = function () {
                        var t = this.player_;
                        this.duration = t.duration(),
                            Ea.emptyEl(this.el_),
                            this.resetEl()
                    },
                    e.prototype.resetEl = function () {
                        this.setUpEl()
                    },
                    e.prototype.dotMouseLeave = function () {
                        var t = event.currentTarget,
                            e = t.getAttribute("container-id");
                        this.getChildById(e).hide()
                    },
                    e.prototype.dotHover = function () {
                        var t = event.currentTarget.parentElement.offsetWidth,
                            e = event.currentTarget.offsetLeft + 140,
                            n = this.getChildById(event.currentTarget.getAttribute("container-id")),
                            r = n.getAttribute("class").search("tcp-without-gif") >= 0,
                            i = n.el_.querySelector(".tcp-triangle-both") || n.el_.querySelector(".tcp-triangle");
                        e > t ? r ? (n.el_.style.left = wa.POPUP_CONTAINER_OFFSET_WITHOUTGIT + "px", i.style.left = wa.TRIANGLE_OFFEST_WITHOUTGIF + "%") : (n.el_.style.left = wa.POPUP_CONTAINER_OFFSET + "px", i.style.left = wa.TRIANGLE_OFFEST + "%") : event.currentTarget.offsetLeft <= 140 && !r && (n.el_.style.left = Sa.POPUP_CONTAINER_OFFSET + "px", i.style.left = Sa.TRIANGLE_OFFEST + "px");
                        var o = n.getChild("DotImage");
                        if (o) {
                            var s = o.el_.getElementsByClassName("tcp-dot-timestamp")[0],
                                a = event.currentTarget.getAttribute("dotinsecond"),
                                l = ka(a);
                            s.innerHTML = l
                        }
                        n.show()
                    },
                    e.prototype.setChildInTheContainer = function (t, e) {
                        var n = t.content && "" !== t.content ? decodeURIComponent(t.content.replace(/\+/g, " ")) : "";
                        if ("" !== n) {
                            var r = e.addChild("DotComment");
                            r.el_.innerHTML = Ee(n)
                        }
                        if (t.img) {
                            e.el_.querySelector(".tcp-triangle").setAttribute("class", "tcp-triangle-both");
                            var i = e.addChild("DotImage");
                            if (i.el_.firstChild.setAttribute("src", t.img), "" == n) e.addClass("tcp-only-gif"),
                                i.el_.firstChild.className = "tcp-image-in-container-only-image";
                            else {
                                this.countContentSize(n) <= 20 && (e.addClass("tcp-single-line"), r.el_.style.height = "23px")
                            }
                        } else if ("" !== n) {
                            var o = this.countContentSize(n);
                            o <= 14 ? e.addClass("tcp-single-line") : o <= 28 && e.addClass("tcp-two-lines"),
                                e.addClass("tcp-without-gif"),
                                r.addClass("tcp-large-comment")
                        }
                    },
                    e.prototype.markSetUp = function (t) {
                        var e = t.timeOffset > 0 ? t.timeOffset / 1e3 : 0,
                            n = this.duration ? this.duration : 0;
                        if (!("number" != typeof e || e > n)) {
                            var r = document.createElement("div");
                            r.className = "tcp-dot-basic-style",
                                r.setAttribute("dotinsecond", e.toString()),
                            t["class"] && (r.className += " " + t["class"]);
                            var i = this.addChild("PopUpContainer");
                            return r.setAttribute("container-id", i.id_),
                                this.setChildInTheContainer(t, i),
                                r.appendChild(i.el_),
                                r.style.left = e / n * 100 + "%",
                                r.addEventListener("mouseover", ie.bind(this, this.dotHover)),
                                r.addEventListener("mouseleave", ie.bind(this, this.dotMouseLeave)),
                                r
                        }
                    },
                    e.prototype.setUpEl = function () {
                        var e = this,
                            n = this.player_.options_.dots || 0,
                            r = this.el_ || t.prototype.createEl.call(this);
                        return ie.dom.addClass(r, "tcp-dot-component"),
                        n && n instanceof Array && n.length > 0 && n.forEach(function (t) {
                            var n = t.content || "";
                            if (n && "" != n || t.img) {
                                var i = e.markSetUp(t);
                                i && r.appendChild(i)
                            }
                        }),
                            r
                    },
                    e.prototype.countContentSize = function (t) {
                        for (var e = 0, n = t.length, r = -1, i = 0; i < n; i++) r = t.charCodeAt(i),
                            e += r >= 0 && r <= 128 ? 1 : 2;
                        return e
                    },
                    e.prototype.createEl = function () {
                        return this.setUpEl()
                    },
                    e
            }(ba);
        ie.registerComponent("ProgressMarkerGenerator", Pa);
        var xa = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.addClass("tcp-dot-comment"),
                    i
            }
            return Wn(e, t),
                e
        }(Ca);
        ie.registerComponent("DotComment", xa);
        var Ia = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                i.addClass("tcp-dot-image");
                var o = i.el_ || t.prototype.createEl.call(i),
                    s = Ea.createEl("img");
                s.className = "tcp-image-in-container",
                    o.appendChild(s);
                var a = Ea.createEl("span");
                return a.className = "tcp-dot-timestamp",
                    a.innerHTML = "",
                    o.appendChild(a),
                    i
            }
            return Wn(e, t),
                e
        }(Ca);
        ie.registerComponent("DotImage", Ia);
        var Ma = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                i.addClass("tcp-popup-container");
                var o = Ea.createEl("div");
                return o.setAttribute("class", "tcp-triangle"),
                    i.el_.appendChild(o),
                    i.hide(),
                    i
            }
            return Wn(e, t),
                e
        }(Ta);
        ie.registerComponent("PopUpContainer", Ma);
        var Da = ie.getComponent("Button"),
            Aa = ie.getComponent("BigPlayButton");
        Aa.prototype.createEl = function () {
            var t = Da.prototype.createEl.call(this),
                e = ke();
            return (this.options_.shapeType || this.options_.styleType) && (e = ke(this.options_.shapeType, this.options_.styleType)),
                t.appendChild(ie.dom.createEl("div", {
                    className: "vjs-button-icon",
                    innerHTML: e
                })),
                t
        },
            Aa.prototype.controlText_ = "Play";
        var Ra = ie.getComponent("Component");
        ie.getComponent("LoadingSpinner").prototype.createEl = function () {
            return Ra.prototype.createEl.call(this, "div", {
                className: "tcp-loading-spinner",
                dir: "ltr"
            })
        };
        var ja = ie.getPlugin("plugin"),
            Oa = ie.log,
            La = function (t) {
                function e(n, r) {
                    qn(this, e),
                        Oa("Skin initializing");
                    var i = Kn(this, t.call(this, n));
                    return i.player.addClass("tcp-skin"),
                        Oa("Skin initialized"),
                        i
                }
                return Wn(e, t),
                    e
            }(ja);
        ie.registerPlugin("Skin", La);
        var Na = ie.getPlugin("plugin"),
            Ba = ie.log,
            Fa = function (t) {
                function e(n, r) {
                    qn(this, e),
                        Ba("VID initializing");
                    var i = Kn(this, t.call(this, n));
                    return i.init(i.player.options_),
                        Ba("VID initialized"),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function (t) {
                        var e = this.player,
                            n = t.sources;
                        t && t.appID && t.fileID || t.plugins.DRM && 0 == n.length ? t.children.splice(0, "mediaLoader" == t.children[0] ? 1 : 0, "mediaAsyncLoader") : (n.length > 0 || t.multiResolution && t.multiResolution.sources ? "mediaLoader" != t.children[0] && t.children.unshift("mediaLoader") : (Ba("no video fileID or source"), "mediaLoader" != t.children[0] && t.children.unshift("mediaLoader")), e.ready(ie.bind(this, function () {
                            e.mediaAsyncLoader || (e.mediaAsyncLoader = e.addChild("MediaAsyncLoader"))
                        })))
                    },
                    e
            }(Na);
        ie.registerPlugin("VID", Fa);
        var Ha = we,
            Va = "object" == typeof qe && qe && qe.Object === Object && qe,
            Ua = Va,
            za = "object" == typeof self && self && self.Object === Object && self,
            qa = Ua || za || Function("return this")(),
            Wa = qa,
            Ka = function () {
                return Wa.Date.now()
            },
            Xa = Ka,
            Qa = Wa.Symbol,
            Ga = Qa,
            $a = Object.prototype,
            Ya = $a.hasOwnProperty,
            Ja = $a.toString,
            Za = Ga ? Ga.toStringTag : undefined,
            tl = Se,
            el = Object.prototype,
            nl = el.toString,
            rl = Pe,
            il = "[object Null]",
            ol = "[object Undefined]",
            sl = Ga ? Ga.toStringTag : undefined,
            al = xe,
            ll = Ie,
            cl = "[object Symbol]",
            ul = Me,
            hl = NaN,
            pl = /^\s+|\s+$/g,
            dl = /^[-+]0x[0-9a-f]+$/i,
            fl = /^0b[01]+$/i,
            yl = /^0o[0-7]+$/i,
            gl = parseInt,
            vl = De,
            ml = "Expected a function",
            _l = Math.max,
            bl = Math.min,
            Tl = Ae,
            Cl = "Expected a function",
            El = Re,
            kl = ie.getComponent("Component"),
            wl = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.on("mousemove", i.handleMouseMove),
                        i.on("mouseup", i.handleMouseUp),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-progress-control vjs-control tcp-dvr-progress-control"
                        })
                    },
                    e.prototype.update = function (t) {
                        this.getChild("DvrSeekBar").update(t)
                    },
                    e.prototype.handleMouseMove = function (t) {
                        var e = this.getChild("DvrSeekBar"),
                            n = e.calculateDistance(t),
                            r = e.getChild("DvrMouseTimeDisplay");
                        r && r.update(ie.dom.getBoundingClientRect(e.el()), n)
                    },
                    e.prototype.handleMouseUp = function (t) {
                        this.getChild("DvrSeekBar").handleMouseUp(t)
                    },
                    e
            }(kl);
        wl.prototype.options_ = {
            children: ["DvrSeekBar"]
        },
            ie.registerComponent("DvrProgressControl", wl);
        var Sl = ie.getComponent("Slider"),
            Pl = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.percent_ = 1,
                        i.update = El(ie.bind(i, i.update), 50),
                        i.on(n, "seekToLive", ie.bind(i, function (t) {
                            this.update(t.data)
                        })),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return t.prototype.createEl.call(this, "div", {
                            className: "vjs-progress-holder"
                        }, {
                            "aria-label": this.localize("Progress Bar")
                        })
                    },
                    e.prototype.update = function (t) {
                        t != undefined && (this.percent_ = t, this.bar.update(ie.dom.getBoundingClientRect(this.el_), t), this.updateAriaAttributes(t))
                    },
                    e.prototype.handleMouseDown = function (e) {
                        t.prototype.handleMouseDown.call(this, e),
                            this.isMouseDown = !0
                    },
                    e.prototype.handleMouseMove = function (t) {
                        var e = this.calculateDistance(t);
                        this.update(e)
                    },
                    e.prototype.handleMouseUp = function (e) {
                        t.prototype.handleMouseUp.call(this);
                        var n = this.calculateDistance(e);
                        this.update(n),
                            this.player().Dvr().timeShift(n)
                    },
                    e.prototype.stepBack = function () {},
                    e.prototype.stepForward = function () {},
                    e.prototype.updateAriaAttributes = function (t) {
                        this.el().setAttribute("aria-valuenow", (100 * t).toFixed(2))
                    },
                    e.prototype.getPercent = function () {
                        return this.percent_
                    },
                    e
            }(Sl);
        Pl.prototype.options_ = {
            children: ["DvrMouseTimeDisplay", "DvrTimeShiftBar"],
            barName: "DvrTimeShiftBar"
        },
            ie.registerComponent("DvrSeekBar", Pl);
        var xl = function (t) {
            function e(n, r) {
                qn(this, e);
                var i = Kn(this, t.call(this, n, r));
                return i.el_.style.width = "100%",
                    i
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    return t.prototype.createEl.call(this, "div", {
                        className: "vjs-play-progress vjs-slider-bar tcp-dvr-time-shift",
                        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 100%</span>"
                    })
                },
                e.prototype.update = function (t, e) {
                    var n = (100 * e).toFixed(2) + "%";
                    this.el_.style.width = n
                },
                e
        }(kl);
        ie.registerComponent("DvrTimeShiftBar", xl);
        var Il = ie.getComponent("MouseTimeDisplay"),
            Ml = function (t) {
                function e() {
                    return qn(this, e),
                        Kn(this, t.apply(this, arguments))
                }
                return Wn(e, t),
                    e.prototype.update = function (t, e) {
                        var n = this;
                        this.rafId_ && this.cancelAnimationFrame(this.rafId_),
                            this.rafId_ = this.requestAnimationFrame(function () {
                                var r = n.player().Dvr().dvrData.maxTimeShift,
                                    i = ie.formatTime((1 - e) * r, r);
                                n.el_.style.left = t.width * e + "px",
                                    n.getChild("timeTooltip").update(t, e, i)
                            })
                    },
                    e
            }(Il);
        ie.registerComponent("DvrMouseTimeDisplay", Ml);
        var Dl = ie.getComponent("Button"),
            Al = function (t) {
                function e() {
                    return qn(this, e),
                        Kn(this, t.apply(this, arguments))
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = Dl.prototype.createEl.call(this, "button", {
                            className: "vjs-live-control vjs-control"
                        });
                        return this.contentEl_ = ie.dom.createEl("div", {
                            className: "vjs-live-display",
                            innerHTML: this.localize("LIVE")
                        }, {
                            "aria-live": "off"
                        }),
                            t.appendChild(this.contentEl_),
                            t
                    },
                    e.prototype.update = function () {},
                    e.prototype.updateControlText = function (t) {
                        this.controlText(t ? "直播中" : "返回直播")
                    },
                    e.prototype.handleClick = function (t) {
                        this.player().Dvr().seekToLive()
                    },
                    e
            }(Dl);
        Al.prototype.controlText_ = "返回直播",
            ie.registerComponent("LiveButton", Al);
        var Rl = ie.getPlugin("plugin"),
            jl = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    i.isInit = !1,
                        i.options = r;
                    var o = i;
                    return n.ready(function () {
                        var t = n.tech(!0),
                            e = t && t.hlsProvider;
                        if (e && e.Hls) {
                            var r = e.Hls;
                            t.one(r.Events.MANIFEST_LOADED, function (t) {}),
                                t.one(r.Events.LEVEL_LOADED, function (t) {}),
                                n.one("loadedmetadata", function (e) {
                                    t.el_.setAttribute("poster", ""),
                                        o.init(),
                                    o.options.liveURL && o.seekToLive()
                                })
                        }
                    }),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        var t = this.player,
                            e = t.tech(!0).hlsProvider;
                        if (this.parseM3u8(e.manifests[0]), !this.dvrData.startTime && !this.isInit) return void t.one("loadedmetadata", ie.bind(this, function (t) {
                            this.init()
                        }));
                        this.initControl(),
                            this.delay = ge("delay", t.tech_.currentSource_.src) || 0,
                            this.updateControl(!this.isLive()),
                            t.on("loadedmetadata", ie.bind(this, function () {
                                this.parseM3u8(e.manifests[0]),
                                    this.delay = ge("delay", t.tech_.currentSource_.src) || 0,
                                    this.updateControl()
                            })),
                            this.isInit = !0
                    },
                    e.prototype.initControl = function () {
                        var t = this.player;
                        t.addClass("vjs-dvr"),
                            t.controlBar.getChild("ProgressControl").hide(),
                            t.controlBar.getChild("LiveDisplay").hide(),
                            t.controlBar.addChild("DvrProgressControl", {}, 5),
                            t.controlBar.addChild("liveButton", {}, 6)
                    },
                    e.prototype.updateControl = function (t) {
                        var e = this.player,
                            n = e.controlBar.getChild("ProgressControl"),
                            r = e.controlBar.getChild("LiveDisplay"),
                            i = e.controlBar.getChild("DvrProgressControl"),
                            o = e.controlBar.getChild("LiveButton");
                        e.toggleClass("vjs-dvr-live", this.isLive()),
                            o.updateControlText(this.isLive()),
                        t && i.update(1 - this.delay / this.dvrData.maxTimeShift),
                            this.dvrData.startTime ? (i.show(), o.show(), n.hide(), r.hide()) : (i.hide(), o.hide(), n.show(), r.show())
                    },
                    e.prototype.seekToLive = function () {
                        this.isLive() || (this.timeShift(1), this.player.trigger({
                            type: "seekToLive",
                            data: 1
                        }))
                    },
                    e.prototype.isLive = function () {
                        return !(this.delay > 0)
                    },
                    e.prototype.timeShift = function (t) {
                        var e = this.player,
                            n = (e.getChild("ControlBar").getChild("LiveButton"), e.tech_.currentSource_),
                            r = Math.floor(this.dvrData.maxTimeShift * (1 - t));
                        this.delay = r,
                            0 == r && this.options.liveURL ? e.src(this.options.liveURL) : (n.src = (this.options.shiftURL || n.src).replace(/delay=*(\d+)/, "delay=" + r), e.src(e.tech_.currentSource_.src)),
                            e.bigPlayButton.hide(),
                            e.posterImage.hide(),
                            e.tech_.one("hlsManifestParsed", ie.bind(this, function () {
                                e.play()
                            }))
                    },
                    e.prototype.parseM3u8 = function (t) {
                        this.dvrData = {};
                        for (var e = new RegExp([/#EXT-TX-TS-START-TIME:*(.+)/.source, /|#EXT-TX-TS-DURATION:*(.+)/.source].join(""), "g"), n = void 0; null !== (n = e.exec(t));) n[1] ? this.dvrData.startTime = n[1] : n[2] && (this.dvrData.duration = n[2]);
                        this.dvrData.startTime && (this.dvrData.maxTimeShift = Math.min(Math.floor((new Date).getTime() / 1e3 - this.dvrData.startTime), this.dvrData.duration))
                    },
                    e
            }(Rl);
        ie.registerPlugin("Dvr", jl);
        var Ol = ie.getComponent("Menu"),
            Ll = function (t) {
                function e() {
                    return qn(this, e),
                        Kn(this, t.apply(this, arguments))
                }
                return Wn(e, t),
                    e.prototype.addItem = function (e) {
                        t.prototype.addItem.call(this, e)
                    },
                    e
            }(Ol),
            Nl = ie.getComponent("MenuItem"),
            Bl = function (t) {
                function e(n, r) {
                    return qn(this, e),
                        Kn(this, t.call(this, n, r))
                }
                return Wn(e, t),
                    e.prototype.handleClick = function (e) {
                        if (t.prototype.handleClick.call(this, e), this.updateItems(), this.options_.callback(this.options_), "video" == this.options_.trackType) {
                            var n = this.player().controlBar.getChild(this.options_.trackType + "QualitySwitcherMenuButton");
                            n.updateLabel(this.options_),
                                n.unpressButton()
                        }
                    },
                    e.prototype.updateItems = function () {
                        for (var t = this.player().controlBar.getChild(this.options_.trackType + "QualitySwitcherMenuButton"), e = t.getChild(this.options_.trackType + "QualitySwitcherMenu"), n = e.children(), r = 0; r < n.length; r++) {
                            var i = n[r];
                            this !== i ? (i.selected(!1), i.options_.selected = !1) : i.options_.selected = !0
                        }
                    },
                    e
            }(Nl),
            Fl = ie.getComponent("MenuButton"),
            Hl = (ie.getComponent("Menu"), function (t) {
                function e() {
                    return qn(this, e),
                        Kn(this, t.apply(this, arguments))
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var e = t.prototype.createEl.call(this);
                        return this.labelEl_ = ie.dom.createEl("div", {
                            className: "tcp-quality-switcher-value",
                            innerHTML: ""
                        }),
                            e.appendChild(this.labelEl_),
                            e
                    },
                    e.prototype.createMenu = function () {
                        for (var t = this.options_.qualityList, e = new Ll(this.player(), {
                            name: this.options_.trackType + "QualitySwitcherMenu"
                        }), n = void 0, r = t.length - 1; r > -1; r--) {
                            var i = t[r];
                            n = ie.mergeOptions(i, {
                                trackType: this.options_.trackType,
                                callback: this.options_.callback,
                                selectable: !0
                            }),
                                e.addItem(new Bl(this.player(), n)),
                            i.selected && this.updateLabel(i)
                        }
                        return e
                    },
                    e.prototype.updateLabel = function (t) {
                        this.labelEl_.innerHTML = "<p>" + this.localize(t.label) + "</p>"
                    },
                    e
            }(Fl)),
            Vl = ie.getPlugin("plugin"),
            Ul = ["video", "audio", "subtitle"],
            zl = {
                video: "tcp-video-quality-switcher",
                audio: "tcp-audio-quality-switcher",
                subtitle: "tcp-subtitle-quality-switcher"
            },
            ql = ie.log,
            Wl = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return n.on("qualitydataloaded", ie.bind(i, i.init)),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function (t) {
                        ql("QualitySwitcher initializing", t);
                        var e = this.player,
                            n = t.data.qualityData,
                            r = t.data.callbacks;
                        if (!e.controlBar) return void ql("QualitySwitcher can not initialize without control bar");
                        for (var i = 0; i < Ul.length; i++) {
                            var o = Ul[i],
                                s = o + "QualitySwitcherMenuButton",
                                a = e.controlBar.getChild(s);
                            n[o] && n[o].length > 0 && e.controlBar.options_.QualitySwitcherMenuButton && (a && a.el() && (a.dispose(), e.controlBar.removeChild(a)), a = new Hl(e, {
                                name: s,
                                qualityList: n[o],
                                callback: r[o],
                                trackType: o
                            }), a.addClass(zl[o]), e.controlBar.addChild(a, {}, 10))
                        }
                        ql("QualitySwitcher initialized", t)
                    },
                    e.prototype.reset = function () {
                        for (var t = this.player, e = 0; e < Ul.length; e++) {
                            var n = Ul[e],
                                r = t.controlBar && t.controlBar.getChild(n + "QualitySwitcherMenuButton");
                            r && r.el() && (r.dispose(), t.controlBar.removeChild(r))
                        }
                    },
                    e
            }(Vl);
        ie.registerPlugin("QualitySwitcher", Wl);
        var Kl = ie.getPlugin("plugin"),
            Xl = ie.log,
            Ql = {
                labels: {
                    FLU: "流畅",
                    SD: "标清",
                    HD: "高清",
                    FHD: "超清"
                },
                showOrder: ["FLU", "SD", "HD", "FHD"],
                defaultRes: "SD"
            },
            Gl = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return i.options = r,
                    r.useManualOption && (i.manualOptions = ot({}, r)),
                        i.hasInit = !1,
                        n.on("multiresolutionchange", ie.bind(i, function (t) {
                            t.data && this.update(data)
                        })),
                        n.on(["resolutionswitching", "resolutionswitched"], ie.bind(i, function (t) {
                            "resolutionswitching" == t.type ? this.player.addClass("tcp-res-switching") : this.player.removeClass("tcp-res-switching")
                        })),
                        n.ready(ie.bind(i, function () {
                            var t = n.tech(!0);
                            t && (t.on("masterplaylistchange", ie.bind(this, this.onMasterPlaylistChange)), t.on("hlsresolutionswitching", ie.bind(this, this.onHlsLevelChange)), t.on("hlsresolutionswitched", ie.bind(this, this.onHlsLevelChange)), t.on("dashqualityswitching", ie.bind(this, this.onDashQualityChange)), t.on("dashqualityswitched", ie.bind(this, this.onDashQualityChange))),
                                this.hasInit = !0
                        })),
                        i.init(i.player.options_.multiResolution),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function (t) {
                        var e = this.player,
                            n = ot({}, Ql, t, this.manualOptions),
                            r = n && n.sources;
                        if (this.options = n, r) {
                            Xl("MultiResolution initializing", n);
                            var i = void 0;
                            if (this.currentID = n.defaultRes = r[n.defaultRes] ? n.defaultRes : Object.keys(r).pop(), i = r[this.currentID], "mediaLoader" != e.options_.children[0] || this.hasInit) e.src(i);
                            else {
                                var o;
                                (o = e.options_.sources).push.apply(o, i)
                            }
                            this.hasInit || (this.hasInit = !0),
                                e.ready(ie.bind(this, function () {
                                    e.trigger({
                                        type: "qualitydataloaded",
                                        data: this.initQualityData(n)
                                    }),
                                        e.one("loadedmetadata", function () {
                                            var t = this.tech(!0);
                                            "flash" != t.name_ && t.el_.getAttribute("poster") && (t.el_.removeAttribute("poster"), delete t.el_.poster)
                                        })
                                })),
                                Xl("MultiResolution initialized")
                        }
                    },
                    e.prototype.reset = function () {
                        this.player.QualitySwitcher().reset()
                    },
                    e.prototype.update = function (t) {
                        this.init(t)
                    },
                    e.prototype.store = function (t) {
                        if (!t) return this.options;
                        this.options = ie.mergeOptions(Ql, this.options, t)
                    },
                    e.prototype.onMasterPlaylistChange = function (t) {
                        this.player.trigger({
                            type: "qualitydataloaded",
                            data: t.data
                        })
                    },
                    e.prototype.onHlsLevelChange = function (t) {
                        "hlsresolutionswitching" == t.type ? this.player.trigger({
                            type: "resolutionswitching",
                            data: t.data
                        }) : "hlsresolutionswitched" == t.type && this.player.trigger({
                            type: "resolutionswitched",
                            data: t.data
                        })
                    },
                    e.prototype.onDashQualityChange = function (t) {
                        "dashqualityswitching" == t.type ? this.player.trigger({
                            type: "resolutionswitching",
                            data: t.data
                        }) : "dashqualityswitched" == t.type && this.player.trigger({
                            type: "resolutionswitched",
                            data: t.data
                        })
                    },
                    e.prototype.switchResolution = function (t) {
                        if (this.currentID != t.id) {
                            var e = this.player,
                                n = e.currentTime(),
                                r = (e.paused(), e.ended()),
                                i = e.playbackRate(),
                                o = e.controlBar && e.controlBar.progressControl && e.controlBar.progressControl.seekBar.playProgressBar.el().style.width || 0,
                                s = ie.browser.IS_IOS || ie.browser.IS_ANDROID ? "loadeddata" : "loadedmetadata";
                            e.trigger({
                                type: "resolutionswitching",
                                data: t
                            }),
                                e.one(s, function () {
                                    e.controlBar && e.controlBar.progressControl && (e.controlBar.progressControl.seekBar.playProgressBar.el().style.width = o),
                                    r || e.currentTime(n),
                                        "Flash" == e.techName_ ? (e.play(), e.tech(!0).trigger("seeked")) : (e.play(), e.playbackRate() != i && e.playbackRate(i)),
                                        e.trigger({
                                            type: "resolutionswitched",
                                            data: t
                                        })
                                }),
                            e.bigPlayButton && e.bigPlayButton.hide(),
                            e.posterImage && e.posterImage.hide(),
                                this.currentID = t.id,
                                e.src(this.options.sources[t.id]),
                            "none" == e.options_.preload && e.one("suspend", function () {
                                e.load()
                            })
                        }
                    },
                    e.prototype.initQualityData = function (t) {
                        var e = [],
                            n = (t.sources, t.labels),
                            r = t.showOrder;
                        return r.length > 0 && r.forEach(function (r, i) {
                            var o = {};
                            o.id = r,
                                o.selected = t.defaultRes === r,
                                o.label = n[r] || r,
                                e.push(o)
                        }),
                            {
                                qualityData: {
                                    video: e
                                },
                                callbacks: {
                                    video: ie.bind(this, this.switchResolution)
                                }
                            }
                    },
                    e.prototype.sortSourceOrder = function (t) {
                        return []
                    },
                    e
            }(Kl);
        ie.registerPlugin("MultiResolution", Gl);
        var $l = (ie.getComponent("Flash"), !ie.browser.IS_IPHONE),
            Yl = ie.registerPlugin || ie.plugin,
            Jl = {
                header: "",
                code: "",
                message: "",
                timeout: 45e3,
                dismiss: $l,
                progressDisabled: !1,
                errors: {
                    1: {
                        type: "MEDIA_ERR_ABORTED"
                    },
                    2: {
                        type: "MEDIA_ERR_NETWORK"
                    },
                    3: {
                        type: "MEDIA_ERR_DECODE"
                    },
                    4: {
                        type: "MEDIA_ERR_SRC_NOT_SUPPORTED"
                    },
                    5: {
                        type: "MEDIA_ERR_ENCRYPTED"
                    },
                    unknown: {
                        type: "MEDIA_ERR_UNKNOWN"
                    },
                    "-1": {
                        type: "PLAYER_ERR_NO_SRC",
                        message: "No video has been loaded."
                    },
                    "-2": {
                        type: "PLAYER_ERR_TIMEOUT",
                        message: "Could not download the video."
                    },
                    10: {
                        type: "SERVER_ERR",
                        message: "Request timed out."
                    },
                    11: {
                        type: "SERVER_ERR",
                        message: "Server is not respond."
                    },
                    12: {
                        type: "DATA_ERR",
                        message: "Server respond error data."
                    },
                    13: {
                        type: "DATA_ERR",
                        message: "No video transcoding information found."
                    },
                    14: {
                        type: "HLS_NETWORK_ERR",
                        message: "A network error caused the media download to fail part-way."
                    },
                    15: {
                        type: "HLS_MEDIA_ERR",
                        message: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support."
                    },
                    16: {
                        type: "HLS_MUX_ERR",
                        message: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support."
                    },
                    17: {
                        type: "HLS_OTHER_ERR",
                        message: "Rise an internal exception when playing HLS."
                    },
                    403: {
                        type: "SERVER_ERR",
                        message: "Authentication failed."
                    },
                    500: {
                        type: "SERVER_ERR",
                        message: "Server failed."
                    },
                    1003: {
                        type: "SERVER_ERR",
                        message: "Get file error."
                    },
                    10008: {
                        type: "SERVER_ERR",
                        message: "File not exist."
                    },
                    PLAYER_ERR_DOMAIN_RESTRICTED: {
                        message: "This video is restricted from playing on your current domain."
                    },
                    PLAYER_ERR_IP_RESTRICTED: {
                        message: "This video is restricted at your current IP address."
                    },
                    PLAYER_ERR_GEO_RESTRICTED: {
                        message: "This video is restricted from playing in your current geographic region."
                    }
                }
            },
            Zl = function _h(t, e) {
                var n = void 0,
                    r = void 0,
                    i = void 0,
                    o = [];
                ie.getComponent("ErrorDisplay").prototype.options_.fillAlways = !1;
                var s = function (t) {
                    e.errors = ie.mergeOptions(e.errors, t),
                        Object.keys(e.errors).forEach(function (t) {
                            var n = e.errors[t];
                            n.type || (n.type = t)
                        })
                };
                s();
                var a = function () {
                        t.clearTimeout(r),
                        i && (i = !1, t.removeClass("vjs-waiting")),
                            r = t.setTimeout(function () {
                                t.error() || t.paused() || t.ended() || (i = !0, t.addClass("vjs-waiting"))
                            }, 1e3),
                            t.clearTimeout(n),
                            n = t.setTimeout(function () {
                                t.error() || t.paused() || t.ended() || t.error({
                                    code: -2,
                                    type: "PLAYER_ERR_TIMEOUT"
                                })
                            }, e.timeout),
                        t.error() && -2 === t.error().code && t.error(null)
                    },
                    l = function () {
                        for (var e = void 0; o.length;) e = o.shift(),
                            t.off(e[0], e[1]);
                        t.clearTimeout(n),
                            t.clearTimeout(r)
                    },
                    c = function (e, n) {
                        var r = function () {
                            if (!t.error()) {
                                var e = t.$(".vjs-tech");
                                if (e && "application/x-shockwave-flash" === e.type && !e.vjs_getProperty) return void t.error({
                                    code: -2,
                                    type: "PLAYER_ERR_TIMEOUT"
                                });
                                if (t.paused()) return a();
                                if (t.ended()) return a()
                            }
                            n.call(this)
                        };
                        t.on(e, r),
                            o.push([e, r])
                    },
                    u = function () {
                        var n = 0;
                        l(),
                            a(),
                            c(["timeupdate", "adtimeupdate"], function () {
                                var e = t.currentTime();
                                e !== n && (n = e, a())
                            }),
                        e.progressDisabled || c("progress", a)
                    },
                    h = function (n) {
                        var r = "",
                            i = t.error(),
                            o = Ye.createElement("div"),
                            s = "";
                        if (i) {
                            i = ie.mergeOptions(i, e.errors[i.code || 0]),
                            i.message && (r = '<div class="vjs-errors-message">' + t.localize(i.message) + "</div>"),
                            i.code && (r += '<div class="vjs-errors-code">' + this.localize("Error Code") + " : " + i.code + "</div>"),
                            i.type && (r += '<div class="vjs-errors-type">' + this.localize("Error Type") + " : " + i.type + "</div>"),
                            "10" != i.code && "11" != i.code || (r += '<a href="https://ping.huatuo.qq.com/playvideo.qcloud.com" target="_blank" class="vjs-error-check-network">诊断网络</a>'),
                                o.className = "vjs-errors-dialog",
                                s = '<div class="vjs-errors-content-container">\n        ' + r + "\n      </div>";
                            var a = t.getChild("errorDisplay");
                            a.closeable(!("dismiss" in i) || i.dismiss) ? (o.innerHTML = s, a.fillWith(o), a.contentEl().firstChild.appendChild(a.getChild("closeButton").el())) : (o.innerHTML = s, a.fillWith(o)),
                                a.one("modalclose", function () {
                                    return t.error(null)
                                })
                        }
                    },
                    p = function f() {
                        l(),
                            t.removeClass("vjs-errors"),
                            t.off("dispose", f),
                            t.off(["aderror", "error"], h)
                    },
                    d = function (e) {
                        p(),
                            _h(t, ie.mergeOptions(Jl, e))
                    };
                d.extend = function (t) {
                    return s(t)
                },
                    d.getAll = function () {
                        return ie.mergeOptions(e.errors)
                    },
                    d.disableProgress = function (t) {
                        e.progressDisabled = t,
                            u()
                    },
                    t.on("dispose", p),
                    t.on(["aderror", "error"], h),
                    t.ready(function () {
                        t.addClass("vjs-errors")
                    }),
                    t.errors = d
            },
            tc = function (t) {
                Zl(this, ie.mergeOptions(Jl, t))
            };
        ["extend", "getAll", "disableProgress"].forEach(function (t) {
            tc[t] = function () {
                ie.log.warn("The errors." + t + "() method is not available until the plugin has been initialized!")
            }
        }),
            Yl("Errors", tc);
        var ec = ie.getPlugin("plugin"),
            nc = {},
            rc = ie.log,
            ic = function (t) {
                function e(n, r) {
                    qn(this, e),
                        rc("Reporter initilaizing");
                    var i = Kn(this, t.call(this, n));
                    return i.initPlayCgiCodeReport(),
                        i.mtaReportCache = [],
                        Te(ve("//pingjs.qq.com/h5/stats.js?v2.0.4"), null, {
                            name: "MTAH5",
                            sid: "500608092",
                            cid: "500608093"
                        }, !0),
                        rc("Reporter initilaized"),
                        i
                }
                return Wn(e, t),
                    e.prototype.initPlayCgiCodeReport = function () {
                        var t = this.player;
                        t.on("playcgistart", ie.bind(this, this.onPlayCgiStart)),
                            t.on("playcgiend", ie.bind(this, this.onPlayCgiEnd))
                    },
                    e.prototype.onPlayCgiStart = function (t) {
                        nc[t.data.time] = nc[t.data.time] || {},
                            nc[t.data.time].startTime = t.data.time,
                            nc[t.data.time].url = t.data.url
                    },
                    e.prototype.onPlayCgiEnd = function (t) {
                        if (nc[t.data.startTime]) {
                            var e = t.data,
                                n = void 0,
                                r = void 0,
                                i = void 0;
                            if (e.error) switch (r = 2, e.error.message) {
                                case "Timeout":
                                    n = 10;
                                    break;
                                case "ServerError":
                                    n = 11
                            } else 0 == e.result.code ? (r = 1, n = 0) : (r = 3, n = e.result.code),
                                i = e.result.requestId;
                            this.reportPlayCgiToISD("", "", r, n, t.data.time - nc[t.data.startTime].startTime, i, void 0, void 0)
                        }
                    },
                    e.prototype.reportPlayCgiToISD = function (t, e, n, r, i, o, s, a) {
                        var l = {
                            domain: t || "playvideo.qcloud.com",
                            cgi: e || "/getplayinfo/v2",
                            type: n,
                            code: r,
                            time: i,
                            appid: 20370,
                            platform: ie.browser.IS_IOS ? "ios" : ie.browser.IS_ANDROID ? "android" : "pc",
                            expansion1: o,
                            expansion2: s,
                            expansion3: a
                        };
                        this.sender(ve("//report.huatuo.qq.com/code.cgi") + "?" + Ce(l))
                    },
                    e.prototype.reportPlayMetrics = function (t) {},
                    e.prototype.sender = function (t) {
                        var e = new Image;
                        e.onload = e.onerror = e.onabort = function () {
                            e.onload = e.onerror = e.onabort = null,
                                e = null
                        },
                            e.src = t
                    },
                    e.prototype.reportMTA = function (t, e) {
                        window.MtaH5 ? (this.mtaReportCache.length > 0 && (this.mtaReportCache.forEach(function (t) {
                            t.call()
                        }), this.mtaReportCache = 0), MtaH5.clickStat(t, e)) : this.mtaReportCache.push(function () {
                            MtaH5.clickStat(t, e)
                        })
                    },
                    e
            }(ec);
        ie.registerPlugin("Reporter", ic);
        var oc = r(function (t) {
                !
                    function (e, n) {
                        var r = {
                                version: "2.7.1",
                                areas: {},
                                apis: {},
                                inherit: function (t, e) {
                                    for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
                                    return e
                                },
                                stringify: function (t) {
                                    return t === undefined || "function" == typeof t ? t + "" : JSON.stringify(t)
                                },
                                parse: function (t) {
                                    try {
                                        return JSON.parse(t)
                                    } catch (e) {
                                        return t
                                    }
                                },
                                fn: function (t, e) {
                                    r.storeAPI[t] = e;
                                    for (var n in r.apis) r.apis[n][t] = e
                                },
                                get: function (t, e) {
                                    return t.getItem(e)
                                },
                                set: function (t, e, n) {
                                    t.setItem(e, n)
                                },
                                remove: function (t, e) {
                                    t.removeItem(e)
                                },
                                key: function (t, e) {
                                    return t.key(e)
                                },
                                length: function (t) {
                                    return t.length
                                },
                                clear: function (t) {
                                    t.clear()
                                },
                                Store: function (t, e, n) {
                                    var i = r.inherit(r.storeAPI, function (t, e, n) {
                                        return 0 === arguments.length ? i.getAll() : "function" == typeof e ? i.transact(t, e, n) : e !== undefined ? i.set(t, e, n) : "string" == typeof t || "number" == typeof t ? i.get(t) : t ? i.setAll(t, e) : i.clear()
                                    });
                                    i._id = t;
                                    try {
                                        e.setItem("_-bad-_", "wolf"),
                                            i._area = e,
                                            e.removeItem("_-bad-_")
                                    } catch (o) {}
                                    return i._area || (i._area = r.inherit(r.storageAPI, {
                                        items: {},
                                        name: "fake"
                                    })),
                                        i._ns = n || "",
                                    r.areas[t] || (r.areas[t] = i._area),
                                    r.apis[i._ns + i._id] || (r.apis[i._ns + i._id] = i),
                                        i
                                },
                                storeAPI: {
                                    area: function (t, e) {
                                        var n = this[t];
                                        return n && n.area || (n = r.Store(t, e, this._ns), this[t] || (this[t] = n)),
                                            n
                                    },
                                    namespace: function (t, e) {
                                        if (!t) return this._ns ? this._ns.substring(0, this._ns.length - 1) : "";
                                        var n = t,
                                            i = this[n];
                                        return i && i.namespace || (i = r.Store(this._id, this._area, this._ns + n + "."), this[n] || (this[n] = i), e || i.area("session", r.areas.session)),
                                            i
                                    },
                                    isFake: function () {
                                        return "fake" === this._area.name
                                    },
                                    toString: function () {
                                        return "store" + (this._ns ? "." + this.namespace() : "") + "[" + this._id + "]"
                                    },
                                    has: function (t) {
                                        return this._area.has ? this._area.has(this._in(t)) : !! (this._in(t) in this._area)
                                    },
                                    size: function () {
                                        return this.keys().length
                                    },
                                    each: function (t, e) {
                                        for (var n = 0, i = r.length(this._area); n < i; n++) {
                                            var o = this._out(r.key(this._area, n));
                                            if (o !== undefined && !1 === t.call(this, o, e || this.get(o))) break;
                                            i > r.length(this._area) && (i--, n--)
                                        }
                                        return e || this
                                    },
                                    keys: function (t) {
                                        return this.each(function (t, e) {
                                            e.push(t)
                                        }, t || [])
                                    },
                                    get: function (t, e) {
                                        var n = r.get(this._area, this._in(t));
                                        return null !== n ? r.parse(n) : e || n
                                    },
                                    getAll: function (t) {
                                        return this.each(function (t, e) {
                                            e[t] = this.get(t)
                                        }, t || {})
                                    },
                                    transact: function (t, e, n) {
                                        var r = this.get(t, n),
                                            i = e(r);
                                        return this.set(t, i === undefined ? r : i),
                                            this
                                    },
                                    set: function (t, e, n) {
                                        var i = this.get(t);
                                        return null != i && !1 === n ? e : r.set(this._area, this._in(t), r.stringify(e), n) || i
                                    },
                                    setAll: function (t, e) {
                                        var n, r;
                                        for (var i in t) r = t[i],
                                        this.set(i, r, e) !== r && (n = !0);
                                        return n
                                    },
                                    add: function (t, e) {
                                        var n = this.get(t);
                                        if (n instanceof Array) e = n.concat(e);
                                        else if (null !== n) {
                                            var i = typeof n;
                                            if (i === typeof e && "object" === i) {
                                                for (var o in e) n[o] = e[o];
                                                e = n
                                            } else e = n + e
                                        }
                                        return r.set(this._area, this._in(t), r.stringify(e)),
                                            e
                                    },
                                    remove: function (t) {
                                        var e = this.get(t);
                                        return r.remove(this._area, this._in(t)),
                                            e
                                    },
                                    clear: function () {
                                        return this._ns ? this.each(function (t) {
                                            r.remove(this._area, this._in(t))
                                        }, 1) : r.clear(this._area),
                                            this
                                    },
                                    clearAll: function () {
                                        var t = this._area;
                                        for (var e in r.areas) r.areas.hasOwnProperty(e) && (this._area = r.areas[e], this.clear());
                                        return this._area = t,
                                            this
                                    },
                                    _in: function (t) {
                                        return "string" != typeof t && (t = r.stringify(t)),
                                            this._ns ? this._ns + t : t
                                    },
                                    _out: function (t) {
                                        return this._ns ? t && 0 === t.indexOf(this._ns) ? t.substring(this._ns.length) : undefined : t
                                    }
                                },
                                storageAPI: {
                                    length: 0,
                                    has: function (t) {
                                        return this.items.hasOwnProperty(t)
                                    },
                                    key: function (t) {
                                        var e = 0;
                                        for (var n in this.items) if (this.has(n) && t === e++) return n
                                    },
                                    setItem: function (t, e) {
                                        this.has(t) || this.length++,
                                            this.items[t] = e
                                    },
                                    removeItem: function (t) {
                                        this.has(t) && (delete this.items[t], this.length--)
                                    },
                                    getItem: function (t) {
                                        return this.has(t) ? this.items[t] : null
                                    },
                                    clear: function () {
                                        for (var t in this.items) this.removeItem(t)
                                    },
                                    toString: function () {
                                        return this.length + " items in " + this.name + "Storage"
                                    }
                                }
                            },
                            i = r.Store("local", function () {
                                try {
                                    return localStorage
                                } catch (t) {}
                            }());
                        i.local = i,
                            i._ = r,
                            i.area("session", function () {
                                try {
                                    return sessionStorage
                                } catch (t) {}
                            }()),
                            "function" == typeof n && n.amd !== undefined ? n("store2", [], function () {
                                return i
                            }) : t.exports ? t.exports = i : (e.store && (r.conflict = e.store), e.store = i)
                    }(qe, qe && qe.define)
            }),
            sc = ie.getPlugin("plugin"),
            ac = ie.log,
            lc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return i.options = r,
                        i.init(),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        var t = this.player,
                            e = t.options_,
                            n = void 0;
                        t.ready(ie.bind(this, function () {
                            (n = e && e.appID && e.fileID ? e.fileID : this.options.playID) && (ac("ContinuePlay initializing"), this.playID = n, this.lastTime = oc.get(this.getStoreKey()), t.off("timeupdate", ie.bind(this, this.onTimeUpdate)), t.on("timeupdate", ie.bind(this, this.onTimeUpdate)), t.one(this.getTriggerEvent(), ie.bind(this, this.onPlay)), !this.options.auto && t.getChild("ContinuePlayTips") && t.getChild("ContinuePlayTips").close(), ac("ContinuePlay initialized"), t.trigger({
                                type: "feature",
                                data: "continue"
                            }))
                        }))
                    },
                    e.prototype.onTimeUpdate = function (t) {
                        oc.set(this.getStoreKey(), this.player.currentTime())
                    },
                    e.prototype.onPlay = function (t) {
                        var e = this.player;
                        Math.round(this.lastTime) > 1 && this.player.duration() > 1 && Math.round(this.lastTime) != Math.round(this.player.duration()) ? this.options.auto ? this.start() : e.addChild("ContinuePlayTips", ie.mergeOptions(this.options, {
                            time: this.lastTime,
                            resumeCallback: ie.bind(this, this.start)
                        })) : "Flash" == e.techName_ && Math.round(this.lastTime) > 1 && Math.round(this.lastTime) != Math.round(this.player.duration()) && !this.player.duration() && e.one("loadedmetadata", ie.bind(this, this.onPlay))
                    },
                    e.prototype.start = function () {
                        var t = this.player;
                        t.currentTime(this.lastTime),
                        "Flash" == t.techName_ && t.tech(!0).trigger("seeked"),
                            t.trigger({
                                type: "continueplay",
                                data: {
                                    lastTime: this.lastTime
                                }
                            })
                    },
                    e.prototype.generatePlayID = function () {},
                    e.prototype.getStoreKey = function () {
                        return "tcplayer-lpt-" + this.playID
                    },
                    e.prototype.getTriggerEvent = function () {
                        var t = this.player,
                            e = t.options_;
                        return e.autoplay && "Flash" == t.techName_ ? "loadedmetadata" : "playing"
                    },
                    e
            }(sc);
        ie.registerPlugin("ContinuePlay", lc);
        var cc = {
                align: "top-left",
                className: "",
                content: "",
                debug: !1,
                showBackground: !0,
                attachToControlBar: !1,
                overlays: []
            },
            uc = ie.getComponent("Component"),
            hc = ie.dom || ie,
            pc = ie.registerPlugin || ie.plugin,
            dc = function (t) {
                return "number" == typeof t && t === t
            },
            fc = function (t) {
                return "string" == typeof t && /^\S+$/.test(t)
            },
            yc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return ["start", "end"].forEach(function (t) {
                        var e = i.options_[t];
                        if (dc(e)) i[t + "Event_"] = "timeupdate";
                        else if (fc(e)) i[t + "Event_"] = e;
                        else if ("start" === t) throw new Error('invalid "start" option; expected number or string')
                    }),
                        ["endListener_", "rewindListener_", "startListener_"].forEach(function (t) {
                            i[t] = function (n) {
                                return e.prototype[t].call(i, n)
                            }
                        }),
                    "timeupdate" === i.startEvent_ && i.on(n, "timeupdate", i.rewindListener_),
                        i.debug('created, listening to "' + i.startEvent_ + '" for "start" and "' + (i.endEvent_ || "nothing") + '" for "end"'),
                        i.hide(),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = this.options_,
                            e = t.content,
                            n = t.showBackground ? "tcp-overlay-background" : "tcp-overlay-no-background",
                            r = hc.createEl("div", {
                                className: "\n        tcp-overlay\n        tcp-overlay-" + t.align + "\n        " + t.className + "\n        " + n + "\n        vjs-hidden\n      "
                            });
                        return "string" == typeof e ? r.innerHTML = e : ie.browser.IS_IE8 || e instanceof Ke.DocumentFragment ? r.appendChild(e) : hc.appendContent(r, e),
                            r
                    },
                    e.prototype.debug = function () {
                        if (this.options_.debug) {
                            for (var t = ie.log, e = t, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            t.hasOwnProperty(r[0]) && "function" == typeof t[r[0]] && (e = t[r.shift()]),
                                e.apply(undefined, ["overlay#" + this.id() + ": "].concat(r))
                        }
                    },
                    e.prototype.hide = function () {
                        return t.prototype.hide.call(this),
                            this.debug("hidden"),
                            this.debug('bound `startListener_` to "' + this.startEvent_ + '"'),
                        this.endEvent_ && (this.debug('unbound `endListener_` from "' + this.endEvent_ + '"'), this.off(this.player(), this.endEvent_, this.endListener_)),
                            this.options_.once ? (ie.browser.IS_IOS && ie.browser.IS_WECHAT ? this.player().hasStarted() || this.player().ready(ie.bind(this, function () {
                                this.startListener_({
                                    type: this.startEvent_
                                })
                            })) : this.player().hasStarted() || this.on(this.player(), this.startEvent_, this.startListener_), this) : ("pause" === this.startEvent_ ? this.on(this.player(), this.startEvent_, this.startOnPause_) : this.on(this.player(), this.startEvent_, this.startListener_), this)
                    },
                    e.prototype.startOnPause_ = function (t) {
                        var e = this.player();
                        "pause" === t.type ? e.seeking() || e.ended() || this.startListener_({
                            type: "pause"
                        }) : e.paused() && this.startListener_({
                            type: "pause"
                        })
                    },
                    e.prototype.shouldHide_ = function (t, e) {
                        var n = this.options_.end;
                        return dc(n) ? t >= n : n === e
                    },
                    e.prototype.show = function () {
                        return t.prototype.show.call(this),
                        "pause" === this.startEvent_ && this.off(this.player(), this.startEvent_, this.startOnPause_),
                            this.off(this.player(), this.startEvent_, this.startListener_),
                            this.debug("shown"),
                            this.debug('unbound `startListener_` from "' + this.startEvent_ + '"'),
                        this.endEvent_ && (this.debug('bound `endListener_` to "' + this.endEvent_ + '"'), this.on(this.player(), this.endEvent_, this.endListener_)),
                            this
                    },
                    e.prototype.shouldShow_ = function (t, e) {
                        var n = this.options_.start,
                            r = this.options_.end;
                        return dc(n) ? dc(r) ? t >= n && t < r : this.hasShownSinceSeek_ ? Math.floor(t) === n : (this.hasShownSinceSeek_ = !0, t >= n) : n === e
                    },
                    e.prototype.startListener_ = function (t) {
                        var e = this.player().currentTime();
                        this.shouldShow_(e, t.type) && this.show()
                    },
                    e.prototype.endListener_ = function (t) {
                        var e = this.player().currentTime();
                        this.shouldHide_(e, t.type) && this.hide()
                    },
                    e.prototype.rewindListener_ = function (t) {
                        var e = this.player().currentTime(),
                            n = this.previousTime_,
                            r = this.options_.start,
                            i = this.options_.end;
                        e < n && (this.debug("rewind detected"), dc(i) && !this.shouldShow_(e) ? (this.debug("hiding; " + i + " is an integer and overlay should not show at this time"), this.hasShownSinceSeek_ = !1, this.hide()) : fc(i) && e < r && (this.debug("hiding; show point (" + r + ") is before now (" + e + ") and end point (" + i + ") is an event"), this.hasShownSinceSeek_ = !1, this.hide())),
                            this.previousTime_ = e
                    },
                    e
            }(uc);
        ie.registerComponent("Overlay", yc),
            pc("Patch", function (t) {
                var e = this,
                    n = ie.mergeOptions(cc, t);
                Array.isArray(this.overlays_) && this.overlays_.forEach(function (t) {
                    e.removeChild(t),
                    e.controlBar && e.controlBar.removeChild(t),
                        t.dispose()
                });
                var r = n.overlays;
                delete n.overlays,
                    this.overlays_ = r.map(function (t) {
                        var r = ie.mergeOptions(n, t);
                        return r.attachToControlBar && e.controlBar && -1 !== r.align.indexOf("bottom") ? e.controlBar.addChild("overlay", r) : e.addChild("overlay", r)
                    })
            });
        var gc = ie.getPlugin("plugin"),
            vc = ie.log,
            mc = ["start", "pause", "ended"],
            _c = ["loadstart", "pause", "ended"],
            bc = ["play", "play", "play"],
            Tc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.hasInit = !1,
                        i.init(r),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function (t) {
                        var e = this,
                            n = this.player,
                            r = {
                                showBackground: !1,
                                overlays: []
                            };
                        Array.isArray(t) && t.length > 0 && (vc("ImagePatch initializing"), t.forEach(function (t) {
                            var n = void 0,
                                i = void 0,
                                o = void 0,
                                s = void 0,
                                a = document.createDocumentFragment();
                            o = document.createElement("a"),
                                o.className = "tcp-overlay-link",
                                o.target = "_blank",
                            t.link && (o.href = t.link),
                            t.url && (s = e.loadImg(ve(t.url), ie.bind(e, e.onImgLoaded)), s.className = "tcp-overlay-img", o.appendChild(s), ie.browser.IS_IE8 ? (n = document.createElement("div"), n.className = "tcp-overlay-table", i = document.createElement("div"), i.className = "tcp-overlay-cell", i.appendChild(o), n.appendChild(i), a.appendChild(n)) : a.appendChild(o), r.overlays.push({
                                content: a,
                                className: "tcp-image-patch tcp-image-patch-" + mc[t.location],
                                start: _c[t.location],
                                end: bc[t.location],
                                once: 0 == t.location,
                                align: "center"
                            }))
                        }), r.overlays.length > 0 ? (n.Patch(r), n.trigger({
                            type: "feature",
                            data: "patch"
                        }), this.hasInit = !0) : this.reset(), vc("ImagePatch initialized"))
                    },
                    e.prototype.loadImg = function (t, e) {
                        var n, r, i, o, s, a = new Image;
                        return a.src = t,
                            a.complete ? (e && e.call(e, a), a) : (r = a.width, i = a.height, a.onerror = function () {
                                n.end = !0,
                                    a = a.onload = a.onerror = null
                            }, n = function () {
                                o = a.width,
                                    s = a.height,
                                (o !== r || s !== i || o * s > 1024) && (e && e.call(e, a), n.end = !0)
                            }, n(), a.onload = function () {
                                !n.end && n(),
                                    a = a.onload = a.onerror = null
                            }, a)
                    },
                    e.prototype.onImgLoaded = function (t) {
                        if (ie.browser.IE_VERSION) {
                            var e = parseInt(this.player.el().currentStyle.width),
                                n = parseInt(this.player.el().currentStyle.height);
                            if (t.width > e || t.height > n) {
                                var r = e / (t.width / t.height);
                                t.width / t.height > e / n || (t.style.marginTop = (n - r) / 2 + "px"),
                                    t.style.width = "100%",
                                    t.style.height = "auto"
                            }
                        }
                    },
                    e.prototype.reset = function () {
                        this.hasInit && (vc("ImagePatch reset"), this.player.Patch(), this.hasInit = !1)
                    },
                    e
            }(gc);
        ie.registerPlugin("ImagePatch", Tc);
        var Cc = ie.getPlugin("plugin"),
            Ec = ie.log,
            kc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return i.options = r,
                        Ec("ContextMenu initializing"),
                        i.init(),
                        Ec("ContextMenu initialized"),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        this.player.addChild("RightClickPopupMenu", this.options)
                    },
                    e
            }(Cc);
        ie.registerPlugin("ContextMenu", kc);
        var wc = ie.getPlugin("plugin"),
            Sc = ie.log,
            Pc = {
                width: 0,
                height: 0,
                basePath: ""
            },
            xc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return i.hasInit = !1,
                    r.vttUrl && n.ready(ie.bind(i, function () {
                        this.init(r)
                    })),
                        i
                }
                return Wn(e, t),
                    e.prototype.loadTrackFile = function (t) {
                        var e = this,
                            n = this.player,
                            r = n.addRemoteTextTrack({
                                src: t.vttUrl,
                                kind: "metadata"
                            }, !0);
                        r && r.addEventListener("load", function () {
                            e.trackInfo = r
                        })
                    },
                    e.prototype.init = function (t) {
                        if (!ie.browser.IS_IOS && !ie.browser.IS_ANDROID && this.player.controlBar) {
                            if (Sc("VttThumbnail initializing", t), !this.player.controlBar) return void Sc("VttThumbnail can not initialize without control bar");
                            this.options = t;
                            var e = this.player,
                                n = e.controlBar.progressControl;
                            e.controlBar.progressControl.seekBar;
                            this.loadTrackFile(t),
                                Pc.basePath = Ac(t.vttUrl),
                                this.initUI(),
                                n.on("mousemove", ie.bind(this, this.onMouseMove)),
                                n.on("mouseleave", ie.bind(this, this.onMouseOut)),
                                this.hasInit = !0,
                                Sc("VttThumbnail initialized"),
                                e.trigger({
                                    type: "feature",
                                    data: "thumbnail"
                                })
                        }
                    },
                    e.prototype.initTrackFile = function (t) {
                        t.track;
                        this.trackInfo = t
                    },
                    e.prototype.initUI = function () {
                        var t = ie.dom.createEl("div", {
                                className: "tcp-vtt-thumbnail-container"
                            }),
                            e = ie.dom.createEl("img", {
                                className: "tcp-vtt-thumbnail-img"
                            });
                        t.appendChild(e),
                            this.containerEl = t,
                            this.imgEl = e,
                            this.player.controlBar.progressControl.el().appendChild(t)
                    },
                    e.prototype.onMouseMove = function (t) {
                        if (!this.trackInfo) return !1;
                        var e = void 0,
                            n = void 0,
                            r = void 0,
                            i = void 0,
                            o = void 0,
                            s = void 0,
                            a = void 0,
                            l = void 0,
                            c = 0,
                            u = void 0,
                            h = void 0,
                            p = void 0,
                            d = void 0;
                        for (r = this.player.controlBar.progressControl, i = this.player.controlBar.progressControl.seekBar, o = Mc(r.el()).getBoundingClientRect(), s = Mc(i.el()).getBoundingClientRect(), e = t.clientX, l = this.player.duration(), a = ((e - s.left) / i.width() * l).toFixed(3), u = this.trackInfo.track || this.trackInfo; c < u.cues.length;) {
                            if (h = u.cues[c], h.startTime <= a && h.endTime >= a) {
                                p = Dc(h.text);
                                break
                            }
                            c++
                        }
                        if (!p) return this.onMouseOut(),
                            !1;
                        d = e - s.left + p.w / 2 - i.width(),
                            d = Math.max(0, d),
                            n = e - o.left - p.w / 2 - d,
                            n = Math.max(i.el().offsetLeft, n),
                            p.left = n,
                            this.setView(p)
                    },
                    e.prototype.onMouseOut = function () {
                        this.containerEl.style.left = "-1000px"
                    },
                    e.prototype.setView = function (t) {
                        var e = this.containerEl,
                            n = this.imgEl,
                            r = this.options;
                        e.style.width == t.w && e.style.height == t.h || (e.style.width = t.w + "px", e.style.height = t.h + "px"),
                            e.style.left = t.left + "px",
                            r.imgUrl && n.src != r.imgUrl ? n.src = r.imgUrl : n.src = t.src,
                            n.style.left = -t.x + "px",
                            n.style.top = -t.y + "px",
                            n.style.clip = "rect(" + t.y + "px," + (t.w + t.x) + "px," + (t.y + t.h) + "px," + t.x + "px)"
                    },
                    e.prototype.reset = function () {
                        if (this.hasInit) {
                            Sc("VttThumbnail reset");
                            var t = this.player,
                                e = t.controlBar.progressControl;
                            e.off("mousemove", ie.bind(this, this.onMouseMove)),
                                e.off("mouseleave", ie.bind(this, this.onMouseOut)),
                                this.hasInit = !1
                        }
                    },
                    e
            }(wc),
            Ic = function (t, e) {
                return function (n) {
                    return window.getComputedStyle ? window.getComputedStyle(t, e)[n] : t.currentStyle[n]
                }
            },
            Mc = function bh(t) {
                return "HTML" !== t.nodeName && "static" === Ic(t)("position") ? bh(t.offsetParent) : t
            },
            Dc = function (t) {
                var e = void 0,
                    n = void 0,
                    r = void 0;
                if (-1 === (n = t.indexOf("#"))) return {
                    src: t,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0
                };
                if (e = t.substring(0, n), /^(http:|https:|\/\/)/.test(e) || (e = Pc.basePath + e), r = t.substring(n + 1), "xywh=" !== r.substring(0, 5)) return {
                    src: e,
                    w: 0,
                    h: 0,
                    x: 0,
                    y: 0
                };
                var i = r.substring(5).split(",");
                return {
                    src: e,
                    w: parseInt(i[2]),
                    h: parseInt(i[3]),
                    x: parseInt(i[0]),
                    y: parseInt(i[1])
                }
            },
            Ac = function (t) {
                /^(\/\/)/.test(t) && (t = "https:" + t);
                var e = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i,
                    n = t.match(e);
                if (n && n[2] && n[4]) return "//" + n[2] + n[4]
            };
        ie.registerPlugin("VttThumbnail", xc);
        var Rc = ie.getPlugin("plugin"),
            jc = ie.log,
            Oc = function (t) {
                function e(n, r) {
                    qn(this, e),
                        jc("PlayerMetrics initializing");
                    var i = Kn(this, t.call(this, n));
                    return i.hasInit = !1,
                        i.features = [],
                        i.timing = {},
                        i.playStatus = {
                            isFirstPlay: !1
                        },
                        i.lagStatus = {
                            lagCount: 0,
                            lagging: !1,
                            lagStart: 0,
                            lagEnd: 0,
                            lagInterval: 1e3,
                            lagDuration: 0,
                            isFirstLag: !1,
                            skip: !1
                        },
                        i.registerListener(),
                        n.ready(ie.bind(i, i.init)),
                        jc("PlayerMetrics initialized"),
                        i.getSystemVer(),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        this.player;
                        this.hasInit = !0,
                            this.setTimingData({
                                initEnd: be()
                            }),
                            this.report({
                                InitTiming: this.timing.initEnd - this.timing.initStart
                            })
                    },
                    e.prototype.registerListener = function () {
                        var t = this,
                            e = this.player,
                            n = this.lagStatus;
                        e.one("play", function () {
                            t.setTimingData({
                                firstPlay: be()
                            }),
                                t.report({
                                    PlayCount: 1
                                }),
                            "Flash" == e.techName_ && (jc("use flash"), t.reportMTA("flash", {
                                appid: e.options_.appID,
                                fileid: e.options_.fileID,
                                browser: t.getBrowser()
                            }))
                        }),
                            e.on("playing", function () {
                                if (!t.playStatus.isFirstPlay) {
                                    t.playStatus.isFirstPlay = !0,
                                        t.setTimingData({
                                            firstPlaying: be()
                                        });
                                    e.tech(!0);
                                    if (t.report({
                                        featureList: t.features.join(","),
                                        firstPlayTiming: t.timing.firstPlaying - t.timing.firstPlay,
                                        playPercent: 1
                                    }), e.on("waiting", function () {
                                        n.lagging || e.seeking() || n.skip || (n.lagging = !0, n.lagStart = be())
                                    }), e.currentSource().keySystems) {
                                        var r = e.currentSource().keySystems;
                                        r["com.widevine.alpha"] && (t.reportMTA("drm", {
                                            success: "Widevine"
                                        }), jc("DRM success Widevine")),
                                        r["com.apple.fps.1_0"] && (t.reportMTA("drm", {
                                            success: "FairPlay"
                                        }), jc("DRM success FairPlay"))
                                    } else e.options_.plugins.DRM && e.options_.plugins.DRM.token && (t.reportMTA("drm", {
                                        success: "simpleAES"
                                    }), jc("DRM success simpleAES"))
                                }
                                n.lagging && (n.lagEnd = be()) - n.lagStart > n.lagInterval && (n.lagging = !1, n.lagCount++, n.lagDuration += n.lagEnd - n.lagStart, n.lagEnd = n.lagStart = 0, t.lagStatus.isFirstLag || (t.lagStatus.isFirstLag = !0, t.setTimingData({
                                    firstLag: be()
                                }), t.report({
                                    firstStuckTime: t.lagStatus.lagDuration,
                                    stuckCount: 1
                                }))),
                                    n.skip = !1
                            }),
                            e.on("error", ie.bind(this, this.onError)),
                            e.on("resolutionswitching", function (t) {
                                n.skip = !0
                            }),
                            e.on("resolutionswitched", function (t) {}),
                            e.on("pause", function () {
                                n.lagging && (n.skip = !0)
                            }),
                            e.on("playcgiend", function (n) {
                                var r = n.data;
                                r.result && 0 == r.result.code && (t.playStatus.requestID = r.result.requestId, setTimeout(function () {
                                    if (e.currentSources().length > 0 && e.currentSources()[0].keySystems) {
                                        var n = e.currentSources()[0].keySystems;
                                        n["com.widevine.alpha"] && t.reportMTA("drm", {
                                            initialized: "Widevine"
                                        }),
                                        n["com.apple.fps.1_0"] && t.reportMTA("drm", {
                                            initialized: "FairPlay"
                                        })
                                    } else e.options_.plugins.DRM && e.options_.plugins.DRM.token && t.reportMTA("drm", {
                                        initialized: "SimpleAES"
                                    })
                                }, 0)),
                                    t.setTimingData({
                                        cgiStart: n.data.startTime,
                                        cgiEnd: n.data.time
                                    })
                            }),
                            e.one("ended", function () {
                                var e = {
                                    PlayTiming: be() - t.timing.firstPlaying
                                };
                                t.lagStatus.lagCount > 1 && (e.stuckTime = t.lagStatus.lagDuration),
                                    t.report(e)
                            }),
                            e.on("feature", function (e) {
                                -1 == t.features.indexOf(e.data) && t.features.push(e.data)
                            })
                    },
                    e.prototype.setTimingData = function (t) {
                        this.timing = ie.mergeOptions(this.timing, t)
                    },
                    e.prototype.reset = function () {
                        this.playStatus = {
                            isFirstPlay: !1
                        }
                    },
                    e.prototype.onError = function (t, e) {
                        t && t.data && t.data.code && this.report({
                            errorCode: t.data.code
                        });
                        var n = si(this.player.src());
                        cn && n ? this.reportMTA("x5_err", {
                            format: n
                        }) : n && this.reportMTA("error", {
                            format: n
                        }),
                            this.reportMTA("error", {
                                code: t.data.code,
                                browser: this.getBrowser()
                            }),
                            jc("error", t.data)
                    },
                    e.prototype.reportMTA = function (t, e) {
                        this.player.Reporter().reportMTA(t, e)
                    },
                    e.prototype.report = function (t) {
                        var e = this;
                        setTimeout(function () {
                            var n = e.player;
                            t = ie.mergeOptions(t, {
                                appId: n.options_.appID,
                                fileid: n.options_.fileID,
                                playerModel: "tcplayer-vod",
                                system: e.getSystem(),
                                systemVer: e.getSystemVer(),
                                browser: e.getBrowser(),
                                browserVer: e.getBrowserVer(),
                                getDevice: e.getDevice(),
                                mediaType: e.getMediaType()
                            }),
                            e.playStatus.requestID && (t.serialID = e.playStatus.requestID),
                                n.Reporter().reportPlayMetrics(t)
                        }, 1)
                    },
                    e.prototype.getSystem = function () {
                        return on ? "ios" : an ? "android" : Sn ? "win" : Pn ? "mac" : "other"
                    },
                    e.prototype.getSystemVer = function () {
                        var t = this.getSystem();
                        return "ios" == t ? sn : "android" == t ? ln : "win" == t ? xn : "mac" == t ? In : void 0
                    },
                    e.prototype.getBrowser = function () {
                        return gn ? "firefox" : vn ? "edge" : hn ? "mqq" : pn ? "qq" : cn ? "tbs" : mn ? "chrome" : Tn ? "ie" : Cn ? "safari" : "other"
                    },
                    e.prototype.getBrowserVer = function () {
                        var t = this.getBrowser();
                        return "firefox" == t ? Rn : "edge" == t ? Dn : "chrome" == t ? "chrome" + _n : "ie" == t ? "ie" + Tn : "safari" == t ? An : "qq" == t || "mqq" == t ? Mn : "tbs" == t ? un : "other"
                    },
                    e.prototype.getDevice = function () {
                        return on ? "ios" + sn : jn ? "华为" : On ? "小米" : Ln ? "oppo" : Nn ? "vivo" : Bn ? "三星" : Hn ? "酷派" : Fn ? "一加" : Vn ? "中兴" : "其他"
                    },
                    e.prototype.getMediaType = function () {
                        return this.player.src() && /\/(.+)\.(.+)\?|\/(.+)\.(.+)/.test(this.player.src()),
                        RegExp.$2 || RegExp.$4
                    },
                    e.prototype.getWebkitMetrics = function () {},
                    e.prototype.getMozMetrics = function () {},
                    e.prototype.getFlashMetrics = function () {},
                    e
            }(Rc);
        ie.registerPlugin("PlayerMetrics", Oc);
        var Lc = ie.getPlugin("plugin"),
            Nc = ie.log,
            Bc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return on || an || n.ready(ie.bind(i, i.init)),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        var t = this.player;
                        if (!t.controlBar) return void Nc("ProgressMarker can not initialize without control bar");
                        if (t.options_.dots) {
                            Nc("ProgressMarker initializing");
                            var e = t.controlBar.getChild("ProgressControl").getChild("SeekBar");
                            e.getChild("ProgressMarkerGenerator") && e.removeChild("ProgressMarkerGenerator"),
                            t.options_.plugins.ProgressMarker && (e.addChild("ProgressMarkerGenerator"), Nc("ProgressMarker initialized"), t.trigger({
                                type: "feature",
                                data: "marker"
                            }))
                        }
                    },
                    e
            }(Lc);
        ie.registerPlugin("ProgressMarker", Bc);
        var Fc = ie.getComponent("Component"),
            Hc = function (t) {
                function e(n, r) {
                    return qn(this, e),
                        Kn(this, t.call(this, n, r))
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = this.options_,
                            e = ie.dom.createEl("div", {
                                className: "tcp-playlist-item"
                            }),
                            n = ie.dom.createEl("div", {
                                className: "tcp-playlist-item-video",
                                innerHTML: '<img src="' + t.img + '" class="tcp-playlist-item-img">'
                            }),
                            r = ie.dom.createEl("div", {
                                className: "tcp-playlist-item-duration",
                                textContent: this.timeFormat(t.duration)
                            });
                        n.appendChild(r);
                        var i = ie.dom.createEl("div", {
                            className: "tcp-playlist-item-desc",
                            textContent: t.text
                        });
                        return e.appendChild(n),
                            e.appendChild(i),
                            this.bindEvent(e),
                            e
                    },
                    e.prototype.bindEvent = function (t) {
                        var e = this;
                        ie.on(t, ["click"], function () {
                            e.player_.trigger({
                                type: "playItem",
                                data: e.options_
                            })
                        })
                    },
                    e.prototype.timeFormat = function (t) {
                        var e = "",
                            n = Math.floor(t / 3600);
                        0 != n && (t -= 3600 * n, n < 10 && (n = "0" + n), e += n + ":");
                        var r = Math.floor(t / 60);
                        return r < 10 && (r = "0" + r),
                            t -= 60 * r,
                        t < 10 && (t = "0" + t),
                            e += r + ":" + t
                    },
                    e
            }(Fc);
        ie.registerComponent("PlayListItem", Hc);
        var Vc = ie.getComponent("Component"),
            Uc = function (t) {
                function e(n, r) {
                    return qn(this, e),
                        Kn(this, t.call(this, n, r))
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = this.options_;
                        return ie.dom.createEl("div", {
                            className: "tcp-playlist-title",
                            textContent: t.title
                        })
                    },
                    e
            }(Vc);
        ie.registerComponent("PlayListTitle", Uc);
        var zc = ie.getComponent("Component"),
            qc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.init(),
                        i.activeIndex = -1,
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return ie.dom.createEl("div", {
                            className: "tcp-playlist-box"
                        })
                    },
                    e.prototype.init = function () {
                        var t = this,
                            e = this.options_.data;
                        this.addChild("PlayListTitle", {
                            title: this.options_.title
                        }),
                            e.forEach(function (e, n) {
                                e.index = n,
                                    t.addChild("PlayListItem", e)
                            }),
                            this.player_.on("playItem", function (n) {
                                var r = n.data,
                                    i = void 0;
                                t.activeIndex = r ? r.index : (t.activeIndex + 1) % e.length,
                                    i = e[t.activeIndex],
                                    t.player_.loadVideoByID({
                                        fileID: i.fileID,
                                        appID: i.appID
                                    }),
                                    t.player_.one("loadedmetadata", ie.bind(t, function () {
                                        t.player_.play()
                                    })),
                                    document.querySelectorAll(".tcp-playlist-item").forEach(function (t) {
                                        ie.dom.removeClass(t, "tcp-playlist-item-active")
                                    });
                                var o = document.querySelectorAll(".tcp-playlist-item")[t.activeIndex];
                                ie.dom.addClass(o, "tcp-playlist-item-active")
                            })
                    },
                    e
            }(zc);
        ie.registerComponent("PlayListBox", qc);
        var Wc = ie.getComponent("Component"),
            Kc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.status = 0,
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        var t = ie.dom.createEl("div", {
                            className: "tcp-playlist-toggle",
                            textContent: "<"
                        });
                        return this.bindEvent(t),
                            t
                    },
                    e.prototype.bindEvent = function (t) {
                        var e = this;
                        ie.on(t, ["click"], function (n) {
                            e.status = !e.status;
                            var r = document.querySelector(".tcp-playlist");
                            e.status ? (t.textContent = ">", ie.dom.addClass(r, "tcp-playlist-open"), ie.dom.removeClass(r, "tcp-playlist-close")) : (ie.dom.addClass(r, "tcp-playlist-close"), ie.dom.removeClass(r, "tcp-playlist-open"), t.textContent = "<")
                        })
                    },
                    e
            }(Wc);
        ie.registerComponent("PlayListToggle", Kc);
        var Xc = ie.getComponent("Component"),
            Qc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.init(),
                        i
                }
                return Wn(e, t),
                    e.prototype.createEl = function () {
                        return ie.dom.createEl("div", {
                            className: "tcp-playlist tcp-playlist-close"
                        })
                    },
                    e.prototype.init = function () {
                        this.addChild("PlayListToggle"),
                            this.addChild("PlayListBox", this.options_)
                    },
                    e
            }(Xc);
        ie.registerComponent("PlayList", Qc);
        var Gc = ie.getComponent("Button"),
            $c = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n, r));
                    return i.addClass(),
                        i
                }
                return Wn(e, t),
                    e.prototype.addClass = function () {
                        ie.dom.addClass(this.el_, "vjs-play-next")
                    },
                    e.prototype.update = function () {},
                    e.prototype.handleClick = function (t) {
                        this.player_.trigger({
                            type: "playItem"
                        })
                    },
                    e
            }(Gc);
        $c.prototype.controlText_ = "Play Next",
            ie.registerComponent("PlayNextButton", $c);
        var Yc = ie.getPlugin("plugin"),
            Jc = ie.log,
            Zc = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return on || an ? Kn(i) : (i.options = r, r && r.data instanceof Array && r.data.length > 0 && n.ready(ie.bind(i, i.init)), i)
                }
                return Wn(e, t),
                    e.prototype.init = function () {
                        Jc("PlayList initializing"),
                            this.player.addChild("PlayList", this.options),
                            this.player.controlBar.addChild("PlayNextButton", {}, 1),
                            Jc("PlayList initialized"),
                            this.player.trigger({
                                type: "feature",
                                data: "playlist"
                            })
                    },
                    e
            }(Yc);
        ie.registerPlugin("PlayList", Zc);
        var tu = ie.getPlugin("plugin"),
            eu = ie.log,
            nu = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return eu("HLSToken", n, r),
                        i.init(r),
                        i
                }
                return Wn(e, t),
                    e.prototype.init = function (t) {
                        eu("HLSToken init", t, this.player);
                        var e = this.player;
                        t.token && (this.options = t, e.on("playcgiend", ie.bind(this, function (t) {
                            this.modifyData(t.data)
                        })))
                    },
                    e.prototype.modifyData = function (t) {
                        var e = this;
                        if (eu("HLSToken modifyData", t), 0 === t.result.code) {
                            var n = t.result.videoInfo;
                            if (n.masterPlayList) {
                                var r = n.masterPlayList.url.split("/");
                                r[r.length - 1] = "voddrm.token." + this.options.token + "." + r[r.length - 1],
                                    n.masterPlayList.url = r.join("/")
                            }
                            n.transcodeList && n.transcodeList.length > 0 && (n.transcodeList = n.transcodeList.map(function (t) {
                                var n = t.url.split("/");
                                return n[n.length - 1] = "voddrm.token." + e.options.token + "." + n[n.length - 1],
                                    t.url = n.join("/"),
                                    t
                            }))
                        }
                    },
                    e
            }(tu);
        ie.registerPlugin("HLSToken", nu);
        var ru = function (t) {
                var e = (new Ke.DOMParser).parseFromString(String.fromCharCode.apply(null, new Uint16Array(t)), "application/xml"),
                    n = e.getElementsByTagName("HttpHeaders")[0],
                    r = {};
                if (n) for (var i = n.getElementsByTagName("name"), o = n.getElementsByTagName("value"), s = 0; s < i.length; s++) r[i[s].childNodes[0].nodeValue] = o[s].childNodes[0].nodeValue;
                var a = e.getElementsByTagName("Challenge")[0],
                    l = void 0;
                return a && (l = Ke.atob(a.childNodes[0].nodeValue)),
                    {
                        headers: r,
                        message: l
                    }
            },
            iu = function (t, e, n) {
                var r = ru(e),
                    i = r.headers,
                    o = r.message;
                ie.xhr({
                    uri: t,
                    method: "post",
                    headers: i,
                    body: o,
                    responseType: "arraybuffer"
                }, n)
            },
            ou = function (t) {
                var e = void 0;
                return Object.keys(t).forEach(function (n) {
                    var r = {},
                        i = t[n].audioContentType,
                        o = t[n].videoContentType;
                    i && (r.audioCapabilities = [{
                        contentType: i
                    }]),
                    o && (r.videoCapabilities = [{
                        contentType: o
                    }]),
                        e = e ? e["catch"](function (t) {
                            return Ke.navigator.requestMediaKeySystemAccess(n, [r])
                        }) : Ke.navigator.requestMediaKeySystemAccess(n, [r])
                }),
                    e
            },
            su = function (t) {
                var e = t.mediaKeys,
                    n = t.initDataType,
                    r = t.initData,
                    i = t.options,
                    o = t.getLicense,
                    s = t.removeSession,
                    a = t.eventBus,
                    l = e.createSession();
                l.addEventListener("message", function (t) {
                    o(i, t.message).then(function (t) {
                        return l.update(t)
                    })["catch"](ie.log.error.bind(ie.log.error, "failed to get and set license"))
                }, !1),
                    l.addEventListener("keystatuseschange", function (t) {
                        var e = !1;
                        l.keyStatuses.forEach(function (n, r) {
                            switch (a.trigger({
                                keyId: r,
                                status: n,
                                target: l,
                                type: "keystatuschange"
                            }), n) {
                                case "expired":
                                    e = !0;
                                    break;
                                case "internal-error":
                                    ie.log.warn('Key status reported as "internal-error." Leaving the session open since we don\'t have enough details to know if this error is fatal.', t)
                            }
                        }),
                        e && l.close().then(function () {
                            s(r)
                        })
                    }, !1),
                    l.generateRequest(n, r)["catch"](ie.log.error.bind(ie.log.error, "Unable to create or initialize key session"))
            },
            au = function (t) {
                var e = t.video,
                    n = t.initDataType,
                    r = t.initData,
                    i = t.options,
                    o = t.getLicense,
                    s = t.removeSession,
                    a = t.eventBus;
                e.mediaKeysObject ? su({
                    mediaKeys: e.mediaKeysObject,
                    initDataType: n,
                    initData: r,
                    options: i,
                    getLicense: o,
                    removeSession: s,
                    eventBus: a
                }) : e.pendingSessionData.push({
                    initDataType: n,
                    initData: r
                })
            },
            lu = function (t) {
                var e = t.video,
                    n = t.certificate,
                    r = t.createdMediaKeys,
                    i = t.options,
                    o = t.getLicense,
                    s = t.removeSession,
                    a = t.eventBus;
                e.mediaKeysObject = r,
                n && r.setServerCertificate(n);
                for (var l = 0; l < e.pendingSessionData.length; l++) {
                    var c = e.pendingSessionData[l];
                    su({
                        mediaKeys: e.mediaKeysObject,
                        initDataType: c.initDataType,
                        initData: c.initData,
                        options: i,
                        getLicense: o,
                        removeSession: s,
                        eventBus: a
                    })
                }
                return e.pendingSessionData = [],
                    e.setMediaKeys(r)
            },
            cu = function (t) {
                return function (e, n, r) {
                    iu(t, n, function (t, e, n) {
                        if (t) return void r(t);
                        r(null, n)
                    })
                }
            },
            uu = function (t) {
                return function (e, n, r) {
                    ie.xhr({
                        uri: t,
                        method: "POST",
                        responseType: "arraybuffer",
                        body: n,
                        headers: {
                            "Content-type": "application/octet-stream"
                        }
                    }, function (t, e, n) {
                        if (t) return void r(t);
                        r(null, n)
                    })
                }
            },
            hu = function (t, e) {
                return function (n, r) {
                    return new Promise(function (i, o) {
                        t(n, r, function (t, n) {
                            e && e.trigger("licenserequestattempted"),
                            t && o(t),
                                i(n)
                        })
                    })
                }
            },
            pu = function (t, e) {
                if ("string" == typeof e && (e = {
                    url: e
                }), !e.url && !e.getLicense) throw new Error("Neither URL nor getLicense function provided to get license");
                return e.url && !e.getLicense && (e.getLicense = "com.microsoft.playready" === t ? cu(e.url) : uu(e.url)),
                    e
            },
            du = function (t) {
                var e = t.video,
                    n = t.initDataType,
                    r = t.initData,
                    i = t.options,
                    o = t.removeSession,
                    s = t.eventBus,
                    a = Promise.resolve();
                if ("undefined" == typeof e.mediaKeysObject) {
                    e.mediaKeysObject = null,
                        e.pendingSessionData = [];
                    var l = void 0,
                        c = void 0;
                    if (!(a = ou(i.keySystems))) return ie.log.error("No supported key system found"),
                        Promise.resolve();
                    a = a.then(function (t) {
                        return new Promise(function (n, r) {
                            if (e.keySystem = t.keySystem, c = pu(t.keySystem, i.keySystems[t.keySystem]), !c.getCertificate) return void n(t);
                            c.getCertificate(i, function (e, i) {
                                if (e) return void r(e);
                                l = i,
                                    n(t)
                            })
                        })
                    }).then(function (t) {
                        return t.createMediaKeys()
                    }).then(function (t) {
                        return lu({
                            video: e,
                            certificate: l,
                            createdMediaKeys: t,
                            options: i,
                            getLicense: hu(c.getLicense, s),
                            removeSession: o,
                            eventBus: s
                        })
                    })["catch"](ie.log.error.bind(ie.log.error, "Failed to create and initialize a MediaKeys object"))
                }
                return a.then(function () {
                    au({
                        video: e,
                        initDataType: n,
                        initData: r,
                        options: i,
                        getLicense: e.keySystem ? hu(pu(e.keySystem, i.keySystems[e.keySystem]).getLicense, s) : null,
                        removeSession: o,
                        eventBus: s
                    })
                })
            },
            fu = function (t) {
                for (var e = new ArrayBuffer(2 * t.length), n = new Uint16Array(e), r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
                return n
            },
            yu = function (t) {
                return String.fromCharCode.apply(null, new Uint16Array(t.buffer))
            },
            gu = function (t) {
                var e = Ye.createElement("a");
                return t = t.match(/.*(skd\:\/\/.+)/i)[1],
                    e.href = t,
                    e.hostname
            },
            vu = function (t, e) {
                if (t === e) return !0;
                if (t.byteLength !== e.byteLength) return !1;
                for (var n = new DataView(t), r = new DataView(e), i = 0; i < n.byteLength; i++) if (n.getUint8(i) !== r.getUint8(i)) return !1;
                return !0
            },
            mu = function (t) {
                return t instanceof Uint8Array || t instanceof Uint16Array ? t.buffer : t
            },
            _u = function (t) {
                var e = t.initData,
                    n = t.id,
                    r = t.cert;
                "string" == typeof n && (n = fu(n));
                var i = 0,
                    o = new ArrayBuffer(e.byteLength + 4 + n.byteLength + 4 + r.byteLength),
                    s = new DataView(o);
                new Uint8Array(o, i, e.byteLength).set(e),
                    i += e.byteLength,
                    s.setUint32(i, n.byteLength, !0),
                    i += 4;
                var a = new Uint16Array(o, i, n.length);
                return a.set(n),
                    i += a.byteLength,
                    s.setUint32(i, r.byteLength, !0),
                    i += 4,
                    new Uint8Array(o, i, r.byteLength).set(r),
                    new Uint8Array(o, 0, o.byteLength)
            },
            bu = function (t) {
                var e = t.video,
                    n = t.contentId,
                    r = t.initData,
                    i = t.cert,
                    o = t.options,
                    s = t.getLicense,
                    a = t.eventBus;
                return new Promise(function (t, l) {
                    if (e.webkitKeys || e.webkitSetMediaKeys(new Ke.WebKitMediaKeys("com.apple.fps.1_0")), !e.webkitKeys) return void l("Could not create MediaKeys");
                    var c = e.webkitKeys.createSession("video/mp4", _u({
                        id: n,
                        initData: r,
                        cert: i
                    }));
                    if (!c) return void l("Could not create key session");
                    c.contentId = n,
                        c.addEventListener("webkitkeymessage", function (t) {
                            s(o, n, t, function (t, e) {
                                if (a && a.trigger("licenserequestattempted"), t) return void l(t);
                                c.update(new Uint8Array(e))
                            })
                        }),
                        c.addEventListener("webkitkeyadded", function (e) {
                            t(e)
                        }),
                        c.addEventListener("webkitkeyerror", function (t) {
                            l(t)
                        })
                })
            },
            Tu = function (t) {
                return function (e, n) {
                    ie.xhr({
                        uri: t,
                        responseType: "arraybuffer"
                    }, function (t, e, r) {
                        if (t) return void n(t);
                        n(null, new Uint8Array(r))
                    })
                }
            },
            Cu = function (t, e) {
                return gu(yu(e))
            },
            Eu = function (t) {
                return function (e, n, r, i) {
                    ie.xhr({
                        uri: t,
                        method: "POST",
                        responseType: "arraybuffer",
                        body: r.message,
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded"
                        }
                    }, function (t, e, n) {
                        if (t) return void i(t);
                        i(null, n)
                    })
                }
            },
            ku = function (t) {
                var e = t.video,
                    n = t.initData,
                    r = t.options,
                    i = t.eventBus,
                    o = r.keySystems["com.apple.fps.1_0"],
                    s = o.getCertificate || Tu(o.certificateUri),
                    a = o.getContentId || Cu,
                    l = o.getLicense || Eu(o.licenseUri);
                return new Promise(function (t, e) {
                    s(r, function (n, r) {
                        if (n) return void e(n);
                        t(r)
                    })
                }).then(function (t) {
                    return bu({
                        video: e,
                        cert: t,
                        initData: n,
                        getLicense: l,
                        options: r,
                        contentId: a(r, n),
                        eventBus: i
                    })
                })["catch"](function (t) {
                    i.player_.error({
                        code: 3,
                        message: t
                    })
                })
            },
            wu = function (t, e, n, r) {
                var i = t.keySystems["com.microsoft.playready"];
                if ("function" == typeof i.getKey) return void i.getKey(t, n.destinationURL, n.message.buffer, function (t, n) {
                    if (t) return void ie.log.error("Unable to get key: " + t);
                    e.update(n)
                });
                "string" == typeof i && (i = {
                    url: i
                });
                var o = i.url || n.destinationURL;
                iu(o, n.message.buffer, function (t, n) {
                    if (r && r.trigger("licenserequestattempted"), t) return void ie.log.error("Unable to request key from url: " + o);
                    e.update(new Uint8Array(n.body))
                })
            },
            Su = function (t, e, n, r) {
                var i = t.msKeys.createSession("video/mp4", e);
                if (!i) return void ie.log.error("Could not create key session.");
                i.addEventListener("mskeymessage", function (t) {
                    wu(n, i, t, r)
                }),
                    i.addEventListener("mskeyerror", function (t) {
                        ie.log.error("Unexpected key error from key session with code: " + i.error.code + " and systemCode: " + i.error.systemCode)
                    })
            },
            Pu = function (t) {
                var e = t.video,
                    n = t.initData,
                    r = t.options,
                    i = t.eventBus;
                e.msKeys && delete e.msKeys;
                try {
                    e.msSetMediaKeys(new Ke.MSMediaKeys("com.microsoft.playready"))
                } catch (o) {
                    return void ie.log.error("Unable to create media keys for PlayReady key system. Error: " + o.message)
                }
                Su(e, n, r, i)
            },
            xu = ie.getPlugin("plugin"),
            Iu = function (t, e) {
                for (var n = 0; n < t.length; n++) if (t[n].initData) {
                    var r = mu(t[n].initData),
                        i = mu(e);
                    if (vu(r, i)) return !0
                }
                return !1
            },
            Mu = function (t, e) {
                for (var n = 0; n < t.length; n++) if (t[n].initData === e) return void t.splice(n, 1)
            },
            Du = function (t, e, n, r) {
                if (!e || !e.keySystems) return Promise.resolve();
                var i = t.initData;
                return ou(e.keySystems).then(function (o) {
                    var s = o.keySystem;
                    if (e.keySystems[s] && e.keySystems[s].pssh && (i = e.keySystems[s].pssh), !Iu(n, i) && i) return n.push({
                        initData: i
                    }),
                        du({
                            video: t.target,
                            initDataType: t.initDataType,
                            initData: i,
                            options: e,
                            removeSession: Mu.bind(null, n),
                            eventBus: r
                        })
                })
            },
            Au = function (t, e, n) {
                if (e.keySystems && e.keySystems["com.apple.fps.1_0"] && t.initData) return ku({
                    video: t.target,
                    initData: t.initData,
                    options: e,
                    eventBus: n
                })
            },
            Ru = function (t, e, n, r) {
                if (e.keySystems && e.keySystems["com.microsoft.playready"] && !n.reduce(function (t, e) {
                    return t || e.playready
                }, !1)) {
                    var i = t.initData;
                    e.keySystems["com.microsoft.playready"] && e.keySystems["com.microsoft.playready"].pssh && (i = e.keySystems["com.microsoft.playready"].pssh),
                    i && (n.push({
                        playready: !0,
                        initData: i
                    }), Pu({
                        video: t.target,
                        initData: i,
                        options: e,
                        eventBus: r
                    }))
                }
            },
            ju = function (t) {
                return ie.mergeOptions(t.currentSource(), t.eme.options)
            },
            Ou = function (t) {
                var e = t.src();
                e !== t.eme.activeSrc && (t.eme.activeSrc = e, t.eme.sessions = [])
            },
            Lu = function (t) {
                "video" === t.$(".vjs-tech").tagName.toLowerCase() && t.tech_ && (Ou(t), t.tech_.el_.addEventListener("encrypted", function (e) {
                    if (t.currentSource().keySystems && t.currentSource().keySystems["com.widevine.alpha"] && "application/dash+xml" === t.currentSource().type) return !1;
                    Ou(t),
                        Du(e, ju(t), t.eme.sessions, t.tech_)
                }), t.tech_.el_.addEventListener("webkitneedkey", function (e) {
                    Ou(t),
                        Au(e, ju(t), t.tech_)
                }), ie.browser.IS_EDGE || t.tech_.el_.addEventListener("msneedkey", function (e) {
                    Ou(t),
                        Ru(e, ju(t), t.eme.sessions, t.tech_)
                }))
            },
            Nu = function (t) {
                function e(n, r) {
                    qn(this, e);
                    var i = Kn(this, t.call(this, n));
                    return i.options = r,
                        n.ready(function () {
                            return Lu(n)
                        }),
                        n.eme = {
                            initializeMediaKeys: function () {
                                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                                    e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {},
                                    i = ie.mergeOptions(n.currentSource(), r, t),
                                    o = {
                                        initDataType: "cenc",
                                        initData: null,
                                        target: n.tech_.el_
                                    };
                                Ou(n),
                                    n.tech_.el_.setMediaKeys ? Du(o, i, n.eme.sessions, n.tech_).then(function () {
                                        return e()
                                    })["catch"](function (t) {
                                        return e(t)
                                    }) : n.tech_.el_.msSetMediaKeys && (Ru(o, i, n.eme.sessions, n.tech_), e())
                            },
                            options: r
                        },
                        i
                }
                return Wn(e, t),
                    e.prototype.setOptions = function (t) {
                        this.options = t,
                            this.player.options_.plugins.DRM = t
                    },
                    e
            }(xu);
        (ie.registerPlugin || ie.plugin)("DRM", Nu);
        var Bu = {
                enableRecoverMediaError: !0,
                recoverMediaErrorMaxRetry: 5,
                fragLoadingMaxRetry: 3
            },
            Fu = function () {
                function e(n, r, i) {
                    qn(this, e);
                    var o = new t(ie.mergeOptions(Bu, i.hlsConfig)),
                        s = r.el();
                    this.Hls = t,
                        this.tech = r,
                        this.hls = o,
                        this.switchStatus = "",
                        this.manifests = [],
                        this.hlsjsErrorHandler = this.errorHandlerFactory(),
                        o.on(t.Events.ERROR, this.onError.bind(this)),
                        o.on(t.Events.MANIFEST_PARSED, ie.bind(this, this.onMetaData)),
                        o.on(t.Events.LEVEL_LOADED, this.onLevelLoaded.bind(this));
                    for (var a in t.Events) o.on(t.Events[a], ie.bind(this, this.onEvent));
                    o.attachMedia(s),
                        o.loadSource(n.src)
                }
                return e.prototype.switchQuality = function (t) {
                    t.id != this.hls.currentLevel && (this.switchStatus = "switching", this.switchData = t, this.tech.trigger({
                        type: "hlsresolutionswitching",
                        data: this.switchData
                    }), this.hls.nextLevel = t.id)
                },
                    e.prototype.dispose = function () {
                        this.hls.destroy()
                    },
                    e.prototype.onEvent = function (e, n) {
                        switch (this.tech.trigger({
                            type: e,
                            data: n
                        }), e) {
                            case t.Events.MANIFEST_LOADED:
                                this.manifests.push(n.networkDetails.response || n.networkDetails.responseText);
                                break;
                            case t.Events.LEVEL_SWITCHING:
                                break;
                            case t.Events.LEVEL_SWITCHED:
                                "switching" == this.switchStatus && (this.switchStatus = "switched", this.tech.trigger({
                                    type: "hlsresolutionswitched",
                                    data: this.switchData
                                }), this.switchData = null);
                                break;
                            case t.Events.LEVEL_SWITCH_ERROR:
                        }
                    },
                    e.prototype.onMetaData = function (t, e) {
                        var n = [],
                            r = this.hls,
                            i = this;
                        if (e.levels.length > 1) {
                            var o = {
                                id: -1,
                                label: "auto",
                                selected: -1 === r.manualLevel
                            };
                            n.push(o),
                                e.levels.forEach(function (t, e) {
                                    var o = {};
                                    o.id = e,
                                        o.selected = e === r.manualLevel,
                                        o.label = i.getLevelLabel(t),
                                        n.push(o)
                                });
                            var s = {
                                qualityData: {
                                    video: n
                                },
                                callbacks: {
                                    video: ie.bind(this, this.switchQuality)
                                }
                            };
                            this.tech.setTimeout(function () {
                                this.trigger({
                                    type: "masterplaylistchange",
                                    data: s
                                })
                            }, 1)
                        }
                    },
                    e.prototype.getLevelLabel = function (t) {
                        return t.height ? t.height + "p" : t.width ? Math.round(9 * t.width / 16) + "p" : t.bitrate ? t.bitrate / 1e3 + "kbps" : 0
                    },
                    e.prototype.onLevelLoaded = function (t, e) {
                        this._duration = e.details.live ? Infinity : e.details.totalduration
                    },
                    e.prototype.onError = function (e, n) {
                        var r = this.tech.player();
                        if (n.fatal) switch (n.type) {
                            case t.ErrorTypes.NETWORK_ERROR:
                                r.error({
                                    code: 14,
                                    source: n
                                });
                                break;
                            case t.ErrorTypes.MEDIA_ERROR:
                                this.hls.config.enableRecoverMediaError ? this.hlsjsErrorHandler(n) : r.error({
                                    code: 15,
                                    source: n
                                });
                                break;
                            case t.ErrorTypes.MUX_ERROR:
                                r.error({
                                    code: 16,
                                    source: n
                                });
                                break;
                            case t.ErrorTypes.OTHER_ERROR:
                            default:
                                r.error({
                                    code: 17,
                                    source: n
                                })
                        } else switch (n.details) {
                            case t.ErrorDetails.KEY_LOAD_ERROR:
                        }
                    },
                    e.prototype.errorHandlerFactory = function () {
                        var t = this.hls,
                            e = this.tech.player(),
                            n = null,
                            r = null,
                            i = 0;
                        return function (o) {
                            var s = Date.now();
                            i == t.config.recoverMediaErrorMaxRetry ? e.error({
                                code: 15,
                                source: o
                            }) : (!n || s - n > 2e3 ? (n = s, t.recoverMediaError()) : (!r || s - r > 2e3) && (r = s, t.swapAudioCodec(), t.recoverMediaError()), i++)
                        }
                    },
                    e.prototype.duration = function () {
                        return this._duration
                    },
                    e
            }(),
            Hu = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i,
            Vu = /\.m3u8/i,
            Uu = {
                name: "hlsSourceHandler",
                canHandleSource: function (t) {
                    return t.skipHlsJs || t.keySystems && t.keySystems["com.apple.fps.1_0"] ? "" : Hu.test(t.type) ? "probably" : Vu.test(t.src) ? "maybe" : ""
                },
                handleSource: function (t, e, n) {
                    return e.hlsProvider ? (e.hlsProvider.dispose(), e.hlsProvider = null) : n.hlsConfig && !1 === n.hlsConfig.autoStartLoad && e.on("play", function () {
                        this.player().hasStarted() || this.hlsProvider.hls.startLoad()
                    }),
                        e.hlsProvider = new Fu(t, e, n),
                        e.hlsProvider
                },
                canPlayType: function (t) {
                    return Hu.test(t) ? "probably" : ""
                }
            };
        Ue.mountHlsProvider = je,
            je();
        var zu = {},
            qu = function () {
                function t(n, r, i) {
                    var o = this;
                    qn(this, t);
                    var s = new e.createPlayer({
                        isLive: !1,
                        url: n.src,
                        type: "flv"
                    }, ie.mergeOptions(zu, i));
                    s.on(e.Events.ERROR, ie.bind(this, this.onError));
                    for (var a in e.Events)!
                        function (t) {
                            s.on(e.Events[t], ie.bind(o, function (e) {
                                this.onEvent(e, t)
                            }))
                        }(a);
                    this.flv = s,
                        s.attachMediaElement(r.el()),
                        s.load()
                }
                return t.prototype.onError = function (t) {},
                    t.prototype.onEvent = function (t, e) {},
                    t.prototype.dispose = function () {
                        this.flv.destroy()
                    },
                    t
            }(),
            Wu = /^video\/flv$/i,
            Ku = /\.flv/i,
            Xu = /^((ws:\/\/)|(http:\/\/))/i,
            Qu = {
                name: "flvSourceHandler",
                canHandleSource: function (t) {
                    return Wu.test(t.type) ? "probably" : Ku.test(t.src) || Xu.test(t.src) ? "maybe" : ""
                },
                handleSource: function (t, e, n) {
                    return e.flvProvider && e.flvProvider.dispose(),
                        e.flvProvider = new qu(t, e, n),
                        e.flvProvider
                },
                canPlayType: function (t) {
                    if (Wu.test(t)) return "probably"
                }
            };
        if (e && e.isSupported()) try {
            var Gu = ie.getTech && ie.getTech("Html5");
            Gu && Gu.registerSourceHandler(Qu, 0)
        } catch (vh) {}
        var $u = function () {
            function t(e, r, i) {
                var o = this;
                if (qn(this, t), i = i || r.options_, this.player = ie(i.playerId), this.player.dash = this.player.dash || {}, this.tech_ = r, this.el_ = r.el(), this.elParent_ = this.el_.parentNode, this.hasFiniteDuration_ = !1, e.src) {
                    r.isReady_ = !1,
                    t.updateSourceData && (ie.log.warn('updateSourceData has been deprecated. Please switch to using hook("updatesource", callback).'), e = t.updateSourceData(e)),
                        t.hooks("updatesource").forEach(function (t) {
                            e = t(e)
                        });
                    var s = e.src;
                    this.keySystemOptions_ = t.buildDashJSProtData(e.keySystemOptions || e.keySystems),
                        this.player.dash.mediaPlayer = n.MediaPlayer().create(),
                        this.mediaPlayer_ = this.player.dash.mediaPlayer,
                    t.useVideoJSDebug && (ie.log.warn('useVideoJSDebug has been deprecated. Please switch to using hook("beforeinitialize", callback).'), t.useVideoJSDebug(this.mediaPlayer_)),
                    t.beforeInitialize && (ie.log.warn('beforeInitialize has been deprecated. Please switch to using hook("beforeinitialize", callback).'), t.beforeInitialize(this.player, this.mediaPlayer_)),
                        t.hooks("beforeinitialize").forEach(function (t) {
                            t(o.player, o.mediaPlayer_)
                        }),
                        this.mediaPlayer_.initialize(),
                        this.retriggerError_ = function (t) {
                            if ("capability" === t.error && "mediasource" === t.event) o.player.error({
                                code: 4,
                                message: "The media cannot be played because it requires a feature that your browser does not support."
                            });
                            else if ("manifestError" !== t.error || "createParser" !== t.event.id && "codec" !== t.event.id && "nostreams" !== t.event.id && "nostreamscomposed" !== t.event.id && "parse" !== t.event.id && "multiplexedrep" !== t.event.id) if ("mediasource" === t.error) t.event.match("MEDIA_ERR_ABORTED") ? o.player.error({
                                code: 1,
                                message: t.event
                            }) : t.event.match("MEDIA_ERR_NETWORK") ? o.player.error({
                                code: 2,
                                message: t.event
                            }) : t.event.match("MEDIA_ERR_DECODE") ? o.player.error({
                                code: 3,
                                message: t.event
                            }) : t.event.match("MEDIA_ERR_SRC_NOT_SUPPORTED") ? o.player.error({
                                code: 4,
                                message: t.event
                            }) : t.event.match("MEDIA_ERR_ENCRYPTED") ? o.player.error({
                                code: 5,
                                message: t.event
                            }) : (t.event.match("UNKNOWN"), o.player.error({
                                code: 4,
                                message: t.event
                            }));
                            else if ("capability" === t.error && "encryptedmedia" === t.event) o.player.error({
                                code: 5,
                                message: "The media cannot be played because it requires encryption features that your browser does not support."
                            });
                            else if ("key_session" === t.error) o.player.error({
                                code: 5,
                                message: t.event
                            });
                            else if ("download" === t.error) o.player.error({
                                code: 2,
                                message: "The media playback was aborted because too many consecutive download errors occurred."
                            });
                            else {
                                if ("mssError" !== t.error) return;
                                o.player.error({
                                    code: 3,
                                    message: t.event
                                })
                            } else o.player.error({
                                code: 4,
                                message: t.event.message
                            });
                            setTimeout(function () {
                                o.mediaPlayer_.reset()
                            }, 10)
                        },
                        this.mediaPlayer_.on(n.MediaPlayer.events.ERROR, this.retriggerError_),
                        this.getDuration_ = function (t) {
                            var e = t.data.Period_asArray,
                                n = o.hasFiniteDuration_;
                            t.data.mediaPresentationDuration || e[e.length - 1].duration ? o.hasFiniteDuration_ = !0 : o.hasFiniteDuration_ = !1,
                            o.hasFiniteDuration_ !== n && o.player.trigger("durationchange")
                        },
                        this.mediaPlayer_.on(n.MediaPlayer.events.MANIFEST_LOADED, this.getDuration_),
                        this.mediaPlayer_.on(n.MediaPlayer.events.STREAM_INITIALIZED, ie.bind(this, this.onMetaData)),
                        this.currentQuality = {
                            video: "",
                            audio: ""
                        },
                        Object.keys(n.MediaPlayer.events).forEach(function (t) {
                            o.mediaPlayer_.on(n.MediaPlayer.events[t], ie.bind(o, o.onEvent))
                        }),
                    i.dashConfig && Object.keys(i.dashConfig).forEach(function (t) {
                        var e, n = "set" + t.charAt(0).toUpperCase() + t.slice(1),
                            r = i.dashConfig[t];
                        if (o.mediaPlayer_.hasOwnProperty(n) && (ie.log.warn("Using dash options in videojs-contrib-dash without the set prefix has been deprecated. Change '" + t + "' to '" + n + "'"), t = n), !o.mediaPlayer_.hasOwnProperty(t)) return void ie.log.warn("Warning: dash configuration option unrecognized: " + t);
                        Array.isArray(r) || (r = [r]),
                            (e = o.mediaPlayer_)[t].apply(e, r)
                    }),
                        this.mediaPlayer_.attachView(this.el_),
                        this.mediaPlayer_.setAutoPlay(!1),
                        Le.call(null, this.player, r),
                        Fe.call(null, this.player, r, i),
                        this.mediaPlayer_.setProtectionData(this.keySystemOptions_),
                        this.mediaPlayer_.attachSource(s),
                        this.tech_.triggerReady()
                }
            }
            return t.buildDashJSProtData = function (t) {
                var e = {};
                if (!t) return null;
                if (Array.isArray(t)) for (var n = 0; n < t.length; n++) {
                    var r = t[n],
                        i = ie.mergeOptions({}, r.options);
                    i.licenseUrl && (i.serverURL = i.licenseUrl, delete i.licenseUrl),
                        e[r.name] = i
                } else e = t;
                return e
            },
                t.prototype.dispose = function () {
                    var t = this;
                    this.mediaPlayer_ && (this.mediaPlayer_.off(n.MediaPlayer.events.ERROR, this.retriggerError_), this.mediaPlayer_.off(n.MediaPlayer.events.MANIFEST_LOADED, this.getDuration_), Object.keys(n.MediaPlayer.events).forEach(function (e) {
                        t.mediaPlayer_.off(n.MediaPlayer.events[e], ie.bind(t, t.onEvent))
                    }), this.mediaPlayer_.reset()),
                    this.player.dash && delete this.player.dash
                },
                t.prototype.duration = function () {
                    return this.mediaPlayer_.isDynamic() && !this.hasFiniteDuration_ ? Infinity : this.mediaPlayer_.duration()
                },
                t.hooks = function (e, n) {
                    return t.hooks_[e] = t.hooks_[e] || [],
                    n && (t.hooks_[e] = t.hooks_[e].concat(n)),
                        t.hooks_[e]
                },
                t.hook = function (e, n) {
                    t.hooks(e, n)
                },
                t.removeHook = function (e, n) {
                    var r = t.hooks(e).indexOf(n);
                    return -1 !== r && (t.hooks_[e] = t.hooks_[e].slice(), t.hooks_[e].splice(r, 1), !0)
                },
                t.prototype.onMetaData = function (t) {
                    var e = this,
                        n = this.mediaPlayer_,
                        r = n.getBitrateInfoListFor("video"),
                        i = [];
                    if (r.length > 0) {
                        i.push({
                            id: -1,
                            label: "auto",
                            selected: n.getAutoSwitchQualityFor("video")
                        }),
                            r.forEach(function (t, r) {
                                i.push({
                                    id: r,
                                    label: e.getLevelLabel(t),
                                    selected: !n.getAutoSwitchQualityFor("video") && e.currentQuality.video === r
                                })
                            });
                        var o = {
                            qualityData: {
                                video: i
                            },
                            callbacks: {
                                video: ie.bind(this, this.switchQuality)
                            }
                        };
                        this.tech_.setTimeout(function () {
                            this.trigger({
                                type: "masterplaylistchange",
                                data: o
                            })
                        }, 1)
                    }
                },
                t.prototype.switchQuality = function (t) {
                    var e = this.mediaPlayer_; - 1 === t.id ? e.setAutoSwitchQualityFor(t.trackType, !0) : t.id != this.currentQuality[t.trackType] && (e.setAutoSwitchQualityFor(t.trackType, !1), e.setQualityFor(t.trackType, t.id))
                },
                t.prototype.getLevelLabel = function (t) {
                    return t.height ? t.height + "p" : t.width ? Math.round(9 * t.width / 16) + "p" : t.bitrate ? t.bitrate / 1e3 + "kbps" : 0
                },
                t.prototype.onEvent = function (t) {
                    switch (this.tech_.trigger({
                        type: "dash_" + t.type,
                        data: t
                    }), t.type) {
                        case n.MediaPlayer.events.QUALITY_CHANGE_REQUESTED:
                            this.tech_.trigger({
                                type: "dashqualityswitching",
                                data: t
                            });
                            break;
                        case n.MediaPlayer.events.QUALITY_CHANGE_RENDERED:
                            this.tech_.trigger({
                                type: "dashqualityswitched",
                                data: t
                            }),
                                this.currentQuality[t.mediaType] = t.newQuality
                    }
                },
                t
        }();
        $u.hooks_ = {};
        var Yu = function (t) {
            t = JSON.parse(JSON.stringify(t)),
            $u.updateSourceData && (ie.log.warn('updateSourceData has been deprecated. Please switch to using hook("updatesource", callback).'), t = $u.updateSourceData(t)),
                $u.hooks("updatesource").forEach(function (e) {
                    t = e(t)
                });
            var e = Ye.createElement("video");
            return !(t.keySystemOptions && !Ke.navigator.requestMediaKeySystemAccess && !e.msSetMediaKeys)
        };
        ie.DashSourceHandler = function () {
            return {
                name: "dashSourceHandler",
                canHandleSource: function (t) {
                    var e = /\.mpd/i;
                    return Yu(t) ? ie.DashSourceHandler.canPlayType(t.type) ? "probably" : e.test(t.src) ? "maybe" : "" : ""
                },
                handleSource: function (t, e, n) {
                    return new $u(t, e, n)
                },
                canPlayType: function (t) {
                    return ie.DashSourceHandler.canPlayType(t)
                }
            }
        },
            ie.DashSourceHandler.canPlayType = function (t) {
                return /^application\/dash\+xml/i.test(t) ? "probably" : ""
            },
            Ue.mountDashProvider = He,
            He(),
            ie.Html5DashJS = $u;
        for (var Ju = ie.getComponent("Tech"), Zu = ie.dom, th = ie.url, eh = ie.createTimeRange, nh = ie.mergeOptions, rh = Ke && Ke.navigator || {}, ih = function (t) {
            function e(n, r, i) {
                qn(this, e);
                var o = Kn(this, t.call(this, n, r, i));
                return r.source && o.ready(function () {
                    this.setSource(r.source)
                }, !0),
                r.startTime && o.ready(function () {
                    this.load(),
                        this.play(),
                        this.currentTime(r.startTime)
                }, !0),
                    Ke.videojs = Ke.videojs || {},
                    Ke.videojs.Flash = Ke.videojs.Flash || {},
                    Ke.videojs.Flash.onReady = e.onReady,
                    Ke.videojs.Flash.onEvent = e.onEvent,
                    Ke.videojs.Flash.onError = e.onError,
                    o.on("seeked", function () {
                        this.lastSeekTarget_ = undefined
                    }),
                    o
            }
            return Wn(e, t),
                e.prototype.createEl = function () {
                    var t = this.options_;
                    t.swf || (t.swf = ve("//imgcache.qq.com/open/qcloud/video/tcplayer/player.swf"));
                    var n = t.techId,
                        r = nh({
                            readyFunction: "videojs.Flash.onReady",
                            eventProxyFunction: "videojs.Flash.onEvent",
                            errorEventProxyFunction: "videojs.Flash.onError",
                            autoplay: t.autoplay,
                            preload: t.preload,
                            loop: t.loop,
                            muted: t.muted
                        }, t.flashVars),
                        i = nh({
                            wmode: "opaque",
                            bgcolor: "#000000"
                        }, t.params),
                        o = nh({
                            id: n,
                            name: n,
                            "class": "vjs-tech"
                        }, t.attributes);
                    return this.el_ = e.embed(t.swf, r, i, o),
                        this.el_.tech = this,
                        this.el_
                },
                e.prototype.play = function () {
                    this.ended() && this.setCurrentTime(0),
                        this.el_.vjs_play()
                },
                e.prototype.pause = function () {
                    this.el_.vjs_pause()
                },
                e.prototype.src = function (t) {
                    return t === undefined ? this.currentSrc() : this.setSrc(t)
                },
                e.prototype.setSrc = function (t) {
                    var e = this;
                    t = th.getAbsoluteURL(t),
                        this.el_.vjs_src(t),
                    this.autoplay() && this.setTimeout(function () {
                        return e.play()
                    }, 0)
                },
                e.prototype.seeking = function () {
                    return this.lastSeekTarget_ !== undefined
                },
                e.prototype.setCurrentTime = function (e) {
                    var n = this.seekable();
                    n.length && (e = e > n.start(0) ? e : n.start(0), e = e < n.end(n.length - 1) ? e : n.end(n.length - 1), this.lastSeekTarget_ = e, this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", e), t.prototype.setCurrentTime.call(this))
                },
                e.prototype.currentTime = function () {
                    return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
                },
                e.prototype.currentSrc = function () {
                    return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc")
                },
                e.prototype.duration = function () {
                    if (0 === this.readyState()) return NaN;
                    var t = this.el_.vjs_getProperty("duration");
                    return t >= 0 ? t : Infinity
                },
                e.prototype.load = function () {
                    this.el_.vjs_load()
                },
                e.prototype.poster = function () {
                    this.el_.vjs_getProperty("poster")
                },
                e.prototype.setPoster = function () {},
                e.prototype.seekable = function () {
                    var t = this.duration();
                    return 0 === t ? eh() : eh(0, t)
                },
                e.prototype.buffered = function () {
                    var t = this.el_.vjs_getProperty("buffered");
                    return 0 === t.length ? eh() : eh(t[0][0], t[0][1])
                },
                e.prototype.supportsFullScreen = function () {
                    return !1
                },
                e.prototype.enterFullScreen = function () {
                    return !1
                },
                e.prototype.getVideoPlaybackQuality = function () {
                    var t = this.el_.vjs_getProperty("getVideoPlaybackQuality");
                    return Ke.performance && "function" == typeof Ke.performance.now ? t.creationTime = Ke.performance.now() : Ke.performance && Ke.performance.timing && "number" == typeof Ke.performance.timing.navigationStart && (t.creationTime = Ke.Date.now() - Ke.performance.timing.navigationStart),
                        t
                },
                e
        }(Ju), oh = ["rtmpConnection", "rtmpStream", "preload", "defaultPlaybackRate", "playbackRate", "autoplay", "loop", "controls", "volume", "muted", "defaultMuted"], sh = ["networkState", "readyState", "initialTime", "startOffsetTime", "paused", "ended", "videoWidth", "videoHeight"], ah = ih.prototype, lh = 0; lh < oh.length; lh++) Ve(oh[lh]),


            function (t) {
                var e = t.charAt(0).toUpperCase() + t.slice(1);
                ah["set" + e] = function (e) {
                    return this.el_.vjs_setProperty(t, e)
                }
            }(oh[lh]);
        for (var ch = 0; ch < sh.length; ch++) Ve(sh[ch]);
        ih.isSupported = function () {
            return ih.version()[0] >= 10
        },
            Ju.withSourceHandlers(ih),
            ih.nativeSourceHandler = {},
            ih.nativeSourceHandler.canPlayType = function (t) {
                return t in ih.formats ? "maybe" : ""
            },
            ih.nativeSourceHandler.canHandleSource = function (t, e) {
                var n = void 0;
                return n = t.type ? t.type.replace(/;.*/, "").toLowerCase() : function (t) {
                    var e = th.getFileExtension(t);
                    return e ? "video/" + e : ""
                }(t.src),
                    ih.nativeSourceHandler.canPlayType(n)
            },
            ih.nativeSourceHandler.handleSource = function (t, e, n) {
                e.setSrc(t.src)
            },
            ih.nativeSourceHandler.dispose = function () {},
            ih.registerSourceHandler(ih.nativeSourceHandler),
            ih.formats = {
                "video/flv": "FLV",
                "video/x-flv": "FLV",
                "video/mp4": "MP4",
                "video/m4v": "MP4"
            },
            ih.onReady = function (t) {
                var e = Zu.$("#" + t),
                    n = e && e.tech;
                n && n.el() && ih.checkReady(n)
            },
            ih.checkReady = function (t) {
                t.el() && (t.el().vjs_getProperty ? t.triggerReady() : this.setTimeout(function () {
                    ih.checkReady(t)
                }, 50))
            },
            ih.onEvent = function (t, e) {
                var n = Zu.$("#" + t).tech,
                    r = Array.prototype.slice.call(arguments, 2);
                n.setTimeout(function () {
                    n.trigger(e, r)
                }, 1)
            },
            ih.onError = function (t, e) {
                var n = Zu.$("#" + t).tech;
                if ("srcnotfound" === e) return n.error(4);
                n.error("FLASH: " + e)
            },
            ih.version = function () {
                var t = "0,0,0";
                try {
                    t = new Ke.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                } catch (e) {
                    try {
                        rh.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (rh.plugins["Shockwave Flash 2.0"] || rh.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                    } catch (e) {}
                }
                return t.split(",")
            },
            ih.embed = function (t, e, n, r) {
                var i = ih.getEmbedCode(t, e, n, r);
                return Zu.createEl("div", {
                    innerHTML: i
                }).childNodes[0]
            },
            ih.getEmbedCode = function (t, e, n, r) {
                var i = "",
                    o = "",
                    s = "";
                return e && Object.getOwnPropertyNames(e).forEach(function (t) {
                    i += t + "=" + e[t] + "&amp;"
                }),
                    n = nh({
                        movie: t,
                        flashvars: i,
                        allowScriptAccess: "always",
                        allowNetworking: "all"
                    }, n),
                    Object.getOwnPropertyNames(n).forEach(function (t) {
                        o += '<param name="' + t + '" value="' + n[t] + '" />'
                    }),
                    r = nh({
                        data: t,
                        width: "100%",
                        height: "100%"
                    }, r),
                    Object.getOwnPropertyNames(r).forEach(function (t) {
                        s += t + '="' + r[t] + '" '
                    }),
                '<object type="application/x-shockwave-flash" ' + s + ">" + o + "</object>"
            },


            function (t) {
                t.streamingFormats = {
                    "rtmp/mp4": "MP4",
                    "rtmp/flv": "FLV"
                },
                    t.streamFromParts = function (t, e) {
                        return t + "&" + e
                    },
                    t.streamToParts = function (t) {
                        var e = {
                            connection: "",
                            stream: ""
                        };
                        if (!t) return e;
                        var n = t.search(/&(?!\w+=)/),
                            r = void 0;
                        return -1 !== n ? r = n + 1 : 0 === (n = r = t.lastIndexOf("/") + 1) && (n = r = t.length),
                            e.connection = t.substring(0, n),
                            e.stream = t.substring(r, t.length),
                            e
                    },
                    t.isStreamingType = function (e) {
                        return e in t.streamingFormats
                    },
                    t.RTMP_RE = /^rtmp[set]?:\/\//i,
                    t.isStreamingSrc = function (e) {
                        return t.RTMP_RE.test(e)
                    },
                    t.rtmpSourceHandler = {},
                    t.rtmpSourceHandler.canPlayType = function (e) {
                        return t.isStreamingType(e) ? "maybe" : ""
                    },
                    t.rtmpSourceHandler.canHandleSource = function (e, n) {
                        var r = t.rtmpSourceHandler.canPlayType(e.type);
                        return r || (t.isStreamingSrc(e.src) ? "maybe" : "")
                    },
                    t.rtmpSourceHandler.handleSource = function (e, n, r) {
                        var i = t.streamToParts(e.src);
                        n.setRtmpConnection(i.connection),
                            n.setRtmpStream(i.stream)
                    },
                    t.registerSourceHandler(t.rtmpSourceHandler)
            }(ih),
            Ju.getTech("Flash") ? (ie.log.warn("Not using videojs-flash as it appears to already be registered"), ie.log.warn("videojs-flash should only be used with video.js@6 and above")) : ie.registerTech("Flash", ih);
        var uh = {},
            hh = /^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i;
        uh.canPlayType = function (t) {
            return hh.test(t) ? "maybe" : ""
        },
            uh.canHandleSource = function (t, e) {
                return "maybe" === uh.canPlayType(t.type)
            },
            uh.handleSource = function (t, e, n) {
                e.setSrc(t.src)
            },
            uh.dispose = function () {},
            ie.getTech("Flash").registerSourceHandler(uh, 0),
            uh.VERSION = "__VERSION__";
        var ph = {
                Play: "播放",
                Pause: "暂停",
                LIVE: "直播",
                Loaded: "加载完毕",
                Progress: "进度",
                Fullscreen: "全屏",
                Mute: "静音",
                Unmute: "取消静音",
                Subtitles: "字幕",
                Captions: "内嵌字幕",
                Chapters: "节目段落",
                Descriptions: "描述",
                Close: "关闭",
                Replay: "重播",
                Text: "文字",
                White: "白",
                Black: "黑",
                Red: "红",
                Green: "绿",
                Blue: "蓝",
                Yellow: "黄",
                Magenta: "紫红",
                Cyan: "青",
                Background: "背景",
                Window: "视窗",
                Transparent: "透明",
                Opaque: "不透明",
                None: "无",
                Raised: "浮雕",
                Depressed: "压低",
                Uniform: "均匀",
                Dropshadow: "下阴影",
                Casual: "舒适",
                Script: "手写体",
                Reset: "重启",
                Done: "完成",
                auto: "自动",
                Mirror: "镜像",
                "Current Time": "当前时间",
                "Duration Time": "时长",
                "Remaining Time": "剩余时间",
                "Stream Type": "媒体流类型",
                "Non-Fullscreen": "退出全屏",
                "Playback Rate": "播放速度",
                "subtitles off": "关闭字幕",
                "captions off": "关闭内嵌字幕",
                "Close Modal Dialog": "关闭弹窗",
                "descriptions off": "关闭描述",
                "Audio Track": "音轨",
                "You aborted the media playback": "视频播放被终止",
                "A network error caused the media download to fail part-way.": "网络错误导致视频下载中途失败。",
                "The media could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
                "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
                "No compatible source was found for this media.": "无法找到此视频兼容的源或者当前环境无法播放该视频。",
                "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。",
                "Play Video": "播放视频",
                "Modal Window": "弹窗",
                "This is a modal window": "这是一个弹窗",
                "This modal can be closed by pressing the Escape key or activating the close button.": "可以按ESC按键或启用关闭按钮来关闭此弹窗。",
                ", opens captions settings dialog": ", 开启标题设置弹窗",
                ", opens subtitles settings dialog": ", 开启字幕设置弹窗",
                ", opens descriptions settings dialog": ", 开启描述设置弹窗",
                ", selected": ", 选择",
                "captions settings": "字幕设定",
                "Audio Player": "音频播放器",
                "Video Player": "视频播放器",
                "Progress Bar": "进度小节",
                "Volume Level": "音量",
                "subtitles settings": "字幕设定",
                "descriptions settings": "描述设定",
                "Semi-Transparent": "半透明",
                "Font Size": "字体尺寸",
                "Text Edge Style": "字体边缘样式",
                "Font Family": "字体库",
                "Proportional Sans-Serif": "比例无细体",
                "Monospace Sans-Serif": "单间隔无细体",
                "Proportional Serif": "比例细体",
                "Monospace Serif": "单间隔细体",
                "Small Caps": "小型大写字体",
                "restore all settings to the default values": "恢复全部设定至预设值",
                "Caption Settings Dialog": "字幕设定视窗",
                "Beginning of dialog window. Escape will cancel and close the window.": "开始对话视窗。离开会取消及关闭视窗",
                "End of dialog window.": "结束对话视窗",
                "Request timed out.": "请求超时，请稍后再试。",
                "Could not download the video.": "无法加载视频，请检查网络。",
                "Server is not respond.": "服务器请求失败，请稍后再试。",
                "Server respond error data.": "服务器返回数据有误，请稍后再试。",
                "Last time play at ": "上次看到 ",
                "Resume play": "恢复播放",
                // "Powered by Tencent Cloud.": "腾讯云提供技术支持",
                "Powered by Tencent Cloud.": " ",
                "Rise an internal exception when playing HLS.": "播放 HLS 时出现内部异常。",
                "Authentication failed.": "防盗链参数鉴权失败。",
                "Server failed.": "媒体服务器错误。",
                "Get file error.": "媒体服务器获取文件错误。",
                "File not exist.": "媒体文件不存在。",
                "No video transcoding information found.": "没有找到视频转码信息。",
                "Play Next": "下一个"
            },
            dh = ie.log;
        if (Function.prototype.bind && "object" == ("undefined" == typeof console ? "undefined" : zn(console)) && "object" == zn(console.log)) for (var fh = ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"], yh = 0; yh < fh.length; yh++) {
            var gh = fh[yh];
            console[gh] = Function.prototype.call.bind(console[gh], console)
        }
        return ie.addLanguage("zh-CN", ph),
            Object.keys(ie).forEach(function (t) {
                Ue[t] = ie[t]
            }),
            Ue
    });