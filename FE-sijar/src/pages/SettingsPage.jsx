import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";
import { useNavigate } from "react-router-dom";

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLt: "#7BB8E8", blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
};

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: value ? COLORS.blue : "#D1D9E6",
        position: "relative", transition: "background .22s", flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: value ? 23 : 3,
        transition: "left .22s",
        boxShadow: "0 1px 4px rgba(0,0,0,.18)",
      }} />
    </button>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notif, setNotif] = useState({ email: true, push: true, reminder: true, news: false });
  const [privasi, setPrivasi] = useState({ showHistory: true, showProfile: false });
  const [pwForm, setPwForm] = useState({ old: "", new1: "", new2: "" });
  const [pwSaved, setPwSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSaveNotif = () => showToast("✅ Pengaturan notifikasi disimpan!");
  const handleSavePrivasi = () => showToast("✅ Pengaturan privasi disimpan!");

  const handleChangePw = () => {
    if (!pwForm.old || !pwForm.new1 || !pwForm.new2) return showToast("⚠️ Semua kolom wajib diisi!");
    if (pwForm.new1 !== pwForm.new2) return showToast("❌ Kata sandi baru tidak cocok!");
    if (pwForm.new1.length < 6) return showToast("❌ Kata sandi minimal 6 karakter!");
    setPwForm({ old: "", new1: "", new2: "" });
    showToast("✅ Kata sandi berhasil diubah!");
  };

  const sections = [
    { id: "akun", label: "Akun", icon: "👤" },
    { id: "notifikasi", label: "Notifikasi", icon: "🔔" },
    { id: "privasi", label: "Privasi", icon: "🔒" },
    { id: "keamanan", label: "Keamanan", icon: "🛡️" },
    { id: "tentang", label: "Tentang Aplikasi", icon: "ℹ️" },
  ];

  return (
    <DashboardLayout>
      <style>{`
        .settings-card { background: #fff; border-radius: 16px; border: 1px solid rgba(74,144,217,.08); padding: 1.5rem; margin-bottom: 1rem; }
        .settings-row { display: flex; align-items: center; justify-content: space-between; padding: .85rem 0; border-bottom: 1px solid rgba(74,144,217,.06); gap: 1rem; }
        .settings-row:last-child { border-bottom: none; padding-bottom: 0; }
        .settings-row:first-child { padding-top: 0; }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid #E8EFF8; border-radius: 10px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: #1E3A5F; outline: none; transition: border-color .18s; background: #F8FBFF; }
        .form-input:focus { border-color: #4A90D9; background: #fff; }
        .btn-primary { background: #4A90D9; color: #fff; border: none; padding: .6rem 1.25rem; border-radius: 10px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 700; font-size: .82rem; cursor: pointer; transition: background .2s; }
        .btn-primary:hover { background: #2563A8; }
        .btn-danger { background: #FEF0EF; color: #C0503E; border: none; padding: .6rem 1.25rem; border-radius: 10px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 700; font-size: .82rem; cursor: pointer; transition: all .2s; }
        .btn-danger:hover { background: #C0503E; color: #fff; }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: #1A3F70; color: #fff; padding: .75rem 1.25rem; border-radius: 12px; font-size: .875rem; font-weight: 600; z-index: 500; box-shadow: 0 8px 24px rgba(0,0,0,.15); animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.45); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-box { background: #fff; border-radius: 20px; padding: 2rem; width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
        .side-nav-btn { display: flex; align-items: center; gap: .6rem; padding: .55rem .75rem; border-radius: 9px; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; transition: background .15s; font-family: 'DM Sans',sans-serif; font-size: .85rem; color: #6B8BAD; font-weight: 500; }
        .side-nav-btn:hover { background: ${COLORS.sky}; color: ${COLORS.tx}; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          ⚙️ Pengaturan
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Pengaturan</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Kelola preferensi akun dan aplikasimu.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.25rem", alignItems: "flex-start" }}>
        {/* Sidebar nav */}
        <div style={{ background: COLORS.white, borderRadius: 14, border: "1px solid rgba(74,144,217,.08)", padding: ".75rem", position: "sticky", top: "5rem" }}>
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="side-nav-btn" style={{ textDecoration: "none", display: "flex" }}>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
          <div style={{ height: 1, background: "rgba(74,144,217,.08)", margin: ".5rem 0" }} />
          <button className="side-nav-btn" style={{ color: "#C0503E" }} onClick={() => setLogoutConfirm(true)}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span>Keluar</span>
          </button>
        </div>

        <div>
          {/* Akun */}
          <div id="akun" className="settings-card">
            <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr, marginBottom: "1rem" }}>👤 Informasi Akun</h3>
            <div className="settings-row">
              <div>
                <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>Nama Lengkap</p>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>Ahmad Fauzi</p>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>NIS / ID Siswa</p>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>123456789</p>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>Kelas & Jurusan</p>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>XI PPLG 3 — Pengembangan Perangkat Lunak & GIM</p>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>Email</p>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>ahmad.fauzi@smkn8smg.sch.id</p>
              </div>
              <button className="btn-primary" style={{ flexShrink: 0 }}>Ubah</button>
            </div>
          </div>

          {/* Notifikasi */}
          <div id="notifikasi" className="settings-card">
            <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr, marginBottom: "1rem" }}>🔔 Notifikasi</h3>
            {[
              { key: "email", label: "Notifikasi Email", desc: "Terima update via email saat status peminjaman berubah" },
              { key: "push", label: "Notifikasi Push", desc: "Notifikasi langsung di browser atau perangkatmu" },
              { key: "reminder", label: "Pengingat Pengembalian", desc: "Ingatkan H-1 sebelum batas waktu pengembalian" },
              { key: "news", label: "Berita & Pengumuman", desc: "Update terbaru seputar inventaris dan fitur baru" },
            ].map(n => (
              <div key={n.key} className="settings-row">
                <div>
                  <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>{n.label}</p>
                  <p style={{ fontSize: ".75rem", color: COLORS.txM }}>{n.desc}</p>
                </div>
                <Toggle value={notif[n.key]} onChange={v => setNotif({ ...notif, [n.key]: v })} />
              </div>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <button className="btn-primary" onClick={handleSaveNotif}>Simpan Perubahan</button>
            </div>
          </div>

          {/* Privasi */}
          <div id="privasi" className="settings-card">
            <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr, marginBottom: "1rem" }}>🔒 Privasi</h3>
            {[
              { key: "showHistory", label: "Tampilkan Riwayat", desc: "Izinkan admin melihat riwayat peminjaman kamu" },
              { key: "showProfile", label: "Profil Publik", desc: "Tampilkan profilmu kepada sesama siswa" },
            ].map(n => (
              <div key={n.key} className="settings-row">
                <div>
                  <p style={{ fontWeight: 600, fontSize: ".85rem", color: COLORS.tx }}>{n.label}</p>
                  <p style={{ fontSize: ".75rem", color: COLORS.txM }}>{n.desc}</p>
                </div>
                <Toggle value={privasi[n.key]} onChange={v => setPrivasi({ ...privasi, [n.key]: v })} />
              </div>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <button className="btn-primary" onClick={handleSavePrivasi}>Simpan Perubahan</button>
            </div>
          </div>

          {/* Keamanan */}
          <div id="keamanan" className="settings-card">
            <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr, marginBottom: "1rem" }}>🛡️ Keamanan</h3>
            <p style={{ fontSize: ".82rem", color: COLORS.txM, marginBottom: "1rem" }}>Ubah kata sandi akunmu untuk menjaga keamanan.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", maxWidth: 400 }}>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Kata Sandi Lama</label>
                <input type="password" className="form-input" placeholder="••••••••" value={pwForm.old} onChange={e => setPwForm({ ...pwForm, old: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Kata Sandi Baru</label>
                <input type="password" className="form-input" placeholder="Min. 6 karakter" value={pwForm.new1} onChange={e => setPwForm({ ...pwForm, new1: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Konfirmasi Kata Sandi Baru</label>
                <input type="password" className="form-input" placeholder="Ulangi kata sandi baru" value={pwForm.new2} onChange={e => setPwForm({ ...pwForm, new2: e.target.value })} />
              </div>
              <div>
                <button className="btn-primary" onClick={handleChangePw}>Ubah Kata Sandi</button>
              </div>
            </div>
          </div>

          {/* Tentang */}
          <div id="tentang" className="settings-card">
            <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: COLORS.blueDkr, marginBottom: "1rem" }}>ℹ️ Tentang Aplikasi</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {[
                ["Nama Aplikasi", "SIJAR — Sistem Inventaris Peminjaman Barang Jurusan"],
                ["Versi", "v1.0.0"],
                ["Dikembangkan oleh", "XI PPLG 3 · SMKN 8 Semarang"],
                ["Tahun", "2025"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem .85rem", background: COLORS.sky, borderRadius: 9 }}>
                  <p style={{ fontSize: ".8rem", color: COLORS.txM }}>{k}</p>
                  <p style={{ fontSize: ".8rem", fontWeight: 600, color: COLORS.tx, textAlign: "right" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logout confirm */}
      {logoutConfirm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setLogoutConfirm(false)}>
          <div className="modal-box" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42, marginBottom: ".75rem" }}>🚪</div>
            <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: COLORS.blueDkr, marginBottom: ".5rem" }}>Keluar dari SIJAR?</h3>
            <p style={{ color: COLORS.txM, fontSize: ".875rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>Kamu akan diarahkan kembali ke halaman login.</p>
            <div style={{ display: "flex", gap: ".75rem" }}>
              <button onClick={() => setLogoutConfirm(false)} style={{ flex: 1, padding: ".65rem", borderRadius: 10, border: "1.5px solid #D6EAFA", background: "transparent", color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, cursor: "pointer" }}>Batal</button>
              <button onClick={() => navigate("/login")} className="btn-danger" style={{ flex: 1 }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </DashboardLayout>
  );
}
