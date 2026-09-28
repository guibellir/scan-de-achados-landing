/**
 * Scan de Achados — tracking, sticky CTA, carousel dots
 * WhatsApp: https://chat.whatsapp.com/BLMeja6raVkJ2l16E4fGoc?s=cl&p=i&ilr=2
 */
(function () {
  "use strict";

  var WHATSAPP_URL =
    "https://chat.whatsapp.com/BLMeja6raVkJ2l16E4fGoc?s=cl&p=i&ilr=2";

  function withUtm(baseUrl) {
    try {
      var pageParams = new URLSearchParams(window.location.search);
      var keys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "fbclid",
      ];
      var url = new URL(baseUrl);
      keys.forEach(function (key) {
        var value = pageParams.get(key);
        if (value && !url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });
      return url.toString();
    } catch (e) {
      return baseUrl;
    }
  }

  function trackLead(ctaPlace) {
    try {
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "whatsapp_group_join",
          content_category: ctaPlace || "cta",
        });
        window.fbq("trackCustom", "WhatsAppClick", {
          placement: ctaPlace || "cta",
        });
      }
    } catch (e) {
      /* ignore */
    }
  }

  // CTAs
  document.querySelectorAll(".js-cta").forEach(function (el) {
    el.setAttribute("href", withUtm(WHATSAPP_URL));
    el.addEventListener("click", function () {
      trackLead(el.getAttribute("data-cta") || "unknown");
    });
  });

  // Telegram (canal alternativo) — também conta como Lead: é uma pessoa a mais recebendo as ofertas
  document.querySelectorAll(".js-cta-telegram").forEach(function (el) {
    el.addEventListener("click", function () {
      try {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: "telegram_channel_join",
            content_category: el.getAttribute("data-cta") || "telegram",
          });
          window.fbq("trackCustom", "TelegramClick", {
            placement: el.getAttribute("data-cta") || "telegram",
          });
        }
      } catch (e) {
        /* ignore */
      }
    });
  });

  // Sticky CTA
  var sticky = document.getElementById("stickyCta");
  if (sticky) {
    sticky.hidden = false;
    var hero = document.querySelector(".hero");
    var toggleSticky = function () {
      if (!hero) {
        sticky.classList.add("is-visible");
        return;
      }
      var threshold = hero.offsetTop + hero.offsetHeight * 0.5;
      if (window.scrollY > threshold) sticky.classList.add("is-visible");
      else sticky.classList.remove("is-visible");
    };
    toggleSticky();
    window.addEventListener("scroll", toggleSticky, { passive: true });
    window.addEventListener("resize", toggleSticky);
  }

  // Carousel dots
  var track = document.querySelector("[data-carousel] .carousel__track");
  var dotsWrap = document.querySelector("[data-carousel-dots]");
  if (track && dotsWrap) {
    var cards = Array.prototype.slice.call(track.querySelectorAll(".proof-card"));
    cards.forEach(function (_, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Ir para oferta " + (i + 1));
      if (i === 0) btn.classList.add("is-active");
      btn.addEventListener("click", function () {
        cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
      dotsWrap.appendChild(btn);
    });

    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll("button"));
    var setActive = function () {
      if (!cards.length) return;
      var trackRect = track.getBoundingClientRect();
      var mid = trackRect.left + trackRect.width / 2;
      var best = 0;
      var bestDist = Infinity;
      cards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var c = r.left + r.width / 2;
        var d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === best);
      });
    };

    track.addEventListener("scroll", setActive, { passive: true });
    window.addEventListener("resize", setActive);
  }
})();
