import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HackerAttack.css';

// Random hex generator
const randomHex = () => Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
const randomIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;

const registryLogs = [
  '> [WARN] Kernel memory leak detected at 0x0045F',
  '> [FAIL] SSH Auth Bypass successful',
  '> [FAIL] Database dump initiated...',
  '> [FAIL] 4.5TB transferred to unknown peer',
  '> [WARN] System self-destruct countdown active',
  '> [CRIT] Root access granted to unknown entity',
  '> [FAIL] Firewall rules overwritten',
  '> [WARN] Memory corruption at sector 0xDEAD',
  '> [CRIT] Backdoor installed on port 4444',
  '> [FAIL] Encryption keys compromised',
];

const networkLogs = [
  '> [INFO] Sniffing packets on eth0',
  '> [INFO] SSL Stripping active',
  '> [INFO] Man-in-the-Middle established',
  '> [INFO] Rootkit deployed successfully',
  '> [INFO] All nodes responding to NULL command',
  '> [EXFL] Data exfiltration in progress...',
  '> [INFO] DNS poisoning active',
  '> [WARN] Proxy chain established via TOR',
  '> [INFO] Keylogger payload injected',
  '> [CRIT] Remote shell access confirmed',
];

export default function HackerAttack() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(59);
  const [recovered, setRecovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [glitchText, setGlitchText] = useState('SISTEMA INVADIDO');
  const [hexStream, setHexStream] = useState([]);
  const [visibleRegistryLogs, setVisibleRegistryLogs] = useState([]);
  const [visibleNetworkLogs, setVisibleNetworkLogs] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [latency, setLatency] = useState(999);
  const [flashActive, setFlashActive] = useState(false);
  const containerRef = useRef(null);
  const hiddenClickCount = useRef(0);
  const lastClickTime = useRef(0);

  // Entry animation
  useEffect(() => {
    // Initial flash
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);
    setTimeout(() => { setFlashActive(true); }, 300);
    setTimeout(() => { setFlashActive(false); setShowContent(true); }, 500);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (recovered) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) return 59;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [recovered]);

  // Glitch text effect
  useEffect(() => {
    if (recovered) return;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`¡¢£¥§©®™×÷';
    const originalText = 'SISTEMA INVADIDO';
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const arr = originalText.split('');
        const numGlitch = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < numGlitch; i++) {
          const idx = Math.floor(Math.random() * arr.length);
          arr[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        setGlitchText(arr.join(''));
      } else {
        setGlitchText(originalText);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [recovered]);

  // Hex stream
  useEffect(() => {
    if (recovered) return;
    const interval = setInterval(() => {
      setHexStream(prev => {
        const next = [...prev, `0x${randomHex()}`];
        if (next.length > 30) next.shift();
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [recovered]);

  // Progressive log reveal
  useEffect(() => {
    if (recovered) return;
    const regInterval = setInterval(() => {
      setVisibleRegistryLogs(prev => {
        if (prev.length >= registryLogs.length) return [registryLogs[0]];
        return [...prev, registryLogs[prev.length]];
      });
    }, 1800);
    const netInterval = setInterval(() => {
      setVisibleNetworkLogs(prev => {
        if (prev.length >= networkLogs.length) return [networkLogs[0]];
        return [...prev, networkLogs[prev.length]];
      });
    }, 2200);
    return () => { clearInterval(regInterval); clearInterval(netInterval); };
  }, [recovered]);

  // Screen shake
  useEffect(() => {
    if (recovered) return;
    const interval = setInterval(() => {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, [recovered]);

  // Random latency
  useEffect(() => {
    if (recovered) return;
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 9000) + 100);
    }, 500);
    return () => clearInterval(interval);
  }, [recovered]);

  // Random flash
  useEffect(() => {
    if (recovered) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 80);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [recovered]);

  // Hidden button handler (skull icon - triple-click rapidly)
  const handleHiddenClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime.current > 1000) {
      hiddenClickCount.current = 0;
    }
    hiddenClickCount.current++;
    lastClickTime.current = now;

    if (hiddenClickCount.current >= 3) {
      hiddenClickCount.current = 0;
      triggerRecovery();
    }
  }, []);

  const triggerRecovery = () => {
    setRecovered(true);
    setGlitchText('SISTEMA RECUPERADO');
    // After 5 seconds, go back to home
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const formattedTime = `00:00:${countdown.toString().padStart(2, '0')}`;

  return (
    <div 
      ref={containerRef}
      className={`hacker-container ${screenShake ? 'screen-shake' : ''} ${recovered ? 'recovered' : ''} ${showContent ? 'show' : ''}`}
    >
      {/* Scanline overlay */}
      <div className="scanline-overlay"></div>
      
      {/* CRT flicker */}
      <div className="crt-flicker"></div>

      {/* Flash effect */}
      {flashActive && <div className="flash-overlay"></div>}

      {/* Noise texture */}
      <div className="noise-overlay"></div>

      {/* Glitch lines */}
      <div className="glitch-lines"></div>

      {/* Hex rain in background */}
      <div className="hex-rain" aria-hidden="true">
        {hexStream.map((hex, i) => (
          <span 
            key={i} 
            className="hex-char"
            style={{ 
              left: `${(i * 3.3) % 100}%`, 
              animationDelay: `${i * 0.1}s`,
              opacity: 0.08 + Math.random() * 0.12
            }}
          >
            {hex}
          </span>
        ))}
      </div>

      {/* Border distortion */}
      <div className="border-distortion"></div>
      <div className="line-h"></div>
      <div className="line-v"></div>

      {/* Asymmetric blocks */}
      <div className="block-1"></div>
      <div className="block-2"></div>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="hacker-main">
        {/* Header bar */}
        <header className="hacker-header">
          <div className="status-badge">
            {recovered ? '✓ STATUS: CLEARED' : '✕ STATUS: CRITICAL_BREACH'}
          </div>
          <div className="status-info">
            <p>LATENCY: {recovered ? '12ms' : `${latency}ms`}</p>
            <p>UPLINK: {recovered ? 'SECURED' : 'COMPROMISED'}</p>
            <p>ENCRYPTION: {recovered ? 'AES-256' : 'NULL'}</p>
          </div>
        </header>

        {/* Main title section */}
        <section className="title-section">
          <div className="icon-bar">
            <span className="material-symbols-outlined danger-icon">
              {recovered ? 'verified_user' : 'dangerous'}
            </span>
            <div className="icon-divider"></div>
          </div>
          
          <h1 className="main-title glitch-text" data-text={glitchText}>
            {recovered ? (
              <>MALWARE<br/>REMOVIDO</>
            ) : (
              <>{glitchText.split(' ')[0] || glitchText.slice(0, 7)}<br/>{glitchText.split(' ').slice(1).join(' ') || glitchText.slice(7)}</>
            )}
          </h1>

          <div className="subtitle-badge">
            <h2 className="subtitle">
              {recovered ? 'SISTEMA DESTRAVADO!' : 'APLICAÇÃO COMPROMETIDA'}
            </h2>
          </div>
        </section>

        {/* Info cards */}
        <section className="cards-section">
          <div className="info-card">
            <h3 className="card-title">
              {recovered ? 'System Restore' : 'Registry Corruption'}
            </h3>
            <div className="card-logs">
              {recovered ? (
                <>
                  <p className="log-line success">&gt; [OK] Malware signatures removed</p>
                  <p className="log-line success">&gt; [OK] Registry restored from backup</p>
                  <p className="log-line success">&gt; [OK] Firewall rules restored</p>
                  <p className="log-line success">&gt; [OK] All threats neutralized</p>
                </>
              ) : (
                visibleRegistryLogs.map((log, i) => (
                  <p key={i} className="log-line" style={{ animationDelay: `${i * 0.1}s` }}>{log}</p>
                ))
              )}
            </div>
          </div>

          <div className="info-card">
            <h3 className="card-title">
              {recovered ? 'Network Recovery' : 'Network Infiltration'}
            </h3>
            <div className="card-logs">
              {recovered ? (
                <>
                  <p className="log-line success">&gt; [OK] SSL certificates renewed</p>
                  <p className="log-line success">&gt; [OK] Network traffic normalized</p>
                  <p className="log-line success">&gt; [OK] Ports secured</p>
                  <p className="log-line success">&gt; [OK] Connection integrity verified</p>
                </>
              ) : (
                visibleNetworkLogs.map((log, i) => (
                  <p key={i} className="log-line" style={{ animationDelay: `${i * 0.1}s` }}>{log}</p>
                ))
              )}
            </div>
          </div>

          <div 
            className="skull-card"
            onClick={handleHiddenClick}
            title=""
          >
            <span className="material-symbols-outlined skull-icon">
              {recovered ? 'shield' : 'skull'}
            </span>
            <p className="skull-text">
              {recovered ? 'SYSTEM SECURED' : 'CONNECTION TERMINATED'}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="hacker-footer">
          <div className="footer-text">
            <p>
              {recovered 
                ? 'SISTEMA DE SEGURANÇA AUTICK STUDY : AMEAÇA NEUTRALIZADA. TODOS OS SERVIÇOS RESTAURADOS COM SUCESSO. REDIRECIONANDO PARA O PAINEL PRINCIPAL...'
                : 'SISTEMA DE SEGURANÇA AUTICK STUDY : FALHA CATASTRÓFICA IDENTIFICADA. OS DADOS FORAM CRIPTOGRAFADOS POR UM AGENTE EXTERNO. NÃO DESLIGUE O TERMINAL. A TENTATIVA DE RECUPERAÇÃO RESULTARÁ EM PERDA TOTAL.'
              }
            </p>
          </div>
          <div className="countdown-display">
            {recovered ? '✓ OK' : formattedTime}
          </div>
        </footer>
      </main>

      {/* Random floating error popups */}
      {!recovered && showContent && (
        <div className="error-popups">
          <div className="error-popup popup-1">
            <span className="material-symbols-outlined">warning</span>
            CRITICAL ERROR 0x{randomHex()}
          </div>
          <div className="error-popup popup-2">
            <span className="material-symbols-outlined">error</span>
            ACCESS DENIED — IP: {randomIP()}
          </div>
          <div className="error-popup popup-3">
            <span className="material-symbols-outlined">gpp_bad</span>
            BREACH DETECTED
          </div>
        </div>
      )}

      {/* Progress bar during recovery */}
      {recovered && (
        <div className="recovery-bar-container">
          <div className="recovery-bar"></div>
        </div>
      )}
    </div>
  );
}
