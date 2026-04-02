import { useState, useEffect, useRef } from "react";

const PURPLE = { bg: "#EEEDFE", mid: "#7F77DD", dark: "#534AB7", text: "#3C3489" };
const TEAL   = { bg: "#E1F5EE", mid: "#1D9E75", dark: "#0F6E56", text: "#085041" };
const CORAL  = { bg: "#FAECE7", mid: "#D85A30", dark: "#993C1D", text: "#712B13" };
const BLUE   = { bg: "#E6F1FB", mid: "#378ADD", dark: "#185FA5", text: "#0C447C" };
const AMBER  = { bg: "#FAEEDA", mid: "#BA7517", dark: "#854F0B", text: "#633806" };

const skills = [
  { name: "Communication",  pct: 90, color: PURPLE },
  { name: "Data Analysis",  pct: 80, color: TEAL   },
  { name: "Research Skills",pct: 85, color: BLUE   },
  { name: "MS Office",      pct: 88, color: AMBER  },
  { name: "SPSS",           pct: 72, color: CORAL  },
  { name: "QGIS",           pct: 65, color: TEAL   },
];

const experiences = [
  {
    role: "Research Assistant",
    org: "GTA Foundation",
    period: "2024–2025",
    desc: "Worked on maternal health records, suicide prevention, and antimicrobial stewardship programs.",
    chips: ["Maternal health", "Research", "AMS"],
    color: PURPLE,
  },
  {
    role: "Data Entry Specialist",
    org: "Karuna Foundation Nepal",
    period: "2023",
    desc: "Managed disability-related data within MIS systems ensuring accuracy and consistency.",
    chips: ["MIS", "Data management"],
    color: TEAL,
  },
  {
    role: "Health Office Volunteer",
    org: "Local Health Office",
    period: "2020",
    desc: "Assisted COVID-19 vaccination operations and public communication campaigns.",
    chips: ["COVID-19", "Public outreach"],
    color: CORAL,
  },
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimBar({ pct, color, delay }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ height: 7, background: "#e5e7eb", borderRadius: 99, overflow: "hidden", marginTop: 6 }}>
      <div style={{
        height: "100%", borderRadius: 99,
        background: color.dark,
        width: vis ? `${pct}%` : "0%",
        transition: `width 0.9s cubic-bezier(.4,0,.2,1) ${delay}s`,
      }} />
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const tabs = ["about", "experience", "skills", "education"];

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7ff", fontFamily: "'DM Sans', sans-serif", padding: "0 0 48px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Sora:wght@500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 50%{transform:scale(1.18);opacity:.15} 100%{transform:scale(1);opacity:.6} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .avatar-wrap { animation: float 4s ease-in-out infinite; }
        .tab-btn { cursor:pointer; border:none; font-family:inherit; font-size:14px; font-weight:500; padding:8px 20px; border-radius:99px; transition:all .2s; }
        .chip { display:inline-block; font-size:12px; padding:3px 10px; border-radius:99px; margin:3px; font-weight:500; }
        .card { background:#fff; border-radius:16px; border:0.5px solid #e5e3f8; padding:1.4rem 1.6rem; margin-bottom:12px; }
        .exp-card { background:#fff; border-radius:16px; border:0.5px solid #e5e3f8; padding:1.2rem 1.4rem; flex:1; }
        .metric-card { background:#fff; border-radius:14px; padding:1rem; text-align:center; border:0.5px solid #e5e3f8; }
        .link-btn { display:inline-flex; align-items:center; gap:6px; padding:9px 22px; border-radius:99px; font-size:14px; font-weight:500; text-decoration:none; cursor:pointer; transition:all .18s; font-family:inherit; }
        .dot-ring { position:absolute; inset:-5px; border-radius:50%; border:2px solid #7F77DD; animation:pulse-ring 2.5s ease-in-out infinite; }
      `}</style>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#f0effe 0%,#e8f8f1 100%)", padding: "48px 24px 36px", textAlign: "center" }}>
        <FadeIn delay={0}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }} className="avatar-wrap">
            <div className="dot-ring" />
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: PURPLE.dark,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 600, color: "#fff",
              fontFamily: "'Sora', sans-serif",
              position: "relative",
            }}>PB</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: "#1a1635", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.3px" }}>
            Prabin Upadhayay Bhurtel
          </h1>
          <p style={{ fontSize: 15, color: PURPLE.text, marginTop: 6, fontWeight: 500 }}>Public Health Professional</p>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Boudha, Kathmandu · +977-9865712809</p>
        </FadeIn>
        <FadeIn delay={0.2} style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <a href="mailto:prabinbhurtel2000@gmail.com" className="link-btn"
            style={{ background: PURPLE.dark, color: "#fff", border: "none" }}>
            ✉ Email me
          </a>
          <a href="https://www.linkedin.com/in/prabin-bhurtel-a1672a293/" target="_blank" className="link-btn"
            style={{ background: "#fff", color: PURPLE.text, border: `0.5px solid ${PURPLE.mid}` }}>
            in LinkedIn ↗
          </a>
        </FadeIn>
      </div>

      {/* Metrics */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 20px 0" }}>
        <FadeIn delay={0.25}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
            {[["5+", "Years exp."], ["3", "Orgs"], ["6", "Skills"]].map(([n, l], i) => (
              <div key={i} className="metric-card">
                <div style={{ fontSize: 26, fontWeight: 600, color: [PURPLE.dark, TEAL.dark, CORAL.dark][i], fontFamily: "'Sora', sans-serif" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            {tabs.map(t => (
              <button key={t} className="tab-btn"
                style={{
                  background: active === t ? PURPLE.dark : "#fff",
                  color: active === t ? "#fff" : "#555",
                  border: active === t ? "none" : "0.5px solid #ddd",
                  transform: active === t ? "scale(1.04)" : "scale(1)",
                }}
                onClick={() => setActive(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* About */}
        {active === "about" && (
          <FadeIn delay={0}>
            <div className="card">
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.75 }}>
                Detail-oriented public health graduate with strong analytical and communication skills.
                Passionate about improving community health through research, data analysis, and outreach programs.
              </p>
            </div>
            <div className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start", borderLeft: `3px solid ${TEAL.dark}`, borderRadius: "0 16px 16px 0" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: TEAL.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📍</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1635" }}>Based in Kathmandu, Nepal</p>
                <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Open to research and public health roles locally and remotely</p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Experience */}
        {active === "experience" && (
          <div>
            {experiences.map((ex, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: ex.color.dark, flexShrink: 0, marginTop: 18 }} />
                    {i < experiences.length - 1 && <div style={{ width: 2, flex: 1, background: ex.color.bg, minHeight: 30, margin: "4px 0 0 0" }} />}
                  </div>
                  <div className="exp-card"
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                    style={{ borderLeft: `3px solid ${ex.color.dark}`, borderRadius: "0 16px 16px 0", transition: "transform .2s", transform: hovered === i ? "translateX(4px)" : "translateX(0)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}>
                      <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1635" }}>{ex.role}</p>
                      <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: ex.color.bg, color: ex.color.text, fontWeight: 500 }}>{ex.period}</span>
                    </div>
                    <p style={{ fontSize: 13, color: ex.color.dark, marginTop: 3, fontWeight: 500 }}>{ex.org}</p>
                    <p style={{ fontSize: 14, color: "#555", marginTop: 8, lineHeight: 1.65 }}>{ex.desc}</p>
                    <div style={{ marginTop: 10 }}>
                      {ex.chips.map((c, j) => (
                        <span key={j} className="chip" style={{ background: ex.color.bg, color: ex.color.text }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Skills */}
        {active === "skills" && (
          <div className="card">
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Proficiency across core public health tools</p>
            {skills.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#333" }}>
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: s.color.dark, fontWeight: 500 }}>{s.pct}%</span>
                  </div>
                  <AnimBar pct={s.pct} color={s.color} delay={i * 0.07} />
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Education */}
        {active === "education" && (
          <FadeIn delay={0}>
            <div className="card" style={{ borderLeft: `3px solid ${BLUE.dark}`, borderRadius: "0 16px 16px 0" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: BLUE.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎓</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1635" }}>Bachelor of Public Health</p>
                  <p style={{ fontSize: 14, color: BLUE.dark, marginTop: 4, fontWeight: 500 }}>Nepal Institute of Health Sciences</p>
                  <span style={{ display: "inline-block", marginTop: 8, fontSize: 12, padding: "3px 10px", borderRadius: 99, background: BLUE.bg, color: BLUE.text, fontWeight: 500 }}>2018 – 2023</span>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 32 }}>
          © {new Date().getFullYear()} Prabin Bhurtel
        </div>
      </div>
    </div>
  );
}
