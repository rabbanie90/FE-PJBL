import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

const JURUSAN_THEME = {
  Semua: { bg: "#F0F7FF", active: "#2563A8", activeBg: "#DBEAFE", border: "#DBEAFE" },
  PPLG: { bg: "#EFF6FF", active: "#2563A8", activeBg: "#BFDBFE", border: "#BFDBFE" },
  TJKT: { bg: "#FFF7ED", active: "#EA580C", activeBg: "#FED7AA", border: "#FED7AA" },
  DKV: { bg: "#FEFCE8", active: "#CA8A04", activeBg: "#FEF08A", border: "#FEF08A" },
  LK:   { bg: "#F0FDF4", active: "#16A34A", activeBg: "#BBF7D0", border: "#BBF7D0" },
  PS:   { bg: "#F5F3FF", active: "#7C3AED", activeBg: "#DDD6FE", border: "#DDD6FE" },
};

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
  green: "#3DBD8F", greenLt: "#E8F8F2",
  red: "#EF4444", redLt: "#FEF0EF",
  yellow: "#F59E0B", yellowLt: "#FEF9EC",
};

const barangList = [
  { id: 1,  nama: "Laptop Asus VivoBook",      jurusan: "PPLG", kategori: "Elektronik",     stok: 3, total: 5,  emoji: "💻", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab PPLG Lt. 2" },
  { id: 2,  nama: "Arduino Uno Rev3",           jurusan: "PPLG", kategori: "Mikrokontroler", stok: 8, total: 10, emoji: "🔌", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab PPLG Lt. 2" },
  { id: 3,  nama: "Raspberry Pi 4 (4GB)",       jurusan: "PPLG", kategori: "Komputer Mini",  stok: 0, total: 4,  emoji: "🖥️", status: "Habis",    kondisi: "Baik",      lokasi: "Lab PPLG Lt. 2" },
  { id: 4,  nama: "Proyektor Epson EB-X41",     jurusan: "TJKT", kategori: "Elektronik",     stok: 2, total: 3,  emoji: "📽️", status: "Tersedia", kondisi: "Baik",      lokasi: "Ruang AV TJKT" },
  { id: 5,  nama: "Router MikroTik RB951",      jurusan: "TJKT", kategori: "Jaringan",       stok: 6, total: 6,  emoji: "📡", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab Jaringan" },
  { id: 6,  nama: "Switch Cisco Catalyst 2960", jurusan: "TJKT", kategori: "Jaringan",       stok: 4, total: 4,  emoji: "🔁", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab Jaringan" },
  { id: 7,  nama: "Drawing Tablet Wacom",       jurusan: "DKV",  kategori: "Desain",         stok: 3, total: 5,  emoji: "🎨", status: "Tersedia", kondisi: "Baik",      lokasi: "Studio DKV" },
  { id: 8,  nama: "Kamera Canon EOS M50",       jurusan: "DKV",  kategori: "Fotografi",      stok: 1, total: 2,  emoji: "📷", status: "Tersedia", kondisi: "Baik",      lokasi: "Studio DKV" },
  { id: 9,  nama: "Mesin Jahit Brother",        jurusan: "LK",   kategori: "Alat Jahit",     stok: 4, total: 8,  emoji: "🧵", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab Busana LK" },
  { id: 10, nama: "Manequin Display Profesional",jurusan: "LK",  kategori: "Display",        stok: 5, total: 5,  emoji: "👗", status: "Tersedia", kondisi: "Baik",      lokasi: "Lab Busana LK" },
  { id: 11, nama: "Peralatan Masak Lengkap",    jurusan: "PS",   kategori: "Memasak",        stok: 2, total: 4,  emoji: "🍳", status: "Tersedia", kondisi: "Baik",      lokasi: "Dapur Praktik PS" },
  { id: 12, nama: "Timbangan Digital Presisi",  jurusan: "PS",   kategori: "Alat Ukur",      stok: 3, total: 3,  emoji: "⚖️", status: "Tersedia", kondisi: "Baik",      lokasi: "Dapur Praktik PS" },
];

const aturan = [
  "Maksimal peminjaman 3 barang per siswa",
  "Durasi pinjam maksimal 7 hari",
  "Barang harus dikembalikan dalam kondisi sama",
  "Keterlambatan akan dicatat di riwayat akun",
  "Kerusakan barang menjadi tanggung jawab peminjam",
];

export default function PeminjamanPage() {
  const [activeJurusan, setActiveJurusan] = useState("Semua");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [step, setStep] = useState(1); // 1 = detail, 2 = konfirmasi
  const [tgl, setTgl] = useState("");
  const [tglKembali, setTglKembali] = useState("");
  const [catatan, setCatatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  const filtered = barangList.filter(b => {
    const matchJurusan = activeJurusan === "Semua" || b.jurusan === activeJurusan;
    const matchSearch = b.nama.toLowerCase().includes(search.toLowerCase());
    return matchJurusan && matchSearch;
  });

  const openModal = (b) => {
    setModal(b);
    setStep(1);
    setTgl(""); setTglKembali(""); setCatatan("");
  };

  const handleKonfirmasi = () => {
    if (!tgl || !tglKembali) return;
    setStep(2);
  };

  const handlePinjam = () => {
    setModal(null);
    setBerhasil(true);
    setTimeout(() => setBerhasil(false), 3500);
  };

  const durasi = tgl && tglKembali ? Math.max(0, Math.round((new Date(tglKembali) - new Date(tgl)) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <DashboardLayout>
      <style>{`
        .barang-card { background: #fff; border-radius: 20px; border: 1.5px solid rgba(74,144,217,.1); overflow: hidden; transition: box-shadow .22s, transform .22s; }
        .barang-card:hover { box-shadow: 0 12px 36px rgba(74,144,217,.15); transform: translateY(-4px); }
        .jurusan-btn { border: none; cursor: pointer; border-radius: 99px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 700; font-size: .82rem; padding: .5rem 1.2rem; transition: all .2s; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(10,20,50,.55); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(8px); }
        .modal-box { background: #fff; border-radius: 28px; width: 100%; max-width: 480px; box-shadow: 0 32px 80px rgba(0,0,0,.2); overflow: hidden; }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid #E8EFF8; border-radius: 12px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: #1E3A5F; outline: none; transition: border-color .18s, box-shadow .18s; background: #F8FBFF; }
        .form-input:focus { border-color: #4A90D9; background: #fff; box-shadow: 0 0 0 3px #D6EAFA55; }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: #065F46; color: #fff; padding: .9rem 1.5rem; border-radius: 16px; font-size: .875rem; font-weight: 700; z-index: 500; box-shadow: 0 8px 32px rgba(0,0,0,.2); display: flex; align-items: center; gap: .6rem; animation: slideIn .35s cubic-bezier(.2,0,.2,1); }
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .progress-bar { height: 6px; border-radius: 99px; background: rgba(74,144,217,.1); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; }
        .step-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .72rem; font-weight: 800; }
        .info-row { display: flex; justify-content: space-between; align-items: center; padding: .55rem 0; border-bottom: 1px solid rgba(74,144,217,.06); }
        .info-row:last-child { border-bottom: none; }
        .aturan-item { display: flex; align-items: flex-start; gap: .5rem; padding: .4rem 0; font-size: .75rem; color: #5A7A9B; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          📦 Peminjaman
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Peminjaman Barang</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Pilih barang yang ingin kamu pinjam dari inventaris jurusan.</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".75rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Tersedia", val: barangList.filter(b => b.status === "Tersedia").length, icon: "✅", bg: COLORS.greenLt, c: "#065F46" },
          { label: "Stok Habis", val: barangList.filter(b => b.status === "Habis").length, icon: "❌", bg: COLORS.redLt, c: "#7F1D1D" },
          { label: "Total Barang", val: barangList.length, icon: "📦", bg: COLORS.blueLtr, c: COLORS.blueDk },
          { label: "Jurusan", val: 5, icon: "🏫", bg: COLORS.yellowLt, c: "#92400E" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 14, padding: ".85rem 1rem", display: "flex", alignItems: "center", gap: ".65rem" }}>
            <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight: 800, fontSize: "1.1rem", color: s.c, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontSize: ".68rem", color: COLORS.txM, marginTop: ".1rem" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ background: COLORS.white, borderRadius: 18, border: "1.5px solid rgba(74,144,217,.1)", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {Object.keys(JURUSAN_THEME).map(j => {
            const t = JURUSAN_THEME[j];
            const isActive = activeJurusan === j;
            return (
              <button key={j} className="jurusan-btn" onClick={() => setActiveJurusan(j)}
                style={{ background: isActive ? t.activeBg : COLORS.sky, color: isActive ? t.active : COLORS.txM, border: isActive ? `2px solid ${t.active}` : "2px solid transparent", boxShadow: isActive ? `0 2px 12px ${t.activeBg}` : "none" }}>
                {j}
              </button>
            );
          })}
        </div>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: COLORS.txM }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari barang..."
            style={{ paddingLeft: "2.2rem", paddingRight: ".9rem", paddingTop: ".55rem", paddingBottom: ".55rem", border: "1.5px solid #E8EFF8", borderRadius: 12, fontSize: ".85rem", color: COLORS.tx, background: "#F8FBFF", outline: "none", fontFamily: "'DM Sans',sans-serif", width: 210 }} />
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.1rem" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: COLORS.txM }}>
            <p style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>🔍</p>
            <p style={{ fontWeight: 700, fontSize: ".9rem" }}>Barang tidak ditemukan</p>
            <p style={{ fontSize: ".8rem", marginTop: ".3rem" }}>Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : filtered.map(b => {
          const jTheme = JURUSAN_THEME[b.jurusan];
          const persen = Math.round((b.stok / b.total) * 100);
          return (
            <div key={b.id} className="barang-card">
              {/* Image area */}
              <div style={{ height: 140, background: `linear-gradient(135deg, ${jTheme.bg}, ${jTheme.activeBg}50)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", position: "relative" }}>
                {b.emoji}
                <span style={{ position: "absolute", top: 10, right: 10, fontSize: ".68rem", fontWeight: 700, background: b.status === "Tersedia" ? COLORS.greenLt : COLORS.redLt, color: b.status === "Tersedia" ? "#065F46" : "#7F1D1D", padding: ".25rem .65rem", borderRadius: 9999 }}>
                  {b.status}
                </span>
              </div>
              <div style={{ padding: "1.1rem 1.15rem" }}>
                <p style={{ fontWeight: 800, fontSize: ".92rem", color: COLORS.tx, marginBottom: ".5rem" }}>{b.nama}</p>
                <div style={{ display: "flex", gap: ".4rem", marginBottom: ".65rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: jTheme.activeBg, color: jTheme.active, padding: ".15rem .55rem", borderRadius: 9999 }}>{b.jurusan}</span>
                  <span style={{ fontSize: ".7rem", color: COLORS.txM, background: COLORS.sky, padding: ".15rem .55rem", borderRadius: 9999 }}>{b.kategori}</span>
                </div>
                <p style={{ fontSize: ".7rem", color: COLORS.txM, marginBottom: ".75rem" }}>📍 {b.lokasi}</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", color: COLORS.txM, marginBottom: ".35rem" }}>
                  <span>Stok tersedia</span>
                  <span style={{ fontWeight: 700, color: b.stok === 0 ? COLORS.red : COLORS.tx }}>{b.stok}/{b.total} unit</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: "1rem" }}>
                  <div className="progress-fill" style={{ width: `${persen}%`, background: b.stok === 0 ? COLORS.red : persen < 40 ? COLORS.yellow : `linear-gradient(90deg, ${jTheme.active}, ${jTheme.activeBg})` }} />
                </div>
                <button disabled={b.stok === 0} onClick={() => b.stok > 0 && openModal(b)}
                  style={{ width: "100%", padding: ".65rem", borderRadius: 13, border: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".83rem", cursor: b.stok === 0 ? "not-allowed" : "pointer", background: b.stok === 0 ? "#E8EFF8" : `linear-gradient(135deg, ${jTheme.active}, ${COLORS.blueDk})`, color: b.stok === 0 ? COLORS.txM : "#fff", transition: "opacity .18s" }}>
                  {b.stok === 0 ? "⛔ Stok Habis" : "Pinjam Sekarang →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            {/* Modal header gradient */}
            <div style={{ background: `linear-gradient(135deg, ${JURUSAN_THEME[modal.jurusan].bg}, ${JURUSAN_THEME[modal.jurusan].activeBg}60)`, padding: "1.5rem 1.75rem 1.25rem", borderBottom: "1px solid rgba(74,144,217,.08)" }}>
              {/* Step indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <div className="step-dot" style={{ background: step >= s ? JURUSAN_THEME[modal.jurusan].active : "#E8EFF8", color: step >= s ? "#fff" : COLORS.txM }}>{s}</div>
                    {s < 2 && <div style={{ width: 40, height: 2, background: step >= 2 ? JURUSAN_THEME[modal.jurusan].active : "#E8EFF8", borderRadius: 99 }} />}
                  </div>
                ))}
                <span style={{ fontSize: ".75rem", color: COLORS.txM, marginLeft: ".5rem" }}>
                  {step === 1 ? "Isi Detail Peminjaman" : "Konfirmasi Peminjaman"}
                </span>
              </div>
              {/* Barang info */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: JURUSAN_THEME[modal.jurusan].activeBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>{modal.emoji}</div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: COLORS.blueDkr }}>{modal.nama}</h3>
                  <div style={{ display: "flex", gap: ".4rem", marginTop: ".3rem" }}>
                    <span style={{ fontSize: ".7rem", fontWeight: 700, background: JURUSAN_THEME[modal.jurusan].activeBg, color: JURUSAN_THEME[modal.jurusan].active, padding: ".15rem .55rem", borderRadius: 9999 }}>{modal.jurusan}</span>
                    <span style={{ fontSize: ".7rem", color: COLORS.txM, background: "rgba(255,255,255,.6)", padding: ".15rem .55rem", borderRadius: 9999 }}>{modal.kategori}</span>
                    <span style={{ fontSize: ".7rem", color: "#065F46", background: COLORS.greenLt, fontWeight: 700, padding: ".15rem .55rem", borderRadius: 9999 }}>✅ Tersedia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div style={{ padding: "1.5rem 1.75rem" }}>

              {step === 1 && (
                <>
                  {/* Detail barang */}
                  <div style={{ background: COLORS.sky, borderRadius: 14, padding: ".85rem 1rem", marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: ".72rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".65rem" }}>Detail Barang</p>
                    {[
                      ["📍 Lokasi", modal.lokasi],
                      ["🔧 Kondisi", modal.kondisi],
                      ["📦 Stok Tersedia", `${modal.stok} dari ${modal.total} unit`],
                    ].map(([k, v]) => (
                      <div key={k} className="info-row">
                        <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{k}</p>
                        <p style={{ fontSize: ".78rem", fontWeight: 700, color: COLORS.tx }}>{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Form tanggal */}
                  <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", marginBottom: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                      <div>
                        <label style={{ fontSize: ".75rem", fontWeight: 700, color: COLORS.tx, display: "block", marginBottom: ".4rem" }}>📅 Tanggal Pinjam</label>
                        <input type="date" className="form-input" value={tgl} onChange={e => setTgl(e.target.value)} />
                      </div>
                      <div>
                        <label style={{ fontSize: ".75rem", fontWeight: 700, color: COLORS.tx, display: "block", marginBottom: ".4rem" }}>📅 Tanggal Kembali</label>
                        <input type="date" className="form-input" value={tglKembali} onChange={e => setTglKembali(e.target.value)} />
                      </div>
                    </div>
                    {durasi > 0 && (
                      <div style={{ background: durasi > 7 ? COLORS.redLt : COLORS.greenLt, borderRadius: 10, padding: ".55rem .85rem", fontSize: ".75rem", fontWeight: 700, color: durasi > 7 ? "#7F1D1D" : "#065F46", display: "flex", alignItems: "center", gap: ".4rem" }}>
                        {durasi > 7 ? "⚠️" : "✅"} Durasi peminjaman: <strong>{durasi} hari</strong> {durasi > 7 ? "— melebihi batas maksimal 7 hari!" : "— dalam batas normal"}
                      </div>
                    )}
                    <div>
                      <label style={{ fontSize: ".75rem", fontWeight: 700, color: COLORS.tx, display: "block", marginBottom: ".4rem" }}>📝 Catatan (opsional)</label>
                      <textarea className="form-input" rows={2} placeholder="Contoh: untuk praktikum IoT kelas..." value={catatan} onChange={e => setCatatan(e.target.value)} style={{ resize: "none" }} />
                    </div>
                  </div>

                  {/* Aturan */}
                  <div style={{ background: COLORS.yellowLt, borderRadius: 12, padding: ".85rem 1rem", marginBottom: "1.25rem", border: "1px solid #FDE68A" }}>
                    <p style={{ fontSize: ".73rem", fontWeight: 700, color: "#92400E", marginBottom: ".5rem" }}>⚠️ Syarat & Ketentuan</p>
                    {aturan.map((a, i) => (
                      <div key={i} className="aturan-item">
                        <span style={{ color: "#F59E0B", fontWeight: 800, flexShrink: 0 }}>•</span> {a}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: ".75rem" }}>
                    <button onClick={() => setModal(null)} style={{ flex: 1, padding: ".65rem", borderRadius: 13, border: "1.5px solid #D6EAFA", background: "transparent", color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>Batal</button>
                    <button onClick={handleKonfirmasi} disabled={!tgl || !tglKembali || durasi > 7}
                      style={{ flex: 2, padding: ".65rem", borderRadius: 13, border: "none", background: !tgl || !tglKembali || durasi > 7 ? "#E8EFF8" : `linear-gradient(135deg, ${JURUSAN_THEME[modal.jurusan].active}, ${COLORS.blueDk})`, color: !tgl || !tglKembali || durasi > 7 ? COLORS.txM : "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: !tgl || !tglKembali || durasi > 7 ? "not-allowed" : "pointer" }}>
                      Lanjut → Konfirmasi
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ background: COLORS.sky, borderRadius: 16, padding: "1.1rem", marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: ".72rem", fontWeight: 700, color: COLORS.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".75rem" }}>Ringkasan Peminjaman</p>
                    {[
                      ["Barang", modal.nama],
                      ["Jurusan", modal.jurusan],
                      ["Lokasi", modal.lokasi],
                      ["Tanggal Pinjam", tgl],
                      ["Tanggal Kembali", tglKembali],
                      ["Durasi", `${durasi} hari`],
                      ...(catatan ? [["Catatan", catatan]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="info-row">
                        <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{k}</p>
                        <p style={{ fontSize: ".78rem", fontWeight: 700, color: COLORS.tx, textAlign: "right", maxWidth: "60%" }}>{v}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#ECFDF5", borderRadius: 12, padding: ".85rem 1rem", marginBottom: "1.25rem", border: "1px solid #6EE7B7" }}>
                    <p style={{ fontSize: ".78rem", color: "#065F46", fontWeight: 600, lineHeight: 1.5 }}>
                      ✅ Dengan mengkonfirmasi, kamu menyetujui seluruh syarat dan ketentuan peminjaman barang SIJAR.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: ".75rem" }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: ".65rem", borderRadius: 13, border: "1.5px solid #D6EAFA", background: "transparent", color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>← Kembali</button>
                    <button onClick={handlePinjam} style={{ flex: 2, padding: ".65rem", borderRadius: 13, border: "none", background: `linear-gradient(135deg, #065F46, #10B981)`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer", fontSize: ".88rem" }}>
                      ✅ Konfirmasi Pinjam
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {berhasil && (
        <div className="toast">
          ✅ Peminjaman berhasil diajukan! Cek riwayat untuk detailnya.
        </div>
      )}
    </DashboardLayout>
  );
}