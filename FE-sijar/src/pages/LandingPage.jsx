import { useState, useEffect, useRef, use } from "react";
import heroPeminjaman from '../assets/hero_peminjaman.png'
import logoPeminjaman from '../assets/logo.png'
import LoginPage from '../pages/LoginPages'
import { Link } from 'react-router-dom';
import SijarLogin from "../pages/LoginPages";
import axios from '../api/axios';
import loading from './loading_gray.json'
import logoPPLG from '../../public/pplg.png'
import logoTJKT from '../../public/tjkt.png'
import logoLK from '../../public/lk1.png'
import logoPS from '../../public/ps.png'
import logoDKV from '../../public/dkv.png'
 
const COLORS = {
  bluePrimary: "#4A90D9",
  blueLight: "#7BB8E8",
  blueLighter: "#D6EAFA",
  blueDark: "#2563A8",
  blueDarker: "#1A3F70",
  sky: "#F0F7FF",
  white: "#FFFFFF",
  textMain: "#1E3A5F",
  textMuted: "#6B8BAD",
  greenSoft: "#3DBD8F",
  yellowSoft: "#F5C842",
};
 
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --blue: #4A90D9;
    --blue-lt: #7BB8E8;
    --blue-ltr: #D6EAFA;
    --blue-dk: #2563A8;
    --blue-dkr: #1A3F70;
    --sky: #F0F7FF;
    --white: #fff;
    --tx: #1E3A5F;
    --tx-m: #6B8BAD;
    --green: #3DBD8F;
    --radius: 1.1rem;
    --shadow: 0 2px 18px rgba(74,144,217,.10);
    --shadow-h: 0 6px 28px rgba(74,144,217,.18);
  }
 
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--sky); color: var(--tx); }
  h1,h2,h3,h4,h5 { font-family: 'Plus Jakarta Sans', sans-serif; }
 
  .fade-in-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .65s ease, transform .65s ease;
  }
  .fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
 
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(74,144,217,.10);
    padding: .75rem 1.5rem;
  }
  .nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
 
  .nav-link {
    font-size: .875rem; font-weight: 500; color: var(--tx-m);
    text-decoration: none; position: relative; padding-bottom: 2px;
    transition: color .2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--blue); border-radius: 2px;
    transform: scaleX(0); transition: transform .2s;
  }
  .nav-link:hover { color: var(--blue); }
  .nav-link:hover::after { transform: scaleX(1); }
 
  .btn-primary {
    display: inline-flex; align-items: center; gap: .45rem;
    background: var(--blue); color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: .875rem;
    padding: .6rem 1.4rem; border-radius: 10px;
    border: none; cursor: pointer;
    box-shadow: 0 3px 14px rgba(74,144,217,.28);
    transition: all .22s; text-decoration: none;
  }
  .btn-primary:hover { background: var(--blue-dk); transform: translateY(-1px); box-shadow: 0 5px 20px rgba(74,144,217,.32); }
 
  .btn-outline {
    display: inline-flex; align-items: center; gap: .45rem;
    background: transparent; color: var(--blue);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600; font-size: .875rem;
    padding: .6rem 1.4rem; border-radius: 9999px;
    border: 1.5px solid var(--blue-lt);
    cursor: pointer; transition: all .22s; text-decoration: none;
  }
  .btn-outline:hover { background: var(--blue-ltr); border-color: var(--blue); }
 
  .section-chip {
    display: inline-flex; align-items: center; gap: .35rem;
    background: var(--blue-ltr); color: var(--blue-dk);
    font-size: .72rem; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; padding: .28rem .8rem;
    border-radius: 9999px; margin-bottom: .75rem;
  }
 
  .card {
    background: var(--white); border-radius: var(--radius);
    box-shadow: var(--shadow); transition: box-shadow .28s, transform .28s;
  }
  .card:hover { box-shadow: var(--shadow-h); transform: translateY(-3px); }
 
  .jurusan-card {
    background: var(--white); border-radius: var(--radius);
    border: 1.5px solid var(--blue-ltr); box-shadow: var(--shadow);
    padding: 1.4rem 1rem; display: flex; flex-direction: column;
    align-items: center; text-align: center;
    transition: all .28s; cursor: default;
  }
  .jurusan-card:hover { background: var(--blue); color: #fff; box-shadow: var(--shadow-h); transform: translateY(-3px); }
  .jurusan-card:hover .j-icon { background: rgba(255,255,255,.18); color: #fff; }
  .jurusan-card:hover .j-sub { color: rgba(255,255,255,.78); }
  .jurusan-card:hover .j-title { color: #fff; }
 
  .j-icon {
    width: 48px; height: 48px; border-radius: 14px; margin-bottom: .85rem;
    display: flex; align-items: center; justify-content: center;
    background: var(--blue-ltr); color: var(--blue);
    transition: background .28s, color .28s;
  }
 
  .hero-img-wrap {
    position: relative; display: flex; justify-content: center;
  }
  .hero-img-bg {
    position: absolute; inset: -24px; border-radius: 50%;
    background: var(--blue-ltr); opacity: .55; filter: blur(40px);
    pointer-events: none;
  }
  .hero-img-frame {
    position: relative; border-radius: 50%;
    background: var(--white); padding: 1.25rem;
    border: 2px dashed var(--blue-lt);
    box-shadow: var(--shadow);
  }
  .hero-img-frame img { width: 260px; max-width: 100%; display: block; }
 
  .stat-divider { width: 1px; background: var(--blue-ltr); align-self: stretch; }
 
  .contact-card {
    display: flex; align-items: center; gap: .85rem;
    padding: .9rem 1.3rem; border-radius: var(--radius);
    background: var(--white); box-shadow: var(--shadow);
    text-decoration: none; transition: transform .22s, box-shadow .22s;
  }
  .contact-card:hover { transform: translateY(-2px) scale(1.015); box-shadow: var(--shadow-h); }
 
  .contact-icon {
    width: 40px; height: 40px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
 
  .footer { background: var(--blue-dkr); }
  .footer-link { color: var(--blue-lt); text-decoration: none; font-size: .875rem; transition: color .2s; }
  .footer-link:hover { color: #fff; }
 
  @keyframes float-ring {
    0%,100% { transform: rotate(0deg) scale(1); }
    50%      { transform: rotate(180deg) scale(1.04); }
  }
 
  @media (max-width: 768px) {
    .hide-md { display: none; }
    .show-md { display: flex; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .stats-row { gap: 1.5rem !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .jurusan-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .barang-grid { grid-template-columns: 1fr !important; }
    .contact-wrap { flex-direction: column; }
  }
`;
 
const jurusanList = [
  { name: "PPLG", full: "Pengembangan Perangkat Lunak & GIM", icon: "💻" },
  { name: "TJKT", full: "Teknik Jaringan Komputer & Telekomunikasi", icon: "🌐" },
  { name: "LK",   full: "Layanan Kesehatan", icon: "🏥" },
  { name: "PS",   full: "Perhotelan & Spa", icon: "🏨" },
  { name: "DKV",  full: "Desain Komunikasi Visual", icon: "🎨" },
];
 
function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}
 
function FadeSection({ children, className = "", delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`fade-in-up${visible ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
 

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Beranda", "Tentang", "Jurusan", "Barang", "Kontak"];
  return (

    <nav className="navbar">
      <div className="nav-inner">
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-ltr)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            <img src={logoPeminjaman} alt="logo sijar" style={{ objectfit: "cover", width: 46, height : 46 }} className="h-24 w-24 object-cover" />
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: "1.2rem", color: "var(--blue)" }}>SIJAR</span>
        </a>
 
        <div className="hide-md" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
 
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <Link to="/login">
          <a className="btn-primary hide-md" style={{ display: "inline-flex" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5-5-5m5 5H3"/></svg>
            Login
          </a>
          </Link>
          <button className="show-md" onClick={() => setOpen(!open)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--blue)", padding: ".4rem" }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>
 
      {open && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: ".5rem 0" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "1rem", boxShadow: "0 4px 20px rgba(74,144,217,.12)", display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)} style={{ padding: ".35rem 0" }}>{l}</a>)}
            <a href="/login" className="btn-primary" style={{ justifyContent: "center", marginTop: ".25rem" }}>Login</a>
          </div>
        </div>
      )}
    </nav>
   
  );
}

function Hero() {
  return (
    <section id="beranda" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "6rem", paddingBottom: "4rem", padding: "7rem 1.5rem 4rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, left: -120, width: 420, height: 420, borderRadius: "50%", border: "2px dashed var(--blue-ltr)", opacity: .6, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -60, left: -60, width: 280, height: 280, borderRadius: "50%", border: "2px dashed var(--blue-lt)", opacity: .4, pointerEvents: "none", animation: "float-ring 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: -80, right: -100, width: 500, height: 500, borderRadius: "50%", border: "2px dashed var(--blue-ltr)", opacity: .5, pointerEvents: "none" }} />
 
      <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
 
        <FadeSection>
          <div className="section-chip">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Digitalisasi Peminjaman Barang
          </div>
 
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--blue-dkr)", lineHeight: 1.12, marginBottom: ".6rem" }}>
            SIJAR
          </h1>
          <h2 style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", fontWeight: 600, color: "var(--blue-dk)", marginBottom: "1rem", lineHeight: 1.4 }}>
            Sistem Inventaris Peminjaman<br />Barang Jurusan
          </h2>
          <p style={{ fontSize: ".95rem", color: "var(--tx-m)", lineHeight: 1.75, maxWidth: 420, marginBottom: "1.75rem" }}>
            Minjam barang jurusan masih pakai kertas? Sudah saatnya beralih ke SIJAR — solusi digital cepat, rapi, dan transparan untuk SMKN 8 Semarang.
          </p>
 
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginBottom: "2.25rem" }}>
            <a href="#beranda" className="btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5-5-5m5 5H3"/></svg>
              Mulai Sekarang
            </a>
            <a href="#tentang" className="btn-outline">
              Pelajari Lebih
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </a>
          </div>
 
          <div className="stats-row" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[["5+","Jurusan"], ["100%","Digital"], ["Real-time","Tracking"]].map(([num, lbl], i) => (
              <>
                {i > 0 && <div className="stat-divider" key={`d${i}`} />}
                <div key={num}>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--blue)" }}>{num}</p>
                  <p style={{ fontSize: ".75rem", color: "var(--tx-m)", fontWeight: 500 }}>{lbl}</p>
                </div>
              </>
            ))}
          </div>
        </FadeSection>
 
        <FadeSection delay={180} style={{ display: "flex", justifyContent: "center" }}>
          <div className="hero-img-wrap">
            <div className="hero-img-bg" />
            <div className="hero-img-frame">
              <img src={heroPeminjaman } alt="SIJAR Ilustrasi" />
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
 
function Tentang() {
  const tujuan = [
    "Mempermudah proses peminjaman barang antar jurusan",
    "Mengurangi kehilangan & kerusakan barang inventaris",
    "Menciptakan laporan peminjaman yang akurat dan real-time",
    "Meningkatkan akuntabilitas penggunaan aset jurusan",
  ];
  const manfaat = [
    "Proses pengajuan peminjaman hanya butuh beberapa menit",
    "Notifikasi otomatis saat peminjaman disetujui atau ditolak",
    "Riwayat peminjaman tersimpan rapi dan mudah dicari",
    "Guru dan admin dapat memantau stok barang secara langsung",
  ];
  const features = [
    { title: "Pencatatan Digital", desc: "Semua transaksi tercatat otomatis tanpa kertas.", bg: "var(--blue-ltr)", ic: "var(--blue)", emoji: "📝" },
    { title: "Pantau Real-time",   desc: "Status barang bisa dipantau kapan saja.",          bg: "#FEF9EC",         ic: "#C4973A",  emoji: "⏱" },
    { title: "Laporan Lengkap",    desc: "Ekspor laporan inventaris bulanan dengan mudah.",   bg: "#EAF7F0",         ic: "#2A9D6E",  emoji: "📊" },
  ];
 
  return (
    <section id="tentang" style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-chip" style={{ margin: "0 auto .75rem" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01"/></svg>
            Tentang SIJAR
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--blue-dkr)", marginBottom: ".6rem" }}>Kenapa Harus SIJAR?</h2>
          <p style={{ color: "var(--tx-m)", maxWidth: 520, margin: "0 auto", fontSize: ".93rem", lineHeight: 1.7 }}>
            SIJAR hadir untuk menggantikan sistem peminjaman manual dengan solusi digital yang mudah, cepat, dan dapat dipantau kapan saja.
          </p>
        </FadeSection>
 
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {[["Tujuan Sistem", "var(--blue-ltr)", "var(--blue)", tujuan, "🎯"],
            ["Manfaat untuk Kamu", "#EAF7F0", "#2A9D6E", manfaat, "✅"]].map(([title, bg, ic, items, emoji], i) => (
            <FadeSection key={title} delay={i * 100}>
              <div className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{emoji}</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--blue-dkr)" }}>{title}</h3>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".65rem" }}>
                  {items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: ".65rem" }}>
                      <div style={{ marginTop: 2, width: 20, height: 20, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 20 20" fill={ic}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      </div>
                      <p style={{ fontSize: ".875rem", color: "var(--tx-m)", lineHeight: 1.6 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSection>
          ))}
        </div>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
          {features.map((f, i) => (
            <FadeSection key={f.title} delay={i * 90}>
              <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto .85rem", fontSize: 24 }}>{f.emoji}</div>
                <h4 style={{ fontWeight: 700, fontSize: ".875rem", color: "var(--blue-dkr)", marginBottom: ".3rem" }}>{f.title}</h4>
                <p style={{ fontSize: ".8rem", color: "var(--tx-m)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function JurusanData() {
  const [jurusanList, setJurusanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null)
   useEffect(()=>{
    axios.get('/landing')
    .then(res => {
      console.log(res.data);
      const data = res.data.data;
      setJurusanList(data.jurusan);
      console.log(data.jurusan)
      setLoading(false);
        // Data dari Laravel
        console.log(res.status);    // Status code (200, 201, dll)
        console.log(res.headers);   // Response headers
        console.log('Kategori jurusan pertama:', data.jurusan[0].nama_kategori);
    })
    .catch(err => {
      setErr(err.message);
      setLoading(false)
    });
  }, []);

  return (
    <section id="jurusan" style={{ padding: "5rem 1.5rem", background: "var(--sky)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-chip" style={{ margin: "0 auto .75rem" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            Jurusan
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--blue-dkr)", marginBottom: ".6rem" }}>Jurusan yang Tersedia</h2>
          <p style={{ color: "var(--tx-m)", maxWidth: 480, margin: "0 auto", fontSize: ".93rem", lineHeight: 1.7 }}>
            SIJAR melayani seluruh jurusan di SMKN 8 Semarang. Pilih jurusanmu dan mulai kelola peminjaman dengan mudah.
          </p>
        </FadeSection>
 
        <div className="jurusan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem" }}>
          {jurusanList.map((j, i) => (
            <FadeSection key={j.nama_kategori} delay={i * 70}>
              <div className="jurusan-card">
                <div className="j-icon" style={{ fontSize: 22 }}>{j.icon}</div>
                <h3 className="j-title" style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--blue-dkr)", marginBottom: ".3rem" }}>{j.nama_kategori}</h3>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
 

function Barang() {
  const [dataBarang, setdataBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null)

  useEffect(()=>{
    axios.get('/landing')
    .then(res => {
      const data = res.data.data;
      setdataBarang(data.barang);
      setLoading(false);
        // Data dari Laravel
        console.log(res.status);    // Status code (200, 201, dll)
        console.log(res.headers);   // Response headers
        console.log('Kategori barang pertama:', data.barang[0]?.kategori_jurusan);
    })
    .catch(err => {
      setErr(err.message);
      setLoading(false)
    });
  }, []);

  if(loading) return <p>Loading...</p>;
  if(err) return <p>Error: {err}</p>;
  return (
    <section id="barang" style={{ padding: "5rem 1.5rem", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-chip" style={{ margin: "0 auto .75rem" }}>
            Inventaris Barang
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--blue-dkr)", marginBottom: ".6rem" }}>Barang yang Bisa Dipinjam</h2>
          <p style={{ color: "var(--tx-m)", maxWidth: 480, margin: "0 auto", fontSize: ".93rem", lineHeight: 1.7 }}>
            Berbagai barang inventaris jurusan tersedia dan siap dipinjam melalui sistem SIJAR.
          </p>
        </FadeSection>
 
        <div className="barang-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
          {dataBarang.map((b, i) => (
            <FadeSection key={b.id ||b.nama_item} delay={i * 60}>
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ height: 170, background: "var(--blue-ltr)", overflow: "hidden" }}>
                  <img src={b.foto_barang || {loading} } alt={b.nama_item} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.1rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: ".65rem" }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: ".93rem", color: "var(--blue-dkr)" }}>{b.nama_item}</h4>
                      <p style={{ fontSize: ".78rem", color: "var(--tx-m)" }}>{b.kategori_jurusan?.nama_kategori}</p>
                    </div>
                    <span style={{
                      fontSize: ".72rem", fontWeight: 600, padding: ".28rem .7rem", borderRadius: 9999,
                      background: b.status_item === "tersedia" ? "#EAF7F0" : "#FEF0EF",
                      color: b.status_item === "tersedia" ? "#2A9D6E" : "#C0503E"
                    }}>{b.status_item}</span>
                  </div>
                  <a href="#beranda" className="btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: ".8rem", padding: ".5rem 1rem" }}>
                    Pinjam Sekarang
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
 
        <div style={{ textAlign: "center" }}>
          <a href="#beranda" className="btn-primary">
            📋 Lihat Semua Barang
          </a>
        </div>
      </div>
    </section>
  );
}
 
function Kontak() {
  const contacts = [
    { label: "@sijar_smkn8",             href: "#",                                  bg: "#FDE8F2", icon: "📸" },
    { label: "WhatsApp",                  href: "https://wa.me/6281234567890",         bg: "#E6F9EE", icon: "💬" },
    { label: "Email Kami",                href: "mailto:sijar@smkn8semarang.sch.id",   bg: "var(--blue-ltr)", icon: "📧" },
    { label: "YouTube",                   href: "#",                                  bg: "#FFEBEB", icon: "▶️" },
  ];
  return (
    <section id="kontak" style={{ padding: "5rem 1.5rem", background: "var(--sky)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeSection>
          <div className="section-chip" style={{ margin: "0 auto .75rem" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Hubungi Kami
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--blue-dkr)", marginBottom: ".6rem" }}>Ada Pertanyaan?</h2>
          <p style={{ color: "var(--tx-m)", maxWidth: 420, margin: "0 auto 2.5rem", fontSize: ".93rem", lineHeight: 1.7 }}>
            Jangan ragu untuk menghubungi tim kami melalui media sosial berikut. Kami siap membantu!
          </p>
 
          <div className="contact-wrap" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {contacts.map(c => (
              <a key={c.label} href={c.href} className="contact-card">
                <div className="contact-icon" style={{ background: c.bg, fontSize: 20 }}>{c.icon}</div>
                <span style={{ fontWeight: 600, fontSize: ".875rem", color: "var(--tx)" }}>{c.label}</span>
              </a>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
 
function Footer() {
  const navLinks = { Beranda: "#beranda", Tentang: "#tentang", Jurusan: "#jurusan", Barang: "#barang", Kontak: "#kontak" };
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                <img src={logoPeminjaman} alt="logo sijar" style={{ width : 46, height : 46, objectFit : "cover" }} />
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: "#fff", fontSize: "1.1rem" }}>SIJAR</span>
            </div>
            <p style={{ fontSize: ".85rem", color: "var(--blue-lt)", lineHeight: 1.7 }}>
              Sistem Inventaris Peminjaman Barang Jurusan — solusi digital untuk SMKN 8 Semarang.
            </p>
          </div>
 
          <div>
            <h5 style={{ color: "#fff", fontWeight: 700, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "1rem" }}>Navigasi</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {Object.entries(navLinks).map(([l, h]) => <li key={l}><a href={h} className="footer-link">{l}</a></li>)}
            </ul>
          </div>
 
          <div>
            <h5 style={{ color: "#fff", fontWeight: 700, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "1rem" }}>Jurusan</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {jurusanList.map(j => <li key={j.name}><span className="footer-link" style={{ cursor: "default" }}>{j.name}</span></li>)}
            </ul>
          </div>
        </div>
 
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem" }}>
          <p style={{ fontSize: ".78rem", color: "var(--blue-lt)" }}>© {new Date().getFullYear()} SIJAR — SMKN 8 Semarang</p>
          <p style={{ fontSize: ".78rem", color: "var(--blue-lt)" }}>Production by XI PPLG 3</p>
        </div>
      </div>
    </footer>
  );
}
 
 function LandingPage() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <Hero />
      <Tentang />
      <JurusanData />
      <Barang />
      <Kontak />
      <Footer />
    </>
  );
}

export default LandingPage