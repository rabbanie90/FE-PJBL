import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./Dashboardlayout";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  blueDkr: "#0F2D52",
  blueDk: "#1A4A8A",
  blue: "#2563A8",
  blueMd: "#4A90D9",
  blueLt: "#7BB8E8",
  blueLtr: "#C8E4F8",
  sky: "#EBF5FD",
  white: "#FFFFFF",
  bg: "#F4F8FD",
  card: "#FFFFFF",
  tx: "#0F2D52",
  txM: "#5A7A9B",
  txL: "#9BB5CC",
  green: "#10B981",
  greenDk: "#065F46",
  greenLt: "#D1FAE5",
  yellow: "#F59E0B",
  yellowDk: "#92400E",
  yellowLt: "#FEF3C7",
  red: "#EF4444",
  redDk: "#7F1D1D",
  redLt: "#FEE2E2",
  purple: "#7C3AED",
  purpleLt: "#EDE9FE",
  purpleDk: "#4C1D95",
  orange: "#F97316",
  orangeLt: "#FFEDD5",
  teal: "#0D9488",
  tealLt: "#CCFBF1",
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const stats = [
  { label: "Total Peminjaman", val: 24, icon: "📋", bg: C.sky, c: C.blue, border: C.blueLtr, sub: "+3 minggu ini", trend: "+14%", trendUp: true },
  { label: "Sedang Dipinjam", val: 5, icon: "⏳", bg: C.yellowLt, c: C.yellowDk, border: "#FDE68A", sub: "Batas waktu terdekat", trend: "Aktif", trendUp: null },
  { label: "Dikembalikan", val: 18, icon: "✅", bg: C.greenLt, c: C.greenDk, border: "#6EE7B7", sub: "Tepat waktu 87%", trend: "+87%", trendUp: true },
  { label: "Terlambat", val: 1, icon: "⚠️", bg: C.redLt, c: C.redDk, border: "#FCA5A5", sub: "Segera kembalikan!", trend: "Urgent", trendUp: false },
];

const recentActivity = [
  { item: "Laptop Asus VivoBook", jurusan: "PPLG", aksi: "Dipinjam", tgl: "Hari ini, 08.30", status: "aktif", who: "Ahmad F." },
  { item: "Proyektor Epson EB-X41", jurusan: "TJKT", aksi: "Dikembalikan", tgl: "Kemarin, 15.00", status: "kembali", who: "Rizky A." },
  { item: "Kabel HDMI 3m", jurusan: "PPLG", aksi: "Dipinjam", tgl: "13 Apr, 09.00", status: "aktif", who: "Ahmad F." },
  { item: "Arduino Uno Rev3", jurusan: "PPLG", aksi: "Terlambat", tgl: "10 Apr, 08.00", status: "telat", who: "Ahmad F." },
  { item: "Raspberry Pi 4 (4GB)", jurusan: "TJKT", aksi: "Dikembalikan", tgl: "9 Apr, 14.30", status: "kembali", who: "Dian P." },
  { item: "Multimeter Digital", jurusan: "TJKT", aksi: "Dipinjam", tgl: "8 Apr, 10.00", status: "aktif", who: "Fajar N." },
];

const activePinjam = [
  { nama: "Laptop Asus VivoBook", batas: "20 Apr 2025", sisaHari: 4, persen: 65, kat: "Elektronik" },
  { nama: "Kabel HDMI 3m", batas: "18 Apr 2025", sisaHari: 2, persen: 85, kat: "Aksesori" },
  { nama: "Arduino Uno Rev3", batas: "10 Apr 2025", sisaHari: -6, persen: 100, kat: "Mikrokontroler", telat: true },
  { nama: "Raspberry Pi 4", batas: "25 Apr 2025", sisaHari: 9, persen: 30, kat: "Mikrokontroler" },
  { nama: "Power Bank 20000mAh", batas: "22 Apr 2025", sisaHari: 6, persen: 50, kat: "Aksesori" },
];

const popularItems = [
  { nama: "Laptop Asus VivoBook", jml: 12, kat: "Elektronik", stok: 3, total: 5 },
  { nama: "Arduino Uno", jml: 9, kat: "Mikrokontroler", stok: 4, total: 8 },
  { nama: "Proyektor Epson", jml: 7, kat: "AV", stok: 1, total: 3 },
  { nama: "Raspberry Pi 4", jml: 6, kat: "Mikrokontroler", stok: 2, total: 4 },
  { nama: "Kabel HDMI", jml: 15, kat: "Aksesori", stok: 8, total: 10 },
];

const pengumumans = [
  { title: "Jadwal Pemeliharaan Peralatan", desc: "Seluruh peralatan elektronik akan dicek kondisinya pada 22-23 April 2025.", tipe: "info", tgl: "14 Apr" },
  { title: "Kebijakan Baru Peminjaman", desc: "Maksimal peminjaman per siswa ditambah menjadi 5 barang mulai Mei 2025.", tipe: "success", tgl: "12 Apr" },
  { title: "Pengingat: Barang Terlambat", desc: "Terdapat 3 barang yang melewati batas waktu pengembalian. Harap segera kembali.", tipe: "warning", tgl: "10 Apr" },
];

const weeklyData = [
  { day: "Sen", pinjam: 4, kembali: 2 },
  { day: "Sel", pinjam: 6, kembali: 5 },
  { day: "Rab", pinjam: 3, kembali: 4 },
  { day: "Kam", pinjam: 8, kembali: 3 },
  { day: "Jum", pinjam: 5, kembali: 7 },
  { day: "Sab", pinjam: 2, kembali: 1 },
  { day: "Min", pinjam: 1, kembali: 2 },
];

const quickLinks = [
  { to: "/dashboard/peminjaman", label: "Pinjam Barang", icon: "📦", desc: "Ajukan peminjaman baru", bg: C.sky, c: C.blue, border: C.blueLtr },
  { to: "/dashboard/riwayat", label: "Riwayat", icon: "📋", desc: "Lihat semua riwayat", bg: C.greenLt, c: C.greenDk, border: "#6EE7B7" },
  { to: "/dashboard/inventaris", label: "Inventaris", icon: "🗄️", desc: "Cek ketersediaan", bg: C.yellowLt, c: C.yellowDk, border: "#FDE68A" },
  { to: "/dashboard/jurusan", label: "Data Jurusan", icon: "🏫", desc: "Info jurusan", bg: C.purpleLt, c: C.purpleDk, border: "#C4B5FD" },
  { to: "/dashboard/laporan", label: "Laporan", icon: "📊", desc: "Statistik & analitik", bg: C.tealLt, c: C.teal, border: "#5EEAD4" },
  { to: "/dashboard/pengajuan", label: "Pengajuan", icon: "✏️", desc: "Buat pengajuan baru", bg: C.orangeLt, c: "#C2410C", border: "#FDBA74" },
];

const statusStyle = {
  aktif: { bg: C.yellowLt, c: C.yellowDk, label: "Aktif", dot: "#F59E0B" },
  kembali: { bg: C.greenLt, c: C.greenDk, label: "Kembali", dot: C.green },
  telat: { bg: C.redLt, c: C.redDk, label: "Terlambat", dot: C.red },
};

const jurusanColor = {
  PPLG: { bg: "#DBEAFE", c: "#1D4ED8" },
  TJKT: { bg: "#FFEDD5", c: "#C2410C" },
  DKV: { bg: "#FEF9C3", c: "#A16207" },
  LK: { bg: "#DCFCE7", c: "#15803D" },
  PS: { bg: "#F3E8FF", c: "#7E22CE" },
};

// ─── MINI CHART COMPONENT ──────────────────────────────────────────────────────
function MiniBarChart({ data }) {
  const maxVal = Math.max(...data.flatMap(d => [d.pinjam, d.kembali]));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 80, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", flex: 1 }}>
            <div
              style={{
                flex: 1, borderRadius: "3px 3px 0 0",
                background: `linear-gradient(180deg, ${C.blueMd}, ${C.blue})`,
                height: `${(d.pinjam / maxVal) * 65}px`,
                transition: "height .4s ease",
                minHeight: 4,
              }}
            />
            <div
              style={{
                flex: 1, borderRadius: "3px 3px 0 0",
                background: `linear-gradient(180deg, ${C.green}, ${C.greenDk})`,
                height: `${(d.kembali / maxVal) * 65}px`,
                transition: "height .4s ease",
                minHeight: 4,
              }}
            />
          </div>
          <span style={{ fontSize: ".6rem", color: C.txM, fontWeight: 600 }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

// ─── DONUT CHART COMPONENT ─────────────────────────────────────────────────────
function DonutChart({ persen, color, size = 56 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (persen / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}22`} strokeWidth={6} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ s, index }) {
  const [counted, setCounted] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = s.val;
    const dur = 1200;
    const step = Math.ceil(end / (dur / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCounted(end); clearInterval(timer); }
      else setCounted(start);
    }, 16);
    return () => clearInterval(timer);
  }, [s.val]);

  return (
    <div
      className="stat-card"
      style={{
        background: C.white,
        borderRadius: 20,
        border: `1.5px solid ${s.border}`,
        padding: "1.4rem 1.35rem",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow .25s, transform .25s",
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 36px ${s.c}22`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: s.bg, opacity: .5 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".9rem" }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: s.bg, border: `1.5px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>
          {s.icon}
        </div>
        <span style={{
          fontSize: ".68rem", fontWeight: 700,
          background: s.trendUp === true ? C.greenLt : s.trendUp === false ? C.redLt : C.yellowLt,
          color: s.trendUp === true ? C.greenDk : s.trendUp === false ? C.redDk : C.yellowDk,
          padding: ".2rem .6rem", borderRadius: 999,
        }}>{s.trend}</span>
      </div>
      <p style={{ fontSize: "2.2rem", fontWeight: 800, color: s.c, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1, letterSpacing: "-1px" }}>
        {counted}
      </p>
      <p style={{ fontWeight: 700, fontSize: ".84rem", color: C.tx, margin: ".35rem 0 .2rem" }}>{s.label}</p>
      <p style={{ fontSize: ".72rem", color: C.txM }}>{s.sub}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function DashboardHome() {
  const now = new Date();
  const jam = now.getHours();
  const sapa = jam < 11 ? "Selamat Pagi" : jam < 15 ? "Selamat Siang" : jam < 18 ? "Selamat Sore" : "Selamat Malam";
  const emoji = jam < 11 ? "🌤️" : jam < 15 ? "☀️" : jam < 18 ? "🌇" : "🌙";
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQ, setSearchQ] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifRead, setNotifRead] = useState(false);

  const filteredActivity = recentActivity.filter(a => {
    if (activeTab !== "semua" && a.status !== activeTab) return false;
    if (searchQ && !a.item.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const progressColor = (persen, telat) => {
    if (telat) return `linear-gradient(90deg, ${C.red}, #FCA5A5)`;
    if (persen >= 80) return `linear-gradient(90deg, ${C.yellow}, #FDE68A)`;
    return `linear-gradient(90deg, ${C.blueMd}, ${C.blueLt})`;
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .dh-root { font-family: 'Plus Jakarta Sans', sans-serif; background: ${C.bg}; min-height: 100vh; padding: 1.5rem; }
        .fade-in { animation: fadeInUp .5s ease both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .shimmer { background: linear-gradient(90deg,${C.sky} 25%,${C.blueLtr} 50%,${C.sky} 75%); background-size:200% 100%; animation:shimmer 2s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .tab-btn { padding:.4rem .95rem; border-radius:999px; border:1.5px solid transparent; font-weight:600; font-size:.77rem; cursor:pointer; transition:all .2s; font-family:inherit; }
        .tab-btn:hover { background:${C.sky}; }
        .tab-btn.active { background:${C.blue}; color:#fff; border-color:${C.blue}; }
        .tab-btn:not(.active) { background:${C.white}; color:${C.txM}; border-color:${C.blueLtr}; }
        .notif-item { padding:.75rem 1rem; border-radius:12px; border-left:3px solid transparent; margin-bottom:.5rem; font-size:.8rem; transition:background .2s; cursor:pointer; }
        .notif-item:hover { background:${C.sky}; }
        .quick-card { border-radius:16px; padding:1.1rem; display:flex; align-items:center; gap:.8rem; text-decoration:none; transition:all .22s; border:1.5px solid transparent; }
        .quick-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(37,99,168,.15); }
        .popular-row { display:flex; align-items:center; gap:.75rem; padding:.7rem 0; border-bottom:1px solid ${C.sky}; }
        .popular-row:last-child { border-bottom:none; padding-bottom:0; }
        .search-input { width:100%; border:1.5px solid ${C.blueLtr}; border-radius:12px; padding:.55rem 1rem .55rem 2.5rem; font-size:.82rem; font-family:inherit; outline:none; background:${C.white}; color:${C.tx}; transition:border .2s; }
        .search-input:focus { border-color:${C.blue}; }
        .activity-row { display:flex; align-items:center; justify-content:space-between; padding:.85rem .75rem; border-radius:12px; gap:1rem; transition:background .15s; cursor:default; }
        .activity-row:hover { background:${C.sky}; }
        .badge { display:inline-flex; align-items:center; gap:.3rem; padding:.22rem .65rem; border-radius:999px; font-size:.7rem; font-weight:700; }
        .score-bar { height:4px; border-radius:99px; background:${C.sky}; overflow:hidden; margin-top:.3rem; }
        .score-fill { height:100%; border-radius:99px; transition:width .6s ease; }
        .hero-chip { padding:.35rem .85rem; border-radius:999px; font-size:.78rem; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:.4rem; transition:all .2s; }
      `}</style>

      <div className="dh-root">

        {/* ── TOP BAR ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }} className="fade-in">
          <div>
            <p style={{ fontSize: ".75rem", color: C.txM, fontWeight: 600, marginBottom: ".2rem" }}>
              📅 {now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: C.blueDkr, margin: 0 }}>
              {emoji} {sapa}, Ahmad!
            </h1>
          </div>
          <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
            {/* Notifikasi Bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => { setShowNotif(!showNotif); setNotifRead(true); }}
                style={{ width: 40, height: 40, borderRadius: 12, border: `1.5px solid ${C.blueLtr}`, background: C.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", position: "relative" }}
              >
                🔔
                {!notifRead && (
                  <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: C.red, border: `2px solid ${C.white}` }} className="pulse" />
                )}
              </button>
              {showNotif && (
                <div style={{
                  position: "absolute", right: 0, top: 48, width: 300, background: C.white,
                  borderRadius: 16, border: `1.5px solid ${C.blueLtr}`, boxShadow: "0 16px 48px rgba(37,99,168,.15)",
                  padding: "1rem", zIndex: 999,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".75rem" }}>
                    <p style={{ fontWeight: 700, fontSize: ".85rem", color: C.tx }}>Notifikasi</p>
                    <span style={{ fontSize: ".7rem", color: C.blue, fontWeight: 600, cursor: "pointer" }}>Tandai semua dibaca</span>
                  </div>
                  {pengumumans.map((n, i) => (
                    <div key={i} className="notif-item" style={{
                      borderLeftColor: n.tipe === "info" ? C.blue : n.tipe === "success" ? C.green : C.yellow,
                      background: n.tipe === "info" ? C.sky : n.tipe === "success" ? C.greenLt : C.yellowLt,
                    }}>
                      <p style={{ fontWeight: 700, fontSize: ".8rem", color: C.tx, marginBottom: ".2rem" }}>{n.title}</p>
                      <p style={{ fontSize: ".73rem", color: C.txM, lineHeight: 1.4 }}>{n.desc}</p>
                      <p style={{ fontSize: ".65rem", color: C.txL, marginTop: ".3rem" }}>{n.tgl} April</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", background: C.white, border: `1.5px solid ${C.blueLtr}`, borderRadius: 14, padding: ".4rem .85rem .4rem .5rem", cursor: "pointer" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueMd})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: ".8rem" }}>
                AF
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: ".78rem", color: C.tx, lineHeight: 1 }}>Ahmad Fauzi</p>
                <p style={{ fontSize: ".66rem", color: C.txM }}>XI PPLG 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── HERO BANNER ── */}
        <div
          className="fade-in"
          style={{
            background: `linear-gradient(135deg, ${C.blueDkr} 0%, ${C.blue} 60%, ${C.blueMd} 100%)`,
            borderRadius: 24, padding: "2rem 2.25rem", marginBottom: "1.5rem",
            position: "relative", overflow: "hidden",
            animationDelay: ".05s",
          }}
        >
          {/* BG shapes */}
          {[
            { top: -40, right: -40, size: 200, op: .07 },
            { top: 60, right: 120, size: 120, op: .04 },
            { bottom: -50, left: 200, size: 160, op: .05 },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", top: s.top, right: s.right, bottom: s.bottom, left: s.left, width: s.size, height: s.size, borderRadius: "50%", background: `rgba(255,255,255,${s.op})` }} />
          ))}
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".8rem", fontWeight: 500, marginBottom: ".5rem" }}>
                Dashboard Peminjaman · SMKN 8 Semarang
              </p>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff", marginBottom: ".6rem", lineHeight: 1.2 }}>
                Kamu punya <span style={{ color: "#FBBF24" }}>1 barang terlambat</span> 🚨<br />
                dan <span style={{ color: "#6EE7B7" }}>5 barang</span> sedang dipinjam
              </h2>
              <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".85rem", maxWidth: 440, lineHeight: 1.6, marginBottom: "1.1rem" }}>
                Sisa waktu peminjaman terdekat kamu adalah <strong style={{ color: "#fff" }}>2 hari lagi</strong> untuk Kabel HDMI. Yuk segera persiapkan pengembalian!
              </p>
              <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
                <Link to="/dashboard/peminjaman" className="hero-chip" style={{ background: "#fff", color: C.blue }}>
                  📦 Pinjam Sekarang
                </Link>
                <Link to="/dashboard/riwayat" className="hero-chip" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,.25)" }}>
                  📋 Lihat Riwayat
                </Link>
                <Link to="/dashboard/inventaris" className="hero-chip" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,.25)" }}>
                  🗄️ Inventaris
                </Link>
              </div>
            </div>
            {/* Hero Stats Pill */}
            <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
              {[
                { label: "Skor Tepat Waktu", val: "87%", color: "#6EE7B7" },
                { label: "Rank Kelas", val: "#4", color: "#FDE68A" },
                { label: "Badge", val: "⭐ 3", color: "#C4B5FD" },
              ].map((p, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.12)", borderRadius: 14, padding: ".65rem 1rem", textAlign: "center", border: "1px solid rgba(255,255,255,.2)", minWidth: 80 }}>
                  <p style={{ fontWeight: 800, fontSize: "1.1rem", color: p.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.val}</p>
                  <p style={{ fontSize: ".65rem", color: "rgba(255,255,255,.65)", marginTop: ".1rem" }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {stats.map((s, i) => <StatCard key={s.label} s={s} index={i} />)}
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.25rem", alignItems: "flex-start" }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Weekly Chart */}
            <div className="fade-in" style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.blueLtr}`, padding: "1.35rem", animationDelay: ".15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: ".92rem", fontWeight: 700, color: C.blueDkr, marginBottom: ".15rem" }}>📊 Aktivitas Mingguan</h2>
                  <p style={{ fontSize: ".73rem", color: C.txM }}>Peminjaman vs pengembalian 7 hari terakhir</p>
                </div>
                <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: ".35rem", fontSize: ".72rem", color: C.txM }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: C.blue, display: "inline-block" }} /> Pinjam
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: ".35rem", fontSize: ".72rem", color: C.txM }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: C.green, display: "inline-block" }} /> Kembali
                  </span>
                </div>
              </div>
              <MiniBarChart data={weeklyData} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${C.sky}` }}>
                {[
                  { label: "Total Pinjam Minggu Ini", val: weeklyData.reduce((a, d) => a + d.pinjam, 0), color: C.blue },
                  { label: "Total Kembali Minggu Ini", val: weeklyData.reduce((a, d) => a + d.kembali, 0), color: C.green },
                  { label: "Rasio Pengembalian", val: `${Math.round((weeklyData.reduce((a, d) => a + d.kembali, 0) / weeklyData.reduce((a, d) => a + d.pinjam, 0)) * 100)}%`, color: C.purple },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "1.15rem", fontWeight: 800, color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.val}</p>
                    <p style={{ fontSize: ".68rem", color: C.txM }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="fade-in" style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.blueLtr}`, padding: "1.35rem", animationDelay: ".2s" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: ".92rem", fontWeight: 700, color: C.blueDkr }}>🕐 Aktivitas Terbaru</h2>
                <Link to="/dashboard/riwayat" style={{ fontSize: ".78rem", color: C.blue, fontWeight: 700, textDecoration: "none" }}>Lihat semua →</Link>
              </div>
              {/* Search + Filter */}
              <div style={{ display: "flex", gap: ".65rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                  <span style={{ position: "absolute", left: ".75rem", top: "50%", transform: "translateY(-50%)", fontSize: ".85rem" }}>🔍</span>
                  <input
                    className="search-input"
                    placeholder="Cari barang..."
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", gap: ".4rem" }}>
                  {["semua", "aktif", "kembali", "telat"].map(t => (
                    <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                      {t === "semua" ? "Semua" : t === "aktif" ? "⏳ Aktif" : t === "kembali" ? "✅ Kembali" : "⚠️ Telat"}
                    </button>
                  ))}
                </div>
              </div>
              {filteredActivity.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 0", color: C.txM, fontSize: ".82rem" }}>
                  Tidak ada data yang ditemukan
                </div>
              ) : (
                filteredActivity.map((a, i) => (
                  <div key={i} className="activity-row">
                    <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                      <div style={{ position: "relative" }}>
                        <div style={{ width: 42, height: 42, borderRadius: 13, background: statusStyle[a.status].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", flexShrink: 0 }}>
                          {a.status === "aktif" ? "⏳" : a.status === "kembali" ? "✅" : "⚠️"}
                        </div>
                        <span style={{ position: "absolute", bottom: -2, right: -2, width: 10, height: 10, borderRadius: "50%", background: statusStyle[a.status].dot, border: `2px solid ${C.white}` }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: ".83rem", color: C.tx }}>{a.item}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginTop: ".25rem" }}>
                          <span className="badge" style={{ background: jurusanColor[a.jurusan]?.bg, color: jurusanColor[a.jurusan]?.c }}>
                            {a.jurusan}
                          </span>
                          <span style={{ fontSize: ".7rem", color: C.txM }}>{a.tgl}</span>
                          <span style={{ fontSize: ".7rem", color: C.txL }}>· {a.who}</span>
                        </div>
                      </div>
                    </div>
                    <span className="badge" style={{ background: statusStyle[a.status].bg, color: statusStyle[a.status].c, flexShrink: 0 }}>
                      {statusStyle[a.status].label}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Quick Links */}
            <div className="fade-in" style={{ animationDelay: ".25s" }}>
              <h2 style={{ fontSize: ".9rem", fontWeight: 700, color: C.blueDkr, marginBottom: ".85rem" }}>⚡ Akses Cepat</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".85rem" }}>
                {quickLinks.map(q => (
                  <Link key={q.to} to={q.to} className="quick-card" style={{ background: q.bg, border: `1.5px solid ${q.border}` }}>
                    <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{q.icon}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: ".82rem", color: q.c }}>{q.label}</p>
                      <p style={{ fontSize: ".7rem", color: C.txM, marginTop: ".1rem" }}>{q.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

            {/* Profile Card */}
            <div className="fade-in" style={{ background: `linear-gradient(145deg, ${C.blueDkr}, ${C.blue})`, borderRadius: 20, padding: "1.35rem", animationDelay: ".1s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.1rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.15rem", border: "2px solid rgba(255,255,255,.3)", flexShrink: 0 }}>
                  AF
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: ".92rem", color: "#fff" }}>Ahmad Fauzi</p>
                  <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)", marginBottom: ".3rem" }}>XI PPLG 3 · SMKN 8 Semarang</p>
                  <span style={{ background: "rgba(255,255,255,.15)", color: "#fff", fontSize: ".67rem", fontWeight: 700, padding: ".15rem .6rem", borderRadius: 999, border: "1px solid rgba(255,255,255,.25)" }}>
                    🎖️ Peminjam Aktif
                  </span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem", marginBottom: ".85rem" }}>
                {[["24", "Total Pinjam"], ["18", "Dikembalikan"], ["87%", "Tepat Waktu"], ["⭐ 3", "Badge Diraih"]].map(([val, label]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,.1)", borderRadius: 12, padding: ".6rem .75rem", textAlign: "center", border: "1px solid rgba(255,255,255,.12)" }}>
                    <p style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{val}</p>
                    <p style={{ fontSize: ".64rem", color: "rgba(255,255,255,.6)", marginTop: ".15rem" }}>{label}</p>
                  </div>
                ))}
              </div>
              {/* Skor bar */}
              <div style={{ marginBottom: ".85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
                  <p style={{ fontSize: ".73rem", color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Skor Ketepatan</p>
                  <p style={{ fontSize: ".73rem", color: "#6EE7B7", fontWeight: 800 }}>87 / 100</p>
                </div>
                <div style={{ height: 7, borderRadius: 99, background: "rgba(255,255,255,.15)", overflow: "hidden" }}>
                  <div style={{ width: "87%", height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #6EE7B7, #34D399)" }} />
                </div>
              </div>
              <Link to="/dashboard/profile" style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,.15)", color: "#fff", padding: ".5rem", borderRadius: 12, fontSize: ".78rem", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,.2)" }}>
                Lihat Profil Lengkap →
              </Link>
            </div>

            {/* Barang Dipinjam */}
            <div className="fade-in" style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.blueLtr}`, padding: "1.25rem", animationDelay: ".15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: ".88rem", fontWeight: 700, color: C.blueDkr }}>📦 Barang Dipinjam</h3>
                <span style={{ background: C.sky, color: C.blue, fontSize: ".7rem", fontWeight: 700, padding: ".2rem .6rem", borderRadius: 999 }}>{activePinjam.length} item</span>
              </div>
              {activePinjam.map((b, i) => (
                <div key={i} style={{ marginBottom: ".9rem", padding: ".75rem", borderRadius: 12, background: b.telat ? C.redLt : C.sky, border: `1px solid ${b.telat ? "#FCA5A5" : C.blueLtr}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".35rem" }}>
                    <div>
                      <p style={{ fontSize: ".8rem", fontWeight: 700, color: C.tx }}>{b.nama}</p>
                      <p style={{ fontSize: ".67rem", color: C.txM, marginTop: ".1rem" }}>
                        <span style={{ background: b.telat ? C.redLt : C.sky, color: b.telat ? C.redDk : C.txM, border: `1px solid ${b.telat ? "#FCA5A5" : C.blueLtr}`, padding: ".1rem .4rem", borderRadius: 6, fontSize: ".65rem", fontWeight: 600 }}>{b.kat}</span>
                        {" "}· Batas: {b.batas}
                      </p>
                    </div>
                    <span style={{
                      fontSize: ".68rem", fontWeight: 700, padding: ".2rem .55rem", borderRadius: 999,
                      background: b.telat ? C.red : b.sisaHari <= 2 ? C.yellow : C.green,
                      color: "#fff",
                    }}>
                      {b.telat ? `+${Math.abs(b.sisaHari)}h telat` : `${b.sisaHari}h lagi`}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                    <div style={{ flex: 1, height: 5, borderRadius: 99, background: "rgba(0,0,0,.08)", overflow: "hidden" }}>
                      <div style={{ width: `${b.persen}%`, height: "100%", borderRadius: 99, background: progressColor(b.persen, b.telat) }} />
                    </div>
                    <span style={{ fontSize: ".65rem", color: C.txM, minWidth: 28, textAlign: "right", fontWeight: 600 }}>{b.persen}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Barang Populer */}
            <div className="fade-in" style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.blueLtr}`, padding: "1.25rem", animationDelay: ".2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: ".88rem", fontWeight: 700, color: C.blueDkr }}>🔥 Barang Populer</h3>
                <Link to="/dashboard/inventaris" style={{ fontSize: ".75rem", color: C.blue, fontWeight: 700, textDecoration: "none" }}>Lihat semua →</Link>
              </div>
              {popularItems.map((p, i) => (
                <div key={i} className="popular-row">
                  <div style={{ width: 28, height: 28, borderRadius: 9, background: C.sky, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".78rem", fontWeight: 800, color: C.blue, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: ".8rem", color: C.tx, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.nama}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginTop: ".2rem" }}>
                      <span style={{ fontSize: ".65rem", color: C.txM }}>Dipinjam {p.jml}x</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.txL, flexShrink: 0 }} />
                      <span style={{ fontSize: ".65rem", color: p.stok <= 1 ? C.red : C.green, fontWeight: 700 }}>
                        Stok: {p.stok}/{p.total}
                      </span>
                    </div>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${(p.jml / 15) * 100}%`, background: `linear-gradient(90deg, ${C.blueMd}, ${C.blue})` }} />
                    </div>
                  </div>
                  <DonutChart persen={Math.round((p.stok / p.total) * 100)} color={p.stok <= 1 ? C.red : C.green} size={38} />
                </div>
              ))}
            </div>

            {/* Pengumuman */}
            <div className="fade-in" style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.blueLtr}`, padding: "1.25rem", animationDelay: ".25s" }}>
              <h3 style={{ fontSize: ".88rem", fontWeight: 700, color: C.blueDkr, marginBottom: "1rem" }}>📢 Pengumuman</h3>
              {pengumumans.map((n, i) => (
                <div key={i} style={{
                  padding: ".75rem", borderRadius: 12, marginBottom: ".6rem",
                  background: n.tipe === "info" ? C.sky : n.tipe === "success" ? C.greenLt : C.yellowLt,
                  border: `1px solid ${n.tipe === "info" ? C.blueLtr : n.tipe === "success" ? "#6EE7B7" : "#FDE68A"}`,
                  borderLeft: `3px solid ${n.tipe === "info" ? C.blue : n.tipe === "success" ? C.green : C.yellow}`,
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: ".5rem" }}>
                    <p style={{ fontWeight: 700, fontSize: ".8rem", color: C.tx, flex: 1 }}>{n.title}</p>
                    <span style={{ fontSize: ".65rem", color: C.txM, flexShrink: 0 }}>{n.tgl} Apr</span>
                  </div>
                  <p style={{ fontSize: ".73rem", color: C.txM, marginTop: ".3rem", lineHeight: 1.45 }}>{n.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}