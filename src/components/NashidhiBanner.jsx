import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import logo from "../images/logo-transparent.png";

// Sample images (make sure these exist in src/images/)
import machine2 from "../images/machine2.jpg";
import maxres from "../images/maxresdefault.jpg";
import assy from "../images/offer3.png";
import drafting from "../images/drafting.png";
import fea from "../images/fea.jpg";
import food from "../images/food-machinery.jpg";
import istock from "../images/istockphoto-696254096-2048x2048.jpg";
import machine1 from "../images/machine1.jpg";

import "../App.css";

export default function NashidhiBanner({ email = "nashidhidesigns@gmail.com" }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [intervalMs] = useState(3000); // autoplay interval
  const cardRef = useRef(null);

  const images = [
    { src: assy, caption: "Assembly exploded view" },
    { src: machine1, caption: "High-detail assembly render" },
    { src: machine2, caption: "Pharma filling machine" },
    { src: drafting, caption: "2D technical drawing / GAD" },
    { src: fea, caption: "FEA / simulation preview" },
    { src: food, caption: "Food machinery render" },
    { src: istock, caption: "Rendered part over drawing" },
    { src: maxres, caption: "Assembly exploded view example" },
  ];

  // autoplay effect
  useEffect(() => {
    if (!modalOpen || !playing) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [modalOpen, playing, intervalMs, images.length]);

  function openModal(i = 0) {
    setIndex(i);
    setModalOpen(true);
    setPlaying(true);
  }
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // keyboard navigation for modal
  useEffect(() => {
    function onKey(e) {
      if (!modalOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === " ") setPlaying((p) => !p);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, next, prev]);

  // tilt effect for image card
  function handleMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    const rx = (my - 0.5) * 8;
    const ry = (mx - 0.5) * -12;
    cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  }
  function handleLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    cardRef.current.style.transition = "transform 600ms cubic-bezier(.2,.9,.23,1)";
    setTimeout(() => (cardRef.current.style.transition = ""), 650);
  }

  // mailto body (mailto cannot attach files) — asks user to attach files
  const mailto = () => {
    const subject = encodeURIComponent("Quote request — Nashidhi Designs (Component-based)");
    const body = encodeURIComponent(
      `Hi Nashidhi team,\n\nI would like a quote for the following:\n- Service required:\n- Number of components in assembly:\n- Preferred file formats (STEP/IGES/SLDPRT/etc):\n- Target delivery time:\n\nI have attached the CAD files / drawings to this email (please attach them before sending).\n\nThanks,\n[Your name]\n[Company]\n[Contact phone]`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="nd-banner" aria-label="Nashidhi Designs promotional banner">
        <div className="nd-decor nd-decor-right" />
        <div className="nd-decor nd-decor-left" />

        <div className="nd-inner">
          <div className="nd-left">
            <div className="nd-brand">
              <img src={logo} alt="Nashidhi Designs" className="nd-logo" />
              <span className="nd-sub">Mechanical CAD &amp; Realistic Renders</span>
            </div>

            <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className="nd-title">
              Nashidhi Designs
              <div className="nd-title-sub">2D → 3D · Assembly · GAD · Photoreal Renders</div>
            </motion.h1>

            <div className="nd-chips" aria-hidden="true">
              <span className="nd-chip">2D → 3D</span>
              <span className="nd-chip">Assembly</span>
              <span className="nd-chip">GAD</span>
              <span className="nd-chip">Photo-real Renders</span>
            </div>

            <p className="nd-desc">
              We convert engineering drawings into production-ready 3D CAD, create assemblies & exploded views, produce 2D drawings and GAD for lifts and machines, and render realistic visuals to showcase your product.
            </p>

            <div className="nd-pricing">
              <strong>Component-based pricing</strong>
              <ul>
                <li>Up to 5 components: <span>Base Price</span></li>
                <li>6–15 components: <span className="nd-highlight">10% OFF</span></li>
                <li>16–30 components: <span className="nd-highlight">20% OFF</span></li>
                <li>31+ components: <span className="nd-highlight">Custom Quote</span></li>
              </ul>
            </div>

            <div className="nd-cta-row">
              <motion.button whileHover={{ y: -4 }} className="nd-cta primary" onClick={mailto}>
                Get a Free Quote <span className="nd-arrow">→</span>
              </motion.button>

              <motion.button whileHover={{ scale: 1.03 }} className="nd-cta secondary" onClick={() => openModal(0)}>
                See Samples
              </motion.button>

              {/* Download samples zip (public/samples.zip) */}
              <a className="nd-cta secondary" href="/samples.zip" download onClick={() => { /* no-op */ }}>
                Download Samples
              </a>
            </div>

            <div className="nd-marquee" aria-hidden="true">
              <div className="nd-marquee-track">
                <span>2D → 3D Modeling</span>
                <span>•</span>
                <span>Assembly & Exploded Views</span>
                <span>•</span>
                <span>GAD & Manufacturing Drawings</span>
                <span>•</span>
                <span>Photoreal Renders</span>
                <span>•</span>
                <span>STEP / STL / IGES</span>
              </div>
            </div>
          </div>

          {/* <div className="nd-right">
            <div
              ref={cardRef}
              className="nd-image-card"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              role="img"
              aria-label="Rendered assembly sample"
            >
              <div className="nd-badge">OFFER • Component Pricing</div>

              <img src={assy} alt="Rendered assembly" className="nd-image" />

              <div className="nd-ribbon">Discounts for larger assemblies</div>

              <div className="nd-discount-box">
                <div>10% OFF</div>
                <div>20% OFF</div>
                <div>30%+ OFF</div>
              </div>
            </div>
          </div> */}

          {/* ====================== UPDATED RIGHT SECTION (replace the old nd-right) ====================== */}
          <div className="nd-right">
            <div
              ref={cardRef}
              className="nd-image-card animated-offer"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              role="img"
              aria-label="Rendered assembly sample"
              onClick={() => openModal(0)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") openModal(0); }}
            >
              {/* top-left glowing offer tag */}
              <div className="offer-tag" aria-hidden="true">
                <span className="tag-text">LIMITED OFFER</span>
                <span className="tag-shine" />
              </div>

              {/* floating decorative gears (pure CSS) */}
              <div className="floating-gears" aria-hidden="true">
                <div className="gear gear-1" />
                <div className="gear gear-2" />
                <div className="gear gear-3" />
              </div>

              {/* main image area */}
              <div className="image-wrap">
                <img src={assy} alt="Rendered assembly" className="nd-image animated-image" />
                <div className="image-gloss" />
              </div>

              {/* left-bottom overlay with headline + CTA */}
              <div className="overlay">
                <div className="overlay-head">Rendered Assembly</div>
                <div className="overlay-sub">Click to see more samples</div>  
                <div className="overlay-cta">View Gallery →</div>                      
              </div>         
            </div>
          </div>
        </div>
        <div className="nd-credit-note">Tip: Click <strong>See Samples</strong> to view downloadable examples; use <strong>Download Samples</strong> to get a ZIP of sample files.</div>
      </section>
      {modalOpen && (
        <div className="nd-modal" role="dialog" aria-modal="true">
          <div className="nd-modal-backdrop" onClick={() => setModalOpen(false)} />
          <div className="nd-modal-content" role="document" onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)}>
            <button className="nd-modal-close" onClick={() => setModalOpen(false)} aria-label="Close">✕</button>

            <div className="nd-modal-main">
              <button className="nd-modal-arrow left" onClick={prev} aria-label="Previous">‹</button>

              <div className="nd-modal-image-wrap">
                <img src={images[index].src} alt={images[index].caption} className="nd-modal-image" />
                <div className="nd-modal-caption">{images[index].caption}</div>

                <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
                  <button className="nd-cta secondary" onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</button>
                  <a className="nd-download" href={images[index].src} download>Download image</a>
                  <a className="nd-cta secondary" href="/samples.zip" download>Download ZIP</a>
                </div>
              </div>

              <button className="nd-modal-arrow right" onClick={next} aria-label="Next">›</button>
            </div>

            <div className="nd-modal-thumbs">
              {images.map((im, i) => (
                <button
                  key={i}
                  className={`nd-thumb-btn ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show sample ${i + 1}`}
                >
                  <img src={im.src} alt={im.caption} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}