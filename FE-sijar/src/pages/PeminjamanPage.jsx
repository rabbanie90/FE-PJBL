import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

const JURUSAN_THEME = {
  Semua: { bg: "#F0F7FF", active: "#2563A8", activeBg: "#DBEAFE", border: "#DBEAFE", label: "Semua" },
  PPLG: { bg: "#EFF6FF", active: "#2563A8", activeBg: "#BFDBFE", border: "#BFDBFE", label: "PPLG" },
  TJKT: { bg: "#FFF7ED", active: "#EA580C", activeBg: "#FED7AA", border: "#FED7AA", label: "TJKT" },
  DKV: { bg: "#FEFCE8", active: "#CA8A04", activeBg: "#FEF08A", border: "#FEF08A", label: "DKV" },
  LK: { bg: "#F0FDF4", active: "#16A34A", activeBg: "#BBF7D0", border: "#BBF7D0", label: "LK" },
  PS: { bg: "#EFF6FF", active: "#1D4ED8", activeBg: "#BFDBFE", border: "#BFDBFE", label: "PS" },
};

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
  green: "#3DBD8F", greenLt: "#E8F8F2",
  red: "#EF4444", redLt: "#FEF0EF",
};

const barangList = [
  { id: 1, nama: "Laptop Asus VivoBook", jurusan: "PPLG", kategori: "Elektronik", stok: 3, total: 5, emoji: "💻", status: "Tersedia" },
  { id: 2, nama: "Arduino Uno Rev3", jurusan: "PPLG", kategori: "Mikrokontroler", stok: 8, total: 10, emoji: "🔌", status: "Tersedia" },
  { id: 3, nama: "Raspberry Pi 4", jurusan: "PPLG", kategori: "Komputer Mini", stok: 0, total: 4, emoji: "🖥️", status: "Habis" },
  { id: 4, nama: "Proyektor Epson EB-X41", jurusan: "TJKT", kategori: "Elektronik", stok: 2, total: 3, emoji: "📽️", status: "Tersedia" },
  { id: 5, nama: "Router MikroTik RB951", jurusan: "TJKT", kategori: "Jaringan", stok: 6, total: 6, emoji: "📡", status: "Tersedia" },
  { id: 6, nama: "Switch Cisco Catalyst", jurusan: "TJKT", kategori: "Jaringan", stok: 4, total: 4, emoji: "🔌", status: "Tersedia" },
  { id: 7, nama: "Drawing Tablet Wacom", jurusan: "DKV", kategori: "Desain", stok: 3, total: 5, emoji: "🎨", status: "Tersedia" },
  { id: 8, nama: "Kamera Canon EOS M50", jurusan: "DKV", kategori: "Fotografi", stok: 1, total: 2, emoji: "📷", status: "Tersedia" },
  { id: 9, nama: "Mesin Jahit Brother", jurusan: "LK", kategori: "Alat Jahit", stok: 4, total: 8, emoji: "🧵", status: "Tersedia" },
  { id: 10, nama: "Manequin Display", jurusan: "LK", kategori: "Display", stok: 5, total: 5, emoji: "👗", status: "Tersedia" },
  { id: 11, nama: "Peralatan Masak Lengkap", jurusan: "PS", kategori: "Memasak", stok: 2, total: 4, emoji: "🍳", status: "Tersedia" },
  { id: 12, nama: "Timbangan Digital", jurusan: "PS", kategori: "Alat Ukur", stok: 3, total: 3, emoji: "⚖️", status: "Tersedia" },
];

export default function PeminjamanPage() {
  const [activeJurusan, setActiveJurusan] = useState("Semua");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [tgl, setTgl] = useState("");
  const [tglKembali, setTglKembali] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  const theme = JURUSAN_THEME[activeJurusan];

  const filtered = barangList.filter(b => {
    const matchJurusan = activeJurusan === "Semua" || b.jurusan === activeJurusan;
    const matchSearch = b.nama.toLowerCase().includes(search.toLowerCase());
    return matchJurusan && matchSearch;
  });

  const handlePinjam = () => {
    if (!tgl || !tglKembali) return;
    setModal(null);
    setBerhasil(true);
    setTgl(""); setTglKembali("");
    setTimeout(() => setBerhasil(false), 3000);
  };

  return (
    <DashboardLayout>
      <style>{`
        .barang-card { background: #fff; border-radius: 18px; border: 1px solid rgba(74,144,217,.08); overflow: hidden; transition: box-shadow .22s, transform .22s; }
        .barang-card:hover { box-shadow: 0 10px 32px rgba(74,144,217,.13); transform: translateY(-3px); }
        .jurusan-btn { border: none; cursor: pointer; border-radius: 99px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 600; font-size: .82rem; padding: .45rem 1.1rem; transition: all .18s; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.5); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(6px); }
        .modal-box { background: #fff; border-radius: 24px; padding: 2rem; width: 100%; max-width: 440px; box-shadow: 0 24px 64px rgba(0,0,0,.15); }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid #E8EFF8; border-radius: 10px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: #1E3A5F; outline: none; transition: border-color .18s; background: #F8FBFF; }
        .form-input:focus { border-color: #4A90D9; background: #fff; }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: #1A3F70; color: #fff; padding: .85rem 1.4rem; border-radius: 14px; font-size: .875rem; font-weight: 600; z-index: 500; box-shadow: 0 8px 24px rgba(0,0,0,.15); display: flex; align-items: center; gap: .5rem; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .progress-bar { height: 5px; border-radius: 99px; background: rgba(74,144,217,.12); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          📦 Peminjaman
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Peminjaman Barang</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Pilih barang yang ingin kamu pinjam dari inventaris jurusan.</p>
      </div>

      {/* Filter bar */}
      <div style={{ background: COLORS.white, borderRadius: 16, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {Object.keys(JURUSAN_THEME).map(j => {
            const t = JURUSAN_THEME[j];
            const isActive = activeJurusan === j;
            return (
              <button
                key={j}
                className="jurusan-btn"
                onClick={() => setActiveJurusan(j)}
                style={{
                  background: isActive ? t.activeBg : "#F0F7FF",
                  color: isActive ? t.active : COLORS.txM,
                  border: isActive ? `2px solid ${t.active}` : "2px solid transparent",
                  boxShadow: isActive ? `0 2px 10px ${t.activeBg}` : "none",
                }}
              >
                {j}
              </button>
            );
          })}
        </div>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.txM }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari barang..."
            style={{ paddingLeft: "2.2rem", paddingRight: ".9rem", paddingTop: ".55rem", paddingBottom: ".55rem", border: "1.5px solid #E8EFF8", borderRadius: 12, fontSize: ".85rem", color: COLORS.tx, background: "#F8FBFF", outline: "none", fontFamily: "'DM Sans',sans-serif", width: 200 }}
          />
        </div>
      </div>

      {/* Barang grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.1rem" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: COLORS.txM }}>
            <p style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🔍</p>
            <p style={{ fontWeight: 600 }}>Barang tidak ditemukan</p>
          </div>
        ) : filtered.map(b => {
          const jTheme = JURUSAN_THEME[b.jurusan];
          const persen = Math.round((b.stok / b.total) * 100);
          return (
            <div key={b.id} className="barang-card">
              <div style={{ height: 130, background: `linear-gradient(135deg, ${jTheme.bg}, ${jTheme.activeBg}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>
                {b.emoji}
              </div>
              <div style={{ padding: "1rem 1.1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: ".5rem" }}>
                  <p style={{ fontWeight: 700, fontSize: ".9rem", color: COLORS.tx, flex: 1, marginRight: ".5rem" }}>{b.nama}</p>
                  <span style={{ fontSize: ".68rem", fontWeight: 700, background: b.status === "Tersedia" ? COLORS.greenLt : COLORS.redLt, color: b.status === "Tersedia" ? COLORS.green : COLORS.red, padding: ".2rem .55rem", borderRadius: 9999, flexShrink: 0 }}>
                    {b.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: ".4rem", marginBottom: ".75rem" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: jTheme.activeBg, color: jTheme.active, padding: ".15rem .5rem", borderRadius: 9999 }}>{b.jurusan}</span>
                  <span style={{ fontSize: ".7rem", color: COLORS.txM, background: COLORS.sky, padding: ".15rem .5rem", borderRadius: 9999 }}>{b.kategori}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", color: COLORS.txM, marginBottom: ".35rem" }}>
                  <span>Stok tersedia</span>
                  <span style={{ fontWeight: 700, color: b.stok === 0 ? COLORS.red : COLORS.tx }}>{b.stok}/{b.total}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: ".85rem" }}>
                  <div className="progress-fill" style={{ width: `${persen}%`, background: b.stok === 0 ? COLORS.red : persen < 40 ? COLORS.yellow : `linear-gradient(90deg, ${jTheme.active}, ${jTheme.activeBg})` }} />
                </div>
                <button
                  disabled={b.stok === 0}
                  onClick={() => b.stok > 0 && setModal(b)}
                  style={{ width: "100%", padding: ".6rem", borderRadius: 12, border: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".83rem", cursor: b.stok === 0 ? "not-allowed" : "pointer", background: b.stok === 0 ? "#E8EFF8" : `linear-gradient(135deg, ${jTheme.active}, ${COLORS.blueDk})`, color: b.stok === 0 ? COLORS.txM : "#fff", transition: "opacity .18s" }}
                >
                  {b.stok === 0 ? "Stok Habis" : "Pinjam Sekarang"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal pinjam */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: JURUSAN_THEME[modal.jurusan].activeBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{modal.emoji}</div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", color: COLORS.blueDkr }}>{modal.nama}</h3>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{modal.jurusan} · {modal.kategori}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Tanggal Pinjam</label>
                <input type="date" className="form-input" value={tgl} onChange={e => setTgl(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Tanggal Kembali</label>
                <input type="date" className="form-input" value={tglKembali} onChange={e => setTglKembali(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: ".75rem" }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: ".65rem", borderRadius: 12, border: "1.5px solid #D6EAFA", background: "transparent", color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, cursor: "pointer" }}>Batal</button>
              <button onClick={handlePinjam} style={{ flex: 2, padding: ".65rem", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${COLORS.blueDk}, ${COLORS.blue})`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>Konfirmasi Pinjam</button>
            </div>
          </div>
        </div>
      )}

      {berhasil && <div className="toast">✅ Peminjaman berhasil diajukan!</div>}
    </DashboardLayout>
  );
}