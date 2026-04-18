import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
  green: "#3DBD8F", greenLt: "#E8F8F2",
  yellow: "#F5A623", yellowLt: "#FEF9EC",
  red: "#EF4444", redLt: "#FEF0EF",
};

const jurusanColor = {
  PPLG: { bg: "#BFDBFE", c: "#2563A8" },
  TJKT: { bg: "#FED7AA", c: "#EA580C" },
  DKV: { bg: "#FEF08A", c: "#CA8A04" },
  LK: { bg: "#BBF7D0", c: "#16A34A" },
  PS: { bg: "#BFDBFE", c: "#1D4ED8" },
};

const riwayat = [
  { id: "SJR-001", nama: "Laptop Asus VivoBook", jurusan: "PPLG", emoji: "💻", tglPinjam: "15 Apr 2025", tglKembali: "20 Apr 2025", status: "aktif", ket: "Untuk praktikum web" },
  { id: "SJR-002", nama: "Proyektor Epson EB-X41", jurusan: "TJKT", emoji: "📽️", tglPinjam: "10 Apr 2025", tglKembali: "12 Apr 2025", status: "kembali", ket: "Presentasi jaringan" },
  { id: "SJR-003", nama: "Arduino Uno Rev3", jurusan: "PPLG", emoji: "🔌", tglPinjam: "5 Apr 2025", tglKembali: "10 Apr 2025", status: "telat", ket: "Proyek IoT" },
  { id: "SJR-004", nama: "Drawing Tablet Wacom", jurusan: "DKV", emoji: "🎨", tglPinjam: "1 Apr 2025", tglKembali: "5 Apr 2025", status: "kembali", ket: "Desain poster" },
  { id: "SJR-005", nama: "Kamera Canon EOS M50", jurusan: "DKV", emoji: "📷", tglPinjam: "28 Mar 2025", tglKembali: "30 Mar 2025", status: "kembali", ket: "Foto produk" },
  { id: "SJR-006", nama: "Router MikroTik RB951", jurusan: "TJKT", emoji: "📡", tglPinjam: "20 Mar 2025", tglKembali: "25 Mar 2025", status: "kembali", ket: "Lab jaringan" },
  { id: "SJR-007", nama: "Kabel HDMI 3m", jurusan: "PPLG", emoji: "🖥️", tglPinjam: "13 Apr 2025", tglKembali: "18 Apr 2025", status: "aktif", ket: "Demo aplikasi" },
];

const statusStyle = {
  aktif: { bg: COLORS.yellowLt, c: COLORS.yellow, label: "Aktif", icon: "⏳" },
  kembali: { bg: COLORS.greenLt, c: COLORS.green, label: "Dikembalikan", icon: "✅" },
  telat: { bg: COLORS.redLt, c: COLORS.red, label: "Terlambat", icon: "⚠️" },
};

const ringkasan = [
  { label: "Total Riwayat", val: 24, icon: "📋", bg: COLORS.blueLtr, c: COLORS.blueDk },
  { label: "Dikembalikan", val: 18, icon: "✅", bg: COLORS.greenLt, c: COLORS.green },
  { label: "Masih Aktif", val: 5, icon: "⏳", bg: COLORS.yellowLt, c: COLORS.yellow },
  { label: "Terlambat", val: 1, icon: "⚠️", bg: COLORS.redLt, c: COLORS.red },
];

export default function RiwayatPage() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const filtered = riwayat.filter(r => {
    const matchStatus = filter === "Semua" || r.status === filter.toLowerCase() || (filter === "Terlambat" && r.status === "telat");
    const matchSearch = r.nama.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <DashboardLayout>
      <style>{`
        .riwayat-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 1rem; align-items: center; padding: .9rem 1.1rem; border-radius: 12px; transition: background .15s; cursor: pointer; }
        .riwayat-row:hover { background: ${COLORS.sky}; }
        .filter-btn { border: none; cursor: pointer; border-radius: 99px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 600; font-size: .8rem; padding: .4rem 1rem; transition: all .18s; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.5); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(6px); }
        .modal-box { background: #fff; border-radius: 24px; padding: 2rem; width: 100%; max-width: 440px; box-shadow: 0 24px 64px rgba(0,0,0,.15); }
        .timeline-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .timeline-line { width: 2px; background: #E8EFF8; flex: 1; margin: 2px auto; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          📋 Riwayat
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Riwayat Peminjaman</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Semua catatan peminjaman barang kamu di SIJAR.</p>
      </div>

      {/* Ringkasan */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: ".85rem", marginBottom: "1.5rem" }}>
        {ringkasan.map(r => (
          <div key={r.label} style={{ background: COLORS.white, borderRadius: 16, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{r.icon}</div>
            <div>
              <p style={{ fontSize: "1.4rem", fontWeight: 800, color: r.c, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{r.val}</p>
              <p style={{ fontSize: ".72rem", color: COLORS.txM, marginTop: ".1rem" }}>{r.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: COLORS.white, borderRadius: 18, border: "1px solid rgba(74,144,217,.08)", overflow: "hidden" }}>
        {/* Filter + search */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(74,144,217,.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {["Semua", "Aktif", "Dikembalikan", "Terlambat"].map(f => (
              <button
                key={f}
                className="filter-btn"
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? COLORS.blueDk : COLORS.sky,
                  color: filter === f ? "#fff" : COLORS.txM,
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.txM }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari barang / ID..."
              style={{ paddingLeft: "2.1rem", paddingRight: ".9rem", paddingTop: ".5rem", paddingBottom: ".5rem", border: "1.5px solid #E8EFF8", borderRadius: 10, fontSize: ".83rem", color: COLORS.tx, background: "#F8FBFF", outline: "none", fontFamily: "'DM Sans',sans-serif", width: 200 }}
            />
          </div>
        </div>

        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "1rem", padding: ".6rem 1.1rem", background: COLORS.sky }}>
          {["Barang", "Jurusan", "Tgl Pinjam", "Tgl Kembali", "Status"].map(h => (
            <p key={h} style={{ fontSize: ".72rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div style={{ padding: ".5rem .5rem" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: COLORS.txM }}>
              <p style={{ fontSize: "2rem", marginBottom: ".5rem" }}>📭</p>
              <p style={{ fontWeight: 600 }}>Tidak ada riwayat</p>
            </div>
          ) : filtered.map(r => (
            <div key={r.id} className="riwayat-row" onClick={() => setDetail(r)}>
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: jurusanColor[r.jurusan]?.bg + "60", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{r.emoji}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: ".83rem", color: COLORS.tx }}>{r.nama}</p>
                  <p style={{ fontSize: ".7rem", color: COLORS.txM }}>{r.id}</p>
                </div>
              </div>
              <span style={{ fontSize: ".72rem", fontWeight: 700, background: jurusanColor[r.jurusan]?.bg, color: jurusanColor[r.jurusan]?.c, padding: ".2rem .55rem", borderRadius: 9999, width: "fit-content" }}>{r.jurusan}</span>
              <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{r.tglPinjam}</p>
              <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{r.tglKembali}</p>
              <span style={{ fontSize: ".7rem", fontWeight: 700, background: statusStyle[r.status].bg, color: statusStyle[r.status].c, padding: ".22rem .65rem", borderRadius: 9999, whiteSpace: "nowrap" }}>
                {statusStyle[r.status].icon} {statusStyle[r.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal-box">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: COLORS.blueDkr }}>Detail Peminjaman</h3>
              <button onClick={() => setDetail(null)} style={{ background: COLORS.sky, border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: "1rem", color: COLORS.txM }}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.25rem", padding: "1rem", background: COLORS.sky, borderRadius: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: jurusanColor[detail.jurusan]?.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem" }}>{detail.emoji}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr }}>{detail.nama}</p>
                <div style={{ display: "flex", gap: ".4rem", marginTop: ".3rem" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: jurusanColor[detail.jurusan]?.bg, color: jurusanColor[detail.jurusan]?.c, padding: ".15rem .5rem", borderRadius: 9999 }}>{detail.jurusan}</span>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: statusStyle[detail.status].bg, color: statusStyle[detail.status].c, padding: ".15rem .5rem", borderRadius: 9999 }}>{statusStyle[detail.status].label}</span>
                </div>
              </div>
            </div>
            {[["ID Peminjaman", detail.id], ["Tanggal Pinjam", detail.tglPinjam], ["Tanggal Kembali", detail.tglKembali], ["Keterangan", detail.ket]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", borderBottom: "1px solid rgba(74,144,217,.06)" }}>
                <p style={{ fontSize: ".8rem", color: COLORS.txM }}>{k}</p>
                <p style={{ fontSize: ".8rem", fontWeight: 600, color: COLORS.tx, textAlign: "right", maxWidth: "60%" }}>{v}</p>
              </div>
            ))}
            <button onClick={() => setDetail(null)} style={{ width: "100%", marginTop: "1.25rem", padding: ".65rem", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${COLORS.blueDkr}, ${COLORS.blue})`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: ".88rem" }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}