// dsh-prc-people-skin — browser half.
// A self-contained government-workbench skin for the native DSH Web GUI.
// It only adds and styles: the native layout, composer, sidebar behaviour and
// all host interactions remain untouched. Every mutation is registered through
// ctx.effect so disabling/removing the bundle reverts the page.
window.__ModuleLoader__.load({
  id: 'dsh-prc-people-skin',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const ReactMod = require('react');
    const React = ReactMod && ReactMod.createElement ? ReactMod : ReactMod.default;
    const { useEffect, useRef, useState } = React;

    const NS = 'dsh-prc-people-skin';
    const ATTR = 'data-prc-people-skin';
    const STORAGE_KEY = 'dsh-prc-people-skin:enabled';
    const CHANGE_EVENT = 'prc-people-skin:change';
    const ASSET = '/dsh-prc-people-skin';
    const inject = ['theme', 'slots', 'locale'];

    const PALETTE = {
      oxblood: '#6E1717',
      oxbloodDeep: '#4A0D0D',
      oxbloodLight: '#8E2A24',
      vermilion: '#B22A22',
      seal: '#8E1A12',
      gold: '#C9A063',
      goldLight: '#E8CBA0',
      ivory: '#F7F1E7',
      ivoryLight: '#FFFDF8',
      ink: '#3B2B25',
      muted: '#8B6A58',
    };

    const pair = (value) => ({ light: value, dark: value });
    const TOKENS = {
      '--dsw-alias-bg-base': pair(PALETTE.ivory),
      '--dsw-alias-bg-layer-1': pair(PALETTE.ivoryLight),
      '--dsw-alias-bg-layer-2': pair('#FBF2E3'),
      '--dsw-alias-bg-layer-3': pair('#F4E5D0'),
      '--dsw-alias-bg-overlay': pair('#FFFDF8'),
      '--dsw-alias-bg-module-platform': pair('#F6E9D7'),
      '--dsw-alias-bg-skeleton': pair('#EFE1CE'),
      '--dsw-alias-border-l1': pair('rgba(142, 42, 36, 0.13)'),
      '--dsw-alias-border-l2': pair('rgba(142, 42, 36, 0.22)'),
      '--dsw-alias-border-l3': pair('rgba(142, 42, 36, 0.30)'),
      '--dsw-alias-border-l4': pair('rgba(142, 42, 36, 0.38)'),
      '--dsw-alias-brand-primary': pair(PALETTE.vermilion),
      '--dsw-alias-brand-primary-soft': pair('rgba(178, 42, 34, 0.10)'),
      '--dsw-alias-brand-text': pair('#FFF7E8'),
      '--dsw-alias-label-primary': pair(PALETTE.ink),
      '--dsw-alias-label-secondary': pair('#6F5448'),
      '--dsw-alias-label-tertiary': pair('#98796A'),
      '--dsw-alias-interactive-bg-hover': pair('rgba(178, 42, 34, 0.07)'),
      '--dsw-alias-interactive-bg-active': pair('rgba(178, 42, 34, 0.13)'),
      '--dsw-alias-button-primary-fill': pair(PALETTE.vermilion),
      '--dsw-alias-button-primary-hover': pair(PALETTE.seal),
      '--dsw-alias-button-primary-dimmed': pair('rgba(178, 42, 34, 0.45)'),
      '--dsw-alias-button-elevated-fill': pair('#FFFDF8'),
      '--dsw-alias-button-tool-bar-fill': pair('#F5E7D3'),
      '--dsw-alias-button-tool-bar-hover': pair('#EEDBC2'),
      '--dsw-alias-state-business-primary': pair('#A97835'),
      '--dsw-alias-state-business-tertiary': pair('rgba(169, 120, 53, 0.14)'),
      '--dsw-alias-state-success-primary': pair('#3F7A52'),
      '--dsw-alias-state-warn-primary': pair('#B2762A'),
      '--dsw-alias-state-error-primary': pair('#A32018'),
      '--dsw-alias-state-idle-primary': pair('#A88A79'),
      '--dsw-alias-markdown-code-block': pair('#F3E8D7'),
      '--dsw-alias-markdown-inline-code': pair('#F0E1CB'),
      '--dsw-alias-markdown-tag': pair('#E8D2B2'),
      '--dsw-alias-menu-group-header-fill': pair('rgba(255, 250, 241, 0.94)'),
      '--dsw-alias-scrollbar-bg-l1': pair('rgba(142, 42, 36, 0.16)'),
      '--dsw-alias-scrollbar-bg-l2': pair('rgba(142, 42, 36, 0.12)'),
      '--dsw-alias-scrollbar-hover-l1': pair('rgba(142, 42, 36, 0.32)'),
      '--dsw-alias-scrollbar-hover-l2': pair('rgba(142, 42, 36, 0.24)'),
      '--dsw-focus-ring-color': pair('rgba(178, 42, 34, 0.38)'),
      '--dsw-specific-sidebar-fill': pair(PALETTE.oxblood),
      '--dsw-specific-sidebar-nav-item-active': pair('rgba(255, 241, 214, 0.15)'),
      '--dsw-specific-sidebar-nav-item-hover': pair('rgba(255, 241, 214, 0.08)'),
      '--dsw-specific-input-major': pair(PALETTE.ivoryLight),
      '--dsw-specific-bubble': pair('#F2E1CA'),
      '--dsw-specific-bubble-highlight': pair('#EAD3B4'),
      '--dsw-specific-menu': pair('#FFFDF8'),
      '--dsw-specific-selector': pair('#F7EAD7'),
      '--dsw-specific-tip': pair('#FFF8EB'),
      '--dsw-menu-surface-fill': pair('#FFFDF8'),
    };

    const CSS = `
html[${ATTR}="on"] {
  color-scheme: light;
  --prc-oxblood: ${PALETTE.oxblood};
  --prc-oxblood-deep: ${PALETTE.oxbloodDeep};
  --prc-vermilion: ${PALETTE.vermilion};
  --prc-seal: ${PALETTE.seal};
  --prc-gold: ${PALETTE.gold};
  --prc-ivory: ${PALETTE.ivory};
  --prc-ivory-light: ${PALETTE.ivoryLight};
  --prc-ink: ${PALETTE.ink};
  --prc-serif: "Noto Serif SC", "Source Han Serif SC", "Songti SC", STSong, SimSun, serif;
}
html[${ATTR}="on"] ::selection { background: rgba(178, 42, 34, 0.18); }
html[${ATTR}="on"] body { background: ${PALETTE.ivory}; }
html[${ATTR}="on"] #root {
  position: relative;
  isolation: isolate;
  background:
    radial-gradient(120% 80% at 84% 8%, rgba(255, 250, 236, 0.94) 0%, rgba(255, 250, 236, 0) 58%),
    linear-gradient(180deg, #FBF6EC 0%, #F7F1E7 55%, #F3E9DB 100%);
}
html[${ATTR}="on"] #root::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: url("${ASSET}/skyline.svg") center bottom / min(1600px, 120%) auto no-repeat;
  opacity: 0.11;
}
html[${ATTR}="on"] #root > div[class*="_frame"],
html[${ATTR}="on"] #root > div[class*="frame"] {
  position: relative;
  z-index: 1;
  background: transparent !important;
}
html[${ATTR}="on"] [class*="centerCol"],
html[${ATTR}="on"] [class*="an3WzG_root"],
html[${ATTR}="on"] [class*="an3WzG_body"],
html[${ATTR}="on"] [class*="an3WzG_header"] {
  background: transparent !important;
}
html[${ATTR}="on"] [class*="an3WzG_header"] { border-bottom-color: transparent !important; }
html[${ATTR}="on"] [class*="an3WzG_header"] button { color: #7A5A49; }

/* ── 左侧深红栏 ─────────────────────────────────────────────── */
html[${ATTR}="on"] [class*="sidebarCol"] { background: ${PALETTE.oxbloodDeep} !important; }
html[${ATTR}="on"] [class*="quietBars"] {
  position: relative;
  overflow: hidden;
  --dsw-alias-label-primary-inverted: #6E1717;
  color: #F3DFC4 !important;
  background:
    radial-gradient(120% 65% at 8% 100%, rgba(255, 218, 164, 0.26) 0%, rgba(255, 218, 164, 0) 60%),
    radial-gradient(80% 45% at 100% 0%, rgba(255, 206, 160, 0.10) 0%, rgba(255, 206, 160, 0) 70%),
    linear-gradient(168deg, #7E241F 0%, #6E1717 44%, #8E2A24 100%) !important;
  box-shadow: inset -1px 0 0 rgba(255, 229, 188, 0.12);
}
html[${ATTR}="on"] [class*="quietBars"]::before {
  content: "人民";
  position: absolute;
  right: -14px;
  bottom: 118px;
  z-index: 0;
  writing-mode: vertical-rl;
  font-family: var(--prc-serif);
  font-size: 122px;
  line-height: 0.98;
  letter-spacing: 0.08em;
  color: rgba(255, 236, 204, 0.075);
  pointer-events: none;
  user-select: none;
}
html[${ATTR}="on"] [class*="quietBars"]::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 290px;
  z-index: 0;
  pointer-events: none;
  background: url("${ASSET}/skyline.svg") center bottom / 110% auto no-repeat;
  opacity: 0.22;
  filter: sepia(1) saturate(0.45) brightness(1.9);
  mix-blend-mode: soft-light;
}
html[${ATTR}="on"] [class*="quietBars"] > * { position: relative; z-index: 1; }
html[${ATTR}="on"] [class*="logoRow"] {
  margin: 0 10px 4px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 232, 197, 0.16);
  color: #FFF4DF !important;
}
html[${ATTR}="on"] [class*="sidebarCol"] [class*="brand"] { color: #FFF4DF !important; }
html[${ATTR}="on"] [class*="sidebarCol"] [class*="brandName"] { color: #FFF4DF !important; }
html[${ATTR}="on"] [class*="sidebarCol"] [class*="brandName"] svg { color: #FFF4DF; opacity: 0.96; }
html[${ATTR}="on"] [class*="sidebarCol"] [class*="brandMark"] { color: #F6E6C8 !important; }
html[${ATTR}="on"] [class*="iconButton"] { color: #E8CDAA !important; }
html[${ATTR}="on"] [class*="iconButton"]:hover { background: rgba(255, 239, 211, 0.12) !important; }
html[${ATTR}="on"] [class*="newSession"] {
  background: rgba(255, 246, 228, 0.055) !important;
  border: 1px solid rgba(255, 226, 183, 0.34) !important;
  color: #FFF2D8 !important;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.07) inset !important;
}
html[${ATTR}="on"] [class*="newSession"]:hover {
  background: rgba(255, 236, 205, 0.14) !important;
  border-color: rgba(255, 218, 160, 0.62) !important;
}
html[${ATTR}="on"] [class*="newSessionLabel"],
html[${ATTR}="on"] [class*="newSessionContent"] { color: #FFF2D8 !important; }
html[${ATTR}="on"] [class*="newSessionShortcut"],
html[${ATTR}="on"] [class*="keys_"] { color: rgba(255, 231, 198, 0.56) !important; }
html[${ATTR}="on"] [class*="panelRow"] { color: #F3DFC4 !important; }
html[${ATTR}="on"] [class*="panelRow"]:hover { background: rgba(255, 239, 211, 0.10) !important; }
html[${ATTR}="on"] [class*="panelTitle"] { color: #F3DFC4 !important; }
html[${ATTR}="on"] [class*="panelGlyph"] { color: #D9B77A !important; }
html[${ATTR}="on"] [class*="sidebarCol"] svg { color: inherit; }
html[${ATTR}="on"] [class*="sectionLabel"] {
  color: #D9B77A !important;
  letter-spacing: 0.13em;
  font-weight: 600;
}
html[${ATTR}="on"] [class*="sectionHeader"] { color: #D9B77A !important; }
html[${ATTR}="on"] [class*="search"],
html[${ATTR}="on"] [class*="headerActions"] { color: rgba(255, 235, 208, 0.66) !important; }
html[${ATTR}="on"] [class*="searchInput"] {
  background: rgba(255, 246, 228, 0.08) !important;
  color: #FFF2D8 !important;
  border-color: rgba(255, 226, 183, 0.26) !important;
}
html[${ATTR}="on"] [class*="projectRow"] { color: #F0DCBF !important; }
html[${ATTR}="on"] [class*="projectRow"]:hover { background: rgba(255, 239, 211, 0.08) !important; }
html[${ATTR}="on"] [class*="sessionRow"] { color: rgba(247, 228, 201, 0.84) !important; }
html[${ATTR}="on"] [class*="sessionRow"]:hover { background: rgba(255, 239, 211, 0.08) !important; }
html[${ATTR}="on"] [class*="sidebarCol"] [class*="selected"] {
  background: linear-gradient(90deg, rgba(255, 226, 183, 0.20), rgba(255, 226, 183, 0.06)) !important;
  color: #FFF8E9 !important;
  box-shadow: inset 2px 0 0 #D9B77A;
}
html[${ATTR}="on"] [class*="sidebarCol"] [class*="selected"] * { color: #FFF8E9 !important; }
html[${ATTR}="on"] [class*="sidebarCol"] [class*="time"],
html[${ATTR}="on"] [class*="sidebarCol"] [class*="meta"] { color: rgba(255, 230, 196, 0.48) !important; }
html[${ATTR}="on"] [class*="footArea"] { border-top: 1px solid rgba(255, 235, 205, 0.15); }
html[${ATTR}="on"] [class*="footerActions"] { color: rgba(255, 235, 205, 0.70) !important; }
html[${ATTR}="on"] [class*="settingsArea"] { color: #F4E1C5 !important; }
html[${ATTR}="on"] [class*="triggerRow"] { color: #F4E1C5 !important; }
html[${ATTR}="on"] [class*="quietBars"] ::-webkit-scrollbar-thumb {
  background: rgba(255, 236, 205, 0.22) !important;
}
html[${ATTR}="on"] [class*="quietBars"] ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 236, 205, 0.34) !important;
}

/* ── 米白工作区与原生输入区 ─────────────────────────────────── */
html[${ATTR}="on"] [data-phase="hero"] [class*="WOwLGG_headline"] {
  color: #7E1A13 !important;
  font-family: var(--prc-serif);
  letter-spacing: 0.04em;
}
html[${ATTR}="on"] [class*="previewBadge"] { display: none !important; }
html[${ATTR}="on"] [class*="an3WzG_root"] [class*="workspace"] { color: #6F5448 !important; }
html[${ATTR}="on"] [class*="an3WzG_root"] [class*="workspace"]:hover { background: rgba(178, 42, 34, 0.07) !important; }
html[${ATTR}="on"] div[class*="_card"]:has([data-composer-input="true"]),
html[${ATTR}="on"] [class*="GRgSLq_card"] {
  background: #FFFDF8 !important;
  border: 1px solid rgba(142, 42, 36, 0.15) !important;
  border-radius: 26px !important;
  box-shadow:
    0 18px 44px rgba(103, 31, 20, 0.10),
    0 2px 0 rgba(255, 255, 255, 0.85) inset !important;
}
html[${ATTR}="on"] div[class*="_card"]:has([data-composer-input="true"]):focus-within {
  border-color: rgba(201, 160, 99, 0.72) !important;
  box-shadow:
    0 20px 48px rgba(103, 31, 20, 0.14),
    0 0 0 3px rgba(201, 160, 99, 0.16) !important;
}
html[${ATTR}="on"] [data-composer-input="true"] {
  color: ${PALETTE.ink} !important;
  caret-color: ${PALETTE.vermilion};
}
html[${ATTR}="on"] [class*="placeholder"] { color: #A08373 !important; }
html[${ATTR}="on"] [class*="GRgSLq_primary"] {
  background: ${PALETTE.vermilion} !important;
  color: #FFF8E9 !important;
}
html[${ATTR}="on"] [class*="GRgSLq_primary"]:disabled {
  background: rgba(142, 26, 18, 0.72) !important;
  color: rgba(255, 248, 233, 0.94) !important;
  opacity: 0.9;
}
html[${ATTR}="on"] [class*="composer"] button { color: #795747; }
html[${ATTR}="on"] [class*="composer"] button:hover { color: ${PALETTE.vermilion}; }
html[${ATTR}="on"] [class*="accessory"],
html[${ATTR}="on"] [class*="toolbar"] { color: #795747; }

/* ── 自绘政务工作台 ───────────────────────────────────────── */
.prc-workbench { position: relative; display: none; box-sizing: border-box; width: 100%; max-width: 860px; margin: 0 auto 8px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }
html[${ATTR}="on"] [data-phase="hero"] .prc-workbench { display: block; }
.prc-workbench *,
.prc-workbench *::before,
.prc-workbench *::after { box-sizing: border-box; }
.prc-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 2px 8px;
}
.prc-topbar-brand { display: flex; align-items: center; gap: 9px; min-width: 0; }
.prc-emblem {
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #F6D79E;
  background: linear-gradient(145deg, #A32018, #6E1717);
  box-shadow: 0 4px 10px rgba(110, 23, 23, 0.18), inset 0 1px 0 rgba(255, 237, 204, 0.26);
}
.prc-topbar-copy { display: flex; flex-direction: column; min-width: 0; }
.prc-topbar-title { color: #6E1717; font-size: 13px; font-weight: 700; line-height: 1.3; letter-spacing: 0.06em; }
.prc-topbar-sub { color: #96735F; font-size: 10px; line-height: 1.4; letter-spacing: 0.13em; }
.prc-topbar-note { flex: none; color: #A08373; font-family: var(--prc-serif); font-size: 10px; letter-spacing: 0.12em; }
.prc-banner {
  position: relative;
  height: clamp(158px, 23vh, 218px);
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(154, 76, 45, 0.18);
  background: linear-gradient(135deg, #FFF3DC, #F6D1A9);
  box-shadow: 0 18px 42px rgba(109, 38, 22, 0.14);
}
.prc-banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 56%;
  user-select: none;
}
.prc-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(255, 248, 235, 0.28) 0%, rgba(255, 248, 235, 0.04) 42%, rgba(255, 248, 235, 0) 66%),
    linear-gradient(0deg, rgba(111, 27, 18, 0.16), rgba(111, 27, 18, 0) 36%);
}
.prc-brandline {
  position: absolute;
  top: 12px;
  left: 14px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 4px 9px 4px 7px;
  border: 1px solid rgba(142, 42, 36, 0.14);
  border-radius: 999px;
  color: #7E1A13;
  background: rgba(255, 249, 236, 0.62);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-shadow: 0 1px 0 rgba(255, 249, 236, 0.8);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.prc-brandline svg { width: 14px; height: 14px; color: #A32018; }
.prc-brandline small {
  color: rgba(111, 69, 50, 0.78);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
}
.prc-copy {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 30px 28px 18px;
  text-align: center;
  pointer-events: none;
}
.prc-copy h2 {
  margin: 0;
  color: #8E1A12;
  font-family: var(--prc-serif);
  font-size: clamp(25px, 3.15vw, 40px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: 0.10em;
  text-shadow: 0 2px 0 rgba(255, 247, 230, 0.72), 0 8px 24px rgba(255, 242, 216, 0.55);
}
.prc-copy p {
  margin: 0;
  color: #8A4A36;
  font-size: clamp(10px, 1.05vw, 12px);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-shadow: 0 1px 0 rgba(255, 247, 230, 0.7);
}
.prc-seal {
  position: absolute;
  right: 16px;
  bottom: 14px;
  z-index: 2;
  padding: 3px 7px;
  border: 1px solid rgba(142, 42, 36, 0.35);
  border-radius: 3px;
  color: #8E1A12;
  background: rgba(255, 247, 232, 0.52);
  font-family: var(--prc-serif);
  font-size: 9px;
  line-height: 1.35;
  letter-spacing: 0.14em;
}
.prc-actions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 10px;
}
.prc-card {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  min-height: 58px;
  padding: 10px 11px;
  border: 1px solid rgba(150, 80, 50, 0.16);
  border-radius: 12px;
  background: rgba(255, 253, 248, 0.94);
  box-shadow: 0 3px 10px rgba(80, 35, 20, 0.045);
  color: ${PALETTE.ink};
  text-align: left;
  cursor: pointer;
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
}
.prc-card:hover {
  transform: translateY(-2px);
  border-color: rgba(201, 160, 99, 0.82);
  background: #FFFEFB;
  box-shadow: 0 8px 20px rgba(103, 31, 20, 0.10);
}
.prc-card:active { transform: translateY(0); }
.prc-card:focus-visible { outline: 2px solid rgba(178, 42, 34, 0.55); outline-offset: 2px; }
.prc-card-icon {
  flex: none;
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #A32018;
  background: #F7E6D2;
  box-shadow: inset 0 0 0 1px rgba(201, 160, 99, 0.28);
}
.prc-card-icon svg { width: 17px; height: 17px; }
.prc-card-body { min-width: 0; }
.prc-card-title { display: block; font-size: 13px; font-weight: 650; line-height: 1.35; white-space: nowrap; }
.prc-card-desc {
  display: block;
  margin-top: 1px;
  overflow: hidden;
  color: #8B6A58;
  font-size: 10px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prc-prompt { padding: 9px 0 1px; text-align: center; }
.prc-prompt-title {
  color: #7E1A13;
  font-family: var(--prc-serif);
  font-size: 20px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: 0.05em;
}
.prc-prompt-sub {
  margin-top: 1px;
  color: #96735F;
  font-size: 10px;
  letter-spacing: 0.16em;
}
.prc-toast {
  position: absolute;
  left: 14px;
  bottom: 10px;
  z-index: 5;
  padding: 6px 12px;
  border: 1px solid rgba(201, 160, 99, 0.55);
  border-radius: 999px;
  color: #FFF8E9;
  background: rgba(83, 24, 19, 0.92);
  box-shadow: 0 8px 24px rgba(50, 15, 10, 0.22);
  font-size: 12px;
  letter-spacing: 0.04em;
  pointer-events: none;
}

/* Hide the native centred hero only while our workbench is mounted, so a
   failed/disabled skin always falls back to the untouched native home. */
html[${ATTR}="on"] [data-phase="hero"]:has(.prc-workbench) [class*="WOwLGG_root"] { display: none !important; }
html[${ATTR}="on"] [data-phase="hero"]:has(.prc-workbench) [class*="an3WzG_heroWorkspaceRow"] { display: none !important; }

/* ── 设置行 ───────────────────────────────────────────────── */
.prc-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 15px 0;
  border-top: 1px solid rgba(142, 42, 36, 0.13);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.prc-settings-copy { min-width: 0; }
.prc-settings-title { color: ${PALETTE.ink}; font-size: 13px; font-weight: 650; }
.prc-settings-desc { margin-top: 2px; color: #8B6A58; font-size: 11px; line-height: 1.5; }
.prc-settings-actions { display: flex; align-items: center; gap: 10px; flex: none; }
.prc-download {
  color: #8E1A12;
  font-size: 11px;
  text-decoration: none;
  border-bottom: 1px dashed rgba(142, 26, 18, 0.45);
  padding-bottom: 1px;
}
.prc-download:hover { color: ${PALETTE.vermilion}; }
.prc-switch {
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 1px solid rgba(142, 42, 36, 0.20);
  border-radius: 999px;
  background: #E8D6C0;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;
}
.prc-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FFFDF8;
  box-shadow: 0 1px 3px rgba(74, 30, 20, 0.25);
  transition: transform 150ms ease;
}
.prc-switch[aria-checked="true"] { background: ${PALETTE.vermilion}; border-color: ${PALETTE.vermilion}; }
.prc-switch[aria-checked="true"]::after { transform: translateX(18px); }
.prc-switch:focus-visible { outline: 2px solid rgba(178, 42, 34, 0.45); outline-offset: 2px; }

@media (max-width: 1180px) {
  .prc-topbar-note { display: none; }
}
@media (max-width: 920px) {
  .prc-card-desc { display: none; }
  .prc-actions { gap: 8px; }
}
@media (max-width: 740px) {
  .prc-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .prc-banner { height: 142px; }
  .prc-copy h2 { font-size: 22px; letter-spacing: 0.06em; }
  .prc-copy p { font-size: 9px; letter-spacing: 0.10em; }
  .prc-prompt-title { font-size: 17px; }
  .prc-seal { display: none; }
}
@media (max-height: 720px) {
  .prc-banner { height: 124px; }
  .prc-copy h2 { font-size: 22px; }
  .prc-card { min-height: 48px; padding: 7px 9px; }
  .prc-prompt { display: none; }
}
@media (max-height: 610px) {
  .prc-banner { height: 106px; }
  .prc-copy h2 { font-size: 19px; }
  .prc-actions { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .prc-card, .prc-switch, .prc-switch::after { transition: none; }
}
`;

    const ZH = {
      meta: {
        title: '人民政务皮肤 (dsh-prc-people-skin)',
        description: '深红侧栏与米白工作区的政务工作台皮肤：自绘横幅、四张办事入口，兼容原生 DSH 布局。',
      },
      workbench: {
        name: 'DSH 政务工作台',
        slogan: '人民至上 · 数智协同',
        title: '人民的AI，智慧办公',
        subtitle: '人民至上 · 服务为本 · 数智赋能 · 协同高效',
        seal: '服务为民 实干笃行',
        promptTitle: '我们要构建什么？',
        promptSub: '以人工智能助力政务工作',
        filled: '已填入输入框',
        copied: '提示词已复制',
        cards: [
          { title: '创建材料', desc: '智能起草各类政务材料' },
          { title: '政策调研', desc: '梳理政策要点与影响' },
          { title: '信息获取', desc: '信息检索、核验与整合' },
          { title: '流程自动化', desc: '梳理业务流程与步骤' },
        ],
      },
      settings: {
        title: '人民政务皮肤',
        desc: '深红侧栏、米白工作区与政务工作台；随时关闭即可恢复原生外观。',
        download: '下载 Dream Skin 主题包',
      },
    };

    const EN = {
      meta: {
        title: "People's Government Skin (dsh-prc-people-skin)",
        description: 'A government workbench skin with an oxblood sidebar and ivory workspace: original banner, four service entries, native DSH layout preserved.',
      },
      workbench: {
        name: 'DSH Government Workbench',
        slogan: 'People first · Digital collaboration',
        title: "The People's AI, Intelligent Government",
        subtitle: 'People first · Service-oriented · Digital empowerment · Efficient collaboration',
        seal: 'Serve the people',
        promptTitle: 'What shall we build?',
        promptSub: 'AI-assisted government work',
        filled: 'Prompt inserted',
        copied: 'Prompt copied',
        cards: [
          { title: 'Draft materials', desc: 'Draft government documents' },
          { title: 'Policy research', desc: 'Summarise policy impacts' },
          { title: 'Information', desc: 'Retrieve and verify facts' },
          { title: 'Automation', desc: 'Map and automate workflows' },
        ],
      },
      settings: {
        title: "People's Government Skin",
        desc: 'Oxblood sidebar, ivory workspace and a government workbench. Turn it off to restore the native look.',
        download: 'Download Dream Skin pack',
      },
    };

    const CARDS = [
      {
        key: 'draft',
        prompt: '请帮我起草一份政务材料。主题：______；受众：______；字数：______；语气：庄重、准确、简明。请先列出提纲，再成文。',
        icon: 'document',
      },
      {
        key: 'policy',
        prompt: '请对以下政策进行调研梳理：政策名称/文号：______。请输出：政策背景、核心要点、适用对象、实施时间、可能影响与落实建议，并标注信息来源。',
        icon: 'search',
      },
      {
        key: 'info',
        prompt: '请检索并核验以下信息：______。请给出来源、发布时间、关键数据与交叉验证结论；无法核实的内容请明确标注。',
        icon: 'info',
      },
      {
        key: 'workflow',
        prompt: '请帮我梳理这项工作的业务流程并给出自动化方案：业务目标：______；现有步骤：______；涉及系统/表单：______。请输出流程步骤、风险点与可自动化的环节。',
        icon: 'workflow',
      },
    ];

    let ctxRef = null;
    let tokenDispose = null;
    let styleEl = null;
    let placeholderObserver = null;
    let installed = false;
    let enabled = true;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'off') enabled = false;
    } catch (_) {
      /* private mode: keep the default */
    }

    const t = (path, fallback) => {
      try {
        const dict = (document.documentElement.lang || '').toLowerCase().startsWith('en') ? EN : ZH;
        let value = dict;
        for (const part of path.split('.')) value = value?.[part];
        return typeof value === 'string' ? value : fallback;
      } catch (_) {
        return fallback;
      }
    };

    const isEnabled = () => enabled;

    const syncTokens = () => {
      if (tokenDispose) {
        try { tokenDispose(); } catch (_) { /* already disposed */ }
        tokenDispose = null;
      }
      if (!ctxRef || !enabled) return;
      try {
        tokenDispose = ctxRef.theme.overrideTokens(NS, TOKENS);
      } catch (err) {
        console.warn('[prc-people-skin] token override failed', err);
      }
    };

    const applyEnabled = (next) => {
      enabled = !!next;
      try { window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off'); } catch (_) { /* ignore */ }
      document.documentElement.setAttribute(ATTR, enabled ? 'on' : 'off');
      syncTokens();
      patchPlaceholders();
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { enabled } }));
    };

    const fillComposer = (text) => {
      const editor = document.querySelector('[data-composer-input="true"]');
      if (!editor) return false;
      try {
        editor.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editor);
        selection.removeAllRanges();
        selection.addRange(range);
        const ok = document.execCommand('insertText', false, text);
        if (!ok) {
          editor.textContent = text;
          editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
        }
        return true;
      } catch (err) {
        console.warn('[prc-people-skin] could not fill composer', err);
        return false;
      }
    };

    const patchPlaceholders = () => {
      const nodes = document.querySelectorAll('[data-composer-placeholder="true"]');
      nodes.forEach((el) => {
        if (el.dataset.prcOriginal === undefined) el.dataset.prcOriginal = el.textContent || '';
        const next = enabled ? '随心输入，交给人民的 AI' : el.dataset.prcOriginal;
        if (el.textContent !== next) el.textContent = next;
      });
    };

    const iconPaths = {
      document: React.createElement(React.Fragment, null,
        React.createElement('path', { d: 'M5 2.5h5l3 3v8H5z' }),
        React.createElement('path', { d: 'M10 2.5v3h3M7 9h4M7 11.3h4' })),
      search: React.createElement(React.Fragment, null,
        React.createElement('circle', { cx: '7.2', cy: '7.2', r: '4.2' }),
        React.createElement('path', { d: 'm10.4 10.4 3.1 3.1M5.5 7.2h3.4' })),
      info: React.createElement(React.Fragment, null,
        React.createElement('path', { d: 'M3 3.2h10v9.6H3z' }),
        React.createElement('path', { d: 'M5.2 5.4h5.6M5.2 7.7h5.6M5.2 10h3.6' })),
      workflow: React.createElement(React.Fragment, null,
        React.createElement('rect', { x: '2.4', y: '2.4', width: '4', height: '3.2', rx: '0.8' }),
        React.createElement('rect', { x: '9.6', y: '4.4', width: '4', height: '3.2', rx: '0.8' }),
        React.createElement('rect', { x: '5.8', y: '9.6', width: '4.4', height: '3.2', rx: '0.8' }),
        React.createElement('path', { d: 'M6.4 4h1.2v7.2h0M8 10.8h1.6V6h0' })),
    };

    const CardIcon = ({ name }) => React.createElement('svg', {
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.25,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
    }, iconPaths[name] || iconPaths.document);

    const Star = ({ size = 14 }) => React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      'aria-hidden': 'true',
    }, React.createElement('path', { d: 'm12 2.4 2.83 5.74 6.34.92-4.59 4.47 1.09 6.31L12 16.86l-5.67 2.98 1.09-6.31L2.83 9.06l6.34-.92Z' }));

    const useSkinEnabled = () => {
      const [value, setValue] = useState(isEnabled());
      useEffect(() => {
        const onChange = (event) => setValue(!!event.detail?.enabled);
        window.addEventListener(CHANGE_EVENT, onChange);
        return () => window.removeEventListener(CHANGE_EVENT, onChange);
      }, []);
      return value;
    };

    const useIsHero = () => {
      const [hero, setHero] = useState(() => !!document.querySelector('[class*="an3WzG_root"][data-phase="hero"]'));
      useEffect(() => {
        const read = () => setHero(!!document.querySelector('[class*="an3WzG_root"][data-phase="hero"]'));
        const observer = new MutationObserver(read);
        observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-phase'] });
        read();
        return () => observer.disconnect();
      }, []);
      return hero;
    };

    const Workbench = () => {
      const on = useSkinEnabled();
      const hero = useIsHero();
      const [toast, setToast] = useState('');
      const timerRef = useRef(0);

      useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

      if (!on || !hero) return null;

      const cards = CARDS.map((card, index) => {
        const copy = {
          title: t(`workbench.cards.${index}.title`, ''),
          desc: t(`workbench.cards.${index}.desc`, ''),
        };
        return React.createElement('button', {
          key: card.key,
          type: 'button',
          className: 'prc-card',
          onClick: () => {
            const ok = fillComposer(card.prompt);
            if (!ok) {
              try { navigator.clipboard?.writeText(card.prompt); } catch (_) { /* ignore */ }
            }
            setToast(ok ? t('workbench.filled', '已填入输入框') : t('workbench.copied', '提示词已复制'));
            if (timerRef.current) window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => setToast(''), 2200);
          },
        },
        React.createElement('span', { className: 'prc-card-icon' }, React.createElement(CardIcon, { name: card.icon })),
        React.createElement('span', { className: 'prc-card-body' },
          React.createElement('span', { className: 'prc-card-title' }, copy.title),
          React.createElement('span', { className: 'prc-card-desc' }, copy.desc)));
      });

      return React.createElement('section', { className: 'prc-workbench', 'aria-label': t('workbench.name', 'DSH 政务工作台') },
          React.createElement('div', { className: 'prc-topbar' },
            React.createElement('div', { className: 'prc-topbar-brand' },
              React.createElement('span', { className: 'prc-emblem' }, React.createElement(Star, { size: 15 })),
              React.createElement('span', { className: 'prc-topbar-copy' },
                React.createElement('span', { className: 'prc-topbar-title' }, t('workbench.name', 'DSH 政务工作台')),
                React.createElement('span', { className: 'prc-topbar-sub' }, t('workbench.slogan', '人民至上 · 数智协同')))),
            React.createElement('span', { className: 'prc-topbar-note' }, '服务为民 · 实干笃行')),
          React.createElement('div', { className: 'prc-banner' },
            React.createElement('img', { src: `${ASSET}/banner.svg`, alt: '', draggable: false, onError: (event) => { event.currentTarget.style.display = 'none'; } }),
            React.createElement('div', { className: 'prc-copy' },
              React.createElement('h2', null, t('workbench.title', '人民的AI，智慧办公')),
              React.createElement('p', null, t('workbench.subtitle', '人民至上 · 服务为本 · 数智赋能 · 协同高效'))),
            React.createElement('div', { className: 'prc-seal' }, t('workbench.seal', '服务为民 实干笃行')),
            toast ? React.createElement('div', { className: 'prc-toast', role: 'status' }, toast) : null),
          React.createElement('div', { className: 'prc-actions' }, cards),
          React.createElement('div', { className: 'prc-prompt' },
            React.createElement('div', { className: 'prc-prompt-title' }, t('workbench.promptTitle', '我们要构建什么？')),
            React.createElement('div', { className: 'prc-prompt-sub' }, t('workbench.promptSub', '以人工智能助力政务工作'))));
    };

    const SettingsRow = () => {
      const on = useSkinEnabled();
      return React.createElement('div', { className: 'prc-settings-row' },
        React.createElement('div', { className: 'prc-settings-copy' },
          React.createElement('div', { className: 'prc-settings-title' }, t('settings.title', '人民政务皮肤')),
          React.createElement('div', { className: 'prc-settings-desc' }, t('settings.desc', '深红侧栏、米白工作区与政务工作台；随时关闭即可恢复原生外观。'))),
        React.createElement('div', { className: 'prc-settings-actions' },
          React.createElement('a', {
            className: 'prc-download',
            href: `${ASSET}/prc-people.dsh-theme.json`,
            download: 'prc-people.dsh-theme.json',
          }, t('settings.download', '下载 Dream Skin 主题包')),
          React.createElement('button', {
            type: 'button',
            className: 'prc-switch',
            role: 'switch',
            'aria-checked': on ? 'true' : 'false',
            'aria-label': t('settings.title', '人民政务皮肤'),
            onClick: () => applyEnabled(!on),
          })));
    };

    const apply = (ctx) => {
      if (installed) return;
      installed = true;
      ctxRef = ctx;

      styleEl = document.createElement('style');
      styleEl.id = 'dsh-prc-people-skin-style';
      styleEl.textContent = CSS;
      document.head.append(styleEl);
      document.documentElement.setAttribute(ATTR, enabled ? 'on' : 'off');
      patchPlaceholders();

      placeholderObserver = new MutationObserver(patchPlaceholders);
      placeholderObserver.observe(document.body, { subtree: true, childList: true, characterData: true });

      syncTokens();

      ctx.effect(() => ctx.locale.register(NS, { zh: ZH, en: EN }));
      ctx.effect(() => ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
        name: 'conversation.input.dock',
        id: 'prc-people-workbench',
        order: 5,
        locale: NS,
      }, Workbench)));
      ctx.effect(() => ctx.slots.inject('settings.general.item', () => ctx.slots.register({
        name: 'settings.general.item',
        id: 'prc-people-skin',
        order: 90,
        locale: NS,
      }, SettingsRow)));

      ctx.effect(() => () => {
        installed = false;
        ctxRef = null;
        if (tokenDispose) {
          try { tokenDispose(); } catch (_) { /* ignore */ }
          tokenDispose = null;
        }
        placeholderObserver?.disconnect();
        placeholderObserver = null;
        styleEl?.remove();
        styleEl = null;
        document.documentElement.removeAttribute(ATTR);
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { enabled: false } }));
      });
    };

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
