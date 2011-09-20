// MSDropDown - jquery.dd.js
// author: Marghoob Suleman - Search me on google
// Date: 12th Aug, 2009, {18 Dec, 2010 (2.36)}
// Version: 2.37.5* {date: 17 June, 2011}
// Revision: 34
// web: www.giftlelo.com | www.marghoobsuleman.com
/*
// msDropDown is free jQuery Plugin: you can redistribute it and/or modify
// it under the terms of the either the MIT License or the Gnu General Public License (GPL) Version 2
//
// This version has been modified by Jeffrey Blake on 20 September 2011.
// The sole modification was to improve support for CSS sprites in older versions of IE.
// Other differences are the result of the deminification process.
*/
; ;
(function ($) {
    var bs = "";
    var bt = function (p, q) {
        var r = p;
        var s = this;
        var q = $.extend({
            height: 120,
            visibleRows: 7,
            rowHeight: 23,
            showIcon: true,
            zIndex: 9999,
            mainCSS: 'dd',
            useSprite: false,
            animStyle: 'slideDown',
            onInit: '',
            style: ''
        }, q);
        this.ddProp = new Object();
        var u = "";
        var v = {};
        v.insideWindow = true;
        v.keyboardAction = false;
        v.currentKey = null;
        var x = false;
        var y = {
            postElementHolder: '_msddHolder',
            postID: '_msdd',
            postTitleID: '_title',
            postTitleTextID: '_titletext',
            postChildID: '_child',
            postAID: '_msa',
            postOPTAID: '_msopta',
            postInputID: '_msinput',
            postArrowID: '_arrow',
            postInputhidden: '_inp'
        };
        var z = {
            dd: q.mainCSS,
            ddTitle: 'ddTitle',
            arrow: 'arrow',
            ddChild: 'ddChild',
            ddTitleText: 'ddTitleText',
            disabled: .30,
            ddOutOfVision: 'ddOutOfVision',
            borderTop: 'borderTop',
            noBorderTop: 'noBorderTop',
            selected: 'selected'
        };
        var A = {
            actions: "focus,blur,change,click,dblclick,mousedown,mouseup,mouseover,mousemove,mouseout,keypress,keydown,keyup",
            prop: "size,multiple,disabled,tabindex"
        };
        this.onActions = new Object();
        var B = $(r).prop("id");
        if (typeof (B) == "undefined" || B.length <= 0) {
            B = "msdrpdd" + $.msDropDown.counter++;
            $(r).attr("id", B)
        };
        var C = $(r).prop("style");
        q.style += (C == undefined) ? "" : C;
        var D = $(r).children();
        x = ($(r).prop("size") > 1 || $(r).prop("multiple") == true) ? true : false;
        if (x) {
            q.visibleRows = $(r).prop("size")
        };
        var E = {};
        var F = 0;
        var G = false;
        var H;
        var I = {};
        var J = function (a) {
            if (typeof (I[a]) == "undefined") {
                I[a] = document.getElementById(a)
            }
            return I[a]
        };
        var K = function (a) {
            return B + y[a]
        };
        var L = function (a) {
            var b = a;
            var c = $(b).prop("style");
            return c
        };
        var M = function (a) {
            var b = $("#" + B + " option:selected");
            if (b.length > 1) {
                for (var i = 0; i < b.length; i++) {
                    if (a == b[i].index) {
                        return true
                    }
                }
            } else if (b.length == 1) {
                if (b[0].index == a) {
                    return true
                }
            };
            return false
        };
        var N = function (a, b, c, d) {
            var e = "";
            var f = (d == "opt") ? K("postOPTAID") : K("postAID");
            var g = (d == "opt") ? f + "_" + (b) + "_" + (c) : f + "_" + (b);
            var h = "";
            var i = "";
            if (q.useSprite != false) {
                i = ' ' + q.useSprite + ' ' + a.className
            } else {
                h = $(a).prop("title");
                h = (h.length == 0) ? "" : '<img src="' + h + '" align="absmiddle" /> '
            };
            var j = $(a).text();
            var k = $(a).val();
            var l = ($(a).prop("disabled") == true) ? "disabled" : "enabled";
            E[g] = {
                html: h + j,
                value: k,
                text: j,
                index: a.index,
                id: g
            };
            var m = L(a);
            if (M(a.index) == true) {
                e += '<a href="javascript:void(0);" class="' + z.selected + ' ' + l + i + '"'
            } else {
                e += '<a  href="javascript:void(0);" class="' + l + i + '"'
            };
            if (m !== false && m !== undefined) {
                e += " style='" + m + "'"
            };
            e += ' id="' + g + '">';
            e += h + '<span class="' + z.ddTitleText + '">' + j + '</span></a>';
            return e
        };
        var O = function (t) {
            var b = t.toLowerCase();
            if (b.length == 0) return -1;
            var a = "";
            for (var i in E) {
                var c = E[i].text.toLowerCase();
                if (c.substr(0, b.length) == b) {
                    a += "#" + E[i].id + ", "
                }
            };
            return (a == "") ? -1 : a
        };
        var P = function () {
            var f = D;
            if (f.length == 0) return "";
            var g = "";
            var h = K("postAID");
            var i = K("postOPTAID");
            f.each(function (c) {
                var d = f[c];
                if (d.nodeName == "OPTGROUP") {
                    g += "<div class='opta'>";
                    g += "<span style='font-weight:bold;font-style:italic; clear:both;'>" + $(d).prop("label") + "</span>";
                    var e = $(d).children();
                    e.each(function (a) {
                        var b = e[a];
                        g += N(b, c, a, "opt")
                    });
                    g += "</div>"
                } else {
                    g += N(d, c, "", "")
                }
            });
            return g
        };
        var Q = function () {
            var a = K("postID");
            var b = K("postChildID");
            var c = q.style;
            sDiv = "";
            sDiv += '<div id="' + b + '" class="' + z.ddChild + '"';
            if (!x) {
                sDiv += (c != "") ? ' style="' + c + '"' : ''
            } else {
                sDiv += (c != "") ? ' style="border-top:1px solid #c3c3c3;display:block;position:relative;' + c + '"' : ''
            };
            sDiv += '>';
            return sDiv
        };
        var R = function () {
            var a = K("postTitleID");
            var b = K("postArrowID");
            var c = K("postTitleTextID");
            var d = K("postInputhidden");
            var e = "";
            var f = "";
            if (J(B).options.length > 0) {
                e = $("#" + B + " option:selected").text();
                f = $("#" + B + " option:selected").prop("title")
            };
            f = (f.length == 0 || f == undefined || q.showIcon == false || q.useSprite != false) ? "" : '<img src="' + f + '" align="absmiddle" /> ';
            var g = '<div id="' + a + '" class="' + z.ddTitle + '"';
            g += '>';
            g += '<span id="' + b + '" class="' + z.arrow + '"></span><span class="' + z.ddTitleText + '" id="' + c + '">' + f + '<span class="' + z.ddTitleText + '">' + e + '</span></span></div>';
            return g
        };
        var S = function () {
            var c = K("postChildID");
            $("#" + c + " a.enabled").unbind("click");
            $("#" + c + " a.enabled").bind("click", function (a) {
                a.preventDefault();
                V(this);
                bA();
                if (!x) {
                    $("#" + c).unbind("mouseover");
                    X(false);
                    var b = (q.showIcon == false) ? $(this).text() : $(this).html();
                    bv(b);
                    s.close()
                }
            })
        };
        var T = function () {
            var d = false;
            var e = K("postID");
            var f = K("postTitleID");
            var g = K("postTitleTextID");
            var h = K("postChildID");
            var i = K("postArrowID");
            var j = $("#" + B).width();
            j = j + 2;
            var k = q.style;
            if ($("#" + e).length > 0) {
                $("#" + e).remove();
                d = true
            };
            var l = '<div id="' + e + '" class="' + z.dd + '"';
            l += (k != "") ? ' style="' + k + '"' : '';
            l += '>';
            l += R();
            l += Q();
            l += P();
            l += "</div>";
            l += "</div>";
            if (d == true) {
                var m = K("postElementHolder");
                $("#" + m).after(l)
            } else {
                $("#" + B).after(l)
            };
            if (x) {
                var f = K("postTitleID");
                $("#" + f).hide()
            };
            $("#" + e).css("width", j + "px");
            $("#" + h).css("width", (j - 2) + "px");
            if (D.length > q.visibleRows) {
                var n = parseInt($("#" + h + " a:first").css("padding-bottom")) + parseInt($("#" + h + " a:first").css("padding-top"));
                var o = ((q.rowHeight) * q.visibleRows) - n;
                $("#" + h).css("height", o + "px")
            } else if (x) {
                var o = $("#" + B).height();
                $("#" + h).css("height", o + "px")
            };
            if (d == false) {
                bu();
                W(B)
            };
            if ($("#" + B).prop("disabled") == true) {
                $("#" + e).css("opacity", z.disabled)
            };
            Z();
            $("#" + f).bind("mouseover", function (a) {
                bD(1)
            });
            $("#" + f).bind("mouseout", function (a) {
                bD(0)
            });
            S();
            $("#" + h + " a.disabled").css("opacity", z.disabled);
            if (x) {
                $("#" + h).bind("mouseover", function (c) {
                    if (!v.keyboardAction) {
                        v.keyboardAction = true;
                        $(document).bind("keydown", function (a) {
                            var b = a.keyCode;
                            v.currentKey = b;
                            if (b == 39 || b == 40) {
                                a.preventDefault();
                                a.stopPropagation();
                                bx();
                                bA()
                            };
                            if (b == 37 || b == 38) {
                                a.preventDefault();
                                a.stopPropagation();
                                by();
                                bA()
                            }
                        })
                    }
                })
            };
            $("#" + h).bind("mouseout", function (a) {
                X(false);
                $(document).unbind("keydown");
                v.keyboardAction = false;
                v.currentKey = null
            });
            $("#" + f).bind("click", function (b) {
                X(false);
                if ($("#" + h + ":visible").length == 1) {
                    $("#" + h).unbind("mouseover")
                } else {
                    $("#" + h).bind("mouseover", function (a) {
                        X(true)
                    });
                    s.open()
                }
            });
            $("#" + f).bind("mouseout", function (a) {
                X(false)
            });
            if (q.showIcon && q.useSprite != false) {
                bz()
            }
        };
        var U = function (a) {
            for (var i in E) {
                if (E[i].index == a) {
                    return E[i]
                }
            };
            return -1
        };
        var V = function (a) {
            var b = K("postChildID");
            if ($("#" + b + " a." + z.selected).length == 1) {
                u = $("#" + b + " a." + z.selected).text()
            };
            if (!x) {
                $("#" + b + " a." + z.selected).removeClass(z.selected)
            };
            var c = $("#" + b + " a." + z.selected).prop("id");
            if (c != undefined) {
                var d = (v.oldIndex == undefined || v.oldIndex == null) ? E[c].index : v.oldIndex
            };
            if (a && !x) {
                $(a).addClass(z.selected)
            };
            if (x) {
                var e = v.currentKey;
                if ($("#" + B).prop("multiple") == true) {
                    if (e == 17) {
                        v.oldIndex = E[$(a).prop("id")].index;
                        $(a).toggleClass(z.selected)
                    } else if (e == 16) {
                        $("#" + b + " a." + z.selected).removeClass(z.selected);
                        $(a).addClass(z.selected);
                        var f = $(a).prop("id");
                        var g = E[f].index;
                        for (var i = Math.min(d, g); i <= Math.max(d, g); i++) {
                            $("#" + U(i).id).addClass(z.selected)
                        }
                    } else {
                        $("#" + b + " a." + z.selected).removeClass(z.selected);
                        $(a).addClass(z.selected);
                        v.oldIndex = E[$(a).prop("id")].index
                    }
                } else {
                    $("#" + b + " a." + z.selected).removeClass(z.selected);
                    $(a).addClass(z.selected);
                    v.oldIndex = E[$(a).prop("id")].index
                }
            }
        };
        var W = function (a) {
            var b = a;
            J(b).refresh = function (e) {
                $("#" + b).msDropDown(q)
            }
        };
        var X = function (a) {
            v.insideWindow = a
        };
        var Y = function () {
            return v.insideWindow
        };
        var Z = function () {
            var b = K("postID");
            var c = A.actions.split(",");
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                var f = bB(e);
                if (f == true) {
                    switch (e) {
                        case "focus":
                            $("#" + b).bind("mouseenter", function (a) {
                                J(B).focus()
                            });
                            break;
                        case "click":
                            $("#" + b).bind("click", function (a) {
                                $("#" + B).trigger("click")
                            });
                            break;
                        case "dblclick":
                            $("#" + b).bind("dblclick", function (a) {
                                $("#" + B).trigger("dblclick")
                            });
                            break;
                        case "mousedown":
                            $("#" + b).bind("mousedown", function (a) {
                                $("#" + B).trigger("mousedown")
                            });
                            break;
                        case "mouseup":
                            $("#" + b).bind("mouseup", function (a) {
                                $("#" + B).trigger("mouseup")
                            });
                            break;
                        case "mouseover":
                            $("#" + b).bind("mouseover", function (a) {
                                $("#" + B).trigger("mouseover")
                            });
                            break;
                        case "mousemove":
                            $("#" + b).bind("mousemove", function (a) {
                                $("#" + B).trigger("mousemove")
                            });
                            break;
                        case "mouseout":
                            $("#" + b).bind("mouseout", function (a) {
                                $("#" + B).trigger("mouseout")
                            });
                            break
                    }
                }
            }
        };
        var bu = function () {
            var a = K("postElementHolder");
            $("#" + B).after("<div class='" + z.ddOutOfVision + "' style='height:0px;overflow:hidden;position:absolute;' id='" + a + "'></div>");
            $("#" + B).appendTo($("#" + a))
        };
        var bv = function (a) {
            var b = K("postTitleTextID");
            $("#" + b).html(a)
        };
        var bw = function (w) {
            var a = w;
            var b = K("postChildID");
            var c = $("#" + b + " a:visible");
            var d = c.length;
            var e = $("#" + b + " a:visible").index($("#" + b + " a.selected:visible"));
            var f;
            switch (a) {
                case "next":
                    if (e < d - 1) {
                        e++;
                        f = c[e]
                    };
                    break;
                case "previous":
                    if (e < d && e > 0) {
                        e--;
                        f = c[e]
                    };
                    break
            };
            if (typeof (f) == "undefined") {
                return false
            };
            $("#" + b + " a." + z.selected).removeClass(z.selected);
            $(f).addClass(z.selected);
            var g = f.id;
            if (!x) {
                var h = (q.showIcon == false) ? E[g].text : $("#" + g).html();
                bv(h);
                bz(E[g].index)
            };
            if (a == "next") {
                if (parseInt(($("#" + g).position().top + $("#" + g).height())) >= parseInt($("#" + b).height())) {
                    $("#" + b).scrollTop(($("#" + b).scrollTop()) + $("#" + g).height() + $("#" + g).height())
                }
            } else {
                if (parseInt(($("#" + g).position().top + $("#" + g).height())) <= 0) {
                    $("#" + b).scrollTop(($("#" + b).scrollTop() - $("#" + b).height()) - $("#" + g).height())
                }
            }
        };
        var bx = function () {
            bw("next")
        };
        var by = function () {
            bw("previous")
        };
        var bz = function (i) {
            if (q.useSprite != false) {
                var a = K("postTitleTextID");
                var b = (typeof (i) == "undefined") ? J(B).selectedIndex : i;
                var c = J(B).options[b].className;
                if (c.length > 0) {
                    var d = K("postChildID");
                    var e = $("#" + d + " a." + c).prop("id");
                    var f = $("#" + e).css("background-image");
                    var g = $("#" + e).css("background-position");
                    if ((undefined == g) || (null == g)) {
                        g = $("#" + e).css("background-position-x") + " " + $("#" + e).css("background-position-y");
                    }
                    var h = $("#" + e).css("padding-left");
                    if (f != undefined) {
                        $("#" + a).find("." + z.ddTitleText).attr('style', "background:" + f)
                    };
                    if (g != undefined) {
                        $("#" + a).find("." + z.ddTitleText).css('background-position', g)
                    };
                    if (h != undefined) {
                        $("#" + a).find("." + z.ddTitleText).css('padding-left', h)
                    };
                    $("#" + a).find("." + z.ddTitleText).css('background-repeat', 'no-repeat');
                    $("#" + a).find("." + z.ddTitleText).css('padding-bottom', '2px')
                }
            }
        };
        var bA = function () {
            var a = K("postChildID");
            var b = $("#" + a + " a." + z.selected);
            if (b.length == 1) {
                var c = $("#" + a + " a." + z.selected).text();
                var d = $("#" + a + " a." + z.selected).prop("id");
                if (d != undefined) {
                    var e = E[d].value;
                    J(B).selectedIndex = E[d].index
                };
                if (q.showIcon && q.useSprite != false) bz()
            } else if (b.length > 1) {
                for (var i = 0; i < b.length; i++) {
                    var d = $(b[i]).prop("id");
                    var f = E[d].index;
                    J(B).options[f].selected = "selected"
                }
            };
            var g = J(B).selectedIndex;
            s.ddProp["selectedIndex"] = g
        };
        var bB = function (a) {
            if ($("#" + B).prop("on" + a) != undefined) {
                return true
            };
            var b = $("#" + B).data("events");
            if (b && b[a]) {
                return true
            };
            return false
        };
        var bC = function () {
            var b = K("postChildID");
            if (bB('change') == true) {
                var c = E[$("#" + b + " a.selected").prop("id")].text;
                if ($.trim(u) !== $.trim(c) && u !== "") {
                    $("#" + B).trigger("change")
                }
            };
            if (bB('mouseup') == true) {
                $("#" + B).trigger("mouseup")
            };
            if (bB('blur') == true) {
                $(document).bind("mouseup", function (a) {
                    $("#" + B).focus();
                    $("#" + B)[0].blur();
                    bA();
                    $(document).unbind("mouseup")
                })
            }
        };
        var bD = function (a) {
            var b = K("postArrowID");
            if (a == 1) $("#" + b).css({
                backgroundPosition: '0 100%'
            });
            else $("#" + b).css({
                backgroundPosition: '0 0'
            })
        };
        var bE = function () {
            for (var i in J(B)) {
                if (typeof (J(B)[i]) != 'function' && J(B)[i] !== undefined && J(B)[i] !== null) {
                    s.set(i, J(B)[i], true)
                }
            }
        };
        var bF = function (a, b) {
            if (U(b) != -1) {
                J(B)[a] = b;
                var c = K("postChildID");
                $("#" + c + " a." + z.selected).removeClass(z.selected);
                $("#" + U(b).id).addClass(z.selected);
                var d = U(J(B).selectedIndex).html;
                bv(d)
            }
        };
        var bG = function (i, a) {
            if (a == 'd') {
                for (var b in E) {
                    if (E[b].index == i) {
                        delete E[b];
                        break
                    }
                }
            };
            var c = 0;
            for (var b in E) {
                E[b].index = c;
                c++
            }
        };
        var bH = function () {
            var a = K("postChildID");
            var b = K("postID");
            var c = $("#" + b).position();
            var d = $("#" + b).height();
            var e = $(window).height();
            var f = $(window).scrollTop();
            var g = $("#" + a).height();
            var h = {
                zIndex: q.zIndex,
                top: (c.top + d) + "px",
                display: "none"
            };
            var i = q.animStyle;
            var j = false;
            var k = z.noBorderTop;
            $("#" + a).removeClass(z.noBorderTop);
            $("#" + a).removeClass(z.borderTop);
            if ((e + f) < Math.floor(g + d + c.top)) {
                var l = c.top - g;
                if ((c.top - g) < 0) {
                    l = 10
                };
                h = {
                    zIndex: q.zIndex,
                    top: l + "px",
                    display: "none"
                };
                i = "show";
                j = true;
                k = z.borderTop
            };
            return {
                opp: j,
                ani: i,
                css: h,
                border: k
            }
        };
        var bI = function () {
            if (s.onActions["onOpen"] != null) {
                eval(s.onActions["onOpen"])(s)
            }
        };
        var bJ = function () {
            bC();
            if (s.onActions["onClose"] != null) {
                eval(s.onActions["onClose"])(s)
            }
        };
        this.open = function () {
            if ((s.get("disabled", true) == true) || (s.get("options", true).length == 0)) return;
            var e = K("postChildID");
            if (bs != "" && e != bs) {
                $("#" + bs).slideUp("fast");
                $("#" + bs).css({
                    zIndex: '0'
                })
            };
            if ($("#" + e).css("display") == "none") {
                u = E[$("#" + e + " a.selected").prop("id")].text;
                var f = "";
                H = $("#" + e).height();
                $("#" + e + " a").show();
                $(document).bind("keydown", function (a) {
                    var b = a.keyCode;
                    if (b == 8) {
                        a.preventDefault();
                        a.stopPropagation();
                        f = (f.length == 0) ? "" : f.substr(0, f.length - 1)
                    };
                    switch (b) {
                        case 39:
                        case 40:
                            a.preventDefault();
                            a.stopPropagation();
                            bx();
                            break;
                        case 37:
                        case 38:
                            a.preventDefault();
                            a.stopPropagation();
                            by();
                            break;
                        case 27:
                        case 13:
                            s.close();
                            bA();
                            break;
                        default:
                            if (b > 46) {
                                f += String.fromCharCode(b)
                            };
                            var c = O(f);
                            if (c != -1) {
                                $("#" + e).css({
                                    height: 'auto'
                                });
                                $("#" + e + " a").hide();
                                $(c).show();
                                var d = bH();
                                $("#" + e).css(d.css);
                                $("#" + e).css({
                                    display: 'block'
                                })
                            } else {
                                $("#" + e + " a").show();
                                $("#" + e).css({
                                    height: H + 'px'
                                })
                            };
                            break
                    };
                    if (bB("keydown") == true) {
                        J(B).onkeydown()
                    }
                });
                $(document).bind("keyup", function (a) {
                    if ($("#" + B).prop("onkeyup") != undefined) {
                        J(B).onkeyup()
                    }
                });
                $(document).bind("mouseup", function (a) {
                    if (Y() == false) {
                        s.close()
                    }
                });
                var g = bH();
                $("#" + e).css(g.css);
                if (g.opp == true) {
                    $("#" + e).css({
                        display: 'block'
                    });
                    $("#" + e).addClass(g.border);
                    bI()
                } else {
                    $("#" + e)[g.ani]("fast", function () {
                        $("#" + e).addClass(g.border);
                        bI()
                    })
                };
                if (e != bs) {
                    bs = e
                }
            }
        };
        this.close = function () {
            var b = K("postChildID");
            var c = $("#" + K("postTitleID")).position().top;
            var d = bH();
            G = false;
            if (d.opp == true) {
                $("#" + b).animate({
                    height: 0,
                    top: c
                }, function () {
                    $("#" + b).css({
                        height: H + 'px',
                        display: 'none'
                    });
                    bJ()
                })
            } else {
                $("#" + b).slideUp("fast", function (a) {
                    bJ();
                    $("#" + b).css({
                        zIndex: '0'
                    });
                    $("#" + b).css({
                        height: H + 'px'
                    })
                })
            };
            bz();
            $(document).unbind("keydown");
            $(document).unbind("keyup");
            $(document).unbind("mouseup")
        };
        this.selectedIndex = function (i) {
            if (typeof (i) == "undefined") {
                return s.get("selectedIndex")
            } else {
                s.set("selectedIndex", i)
            }
        };
        this.debug = function (a) {
            if (typeof (a) == "undefined" || a == true) {
                $("." + z.ddOutOfVision).removeAttr("style")
            } else {
                $("." + z.ddOutOfVision).attr("style", "height:0px;overflow:hidden;position:absolute")
            }
        };
        this.set = function (a, b, c) {
            if (a == undefined || b == undefined) throw {
                message: "set to what?"
            };
            s.ddProp[a] = b;
            if (c != true) {
                switch (a) {
                    case "selectedIndex":
                        bF(a, b);
                        break;
                    case "disabled":
                        s.disabled(b, true);
                        break;
                    case "multiple":
                        J(B)[a] = b;
                        x = ($(r).prop("size") > 0 || $(r).prop("multiple") == true) ? true : false;
                        if (x) {
                            var d = $("#" + B).height();
                            var f = K("postChildID");
                            $("#" + f).css("height", d + "px");
                            var g = K("postTitleID");
                            $("#" + g).hide();
                            var f = K("postChildID");
                            $("#" + f).css({
                                display: 'block',
                                position: 'relative'
                            });
                            S()
                        };
                        break;
                    case "size":
                        J(B)[a] = b;
                        if (b == 0) {
                            J(B).multiple = false
                        };
                        x = ($(r).prop("size") > 0 || $(r).prop("multiple") == true) ? true : false;
                        if (b == 0) {
                            var g = K("postTitleID");
                            $("#" + g).show();
                            var f = K("postChildID");
                            $("#" + f).css({
                                display: 'none',
                                position: 'absolute'
                            });
                            var h = "";
                            if (J(B).selectedIndex >= 0) {
                                var i = U(J(B).selectedIndex);
                                h = i.html;
                                V($("#" + i.id))
                            };
                            bv(h)
                        } else {
                            var g = K("postTitleID");
                            $("#" + g).hide();
                            var f = K("postChildID");
                            $("#" + f).css({
                                display: 'block',
                                position: 'relative'
                            })
                        };
                        break;
                    default:
                        try {
                            J(B)[a] = b
                        } catch (e) { };
                        break
                }
            }
        };
        this.get = function (a, b) {
            if (a == undefined && b == undefined) {
                return s.ddProp
            };
            if (a != undefined && b == undefined) {
                return (s.ddProp[a] != undefined) ? s.ddProp[a] : null
            };
            if (a != undefined && b != undefined) {
                return J(B)[a]
            }
        };
        this.visible = function (a) {
            var b = K("postID");
            if (a == true) {
                $("#" + b).show()
            } else if (a == false) {
                $("#" + b).hide()
            } else {
                return $("#" + b).css("display")
            }
        };
        this.add = function (a, b) {
            var c = a;
            var d = c.text;
            var e = (c.value == undefined || c.value == null) ? d : c.value;
            var f = (c["title"] == undefined || c["title"] == null) ? '' : c["title"];
            var i = (b == undefined || b == null) ? J(B).options.length : b;
            J(B).options[i] = new Option(d, e);
            if (f != '') J(B).options[i]["title"] = f;
            var g = U(i);
            if (g != -1) {
                var h = N(J(B).options[i], i, "", "");
                $("#" + g.id).html(h)
            } else {
                var h = N(J(B).options[i], i, "", "");
                var j = K("postChildID");
                $("#" + j).append(h);
                S()
            }
        };
        this.remove = function (i) {
            J(B).remove(i);
            if ((U(i)) != -1) {
                $("#" + U(i).id).remove();
                bG(i, 'd')
            };
            if (J(B).length == 0) {
                bv("")
            } else {
                var a = U(J(B).selectedIndex).html;
                bv(a)
            };
            s.set("selectedIndex", J(B).selectedIndex)
        };
        this.disabled = function (a, b) {
            J(B).disabled = a;
            var c = K("postID");
            if (a == true) {
                $("#" + c).css("opacity", z.disabled);
                s.close()
            } else if (a == false) {
                $("#" + c).css("opacity", 1)
            };
            if (b != true) {
                s.set("disabled", a)
            }
        };
        this.form = function () {
            return (J(B).form == undefined) ? null : J(B).form
        };
        this.item = function () {
            if (arguments.length == 1) {
                return J(B).item(arguments[0])
            } else if (arguments.length == 2) {
                return J(B).item(arguments[0], arguments[1])
            } else {
                throw {
                    message: "An index is required!"
                }
            }
        };
        this.namedItem = function (a) {
            return J(B).namedItem(a)
        };
        this.multiple = function (a) {
            if (typeof (a) == "undefined") {
                return s.get("multiple")
            } else {
                s.set("multiple", a)
            }
        };
        this.size = function (a) {
            if (typeof (a) == "undefined") {
                return s.get("size")
            } else {
                s.set("size", a)
            }
        };
        this.addMyEvent = function (a, b) {
            s.onActions[a] = b
        };
        this.fireEvent = function (a) {
            eval(s.onActions[a])(s)
        };
        var bK = function () {
            s.set("version", $.msDropDown.version);
            s.set("author", $.msDropDown.author)
        };
        var bL = function () {
            T();
            bE();
            bK();
            if (q.onInit != '') {
                eval(q.onInit)(s)
            }
        };
        bL()
    };
    $.msDropDown = {
        version: 2.37,
        author: "Marghoob Suleman",
        counter: 20,
        create: function (a, b) {
            return $(a).msDropDown(b).data("dd")
        }
    };
    $.fn.extend({
        msDropDown: function (b) {
            return this.each(function () {
                var a = new bt(this, b);
                $(this).data('dd', a)
            })
        }
    });
    if (typeof ($.fn.prop) == 'undefined') {
        $.fn.prop = function (w) {
            return $(this).attr(w)
        }
    }
})(jQuery);