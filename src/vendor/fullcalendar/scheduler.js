/*!
FullCalendar s v1.1.0
Docs & License: http://fullcalendar.io/scheduler/
(c) 2015 Adam Shaw
 */
! function(t) {
    module.exports = t
}(function(t, e) {
    var r, o, n, i, s, l, u, h, a, c, p, d, f, g, y, v, m, w, R, S, b, C, E, _, H, T, D, x, I, F, G, W, M, L, k, B, z, P, A, O, V, q, j, N, Y, U, X, $, K, Q, J, Z, tt, et, rt, ot, nt, it, st, lt, ut, ht, at, ct, pt, dt, ft, gt, yt, vt, mt, wt, Rt, St, bt, Ct, Et, _t, Ht, Tt, Dt, xt, It, Ft, Gt, Wt = [].slice,
        Mt = function(t, e) {
            function r() {
                this.constructor = t
            }
            for (var o in e) Lt.call(e, o) && (t[o] = e[o]);
            return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
        },
        Lt = {}.hasOwnProperty;
    return c = t.fullCalendar, c.schedulerVersion = "1.1.0", 1 !== c.internalApiVersion ? void c.warn("v" + c.schedulerVersion + " of FullCalendar Scheduler is incompatible with v" + c.version + " of the core.\nPlease see http://fullcalendar.io/support/ for more information.") : (o = c.Calendar, i = c.Class, N = c.View, p = c.Grid, ft = c.intersectRanges, tt = c.debounce, vt = c.isInt, at = c.getScrollbarWidths, u = c.DragListener, dt = c.htmlEscape, $ = c.computeIntervalUnit, Et = c.proxy, U = c.capitaliseFirstLetter, Y = c.applyAll, h = c.Emitter, nt = c.durationHasTime, ot = c.divideRangeByDuration, rt = c.divideDurationByDuration, Rt = c.multiplyDuration, bt = c.parseFieldSpecs, X = c.compareByFieldSpecs, it = c.flexibleCompare, gt = c.intersectRects, s = c.CoordCache, st = function(e) {
        return e.map(function(e, r) {
            var o, n, i, s;
            for (i = t(r).find("> td"), o = 0, n = i.length; n > o; o++)
                if (s = i[o], s.rowSpan <= 1) return s
        })
    }, Ht = null, St = function(t, e) {
        var r, o;
        if (r = t.css("direction"), o = t[0], null != e) {
            if ("rtl" === r) switch (Ht) {
                case "positive":
                    e = e - o.clientWidth + o.scrollWidth;
                    break;
                case "reverse":
                    e = -e
            }
            return o.scrollLeft = e, t
        }
        if (e = o.scrollLeft, "rtl" === r) switch (Ht) {
            case "positive":
                e = e + o.clientWidth - o.scrollWidth;
                break;
            case "reverse":
                e = -e
        }
        return e
    }, ht = function(t) {
        var e, r, o;
        if (e = t.css("direction"), r = t[0], o = r.scrollLeft, "rtl" === e) switch (Ht) {
            case "negative":
                o = o - r.clientWidth + r.scrollWidth;
                break;
            case "reverse":
                o = -o - r.clientWidth + r.scrollWidth
        }
        return o
    }, et = function() {
        var e, r, o;
        return e = t('<div style=" position: absolute top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 14px; ">A</div>').appendTo("body"), r = e[0], o = r.scrollLeft > 0 ? "positive" : (r.scrollLeft = 1, e.scrollLeft > 0 ? "reverse" : "negative"), e.remove(), o
    }, t(function() {
        return Ht = et()
    }), P = function() {
        function e(e, r) {
            this.overflowX = null != e ? e : "auto", this.overflowY = null != r ? r : "auto", this.el = t('<div class="fc-scrollpane"> <div> <div class="fc-scrollpane-inner"> <div class="fc-content"/> <div class="fc-bg"/> </div> </div> </div>'), this.scrollEl = this.el.children(), this.innerEl = this.scrollEl.children(), this.contentEl = this.innerEl.find(".fc-content"), this.bgEl = this.innerEl.find(".fc-bg"), this.scrollEl.on("scroll", Et(this, "handleScroll")).on("scroll", tt(Et(this, "handleScrollStop"), 100)), this.handlers = {}, this.gutters = {}
        }
        return e.prototype.el = null, e.prototype.innerEl = null, e.prototype.contentEl = null, e.prototype.bgEl = null, e.prototype.overflowX = null, e.prototype.overflowY = null, e.prototype.isScrolling = !1, e.prototype.handlers = null, e.prototype.height = null, e.prototype.contentWidth = null, e.prototype.contentMinWidth = null, e.prototype.gutters = null, e.prototype.update = function() {
            var t, e, r, o, n, i, s;
            return i = this.scrollEl, o = this.overflowX, n = this.overflowY, e = "invisible-scroll" === o, r = "invisible-scroll" === n, i.toggleClass("fc-no-scrollbars", (e || "hidden" === o) && (r || "hidden" === n) && !pt(i)), i.css({
                overflowX: e ? "scroll" : o,
                overflowY: r ? "scroll" : n
            }), t = {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0
            }, (e || r) && (s = at(i), e && (t.marginTop = -s.top, t.marginBottom = -s.bottom), r && (t.marginLeft = -s.left, t.marginRight = -s.right)), i.css(t)
        }, e.prototype.getScrollbarWidths = function() {
            var t;
            return t = at(this.scrollEl), "invisible-scroll" === this.overflowX && (t.top = 0, t.bottom = 0), "invisible-scroll" === this.overflowY && (t.left = 0, t.right = 0), t
        }, e.prototype.handleScroll = function() {
            return this.isScrolling || (this.isScrolling = !0, this.trigger("scrollStart")), this.trigger("scroll", this.scrollEl.scrollTop(), this.scrollEl.scrollLeft())
        }, e.prototype.handleScrollStop = function() {
            return this.isScrolling = !1, this.trigger("scrollStop")
        }, e.prototype.setHeight = function(t) {
            return this.height = t, this.updateCss()
        }, e.prototype.getHeight = function() {
            var t;
            return null != (t = this.height) ? t : this.scrollEl.height()
        }, e.prototype.setContentWidth = function(t) {
            return this.contentWidth = t, this.updateCss()
        }, e.prototype.setContentMinWidth = function(t) {
            return this.contentMinWidth = t, this.updateCss()
        }, e.prototype.setGutters = function(e) {
            return e ? t.extend(this.gutters, e) : this.gutters = {}, this.updateCss()
        }, e.prototype.updateCss = function() {
            var t;
            return this.scrollEl.height(this.height), t = this.gutters, this.innerEl.css({
                width: this.contentWidth ? this.contentWidth + (t.left || 0) + (t.right || 0) : "",
                minWidth: this.contentMinWidth ? this.contentMinWidth + (t.left || 0) + (t.right || 0) : void 0,
                paddingLeft: t.left || "",
                paddingRight: t.right || "",
                paddingTop: t.top || "",
                paddingBottom: t.bottom || ""
            }), this.bgEl.css({
                left: t.left || "",
                right: t.right || "",
                top: t.top || "",
                bottom: t.bottom || ""
            })
        }, e.prototype.append = function(t) {
            return this.contentEl.append(t)
        }, e.prototype.scrollTop = function(t) {
            return this.scrollEl.scrollTop(t)
        }, e.prototype.scrollLeft = function(t) {
            return this.scrollEl.scrollLeft(t)
        }, e.prototype.on = function(t, e) {
            var r;
            return ((r = this.handlers)[t] || (r[t] = [])).push(e), this
        }, e.prototype.trigger = function() {
            var t, e, r, o, n, i;
            for (r = arguments[0], t = 2 <= arguments.length ? Wt.call(arguments, 1) : [], i = this.handlers[r] || [], o = 0, n = i.length; n > o; o++) e = i[o], e.apply(this, t)
        }, e
    }(), pt = function(t) {
        var e;
        return e = at(t), e.left || e.right || e.top || e.bottom
    }, z = function() {
        function t(t, e) {
            var r, o, n, i;
            for (this.axis = t, this.scrollers = e, n = this.scrollers, r = 0, o = n.length; o > r; r++) i = n[r], this.initScroller(i)
        }
        return t.prototype.axis = null, t.prototype.scrollers = null, t.prototype.masterScroller = null, t.prototype.enabled = !0, t.prototype.enable = function() {
            return this.enabled = !0
        }, t.prototype.disable = function() {
            return this.enabled = !1
        }, t.prototype.initScroller = function(t) {
            return t.on("scrollStart", function(e) {
                return function() {
                    e.masterScroller || (e.masterScroller = t)
                }
            }(this)).on("scroll", function(e) {
                return function(r, o) {
                    var n, i, s, l;
                    if (t === e.masterScroller)
                        for (l = e.scrollers, n = 0, i = l.length; i > n; n++)
                            if (s = l[n], s !== e.masterScroller) switch (e.axis) {
                                case "horizontal":
                                    s.scrollLeft(o);
                                    break;
                                case "vertical":
                                    s.scrollTop(r)
                            }
                }
            }(this)).on("scrollStop", function(e) {
                return function() {
                    t === e.masterScroller && (e.masterScroller = null)
                }
            }(this))
        }, t.prototype.update = function() {
            var t, e, r, o, n, i, s, l, u, h, a, c, p;
            for (t = function() {
                    var t, e, r, o;
                    for (r = this.scrollers, o = [], t = 0, e = r.length; e > t; t++) c = r[t], o.push(c.getScrollbarWidths());
                    return o
                }.call(this), l = u = h = s = 0, r = 0, n = t.length; n > r; r++) p = t[r], l = Math.max(l, p.left), u = Math.max(u, p.right), h = Math.max(h, p.top), s = Math.max(s, p.bottom);
            for (a = this.scrollers, e = o = 0, i = a.length; i > o; e = ++o) c = a[e], p = t[e], c.setGutters("horizontal" === this.axis ? {
                left: l - p.left,
                right: u - p.right
            } : {
                top: h - p.top,
                bottom: s - p.bottom
            })
        }, t
    }(), k = function() {
        function e(t) {
            this.scroller = t, this.sprites = [], this.scroller.on("scrollStart", function(t) {
                return function() {
                    return t.shouldRequeryDimensions ? t.cacheDimensions() : void 0
                }
            }(this)), this.scroller.on("scroll", function(t) {
                return function(e, r) {
                    var o, n, i;
                    return n = t.scroller.scrollEl, o = ht(n), i = n.scrollTop(), t.viewportRect = {
                        left: o,
                        right: o + n[0].clientWidth,
                        top: i,
                        bottom: i + n[0].clientHeight
                    }, t.updatePositions()
                }
            }(this))
        }
        return e.prototype.scroller = null, e.prototype.scrollbarWidths = null, e.prototype.sprites = null, e.prototype.viewportRect = null, e.prototype.contentOffset = null, e.prototype.isHFollowing = !0, e.prototype.isVFollowing = !1, e.prototype.containOnNaturalLeft = !1, e.prototype.containOnNaturalRight = !1, e.prototype.shouldRequeryDimensions = !1, e.prototype.minTravel = 0, e.prototype.isForcedAbsolute = !1, e.prototype.isForcedRelative = !1, e.prototype.setSprites = function(e) {
            var r, o, n;
            if (this.clearSprites(), e instanceof t) return this.sprites = function() {
                var r, o, i;
                for (i = [], r = 0, o = e.length; o > r; r++) n = e[r], i.push(new B(t(n), this));
                return i
            }.call(this);
            for (r = 0, o = e.length; o > r; r++) n = e[r], n.follower = this;
            return this.sprites = e
        }, e.prototype.clearSprites = function() {
            var t, e, r, o;
            for (r = this.sprites, t = 0, e = r.length; e > t; t++) o = r[t], o.clear();
            return this.sprites = []
        }, e.prototype.cacheDimensions = function() {
            var t, e, r, o, n, i, s;
            for (n = this.scroller.scrollEl, e = ht(n), s = n.scrollTop(), this.viewportRect = {
                    left: e,
                    right: e + n[0].clientWidth,
                    top: s,
                    bottom: s + n[0].clientHeight
                }, this.scrollbarWidths = this.scroller.getScrollbarWidths(), this.contentOffset = this.scroller.innerEl.offset(), o = this.sprites, t = 0, r = o.length; r > t; t++) i = o[t], i.cacheDimensions()
        }, e.prototype.forceAbsolute = function() {
            var t, e, r, o, n;
            for (this.isForcedAbsolute = !0, r = this.sprites, o = [], t = 0, e = r.length; e > t; t++) n = r[t], o.push(n.doAbsolute ? void 0 : n.assignPosition());
            return o
        }, e.prototype.forceRelative = function() {
            var t, e, r, o, n;
            for (this.isForcedRelative = !0, r = this.sprites, o = [], t = 0, e = r.length; e > t; t++) n = r[t], o.push(n.doAbsolute ? n.assignPosition() : void 0);
            return o
        }, e.prototype.clearForce = function() {
            var t, e, r, o, n;
            for (this.isForcedRelative = !1, this.isForcedAbsolute = !1, r = this.sprites, o = [], t = 0, e = r.length; e > t; t++) n = r[t], o.push(n.assignPosition());
            return o
        }, e.prototype.update = function() {
            return this.cacheDimensions(), this.updatePositions()
        }, e.prototype.updatePositions = function() {
            var t, e, r, o;
            for (r = this.sprites, t = 0, e = r.length; e > t; t++) o = r[t], o.updatePosition()
        }, e.prototype.getContentRect = function(t) {
            var e, r, o;
            return r = t.offset(), e = r.left + parseFloat(t.css("border-left-width")) + parseFloat(t.css("padding-left")) - this.contentOffset.left, o = r.top + parseFloat(t.css("border-left-width")) + parseFloat(t.css("padding-left")) - this.contentOffset.top, {
                left: e,
                right: e + t.width(),
                top: o,
                bottom: o + t.height()
            }
        }, e.prototype.getBoundingRect = function(t) {
            var e, r, o;
            return r = t.offset(), e = r.left - this.contentOffset.left, o = r.top - this.contentOffset.top, {
                left: e,
                right: e + t.outerWidth(),
                top: o,
                bottom: o + t.outerHeight()
            }
        }, e
    }(), B = function() {
        function t(t, e) {
            this.el = t, this.follower = null != e ? e : null, this.isBlock = "block" === this.el.css("display"), this.el.css("position", "relative")
        }
        return t.prototype.follower = null, t.prototype.el = null, t.prototype.absoluteEl = null, t.prototype.naturalRect = null, t.prototype.parentRect = null, t.prototype.containerRect = null, t.prototype.isEnabled = !0, t.prototype.isHFollowing = !1, t.prototype.isVFollowing = !1, t.prototype.doAbsolute = !1, t.prototype.isAbsolute = !1, t.prototype.isCentered = !1, t.prototype.rect = null, t.prototype.isBlock = !1, t.prototype.naturalWidth = null, t.prototype.disable = function() {
            return this.isEnabled ? (this.isEnabled = !1, this.resetPosition(), this.unabsolutize()) : void 0
        }, t.prototype.enable = function() {
            return this.isEnabled ? void 0 : (this.isEnabled = !0, this.assignPosition())
        }, t.prototype.clear = function() {
            return this.disable(), this.follower = null, this.absoluteEl = null
        }, t.prototype.cacheDimensions = function() {
            var t, e, r, o, n, i, s, l;
            return o = !1, n = !1, r = !1, this.naturalWidth = this.el.width(), this.resetPosition(), e = this.follower, s = this.naturalRect = e.getBoundingRect(this.el), l = this.el.parent(), this.parentRect = e.getBoundingRect(l), t = this.containerRect = wt(e.getContentRect(l), s), i = e.minTravel, e.containOnNaturalLeft && (t.left = s.left), e.containOnNaturalRight && (t.right = s.right), e.isHFollowing && ut(t) - ut(s) >= i && (r = "center" === this.el.css("text-align"), o = !0), e.isVFollowing && lt(t) - lt(s) >= i && (n = !0), this.isHFollowing = o, this.isVFollowing = n, this.isCentered = r
        }, t.prototype.updatePosition = function() {
            return this.computePosition(), this.assignPosition()
        }, t.prototype.resetPosition = function() {
            return this.el.css({
                top: "",
                left: ""
            })
        }, t.prototype.computePosition = function() {
            var t, e, r, o, n, i, s, l;
            return s = this.follower.viewportRect, r = this.parentRect, t = this.containerRect, l = gt(s, r), o = null, e = !1, l && (o = J(this.naturalRect), i = gt(o, r), (this.isCentered && !Dt(s, r) || i && !Dt(s, i)) && (e = !0, this.isHFollowing && (this.isCentered ? (n = ut(o), o.left = (l.left + l.right) / 2 - n / 2, o.right = o.left + n) : ct(o, s) || (e = !1), ct(o, t) && (e = !1)), this.isVFollowing && (Gt(o, s) || (e = !1), Gt(o, t) && (e = !1)), Dt(s, o) || (e = !1))), this.rect = o, this.doAbsolute = e
        }, t.prototype.assignPosition = function() {
            var t, e;
            return this.isEnabled ? this.rect ? !this.doAbsolute && !this.follower.isForcedAbsolute || this.follower.isForcedRelative ? (e = this.rect.top - this.naturalRect.top, t = this.rect.left - this.naturalRect.left, this.unabsolutize(), this.el.toggleClass("fc-following", Boolean(e || t)).css({
                top: e,
                left: t
            })) : (this.absolutize(), this.absoluteEl.css({
                top: this.rect.top - this.follower.viewportRect.top + this.follower.scrollbarWidths.top,
                left: this.rect.left - this.follower.viewportRect.left + this.follower.scrollbarWidths.left,
                width: this.isBlock ? this.naturalWidth : ""
            })) : this.unabsolutize() : void 0
        }, t.prototype.absolutize = function() {
            return this.isAbsolute ? void 0 : (this.absoluteEl || (this.absoluteEl = this.buildAbsoluteEl()), this.absoluteEl.appendTo(this.follower.scroller.el), this.el.css("visibility", "hidden"), this.isAbsolute = !0)
        }, t.prototype.unabsolutize = function() {
            return this.isAbsolute ? (this.absoluteEl.detach(), this.el.css("visibility", ""), this.isAbsolute = !1) : void 0
        }, t.prototype.buildAbsoluteEl = function() {
            return this.el.clone().addClass("fc-following").css({
                position: "absolute",
                "z-index": 1e3,
                "font-weight": this.el.css("font-weight"),
                "font-size": this.el.css("font-size"),
                "font-family": this.el.css("font-family"),
                color: this.el.css("color"),
                "padding-top": this.el.css("padding-top"),
                "padding-bottom": this.el.css("padding-bottom"),
                "padding-left": this.el.css("padding-left"),
                "padding-right": this.el.css("padding-right"),
                "pointer-events": "none"
            })
        }, t
    }(), J = function(t) {
        return {
            left: t.left,
            right: t.right,
            top: t.top,
            bottom: t.bottom
        }
    }, ut = function(t) {
        return t.right - t.left
    }, lt = function(t) {
        return t.bottom - t.top
    }, Dt = function(t, e) {
        return xt(t, e) && It(t, e)
    }, xt = function(t, e) {
        return e.left >= t.left && e.right <= t.right
    }, It = function(t, e) {
        return e.top >= t.top && e.bottom <= t.bottom
    }, ct = function(t, e) {
        return t.left < e.left ? (t.right = e.left + ut(t), t.left = e.left, !0) : t.right > e.right ? (t.left = e.right - ut(t), t.right = e.right, !0) : !1
    }, Gt = function(t, e) {
        return t.top < e.top ? (t.bottom = e.top + lt(t), t.top = e.top, !0) : t.bottom > e.bottom ? (t.top = e.bottom - lt(t), t.bottom = e.bottom, !0) : !1
    }, wt = function(t, e) {
        return {
            left: Math.min(t.left, e.left),
            right: Math.max(t.right, e.right),
            top: Math.min(t.top, e.top),
            bottom: Math.max(t.bottom, e.bottom)
        }
    }, n = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.prototype.resourceManager = null, e.prototype.initialize = function() {
            return this.resourceManager = new H(this)
        }, e.prototype.instantiateView = function(t) {
            var e, r;
            return e = this.getViewSpec(t), r = e["class"], this.options.resources && e.options.resources !== !1 && (e.queryResourceClass ? r = e.queryResourceClass(e) || r : e.resourceClass && (r = e.resourceClass)), new r(this, t, e.options, e.duration)
        }, e.prototype.getResources = function() {
            return this.resourceManager.topLevelResources
        }, e.prototype.addResource = function(t, e) {
            var r;
            null == e && (e = !1), r = this.resourceManager.addResource(t), e && this.view.scrollToResource && r.done(function(t) {
                return function(e) {
                    return t.view.scrollToResource(e)
                }
            }(this))
        }, e.prototype.removeResource = function(t) {
            return this.resourceManager.removeResource(t)
        }, e.prototype.refetchResources = function() {
            this.resourceManager.fetchResources()
        }, e.prototype.rerenderResources = function() {
            var t;
            "function" == typeof(t = this.view).redisplayResources && t.redisplayResources()
        }, e.prototype.getEventResourceId = function(t) {
            return this.resourceManager.getEventResourceId(t)
        }, e.prototype.getPeerEvents = function(t, r) {
            var o, n, i, s, l, u, h;
            for (u = e.__super__.getPeerEvents.apply(this, arguments), s = t.resourceId || r && this.getEventResourceId(r) || "", o = [], n = 0, i = u.length; i > n; n++) l = u[n], h = this.getEventResourceId(l) || "", h && h !== s || o.push(l);
            return o
        }, e.prototype.buildSelectSpan = function(t, r, o) {
            var n;
            return n = e.__super__.buildSelectSpan.apply(this, arguments), o && (n.resourceId = o), n
        }, e.prototype.getResourceById = function(t) {
            return this.resourceManager.getResourceById(t)
        }, e.prototype.getResourceEvents = function(t) {
            var e, r;
            return r = "object" == typeof t ? t : this.getResourceById(t), r ? (e = this.resourceManager.getEventResourceField(), this.clientEvents(function(t) {
                return t[e] === r.id
            })) : []
        }, e.prototype.getEventResource = function(t) {
            var e, r;
            return e = "object" == typeof t ? t : this.clientEvents(t)[0], e ? (r = this.resourceManager.getEventResourceId(e), this.getResourceById(r)) : null
        }, e
    }(o), o.prototype = n.prototype, Tt = N.prototype.displayEvents, N.prototype.displayEvents = function(t) {
        return this.listenToResources(), Ct(this.calendar.options.schedulerLicenseKey, this.el), this.calendar.resourceManager.getResources().then(function(e) {
            return function() {
                return Tt.call(e, t)
            }
        }(this))
    }, N.prototype.isListeningToResources = !1, N.prototype.listenToResources = function() {
        return this.isListeningToResources ? void 0 : (this.calendar.resourceManager.on("add", Et(this, "addResource")).on("remove", Et(this, "removeResource")).on("reset", Et(this, "resetResources")), this.isListeningToResources = !0)
    }, N.prototype.addResource = function(t) {
        return this.calendar.rerenderEvents()
    }, N.prototype.removeResource = function(t) {
        return this.calendar.rerenderEvents()
    }, N.prototype.resetResources = function(t) {
        return this.calendar.rerenderEvents()
    }, p.prototype.getEventSkinCss = function(t) {
        var e, r, o, n, i, s, l, u, h;
        return h = this.view, l = t.source || {}, e = t.color, u = l.color, i = h.opt("eventColor"), s = h.calendar.getEventResource(t), r = function() {
            var t, e;
            for (e = null, t = s; t && !e;) e = t.eventBackgroundColor || t.eventColor, t = t._parent;
            return e
        }, o = function() {
            var t, e;
            for (e = null, t = s; t && !e;) e = t.eventBorderColor || t.eventColor, t = t._parent;
            return e
        }, n = function() {
            var t, e;
            for (e = null, t = s; t && !e;) e = t.eventTextColor, t = t._parent;
            return e
        }, {
            "background-color": t.backgroundColor || e || r() || l.backgroundColor || u || h.opt("eventBackgroundColor") || i,
            "border-color": t.borderColor || e || o() || l.borderColor || u || h.opt("eventBorderColor") || i,
            color: t.textColor || n() || l.textColor || h.opt("eventTextColor")
        }
    }, H = function(e) {
        function r(t) {
            this.calendar = t, this.unsetResources()
        }
        return Mt(r, e), r.mixin(h), r.resourceGuid = 1, r.ajaxDefaults = {
            dataType: "json",
            cache: !1
        }, r.prototype.calendar = null, r.prototype.topLevelResources = null, r.prototype.resourcesById = null, r.prototype.fetching = null, r.prototype.getResources = function() {
            var e;
            return this.fetching ? t.Deferred().resolve(this.topLevelResources).promise() : (e = t.Deferred(), this.fetchResources().done(function(t) {
                return e.resolve(t)
            }).fail(function() {
                return e.resolve([])
            }), e)
        }, r.prototype.fetchResources = function() {
            var e;
            return e = this.fetching, t.when(e).then(function(t) {
                return function() {
                    return t.fetching = t.fetchResourceInputs().then(function(r) {
                        return t.setResources(r), e && t.trigger("reset", t.topLevelResources), t.topLevelResources
                    })
                }
            }(this))
        }, r.prototype.fetchResourceInputs = function() {
            var e, o, n;
            switch (e = t.Deferred(), n = this.calendar.options.resources, "string" === t.type(n) && (n = {
                url: n
            }), t.type(n)) {
                case "function":
                    n(function(t) {
                        return function(t) {
                            return e.resolve(t)
                        }
                    }(this));
                    break;
                case "object":
                    o = t.ajax(t.extend({}, r.ajaxDefaults, n));
                    break;
                case "array":
                    e.resolve(n);
                    break;
                default:
                    e.resolve([])
            }
            return o || (o = e.promise()), "pending" === !o.state() && (this.calendar.pushLoading(), o.always(function() {
                return this.calendar.popLoading()
            })), o
        }, r.prototype.getResourceById = function(t) {
            return this.resourcesById[t]
        }, r.prototype.unsetResources = function() {
            return this.topLevelResources = [], this.resourcesById = {}
        }, r.prototype.setResources = function(t) {
            var e, r, o, n, i, s;
            for (this.unsetResources(), i = function() {
                    var e, r, o;
                    for (o = [], e = 0, r = t.length; r > e; e++) n = t[e], o.push(this.buildResource(n));
                    return o
                }.call(this), s = function() {
                    var t, e, r;
                    for (r = [], t = 0, e = i.length; e > t; t++) o = i[t], this.addResourceToIndex(o) && r.push(o);
                    return r
                }.call(this), e = 0, r = s.length; r > e; e++) o = s[e], this.addResourceToTree(o);
            return this.calendar.trigger("resourcesSet", null, this.topLevelResources)
        }, r.prototype.addResource = function(e) {
            return t.when(this.fetching).then(function(t) {
                return function() {
                    var r;
                    return r = t.buildResource(e), t.addResourceToIndex(r) ? (t.addResourceToTree(r), t.trigger("add", r), r) : !1
                }
            }(this))
        }, r.prototype.addResourceToIndex = function(t) {
            var e, r, o, n;
            if (this.resourcesById[t.id]) return !1;
            for (this.resourcesById[t.id] = t, n = t.children, r = 0, o = n.length; o > r; r++) e = n[r], this.addResourceToIndex(e);
            return !0
        }, r.prototype.addResourceToTree = function(t) {
            var e, r, o;
            if (!t.parent) {
                if (r = String(t[this.getResourceParentField()] || "")) {
                    if (e = this.resourcesById[r], !e) return !1;
                    t.parent = e, o = e.children
                } else o = this.topLevelResources;
                o.push(t)
            }
            return !0
        }, r.prototype.removeResource = function(e) {
            var r;
            return r = "object" == typeof e ? e.id : e, t.when(this.fetching).then(function(t) {
                return function() {
                    var e;
                    return e = t.removeResourceFromIndex(r), e && (t.removeResourceFromTree(e), t.trigger("remove", e)), e
                }
            }(this))
        }, r.prototype.removeResourceFromIndex = function(t) {
            var e, r, o, n, i;
            if (i = this.resourcesById[t]) {
                for (delete this.resourcesById[t], n = i.children, r = 0, o = n.length; o > r; r++) e = n[r], this.removeResourceFromIndex(e.id);
                return i
            }
            return !1
        }, r.prototype.removeResourceFromTree = function(t, e) {
            var r, o, n, i;
            for (null == e && (e = this.topLevelResources), r = o = 0, n = e.length; n > o; r = ++o) {
                if (i = e[r], i === t) return t.parent = null, e.splice(r, 1), !0;
                if (this.removeResourceFromTree(t, i.children)) return !0
            }
            return !1
        }, r.prototype.buildResource = function(e) {
            var o, n, i, s, l;
            return l = t.extend({}, e), l.id = String((null != (s = e.id) ? s : "_fc" + r.resourceGuid++) || ""), i = e.eventClassName, l.eventClassName = function() {
                switch (t.type(i)) {
                    case "string":
                        return i.split(/\s+/);
                    case "array":
                        return i;
                    default:
                        return []
                }
            }(), l.children = function() {
                var t, r, i, s, u;
                for (s = null != (i = e.children) ? i : [], u = [], t = 0, r = s.length; r > t; t++) n = s[t], o = this.buildResource(n), o.parent = l, u.push(o);
                return u
            }.call(this), l
        }, r.prototype.getResourceParentField = function() {
            return this.calendar.options.resourceParentField || "parentId"
        }, r.prototype.getEventResourceId = function(t) {
            return String(t[this.getEventResourceField()] || "")
        }, r.prototype.setEventResourceId = function(t, e) {
            return t[this.getEventResourceField()] = String(e || "")
        }, r.prototype.getEventResourceField = function() {
            return this.calendar.options.eventResourceField || "resourceId"
        }, r
    }(i), G = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.prototype.displayingResources = null, r.prototype.assigningResources = null, r.prototype.resourceTextFunc = null, r.prototype.displayView = function() {
            return t.when(r.__super__.displayView.apply(this, arguments)).then(function(t) {
                return function() {
                    return t.displayResources()
                }
            }(this))
        }, r.prototype.displayEvents = function(e) {
            return t.when(this.displayResources()).then(function(t) {
                return function() {
                    return r.__super__.displayEvents.call(t, e)
                }
            }(this))
        }, r.prototype.unrenderSkeleton = function() {
            return this.clearResources()
        }, r.prototype.displayResources = function() {
            return this.listenToResources(), t.when(this.displayingResources).then(function(t) {
                return function() {
                    return t.displayingResources || (t.displayingResources = t.assignResources().then(function() {
                        return t.renderStoredResources()
                    }))
                }
            }(this))
        }, r.prototype.clearResources = function() {
            var e;
            return e = this.displayingResources, e ? e.then(function(t) {
                return function() {
                    return t.clearEvents(), t.unrenderStoredResources(), t.displayingResources = null
                }
            }(this)) : t.when()
        }, r.prototype.redisplayResources = function() {
            var t;
            return t = this.queryScroll(), this.clearResources().then(function(t) {
                return function() {
                    return t.displayResources()
                }
            }(this)).then(function(e) {
                return function() {
                    return e.setScroll(t), e.calendar.rerenderEvents()
                }
            }(this))
        }, r.prototype.resetResources = function(t) {
            var e;
            return this.displayingResources ? (e = this.queryScroll(), this.clearResources().then(function(t) {
                return function() {
                    return t.unassignResources()
                }
            }(this)).then(function(e) {
                return function() {
                    return e.assignResources(t)
                }
            }(this)).then(function(t) {
                return function() {
                    return t.displayResources()
                }
            }(this)).then(function(t) {
                return function() {
                    return t.setScroll(e), t.calendar.rerenderEvents()
                }
            }(this))) : this.unassignResources().then(function(e) {
                return function() {
                    return e.assignResources(t)
                }
            }(this))
        }, r.prototype.assignResources = function(e) {
            return this.assigningResources || (this.assigningResources = t.when(e || this.calendar.resourceManager.getResources()).then(function(t) {
                return function(e) {
                    return t.setResources(e)
                }
            }(this)))
        }, r.prototype.unassignResources = function() {
            var e;
            return e = this.assigningResources, e ? e.then(function(t) {
                return function() {
                    return t.unsetResources(), t.assigningResources = null
                }
            }(this)) : t.when()
        }, r.prototype.setResources = function(t) {}, r.prototype.unsetResources = function() {}, r.prototype.renderStoredResources = function() {}, r.prototype.unrenderStoredResources = function() {}, r.prototype.getResourceText = function(t) {
            return this.getResourceTextFunc()(t)
        }, r.prototype.getResourceTextFunc = function() {
            var t;
            return this.resourceTextFunc ? this.resourceTextFunc : (t = this.opt("resourceText"), "function" != typeof t && (t = function(t) {
                return t.title || t.id
            }), this.resourceTextFunc = t)
        }, r.prototype.triggerDayClick = function(t, e, r) {
            var o;
            return o = this.calendar.resourceManager, this.trigger("dayClick", e, this.calendar.applyTimezone(t.start), r, this, o.getResourceById(t.resourceId))
        }, r.prototype.triggerSelect = function(t, e) {
            var r;
            return r = this.calendar.resourceManager, this.trigger("select", null, this.calendar.applyTimezone(t.start), this.calendar.applyTimezone(t.end), e, this, r.getResourceById(t.resourceId))
        }, r.prototype.reportEventDrop = function() {
            var t, e, o;
            return e = arguments[0], t = arguments[1], o = 3 <= arguments.length ? Wt.call(arguments, 2) : [], r.__super__.reportEventDrop.apply(this, [e, this.normalizeDropLocation(t)].concat(Wt.call(o)))
        }, r.prototype.reportExternalDrop = function() {
            var t, e, o;
            return e = arguments[0], t = arguments[1], o = 3 <= arguments.length ? Wt.call(arguments, 2) : [], r.__super__.reportExternalDrop.apply(this, [e, this.normalizeDropLocation(t)].concat(Wt.call(o)))
        }, r.prototype.normalizeDropLocation = function(e) {
            var r;
            return r = t.extend({}, e), delete r.resourceId, this.calendar.resourceManager.setEventResourceId(r, e.resourceId), r
        }, r
    }(N), _ = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.prototype.allowCrossResource = !0, e.prototype.transformEventSpan = function(t, e) {
            return t.resourceId = this.view.calendar.getEventResourceId(e)
        }, e.prototype.renderFgEvents = function(t) {
            var r, o;
            return r = this.view.calendar, e.__super__.renderFgEvents.call(this, function() {
                var e, n, i;
                for (i = [], e = 0, n = t.length; n > e; e++) o = t[e], r.getEventResourceId(o) && i.push(o);
                return i
            }())
        }, e.prototype.fabricateHelperEvent = function(t, r) {
            var o;
            return o = e.__super__.fabricateHelperEvent.apply(this, arguments), this.view.calendar.resourceManager.setEventResourceId(o, t.resourceId), o
        }, e.prototype.computeEventDrop = function(t, r, o) {
            var n, i;
            return n = !0, n || t.resourceId === r.resourceId ? (i = e.__super__.computeEventDrop.apply(this, arguments), i && (i.resourceId = r.resourceId), i) : null
        }, e.prototype.computeExternalDrop = function(t, r) {
            var o;
            return o = e.__super__.computeExternalDrop.apply(this, arguments), o && (o.resourceId = t.resourceId), o
        }, e.prototype.computeEventResize = function(t, r, o, n) {
            var i;
            if (this.allowCrossResource || r.resourceId === o.resourceId) return i = e.__super__.computeEventResize.apply(this, arguments), i && (i.resourceId = r.resourceId), i
        }, e.prototype.computeSelectionSpan = function(t, r) {
            var o;
            if (this.allowCrossResource || t.resourceId === r.resourceId) return o = e.__super__.computeSelectionSpan.apply(this, arguments), o && (o.resourceId = t.resourceId), o
        }, e
    }(p), E = {
        flattenedResources: null,
        resourceCnt: 0,
        datesAboveResources: !1,
        allowCrossResource: !1,
        setResources: function(t) {
            return this.flattenedResources = this.flattenResources(t), this.resourceCnt = this.flattenedResources.length, this.updateDayTableCols()
        },
        unsetResources: function() {
            return this.flattenedResources = null, this.resourceCnt = 0, this.updateDayTableCols()
        },
        flattenResources: function(t) {
            var e, r, o;
            return e = bt(this.view.opt("resourceOrder")), o = function(t, r) {
                return X(t, r, e)
            }, r = [], this.accumulateResources(t, o, r), r
        },
        accumulateResources: function(t, e, r) {
            var o, n, i, s, l;
            for (l = t.slice(0), l.sort(e), s = [], o = 0, n = l.length; n > o; o++) i = l[o], r.push(i), s.push(this.accumulateResources(i.children, e, r));
            return s
        },
        updateDayTableCols: function() {
            return this.datesAboveResources = this.view.opt("groupByDateAndResource"), c.DayTableMixin.updateDayTableCols.call(this)
        },
        computeColCnt: function() {
            return (this.resourceCnt || 1) * this.daysPerRow
        },
        getColDayIndex: function(t) {
            return this.isRTL && (t = this.colCnt - 1 - t), this.datesAboveResources ? Math.floor(t / (this.resourceCnt || 1)) : t % this.daysPerRow
        },
        getColResource: function(t) {
            return this.flattenedResources[this.getColResourceIndex(t)]
        },
        getColResourceIndex: function(t) {
            return this.isRTL && (t = this.colCnt - 1 - t), this.datesAboveResources ? t % (this.resourceCnt || 1) : Math.floor(t / this.daysPerRow)
        },
        indicesToCol: function(t, e) {
            var r;
            return r = this.datesAboveResources ? e * (this.resourceCnt || 1) + t : t * this.daysPerRow + e, this.isRTL && (r = this.colCnt - 1 - r), r
        },
        renderHeadTrHtml: function() {
            return this.resourceCnt ? this.daysPerRow > 1 ? this.datesAboveResources ? this.renderHeadDateTrHtml(1, this.resourceCnt) + this.renderHeadResourceTrHtml(this.daysPerRow) : this.renderHeadResourceTrHtml(1, this.daysPerRow) + this.renderHeadDateTrHtml(this.resourceCnt) : this.renderHeadResourceTrHtml() : c.DayTableMixin.renderHeadTrHtml.call(this)
        },
        renderHeadDateTrHtml: function(t, e) {
            return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml(t, e) + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
        },
        renderHeadDateCellsHtml: function(t, e) {
            var r, o, n, i, s, l, u, h;
            for (null == t && (t = 1), null == e && (e = 1), n = [], i = s = 0, u = t; u > s; i = s += 1)
                for (o = l = 0, h = this.daysPerRow; h > l; o = l += 1) r = this.dayDates[o].clone(), n.push(this.renderHeadDateCellHtml(r, e));
            return this.isRTL && n.reverse(), n.join("")
        },
        renderHeadResourceTrHtml: function(t, e) {
            return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadResourceCellsHtml(t, e) + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
        },
        renderHeadResourceCellsHtml: function(t, e) {
            var r, o, n, i, s, l, u, h;
            for (null == t && (t = 1), null == e && (e = 1), r = [], o = n = 0, l = t; l > n; o = n += 1)
                for (u = this.flattenedResources, i = 0, s = u.length; s > i; i++) h = u[i], r.push(this.renderHeadResourceCellHtml(h, e));
            return this.isRTL && r.reverse(), r.join("")
        },
        renderHeadResourceCellHtml: function(t, e) {
            return null == e && (e = 1), '<th class="fc-resource-cell"' + (e > 1 ? ' colspan="' + e + '"' : "") + ">" + dt(this.view.getResourceText(t)) + "</th>"
        },
        processHeadResourceEls: function(e) {
            return e.find(".fc-resource-cell").each(function(e) {
                return function(r, o) {
                    var n;
                    return n = e.getColResource(r), e.view.trigger("resourceRender", n, n, t(o))
                }
            }(this))
        }
    }, C = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.mixin(_), r.mixin(E), r.prototype.getHitSpan = function(t) {
            var e;
            return e = r.__super__.getHitSpan.apply(this, arguments), this.resourceCnt && (e.resourceId = this.getColResource(t.col).id), e
        }, r.prototype.spanToSegs = function(e) {
            var r, o, n, i, s, l, u, h, a, c, p, d, f;
            if (a = this.resourceCnt, o = this.datesAboveResources ? this.sliceRangeByDay(e) : this.sliceRangeByRow(e), a) {
                for (d = [], i = 0, u = o.length; u > i; i++)
                    for (f = o[i], c = s = 0, h = a; h > s; c = s += 1) p = this.flattenedResources[c], e.resourceId && e.resourceId !== p.id || (r = t.extend({}, f), this.isRTL ? (r.leftCol = this.indicesToCol(c, f.lastRowDayIndex), r.rightCol = this.indicesToCol(c, f.firstRowDayIndex)) : (r.leftCol = this.indicesToCol(c, f.firstRowDayIndex), r.rightCol = this.indicesToCol(c, f.lastRowDayIndex)), d.push(r));
                return d
            }
            for (n = 0, l = o.length; l > n; n++) f = o[n], this.isRTL ? (f.leftCol = f.lastRowDayIndex, f.rightCol = f.firstRowDayIndex) : (f.leftCol = f.firstRowDayIndex, f.rightCol = f.lastRowDayIndex);
            return o
        }, r
    }(c.DayGrid), x = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.mixin(_), r.mixin(E), r.prototype.getHitSpan = function(t) {
            var e;
            return e = r.__super__.getHitSpan.apply(this, arguments), this.resourceCnt && (e.resourceId = this.getColResource(t.col).id), e
        }, r.prototype.spanToSegs = function(e) {
            var r, o, n, i, s, l, u, h, a, c, p, d, f;
            if (a = this.resourceCnt, o = this.sliceRangeByTimes(e), a) {
                for (d = [], i = 0, u = o.length; u > i; i++)
                    for (f = o[i], c = s = 0, h = a; h > s; c = s += 1) p = this.flattenedResources[c], e.resourceId && e.resourceId !== p.id || (r = t.extend({}, f), r.col = this.indicesToCol(c, f.dayIndex), d.push(r));
                return d
            }
            for (n = 0, l = o.length; l > n; n++) f = o[n], f.col = f.dayIndex;
            return o
        }, r
    }(c.TimeGrid), V = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.prototype.timeGrid = null, e.prototype.isScrolled = !1, e.prototype.initialize = function() {
            return this.timeGrid = this.instantiateGrid(), this.intervalDuration = this.timeGrid.duration
        }, e.prototype.instantiateGrid = function() {
            return new O(this)
        }, e.prototype.setRange = function(t) {
            return e.__super__.setRange.apply(this, arguments), this.timeGrid.setRange(t);

        }, e.prototype.renderSkeleton = function() {
            return this.el.addClass("fc-timeline"), this.opt("eventOverlap") === !1 && this.el.addClass("fc-no-overlap"), this.el.html(this.renderSkeletonHtml()), this.renderTimeGridSkeleton()
        }, e.prototype.renderSkeletonHtml = function() {
            return '<table> <thead class="fc-head"> <tr> <td class="fc-time-area ' + this.widgetHeaderClass + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-time-area ' + this.widgetContentClass + '"></td> </tr> </tbody> </table>'
        }, e.prototype.renderTimeGridSkeleton = function() {
            return this.timeGrid.setElement(this.el.find("tbody .fc-time-area")), this.timeGrid.headEl = this.el.find("thead .fc-time-area"), this.timeGrid.renderSkeleton(), this.isScrolled = !1, this.timeGrid.bodyScroller.on("scroll", Et(this, "handleBodyScroll"))
        }, e.prototype.handleBodyScroll = function(t, e) {
            if (t) {
                if (!this.isScrolled) return this.isScrolled = !0, this.el.addClass("fc-scrolled")
            } else if (this.isScrolled) return this.isScrolled = !1, this.el.removeClass("fc-scrolled")
        }, e.prototype.unrenderSkeleton = function() {
            return this.timeGrid.removeElement(), this.handleBodyScroll(0), e.__super__.unrenderSkeleton.apply(this, arguments)
        }, e.prototype.renderDates = function() {
            return this.timeGrid.renderDates()
        }, e.prototype.unrenderDates = function() {
            return this.timeGrid.unrenderDates()
        }, e.prototype.renderBusinessHours = function() {
            return this.timeGrid.renderBusinessHours()
        }, e.prototype.unrenderBusinessHours = function() {
            return this.timeGrid.unrenderBusinessHours()
        }, e.prototype.prepareHits = function() {
            return this.timeGrid.prepareHits()
        }, e.prototype.releaseHits = function() {
            return this.timeGrid.releaseHits()
        }, e.prototype.queryHit = function(t, e) {
            return this.timeGrid.queryHit(t, e)
        }, e.prototype.getHitSpan = function(t) {
            return this.timeGrid.getHitSpan(t)
        }, e.prototype.getHitEl = function(t) {
            return this.timeGrid.getHitEl(t)
        }, e.prototype.updateWidth = function() {
            return this.timeGrid.updateWidth()
        }, e.prototype.setHeight = function(t, e) {
            var r;
            return r = e ? "auto" : t - this.timeGrid.headHeight() - this.queryMiscHeight(), this.timeGrid.bodyScroller.setHeight(r)
        }, e.prototype.queryMiscHeight = function() {
            return this.el.outerHeight() - this.timeGrid.headScroller.el.outerHeight() - this.timeGrid.bodyScroller.el.outerHeight()
        }, e.prototype.computeInitialScroll = function(t) {
            return this.timeGrid.computeInitialScroll(t)
        }, e.prototype.queryScroll = function() {
            return this.timeGrid.queryScroll()
        }, e.prototype.setScroll = function(t) {
            return this.timeGrid.setScroll(t)
        }, e.prototype.renderEvents = function(t) {
            return this.timeGrid.renderEvents(t), this.updateWidth()
        }, e.prototype.unrenderEvents = function() {
            return this.timeGrid.unrenderEvents(), this.updateWidth()
        }, e.prototype.renderDrag = function(t, e) {
            return this.timeGrid.renderDrag(t, e)
        }, e.prototype.unrenderDrag = function() {
            return this.timeGrid.unrenderDrag()
        }, e.prototype.getEventSegs = function() {
            return this.timeGrid.getEventSegs()
        }, e.prototype.renderSelection = function(t) {
            return this.timeGrid.renderSelection(t)
        }, e.prototype.unrenderSelection = function() {
            return this.timeGrid.unrenderSelection()
        }, e
    }(N), Z = c.cssToStr, O = function(r) {
        function o() {
            var t;
            o.__super__.constructor.apply(this, arguments), this.initScaleProps(), this.minTime = e.duration(this.opt("minTime") || "00:00"), this.maxTime = e.duration(this.opt("maxTime") || "24:00"), this.snapDuration = (t = this.opt("snapDuration")) ? e.duration(t) : this.slotDuration, this.minResizeDuration = this.snapDuration, this.snapsPerSlot = rt(this.slotDuration, this.snapDuration), this.slotWidth = this.opt("slotWidth")
        }
        return Mt(o, r), o.prototype.slotDates = null, o.prototype.slotCnt = null, o.prototype.snapCnt = null, o.prototype.snapsPerSlot = null, o.prototype.snapDiffToIndex = null, o.prototype.snapIndexToDiff = null, o.prototype.headEl = null, o.prototype.slatContainerEl = null, o.prototype.slatEls = null, o.prototype.containerCoordCache = null, o.prototype.slatCoordCache = null, o.prototype.slatInnerCoordCache = null, o.prototype.headScroller = null, o.prototype.bodyScroller = null, o.prototype.joiner = null, o.prototype.follower = null, o.prototype.eventTitleFollower = null, o.prototype.minTime = null, o.prototype.maxTime = null, o.prototype.slotDuration = null, o.prototype.snapDuration = null, o.prototype.duration = null, o.prototype.labelInterval = null, o.prototype.headerFormats = null, o.prototype.isTimeScale = null, o.prototype.largeUnit = null, o.prototype.emphasizeWeeks = !1, o.prototype.titleFollower = null, o.prototype.segContainerEl = null, o.prototype.segContainerHeight = null, o.prototype.bgSegContainerEl = null, o.prototype.helperEls = null, o.prototype.innerEl = null, o.prototype.opt = function(t) {
            return this.view.opt(t)
        }, o.prototype.isValidDate = function(t) {
            var e;
            return this.view.isHiddenDay(t) ? !1 : this.isTimeScale ? (e = t.time(), e >= this.minTime && e < this.maxTime) : !0
        }, o.prototype.computeDisplayEventTime = function() {
            return !this.isTimeScale
        }, o.prototype.computeDisplayEventEnd = function() {
            return !1
        }, o.prototype.computeEventTimeFormat = function() {
            return this.opt("extraSmallTimeFormat")
        }, o.prototype.normalizeGridDate = function(t) {
            var e;
            return this.isTimeScale ? (e = t.clone(), e.hasTime() || e.time(0)) : (e = t.clone().stripTime(), this.largeUnit && e.startOf(this.largeUnit)), e
        }, o.prototype.normalizeGridRange = function(t) {
            var e, r;
            return this.isTimeScale ? r = {
                start: this.normalizeGridDate(t.start),
                end: this.normalizeGridDate(t.end)
            } : (r = this.view.computeDayRange(t), this.largeUnit && (r.start.startOf(this.largeUnit), e = r.end.clone().startOf(this.largeUnit), e.isSame(r.end) && e.isAfter(r.start) || e.add(this.slotDuration), r.end = e)), r
        }, o.prototype.rangeUpdated = function() {
            var t, e;
            for (this.start = this.normalizeGridDate(this.start), this.end = this.normalizeGridDate(this.end), e = [], t = this.start.clone(); t < this.end;) this.isValidDate(t) && e.push(t.clone()), t.add(this.slotDuration);
            return this.slotDates = e, this.updateGridDates()
        }, o.prototype.updateGridDates = function() {
            var t, e, r, o, n;
            for (o = -1, e = 0, r = [], n = [], t = this.start.clone(); t < this.end;) this.isValidDate(t) ? (o++, r.push(o), n.push(e)) : r.push(o + .5), t.add(this.snapDuration), e++;
            return this.snapDiffToIndex = r, this.snapIndexToDiff = n, this.snapCnt = o + 1, this.slotCnt = this.snapCnt / this.snapsPerSlot
        }, o.prototype.spanToSegs = function(t) {
            var e, r;
            return e = this.normalizeGridRange(t), r = ft(e, this), r ? (r.isStart && !this.isValidDate(r.start) && (r.isStart = !1), r.isEnd && r.end && !this.isValidDate(r.end.clone().subtract(1)) && (r.isEnd = !1), [r]) : []
        }, o.prototype.prepareHits = function() {
            return this.buildCoords()
        }, o.prototype.queryHit = function(t, e) {
            var r, o, n, i, s, l, u, h, a, c, p, d;
            return d = this.snapsPerSlot, i = this.slatCoordCache, r = this.containerCoordCache, null != r.getVerticalIndex(e) && (s = i.getHorizontalIndex(t), null != s) ? (h = i.getWidth(s), this.isRTL ? (u = i.getRightOffset(s), n = (u - t) / h, o = Math.floor(n * d), a = s * d + o, p = u - o / d * h, c = p - (o + 1) / d * h) : (l = i.getLeftOffset(s), n = (t - l) / h, o = Math.floor(n * d), a = s * d + o, c = l + o / d * h, p = l + (o + 1) / d * h), {
                snap: a,
                component: this,
                left: c,
                right: p,
                top: r.getTopOffset(0),
                bottom: r.getBottomOffset(0)
            }) : void 0
        }, o.prototype.getHitSpan = function(t) {
            return this.getSnapRange(t.snap)
        }, o.prototype.getHitEl = function(t) {
            return this.getSnapEl(t.snap)
        }, o.prototype.getSnapRange = function(t) {
            var e, r;
            return r = this.start.clone(), r.add(Rt(this.snapDuration, this.snapIndexToDiff[t])), e = r.clone().add(this.snapDuration), {
                start: r,
                end: e
            }
        }, o.prototype.getSnapEl = function(t) {
            return this.slatEls.eq(Math.floor(t / this.snapsPerSlot))
        }, o.prototype.renderSkeleton = function() {
            return this.headScroller = new P("invisible-scroll", "hidden"), this.headEl.append(this.headScroller.el), this.bodyScroller = new P, this.el.append(this.bodyScroller.el), this.innerEl = this.bodyScroller.contentEl, this.slatContainerEl = t('<div class="fc-slats"/>').appendTo(this.bodyScroller.bgEl), this.segContainerEl = t('<div class="fc-event-container"/>').appendTo(this.bodyScroller.contentEl), this.bgSegContainerEl = this.bodyScroller.bgEl, this.containerCoordCache = new s({
                els: this.bodyScroller.innerEl,
                isHorizontal: !0,
                isVertical: !0
            }), this.joiner = new z("horizontal", [this.headScroller, this.bodyScroller]), this.follower = new k(this.headScroller), this.eventTitleFollower = new k(this.bodyScroller), this.eventTitleFollower.minTravel = 50, this.isRTL ? this.eventTitleFollower.containOnNaturalRight = !0 : this.eventTitleFollower.containOnNaturalLeft = !0, o.__super__.renderSkeleton.apply(this, arguments)
        }, o.prototype.headColEls = null, o.prototype.slatColEls = null, o.prototype.renderDates = function() {
            var t, e, r, o, n;
            for (this.headScroller.contentEl.html(this.renderHeadHtml()), this.headColEls = this.headScroller.contentEl.find("col"), this.slatContainerEl.html(this.renderSlatHtml()), this.slatColEls = this.slatContainerEl.find("col"), this.slatEls = this.slatContainerEl.find("td"), this.slatCoordCache = new s({
                    els: this.slatEls,
                    isHorizontal: !0
                }), this.slatInnerCoordCache = new s({
                    els: this.slatEls.find("> div"),
                    isHorizontal: !0,
                    offsetParent: this.bodyScroller.innerEl
                }), n = this.slotDates, e = r = 0, o = n.length; o > r; e = ++r) t = n[e], this.view.trigger("dayRender", null, t, this.slatEls.eq(e));
            return this.follower ? this.follower.setSprites(this.headEl.find("tr:not(:last-child) span")) : void 0
        }, o.prototype.unrenderDates = function() {
            return this.follower && this.follower.clearSprites(), this.headScroller.contentEl.empty(), this.slatContainerEl.empty(), this.headScroller.contentEl.add(this.bodyScroller.contentEl).css({
                minWidth: "",
                width: ""
            })
        }, o.prototype.renderHeadHtml = function() {
            var t, e, r, o, n, i, s, l, u, h, a, c, p, d, f, g, y, v, m, w, R, S, b, C, E, _, H, T, D, x, I, F, G, W, M, L;
            for (f = this.labelInterval, n = this.headerFormats, e = function() {
                    var t, e, r;
                    for (r = [], t = 0, e = n.length; e > t; t++) o = n[t], r.push([]);
                    return r
                }(), g = null, T = null, W = this.slotDates, G = [], c = 0, y = W.length; y > c; c++) {
                for (r = W[c], L = r.week(), a = this.emphasizeWeeks && null !== T && T !== L, x = p = 0, v = n.length; v > p; x = ++p) o = n[x], I = e[x], g = I[I.length - 1], h = n.length > 1 && x < n.length - 1, _ = null, h ? (M = r.format(o), g && g.text === M ? g.colspan += 1 : _ = {
                    text: M,
                    colspan: 1
                }) : !g || vt(ot(this.start, r, f)) ? (M = r.format(o), _ = {
                    text: M,
                    colspan: 1
                }) : g.colspan += 1, _ && (_.weekStart = a, I.push(_));
                G.push({
                    weekStart: a
                }), T = L
            }
            for (l = f > this.slotDuration, i = "<table>", i += "<colgroup>", d = 0, m = W.length; m > d; d++) r = W[d], i += "<col/>";
            for (i += "</colgroup>", i += "<tbody>", s = C = 0, w = e.length; w > C; s = ++C) {
                for (I = e[s], u = s === e.length - 1, i += "<tr" + (l && u ? ' class="fc-chrono"' : "") + ">", E = 0, R = I.length; R > E; E++) t = I[E], i += '<th class="' + this.view.widgetHeaderClass + " " + (t.weekStart ? "fc-em-cell" : "") + '"' + (t.colspan > 1 ? ' colspan="' + t.colspan + '"' : "") + '><div class="fc-cell-content"><span class="fc-cell-text">' + dt(t.text) + "</span></div></th>";
                i += "</tr>"
            }
            for (i += "</tbody></table>", F = "<table>", F += "<colgroup>", H = 0, S = G.length; S > H; H++) t = G[H], F += "<col/>";
            for (F += "</colgroup>", F += "<tbody><tr>", s = D = 0, b = G.length; b > D; s = ++D) t = G[s], r = W[s], F += this.slatCellHtml(r, t.weekStart);
            return F += "</tr></tbody></table>", this._slatHtml = F, i
        }, o.prototype.renderSlatHtml = function() {
            return this._slatHtml
        }, o.prototype.slatCellHtml = function(t, e) {
            var r;
            return this.isTimeScale ? (r = [], r.push(vt(ot(this.start, t, this.labelInterval)) ? "fc-major" : "fc-minor")) : (r = this.getDayClasses(t), r.push("fc-day")), r.unshift(this.view.widgetContentClass), e && r.push("fc-em-cell"), '<td class="' + r.join(" ") + '" data-date="' + t.format() + '"><div /></td>'
        }, o.prototype.businessHourSegs = null, o.prototype.renderBusinessHours = function() {
            var t, e;
            return this.largeUnit ? void 0 : (t = this.view.calendar.getBusinessHoursEvents(!this.isTimeScale), e = this.businessHourSegs = this.eventsToSegs(t), this.renderFill("businessHours", e, "bgevent"))
        }, o.prototype.unrenderBusinessHours = function() {
            return this.unrenderFill("businessHours")
        }, o.prototype.explicitSlotWidth = null, o.prototype.defaultSlotWidth = null, o.prototype.updateWidth = function() {
            var t, e, r, o, n;
            return n = Math.round(this.slotWidth || (this.slotWidth = this.computeSlotWidth())), r = n * this.slotDates.length, e = "", o = n, t = this.bodyScroller.scrollEl[0].clientWidth, t > r && (e = t, r = "", o = Math.floor(t / this.slotDates.length)), this.headScroller.setContentWidth(r), this.headScroller.setContentMinWidth(e), this.bodyScroller.setContentWidth(r), this.bodyScroller.setContentMinWidth(e), this.headColEls.slice(0, -1).add(this.slatColEls.slice(0, -1)).width(o), this.headScroller.update(), this.bodyScroller.update(), this.joiner.update(), this.buildCoords(), this.updateSegPositions(), this.follower && this.follower.update(), this.eventTitleFollower ? this.eventTitleFollower.update() : void 0
        }, o.prototype.computeSlotWidth = function() {
            var e, r, o, n, i, s;
            return o = 0, r = this.headEl.find("tr:last-child th span"), r.each(function(e, r) {
                var n;
                return n = t(r).outerWidth(), o = Math.max(o, n)
            }), e = o + 1, s = rt(this.labelInterval, this.slotDuration), i = Math.ceil(e / s), n = this.headColEls.eq(0).css("min-width"), n && (n = parseInt(n, 10), n && (i = Math.max(i, n))), i
        }, o.prototype.buildCoords = function() {
            return this.containerCoordCache.build(), this.slatCoordCache.build(), this.slatInnerCoordCache.build()
        }, o.prototype.computeDateSnapCoverage = function(t) {
            var e, r, o, n;
            return r = ot(this.start, t, this.snapDuration), 0 > r ? 0 : r >= this.snapDiffToIndex.length ? this.snapCnt : (o = Math.floor(r), n = r - o, e = this.snapDiffToIndex[o], vt(e) && (e += n), e)
        }, o.prototype.dateToCoord = function(t) {
            var e, r, o, n, i;
            return i = this.computeDateSnapCoverage(t), o = i / this.snapsPerSlot, n = Math.floor(o), n = Math.min(n, this.slotCnt - 1), r = o - n, e = this.slatInnerCoordCache, this.isRTL ? e.getRightPosition(n) - e.getWidth(n) * r - this.containerCoordCache.getWidth(0) : e.getLeftPosition(n) + e.getWidth(n) * r
        }, o.prototype.rangeToCoords = function(t) {
            return this.isRTL ? {
                right: this.dateToCoord(t.start),
                left: this.dateToCoord(t.end)
            } : {
                left: this.dateToCoord(t.start),
                right: this.dateToCoord(t.end)
            }
        }, o.prototype.headHeight = function() {
            var t;
            return t = this.headScroller.contentEl.find("table"), t.height.apply(t, arguments)
        }, o.prototype.updateSegPositions = function() {
            var t, e, r, o, n;
            for (n = (this.segs || []).concat(this.businessHourSegs || []), e = 0, r = n.length; r > e; e++) o = n[e], t = this.rangeToCoords(o, -1), o.el.css({
                left: o.left = t.left,
                right: -(o.right = t.right)
            })
        }, o.prototype.computeInitialScroll = function(t) {
            var r, o;
            return r = 0, this.isTimeScale && (o = this.opt("scrollTime"), o && (o = e.duration(o), r = this.dateToCoord(this.start.clone().time(o)))), {
                left: r,
                top: 0
            }
        }, o.prototype.queryScroll = function() {
            return {
                left: St(this.bodyScroller.scrollEl),
                top: this.bodyScroller.scrollEl.scrollTop()
            }
        }, o.prototype.setScroll = function(t) {
            return St(this.headScroller.scrollEl, t.left), St(this.bodyScroller.scrollEl, t.left), this.bodyScroller.scrollEl.scrollTop(t.top)
        }, o.prototype.renderFgSegs = function(t) {
            return t = this.renderFgSegEls(t), this.renderFgSegsInContainers([
                [this, t]
            ]), this.updateSegFollowers(t), t
        }, o.prototype.unrenderFgSegs = function() {
            return this.clearSegFollowers(), this.unrenderFgContainers([this])
        }, o.prototype.renderFgSegsInContainers = function(t) {
            var e, r, o, n, i, s, l, u, h, a, c, p, d, f, g, y, v, m, w, R, S, b, C, E, _;
            for (o = 0, s = t.length; s > o; o++)
                for (w = t[o], e = w[0], _ = w[1], n = 0, l = _.length; l > n; n++) E = _[n], r = this.rangeToCoords(E, -1), E.el.css({
                    left: E.left = r.left,
                    right: -(E.right = r.right)
                });
            for (i = 0, u = t.length; u > i; i++)
                for (R = t[i], e = R[0], _ = R[1], f = 0, h = _.length; h > f; f++) E = _[f], E.el.appendTo(e.segContainerEl);
            for (g = 0, a = t.length; a > g; g++) {
                for (S = t[g], e = S[0], _ = S[1], y = 0, c = _.length; c > y; y++) E = _[y], E.height = E.el.outerHeight(!0);
                this.buildSegLevels(_), e.segContainerHeight = Q(_)
            }
            for (C = [], v = 0, p = t.length; p > v; v++) {
                for (b = t[v], e = b[0], _ = b[1], m = 0, d = _.length; d > m; m++) E = _[m], E.el.css("top", E.top);
                C.push(e.segContainerEl.height(e.segContainerHeight))
            }
            return C
        }, o.prototype.buildSegLevels = function(t) {
            var e, r, o, n, i, s, l, u, h, a, c, p, d, f;
            for (d = [], this.sortEventSegs(t), o = 0, s = t.length; s > o; o++) {
                for (f = t[o], f.above = [], h = 0; h < d.length;) {
                    for (r = !1, c = d[h], n = 0, l = c.length; l > n; n++) a = c[n], Ft(f, a) && (f.above.push(a), r = !0);
                    if (!r) break;
                    h += 1
                }
                for ((d[h] || (d[h] = [])).push(f), h += 1; h < d.length;) {
                    for (p = d[h], i = 0, u = p.length; u > i; i++) e = p[i], Ft(f, e) && e.above.push(f);
                    h += 1
                }
            }
            return d
        }, o.prototype.unrenderFgContainers = function(t) {
            var e, r, o, n;
            for (n = [], r = 0, o = t.length; o > r; r++) e = t[r], e.segContainerEl.empty(), e.segContainerEl.height(""), n.push(e.segContainerHeight = null);
            return n
        }, o.prototype.fgSegHtml = function(t, e) {
            var r, o, n, i, s, l;
            return o = t.event, n = this.view.isEventDraggable(o), s = t.isStart && this.view.isEventResizableFromStart(o), i = t.isEnd && this.view.isEventResizableFromEnd(o), r = this.getSegClasses(t, n, s || i), r.unshift("fc-timeline-event", "fc-h-event"), l = this.getEventTimeText(o), '<a class="' + r.join(" ") + '" style="' + Z(this.getEventSkinCss(o)) + '"' + (o.url ? ' href="' + dt(o.url) + '"' : "") + '><div class="fc-content" title="'+ (o.title ? dt(o.title) : "&nbsp;") +'">' + (l ? '<span class="fc-time">' + dt(l) + "</span>" : "") + '<span class="fc-title" >' + (o.title ? dt(o.title) : "&nbsp;") + '</span></div><div class="fc-bg" />' + (s ? '<div class="fc-resizer fc-start-resizer"></div>' : "") + (i ? '<div class="fc-resizer fc-end-resizer"></div>' : "") + "</a>"
        }, o.prototype.updateSegFollowers = function(t) {
            var e, r, o, n, i;
            if (this.eventTitleFollower) {
                for (n = [], e = 0, r = t.length; r > e; e++) o = t[e], i = o.el.find(".fc-title"), i.length && n.push(new B(i));
                return this.eventTitleFollower.setSprites(n)
            }
        }, o.prototype.clearSegFollowers = function() {
            return this.eventTitleFollower ? this.eventTitleFollower.clearSprites() : void 0
        }, o.prototype.segDragStart = function() {
            return o.__super__.segDragStart.apply(this, arguments), this.eventTitleFollower ? this.eventTitleFollower.forceRelative() : void 0
        }, o.prototype.segDragEnd = function() {
            return o.__super__.segDragEnd.apply(this, arguments), this.eventTitleFollower ? this.eventTitleFollower.clearForce() : void 0
        }, o.prototype.segResizeStart = function() {
            return o.__super__.segResizeStart.apply(this, arguments), this.eventTitleFollower ? this.eventTitleFollower.forceRelative() : void 0
        }, o.prototype.segResizeEnd = function() {
            return o.__super__.segResizeEnd.apply(this, arguments), this.eventTitleFollower ? this.eventTitleFollower.clearForce() : void 0
        }, o.prototype.renderHelper = function(t, e) {
            var r;
            return r = this.eventToSegs(t), r = this.renderFgSegEls(r), this.renderHelperSegsInContainers([
                [this, r]
            ], e)
        }, o.prototype.renderHelperSegsInContainers = function(e, r) {
            var o, n, i, s, l, u, h, a, c, p, d, f, g, y, v, m, w;
            for (s = [], l = 0, a = e.length; a > l; l++)
                for (g = e[l], o = g[0], w = g[1], u = 0, c = w.length; c > u; u++) m = w[u], n = this.rangeToCoords(m, -1), m.el.css({
                    left: m.left = n.left,
                    right: -(m.right = n.right)
                }), r && r.resourceId === (null != (y = o.resource) ? y.id : void 0) ? m.el.css("top", r.el.css("top")) : m.el.css("top", 0);
            for (h = 0, p = e.length; p > h; h++)
                for (v = e[h], o = v[0], w = v[1], i = t('<div class="fc-event-container fc-helper-container"/>').appendTo(o.innerEl), s.push(i[0]), f = 0, d = w.length; d > f; f++) m = w[f], i.append(m.el);
            return this.helperEls = this.helperEls ? this.helperEls.add(t(s)) : t(s)
        }, o.prototype.unrenderHelper = function() {
            return this.helperEls ? (this.helperEls.remove(), this.helperEls = null) : void 0
        }, o.prototype.renderEventResize = function(t, e) {
            return this.renderHighlight(this.eventToSpan(t)), this.renderEventLocationHelper(t, e)
        }, o.prototype.unrenderEventResize = function() {
            return this.unrenderHighlight(), this.unrenderHelper()
        }, o.prototype.renderFill = function(t, e, r) {
            return e = this.renderFillSegEls(t, e), this.renderFillInContainers(t, [
                [this, e]
            ], r), e
        }, o.prototype.renderFillInContainers = function(t, e, r) {
            var o, n, i, s, l, u;
            for (l = [], n = 0, i = e.length; i > n; n++) s = e[n], o = s[0], u = s[1], l.push(this.renderFillInContainer(t, o, u, r));
            return l
        }, o.prototype.renderFillInContainer = function(e, r, o, n) {
            var i, s, l, u, h;
            if (o.length) {
                for (n || (n = e.toLowerCase()), i = t('<div class="fc-' + n + '-container" />').appendTo(r.bgSegContainerEl), l = 0, u = o.length; u > l; l++) h = o[l], s = this.rangeToCoords(h, -1), h.el.css({
                    left: h.left = s.left,
                    right: -(h.right = s.right)
                }), h.el.appendTo(i);
                return this.elsByFill[e] = this.elsByFill[e] ? this.elsByFill[e].add(i) : i
            }
        }, o.prototype.renderDrag = function(t, e) {
            return e ? (this.renderEventLocationHelper(t, e), this.applyDragOpacity(this.helperEls), !0) : (this.renderHighlight(this.eventToSpan(t)), !1)
        }, o.prototype.unrenderDrag = function() {
            return this.unrenderHelper(), this.unrenderHighlight()
        }, o
    }(p), Q = function(t) {
        var e, r, o, n;
        for (o = 0, e = 0, r = t.length; r > e; e++) n = t[e], o = Math.max(o, K(n));
        return o
    }, K = function(t) {
        return null == t.top && (t.top = Q(t.above)), t.top + t.height
    }, Ft = function(t, e) {
        return t.left < e.right && t.right > e.left
    }, m = 18, y = 6, g = 200, v = 1e3, l = {
        months: 1
    }, L = [{
        years: 1
    }, {
        months: 1
    }, {
        days: 1
    }, {
        hours: 1
    }, {
        minutes: 30
    }, {
        minutes: 15
    }, {
        minutes: 10
    }, {
        minutes: 5
    }, {
        minutes: 1
    }, {
        seconds: 30
    }, {
        seconds: 15
    }, {
        seconds: 10
    }, {
        seconds: 5
    }, {
        seconds: 1
    }, {
        milliseconds: 500
    }, {
        milliseconds: 100
    }, {
        milliseconds: 10
    }, {
        milliseconds: 1
    }], O.prototype.initScaleProps = function() {
        var e, r, o;
        return this.labelInterval = this.queryDurationOption("slotLabelInterval"), this.slotDuration = this.queryDurationOption("slotDuration"), this.ensureGridDuration(), this.validateLabelAndSlot(), this.ensureLabelInterval(), this.ensureSlotDuration(), e = this.opt("slotLabelFormat"), o = t.type(e), this.headerFormats = "array" === o ? e : "string" === o ? [e] : this.computeHeaderFormats(), this.isTimeScale = nt(this.slotDuration), this.largeUnit = this.isTimeScale ? void 0 : (r = $(this.slotDuration), /year|month|week/.test(r) ? r : void 0), this.emphasizeWeeks = 1 === this.slotDuration.as("days") && this.duration.as("weeks") >= 2 && !this.opt("businessHours")
    }, O.prototype.queryDurationOption = function(t) {
        var r, o;
        return o = this.opt(t), null != o && (r = e.duration(o), +r) ? r : void 0
    }, O.prototype.validateLabelAndSlot = function() {
        var t, e, r;
        return this.labelInterval && (t = rt(this.duration, this.labelInterval), t > v && (c.warn("slotLabelInterval results in too many cells"), this.labelInterval = null)), this.slotDuration && (e = rt(this.duration, this.slotDuration), e > v && (c.warn("slotDuration results in too many cells"), this.slotDuration = null)), this.labelInterval && this.slotDuration && (r = rt(this.labelInterval, this.slotDuration), !vt(r) || 1 > r) ? (c.warn("slotLabelInterval must be a multiple of slotDuration"), this.slotDuration = null) : void 0
    }, O.prototype.ensureGridDuration = function() {
        var t, r, o, n, i;
        if (t = this.duration, !t) {
            if (t = this.view.intervalDuration, !t)
                if (this.labelInterval || this.slotDuration)
                    for (i = this.ensureLabelInterval(), o = L.length - 1; o >= 0 && (r = L[o], t = e.duration(r), n = rt(t, i), !(n >= m)); o += -1);
                else t = e.duration(l);
            this.duration = t
        }
        return t
    }, O.prototype.ensureLabelInterval = function() {
        var t, r, o, n, i, s, l, u, h;
        if (i = this.labelInterval, !i) {
            if (this.duration || this.slotDuration || this.ensureGridDuration(), this.slotDuration) {
                for (r = 0, s = L.length; s > r; r++)
                    if (t = L[r], h = e.duration(t), u = rt(h, this.slotDuration), vt(u) && y >= u) {
                        i = h;
                        break
                    }
                i || (i = this.slotDuration)
            } else
                for (o = 0, l = L.length; l > o && (t = L[o], i = e.duration(t), n = rt(this.duration, i), !(n >= m)); o++);
            this.labelInterval = i
        }
        return i
    }, O.prototype.ensureSlotDuration = function() {
        var t, r, o, n, i, s, l, u;
        if (s = this.slotDuration, !s) {
            for (o = this.ensureLabelInterval(), r = 0, n = L.length; n > r; r++)
                if (t = L[r], u = e.duration(t), l = rt(o, u), vt(l) && l > 1 && y >= l) {
                    s = u;
                    break
                }
            s && this.duration && (i = rt(this.duration, s), i > g && (s = null)), s || (s = o), this.slotDuration = s
        }
        return s
    }, O.prototype.computeHeaderFormats = function() {
        var t, e, r, o, n, i, s, l;
        switch (s = this.view, o = this.duration, n = this.labelInterval, i = $(n), l = this.opt("weekNumbers"), t = e = r = null, "week" !== i || l || (i = "day"), i) {
            case "year":
                t = "YYYY";
                break;
            case "month":
                o.asYears() > 1 && (t = "YYYY"), e = "MMM";
                break;
            case "week":
                o.asYears() > 1 && (t = "YYYY"), e = this.opt("shortWeekFormat");
                break;
            case "day":
                o.asYears() > 1 ? t = this.opt("monthYearFormat") : o.asMonths() > 1 && (t = "MMMM"), l && (e = this.opt("weekFormat")), r = "dd D";
                break;
            case "hour":
                l && (t = this.opt("weekFormat")), o.asDays() > 1 && (e = this.opt("dayOfMonthFormat")), r = this.opt("smallTimeFormat");
                break;
            case "minute":
                n.asMinutes() / 60 >= y ? (t = this.opt("hourFormat"), e = "[:]mm") : t = this.opt("mediumTimeFormat");
                break;
            case "second":
                n.asSeconds() / 60 >= y ? (t = "LT", e = "[:]ss") : t = "LTS";
                break;
            case "millisecond":
                t = "LTS", e = "[.]SSS"
        }
        return [].concat(t || [], e || [], r || [])
    }, c.views.timeline = {
        "class": V,
        defaults: {
            eventResizableFromStart: !0
        }
    }, c.views.timelineDay = {
        type: "timeline",
        duration: {
            days: 1
        }
    }, c.views.timelineWeek = {
        type: "timeline",
        duration: {
            weeks: 1
        }
    }, c.views.timelineMonth = {
        type: "timeline",
        duration: {
            months: 1
        }
    }, c.views.timelineYear = {
        type: "timeline",
        duration: {
            years: 1
        }
    }, F = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.mixin(G), r.prototype.resourceGrid = null, r.prototype.joiner = null, r.prototype.dividerEls = null, r.prototype.superHeaderText = null, r.prototype.isVGrouping = null, r.prototype.isHGrouping = null, r.prototype.groupSpecs = null, r.prototype.colSpecs = null, r.prototype.orderSpecs = null, r.prototype.rowHierarchy = null, r.prototype.resourceRowHash = null, r.prototype.nestingCnt = 0, r.prototype.isNesting = null, r.prototype.dividerWidth = null, r.prototype.initialize = function() {
            return r.__super__.initialize.apply(this, arguments), this.processResourceOptions(), this.resourceGrid = new A(this), this.rowHierarchy = new M(this), this.resourceRowHash = {}
        }, r.prototype.instantiateGrid = function() {
            return new I(this)
        }, r.prototype.processResourceOptions = function() {
            var t, e, r, o, n, i, s, l, u, h, a, c, p, d, f, g, y, v, m, w, R, S;
            for (t = this.opt("resourceColumns") || [], f = this.opt("resourceLabelText"), o = "Resources", S = null, t.length ? S = f : t.push({
                    labelText: f || o,
                    text: this.getResourceTextFunc()
                }), w = [], n = [], s = [], a = !1, h = !1, c = 0, g = t.length; g > c; c++) r = t[c], r.group ? n.push(r) : w.push(r);
            for (w[0].isMain = !0, n.length ? (s = n, a = !0) : (l = this.opt("resourceGroupField"), l && (h = !0, s.push({
                    field: l,
                    text: this.opt("resourceGroupText"),
                    render: this.opt("resourceGroupRender")
                }))), e = bt(this.opt("resourceOrder")), R = [], p = 0, y = e.length; y > p; p++) {
                for (m = e[p], u = !1, d = 0, v = s.length; v > d; d++)
                    if (i = s[d], i.field === m.field) {
                        i.order = m.order, u = !0;
                        break
                    }
                u || R.push(m)
            }
            return this.superHeaderText = S, this.isVGrouping = a, this.isHGrouping = h, this.groupSpecs = s, this.colSpecs = n.concat(w), this.orderSpecs = R
        }, r.prototype.renderSkeleton = function() {
            return r.__super__.renderSkeleton.apply(this, arguments), this.renderResourceGridSkeleton(), this.joiner = new z("vertical", [this.resourceGrid.bodyScroller, this.timeGrid.bodyScroller]), this.initDividerMoving()
        }, r.prototype.renderSkeletonHtml = function() {
            return '<table> <thead class="fc-head"> <tr> <td class="fc-resource-area ' + this.widgetHeaderClass + '"></td> <td class="fc-divider fc-col-resizer ' + this.widgetHeaderClass + '"></td> <td class="fc-time-area ' + this.widgetHeaderClass + '"></td> </tr> </thead> <tbody class="fc-body"> <tr> <td class="fc-resource-area ' + this.widgetContentClass + '"></td> <td class="fc-divider fc-col-resizer ' + this.widgetHeaderClass + '"></td> <td class="fc-time-area ' + this.widgetContentClass + '"></td> </tr> </tbody> </table>'
        }, r.prototype.renderResourceGridSkeleton = function() {
            return this.resourceGrid.el = this.el.find("tbody .fc-resource-area"), this.resourceGrid.headEl = this.el.find("thead .fc-resource-area"), this.resourceGrid.renderSkeleton()
        }, r.prototype.initDividerMoving = function() {
            var t;
            return this.dividerEls = this.el.find(".fc-divider"), this.dividerWidth = null != (t = this.opt("resourceAreaWidth")) ? t : this.resourceGrid.tableWidth, null != this.dividerWidth && this.positionDivider(this.dividerWidth), this.dividerEls.on("mousedown", function(t) {
                return function(e) {
                    return t.dividerMousedown(e)
                }
            }(this))
        }, r.prototype.dividerMousedown = function(t) {
            var e, r, o, n, i;
            return r = this.opt("isRTL"), n = 30, o = this.el.width() - 30, i = this.getNaturalDividerWidth(), e = new u({
                dragStart: function(t) {
                    return function() {
                        return t.dividerEls.addClass("fc-active")
                    }
                }(this),
                drag: function(t) {
                    return function(e, s) {
                        var l;
                        return l = r ? i - e : i + e, l = Math.max(l, n), l = Math.min(l, o), t.dividerWidth = l, t.positionDivider(l), t.updateWidth()
                    }
                }(this),
                dragStop: function(t) {
                    return function() {
                        return t.dividerEls.removeClass("fc-active")
                    }
                }(this)
            }), e.mousedown(t)
        }, r.prototype.getNaturalDividerWidth = function() {
            return this.el.find(".fc-resource-area").width()
        }, r.prototype.positionDivider = function(t) {
            return this.el.find(".fc-resource-area").width(t)
        }, r.prototype.renderEvents = function(t) {
            return this.timeGrid.renderEvents(t), this.syncRowHeights(), this.updateWidth()
        }, r.prototype.unrenderEvents = function() {
            return this.timeGrid.unrenderEvents(), this.syncRowHeights(), this.updateWidth()
        }, r.prototype.updateWidth = function() {
            return r.__super__.updateWidth.apply(this, arguments), this.resourceGrid.updateWidth(), this.joiner.update(), this.cellFollower ? this.cellFollower.update() : void 0
        }, r.prototype.updateHeight = function(t) {
            return r.__super__.updateHeight.apply(this, arguments), t ? this.syncRowHeights() : void 0
        }, r.prototype.setHeight = function(t, e) {
            var r, o;
            return o = this.syncHeadHeights(), r = e ? "auto" : t - o - this.queryMiscHeight(), this.timeGrid.bodyScroller.setHeight(r), this.resourceGrid.bodyScroller.setHeight(r)
        }, r.prototype.queryMiscHeight = function() {
            return this.el.outerHeight() - Math.max(this.resourceGrid.headScroller.el.outerHeight(), this.timeGrid.headScroller.el.outerHeight()) - Math.max(this.resourceGrid.bodyScroller.el.outerHeight(), this.timeGrid.bodyScroller.el.outerHeight())
        }, r.prototype.syncHeadHeights = function() {
            var t;
            return this.resourceGrid.headHeight("auto"), this.timeGrid.headHeight("auto"), t = Math.max(this.resourceGrid.headHeight(), this.timeGrid.headHeight()), this.resourceGrid.headHeight(t), this.timeGrid.headHeight(t), t
        }, r.prototype.scrollToResource = function(t) {
            return this.timeGrid.scrollToResource(t)
        }, r.prototype.setResources = function(t) {
            var e, r, o;
            for (this.batchRows(), e = 0, r = t.length; r > e; e++) o = t[e], this.insertResource(o);
            return this.unbatchRows(), this.reinitializeCellFollowers()
        }, r.prototype.unsetResources = function() {
            return this.batchRows(), this.rowHierarchy.removeChildren(), this.unbatchRows(), this.reinitializeCellFollowers()
        }, r.prototype.addResource = function(t) {
            return this.insertResource(t), this.reinitializeCellFollowers()
        }, r.prototype.removeResource = function(t) {
            var e;
            return e = this.getResourceRow(t.id), e ? (this.batchRows(), e.remove(), this.unbatchRows(), this.reinitializeCellFollowers()) : void 0
        }, r.prototype.cellFollower = null, r.prototype.reinitializeCellFollowers = function() {
            var e, r, o, n, i, s;
            for (this.cellFollower && this.cellFollower.clearSprites(), this.cellFollower = new k(this.resourceGrid.bodyScroller), this.cellFollower.isHFollowing = !1, this.cellFollower.isVFollowing = !0, n = [], i = this.rowHierarchy.getNodes(), r = 0, o = i.length; o > r; r++) s = i[r], s instanceof j && s.groupTd && (e = s.groupTd.find(".fc-cell-content"), e.length && n.push(e[0]));
            return this.cellFollower.setSprites(t(n))
        }, r.prototype.insertResource = function(t, e) {
            var r, o, n, i, s, l, u;
            for (u = new D(this, t), null == e && (i = t.parentId, i && (e = this.getResourceRow(i))), e ? this.insertRowAsChild(u, e) : this.insertRow(u), s = t.children, l = [], o = 0, n = s.length; n > o; o++) r = s[o], l.push(this.insertResource(r, u));
            return l
        }, r.prototype.insertRow = function(t, e, r) {
            var o;
            return null == e && (e = this.rowHierarchy), null == r && (r = this.groupSpecs), r.length ? (o = this.ensureResourceGroup(t, e, r[0]), o instanceof d ? this.insertRowAsChild(t, o) : this.insertRow(t, o, r.slice(1))) : this.insertRowAsChild(t, e)
        }, r.prototype.insertRowAsChild = function(t, e) {
            return e.addChild(t, this.computeChildRowPosition(t, e))
        }, r.prototype.computeChildRowPosition = function(t, e) {
            var r, o, n, i, s, l;
            if (this.orderSpecs.length)
                for (s = e.children, o = n = 0, i = s.length; i > n; o = ++n)
                    if (l = s[o], r = this.compareResources(l.resource || {}, t.resource || {}), r > 0) return o;
            return null
        }, r.prototype.compareResources = function(t, e) {
            return X(t, e, this.orderSpecs)
        }, r.prototype.ensureResourceGroup = function(t, e, r) {
            var o, n, i, s, l, u, h, a, c, p, f;
            if (i = (t.resource || {})[r.field], n = null, r.order)
                for (c = e.children, s = l = 0, h = c.length; h > l; s = ++l) {
                    if (f = c[s], o = it(f.groupValue, i) * r.order, 0 === o) {
                        n = f;
                        break
                    }
                    if (o > 0) break
                } else
                    for (p = e.children, s = u = 0, a = p.length; a > u; s = ++u)
                        if (f = p[s], f.groupValue === i) {
                            n = f;
                            break
                        }
            return n || (n = this.isVGrouping ? new j(this, r, i) : new d(this, r, i), e.addChild(n, s)), n
        }, r.prototype.pairSegsWithRows = function(t) {
            var e, r, o, n, i, s, l, u;
            for (n = [], i = {}, e = 0, r = t.length; r > e; e++) u = t[e], s = u.resourceId, s && (l = this.getResourceRow(s), l && (o = i[s], o || (o = [l, []], n.push(o), i[s] = o), o[1].push(u)));
            return n
        }, r.prototype.rowAdded = function(t) {
            var e, r;
            return t instanceof D && (this.resourceRowHash[t.resource.id] = t), r = this.isNesting, e = Boolean(this.nestingCnt += t.depth ? 1 : 0), r !== e && (this.el.toggleClass("fc-nested", e), this.el.toggleClass("fc-flat", !e)), this.isNesting = e
        }, r.prototype.rowRemoved = function(t) {
            var e, r;
            return t instanceof D && delete this.resourceRowHash[t.resource.id], r = this.isNesting, e = Boolean(this.nestingCnt -= t.depth ? 1 : 0), r !== e && (this.el.toggleClass("fc-nested", e), this.el.toggleClass("fc-flat", !e)), this.isNesting = e
        }, r.prototype.batchRowDepth = 0, r.prototype.shownRowBatch = null, r.prototype.hiddenRowBatch = null, r.prototype.batchRows = function() {
            return this.batchRowDepth++ ? void 0 : (this.shownRowBatch = [], this.hiddenRowBatch = [])
        }, r.prototype.unbatchRows = function() {
            return --this.batchRowDepth ? void 0 : (this.hiddenRowBatch.length && this.rowsHidden(this.hiddenRowBatch), this.shownRowBatch.length && this.rowsShown(this.shownRowBatch), this.hiddenRowBatch = null, this.shownRowBatch = null)
        }, r.prototype.rowShown = function(t) {
            return this.shownRowBatch ? this.shownRowBatch.push(t) : this.rowsShown([t])
        }, r.prototype.rowHidden = function(t) {
            return this.hiddenRowBatch ? this.hiddenRowBatch.push(t) : this.rowsHidden([t])
        }, r.prototype.rowsShown = function(t) {
            return this.syncRowHeights(t), this.updateWidth()
        }, r.prototype.rowsHidden = function(t) {
            return this.updateWidth()
        }, r.prototype.tbodyHash = null, r.prototype.renderStoredResources = function() {
            return this.tbodyHash = {
                spreadsheet: this.resourceGrid.tbodyEl,
                event: this.timeGrid.tbodyEl
            }, this.batchRows(), this.rowHierarchy.show(), this.unbatchRows(), this.reinitializeCellFollowers()
        }, r.prototype.unrenderStoredResources = function() {
            return this.batchRows(), this.rowHierarchy.recursivelyUnrender(), this.unbatchRows(), this.reinitializeCellFollowers()
        }, r.prototype.syncRowHeights = function(t, e) {
            var r, o, n, i, s, l, u, h, a, c;
            for (null == e && (e = !1), null == t && (t = this.getVisibleRows()), l = 0, h = t.length; h > l; l++) c = t[l], c.setTrInnerHeight("");
            for (s = function() {
                    var o, n, i;
                    for (i = [], o = 0, n = t.length; n > o; o++) c = t[o], r = c.getMaxTrInnerHeight(), e && (r += r % 2), i.push(r);
                    return i
                }(), i = u = 0, a = t.length; a > u; i = ++u) c = t[i], c.setTrInnerHeight(s[i]);
            return !e && (o = this.resourceGrid.tbodyEl.height(), n = this.timeGrid.tbodyEl.height(), Math.abs(o - n) > 1) ? this.syncRowHeights(t, !0) : void 0
        }, r.prototype.getVisibleRows = function() {
            var t, e, r, o, n;
            for (r = this.rowHierarchy.getRows(), o = [], t = 0, e = r.length; e > t; t++) n = r[t], n.isShown && o.push(n);
            return o
        }, r.prototype.getEventRows = function() {
            var t, e, r, o, n;
            for (r = this.rowHierarchy.getRows(), o = [], t = 0, e = r.length; e > t; t++) n = r[t], n instanceof a && o.push(n);
            return o
        }, r.prototype.getResourceRow = function(t) {
            return this.resourceRowHash[t]
        }, r.prototype.setScroll = function(t) {
            return r.__super__.setScroll.apply(this, arguments), this.resourceGrid.bodyScroller.scrollTop(t.top)
        }, r
    }(V), I = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.mixin(_), r.prototype.eventRows = null, r.prototype.shownEventRows = null, r.prototype.tbodyEl = null, r.prototype.rowCoordCache = null, r.prototype.spanToSegs = function(t) {
            var e, o, n, i, s;
            if (s = r.__super__.spanToSegs.apply(this, arguments), n = t.resourceId)
                for (e = 0, o = s.length; o > e; e++) i = s[e], i.resourceId = n;
            return s
        }, r.prototype.prepareHits = function() {
            var t, e;
            return r.__super__.prepareHits.apply(this, arguments), this.eventRows = this.view.getEventRows(), this.shownEventRows = function() {
                var e, r, o, n;
                for (o = this.eventRows, n = [], e = 0, r = o.length; r > e; e++) t = o[e], t.isShown && n.push(t);
                return n
            }.call(this), e = function() {
                var e, r, o, n;
                for (o = this.shownEventRows, n = [], e = 0, r = o.length; r > e; e++) t = o[e], n.push(t.getTr("event")[0]);
                return n
            }.call(this), this.rowCoordCache = new s({
                els: e,
                isVertical: !0
            }), this.rowCoordCache.build()
        }, r.prototype.releaseHits = function() {
            return r.__super__.releaseHits.apply(this, arguments), this.eventRows = null, this.shownEventRows = null, this.rowCoordCache.clear()
        }, r.prototype.queryHit = function(t, e) {
            var o, n;
            return n = r.__super__.queryHit.apply(this, arguments), n && (o = this.rowCoordCache.getVerticalIndex(e), null != o) ? {
                resourceId: this.shownEventRows[o].resource.id,
                snap: n.snap,
                component: this,
                left: n.left,
                right: n.right,
                top: this.rowCoordCache.getTopOffset(o),
                bottom: this.rowCoordCache.getBottomOffset(o)
            } : void 0
        }, r.prototype.getHitSpan = function(t) {
            var e;
            return e = this.getSnapRange(t.snap), e.resourceId = t.resourceId, e
        }, r.prototype.getHitEl = function(t) {
            return this.getSnapEl(t.snap)
        }, r.prototype.renderSkeleton = function() {
            var e;
            return r.__super__.renderSkeleton.apply(this, arguments), this.segContainerEl.remove(), this.segContainerEl = null, e = t('<div class="fc-rows"><table><tbody/></table></div>').appendTo(this.bodyScroller.contentEl), this.tbodyEl = e.find("tbody")
        }, r.prototype.renderFgSegs = function(t) {
            var e, r, o, n, i, s, l;
            for (t = this.renderFgSegEls(t), s = this.view.pairSegsWithRows(t), l = [], o = 0, n = s.length; n > o; o++) i = s[o], e = i[0], r = i[1], e.fgSegs = r, e.isShown && (e.isSegsRendered = !0, l.push(i));
            return this.renderFgSegsInContainers(l), this.updateSegFollowers(t), t
        }, r.prototype.unrenderFgSegs = function() {
            var t, e, r, o;
            for (this.clearSegFollowers(), e = this.view.getEventRows(), r = 0, o = e.length; o > r; r++) t = e[r], t.fgSegs = null, t.isSegsRendered = !1;
            return this.unrenderFgContainers(e)
        }, r.prototype.renderFill = function(t, e, r) {
            var o, n, i, s, l, u, h, a, c, p, d, f;
            for (e = this.renderFillSegEls(t, e), a = [], l = [], o = 0, i = e.length; i > o; o++) d = e[o], d.resourceId ? a.push(d) : l.push(d);
            for (h = this.view.pairSegsWithRows(a), f = [], n = 0, s = h.length; s > n; n++) u = h[n], c = u[0], p = u[1], "bgEvent" === t && (c.bgSegs = p), c.isShown && f.push(u);
            return l.length && f.unshift([this, l]), this.renderFillInContainers(t, f, r), e
        }, r.prototype.renderHelper = function(t, e) {
            var r, o;
            return o = this.eventToSegs(t), o = this.renderFgSegEls(o), r = this.view.pairSegsWithRows(o), this.renderHelperSegsInContainers(r, e)
        }, r.prototype.computeInitialScroll = function(t) {
            var e;
            return e = r.__super__.computeInitialScroll.apply(this, arguments), t && (e.resourceId = t.resourceId, e.bottom = t.bottom), e
        }, r.prototype.queryScroll = function() {
            var t, e, o, n, i, s, l, u;
            for (u = r.__super__.queryScroll.apply(this, arguments), l = this.bodyScroller.scrollEl.offset().top, i = this.view.getVisibleRows(), o = 0, n = i.length; n > o; o++)
                if (s = i[o], s.resource && (t = s.getTr("event"), e = t.offset().top + t.outerHeight(), e > l)) {
                    u.resourceId = s.resource.id, u.bottom = e - l;
                    break
                }
            return u
        }, r.prototype.setScroll = function(t) {
            var e, o, n, i;
            return t.resourceId && (i = this.view.getResourceRow(t.resourceId), i && (e = i.getTr("event"), e && (n = this.bodyScroller.innerEl.offset().top, o = e.offset().top + e.outerHeight(), t.top = o - t.bottom - n))), r.__super__.setScroll.call(this, t)
        }, r.prototype.scrollToResource = function(t) {
            var e, r, o, n;
            return o = this.view.getResourceRow(t.id), o && (e = o.getTr("event")) ? (r = this.bodyScroller.innerEl.offset().top, n = e.offset().top - r, this.bodyScroller.scrollEl.scrollTop(n)) : void 0
        }, r
    }(O), r = 30, A = function() {
        function e(t) {
            var e;
            this.view = t, this.isRTL = this.view.opt("isRTL"), this.givenColWidths = this.colWidths = function() {
                var t, r, o, n;
                for (o = this.view.colSpecs, n = [], t = 0, r = o.length; r > t; t++) e = o[t], n.push(e.width);
                return n
            }.call(this)
        }
        return e.prototype.view = null, e.prototype.headEl = null, e.prototype.el = null, e.prototype.tbodyEl = null, e.prototype.headScroller = null, e.prototype.bodyScroller = null, e.prototype.joiner = null, e.prototype.colGroupHtml = "", e.prototype.headTable = null, e.prototype.headColEls = null, e.prototype.headCellEls = null, e.prototype.bodyColEls = null, e.prototype.bodyTable = null, e.prototype.renderSkeleton = function() {
            return this.headScroller = new P("invisible-scroll", "hidden"), this.headScroller.contentEl.html(this.renderHeadHtml()), this.headEl.append(this.headScroller.el), this.bodyScroller = new P("auto", "invisible-scroll"), this.bodyScroller.contentEl.html("<table>" + this.colGroupHtml + "<tbody/></table>"), this.tbodyEl = this.bodyScroller.contentEl.find("tbody"), this.el.append(this.bodyScroller.el), this.joiner = new z("horizontal", [this.headScroller, this.bodyScroller]), this.headTable = this.headEl.find("table"), this.headColEls = this.headEl.find("col"), this.headCellEls = this.headScroller.contentEl.find("tr:last-child th"), this.bodyColEls = this.el.find("col"), this.bodyTable = this.el.find("table"), this.colMinWidths = this.computeColMinWidths(), this.applyColWidths(), this.initColResizing()
        }, e.prototype.renderHeadHtml = function() {
            var t, e, r, o, n, i, s, l, u, h, a;
            for (e = this.view.colSpecs, r = "<table>", t = "<colgroup>", s = 0, u = e.length; u > s; s++) a = e[s], t += a.isMain ? '<col class="fc-main-col"/>' : "<col/>";
            for (t += "</colgroup>", this.colGroupHtml = t, r += t, r += "<tbody>", this.view.superHeaderText && (r += '<tr class="fc-super"><th class="' + this.view.widgetHeaderClass + '" colspan="' + e.length + '"><div class="fc-cell-content"><span class="fc-cell-text">' + dt(this.view.superHeaderText) + "</span></div></th></tr>"), r += "<tr>", i = !0, o = l = 0, h = e.length; h > l; o = ++l) a = e[o], n = o === e.length - 1, r += '<th class="' + this.view.widgetHeaderClass + '"><div><div class="fc-cell-content">' + (a.isMain ? '<div class="fc-icon fc-expander-space" />' : "") + '<span class="fc-cell-text">' + dt(a.labelText || "") + "</span></div>" + (n ? "" : '<div class="fc-col-resizer"></div>') + "</div></th>";
            return r += "</tr>", r += "</tbody></table>"
        }, e.prototype.givenColWidths = null, e.prototype.colWidths = null, e.prototype.colMinWidths = null, e.prototype.tableWidth = null, e.prototype.tableMinWidth = null, e.prototype.initColResizing = function() {
            return this.headEl.find("th .fc-col-resizer").each(function(e) {
                return function(r, o) {
                    return o = t(o), o.on("mousedown", function(t) {
                        return e.colResizeMousedown(r, t, o)
                    })
                }
            }(this))
        }, e.prototype.colResizeMousedown = function(t, e, o) {
            var n, i, s, l;
            return n = this.colWidths = this.queryColWidths(), n.pop(), n.push("auto"), l = n[t], s = Math.min(this.colMinWidths[t], r), i = new u({
                dragStart: function(t) {
                    return function() {
                        return o.addClass("fc-active")
                    }
                }(this),
                drag: function(e) {
                    return function(r, o) {
                        var i;
                        return i = l + (e.isRTL ? -r : r), i = Math.max(i, s), n[t] = i, e.applyColWidths()
                    }
                }(this),
                dragStop: function(t) {
                    return function() {
                        return o.removeClass("fc-active")
                    }
                }(this)
            }), i.mousedown(e)
        }, e.prototype.applyColWidths = function() {
            var t, e, r, o, n, i, s, l, u, h, a, c, p, d, f, g, y;
            for (r = this.colMinWidths, n = this.colWidths, t = !0, e = !1, y = 0, h = 0, p = n.length; p > h; h++) o = n[h], "number" == typeof o ? y += o : (t = !1, o && (e = !0));
            for (l = e ? "auto" : "", s = function() {
                    var t, e, r;
                    for (r = [], u = t = 0, e = n.length; e > t; u = ++t) o = n[u], r.push(null != o ? o : l);
                    return r
                }(), g = 0, u = a = 0, d = s.length; d > a; u = ++a) i = s[u], g += "number" == typeof i ? i : r[u];
            for (u = c = 0, f = s.length; f > c; u = ++c) i = s[u], this.headColEls.eq(u).width(i), this.bodyColEls.eq(u).width(i);
            return this.headScroller.setContentMinWidth(g), this.bodyScroller.setContentMinWidth(g), this.tableMinWidth = g, this.tableWidth = t ? y : void 0
        }, e.prototype.computeColMinWidths = function() {
            var t, e, o, n, i, s;
            for (n = this.givenColWidths, i = [], t = e = 0, o = n.length; o > e; t = ++e) s = n[t], i.push("number" == typeof s ? s : parseInt(this.headColEls.eq(t).css("min-width")) || r);
            return i
        }, e.prototype.queryColWidths = function() {
            var e, r, o, n, i;
            for (n = this.headCellEls, i = [], e = 0, r = n.length; r > e; e++) o = n[e], i.push(t(o).outerWidth());
            return i
        }, e.prototype.updateWidth = function() {
            return this.headScroller.update(), this.bodyScroller.update(), this.joiner.update(), this.follower ? this.follower.update() : void 0
        }, e.prototype.headHeight = function() {
            var t;
            return t = this.headScroller.contentEl.find("table"), t.height.apply(t, arguments)
        }, e
    }(), M = function() {
        function e(e) {
            this.view = e, this.children = [], this.trHash = {}, this.trs = t()
        }
        return e.prototype.view = null, e.prototype.parent = null, e.prototype.prevSibling = null, e.prototype.children = null, e.prototype.depth = 0, e.prototype.hasOwnRow = !1, e.prototype.trHash = null, e.prototype.trs = null, e.prototype.isRendered = !1, e.prototype.isExpanded = !0, e.prototype.isShown = !1, e.prototype.addChild = function(t, e) {
            var r, o, n, i, s;
            for (t.remove(), r = this.children, null != e ? r.splice(e, 0, t) : (e = r.length, r.push(t)), t.prevSibling = e > 0 ? r[e - 1] : null, e < r.length - 1 && (r[e + 1].prevSibling = t), t.parent = this, t.depth = this.depth + (this.hasOwnRow ? 1 : 0), s = t.getNodes(), o = 0, n = s.length; n > o; o++) i = s[o], i.added();
            return this.isShown && this.isExpanded ? t.show() : void 0
        }, e.prototype.removeChild = function(t) {
            var e, r, o, n, i, s, l, u, h, a;
            for (e = this.children, o = !1, r = n = 0, s = e.length; s > n; r = ++n)
                if (a = e[r], a === t) {
                    o = !0;
                    break
                }
            if (o) {
                for (r < e.length - 1 && (e[r + 1].prevSibling = t.prevSibling), e.splice(r, 1), t.recursivelyUnrender(), u = t.getNodes(), i = 0, l = u.length; l > i; i++) h = u[i], h.removed();
                return t.parent = null, t.prevSibling = null, t
            }
            return !1
        }, e.prototype.removeChildren = function() {
            var t, e, r, o, n, i, s;
            for (i = this.children, e = 0, o = i.length; o > e; e++) t = i[e], t.recursivelyUnrender();
            for (s = this.getDescendants(), r = 0, n = s.length; n > r; r++) t = s[r], t.removed();
            return this.children = []
        }, e.prototype.remove = function() {
            return this.parent ? this.parent.removeChild(this) : void 0
        }, e.prototype.getLastChild = function() {
            var t;
            return t = this.children, t[t.length - 1]
        }, e.prototype.getPrevRow = function() {
            var t, e;
            for (e = this; e;) {
                if (e.prevSibling)
                    for (e = e.prevSibling; t = e.getLastChild();) e = t;
                else e = e.parent;
                if (e && e.hasOwnRow && e.isShown) return e
            }
            return null
        }, e.prototype.getLeadingRow = function() {
            return this.hasOwnRow ? this : this.isExpanded && this.children.length ? this.children[0].getLeadingRow() : void 0
        }, e.prototype.getRows = function(t) {
            var e, r, o, n;
            for (null == t && (t = []), this.hasOwnRow && t.push(this), n = this.children, r = 0, o = n.length; o > r; r++) e = n[r], e.getRows(t);
            return t
        }, e.prototype.getNodes = function(t) {
            var e, r, o, n;
            for (null == t && (t = []), t.push(this), n = this.children, r = 0, o = n.length; o > r; r++) e = n[r], e.getNodes(t);
            return t
        }, e.prototype.getDescendants = function() {
            var t, e, r, o, n;
            for (t = [], n = this.children, r = 0, o = n.length; o > r; r++) e = n[r], e.getNodes(t);
            return t
        }, e.prototype.render = function() {
            var e, r, o, n, i, s, l;
            if (this.trHash = {}, s = [], this.hasOwnRow) {
                e = this.getPrevRow(), r = this.view.tbodyHash;
                for (l in r) n = r[l], i = t("<tr/>"), this.trHash[l] = i, s.push(i[0]), o = "render" + U(l) + "Content", this[o] && this[o](i), e ? e.trHash[l].after(i) : n.prepend(i)
            }
            return this.trs = t(s).on("click", ".fc-expander", Et(this, "toggleExpanded")), this.isRendered = !0
        }, e.prototype.unrender = function() {
            var e, r, o, n;
            if (this.isRendered) {
                e = this.trHash;
                for (o in e) r = e[o], n = "unrender" + U(o) + "Content", this[n] && this[n](r);
                return this.trHash = {}, this.trs.remove(), this.trs = t(), this.isRendered = !1, this.isShown = !1, this.hidden()
            }
        }, e.prototype.recursivelyUnrender = function() {
            var t, e, r, o, n;
            for (this.unrender(), o = this.children, n = [], e = 0, r = o.length; r > e; e++) t = o[e], n.push(t.recursivelyUnrender());
            return n
        }, e.prototype.getTr = function(t) {
            return this.trHash[t]
        }, e.prototype.show = function() {
            var t, e, r, o, n;
            if (!this.isShown && (this.isRendered ? this.trs.css("display", "") : this.render(), this.ensureSegsRendered && this.ensureSegsRendered(), this.isExpanded ? this.indicateExpanded() : this.indicateCollapsed(), this.isShown = !0, this.shown(), this.isExpanded)) {
                for (o = this.children, n = [], e = 0, r = o.length; r > e; e++) t = o[e], n.push(t.show());
                return n
            }
        }, e.prototype.hide = function() {
            var t, e, r, o, n;
            if (this.isShown && (this.isRendered && this.trs.hide(), this.isShown = !1, this.hidden(), this.isExpanded)) {
                for (o = this.children, n = [], e = 0, r = o.length; r > e; e++) t = o[e], n.push(t.hide());
                return n
            }
        }, e.prototype.expand = function() {
            var t, e, r, o;
            if (!this.isExpanded) {
                for (this.isExpanded = !0, this.indicateExpanded(), this.view.batchRows(), o = this.children, e = 0, r = o.length; r > e; e++) t = o[e], t.show();
                return this.view.unbatchRows(), this.animateExpand()
            }
        }, e.prototype.collapse = function() {
            var t, e, r, o;
            if (this.isExpanded) {
                for (this.isExpanded = !1, this.indicateCollapsed(), this.view.batchRows(), o = this.children, e = 0, r = o.length; r > e; e++) t = o[e], t.hide();
                return this.view.unbatchRows()
            }
        }, e.prototype.toggleExpanded = function() {
            return this.isExpanded ? this.collapse() : this.expand()
        }, e.prototype.indicateExpanded = function() {
            return this.trs.find(".fc-expander").removeClass(this.getCollapsedIcon()).addClass(this.getExpandedIcon())
        }, e.prototype.indicateCollapsed = function() {
            return this.trs.find(".fc-expander").removeClass(this.getExpandedIcon()).addClass(this.getCollapsedIcon())
        }, e.prototype.enableExpanding = function() {
            return this.trs.find(".fc-expander-space").addClass("fc-expander")
        }, e.prototype.disableExpanding = function() {
            return this.trs.find(".fc-expander-space").removeClass("fc-expander").removeClass(this.getExpandedIcon()).removeClass(this.getCollapsedIcon())
        }, e.prototype.getExpandedIcon = function() {
            return "fc-icon-down-triangle"
        }, e.prototype.getCollapsedIcon = function() {
            var t;
            return t = this.view.isRTL ? "left" : "right", "fc-icon-" + t + "-triangle"
        }, e.prototype.animateExpand = function() {
            var t, e, r;
            return r = null != (t = this.children[0]) && null != (e = t.getLeadingRow()) ? e.trs : void 0, r ? (r.addClass("fc-collapsed"), setTimeout(function() {
                return r.addClass("fc-transitioning"), r.removeClass("fc-collapsed")
            }), r.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                return r.removeClass("fc-transitioning")
            })) : void 0
        }, e.prototype.getMaxTrInnerHeight = function() {
            var e;
            return e = 0, t.each(this.trHash, function(t) {
                return function(t, r) {
                    var o;
                    return o = st(r).find("> div"), e = Math.max(o.height(), e)
                }
            }(this)), e
        }, e.prototype.setTrInnerHeight = function(t) {
            return st(this.trs).find("> div").height(t)
        }, e.prototype.shown = function() {
            return this.hasOwnRow ? this.rowShown(this) : void 0
        }, e.prototype.hidden = function() {
            return this.hasOwnRow ? this.rowHidden(this) : void 0
        }, e.prototype.rowShown = function(t) {
            return (this.parent || this.view).rowShown(t)
        }, e.prototype.rowHidden = function(t) {
            return (this.parent || this.view).rowHidden(t)
        }, e.prototype.added = function() {
            return this.hasOwnRow ? this.rowAdded(this) : void 0
        }, e.prototype.removed = function() {
            return this.hasOwnRow ? this.rowRemoved(this) : void 0
        }, e.prototype.rowAdded = function(t) {
            return (this.parent || this.view).rowAdded(t)
        }, e.prototype.rowRemoved = function(t) {
            return (this.parent || this.view).rowRemoved(t)
        }, e
    }(), W = function(e) {
        function r(t, e, o) {
            this.groupSpec = e, this.groupValue = o, r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.prototype.groupSpec = null, r.prototype.groupValue = null, r.prototype.rowRemoved = function(t) {
            return r.__super__.rowRemoved.apply(this, arguments), t === this || this.children.length ? void 0 : this.remove()
        }, r.prototype.renderGroupContentEl = function() {
            var e, r;
            return e = t('<div class="fc-cell-content" />').append(this.renderGroupTextEl()), r = this.groupSpec.render, "function" == typeof r && (e = r(e, this.groupValue) || e), e
        }, r.prototype.renderGroupTextEl = function() {
            var e, r;
            return r = this.groupValue || "", e = this.groupSpec.text, "function" == typeof e && (r = e(r) || r), t('<span class="fc-cell-text" />').text(r)
        }, r
    }(M), d = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.prototype.hasOwnRow = !0, r.prototype.renderSpreadsheetContent = function(e) {
            var r;
            return r = this.renderGroupContentEl(), r.prepend('<span class="fc-icon fc-expander" />'), t('<td class="fc-divider" />').attr("colspan", this.view.colSpecs.length).append(t("<div/>").append(r)).appendTo(e)
        }, r.prototype.renderEventContent = function(t) {
            return t.append('<td class="fc-divider"> <div/> </td>')
        }, r
    }(W), j = function(e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.prototype.rowspan = 0, r.prototype.leadingTr = null, r.prototype.groupTd = null, r.prototype.rowShown = function(t) {
            return this.rowspan += 1, this.renderRowspan(), r.__super__.rowShown.apply(this, arguments)
        }, r.prototype.rowHidden = function(t) {
            return this.rowspan -= 1, this.renderRowspan(), r.__super__.rowHidden.apply(this, arguments)
        }, r.prototype.renderRowspan = function() {
            var e;
            return this.rowspan ? (this.groupTd || (this.groupTd = t('<td class="' + this.view.widgetContentClass + '"/>').append(this.renderGroupContentEl())), this.groupTd.attr("rowspan", this.rowspan), e = this.getLeadingRow().getTr("spreadsheet"), e !== this.leadingTr ? (e && e.prepend(this.groupTd), this.leadingTr = e) : void 0) : (this.groupTd && (this.groupTd.remove(), this.groupTd = null), this.leadingTr = null)
        }, r
    }(W), a = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.prototype.hasOwnRow = !0, e.prototype.segContainerEl = null, e.prototype.segContainerHeight = null, e.prototype.innerEl = null, e.prototype.bgSegContainerEl = null, e.prototype.isSegsRendered = !1, e.prototype.bgSegs = null, e.prototype.fgSegs = null, e.prototype.renderEventContent = function(t) {
            return t.html('<td class="' + this.view.widgetContentClass + '"> <div> <div class="fc-event-container" /> </div> </td>'), this.segContainerEl = t.find(".fc-event-container"), this.innerEl = this.bgSegContainerEl = t.find("td > div"), this.ensureSegsRendered()
        }, e.prototype.ensureSegsRendered = function() {
            return this.isSegsRendered ? void 0 : (this.bgSegs && this.view.timeGrid.renderFillInContainer("bgEvent", this, this.bgSegs), this.fgSegs && this.view.timeGrid.renderFgSegsInContainers([
                [this, this.fgSegs]
            ]), this.isSegsRendered = !0)
        }, e.prototype.unrenderEventContent = function() {
            return this.bgSegs = null, this.fgSegs = null, this.isSegsRendered = !1
        }, e
    }(M), D = function(e) {
        function r(t, e) {
            this.resource = e, r.__super__.constructor.apply(this, arguments)
        }
        return Mt(r, e), r.prototype.resource = null, r.prototype.rowAdded = function(t) {
            return r.__super__.rowAdded.apply(this, arguments), t !== this && this.isRendered && 1 === this.children.length ? (this.enableExpanding(), this.isExpanded ? this.indicateExpanded() : this.indicateCollapsed()) : void 0
        }, r.prototype.rowRemoved = function(t) {
            return r.__super__.rowRemoved.apply(this, arguments), t !== this && this.isRendered && !this.children.length ? this.disableExpanding() : void 0
        }, r.prototype.render = function() {
            return r.__super__.render.apply(this, arguments), this.children.length > 0 ? this.enableExpanding() : this.disableExpanding(), this.view.trigger("resourceRender", this.resource, this.resource, this.getTr("spreadsheet").find("> td"), this.getTr("event").find("> td"))
        }, r.prototype.renderSpreadsheetContent = function(e) {
            var r, o, n, i, s, l, u, h, a, c;
            for (u = this.resource, l = this.view.colSpecs, h = [], i = 0, s = l.length; s > i; i++) r = l[i], r.group || (n = r.field ? u[r.field] || null : u, c = "function" == typeof r.text ? r.text(u, n) : n, o = t('<div class="fc-cell-content">' + (r.isMain ? this.renderGutterHtml() : "") + '<span class="fc-cell-text">' + (c ? dt(c) : "&nbsp;") + "</span></div>"), "function" == typeof r.render && (o = r.render(u, o, n) || o), a = t('<td class="' + this.view.widgetContentClass + '"/>').append(o), r.isMain && a.wrapInner("<div/>"), h.push(e.append(a)));
            return h
        }, r.prototype.renderGutterHtml = function() {
            var t, e, r, o;
            for (t = "", e = r = 0, o = this.depth; o > r; e = r += 1) t += '<span class="fc-icon"/>';
            return t += '<span class="fc-icon fc-expander-space"/>'
        }, r
    }(a), c.views.timeline.resourceClass = F, S = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.mixin(G), e.prototype.timeGridClass = x, e.prototype.dayGridClass = C, e.prototype.renderHead = function() {
            return e.__super__.renderHead.apply(this, arguments), this.timeGrid.processHeadResourceEls(this.headContainerEl)
        }, e.prototype.setResources = function(t) {
            return this.timeGrid.setResources(t), this.dayGrid ? this.dayGrid.setResources(t) : void 0
        }, e.prototype.unsetResources = function() {
            return this.timeGrid.unsetResources(), this.dayGrid ? this.dayGrid.unsetResources() : void 0
        }, e.prototype.renderStoredResources = function() {
            return this.redisplay()
        }, e.prototype.unrenderStoredResources = function() {
            return this.redisplay()
        }, e
    }(c.AgendaView), c.views.agenda.queryResourceClass = function(t) {
        var e;
        return (null != (e = t.options.groupByResource || t.options.groupByDateAndResource) ? e : 1 === t.duration.as("days")) ? S : void 0
    }, b = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.mixin(G), e.prototype.dayGridClass = C, e.prototype.renderHead = function() {
            return e.__super__.renderHead.apply(this, arguments), this.dayGrid.processHeadResourceEls(this.headContainerEl)
        }, e.prototype.setResources = function(t) {
            return this.dayGrid.setResources(t)
        }, e.prototype.unsetResources = function() {
            return this.dayGrid.unsetResources()
        }, e.prototype.renderStoredResources = function() {
            return this.redisplay()
        }, e.prototype.unrenderStoredResources = function() {
            return this.redisplay()
        }, e
    }(c.BasicView), T = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Mt(e, t), e.mixin(G), e.prototype.dayGridClass = C, e.prototype.renderHead = function() {
            return e.__super__.renderHead.apply(this, arguments), this.dayGrid.processHeadResourceEls(this.headContainerEl)
        }, e.prototype.setResources = function(t) {
            return this.dayGrid.setResources(t)
        }, e.prototype.unsetResources = function() {
            return this.dayGrid.unsetResources()
        }, e.prototype.renderStoredResources = function() {
            return this.isSkeletonRendered ? (this.renderDates(), this.updateSize()) : void 0
        }, e.prototype.unrenderStoredResources = function() {
            return this.isSkeletonRendered ? (this.renderDates(), this.updateSize()) : void 0
        }, e
    }(c.MonthView), c.views.basic.queryResourceClass = function(t) {
        var e;
        return (null != (e = t.options.groupByResource || t.options.groupByDateAndResource) ? e : 1 === t.duration.as("days")) ? b : void 0
    }, c.views.month.queryResourceClass = function(t) {
        return t.options.groupByResource || t.options.groupByDateAndResource ? T : void 0
    }, R = "2015-11-30", q = {
        years: 1,
        weeks: 1
    }, f = "http://fullcalendar.io/scheduler/license/", w = ["GPL-My-Project-Is-Open-Source", "CC-Attribution-NonCommercial-NoDerivatives"], Ct = function(t, e) {
        return true ? void 0 : _t('Please use a valid license key. <a href="' + f + '">More Info</a>', e)
    }, mt = function(r) {
        var o, n, i, s;
        return -1 !== t.inArray(r, w) ? !0 : (n = (r || "").match(/^(\d+)\-fcs\-(\d+)$/), n && 10 === n[1].length && (i = e.utc(1e3 * parseInt(n[2])), s = e.utc(c.mockSchedulerReleaseDate || R), s.isValid() && (o = s.clone().subtract(q), i.isAfter(o))) ? !0 : !1)
    }, yt = function(t) {
        return Boolean(t.match(/\w+\:\/\/fullcalendar\.io\/|\/demos\/[\w-]+\.html$/))
    }, void(_t = function(e, r) {
        return r.append(t('<div class="fc-license-message" />').html(e))
    }))
});
