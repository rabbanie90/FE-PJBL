import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import logoSijar from "../assets/logo.png";
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
  yellowSoft: "#F5C842",
};

export default function SijarLogin() {
  const navigate = useNavigate();
  const [kodeKelas, setKodeKelas] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const pageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (!kodeKelas || !password) {
      alert('⚠️ Harap isi Kode Kelas dan Password terlebih dahulu!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`✅ Login berhasil!\nKode Kelas: ${kodeKelas}`);
    localStorage.setItem("sijar_user", JSON.stringify({
    kodeKelas,
  }));

  navigate("/dashboard");

}, 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, #b8d9f540 0%, transparent 55%),
          linear-gradient(145deg, #e8f4fd 0%, #f0f7ff 35%, #dceefb 65%, #f5faff 100%)
        `,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'background 0.15s ease',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-22px) rotate(4deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: .5; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmerMove {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes dotsAnim {
          0%,80%,100% { transform: scale(0); opacity: 0; }
          40%          { transform: scale(1); opacity: 1; }
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.08); }
          66%      { transform: translate(-15px,25px) scale(0.94); }
        }
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes badgePop {
          0%   { transform: translateX(-50%) scale(0.7); opacity: 0; }
          70%  { transform: translateX(-50%) scale(1.08); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes checkPop {
          0%   { transform: translateY(-50%) scale(0); opacity: 0; }
          70%  { transform: translateY(-50%) scale(1.2); }
          100% { transform: translateY(-50%) scale(1); opacity: 0.7; }
        }

        .sijar-left  { animation: fadeLeft  0.9s cubic-bezier(.22,1,.36,1) both; }
        .sijar-right { animation: fadeRight 0.9s cubic-bezier(.22,1,.36,1) 0.15s both; }

        .feature-tile {
          background: #fff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 18px rgba(74,144,217,0.09), 0 1px 4px rgba(74,144,217,0.06);
          border: 1px solid rgba(214,234,250,0.8);
          cursor: default;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
          padding: 18px 20px;
        }
        .feature-tile:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 40px rgba(74,144,217,0.18);
        }

        .field-input {
          width: 100%;
          padding: 11px 48px 11px 16px;
          border: 1.5px solid #D6EAFA;
          border-radius: 14px;
          font-size: 14px;
          color: #1E3A5F;
          background: #f8fbff;
          outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .field-input::placeholder { color: #a8c4dd; font-weight: 500; }
        .field-input:focus {
          border-color: #4A90D9;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(74,144,217,0.1), 0 2px 12px rgba(74,144,217,0.08);
        }
        .field-input:not(:placeholder-shown):not(:focus) {
          border-color: #7BB8E8;
          background: #ffffff;
        }

        .btn-main {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
          background: linear-gradient(130deg, #3a82d4, #4A90D9, #65a8e6, #7BB8E8, #4A90D9);
          background-size: 300% 300%;
          animation: gradShift 4s ease infinite;
          box-shadow: 0 8px 24px rgba(74,144,217,0.38), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: transform 0.2s cubic-bezier(.22,1,.36,1), box-shadow 0.2s ease;
        }
        .btn-main::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          animation: shimmerMove 3s infinite;
        }
        .btn-main:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(74,144,217,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .btn-main:active:not(:disabled) { transform: translateY(-1px); }
        .btn-main:disabled { cursor: not-allowed; opacity: 0.85; }

        .dots span {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          margin: 0 3px;
          animation: dotsAnim 1.2s infinite ease-in-out;
        }
        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          opacity: 0.45;
          transition: opacity 0.2s, transform 0.2s;
          line-height: 1;
          padding: 0;
        }
        .eye-btn:hover { opacity: 1; transform: translateY(-50%) scale(1.15); }

        .forgot-link {
          color: #4A90D9;
          text-decoration: none;
          font-weight: 700;
          font-size: 12px;
          position: relative;
          transition: color 0.2s;
        }
        .forgot-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1.5px;
          background: #7BB8E8;
          transition: width 0.25s ease;
        }
        .forgot-link:hover { color: #7BB8E8; }
        .forgot-link:hover::after { width: 100%; }

        .reg-link {
          color: #4A90D9;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s;
        }
        .reg-link:hover { color: #2563A8; }

        .sijar-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          animation: badgePop 0.6s cubic-bezier(.22,1,.36,1) 0.5s both;
          white-space: nowrap;
        }

        .check-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%) scale(0);
          font-size: 15px;
          opacity: 0;
          animation: checkPop 0.3s cubic-bezier(.22,1,.36,1) forwards;
        }
      `}</style>

      {/* Background orbs */}
      {[
        { w:340, h:340, t:'5%',  l:'2%',  c:'#4A90D918', dur:'18s', delay:'0s'  },
        { w:260, h:260, t:'55%', l:'18%', c:'#7BB8E814', dur:'22s', delay:'3s'  },
        { w:200, h:200, t:'20%', r:'4%',  c:'#D6EAFA30', dur:'15s', delay:'1s'  },
        { w:300, h:300, t:'65%', r:'8%',  c:'#4A90D912', dur:'25s', delay:'5s'  },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: o.w, height: o.h, borderRadius: '50%',
          background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
          top: o.t, left: o.l, right: o.r,
          filter: 'blur(50px)',
          animation: `orbDrift ${o.dur} ease-in-out ${o.delay} infinite`,
          pointerEvents: 'none',
        }}/>
      ))}

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(#4A90D908 1px, transparent 1px), linear-gradient(90deg, #4A90D908 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}/>

      {/* === LEFT PANEL === */}
      <div className="sijar-left" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 60px 60px 80px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Spinning decorative rings */}
        <div style={{
          position: 'absolute', top: '12%', left: '8%',
          width: 180, height: 180, borderRadius: '50%',
          border: '2px dashed #4A90D922',
          animation: 'spin 30s linear infinite',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: '12%', left: '8%',
          width: 180, height: 180, borderRadius: '50%',
          border: '1.5px solid transparent',
          borderTopColor: '#4A90D938',
          animation: 'spin 8s linear infinite reverse',
          pointerEvents: 'none',
        }}/>

        {/* Logo with pulse rings */}
        <div style={{ position: 'relative', marginBottom: 36, animation: 'floatA 5s ease-in-out infinite' }}>
          {[1, 2].map(n => (
            <div key={n} style={{
              position: 'absolute',
              inset: -(n * 14),
              borderRadius: 38 + n * 6,
              border: `2px solid ${COLORS.bluePrimary}${n === 1 ? '28' : '14'}`,
              animation: `pulseRing ${1.8 + n * 0.6}s cubic-bezier(.4,0,.6,1) ${n * 0.3}s infinite`,
              pointerEvents: 'none',
            }}/>
          ))}
          <div style={{
            width: 160, height: 160,
            background: 'linear-gradient(145deg, #5ba0e2 0%, #4A90D9 40%, #3578c4 100%)',
            borderRadius: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72,
            boxShadow: `
              0 24px 60px rgba(74,144,217,0.4),
              0 8px 24px rgba(74,144,217,0.25),
              inset 0 2px 0 rgba(255,255,255,0.3),
              inset 0 -2px 0 rgba(0,0,0,0.08)
            `,
          }}>
            <img 
  src={logoSijar} 
  alt="logo"
  style={{
    width: "70%",
    height: "70%",
    objectFit: "contain"
  }}
/>
          </div>
        </div>

        {/* App title */}
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 52,
          fontWeight: 900,
          background: `linear-gradient(135deg, ${COLORS.blueDarker} 0%, ${COLORS.blueDark} 35%, ${COLORS.bluePrimary} 65%, ${COLORS.blueLight} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
          lineHeight: 1,
          marginBottom: 14,
          textAlign: 'center',
        }}>SIJAR</h1>

        <p style={{
          fontSize: 18,
          color: COLORS.textMain,
          fontWeight: 700,
          marginBottom: 10,
          textAlign: 'center',
          letterSpacing: '0.01em',
        }}>Sistem Inventaris Peminjaman Barang Jurusan</p>

        <div style={{ position: 'relative', marginBottom: 44, textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: COLORS.textMuted, maxWidth: 360, lineHeight: 1.7 }}>
            Platform modern untuk mengelola dan meminjam barang jurusan dengan mudah, cepat, dan efisien
          </p>
          <div style={{
            height: 3, borderRadius: 99,
            background: `linear-gradient(90deg, transparent, ${COLORS.bluePrimary}, transparent)`,
            marginTop: 16,
            animation: 'lineGrow 1.2s cubic-bezier(.22,1,.36,1) 0.8s both',
          }}/>
        </div>

        {/* Feature tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 14,
          maxWidth: 460, width: '100%',
        }}>
          {[
            { icon: '⚡', label: 'Cepat & Mudah',    delay: '0.9s' },
            { icon: '🔒', label: 'Aman Terpercaya',  delay: '1.0s' },
            { icon: '📊', label: 'Dashboard Modern', delay: '1.1s' },
            { icon: '🎯', label: 'Multi Jurusan',    delay: '1.2s' },
          ].map((f, i) => (
            <div key={i} className="feature-tile" style={{
              animation: `fadeUp 0.7s cubic-bezier(.22,1,.36,1) ${f.delay} both`,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.blueLighter})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{f.icon}</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMain, lineHeight: 1.3 }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* === RIGHT PANEL === */}
      <div className="sijar-right" style={{
        width: '100%',
        maxWidth: 380,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 28px',
        position: 'relative',
        zIndex: 1,
      }}>

        <div style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '30px 26px 26px',
          borderRadius: 24,
          width: '100%',
          maxWidth: 320,
          boxShadow: `
            inset 0 2px 0 rgba(255,255,255,0.9),
            0 32px 72px rgba(74,144,217,0.16),
            0 8px 24px rgba(74,144,217,0.08)
          `,
          border: '1px solid rgba(214,234,250,0.7)',
          position: 'relative',
        }}>

          {/* Badge */}
          <div className="sijar-badge">
            <div style={{
              background: `linear-gradient(130deg, ${COLORS.blueDark}, ${COLORS.bluePrimary})`,
              padding: '7px 22px',
              borderRadius: 20,
              color: COLORS.white,
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: '0.06em',
              boxShadow: `0 6px 18px rgba(74,144,217,0.4)`,
              textTransform: 'uppercase',
            }}>
              🔐 Login Portal
            </div>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 18, marginTop: 10 }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.textMain,
              marginBottom: 5,
              letterSpacing: '-0.2px',
            }}>Selamat Datang!</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, fontWeight: 500 }}>
              Masuk dengan kode kelas Anda
            </p>
          </div>

          {/* Kode Kelas */}
          <div style={{ marginBottom: 10 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 5, color: COLORS.textMain,
              fontSize: 13, fontWeight: 700,
            }}>
              <span style={{ opacity: focusedInput === 'kode' ? 1 : 0.35, transition: 'opacity .25s', fontSize: 14 }}>🎓</span>
              Kode Kelas
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="field-input"
                type="text"
                value={kodeKelas}
                onChange={e => setKodeKelas(e.target.value)}
                onFocus={() => setFocusedInput('kode')}
                onBlur={() => setFocusedInput('')}
                onKeyDown={handleKeyDown}
                placeholder="Contoh: TI447"
              />
              {kodeKelas && (
                <span key={kodeKelas.length === 1 ? 'init' : 'stable'} className="check-icon">✓</span>
              )}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 12 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 5, color: COLORS.textMain,
              fontSize: 13, fontWeight: 700,
            }}>
              <span style={{ opacity: focusedInput === 'password' ? 1 : 0.35, transition: 'opacity .25s', fontSize: 14 }}>🔒</span>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="field-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
                onKeyDown={handleKeyDown}
                placeholder="Masukkan password"
              />
              <button className="eye-btn" onClick={() => setShowPassword(!showPassword)} type="button">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 14,
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{ width: 15, height: 15, cursor: 'pointer', accentColor: COLORS.bluePrimary }}
              />
              <span style={{ color: COLORS.textMuted, fontSize: 12.5, fontWeight: 600 }}>Ingat saya</span>
            </label>
            <a
              href="#"
              className="forgot-link"
              onClick={e => { e.preventDefault(); alert('Hubungi admin!'); }}
            >
              Lupa Password?
            </a>
          </div>

          {/* Submit button */}
          <button className="btn-main" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <div className="dots"><span/><span/><span/></div>
            ) : (
              '🚀 Masuk Sekarang'
            )}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '14px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #D6EAFA)' }}/>
            <span style={{ color: COLORS.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>ATAU</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #D6EAFA, transparent)' }}/>
          </div>

          {/* Register */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: COLORS.textMuted, fontSize: 13, fontWeight: 500 }}>
              Belum punya akun?{' '}
              <a
                href="#"
                className="reg-link"
                onClick={e => { e.preventDefault(); alert('Hubungi admin untuk registrasi!'); }}
              >
                Daftar Sekarang
              </a>
            </p>
          </div>

          {/* Bottom accent bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 5,
            background: `linear-gradient(90deg, ${COLORS.blueDark}, ${COLORS.bluePrimary}, ${COLORS.blueLight}, ${COLORS.yellowSoft})`,
            borderRadius: '0 0 28px 28px',
            opacity: 0.9,
          }}/>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        padding: '9px 22px',
        borderRadius: 20,
        boxShadow: '0 4px 16px rgba(74,144,217,0.12)',
        fontSize: 12,
        color: COLORS.textMuted,
        fontWeight: 600,
        zIndex: 2,
        whiteSpace: 'nowrap',
        border: '1px solid rgba(214,234,250,0.6)',
      }}>
        © 2026 SIJAR • Made with ❤️ by XI PPLG 3
      </div>
    </div>
  );
}