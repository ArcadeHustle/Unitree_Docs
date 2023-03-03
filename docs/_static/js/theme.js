require = function a(i, o, s) {
    function l(t, e) {
        if (!o[t]) {
            if (!i[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (r) return r(t, !0);
                throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
            }
            n = o[t] = {
                exports: {}
            }, i[t][0].call(n.exports, function (e) {
                return l(i[t][1][e] || e)
            }, n, n.exports, a, i, o, s)
        }
        return o[t].exports
    }
    for (var r = "function" == typeof require && require, e = 0; e < s.length; e++) l(s[e]);
    return l
}({
    1: [function (e, t, n) {
        window.utilities = {
            scrollTop: function () {
                return document.documentElement.scrollTop || document.body.scrollTop
            },
            getVisibleFooterHeight: function () {
                var e = document.getElementById("lightning-ai-footer");
                return e ? (e = e.getBoundingClientRect(), Math.max(utilities.windowHeight() - e.y, 0)) : 0
            },
            throttle: function (n, i, o) {
                var s, l, a, r = null,
                    c = 0,
                    d = (o = o || {}, function () {
                        c = !1 === o.leading ? 0 : Date.now(), r = null, a = n.apply(s, l), r || (s = l = null)
                    });
                return function () {
                    var e = Date.now(),
                        t = (c || !1 !== o.leading || (c = e), i - (e - c));
                    return s = this, l = arguments, t <= 0 || i < t ? (r && (clearTimeout(r), r = null), c = e, a = n.apply(s, l), r || (s = l = null)) : r || !1 === o.trailing || (r = setTimeout(d, t)), a
                }
            },
            closest: function (e, t) {
                var n, i;
                for (["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function (e) {
                    return "function" == typeof document.body[e] && (n = e, !0)
                }); e;) {
                    if ((i = e.parentElement) && i[n](t)) return i;
                    e = i
                }
                return null
            },
            offset: function (e) {
                return e && ((rect = e.getBoundingClientRect()).width || rect.height || e.getClientRects().length) ? (e = e.ownerDocument.documentElement, {
                    top: rect.top + window.pageYOffset - e.clientTop,
                    left: rect.left + window.pageXOffset - e.clientLeft
                }) : void 0
            },
            headersHeight: function () {
                return document.getElementById("pytorch-left-menu").classList.contains("make-fixed") ? document.getElementById("pytorch-page-level-bar").offsetHeight : document.getElementById("header-holder").offsetHeight + document.getElementById("pytorch-page-level-bar").offsetHeight
            },
            windowHeight: function () {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        }
    }, {}],
    2: [function (e, t, n) {
        var i = {
            init: function () {
                i.bind(), i.cookieExists() || (i.setCookie(), i.showCookieNotice())
            },
            bind: function () {
                $(".close-button").on("click", i.hideCookieNotice)
            },
            cookieExists: function () {
                return !!localStorage.getItem("returningPytorchUser")
            },
            setCookie: function () {
                localStorage.setItem("returningPytorchUser", !0)
            },
            showCookieNotice: function () {
                $(".cookie-banner-wrapper").addClass("is-visible")
            },
            hideCookieNotice: function () {
                $(".cookie-banner-wrapper").removeClass("is-visible")
            }
        };
        $(function () {
            i.init()
        })
    }, {}],
    3: [function (e, t, n) {
        window.filterTags = {
            bind: function () {
                var e = new List("tutorial-cards", {
                    valueNames: [{
                        data: ["tags"]
                    }],
                    page: "6",
                    pagination: !0
                });

                function t() {
                    var n = [];
                    $(".selected").each(function () {
                        n.push($(this).data("tag"))
                    }), e.filter(function (e) {
                        var t, e = null == e.values().tags ? [""] : e.values().tags.split(",");
                        return 0 == n.length || (t = e, n.every(function (e) {
                            return -1 < t.indexOf(e)
                        }))
                    })
                }
                $(".filter-btn").on("click", function () {
                    "all" == $(this).data("tag") ? ($(this).addClass("all-tag-selected"), $(".filter").removeClass("selected")) : ($(this).toggleClass("selected"), $("[data-tag='all']").removeClass("all-tag-selected")), $(".selected")[0] || $("[data-tag='all']").addClass("all-tag-selected"), t()
                })
            }
        }
    }, {}],
    4: [function (e, t, n) {
        window.highlightNavigation = {
            navigationListItems: document.querySelectorAll("#pytorch-right-menu li"),
            sections: document.querySelectorAll(".pytorch-article .section"),
            sectionIdTonavigationLink: {},
            bind: function () {
                if (sideMenus.displayRightMenu) {
                    for (var e = 0; e < highlightNavigation.sections.length; e++) {
                        var t = highlightNavigation.sections[e].id;
                        highlightNavigation.sectionIdTonavigationLink[t] = document.querySelectorAll('#pytorch-right-menu li a[href="#' + t + '"]')[0]
                    }
                    $(window).scroll(utilities.throttle(highlightNavigation.highlight, 100))
                }
            },
            highlight: function () {
                var e = document.getElementById("pytorch-right-menu");
                if (0 !== e.offsetWidth || 0 !== e.offsetHeight)
                    for (var t = utilities.scrollTop(), n = document.getElementById("header-holder").offsetHeight + document.getElementById("pytorch-page-level-bar").offsetHeight + 25, i = highlightNavigation.sections, o = i.length - 1; 0 <= o; o--) {
                        var s = i[o];
                        if (utilities.offset(s).top - n <= t) {
                            s = highlightNavigation.sectionIdTonavigationLink[s.id], s = utilities.closest(s, "li");
                            if (s && !s.classList.contains("active")) {
                                for (o = 0; o < highlightNavigation.navigationListItems.length; o++) {
                                    var l = highlightNavigation.navigationListItems[o];
                                    l.classList.contains("active") && l.classList.remove("active")
                                }
                                s.classList.add("active")
                            }
                            break
                        }
                    }
            }
        }
    }, {}],
    5: [function (e, t, n) {
        window.mainMenuDropdown = {
            bind: function () {
                function e(e) {
                    var t = "show-menu",
                        n = "." + e + "-menu";
                    $(n).hasClass(t) ? $(n).removeClass(t) : ($("[data-toggle=" + e + "].show-menu").removeClass(t), $(n).addClass(t))
                }
                $("[data-toggle='ecosystem-dropdown']").on("click", function () {
                    e($(this).attr("data-toggle"))
                }), $("[data-toggle='resources-dropdown']").on("click", function () {
                    e($(this).attr("data-toggle"))
                })
            }
        }
    }, {}],
    6: [function (e, t, n) {
        window.mobileMenu = {
            bind: function () {
                $("[data-behavior='open-mobile-menu']").on("click", function (e) {
                    e.preventDefault(), $(".mobile-main-menu").addClass("open"), $("body").addClass("no-scroll"), mobileMenu.listenForResize()
                }), $("[data-behavior='close-mobile-menu']").on("click", function (e) {
                    e.preventDefault(), mobileMenu.close()
                })
            },
            listenForResize: function () {
                $(window).on("resize.ForMobileMenu", function () {
                    768 < $(this).width() && mobileMenu.close()
                })
            },
            close: function () {
                $(".mobile-main-menu").removeClass("open"), $("body").removeClass("no-scroll"), $(window).off("resize.ForMobileMenu")
            }
        }
    }, {}],
    7: [function (e, t, n) {
        window.mobileTOC = {
            bind: function () {
                $("[data-behavior='toggle-table-of-contents']").on("click", function (e) {
                    e.preventDefault();
                    e = $(this).parent();
                    e.hasClass("is-open") ? (e.removeClass("is-open"), $(".pytorch-left-menu").slideUp(200, function () {
                        $(this).css({
                            display: ""
                        })
                    })) : (e.addClass("is-open"), $(".pytorch-left-menu").slideDown(200))
                })
            }
        }
    }, {}],
    8: [function (e, t, n) {
        window.pytorchAnchors = {
            bind: function () {
                $(".headerlink").text(""), window.anchors.add(".pytorch-article .headerlink"), $(".anchorjs-link").each(function () {
                    var e = $(this).closest(".headerlink"),
                        t = e.attr("href"),
                        n = this.outerHTML;
                    $clone = $(n).attr("href", t), e.before($clone), e.remove()
                })
            }
        }
    }, {}],
    9: [function (e, t, n) {
        window.scrollToAnchor = {
            bind: function () {
                var o = window.document,
                    s = window.history,
                    l = window.location,
                    a = !(!s || !s.pushState),
                    e = {
                        ANCHOR_REGEX: /^#[^ ]+$/,
                        offsetHeightPx: function () {
                            return utilities.headersHeight() + 20
                        },
                        init: function () {
                            this.scrollToCurrent(), $("body").on("click", "a", $.proxy(this, "delegateAnchors")), $("body").on("click", "#pytorch-right-menu li span", $.proxy(this, "delegateSpans"))
                        },
                        getFixedOffset: function () {
                            return this.offsetHeightPx()
                        },
                        scrollIfAnchor: function (e, t) {
                            var n, i;
                            return !!this.ANCHOR_REGEX.test(e) && ((n = o.getElementById(e.slice(1))) && (i = $(n).offset().top - this.getFixedOffset(), $("html, body").scrollTop(i), a) && t && s.pushState({}, o.title, l.pathname + e), !!n)
                        },
                        scrollToCurrent: function (e) {
                            this.scrollIfAnchor(window.location.hash) && e && e.preventDefault()
                        },
                        delegateSpans: function (e) {
                            var t = utilities.closest(e.target, "a");
                            this.scrollIfAnchor(t.getAttribute("href"), !0) && e.preventDefault()
                        },
                        delegateAnchors: function (e) {
                            var t = e.target;
                            this.scrollIfAnchor(t.getAttribute("href"), !0) && e.preventDefault()
                        }
                    };
                $(o).ready($.proxy(e, "init"))
            }
        }
    }, {}],
    10: [function (e, t, n) {
        window.sideMenus = {
            rightMenuIsOnScreen: function () {
                return null !== document.getElementById("pytorch-content-right").offsetParent
            },
            isFixedToBottom: !1,
            bind: function () {
                var e = document.querySelectorAll("#pytorch-right-menu li"),
                    t = 1 < e.length;
                if (!t)
                    for (var n = 0; n < e.length; n++) e[n].style.display = "none";
                if (t) {
                    document.getElementById("pytorch-shortcuts-wrapper").style.display = "block";
                    for (var i = document.querySelectorAll("#pytorch-right-menu #pytorch-side-scroll-right          > ul > li > a.reference.internal"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        o.classList.add("title-link"), o.nextElementSibling && "UL" === o.nextElementSibling.tagName && 0 < o.nextElementSibling.children.length && o.classList.add("has-children")
                    }
                    for (var s = document.querySelectorAll("#pytorch-right-menu ul li ul li a.reference.internal"), n = 0; n < s.length; n++) s[n].nextElementSibling && "UL" === s[n].nextElementSibling.tagName && s[n].classList.add("not-expanded");
                    t = document.querySelector('#pytorch-right-menu a[href="' + window.location.hash + '"]');
                    t && (t.nextElementSibling && "UL" === t.nextElementSibling.tagName && 0 < t.nextElementSibling.children.length && (t.nextElementSibling.style.display = "block", t.classList.add("expanded")), sideMenus.expandClosestUnexpandedParentList(t)), $("#pytorch-right-menu a.reference.internal").on("click", function () {
                        this.classList.contains("expanded") ? (this.nextElementSibling.style.display = "none", this.classList.remove("expanded"), this.classList.add("not-expanded")) : this.classList.contains("not-expanded") && (this.nextElementSibling.style.display = "block", this.classList.remove("not-expanded"), this.classList.add("expanded"))
                    }), sideMenus.handleRightMenu()
                }
                $(window).on("resize scroll", function () {
                    sideMenus.handleNavBar(), sideMenus.rightMenuIsOnScreen() && sideMenus.handleRightMenu()
                });
                t = document.getElementById("header-holder");
                new ResizeObserver(function () {
                    sideMenus.handleRightMenu()
                }).observe(t)
            },
            leftMenuIsFixed: function () {
                return document.getElementById("pytorch-left-menu").classList.contains("make-fixed")
            },
            handleNavBar: function () {
                var e = document.getElementById("pytorch-left-menu"),
                    t = document.getElementById("header-holder");
                e.style.height = utilities.windowHeight() - utilities.getVisibleFooterHeight() - t.offsetHeight + "px"
            },
            expandClosestUnexpandedParentList: function (e) {
                var t, e = utilities.closest(e, "ul");
                e && (t = e.previousElementSibling) && "A" === t.tagName && t.classList.contains("reference") && !t.classList.contains("title-link") && (e.style.display = "block", t.classList.remove("not-expanded"), t.classList.add("expanded"), sideMenus.expandClosestUnexpandedParentList(t))
            },
            handleRightMenu: function () {
                var e = document.getElementById("pytorch-content-right"),
                    t = document.getElementById("pytorch-right-menu"),
                    n = t.getElementsByTagName("ul")[0],
                    i = document.getElementById("pytorch-article"),
                    o = i.offsetHeight,
                    i = utilities.offset(i).top + o,
                    s = document.getElementById("header-holder").offsetHeight,
                    o = (utilities.scrollTop() < s ? (e.style.height = "100%", t.style.top = 0, t.classList.remove("scrolling-fixed"), t.classList.remove("scrolling-absolute")) : (t.classList.contains("scrolling-fixed") ? i <= utilities.offset(n).top + n.offsetHeight && (e.style.height = o + s + "px", t.style.top = utilities.scrollTop() - s + "px", t.classList.add("scrolling-absolute"), t.classList.remove("scrolling-fixed")) : (e.style.height = o + s + "px", t.style.top = i - s - n.offsetHeight + "px", t.classList.add("scrolling-absolute")), utilities.scrollTop() < i - n.offsetHeight && (e.style.height = "100%", t.style.top = "", t.classList.remove("scrolling-absolute"), t.classList.add("scrolling-fixed"))), document.getElementById("pytorch-side-scroll-right")),
                    s = o.getBoundingClientRect().top,
                    i = utilities.windowHeight() - s - utilities.getVisibleFooterHeight();
                o.style.height = i + "px"
            }
        }
    }, {}],
    "pt-lightning-sphinx-theme": [function (e, t, n) {
        var jQuery = "undefined" != typeof window ? window.jQuery : e("jquery");
        t.exports.ThemeNav = ((e = {
            navBar: null,
            win: null,
            winScroll: !1,
            winResize: !1,
            linkScroll: !1,
            winPosition: 0,
            winHeight: null,
            docHeight: null,
            isRunning: !1,
            enable: function (t) {
                var n = this;
                void 0 === t && (t = !0), n.isRunning || (n.isRunning = !0, jQuery(function (e) {
                    n.init(e), n.reset(), n.win.on("hashchange", n.reset), t && n.win.on("scroll", function () {
                        n.linkScroll || n.winScroll || (n.winScroll = !0, requestAnimationFrame(function () {
                            n.onScroll()
                        }))
                    }), n.win.on("resize", function () {
                        n.winResize || (n.winResize = !0, requestAnimationFrame(function () {
                            n.onResize()
                        }))
                    }), n.onResize()
                }))
            },
            enableSticky: function () {
                this.enable(!0)
            },
            init: function (n) {
                n(document);
                var i = this;
                this.navBar = n("div.pytorch-side-scroll:first"), this.win = n(window), n(document).on("click", "[data-toggle='pytorch-left-menu-nav-top']", function () {
                    n("[data-toggle='wy-nav-shift']").toggleClass("shift"), n("[data-toggle='rst-versions']").toggleClass("shift")
                }).on("click", ".pytorch-menu-vertical .current ul li a", function () {
                    var e = n(this);
                    n("[data-toggle='wy-nav-shift']").removeClass("shift"), n("[data-toggle='rst-versions']").toggleClass("shift"), i.toggleCurrent(e), i.hashChange()
                }).on("click", "[data-toggle='rst-current-version']", function () {
                    n("[data-toggle='rst-versions']").toggleClass("shift-up")
                }), n("table.docutils:not(.field-list,.footnote,.citation)").wrap("<div class='wy-table-responsive'></div>"), n("table.docutils.footnote").wrap("<div class='wy-table-responsive footnote'></div>"), n("table.docutils.citation").wrap("<div class='wy-table-responsive citation'></div>"), n(".pytorch-menu-vertical ul").not(".simple").siblings("a").each(function () {
                    var t = n(this);
                    (expand = n('<span class="toctree-expand"></span>')).on("click", function (e) {
                        return i.toggleCurrent(t), e.stopPropagation(), !1
                    }), t.prepend(expand)
                })
            }
        }).reset = function () {
            var e = encodeURI(window.location.hash) || "#";
            try {
                var t, n = $(".pytorch-menu-vertical"),
                    i = n.find('[href="' + e + '"]');
                0 < (i = 0 === i.length && (t = $('.document [id="' + e.substring(1) + '"]').closest("div.section"), 0 === (i = n.find('[href="#' + t.attr("id") + '"]')).length) ? n.find('[href="#"]') : i).length && ($(".pytorch-menu-vertical .current").removeClass("current"), i.addClass("current"), i.closest("li.toctree-l1").addClass("current"), i.closest("li.toctree-l1").parent().addClass("current"), i.closest("li.toctree-l1").addClass("current"), i.closest("li.toctree-l2").addClass("current"), i.closest("li.toctree-l3").addClass("current"), i.closest("li.toctree-l4").addClass("current"))
            } catch (o) {
                console.log("Error expanding nav for anchor", o)
            }
        }, e.onScroll = function () {
            this.winScroll = !1;
            var e = this.win.scrollTop(),
                t = e + this.winHeight,
                n = this.navBar.scrollTop() + (e - this.winPosition);
            e < 0 || t > this.docHeight || (this.navBar.scrollTop(n), this.winPosition = e)
        }, e.onResize = function () {
            this.winResize = !1, this.winHeight = this.win.height(), this.docHeight = $(document).height()
        }, e.hashChange = function () {
            this.linkScroll = !0, this.win.one("hashchange", function () {
                this.linkScroll = !1
            })
        }, e.toggleCurrent = function (e) {
            e = e.closest("li");
            e.siblings("li.current").removeClass("current"), e.siblings().find("li.current").removeClass("current"), e.find("> ul li.current").removeClass("current"), e.toggleClass("current")
        }, e), "undefined" != typeof window && (window.SphinxRtdTheme = {
            Navigation: t.exports.ThemeNav,
            StickyNav: t.exports.ThemeNav
        });
        for (var s = 0, i = ["ms", "moz", "webkit", "o"], o = 0; o < i.length && !window.requestAnimationFrame; ++o) window.requestAnimationFrame = window[i[o] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[o] + "CancelAnimationFrame"] || window[i[o] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - s)),
                o = window.setTimeout(function () {
                    e(n + i)
                }, i);
            return s = n + i, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        }), $(".sphx-glr-thumbcontainer").removeAttr("tooltip"), $("table").removeAttr("border"), 1 <= $(".sphx-glr-download-link-note.admonition.note").length ? ((e = $("#tutorial-type").text().split("/"))[0] = e[0] + "_source", t = "https://github.com/pytorch/tutorials/blob/master/" + e.join("/") + ".py", l = "https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads" + (e = $(".reference.download")[1].href).split("_downloads")[1], $("#google-colab-link").wrap("<a href=" + l + " data-behavior='call-to-action-event' data-response='Run in Google Colab' target='_blank'/>"), $("#download-notebook-link").wrap("<a href=" + e + " data-behavior='call-to-action-event' data-response='Download Notebook'/>"), $("#github-view-link").wrap("<a href=" + t + " data-behavior='call-to-action-event' data-response='View on Github' target='_blank'/>")) : $(".pytorch-call-to-action-links").hide(), $(document).ready(function () {
            var t = $(this).not("checked"),
                n = "<i class='fa-solid fa-chevron-right'></i>",
                i = "<i class='fa-solid fa-chevron-down'></i>";

            function o(e) {
                $(e).toggle()
            }
            $("#pytorch-left-menu p.caption").each(function () {
                var e = this.innerText.replace(/[^\w\s]/gi, "").trim();
                $(this).find("span").addClass("checked"), 1 == collapsedSections.includes(e) && t && "expand" !== sessionStorage.getItem(e) || "collapse" == sessionStorage.getItem(e) ? ($(this.firstChild).after("<span class='expand-menu menu-item-decorator'>" + n + "  </span>"), $(this.firstChild).after("<span class='hide-menu collapse menu-item-decorator'>" + i + "</span>"), $(this).next("ul").hide()) : (0 == collapsedSections.includes(e) && t || "expand" == sessionStorage.getItem(e)) && ($(this.firstChild).after("<span class='expand-menu collapse menu-item-decorator'>" + n + "</span>"), $(this.firstChild).after("<span class='hide-menu menu-item-decorator'>" + i + "</span>"))
            }), $(".expand-menu").on("click", function () {
                $(this).prev(".hide-menu").toggle(), $(this).parent().next("ul").toggle();
                var e = $(this).parent().text().replace(/[^\w\s]/gi, "").trim();
                "collapse" == sessionStorage.getItem(e) && sessionStorage.removeItem(e), sessionStorage.setItem(e, "expand"), o(this)
            }), $(".hide-menu").on("click", function () {
                $(this).next(".expand-menu").toggle(), $(this).parent().next("ul").toggle();
                var e = $(this).parent().text().replace(/[^\w\s]/gi, "").trim();
                "expand" == sessionStorage.getItem(e) && sessionStorage.removeItem(e), sessionStorage.setItem(e, "collapse"), o(this)
            }), $("#pytorch-left-menu p.caption").on("click", function () {
                var e = $(this).text().replace(/[^\w\s]/gi, "").trim(),
                    t = sessionStorage.getItem(e);
                null == t && (sessionStorage.setItem(e, "expand"), t = "expand"), "expand" == t ? ($(this).children(".hide-menu").toggle(), $(this).children(".expand-menu").toggle(), $(this).next("ul").toggle(), sessionStorage.setItem(e, "collapse")) : ($(this).children(".hide-menu").toggle(), $(this).children(".expand-menu").toggle(), $(this).next("ul").toggle(), sessionStorage.setItem(e, "expand"))
            })
        }), $(".tutorials-card-container").map(function () {
            return $(this).data("tags").split(",").map(function (e) {
                return e.trim()
            })
        }).get().sort().filter(function (e, t, n) {
            return n.indexOf(e) == t && "" != e
        }).forEach(function (e) {
            $(".tutorial-filter-menu").append(" <div class='tutorial-filter filter-btn filter' data-tag='" + e + "'>" + e + "</div>")
        }), $(".tags").each(function () {
            var n = $(this).text().split(",");
            n.forEach(function (e, t) {
                n[t] = n[t].replaceAll("-", " ")
            }), $(this).html(n.join(", "))
        }), $(".tutorial-filter").each(function () {
            var e = $(this).text();
            $(this).html(e.replaceAll("-", " "))
        }), $("#tutorial-cards p").each(function (e, t) {
            $(t).text().trim() || $(t).remove()
        }), $(document).on("click", ".page", function () {
            $("html, body").animate({
                scrollTop: $("#dropdown-filter-tags").position().top
            }, "slow")
        });
        var l = $("a[href='intermediate/speech_command_recognition_with_torchaudio.html']");
        "SyntaxError" == l.text() && (console.log("There is an issue with the intermediate/speech_command_recognition_with_torchaudio.html menu item."), l.text("Speech Command Recognition with torchaudio")), $(".stars-outer > i").hover(function () {
            $(this).prevAll().addBack().toggleClass("fas star-fill")
        }), $(".stars-outer > i").on("click", function () {
            $(this).prevAll().each(function () {
                $(this).addBack().addClass("fas star-fill")
            }), $(".stars-outer > i").each(function () {
                $(this).unbind("mouseenter mouseleave").css({
                    "pointer-events": "none"
                })
            })
        }), $("#pytorch-side-scroll-right li a").on("click", function (e) {
            var t = $(this).attr("href");
            $("html, body").stop().animate({
                scrollTop: $(t).offset().top - 100
            }, 850), e.preventDefault
        });
        var e = $("#pytorch-side-scroll-right"),
            a = e.outerHeight() + 1,
            r = e.find("a"),
            c = r.map(function () {
                var e = $(this).attr("href");
                if (e.length) return e
            });
        $(window).scroll(function () {
            $(this).scrollTop();
            $(".section").each(function (e) {
                var t = $(this).offset().top - $(window).scrollTop();
                t <= a + 200 && a - 200 <= t && c[e] == "#" + $(this).attr("id") && $(".hidden:visible") && ($(r).removeClass("side-scroll-highlight"), $(r[e]).addClass("side-scroll-highlight"))
            })
        })
    }, {
        jquery: "jquery"
    }]
}, {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "pt-lightning-sphinx-theme"]);


