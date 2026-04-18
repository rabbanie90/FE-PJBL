import { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLt: "#7BB8E8", blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
};

const inventarisData = [
  { id: "INV-001", name: "Laptop Dell Inspiron 15", jurusan: "PPLG", kategori: "Elektronik", total: 8, tersedia: 5, dipinjam: 3, kondisi: "Baik", tahun: 2022, icon: "💻" },
  { id: "INV-002", name: "Laptop ASUS VivoBook 14", jurusan: "PPLG", kategori: "Elektronik", total: 6, tersedia: 3, dipinjam: 3, kondisi: "Baik", tahun: 2023, icon: "💻" },
  { id: "INV-003", name: "Proyektor Epson EB-X41", jurusan: "TJKT", kategori: "Elektronik", total: 3, tersedia: 2, dipinjam: 1, kondisi: "Baik", tahun: 2021, icon: "📽️" },
  { id: "INV-004", name: "Router MikroTik RB951", jurusan: "TJKT", kategori: "Jaringan", total: 6, tersedia: 6, dipinjam: 0, kondisi: "Baik", tahun: 2022, icon: "📡" },
  { id: "INV-005", name: "Switch Cisco Catalyst 2960", jurusan: "TJKT", kategori: "Jaringan", total: 4, tersedia: 4, dipinjam: 0, kondisi: "Baik", tahun: 2022, icon: "🔌" },
  { id: "INV-006", name: "Stetoskop Littmann Classic III", jurusan: "LK", kategori: "Medis", total: 4, tersedia: 0, dipinjam: 4, kondisi: "Baik", tahun: 2023, icon: "🩺" },
  { id: "INV-007", name: "Tensimeter Digital Omron", jurusan: "LK", kategori: "Medis", total: 5, tersedia: 3, dipinjam: 2, kondisi: "Baik", tahun: 2023, icon: "🩸" },
  { id: "INV-008", name: "Manekin Anatomi Manusia", jurusan: "LK", kategori: "Medis", total: 2, tersedia: 2, dipinjam: 0, kondisi: "Baik", tahun: 2020, icon: "🫀" },
  { id: "INV-009", name: "Kamera DSLR Canon EOS 200D", jurusan: "DKV", kategori: "Elektronik", total: 3, tersedia: 3, dipinjam: 0, kondisi: "Baik", tahun: 2022, icon: "📷" },
  { id: "INV-010", name: "Tablet Grafis Wacom Intuos", jurusan: "DKV", kategori: "Elektronik", total: 5, tersedia: 4, dipinjam: 1, kondisi: "Baik", tahun: 2023, icon: "🖥️" },
  { id: "INV-011", name: "Drawing Tablet XP-Pen Deco", jurusan: "DKV", kategori: "Elektronik", total: 4, tersedia: 2, dipinjam: 2, kondisi: "Baik", tahun: 2023, icon: "🖊️" },
  { id: "INV-012", name: "Tripod Kamera Beike BK-666", jurusan: "DKV", kategori: "Aksesoris", total: 5, tersedia: 5, dipinjam: 0, kondisi: "Baik", tahun: 2022, icon: "📸" },
];

export default function InventarisPage() {
  const [filterJurusan, setFilterJurusan] = useState("Semua");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid"); // grid | table
  const [detail, setDetail] = useState(null);

  const jurusanList = ["Semua", "PPLG", "TJKT", "LK", "PS", "DKV"];

  const filtered = inventarisData.filter(b => {
    const mJ = filterJurusan === "Semua" || b.jurusan === filterJurusan;
    const mS = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return mJ && mS;
  });

  const totalBarang = inventarisData.reduce((a, b) => a + b.total, 0);
  const totalTersedia = inventarisData.reduce((a, b) => a + b.tersedia, 0);
  const totalDipinjam = inventarisData.reduce((a, b) => a + b.dipinjam, 0);

  return (
    <DashboardLayout>
      <style>{`
        .inv-card { background: #fff; border-radius: 14px; border: 1px solid rgba(74,144,217,.08); transition: box-shadow .22s, transform .22s; overflow: hidden; }
        .inv-card:hover { box-shadow: 0 6px 28px rgba(74,144,217,.16); transform: translateY(-2px); }
        .filter-chip { padding: .3rem .85rem; border-radius: 9999px; font-size: .78rem; font-weight: 600; cursor: pointer; border: 1.5px solid transparent; transition: all .18s; font-family: 'DM Sans',sans-serif; }
        .tbl-row { display: grid; grid-template-columns: 80px 2.5fr 70px 90px 80px 80px 80px 60px; gap: .75rem; align-items: center; padding: .75rem 1rem; border-radius: 10px; transition: background .15s; }
        .tbl-row:hover { background: ${COLORS.sky}; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-box { background: #fff; border-radius: 20px; padding: 2rem; width: 100%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
        .form-input { width: 100%; padding: .6rem .85rem; border: 1.5px solid #E8EFF8; border-radius: 10px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: #1E3A5F; outline: none; background: #F8FBFF; }
        .btn-primary { background: #4A90D9; color: #fff; border: none; padding: .65rem 1.4rem; border-radius: 10px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 700; font-size: .875rem; cursor: pointer; transition: background .2s; }
        .btn-primary:hover { background: #2563A8; }
        .view-btn { padding: .4rem .65rem; border-radius: 8px; border: none; cursor: pointer; transition: all .15s; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          🗃️ Inventaris
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Inventaris Barang</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Data lengkap semua barang inventaris jurusan di SMKN 8 Semarang.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Total Barang", val: totalBarang, bg: COLORS.blueLtr, c: COLORS.blue },
          { label: "Tersedia", val: totalTersedia, bg: "#EAF7F0", c: "#2A9D6E" },
          { label: "Dipinjam", val: totalDipinjam, bg: "#FEF9EC", c: "#C4973A" },
          { label: "Jenis Barang", val: inventarisData.length, bg: "#EEF5FF", c: "#2563A8" },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.white, borderRadius: 12, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.1rem" }}>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: s.c, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.val}</p>
            <p style={{ fontSize: ".8rem", color: COLORS.txM, fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ background: COLORS.white, borderRadius: 14, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.25rem", marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: ".75rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
          {jurusanList.map(j => (
            <button key={j} className="filter-chip" onClick={() => setFilterJurusan(j)}
              style={{ background: filterJurusan === j ? COLORS.blue : COLORS.sky, color: filterJurusan === j ? "#fff" : COLORS.txM, borderColor: filterJurusan === j ? COLORS.blue : "transparent" }}
            >{j}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.txM }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
            <input className="form-input" placeholder="Cari barang..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2rem", width: 190 }} />
          </div>
          <div style={{ display: "flex", gap: ".3rem", background: COLORS.sky, padding: ".25rem", borderRadius: 9 }}>
            <button className="view-btn" onClick={() => setView("grid")} style={{ background: view === "grid" ? "#fff" : "transparent", color: view === "grid" ? COLORS.blue : COLORS.txM, boxShadow: view === "grid" ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button className="view-btn" onClick={() => setView("table")} style={{ background: view === "table" ? "#fff" : "transparent", color: view === "table" ? COLORS.blue : COLORS.txM, boxShadow: view === "table" ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {filtered.map(b => (
            <div key={b.id} className="inv-card" onClick={() => setDetail(b)} style={{ cursor: "pointer" }}>
              <div style={{ height: 100, background: `linear-gradient(135deg, ${COLORS.blueLtr}, ${COLORS.sky})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{b.icon}</div>
              <div style={{ padding: ".9rem" }}>
                <p style={{ fontSize: ".7rem", fontFamily: "monospace", color: COLORS.txM, marginBottom: ".2rem" }}>{b.id}</p>
                <h4 style={{ fontWeight: 700, fontSize: ".85rem", color: COLORS.tx, marginBottom: ".5rem", lineHeight: 1.3 }}>{b.name}</h4>
                <div style={{ display: "flex", gap: ".35rem", marginBottom: ".65rem" }}>
                  <span style={{ fontSize: ".68rem", background: COLORS.blueLtr, color: COLORS.blueDk, padding: ".15rem .45rem", borderRadius: 9999, fontWeight: 600 }}>{b.jurusan}</span>
                  <span style={{ fontSize: ".68rem", background: COLORS.sky, color: COLORS.txM, padding: ".15rem .45rem", borderRadius: 9999 }}>{b.kategori}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", marginBottom: ".5rem" }}>
                  <span style={{ color: "#2A9D6E", fontWeight: 600 }}>✓ {b.tersedia} tersedia</span>
                  <span style={{ color: "#C4973A", fontWeight: 600 }}>⏳ {b.dipinjam} dipinjam</span>
                </div>
                <div style={{ height: 4, background: COLORS.blueLtr, borderRadius: 99 }}>
                  <div style={{ height: "100%", width: `${(b.tersedia / b.total) * 100}%`, background: b.tersedia > 0 ? COLORS.blue : "#EF4444", borderRadius: 99 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div style={{ background: COLORS.white, borderRadius: 16, border: "1px solid rgba(74,144,217,.08)", overflow: "hidden" }}>
          <div className="tbl-row" style={{ borderBottom: "1px solid rgba(74,144,217,.08)" }}>
            {["ID", "Nama Barang", "Jurusan", "Kategori", "Total", "Tersedia", "Dipinjam", ""].map(h => (
              <p key={h} style={{ fontSize: ".7rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</p>
            ))}
          </div>
          {filtered.map(b => (
            <div key={b.id} className="tbl-row" style={{ borderBottom: "1px solid rgba(74,144,217,.05)" }}>
              <span style={{ fontSize: ".72rem", fontWeight: 700, color: COLORS.blue, fontFamily: "monospace" }}>{b.id}</span>
              <div style={{ display: "flex", alignItems: "center", gap: ".55rem" }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <span style={{ fontSize: ".83rem", fontWeight: 600, color: COLORS.tx }}>{b.name}</span>
              </div>
              <span style={{ fontSize: ".72rem", background: COLORS.blueLtr, color: COLORS.blueDk, padding: ".18rem .5rem", borderRadius: 9999, fontWeight: 600, textAlign: "center" }}>{b.jurusan}</span>
              <span style={{ fontSize: ".78rem", color: COLORS.txM }}>{b.kategori}</span>
              <span style={{ fontSize: ".82rem", fontWeight: 700, color: COLORS.tx, textAlign: "center" }}>{b.total}</span>
              <span style={{ fontSize: ".82rem", fontWeight: 700, color: "#2A9D6E", textAlign: "center" }}>{b.tersedia}</span>
              <span style={{ fontSize: ".82rem", fontWeight: 700, color: "#C4973A", textAlign: "center" }}>{b.dipinjam}</span>
              <button onClick={() => setDetail(b)} style={{ background: COLORS.sky, border: "none", borderRadius: 7, padding: ".3rem .6rem", cursor: "pointer", color: COLORS.blue, fontSize: ".75rem", fontWeight: 600 }}>Detail</button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {detail && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal-box">
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: COLORS.blueLtr, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{detail.icon}</div>
              <div>
                <p style={{ fontSize: ".7rem", fontFamily: "monospace", color: COLORS.txM }}>{detail.id}</p>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", color: COLORS.blueDkr }}>{detail.name}</h3>
              </div>
              <button onClick={() => setDetail(null)} style={{ marginLeft: "auto", background: COLORS.sky, border: "none", borderRadius: 8, padding: ".35rem .55rem", cursor: "pointer", color: COLORS.txM }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".75rem", marginBottom: "1rem" }}>
              {[["Total", detail.total, COLORS.blue], ["Tersedia", detail.tersedia, "#2A9D6E"], ["Dipinjam", detail.dipinjam, "#C4973A"]].map(([l, v, c]) => (
                <div key={l} style={{ background: COLORS.sky, borderRadius: 10, padding: ".75rem", textAlign: "center" }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: 800, color: c, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{v}</p>
                  <p style={{ fontSize: ".75rem", color: COLORS.txM }}>{l}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {[["Jurusan", detail.jurusan], ["Kategori", detail.kategori], ["Kondisi", detail.kondisi], ["Tahun Pengadaan", detail.tahun]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".55rem .85rem", background: COLORS.sky, borderRadius: 9 }}>
                  <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{k}</p>
                  <p style={{ fontSize: ".8rem", fontWeight: 600, color: COLORS.tx }}>{v}</p>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", marginTop: "1.25rem" }} onClick={() => setDetail(null)}>Tutup</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}