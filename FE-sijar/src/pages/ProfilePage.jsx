import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./Dashboardlayout";

const C = {
  blueDkr: "#0F2D52", blueDk: "#1A4A8A", blue: "#2563A8",
  blueMd: "#4A90D9", blueLt: "#7BB8E8", blueLtr: "#C8E4F8",
  sky: "#EBF5FD", white: "#FFFFFF", bg: "#F4F8FD",
  tx: "#0F2D52", txM: "#5A7A9B", txL: "#9BB5CC",
  green: "#10B981", greenDk: "#065F46", greenLt: "#D1FAE5",
  yellow: "#F59E0B", yellowDk: "#92400E", yellowLt: "#FEF3C7",
  red: "#EF4444", redDk: "#7F1D1D", redLt: "#FEE2E2",
  purple: "#7C3AED", purpleLt: "#EDE9FE", purpleDk: "#4C1D95",
  orange: "#F97316", orangeLt: "#FFEDD5",
};

const badges = [
  { icon: "⭐", label: "Tepat Waktu", desc: "Selalu mengembalikan tepat waktu", color: C.yellow, bg: C.yellowLt, unlock: true },
  { icon: "🔄", label: "10 Pinjaman", desc: "Sudah meminjam lebih dari 10 kali", color: C.green, bg: C.greenLt, unlock: true },
  { icon: "💻", label: "PPLG Star", desc: "Peminjam terbanyak di PPLG", color: C.blue, bg: C.sky, unlock: true },
  { icon: "🏆", label: "Top Borrower", desc: "Masuk top 5 peminjam aktif", color: C.purple, bg: C.purpleLt, unlock: false },
  { icon: "🎯", label: "Perfect Record", desc: "Tidak pernah terlambat 30 hari", color: C.orange, bg: C.orangeLt, unlock: false },
  { icon: "🌟", label: "Legend", desc: "100 peminjaman selesai", color: C.yellowDk, bg: C.yellowLt, unlock: false },
];

const riwayatSingkat = [
  { nama: "Laptop Asus VivoBook", tgl: "15 Apr 2025", status: "aktif", emoji: "💻" },
  { nama: "Proyektor Epson EB-X41", tgl: "10 Apr 2025", status: "kembali", emoji: "📽️" },
  { nama: "Arduino Uno Rev3", tgl: "5 Apr 2025", status: "telat", emoji: "🔌" },
  { nama: "Drawing Tablet Wacom", tgl: "1 Apr 2025", status: "kembali", emoji: "🎨" },
];

const statusStyle = {
  aktif: { bg: C.yellowLt, c: C.yellowDk, label: "Aktif" },
  kembali: { bg: C.greenLt, c: C.greenDk, label: "Kembali" },
  telat: { bg: C.redLt, c: C.redDk, label: "Terlambat" },
};

const stats = [
  { label: "Total Pinjam", val: 24, icon: "📋", color: C.blue, bg: C.sky },
  { label: "Dikembalikan", val: 18, icon: "✅", color: C.green, bg: C.greenLt },
  { label: "Aktif", val: 5, icon: "⏳", color: C.yellow, bg: C.yellowLt },
  { label: "Terlambat", val: 1, icon: "⚠️", color: C.red, bg: C.redLt },
];

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    nama: "Ahmad Fauzi",
    nis: "123456789",
    kelas: "XI PPLG 3",
    jurusan: "PPLG",
    email: "ahmad.fauzi@smkn8smg.sch.id",
    noHp: "081234567890",
    alamat: "Jl. Merdeka No. 45, Semarang Tengah",
    bio: "Siswa aktif kelas XI PPLG 3 yang senang coding dan belajar teknologi baru. Hobi membuat proyek IoT dan web development.",
  });
  const [draft, setDraft] = useState(profile);

  const handleSave = () => {
    setProfile(draft);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = ["info", "statistik", "badge", "riwayat"];
  const tabLabel = { info: "👤 Info", statistik: "📊 Statistik", badge: "🏅 Badge", riwayat: "📋 Riwayat" };

  return (
    <DashboardLayout>
      <style>{`
        .pro-card { background: #fff; border-radius: 20px; border: 1.5px solid ${C.blueLtr}; }
        .pro-tab { padding: .5rem 1.1rem; border-radius: 999px; border: 1.5px solid transparent; font-weight: 700; font-size: .8rem; cursor: pointer; transition: all .2s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .pro-tab.active { background: ${C.blue}; color: #fff; border-color: ${C.blue}; }
        .pro-tab:not(.active) { background: transparent; color: ${C.txM}; border-color: ${C.blueLtr}; }
        .pro-tab:not(.active):hover { background: ${C.sky}; }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid ${C.blueLtr}; border-radius: 12px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: ${C.tx}; outline: none; transition: border-color .18s, box-shadow .18s; background: ${C.bg}; }
        .form-input:focus { border-color: ${C.blue}; background: #fff; box-shadow: 0 0 0 3px ${C.blueLtr}40; }
        .form-input:disabled { background: ${C.sky}; color: ${C.txM}; border-color: transparent; cursor: default; }
        .badge-card { border-radius: 16px; padding: 1rem; transition: transform .2s, box-shadow .2s; cursor: default; }
        .badge-card.unlocked:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(37,99,168,.12); }
        .badge-card.locked { opacity: .45; filter: grayscale(.8); }
        .stat-mini { border-radius: 14px; padding: .85rem 1rem; text-align: center; transition: transform .2s; }
        .stat-mini:hover { transform: translateY(-2px); }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: ${C.blueDkr}; color: #fff; padding: .85rem 1.4rem; border-radius: 14px; font-size: .875rem; font-weight: 600; z-index: 500; box-shadow: 0 8px 24px rgba(0,0,0,.15); display: flex; align-items: center; gap: .5rem; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .ring-chart { transform: rotate(-90deg); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: C.sky, color: C.blue, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem", border: `1px solid ${C.blueLtr}` }}>
          👤 Profil Saya
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: C.blueDkr, marginBottom: ".2rem" }}>Profil Saya</h1>
        <p style={{ color: C.txM, fontSize: ".88rem" }}>Kelola informasi akun dan lihat statistik peminjaman kamu.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.25rem", alignItems: "flex-start" }}>

        {/* ── LEFT: Avatar Card ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Avatar */}
          <div className="pro-card" style={{ overflow: "hidden" }}>
            {/* Cover */}
            <div style={{ height: 90, background: `linear-gradient(135deg, ${C.blueDkr}, ${C.blue}, ${C.blueMd})`, position: "relative" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
              <div style={{ position: "absolute", bottom: -30, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
            </div>
            <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
              {/* Avatar circle */}
              <div style={{ position: "relative", display: "inline-block", marginTop: -35 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueMd})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: 800, border: `4px solid #fff`, boxShadow: `0 4px 16px ${C.blue}44`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  AF
                </div>
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: C.green, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: ".5rem", color: "#fff" }}>✓</span>
                </div>
              </div>
              <div style={{ marginTop: ".75rem" }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: C.blueDkr, marginBottom: ".15rem" }}>{profile.nama}</h2>
                <p style={{ fontSize: ".78rem", color: C.txM, marginBottom: ".5rem" }}>NIS: {profile.nis}</p>
                <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: C.sky, color: C.blue, padding: ".2rem .65rem", borderRadius: 999, border: `1px solid ${C.blueLtr}` }}>💻 {profile.kelas}</span>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: C.greenLt, color: C.greenDk, padding: ".2rem .65rem", borderRadius: 999 }}>🎖️ Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skor ketepatan */}
          <div className="pro-card" style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: ".78rem", fontWeight: 700, color: C.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "1rem" }}>Skor Ketepatan</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Ring */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <svg width="72" height="72" className="ring-chart">
                  <circle cx="36" cy="36" r="28" fill="none" stroke={C.sky} strokeWidth="8" />
                  <circle cx="36" cy="36" r="28" fill="none" stroke={C.green} strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.87)}`}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: ".85rem", fontWeight: 800, color: C.green, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>87%</p>
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: "1rem", color: C.greenDk }}>Sangat Baik</p>
                <p style={{ fontSize: ".73rem", color: C.txM, lineHeight: 1.4, marginTop: ".2rem" }}>Dari 24 peminjaman,<br/>18 dikembalikan tepat waktu</p>
              </div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="pro-card" style={{ padding: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
              {stats.map(s => (
                <div key={s.label} className="stat-mini" style={{ background: s.bg }}>
                  <p style={{ fontSize: "1.3rem", marginBottom: ".15rem" }}>{s.icon}</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: ".67rem", color: C.txM, marginTop: ".2rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="pro-card" style={{ padding: "1rem" }}>
            {[
              { to: "/dashboard/riwayat", icon: "📋", label: "Lihat Riwayat Lengkap" },
              { to: "/dashboard/settings", icon: "⚙️", label: "Pengaturan Akun" },
              { to: "/dashboard/peminjaman", icon: "📦", label: "Pinjam Barang Baru" },
            ].map((l, i) => (
              <Link key={i} to={l.to} style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".6rem .75rem", borderRadius: 10, textDecoration: "none", color: C.tx, fontSize: ".82rem", fontWeight: 600, transition: "background .15s", marginBottom: i < 2 ? ".3rem" : 0 }}
                onMouseEnter={e => e.currentTarget.style.background = C.sky}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontSize: "1rem" }}>{l.icon}</span> {l.label}
                <span style={{ marginLeft: "auto", color: C.txL, fontSize: ".8rem" }}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Tabs ── */}
        <div>
          {/* Tab nav */}
          <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t} className={`pro-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {tabLabel[t]}
              </button>
            ))}
          </div>

          {/* ── TAB: Info ── */}
          {activeTab === "info" && (
            <div className="pro-card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: C.blueDkr }}>Informasi Pribadi</h3>
                {!editMode ? (
                  <button onClick={() => { setDraft(profile); setEditMode(true); }} style={{ display: "flex", alignItems: "center", gap: ".4rem", background: C.sky, color: C.blue, border: `1.5px solid ${C.blueLtr}`, padding: ".45rem 1rem", borderRadius: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".8rem", cursor: "pointer" }}>
                    ✏️ Edit Profil
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <button onClick={() => setEditMode(false)} style={{ padding: ".45rem 1rem", borderRadius: 10, border: `1.5px solid ${C.blueLtr}`, background: "transparent", color: C.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: ".8rem", cursor: "pointer" }}>Batal</button>
                    <button onClick={handleSave} style={{ padding: ".45rem 1rem", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.blueDk}, ${C.blue})`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".8rem", cursor: "pointer" }}>💾 Simpan</button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[
                  { label: "Nama Lengkap", key: "nama", type: "text", icon: "👤" },
                  { label: "NIS / ID Siswa", key: "nis", type: "text", icon: "🪪" },
                  { label: "Kelas", key: "kelas", type: "text", icon: "🏫" },
                  { label: "Jurusan", key: "jurusan", type: "text", icon: "📚" },
                  { label: "Email", key: "email", type: "email", icon: "✉️" },
                  { label: "No. HP", key: "noHp", type: "tel", icon: "📱" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>
                      <span>{f.icon}</span> {f.label}
                    </label>
                    <input type={f.type} className="form-input" value={editMode ? draft[f.key] : profile[f.key]} disabled={!editMode} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>
                  📍 Alamat
                </label>
                <input type="text" className="form-input" value={editMode ? draft.alamat : profile.alamat} disabled={!editMode} onChange={e => setDraft({ ...draft, alamat: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>
                  📝 Bio
                </label>
                <textarea className="form-input" rows={3} value={editMode ? draft.bio : profile.bio} disabled={!editMode} onChange={e => setDraft({ ...draft, bio: e.target.value })} style={{ resize: "vertical" }} />
              </div>

              {!editMode && (
                <div style={{ marginTop: "1.25rem", padding: ".9rem 1.1rem", background: C.sky, borderRadius: 12, border: `1px dashed ${C.blueLtr}`, display: "flex", gap: ".65rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem" }}>🔒</span>
                  <div>
                    <p style={{ fontSize: ".78rem", fontWeight: 700, color: C.blue }}>Data Terproteksi</p>
                    <p style={{ fontSize: ".72rem", color: C.txM, marginTop: ".1rem" }}>Data profilmu tersimpan aman dan hanya bisa dilihat admin sekolah.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: Statistik ── */}
          {activeTab === "statistik" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Bar chart bulan */}
              <div className="pro-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr, marginBottom: "1.25rem" }}>📊 Aktivitas per Bulan</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: 120 }}>
                  {[
                    { bulan: "Nov", val: 2 }, { bulan: "Des", val: 4 }, { bulan: "Jan", val: 5 },
                    { bulan: "Feb", val: 3 }, { bulan: "Mar", val: 7 }, { bulan: "Apr", val: 3 },
                  ].map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: ".65rem", fontWeight: 700, color: C.blue }}>{d.val}</span>
                      <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: i === 4 ? `linear-gradient(180deg, ${C.blue}, ${C.blueDkr})` : `linear-gradient(180deg, ${C.blueLt}, ${C.blueMd})`, height: `${(d.val / 7) * 90}px`, transition: "height .5s ease", minHeight: 8 }} />
                      <span style={{ fontSize: ".65rem", color: C.txM, fontWeight: 600 }}>{d.bulan}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kategori barang */}
              <div className="pro-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr, marginBottom: "1.1rem" }}>🗂️ Kategori Barang Dipinjam</h3>
                {[
                  { kat: "Elektronik", jml: 10, color: C.blue, persen: 42 },
                  { kat: "Mikrokontroler", jml: 8, color: C.purple, persen: 33 },
                  { kat: "Aksesori", jml: 4, color: C.green, persen: 17 },
                  { kat: "AV / Proyektor", jml: 2, color: C.orange, persen: 8 },
                ].map((k, i) => (
                  <div key={i} style={{ marginBottom: ".85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".35rem" }}>
                      <p style={{ fontSize: ".8rem", fontWeight: 600, color: C.tx }}>{k.kat}</p>
                      <p style={{ fontSize: ".78rem", color: C.txM }}>{k.jml}x <span style={{ fontWeight: 700, color: k.color }}>({k.persen}%)</span></p>
                    </div>
                    <div style={{ height: 7, borderRadius: 99, background: C.sky, overflow: "hidden" }}>
                      <div style={{ width: `${k.persen}%`, height: "100%", borderRadius: 99, background: k.color, transition: "width .6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Info kartu */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".85rem" }}>
                {[
                  { label: "Rata-rata Durasi Pinjam", val: "4.2 hari", icon: "📅", color: C.blue, bg: C.sky },
                  { label: "Keterlambatan Rata-rata", val: "0.3 hari", icon: "⏰", color: C.orange, bg: C.orangeLt },
                  { label: "Jurusan Favorit", val: "PPLG", icon: "🏫", color: C.purple, bg: C.purpleLt },
                ].map((s, i) => (
                  <div key={i} style={{ background: s.bg, borderRadius: 14, padding: "1rem", textAlign: "center" }}>
                    <p style={{ fontSize: "1.4rem", marginBottom: ".4rem" }}>{s.icon}</p>
                    <p style={{ fontWeight: 800, fontSize: ".95rem", color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.val}</p>
                    <p style={{ fontSize: ".67rem", color: C.txM, marginTop: ".2rem", lineHeight: 1.3 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Badge ── */}
          {activeTab === "badge" && (
            <div>
              <div style={{ background: `linear-gradient(135deg, ${C.blueDkr}, ${C.blue})`, borderRadius: 20, padding: "1.35rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "2.5rem" }}>🏅</div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>3 dari 6 badge diraih</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.7)", marginTop: ".2rem" }}>Terus aktif meminjam dan kembalikan tepat waktu untuk unlock badge baru!</p>
                  <div style={{ marginTop: ".65rem", height: 6, borderRadius: 99, background: "rgba(255,255,255,.15)", overflow: "hidden", maxWidth: 300 }}>
                    <div style={{ width: "50%", height: "100%", borderRadius: 99, background: "#6EE7B7" }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: ".85rem" }}>
                {badges.map((b, i) => (
                  <div key={i} className={`badge-card ${b.unlock ? "unlocked" : "locked"}`} style={{ background: b.unlock ? b.bg : C.sky, border: `1.5px solid ${b.unlock ? b.color + "44" : C.blueLtr}`, textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: ".5rem", filter: b.unlock ? "none" : "grayscale(1)" }}>{b.icon}</div>
                    <p style={{ fontWeight: 800, fontSize: ".82rem", color: b.unlock ? b.color : C.txM }}>{b.label}</p>
                    <p style={{ fontSize: ".7rem", color: C.txM, marginTop: ".3rem", lineHeight: 1.4 }}>{b.desc}</p>
                    {!b.unlock && (
                      <span style={{ display: "inline-block", marginTop: ".5rem", fontSize: ".65rem", fontWeight: 700, background: C.sky, color: C.txM, padding: ".15rem .5rem", borderRadius: 999 }}>🔒 Terkunci</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Riwayat ── */}
          {activeTab === "riwayat" && (
            <div className="pro-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr }}>📋 Riwayat Terbaru</h3>
                <Link to="/dashboard/riwayat" style={{ fontSize: ".78rem", color: C.blue, fontWeight: 700, textDecoration: "none" }}>Lihat semua →</Link>
              </div>
              {riwayatSingkat.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".8rem", borderRadius: 12, marginBottom: ".5rem", background: C.sky, border: `1px solid ${C.blueLtr}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: statusStyle[r.status].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{r.emoji}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: ".82rem", color: C.tx }}>{r.nama}</p>
                      <p style={{ fontSize: ".7rem", color: C.txM }}>{r.tgl}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: statusStyle[r.status].bg, color: statusStyle[r.status].c, padding: ".22rem .65rem", borderRadius: 999 }}>
                    {statusStyle[r.status].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {saved && <div className="toast">✅ Profil berhasil disimpan!</div>}
    </DashboardLayout>
  );
}