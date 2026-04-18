import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLt: "#7BB8E8", blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
};

const jurusanData = [
  {
    kode: "PPLG", nama: "Pengembangan Perangkat Lunak & GIM", icon: "💻",
    bg: "#EEF5FF", accent: "#2563A8",
    konsentrasi: ["Rekayasa Perangkat Lunak", "Pengembangan Game", "UI/UX Design"],
    totalBarang: 14, tersedia: 8, petugas: "Bpk. Arif Setiawan, S.Kom.",
    desc: "Jurusan PPLG berfokus pada pengembangan aplikasi berbasis web, mobile, dan desktop serta teknologi pengembangan game modern.",
    kelas: ["X PPLG 1", "X PPLG 2", "XI PPLG 1", "XI PPLG 2", "XI PPLG 3", "XII PPLG 1", "XII PPLG 2"],
  },
  {
    kode: "TJKT", nama: "Teknik Jaringan Komputer & Telekomunikasi", icon: "🌐",
    bg: "#E6F4FF", accent: "#0369A1",
    konsentrasi: ["Jaringan Komputer", "Telekomunikasi", "Keamanan Jaringan"],
    totalBarang: 13, tersedia: 12, petugas: "Ibu Dewi Rahayu, S.T.",
    desc: "TJKT mempersiapkan siswa untuk menguasai instalasi dan manajemen jaringan komputer serta teknologi telekomunikasi.",
    kelas: ["X TJKT 1", "X TJKT 2", "XI TJKT 1", "XI TJKT 2", "XII TJKT 1", "XII TJKT 2"],
  },
  {
    kode: "LK", nama: "Layanan Kesehatan", icon: "🏥",
    bg: "#E6FFF5", accent: "#059669",
    konsentrasi: ["Keperawatan", "Farmasi Klinis", "Asisten Tenaga Kesehatan"],
    totalBarang: 11, tersedia: 5, petugas: "Ibu Sri Mulyani, S.Kep.",
    desc: "Program LK menyiapkan tenaga asisten kesehatan yang kompeten di bidang keperawatan dan layanan kesehatan masyarakat.",
    kelas: ["X LK 1", "X LK 2", "XI LK 1", "XI LK 2", "XII LK 1", "XII LK 2"],
  },
  {
    kode: "PS", nama: "Perhotelan & Spa", icon: "🏨",
    bg: "#FEF9EC", accent: "#B45309",
    konsentrasi: ["Tata Graha", "Front Office", "Spa & Beauty"],
    totalBarang: 8, tersedia: 7, petugas: "Ibu Anita Wijaya, S.Par.",
    desc: "Jurusan PS membekali siswa dengan keterampilan profesional di industri perhotelan, pariwisata, dan layanan spa.",
    kelas: ["X PS 1", "XI PS 1", "XII PS 1"],
  },
  {
    kode: "DKV", nama: "Desain Komunikasi Visual", icon: "🎨",
    bg: "#FFF0F6", accent: "#BE185D",
    konsentrasi: ["Desain Grafis", "Fotografi & Videografi", "Animasi Digital"],
    totalBarang: 12, tersedia: 9, petugas: "Bpk. Hendra Kusuma, S.Sn.",
    desc: "DKV mengembangkan kemampuan kreativitas visual siswa untuk berkarir di industri desain grafis, media, dan periklanan.",
    kelas: ["X DKV 1", "X DKV 2", "XI DKV 1", "XI DKV 2", "XII DKV 1", "XII DKV 2"],
  },
];

export default function JurusanPage() {
  const [active, setActive] = useState(null);

  const totalAll = jurusanData.reduce((a, b) => a + b.totalBarang, 0);

  return (
    <DashboardLayout>
      <style>{`
        .jur-card { background: #fff; border-radius: 16px; border: 1px solid rgba(74,144,217,.08); transition: box-shadow .22s, transform .22s; cursor: pointer; overflow: hidden; }
        .jur-card:hover { box-shadow: 0 6px 28px rgba(74,144,217,.18); transform: translateY(-3px); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-box { background: #fff; border-radius: 22px; width: 100%; max-width: 540px; box-shadow: 0 20px 60px rgba(0,0,0,.18); overflow: hidden; max-height: 90vh; overflow-y: auto; }
        .btn-primary { background: #4A90D9; color: #fff; border: none; padding: .65rem 1.4rem; border-radius: 10px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 700; font-size: .875rem; cursor: pointer; transition: background .2s; }
        .btn-primary:hover { background: #2563A8; }
        .kelas-chip { padding: .28rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          🏫 Jurusan
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Data Jurusan</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Informasi lengkap 5 program keahlian di SMKN 8 Semarang.</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Jurusan", val: jurusanData.length, c: COLORS.blue },
          { label: "Total Barang", val: totalAll, c: "#2A9D6E" },
          { label: "Konsentrasi", val: jurusanData.reduce((a, b) => a + b.konsentrasi.length, 0), c: "#C4973A" },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.white, borderRadius: 12, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.1rem" }}>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.c, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.val}</p>
            <p style={{ fontSize: ".8rem", color: COLORS.txM, fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.1rem" }}>
        {jurusanData.map(j => (
          <div key={j.kode} className="jur-card" onClick={() => setActive(j)}>
            <div style={{ height: 8, background: j.accent }} />
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: ".85rem", marginBottom: "1rem" }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: j.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{j.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 800, color: COLORS.blueDkr, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{j.kode}</span>
                    <span style={{ fontSize: ".7rem", background: j.bg, color: j.accent, padding: ".2rem .55rem", borderRadius: 9999, fontWeight: 700 }}>{j.kelas.length} kelas</span>
                  </div>
                  <p style={{ fontSize: ".78rem", color: COLORS.txM, lineHeight: 1.4 }}>{j.nama}</p>
                </div>
              </div>

              <p style={{ fontSize: ".8rem", color: COLORS.txM, lineHeight: 1.6, marginBottom: "1rem" }}>{j.desc}</p>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>Konsentrasi</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                  {j.konsentrasi.map(k => (
                    <span key={k} className="kelas-chip" style={{ background: j.bg, color: j.accent }}>{k}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".65rem", padding: ".75rem", background: COLORS.sky, borderRadius: 10 }}>
                <div>
                  <p style={{ fontSize: "1.2rem", fontWeight: 800, color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{j.totalBarang}</p>
                  <p style={{ fontSize: ".72rem", color: COLORS.txM }}>Total Barang</p>
                </div>
                <div>
                  <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2A9D6E", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{j.tersedia}</p>
                  <p style={{ fontSize: ".72rem", color: COLORS.txM }}>Tersedia</p>
                </div>
              </div>

              <div style={{ marginTop: ".85rem", display: "flex", alignItems: "center", gap: ".5rem", color: COLORS.txM, fontSize: ".78rem" }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{j.petugas}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {active && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setActive(null)}>
          <div className="modal-box">
            <div style={{ height: 10, background: active.accent }} />
            <div style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: active.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>{active.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 800, fontSize: "1.2rem", color: COLORS.blueDkr }}>{active.kode}</h3>
                  <p style={{ fontSize: ".82rem", color: COLORS.txM }}>{active.nama}</p>
                </div>
                <button onClick={() => setActive(null)} style={{ background: COLORS.sky, border: "none", borderRadius: 8, padding: ".35rem .55rem", cursor: "pointer", color: COLORS.txM }}>✕</button>
              </div>

              <p style={{ fontSize: ".85rem", color: COLORS.txM, lineHeight: 1.7, marginBottom: "1.25rem", padding: ".85rem", background: COLORS.sky, borderRadius: 10 }}>{active.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".75rem", marginBottom: "1.25rem" }}>
                {[["Total Barang", active.totalBarang, COLORS.blue], ["Tersedia", active.tersedia, "#2A9D6E"], ["Kelas", active.kelas.length, "#C4973A"]].map(([l, v, c]) => (
                  <div key={l} style={{ background: COLORS.sky, borderRadius: 10, padding: ".75rem", textAlign: "center" }}>
                    <p style={{ fontSize: "1.4rem", fontWeight: 800, color: c, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{v}</p>
                    <p style={{ fontSize: ".72rem", color: COLORS.txM }}>{l}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "1.1rem" }}>
                <p style={{ fontSize: ".75rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".5rem" }}>Konsentrasi Keahlian</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {active.konsentrasi.map(k => (
                    <span key={k} className="kelas-chip" style={{ background: active.bg, color: active.accent }}>{k}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: ".75rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".5rem" }}>Daftar Kelas</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {active.kelas.map(k => (
                    <span key={k} className="kelas-chip" style={{ background: COLORS.sky, color: COLORS.txM }}>{k}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".75rem .9rem", background: COLORS.sky, borderRadius: 10, marginBottom: "1.25rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: active.bg, display: "flex", alignItems: "center", justifyContent: "center", color: active.accent }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: ".7rem", color: COLORS.txM }}>Penanggung Jawab</p>
                  <p style={{ fontSize: ".83rem", fontWeight: 600, color: COLORS.tx }}>{active.petugas}</p>
                </div>
              </div>

              <button className="btn-primary" style={{ width: "100%" }} onClick={() => setActive(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}