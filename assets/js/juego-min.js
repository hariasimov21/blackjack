const miModulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        r = ["A", "J", "Q", "K"]; let a = []; const n = document.querySelector("#btnPedir"),
        l = document.querySelector("#btnDetener"),
        o = document.querySelector("#btnNuevo"),
        s = document.querySelectorAll(".divCartas"),
        d = document.querySelectorAll("small"),
        c = (t = 2) => { e = i(), a = []; for (let e = 0; e < t; e++) a.push(0);
            d.forEach(e => e.innerText = 0), s.forEach(e => e.innerHTML = ""), n.disabled = !1, l.disabled = !1 },
        i = () => { e = []; for (let r = 2; r <= 10; r++)
                for (let a of t) e.push(r + a); for (let a of t)
                for (let t of r) e.push(t + a); return _.shuffle(e) },
        u = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        f = (e, t) => (a[t] = a[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), d[t].innerText = a[t], a[t]),
        h = (e, t) => { const r = document.createElement("img");
            r.src = `assets/cartas/${e}.png`, r.classList.add("carta"), s[t].append(r) },
        m = e => { let t = 0;
            do { const e = u();
                t = f(e, a.length - 1), h(e, a.length - 1) } while (t < e && e <= 21);
            b() },
        b = () => { const [e, t] = a;
            setTimeout(() => { t === e ? alertify.alert("ATENCIÓN", "nadie gana :(") : e > 21 ? alertify.alert("ATENCIÓN", "Computadora gana") : t > 21 ? alertify.alert("ATENCIÓN", "Jugador Gana") : alertify.alert("ATENCIÓN", "Computadora Gana") }, 10) }; return n.addEventListener("click", () => { const e = u(),
            t = f(e, 0);
        h(e, 0), t > 21 ? (console.warn("perdiste"), n.disabled = !0, l.disabled = !0, m(t)) : 21 === t && (console.warn("21, genial!"), n.disabled = !0, l.disabled = !0, m(t)) }), l.addEventListener("click", () => { n.disabled = !0, l.disabled = !0, m(a[0]) }), o.addEventListener("click", () => { c() }), { nuevoJuego: c } })();