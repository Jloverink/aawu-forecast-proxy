<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AKS Panhandle Weather Brief</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#0e141b; --panel:#161f2a; --panel2:#1c2836; --line:#263649; --ink:#e9f0f6; --mut:#92a7ba;
  --amber:#f2a93b; --vfr:#46c17a; --mvfr:#4da3e8; --ifr:#e2574b; --lifr:#c964dd; --na:#5b6c7d;
  --mono:'IBM Plex Mono',monospace; --disp:'Barlow Condensed',sans-serif; --body:'Barlow',sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.45;padding:18px 20px 60px}
h1{font-family:var(--disp);font-weight:700;font-size:30px;letter-spacing:.5px;text-transform:uppercase}
h1 .beacon{display:inline-block;width:12px;height:12px;border-radius:50%;background:var(--amber);margin-right:10px;box-shadow:0 0 12px var(--amber);animation:pulse 3s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion: reduce){h1 .beacon{animation:none}}
.sub{color:var(--mut);font-size:13px;margin-top:2px}
.topbar{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:space-between;margin-bottom:16px}
.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
button,select,input{font-family:var(--body);font-size:14px;background:var(--panel2);color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:7px 12px;cursor:pointer}
button:hover{border-color:var(--amber)}
button.primary{background:var(--amber);color:#20180a;font-weight:600;border-color:var(--amber)}
button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid var(--amber);outline-offset:1px}
.tabs{display:flex;gap:6px;margin-bottom:16px;border-bottom:1px solid var(--line)}
.tab{background:none;border:none;border-bottom:3px solid transparent;border-radius:0;color:var(--mut);font-family:var(--disp);font-size:18px;text-transform:uppercase;letter-spacing:.8px;padding:8px 14px}
.tab.active{color:var(--ink);border-bottom-color:var(--amber)}
.status{font-family:var(--mono);font-size:12px;color:var(--mut);margin:8px 0 14px;min-height:16px}
.status.err{color:var(--ifr)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}
.quad{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.quad h2{font-family:var(--disp);font-size:20px;font-weight:600;text-transform:uppercase;letter-spacing:1px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.quad h2 .worst{font-size:13px;font-family:var(--body);font-weight:600;padding:2px 10px;border-radius:20px;color:#0c1116}
.bignums{display:flex;gap:20px;margin-bottom:10px}
.bignum .v{font-family:var(--disp);font-weight:700;font-size:34px;line-height:1}
.bignum .l{font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.8px}
.stn{display:flex;align-items:baseline;gap:8px;padding:5px 0;border-top:1px solid var(--line);font-size:14px;flex-wrap:wrap}
.stn .dot{width:9px;height:9px;border-radius:50%;flex:none;align-self:center}
.stn .id{font-family:var(--mono);font-size:12.5px;width:44px;color:var(--mut)}
.stn .nm{font-weight:600;width:82px}
.stn .d{color:var(--mut);font-size:13px}
.stn .flag{color:var(--amber);font-size:12px;font-weight:600}
.stn .obt{font-family:var(--mono);font-size:10.5px;color:var(--mut);margin-left:auto}
.cat-VFR{background:var(--vfr)} .cat-MVFR{background:var(--mvfr)} .cat-IFR{background:var(--ifr)} .cat-LIFR{background:var(--lifr)} .cat-NA{background:var(--na)}
.section{margin-top:22px}
.section>h2{font-family:var(--disp);font-size:21px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;color:var(--amber)}
.tape{background:#0a0f14;border:1px solid var(--line);border-left:4px solid var(--amber);border-radius:8px;padding:14px 16px}
.tape textarea{width:100%;min-height:150px;background:none;border:none;color:var(--ink);font-family:var(--body);font-size:15.5px;line-height:1.55;resize:vertical}
.tape .actions{display:flex;gap:8px;margin-top:8px}
.hazrow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.chip{border-radius:999px;background:rgba(242,169,59,.05);background:var(--panel2);border:1px solid var(--line);border-radius:20px;padding:5px 13px;font-size:13px}
.chip b{color:var(--amber)}
details.raw{margin-top:8px}
details.raw summary{cursor:pointer;color:var(--mut);font-size:13px}
.mono, pre{font-family:var(--mono);font-size:12.5px;color:var(--mut);white-space:pre-wrap;word-break:break-word}
table{border-collapse:collapse;width:100%;font-size:13.5px}
th,td{text-align:left;padding:7px 10px;border-bottom:1px solid var(--line)}
th{font-family:var(--disp);text-transform:uppercase;letter-spacing:.8px;font-size:13px;color:var(--mut);font-weight:600}
td.mono{color:var(--ink)}
.detailcard{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 15px;margin-bottom:10px}
.detailcard h3{font-family:var(--disp);font-size:18px;font-weight:600;letter-spacing:.5px;display:flex;align-items:center;gap:8px}
.detailcard h3 .dot{width:10px;height:10px;border-radius:50%}
.detailcard .row{color:var(--mut);font-size:13.5px;margin-top:3px}
.detailcard .row b{color:var(--ink);font-weight:600}
.hidden{display:none}
.note{color:var(--mut);font-size:13px;margin-top:6px}
.fratctl{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
label{color:var(--mut);font-size:13px}
/* tooltips */
#tip{position:fixed;z-index:99;width:max-content;max-width:min(880px,94vw);max-height:88vh;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;background:#0a0f14;border:1px solid var(--amber);border-radius:8px;padding:8px 10px;font-family:var(--mono);font-size:11px;line-height:1.35;color:var(--ink);white-space:normal;word-break:break-word;pointer-events:auto;display:none;box-shadow:0 6px 24px rgba(0,0,0,.5)}
[data-tip]{cursor:pointer}
.stn[data-panel],[data-panel]{cursor:pointer}
.trend{font-size:11px;margin-left:2px}
.trend.up{color:var(--vfr)} .trend.dn{color:var(--ifr)}
/* external stations strip */
.extgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-bottom:14px}
.ext{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.ext h3{font-family:var(--disp);font-size:16px;font-weight:600;letter-spacing:.5px;display:flex;justify-content:space-between;align-items:center;gap:6px}
.ext .wind{font-family:var(--disp);font-weight:700;font-size:26px;line-height:1.1}
.ext .meta{color:var(--mut);font-size:11.5px;margin-top:2px}
.pill{font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;color:#0c1116}
.pill.ok{background:var(--vfr)} .pill.caution{background:var(--amber)} .pill.over{background:var(--ifr)} .pill.na{background:var(--na)}
.pill.appr{background:var(--mvfr)}
/* limits modal */
#modalBg{position:fixed;inset:0;background:rgba(4,8,12,.72);z-index:50;display:none}
#modal{position:fixed;z-index:51;top:4vh;left:50%;transform:translateX(-50%);width:min(860px,94vw);max-height:90vh;overflow-y:auto;background:var(--panel);border:1px solid var(--amber);border-radius:12px;padding:18px 20px;display:none}
#modal h2{font-family:var(--disp);font-size:24px;font-weight:700;letter-spacing:.5px;display:flex;justify-content:space-between;align-items:center}
#modal h3{font-family:var(--disp);font-size:17px;font-weight:600;letter-spacing:.6px;color:var(--amber);text-transform:uppercase;margin:14px 0 6px}
#modal .close{background:none;border:1px solid var(--line);border-radius:6px;color:var(--mut);font-size:14px;padding:4px 12px}
#modal table{margin-top:4px}
#modal .phones{color:var(--mut);font-size:12.5px;font-family:var(--mono)}
.banner{background:var(--ifr);color:#0c1116;font-weight:700;border-radius:8px;padding:8px 12px;margin:10px 0}
@keyframes rosespin{to{transform:rotate(360deg)}}
.bezel{transform-origin:center;transform-box:fill-box;animation:rosespin 90s linear infinite}
@media (prefers-reduced-motion: reduce){.bezel{animation:none}}
#alerts{margin:0 0 12px}
.alertrow{font-family:var(--mono);font-size:12px;padding:2px 8px;border-left:3px solid var(--line);margin:2px 0;color:var(--mut)}
.alertrow.worse{border-left-color:var(--ifr);color:var(--ink)}
.alertrow.better{border-left-color:var(--vfr)}
.alertrow .tm{color:var(--amber)}
.spark{margin-top:6px;display:block;max-width:100%;height:auto}
.sparkwx{max-width:100%;height:auto}
body.kiosk .topbar, body.kiosk .tabs, body.kiosk #status, body.kiosk #alerts,
body.kiosk #warnbox, body.kiosk #suntrack, body.kiosk .section h2 button,
body.kiosk .section:not(#stationsSection), body.kiosk .extgrid, body.kiosk .hazrow,
body.kiosk .grid#board, body.kiosk #enroute, body.kiosk .section > .note,
body.kiosk #kioskExit { display: none !important; }
body.kiosk #kioskExit.show { display: block !important; }
body.kiosk { background: #060a0e; }
body.kiosk #stationsSection { margin: 0 !important; }
body.kiosk #stationsSection h2 { display:none !important; }
/* Detailed-rows view in TV mode. This used to blow up the fonts with vw units while
   .ml kept its hardcoded pixel grid columns (50/88/42/108), so at TV font sizes the
   badge overflowed its 50px cell, the airport name overran the ICAO cell, the ICAO ran
   under the source tag, and the tag wrapped to three lines. Fonts and columns have to
   scale together, which is exactly what zoom does and vw cannot. Same mechanism as the
   cards view, driven by fitKiosk(). No transform on the SVGs either: a transform grows
   the drawing without growing its layout box, which is what put the runway strip on top
   of the HW/XW readout. */
body.kiosk #master { zoom: var(--kz, 1); }
body.kiosk .mrow { padding: 7px 14px; }
body.kiosk .mrow.open { padding: 9px 14px; }
#kioskExit { position:fixed; top:10px; right:10px; z-index:999; font-size:12px; padding:6px 14px; opacity:0.35; }
#kioskExit:hover { opacity:1; }
body.kiosk .afdhead { padding-right: 150px; }
/* compact cards: own container, own layout system entirely separate from .ml/.mrow,
   so the phone-width breakpoint that governs .ml can never touch this. Forced flex-wrap
   guarantees content reflows to 2-3 lines instead of expanding, at any width. */
.cardsgrid { display:flex; flex-direction:column; gap:4px; }
.ccard { border-radius:6px; padding:6px 12px; border-left:4px solid var(--line); border-top:1px solid var(--line); border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
.cchead { display:flex !important; flex-wrap:wrap !important; align-items:flex-start; gap:3px 14px; }
.ccbadgewrap { flex:none; padding-top:1px; }
.ccidwrap { flex:none; display:flex; flex-direction:column; line-height:1.28; min-width:118px; }
.ccname { font-family:var(--disp); font-weight:800; font-size:16px; color:var(--ink); white-space:nowrap; }
.ccicao { color:var(--mut); font-size:11px; }
.ccsrc { font-size:10.5px; white-space:nowrap; }
.ccline.ccdata { display:flex !important; flex-wrap:wrap !important; align-items:center; gap:3px 10px; flex:1 1 320px; min-width:0; padding-top:1px; }
.ccard .mdata { display:contents !important; }
.ccard .panelbtn, .ccard .expicon { display:none !important; }
/* TV mode cards: no vw sizing anywhere. Every element renders at its normal desktop
   px size and the whole stack is magnified with CSS zoom, computed by fitKiosk() so
   all stations land inside the screen height. zoom scales layout boxes along with
   text, so hardcoded px fonts and fixed-size SVGs grow in step instead of colliding,
   which is what vw sizing could never do. */
body.kiosk .cardsgrid { zoom: var(--kz, 1); gap: 5px; }
body.kiosk .ccard { padding: 5px 11px; }
body.kiosk .cchead { align-items: center; gap: 2px 12px; }
body.kiosk .ccidwrap { flex-direction: row; align-items: baseline; gap: 8px; min-width: 0; }
/* Portrait and landscape want opposite things. On a portrait screen the data is the
   part that runs out of room, so give it the full card width on its own line; letting
   it share the header line only makes it wrap more. On a landscape screen there is
   width to spare and sharing the line is the shorter card. Measured both ways. */
@media (orientation: portrait){
  body.kiosk .ccdata { flex-basis: 100% !important; }
}
.gridtbl { width:100%; border-collapse:collapse; font-family:var(--mono); font-size:13px; }
.gridtbl th { text-align:left; color:var(--mut); font-weight:600; padding:6px 10px; border-bottom:1px solid var(--line); text-transform:uppercase; font-size:10.5px; letter-spacing:.03em; }
.gridtbl td { padding:7px 10px; border-bottom:1px solid rgba(255,255,255,.06); white-space:nowrap; }
.gridtbl tr:hover td { background:rgba(255,255,255,.03); }
.gname { font-family:var(--disp); font-weight:700; color:var(--ink); }
.gicao { font-family:var(--mono); font-weight:400; color:var(--mut); font-size:11px; margin-left:7px; }
body.kiosk .gridtbl { font-size: 1.5vw; }
body.kiosk .gridtbl th { font-size: 1vw; padding: 10px 14px; }
body.kiosk .gridtbl td { padding: 12px 14px; }
@media (orientation: portrait){ body.kiosk .gridtbl { font-size: 2.3vw; } body.kiosk .gridtbl th { font-size: 1.6vw; } }
@media (max-width: 860px){ .gridtbl { font-size:11.5px; } .gridtbl th, .gridtbl td { padding:5px 6px; } }
@media (max-width: 860px){
  /* rows become flowing text: everything starts left and wraps across the full width */
  body:not(.panmode):not(.tri) .ml{display:block !important;line-height:1.85;padding:2px 0}
  body:not(.panmode):not(.tri) .ml > span:empty{display:none !important}
  body:not(.panmode):not(.tri) .mdata{display:contents !important}
  body:not(.panmode):not(.tri) .catbadge{display:inline-block;width:auto;padding:2px 9px;font-size:11.5px;margin-right:6px;vertical-align:middle}
  body:not(.panmode):not(.tri) .mname{display:inline;font-size:15.5px;margin-right:6px}
  body:not(.panmode):not(.tri) .mid{display:inline;margin-right:6px}
  body:not(.panmode):not(.tri) .mtag{display:inline;min-width:0;margin-right:7px}
  body:not(.panmode):not(.tri) .mdata > *{margin-right:9px}
  body:not(.panmode):not(.tri) .mrow{padding:8px 11px}
  body:not(.panmode):not(.tri) .panelbtn{margin-left:0}
  body:not(.panmode):not(.tri) .expicon{margin-left:4px}
  body:not(.panmode):not(.tri) .spark, body:not(.panmode):not(.tri) .sparkwx{display:block;max-width:100%;height:auto}
  body:not(.panmode):not(.tri) .wxbox{display:block;width:100%;box-sizing:border-box;margin-top:8px}
  body:not(.panmode):not(.tri) .wxrow{display:block}
  body:not(.panmode):not(.tri) .heatgrid{grid-template-columns:70px repeat(48,1fr)}
  body:not(.panmode):not(.tri) .hlbl{font-size:11px}
}
.wxrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;align-items:flex-start;width:100%}
.wxcol{display:flex;flex-direction:column;gap:10px;min-width:0}
.wxwrap{display:block;width:100%}
.rwybox{display:block;width:100%;box-sizing:border-box;margin-top:6px}
.rwygrid{display:flex;flex-wrap:wrap;gap:5px 22px;align-items:center}
.rwyent{display:flex;align-items:center;gap:7px;font-family:var(--mono);font-size:11px}
.rwyent .rwystrip{flex:none;min-width:0}
/* 34px on a desktop screen, where the row line is read at 1:1 and the centreline and arrow
   need the pixels. TV mode magnifies the whole stack, so there the icon starts smaller and
   the zoom makes it large again: a big base would only cost rows on screen. */
.rwyline{width:96px;height:22px}
.rwybig{width:136px;height:31px}
.rwycomp{white-space:nowrap}
.srcwin{background:rgba(226,87,75,.14);border-left:3px solid var(--ifr);padding:2px 6px;margin:1px 0;display:block;border-radius:3px}
.srcdim{display:block;padding:2px 6px;margin:1px 0}
.snip{background:var(--ifr);color:#0c1116;font-weight:700;padding:0 3px;border-radius:3px}
.amhd{color:var(--ifr);font-weight:800}
.drv{color:var(--ifr);font-weight:700}
.chgchip{display:inline-block;font-family:var(--mono);font-size:9.5px;font-weight:700;border:1px solid;border-radius:4px;padding:0 5px;cursor:help;white-space:nowrap;vertical-align:middle}
.chgchip.chgbad{border-color:var(--ifr);color:var(--ifr);background:rgba(226,87,75,.12)}
.chgchip.chggood{border-color:var(--vfr);color:var(--vfr);background:rgba(63,214,168,.10)}
.chgchip.chgneu{border-color:var(--line);color:var(--mut)}
#camWrap{columns:430px 4;column-gap:18px}
.camgrp{break-inside:avoid;font-family:var(--mono);font-size:10px;letter-spacing:.5px;text-transform:uppercase;
  color:var(--amber);border-bottom:1px solid var(--line);padding:2px 8px;margin:4px 0 2px}
.camrow, .camdet{break-inside:avoid}
/* Area forecast zones as a compact card grid. Full-width stacked cards wasted most of the
   line and pushed the rest of the board down; three or four across fits the whole region in
   one screenful. */
#fasec{display:grid;grid-template-columns:repeat(auto-fill,minmax(370px,1fr));gap:10px;align-items:start}
#fasec > .note{grid-column:1/-1;margin:0 0 2px}
#fasec .detailcard{margin-bottom:0;padding:9px 12px 10px;border-radius:9px;
  background:linear-gradient(180deg,#141d27,#101821);border-color:#25384c}
#fasec .detailcard h3{font-size:14.5px;letter-spacing:.4px;margin:0 0 5px;padding-bottom:4px;
  border-bottom:1px solid var(--line);flex-wrap:wrap;gap:6px}
#fasec .detailcard h3 span{font-size:10.5px !important}
#fasec .detailcard .row{font-size:11.5px;margin-top:2px;line-height:1.45}
#fasec .mono{font-size:11px;line-height:1.5}
#fasec .airmetrow{color:var(--amber);font-weight:700;font-size:11px;line-height:1.45;
  background:rgba(242,169,59,.09);border-left:2px solid var(--amber);border-radius:0 4px 4px 0;
  padding:2px 6px;margin:2px 0}
#fasec .zscope{color:#7ec8f0;font-size:9.5px;font-family:var(--mono);white-space:nowrap}
body.kiosk #fasec{grid-template-columns:repeat(auto-fill,minmax(520px,1fr))}
@media (max-width: 860px){ #fasec{grid-template-columns:1fr} }
/* Chips earn their place but they were eating the width and pushing rows onto a second
   line, which costs more than the chips gain: fewer stations on screen and a ragged scan. */
body.compactrows .ml.m1 .cutchip{font-size:8.5px;padding:0 4px;letter-spacing:.2px}
body.compactrows .ml.m1 .panelbtn{font-size:9px;padding:1px 6px}
/* Roomy is the default: chips at a readable size and the row free to run to two or three
   lines. On the TV fitKiosk simply scales the whole board down to fit, so the trade is
   legibility of each row against size of the text, and that is the operator's call. */
body:not(.compactrows) .ml.m1 .mdata{row-gap:3px}
body:not(.compactrows) .ml.m1 .cutchip{font-size:9.5px;padding:1px 6px}
/* Stacked mode groups the chips onto their own lines. The break is inert everywhere else,
   so the single-line modes are unaffected. */
/* ---- Three-line row ----
   Fixed lines rather than one flow that wraps wherever it runs out of room: identity and
   how current each feed is, then the weather, then everything that qualifies or restricts
   it. Same shape on every station, so the eye lands in the same place each time. */
#master .ml.m1{display:grid !important;grid-template-columns:auto auto auto 1fr;
  align-items:center;column-gap:9px;row-gap:2px;padding:3px 0}
#master .ml.m1 > .catbadge{grid-row:1;grid-column:1;width:52px;text-align:center;justify-self:start}
#master .ml.m1 > .mname{grid-row:1;grid-column:2;font-size:14.5px;white-space:nowrap}
#master .ml.m1 > .mid{grid-row:1;grid-column:3;color:var(--mut);font-size:11px;white-space:nowrap}
#master .ml.m1 > .mtag{display:none !important}
#master .ml.m1 > .mdata{display:contents !important}
#master .ml.m1 .rl1{grid-row:1;grid-column:4}
#master .ml.m1 .rl2{grid-row:2 !important;grid-column:1 / -1 !important}
#master .ml.m1 .rl3{grid-row:3 !important;grid-column:1 / -1 !important}
#master .ml.m1 .rl{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 10px;min-width:0}
#master .ml.m1 .rl1{font-size:11px}
#master .ml.m1 .rl1 .panelbtn{margin-left:auto}
#master .ml.m1 .rl3{color:var(--mut)}
#master .ml.m1 .rl:empty{display:none}
/* The forecast is weather, so it is sized like the weather rather than like a footnote. */
#master .ml.m1 .tafsrc{font-size:13px;cursor:help}
#master .ml.m1 .tafsrc .cutchip{font-size:12.5px;padding:1px 7px}
#master .ml.m1 .altsrc{font-size:13px}
/* Camera links should look like links. */
#master .ml.m1 .camshort{font-size:11px;border:1px solid #3a5570;border-radius:4px;padding:1px 6px;
  color:#9fc3dd;text-decoration:none;background:rgba(90,169,230,.08)}
#master .ml.m1 .camshort::before{content:'\1f4f7 ';font-size:9px;opacity:.8}
#master .ml.m1 .camshort:hover{border-color:var(--amber);color:var(--amber);background:rgba(242,169,59,.12)}
#master .ml.m1 .rl2, #master .ml.m1 .rl3{align-items:baseline}
#master .ml.m1 .feed > b{min-width:52px;display:inline-block}
#master .ml.m1 .feed{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:2px 7px;
  padding-right:14px;margin-right:2px;border-right:1px solid #1d2a37}
#master .ml.m1 .feed:last-child{border-right:0;padding-right:0}
#master .ml.m1 .presgrp{color:var(--mut);margin-right:6px}
#master .ml.m1 .routegrp{display:flex;flex-wrap:wrap;gap:2px 7px;align-items:baseline;margin-left:14px}
#master .ml.m1 .camshort{font-size:10px;border:1px solid var(--line);border-radius:3px;padding:0 4px;color:#8fa8bd}
#master .ml.m1 .camshort:hover{border-color:var(--amber);color:var(--amber)}
#master .ml.m1 .altsrc{color:var(--amber)}
.srcline{display:inline-flex;gap:6px;align-items:baseline;flex-wrap:wrap}
@media (max-width: 900px){ #master .ml.m1{grid-template-columns:50px 1fr} 
  #master .ml.m1 > .mdata{grid-column:1 / -1} }
.chipbreak{display:none}
body.tri .chipbreak{display:block;flex-basis:100%;height:0;margin:0}
/* Station names on the chips were dim and small enough that you had to lean in to tell
   Pt Retreat from Point Higgins. */
#master .ml.m1 .cutchip{font-size:10.5px;letter-spacing:.2px}
#master .ml.m1 .camshort{font-size:11.5px;color:#c3dcef;font-weight:600}
#master .ml.m1 > .mname{font-size:15.5px;font-weight:700;color:#f2f7fb}
#master .ml.m1 > .mid{font-size:12px;color:#8fa8bd;font-weight:600}
/* The wall display reads the same way as the desk: observation on one line, forecast and
   restrictions underneath, rather than one long run of text. */
.ccstack{display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%}
.ccstack .rl{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 9px;min-width:0}
.ccstack .feed{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:2px 6px;
  padding-right:10px;border-right:1px solid #1d2a37}
.ccstack .feed:last-child{border-right:0;padding-right:0}
#master .ml.m1 .lampsrc{font-size:13px;cursor:help}
/* A change that has just landed pulses for fifteen seconds so it is caught from across the
   room, then stops. Anything that flashes forever stops being noticed. Reduced-motion is
   honoured with a steady outline instead of a pulse. */
@keyframes chgpulse{
  0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0);filter:none}
  50%{box-shadow:0 0 0 3px currentColor;filter:brightness(1.35)}
}
.chgchip.chgflash{animation:chgpulse 1s ease-in-out 0s 60;will-change:box-shadow}
@media (prefers-reduced-motion: reduce){
  .chgchip.chgflash{animation:none;outline:2px solid currentColor;outline-offset:1px}
}
.cutchip.tafnone{border-color:#33475c;color:#5d7186;cursor:help}
.cutchip.tafnow{border-color:#6f8fae;color:#a9c6de;background:rgba(111,143,174,.12);cursor:help}
.cutchip.tafnowtempo{border-color:var(--amber);color:var(--amber);background:rgba(242,169,59,.12);font-weight:700;cursor:help}
.cutchip.tafupd{border-color:var(--mvfr);color:var(--mvfr);background:rgba(90,169,230,.12);font-weight:700;cursor:help}
.cutchip.wxsev{border-color:var(--ifr);color:var(--ifr);background:rgba(226,87,75,.12);font-weight:800;cursor:help}
.cutchip.wxmod{border-color:var(--amber);color:var(--amber);background:rgba(242,169,59,.10);font-weight:700;cursor:help}
.cutchip.wxlo{border-color:var(--line);color:var(--mut);cursor:help}
.cutchip.apchchip{border-color:var(--ifr);color:var(--ifr);font-weight:800;background:rgba(226,87,75,.10);cursor:help}
.cutchip.wipchip{border-color:var(--amber);color:var(--amber);font-weight:700;background:rgba(242,169,59,.10);cursor:help}
.cutchip.closurechip{border-color:var(--ifr);color:#0c1116;background:var(--ifr);font-weight:800;cursor:help}
.sectag{cursor:pointer;user-select:none;border-radius:3px;padding:0 3px 0 0}
.sectag:hover{color:var(--amber)}
.seccaret{display:inline-block;width:11px;color:var(--amber);font-size:10px;margin-right:3px;opacity:.75}
.sectag:hover{background:rgba(242,169,59,.12)}
.sectag:hover .seccaret{opacity:1}
.ml.secfold{opacity:.72}
.ml.secfold:hover{opacity:1}
.ntmpre{white-space:pre-wrap;font-family:var(--mono);font-size:11.5px;line-height:1.5}
.notamhead{color:var(--ifr);font-weight:800;font-family:var(--mono);font-size:11.5px;line-height:1.45;
  background:rgba(226,87,75,.14);border:1px solid var(--ifr);border-radius:5px;padding:4px 8px;margin:0 0 5px}
.notamline{display:flex;gap:7px;align-items:baseline;font-family:var(--mono);font-size:11.5px;line-height:1.45;
  padding:2px 4px;border-radius:4px;cursor:pointer;margin:1px 0}
.notamline:hover{background:rgba(255,255,255,.05)}
.notamtxt{min-width:0;flex:1}
.notambadge{flex:none;background:var(--ifr);color:#0c1116;font-weight:800;font-size:9px;border-radius:3px;padding:0 4px}
.alertgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:2px 10px}
.alertpick{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:12px;
  padding:2px 4px;border-radius:4px;cursor:pointer;text-transform:none;letter-spacing:0;color:var(--ink)}
.alertpick:hover{background:rgba(255,255,255,.05)}
.alertpick input{accent-color:var(--amber)}
.tfrgrp{font-family:var(--mono);font-size:9.5px;letter-spacing:.5px;text-transform:uppercase;
  color:var(--mut);border-bottom:1px solid var(--line);padding:2px 4px;margin:6px 0 3px}
.tfrline{font-family:var(--mono);font-size:12px;margin:2px 0;padding:2px 4px;border-radius:4px;cursor:pointer;
  display:flex;gap:7px;align-items:baseline;flex-wrap:wrap}
.tfrline:hover{background:rgba(226,87,75,.12)}
.tfrexp{margin-left:auto;color:#96707a;font-size:9.5px;white-space:nowrap}
.tfrdet{margin:2px 0 8px;padding:7px 10px;border-left:2px solid var(--ifr);background:rgba(0,0,0,.25);border-radius:0 6px 6px 0}
.tfrrow{display:flex;gap:10px;align-items:baseline;padding:1.5px 0;font-family:var(--mono);font-size:11.5px}
.tfrk{flex:none;width:104px;color:var(--mut);font-size:10px;text-transform:uppercase;letter-spacing:.4px}
.tfrv{color:var(--ink);min-width:0;flex:1}
/* Folded discussion in TV mode: keep a slim header so there is still a way back, but give
   the rest of the height to the board. */
body.kiosk.afdoff .nwsline{display:flex;gap:9px;align-items:baseline;flex-wrap:wrap;font-family:var(--mono);font-size:11.5px;
  padding:3px 7px;border-bottom:1px solid #18242f;border-radius:4px;cursor:pointer;margin:1px 0}
.nwsline:hover{background:rgba(255,255,255,.05)}
.nwsline.sev{background:rgba(226,87,75,.14);border-left:3px solid var(--ifr)}
.nwsline.mod{background:rgba(242,169,59,.10);border-left:3px solid var(--amber)}
.nwsline.lo{border-left:3px solid var(--line)}
.nwssev{flex:none;font-size:8.5px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;
  border-radius:3px;padding:1px 5px;border:1px solid currentColor}
.nwsline.sev .nwssev, .nwsline.sev .nwsev{color:var(--ifr)}
.nwsline.mod .nwssev, .nwsline.mod .nwsev{color:var(--amber)}
.nwsline.lo .nwssev{color:var(--mut)}
.nwsev{font-size:12.5px}
.nwsarea{color:var(--mut);min-width:0}
.nwsstn{border:1px solid var(--vfr);color:var(--vfr);border-radius:3px;font-size:9px;padding:0 4px}
.profsplit{display:flex;gap:26px;align-items:flex-start;flex-wrap:wrap}
.profsplit table{width:auto !important;flex:0 0 auto}
.jawsprofblk{margin-top:12px}
@media (max-width: 620px){ .profsplit{gap:14px} }
.jawsblk{margin-top:9px}
.jawsblkh{font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:.5px;text-transform:uppercase;
  color:var(--amber);font-size:12px;margin-bottom:3px}
.jawsblkh span{font-family:var(--mono);font-size:10px;color:var(--mut);font-weight:400;letter-spacing:0}
.jawstab{border-collapse:collapse;font-family:var(--mono);font-size:11.5px}
.jawstab th{text-align:left;color:var(--mut);font-weight:600;font-size:9.5px;text-transform:uppercase;
  letter-spacing:.4px;padding:2px 9px 2px 0;border-bottom:1px solid var(--line);white-space:nowrap}
.jawstab td{padding:2px 9px 2px 0;border-bottom:1px solid #18242f;white-space:nowrap}
.jawstab td.num{text-align:right;padding-right:14px}
.jawstab .sev{color:var(--ifr);font-weight:700}
.jawstab .mod{color:var(--amber);font-weight:600}
.jawstab.prof td:first-child{color:var(--mut)}
.jgust{border:1px solid var(--amber);color:var(--amber);border-radius:3px;font-size:8.5px;padding:0 3px;margin-left:4px;cursor:help}
@media (max-width: 900px){ .jawstab{font-size:11px} .jawstab td, .jawstab th{padding-right:7px} }
/* The wall is a glance board: a banner at the top is the wrong shape for it, so the station
   itself pulses instead and keeps doing so until the sensor comes back. On the desk the
   banner stays, because there you are close enough to read it. */
body.kiosk #sensorBanner{display:none !important}
@keyframes cardalarm{
  0%,100%{box-shadow:inset 0 0 0 0 rgba(226,87,75,0)}
  50%{box-shadow:inset 0 0 0 3px var(--ifr), 0 0 18px rgba(226,87,75,.55)}
}
@keyframes chipalarm{
  0%,100%{box-shadow:0 0 0 0 rgba(226,87,75,0);filter:none}
  50%{box-shadow:0 0 0 3px rgba(226,87,75,.8);filter:brightness(1.3)}
}
.ccard.cardalarm{animation:cardalarm 1.4s ease-in-out infinite;border-left-color:var(--ifr) !important}
.ccard.cardalarm .ccname::after{content:' \26a0 NO DATA';color:var(--ifr);font-weight:800;font-size:.72em;
  letter-spacing:.4px;margin-left:6px}
@media (prefers-reduced-motion: reduce){
  .ccard.cardalarm{animation:none;box-shadow:inset 0 0 0 3px var(--ifr)}
}
/* Match the desk: same divider treatment and the same relative sizes. */
.ccstack .rl2{font-size:1em}
.ccstack .rl3{font-size:.94em;color:var(--mut)}
.ccstack .feed > b{min-width:0;margin-right:2px}
/* The card body was a centred flex row, so each stacked line found its own horizontal
   position and the shorter ones, the float destinations especially, floated wherever there
   happened to be room. Left aligned and full width, so METAR and MADIS line up under each
   other exactly as they do on the desk. */
.ccard .ccline.ccdata{align-items:flex-start !important;justify-content:flex-start !important}
.ccard .ccstack{align-items:stretch !important;width:100%}
.ccard .ccstack .rl{justify-content:flex-start;width:100%}
.ccard .ccstack .feed{flex:0 1 auto}
.ccard .ccstack .feed > b{min-width:54px;display:inline-block;text-align:left}
/* Anything still out stays pulsing until the sensor comes back, on the desk as well as the
   wall, because a fault does not stop mattering after a fixed window the way a change does. */
/* Change chips appear on the wall too: they are the fastest way to see what just moved,
   and a glance board is exactly where that matters most. */
/* Header line on a card: station, identifier, source time, then what just changed. */
/* An older observation sitting beside a newer one needs to say so plainly. */
/* TV: three lines, each answering one question. Line one identity and what changed, line two
   the observation with MADIS behind it, line three the forecast. Pressure and density
   altitude are reference detail rather than a launch decision, so they stay on the desk. */
body.kiosk .presgrp{display:none !important}
body.kiosk .ccsrc{display:none !important}          /* the source time repeats on the MADIS block */
body.kiosk .srcline{display:none !important}
.ccstack .feed.madisfeed{border-left:1px solid #22303f;padding-left:10px;margin-left:2px}
.ccard .ccstack .rl2{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px}
.ccard .ccstack .rl3{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px}
/* Last-moved markers: quiet by default, coloured by direction. */
/* Forecast strip: one block per group, running left to right through the day. */
.tafstrip{display:inline-flex;flex-wrap:wrap;gap:3px 5px;align-items:baseline}
.tafgrp{display:inline-flex;align-items:baseline;gap:4px;white-space:nowrap;
  border:1px solid #223140;border-radius:4px;padding:0 6px;background:rgba(255,255,255,.015)}
.tafgrp .tg-tag{color:var(--mut);font-size:9.5px;letter-spacing:.4px;font-weight:700}
.tafgrp .tg-time{color:var(--mut);font-size:10px}
.tafgrp.tg-now{border-color:var(--mvfr);background:rgba(90,169,230,.10)}
.tafgrp.tg-now .tg-tag{color:var(--mvfr)}
.tafgrp.tg-tempo{border-color:var(--amber);background:rgba(242,169,59,.10)}
.tafgrp.tg-tempo .tg-tag{color:var(--amber)}
.ccard .tafgrp{font-size:.92em;padding:0 5px}
body.kiosk .tafgrp:nth-of-type(n+4){display:none}
body.kiosk.tvtaf2 .ccard .tafgrp:nth-of-type(n+3){display:none}
body.kiosk.tvtaf1 .ccard .tafgrp:nth-of-type(n+2){display:none}
body.kiosk /* NOTAM and restriction tags live on line one now, in the space past the cameras. */
.notamgrp{display:inline-flex;gap:4px;flex-wrap:wrap;align-items:baseline;margin-left:8px}
.lastmove b{font-weight:700}
/* Collapsed rows show what a launch decision needs; reference detail waits
   behind the row's "more" toggle. */
.mrow:not(.open) .presgrp{display:none !important}
.mrow:not(.open) .panelbtn{display:none !important}
.ccard .panelbtn{display:none !important}
.cutchip.nodata{opacity:.45;font-style:normal}
/* Hazard bar above the airports; chips open detail on click. */
#hazbar{margin:0 0 12px}
#hazbar .hazrow{display:flex;flex-wrap:wrap;gap:6px}
#hazbar .chip[data-tip]{cursor:pointer}
#hazbar .chip.sel{outline:2px solid var(--amber);outline-offset:1px}
#hazbar .chip.imp{position:relative}
#hazbar .chip.imp::after{content:'';position:absolute;top:-3px;right:-3px;width:8px;height:8px;border-radius:50%;
  background:var(--ifr);box-shadow:0 0 0 2px var(--bg)}
#hazdetail{display:none;margin-top:8px;border:1px solid #2a3a4a;border-radius:8px;background:rgba(0,0,0,.25);padding:8px 12px}
#hazdetail.show{display:block}
#hazdetail pre{margin:0;white-space:pre-wrap;font-family:var(--mono);font-size:12px;color:var(--ink);line-height:1.5}
/* NOTAM popover for one airport */
.notamgrp .cutchip{cursor:pointer}
#notampop{display:none;position:absolute;z-index:60;width:620px;max-width:calc(100vw - 16px);max-height:60vh;overflow:auto;
  background:#0f1821;border:1px solid var(--amber);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.5);padding:8px 12px}
#notampop.show{display:block}
#notampop .nphead{display:flex;justify-content:space-between;align-items:center;font-size:13px;margin-bottom:6px}
#notampop .npclose{cursor:pointer;color:var(--mut);padding:0 4px}
#notampop .npgrp{color:var(--amber);font-size:10.5px;letter-spacing:.5px;margin:8px 0 3px}
#notampop pre{margin:0 0 5px;white-space:pre-wrap;font-family:var(--mono);font-size:11.5px;color:var(--ink);
  border-left:2px solid #2a3a4a;padding-left:8px}
/* Forecast discussion as folded section chips */
.afdsec{border:1px solid #223140;border-radius:7px;margin:0 0 6px;background:rgba(255,255,255,.015)}
.afdsec > summary{cursor:pointer;list-style:none;padding:6px 10px;display:flex;gap:10px;align-items:baseline;overflow:hidden}
.afdsec > summary::-webkit-details-marker{display:none}
.afdsec > summary::before{content:'\25b8';color:var(--amber);font-size:11px}
.afdsec[open] > summary::before{content:'\25be'}
.afdsec > summary b{color:var(--amber);white-space:nowrap;font-size:13px}
.afdsec .afdprev{color:var(--mut);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.afdsec[open] .afdprev{display:none}
.afdsec .afdtxt{white-space:pre-wrap;padding:2px 12px 10px 28px;font-size:13px;line-height:1.55;color:var(--ink)}
.afdsec .afdkeys{padding:0 12px 4px 28px}
.afdsec.imp{position:relative;border-color:rgba(226,87,75,.55)}
.afdsec.imp::after{content:'';position:absolute;top:-3px;right:-3px;width:8px;height:8px;border-radius:50%;background:var(--ifr);box-shadow:0 0 0 2px var(--bg)}
/* FA zones up top, four across */
#fatop{display:grid;grid-template-columns:repeat(4, minmax(0,1fr));gap:10px;margin:0 0 12px}
#fatop .detailcard{margin:0}
@media (max-width:1100px){ #fatop{grid-template-columns:repeat(2, minmax(0,1fr))} }
@media (max-width:640px){ #fatop{grid-template-columns:1fr} }
body.kiosk #fatop{display:none}
/* Floating digital clock */
#clockbox{position:fixed;right:14px;bottom:14px;z-index:70;display:flex;gap:14px;padding:6px 12px;
  background:rgba(8,14,20,.85);border:1px solid rgba(242,169,59,.5);border-radius:9px;
  box-shadow:0 6px 18px rgba(0,0,0,.45);pointer-events:none;backdrop-filter:blur(4px)}
#clockbox .ck{display:flex;align-items:baseline;gap:4px}
#clockbox .ckt{font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:17px;font-weight:700;
  color:#ffd08a;letter-spacing:1px;text-shadow:0 0 8px rgba(242,169,59,.45)}
#clockbox .ckl{font-family:var(--mono);font-size:11px;color:var(--mut);font-weight:700}
body.kiosk{padding-top:66px}
body.kiosk #clockbox{top:8px;bottom:auto;right:auto;left:50%;transform:translateX(-50%);gap:34px;padding:4px 22px}
body.kiosk #clockbox .ckt{font-size:44px;letter-spacing:2px}
body.kiosk #clockbox .ckl{font-size:18px}
/* METAR and MADIS in shared columns, one above the other */
.obsgrid{display:grid;grid-template-columns:max-content max-content max-content max-content minmax(0,1fr);
  column-gap:16px;row-gap:3px;align-items:center;flex:1 1 100%;width:100%}
.obsgrid .orow{display:contents}
.obsgrid .oc{white-space:nowrap;min-width:0}
.obsgrid .oc-rest{display:flex;flex-wrap:wrap;gap:2px 10px;align-items:center;white-space:normal}
.obsgrid .omadis .oc{padding-top:1px}
.ccard .obsgrid .chgchip{display:none !important}
.afdissue{font-family:var(--mono);font-size:12.5px;margin:0 0 7px 2px}
.ugcdecode{color:#c9d7e4;font-size:12px;margin:2px 0 6px 14px;line-height:1.5}
.ugcdecode .zname{cursor:help;border-bottom:1px dotted #46596d}
.ugcdecode .zunk{color:var(--mut);font-style:italic}
.fstamp{font-size:1.1em;font-weight:400}
.tg .tgnowlbl{font-size:9.5px;font-weight:800;color:#a9c6de;letter-spacing:.5px}
.tg{white-space:nowrap}
.tg.tgnow{border:1px solid #6f8fae;background:rgba(111,143,174,.12);border-radius:5px;padding:1px 6px}
.lastmove{font-size:9.5px;padding:0 4px}
.lastmove{display:inline-flex;align-items:baseline;gap:4px;border:1px solid #223140;border-radius:4px;
  padding:0 5px;font-size:10.5px;margin-right:5px;cursor:help;white-space:nowrap;color:var(--mut)}
.lastmove.lm-bad{border-color:rgba(226,87,75,.5);color:#e8897f}
.lastmove.lm-good{border-color:rgba(63,214,168,.45);color:#7fd8bb}
.lastmove.lm-neu{border-color:#2a3a4a}
.lastmove.lm-none{opacity:.45;font-style:normal}
.ccard .lastmove{font-size:.8em}
.supersede{border:1px solid var(--mut);color:var(--mut);background:transparent;border-radius:4px;
  padding:0 5px;font-size:10px;font-weight:700;letter-spacing:.3px;cursor:help;white-space:nowrap}
.mrow .ml.m2 .supersede{opacity:.9}
.cutchip.apchother{border-color:#3a5570;color:#7f97ad;background:transparent;cursor:help;font-weight:600}
.ccroute{display:inline-flex;gap:5px;flex-wrap:wrap;align-items:baseline}
.ccard .ccroute .cutchip{font-size:.82em}
.ccidwrap{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;min-width:0}
.ccchg{display:inline-flex;gap:5px;flex-wrap:wrap;align-items:baseline}
/* The copy inside the weather block would otherwise say the same thing twice. */
.ccard .feed .chgchip{display:none !important}
.ccard .chgchip{font-size:.86em;padding:1px 6px;white-space:nowrap}
.ccard .chgchip.chgflash{animation:chgpulse 1s ease-in-out 0s 60}
.cutchip.sensorbad{animation:chipalarm 1.4s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){ .cutchip.sensorbad{animation:none} }
.sigbanner{border:2px solid var(--ifr);background:rgba(226,87,75,.20);border-radius:10px;
  padding:10px 14px;margin-bottom:12px;font-family:var(--mono);color:var(--ifr)}
.sigbanner > b{font-size:15px;letter-spacing:.4px}
.sigrow{margin-top:4px;font-size:12.5px;cursor:help;color:var(--amber)}
.sigraw{color:var(--mut);font-size:11px}
.signote{color:var(--mut);font-size:11px;margin-top:5px;line-height:1.5}
.sensorbanner{border:2px solid var(--ifr);background:rgba(226,87,75,.18);border-radius:10px;
  padding:10px 14px;margin-bottom:12px;font-family:var(--mono);color:var(--ifr)}
.sensorbanner b{font-size:15px;letter-spacing:.4px}
.sensorsites{color:var(--ink);font-size:13px;margin-top:4px;font-weight:700}
.sensornote{color:var(--mut);font-size:11px;margin-top:4px;line-height:1.5}
.cutchip.sensorbad{border-color:var(--ifr);color:#fff;background:var(--ifr);font-weight:800;cursor:help}
.jawsbanner{border-radius:10px;padding:9px 14px;margin-bottom:12px;font-family:var(--mono)}
.jawsbanner.mod{border:1px solid var(--amber);background:rgba(242,169,59,.12);color:var(--amber)}
.jawsbanner.sev{border:2px solid var(--ifr);background:rgba(226,87,75,.16);color:var(--ifr)}
.jawsbanner b{font-size:14px;letter-spacing:.3px}
.jawssites{color:var(--ink);font-size:12px;margin-top:3px}
.jawsnote{color:var(--mut);font-size:10.5px;margin-top:3px;line-height:1.5}
#jawsWrap{display:block}
/* Sector alerts read as a list; the three data tables sit side by side underneath rather
   than competing with them for the same grid tracks. */
.jawssecs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2px 16px}
.jawstabs{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,max-content));
  gap:6px 26px;align-items:start;margin-top:10px}
.jawstabs .jawsblk{margin-top:0}
.jawsrow{display:flex;gap:9px;align-items:baseline;font-family:var(--mono);font-size:11.5px;
  padding:2px 7px;border-bottom:1px solid #18242f;border-radius:4px}
.jawskey{flex:none;min-width:82px;font-weight:700}
.jawslvl{flex:none;min-width:74px;font-weight:800}
.jawslbl{color:var(--mut);min-width:0}
.jawsrow.none .jawslvl{color:var(--vfr)}
.jawsrow.lgt .jawslvl{color:var(--mvfr)}
.jawsrow.mod{background:rgba(242,169,59,.10)}
.jawsrow.mod .jawslvl{color:var(--amber)}
.jawsrow.sev{background:rgba(226,87,75,.16)}
.jawsrow.sev .jawslvl{color:var(--ifr)}
.jawsdt{border:1px solid var(--amber);color:var(--amber);border-radius:3px;font-size:8.5px;
  padding:0 3px;margin-left:5px;vertical-align:middle;cursor:help}
@media (max-width: 900px){ .jawssecs, .jawstabs{grid-template-columns:1fr} }
.afdbox{padding:3px 10px;margin-bottom:6px}
body.kiosk.afdoff .afdhead{font-size:12px;margin-bottom:0}
body.kiosk.afdoff .afdsub{display:none}
.afdbox{border:1px solid var(--amber);border-radius:10px;background:linear-gradient(180deg,#141d27,#101821);
  padding:10px 14px 11px;margin-bottom:14px}
.afdhead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;
  font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:.6px;text-transform:uppercase;
  color:var(--amber);font-size:15px;margin-bottom:6px}
.afdsub{font-family:var(--mono);font-size:10.5px;font-weight:400;letter-spacing:0;text-transform:none;color:var(--mut);margin-left:8px}
.afdbody{font-size:13px;line-height:1.62;color:var(--ink);max-width:118ch}
.afdbody .avi{border-left:3px solid var(--amber);padding:2px 0 2px 10px;margin:2px 0 7px}
.afdbody .avi b{color:var(--amber)}
.afdbody .km{margin:3px 0 3px 10px;padding-left:9px;border-left:2px solid var(--line);color:#c3d3e2}
.afdbody .lbl{color:var(--mut);font-family:var(--mono);font-size:10px;letter-spacing:.5px;text-transform:uppercase}
body.kiosk .afdbody{font-size:15px}
.camrow{cursor:pointer}
.camrow.open{background:#101a24;border-bottom-color:var(--amber)}
.camexp{color:#4a5f76;font-size:9px;margin-left:auto;padding-left:8px}
.camdet{padding:6px 8px 9px;border-bottom:1px solid #18242f;background:#0b131b}
.camspark{cursor:crosshair}
.camtip{position:fixed;z-index:120;display:none;pointer-events:none;background:#0a1119;border:1px solid var(--amber);
  border-radius:6px;padding:6px 9px;font-family:var(--mono);font-size:11px;line-height:1.5;color:var(--ink);
  box-shadow:0 6px 18px rgba(0,0,0,.55);max-width:260px}
.camrow{display:flex;gap:10px;align-items:baseline;padding:3px 8px;border-bottom:1px solid #18242f;flex-wrap:wrap;min-width:0}
.camrow:hover{background:#101a24}
.camid{flex:none;min-width:150px;font-weight:600}
.camdata{display:flex;flex-wrap:wrap;gap:2px 9px;font-size:11.5px;align-items:baseline;min-width:0}
body.kiosk #camWrap{columns:560px 3}
@media (max-width: 860px){ #camWrap{columns:1} }
.camfield{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:800;border:1px solid var(--vfr);
  color:var(--vfr);border-radius:3px;padding:0 4px;margin-left:6px;vertical-align:middle}
.estchip{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:800;letter-spacing:.4px;
  border:1px solid var(--amber);color:var(--amber);border-radius:3px;padding:0 3px;cursor:help;vertical-align:middle}
/* Split category badge: left half now, right half forecast. */
.catbadge.catsplit{display:inline-flex;padding:0;overflow:hidden;background:none;min-width:74px}
.catbadge.catsplit .cshalf{flex:1 1 50%;text-align:center;padding:2px 4px;font-size:.86em;
  letter-spacing:.2px;line-height:1.25}
.catbadge.catsplit .cshalf:first-child{border-right:1px solid rgba(0,0,0,.45)}
.ccard .catbadge.catsplit{min-width:68px}
.nowcat{display:inline-block;font-family:var(--mono);font-size:9.5px;font-weight:800;letter-spacing:.3px;border:1px solid;border-radius:4px;padding:0 5px;margin-left:6px;cursor:help;vertical-align:middle;white-space:nowrap}
.cutchip.minsbad{border-color:var(--ifr);color:var(--ifr);font-weight:800;background:rgba(255,90,90,.10);cursor:help}
.cutchip.minswarn{border-color:var(--amber);color:var(--amber);font-weight:700;background:rgba(242,169,59,.10);cursor:help}
.rwyhelp{cursor:pointer;color:var(--amber);font-weight:600;letter-spacing:0;text-transform:none;border-bottom:1px dotted var(--amber);margin-left:6px}
.rwylegend{font-family:var(--mono);font-size:10px;color:var(--mut);line-height:1.5;margin-top:5px;border-top:1px solid var(--line);padding-top:4px}
.wxrow.stacked{display:block}
.wxrow.stacked .wxcol{display:block}
.wxrow.stacked .wxbox{margin-top:8px}
.wxbox{background:#0d141c;border:1px solid var(--line);border-radius:8px;padding:6px 9px 4px}
.wxbox h4{margin:0 0 1px;font-family:var(--mono);font-size:10px;font-weight:600;color:var(--mut);letter-spacing:.7px}
.heatgrid{display:grid;grid-template-columns:110px repeat(48,1fr);gap:2px;align-items:center}
.hcell{height:21px;border-radius:3.5px;transition:filter .1s}
.hcell:hover{filter:brightness(1.5)}
.hcell.hhr{background:none;height:13px;font-family:var(--mono);font-size:9.5px;color:var(--mut);overflow:visible;white-space:nowrap}
.hlbl{font-family:var(--disp);font-size:14px;color:var(--ink);padding-right:8px;text-align:right}
.mrow{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:8px 14px;margin-bottom:8px;cursor:pointer;border-left-width:4px}
.mrow:hover{border-color:var(--amber)}
.ml{font-family:var(--mono);font-size:13px;line-height:1.55;display:grid;grid-template-columns:50px 88px 42px 118px 1fr;gap:0 6px;align-items:baseline}
/* 118px holds the usual source tag (5-MIN 14:40L 12m) on one line on its own. It used to
   also carry white-space:nowrap, but an EXPIRED tag is far longer and simply overflowed the
   cell by ~73px, straight over the visibility. Letting it wrap costs a second line on the
   rare expired row and nothing at all on the normal ones. */
.catbadge{display:inline-block;padding:2px 0;width:100%;text-align:center;border-radius:5px;font-family:var(--disp);font-weight:800;font-size:12.5px;letter-spacing:.5px;color:#0c1116;align-self:center}
.ml .dot{align-self:center;justify-self:center}
.mname{font-family:var(--disp);font-size:17px;letter-spacing:.4px;color:var(--ink);font-weight:600}
.mid{color:var(--mut);font-size:11.5px}
.mtag{color:var(--amber);font-size:10.5px;font-weight:700;letter-spacing:.6px}
.mdata{display:flex;flex-wrap:wrap;gap:2px 10px;align-items:baseline;min-width:0}
.m2,.m3,.mt{border-top:1px dashed #202e3d;margin-top:3px;padding-top:3px}
.mrow .m2, .mrow .m3, .mrow .mt, .mrow .mn, .mrow .wxrow{display:none !important}
.mrow.open .m2, .mrow.open .m3, .mrow.open .mt, .mrow.open .mn{display:grid !important}
/* Two things were breaking expanded rows on small screens and on the TV.
   One: .ml drops to display:block below the breakpoint, but the open-sub-row rule above is
   more specific and later, so opening a row snapped its sub-rows back to the 5-column grid.
   The four fixed rail columns then ate ~320px, leaving the data cell about 90px wide, which
   is what shrank the graphs to thumbnails and broke the TREND text into two words a line.
   Two: a media query cannot see this at all in TV mode, because zoom means the viewport can
   report 1080px while the layout only has ~555 CSS px to work with. So the flowing-text
   layout is driven by the container's measured width via .nml, set in syncML(). */
/* Section headers carry a row of buttons that on a phone ran three times the screen width,
   so the whole page slid sideways regardless of the station layout. Let them wrap. */
@media (max-width: 900px){
  .section h2{display:flex;flex-wrap:wrap;align-items:center;gap:5px 7px;line-height:1.3}
  .section h2 button{font-size:10px;padding:2px 7px}
  .topbar{flex-wrap:wrap;gap:5px 7px}
  .topbar button{font-size:10px;padding:2px 7px}
  body{overflow-x:hidden}
}
/* ---- Three-line mode ----
   Pan mode shows every station but only the leftmost slice of each. This instead gives each
   station a fixed three-line block: who it is, then the flying numbers, then the pressure and
   chips. Denser than the old wrapping layout, and nothing runs off the screen. The split is
   at a known part index rather than wherever the text happens to wrap, so the numbers line up
   down the column. */
/* Driven by the body class rather than the viewport, so a wide screen can use it too. */
  body.tri #stationsSection{overflow-x:hidden}
  /* the three-line grid already handles this; forcing block here broke it */
  /* line two: the numbers you fly on. line three: everything else. */
  body.tri #master, body.tri #master .mrow, body.tri #master .ml{min-width:0;max-width:100%}
  body.tri #master .mrow:not(.open) .m2, body.tri #master .mrow:not(.open) .m3,
  body.tri #master .mrow:not(.open) .mt, body.tri #master .mrow:not(.open) .mn,
  body.tri #master .mrow:not(.open) .wxrow{display:none !important}
  body.tri #master .mrow{padding:5px 10px}
  body.tri #master .panelbtn{margin-left:0;margin-right:6px}
  body.tri #master .expicon{margin-left:4px}

/* ---- Pan mode ----
   The 860px breakpoint above is scoped to body:not(.panmode), so a narrow screen in pan mode
   keeps the full desktop row and simply scrolls sideways. Nothing here restructures the row;
   it only gives the section a horizontal scroller and a width to scroll within. */
@media (max-width: 900px){
  body.panmode #stationsSection{overflow-x:auto;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
  body.panmode #master, body.panmode #cardsWrap{min-width:1180px}
  body.panmode #master .ml{grid-template-columns:50px 88px 42px 118px max-content}
  body.panmode #master .mdata{flex-wrap:nowrap}
  body.panmode #master .mdata > *{flex:none;white-space:nowrap}
  body.panmode #stationsSection::-webkit-scrollbar{height:9px}
  body.panmode #stationsSection::-webkit-scrollbar-thumb{background:#2a3d52;border-radius:5px}
  body.panmode #stationsSection::-webkit-scrollbar-track{background:#0d141c}
  body.panmode #stationsSection h2::after{content:' \2194 slide sideways';font-family:var(--mono);
    font-size:10px;color:var(--mut);font-weight:400;letter-spacing:0;text-transform:none;margin-left:8px}
}
#master.nml .ml{display:block !important;line-height:1.85;padding:2px 0}
#master.nml .ml > span:empty{display:none !important}
#master.nml .mdata{display:contents !important}
#master.nml .mrow.open .m2, #master.nml .mrow.open .m3,
#master.nml .mrow.open .mt, #master.nml .mrow.open .mn{display:block !important}
#master.nml .catbadge{display:inline-block;width:auto;padding:2px 9px;margin-right:6px;vertical-align:middle}
#master.nml .mname{display:inline;margin-right:6px}
#master.nml .mid{display:inline;margin-right:6px}
#master.nml .mtag{display:inline;min-width:0;margin-right:7px}
#master.nml .mdata > *{margin-right:9px}
#master.nml .spark, #master.nml .sparkwx{display:block;max-width:100%;height:auto}
#master.nml .wxbox{display:block;width:100%;box-sizing:border-box;margin-top:8px}
#master.nml .wxrow{display:block}

/* An open row drops the label rail entirely and becomes full-width flowing text:
   badge, name and ICAO on the first line, then every following block starting hard left.
   The rail only earns its keep for scanning collapsed rows. */
.mrow.open .ml{display:block !important;padding:1px 0}
.mrow.open .ml > span:empty{display:none !important}
.mrow.open .m1 .catbadge{display:inline-block;width:auto;padding:2px 10px;margin-right:8px;vertical-align:middle}
.mrow.open .m1 .mname{display:inline;margin-right:7px}
.mrow.open .m1 .mid{display:inline;margin-right:7px}
.mrow.open .mtag{display:inline-block;min-width:0;margin-right:9px}
#master .mrow.open .m1 .mdata, .mrow.open .m1 .mdata{display:flex !important;flex-wrap:wrap;width:100%;margin-top:3px;gap:2px 12px}
.mrow.open .m2 .mdata, .mrow.open .m3 .mdata, .mrow.open .mn .mdata{display:inline-flex !important;flex-wrap:wrap;gap:2px 10px;vertical-align:top}
#master .mrow.open .mt .mdata, .mrow.open .mt .mdata{display:flex !important;flex-direction:column;align-items:flex-start;width:100%;margin-top:2px}
.mrow.open .expicon{float:right}
@media (max-width: 860px){
  .mrow.open .m2, .mrow.open .m3, .mrow.open .mt, .mrow.open .mn{display:block !important}
}
.mrow.open .wxrow{display:flex !important}
.mrow{padding:5px 14px}
.mrow.open{padding:8px 14px}
.mrow .expicon{margin-left:auto;color:var(--mut);font-size:11px;align-self:center}
.panelbtn{font-size:10.5px;padding:1px 9px;margin-left:8px;align-self:center}
.cutchip{font-family:var(--mono);font-size:10.5px;font-weight:700;padding:1px 7px;border-radius:999px;cursor:pointer;white-space:nowrap}
.camlink{color:var(--amber);font-weight:700;text-decoration:none;border:1px solid var(--amber);border-radius:999px;padding:1px 9px;font-size:11px;white-space:nowrap}
.camlink:hover{background:rgba(242,169,59,.12)}
.rwybar{display:flex;align-items:center;gap:7px;margin-top:6px}
.rwyid{font-family:var(--disp);font-weight:800;font-size:15px;color:var(--ink);background:#1b2a3a;border:1px solid var(--line);border-radius:4px;padding:1px 7px}
.rwystrip{flex:1;min-width:120px;text-align:center;font-family:var(--mono);font-size:10.5px;color:var(--mut);background:#233241;border-radius:3px;padding:3px 6px;border:1px dashed #3a4d61}
</style>
</head>
<body>

<div class="topbar">
  <div>
    <h1><span class="beacon"></span>Panhandle Weather Brief</h1>
    <div class="sub">Alaska Seaplanes dispatch. METAR, TAF, AIRMET and MADIS in one board. Not for navigation.</div>
  </div>
  <div class="controls">
    <label for="win">TAF window</label>
    <select id="win">
      <option value="0">Obs only</option>
      <option value="6" selected>Next 6 hr</option>
      <option value="12">Next 12 hr</option>
    </select>
    <span id="updated" style="font-family:var(--mono);font-size:12px;color:var(--amber)"></span>
    <button class="primary" id="refresh">Refresh</button>
    <span style="font-size:12px;color:var(--mut)">auto refresh 5 min</span>
  </div>
</div>

<div class="tabs">
  <button class="tab active" data-tab="now">Live Brief</button>
  <button class="tab" data-tab="frat">FRAT Grading</button>
</div>

<button id="kioskExit">✕ exit TV mode</button>
<div id="status" class="status">Loading...</div>
<div id="alerts"></div>
<div id="warnbox"></div>

<!-- ============ LIVE ============ -->
<div id="pane-now">
  <div id="suntrack" style="margin-bottom:10px"></div>
  <div id="sigmetBanner"></div>
  <div id="sensorBanner"></div>
  <div id="jawsBanner"></div>
  <div id="afdBox" class="afdbox">
    <div class="afdhead">
      <span>Forecast discussion <span class="afdsub">NWS Juneau, in the forecaster's own words</span></span>
      <span>
        <button id="afdCopy" style="font-size:11px;padding:2px 10px">copy</button>
        <button id="afdMore" style="font-size:11px;padding:2px 10px">full discussion</button>
        <button id="afdToggle" style="font-size:11px;padding:2px 10px">hide</button>
      </span>
    </div>
    <div id="afdBody" class="afdbody">Loading the area forecast discussion...</div>
  </div>
  <div class="section" id="stationsSection" style="margin-top:0">
    <h2 style="display:flex;align-items:center;gap:12px">Stations <button id="compactBtn" style="font-size:11px;padding:2px 10px">expand all</button> <button id="viewBtn" style="font-size:11px;padding:2px 10px">🎯 compact cards</button> <button id="notamDbg" style="font-size:11px;padding:2px 10px">NOTAM debug</button> <button id="panBtn" style="font-size:11px;padding:2px 10px">phone: pan</button> <button id="rowsBtn" style="font-size:11px;padding:2px 10px">rows: roomy</button> <button id="foldBtn" style="font-size:11px;padding:2px 10px">fold sections</button> <button id="tvBigBtn" style="font-size:11px;padding:2px 10px">TV text: fit all</button> <button id="alertCfgBtn" style="font-size:11px;padding:2px 10px">alert settings</button> <button id="notamPasteBtn" style="font-size:11px;padding:2px 10px">paste NOTAMs</button> <button id="afdBtn" style="font-size:11px;padding:2px 10px">forecast discussion</button> <button id="xwBtn" style="font-size:11px;padding:2px 10px">crosswind calc</button> <button id="csvBtn" style="font-size:11px;padding:2px 10px">export history CSV</button> <button id="sndBtn" style="font-size:11px;padding:2px 10px">🔇 alerts</button> <button id="kioskBtn" style="font-size:11px;padding:2px 10px">📺 TV mode</button></h2>
    <div id="master"></div>
    <div id="cardsWrap" class="cardsgrid" style="display:none"></div>
    <div id="gridWrap" style="display:none;overflow-x:auto">
      <table class="gridtbl" id="gridtbl-el">
        <thead><tr>
          <th>Airport</th><th>Cat</th><th>Src / age</th><th>Wind</th><th>Ceiling</th><th>Vis</th><th>T/Td</th><th>Alt</th><th>NOTAM</th>
        </tr></thead>
        <tbody id="grid-body"></tbody>
      </table>
    </div>
  </div>
  <div class="section">
    <h2>NWS warnings and advisories
      <span id="nwsNote" style="font-size:10.5px;color:var(--mut);font-weight:400;text-transform:none;letter-spacing:0"></span></h2>
    <div id="nwsWrap"></div>
  </div>
  <div class="section">
    <h2>JAWS turbulence <button id="lampBtn" style="font-size:11px;padding:2px 10px">paste LAMP</button> <button id="jawsInfoBtn" style="font-size:11px;padding:2px 10px">what is JAWS</button> <button id="jawsPasteBtn" style="font-size:11px;padding:2px 10px">paste JAWS</button>
      <span style="font-size:10.5px;color:var(--mut);font-weight:400;text-transform:none;letter-spacing:0">Juneau Airport Wind System, advisory</span></h2>
    <div id="jawsWrap"></div>
  </div>
  <div class="section">
    <h2>Camera sites <button id="camLoad" style="font-size:11px;padding:2px 10px">load all sites</button>
      <span id="camNote" style="font-size:10.5px;color:var(--mut);font-weight:400;text-transform:none;letter-spacing:0"></span></h2>
    <div id="camWrap"></div>
  </div>
  <div class="section">
    <h2>Tides</h2>
    <div class="extgrid" id="tides"></div>
  </div>
  <div class="extgrid" id="extgrid"></div>
  <div class="hazrow" id="hazards"></div>
  <div class="section" id="faTop">
    <h2>Area Forecast (AAWU)
      <span id="faScopeNote" style="font-size:10.5px;color:var(--mut);font-weight:400;text-transform:none;letter-spacing:0"></span>
      <button id="faRegion" style="font-size:11px;padding:2px 10px">show statewide</button>
    </h2>
    <div id="fasec"></div>
  </div>
  <div class="grid" id="board" style="display:none"></div>

  <div class="section">
    <h2>Enroute from Juneau</h2>
    <div class="note" style="margin:0 0 8px">Worst conditions along each corridor from current METAR, MADIS 5 minute obs, and TAF groups in the selected window. All departures start in central southeast.</div>
    <div class="note" style="margin:0 0 8px;font-size:11px">VFR: cig above 3,000 ft and vis above 5 sm · MVFR: cig 1,000–3,000 ft and/or vis 3–5 sm · IFR: cig 500–999 ft and/or vis 1–3 sm · LIFR: below 500 ft / 1 sm</div>
    <div id="enroute"></div>
  </div>

  <div class="section">
    <h2>Day at a glance, last 24 hr</h2>
    <div id="heat"></div>
  </div>
  <div class="section">
    <h2>Chat blurb</h2>
    <div class="tape">
      <textarea id="blurb" spellcheck="false"></textarea>
      <div class="actions">
        <button class="primary" id="copy">Copy to clipboard</button>
        <button id="regen">Regenerate</button>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Raw data</h2>
    <details class="raw"><summary>METARs</summary><pre id="rawMetar"></pre></details>
    <details class="raw"><summary>TAFs</summary><pre id="rawTaf"></pre></details>
    <details class="raw"><summary>AIRMETs / SIGMETs in the panhandle box</summary><pre id="rawAirmet"></pre></details>
    <details class="raw"><summary>FA bulletins (FAAK47 / FAAK57)</summary><pre id="rawFA"></pre></details>
  </div>
</div>

<!-- ============ FRAT ============ -->
<div id="pane-frat" class="hidden">
  <div class="fratctl">
    <label for="fratTime">FRAT submission time (Alaska local)</label>
    <input type="datetime-local" id="fratTime">
    <label for="fratWin">window</label>
    <select id="fratWin">
      <option value="60">±60 min</option>
      <option value="90" selected>±90 min</option>
      <option value="180">±3 hr</option>
    </select>
    <button class="primary" id="fratGo">Pull historical obs</button>
  </div>
  <div class="note">Pulls archived 5 minute MADIS and hourly METAR observations from the IEM archive so the board matches what the pilot saw at submission time. Stations with no official observation (Elfin Cove most days) will come back empty, which is itself your documentation.</div>
  <div class="section">
    <h2>Conditions at submission time</h2>
    <div id="fratBoard"></div>
  </div>
  <div class="section">
    <h2>Observations in window</h2>
    <div id="fratObs"></div>
  </div>
</div>

<div id="tip"></div>
<div id="sparkTip" style="position:fixed;z-index:98;display:none;background:#0a0f14;border:1px solid var(--amber);border-radius:6px;padding:5px 9px;font-family:var(--mono);font-size:11.5px;pointer-events:none;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.5)"></div>
<div id="modalBg"></div>
<div id="modal"></div>

<script>
'use strict';
/* ================= CONFIG ================= */
const STATIONS = [
  {icao:'PAHN', iem:['HNS','PAHN'],  name:'Haines',     quad:'Lynn Canal', lat:59.244, lon:-135.524, elev:15},
  {icao:'PAGY', iem:['SGY','PAGY'],  name:'Skagway',    quad:'Lynn Canal', lat:59.460, lon:-135.316, elev:44},
  {icao:'PAGS', iem:['GST','PAGS'],  name:'Gustavus',   quad:'Lynn Canal', lat:58.425, lon:-135.707, elev:36},
  {icao:'PAOH', iem:['HNH','PAOH'],  name:'Hoonah',     quad:'Icy Strait', lat:58.096, lon:-135.410, elev:19},
  {icao:'PAEL', iem:['ELV','PAEL'],  name:'Elfin Cove', quad:'Icy Strait', lat:58.195, lon:-136.347, elev:0},
  {icao:'TKE',  iem:['TKE'],         name:'Tenakee',    quad:'Icy Strait', lat:57.780, lon:-135.218, elev:0, noMetar:true, ndbc:'TKEA2'},
  {icao:'PEC',  iem:['PEC'],         name:'Pelican',    quad:'Icy Strait', lat:57.955, lon:-136.236, elev:0, noMetar:true, ndbc:'PEXA2'},
  {icao:'PAJN', iem:['JNU','PAJN'],  name:'Juneau',     quad:'Central',    lat:58.355, lon:-134.576, elev:21},
  {icao:'PAGN', iem:['AGN','PAGN'],  name:'Angoon',     quad:'Central',    lat:57.504, lon:-134.585, elev:0},
  {icao:'PAFE', iem:['AFE','PAFE'],  name:'Kake',       quad:'Central',    lat:56.961, lon:-133.910, elev:172},
  {icao:'PASI', iem:['SIT','PASI'],  name:'Sitka',      quad:'Southern',   lat:57.047, lon:-135.362, elev:21},
  {icao:'PAKW', iem:['AKW','KLW','PAKW'], name:'Klawock', quad:'Southern', lat:55.579, lon:-133.076, elev:80},
  {icao:'PAKT', iem:['KTN','PAKT'],  name:'Ketchikan',  quad:'Southern',   lat:55.356, lon:-131.714, elev:92},
  {icao:'PAPG', iem:['PSG','PAPG'], name:'Petersburg', quad:'Southern', lat:56.801, lon:-132.945, elev:111},
  {icao:'PAWG', iem:['WRG','PAWG'], name:'Wrangell',   quad:'Southern', lat:56.484, lon:-132.370, elev:44},
  {icao:'PAYA', iem:['YAK','PAYA'], name:'Yakutat',    quad:'Gulf Coast', lat:59.503, lon:-139.660, elev:33},
];
/* FA zones per quadrant for the area weather footer. Edit if the AAWU boundary reads differently to you. */
const QUAD_ZONES = {'Lynn Canal':['JB'], 'Icy Strait':['JB','JF'], 'Central':['JC'], 'Southern':['JD','JF'], 'Gulf Coast':['JE']};
const QUADS = ['Lynn Canal','Icy Strait','Central','Southern'];
/* Every corridor starts in central southeast at Juneau. Edit via lists to match how you actually route.
   zones: AAWU FA zones the corridor crosses (JB Lynn Canal/Glacier Bay, JC Central, JD Southern, JE Ern Gulf Cst, JF Coastal Wtrs). */
const CORRIDORS = [
  {dest:'PAHN', label:'Juneau to Haines',     via:['PAJN','PAHN'], zones:['JC','JB']},
  {dest:'PAGY', label:'Juneau to Skagway',    via:['PAJN','PAHN','PAGY'], zones:['JC','JB']},
  {dest:'PAOH', label:'Juneau to Hoonah',     via:['PAJN','PAOH'], zones:['JC','JB']},
  {dest:'PAGS', label:'Juneau to Gustavus',   via:['PAJN','PAOH','PAGS'], zones:['JC','JB']},
  {dest:'PAEL', label:'Juneau to Elfin Cove', via:['PAJN','PAOH','PAGS','PAEL'], zones:['JC','JB','JF']},
  {dest:'TKE',  label:'Juneau to Tenakee',    via:['PAJN','TKE'], zones:['JC']},
  {dest:'PEC',  label:'Juneau to Pelican',    via:['PAJN','PAOH','PAEL','PEC'], zones:['JC','JB','JF']},
  {dest:'PAGN', label:'Juneau to Angoon',     via:['PAJN','PAGN'], zones:['JC']},
  {dest:'PAFE', label:'Juneau to Kake',       via:['PAJN','PAGN','PAFE'], zones:['JC','JD'], alt:{c208:[6000,10000], pc12:[12000,18000]}},
  {dest:'PASI', label:'Juneau to Sitka',      via:['PAJN','PAGN','PASI'], zones:['JC','JF'], alt:{c208:[6000,10000], pc12:[12000,18000]}},
  {dest:'PAKW', label:'Juneau to Klawock',    via:['PAJN','PAFE','PAKW'], zones:['JC','JD'], alt:{c208:[6000,10000], pc12:[12000,18000]}},
  {dest:'PAKT', label:'Juneau to Ketchikan',  via:['PAJN','PAFE','PAKW','PAKT'], zones:['JC','JD']},
  {dest:'PAPG', label:'Juneau to Petersburg', via:['PAJN','PAGN','PAFE','PAPG'], zones:['JC','JD'], alt:{c208:[6000,10000], pc12:[12000,18000]}},
  {dest:'PAWG', label:'Juneau to Wrangell',   via:['PAJN','PAGN','PAFE','PAPG','PAWG'], zones:['JC','JD'], alt:{c208:[6000,10000], pc12:[12000,18000]}},
  {dest:'PAYA', label:'Juneau to Yakutat',    via:['PAJN','PAGS','PAYA'], zones:['JB','JE']},
];
const TIDE_STNS = [
  {name:'Angoon (Killisnoo Hbr)', id:'9451895'},
  {name:'Tenakee Springs', id:'9452386'},
  {name:'Pelican (Lisianski)', id:'9452611', verify:true},
  {name:'Elfin Cove', id:'9452634'},
  {name:'Pybus Bay', id:'9451781'},
  {name:'Pack Creek (Juneau ref)', id:'9452210'},
];
/* ===== FAA WeatherCams (VEIA visibility, CEIA sky, images) ===== */
const CAM_API = 'https://weathercams.faa.gov/api/';
/* Real FAA site IDs, swept from /api/summary on Jul 31 2026 and filtered to the operating
   area. Each camera is tied to every field within 30 nm of it. adv:true marks the wxsrc 3
   sites, whose payload carries advisoryWeather: wind, temperature and humidity at 10 minute
   intervals. Those are effectively extra weather stations at places with no METAR.
   The six untied entries sit past 60 nm from any field, so their nearest-field tie was an
   artifact of the sweep rather than anything useful. They are kept because Prince Rupert and
   Dease Lake matter for Canadian charter work, and they display nowhere until given an
   affects list. */
const CAM_SITES = [
  {id:3, name:'Level Island', lat:56.467, lon:-133.083, affects:['PAPG','PAWG'], adv:true}, // 56.467, -133.083 · 21 nm
  {id:4, name:'Kake', lat:56.973, lon:-133.945, affects:['PAFE']}, // 56.973, -133.945 · 1 nm
  {id:7, name:'Yakutat', lat:59.510, lon:-139.660, affects:['PAYA']}, // 59.510, -139.660 · 0 nm
  {id:8, name:'Pedersen Hill', lat:58.366, lon:-134.635, affects:['PAJN','PAOH']}, // 58.366, -134.635 · 2 nm
  {id:25, name:'Klawock', lat:55.579, lon:-133.071, affects:['PAKW']}, // 55.579, -133.071 · 0 nm
  {id:27, name:'Berners Bay', lat:58.680, lon:-134.940, affects:['PAJN','PAGS'], adv:true}, // 58.680, -134.940 · 23 nm
  {id:44, name:'Sisters Island', lat:58.178, lon:-135.258, affects:['PAOH','PAGS','TKE','PAJN'], adv:true}, // 58.178, -135.258 · 7 nm
  {id:73, name:'Wrangell', lat:56.487, lon:-132.387, affects:['PAWG','PAPG']}, // 56.487, -132.387 · 1 nm
  {id:104, name:'Hydaburg', lat:55.202, lon:-132.825, affects:['PAKW']}, // 55.202, -132.825 · 24 nm
  {id:108, name:'Taku Inlet', lat:58.318, lon:-134.101, affects:['PAJN'], adv:true}, // 58.318, -134.101 · 15 nm
  {id:117, name:'Ketchikan', lat:55.357, lon:-131.709, affects:['PAKT']}, // 55.357, -131.709 · 0 nm
  {id:123, name:'Metlakatla', lat:55.128, lon:-131.577, affects:['PAKT']}, // 55.128, -131.577 · 14 nm
  {id:125, name:'Skagway', lat:59.454, lon:-135.328, affects:['PAGY','PAHN']}, // 59.454, -135.328 · 1 nm
  {id:133, name:'Misty Fjords', lat:55.513, lon:-130.909, affects:['PAKT'], adv:true}, // 55.513, -130.909 · 29 nm
  {id:143, name:'Hawk Inlet', lat:58.125, lon:-134.756, affects:['PAJN','PAOH','TKE'], adv:true}, // 58.125, -134.756 · 15 nm
  {id:159, name:'Craig', lat:55.474, lon:-133.137, affects:['PAKW']}, // 55.474, -133.137 · 7 nm
  {id:161, name:'Hyder', lat:55.912, lon:-130.019, affects:[]}, // 55.912, -130.019 · 66 nm, outside the area, untied
  {id:166, name:'Tenakee Springs', lat:57.779, lon:-135.219, affects:['TKE','PAOH','PAGN'], adv:true}, // 57.779, -135.219 · 0 nm
  {id:172, name:'Pelican', lat:57.958, lon:-136.227, affects:['PEC','PAEL','PAOH']}, // 57.958, -136.227 · 0 nm
  {id:182, name:'Port Alexander', lat:56.247, lon:-134.648, affects:['PAFE']}, // 56.247, -134.648 · 49 nm
  {id:184, name:'Grave Point', lat:58.062, lon:-134.051, affects:['PAJN'], adv:true}, // 58.062, -134.051 · 24 nm
  {id:186, name:'Petersburg', lat:56.808, lon:-132.938, affects:['PAPG','PAWG']}, // 56.808, -132.938 · 0 nm
  {id:187, name:'Kasaan', lat:55.540, lon:-132.404, affects:['PAKW','PAKT'], adv:true}, // 55.540, -132.404 · 23 nm
  {id:196, name:'Thorne Bay', lat:55.686, lon:-132.529, affects:['PAKW'], adv:true}, // 55.686, -132.529 · 20 nm
  {id:197, name:'Cape Fanshaw', lat:57.185, lon:-133.574, affects:['PAFE'], adv:true}, // 57.185, -133.574 · 17 nm
  {id:211, name:'Chilkat', lat:59.439, lon:-136.273, affects:['PAHN','PAGY'], adv:true}, // 59.439, -136.273 · 26 nm
  {id:226, name:'Edna Bay', lat:55.947, lon:-133.672, affects:['PAKW']}, // 55.947, -133.672 · 30 nm
  {id:232, name:'Gustavus Dock', lat:58.390, lon:-135.730, affects:['PAGS','PAOH','PAEL'], adv:true}, // 58.390, -135.730 · 2 nm
  {id:235, name:'Point Higgins', lat:55.461, lon:-131.810, affects:['PAKT']}, // 55.461, -131.810 · 7 nm
  {id:247, name:'Coffman Cove', lat:56.006, lon:-132.815, affects:['PAKW'], adv:true}, // 56.006, -132.815 · 27 nm
  {id:248, name:'Eldred Rock', lat:58.971, lon:-135.221, affects:['PAHN','PAGY'], adv:true}, // 58.971, -135.221 · 19 nm
  {id:250, name:'Harris River Pass', lat:55.459, lon:-132.844, affects:['PAKW'], adv:true}, // 55.459, -132.844 · 11 nm
  {id:251, name:'Angoon', lat:57.497, lon:-134.569, affects:['PAGN','TKE']}, // 57.497, -134.569 · 1 nm
  {id:253, name:'Sitka', lat:57.052, lon:-135.363, affects:['PASI']}, // 57.052, -135.363 · 0 nm
  {id:257, name:'Lena Point', lat:58.388, lon:-134.762, affects:['PAJN','PAOH','PAGS']}, // 58.388, -134.762 · 6 nm
  {id:267, name:'Cape Spencer', lat:58.199, lon:-136.639, affects:['PAEL','PEC'], adv:true}, // 58.199, -136.639 · 9 nm
  {id:275, name:'Atlin', lat:59.577, lon:-133.669, affects:['PAGY'], noVeia:true}, // 59.577, -133.669 · 51 nm
  {id:277, name:'Bob Quinn Lake', lat:56.967, lon:-130.249, affects:[], noVeia:true}, // 56.967, -130.249 · 76 nm, outside the area, untied
  {id:281, name:'Prince Rupert', lat:54.286, lon:-130.445, affects:[], noVeia:true}, // 54.286, -130.445 · 78 nm, outside the area, untied
  {id:285, name:'Seal Cove - Prince Rupert', lat:54.332, lon:-130.277, affects:[], noVeia:true}, // 54.332, -130.277 · 79 nm, outside the area, untied
  {id:288, name:'Haines Junction', lat:60.789, lon:-137.546, affects:[], noVeia:true}, // 60.789, -137.546 · 100 nm, outside the area, untied
  {id:413, name:'Eaglecrest', lat:58.261, lon:-134.512, affects:['PAJN']}, // 58.261, -134.512 · 6 nm
  {id:418, name:'Hoonah', lat:58.097, lon:-135.414, affects:['PAOH','TKE','PAGS','PEC']}, // 58.097, -135.414 · 0 nm
  {id:419, name:'Haines', lat:59.222, lon:-135.420, affects:['PAHN','PAGY']}, // 59.222, -135.420 · 3 nm
  {id:423, name:'Fraser Camp', lat:59.717, lon:-135.046, affects:['PAGY'], noVeia:true}, // 59.717, -135.046 · 17 nm
  {id:424, name:'Dease Lake', lat:58.426, lon:-130.024, affects:[], noVeia:true}, // 58.426, -130.024 · 135 nm, outside the area, untied
  {id:434, name:'Gustavus', lat:58.425, lon:-135.706, affects:['PAGS','PAOH','PAEL']}, // 58.425, -135.706 · 0 nm
  {id:436, name:'Minx Island', lat:55.383, lon:-131.266, affects:['PAKT'], adv:true}, // 55.383, -131.266 · 15 nm
  {id:440, name:'Twin Island', lat:55.143, lon:-131.217, affects:['PAKT']}, // 55.143, -131.217 · 21 nm
  {id:444, name:'Clover Pass', lat:55.473, lon:-131.821, affects:['PAKT']}, // 55.473, -131.821 · 8 nm
];
/* A station with no camera pointed at it should say so rather than show nothing, otherwise
   a missing camera and a missing lookup are indistinguishable. */
const CAM_SEARCH = 'https://weathercams.faa.gov/map/-141.0,54.0,-129.0,60.5/cameras';
const CAM_BOUNDS = '54.3,-138.8|60.5,-129.2';
function digSites(j){
  // hunt the locations payload for {id, name} pairs
  const found = [];
  const walk = o=>{
    if(!o || typeof o !== 'object') return;
    if(Array.isArray(o)){ o.forEach(walk); return; }
    const keys = Object.keys(o);
    const idK = keys.find(k=>/^(site)?id$/i.test(k));
    const nmK = keys.find(k=>/name|title|label/i.test(k) && typeof o[k]==='string');
    if(idK && nmK && (typeof o[idK]==='number' || /^\d+$/.test(String(o[idK])))) found.push({id:parseInt(o[idK],10), name:o[nmK]});
    keys.forEach(k=>{ if(typeof o[k]==='object') walk(o[k]); });
  };
  walk(j);
  return found;
}
/* The FAA rejects any request that does not carry its own Origin, so the generic proxy chain
   always came back 401 and every camera read as blocked. api/wxcam.js sets Origin, Referer and
   a browser User-Agent, warms up for the Akamai cookie, caches five minutes per site and trims
   the payload. Try it first and keep the old chain as a fallback so a missing route degrades
   rather than breaks. */
async function camFetch(id){
  try{
    const r = await fetch('/api/wxcam?siteId=' + id, {headers:{accept:'application/json'}});
    if(r.ok) return await r.json();
  }catch(e){ /* route absent, fall through */ }
  return fetchJSON(CAM_API + 'summary?siteId=' + id);
}
/* One on-field camera per station, all within 3.4 nm, confirmed by the site sweep. These are
   the only cameras fetched on load; the rest of the network loads when its section is opened. */
const STATION_CAM = {
  PAGY:125, PAHN:419, PAJN:8, PAGS:434, PAOH:418, PAGN:251, PAFE:4, PASI:253,
  PAPG:186, PAWG:73, PAYA:7, PAKW:25, PAKT:117, PEC:172, TKE:166
};
/* Pelican and Tenakee have no METAR and no MADIS, so the camera is the only visibility source
   they have. Everywhere else the certified observation is the answer and VEIA is background. */
const VEIA_PRIMARY = ['PEC','TKE'];
/* Which cameras get pulled on each cycle: always the 15 on-field ones, plus the rest of the
   network once the section has been opened. */
/* Whether the whole camera network loads, not just the 15 on-field ones. This used to live
   only in memory, so every refresh dropped back to the 15 and the button had to be pressed
   again. It is a preference, so it persists. */
/* The whole camera network loads by default now. It was opt-in to keep the request count
   down, but that meant a fresh page showed 15 of 43 and the rest read "not loaded", which
   looks broken rather than deliberate. Only an explicit opt-out is remembered. */
function camAllOn(){
  if(state.camAll !== undefined) return state.camAll;
  try{ state.camAll = localStorage.getItem('wxb_camall') === '1'; }catch(e){ state.camAll = false; }
  return state.camAll;
}
function setCamAll(on){
  state.camAll = !!on;
  try{ localStorage.setItem('wxb_camall', on ? '1' : '0'); }catch(e){}
}
const CAM_WIDE_EVERY_MS = 30 * 60000;   // the wider network, when switched on
const CAM_NEAR_EVERY_MS = 15 * 60000;   // the on-field cameras
function camRefreshSet(){
  const nearAll = camPriority();
  /* Only refetch the on-field set when its own interval is up, or for cameras never fetched.
     The board cycle is five minutes; the images are not. */
  const nearDue = !state.camNearAt || (Date.now() - state.camNearAt) >= CAM_NEAR_EVERY_MS;
  const near = nearDue
    ? (state.camNearAt = Date.now(), nearAll)
    : nearAll.filter(c=>!(state.cams||{})[c.id]);
  if(!camAllOn()) return near;
  const wide = veiaSites().filter(c=>!near.some(n=>n.id === c.id));
  const due = !state.camWideAt || (Date.now() - state.camWideAt) >= CAM_WIDE_EVERY_MS;
  const missing = wide.filter(c=>!(state.cams||{})[c.id]);
  /* The 15 on-field cameras are the ones a dispatcher is reading, so they refresh every
     cycle. The other 28 are background awareness and refresh every 15 minutes, or straight
     away if they have never been fetched. */
  if(due){ state.camWideAt = Date.now(); return near.concat(wide); }
  return near.concat(missing);
}
function camPriority(){
  const ids = new Set(Object.values(STATION_CAM));
  return camSiteList().filter(c=>ids.has(c.id));
}
function camForStation(icao){
  const id = STATION_CAM[icao];
  return id ? ((state.cams||{})[id] || null) : null;
}
function camSiteList(){
  return (state.camSites && state.camSites.length) ? state.camSites : CAM_SITES;
}
/* ================= FAA WeatherCams payload =================
   Schema is known now, so this parses it rather than hunting through it. Everything here
   exists because of something the live data actually did:
     - camerasUpdated 0 rows still carry a visibility number. Pelican published 1 sm off a row
       where no camera had reported. Those rows are dropped, not shown.
     - crowdsource rows are human submissions, not camera-derived. Kept but flagged.
     - VEIA is a daylight product. After sunset the honest answer is no reading, not the last
       afternoon value, so night returns null rather than something stale.
     - magVariation is per site. Pelican is 17.32, not the 19 hardcoded elsewhere.
     - advisoryWeather has no gust field, only a 10 minute sample of windSpeedKnots, so peak
       and mean are derived across the recent samples instead of read off. */
const VEIA_MAX_AGE_MIN = 75;
function camNum(v){
  if(v === null || v === undefined) return null;
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}
function camTime(v){
  if(!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d.getTime();
}
function camDaylight(site, at){
  const t = at || Date.now();
  const rise = camTime(site && site.sunrise), set = camTime(site && site.sunset);
  if(rise !== null && set !== null && set > rise) return t >= rise && t <= set;
  if(site && Number.isFinite(site.lat) && Number.isFinite(site.lon)){
    const st = sunTimes(site.lat, site.lon, new Date(t));
    // civil-ish margin: cameras still resolve a little either side of geometric sun
    return t >= st.sunrise.getTime() - 30*60000 && t <= st.sunset.getTime() + 30*60000;
  }
  return true;
}
function parseCam(j){
  const p = (j && (j.payload || j)) || {};
  const rawSite = p.site || p.siteDetail || {};
  const site = {
    id: camNum(rawSite.siteId ?? rawSite.id),
    name: rawSite.siteIdentifier || rawSite.siteName || rawSite.name || '',
    icao: rawSite.icao || rawSite.icaoId || '',
    lat: camNum(rawSite.latitude ?? rawSite.lat),
    lon: camNum(rawSite.longitude ?? rawSite.lon ?? rawSite.lng),
    elev: camNum(rawSite.elevation),
    magVar: camNum(rawSite.magVariation),
    wxsrc: camNum(rawSite.wxsrc),
    displayVeia: rawSite.displayVeia !== false,
    maint: rawSite.siteInMaintenance === true,
    inactive: rawSite.siteActive === false,
    sunrise: rawSite.sunrise || null, sunset: rawSite.sunset || null,
    tz: rawSite.timeZone || null,
  };

  const visAll = (Array.isArray(p.visibilities) ? p.visibilities : []).map(r=>({
    vis: camNum(r.visibilityStatuteMi),
    conf: (function(){ const c = camNum(r.confidence); return (c === null || c < 0) ? null : c; })(),
    updated: camNum(r.camerasUpdated),
    crowd: r.crowdsource === true,
    t: camTime(r.processedTime),
    sky: (r.skyCondition && (r.skyCondition.skyCover || r.skyCondition.skycover)) || null,
    oktas: camNum(r.skyCondition && r.skyCondition.skyCoverOktas),
    cloudPct: camNum(r.skyCondition && r.skyCondition.cloudPercentage),
  })).filter(r=>r.t !== null).sort((a,b)=>b.t-a.t);

  const usable = visAll.filter(r=>r.vis !== null && r.updated > 0);
  const dropped = visAll.filter(r=>r.vis !== null && !(r.updated > 0)).length;
  const latest = usable[0] || null;
  const day = camDaylight(site, latest ? latest.t : Date.now());
  const fresh = latest && (Date.now() - latest.t) <= VEIA_MAX_AGE_MIN*60000;

  const adv = (Array.isArray(p.advisoryWeather) ? p.advisoryWeather : []).map(r=>({
    t: camTime(r.observationDateTime),
    wdir: camNum(r.windDirDegrees), wspd: camNum(r.windSpeedKnots),
    tempF: camNum(r.tempF), rh: camNum(r.relativeHumidity),
    alt: camNum(r.altimInHg), rain: camNum(r.rainIn),
  })).filter(r=>r.t !== null).sort((a,b)=>b.t-a.t);

  // no gust field exists, so derive it from the spread of the last hour of samples
  const hour = adv.filter(r=>r.wspd !== null && (Date.now() - r.t) <= 65*60000);
  const spd = hour.map(r=>r.wspd);
  const wind = spd.length ? {
    latest: adv.find(r=>r.wspd !== null) || null,
    peak: Math.max(...spd), low: Math.min(...spd),
    mean: Math.round(spd.reduce((a,b)=>a+b,0)/spd.length*10)/10,
    n: spd.length,
  } : null;

  /* Per-camera health. Bob Quinn Lake had a camera whose last success was nearly a month old
     with an empty image list, which is indistinguishable from a working camera unless these
     flags are read. */
  const cams = (Array.isArray(p.cameras) ? p.cameras : []).map(c=>{
    const imgs = Array.isArray(c.currentImages) ? c.currentImages : [];
    const last = imgs.length ? camTime(imgs[0].imageDatetime || imgs[0].imageDateTime) : camTime(c.cameraLastSuccess);
    return {
      bearing: camNum(c.cameraBearing),
      dir: c.cameraDirection || '',
      img: imgs.length ? (imgs[0].imageUri || imgs[0]) : null,
      n: imgs.length,
      last,
      veia: c.enableVeia !== false,
      maint: c.cameraInMaintenance === true,
      broken: c.cameraOutOfOrder === true,
      stale: last !== null && (Date.now() - last) > 3*3600000,
    };
  });
  const camDown = cams.filter(c=>c.maint || c.broken || c.stale || !c.n).length;

  /* Fields inside an advisory row go null independently: Cooper Landing publishes temperature
     and humidity with no wind at all. Carrying only a wind-derived object meant those sites
     showed nothing, so the newest row is exposed on its own. */
  const advLatest = adv[0] || null;
  const advAge = advLatest ? Date.now() - advLatest.t : null;

  return {
    site, cams, camDown, advLatest, advAge,
    veia: (latest && day && fresh) ? latest : null,
    veiaLast: latest,
    night: !!latest && !day,
    stale: !!latest && !fresh,
    droppedRows: dropped,
    hist: usable, adv, wind,
    hasWx: !!(adv.length || wind),
  };
}
const CAM_LINK = id => 'https://weathercams.faa.gov/map/-138.46028,55.65392,-130.02278,58.7/cameraSite/' + id + '/details/camera';
/* VEIA readout for the expanded station window. Says plainly what it is and when it was made,
   and refuses to show anything at night rather than a stale afternoon reading. */
function veiaLineHTML(icao){
  const c = camForStation(icao);
  if(!c) return null;
  const site = camSiteList().find(x=>x.id === STATION_CAM[icao]);
  const nm = site ? site.name : (c.site.name || 'camera');
  const link = `<a href="${CAM_LINK(STATION_CAM[icao])}" target="_blank" class="camlink">${esc(nm)} \u2197</a>`;
  if(c.failed) return `${link} <span style="color:var(--mut)">feed unavailable</span>`;
  if(!c.veia){
    const why = c.night ? 'no reading, VEIA is daylight only'
              : c.stale ? 'last reading ' + agoTxt(c.veiaLast.t/1000) + ', treated as stale'
              : 'no usable reading';
    return `${link} <span style="color:var(--mut)">${why}</span>`;
  }
  const v = c.veia;
  const bits = [link, cv('VEIA ' + visTxt(v.vis) + ' sm', visBand(v.vis))];
  if(c.site && c.site.maint) bits.push('<b style="color:var(--amber)">site in maintenance</b>');
  if(c.camDown) bits.push(`<span style="color:var(--amber)">${c.camDown} of ${c.cams.length} cameras down</span>`);
  if(v.sky) bits.push(`<span style="color:var(--mut)">sky ${esc(v.sky)}</span>`);
  if(v.conf !== null) bits.push(`<span style="color:var(--mut)">confidence ${Math.round(v.conf)}%</span>`);
  bits.push(`<span style="color:var(--mut)">${fmtLZ(v.t)} \u00b7 ${agoTxt(v.t/1000)}</span>`);
  if(v.crowd) bits.push('<span style="color:var(--amber)">crowdsourced, not camera derived</span>');
  if(c.droppedRows) bits.push(`<span style="color:var(--mut)">${c.droppedRows} row${c.droppedRows>1?'s':''} ignored, no camera update</span>`);
  const w = c.wind, a = c.advLatest;
  let wtxt = '';
  if(w && w.latest){
    wtxt += ` &nbsp;<span style="color:var(--mut)">wind</span> <b>${w.latest.wdir!==null?String(Math.round(((w.latest.wdir - (c.site.magVar ?? MAGVAR)) + 360) % 360)).padStart(3,'0')+'\u00b0M':'VRB'} ${Math.round(w.latest.wspd)}kt</b>`;
    if(w.peak - w.low >= 5) wtxt += ` <span style="color:var(--amber)">peak ${Math.round(w.peak)}, mean ${w.mean} over ${w.n} samples</span>`;
  }
  if(a && a.tempF !== null) wtxt += ` <span style="color:var(--mut)">${Math.round((a.tempF-32)*5/9)}\u00b0C</span>`;
  if(a && a.rh !== null) wtxt += ` <span style="color:var(--mut)">RH ${Math.round(a.rh)}%</span>`;
  return bits.join(' ') + wtxt +
    ` <span style="color:var(--mut);font-size:10.5px">(estimated from camera imagery, advisory only, not a certified observation)</span>`;
}
/* ================= Camera sites section =================
   Every VEIA site in the operating area, laid out like the station rows. On-field cameras load
   with the board; the rest load on demand, because 43 sites is a lot of requests to make for a
   panel nobody has opened. Everything here is advisory: estimated visibility, estimated sky
   cover, and for the wxsrc 3 sites a non-certified wind and temperature feed. */
function veiaSites(){ return camSiteList().filter(c=>!c.noVeia); }
function camRowHTML(c){
  const d = (state.cams||{})[c.id];
  const onField = Object.entries(STATION_CAM).find(([k,v])=>v===c.id);
  const tag = onField ? `<span class="camfield">${onField[0]}</span>` : '';
  const link = `<a href="${CAM_LINK(c.id)}" target="_blank" class="camlink">${esc(c.name)} \u2197</a>`;
  if(!d) return `<div class="camrow"><div class="camid">${link}${tag}</div><div class="camdata" style="color:var(--mut)">not loaded</div></div>`;
  if(d.failed) return `<div class="camrow"><div class="camid">${link}${tag}</div><div class="camdata" style="color:var(--ifr)">feed unavailable</div></div>`;
  const bits = [];
  if(d.veia){
    bits.push(cv('VEIA ' + visTxt(d.veia.vis) + ' sm', visBand(d.veia.vis)));
    if(d.veia.sky) bits.push(`<span class="mono" style="color:var(--mut)">sky ${esc(d.veia.sky)}</span>`);
    if(d.veia.conf !== null) bits.push(`<span class="mono" style="color:${d.veia.conf < 60 ? 'var(--amber)' : 'var(--mut)'}" title="${d.veia.conf < 60 ? 'Low confidence. Treat this reading with caution, especially where a METAR disagrees.' : 'VEIA confidence from the FAA payload.'}">conf ${Math.round(d.veia.conf)}%</span>`);
    bits.push(`<span class="mono" style="color:var(--mut)">${fmtLZ(d.veia.t)}</span>`);
    if(d.veia.crowd) bits.push('<span class="mono" style="color:var(--amber)">crowdsourced</span>');
  } else {
    bits.push(`<span class="mono" style="color:var(--mut)">${d.night ? 'no reading, daylight only' : d.stale ? 'last reading ' + agoTxt(d.veiaLast.t/1000) : 'no usable reading'}</span>`);
  }
  const w = d.wind;
  if(w && w.latest){
    const mv = d.site.magVar ?? MAGVAR;
    const dir = w.latest.wdir !== null ? String(Math.round(((w.latest.wdir - mv) + 360) % 360)).padStart(3,'0') + '\u00b0M' : 'VRB';
    const gusty = (w.peak - w.low) >= 5;
    bits.push(`<span class="mono">${dir} <b>${Math.round(w.latest.wspd)}kt</b>${gusty?` <span style="color:var(--amber)">peak ${Math.round(w.peak)} mean ${w.mean}</span>`:''}</span>`);
  }
  const a = d.advLatest;
  if(a){
    if(!w && a.wspd === null) bits.push('<span class="mono" style="color:var(--mut)">no wind reported</span>');
    if(a.tempF !== null) bits.push(`<span class="mono" style="color:var(--mut)">${Math.round((a.tempF-32)*5/9)}\u00b0C</span>`);
    if(a.rh !== null) bits.push(`<span class="mono" style="color:var(--mut)">RH ${Math.round(a.rh)}%</span>`);
    if(a.alt !== null) bits.push(`<span class="mono" style="color:var(--mut)">A${a.alt.toFixed(2)}</span>`);
    if(d.advAge > 65*60000) bits.push(`<span class="mono" style="color:var(--amber)">weather ${agoTxt(a.t/1000)}</span>`);
  }
  if(d.site && d.site.maint) bits.push('<span class="mono" style="color:var(--amber);font-weight:700" title="The FAA has this site flagged as in maintenance. Readings may be unreliable.">SITE IN MAINT</span>');
  if(d.cams.length) bits.push(`<span class="mono" style="color:#4a5f76;font-size:10px"${d.camDown?' title="Cameras in maintenance, out of order, or with no recent image."':''}>${d.cams.length} cam${d.camDown?', '+d.camDown+' down':''}</span>`);
  if(d.droppedRows) bits.push(`<span class="mono" style="color:#4a5f76;font-size:10px" title="Rows that carried a visibility but no camera had updated. Dropped rather than shown.">${d.droppedRows} ign</span>`);
  const open = (state.camOpen||{})[c.id];
  return `<div class="camrow${open?' open':''}" data-cam="${c.id}"><div class="camid">${link}${tag}</div><div class="camdata">${bits.join(' ')}<span class="camexp">${open?'\u25b2':'\u25bc'}</span></div></div>`
    + (open ? camDetailHTML(c) : '');
}
/* VEIA and advisory history. Both series already arrive in the payload, about six hours of
   them, and were being parsed and discarded. VEIA lands at :x4 past and the advisory feed at
   :x0, so they are never sampled together; drawing them against one wall-clock axis is the
   only way the two can be read against each other. Dropped rows leave a real gap in the line
   rather than being bridged, because a bridge would invent a reading that was never taken. */
function camSpark(d, W, H){
  const hist = (d.hist||[]).slice().reverse();
  if(hist.length < 2) return '<div style="color:var(--mut);font-size:10.5px">not enough history yet</div>';
  const adv = (d.adv||[]).slice().reverse().filter(r=>r.wspd !== null);
  const padL = 26, padR = 30, padT = 8, padB = 14;
  const t0 = Math.min(hist[0].t, adv.length?adv[0].t:hist[0].t);
  const t1 = Math.max(hist[hist.length-1].t, adv.length?adv[adv.length-1].t:0, Date.now());
  const span = Math.max(1, t1 - t0);
  const X = t => padL + (W - padL - padR) * (t - t0) / span;
  const vMax = Math.max(10, ...hist.map(r=>r.vis));
  const Y = v => padT + (H - padT - padB) * (1 - v / vMax);

  // break the line wherever the gap is bigger than a normal sample interval
  const segs = []; let cur = [];
  hist.forEach((r, i)=>{
    if(i && (r.t - hist[i-1].t) > 22*60000){ if(cur.length) segs.push(cur); cur = []; }
    cur.push(r);
  });
  if(cur.length) segs.push(cur);
  const path = segs.filter(g=>g.length>1).map(g=>
    'M' + g.map(r=>`${X(r.t).toFixed(1)} ${Y(r.vis).toFixed(1)}`).join(' L')).join(' ');

  const dots = hist.map(r=>{
    const low = r.conf !== null && r.conf < 60;
    return `<circle cx="${X(r.t).toFixed(1)}" cy="${Y(r.vis).toFixed(1)}" r="${r.crowd?2.6:1.8}"
      fill="${r.crowd ? 'var(--amber)' : (low ? '#8a6a2f' : 'var(--vfr)')}"><title>${visTxt(r.vis)} sm at ${fmtLZ(r.t)}${r.conf!==null?', confidence '+Math.round(r.conf)+'%':''}${r.crowd?', crowdsourced':''}${r.sky?', sky '+r.sky:''}</title></circle>`;
  }).join('');

  let wind = '';
  if(adv.length > 1){
    const wMax = Math.max(10, ...adv.map(r=>r.wspd));
    const YW = v => padT + (H - padT - padB) * (1 - v / wMax);
    wind = `<path d="M${adv.map(r=>`${X(r.t).toFixed(1)} ${YW(r.wspd).toFixed(1)}`).join(' L')}"
      fill="none" stroke="#6a8fb5" stroke-width="1.2" stroke-dasharray="3 3" opacity=".85"/>
      <text x="${W-2}" y="${YW(adv[adv.length-1].wspd)+3}" text-anchor="end" font-size="9" fill="#6a8fb5" font-family="IBM Plex Mono">${Math.round(adv[adv.length-1].wspd)}kt</text>`;
  }
  const gr = [0, vMax/2, vMax].map(v=>
    `<line x1="${padL}" y1="${Y(v)}" x2="${W-padR}" y2="${Y(v)}" stroke="#1d2a37" stroke-width="1"/>
     <text x="${padL-3}" y="${Y(v)+3}" text-anchor="end" font-size="9" fill="var(--mut)" font-family="IBM Plex Mono">${v%1?v.toFixed(1):v}</text>`).join('');
  const last = hist[hist.length-1];
  const pts = hist.map(r=>({x:+X(r.t).toFixed(1), y:+Y(r.vis).toFixed(1), t:r.t, v:r.vis,
                           c:r.conf, k:r.crowd?1:0, s:r.sky||''}));
  const mv = (d.site && d.site.magVar !== null && d.site.magVar !== undefined) ? d.site.magVar : MAGVAR;
  const wpts = adv.length>1 ? adv.map(r=>({x:+X(r.t).toFixed(1), w:r.wspd,
    d:(r.wdir===null?null:Math.round(((r.wdir - mv) + 360) % 360)), f:r.tempF, h:r.rh})) : [];
  return `<svg class="camspark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="max-width:100%"
      data-pts="${esc(JSON.stringify(pts))}" data-wind="${esc(JSON.stringify(wpts))}"
      data-plot="${padT},${H-padB}">
    ${gr}
    <line class="camcross" x1="0" y1="${padT}" x2="0" y2="${H-padB}" stroke="var(--amber)" stroke-width="1" opacity="0"/>
    <path d="${path}" fill="none" stroke="var(--vfr)" stroke-width="1.6"/>
    ${dots}${wind}
    <text x="${W-2}" y="${Y(last.vis)-4}" text-anchor="end" font-size="9.5" fill="var(--vfr)" font-family="IBM Plex Mono">${visTxt(last.vis)}sm</text>
    <text x="${padL}" y="${H-3}" font-size="9" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(t0)}</text>
    <text x="${W-padR}" y="${H-3}" text-anchor="end" font-size="9" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(t1)}</text>
  </svg>`;
}
function camDetailHTML(c){
  const d = (state.cams||{})[c.id];
  if(!d || d.failed) return '<div class="camdet" style="color:var(--mut)">nothing loaded for this site</div>';
  const hist = d.hist || [];
  const lo = hist.length ? Math.min(...hist.map(r=>r.vis)) : null;
  const hi = hist.length ? Math.max(...hist.map(r=>r.vis)) : null;
  const crowd = hist.filter(r=>r.crowd).length;
  const lowConf = hist.filter(r=>r.conf !== null && r.conf < 60).length;
  const bearings = d.cams.map(x=>x.bearing).filter(x=>x!==null).map(x=>Math.round(x)+'\u00b0').join(', ');
  const facts = [
    hist.length ? `${hist.length} readings, ${visTxt(lo)} to ${visTxt(hi)} sm` : 'no usable readings',
    d.droppedRows ? `${d.droppedRows} dropped, no camera update` : null,
    crowd ? `${crowd} crowdsourced` : null,
    lowConf ? `${lowConf} under 60% confidence` : null,
    bearings ? `cameras facing ${bearings}` : null,
    d.site.magVar !== null ? `variation ${d.site.magVar.toFixed(1)}\u00b0E` : null,
    d.advLatest ? `weather feed, last ${fmtLZ(d.advLatest.t)}` : 'no weather feed at this site',
  ].filter(Boolean);
  return `<div class="camdet">
    ${camSpark(d, 400, 96)}
    <div style="color:var(--mut);font-size:10.5px;line-height:1.5;margin-top:2px">
      Green is estimated visibility, blue dashed is wind where the site reports it. Gaps are periods with no usable reading.<br>${facts.join(' \u00b7 ')}
    </div></div>`;
}
/* Hover readout on the trend chart. The dots already carry a <title>, but a native tooltip
   only fires on the dot itself, which is a 2px target, and it cannot show the wind sample
   alongside. This snaps to the nearest reading anywhere along the width. */
let camTipEl = null;
function camTip(){
  if(!camTipEl){
    camTipEl = document.createElement('div');
    camTipEl.className = 'camtip';
    document.body.appendChild(camTipEl);
  }
  return camTipEl;
}
function camHoverMove(e){
  const svg = e.target.closest ? e.target.closest('svg.camspark') : null;
  if(!svg){ camHoverOut(); return; }
  let pts, wpts;
  try{ pts = JSON.parse(svg.dataset.pts || '[]'); wpts = JSON.parse(svg.dataset.wind || '[]'); }
  catch(err){ return; }
  if(!pts.length) return;
  const box = svg.getBoundingClientRect();
  const vw = svg.viewBox.baseVal.width || box.width;
  const mx = (e.clientX - box.left) * (vw / box.width);
  let best = pts[0], bd = Infinity;
  pts.forEach(p=>{ const d = Math.abs(p.x - mx); if(d < bd){ bd = d; best = p; } });
  let bw = null, bwd = Infinity;
  wpts.forEach(p=>{ const d = Math.abs(p.x - best.x); if(d < bwd){ bwd = d; bw = p; } });

  const cross = svg.querySelector('.camcross');
  if(cross){ cross.setAttribute('x1', best.x); cross.setAttribute('x2', best.x); cross.setAttribute('opacity', '.55'); }

  const rows = [
    `<b style="color:var(--vfr)">${visTxt(best.v)} sm</b>`,
    best.s ? `sky ${esc(best.s)}` : null,
    best.c !== null && best.c !== undefined ? `confidence ${Math.round(best.c)}%${best.c < 60 ? ' (low)' : ''}` : null,
    best.k ? '<span style="color:var(--amber)">crowdsourced</span>' : null,
    bw && bw.w !== null ? `wind ${bw.d !== null ? String(bw.d).padStart(3,'0') + '\u00b0M ' : 'VRB '}${Math.round(bw.w)} kt` : null,
    bw && bw.f !== null && bw.f !== undefined ? `${Math.round((bw.f-32)*5/9)}\u00b0C${bw.h !== null && bw.h !== undefined ? ', RH ' + Math.round(bw.h) + '%' : ''}` : null,
    `<span style="color:var(--mut)">${fmtLZ(best.t)} \u00b7 ${agoTxt(best.t/1000)}</span>`,
  ].filter(Boolean);
  const tip = camTip();
  tip.innerHTML = rows.join('<br>');
  tip.style.display = 'block';
  const tb = tip.getBoundingClientRect();
  let left = e.clientX + 14, top = e.clientY - tb.height - 12;
  if(left + tb.width > window.innerWidth - 8) left = e.clientX - tb.width - 14;
  if(top < 8) top = e.clientY + 16;
  tip.style.left = left + 'px';
  tip.style.top = top + 'px';
}
function camHoverOut(){
  if(camTipEl) camTipEl.style.display = 'none';
  document.querySelectorAll('#camWrap .camcross').forEach(l=>l.setAttribute('opacity','0'));
}
function renderCamSection(){
  const el = document.getElementById('camWrap');
  if(!el) return;
  const sites = veiaSites().slice().sort((a,b)=>a.name.localeCompare(b.name));
  el.innerHTML = sites.map(camRowHTML).join('');
  const loaded = sites.filter(c=>(state.cams||{})[c.id]).length;
  const wx = sites.filter(c=>{ const d=(state.cams||{})[c.id]; return d && d.advLatest; }).length;
  document.getElementById('camNote').textContent =
    `${loaded} of ${sites.length} loaded, ${wx} also reporting weather. ` +
    (loaded < sites.length ? 'Press load all sites for the rest. ' : '') +
    (state.camStat && state.camStat.at ? 'Refreshed ' + fmtLZ(state.camStat.at) + ' with the board. ' : '') +
    'Advisory only, not certified observations.';
}
async function loadAllCams(){
  const btn = document.getElementById('camLoad');
  setCamAll(true);   // remembered, so a refresh does not drop back to the on-field 15
  const todo = veiaSites().filter(c=>!(state.cams||{})[c.id]);
  if(!todo.length){ renderCamSection(); return; }
  btn.disabled = true;
  let done = 0;
  state.cams = state.cams || {};
  // four at a time, the same restraint the one-time sweep used
  const worker = async () => {
    while(todo.length){
      const c = todo.shift();
      if(!c) return;
      try{ state.cams[c.id] = parseCam(await camFetch(c.id)); }
      catch(e){ state.cams[c.id] = {failed:true}; }
      done++;
      btn.textContent = `loading ${done}...`;
      if(done % 4 === 0) renderCamSection();
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  btn.disabled = false;
  camBtnLabel();
  renderCamSection();
}
function camLineHTML(icao){
  // the on-field camera has its own VEIA row above, so this line is the nearby ones only
  const own = STATION_CAM[icao];
  const ties = camSiteList().filter(c=>c.affects.includes(icao) && c.id !== own);
  if(!ties.length) return null;
  const bits = ties.map(c=>{
    const d = (state.cams||{})[c.id];
    const link = `<a href="${CAM_LINK(c.id)}" target="_blank" class="camlink">${c.name} \u2197</a>`;
    if(!d || d.failed) return link;
    if(!d.veia) return link + ` <span style="color:var(--mut);font-size:10.5px">${d.night?'night':d.stale?'stale':'no read'}</span>`;
    return link + ' ' + cv(visTxt(d.veia.vis)+'sm', visBand(d.veia.vis)) +
      (d.veia.sky ? ` <span style="color:var(--mut)">${esc(d.veia.sky)}</span>` : '');
  });
  return bits.join(' &nbsp;') + ' <span style="color:var(--mut);font-size:10.5px">(nearby FAA cameras, advisory only)</span>';
}

/* ===== Synoptic 5-minute AWOS feed (the source behind the AAWU/WRH obs map) =====
   Paste your free token from synopticdata.com below and the true 5-min layer goes live. */
const SYNOPTIC_TOKEN = '12f03c90a7d34308bfd1e3684b57f1ca';
const SYN_VARS = ['air_temp','dew_point_temperature','wind_speed','wind_direction','wind_gust',
  'visibility','altimeter','ceiling','relative_humidity','weather_cond_code',
  'cloud_layer_1_code','cloud_layer_2_code','cloud_layer_3_code'].join(',');
const SYN_URL = () => 'https://api.synopticdata.com/v2/stations/timeseries?stid=' +
  STATIONS.filter(st=>!st.noMetar).map(st=>st.icao).join(',') +
  '&vars=' + SYN_VARS +
  '&recent=95&units=english&obtimezone=UTC&token=' + SYNOPTIC_TOKEN;
/* ================= IEM one-minute ASOS =================
   NOAA-funded, no token, no expiry. Only full ASOS sites produce one-minute data, so in our
   network that is Juneau, Sitka, Ketchikan and Yakutat; the AWOS fields have no such product
   and keep their METAR and SPECI.

   Deliberately narrow on what it feeds the board. Wind, temperature, dewpoint and altimeter
   are taken straight from the file. Visibility is NOT: the one-minute dataset carries an
   extinction coefficient rather than a distance, and converting that involves an assumed
   contrast threshold. A wrong visibility on a dispatch board is worse than a slow one, so
   visibility and ceiling continue to come from the METAR. */
const ASOS1_STATIONS = ['PAJN', 'PASI', 'PAKT', 'PAYA'];
function asos1Url(){
  const end = new Date(), start = new Date(end.getTime() - 75*60000);
  const iso = d => d.toISOString().slice(0,16) + 'Z';
  return 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos1min.py?'
    + ASOS1_STATIONS.map(s2=>'station=' + s2).join('&')
    + '&vars=tmpf&vars=dwpf&vars=sknt&vars=drct&vars=gust_sknt&vars=pres1'
    + '&sts=' + iso(start) + '&ets=' + iso(end)
    + '&sample=1min&what=download&tz=UTC&format=comma';
}
function parseAsos1(text){
  const lines = String(text||'').trim().split('\n').filter(l=>l && !l.startsWith('#'));
  if(lines.length < 2) return [];
  const head = lines[0].split(',').map(h=>h.trim().toLowerCase());
  const ix = n => head.indexOf(n);
  const iStn = ix('station'), iT = ix('valid');
  if(iStn < 0 || iT < 0) return [];
  const num = v => { if(v === undefined) return null; const t = String(v).trim();
    if(!t || t === 'M' || t === 'null') return null; const n = parseFloat(t);
    return Number.isFinite(n) ? n : null; };
  const rows = [];
  for(let i = 1; i < lines.length; i++){
    const c = lines[i].split(',');
    const stn = String(c[iStn] || '').trim().toUpperCase();
    if(!stn) continue;
    const tF = num(c[ix('tmpf')]), dF = num(c[ix('dwpf')]);
    const pres = num(c[ix('pres1')]);      // altimeter, inches of mercury
    const kt = num(c[ix('sknt')]), dir = num(c[ix('drct')]), gst = num(c[ix('gust_sknt')]);
    rows.push({
      stn: stn.length === 3 ? 'P' + stn : stn,       // IEM may return the 3-letter id
      valid: String(c[iT] || '').trim().replace(' ', 'T') + 'Z',
      syn: true, oneMin: true,
      cig: null, vis: null, visRaw: null,             // see note above: never from this source
      wdir: (dir === null || (dir === 0 && (kt === 0 || kt === null))) ? null : Math.round(dir),
      sknt: kt === null ? 0 : Math.round(kt),
      gust: gst === null ? 0 : Math.round(gst),
      tmpc: tF === null ? null : Math.round((tF - 32) * 50/9) / 10,
      dwpc: dF === null ? null : Math.round((dF - 32) * 50/9) / 10,
      alti: pres === null ? null : Math.round(pres * 100) / 100,
      wx: [], metar: null,
    });
  }
  return rows.filter(r=>r.sknt !== null || r.tmpc !== null);
}
function parseSyn(j){
  if(!j || !j.STATION) return [];
  const rows = [];
  j.STATION.forEach(st=>{
    const ob = st.OBSERVATIONS || {};
    const key = pre => Object.keys(ob).find(k=>k.startsWith(pre));
    const times = ob.date_time || [];
    const g = (pre,i) => { const k = key(pre); return k && ob[k] ? ob[k][i] : null; };
    for(let i=0;i<times.length;i++){
      const tF = g('air_temp_set',i);
      /* dew_point_temperature_set_1 is only populated on the METAR minute; the _1d array is
         derived from temperature and humidity and is present at every interval. Prefer the
         reported value where it exists and fall back to the derived one. */
      const dRep = g('dew_point_temperature_set_1', i);
      const dF = (dRep !== null && dRep !== undefined) ? dRep : g('dew_point_temperature_set_1d', i);
      const wsMph = g('wind_speed_set',i), wgMph = g('wind_gust_set',i);
      const cigFt = g('ceiling_set',i);
      rows.push({
        stn: st.STID, valid: times[i], syn: true,
        cig: cigFt!==null && cigFt!==undefined ? Math.round(cigFt) : null,
        vis: (v=>v===null||v===undefined?null:v)(g('visibility_set',i)),
        wdir: (()=>{ const v = g('wind_direction_set',i), sp = g('wind_speed_set',i);
          if(v === null || v === undefined) return null;
          if(Math.round(v) === 0 && (sp === 0 || sp === null)) return null;   // calm, not 000 degrees
          return Math.round(v); })(),
        sknt: wsMph!==null && wsMph!==undefined ? Math.round(wsMph*0.868976) : 0,
        gust: wgMph!==null && wgMph!==undefined ? Math.round(wgMph*0.868976) : 0,
        tmpc: tF!==null && tF!==undefined ? Math.round((tF-32)*50/9)/10 : null,
        dwpc: dF!==null && dF!==undefined ? Math.round((dF-32)*50/9)/10 : null,
        alti: (v=>v===null||v===undefined?null:Math.round(v*100)/100)(g('altimeter_set',i)),
        wx: [], metar: null
      });
    }
  });
  return rows;
}
const NOTAM_ICAOS = ['PAJN','PAHN','PAGY','PAGS','PAOH','PAEL','PAGN','PAFE','PASI','PAKW','PAKT','PAPG','PAWG','PAHY','PAYA'];
// notams.aim.faa.gov/notamSearch/search is reCAPTCHA-gated and is no longer called; only the
// manual paste path still touches that source, and only by hand.
const NOTAM_DINS = 'https://www.notams.faa.gov/dinsQueryWeb/queryRetrievalMapAction.do?reportType=Report&formatType=ICAO&retrieveLocId=' + encodeURIComponent(NOTAM_ICAOS.join(' ')) + '&actionType=notamRetrievalByICAOs';
const NOTAM_FAC_MAP = (()=>{
  const m = {};
  STATIONS.forEach(st=>{ (st.iem||[]).forEach(id=>m[id]=st.icao); m[st.icao]=st.icao; });
  /* The NOTAM search answers with 3-letter FAA designators, not ICAO: HNS, HNH, AGN, AFE,
     SIT, JNU, PSG, WRG, KTN, YAK, GST, SGY, AKW. Confirmed against a live response Aug 7 2026. */
  Object.assign(m, {PSG:'PAPG', PAPG:'PAPG', WRG:'PAWG', PAWG:'PAWG', HYG:'PAHY', PAHY:'PAHY',
    YAK:'PAYA', PAYA:'PAYA', HNS:'PAHN', HNH:'PAOH', AGN:'PAGN', AFE:'PAFE', SIT:'PASI',
    JNU:'PAJN', KTN:'PAKT', GST:'PAGS', SGY:'PAGY', GYS:'PAGY', AKW:'PAKW', KLW:'PAKW',
    ELV:'PAEL', PEC:'PEC', TKE:'TKE'});
  return m;
})();
/* Both FAA NOTAM sources refuse a bare pass-through: the search endpoint is a form POST that
   a GET-shaped proxy strips, and DINS needs a session cookie before it will return anything.
   api/notam.js does the warm-up and sets browser headers; these just call it. */
/* The NOTAM route has to be found, not assumed. The delivered file is named
   aks-wx-brief-notam.js to match the project convention, so depending on whether it was
   renamed on commit the function can live at several paths. Probing them costs one request
   and removes an entire class of "it is deployed but 404" confusion. */
/* TFR list. The consumer accepts either a bare array or {tfrList:[...]}, then keeps the
   Alaska ones by state or by the ZAN centre. */
const TFR_URL = 'https://tfr.faa.gov/tfrapi/exportTfrList';
const NOTAM_ROUTES = ['/api/notam', '/api/aks-wx-brief-notam', '/api/notams'];
/* The FAA NOTAM API returns items[].properties.coreNOTAMData.notam with the fields already
   split out, so none of the DINS text-splitting applies. Shape is defensive because the FAA
   nests this differently between the classic API and the newer NMS service. */
/* The WeatherCams notices payload is undocumented, so this hunts for a location and a body
   of text rather than assuming a shape, the same approach that worked for the camera sites
   before their schema was known. */
function parseCamNotices(j){
  const out = {};
  const walk = o => {
    if(!o || typeof o !== 'object') return;
    if(Array.isArray(o)){ o.forEach(walk); return; }
    const k = Object.keys(o);
    const locK = k.find(x=>/^(icao|location|airport|siteIdentifier|designator)/i.test(x) && typeof o[x] === 'string');
    const txtK = k.find(x=>/(text|message|notam|description|body)/i.test(x) && typeof o[x] === 'string' && o[x].length > 12);
    if(locK && txtK){
      const loc = String(o[locK]).toUpperCase();
      const icao = NOTAM_FAC_MAP[loc] || (NOTAM_ICAOS.includes(loc) ? loc : null);
      if(icao){
        const txt = String(o[txtK]).replace(/\s+/g,' ').trim();
        (out[icao] = out[icao] || []).push({ raw: txt, cat: catNotam(txt) });
      }
    }
    k.forEach(x=>{ if(o[x] && typeof o[x] === 'object') walk(o[x]); });
  };
  walk(j);
  const rank = {closure:0, approach:1, airspace:2, wip:3, 'closed-other':4, surface:5, outage:6, other:7};
  Object.values(out).forEach(l=>l.sort((x,y)=>rank[x.cat]-rank[y.cat]));
  return out;
}
/* Parser for the FNS NOTAM Search response. The search itself is gated by a reCAPTCHA v3
   token minted in the browser, so it can never be called from a server. But the response is
   ordinary JSON, and a dispatcher can copy it out of DevTools in a few seconds. This turns
   that paste into real NOTAMs on the board rather than leaving the section empty until FAA
   API credentials arrive. Shape confirmed live Aug 7 2026: notamList[] carrying
   facilityDesignator, notamNumber, featureName, issueDate and the message text. */
function parseNotamSearch(input){
  let j = input;
  if(typeof input === 'string'){
    let t = input.trim();
    if(!t) throw new Error('nothing pasted');
    // DevTools sometimes copies with leading junk; find the first brace or bracket
    const i = Math.min(...['{','['].map(c=>{ const k = t.indexOf(c); return k < 0 ? Infinity : k; }));
    if(i > 0 && i !== Infinity) t = t.slice(i);
    try{ j = JSON.parse(t); }
    catch(e){ throw new Error('that is not valid JSON. Copy the Response tab contents, not the Preview tree.'); }
  }
  const list = Array.isArray(j) ? j
    : (j.notamList || (j.payload && j.payload.notamList) || (j.data && j.data.notamList) || []);
  if(!Array.isArray(list) || !list.length){
    throw new Error('no notamList in that JSON. Top-level keys were: ' + Object.keys(j||{}).join(', '));
  }

  /* The field holding the NOTAM body is not documented and varies between the ICAO and
     domestic formats, so rather than guess at names this picks the longest string on the
     record that is not a date, an identifier or a short code. On a real record that is
     always the message. Guessing names is what made the first version silently skip
     everything. */
  const NOT_TEXT = /^(facilityDesignator|notamNumber|featureName|issueDate|startDate|endDate|icaoId|airportName|status|type|id|keyword|classification)$/i;
  const looksLikeDate = v => /^\d{2}\/\d{2}\/\d{4}|^\d{4}-\d{2}-\d{2}|^\d{10}$/.test(v);
  function bodyOf(n){
    let best = '', bestKey = null;
    Object.keys(n).forEach(k=>{
      const v = n[k];
      if(typeof v !== 'string') return;
      if(NOT_TEXT.test(k)) return;
      const t = v.trim();
      if(t.length < 12 || looksLikeDate(t)) return;
      if(t.length > best.length){ best = t; bestKey = k; }
    });
    return {text: best, key: bestKey};
  }

  const out = {};
  let noText = 0, notOurs = 0;
  const keySeen = {};
  const sampleKeys = Object.keys(list[0] || {});
  list.forEach(n=>{
    const fac = String(n.facilityDesignator || n.icaoId || n.location || '').toUpperCase();
    const icao = NOTAM_FAC_MAP[fac] || (NOTAM_ICAOS.includes(fac) ? fac : null);
    const b = bodyOf(n);
    if(!b.text){ noText++; return; }
    if(b.key) keySeen[b.key] = (keySeen[b.key] || 0) + 1;
    if(!icao){ notOurs++; return; }
    const txt = b.text.replace(/\s+/g,' ').trim();
    const num = n.notamNumber ? '!' + fac + ' ' + n.notamNumber + ' ' : '';
    (out[icao] = out[icao] || []).push({
      raw: num + txt, cat: catNotam(txt), id: n.notamNumber || null,
      feature: n.featureName || null, issued: n.issueDate || null,
    });
  });
  const rank = {closure:0, approach:1, airspace:2, wip:3, 'closed-other':4, surface:5, outage:6, other:7};
  Object.values(out).forEach(l=>l.sort((x,y)=>rank[x.cat]-rank[y.cat]));
  const total = Object.values(out).reduce((a,l)=>a+l.length,0);

  if(!total){
    // say exactly what the records looked like, so a failure is one screenshot from fixed
    throw new Error(`Read ${list.length} records but produced nothing. ` +
      (noText === list.length
        ? 'No message text found on any record. Fields on the first record: ' + sampleKeys.join(', ')
        : `${notOurs} were for other airports, ${noText} had no message text. ` +
          'First record fields: ' + sampleKeys.join(', ')));
  }
  return { byIcao: out, total, skipped: notOurs + noText, count: list.length,
           textField: Object.keys(keySeen).sort((a,b)=>keySeen[b]-keySeen[a])[0] || null };
}
/* Second way in, for when DevTools is too much hassle: select the NOTAM list on the results
   page and paste the text. Every line starts with !FAC NUMBER, which is enough to split and
   attribute them without any JSON at all. */
function parseNotamText(txt){
  const t = String(txt||'').replace(/\r/g,'');
  const blocks = [...t.matchAll(/!([A-Z0-9]{3,4})\s+(\S+)\s+([\s\S]*?)(?=\n\s*!(?:[A-Z0-9]{3,4})\s+\S+\s|$)/g)];
  if(!blocks.length) throw new Error('no NOTAMs found. Lines should start with an exclamation mark, like !PAJN 08/012');
  const out = {};
  let notOurs = 0;
  blocks.forEach(m=>{
    const fac = m[1].toUpperCase();
    const icao = NOTAM_FAC_MAP[fac] || (NOTAM_ICAOS.includes(fac) ? fac : null);
    if(!icao){ notOurs++; return; }
    const body = (m[3]||'').replace(/\s+/g,' ').trim();
    if(!body) return;
    const raw = '!' + fac + ' ' + m[2] + ' ' + body;
    (out[icao] = out[icao] || []).push({ raw, cat: catNotam(body), id: m[2] });
  });
  const rank = {closure:0, approach:1, airspace:2, wip:3, 'closed-other':4, surface:5, outage:6, other:7};
  Object.values(out).forEach(l=>l.sort((x,y)=>rank[x.cat]-rank[y.cat]));
  const total = Object.values(out).reduce((a,l)=>a+l.length,0);
  if(!total) throw new Error(`Found ${blocks.length} NOTAMs but none were for our fields.`);
  return { byIcao: out, total, skipped: notOurs, count: blocks.length, textField: 'plain text' };
}
function parseNotamAny(input){
  const t = String(input||'').trim();
  if(!t) throw new Error('nothing pasted');
  // JSON if it looks like JSON, otherwise treat it as the copied results text
  if(t[0] === '{' || t[0] === '[' || /^\s*[\{\[]/.test(t)) return parseNotamSearch(t);
  if(/!\s?[A-Z0-9]{3,4}\s+\S+/.test(t)) return parseNotamText(t);
  return parseNotamSearch(t);
}
function saveNotamPaste(res){
  state.notams = res.byIcao;
  state.notamFetchOk = true;
  state.notamPastedAt = Date.now();
  state.notamDiag = `pasted from NOTAM Search, ${res.total} notams across ${Object.keys(res.byIcao).length} fields`;
  try{ localStorage.setItem('wxb_notams', JSON.stringify({at:state.notamPastedAt, byIcao:res.byIcao})); }catch(e){}
  if(window.lastPer){ renderWarn(); renderMaster(window.lastPer); }
}
function loadNotamPaste(){
  try{
    const j = JSON.parse(localStorage.getItem('wxb_notams') || 'null');
    if(!j || !j.byIcao) return false;
    // a day-old paste is worse than useless on a dispatch board, so let it expire
    if(Date.now() - j.at > 12*3600000) return false;
    state.notams = j.byIcao;
    state.notamPastedAt = j.at;
    state.notamFetchOk = true;
    state.notamDiag = 'pasted NOTAMs from ' + fmtLZ(j.at);
    return true;
  }catch(e){ return false; }
}
function openNotamPaste(){
  const md = document.getElementById('modal');
  md.innerHTML = `<h2>Paste NOTAMs <button class="close" id="mClose">Close</button></h2>
    <div style="font-size:12px;line-height:1.6;color:var(--ink);margin-bottom:8px">
      The FAA gates its NOTAM search with a reCAPTCHA token, so this board cannot fetch it directly.
      It takes about fifteen seconds to bring it across by hand:
      <ol style="margin:6px 0 0 18px;padding:0">
        <li>Open <a href="https://notams.aim.faa.gov/notamSearch/nsapp.html#/" target="_blank" class="camlink">FNS NOTAM Search \u2197</a> and run your location search.</li>
        <li>F12, Network tab, Fetch/XHR filter, then reload so a <b>search</b> row appears.</li>
        <li>Click <b>search</b>, open the <b>Response</b> tab, right-click the JSON and Copy.</li>
        <li>Paste it below.</li>
      </ol>
      <b style="color:var(--amber)">Or skip DevTools entirely:</b> on the results page just select the
      NOTAM list with the mouse, copy, and paste that here. Plain text works as well as the JSON.
    </div>
    <textarea id="notamPasteBox" spellcheck="false" style="width:100%;min-height:170px;font-family:var(--mono);font-size:11px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:9px"></textarea>
    <div style="display:flex;gap:9px;align-items:center;margin-top:9px;flex-wrap:wrap">
      <button id="notamPasteGo" style="font-size:11px;padding:4px 12px">load these NOTAMs</button>
      <button id="notamPasteClear" style="font-size:11px;padding:4px 12px">clear stored</button>
      <span id="notamPasteMsg" style="font-size:11px;color:var(--mut)">${state.notamPastedAt ? 'Currently holding a paste from ' + fmtLZ(state.notamPastedAt) : 'Nothing stored yet.'}</span>
    </div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  document.getElementById('notamPasteGo').addEventListener('click', ()=>{
    const msg = document.getElementById('notamPasteMsg');
    try{
      const res = parseNotamAny(document.getElementById('notamPasteBox').value);
      saveNotamPaste(res);
      msg.innerHTML = `<span style="color:var(--vfr)">Loaded ${res.total} NOTAMs from ${res.count} records` +
        (res.skipped ? `, ${res.skipped} skipped` : '') +
        (res.textField ? `, text read from "${esc(res.textField)}"` : '') + '.</span>';
    }catch(e){ msg.innerHTML = `<span style="color:var(--ifr)">${esc(e.message)}</span>`; }
  });
  document.getElementById('notamPasteClear').addEventListener('click', ()=>{
    try{ localStorage.removeItem('wxb_notams'); }catch(e){}
    state.notams = {}; state.notamPastedAt = null; state.notamFetchOk = null;
    document.getElementById('notamPasteMsg').textContent = 'Cleared.';
    if(window.lastPer){ renderWarn(); renderMaster(window.lastPer); }
  });
}
/* ================= NOTAMs via the NMS-API route =================
   api/notam.js fans out across the 15 flown-to stations server-side, dedupes and caches for
   ten minutes, so the client makes ONE call. The old code made 15 per-station calls and then
   validated every reply against the retired external-api.faa.gov envelope, which is why a
   working route still produced "none on file".

   Envelope: { ok, source:'NMS-API', host, count, byLocation, items, fetchedAt, diag }
   Each item is a GeoJSON Feature with the NOTAM at properties.coreNOTAMData.notam. */

/* effectiveEnd is an ISO stamp, the literal PERM, or a stamp with an EST suffix meaning the
   end time is an estimate rather than a commitment. Only a real stamp in the past expires. */
/* Category drives the closure banner, the red RWY chip and the sort order, so it runs on
   every NOTAM regardless of which source produced it. */
/* Categories drive the banner, the row chips and the sort order. The approach and WIP cases
   were previously falling through to "other" and showing no flag at all, which for an IFR
   operator is the wrong way round: a "PROCEDURE NA" line takes an approach away entirely and
   was ranked below a taxiway closure. */
function catNotam(t){
  const u = String(t||'').toUpperCase();
  if(/(RWY|RUNWAY)[^.]{0,40}CLSD|AD\s+CLSD|AP\s+CLSD|AERODROME\s+CLSD/.test(u)) return 'closure';

  // an approach withdrawn or amended, or the equipment that makes it usable
  if(/PROCEDURE\s+(NA|NOT\s+AUTH)|\bIAP\b|\bODP\b|\bSID\b|\bSTAR\b|MINIMUMS?\s+(RAISED|CHG|CHANGED|NA)|\bAMDT\b|\bDA\b\s*\/|\bMDA\b|CIRCLING\s+NA/.test(u)) return 'approach';
  if(/\b(ILS|LOC|LDA|GP|GS|VOR|DME|NDB|TACAN|RNAV|GPS|WAAS|LPV|LNAV)\b[^.]{0,40}(U\/S|UNSERVICEABLE|OTS|UNMON|NOT\s+MNT|UNUSBL)/.test(u)) return 'approach';
  if(/\b(REIL|MALSR|MALS|ALSF|ODALS|PAPI|VASI|APPROACH\s+LIGHT|RWY\s+END\s+ID\s+LGT|RCLL|TDZL)\b[^.]{0,40}(U\/S|UNSERVICEABLE|OTS|UNUSBL|OUT)/.test(u)) return 'approach';

  // hazards in the air rather than work on the field
  if(/\bAIRSPACE\b|\bUAS\b|UNMANNED\s+ACFT|AVALANCHE|BLASTING|AERIAL|PARACHUTE|LASER|FIREWORKS|ROCKET/.test(u)) return 'airspace';

  // work in progress: people, machinery and obstructions on or beside the movement area
  if(/\bWIP\b|WORK\s+IN\s+PROGRESS|\bCONST(R|RUCTION)?\b|MEN\s+AND\s+EQPT|MEN\/EQPT|\bCRANE\b|EXCAVAT|PAVING|PAVEMENT\s+MARKING|GRADING|SURVEY\s+EQPT/.test(u)) return 'wip';
  if(/\bOBST\b|OBSTRUCTION|\bTOWER\b[^.]{0,30}(LGT|LIGHT)/.test(u)) return 'wip';

  if(/FICON|BRAKING|SIR\b|SANDED|COMPACTED|SLUSH|\bICE\b/.test(u)) return 'surface';
  if(/U\/S|UNSERVICEABLE|OUT OF SERVICE|\bOTS\b|UNUSBL/.test(u)) return 'outage';
  if(/CLSD/.test(u)) return 'closed-other';
  return 'other';
}
function notamEndsAt(v){
  if(v === null || v === undefined) return null;
  const t = String(v).trim().toUpperCase();
  if(!t || t === 'PERM' || t === 'PERMANENT' || t === 'UFN') return Infinity;
  const d = new Date(t.replace(/\s*EST$/,''));
  return isNaN(d.getTime()) ? Infinity : d.getTime();   // unparseable means keep it
}
function notamBody(n){
  if(n.text && String(n.text).trim()) return String(n.text).trim();
  // some records carry the readable version only in the translation block
  const tr = Array.isArray(n.notamTranslation) ? n.notamTranslation : [];
  const local = tr.find(x=>/LOCAL/i.test(x.type||'') && (x.simpleText||x.formattedText));
  const icao  = tr.find(x=>x.formattedText || x.simpleText);
  const pick  = local || icao;
  return pick ? String(pick.simpleText || pick.formattedText).trim() : '';
}
/* DOM and INTL frequently carry the same condition under different numbers, for example
   JNU 08/023 and A5713/26 both describing one REIL outage. Collapse them on the text and
   the effective window, keeping the domestic one because that is what a dispatcher reads. */
function notamDedupeKey(rec){
  let t = rec.body.toUpperCase().replace(/^!\s*/, '');
  const first = (t.match(/^([A-Z0-9]{3,4})\s+/) || [])[1];
  if(first && (NOTAM_FAC_MAP[first] || NOTAM_ICAOS.includes(first))) t = t.slice(first.length).trim();
  t = t.replace(/[^A-Z0-9]+/g,' ').trim();
  return t.slice(0, 90) + '|' + (rec.startMs || '') + '|' + (rec.endMs || '');
}
function parseNmsNotams(env){
  const items = Array.isArray(env.items) ? env.items
    : (Array.isArray(env.features) ? env.features : []);
  const out = {};
  const stats = {seen:0, cancelled:0, expired:0, noText:0, notOurs:0, deduped:0};
  const buckets = {};

  items.forEach(f=>{
    const props = (f && f.properties) || f || {};
    const n = (props.coreNOTAMData && props.coreNOTAMData.notam) || props.notam || props;
    if(!n || typeof n !== 'object') return;
    stats.seen++;

    // C is a cancellation of an earlier NOTAM, not a condition in its own right
    if(String(n.type||'').toUpperCase() === 'C'){ stats.cancelled++; return; }

    const endMs = notamEndsAt(n.effectiveEnd);
    if(endMs !== null && endMs < Date.now()){ stats.expired++; return; }

    const body = notamBody(n);
    if(!body){ stats.noText++; return; }

    const icaoRaw = String(n.icaoLocation || '').toUpperCase();
    const locRaw  = String(n.location || '').toUpperCase();
    const icao = (NOTAM_ICAOS.includes(icaoRaw) ? icaoRaw : null)
              || NOTAM_FAC_MAP[icaoRaw] || NOTAM_FAC_MAP[locRaw]
              || (NOTAM_ICAOS.includes(locRaw) ? locRaw : null);
    if(!icao){ stats.notOurs++; return; }

    const startMs = (()=>{ const d = new Date(n.effectiveStart); return isNaN(d.getTime()) ? null : d.getTime(); })();
    const num = n.number ? String(n.number) : (n.id ? String(n.id) : '');
    const rec = {
      raw: (num ? '!' + (locRaw || icao) + ' ' + num + ' ' : '') + body,
      body, cat: catNotam(body), id: num || null,
      cls: String(n.classification||'').toUpperCase(),
      startMs, endMs, perm: endMs === Infinity,
      feature: n.feature || null, issued: n.issued || null,
      qcode: String(n.selectionCode||'').toUpperCase() || null,
    };
    (buckets[icao] = buckets[icao] || []).push(rec);
  });

  Object.keys(buckets).forEach(icao=>{
    const byKey = new Map();
    buckets[icao].forEach(rec=>{
      const k = notamDedupeKey(rec);
      const prev = byKey.get(k);
      if(!prev){ byKey.set(k, rec); return; }
      stats.deduped++;
      // prefer the domestic wording over the ICAO-coded twin
      const score = r => (r.cls === 'DOM' ? 2 : r.cls === 'FDC' ? 1 : 0);
      if(score(rec) > score(prev)) byKey.set(k, rec);
    });
    const rank = {closure:0, approach:1, airspace:2, wip:3, 'closed-other':4, surface:5, outage:6, other:7};
    out[icao] = [...byKey.values()].sort((x,y)=>
      (rank[x.cat] - rank[y.cat]) ||
      ((x.cls === 'DOM' ? 0 : 1) - (y.cls === 'DOM' ? 0 : 1)) ||
      ((x.startMs||0) - (y.startMs||0)));
  });

  const total = Object.values(out).reduce((a,l)=>a+l.length,0);
  return { byIcao: out, total, stats };
}

async function notamRoute(){
  if(state.notamRoute) return state.notamRoute;
  const tried = [];
  for(const base of NOTAM_ROUTES){
    try{
      const r = await fetch(base);
      tried.push(base + ' ' + r.status);
      if(!r.ok) continue;
      const j = await r.json().catch(()=>null);
      // the NMS route answers with an envelope, not a raw body string
      if(j && (j.source || Array.isArray(j.items) || typeof j.ok === 'boolean')){
        state.notamRoute = base;
        state.notamRouteTried = tried.join(', ');
        return base;
      }
    }catch(e){ tried.push(base + ' err'); }
  }
  state.notamRouteTried = tried.join(', ');
  return null;
}
function loadNotams(){
  const nowT = Date.now();
  if(state.notamPastedAt && nowT - state.notamPastedAt < 12*3600000) return;  // a paste is in force
  if(state.lastNotamRun && nowT - state.lastNotamRun < 10*60*1000) return;
  state.lastNotamRun = nowT;
  state.notamFetchOk = null;

  notamRoute()
    .then(base=>{
      if(!base) return {__none:true};
      return fetch(base).then(r=>r.ok ? r.json() : {__http:r.status});
    })
    .catch(e=>({__err:String(e && e.message || e)}))
    .then(env=>{
      if(!env || env.__none){
        state.notamFetchOk = false;
        state.notamDiag = 'No NOTAM route answered. Tried ' + (state.notamRouteTried||'nothing') + '.';
      } else if(env.__http){
        state.notamFetchOk = false;
        state.notamDiag = 'NOTAM route returned HTTP ' + env.__http;
      } else if(env.__err){
        state.notamFetchOk = false;
        state.notamDiag = 'NOTAM route unreachable: ' + env.__err;
      } else if(env.ok === false){
        state.notamFetchOk = false;
        state.notamDiag = [env.error, env.diag].filter(Boolean).join(' \u00b7 ') || 'route reported a failure';
      } else {
        const res = parseNmsNotams(env);
        state.notams = res.byIcao;
        state.notamFetchOk = true;
        state.notamStats = res.stats;
        state.notamByLocation = env.byLocation || null;
        const s = res.stats;
        const extra = [
          s.cancelled ? s.cancelled + ' cancelled' : null,
          s.expired ? s.expired + ' expired' : null,
          s.deduped ? s.deduped + ' duplicates' : null,
          s.notOurs ? s.notOurs + ' other fields' : null,
        ].filter(Boolean).join(', ');
        state.notamDiag = `${env.source || 'NMS-API'}: ${res.total} active across ` +
          `${Object.keys(res.byIcao).length} fields, from ${env.count != null ? env.count : s.seen} records` +
          (extra ? ' (' + extra + ')' : '') +
          (env.host ? ' \u00b7 ' + env.host : '');
      }
      state.notamRouteDiag = state.notamDiag;
      if(window.lastPer){ renderWarn(); renderMaster(window.lastPer); }
    });
}
function parseDINS(html){
  const out = {};
  if(!html) return out;
  let blocks = [...html.matchAll(/<PRE>([\s\S]*?)<\/PRE>/gi)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  if(!blocks.length){
    // fallback: strip tags, split on bang-NOTAM starts
    const plain = html.replace(/<[^>]+>/g,'\n');
    blocks = [...plain.matchAll(/(![A-Z0-9]{3,4}\s[\s\S]*?)(?=\n\s*![A-Z0-9]{3,4}\s|$)/g)].map(m=>m[1].trim()).filter(b=>b.length>20 && b.length<1500);
  }
  const splitBlock = b => {
    const t = String(b).replace(/\r/g,'');
    // bang format: each NOTAM starts !XXXX and may wrap over several lines
    if(/^\s*![A-Z0-9]{3,4}\s/m.test(t)){
      return [...t.matchAll(/(![A-Z0-9]{3,4}\s[\s\S]*?)(?=\n\s*![A-Z0-9]{3,4}\s|$)/g)].map(m=>m[1].trim());
    }
    // ICAO format: each starts with a series number then NOTAMN/R/C
    if(/[A-Z]\d{3,4}\/\d{2}\s+NOTAM[NRC]/.test(t)){
      return [...t.matchAll(/([A-Z]\d{3,4}\/\d{2}\s+NOTAM[NRC][\s\S]*?)(?=\n\s*[A-Z]\d{3,4}\/\d{2}\s+NOTAM[NRC]|$)/g)].map(m=>m[1].trim());
    }
    // otherwise a blank line is the separator
    const parts = t.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
    return parts.length ? parts : [t.trim()];
  };
  blocks = blocks.flatMap(splitBlock);
  blocks.forEach(b=>{
    if(!b || b.length < 12) return;
    let icao = null;
    const a = b.match(/A\)\s*(PA[A-Z]{2})/);
    if(a) icao = a[1];
    if(!icao){ const any = b.match(/\b(PA[A-Z]{2})\b/); if(any && NOTAM_ICAOS.includes(any[1])) icao = any[1]; }
    if(!icao || !NOTAM_ICAOS.includes(icao)) return;
    (out[icao] = out[icao]||[]).push({raw:b.replace(/\s+/g,' ').trim(), cat:catNotam(b)});
  });
  const rank = {closure:0, approach:1, airspace:2, wip:3, 'closed-other':4, surface:5, outage:6, other:7};
  Object.values(out).forEach(l=>l.sort((x,y)=>rank[x.cat]-rank[y.cat]));
  return out;
}
/* TFR detail. The list endpoint returns a full record per TFR and the board was showing the
   first 160 characters of one field. Everything else is rendered here on click: the known
   fields formatted, dates in Z with local alongside, coordinates measured against the fields
   we serve, and anything unrecognised dumped verbatim so nothing is silently dropped. */
function tfrId(t){ return String(t.notam_id || t.id || t.notamId || '').trim(); }
function tfrKey(t, i){ return (tfrId(t) || ('tfr'+i)).replace(/[^A-Za-z0-9]/g,'_'); }
function tfrParts(t){
  const m = String(tfrId(t)).match(/(\d+)\s*\/\s*(\d+)/);
  return m ? {a:m[1], b:m[2]} : null;
}
function tfrLink(t){
  const p = tfrParts(t);
  return p ? `https://tfr.faa.gov/tfr3/?page=detail_${p.a}_${p.b}` : 'https://tfr.faa.gov/tfr3/?page=list';
}
/* The list endpoint only carries a one-line summary, so the actual restriction, its
   coordinates, altitudes and the controlling facility are all missing. The full NOTAM text
   is fetched on demand when a TFR is opened, and cached. */
function tfrFullText(t){
  const p = tfrParts(t);
  if(!p) return null;
  const key = p.a + '_' + p.b;
  const cache = (state.tfrText = state.tfrText || {});
  if(cache[key] !== undefined) return cache[key];
  cache[key] = null;                       // in flight, so it is fetched only once
  const urls = [
    `https://tfr.faa.gov/save_pages/detail_${p.a}_${p.b}.xml`,
    `https://tfr.faa.gov/tfr3/?page=detail_${p.a}_${p.b}`,
  ];
  const want = p.a + '/' + p.b;
  (async ()=>{
    /* The tfr3 detail page is a JavaScript app, so its HTML holds no NOTAM text, the same
       trap as the JAWS page. The NMS NOTAM feed does have it, but a centre-issued TFR is
       filed under its ARTCC (ZAN here) rather than any of our airports, so ask for that
       facility by name. This reuses a route that is already proven rather than guessing at
       another FAA endpoint. */
    const fac = String(t.facility || '').toUpperCase().replace(/[^A-Z]/g,'');
    if(fac && state.notamRoute){
      try{
        const r = await fetch(state.notamRoute + '?locations=' + encodeURIComponent(fac));
        const env = r.ok ? await r.json() : null;
        if(env && env.ok){
          const parsed = parseNmsNotams(env);
          let hit = null;
          Object.values(parsed.byIcao || {}).forEach(l=>(l||[]).forEach(n=>{
            if(!hit && String(n.id||'').replace(/\s/g,'') === want) hit = n;
          }));
          if(!hit && Array.isArray(env.items)){
            env.items.forEach(f=>{
              const n = f && f.properties && f.properties.coreNOTAMData && f.properties.coreNOTAMData.notam;
              if(!hit && n && String(n.number||'').replace(/\s/g,'') === want) hit = {raw:notamBody(n)};
            });
          }
          if(hit && hit.raw){ cache[key] = hit.raw; renderWarn(); return; }
        }
      }catch(e){}
    }
    for(const u of urls){
      try{
        const raw = await fetchText(u);
        if(!raw || raw.length < 60) continue;
        const flat = raw.replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<')
                        .replace(/&gt;/g,'>').replace(/&nbsp;/gi,' ').replace(/\s+/g,' ');
        // the traditional NOTAM runs from its !FDC or !ZAN marker to the effective window
        const m = flat.match(/(![A-Z]{3}\s+\d+\/\d+[\s\S]*?\d{10}\s*-\s*\d{10})/);
        const txt = m ? m[1].trim() : null;
        if(txt){ cache[key] = txt; renderWarn(); return; }
      }catch(e){}
    }
    cache[key] = false;                    // tried and could not get it
    renderWarn();
  })();
  return null;
}
/* A TFR is a NOTAM, so if the NMS feed already gave us that number we have the full text
   without another request. */
function tfrFromNotams(t){
  const p = tfrParts(t);
  if(!p) return null;
  const want = p.a + '/' + p.b;
  let hit = null;
  Object.values(state.notams || {}).forEach(list=>{
    (list||[]).forEach(n=>{ if(!hit && String(n.id||'').replace(/\s/g,'') === want) hit = n; });
  });
  return hit ? hit.raw : null;
}
function tfrDate(v){
  if(v === null || v === undefined || v === '') return null;
  // the feed sends "2026-08-12 14:33:00" with no zone; it is UTC, and reading it as local
  // shifted every displayed time by the local offset
  let t = String(v).trim();
  if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(t) && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(t))
    t = t.replace(' ', 'T') + 'Z';
  const d = new Date(t);
  if(isNaN(d.getTime())) return String(v);
  const z = String(d.getUTCDate()).padStart(2,'0') + String(d.getUTCHours()).padStart(2,'0')
          + String(d.getUTCMinutes()).padStart(2,'0') + 'Z';
  const mins = Math.round((d.getTime() - Date.now()) / 60000);
  const span = m => { const a = Math.abs(m); return a >= 60 ? Math.floor(a/60)+'h '+String(a%60).padStart(2,'0')+'m' : a+'m'; };
  const rel = mins > 0 ? 'in ' + span(mins) : span(mins) + ' ago';
  return `${z} <span style="color:var(--mut)">(${fmtLZ(d)} local \u00b7 ${rel})</span>`;
}
function tfrNear(t){
  const lat = parseFloat(t.latitude ?? t.lat ?? (t.coordinates && t.coordinates.lat));
  const lon = parseFloat(t.longitude ?? t.lon ?? t.lng ?? (t.coordinates && t.coordinates.lon));
  if(!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const R = 3440.065, r = Math.PI/180;
  const d = STATIONS.map(st=>{
    const dLat = (st.lat-lat)*r, dLon = (st.lon-lon)*r;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat*r)*Math.cos(st.lat*r)*Math.sin(dLon/2)**2;
    return {st, nm: 2*R*Math.asin(Math.min(1, Math.sqrt(a)))};
  }).sort((a,b)=>a.nm-b.nm);
  return {lat, lon, nearest:d[0], within:d.filter(x=>x.nm <= 100)};
}
const TFR_LABELS = {
  type:'Type', facility:'Facility', state:'State', description:'Description',
  notam_id:'NOTAM', creation_date:'Created', date_effective:'Effective', date_expire:'Expires',
  effective_start:'Effective', effective_end:'Expires', zTime:'Issued', altitude:'Altitude',
  min_alt:'Lower limit', max_alt:'Upper limit', radius:'Radius', reason:'Reason',
};
function tfrDetailHTML(t){
  const seen = new Set(['notam_id','id','notamId']);
  const rows = [];
  const push = (k, v) => {
    if(v === null || v === undefined || v === '' ) return;
    const label = TFR_LABELS[k] || k.replace(/[_-]/g,' ');
    const isDate = /date|time|eff|expir|start|end/i.test(k);
    const val = isDate ? (tfrDate(v) || esc(String(v))) : esc(String(v));
    rows.push(`<div class="tfrrow"><span class="tfrk">${esc(label)}</span><span class="tfrv">${val}</span></div>`);
  };
  ['type','reason','facility','state','date_effective','effective_start','date_expire','effective_end',
   'creation_date','zTime','altitude','min_alt','max_alt','radius'].forEach(k=>{
    if(k in t){ seen.add(k); push(k, t[k]); }
  });
  const desc = t.description || t.text || '';
  if(desc){
    seen.add('description'); seen.add('text');
    rows.push(`<div class="tfrrow"><span class="tfrk">Summary</span><span class="tfrv" style="white-space:pre-wrap">${esc(String(desc))}</span></div>`);
  }
  /* The restriction itself: from the NOTAM feed if we already hold it, otherwise fetched. */
  const full = tfrFromNotams(t) || tfrFullText(t);
  const cached = state.tfrText && tfrParts(t) ? state.tfrText[tfrParts(t).a + '_' + tfrParts(t).b] : undefined;
  if(full){
    rows.push(`<div class="tfrrow"><span class="tfrk">NOTAM text</span><span class="tfrv" style="white-space:pre-wrap">${esc(String(full))}</span></div>`);
  } else if(cached === false){
    rows.push(`<div class="tfrrow"><span class="tfrk">NOTAM text</span><span class="tfrv" style="color:var(--mut)">The FAA blocked the request for the full text. Open the detail page below.</span></div>`);
  } else {
    rows.push(`<div class="tfrrow"><span class="tfrk">NOTAM text</span><span class="tfrv" style="color:var(--mut)">loading the full restriction\u2026</span></div>`);
  }
  const near = tfrNear(t);
  if(near){
    seen.add('latitude'); seen.add('longitude'); seen.add('lat'); seen.add('lon'); seen.add('lng');
    const list = near.within.length
      ? near.within.slice(0,4).map(x=>`${x.st.name} ${Math.round(x.nm)} nm`).join(', ')
      : `nearest is ${near.nearest.st.name} at ${Math.round(near.nearest.nm)} nm, well outside the area`;
    rows.push(`<div class="tfrrow"><span class="tfrk">Position</span><span class="tfrv">${near.lat.toFixed(3)}, ${near.lon.toFixed(3)} \u00b7 ${esc(list)}</span></div>`);
  }
  const rest = Object.keys(t).filter(k=>!seen.has(k) && t[k] !== null && t[k] !== '' && typeof t[k] !== 'object');
  const extra = rest.length
    ? `<details style="margin-top:5px"><summary style="cursor:pointer;color:var(--mut);font-size:10.5px">everything else in the record (${rest.length})</summary>
       ${rest.map(k=>`<div class="tfrrow"><span class="tfrk">${esc(k)}</span><span class="tfrv">${esc(String(t[k]))}</span></div>`).join('')}</details>`
    : '';
  return `<div class="tfrdet">${rows.join('')}${extra}
    <div style="margin-top:6px"><a href="${tfrLink(t)}" target="_blank" class="camlink">full TFR on tfr.faa.gov \u2197</a></div></div>`;
}
/* ================= JAWS turbulence alerts =================
   The Juneau Airport Wind System runs anemometers and wind profilers around the Gastineau
   Channel and generates a turbulence alert per sector every minute. Two things matter for
   how this is presented:

   1. The alert thresholds are tuned for a Boeing 737. Everything we fly is far lighter, so a
      MODERATE alert for a 737 is not a moderate day in a Beaver or a 206. The board says so
      rather than letting "moderate" read as mild.
   2. The Gastineau sectors are the downtown departure corridor. SEVERE there is the case the
      DO called out: no downtown departures at all.

   The FAA's own disclaimer is blunt that this is research-grade data provided as available,
   so it is advisory here and never gates anything automatically. */
const JAWS_URLS = [
  'https://www.weather.gov/source/ajk/JAWS/allData.json',
  'https://www.weather.gov/source/ajk/jaws/allData.json',
  'https://pajk.arh.noaa.gov/jaws/jaws.php',
  'https://www.weather.gov/source/ajk/jaws/jaws.php',
  'https://w2.weather.gov/ajk/JAWS',
];
const JAWS_SITES = [
  {key:'08A 26D',  label:'RWY 08 arrival, 26 departure', downtown:false},
  {key:'LMNCREEK', label:'Lemon Creek',                  downtown:false},
  {key:'DOWNWIND', label:'Downwind leg',                 downtown:false},
  {key:'GAST S-2', label:'Gastineau Channel, sfc to 2,000 ft', downtown:true},
  {key:'GAST 2-6', label:'Gastineau Channel, 2,000 to 6,000 ft', downtown:true},
  {key:'8HIGH',    label:'RWY 8 high sector',            downtown:false},
];
const JAWS_RANK = {NONE:0, LGT:1, LIGHT:1, MOD:2, MODERATE:2, SEV:3, SEVERE:3};
const JAWS_MAX_AGE_MIN = 30;

function jawsNormalise(v){
  const t = String(v||'').toUpperCase().replace(/[^A-Z]/g,'');
  if(!t) return null;
  if(t.startsWith('SEV')) return 'SEVERE';
  if(t.startsWith('MOD')) return 'MODERATE';
  if(t.startsWith('LGT') || t.startsWith('LIGHT')) return 'LIGHT';
  if(t.startsWith('NON')) return 'NONE';
  if(t.startsWith('NA') || t.startsWith('MISS') || t.startsWith('OUT')) return 'NO DATA';
  return null;
}
/* Reads whatever comes off that page. The first version anchored on my six hardcoded sector
   names and threw everything away if one did not match, which is exactly what a copied table
   will do: a unicode hyphen in "GAST S-2", a level on the following line, or a label the FAA
   has since reworded. This tries three shapes, keeps sectors it does not recognise instead of
   discarding them, and when it genuinely finds nothing it reports what it actually saw. */
function parseJAWS(input){
  const raw = String(input||'')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')                     // table cells become their own lines
    .replace(/[{}\[\]"']/g, ' ')                    // so raw JSON reads as "GAST S-2 : NONE"
    .replace(/,/g, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[\u2010-\u2015\u2212]/g, '-')        // unicode dashes to a plain hyphen
    .replace(/[\u00a0\u2007\u202f]/g, ' ');
  const lines = raw.split(/[\r\n]+/).map(x=>x.trim()).filter(Boolean);
  const norm = t => String(t).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const known = new Map(JAWS_SITES.map(x=>[norm(x.key), x.key]));
  const LEVEL = '(?:NONE|LIGHT|LGT|MODERATE|MOD|SEVERE|SEV|N\\/A|NA|MISSING|MISG|OUT|OTS)';
  const out = {}, extra = [];
  const take = (label, lvlTxt) => {
    const lvl = jawsNormalise(lvlTxt);
    if(!lvl) return false;
    const key = known.get(norm(label));
    if(key) out[key] = lvl;
    else if(label && label.trim().length <= 20 && /[A-Z0-9]/i.test(label)
             && lvl !== 'NO DATA' && !/^\d+\s*(ft|feet)$/i.test(label.trim()))
      extra.push({key:label.trim(), lvl});
    return true;
  };

  // label and level on the same line
  lines.forEach(ln=>{
    const m = ln.match(new RegExp('^(.{2,20}?)[\\s:|\\t]+(' + LEVEL + ')\\b', 'i'));
    if(m) take(m[1], m[2]);
  });

  // label on one line, level on the next, which is what a copied HTML table often gives
  if(!Object.keys(out).length){
    for(let i = 0; i < lines.length - 1; i++){
      if(known.get(norm(lines[i])) && jawsNormalise(lines[i+1])) take(lines[i], lines[i+1]);
    }
  }

  // sweep the whole blob for anything the line passes missed, without overwriting them
  {
    const flat = raw.replace(/\s+/g, ' ');
    JAWS_SITES.forEach(site=>{
      if(out[site.key]) return;
      const pat = site.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*');
      const m = flat.match(new RegExp(pat + '\\s*[:|]?\\s*(' + LEVEL + ')\\b', 'i'));
      if(m) take(site.key, m[1]);
    });
  }

  const found = Object.keys(out).length + extra.length;
  if(!found){
    const seen = lines.slice(0, 8).join(' | ').slice(0, 200);
    throw new Error('No sectors recognised. What was pasted began: "' + (seen || '(empty)') +
      '". Expect a line like "GAST S-2  NONE". If the table came across empty, the page draws ' +
      'it with JavaScript, so copy the rendered table rather than the page source.');
  }
  return Object.assign({levels:out, extra, found, at:Date.now()}, parseJawsTables(input));
}
/* ---- The rest of the JAWS page ----
   allData.json carries four tables and until now only the turbulence sectors were read. The
   other three are the useful part for us: ridge-top wind at Eaglecrest, Mt Roberts and Sheep
   Mtn, the runway head and cross components, and a profiler wind profile from 600 ft to
   5,800 ft at three points across the channel. Everything on that page is already MAGNETIC
   and in knots, so nothing here applies the 19 degree variation the METAR path uses. */
function jawsCell(t){
  const v = String(t||'').trim().toUpperCase();
  if(/^CALM$/.test(v)) return {calm:true, dir:null, spd:0};
  const m = v.match(/^(\d{3}|VRB)\s*\/\s*(\d{1,3})$/);
  if(m) return {calm:false, dir:m[1] === 'VRB' ? null : +m[1], spd:+m[2]};
  return null;                       // NA / NA and anything else means no reading
}
function parseJawsTables(input){
  const raw = String(input||'')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(td|th|tr|p|div|table)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/[\u00a0\u2007\u202f]/g, ' ');
  const lines = raw.split(/[\r\n]+/).map(x=>x.replace(/[ \t]+/g,' ').trim()).filter(Boolean);
  const anemos = [], runways = [], profilers = [];
  let obsTime = null;

  lines.forEach(ln=>{
    let m;
    /* Anemometer: name, elevation, time, average direction and speed, peak, temperature.
       "Runway 08" and "Runway 26" are station names here, distinct from the runway wind
       table below, which is why this is matched before the profiler rows. */
    if((m = ln.match(/^([A-Za-z][A-Za-z0-9 .'\-]{1,18}?)\s+(\d{1,5})\s*ft\s+(\d{1,2}:\d{2})\s+(CALM|VRB|NA|\d{3})(?:\s*\/\s*(\d{1,3}))?\s+(\d{1,3}|NA)\s+(-?\d{1,3}|NA)\b/i))){
      obsTime = obsTime || m[3];
      anemos.push({name:m[1].trim(), elev:+m[2], time:m[3],
        dir: /^\d{3}$/.test(m[4]) ? +m[4] : null,
        calm: /^CALM$/i.test(m[4]),
        spd: m[5] !== undefined ? +m[5] : (/^CALM$/i.test(m[4]) ? 0 : null),
        peak: /^\d+$/.test(m[6]) ? +m[6] : null,
        tempF: /^-?\d+$/.test(m[7]) ? +m[7] : null});
      return;
    }
    // Profiler: an altitude then one cell per site
    if((m = ln.match(/^(\d{3,5})\s*ft\b(.*)$/i))){
      const cells = (m[2].match(/CALM|NA\s*\/\s*NA|(?:\d{3}|VRB)\s*\/\s*\d{1,3}/gi) || []);
      if(cells.length >= 2){
        profilers.push({elev:+m[1], cells:cells.map(jawsCell)});
        return;
      }
    }
    // Runway winds: runway, head component, cross component
    if((m = ln.match(/^(0?\d|[12]\d|3[0-6])\s+(-?\d{1,3})\s+(-?\d{1,3})\s*$/))){
      runways.push({rwy:m[1].padStart(2,'0'), head:+m[2], cross:+m[3]});
      return;
    }
  });
  return {anemos, runways, profilers, obsTime};
}
function jawsSpdClass(sp){
  if(sp === null || sp === undefined) return '';
  if(sp >= 34) return 'sev';
  if(sp >= 22) return 'mod';
  return '';
}
function jawsTablesHTML(which){
  const j = state.jaws;
  if(!j) return '';
  const A = j.anemos || [], R = j.runways || [], P = j.profilers || [];
  if(!A.length && !R.length && !P.length) return '';
  let html = '';

  if(A.length && which !== 'prof'){
    /* Peak against average is the useful column here: Sheep Mtn averaging 9 with a peak of
       17 is a gust factor of nearly two, which is the ridge working even when the mean looks
       benign. Flagged when the spread is 8 knots or more. */
    html += `<div class="jawsblk"><div class="jawsblkh">Anemometers${j.obsTime?` <span>${esc(j.obsTime)}Z</span>`:''}</div>
      <table class="jawstab"><thead><tr><th>Station</th><th>Elev</th><th>Wind</th><th>Peak</th><th>Temp</th></tr></thead><tbody>`
      + A.map(a=>{
        const gust = (a.peak !== null && a.spd !== null && a.peak - a.spd >= 8);
        const wind = a.calm ? '<span style="color:var(--vfr)">calm</span>'
          : (a.spd === null ? '<span style="color:var(--mut)">no data</span>'
            : `${a.dir !== null ? String(a.dir).padStart(3,'0') + '\u00b0M' : 'VRB'} <b class="${jawsSpdClass(a.spd)}">${a.spd}</b> kt`);
        return `<tr><td>${esc(a.name)}</td><td class="num">${a.elev.toLocaleString()} ft</td>`
          + `<td>${wind}</td>`
          + `<td class="num ${jawsSpdClass(a.peak)}">${a.peak !== null ? a.peak : '\u2014'}`
          + `${gust?' <span class="jgust" title="Peak is well above the average, so the air is gusty at this site">gusty</span>':''}</td>`
          + `<td class="num">${a.tempF !== null ? a.tempF + '\u00b0F' : '\u2014'}</td></tr>`;
      }).join('') + '</tbody></table></div>';
  }

  if(R.length && which !== 'prof'){
    /* A negative head wind is a tailwind, and the company ceiling is 10 knots, so it is
       spelled out rather than left as a minus sign to interpret. */
    html += `<div class="jawsblk"><div class="jawsblkh">Runway components</div>
      <table class="jawstab"><thead><tr><th>Runway</th><th>Head or tail</th><th>Cross</th></tr></thead><tbody>`
      + R.map(r=>{
        const tail = r.head < 0;
        const mag = Math.abs(r.head);
        const overTail = tail && mag > 10;
        const overX = Math.abs(r.cross) >= 15;
        return `<tr><td><b>RWY ${esc(r.rwy)}</b></td>`
          + `<td class="${overTail?'sev':(tail?'mod':'')}">${mag} kt ${tail?'tail':'head'}`
          + `${overTail?' <span class="jgust" style="border-color:var(--ifr);color:var(--ifr)">over the 10 kt limit</span>':''}</td>`
          + `<td class="num ${overX?'sev':''}">${Math.abs(r.cross)} kt</td></tr>`;
      }).join('') + '</tbody></table>'
      + '<div class="jawsnote">Components as computed by JAWS from the field wind. Crosswind red at or over the 15 kt FRAT limit.</div></div>';
  }

  if(P.length && which === 'prof'){
    const sites = (j.profilerSites && j.profilerSites.length) ? j.profilerSites
      : ['North Douglas', 'Lemon Creek', 'South Douglas'];
    const n = Math.max(...P.map(r=>r.cells.length));
    /* Fourteen levels stacked in one column made the section very tall, so the ladder is cut
       in half and the two halves sit side by side: upper levels left, lower right. */
    const sorted = P.slice().sort((a,b)=>b.elev-a.elev);
    const half = Math.ceil(sorted.length / 2);
    const chunk = rows => `<table class="jawstab prof"><thead><tr><th>Elev</th>`
      + sites.slice(0, n).map(x=>`<th>${esc(x)}</th>`).join('') + '</tr></thead><tbody>'
      + rows.map(row=>`<tr><td class="num">${row.elev.toLocaleString()} ft</td>`
          + Array.from({length:n}, (_,i)=>{
            const c = row.cells[i];
            if(!c) return '<td class="num" style="color:#3d4d5f">\u2014</td>';
            if(c.calm) return '<td class="num" style="color:var(--vfr)">calm</td>';
            return `<td class="num ${jawsSpdClass(c.spd)}">${c.dir !== null ? String(c.dir).padStart(3,'0') : 'VRB'} / ${String(c.spd).padStart(2,'0')}</td>`;
          }).join('') + '</tr>').join('')
      + '</tbody></table>';
    html += `<div class="jawsblk jawsprofblk"><div class="jawsblkh">Profiler wind, surface to ${sorted[0].elev.toLocaleString()} ft</div>
      <div class="profsplit">${chunk(sorted.slice(half))}${chunk(sorted.slice(0, half))}</div>`
      + '<div class="jawsnote">Direction magnetic, speed knots, elevations MSL. Amber at 22 kt, red at 34 kt.</div></div>';
  }
  return html;
}
/* ================= NWS watches, warnings and advisories =================
   api.weather.gov publishes every active alert as GeoJSON, CORS open and no key. This is the
   non-aviation side of the picture: dense fog advisories, heat, wind, winter storm, small
   craft and gale. A TAF says what the airport will do; these say what the NWS has decided is
   worth warning the public about, which is often the first sign of something the TAF has not
   caught up with yet.

   Filtering is geometric where possible: an alert carrying a polygon is kept only if it
   overlaps the operating area, reusing the same polygon-versus-rectangle test the AIRMET
   filter uses. Zone-only alerts have no geometry, so those fall back to matching the area
   description against Southeast place names. */
const NWS_ALERTS_URL = 'https://api.weather.gov/alerts/active?area=AK';
const SE_NAMES = ['juneau','douglas','haines','skagway','gustavus','hoonah','elfin','pelican',
  'tenakee','angoon','kake','sitka','petersburg','wrangell','ketchikan','klawock','craig',
  'yakutat','glacier bay','icy strait','lynn canal','chatham','frederick sound','stephens passage',
  'clarence strait','sumner strait','cross sound','taku','chilkat','admiralty','baranof','chichagof',
  'kupreanof','mitkof','revilla','prince of wales','panhandle','southeast alaska','inner channels',
  'gastineau','eaglecrest','mendenhall','mendenhaven','salisbury','lisianski','peril strait',
  'dixon entrance','auke','berners','thane','lemon creek','salmon creek','herbert','eagle river',
  'excursion','funter','bartlett','hollis','naukati','saxman','metlakatla','kasaan','thorne bay',
  'coffman','hydaburg','meyers chuck','port alexander','warm springs','le conte','thomas bay',
  'farragut','whitney','zarembo','etolin','behm','misty fjord','hyder','ward cove','herring cove',
  'shelter island','funter bay','tenakee','game creek','whitestone','freshwater bay','sitkoh'];
/* Only fold a TFR away when we can positively place it somewhere else. These are the
   interior and southcentral names that keep turning up on the statewide feed. */
const NOT_SE_NAMES = ['fairbanks','anchorage','gulkana','glennallen','nenana','clear','healy',
  'denali','cantwell','talkeetna','wasilla','palmer','willow','tok','delta junction','northway',
  'valdez','cordova','whittier','girdwood','seward','kenai','soldotna','homer','kodiak',
  'king salmon','dillingham','bethel','aniak','mcgrath','galena','nome','kotzebue','barrow',
  'utqiagvik','deadhorse','prudhoe','bettles','fort yukon','unalaska','dutch harbor','adak',
  'st paul','chitina','mccarthy','paxson','big lake','trapper creek','anderson','eielson',
  'elmendorf','fort wainwright','fort greely','yakataga','iliamna','naknek','bristol bay'];
const NWS_SEV = {Extreme:4, Severe:3, Moderate:2, Minor:1, Unknown:0};

function alertTouchesArea(p, geom){
  // a polygon is authoritative, so use it when the alert carries one
  if(geom && geom.type && geom.coordinates){
    const rings = geom.type === 'Polygon' ? [geom.coordinates[0]]
      : geom.type === 'MultiPolygon' ? geom.coordinates.map(x=>x[0]) : [];
    for(const ring of rings){
      if(!Array.isArray(ring) || !ring.length) continue;
      let loMin = 999, loMax = -999, laMin = 999, laMax = -999;
      ring.forEach(pt=>{
        if(!Array.isArray(pt) || pt.length < 2) return;
        const lon = +pt[0], lat = +pt[1];      // GeoJSON is [lon, lat]
        if(!Number.isFinite(lon) || !Number.isFinite(lat)) return;
        if(lon < loMin) loMin = lon; if(lon > loMax) loMax = lon;
        if(lat < laMin) laMin = lat; if(lat > laMax) laMax = lat;
      });
      if(loMin > loMax) continue;
      // bounding boxes overlapping is enough to keep a warning; erring wide is the safe way
      if(loMax >= BBOX.lonMin && loMin <= BBOX.lonMax && laMax >= BBOX.latMin && laMin <= BBOX.latMax)
        return true;
    }
    if(rings.length) return false;
  }
  const hay = String((p && p.areaDesc) || '').toLowerCase();
  return SE_NAMES.some(n=>hay.includes(n));
}
function parseNwsAlerts(j){
  const feats = (j && (j.features || j.items)) || [];
  const out = [];
  feats.forEach(f=>{
    const p = (f && f.properties) || {};
    if(!p.event) return;
    if(!alertTouchesArea(p, f.geometry)) return;
    const ends = p.ends || p.expires || null;
    if(ends && new Date(ends).getTime() < Date.now()) return;      // already done
    out.push({
      id: p.id || f.id || null,
      event: String(p.event).trim(),
      severity: p.severity || 'Unknown',
      urgency: p.urgency || null,
      certainty: p.certainty || null,
      headline: (p.headline || '').trim(),
      desc: (p.description || '').trim(),
      instruction: (p.instruction || '').trim(),
      area: (p.areaDesc || '').trim(),
      onset: p.onset || p.effective || null,
      ends,
      sender: p.senderName || null,
      stations: STATIONS.filter(st=>String(p.areaDesc||'').toLowerCase()
        .includes(st.name.toLowerCase().split(' ')[0])).map(st=>st.icao),
    });
  });
  const rank = a => (NWS_SEV[a.severity] || 0);
  out.sort((a,b)=>rank(b) - rank(a) || a.event.localeCompare(b.event));
  return out;
}
function nwsSevClass(sev){
  const r = NWS_SEV[sev] || 0;
  return r >= 3 ? 'sev' : r === 2 ? 'mod' : 'lo';
}
function nwsTime(v){
  if(!v) return '';
  const d = new Date(v);
  if(isNaN(d.getTime())) return String(v);
  const mins = Math.round((d.getTime() - Date.now())/60000), n = Math.abs(mins);
  const sp = n >= 1440 ? Math.floor(n/1440)+'d ' + Math.floor((n%1440)/60)+'h'
           : n >= 60 ? Math.floor(n/60)+'h '+String(n%60).padStart(2,'0')+'m' : n+'m';
  return `${fmtLZ(d)} (${mins > 0 ? 'in ' + sp : sp + ' ago'})`;
}
function renderNws(){
  const el = document.getElementById('nwsWrap');
  if(!el) return;
  const list = state.nws || null;
  const note = document.getElementById('nwsNote');
  if(!list){
    el.innerHTML = '<div style="color:var(--mut);font-size:11.5px">' + (state.nwsDiag ? esc(state.nwsDiag) : 'loading\u2026') + '</div>';
    const n0 = document.getElementById('jawsNote');
    if(n0) n0.textContent = '';
    return;
  }
  if(!list.length){
    el.innerHTML = '<div style="color:var(--vfr);font-size:11.5px">Nothing active for Southeast Alaska.</div>';
    if(note) note.textContent = state.nwsAt ? 'checked ' + fmtLZ(state.nwsAt) : '';
    return;
  }
  el.innerHTML = list.map((a,i)=>{
    const open = (state.nwsOpen||{})[a.id || i];
    const cls = nwsSevClass(a.severity);
    const stns = a.stations.length ? `<span class="nwsstn">${a.stations.join(' ')}</span>` : '';
    let body = '';
    if(open){
      const rows = [
        a.headline ? ['Headline', a.headline] : null,
        ['Severity', `${a.severity}${a.urgency ? ', ' + a.urgency : ''}${a.certainty ? ', ' + a.certainty : ''}`],
        ['Area', a.area],
        a.onset ? ['Starts', nwsTime(a.onset)] : null,
        a.ends ? ['Ends', nwsTime(a.ends)] : null,
        a.desc ? ['Details', a.desc] : null,
        a.instruction ? ['What to do', a.instruction] : null,
        a.sender ? ['Issued by', a.sender] : null,
      ].filter(Boolean);
      body = `<div class="tfrdet">` + rows.map(r=>
        `<div class="tfrrow"><span class="tfrk">${esc(r[0])}</span><span class="tfrv" style="white-space:pre-wrap">${esc(r[1])}</span></div>`
      ).join('') + '</div>';
    }
    return `<div class="nwsline ${cls}" data-nws="${esc(String(a.id || i))}">`
      + `<span class="nwssev">${esc(a.severity)}</span>`
      + `<b class="nwsev">${esc(a.event)}</b>`
      + `<span class="nwsarea">${esc(a.area.length > 70 ? a.area.slice(0,70) + '\u2026' : a.area)}</span>`
      + stns
      + `<span class="tfrexp">${open ? '\u25b2 less' : '\u25bc more'}</span></div>` + body;
  }).join('');
  const worst = list[0];
  if(note) note.textContent = `${list.length} active, worst ${worst.severity}`
    + (state.nwsAt ? ' \u00b7 checked ' + fmtLZ(state.nwsAt) : '');
}
function nwsNotify(){
  const list = state.nws || [];
  const bad = list.filter(a=>(NWS_SEV[a.severity] || 0) >= 3);
  if(!bad.length) return;
  const sig = bad.map(a=>a.id || a.event).join('|');
  if(state.nwsLastSig === sig) return;
  state.nwsLastSig = sig;
  state.alerts = state.alerts || [];
  bad.forEach(a=>state.alerts.unshift({t:Date.now(), icao:(a.stations[0] || 'PAJN'),
    name:'NWS ' + a.event, worse:true, better:false,
    msg:`${a.severity} ${a.event}: ${a.area.slice(0,70)}`}));
  flashTitle();
}
async function loadNws(){
  try{
    const r = await fetch(NWS_ALERTS_URL, {headers:{accept:'application/geo+json'}});
    if(!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    state.nws = parseNwsAlerts(j);
    state.nwsAt = Date.now();
    state.nwsDiag = null;
    renderNws(); nwsNotify();
    return true;
  }catch(e){
    // one retry through the proxy chain in case a network blocks api.weather.gov directly
    try{
      const t = await fetchText(NWS_ALERTS_URL);
      state.nws = parseNwsAlerts(JSON.parse(t));
      state.nwsAt = Date.now(); state.nwsDiag = null;
      renderNws(); nwsNotify();
      return true;
    }catch(e2){
      state.nwsDiag = 'Could not reach api.weather.gov (' + String(e.message || e).slice(0,60) + ')';
      renderNws();
      return false;
    }
  }
}
function jawsState(){
  const j = state.jaws;
  if(!j || !j.levels) return null;
  if(Date.now() - j.at > JAWS_MAX_AGE_MIN*60000) return {...j, stale:true};
  return j;
}
function jawsWorst(){
  const j = jawsState();
  if(!j) return null;
  let worst = 'NONE', worstRank = 0, hits = [], downtown = [];
  JAWS_SITES.forEach(site=>{
    const lvl = j.levels[site.key];
    if(!lvl || lvl === 'NO DATA') return;
    const r = JAWS_RANK[lvl] || 0;
    if(r > worstRank){ worstRank = r; worst = lvl; }
    if(r >= 2){ hits.push(site); if(site.downtown) downtown.push(site); }
  });
  (j.extra || []).forEach(x=>{
    const r = JAWS_RANK[x.lvl] || 0;
    if(r > worstRank){ worstRank = r; worst = x.lvl; }
    if(r >= 2) hits.push({key:x.key, label:x.key, downtown:false});
  });
  return {worst, rank:worstRank, hits, downtown, stale:!!j.stale, at:j.at};
}
function jawsBannerHTML(){
  const w = jawsWorst();
  if(!w || w.rank < 2) return '';
  const sev = w.rank >= 3;
  const names = w.hits.map(h=>esc(h.label)).join('; ');
  const lead = sev
    ? `SEVERE turbulence on JAWS. ${w.downtown.length ? 'Downtown departures are out.' : 'Treat Juneau departures as unsuitable until it eases.'}`
    : `Moderate turbulence on JAWS.`;
  const note = sev
    ? 'JAWS thresholds are set for a 737, so severe there is well beyond anything we operate.'
    : 'JAWS thresholds are set for a 737, so moderate there is worse than moderate in our aircraft.';
  return `<div class="jawsbanner ${sev?'sev':'mod'}">
    <b>\u26a0 ${lead}</b>
    <div class="jawssites">${names}</div>
    <div class="jawsnote">${note} Advisory only, not a dispatch authority.${w.stale ? ' Reading is over ' + JAWS_MAX_AGE_MIN + ' minutes old.' : ''}</div>
  </div>`;
}
function renderJaws(){
  const el = document.getElementById('jawsWrap');
  if(!el) return;
  const j = jawsState();
  const banner = document.getElementById('jawsBanner');
  if(banner) banner.innerHTML = jawsBannerHTML();
  if(!j){
    /* Previously this replaced the whole section with a one-line message, so the six sectors
       vanished entirely and there was no way to see that they were simply unread rather than
       quiet. The list always renders; only the levels go unknown. */
    el.innerHTML = '<div class="jawsblkh">Turbulence alerts <span>no reading loaded</span></div>'
      + '<div class="jawssecs">' + JAWS_SITES.map(site=>
          `<div class="jawsrow none"><span class="jawskey">${esc(site.key)}${site.downtown?'<span class="jawsdt" title="Gastineau Channel, the downtown departure corridor">DT</span>':''}</span>`
          + `<span class="jawslvl" style="color:var(--mut)">NO DATA</span>`
          + `<span class="jawslbl">${esc(site.label)}</span></div>`).join('')
      + '</div>'
      + `<div class="jawsnote" style="margin-top:7px">${state.jawsDiag ? esc(state.jawsDiag) + ' ' : ''}`
      + '<a href="https://www.weather.gov/ajk/JAWS" target="_blank" class="camlink">open JAWS \u2197</a>'
      + ' or use the paste button.</div>';
    const n0 = document.getElementById('jawsNote');
    if(n0) n0.textContent = '';
    return;
  }
  el.innerHTML = '<div class="jawsblkh" style="margin-top:2px">Turbulence alerts'
    + (j.at ? ` <span>${fmtLZ(j.at)}</span>` : '') + '</div>'
    + '<div class="jawssecs">' + JAWS_SITES.map(site=>{
    const lvl = j.levels[site.key] || 'NO DATA';
    const r = JAWS_RANK[lvl] || 0;
    const cls = r >= 3 ? 'sev' : r === 2 ? 'mod' : r === 1 ? 'lgt' : 'none';
    return `<div class="jawsrow ${cls}">
      <span class="jawskey">${esc(site.key)}${site.downtown?'<span class="jawsdt" title="Gastineau Channel, the downtown departure corridor">DT</span>':''}</span>
      <span class="jawslvl">${esc(lvl)}</span>
      <span class="jawslbl">${esc(site.label)}</span></div>`;
  }).join('')
   + (j.extra || []).map(x=>{
      const r = JAWS_RANK[x.lvl] || 0;
      const cls = r >= 3 ? 'sev' : r === 2 ? 'mod' : r === 1 ? 'lgt' : 'none';
      return `<div class="jawsrow ${cls}"><span class="jawskey">${esc(x.key)}</span>`
        + `<span class="jawslvl">${esc(x.lvl)}</span>`
        + `<span class="jawslbl">sector not in our list, shown as reported</span></div>`;
     }).join('')
   + '</div>'
   + `<div class="jawstabs">${jawsTablesHTML('top')}${jawsTablesHTML('prof')}</div>`
   + `<div class="jawsnote" style="margin-top:7px">${state.jawsDiag ? esc(state.jawsDiag) + ' \u00b7 ' : ''}Read ${fmtLZ(j.at)}${j.stale?', over '+JAWS_MAX_AGE_MIN+' minutes old':''}. `
   + `Alerts are computed for a 737; lighter aircraft feel the same air more. Advisory only.</div>`;
}
/* Notify on moderate or worse, using the same alert path as a weather change so it flashes
   the tab and lands in the alerts panel. */
function jawsNotify(){
  const w = jawsWorst();
  if(!w || w.rank < 2) return;
  const sig = w.worst + '|' + w.hits.map(h=>h.key).join(',');
  if(state.jawsLastSig === sig) return;      // only on a change, not every cycle
  state.jawsLastSig = sig;
  state.alerts = state.alerts || [];
  state.alerts.unshift({t:Date.now(), icao:'PAJN', name:'Juneau JAWS', worse:true, better:false,
    msg:`JAWS ${w.worst} turbulence: ${w.hits.map(h=>h.label).join('; ')}`
      + (w.rank >= 3 && w.downtown.length ? '. Downtown departures are out.' : '')});
  if(alertsAllowed('PAJN')) flashTitle();
}
/* The JAWS page draws its tables from allData.json, fetched by its own jQuery. Rather than
   hardcode a path that will move, find it the way the page does: pull the page, look for the
   reference, and follow it. Falls back to known candidates, then to the paste button. */
async function discoverJawsUrl(){
  if(state.jawsUrl) return state.jawsUrl;
  const page = 'https://www.weather.gov/ajk/JAWS';
  const find = t => { const m = String(t||'').match(/["']([^"']*allData\.json[^"']*)["']/i); return m ? m[1] : null; };
  let html = null;
  try{ html = await fetchText(page); }catch(e){}
  let hit = find(html);
  if(!hit && html){
    // the call lives in one of the page's own scripts rather than the markup
    const srcs = [...String(html).matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(x=>x[1])
      .filter(u=>!/jquery|bootstrap|analytics|gtag|googletag|dap\.js/i.test(u));
    for(const src of srcs.slice(0, 14)){
      try{
        const js = await fetchText(new URL(src, page).href);
        hit = find(js);
        if(hit) break;
      }catch(e){}
    }
  }
  if(hit){ try{ return (state.jawsUrl = new URL(hit, page).href); }catch(e){} }
  return null;
}
/* Shape of allData.json is unknown, so rather than assume key names this walks every object
   and pairs any sector-looking string with any level-looking string on the same object. */
/* The real allData.json shape, captured from the live feed 12 Aug 2026. Parsing it exactly
   beats inferring it: the generic walker had to guess which string was a sector and which was
   a level, and it could not tell the profiler's "ts" key from a site. Fields are all strings,
   with "NA" for a dead sensor, "CALM" in both direction and speed, "" for a missing peak, and
   elevations written "0600 ft". */
function jawsNum(v){
  const t = String(v == null ? '' : v).trim().toUpperCase();
  if(!t || t === 'NA' || t === 'CALM' || t === '--') return null;
  const n = parseInt(t, 10);
  return Number.isFinite(n) ? n : null;
}
function jawsIsCalm(v){ return String(v||'').trim().toUpperCase() === 'CALM'; }
function jawsElev(v){ const n = parseInt(String(v||'').replace(/[^\d]/g,''), 10); return Number.isFinite(n) ? n : null; }
function parseJawsExact(j){
  if(!j || typeof j !== 'object') return null;
  const alerts = j.jawsAlerts || j.jaws_alerts;
  const anem = j.anemometerData || j.anemometers;
  if(!Array.isArray(alerts) && !Array.isArray(anem)) return null;   // not this shape

  const levels = {}, extra = [];
  const norm = t => String(t).toUpperCase().replace(/[^A-Z0-9]/g,'');
  const known = new Map(JAWS_SITES.map(x=>[norm(x.key), x.key]));
  (alerts || []).forEach(a=>{
    const lvl = jawsNormalise(a && (a.turbulence != null ? a.turbulence : a.level));
    const nm = a && (a.alert || a.name || a.sector);
    if(!lvl || !nm) return;
    const key = known.get(norm(nm));
    if(key) levels[key] = lvl;
    else if(lvl !== 'NO DATA') extra.push({key:String(nm).trim(), lvl});
  });

  const anemos = (anem || []).map(a=>({
    name: String(a.station || '').trim(),
    elev: jawsElev(a.elevation),
    time: String(a.obTime || '').trim() || null,
    dir: jawsNum(a.windDir),
    calm: jawsIsCalm(a.windDir) || jawsIsCalm(a.windSpd),
    spd: jawsIsCalm(a.windSpd) ? 0 : jawsNum(a.windSpd),
    peak: jawsNum(a.peakSpd),
    tempF: jawsNum(a.temp),
  })).filter(x=>x.name);

  const runways = (j.runwayWindData || j.runwayWinds || []).map(r=>({
    rwy: String(r.runway || '').trim().padStart(2,'0'),
    head: jawsNum(r.headWind),
    cross: jawsNum(r.crossWind),
  })).filter(x=>x.rwy && x.head !== null);

  /* profilerWinds is an object of site name to array, with a "ts" string mixed in among the
     sites, so only the array values are treated as sites. The three arrays share the same
     elevation ladder, which is pivoted into one row per height. */
  const pw = j.profilerWinds || j.profilers || {};
  const siteKeys = Object.keys(pw).filter(k=>Array.isArray(pw[k]));
  const sitesPretty = siteKeys.map(k=>k.replace(/([a-z])([A-Z])/g, '$1 $2').trim());
  const byElev = new Map();
  siteKeys.forEach((k, idx)=>{
    pw[k].forEach(row=>{
      const e = jawsElev(row.elevation);
      if(e === null) return;
      if(!byElev.has(e)) byElev.set(e, {elev:e, cells:new Array(siteKeys.length).fill(null)});
      const calm = jawsIsCalm(row.windDir) || jawsIsCalm(row.windSpd);
      const spd = calm ? 0 : jawsNum(row.windSpd);
      const dir = calm ? null : jawsNum(row.windDir);
      byElev.get(e).cells[idx] = calm ? {calm:true, dir:null, spd:0}
        : (spd === null ? null : {calm:false, dir, spd});
    });
  });
  const profilers = [...byElev.values()];

  let at = Date.now();
  const tsm = String(j.ts || '').match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if(tsm) at = Date.UTC(+tsm[3], +tsm[1]-1, +tsm[2], +tsm[4], +tsm[5], +tsm[6]);

  return {levels, extra, found:Object.keys(levels).length + extra.length,
          at, anemos, runways, profilers, profilerSites:sitesPretty,
          obsTime: (anemos.find(a=>a.time) || {}).time || null};
}
function parseJawsJson(j){
  const exact = parseJawsExact(j);
  if(exact && exact.found) return exact;
  const out = {}, extra = [];
  const norm = t => String(t).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const known = new Map(JAWS_SITES.map(x=>[norm(x.key), x.key]));
  const walk = o => {
    if(!o || typeof o !== 'object') return;
    if(Array.isArray(o)){
      // a pair array such as ["GAST S-2","NONE"]
      if(o.length === 2 && typeof o[0] === 'string' && typeof o[1] === 'string'){
        const k = known.get(norm(o[0])), l = jawsNormalise(o[1]);
        if(k && l){ out[k] = l; return; }
      }
      o.forEach(walk); return;
    }
    // sector as the key, level as the value
    Object.keys(o).forEach(k=>{
      const key = known.get(norm(k));
      const lvl = typeof o[k] === 'string' ? jawsNormalise(o[k]) : null;
      if(key && lvl) out[key] = lvl;
    });
    const vals = Object.values(o).filter(v=>typeof v === 'string');
    let label = null, lvl = null;
    vals.forEach(v=>{
      const asLevel = jawsNormalise(v);
      if(asLevel && String(v).trim().length <= 12){ if(!lvl) lvl = asLevel; return; }
      if(!label && String(v).trim().length <= 20 && /[A-Z0-9]/i.test(v)) label = String(v).trim();
    });
    if(label && lvl){
      const key = known.get(norm(label));
      if(key){ out[key] = lvl; return walkKids(o); }
      /* allData.json also carries the anemometer table and the profiler height bins, and a
         null wind there normalises to NO DATA, which was filling the section with rows like
         "Center Field NO DATA" and "5800 ft NO DATA". An unrecognised entry is only worth
         showing if it is reporting an actual turbulence level and is not an altitude bin. */
      if(lvl !== 'NO DATA' && !/^\d+\s*(ft|feet)$/i.test(label) && !/\d{3,}/.test(label))
        extra.push({key:label, lvl});
    }
    walkKids(o);
  };
  const walkKids = o => Object.values(o).forEach(v=>{ if(v && typeof v === 'object') walk(v); });
  walk(j);
  const found = Object.keys(out).length + extra.length;
  if(!found) throw new Error('allData.json parsed but held no recognisable sectors');
  return {levels:out, extra, found, at:Date.now()};
}
async function loadJaws(){
  const tries = [];
  const found = await discoverJawsUrl();
  const urls = (found ? [found] : []).concat(JAWS_URLS);
  const grab = async u => {
    /* allData.json answers with Access-Control-Allow-Origin: *, so a plain fetch works and
       skips every proxy hop. The chain is still there for the candidates that need it. */
    try{
      const r = await fetch(u, {mode:'cors'});
      if(r.ok){ const t = await r.text(); if(t && t.length > 20) return t; }
    }catch(e){}
    return fetchText(u);
  };
  for(const u of urls){
    try{
      const txt = await grab(u);
      if(!txt || txt.length < 20){ tries.push(u.slice(-28) + ' empty'); continue; }
      let parsed = null;
      const t = txt.trim();
      state.jawsSample = t.slice(0, 220);
      if(t[0] === '{' || t[0] === '['){
        try{ parsed = parseJawsJson(JSON.parse(t)); }catch(e){ tries.push(u.slice(-28) + ' json: ' + e.message.slice(0,40)); }
      }
      if(!parsed) parsed = parseJAWS(txt);
      state.jaws = parsed;
      state.jawsUrl = u;
      state.jawsDiag = 'auto from ' + (u.length > 60 ? '\u2026' + u.slice(-55) : u);
      renderJaws(); jawsNotify();
      return true;
    }catch(e){ tries.push(u.slice(-28) + ' ' + String(e.message||e).slice(0,28)); }
  }
  state.jawsDiag = 'could not read JAWS (' + (tries.join('; ').slice(0,160) || 'no candidate answered') + ')'
    + (state.jawsSample ? '. Data began: ' + state.jawsSample.slice(0,110) : '') + '. Use paste.';
  renderJaws();
  return false;
}
/* A reference panel for JAWS. New dispatchers see six code names and a colour and have no way
   to know that GAST S-2 is the downtown departure corridor while LMNCREEK is not. Written out
   rather than embedding the UCAR diagrams: those are someone else's figures, they would go
   stale without us noticing, and the geography is what matters, not the picture. */
function openJawsInfo(){
  const md = document.getElementById('modal');
  const rows = [
    ['08A 26D', 'The runway 08 arrival and runway 26 departure corridor, off the southeast end of the field.'],
    ['LMNCREEK', 'Lemon Creek, north of the field along the valley.'],
    ['DOWNWIND', 'The downwind leg used by traffic circling to land.'],
    ['GAST S-2', 'Gastineau Channel, surface to 2,000 ft. This is the downtown departure corridor.'],
    ['GAST 2-6', 'Gastineau Channel, 2,000 to 6,000 ft. The upper part of the same corridor.'],
    ['8HIGH', 'The runway 8 climb sector above the field.'],
  ];
  md.innerHTML = `<h2>About JAWS <button class="close" id="mClose">Close</button></h2>
    <div style="font-size:12.5px;line-height:1.65;max-width:82ch">
      <p>The Juneau Airport Wind System is a network of anemometers on the ridges around the
      field, three wind profilers across the channel, and an algorithm that turns them into a
      turbulence alert per sector, updated about every minute. It was built for Juneau because
      the terrain here produces mountain wave and rotor that no single field observation shows.</p>

      <div class="jawsblkh" style="margin-top:10px">The six alert sectors</div>
      <table class="jawstab"><tbody>${rows.map(r=>
        `<tr><td style="white-space:nowrap"><b>${esc(r[0])}</b></td><td style="white-space:normal">${esc(r[1])}</td></tr>`).join('')}</tbody></table>

      <div class="jawsblkh" style="margin-top:12px">What the levels mean</div>
      <table class="jawstab"><tbody>
        <tr><td><b style="color:var(--vfr)">NONE</b></td><td style="white-space:normal">No turbulence alert for that sector.</td></tr>
        <tr><td><b style="color:var(--mvfr)">LIGHT</b></td><td style="white-space:normal">Detected but below the alerting threshold.</td></tr>
        <tr><td><b style="color:var(--amber)">MODERATE</b></td><td style="white-space:normal">Alerting. Expect a rough ride and consider the sector carefully.</td></tr>
        <tr><td><b style="color:var(--ifr)">SEVERE</b></td><td style="white-space:normal">Alerting strongly. On the Gastineau sectors this board calls downtown departures out.</td></tr>
      </tbody></table>

      <div class="jawsblkh" style="margin-top:12px">The part that matters most to us</div>
      <p style="color:var(--amber)">The thresholds are computed for a Boeing 737. Everything we
      fly is far lighter, so air that earns a MODERATE alert for a 737 is worse than moderate in
      a Beaver, a 206 or a Caravan. Read the level as a floor, not a ceiling.</p>

      <p style="color:var(--mut);font-size:11.5px">The FAA provides this as research-grade data
      on an as-available basis. It is advisory here: the board will raise a flag and can call a
      weather hold, but it never gates a decision on its own. Anemometer directions are already
      magnetic, so unlike the METAR path nothing here has variation applied.</p>

      <div style="margin-top:10px;display:flex;gap:14px;flex-wrap:wrap">
        <a href="https://www.weather.gov/ajk/JAWS" target="_blank" class="camlink">NWS Juneau JAWS page \u2197</a>
        <a href="https://ral.ucar.edu/solutions/products/juneau-airport-wind-system-jaws" target="_blank" class="camlink">UCAR background, sensor map and diagrams \u2197</a>
      </div>
    </div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
}
function openJawsPaste(){
  const md = document.getElementById('modal');
  md.innerHTML = `<h2>Paste JAWS <button class="close" id="mClose">Close</button></h2>
    <div style="font-size:12px;line-height:1.6;margin-bottom:8px">
      Open <a href="https://www.weather.gov/ajk/JAWS" target="_blank" class="camlink">JAWS \u2197</a>,
      select the turbulence alert table with the mouse, copy, and paste it below. The board reads
      lines like <code>GAST S-2&nbsp;&nbsp;NONE</code>.
    </div>
    <textarea id="jawsBox" spellcheck="false" style="width:100%;min-height:150px;font-family:var(--mono);font-size:11.5px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:9px"></textarea>
    <div style="display:flex;gap:9px;align-items:center;margin-top:9px;flex-wrap:wrap">
      <button id="jawsGo" style="font-size:11px;padding:4px 12px">load</button>
      <span id="jawsMsg" style="font-size:11px;color:var(--mut)">${state.jawsDiag ? esc(state.jawsDiag) : ''}</span>
    </div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  document.getElementById('jawsGo').addEventListener('click', ()=>{
    const msg = document.getElementById('jawsMsg');
    try{
      const txt = document.getElementById('jawsBox').value.trim();
      let parsed = null;
      if(txt[0] === '{' || txt[0] === '['){
        try{ parsed = parseJawsJson(JSON.parse(txt)); }catch(e){}
      }
      state.jaws = parsed || parseJAWS(txt);
      state.jawsDiag = 'pasted ' + fmtLZ(state.jaws.at);
      renderJaws(); jawsNotify();
      const w = jawsWorst();
      msg.innerHTML = `<span style="color:var(--vfr)">Loaded ${state.jaws.found} sectors, worst ${w?w.worst:'NONE'}.</span>`;
    }catch(e){ msg.innerHTML = `<span style="color:var(--ifr)">${esc(e.message)}</span>`; }
  });
}
function renderWarn(){
  const el = document.getElementById('warnbox');
  if(!el) return;
  const tfrs = state.tfrs || [];
  const closures = [];
  NOTAM_ICAOS.forEach(ic=>{
    (((state.notams||{})[ic])||[]).filter(n=>n.cat==='closure').forEach(n=>{
      const st = STATIONS.find(x=>x.icao===ic);
      closures.push({name:(st?st.name:ic), raw:n.raw});
    });
  });
  if(!tfrs.length && !closures.length){ el.innerHTML=''; return; }
  el.innerHTML = `<div style="border:1px solid var(--ifr);border-radius:8px;padding:8px 12px;margin:0 0 12px;background:rgba(226,87,75,.08)">
    <div style="font-family:var(--disp);font-weight:700;color:var(--ifr);letter-spacing:.5px;margin-bottom:3px">\u26a0 OPERATIONAL WARNINGS</div>
    ${(function(){
      /* Alaska is one FAA state code, so a firefighting TFR near Fairbanks arrives on the
         same feed as one over Juneau and reads just as loud. Anything whose nearest station
         is beyond the panhandle is folded into a single line unless asked for. */
      const NEAR_NM = 150;
      const withD = tfrs.map((t,i)=>{
        const n = tfrNear(t);
        if(n) return {t, i, nm:n.nearest.nm, near:n.nearest.nm <= NEAR_NM};
        const hay = [t.description, t.facility, t.state]
          .filter(Boolean).join(' ').toLowerCase();
        const named = SE_NAMES.some(x=>hay.includes(x));
        const elsewhere = !named && NOT_SE_NAMES.some(x=>hay.includes(x));
        return {t, i, nm:null, near: !elsewhere, byName:named, unplaced: !named && !elsewhere};
      });
      const near = withD.filter(x=>x.near), far = withD.filter(x=>!x.near);
      const line = x => {
        const k = tfrKey(x.t, x.i), open = (state.tfrOpen||{})[k];
        const d = String(x.t.description||'');
        const dist = x.nm !== null ? ` <span style="color:var(--mut)">${Math.round(x.nm)} nm</span>`
          : x.byName ? ' <span style="color:var(--mut)">named in the area</span>'
          : x.unplaced ? ' <span style="color:var(--amber)" title="This TFR carries no coordinates and its text names nowhere we recognise, so it is shown rather than filed away">location not given</span>' : '';
        return `<div class="tfrline" data-tfr="${k}"><b style="color:var(--ifr)">TFR ${esc(tfrId(x.t))}</b> ${esc(x.t.type||'')}${dist}${d?' \u2014 '+esc(open?'':(d.length>150?d.slice(0,150)+'\u2026':d)):''}<span class="tfrexp">${open?'\u25b2 less':'\u25bc more'}</span></div>`
          + (open ? tfrDetailHTML(x.t) : '');
      };
      let out = near.length
        ? `<div class="tfrgrp">Southeast Alaska, within ${NEAR_NM} nm of a station we serve</div>` + near.map(line).join('')
        : `<div class="tfrgrp">Southeast Alaska</div><div style="color:var(--mut);font-size:11.5px;padding:2px 4px">None within ${NEAR_NM} nm.</div>`;
      if(far.length){
        const showFar = state.tfrShowFar;
        out += `<div class="tfrgrp">Elsewhere in Alaska</div>`
          + `<div class="tfrline" data-tfr="FAR" style="color:var(--mut)">`
          + `${showFar ? '\u25b2 hide' : '\u25bc show'} ${far.length} TFR${far.length>1?'s':''} elsewhere in Alaska, `
          + `${(function(){
              const d = far.map(x=>x.nm).filter(x=>x !== null && Number.isFinite(x));
              return d.length ? Math.round(Math.min(...d)) + ' nm or more from the panhandle'
                              : 'outside the area';
            })()}</div>`;
        if(showFar) out += far.map(line).join('');
      }
      if(!near.length && !far.length) out = '<div style="color:var(--mut)">none</div>';
      return out;
    })()}
    ${closures.map((c,i)=>{
      const k = 'clo'+i, open = (state.tfrOpen||{})[k];
      return `<div class="tfrline" data-tfr="${k}"><b style="color:var(--ifr)">${esc(c.name)} CLOSURE</b> ${esc(open?'':(c.raw.length>170?c.raw.slice(0,170)+'\u2026':c.raw))}<span class="tfrexp">${open?'\u25b2 less':'\u25bc more'}</span></div>`
        + (open ? `<div class="tfrdet"><div class="tfrrow"><span class="tfrk">Full NOTAM</span><span class="tfrv" style="white-space:pre-wrap">${esc(c.raw)}</span></div></div>` : '');
    }).join('')}
  </div>`;
}
const TIDE_API = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
const FA_ZONES = {JB:'Lynn Canal and Glacier Bay', JC:'Central SE AK', JD:'Southern SE AK', JE:'Eastern Gulf Coast', JF:'SE AK Coastal Waters'};
function zoneQuadsTxt(zid){ return QUADS.filter(q=>(QUAD_ZONES[q]||[]).includes(zid)).join(', ') || 'offshore'; }
function zName(zid){ return FA_ZONES[zid] || zid; }
function zoneTowns(zid){
  const qs = QUADS.filter(q=>(QUAD_ZONES[q]||[]).includes(zid));
  const names = STATIONS.filter(st=>qs.includes(st.quad)).map(st=>st.name);
  return names.length ? names.join(', ') : 'offshore waters';
}
const BBOX = {latMin:54.0, latMax:60.5, lonMin:-140.2, lonMax:-129.0}; // west edge extended past Yakutat (139.66W)
const AWC = 'https://aviationweather.gov/api/data';
const IEM = 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py';
const WX_WORDS = {FG:'fog', BR:'mist', '-RA':'light rain', RA:'rain', '+RA':'heavy rain',
  '-SHRA':'light rain showers', SHRA:'rain showers', VCSH:'showers in the vicinity',
  '-DZ':'light drizzle', DZ:'drizzle', '-SN':'light snow', SN:'snow', '+SN':'heavy snow',
  FZRA:'freezing rain', FZDZ:'freezing drizzle', TS:'thunderstorms', GR:'hail', PL:'ice pellets', HZ:'haze', FU:'smoke',
  VCFG:'fog in the vicinity', MIFG:'shallow fog', BCFG:'patchy fog', PRFG:'partial fog', FZFG:'freezing fog',
  VCTS:'thunderstorms in the vicinity', SG:'snow grains', IC:'ice crystals', UP:'unknown precip', SQ:'squalls',
  BLSA:'blowing sand', SA:'sand', BLSN:'blowing snow', DU:'dust',
  TSRA:'thunderstorms and rain', '-TSRA':'thunderstorms and light rain', '+TSRA':'thunderstorms and heavy rain', TSSN:'thunderstorms and snow', CB:'cumulonimbus', TCU:'towering cumulus'};
const CAT_ORDER = {VFR:0, MVFR:1, IFR:2, LIFR:3};
/* highlight precip/mist tokens of interest in FA/AIRMET text (already-escaped input) */
function hlWx(html){
  // convective gets red, everything else amber
  html = html.replace(/(?<![A-Z>])([+-]?(?:TSRA|TSSN|TS(?!K)))(?![A-Z])|(?<![A-Z>])(CB|TCU)(?![A-Z])/g,
    m=>'<span style="background:var(--ifr);color:#0c1116;font-weight:700;border-radius:3px;padding:0 2px">'+m+'</span>');
  return html.replace(/(?<![A-Z>])([+-]?(?:SHSN|SHRA|FZRA|FZDZ|FZFG|BLSA|BLSN|RA|SN|DZ|BR|FG|HZ|FU|SA))(?![A-Z])/g,
    '<span style="background:rgba(242,169,59,.28);color:var(--amber);font-weight:700;border-radius:3px;padding:0 2px">$1</span>');
}
/* FRAT precip hierarchy: SHSN 8 > SHRA 5 > SN 3 > RA 1 */
function worstPrecip(wxSet){
  const toks = [...(wxSet||[])];
  const fam = pat => toks.find(t=>t.replace(/^[+-]/,'').startsWith(pat));
  let t;
  if((t = fam('SHSN'))) return {tok:t, pts:8, word:wxWord(t)};
  if((t = toks.find(x=>x.includes('FZRA')))) return {tok:t, pts:10, word:wxWord(t)};
  if((t = fam('SHRA'))) return {tok:t, pts:5, word:wxWord(t)};
  if((t = toks.find(x=>x.replace(/^[+-]/,'')==='SN'))) return {tok:t, pts:3, word:wxWord(t)};
  if((t = toks.find(x=>x.replace(/^[+-]/,'')==='RA'))) return {tok:t, pts:1, word:wxWord(t)};
  if((t = toks.find(x=>x.replace(/^[+-]/,'')==='DZ'))) return {tok:t, pts:0, word:wxWord(t)};
  return null;
}

/* External cutoff stations, per Wind/Weather Limits 05/04/2026. NDBC realtime2 text feeds. */
const EXT = [
  {id:'PRTA2', name:'Point Retreat', cutoff:45, affects:'Hoonah, Gustavus, Tenakee, Elfin Cove, Pelican, Excursion'},
  {id:'ERXA2', name:'Eldred Rock',  cutoff:60, affects:'Haines, Skagway', fallback:'EROA2'},
  {id:'CSXA2', name:'Cape Spencer', cutoff:40, affects:'Elfin Cove, Pelican', fallback:'CSPA2', eastCaution:30},
  {id:'GEXA2', name:'George Island',cutoff:25, affects:'Elfin Cove'},
  {id:'PAHY',  name:'Hydaburg',     cutoff:35, affects:'Klawock', src:'metar'},

  /* The rest of the Southeast marine network. These carry NO company cutoff: the five above
     are the ones the Wind/Weather Limits document names, and inventing thresholds for the
     others would put numbers on the board that no one signed. They are here for the channel
     wind picture, which previously had nothing between the fields. Station IDs and positions
     verified against NDBC station pages Aug 9 2026. */
  {id:'GPXA2', name:'Grave Point',    info:true, lat:58.062, lon:-134.051, where:'Stephens Passage at Taku'},
  {id:'PBPA2', name:'Point Bishop',   info:true, lat:58.203, lon:-134.148, where:'Taku Inlet mouth, Juneau'},
  {id:'FFIA2', name:'Five Fingers',   info:true, lat:57.270, lon:-133.631, where:'Frederick Sound at Stephens Passage'},
  {id:'CDXA2', name:'Cape Decision',  info:true, lat:56.001, lon:-134.136, where:'south Chatham Strait', fallback:'CDEA2'},
  {id:'LCNA2', name:'Lincoln Rock',   info:true, lat:56.058, lon:-132.690, where:'Clarence Strait north of Wrangell'},
  {id:'SPXA2', name:'Skowl Point',    info:true, lat:55.599, lon:-132.203, where:'Clarence Strait, east Prince of Wales'},
  {id:'GIXA2', name:'Guard Island',   info:true, lat:55.446, lon:-131.881, where:'Tongass Narrows, Ketchikan'},
  {id:'MRYA2', name:'Mary Island',    info:true, lat:55.099, lon:-131.182, where:'Revillagigedo Channel'},
  {id:'TPXA2', name:'Tree Point',     info:true, lat:54.802, lon:-130.934, where:'Revillagigedo Channel, south'},
];

/* Company wind/IFR limits, per Wind/Weather Limits doc updated 05/04/2026.
   Arcs: wind FROM f..t degrees, max = hard limit, appr = allowed up to this with mgmt approval. */
const GLOBAL_LIMITS = {tailwindMax:10, wsCease:50, floatWaterTemp:-7, wheelsTemp:-10};

/* Special instrument procedures (P9KA certificate), minimums extracted from the signed 8260s and Garmin charts.
   vis values numeric SM. verify:true = raster plate, read mins from the chart before trusting. */
const PROCS = {
  PAJN:{apps:[
      {name:'RNAV (GPS) Q RWY 08', line:'LP MDA', mda:780, hat:755, vis:{A:1, B:1.25, C:2}, note:'CAT A is RVR 5500'},
      {name:'RNAV (GPS) Q RWY 26', line:'LP MDA', mda:580, hat:557, vis:{A:1.375, B:1.625}},
      {name:'RNAV (GPS) T RWY 8 AMDT 1', line:'LNAV MDA', mda:1040, hat:1015, vis:{A:2, B:2, C:2}},
      {name:'LDA-Z RWY 8', line:'', mda:null, hat:null, vis:{}, verify:true, note:'plate is a scan, mins not machine-readable, verify from chart'}
    ], deps:[
      {name:'ALSEK FOUR', rwy:'8',  cig:1000, vis:3, note:'321 ft/NM 1000 to 3000'},
      {name:'ALSEK FOUR', rwy:'26', cig:600,  vis:2, note:'321 ft/NM to 3000, or standard with 595 ft/NM'},
      {name:'ROVZU FOUR', rwy:'8',  cig:1200, vis:3, note:'413 ft/NM 1200 to 3000'},
      {name:'ROVZU FOUR', rwy:'26', cig:600,  vis:2, note:'413 ft/NM to 3300, or standard with 595 ft/NM'},
      {name:'CHANL TWO',  rwy:'8',  cig:null, vis:1, note:'standard with 445 ft/NM to 1300, liftoff no later than 1800 ft prior to DER'}
    ]},
  PAHN:{apps:[{name:'RNAV (GPS) P RWY 26', line:'LP', mda:940, hat:911, vis:{A:2.5, B:2.5}}],
    deps:[{name:'ZAAYN ONE', rwy:'8', cig:null, vis:1, note:'standard with 507 ft/NM to 2600'}]},
  PAGS:{apps:[
      {name:'RNAV (GPS) RWY 29 (public)', line:'LP MDA', mda:420, hat:387, vis:{A:1, B:1, C:1.125}},
      {name:'RNAV (GPS) RWY 29 (public)', line:'LNAV MDA', mda:660, hat:627, vis:{A:1, B:1, C:1.75}},
      {name:'RNAV (GPS) RWY 29 (public)', line:'CIRCLING', mda:660, hat:624, vis:{A:1, B:1, C:2.75}, note:'CAT D 1200-3. Circling NA northeast of Rwy 11-29'},
      {name:'VOR RWY 29 (public)', line:'S-29 MDA', mda:1300, hat:1267, vis:{A:1.25, B:1.5, C:3}, note:'DME required. No local altimeter: use HNH/PAOH setting and add 60 ft to all MDAs. Straight-in Rwy 29 NA at night'}
    ], deps:[]},
  PAOH:{apps:[{name:'RNAV (GPS) M RWY 24', line:'LP', mda:940, hat:918, vis:{A:1.25, B:1.25}}],
    deps:[
      {name:'HOONAH ONE', rwy:'6',  cig:600,  vis:1.5, note:'556 ft/NM to 1200'},
      {name:'HOONAH ONE', rwy:'24', cig:1900, vis:2.5, note:'674 ft/NM to 2000'}
    ]},
  PAFE:{apps:[
      {name:'RNAV (GPS) M RWY 11', line:'LPV DA', mda:641, hat:475, vis:{A:1.375, B:1.375, C:1.375}},
      {name:'RNAV (GPS) M RWY 11', line:'LNAV MDA', mda:880, hat:714, vis:{A:1, B:1, C:2}},
      {name:'RNAV (GPS) RWY 11 (public)', line:'LNAV MDA', mda:1120, hat:954, vis:{A:1.25, B:1.5, C:3}, note:'No local altimeter: use Petersburg setting and add 100 ft to all MDAs. CAT D NA'}
    ], deps:[
      {name:'TIEEE ONE', rwy:'11', cig:300, vis:1, note:'490 ft/NM to 600'},
      {name:'TIEEE ONE', rwy:'29', cig:null, vis:1, note:'standard with 431 ft/NM to 1300'},
      {name:'KAKE ONE (public ODP)', rwy:'11', cig:600, vis:3, note:'274 ft/NM to 900'},
      {name:'KAKE ONE (public ODP)', rwy:'29', cig:500, vis:3, note:'395 ft/NM to 900'}
    ]},
  PASI:{apps:[
      {name:'RNAV (GPS) P RWY 11', line:'LPV DA', mda:284, hat:260, vis:{A:0.75, B:0.75, C:0.75}, note:'3/4 requires runway status verified, otherwise 1 SM'},
      {name:'RNAV (GPS) P RWY 11 (std missed climb)', line:'LPV DA', mda:374, hat:350, vis:{A:1, B:1, C:1}}
    ], deps:[]},
  PAKW:{apps:[
      {name:'RNAV (GPS) Z RWY 2 AMDT 1', line:'LPV DA (non-std climb)', mda:494, hat:437, vis:{A:1.25, B:1.25, C:1.25}},
      {name:'RNAV (GPS) Z RWY 2 AMDT 1', line:'LPV DA (std climb)', mda:1052, hat:995, vis:{A:4, B:4, C:4}},
      {name:'RNAV (GPS) Z RWY 2 AMDT 1', line:'LNAV/VNAV DA', mda:1172, hat:1115, vis:{A:4, B:4, C:4}}
    ], deps:[]},
  PAPG:{apps:[{name:'RNAV (GPS) N RWY 23', line:'LP MDA', mda:540, hat:431, vis:{A:1, B:1}}],
    deps:[
      {name:'XADZY ONE', rwy:'5',  cig:null, vis:1, note:'standard with 334 ft/NM to 4100'},
      {name:'XADZY ONE', rwy:'23', cig:null, vis:null, note:'NA, terrain'}
    ]},
  PAWG:{apps:[{name:'RNAV (GPS) P RWY 10', line:'LP MDA', mda:480, hat:453, vis:{A:1, B:1}}], deps:[]},
};

const LIMITS = {
  PAJN:{phones:'ASOS (907) 789-1243 / TWR (907) 586-7446', rwys:[80,260],
    float:[{f:0,t:360,max:30,appr:35}], c208:[{f:0,t:360,max:35,appr:40}], pc12:[{f:0,t:360,max:40}],
    dep:[{rwy:'8',vis:3,cig:1000,note:'remain visual to CGL'},{rwy:'26',vis:1,cig:null}], app:{vis:1,cig:780},
    notes:['Reference JAWS for turbulence awareness']},
  PAOH:{phones:'ASOS (907) 945-3687 / DOT (907) 945-3426', rwys:[60,240],
    float:[{f:340,t:110,max:10},{f:120,t:330,max:15}],
    c208:[{f:340,t:40,max:15},{f:50,t:110,max:20,appr:99},{f:120,t:330,max:30}],
    pc12:[{f:340,t:40,max:20},{f:50,t:110,max:25,appr:99},{f:120,t:330,max:35}],
    dep:[{rwy:'6',vis:1.5,cig:600},{rwy:'24',vis:2.5,cig:1900}], app:{vis:1.25,cig:940},
    notes:['Caution: strong northerly with ASOS calling variable','Point Retreat cutoff 45 kt']},
  PAGS:{phones:'ASOS (907) 697-2447 / DOT (907) 697-2251', rwys:[110,290],
    float:[{f:0,t:360,max:30}], c208:[{f:0,t:360,max:35}], pc12:[{f:0,t:360,max:40}],
    dep:[{rwy:'all',vis:1,cig:null}], app:{vis:1,cig:420},
    notes:['Point Retreat cutoff 45 kt']},
  PAHN:{phones:'ASOS (907) 766-2519 / DOT (907) 766-2340 / PD (907) 766-2121', rwys:[80,260],
    float:[{f:320,t:70,max:20},{f:80,t:310,max:30}],
    c208:[{f:320,t:70,max:20,appr:30},{f:80,t:310,max:40}],
    pc12:[{f:320,t:70,max:25,appr:35},{f:80,t:310,max:40}],
    dep:[{rwy:'all',vis:1,cig:null}], app:{vis:2.5,cig:940},
    notes:['Eldred Rock cutoff 60 kt']},
  PAGY:{phones:'ASOS (907) 983-3194 / DOT (907) 983-2323', rwys:[20,200],
    float:[{f:0,t:360,max:25,appr:30}], c208:[{f:0,t:360,max:30,appr:40}], pc12:[{f:0,t:360,max:30,appr:40}],
    dep:null, app:null,
    notes:['NO instrument approaches or departures','Eldred Rock cutoff 60 kt']},
  PAFE:{phones:'ASOS (907) 785-3124 / DOT J.Hanson (907) 723-3241', rwys:[110,290],
    float:[{f:330,t:50,max:10},{f:60,t:140,max:25},{f:150,t:230,max:10},{f:240,t:320,max:25}],
    c208:[{f:330,t:50,max:15},{f:60,t:140,max:25},{f:150,t:230,max:15},{f:240,t:320,max:25}],
    pc12:[{f:330,t:50,max:20},{f:60,t:140,max:30},{f:150,t:230,max:20},{f:240,t:320,max:30}],
    dep:[{rwy:'11',vis:1,cig:300},{rwy:'29',vis:1,cig:null}], app:{vis:1.375,cig:641}, notes:[]},
  PASI:{phones:'ASOS (907) 966-2209', rwys:[110,290],
    float:[{f:330,t:70,max:15},{f:80,t:140,max:25},{f:150,t:250,max:15},{f:260,t:320,max:25}],
    c208:[{f:330,t:70,max:30},{f:80,t:140,max:35},{f:150,t:250,max:30},{f:260,t:320,max:35}],
    pc12:[{f:330,t:70,max:35},{f:80,t:140,max:40},{f:150,t:250,max:35},{f:260,t:320,max:40}],
    dep:[{rwy:'all',vis:1,cig:null}], app:{vis:0.75,cig:284}, notes:[]},
  PAKW:{phones:'ASOS (907) 755-2641', rwys:[20,200],
    float:[{f:340,t:60,max:25},{f:70,t:150,max:15},{f:160,t:240,max:25},{f:250,t:330,max:15}],
    c208:[{f:340,t:60,max:25},{f:70,t:150,max:20},{f:160,t:240,max:25},{f:250,t:330,max:20}],
    pc12:[{f:340,t:60,max:30},{f:70,t:150,max:25},{f:160,t:240,max:30},{f:250,t:330,max:25}],
    dep:[{rwy:'20',vis:1,cig:null,note:'RWY 20 only. RWY 02 must stay VFR until clearance'}], app:{vis:1.25,cig:494},
    notes:['Hydaburg above 35 kt = cancel']},
  PAGN:{phones:'AWOS (907) 788-3120', rwys:null,
    float:[{f:360,t:70,max:25},{f:80,t:350,max:30}], c208:null, pc12:null,
    dep:null, app:null, notes:['Floats only']},
  PAEL:{phones:'no local wind info', rwys:null, float:null, c208:null, pc12:null, dep:null, app:null,
    notes:['Cape Spencer any direction above 40 kt = cancel','Cape Spencer 30 kt east = caution, expect down/updraft in cove','West wind: expect swell','George Island above 25 kt = cancel','Point Retreat cutoff 45 kt']},
  PAKT:{phones:'', rwys:[110,290], float:null, c208:null, pc12:null, dep:null, app:null,
    notes:['No company wind limits listed in Wind/Weather Limits doc']},
  TKE:{phones:'no local wind info', rwys:null,
    float:[{f:315,t:45,max:15},{f:46,t:314,max:null}], c208:null, pc12:null, dep:null, app:null,
    notes:['All floats: north wind above 15 kt','Use caution on the dock when wind is out of the south','Point Retreat cutoff 45 kt','No official weather, use cameras']},
  PEC:{phones:'no local wind info', rwys:null,
    float:[{f:0,t:360,max:null}], c208:null, pc12:null, dep:null, app:null,
    notes:['Cape Spencer reporting above 40 kt = cancel','Point Retreat cutoff 45 kt','No official weather, use cameras']},
};
LIMITS.PAPG = LIMITS.PAPG || {float:[], c208:[], pc12:[], notes:['No company wind limit table for this station; use aircraft limits and judgment']};
LIMITS.PAWG = LIMITS.PAWG || {float:[], c208:[], pc12:[], notes:['No company wind limit table for this station; use aircraft limits and judgment']};
LIMITS.PAYA = LIMITS.PAYA || {float:[], c208:[], pc12:[], notes:['No company wind limit table for this station; use aircraft limits and judgment']};


let state = {afd:null, metars:{}, metarHist:{}, tafs:{}, airmets:[], madis:{}, ext:{}, harbor:{}, fa:{zones:{}, synopsis:'', raw:''}, loadedAt:null, route:0, alerts:[], snapshot:null};
let autoTimer = null;
const TIPS = {};

/* ================= AAWU Area Forecast (FAAK47/FAAK57) ================= */
const AFOS = 'https://mesonet.agron.iastate.edu/cgi-bin/afos/retrieve.py';
async function fetchFA(pil, tgftp){
  try{
    const t = await fetchText(`${AFOS}?pil=${pil}&fmt=text`);
    if(t && t.includes('AIRMETS VALID')) return t;
    throw new Error('empty');
  }catch(e){
    return fetchText(tgftp).catch(()=>'' );
  }
}
/* Pull structured conditions out of FA/AIRMET prose: layers (MSL), CIGS BLW, VIS values, wx codes */
function condsFromText(text){
  const out = {minCig:null, minVis:null, visRaw:null, wx:new Set(), cigSnip:null, visSnip:null};
  const t = ' ' + (text||'') + ' ';
  // cloud layers: BKN015 OVC035 (hundreds of ft, MSL in FA)
  let m;
  const layerRe = /\b(BKN|OVC)(\d{3})(?:CB|TCU)?(?![A-Z])/g;
  while((m = layerRe.exec(t))){
    const ft = parseInt(m[2],10)*100;
    if(out.minCig===null || ft<out.minCig){ out.minCig = ft; out.cigSnip = m[0]; }
  }
  // CIGS BLW 010 style (AGL)
  const cigRe = /CIGS?\s+BLW\s+(\d{3})/g;
  while((m = cigRe.exec(t))){
    const ft = parseInt(m[1],10)*100;
    if(out.minCig===null || ft<out.minCig){ out.minCig = ft; out.cigSnip = m[0]; }
  }
  // VIS BLW 3SM / VIS 3-5SM / VIS 5SM
  const visRe = /VIS\s+(BLW\s+)?(\d+)(?:-(\d+))?SM/g;
  while((m = visRe.exec(t))){
    const v = parseInt(m[2],10);
    if(out.minVis===null || v<out.minVis){ out.minVis = v; out.visRaw = (m[1]?'<':'')+m[2]+(m[3]?'-'+m[3]:''); out.visSnip = m[0]; }
  }
  // wx tokens incl compounds like BR/FG and -SHRA
  const wxRe = /(?:^|[\s\/])([+-]?(?:SH|FZ|BC|MI|PR|VC|BL|DR)?(?:RA|SN|DZ|GR|PL|SG|IC|UP|BR|FG|HZ|FU|TS|SQ|SA|DU))(?=[\s\/.]|$)/g;
  while((m = wxRe.exec(t))) out.wx.add(m[1]);
  // thunderstorm compounds and convective clouds (TSRA, -TSRA, BKN050CB, TCU)
  const tsRe = /(?<![A-Z])([+-]?TS(?:RA|SN|GR|PL)?)(?![A-Z])/g;
  while((m = tsRe.exec(t))) out.wx.add(m[1]);
  if(/(?:\d|\s)CB(?![A-Z])/.test(t)) out.wx.add('CB');
  if(/(?:\d|\s)TCU(?![A-Z])/.test(t)) out.wx.add('TCU');
  return out;
}

function parseFA(text){
  const out = {zones:{}, synopsis:'', airmetsValid:null};
  if(!text) return out;
  const av = text.match(/AIRMETS VALID UNTIL (\d{6})/);
  if(av) out.airmetsValid = av[1];
  const chunks = text.split(/^\.\s*$/m);
  chunks.forEach(ch=>{
    const lines = ch.trim().split('\n').map(l=>l.trim()).filter(Boolean);
    if(!lines.length) return;
    if(lines[0].startsWith('SYNOPSIS VALID')){
      out.synopsis = lines.slice(1).join(' ');
      return;
    }
    const m = lines[0].match(/^(.+?)\s+(J[B-F])\.\.\.VALID UNTIL (\d{6})/);
    if(!m) return;
    const z = {id:m[2], name:FA_ZONES[m[2]]||m[1], validUntil:m[3], airmets:[], cloudsWx:[], passes:'', outlook:'', turb:[], ice:[], fzl:null};
    let sec = null;
    lines.slice(1).forEach(l=>{
      if(l.startsWith('...CLOUDS/WX')){ sec='wx'; return; }
      if(l.startsWith('...TURB')){ sec='turb'; return; }
      if(l.startsWith('...ICE')){ sec='ice'; return; }
      if(l.startsWith('OTLK VALID')){ z.outlook = l.replace('OTLK VALID ',''); sec='otlk'; return; }
      if(l.startsWith('PASSES')){ z.passes = l; sec=null; return; }
      if(l.includes('***AIRMET')){ z.airmets.push(l.replace(/\*+/g,' ').replace(/\s+/g,' ').trim()); const fz0 = l.match(/FZLVL\s+(\d{3})/); if(fz0) z.fzl = parseInt(fz0[1],10)*100; return; }
      const fz = l.match(/FZLVL\s+(\d{3})/);
      if(fz) z.fzl = parseInt(fz[1],10)*100;
      if(sec==='wx') z.cloudsWx.push(l);
      else if(sec==='turb') z.turb.push(l);
      else if(sec==='ice') z.ice.push(l);
      else if(sec==='otlk') z.outlook += ' ' + l;
    });
    out.zones[z.id] = z;
    z.validUntilDate = ddhhmmDate(z.validUntil);
    z.airmetConds = condsFromText(z.airmets.join(' '));
    z.lines = z.cloudsWx.map(l=>({text:l, ...lineWindow(l, z.validUntilDate), conds:condsFromText(l), scope:faScope(l)}));
    const c = condsFromText(z.cloudsWx.join(' ') + ' ' + z.airmets.join(' '));
    z.minCig = c.minCig; z.minVis = c.minVis; z.visRaw = c.visRaw; z.wxSet = c.wx; z.cigSnip = c.cigSnip; z.visSnip = c.visSnip;
  });
  return out;
}
/* Anchor an HHZ mention to a real date near now, bounded by the zone validity */
function zHourAnchor(hh, mm, validUntil){
  const now = new Date();
  let d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hh, mm||0));
  if(validUntil && d.getTime() > validUntil.getTime()) d = new Date(d.getTime() - 86400000);
  if(d.getTime() < now.getTime() - 20*3600000) d = new Date(d.getTime() + 86400000);
  return d;
}
/* TIL 18Z -> [null, 18Z]; AFT 21Z -> [21Z, validUntil]; none -> [null, validUntil] */
function lineWindow(line, validUntil){
  let m = line.match(/TIL (\d{2})(\d{2})?Z/);
  if(m) return {from:null, to:zHourAnchor(parseInt(m[1],10), m[2]?parseInt(m[2],10):0, validUntil)};
  m = line.match(/AFT (\d{2})(\d{2})?Z/);
  if(m) return {from:zHourAnchor(parseInt(m[1],10), m[2]?parseInt(m[2],10):0, validUntil), to:validUntil};
  return {from:null, to:validUntil};
}
function winOverlap(f, t, t0, t1){
  const a = f ? f.getTime() : -Infinity;
  const b = t ? t.getTime() : Infinity;
  return a < t1 && b > t0;
}
/* Aggregate a zone's conditions over an evaluation window; AIRMET lines always count */
function zoneActive(z, t0, t1, st){
  const out = {minCig:null, minVis:null, visRaw:null, wx:new Set(), cigSnip:null, visSnip:null, cigStarts:null, visStarts:null};
  const fold = (c, from) => {
    const future = (from!==null && from!==undefined && from > Date.now()) ? from : null;
    if(c.minCig!==null && (out.minCig===null || c.minCig<out.minCig)){ out.minCig=c.minCig; out.cigSnip=c.cigSnip; out.cigStarts=future; }
    if(c.minVis!==null && (out.minVis===null || c.minVis<out.minVis)){ out.minVis=c.minVis; out.visRaw=c.visRaw; out.visSnip=c.visSnip; out.visStarts=future; }
    c.wx.forEach(t=>out.wx.add(t));
  };
  if(z.airmetConds) fold(z.airmetConds, null);
  (z.lines||[]).forEach(l=>{
    if(!winOverlap(l.from, l.to, t0, t1)) return;
    if(!faScopeHas(l.scope, st)) return;   // the line does not reach this field
    fold(l.conds, l.from);
  });
  return out;
}
function otlkLocal(dd, hh, mm2){
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), parseInt(dd,10), parseInt(hh,10), parseInt(mm2,10)));
  if(d.getTime() < Date.now() - 15*86400000) d.setUTCMonth(d.getUTCMonth()+1);
  return d;
}
const OTLK_WORDS = [
  [/\bMVFR CIG\b/g, 'MVFR ceilings (1,000\u20133,000 ft)'],
  [/\bMVFR VIS\b/g, 'MVFR visibility (3\u20135 sm)'],
  [/\bIFR CIG\b/g, 'IFR ceilings (below 1,000 ft)'],
  [/\bIFR VIS\b/g, 'IFR visibility (below 3 sm)'],
  [/\bLIFR\b/g, 'LIFR (cig below 500 ft / vis below 1 sm)'],
  [/\bMVFR\b(?! ceilings| visibility| \(cig)/g, 'MVFR (cig 1,000\u20133,000 ft and/or vis 3\u20135 sm)'],
  [/\bIFR\b(?! ceilings| visibility| \(cig)/g, 'IFR (cig below 1,000 ft and/or vis below 3 sm)'],
  [/\bELSW\b/g, 'elsewhere'], [/\bOCNL\b/g, 'occasional'], [/\bISOL\b/g, 'isolated'],
  [/\bWDLY\b/g, 'widely'], [/\bCSTL\b/g, 'coastal'], [/\bMTS\b/g, 'mountains'],
  [/\bPCPN\b/g, 'precipitation'], [/\bBECMG\b/g, 'becoming'], [/\bAFT\b/g, 'after'],
  [/\bTIL\b/g, 'until'], [/\bTHRU\b/g, 'through'], [/\bNMRS\b/g, 'numerous'],
  [/\bDTRT\b/g, 'deteriorating'], [/\bIMPR\b/g, 'improving'],
  [/-SHRA\b/g, 'light rain showers'], [/\bSHRA\b/g, 'rain showers'],
  [/-SHSN\b/g, 'light snow showers'], [/\bSHSN\b/g, 'snow showers'],
  [/-RA\b/g, 'light rain'], [/\bRA\b/g, 'rain'], [/-SN\b/g, 'light snow'], [/\bSN\b/g, 'snow'],
  [/-DZ\b/g, 'light drizzle'], [/\bBR\b/g, 'mist'], [/\bFG\b/g, 'fog'],
];
const DIR_WORDS = {N:'north of', S:'south of', E:'east of', W:'west of', NE:'northeast of', NW:'northwest of', SE:'southeast of', SW:'southwest of'};
function translateOtlk(raw){
  if(!raw) return null;
  const tm = raw.match(/^(\d{2})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})/);
  let head = '';
  let body = raw;
  if(tm){
    const d1 = otlkLocal(tm[1], tm[2], tm[3]), d2 = otlkLocal(tm[4], tm[5], tm[6]);
    const day = d => d.toLocaleDateString('en-US', {weekday:'short', timeZone:'America/Juneau'});
    head = `${day(d1)} ${fmtLZ(d1)} \u2013 ${day(d2)} ${fmtLZ(d2)}`;
    body = raw.slice(tm[0].length).replace(/^\.*/,'');
  }
  DIR_WORDS && Object.keys(DIR_WORDS).forEach(dk=>{
    body = body.replace(new RegExp('\\b'+dk+' (PA[A-Z]{2}|TKE|PEC)\\b','g'), (mm, ic)=>{
      const stn = STATIONS.find(x=>x.icao===ic);
      return DIR_WORDS[dk]+' '+(stn?stn.name:ic);
    });
  });
  OTLK_WORDS.forEach(([re, w])=>{ body = body.replace(re, w); });
  return {head, body: body.trim()};
}
function faZoneText(id){
  const z = state.fa.zones[id];
  if(!z) return `${id}: FA not loaded`;
  return `${id} ${z.name} (valid til ${z.validUntil}Z)\n`
    + (z.airmets.length ? z.airmets.join('\n')+'\n' : '')
    + z.cloudsWx.join('\n')
    + (z.passes ? '\n'+z.passes : '')
    + (z.turb.length ? '\nTURB: '+z.turb.join(' ') : '')
    + (z.ice.length ? '\nICE: '+z.ice.join(' ') : '')
    + (z.outlook ? '\nOTLK: '+z.outlook : '');
}

/* ================= NDBC (external cutoff stations) ================= */
function parseNDBC(text){
  // realtime2 format: two # header lines then newest-first rows: YY MM DD hh mm WDIR WSPD GST ... (m/s)
  const lines = (text||'').trim().split('\n').filter(l=>l && !l.startsWith('#'));
  if(!lines.length) return null;
  const c = lines[0].trim().split(/\s+/);
  if(c.length < 8) return null;
  const num = x => (x==='MM'||x===undefined) ? null : parseFloat(x);
  const ms2kt = v => v===null ? null : Math.round(v*1.94384);
  const cToF = v => v===null ? null : Math.round(v*9/5+32);
  const mb = num(c[12]);
  const atmp = num(c[13]), wtmp = num(c[14]), dewp = num(c[15]);
  // relative humidity from temperature and dewpoint, the Magnus approximation
  const rh = (atmp !== null && dewp !== null)
    ? Math.round(100 * Math.exp((17.625*dewp)/(243.04+dewp)) / Math.exp((17.625*atmp)/(243.04+atmp)))
    : null;
  return {t:`${c[0]}-${c[1]}-${c[2]} ${c[3]}:${c[4]}Z`, wdir:num(c[5]), wspd:ms2kt(num(c[6])), gust:ms2kt(num(c[7])),
    waveFt: (()=>{ const v = num(c[8]); return v===null ? null : Math.round(v*3.28084*10)/10; })(),
    wavePeriod: num(c[9]),
    pres: mb, presInHg: mb===null ? null : Math.round(mb*0.0295300*100)/100,
    airC: atmp, airF: cToF(atmp), waterC: wtmp, waterF: cToF(wtmp),
    dewC: dewp, dewF: cToF(dewp), rh,
    ptdy: num(c[17]),
    raw:lines[0].trim()};
}
function extStatus(e, ob){
  if(!ob || (ob.wspd===null && ob.gust===null)) return {cls:'na', label:'NO DATA'};
  const spd = Math.max(ob.wspd||0, ob.gust||0);
  if(e.info){
    if(spd >= 34) return {cls:'over', label:spd + ' KT GALE'};
    if(spd >= 22) return {cls:'caution', label:spd + ' KT STRONG'};
    return {cls:'na', label:spd + ' KT'};
  }
  if(spd > e.cutoff) return {cls:'over', label:'OVER ' + e.cutoff};
  if(e.eastCaution && ob.wdir!==null && ob.wdir>=45 && ob.wdir<=135 && spd > e.eastCaution) return {cls:'caution', label:'E CAUTION'};
  if(spd >= e.cutoff - 5) return {cls:'caution', label:'NEAR LIMIT'};
  return {cls:'ok', label:'OK'};
}

/* ================= Wind limits engine ================= */
function inArc(dir, f, t){
  if(f <= t) return dir >= f && dir <= t;
  return dir >= f || dir <= t; // wraps through north
}
function evalClass(arcs, wdir, spd){
  if(!arcs) return {cls:'na', label:'N/A', arc:null};
  if(spd === 0) return {cls:'ok', label:'CALM', arc:null};
  let candidates = arcs;
  if(wdir !== null && wdir !== undefined){
    const hit = arcs.filter(a=>inArc(wdir, a.f, a.t));
    if(hit.length) candidates = hit;
  }
  // variable or unknown direction: judge against the most restrictive arc
  const arc = candidates.reduce((a,b)=>(a.max??1e9)<=(b.max??1e9)?a:b);
  if(arc.max === null || arc.max === undefined) return {cls:'ok', label:'PILOT DISCRETION', arc};
  if(spd <= arc.max) return {cls:'ok', label:'OK', arc};
  if(arc.appr && spd <= arc.appr) return {cls:'appr', label:'MGMT APPROVAL', arc};
  return {cls:'over', label:'OVER LIMIT', arc};
}
/* The wind every limit decision is judged on: the freshest certified reading,
   MADIS when it is newer than the METAR and not expired, else the station ob.
   The row already displays the newest wind; the classifier, the rose and the
   FRAT table were still judging the METAR, so the board could flag a limit the
   panel then denied. One function, used by all of them. */
function windForLimits(icao, o){
  const md = state.madis[icao];
  const oT = o && o.t ? toDate(o.t) : null;
  const dT = md && md.valid ? toDate(md.valid) : null;
  const mdFresh = dT ? (Date.now() - dT.getTime())/60000 <= (md.syn ? 20 : 75) : false;
  if(md && mdFresh && (!oT || dT > oT))
    return {wdir:(md.wdir === undefined ? null : md.wdir), wspd:md.sknt||0, wgst:md.gust||0, src:(md.syn?'5-MIN':'MADIS'), t:md.valid};
  if(o) return {wdir:(Number.isFinite(o.wdir) ? o.wdir : null), wspd:o.wspd||0, wgst:o.wgst||0, src:(o.unofficial?'MXAK':'METAR'), t:o.t};
  return null;
}
const FRAT_CLS_NAME = {float:'Floats/Amphibs', c208:'C208', pc12:'PC-12'};
/* Full evaluation: worst class plus which aircraft classes are at or over which
   arc, so an alert can say what tripped instead of just that something did. */
function stationWindEval(icao, o){
  const L = LIMITS[icao];
  if(!L) return {cls:'na', w:null, hits:[]};
  const w = windForLimits(icao, o);
  if(!w) return {cls:'na', w:null, hits:[]};
  const spd = Math.max(w.wspd||0, w.wgst||0);
  if(!spd) return {cls:'ok', w, hits:[]};
  const rank = {na:-1, ok:0, appr:1, over:2};
  let worst = 'na'; const hits = [];
  ['float','c208','pc12'].forEach(k=>{
    const arcs = L[k];
    if(!arcs || !arcs.length) return;
    const r = evalClass(arcs, w.wdir, spd);
    if((rank[r.cls]??-1) > (rank[worst]??-1)) worst = r.cls;
    if(r.cls === 'appr' || r.cls === 'over') hits.push({cls:r.cls, name:FRAT_CLS_NAME[k], arc:r.arc});
  });
  return {cls:worst, w, hits};
}
function stationWindClass(icao, o){ return stationWindEval(icao, o).cls; }
function tailwind(wdir, spd, rwyHdg){
  if(wdir===null || wdir===undefined || !spd) return 0;
  const rad = (wdir - rwyHdg) * Math.PI/180;
  const head = spd * Math.cos(rad); // positive = headwind on this runway
  return head < 0 ? Math.round(-head) : 0;
}
function bestRunway(rwys, wdir, spd){
  if(!rwys || wdir===null) return null;
  const opts = rwys.map(h=>({hdg:h, tw:tailwind(wdir,spd,h)}));
  return opts.reduce((a,b)=>a.tw<=b.tw?a:b);
}
const MAGVAR = 19; // approx E variation for SE AK; METAR winds are true, runways magnetic
function crosswind(wdir, spd, rwyHdg){
  if(wdir===null || wdir===undefined || !spd) return 0;
  // METAR wind is TRUE, runway headings are MAGNETIC. Without this correction the angle
  // is off by the local variation (about 19 deg E here), which at a 15 kt limit is the
  // difference between inside and outside the FRAT. windCompHTML() always did this; the
  // warning path did not, so the two disagreed on the same wind.
  const wMag = ((wdir - MAGVAR) + 360) % 360;
  const off = ((wMag - rwyHdg + 540) % 360) - 180;
  return Math.abs(Math.round(spd * Math.sin(off * Math.PI/180)));
}

/* ================= Sunset (NOAA approximation) ================= */
function sunTimes(lat, lon, date){
  const rad = Math.PI/180;
  const day = Math.floor((date - new Date(Date.UTC(date.getUTCFullYear(),0,0)))/86400000);
  const g = 2*Math.PI/365*(day-1+(date.getUTCHours()-12)/24);
  const eq = 229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
  const decl = 0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
  const haArg = Math.cos(90.833*rad)/(Math.cos(lat*rad)*Math.cos(decl))-Math.tan(lat*rad)*Math.tan(decl);
  if(haArg < -1 || haArg > 1) return null; // midnight sun or polar night
  const ha = Math.acos(haArg)/rad;
  const sunriseMin = 720 - 4*(lon + ha) - eq;
  const sunsetMin  = 720 - 4*(lon - ha) - eq;
  const base = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return {sunrise:new Date(base + sunriseMin*60000), sunset:new Date(base + sunsetMin*60000)};
}

/* ================= FRAT weather auto-score (VFR FRAT, Baldwin) ================= */
function fratWeather(icao, cls){
  // cls: 'float' | 'c208' | 'pc12'
  const w = (window.lastPer||{})[icao] || {};
  const s = STATIONS.find(x=>x.icao===icao);
  const o = w.obs || {};
  const jnu = (window.lastPer||{})['PAJN'] || {};
  const jo = jnu.obs || {};
  const items = [], flags = [];
  const add = (pts, label)=>items.push({pts, label});

  // Forecast ceilings/vis category from worst-in-window
  const cat = w.cat || 'NA';
  if(cat==='VFR') add(1,'Forecast VFR (cig above 3,000 and vis above 5)');
  else if(cat==='MVFR') add(3,'Forecast MVFR');
  else if(cat==='IFR') add(5,'Forecast IFR');
  else if(cat==='LIFR') add(7,'Forecast LIFR');

  // Restrictions to visibility (worst precip)
  const wxAll = [...(w.wx||new Set())];
  const has = t => wxAll.some(x=>x.includes(t));
  if(has('SHSN')) add(8,'Snow showers (SHSN)');
  else if(has('SHRA')) add(5,'Rain showers (SHRA)');
  else if(has('SN')) add(3,'Snow (SN)');
  else if(has('RA')) add(1,'Rain (RA)');

  // Wind / turbulence
  if(s && LIMITS[icao] && LIMITS[icao].rwys && o.wdir!==null && o.wdir!==undefined){
    const spd = Math.max(o.wspd||0, o.wgst||0);
    const rh = (LIMITS[icao] && LIMITS[icao].rwys) || RWYS[icao];
    const xw = rh ? Math.min(...rh.map(h=>crosswind(o.wdir, spd, h))) : 0;
    if(xw >= 15) add(2,'Crosswind '+xw+' kt (15 or more)');
  }
  if((o.wgst||0) && (o.wgst - (o.wspd||0)) >= 15) add(3,'Gust factor '+(o.wgst-o.wspd)+' kt (15 or more)');
  if(w.llws) add(4,'Forecast LLWS in TAF');
  const faTurbMod = Object.values(state.fa.zones).some(z=>z.turb.join(' ').includes('MOD'));
  if(faTurbMod) add(4,'Forecast moderate or greater turbulence (FA)');
  const corrDef = CORRIDORS.find(c=>c.dest===icao);
  const fw = parseInt(document.getElementById('win').value,10);
  const ft0 = Date.now(), ft1 = ft0 + Math.max(fw,0.02)*3600000;
  const tsHere = wxAll.some(t=>t.includes('TS')) ||
    (corrDef||{zones:[]}).zones.some(zid=>{ const z=state.fa.zones[zid]; return z && [...zoneActive(z,ft0,ft1).wx].some(t=>t.includes('TS')||t==='CB'||t==='TCU'); });
  if(tsHere) add(8,'Thunderstorms/TCU forecast (TAF or FA along route)');
  const myNotams = (state.notams||{})[icao]||[];
  if(myNotams.some(n=>n.cat==='closure')) flags.push('CANCEL 48: destination has a closure NOTAM, verify runway/aerodrome status');
  else if(myNotams.length) add(3,'NOTAMs published for destination ('+myNotams.length+'), verify route impact');

  // NGSW management approval flags
  const jSpd = Math.max(jo.wspd||0, jo.wgst||0);
  if(cls==='float' && jSpd > 30) flags.push('NGSW: JNU winds '+jSpd+' kt over 30 (floats/amphibs), management approval');
  if(cls!=='float' && jSpd > 35) flags.push('NGSW: JNU winds '+jSpd+' kt over 35 (wheeled), management approval');
  if(LIMITS[icao]){
    const arcs = LIMITS[icao][cls];
    const spd = Math.max(o.wspd||0, o.wgst||0);
    const r = evalClass(arcs, o.wdir===undefined?null:o.wdir, spd);
    if(r.cls==='over') flags.push('NGSW: destination winds over company limits ('+spd+' kt)');
    else if(r.cls==='appr') flags.push('NGSW: destination winds in management approval band');
  }

  // Other weather
  if(o.cig!==undefined && ((o.cig!==null && o.cig<1000) || (o.vis!==null && o.vis<3))) add(5,'Special VFR conditions (cig below 1,000 or vis below 3)');
  else if((o.cig!==null && o.cig<=1000) || (o.vis!==null && o.vis<=3)) add(4,'Destination cig at/below 1,000 and/or 3 sm');
  const spread = (o.temp!==null && o.temp!==undefined && o.dewp!==null && o.dewp!==undefined) ? (o.temp - o.dewp) : null;
  const obsWx = o.wx||[];
  if(obsWx.some(t=>['BR','FG','HZ','DZ','FU'].some(k=>t.includes(k))) || (spread!==null && spread < 1))
    add(4,'BR/FG/HZ/DZ/FU present or temp/dewpoint spread below 1C'+(spread!==null?' (spread '+Math.round(spread*10)/10+'C)':''));
  if(!w.obs || w.obs.unofficial) add(4,'No official weather report available for destination (MXAK wind only)'.replace(' (MXAK wind only)', w.obs&&w.obs.unofficial?' (MXAK wind only)':''));
  const fzraFcst = wxAll.some(t=>t.includes('FZRA')) || Object.values(state.fa.zones).some(z=>(z.wxSet||new Set()).has('FZRA'));
  if(fzraFcst) add(10,'Forecast freezing rain along route');
  // night / sunset proximity
  if(s){
    const st2 = sunTimes(s.lat, s.lon, new Date());
    if(st2){
      const nowT = Date.now();
      if(nowT > st2.sunset.getTime() || nowT < st2.sunrise.getTime()) add(4,'Night (sunset to sunrise)');
      else if(st2.sunset.getTime() - nowT <= 30*60000) add(4,'Within 30 min of sunset now (check vs your ETA)');
    }
  }

  // Cancellation factors (48s)
  if(obsWx.some(t=>t.includes('FZFG')) || wxAll.some(t=>t.includes('FZFG'))) flags.push('CANCEL 48: freezing fog');
  if(o.temp!==null && o.temp!==undefined && o.temp < GLOBAL_LIMITS.floatWaterTemp && cls==='float') flags.push('CANCEL 48: OAT '+o.temp+'C below -7C, amphib runway to water');
  if((w.maxWshear||0) > 50) flags.push('CANCEL 48: forecast windshear '+w.maxWshear+' kt over 50');
  if(LIMITS[icao] && LIMITS[icao].rwys && o.wdir!==null && o.wdir!==undefined){
    const spd = Math.max(o.wspd||0, o.wgst||0);
    const br = bestRunway(LIMITS[icao].rwys, o.wdir, spd);
    const twLim = cls==='pc12' ? 15 : 10; // FRAT values; limits doc says 10 for PC-12, flagged discrepancy
    if(br && br.tw > twLim) flags.push('CANCEL 48: tailwind '+br.tw+' kt over '+twLim+' on best runway'+(cls==='pc12'?' (FRAT says 15, limits doc says 10, reconcile)':''));
  }
  const jVfr = (jo.cig===null || jo.cig>=1000) && (jo.vis!==null && jo.vis>=3);
  if(jnu.obs && !jVfr) flags.push('CANCEL 48: origin JNU below VFR departure minimums');

  const total = items.reduce((a,b)=>a+b.pts,0);
  return {items, flags, total};
}

/* ================= Compass rose (go/no-go wind limits) ================= */
function arcPath(cx, cy, r1, r2, a0, a1){
  const rad = a => (a-90)*Math.PI/180;
  const x = (r,a)=>cx+r*Math.cos(rad(a)), y=(r,a)=>cy+r*Math.sin(rad(a));
  const large = ((a1-a0+360)%360) > 180 ? 1 : 0;
  return `M ${x(r1,a0)} ${y(r1,a0)} A ${r1} ${r1} 0 ${large} 1 ${x(r1,a1)} ${y(r1,a1)} L ${x(r2,a1)} ${y(r2,a1)} A ${r2} ${r2} 0 ${large} 0 ${x(r2,a0)} ${y(r2,a0)} Z`;
}
function roseSVG(icao, size){
  const uid = icao + '_' + size;
  const L = LIMITS[icao];
  const w = (window.lastPer||{})[icao] || {};
  const o = w.obs || {};
  const lw = windForLimits(icao, w.obs);
  const spd = lw ? Math.max(lw.wspd||0, lw.wgst||0) : Math.max(o.wspd||0, o.wgst||0);
  const wdir = lw ? lw.wdir : ((o.wdir===undefined)?null:o.wdir);
  const cx=size/2, cy=size/2, R=size/2-20;
  const rings = [
    {key:'float', tag:'FLT', r1:R*0.56, r2:R*0.36},
    {key:'c208',  tag:'208', r1:R*0.78, r2:R*0.58},
    {key:'pc12',  tag:'P12', r1:R,      r2:R*0.80},
  ];
  const statusOf = a => (a.max==null) ? 'go' : (spd<=a.max) ? 'go' : (a.appr && spd<=a.appr) ? 'appr' : 'over';
  const FILLS = {
    go:   {live:`url(#g_go_${uid})`,   dim:'#1d4030'},
    appr: {live:`url(#g_ap_${uid})`,   dim:'#4d3d17'},
    over: {live:`url(#g_ov_${uid})`,   dim:'#4a2225'},
  };
  let segs='', labels='', ringTags='';
  rings.forEach(ring=>{
    const arcs = L ? L[ring.key] : null;
    const rm = (ring.r1+ring.r2)/2, bw = ring.r1-ring.r2;
    if(!arcs){
      segs += `<circle cx="${cx}" cy="${cy}" r="${rm}" fill="none" stroke="#24313f" stroke-width="${bw}" stroke-dasharray="2 6" opacity="0.6"/>`;
    } else {
      arcs.forEach(a=>{
        const a0=a.f%360, a1r=(a.t%360===a0)?a0+359.9:a.t%360;
        const st = statusOf(a);
        const active = wdir!==null && inArc(wdir, a.f, a.t);
        const fill = active ? FILLS[st].live : FILLS[st].dim;
        const glow = active ? ` filter="url(#glow_${uid})" stroke="#e9f0f6" stroke-width="1.8"` : ' stroke="var(--bg)" stroke-width="1.5" opacity="0.9"';
        const apprTxt = a.appr && a.appr<99 ? ', '+a.appr+' kt with mgmt approval' : (a.appr===99 ? ', above with mgmt approval' : '');
        segs += `<path d="${arcPath(cx,cy,ring.r1,ring.r2,a0,a1r)}" fill="${fill}"${glow}><title>${ring.tag} ${arcTxt(a)}: max ${a.max} kt${apprTxt}. ${active?'CURRENT WIND ARC: '+({go:'GO',appr:'MGMT APPROVAL',over:'OVER LIMIT'})[st]:''}</title></path>`;
        const mid=((a0+((a1r-a0+360)%360)/2))%360, rad=(mid-90)*Math.PI/180;
        labels += `<text x="${cx+rm*Math.cos(rad)}" y="${cy+rm*Math.sin(rad)+size*0.016}" text-anchor="middle" font-size="${size*0.048}" fill="#f4f8fb" font-family="Barlow Condensed" font-weight="700" paint-order="stroke" stroke="#0a0f14" stroke-width="3">${a.max==null?'PD':a.max}</text>`;
      });
    }
    const tr=(315-90)*Math.PI/180;
    ringTags += `<text x="${cx+rm*Math.cos(tr)}" y="${cy+rm*Math.sin(tr)+3}" text-anchor="middle" font-size="${size*0.034}" fill="var(--mut)" font-family="IBM Plex Mono" paint-order="stroke" stroke="#0a0f14" stroke-width="3">${ring.tag}</text>`;
  });
  // bezel + ticks
  let ticks = `<circle cx="${cx}" cy="${cy}" r="${R+9}" fill="none" stroke="#26364a" stroke-width="1"/>
    <circle class="bezel" cx="${cx}" cy="${cy}" r="${R+5.5}" fill="none" stroke="#3a4f66" stroke-width="2" stroke-dasharray="1.5 7" opacity="0.8"/>`;
  for(let d=0; d<360; d+=10){
    const rad=(d-90)*Math.PI/180, major=d%30===0;
    ticks += `<line x1="${cx+(R+1)*Math.cos(rad)}" y1="${cy+(R+1)*Math.sin(rad)}" x2="${cx+(R+(major?8:4))*Math.cos(rad)}" y2="${cy+(R+(major?8:4))*Math.sin(rad)}" stroke="${major?'var(--mut)':'#2e3f52'}" stroke-width="${major?1.4:1}"/>`;
    if(major){
      const card = d===0?'N':d===90?'E':d===180?'S':d===270?'W':null;
      const lbl = card || String(d/10).padStart(2,'0');
      ticks += `<text x="${cx+(R+15)*Math.cos(rad)}" y="${cy+(R+15)*Math.sin(rad)+3.5}" text-anchor="middle" font-size="${size*(card?0.052:0.036)}" fill="${d===0?'var(--amber)':card?'#cfdbe6':'var(--mut)'}" font-family="${card?'Barlow Condensed':'IBM Plex Mono'}" font-weight="${card?'700':'400'}">${lbl}</text>`;
    }
  }
  // center hub + wind vector
  const hubR = R*0.30;
  let hub = `<circle cx="${cx}" cy="${cy}" r="${hubR}" fill="url(#g_hub_${uid})" stroke="#26364a" stroke-width="1.5"/>`;
  if(wdir!==null && spd>0){
    // full-length arrow across the rose, drawn under the hub so the number stays readable
    const rF=(wdir-90)*Math.PI/180, rT=((wdir+180)%360-90)*Math.PI/180;
    hub = `<line x1="${cx+(R-4)*Math.cos(rF)}" y1="${cy+(R-4)*Math.sin(rF)}" x2="${cx+(R-4)*Math.cos(rT)}" y2="${cy+(R-4)*Math.sin(rT)}" stroke="#eef4f9" stroke-width="${size*0.013}" marker-end="url(#ah_${uid})" filter="url(#glow_${uid})" opacity="0.95"/>` + hub;
    hub += `<text x="${cx}" y="${cy-size*0.005}" text-anchor="middle" font-size="${size*0.12}" fill="#fff" font-family="Barlow Condensed" font-weight="700" paint-order="stroke" stroke="#0a0f14" stroke-width="4">${spd}</text>
      <text x="${cx}" y="${cy+size*0.055}" text-anchor="middle" font-size="${size*0.038}" fill="var(--mut)" font-family="IBM Plex Mono">${String(wdir).padStart(3,'0')}\u00b0T${o.wgst?' G'+o.wgst:''} kt</text>`;
  } else {
    hub += `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="${size*0.07}" fill="var(--mut)" font-family="Barlow Condensed" font-weight="600">${spd===0?'CALM':spd+' KT VRB'}</text>`;
  }
  // legend chips
  const chipW=size*0.30, chipH=size*0.045, cyL=size-chipH-3;
  const chip=(x,fill,txt)=>`<rect x="${x}" y="${cyL}" rx="${chipH/2}" width="${chipW}" height="${chipH}" fill="${fill}" opacity="0.92"/><text x="${x+chipW/2}" y="${cyL+chipH*0.72}" text-anchor="middle" font-size="${size*0.032}" fill="#0c1116" font-family="Barlow" font-weight="700">${txt}</text>`;
  const legend = chip(size*0.03,'var(--vfr)','GO') + chip(size*0.35,'var(--amber)','MGMT APPR') + chip(size*0.67,'var(--ifr)','OVER LIMIT');
  return `<svg width="${size}" height="${size+chipH+6}" viewBox="0 0 ${size} ${size+chipH+6}" role="img" aria-label="wind limits rose">
    <defs>
      <radialGradient id="g_hub_${uid}"><stop offset="0%" stop-color="#141d28"/><stop offset="100%" stop-color="#0a0f14"/></radialGradient>
      <radialGradient id="g_bg_${uid}"><stop offset="0%" stop-color="#121b26"/><stop offset="100%" stop-color="#0c1219"/></radialGradient>
      <linearGradient id="g_go_${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2ea86a"/><stop offset="100%" stop-color="#57d68c"/></linearGradient>
      <linearGradient id="g_ap_${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d18f22"/><stop offset="100%" stop-color="#f7c04a"/></linearGradient>
      <linearGradient id="g_ov_${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c43f34"/><stop offset="100%" stop-color="#f0685c"/></linearGradient>
      <filter id="glow_${uid}" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="ah_${uid}" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#eef4f9"/></marker>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${R+2}" fill="url(#g_bg_${uid})"/>
    ${segs}${labels}${ringTags}${ticks}${hub}${legend}
  </svg>`;
}

/* ================= IEM helpers (MADIS 5-minute obs) ================= */
function iemUrl(t0, t1){
  const stationParams = STATIONS.flatMap(s=>s.iem.map(id=>'station='+id)).join('&');
  return `${IEM}?${stationParams}&data=all&tz=Etc/UTC&format=onlycomma&latlon=no`
    + `&year1=${t0.getUTCFullYear()}&month1=${t0.getUTCMonth()+1}&day1=${t0.getUTCDate()}&hour1=${t0.getUTCHours()}&minute1=${t0.getUTCMinutes()}`
    + `&year2=${t1.getUTCFullYear()}&month2=${t1.getUTCMonth()+1}&day2=${t1.getUTCDate()}&hour2=${t1.getUTCHours()}&minute2=${t1.getUTCMinutes()}`;
}
function parseIEM(text){
  const lines = (text||'').trim().split('\n').filter(l=>l && !l.startsWith('#'));
  if(lines.length < 2) return [];
  const hdr = lines[0].split(',');
  const idx = n => hdr.indexOf(n);
  return lines.slice(1).map(l=>{
    const c = l.split(',');
    const skyc=[c[idx('skyc1')],c[idx('skyc2')],c[idx('skyc3')],c[idx('skyc4')]];
    const skyl=[c[idx('skyl1')],c[idx('skyl2')],c[idx('skyl3')],c[idx('skyl4')]];
    let cig=null;
    skyc.forEach((cv,i)=>{ if(['BKN','OVC','VV'].includes(cv)){ const b=parseFloat(skyl[i]); if(!isNaN(b)&&(cig===null||b<cig)) cig=b; }});
    const vRaw = parseFloat(c[idx('vsby')]);
    const tf = parseFloat(c[idx('tmpf')]), df = parseFloat(c[idx('dwpf')]), al = parseFloat(c[idx('alti')]);
    return {stn:c[idx('station')], valid:c[idx('valid')], cig,
      vis:isNaN(vRaw)?null:vRaw,
      wx:wxTokens((c[idx('wxcodes')]||'').replace(/^M$/,'')),
      sknt:parseFloat(c[idx('sknt')])||0, gust:parseFloat(c[idx('gust')])||0,
      tmpc:isNaN(tf)?null:Math.round((tf-32)*50/9)/10, dwpc:isNaN(df)?null:Math.round((df-32)*50/9)/10,
      alti:isNaN(al)?null:al,
      metar:c.slice(idx('metar')).join(',')};
  });
}
function latestMadisByStation(rows){
  const byIem = {};
  rows.forEach(r=>{
    if(!byIem[r.stn] || r.valid > byIem[r.stn].valid) byIem[r.stn] = r;
  });
  const out = {};
  STATIONS.forEach(s=>{
    const key = s.iem.find(id=>byIem[id]);
    if(key) out[s.icao] = byIem[key];
  });
  return out;
}

/* ================= FETCH ================= */
const ROUTES = [
  u => '/api/proxy?url=' + encodeURIComponent(u), // same-origin Vercel function, primary
  u => u,
  u => 'https://corsproxy.io/?url=' + encodeURIComponent(u),
  u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
];
async function fetchText(url){
  let lastErr = null;
  const skipLocal = location.protocol === 'file:'; // no /api when opened as a local file
  for(let i = 0; i < ROUTES.length; i++){ // ALWAYS retry from the primary route
    if(skipLocal && i === 0) continue;
    const ctl = new AbortController();
    const timer = setTimeout(()=>ctl.abort(), 15000);
    try{
      const r = await fetch(ROUTES[i](url), {signal: ctl.signal});
      clearTimeout(timer);
      if(!r.ok) throw new Error('HTTP ' + r.status);
      state.route = i; // display only
      return await r.text();
    }catch(e){ clearTimeout(timer); lastErr = e; }
  }
  throw lastErr || new Error('all fetch routes failed');
}
/* ================= MADIS High Frequency via IEM =================
   The real 5-minute observations. IEM's obhistory API with full=1 returns the
   routine METARs AND the MADIS High Frequency METAR rows (raw text ending
   "MADISHF"), verified live against PAHN on 21 Sep 2026: 157 rows in a day at
   5-minute spacing. Free, no token, and it is the same service behind IEM's
   observation-history page.

   Known gaps in the source itself, handled here:
   - many 5-minute slots arrive twice, one copy with the wind blanked
     (/////KT); keep the more complete copy
   - ///12KT is speed without direction
   - IEM nulls temperature on every MADISHF row (a known MADIS HF temperature
     problem), so temp and dewpoint are carried from the latest METAR

   Timing: fetch 3 minutes after each 5-minute mark so the reading has landed,
   retry only the stations that came back behind, and pause while the tab is
   hidden. One request per station; the reply is the whole local day. */
const HF_OFFSET_MIN = 3, HF_PERIOD_MIN = 5, HF_RETRY_SEC = 90;
const hfStations = () => STATIONS.filter(st=>!st.noMetar && st.icao !== 'PAEL').map(st=>st.icao);
const hfLocalDate = d => new Intl.DateTimeFormat('en-CA', {timeZone:'America/Juneau'}).format(d);
const hfUrl = (icao, day) => 'https://mesonet2.agron.iastate.edu/api/1/obhistory.json?station='
  + icao + '&network=AK_ASOS&date=' + day + '&full=1';
const hfNum = v => (v === null || v === undefined || v === '' || Number.isNaN(+v)) ? null : +v;
const hfIsMadis = r => /\bMADISHF\s*$/.test(String(r.raw || ''));

function hfPick(rows){
  /* one row per minute: official METAR over MADIS, else the more complete copy */
  const score = r => (hfIsMadis(r) ? 0 : 100)
    + ['sknt','drct','gust','vsby','skyl1','alti','tmpf'].reduce((n,k)=>n + (hfNum(r[k]) !== null ? 1 : 0), 0);
  const by = new Map();
  rows.forEach(r=>{ const c = by.get(r.utc_valid); if(!c || score(r) > score(c)) by.set(r.utc_valid, r); });
  return [...by.values()].sort((a,b)=>a.utc_valid < b.utc_valid ? -1 : 1);
}
function hfToMadis(allRows){
  /* Only genuine MADIS High Frequency rows may fill the MADIS block. IEM gets the
     routine METAR within minutes but MADIS 15 to 20 minutes late, so "newest row"
     is usually the METAR itself, which is what made the two lines match. */
  const rows = hfPick((allRows || []).filter(hfIsMadis));
  const metars = (allRows || []).filter(r=>!hfIsMadis(r)).sort((a,b)=>a.utc_valid < b.utc_valid ? -1 : 1);
  if(!rows.length) return null;
  const last = rows[rows.length - 1];
  const layers = [];
  for(let i = 1; i <= 4; i++){
    const c = last['skyc'+i], h = hfNum(last['skyl'+i]);
    if(c) layers.push({cover:String(c).trim(), base:h});
  }
  const ceil = layers.find(l=>/^(BKN|OVC|VV)$/.test(l.cover) && l.base !== null);
  const vvLayer = layers.find(l=>l.cover === 'VV');
  const cloudLayers = layers.filter(l=>l.cover !== 'VV' && l.cover !== 'CLR' && l.cover !== 'SKC');
  let tF = null, dF = null;                      // carry temperature from the last METAR
  for(let i = metars.length - 1; i >= 0; i--){
    if(hfNum(metars[i].tmpf) !== null){ tF = hfNum(metars[i].tmpf); dF = hfNum(metars[i].dwpf); break; }
  }
  const toC = f => f === null ? null : Math.round((f - 32) * 50/9) / 10;
  const kt = hfNum(last.sknt), dir = hfNum(last.drct), vis = hfNum(last.vsby);
  return {
    valid: new Date(Date.parse(last.utc_valid.replace(/Z$/, ':00Z'))).toISOString(),
    hf: hfIsMadis(last), syn: true, metar: last.raw || null,
    vis: vis === null ? null : Math.round(vis * 100) / 100,
    cig: ceil ? ceil.base : null,
    clouds: cloudLayers, vertVis: vvLayer ? vvLayer.base : null,
    wdir: (dir === null || (dir === 0 && !kt)) ? null : Math.round(dir),
    sknt: kt === null ? null : Math.round(kt),
    gust: hfNum(last.gust) === null ? 0 : Math.round(hfNum(last.gust)),
    wx: last.wxcodes ? String(last.wxcodes).trim().split(/\s+/) : [],
    tmpc: toC(tF), dwpc: toC(dF), alti: hfNum(last.alti),
  };
}
async function hfFetchOne(icao){
  const now = new Date();
  let rows = [];
  try{ const j = await fetchJSON(hfUrl(icao, hfLocalDate(now))); rows = (j && j.data) || []; }catch(e){}
  if(rows.length < 3){                            // just after local midnight
    try{ const j = await fetchJSON(hfUrl(icao, hfLocalDate(new Date(now - 86400000)))); rows = ((j && j.data) || []).concat(rows); }catch(e){}
  }
  /* Keep the recent raw rows so hovering the MADIS label can show where the
     current reading came from. Rows arrive oldest first; newest first is what
     a reader wants. */
  try{
    state.madisHist = state.madisHist || {};
    state.madisHist[icao] = rows.filter(hfIsMadis).slice(-10).reverse()
      .map(r=>({t:r.utc_valid, raw:String(r.raw||'').trim()})).filter(r=>r.raw);
  }catch(e){}
  return hfToMadis(rows);
}
async function hfFetch(list){
  const queue = list.slice(), got = {};
  const worker = async () => { while(queue.length){ const k = queue.shift(); got[k] = await hfFetchOne(k); } };
  await Promise.all([0,1,2,3].map(worker));      // at most four requests open at once
  return got;
}
function hfExpectedMark(now = Date.now()){
  const P = HF_PERIOD_MIN * 60000;
  return Math.floor((now - HF_OFFSET_MIN * 60000) / P) * P;
}
function hfApply(got){
  state.madis = state.madis || {};
  let n = 0, newest = 0;
  Object.keys(got).forEach(k=>{
    const m = got[k]; if(!m) return;
    const cur = state.madis[k];
    if(!cur || !cur.hf || !cur.valid || Date.parse(m.valid) >= Date.parse(cur.valid)){ state.madis[k] = m; n++; }
    newest = Math.max(newest, Date.parse(m.valid));
  });
  state.hfAt = Date.now();
  const lag = newest ? ((Date.now() - newest) / 60000).toFixed(1) : null;
  state.hfDiag = `MADIS-HF ${Object.values(got).filter(Boolean).length}/${Object.keys(got).length} stations`
    + (lag !== null ? `, newest ${lag} min old` : '');
  try{ detectChanges(); }catch(e){ console.error('HF change check', e); }
  if(window.lastPer){
    const per = {}; STATIONS.forEach(s2=>per[s2.icao] = stationWorst(s2.icao, 6));
    window.lastPer = per;
    try{ renderBoard(); }catch(e){ console.error('HF render', e); }
  }
}
async function hfCycle(){
  if(state.hfStopped) return;
  if(!document.hidden){
    const got = await hfFetch(hfStations());
    hfApply(got);
    const newestAll = Math.max(0, ...Object.values(got).filter(Boolean).map(m=>Date.parse(m.valid)));
    const late = Object.keys(got).filter(k=>!got[k] || Date.parse(got[k].valid) < newestAll - 60000);
    if(late.length) setTimeout(async ()=>{ hfApply(await hfFetch(late)); }, HF_RETRY_SEC * 1000);
  }
  const P = HF_PERIOD_MIN * 60000, O = HF_OFFSET_MIN * 60000, now = Date.now();
  const next = Math.floor((now - O) / P) * P + O + P;
  clearTimeout(state.hfTimer);
  state.hfTimer = setTimeout(hfCycle, Math.max(1000, next - now));
}
/* ---- Hazard bar above the stations, and clickable detail ----
   Every hazard chip opens its full detail in a panel directly below the bar,
   which works on a touchscreen or a TV remote where hover does not. The bar
   is moved to the top of the stations section so it sits above the airports
   on the desk and on the wall. */
/* Floating clock: local and Zulu, small in a corner at the desk, large across the
   top of the wall display. Ticks every second. */
function startClock(){
  if(document.getElementById('clockbox')) return;
  const el = document.createElement('div'); el.id = 'clockbox';
  document.body.appendChild(el);
  const fmtL = new Intl.DateTimeFormat('en-GB', {timeZone:'America/Juneau', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false});
  const tick = () => {
    const d = new Date();
    el.innerHTML = `<div class="ck"><span class="ckt">${fmtL.format(d)}</span><span class="ckl">L</span></div>`
      + `<div class="ck"><span class="ckt">${d.toISOString().slice(11,19)}</span><span class="ckl">Z</span></div>`;
  };
  tick(); setInterval(tick, 1000);
}
function setupHazardBar(){
  if(state.hazBarReady) return;
  const haz = document.getElementById('hazards');
  const sec = document.getElementById('stationsSection');
  if(!haz || !sec) return;
  state.hazBarReady = true;
  const wrap = document.createElement('div');
  wrap.id = 'hazbar';
  const det = document.createElement('div');
  det.id = 'hazdetail';
  sec.insertBefore(wrap, sec.firstChild);
  wrap.appendChild(haz);
  wrap.appendChild(det);
  haz.addEventListener('click', ev=>{
    const chip = ev.target.closest('.chip[data-tip]');
    if(!chip) return;
    const key = chip.getAttribute('data-tip');
    const txt = (typeof TIPS !== 'undefined' && TIPS[key]) || '';
    if(!txt) return;
    const same = det.dataset.key === key && det.classList.contains('show');
    haz.querySelectorAll('.chip.sel').forEach(c=>c.classList.remove('sel'));
    if(same){ det.classList.remove('show'); det.dataset.key = ''; return; }
    chip.classList.add('sel');
    det.dataset.key = key;
    det.innerHTML = `<pre>${esc(txt)}</pre>`;
    det.classList.add('show');
  });

  /* NOTAM chips on an airport row open that airport's NOTAMs in full,
     without expanding the row underneath. */
  const pop = document.createElement('div');
  pop.id = 'notampop';
  document.body.appendChild(pop);
  document.addEventListener('click', ev=>{
    const chip = ev.target.closest('.notamgrp .cutchip');
    if(!chip){
      if(!ev.target.closest('#notampop')) pop.classList.remove('show');
      return;
    }
    ev.stopPropagation(); ev.preventDefault();
    const row = chip.closest('[data-expand]');
    const icao = row && row.getAttribute('data-expand');
    const list = ((state.notams || {})[icao]) || [];
    const name = (STATIONS.find(x=>x.icao === icao) || {}).name || icao;
    const order = ['closure','approach','wip','airspace'];
    const groups = order.map(c=>({c, n:list.filter(x=>x.cat === c)})).concat([{c:'other', n:list.filter(x=>!order.includes(x.cat))}])
      .filter(g=>g.n.length);
    pop.innerHTML = `<div class="nphead"><b>${esc(name)} ${esc(icao)}</b> \u00b7 ${list.length} NOTAM${list.length === 1 ? '' : 's'}`
      + `<span class="npclose">\u2715</span></div>`
      + (groups.length ? groups.map(g=>`<div class="npgrp">${g.c.toUpperCase()}</div>`
          + g.n.map(x=>`<pre>${esc(String(x.raw || '').replace(/\s+/g, ' ').trim())}</pre>`).join('')).join('')
        : '<div class="npgrp">No NOTAMs on file.</div>');
    const r = chip.getBoundingClientRect();
    pop.style.top = (window.scrollY + r.bottom + 6) + 'px';
    pop.style.left = Math.max(8, Math.min(window.innerWidth - 640, r.left)) + 'px';
    pop.classList.add('show');
  }, true);
  pop.addEventListener('click', ev=>{ if(ev.target.closest('.npclose')) pop.classList.remove('show'); });
}
function startHfTicker(){
  if(state.hfStarted) return;
  state.hfStarted = true;
  hfCycle();
  document.addEventListener('visibilitychange', ()=>{
    if(!document.hidden && (!state.hfAt || Date.now() - state.hfAt > 4*60000)){ clearTimeout(state.hfTimer); hfCycle(); }
  });
}
async function fetchJSON(url){
  const t = await fetchText(url);
  return JSON.parse(t);
}

/* ================= PARSING ================= */
function parseVis(v){
  if(v === null || v === undefined || v === '') return null;
  if(typeof v === 'number') return v;
  const s = String(v);
  if(s.includes('+')) return 10; // P6SM / 10+ mean AT LEAST that, never a restriction
  const f = parseFloat(s);
  return isNaN(f) ? null : f;
}
/* Vertical visibility arrives in two different units depending on where it came from:
   aviationweather.gov reports the coded form, so VV002 is 2, while our own raw METAR parse
   already multiplies to feet. Anything under 100 is the coded form, which is safe because a
   real ceiling below 100 ft is only ever VV000 and that stays 0. Without this, the two
   stations sitting in fog at 0.25 miles reported ceilings of "1 ft" and "2 ft". */
function vvFeet(v){
  if(v === null || v === undefined || v === '') return null;
  const n = +v;
  if(!Number.isFinite(n)) return null;
  return n < 100 ? Math.round(n * 100) : Math.round(n);
}
function ceilingOf(clouds, vertVis){
  vertVis = vvFeet(vertVis);
  let c = null;
  (clouds||[]).forEach(cl=>{
    if(['BKN','OVC','OVX','VV'].includes(cl.cover) && cl.base != null){
      if(c === null || cl.base < c) c = cl.base;
    }
  });
  if(vertVis != null && (c === null || vertVis < c)) c = vertVis;
  return c;
}
function flightCat(cig, vis){
  if(cig === null && vis === null) return 'NA';
  const c = cig === null ? 99999 : cig, v = vis === null ? 99 : vis;
  if(c < 500  || v < 1) return 'LIFR';
  if(c < 1000 || v < 3) return 'IFR';
  if(c <= 3000 || v <= 5) return 'MVFR';
  return 'VFR';
}
function wxTokens(str){
  if(!str) return [];
  return str.trim().split(/\s+/).filter(t=>t && t!=='NSW');
}
/* Collapse a pile of weather codes into what a pilot needs to read: one entry per
   precipitation type at its worst intensity, showers noted, thunderstorms first. */
function wxSummary(toks){
  const INT = {'-':1, '':2, '+':3}, NAMES = {RA:'rain', SN:'snow', DZ:'drizzle'};
  const groups = {}, other = [];
  (toks||[]).forEach(t=>{
    const m = String(t).match(/^([-+]?)(SH)?(RA|SN|DZ)$/);
    if(m){ const g = groups[m[3]] || (groups[m[3]] = {i:0, sh:false}); g.i = Math.max(g.i, INT[m[1]]); if(m[2]) g.sh = true; }
    else other.push(t);
  });
  const out = Object.keys(groups).map(k=>{ const g = groups[k];
    return (g.i === 1 ? 'light ' : g.i === 3 ? 'heavy ' : '') + NAMES[k] + (g.sh && k !== 'DZ' ? ' showers' : ''); });
  other.forEach(t=>out.push(wxWord(t)));
  return [...new Set(out)].sort((a,b)=>(/thunder/.test(b)?1:0) - (/thunder/.test(a)?1:0)).join(', ');
}
function wxWord(tok){ return WX_WORDS[tok] || tok.toLowerCase(); }
function fmtCig(c){ return c === null ? 'no ceiling' : c.toLocaleString() + ' ft'; }
/* Show what the source said: METAR 10SM shows 10, TAF P6SM shows 6+, METAR 2 1/2SM shows 2.5 */
function visTxt(raw){
  if(raw === null || raw === undefined || raw === '') return '?';
  const s = String(raw);
  if(s.includes('+')){
    const n = parseFloat(s);
    return n >= 10 ? '10' : (isNaN(n) ? s : n + '+');
  }
  const f = parseFloat(s);
  if(isNaN(f)) return s;
  return String(Math.round(f*100)/100);
}
function fmtVis(v){ return visTxt(v); }
function localTime(d){ return d.toLocaleString('en-US',{timeZone:'America/Juneau', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}); }
/* 07/09/26 10:49(L) 18:49(Z) */
function fmtStamp(v){
  let d;
  if(v instanceof Date) d = v;
  else if(typeof v === 'number') d = new Date(v * (v < 1e12 ? 1000 : 1)); // epoch s or ms
  else {
    const sv = String(v).trim();
    d = /[+-]\d{2}:?\d{2}$/.test(sv) ? new Date(sv) : new Date(sv.replace(/Z/g,'').replace(' ','T')+'Z');
  }
  if(isNaN(d)) return String(v);
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Juneau',month:'2-digit',day:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(d);
  const g = t=>parts.find(p=>p.type===t).value;
  const z = n=>String(n).padStart(2,'0');
  return `${g('month')}/${g('day')}/${g('year')} ${g('hour')}:${g('minute')}L`;
}
/* compact: 10:49L/18:49Z */
function fmtLZ(v){
  let d;
  if(v instanceof Date) d = v;
  else if(typeof v === 'number') d = new Date(v * (v < 1e12 ? 1000 : 1));
  else {
    const sv = String(v).trim();
    d = /[+-]\d{2}:?\d{2}$/.test(sv) ? new Date(sv) : new Date(sv.replace(/Z/g,'').replace(' ','T')+'Z');
  }
  if(isNaN(d)) return String(v);
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Juneau',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(d);
  const g = t=>parts.find(p=>p.type===t).value;
  const z = n=>String(n).padStart(2,'0');
  return `${g('hour')}:${g('minute')}L`;
}
/* FA valid times are DDHHMM UTC */
/* ---- Geographic qualifiers on area forecast lines ----
   AAWU lines are often scoped to part of a zone: "TIL 21Z PAGS W OCNL BKN020" means west of
   Gustavus, not all of Lynn Canal and Glacier Bay. Folding those into the zone wholesale made
   a Gustavus-west deck flag low ceilings at Haines and Skagway, which sit far to the northeast.
   Each line now carries a scope, and a station is only affected if it falls inside it.
   Anything unrecognised stays zone wide, which is the conservative direction. */
const FA_REF = {
  PAGS:{lat:58.425,lon:-135.707}, PAFE:{lat:56.961,lon:-133.910}, PAJN:{lat:58.355,lon:-134.576},
  PAOH:{lat:58.096,lon:-135.410}, PASI:{lat:57.047,lon:-135.362}, PAKT:{lat:55.356,lon:-131.714},
  PAWG:{lat:56.484,lon:-132.370}, PAPG:{lat:56.801,lon:-132.945}, PAHN:{lat:59.244,lon:-135.524},
  PAGY:{lat:59.460,lon:-135.316}, PAYA:{lat:59.503,lon:-139.660}, PAKW:{lat:55.579,lon:-133.076},
  PAGN:{lat:57.504,lon:-134.585}, PAEL:{lat:58.195,lon:-136.347},
};
function faScope(text){
  const t = String(text||'').toUpperCase();
  const m = t.match(/\b(PA[A-Z]{2})\s+(NE|NW|SE|SW|N|S|E|W)\b/);
  if(m && FA_REF[m[1]]) return {kind:'dir', ref:m[1], dir:m[2], label:m[2] + ' of ' + m[1]};
  if(/\bELSW\b/.test(t)) return {kind:'elsw', label:'elsewhere in the zone'};
  if(/\bALG\s+CST\b|\bCST\/OFSHR\b|\bCSTL\b/.test(t)) return {kind:'coast', label:'along the coast and offshore'};
  if(/\bMTS\b|\bPASSES\b/.test(t)) return {kind:'mts', label:'mountains and passes'};
  if(/\bINLAND\b/.test(t)) return {kind:'inland', label:'inland'};
  return {kind:'zone', label:'zone wide'};
}
function faScopeHas(scope, st){
  if(!scope || scope.kind === 'zone' || scope.kind === 'elsw') return true;
  if(!st) return true;
  if(scope.kind === 'mts') return false;
  if(scope.kind === 'coast' || scope.kind === 'inland') return true;
  if(scope.kind === 'dir'){
    const r = FA_REF[scope.ref];
    if(!r) return true;
    const dLat = st.lat - r.lat, dLon = st.lon - r.lon, PAD = 0.12;
    switch(scope.dir){
      case 'N':  return dLat >  -PAD;
      case 'S':  return dLat <   PAD;
      case 'E':  return dLon >  -PAD;
      case 'W':  return dLon <   PAD;
      case 'NE': return dLat > -PAD && dLon > -PAD;
      case 'NW': return dLat > -PAD && dLon <  PAD;
      case 'SE': return dLat <  PAD && dLon > -PAD;
      case 'SW': return dLat <  PAD && dLon <  PAD;
    }
  }
  return true;
}
function ddhhmmDate(ddhhmm){
  const m = String(ddhhmm).match(/^(\d{2})(\d{2})(\d{2})$/);
  if(!m) return null;
  const now = new Date();
  let d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), parseInt(m[1],10), parseInt(m[2],10), parseInt(m[3],10)));
  if(d.getTime() < now.getTime() - 3*86400000) d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth()+1, parseInt(m[1],10), parseInt(m[2],10), parseInt(m[3],10)));
  return d;
}
function faValid(ddhhmm){
  const d = ddhhmmDate(ddhhmm);
  return d ? fmtStamp(d) : ddhhmm;
}
function toDate(v){
  if(v instanceof Date) return v;
  if(typeof v === 'number') return new Date(v * (v < 1e12 ? 1000 : 1));
  const sv = String(v).trim();
  const d = /[+-]\d{2}:?\d{2}$/.test(sv) ? new Date(sv) : new Date(sv.replace(/Z/g,'').replace(' ','T')+'Z');
  return isNaN(d) ? null : d;
}
function agoTxt(v){
  const d = toDate(v); if(!d) return '';
  let s = Math.round((Date.now() - d.getTime())/1000);
  if(s < 0) s = 0;
  if(s < 90) return s+'s ago';
  const m = Math.round(s/60);
  if(m < 90) return m+'m ago';
  return Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')+'m ago';
}
function inTxt(d){
  if(!d) return '';
  let s = Math.round((d.getTime() - Date.now())/1000);
  if(s <= 0) return 'due now';
  const m = Math.ceil(s/60);
  if(m < 90) return 'in '+m+'m';
  return 'in '+Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')+'m';
}
function nextMetar(lastT){ const d = toDate(lastT); return d ? new Date(d.getTime()+60*60000) : null; }
function nextMadis(lastT){ const d = toDate(lastT); return d ? new Date(d.getTime()+5*60000) : null; }
function nextTaf(){
  // standard issuance ~2330, 0530, 1130, 1730Z
  const slots = [23*60+30, 5*60+30, 11*60+30, 17*60+30].sort((a,b)=>a-b);
  const now = new Date();
  const cur = now.getUTCHours()*60 + now.getUTCMinutes();
  const base = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  for(const m of slots){ if(m > cur) return new Date(base + m*60000); }
  return new Date(base + 86400000 + slots[0]*60000);
}
/* ---- session/day history for trend graphs (persisted in this browser) ---- */
function icaoForIem(id){ const st = STATIONS.find(x=>x.iem.includes(id)); return st ? st.icao : null; }
function loadSeries(){ try{ return JSON.parse(localStorage.getItem('wxb_series_v1')||'{}'); }catch(e){ return {}; } }
function saveSeries(o){ try{ localStorage.setItem('wxb_series_v1', JSON.stringify(o)); }catch(e){} }
function updateSeries(madisRows){
  const ser = loadSeries();
  const cut = Date.now() - 24*3600000;
  const push = (icao, t, cig, vis, temp, dewp, ws, wg, pres)=>{
    const d = toDate(t); if(!d || d.getTime() < cut) return;
    const key = Math.round(d.getTime()/60000);
    ser[icao] = ser[icao] || {};
    const prev = ser[icao][key] || [];
    ser[icao][key] = [cig, vis,
      temp!==undefined&&temp!==null?temp:(prev[2]!==undefined?prev[2]:null),
      dewp!==undefined&&dewp!==null?dewp:(prev[3]!==undefined?prev[3]:null),
      ws!==undefined&&ws!==null?ws:(prev[4]!==undefined?prev[4]:null),
      wg!==undefined&&wg!==null?wg:(prev[5]!==undefined?prev[5]:null),
      pres!==undefined&&pres!==null?pres:(prev[6]!==undefined?prev[6]:null)];
  };
  STATIONS.forEach(st=>{
    (state.metarHist[st.icao]||[]).forEach(m=>{ const c2 = ceilingOf(m.clouds, m.vertVis); push(st.icao, m.obsTime||m.reportTime, c2===null?-1:c2, parseVis(m.visib), m.temp, m.dewp, m.wspd, m.wgst, altimFromRaw(m.rawOb)); });
  });
  (madisRows||[]).forEach(r=>{ const icao = icaoForIem(r.stn); if(icao) push(icao, r.valid, r.cig===null?-1:r.cig, r.vis, r.tmpc, r.dwpc, r.sknt, r.gust, r.alti); });
  // prune + cap
  Object.keys(ser).forEach(icao=>{
    const keys = Object.keys(ser[icao]).map(Number).filter(k=>k*60000 >= cut).sort((a,b)=>a-b).slice(-400);
    const kept = {}; keys.forEach(k=>kept[k]=ser[icao][k]); ser[icao]=kept;
  });
  saveSeries(ser);
}
function seriesFor(icao){
  const raw = loadSeries()[icao]||{};
  return Object.keys(raw).map(Number).sort((a,b)=>a-b).map(k=>({t:k*60000, cig:raw[k][0], vis:raw[k][1], temp:raw[k][2]??null, dewp:raw[k][3]??null, ws:raw[k][4]??null, wg:raw[k][5]??null, pres:raw[k][6]??null}));
}
/* ---- change detection between refreshes ----
   The baseline lived only in memory, so any page reload wiped it and the board went blind to
   changes until the next full cycle. On a kiosk TV that reboots, or a browser reopened in the
   morning, that is exactly when a change matters most. It persists now, but only counts if it
   is recent: comparing against a snapshot from last night would report a night's worth of
   drift as if it had just happened. */
const SNAP_MAX_AGE_MS = 45 * 60000;
function loadSnapshot(){
  if(state.snapshot) return;
  try{
    const j = JSON.parse(localStorage.getItem('wxb_snapshot') || 'null');
    if(j && j.at && j.snap && (Date.now() - j.at) < SNAP_MAX_AGE_MS){
      state.snapshot = j.snap;
      state.snapshotAge = Date.now() - j.at;
    }
  }catch(e){}
}
function saveSnapshot(snap){
  try{ localStorage.setItem('wxb_snapshot', JSON.stringify({at:Date.now(), snap})); }catch(e){}
}
/* "ceiling 4,600 ft -> 3,400 ft" followed within minutes by "ceiling 3,400 ft -> 4,600 ft"
   is not two events. Drop the new clause and strike the one it reverses. */
const FLIP_WINDOW_MS = 4 * 60000;
function clauseKey(c){
  const m = String(c).replace(/\s*\(MADIS\)\s*$/, '').match(/^(ceiling|vis|LIFR|IFR|MVFR|VFR)\b\s*(.*?)\s*\u2192\s*(.*)$/);
  if(!m) return null;
  const el = /^(LIFR|IFR|MVFR|VFR)$/.test(m[1]) ? 'cat' : m[1];
  const from = el === 'cat' ? m[1] : m[2], to = m[3].replace(/\s*(ft|sm)$/, '').trim();
  return {el, from:String(from).replace(/\s*(ft|sm)$/, '').trim(), to};
}
function cancelFlips(icao, msgs){
  const now = Date.now();
  const recent = (state.alerts || []).filter(a=>a.icao === icao && a.msg && now - a.t < FLIP_WINDOW_MS);
  const keep = [];
  msgs.forEach(c=>{
    const k = clauseKey(c);
    let cancelled = false;
    if(k){
      for(const a of recent){
        const parts = String(a.msg).split(/,\s+/);
        const idx = parts.findIndex(p=>{ const q = clauseKey(p); return q && q.el === k.el && q.from === k.to && q.to === k.from; });
        if(idx >= 0){
          parts.splice(idx, 1);
          a.msg = parts.join(', ');
          cancelled = true; break;
        }
      }
    }
    if(!cancelled) keep.push(c);
  });
  state.alerts = (state.alerts || []).filter(a=>!(a.icao === icao && a.msg === ''));
  return keep;
}
function detectChanges(){
  loadSnapshot();
  const snap = {};
  STATIONS.forEach(st=>{ const w = stationWorst(st.icao, 0);
    /* Before the first METAR fetch lands, a station that normally has a METAR is
       only half loaded; judging its wind then raised false OVER LIMIT alerts at
       page load. Hold the verdict at na until the picture is complete. */
    const windCls = (!state.metars[st.icao] && !st.noMetar) ? 'na' : stationWindClass(st.icao, w.obs);
    snap[st.icao] = {cig:w.worstCig, vis:w.worstVis, cigSrc:w.worstCigSrc||null, visSrc:w.worstVisSrc||null, cat:w.cat, wind:windCls}; });
  if(state.snapshot){
    STATIONS.forEach(st=>{
      const a = state.snapshot[st.icao], b = snap[st.icao];
      if(!a || !b) return;
      const msgs = [];
      let worse = false, better = false;
      const THR = alertThresholds();
      const cigMoved = (a.cig!==null && b.cig!==null && Math.abs(a.cig-b.cig) >= THR.cig) || (a.cig===null) !== (b.cig===null);
      if(cigMoved){
        msgs.push(`ceiling ${a.cig===null?'none':a.cig.toLocaleString()+' ft'} \u2192 ${b.cig===null?'none':b.cig.toLocaleString()+' ft'}${b.cigSrc==='MADIS'?' (MADIS)':''}`);
        if(b.cig!==null && (a.cig===null || b.cig < a.cig)) worse = true; else better = true;
      }
      const visMoved = (a.vis!==null && b.vis!==null && Math.abs(a.vis-b.vis) >= THR.vis) || (a.vis===null) !== (b.vis===null);
      if(visMoved){
        msgs.push(`vis ${a.vis===null?'?':visTxt(a.vis)} \u2192 ${b.vis===null?'?':visTxt(b.vis)} sm${b.visSrc==='MADIS'?' (MADIS)':''}`);
        if(b.vis!==null && (a.vis===null || b.vis < a.vis)) worse = true; else better = true;
      }
      if(a.cat !== b.cat && b.cat !== 'NA'){
        msgs.push(`${a.cat} \u2192 ${b.cat}`);
        if((CAT_ORDER[b.cat]||0) > (CAT_ORDER[a.cat]||0)) worse = true; else better = true;
      }
      const netMsgs = cancelFlips(st.icao, msgs);
      if(netMsgs.length){
        state.alerts.unshift({t:Date.now(), icao:st.icao, name:st.name, msg:netMsgs.join(', '), worse, better});
        if(worse && alertsAllowed(st.icao)) flashTitle();
        if((CAT_ORDER[b.cat]??0) > (CAT_ORDER[a.cat]??0)){
          if(b.cat==='IFR' || b.cat==='LIFR') playTone('cat');
          else if(b.cat==='MVFR') playTone('mvfr');
        }
      }
      // wind limit transitions, same engine the rose uses
      const wRank = {na:-1, ok:0, appr:1, over:2};
      if(a.wind && b.wind && (wRank[b.wind]??-1) > (wRank[a.wind]??-1) && (b.wind==='appr' || b.wind==='over')){
        /* name the wind, its source, and every class limit it reached, so the chip
           still explains itself half an hour later when conditions have relaxed */
        const ev = stationWindEval(st.icao, stationWorst(st.icao, 0).obs);
        const wtx = ev.w
          ? `${ev.w.wdir !== null ? String(ev.w.wdir).padStart(3,'0') + '\u00b0T ' : 'VRB '}${ev.w.wspd}${ev.w.wgst ? 'G' + ev.w.wgst : ''} kt (${ev.w.src})`
          : '';
        const lim = h => `${h.name} ${h.arc ? arcTxt(h.arc) + ' max ' + h.arc.max + ' kt' : 'limit'}`;
        const overs = ev.hits.filter(h=>h.cls==='over').map(lim).join('; ');
        const apprs = ev.hits.filter(h=>h.cls==='appr').map(lim).join('; ');
        const msg = b.wind==='over'
          ? `wind ${wtx} OVER company limit${overs ? ': ' + overs : ''}${apprs ? ' (mgmt approval band: ' + apprs + ')' : ''}`
          : `wind ${wtx} into management approval${apprs ? ': ' + apprs : ''}`;
        const firstHit = ev.hits.find(h=>h.cls === (b.wind==='over' ? 'over' : 'appr')) || ev.hits[0];
        const shortTxt = `wind ${ev.w ? ev.w.wspd + (ev.w.wgst ? 'G' + ev.w.wgst : '') + ' kt ' : ''}${b.wind==='over' ? 'OVER' : 'mgmt appr'}`
          + (firstHit ? ` ${firstHit.name}${firstHit.arc && firstHit.arc.max != null ? ' ' + firstHit.arc.max + ' kt' : ''}` : ' company limit');
        state.alerts.unshift({t:Date.now(), icao:st.icao, name:st.name, worse:true, msg, short:shortTxt});
        flashTitle();
        playTone(b.wind==='over' ? 'over' : 'mgmt');
      }
    });
    // external cutoff stations crossing their limits
    const snapExt = {};
    EXT.forEach(e=>{ snapExt[e.id] = extStatus(e, state.ext[e.id]).cls; });
    if(state.snapshotExt){
      const eRank = {na:-1, ok:0, caution:1, over:2};
      EXT.forEach(e=>{
        const a2 = state.snapshotExt[e.id], b2 = snapExt[e.id];
        if((eRank[b2]??-1) > (eRank[a2]??-1) && b2==='over'){
          state.alerts.unshift({t:Date.now(), icao:e.id, name:e.name, worse:true,
            msg: e.info
              ? 'wind ' + Math.max(ob2.wspd||0, ob2.gust||0) + ' kt at ' + (e.where || e.name) + ', no company limit at this site'
              : 'wind over the ' + e.cutoff + ' kt cutoff, affects ' + e.affects});
          flashTitle();
          playTone('cut');
        }
      });
    }
    state.snapshotExt = snapExt;
    state.alerts = state.alerts.slice(0, 40);
  }
  state.snapshot = snap;
  saveSnapshot(snap);
}
/* Alert settings. Which stations may interrupt, and how far something has to move before it
   counts. Both were previously hardcoded, so a board watching sixteen fields flashed at every
   300 ft wobble anywhere in Southeast. */
function alertThresholds(){
  try{
    const j = JSON.parse(localStorage.getItem('wxb_alertthr') || 'null');
    if(j && Number.isFinite(j.cig) && Number.isFinite(j.vis)) return j;
  }catch(e){}
  return {cig:300, vis:1};
}
function openAlertPicker(){
  const md = document.getElementById('modal');
  const sel = alertStations();
  const thr = alertThresholds();
  const rows = STATIONS.map(st=>{
    const on = !sel || !sel.length || sel.includes(st.icao);
    return `<label class="alertpick"><input type="checkbox" data-astn="${st.icao}"${on?' checked':''}>
      <b>${esc(st.name)}</b> <span style="color:var(--mut)">${st.icao}</span></label>`;
  }).join('');
  md.innerHTML = `<h2>Alert settings <button class="close" id="mClose">Close</button></h2>
    <div style="font-size:12px;color:var(--mut);margin-bottom:8px">
      Only the stations ticked here may flash the browser tab and sound the tone. The tab shows
      which field moved and what changed, so you can tell from the tab strip whether it is worth
      switching to. Everything still appears in the alerts panel regardless.
    </div>
    <div class="alertgrid">${rows}</div>
    <div style="display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap;margin-top:12px">
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut);text-transform:uppercase">Ceiling move, ft
        <input id="thrCig" type="number" min="100" step="100" value="${thr.cig}" style="width:110px;font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"></label>
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut);text-transform:uppercase">Visibility move, sm
        <input id="thrVis" type="number" min="0.25" step="0.25" value="${thr.vis}" style="width:110px;font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"></label>
      <button id="alertAll" style="font-size:11px;padding:4px 12px">all</button>
      <button id="alertNone" style="font-size:11px;padding:4px 12px">none</button>
      <button id="alertSave" style="font-size:11px;padding:4px 12px">save</button>
      <span id="alertMsg" style="font-size:11px;color:var(--mut)"></span>
    </div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  const boxes = ()=>[...md.querySelectorAll('[data-astn]')];
  document.getElementById('alertAll').addEventListener('click', ()=>boxes().forEach(b=>b.checked = true));
  document.getElementById('alertNone').addEventListener('click', ()=>boxes().forEach(b=>b.checked = false));
  document.getElementById('alertSave').addEventListener('click', ()=>{
    const on = boxes().filter(b=>b.checked).map(b=>b.dataset.astn);
    const cig = parseInt(document.getElementById('thrCig').value, 10) || 300;
    const vis = parseFloat(document.getElementById('thrVis').value) || 1;
    try{
      localStorage.setItem('wxb_alertstn', JSON.stringify(on));
      localStorage.setItem('wxb_alertthr', JSON.stringify({cig, vis}));
    }catch(e){}
    document.getElementById('alertMsg').innerHTML =
      `<span style="color:var(--vfr)">Saved. ${on.length} of ${STATIONS.length} stations will interrupt, ` +
      `at ${cig} ft or ${vis} sm.</span>`;
  });
}
let flashTimer = null;
const baseTitle = document.title;
/* Which stations are allowed to grab the tab. Empty means all of them. A board watching
   sixteen fields flashes constantly if every one can interrupt, and then nobody looks. */
function alertStations(){
  try{
    const raw = localStorage.getItem('wxb_alertstn');
    if(raw === null) return null;                 // never configured, so everything alerts
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : null;
  }catch(e){ return null; }
}
function alertsAllowed(icao){
  const list = alertStations();
  return !list || !list.length || list.includes(icao);
}
/* The tab used to read "WX CHANGE" no matter what moved, which told you to come look but
   not whether it was worth it. It names the station and the change now, and cycles when
   more than one thing moved. */
function flashTitle(){
  if(flashTimer) return;
  let n = 0;
  flashTimer = setInterval(()=>{
    const recent = (state.alerts||[]).filter(a=>Date.now() - a.t < 30*60000 && alertsAllowed(a.icao));
    if(!recent.length){ clearInterval(flashTimer); flashTimer = null; document.title = baseTitle; return; }
    if(n % 2 === 0){
      const a = recent[Math.floor(n/2) % recent.length];
      const parts = String(a.msg||'').split(', ');
      const cat = parts.find(p=>/\u2192/.test(p) && /\b(LIFR|IFR|MVFR|VFR)\b/.test(p));
      const short = (cat || parts[0] || 'changed').replace(/\s+/g,' ').slice(0, 34);
      document.title = `${a.worse?'\u25bc':'\u25b2'} ${a.icao} ${short}`;
    } else {
      document.title = baseTitle;
    }
    n++;
    if(n > 60 || document.hasFocus()){ clearInterval(flashTimer); flashTimer = null; document.title = baseTitle; }
  }, 1000);
}
window.addEventListener('focus', ()=>{ if(flashTimer){ clearInterval(flashTimer); flashTimer = null; document.title = baseTitle; } });
function renderAlerts(){
  const el = document.getElementById('alerts');
  if(!state.alerts.length){ el.innerHTML = ''; return; }
  el.innerHTML = state.alerts.slice(0, 12).map(a=>
    `<div class="alertrow ${a.worse?'worse':(a.better?'better':'')}"><span class="tm">${fmtLZ(a.t)}</span> <b>${a.name}</b>: ${a.msg} ${a.worse?'\u25bc':'\u25b2'}</div>`
  ).join('');
}
function agesLine(icao){
  const m = state.metars[icao], md = state.madis[icao], tf = state.tafs[icao];
  const bits = [];
  if(m){ const t = m.obsTime||m.reportTime; const nx = nextMetar(t); bits.push(`METAR ${agoTxt(t)}${nx?' \u00b7 next ~'+inTxt(nx):''}`); }
  if(md){
    const cad = (state.mcad||{})[icao];
    bits.push(`MADIS ${agoTxt(md.valid)}${cad?' \u00b7 ~'+cad+'m cadence (METAR + SPECI via IEM)':' \u00b7 SPECIs as they occur'}`);
  }
  if(tf && tf.issueTime){ bits.push(`TAF issued ${agoTxt(tf.issueTime)} \u00b7 next ~${fmtLZ(nextTaf())} ${inTxt(nextTaf())}`); }
  const hb = (state.harbor||{})[icao];
  if(hb) bits.push(`MXAK ${agoTxt(hb.t)} \u00b7 next ~10m`);
  return bits.join(' \u2003 ');
}

/* Worst case across the current METAR plus every TAF group overlapping the window */
const MX_FOR_STATION = { PEC:'Pelican', TKE:'Tenakee', PAEL:'George Island', PAGS:'Gustavus Dock' };

function stationWorst(icao, winHrs){
  const m = state.metars[icao];
  const out = {icao, obs:null, madis:null, worstCig:null, worstVis:null, wx:new Set(), maxWind:0, gust:0, llws:false, cat:'NA', tafWorst:null};
  if(m){
    const cig = ceilingOf(m.clouds, m.vertVis);
    const vis = parseVis(m.visib);
    out.obs = {cig, vis, visRaw:m.visib, wx:wxTokens(m.wxString), wdir:m.wdir, wspd:m.wspd||0, wgst:m.wgst||0, temp:m.temp, dewp:m.dewp, raw:m.rawOb, t:m.obsTime||m.reportTime};
    out.worstCig = cig; out.worstVis = vis; out.worstVisRaw = m.visib;
    out.worstCigSrc = cig!==null ? 'METAR' : null; out.worstVisSrc = vis!==null ? 'METAR' : null;
    out.obs.wx.forEach(t=>out.wx.add(t));
    out.maxWind = m.wspd||0; out.gust = m.wgst||0;
  }
  const md = state.madis[icao];
  if(md){
    out.madis = md;
    if(md.cig !== null && (out.worstCig === null || md.cig < out.worstCig)){ out.worstCig = md.cig; out.worstCigSrc = 'MADIS'; }
    if(md.vis !== null && (out.worstVis === null || md.vis < out.worstVis)){ out.worstVis = md.vis; out.worstVisRaw = md.vis; out.worstVisSrc = 'MADIS'; }
    md.wx.forEach(t=>out.wx.add(t));
    if(md.sknt > out.maxWind) out.maxWind = md.sknt;
    if(md.gust > out.gust) out.gust = md.gust;
    if(!out.obs){ // MADIS-only station (Elfin Cove observer days)
      /* wdir was hard-coded null here, so a directional MADIS wind was judged
         against the most restrictive arc and could cry OVER LIMIT falsely */
      out.obs = {cig:md.cig, vis:md.vis, visRaw:md.vis, wx:md.wx, wdir:(md.wdir === undefined ? null : md.wdir), wspd:md.sknt, wgst:md.gust, raw:md.metar||('MADIS '+md.valid+'Z'), t:md.valid};
    }
  }
  const hb = (state.harbor||{})[icao];
  const mxHere = mxByName(MX_FOR_STATION[icao]);
  if((hb || mxHere) && !out.obs){ // Marine Exchange harbor wind, no cig/vis, unofficial
    /* Prefer the operator's own one-minute data over the NDBC rebroadcast when we have it. */
    const mxs = mxHere;
    if(mxs){
      out.obs = {cig:null, vis:null, visRaw:null, wx:[], wdir:mxs.wdir, wspd:mxs.wspd||0, wgst:mxs.gust||0,
        raw:'MXAK ' + mxs.name + ' ' + (mxs.wdir===null?'VRB':String(mxs.wdir).padStart(3,'0')) + '/' + (mxs.wspd||0)
          + (mxs.gust?'G'+mxs.gust:'') + 'kt',
        t: new Date(mxs.issued).toISOString().slice(0,16).replace('T',' ') + 'Z',
        unofficial:true, mxTrend:mxs.trend, mxTrendKt:mxs.trendKt, mxTrendMin:mxs.trendMin};
      out.maxWind = mxs.wspd||0; out.gust = mxs.gust||0;
    } else if(hb){
      out.obs = {cig:null, vis:null, visRaw:null, wx:[], wdir:hb.wdir, wspd:hb.wspd||0, wgst:hb.gust||0, raw:'MXAK '+hb.raw, t:hb.t, unofficial:true};
      out.maxWind = hb.wspd||0; out.gust = hb.gust||0;
    }
  }
  /* Camera visibility. METAR and MADIS are measured and always win; VEIA only fills a gap.
     At Pelican and Tenakee there is no certified observation at all, so the camera becomes the
     station visibility and is labelled as estimated. Everywhere else it is carried for the
     expanded window and never promoted into the row. */
  const cam = camForStation(icao);
  if(cam){
    out.cam = cam;
    if(cam.veia){
      out.veia = {vis:cam.veia.vis, conf:cam.veia.conf, sky:cam.veia.sky, t:cam.veia.t, crowd:cam.veia.crowd};
      const noCertifiedVis = out.worstVis === null || out.worstVis === undefined;
      if(VEIA_PRIMARY.includes(icao) && noCertifiedVis){
        out.worstVis = cam.veia.vis; out.worstVisRaw = cam.veia.vis; out.worstVisSrc = 'VEIA';
        if(!out.obs){
          out.obs = {cig:null, vis:cam.veia.vis, visRaw:cam.veia.vis, wx:[], wdir:null, wspd:0, wgst:0,
                     raw:'FAA camera VEIA ' + visTxt(cam.veia.vis) + ' sm', t:cam.veia.t/1000, estimated:true};
        } else if(out.obs.vis === null || out.obs.vis === undefined){
          out.obs.vis = cam.veia.vis; out.obs.visRaw = cam.veia.vis; out.obs.visEstimated = true;
        }
      }
    }
  }
  out.nowCig = out.worstCig; out.nowVis = out.worstVis; out.nowVisRaw = out.worstVisRaw;
  out.nowCigSrc = out.worstCigSrc; out.nowVisSrc = out.worstVisSrc;
  const taf = state.tafs[icao];
  if(taf && winHrs > 0){
    const t0 = Date.now()/1000, t1 = t0 + winHrs*3600;
    let tc = null, tv = null, tvRaw = null;
    (taf.fcsts||[]).forEach(f=>{
      if(f.timeFrom < t1 && f.timeTo > t0){
        const cig = ceilingOf(f.clouds, f.vertVis);
        const vis = parseVis(f.visib);
        const grp = {lbl:(f.fcstChange||'BASE')+(f.probability?' P'+f.probability:''), t0:f.timeFrom*1000, t1:f.timeTo*1000, cig, vis, visRaw:f.visib, wx:f.wxString||''};
        if(cig !== null && (out.worstCig === null || cig < out.worstCig)){ out.worstCig = cig; out.worstCigSrc = 'TAF'; out.worstCigT = f.timeFrom*1000 > Date.now() ? f.timeFrom*1000 : null; out.worstCigGrp = grp; }
        if(vis !== null && (out.worstVis === null || vis < out.worstVis)){ out.worstVis = vis; out.worstVisRaw = f.visib; out.worstVisSrc = 'TAF'; out.worstVisT = f.timeFrom*1000 > Date.now() ? f.timeFrom*1000 : null; out.worstVisGrp = grp; }
        if(cig !== null && (tc === null || cig < tc)) tc = cig;
        if(vis !== null && (tv === null || vis < tv)){ tv = vis; tvRaw = f.visib; }
        wxTokens(f.wxString).forEach(t=>out.wx.add(t));
        if((f.wspd||0) > out.maxWind) out.maxWind = f.wspd;
        if((f.wgst||0) > out.gust) out.gust = f.wgst;
        if(f.wshearHgt != null || f.wshearSpd != null) out.llws = true;
        if(f.wshearSpd != null && f.wshearSpd > (out.maxWshear||0)) out.maxWshear = f.wshearSpd;
      }
    });
    out.tafWorst = {cig:tc, vis:tv, visRaw:tvRaw, raw:taf.rawTAF};
  }
  out.cat = flightCat(out.worstCig, out.worstVis);
  /* The badge has always been the worst of what is happening and what is forecast inside the
     window, which is the right thing for a go decision. But it hides the case the dispatcher
     actually has to reason about: severe clear right now, and the only reason the row is
     purple is a TEMPO group hours away. Keep the blended value, and carry the two halves
     separately so the row can show both and name the group responsible. */
  out.obsCat = flightCat(out.nowCig, out.nowVis);
  out.tafCat = out.tafWorst ? flightCat(out.tafWorst.cig, out.tafWorst.vis) : 'NA';
  return out;
}

/* ================= AIRMET / hazards ================= */
/* This used to ask only whether an AIRMET polygon had a VERTEX inside the panhandle box.
   Gulf of Alaska AIRMETs are large, and their corners sit off Anchorage, Yakutat and Prince
   Rupert, so a polygon that swallows Southeast whole has no vertex in the box and was being
   dropped. That is a hazard silently going missing, so this now does a real polygon versus
   rectangle intersection: vertex in box, box corner in polygon, or any edge crossing. */
function pointInPoly(lat, lon, poly){
  let inside = false;
  for(let i = 0, j = poly.length - 1; i < poly.length; j = i++){
    const yi = poly[i].lat, xi = poly[i].lon, yj = poly[j].lat, xj = poly[j].lon;
    if(((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / ((yj - yi) || 1e-12) + xi)) inside = !inside;
  }
  return inside;
}
function segCross(a, b, c, d){
  const o = (p, q, r) => Math.sign((q.lon - p.lon) * (r.lat - p.lat) - (q.lat - p.lat) * (r.lon - p.lon));
  return o(a,b,c) !== o(a,b,d) && o(c,d,a) !== o(c,d,b);
}
function boxCorners(){
  return [
    {lat:BBOX.latMin, lon:BBOX.lonMin}, {lat:BBOX.latMin, lon:BBOX.lonMax},
    {lat:BBOX.latMax, lon:BBOX.lonMax}, {lat:BBOX.latMax, lon:BBOX.lonMin}
  ];
}
function inBox(coords){
  const poly = (coords||[]).filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lon));
  if(!poly.length) return false;
  if(poly.some(p => p.lat >= BBOX.latMin && p.lat <= BBOX.latMax && p.lon >= BBOX.lonMin && p.lon <= BBOX.lonMax)) return true;
  const cs = boxCorners();
  if(cs.some(c => pointInPoly(c.lat, c.lon, poly))) return true;
  for(let i = 0; i < poly.length; i++){
    const a = poly[i], b = poly[(i + 1) % poly.length];
    for(let j = 0; j < 4; j++){
      if(segCross(a, b, cs[j], cs[(j + 1) % 4])) return true;
    }
  }
  return false;
}
function hazardSummary(){
  const out = {ice:null, turb:null, llws:null, ifr:null, mtnObsc:null, fzl:null, raws:[]};
  state.airmets.forEach(a=>{
    if(!inBox(a.coords)) return;
    out.raws.push(a.rawAirSigmet || a.rawText || JSON.stringify(a).slice(0,300));
    const hz = (a.hazard||'').toUpperCase();
    const lo = a.altitudeLow1 ?? a.altitudeLow ?? null;
    const hi = a.altitudeHi1 ?? a.altitudeHi2 ?? a.altitudeHigh ?? null;
    const rng = (lo!=null||hi!=null) ? ((lo!=null? (lo===0?'SFC':lo.toLocaleString()+' ft'):'?') + ' to ' + (hi!=null? hi.toLocaleString()+' ft':'?')) : '';
    if(hz.includes('ICE') && !out.ice) out.ice = rng || 'active';
    if(hz.includes('TURB') && !out.turb) out.turb = rng || 'active';
    if((hz.includes('LLWS') || hz.includes('WIND SHEAR') || hz==='WS') && !out.llws) out.llws = 'active';
    if(hz.includes('IFR') && !out.ifr) out.ifr = 'active';
    if((hz.includes('MTN') || hz.includes('OBSC')) && !out.mtnObsc) out.mtnObsc = 'active';
    const raw = a.rawAirSigmet || '';
    const fz = raw.match(/(?:FRZLVL|FZLVL|FREEZING LEVEL)[^A-Z]*?(\d{3})/);
    if(fz && !out.fzl) out.fzl = parseInt(fz[1],10)*100;
  });
  return out;
}

/* ================= RENDER: LIVE ================= */
function catBadge(cat){ return `<span class="worst cat-${cat}" title="${esc(catTitle(cat, null, null))}" style="cursor:help">${cat}</span>`; }

/* Corridor popup, rebuilt as source documents rather than a synthesised verdict. The old one
   folded METAR, MADIS, TAF and FA together into a CONTROLLING line, which meant a 300 ft TAF
   group could drive the whole route with nothing on screen saying which document it came from
   or that the TAF was about to expire. Each source is now shown whole, in its own section. */
function tafExpiryTag(t){
  const end = t && t.validTimeTo ? toDate(t.validTimeTo) : null;
  if(!end) return '';
  const mins = Math.round((end.getTime() - Date.now()) / 60000);
  if(mins <= 0) return ` <b style="color:var(--ifr)">TAF EXPIRED ${Math.abs(mins)} min ago</b>`;
  if(mins <= 90) return ` <b style="color:var(--amber)">TAF expires in ${mins} min</b>`;
  return '';
}
/* When the summary row is being driven by a TAF, say whether that TAF is still good for
   anything. A 300 ft ceiling from a forecast that expires in two minutes should not read the
   same as one with eight hours left on it. */
/* Worst of the route up top with its provenance, then the sources below with the driving
   line highlighted. The point is that every number in this box can be traced to a document
   further down the same popup. */
function fromLabel(f){
  if(!f) return '';
  let lab = esc(f.label || '');
  if(f.kind === 'stn' && f.src === 'TAF') lab += esc(tafSrcNote(f.icao).replace(' (per TAF','').replace(')',''));
  if(f.starts) lab += ' begins ' + fmtLZ(f.starts);
  return lab;
}
/* Parse every icing statement in a zone's ...ICE section: qualifier, severity,
   type and the level band, in feet. AAWU writes bands as hundreds of feet with an
   optional FL prefix ("MOD RIME ICGIC 040-120", "LGT ICGICIP 060-FL180",
   "SEV CLR ICGIC BLW 080"). Anything whose base starts below FL150 matters to us;
   higher layers are kept but set aside. */
const iceLvl = t => t ? (String(t).startsWith('FL') ? parseInt(t.slice(2),10) : parseInt(t,10)) * 100 : null;
const fmtLvlFt = n => n === null ? '?' : n === 0 ? 'SFC' : (n >= 18000 ? 'FL' + Math.round(n/100) : n.toLocaleString() + ' ft');
const ICE_LOW_TOP = 15000;
function parseIceLayers(txt){
  const out = [];
  const re = /(ISOL|OCNL|CONT)?\s*(LGT\/MOD|MOD\/SEV|LGT|MOD|SEV)\s+((?:RIME|CLR|MXD)\s+)?(?:ICGICIP|ICEICIP|ICGIC|ICEIC|ICGIP|ICEIP|ICG|ICE)\s*(?:((?:FL)?\d{3})\s*-\s*((?:FL)?\d{3})|BLW\s+((?:FL)?\d{3}))?/g;
  let m;
  while((m = re.exec(String(txt||''))) !== null){
    if(/NIL SIG|NO SIG/.test(String(txt).slice(Math.max(0, m.index-10), m.index+20))) continue;
    const sev = m[2];
    const rank = /SEV/.test(sev) ? 3 : /MOD/.test(sev) ? 2 : 1;
    const base = m[6] ? 0 : iceLvl(m[4]);
    const top = m[6] ? iceLvl(m[6]) : iceLvl(m[5]);
    const typ = {rime:'rime', clr:'clear', mxd:'mixed'}[(m[3]||'').trim().toLowerCase()] || '';
    out.push({qual:m[1]||'', sev, rank, type:typ,
      base, top, low: base === null ? null : base < ICE_LOW_TOP});
  }
  return out;
}
/* Icing measured against the altitudes we actually file. Only corridors with a
   stated cruise band get this; the rest wait for real numbers rather than guesses. */
function corrIceHTML(c, opts){
  if(!c.alt) return '';
  const small = opts && opts.small;
  const hits = [];
  (c.zones||[]).forEach(zid=>{
    const z = state.fa.zones[zid]; if(!z || !z.ice || !z.ice.length) return;
    parseIceLayers(z.ice.join(' ')).forEach(L=>{
      Object.keys(c.alt).forEach(k=>{
        const [lo, hiA] = c.alt[k];
        const overlaps = L.base === null
          ? true                                      // levels not stated: cannot clear it
          : L.base < hiA && (L.top === null || L.top > lo);
        if(overlaps) hits.push({k, L, zid});
      });
    });
  });
  if(!hits.length) return '';
  const worst = hits.reduce((a,b2)=>b2.L.rank > a.L.rank ? b2 : a, hits[0]);
  const col = worst.L.rank >= 3 ? 'var(--ifr)' : 'var(--amber)';
  const name = {c208:'C208', pc12:'PC-12'};
  const byClass = ['c208','pc12'].map(k=>{
    const h = hits.filter(x=>x.k === k);
    if(!h.length) return null;
    const w2 = h.reduce((a,b2)=>b2.L.rank > a.L.rank ? b2 : a, h[0]);
    const band = w2.L.base === null ? 'levels not stated'
      : fmtLvlFt(w2.L.base) + '\u2013' + fmtLvlFt(w2.L.top);
    return `${name[k]} ${c.alt[k][0]/1000}\u2013${c.alt[k][1]/1000}k: ${(w2.L.qual?w2.L.qual+' ':'')}${w2.L.sev}${w2.L.type?' '+w2.L.type:''} ${band} (${w2.zid})`;
  }).filter(Boolean);
  const title = 'Forecast icing layers from the AAWU zones on this corridor that overlap the altitude band each type files. '
    + 'C208 ' + c.alt.c208[0].toLocaleString() + '\u2013' + c.alt.c208[1].toLocaleString() + ' ft, PC-12 '
    + c.alt.pc12[0].toLocaleString() + '\u2013' + c.alt.pc12[1].toLocaleString() + ' ft. A layer with no stated levels cannot be ruled out and is flagged for both.';
  return `<br><span style="${small?'font-size:11px;':''}color:${col};font-weight:700;cursor:help" title="${esc(title)}">ICE in cruise band \u00b7 ${byClass.join(' \u00b7 ')}</span>`;
}
/* When does a forecast weather token actually begin on this corridor? The FA zone
   lines carry their own windows and the TAF groups their own start times, so the
   corridor table can say "from 13:00L" instead of implying thunderstorms are on
   the route right now. */
function corrWxStart(c, tok, nowMs){
  let best = null, activeNow = false;
  (c.zones||[]).forEach(zid=>{
    const z = state.fa.zones[zid]; if(!z) return;
    (z.lines||[]).forEach(l=>{
      if(!l.conds || !l.conds.wx || !l.conds.wx.has(tok)) return;
      const from = l.from ? l.from.getTime() : null;
      const to = l.to ? l.to.getTime() : null;
      if(to !== null && to < nowMs) return;
      if(from === null || from <= nowMs){ activeNow = true; return; }
      if(best === null || from < best) best = from;
    });
  });
  (c.via||[]).forEach(icao=>{
    const t = state.tafs[icao]; if(!t) return;
    (t.fcsts||[]).forEach(f=>{
      if(!wxTokens(f.wxString).includes(tok)) return;
      const from = (f.timeFrom||0)*1000, to = (f.timeTo||0)*1000;
      if(to && to < nowMs) return;
      if(from <= nowMs){ activeNow = true; return; }
      if(best === null || from < best) best = from;
    });
  });
  return activeNow ? {now:true} : (best !== null ? {at:best} : null);
}
/* The corridor weather, honest about time: what stations are reporting this minute,
   what the forecast holds active right now, and what is coming with its start time.
   Upcoming weather is grouped by when it begins so nothing future reads as present. */
function corrWxHTML(c, opts){
  const small = opts && opts.small;
  const nowMs = Date.now();
  const observed = wxSummary([...c.now.wx]);
  const added = [...c.wx].filter(t=>!c.now.wx.has(t));
  const fcstNow = [], timed = {}, untimed = [];
  added.forEach(tok=>{
    const st2 = corrWxStart(c, tok, nowMs);
    if(st2 && st2.now) fcstNow.push(wxWord(tok));
    else if(st2 && st2.at) (timed[st2.at] = timed[st2.at] || []).push(wxWord(tok));
    else untimed.push(wxWord(tok));
  });
  const fs = small ? 'font-size:11px;' : '';
  const bits = [`<span>${observed ? 'now: ' + observed : 'nothing observed on the route now'}</span>`];
  if(fcstNow.length) bits.push(`<span style="${fs}color:var(--amber)">forecast in effect now: ${fcstNow.join(', ')}</span>`);
  Object.keys(timed).map(Number).sort((a,b2)=>a-b2).forEach(at=>{
    bits.push(`<span style="${fs}color:var(--amber);font-weight:700" title="Not active yet. Begins ${fmtLZ(at)} local per the FA zone lines and TAF groups on this corridor.">not yet \u00b7 from ${fmtLZ(at)}: ${timed[at].join(', ')}</span>`);
  });
  if(untimed.length) bits.push(`<span style="${fs}color:var(--amber)">later in window: ${untimed.join(', ')}</span>`);
  return bits.join('<br>');
}
function corrSummary(c){
  const changed = (c.cat !== c.now.cat || c.cig !== c.now.cig || c.vis !== c.now.vis);
  const ts = [c.cigFrom && c.cigFrom.starts, c.visFrom && c.visFrom.starts].filter(Boolean);
  const startT = ts.length ? Math.min(...ts) : null;
  const nowBit = `NOW <b class="worst cat-${c.now.cat}" style="font-size:12px;padding:1px 9px;font-weight:800;letter-spacing:.4px">${c.now.cat}</b> cig <b>${fmtCig(c.now.cig)}</b> vis <b>${c.now.vis===null?'?':visTxt(c.now.visRaw ?? c.now.vis)+' sm'}</b>`
    + (changed ? ` <span style="color:var(--amber)">\u2192 WINDOW <b class="worst cat-${c.cat}" style="font-size:12px;padding:1px 9px;font-weight:800;letter-spacing:.4px">${c.cat}</b>${startT?' starting '+fmtLZ(startT):''}</span>` : ' <span style="color:var(--mut)">(no change in window)</span>');
  return `<div style="border:1px solid var(--amber);border-radius:6px;padding:5px 8px;margin-bottom:6px">
    <div style="color:var(--amber);font-weight:700">CONTROLLING ${esc(c.label.toUpperCase())}</div>
    <div style="font-size:11.5px">${nowBit}</div>
    <div style="font-size:11.5px">CIG <b class="drv">${fmtCig(c.cig)}</b>${c.cigFrom?' <span style="color:var(--mut)">\u2190 '+fromLabel(c.cigFrom)+'</span>':''}
      &nbsp;\u2022&nbsp; VIS <b class="drv">${c.vis===null?'?':visTxt(c.visRaw ?? c.vis)+' sm'}</b>${c.visFrom?' <span style="color:var(--mut)">\u2190 '+fromLabel(c.visFrom)+'</span>':''}</div>
    <div style="font-size:11.5px;color:var(--mut)">WX \u00b7 ${corrWxHTML(c)}</div>
    ${(function(){ const ih = corrIceHTML(c); return ih ? `<div style="font-size:11.5px">${ih.replace(/^<br>/,'')}</div>` : ''; })()}
  </div>`;
}
/* ================= NWS Area Forecast Discussion (AFDAJK) =================
   The forecasters' own written reasoning for the day. Fetched from the NWS product API,
   which is public and needs no key: /products/types/AFD/locations/AJK lists the issuances,
   newest first, and each carries a productText. Parsed into its sections so the AVIATION
   paragraph can lead, since that is the one written for us. */
const AFD_LIST_URL = 'https://api.weather.gov/products/types/AFD/locations/AJK';
const AFD_MAX_AGE_MS = 20 * 60000;
function parseAFD(text){
  const raw = String(text||'').replace(/\r/g,'');
  const lines = raw.split('\n');
  const head = {title:'', office:'', issued:''};
  for(let i = 0; i < Math.min(lines.length, 12); i++){
    const l = lines[i].trim();
    if(/Forecast Discussion/i.test(l) && !head.title) head.title = l;
    else if(/^National Weather Service/i.test(l)) head.office = l;
    else if(/\b(AM|PM)\b.*\b(AKDT|AKST|UTC)\b/i.test(l) && !head.issued) head.issued = l;
  }
  // sections open with a line like .AVIATION... or .SHORT TERM.../Through Saturday Night/...
  const marks = [];
  const re = /^\.([A-Z][A-Z0-9 \/]*?)\.\.\./;
  lines.forEach((l, i)=>{ const m = l.match(re); if(m) marks.push({i, name:m[1].trim()}); });
  const sections = marks.map((mk, k)=>{
    const end = k + 1 < marks.length ? marks[k+1].i : lines.length;
    let chunk = lines.slice(mk.i, end).join('\n');
    chunk = chunk.replace(re, '');
    let label = '';
    const lm = chunk.match(/^\/([^\/]+)\/\.\.\./);
    if(lm){ label = lm[1].trim(); chunk = chunk.slice(lm[0].length); }
    // && separates sections, $$ ends the product and is followed by the signature block
    const stop = chunk.search(/^\s*\$\$\s*$/m);
    if(stop >= 0) chunk = chunk.slice(0, stop);
    chunk = chunk.split('\n').filter(l=>!/^\s*&&\s*$/.test(l)).join('\n').trim();
    return {name: mk.name, label, body: chunk};
  }).filter(sec=>sec.body);
  return {head, sections, raw};
}
/* The product is hard wrapped at about 70 columns for teletype. Those breaks mean nothing in
   a browser and make it read raggedly, so wrapped lines get rejoined. Breaks that ARE
   meaningful, the key message bullets and the labelled lines like PUBLIC... or Outside (...),
   are kept. */
function afdReflow(par){
  const isNewLine = l => /^\s*-/.test(l) || /^[A-Z][A-Z ]*\.\.\./.test(l) || /^(Outside|Inside)\s*\(/.test(l) || /^Key Messages:/i.test(l);
  const out = [];
  par.split('\n').forEach(l=>{
    const t = l.trim();
    if(!t) return;
    if(!out.length || isNewLine(t)) out.push(t);
    else out[out.length-1] += ' ' + t;
  });
  return out.join('\n');
}
function afdSectionHTML(sec, lead){
  const bullets = afdReflow(sec.body).split('\n').map(par=>{
    const t = par.trim(); if(!t) return '';
    if(/^Key Messages:/i.test(t)) return `<div style="color:var(--amber);font-weight:700;margin-top:2px">${esc(t)}</div>`;
    if(/^-/.test(t)) return `<div style="margin:2px 0 2px 8px;border-left:2px solid var(--line);padding-left:7px">${esc(t.replace(/^-\s*/,''))}</div>`;
    const sub = t.match(/^([A-Z][A-Za-z ()\/]+):\s*/);
    const hasUgc = /[A-Z]{3}\d{3}/.test(t);
    if(sub) return `<div style="margin:3px 0"><b style="color:var(--ink)">${esc(sub[1])}</b> ${hasUgc ? ugcDecodeHTML(t.slice(sub[0].length)) : esc(t.slice(sub[0].length))}</div>`;
    return `<div style="margin:3px 0">${hasUgc ? ugcDecodeHTML(t) : esc(t)}</div>`;
  }).join('');
  return `<div style="margin-bottom:9px;${lead?'border:1px solid var(--amber);border-radius:6px;padding:6px 9px':''}">
    <div style="color:${lead?'var(--amber)':'var(--mut)'};font-weight:700;letter-spacing:.4px;font-size:11.5px">${esc(sec.name)}${sec.label?' <span style="color:var(--mut);font-weight:400">'+esc(sec.label)+'</span>':''}</div>
    <div style="font-size:12px;line-height:1.5">${bullets}</div></div>`;
}
async function loadAFD(force){
  if(!force && state.afd && state.afd.text && (Date.now() - (state.afd.at||0)) < AFD_MAX_AGE_MS) return state.afd;
  try{
    const list = await fetchJSON(AFD_LIST_URL);
    const items = list['@graph'] || list.graph || list.features || [];
    if(!items.length) throw new Error('no AFD issuances listed');
    const newest = items[0];
    const doc = await fetchJSON(newest['@id'] || newest.id);
    state.afd = {text: doc.productText || '', issuanceTime: newest.issuanceTime || doc.issuanceTime || null,
                 office: newest.issuingOffice || 'PAJK', at: Date.now(), error: null};
  }catch(e){
    state.afd = {text:'', error: String((e && e.message) || e), at: Date.now()};
  }
  return state.afd;
}
/* ---- NWS zone decoding. Advisory lines cite zones as compressed UGC strings like
   PKZ021-022-032>036-641>644, which nobody has memorized. The Juneau-office marine
   zones are baked in from weather.gov/marine/ajkmz; anything not in the table (public
   AKZ zones, renumbered zones) is looked up once from api.weather.gov and cached. */
const NWS_ZONES = {
  PKZ011:'Glacier Bay', PKZ012:'Northern Lynn Canal', PKZ013:'Southern Lynn Canal',
  PKZ021:'Icy Strait', PKZ022:'Cross Sound', PKZ031:'Stephens Passage',
  PKZ032:'Northern Chatham Strait', PKZ033:'Southern Chatham Strait',
  PKZ034:'Frederick Sound', PKZ035:'Sumner Strait', PKZ036:'Clarence Strait',
  PKZ053:'Yakutat Bay',
  PKZ641:'Dixon Entrance to Cape Decision, out to 15 nm', PKZ642:'Cape Decision to Cape Edgecumbe, out to 15 nm',
  PKZ643:'Cape Edgecumbe to Cape Spencer, out to 15 nm', PKZ644:'Cape Spencer to Cape Fairweather, out to 15 nm',
  PKZ651:'Cape Fairweather to Icy Cape, out to 15 nm', PKZ652:'Icy Cape to Cape Suckling, out to 15 nm',
  PKZ661:'Dixon Entrance to Cape Decision, 15 to 90 nm out', PKZ662:'Cape Decision to Cape Edgecumbe, 15 to 80 nm out',
  PKZ663:'Cape Edgecumbe to Cape Spencer, 15 to 80 nm out', PKZ664:'Cape Spencer to Cape Fairweather, 15 to 85 nm out',
  PKZ671:'Cape Fairweather to Icy Cape, 15 to 80 nm out', PKZ672:'Icy Cape to Cape Suckling, 15 to 80 nm out',
  PKZ098:'SE Alaska inside waters synopsis', PKZ099:'SE Alaska outside waters synopsis',
};
let ZONE_NAMES = null;
function zoneNames(){
  if(!ZONE_NAMES){
    ZONE_NAMES = Object.assign({}, NWS_ZONES);
    try{ Object.assign(ZONE_NAMES, JSON.parse(localStorage.getItem('wxb_zonenames') || '{}')); }catch(e){}
  }
  return ZONE_NAMES;
}
/* Expand a UGC segment: the prefix carries forward, - separates, > is a range.
   "PKZ021-022-032>036" becomes PKZ021, PKZ022, PKZ032..PKZ036. */
function ugcExpand(seg){
  const toks = String(seg||'').replace(/\s+/g,'').replace(/\.+$/,'').split('-').filter(Boolean);
  let pfx = null; const out = [];
  toks.forEach(t=>{
    const m = t.match(/^([A-Z]{3})?(\d{3})(?:>(\d{3}))?$/);
    if(!m) return;
    if(m[1]) pfx = m[1];
    if(!pfx) return;
    const a = parseInt(m[2],10), b = m[3] ? parseInt(m[3],10) : parseInt(m[2],10);
    for(let n2 = a; n2 <= Math.min(b, a + 99); n2++) out.push(pfx + String(n2).padStart(3,'0'));
  });
  return out;
}
let zoneFetchBusy = false;
async function fetchZoneNames(ids){
  const missing = ids.filter(z=>!zoneNames()[z]);
  if(!missing.length || zoneFetchBusy) return;
  zoneFetchBusy = true;
  try{
    const j = await fetchJSON('https://api.weather.gov/zones?id=' + missing.join(','));
    ((j && j.features) || []).forEach(f=>{
      const pr = f.properties || {};
      if(pr.id && pr.name) ZONE_NAMES[pr.id] = pr.name;
    });
    // anything the API did not return stays unknown; remember only real names
    const cached = {}; for(const k in ZONE_NAMES) if(!NWS_ZONES[k]) cached[k] = ZONE_NAMES[k];
    try{ localStorage.setItem('wxb_zonenames', JSON.stringify(cached)); }catch(e){}
    renderAFDBox();
  }catch(e){}
  zoneFetchBusy = false;
}
/* Translate every UGC string in a block of advisory text into named areas, shown
   under the line that cited them. Unknown zones keep their code and trigger a lookup. */
function ugcDecodeHTML(body){
  const re = /[A-Z]{3}\d{3}(?:\s*[->]\s*(?:[A-Z]{3})?\d{3})*[-.]?/g;
  const lines = String(body||'').split('\n');
  const pend = [];
  const html = lines.map(l=>{
    const segs = l.match(re);
    if(!segs) return esc(l);
    const zones = [];
    segs.forEach(g=>ugcExpand(g).forEach(z=>{ if(!zones.includes(z)) zones.push(z); }));
    if(!zones.length) return esc(l);
    zones.forEach(z=>{ if(!zoneNames()[z]) pend.push(z); });
    const named = zones.map(z=>{
      const nm = zoneNames()[z];
      return nm ? `<span class="zname" title="${esc(z)}">${esc(nm)}</span>`
                : `<span class="zname zunk" title="looking up ${esc(z)}">${esc(z)}</span>`;
    }).join('<span style="color:var(--line)"> \u00b7 </span>');
    return esc(l) + `<div class="ugcdecode">= ${zones.length} zone${zones.length>1?'s':''}: ${named}</div>`;
  }).join('\n');
  if(pend.length) setTimeout(()=>fetchZoneNames(pend.slice(0,60)), 0);
  return html;
}
/* The aviation paragraph is the one written for us, so it leads and the rest is trimmed to
   the key messages. The whole product stays one click away rather than being the only view. */
function afdInlineHTML(){
  const a = state.afd || {};
  if(a.error && !a.text) return `<span style="color:var(--ifr)">Could not load AFDAJK: ${esc(a.error)}</span>`;
  if(!a.text) return '<span style="color:var(--mut)">Loading the area forecast discussion...</span>';
  const P = parseAFD(a.text);
  state.afdOpen = state.afdOpen || new Set();
  /* The whole product, one folded chip per section, aviation first because it is
     written for us. Each opens on click and stays open across the 5 minute refresh. */
  const pretty = n => {
    const u = String(n).toUpperCase();
    if(/WATCHES|WARNINGS|ADVISORIES/.test(u)) return 'Watches, warnings, advisories';
    if(/UPDATE/.test(u)) return 'Update';
    return u.charAt(0) + u.slice(1).toLowerCase();
  };
  const secs = P.sections.slice().sort((x,y)=>(y.name === 'AVIATION') - (x.name === 'AVIATION'));
  const out = secs.map(sec=>{
    const body = afdReflow(sec.body || '').trim();
    if(!body) return '';
    const key = sec.name;
    const flat = body.replace(/\s+/g, ' ');
    let inner, preview = flat.slice(0, 120) + (flat.length > 120 ? '\u2026' : '');
    let imp = false;
    if(key === 'SYNOPSIS'){
      const keys = body.split('\n').filter(l=>l.trim().startsWith('-')).map(l=>l.replace(/^\s*-\s*/, ''));
      if(keys.length){
        preview = keys.join(' \u00b7 ');
        imp = keys.some(k=>/Warning|Watch/i.test(k));
      }
      inner = (keys.length ? '<div class="afdkeys">' + keys.map(k=>`<div class="km">${esc(k)}</div>`).join('') + '</div>' : '')
        + `<div class="afdtxt">${esc(body)}</div>`;
    } else if(/WATCHES|WARNINGS|ADVISORIES/.test(key)){
      const active = body.split('\n').filter(l=>!/\.\.\.\s*None\.?\s*$/i.test(l.trim()) && l.trim());
      imp = /Advisory|Warning|Watch/i.test(body.replace(/WATCHES\/WARNINGS\/ADVISORIES/i, ''));
      /* the preview names the areas instead of reciting zone codes */
      let prevTxt = active.join(' \u00b7 ').replace(/\s+/g, ' ');
      const ugcRe = /[A-Z]{3}\d{3}(?:\s*[->]\s*(?:[A-Z]{3})?\d{3})*[-.]?/g;
      prevTxt = prevTxt.replace(ugcRe, g=>{
        const zs = ugcExpand(g);
        if(!zs.length) return g;
        const nm = zs.map(z=>zoneNames()[z]).filter(Boolean);
        const shown = nm.slice(0, 3).map(x=>x.replace(/,.*$/,''));
        return shown.join(', ') + (zs.length > shown.length ? ` +${zs.length - shown.length} more` : '');
      });
      preview = imp ? prevTxt.slice(0, 160) : 'None in effect';
      inner = `<div class="afdtxt">${ugcDecodeHTML(body)}</div>`;
    } else {
      inner = `<div class="afdtxt">${esc(body)}</div>`;
    }
    return `<details class="afdsec${imp ? ' imp' : ''}" data-key="${esc(key)}"${state.afdOpen.has(key) ? ' open' : ''}>`
      + `<summary><b>${esc(pretty(key))}</b><span class="afdprev">${esc(preview)}</span></summary>${inner}</details>`;
  }).join('');
  const zHHMM = t => { try{ const d2 = toDate(t); return String(d2.getUTCHours()).padStart(2,'0') + ':' + String(d2.getUTCMinutes()).padStart(2,'0') + 'Z'; }catch(e){ return ''; } };
  const head = `<div class="afdissue"><span style="color:var(--ink)">${esc(P.head.title || 'Southeast Alaska Forecast Discussion')}</span> <span style="color:var(--mut)">\u00b7 ${esc(P.head.office || 'National Weather Service Juneau AK')}</span></div>`
    + `<div class="afdissue" style="margin-top:-4px">`
    + (P.head.issued ? `<span style="color:var(--mut)">${esc(P.head.issued)}</span>` : '')
    + (a.issuanceTime ? `${P.head.issued ? ' <span style="color:var(--mut)">\u00b7</span> ' : ''}issued <span class="fstamp" style="color:#c9d7e4">${fmtLZ(a.issuanceTime)} / ${zHHMM(a.issuanceTime)}</span> <span style="color:var(--mut)">(${agoTxt(a.issuanceTime)})</span>` : '')
    + ` <span style="color:var(--mut)" title="A forecast discussion carries no expiration time. It stands until the forecaster writes the next one, normally a few times a day, and this board refetches it every cycle.">\u00b7 no expiry, replaced by the next issuance</span></div>`;
  return head + (out || '<span style="color:var(--mut)">No sections in the current issuance.</span>');
}
function renderAFDBox(){
  const el = document.getElementById('afdBody');
  if(!el) return;
  el.innerHTML = afdInlineHTML();
  if(!el.dataset.foldWired){
    el.dataset.foldWired = '1';
    el.addEventListener('toggle', ev=>{
      const d = ev.target; if(!d.matches || !d.matches('details.afdsec')) return;
      state.afdOpen = state.afdOpen || new Set();
      d.open ? state.afdOpen.add(d.dataset.key) : state.afdOpen.delete(d.dataset.key);
    }, true);
  }
}
async function initAFDBox(){
  renderAFDBox();
  await loadAFD(false);
  renderAFDBox();
}
function renderAFD(){
  const md = document.getElementById('modal');
  const a = state.afd || {};
  if(a.error && !a.text){
    md.innerHTML = `<h2>Forecast discussion <button class="close" id="mClose">Close</button></h2>
      <div style="color:var(--ifr);font-family:var(--mono);font-size:12px">Could not load AFDAJK: ${esc(a.error)}</div>
      <div style="color:var(--mut);font-size:11px;margin-top:6px">Source: ${AFD_LIST_URL}</div>`;
  } else if(!a.text){
    md.innerHTML = `<h2>Forecast discussion <button class="close" id="mClose">Close</button></h2><div style="color:var(--mut)">Loading AFDAJK...</div>`;
  } else {
    const P = parseAFD(a.text);
    // aviation first, then marine, then the rest in the order the forecaster wrote them
    const order = s => s.name === 'AVIATION' ? 0 : s.name === 'MARINE' ? 1 : s.name === 'SYNOPSIS' ? 2 : 3;
    const secs = P.sections.slice().sort((x,y)=>order(x)-order(y) || P.sections.indexOf(x)-P.sections.indexOf(y));
    md.innerHTML = `<h2>Forecast discussion <button class="close" id="mClose">Close</button></h2>
      <div style="color:var(--mut);font-size:11px;margin-bottom:7px">${esc(P.head.title||'Southeast Alaska Forecast Discussion')} \u00b7 ${esc(P.head.office||'')}<br>${esc(P.head.issued||'')}${a.issuanceTime?' \u00b7 issued '+fmtLZ(a.issuanceTime):''}</div>
      ${secs.map(sec=>afdSectionHTML(sec, sec.name==='AVIATION')).join('')}
      <details style="margin-top:6px"><summary style="cursor:pointer;color:var(--mut);font-size:11px">raw product</summary>
      <div class="mono" style="white-space:pre-wrap;font-size:10.5px;color:var(--mut);margin-top:4px">${esc(a.text)}</div></details>`;
  }
  md.style.display = 'block';
  const c = document.getElementById('mClose');
  if(c) c.addEventListener('click', closePanel);
}
async function openAFD(){
  renderAFD();
  await loadAFD(false);
  renderAFD();
}
function tafSrcNote(icao){
  const t = icao ? state.tafs[icao] : null;
  const end = t && t.validTimeTo ? toDate(t.validTimeTo) : null;
  if(!end) return ' (per TAF)';
  const mins = Math.round((end.getTime() - Date.now()) / 60000);
  if(mins <= 0) return ' (per TAF, EXPIRED)';
  if(mins <= 90) return ` (per TAF, expires in ${mins} min)`;
  return ' (per TAF)';
}
function corrMetarBlock(via, c){
  return via.map(icao=>{
    const drivesCig = c && c.cigFrom && c.cigFrom.kind==='stn' && c.cigFrom.icao===icao && c.cigFrom.src!=='TAF';
    const drivesVis = c && c.visFrom && c.visFrom.kind==='stn' && c.visFrom.icao===icao && c.visFrom.src!=='TAF';
    const tag = (drivesCig?' \u2190 LOW CIG':'') + (drivesVis?' \u2190 LOW VIS':'');
    const stn = STATIONS.find(x=>x.icao===icao);
    const nm = stn ? stn.name : icao;
    const m = state.metars[icao], md = state.madis[icao];
    const mLine = m
      ? `${esc(m.rawOb||'')} <span style="color:var(--mut)">(${agoTxt(m.obsTime||m.reportTime)})</span>`
      : '<span style="color:var(--mut)">no METAR on file</span>';
    const dTxt = md ? (md.metar || [md.cig!==null?fmtCig(md.cig):null, md.vis!==null?visTxt(md.vis)+' sm':null,
                       md.sknt?md.sknt+' kt':'calm'].filter(Boolean).join(' ')) : null;
    const dLine = md
      ? `${esc(dTxt)} <span style="color:var(--mut)">(${agoTxt(md.valid)})</span>`
      : '<span style="color:var(--mut)">no MADIS 5 minute ob</span>';
    return `<div class="${tag?'srcwin':'srcdim'}" style="margin-bottom:5px"><b style="color:var(--ink)">${esc(nm)} ${icao}</b>${tag?'<b class="drv">'+tag+'</b>':''}
      <div class="mono" style="font-size:11px">METAR &nbsp;${hlWx(mLine)}</div>
      <div class="mono" style="font-size:11px">MADIS &nbsp;${hlWx(dLine)}</div></div>`;
  }).join('');
}
function corrTafBlock(via, c){
  return via.map(icao=>{
    const cigTaf = c && c.cigFrom && c.cigFrom.kind==='stn' && c.cigFrom.icao===icao && c.cigFrom.src==='TAF';
    const visTaf = c && c.visFrom && c.visFrom.kind==='stn' && c.visFrom.icao===icao && c.visFrom.src==='TAF';
    const tag = (cigTaf?' \u2190 LOW CIG (TAF)':'') + (visTaf?' \u2190 LOW VIS (TAF)':'');
    const stn = STATIONS.find(x=>x.icao===icao);
    const nm = stn ? stn.name : icao;
    const t = state.tafs[icao];
    if(!t) return `<div style="margin-bottom:5px"><b style="color:var(--ink)">${esc(nm)} ${icao}</b> <span style="color:var(--mut)">no TAF issued</span></div>`;
    const groups = (t.fcsts||[]).map(f=>{
      const lbl = (f.fcstChange||'BASE') + (f.probability?' P'+f.probability:'');
      const cg = ceilingOf(f.clouds, f.vertVis), vv = parseVis(f.visib);
      const wnd = (f.wdir!==null&&f.wdir!==undefined) ? `${String(((f.wdir - MAGVAR)+360)%360).padStart(3,'0')}\u00b0M ${f.wspd||0}${f.wgst?'G'+f.wgst:''}kt` : '';
      const wx = wxTokens(f.wxString).map(wxWord).join(', ');
      const cat = flightCat(cg, vv);
      const isDriver = (cigTaf && cg !== null && cg === c.cig) || (visTaf && vv !== null && vv === c.vis);
      return `<div class="mono ${isDriver?'srcwin':''}" style="font-size:11px"><span style="color:var(--amber);font-weight:700">${lbl}</span> ${fmtLZ(f.timeFrom*1000)}\u2013${fmtLZ(f.timeTo*1000)} <span class="worst cat-${cat}" style="font-size:11.5px;padding:1px 8px;font-weight:800;letter-spacing:.4px">${cat}</span> cig <b>${fmtCig(cg)}</b> vis <b>${vv===null?'?':visTxt(f.visib)+' sm'}</b>${wnd?' wind '+wnd:''}${wx?' \u00b7 '+wx:''}</div>`;
    }).join('');
    return `<div class="${tag?'srcwin':'srcdim'}" style="margin-bottom:6px"><b style="color:var(--ink)">${esc(nm)} ${icao}</b>${tag?'<b class="drv">'+tag+'</b>':''}
      <span style="color:var(--mut);font-size:10.5px">issued ${fmtLZ(t.issueTime)}, valid ${fmtLZ(t.validTimeFrom)} to ${fmtLZ(t.validTimeTo)}</span>${tafExpiryTag(t)}
      ${groups}
      <div class="mono" style="font-size:10.5px;color:var(--mut);white-space:pre-wrap;margin-top:2px">${esc(t.rawTAF||'')}</div></div>`;
  }).join('');
}
function corrZoneBlock(zones, c){
  return (zones||[]).map(zid=>{
    const isCig = c && c.cigFrom && c.cigFrom.kind==='fa' && c.cigFrom.zone===zid;
    const isVis = c && c.visFrom && c.visFrom.kind==='fa' && c.visFrom.zone===zid;
    const tag = (isCig?' \u2190 LOW CIG':'') + (isVis?' \u2190 LOW VIS':'');
    const z = state.fa.zones[zid];
    if(!z) return `<div style="color:var(--mut)">${zid}: area forecast not loaded</div>`;
    const L = [];
    L.push(`${z.name} ${zid}...VALID UNTIL ${z.validUntil}`);
    L.push('...CLOUDS/WX...');
    (z.airmets||[]).forEach(a=>L.push(a));
    (z.cloudsWx||[]).forEach(l=>L.push(l));
    if(z.passes) L.push(z.passes);
    if(z.outlook) L.push('OTLK VALID ' + z.outlook);
    L.push('...TURB...');
    L.push((z.turb||[]).length ? z.turb.join('\n') : 'NIL SIG.');
    L.push('...ICE AND FZLVL...');
    L.push((z.ice||[]).length ? z.ice.join('\n') : 'NIL SIG.');
    let body = hlWx(esc(L.join('\n')));
    // an AIRMET is the loudest thing in the section, so give its header its own weight
    body = body.replace(/^(\*{0,3}AIRMET\s+(?:MT\s+OBSC|IFR|ICE|TURB|LLWS|[A-Z]{2,})\*{0,3})/gm, '<span class="amhd">$1</span>');
    const snips = [isCig && c.cigFrom.snip, isVis && c.visFrom.snip].filter(Boolean);
    snips.forEach(sn=>{ const e2 = esc(sn); if(body.includes(e2)) body = body.replace(e2, `<span class="snip">${e2}</span>`); });
    return `<div class="mono ${tag?'srcwin':''}" style="white-space:pre-wrap;line-height:1.35;font-size:11px;margin-bottom:7px;border-left:2px solid var(--line);padding-left:7px">${tag?'<b class="drv">'+zid+tag+'</b>\n':''}${body}</div>`;
  }).join('');
}
function corrSection(title, body){
  return `<div style="margin-top:6px"><div style="color:var(--amber);font-weight:700;font-size:11.5px;letter-spacing:.4px">${title}</div>${body}</div>`;
}
/* The AAWU issues zones for the whole state. Only JB through JF touch our operating area, so
   the rest is collapsed behind a toggle rather than filling the top of the page. */
const SE_ZONES = ['JB','JC','JD','JE','JF'];
function zTimeTxt(ddhhmm){
  const d = ddhhmmDate(ddhhmm);
  if(!d) return String(ddhhmm||'');
  return `${ddhhmm}Z <span style="color:var(--mut)">(${fmtLZ(d)})</span>`;
}
function faRegionToggle(){
  state.faStatewide = !state.faStatewide;
  const b = document.getElementById('faRegion');
  if(b) b.textContent = state.faStatewide ? 'Southeast only' : 'show statewide';
  if(window.lastPer) renderBoard();
}
function renderBoard(){
  const winHrs = parseInt(document.getElementById('win').value,10);
  const evalT0 = Date.now(), evalT1 = evalT0 + Math.max(winHrs, 0.02)*3600000;
  const per = {};
  STATIONS.forEach(s=> per[s.icao] = stationWorst(s.icao, winHrs));
  window.lastPer = per;
  for(const k in TIPS) delete TIPS[k];
  /* Recent-observation history behind the METAR and MADIS labels. METARs come from
     the 12 h AWC fetch already held in metarHist; MADIS rows from the IEM history. */
  STATIONS.forEach(s2=>{
    const mh = (state.metarHist[s2.icao]||[]).slice(0,5);
    if(mh.length) TIPS['obm-'+s2.icao] = 'LAST ' + mh.length + ' METARS \u00b7 ' + s2.name.toUpperCase() + ' ' + s2.icao + '\n\n'
      + mh.map(m=>fmtLZ(m.obsTime||m.reportTime) + '  ' + (m.rawOb||'').trim()).join('\n\n');
    const dh = (state.madisHist && state.madisHist[s2.icao]) || [];
    if(dh.length) TIPS['obd-'+s2.icao] = 'LAST ' + dh.length + ' MADIS 5-MINUTE OBS \u00b7 ' + s2.name.toUpperCase() + ' ' + s2.icao + '\n\n'
      + dh.map(r=>fmtLZ(r.t) + '  ' + r.raw).join('\n\n')
      + '\n\nMADIS reaches IEM 15 to 20 minutes behind real time, so the newest row here trails the field.';
  });

  // ---- external cutoff stations strip ----
  renderSun();
  renderMaster(per);
  renderGrid(per);
  renderCards(per);
  renderTides();
  renderWarn();
  renderHeat();
  document.title = document.title; // no-op anchor
  const upEl = document.getElementById('updated');
  if(upEl && !upEl.dataset.tagged){ upEl.dataset.tagged='1'; upEl.insertAdjacentHTML('afterend', ` <span style="color:var(--mut);font-size:10px">[${BUILD_TAG}]</span>`); }
  if(state.loadedAt) document.getElementById('updated').textContent = 'Updated ' + fmtStamp(state.loadedAt) + ' \u00b7 ' + agoTxt(state.loadedAt);
  document.getElementById('extgrid').innerHTML = EXT.map(e=>{
    const ob = mxFor(e) || state.ext[e.id];
    const stt = extStatus(e, ob);
    TIPS['ext-'+e.id] = ob ? `${e.name} (${e.id})\nwind ${ob.wdir!==null?String(ob.wdir).padStart(3,'0')+'\u00b0 at ':''}${ob.wspd??'?'} kt${ob.gust!==null?' gusting '+ob.gust:''}\nobs ${fmtStamp(ob.t)}${e.info ? '\n'+(e.where||'')+'\nno company cutoff at this site, shown for the channel wind picture' : '\ncutoff '+e.cutoff+' kt'+(e.eastCaution?', '+e.eastCaution+' kt east caution':'')+'\naffects: '+e.affects}\nsource: ${e.src==='metar'?'PAHY METAR':'NDBC realtime feed'}` : `${e.name} (${e.id})\nno data${e.unverified?'\nno NDBC feed identified for this site yet':''}`;
    return `<div class="ext" data-tip="ext-${e.id}">
      <h3>${e.name} <span class="pill ${stt.cls}">${stt.label}</span></h3>
      <div class="wind">${ob&&ob.wspd!==null?ob.wspd:'--'}<span style="font-size:14px;color:var(--mut)"> G${ob&&ob.gust!==null?ob.gust:'--'} kt${ob&&ob.wdir!==null?' / '+ob.wdir+'\u00b0':''}</span></div>
      <div class="meta">${e.info ? esc(e.where||'marine wind') : 'cutoff ' + e.cutoff + ' kt \u2022 ' + e.affects}${ob&&ob.t?' \u2022 '+fmtLZ(ob.t):''}</div>
    </div>`;
  }).join('');

  // ---- station tooltips ----
  STATIONS.forEach(s=>{
    const hist = (state.metarHist[s.icao]||[]).slice(0,3).map(m=>m.rawOb).join('\n');
    const md = state.madis[s.icao];
    const taf = state.tafs[s.icao];
    const txt = [
      hist || 'no METAR',
      md ? `MADIS ${fmtStamp(md.valid)}: ${md.metar||('cig '+fmtCig(md.cig)+' vis '+visTxt(md.vis))}` : 'no MADIS',
      taf ? taf.rawTAF + (taf.validTimeFrom?'\nTAF valid '+fmtStamp(taf.validTimeFrom)+' thru '+fmtStamp(taf.validTimeTo):'') : 'no TAF'
    ].join('\n\n');
    const w = per[s.icao];
    const ctl = (w.worstCig!==null || w.worstVis!==null)
      ? `<div style="color:var(--amber);font-weight:700;margin-bottom:6px">LOWEST: ${fmtCig(w.worstCig)}${w.worstCigSrc?' ('+w.worstCigSrc+')':''} / ${visTxt(w.worstVisRaw ?? w.worstVis)} sm${w.worstVisSrc?' ('+w.worstVisSrc+')':''}</div>` : '';
    TIPS['stn-'+s.icao] = {html: ctl + `<div style="color:var(--mut);margin-bottom:4px">${agesLine(s.icao)}</div><div style="white-space:pre-wrap">${esc(txt)}</div><div style="text-align:center;margin-top:8px">${roseSVG(s.icao, 210)}</div><div style="color:var(--mut);margin-top:4px">click for limits and FRAT score</div>`};
  });

  const board = document.getElementById('board');
  board.innerHTML = '';
  // Quadrant cards were removed in b112 as redundant with the station rows. The loop is
  // skipped rather than just its insert, so none of its work runs.
  if(false) QUADS.forEach(q=>{
    const stns = STATIONS.filter(s=>s.quad===q);
    let qc = null, qv = null, qcat = 'NA', windTop = {spd:0, name:''};
    const wxSet = new Set();
    stns.forEach(s=>{
      const w = per[s.icao];
      if(w.worstCig !== null && (qc === null || w.worstCig < qc)) qc = w.worstCig;
      if(w.worstVis !== null && (qv === null || w.worstVis < qv)) qv = w.worstVis;
      if(w.cat !== 'NA' && (qcat === 'NA' || CAT_ORDER[w.cat] > CAT_ORDER[qcat])) qcat = w.cat;
      w.wx.forEach(t=>wxSet.add(t));
      const spd = Math.max(w.maxWind, w.gust);
      if(spd > windTop.spd) windTop = {spd, name:s.name};
    });
    TIPS['quad-'+q] = stns.map(s=>state.metars[s.icao]?.rawOb || s.icao+' no observation').join('\n')
      + '\n\n' + (QUAD_ZONES[q]||[]).map(faZoneText).join('\n\n');
    // area weather footer from the quadrant's FA zones
    let qcMax = null;
    stns.forEach(s=>{ const w = per[s.icao]; if(w.worstCig !== null && (qcMax===null || w.worstCig > qcMax)) qcMax = w.worstCig; });
    const zs = (QUAD_ZONES[q]||[]).map(z=>state.fa.zones[z]).filter(Boolean);
    const zFzl = zs.map(z=>z.fzl).filter(f=>f!==null);
    const zActs = zs.map(z=>zoneActive(z, evalT0, evalT1));
    const zCigs = zActs.map(a=>a.minCig).filter(f=>f!==null);
    if(zCigs.length && (qc===null || Math.min(...zCigs) < qc)) { /* zone forecast can undercut station obs */ }
    const cigLoAll = [qc, ...zCigs].filter(x=>x!==null);
    const cigLo = cigLoAll.length ? Math.min(...cigLoAll) : null;
    const turbBits = zs.map(z=>{
      const t = z.turb.join(' ');
      if(!t || t.includes('NIL')) return null;
      const m = t.match(/(?:OCNL|ISOL|CONT)?\s*(LGT|MOD|SEV)[A-Z\s]*?(FL\d{3}(?:-FL\d{3})?|BLW\s+\d{3})/);
      return m ? z.id+' '+m[1]+' '+m[2] : z.id+' turb';
    }).filter(Boolean);
    const zTags = [...new Set(zs.flatMap(z=>z.airmets.map(a=>a.includes('MT OBSC')?'MT OBSC':a.includes('IFR')?'IFR':a.includes('TURB')?null:null).filter(Boolean)))];
    const zWx = [...new Set(zActs.flatMap(a=>[...a.wx]))].map(wxWord).slice(0,4).join(', ');
    const areaLine1 = `Cigs ${cigLo===null?'?':cigLo.toLocaleString()}${qcMax!==null&&qcMax!==cigLo?' to '+qcMax.toLocaleString():''} ft${zFzl.length?' \u2022 FZL '+Math.min(...zFzl).toLocaleString()+' ft':''}`;
    const areaLine2 = [(QUAD_ZONES[q]||[]).join(' '), zTags.join(', '), turbBits.join(', ')||'no turb', zWx].filter(Boolean).join(' \u2022 ');
    const rows = stns.map(s=>{
      const w = per[s.icao];
      const wxs = [...w.wx].map(wxWord).join(', ');
      const flags = [];
      if(w.llws) flags.push('LLWS');
      if((w.maxWshear||0) > GLOBAL_LIMITS.wsCease) flags.push('WS '+w.maxWshear+' CEASE OPS');
      const sp = (w.obs && w.obs.temp!==null && w.obs.temp!==undefined && w.obs.dewp!==null && w.obs.dewp!==undefined) ? (w.obs.temp - w.obs.dewp) : null;
      if(sp!==null && sp < 1) flags.push('T/Td '+(Math.round(sp*10)/10)+'C');
      const chg = state.alerts.find(a=>a.icao===s.icao && Date.now()-a.t < 20*60000);
      if(chg) flags.push(chg.worse?'\u25bc CHG':'\u25b2 CHG');
      let trend = '';
      const hist = state.metarHist[s.icao]||[];
      if(hist.length > 1){
        const cNow = ceilingOf(hist[0].clouds, hist[0].vertVis), cPrev = ceilingOf(hist[1].clouds, hist[1].vertVis);
        if(cNow!==null && cPrev!==null && Math.abs(cNow-cPrev) >= 200) trend = cNow>cPrev ? '<span class="trend up">\u25b2</span>' : '<span class="trend dn">\u25bc</span>';
      }
      const windOnly = w.obs && w.obs.cig===null && w.obs.vis===null && w.obs.unofficial;
      const d = windOnly ? `MXAK wind ${w.obs.wdir!==null?w.obs.wdir+'\u00b0 ':''}${w.obs.wspd}${w.obs.wgst?'G'+w.obs.wgst:''} kt / no wx obs`
        : w.obs ? `${fmtCig(w.worstCig)}${trend} / ${visTxt(w.worstVisRaw ?? w.worstVis)} sm${wxs?' / '+wxs:''}` : 'no observation';
      const obt = w.obs && w.obs.t ? `<span class="obt">${fmtLZ(w.obs.t)}</span>` : '';
      return `<div class="stn" data-tip="stn-${s.icao}" data-panel="${s.icao}"><span class="dot cat-${w.cat}"></span><span class="id">${s.icao}</span><span class="nm">${s.name}</span><span class="d">${d}</span>${flags.length?`<span class="flag">${flags.join(' ')}</span>`:''}${obt}</div>`;
    }).join('');
    board.insertAdjacentHTML('beforeend', `
      <div class="quad" style="border-left:4px solid ${catClr(qcat)};background:${catBg(qcat)}">
        <h2 data-tip="quad-${q}">${q} ${catBadge(qcat)}</h2>
        <div class="bignums">
          <div class="bignum"><div class="v">${qc===null?'--':qc.toLocaleString()}</div><div class="l">lowest ceiling ft</div></div>
          <div class="bignum"><div class="v">${qv===null?'--':fmtVis(qv)}</div><div class="l">lowest vis sm</div></div>
          <div class="bignum"><div class="v">${windTop.spd||'--'}</div><div class="l">max wind kt${windTop.name?' ('+windTop.name+')':''}</div></div>
        </div>
        <div style="font-size:12px;color:var(--mut);border-top:1px solid var(--line);padding:5px 0 2px" data-tip="quad-${q}">
          <div><b style="color:var(--ink)">${areaLine1}</b></div>
          <div>${areaLine2}</div>
        </div>
        ${rows}
      </div>`);
  });

  // hazards
  const hz = hazardSummary();
  // fold in AAWU FA zone data
  const faZ = Object.values(state.fa.zones);
  if(!hz.fzl){
    const fzls = faZ.map(z=>z.fzl).filter(f=>f!==null);
    if(fzls.length) hz.fzl = Math.min(...fzls);
  }
  if(!hz.mtnObsc && faZ.some(z=>z.airmets.some(a=>a.includes('MT OBSC')))) hz.mtnObsc = 'active';
  if(!hz.ifr && faZ.some(z=>z.airmets.some(a=>a.includes('AIRMET IFR')))){
    const zi = faZ.filter(z=>z.airmets.some(a=>a.includes('AIRMET IFR')));
    hz.ifr = zi.map(z=>{
      const bits = [];
      if(Number.isFinite(z.minCig)) bits.push('cigs '+z.minCig.toLocaleString()+' ft');
      if(Number.isFinite(z.minVis)) bits.push('vis '+(z.visRaw||z.minVis)+' sm');
      const w = [...(z.wxSet||[])].slice(0,3).join(' ');
      return zName(z.id) + (bits.length?' ('+bits.join(', ')+(w?' in '+w:'')+')':'');
    }).join(', ');
  }
  if(!hz.turb){
    const tz = faZ.filter(z=>z.airmets.some(a=>a.includes('AIRMET TURB')));
    if(tz.length){
      const t = tz[0].turb.join(' ');
      const fl = t.match(/FL\d{3}-FL\d{3}|FL\d{3}|BLW \d{3}|\d{3}-\d{3}/);
      hz.turb = fl ? fl[0] : 'active';
    }
  }
  TIPS['haz'] = (hz.raws.join('\n\n') || 'no AIRMETs in the panhandle box') + '\n\n' + faZ.map(z=>z.id+': '+z.airmets.join(' / ')).filter(x=>x.length>4).join('\n');
  // per-quadrant hazard breakdowns
  const perQuadZone = fn => QUADS.map(q=>{
    const ids = QUAD_ZONES[q]||[];
    const zs2 = ids.map(id=>state.fa.zones[id]).filter(Boolean);
    return q+' ('+ids.join(' ')+'): '+fn(zs2, q);
  }).join('\n');
  TIPS['haz-fzl'] = 'FREEZING LEVEL BY QUADRANT\n' + perQuadZone(zs2=>{
    const f = zs2.map(z=>z.fzl).filter(x=>x!==null);
    if(!f.length) return 'n/a';
    const lo=Math.min(...f), hiF=Math.max(...f);
    return lo===hiF ? lo.toLocaleString()+' ft' : lo.toLocaleString()+' to '+hiF.toLocaleString()+' ft';
  }) + '\n\nSOURCE LINES\n' + faZ.map(z=>z.id+': '+(z.ice.join(' ')||'n/a')).join('\n');
  (function(){
    const iceZl = faZ.map(z=>({z, layers: parseIceLayers(z.ice.join(' '))}));
    const iceLine = L => (L.qual ? L.qual + ' ' : '') + L.sev + (L.type ? ' ' + L.type : '')
      + (L.base !== null ? ' ' + fmtLvlFt(L.base) + '\u2013' + fmtLvlFt(L.top) : ' (levels not stated)');
    const lowRows = iceZl.map(({z, layers})=>{
      const low = layers.filter(L=>L.low !== false);
      if(!low.length) return null;
      return zName(z.id) + ': ' + low.map(iceLine).join(', ')
        + (z.fzl !== null && z.fzl !== undefined ? ' \u00b7 FZLVL ' + z.fzl.toLocaleString() + ' ft' : '');
    }).filter(Boolean);
    const hiRows = iceZl.map(({z, layers})=>{
      const hi = layers.filter(L=>L.low === false);
      return hi.length ? zName(z.id) + ': ' + hi.map(iceLine).join(', ') : null;
    }).filter(Boolean);
    TIPS['haz-ice'] = 'ICING BELOW FL150 (bases under 15,000 ft), FROM THE AAWU AREA FORECAST\n'
      + (lowRows.join('\n') || 'none forecast below FL150')
      + (hiRows.length ? '\n\nHIGHER LAYERS ONLY (base at or above FL150)\n' + hiRows.join('\n') : '')
      + (hz.ice ? '\n\nAIRMET ZULU\nicing ' + hz.ice : '')
      + '\n\nSOURCE LINES\n' + faZ.map(z=>z.id+': '+(z.ice.join(' ')||'n/a')).join('\n');
    const iceLow = iceZl.flatMap(x=>x.layers.filter(L=>L.low !== false));
    if(iceLow.length){
      const worst = iceLow.reduce((a,b)=>b.rank > a.rank ? b : a, iceLow[0]);
      const bases = iceLow.map(L=>L.base).filter(n=>n!==null), tops = iceLow.map(L=>L.top).filter(n=>n!==null);
      const band = bases.length ? fmtLvlFt(Math.min(...bases)) + '\u2013' + (tops.length ? fmtLvlFt(Math.max(...tops)) : '?') : 'levels not stated';
      const names = iceZl.filter(x=>x.layers.some(L=>L.low!==false)).map(x=>zName(x.z.id));
      const zTxt = names.slice(0,4).join(', ') + (names.length > 4 ? ' +' + (names.length-4) + ' more' : '');
      const sevCol = worst.rank >= 3 ? 'var(--ifr)' : worst.rank === 2 ? 'var(--amber)' : 'var(--ink)';
      chips.push('<span class="chip' + (worst.rank >= 2 ? ' imp' : '') + '" data-tip="haz-ice"' + (worst.rank >= 3 ? ' style="border-color:var(--ifr)"' : '') + '>Icing \u2264FL150: <b style="color:' + sevCol + '">' + (worst.qual ? worst.qual + ' ' : '') + worst.sev + ' ' + band + '</b> (' + zTxt + ')</span>');
    }
  })();
  TIPS['haz-turb'] = 'TURBULENCE BY QUADRANT\n' + perQuadZone(zs2=>{
    const bits = zs2.map(z=>{
      const t = z.turb.join(' ');
      if(!t) return null;
      return z.id+' '+t;
    }).filter(Boolean);
    return bits.join(' | ') || 'no data';
  });
  TIPS['haz-mt'] = 'MOUNTAIN OBSCURATION BY ZONE\n' + faZ.map(z=>{
    const a = z.airmets.filter(x=>x.includes('MT OBSC'));
    return a.length ? zName(z.id)+' \u2192 '+zoneTowns(z.id)+'\n  '+a.join(' ') : null;
  }).filter(Boolean).join('\n');
  const fogStnsChip = STATIONS.filter(st=>{
    const o3 = per[st.icao].obs;
    return o3 && o3.temp!==null && o3.temp!==undefined && o3.dewp!==null && o3.dewp!==undefined && (o3.temp - o3.dewp) < 1;
  });
  TIPS['haz-fog'] = 'TEMP/DEWPOINT SPREAD UNDER 1C\n' + fogStnsChip.map(st=>{
    const w2 = per[st.icao]; const o3 = w2.obs;
    const md2 = state.madis[st.icao];
    return st.name+': spread '+(Math.round((o3.temp-o3.dewp)*10)/10)+'C ('+o3.temp+'/'+o3.dewp+')\n  '+(o3.raw||'')+(md2&&md2.metar?'\n  MADIS: '+md2.metar:'');
  }).join('\n');
  TIPS['haz-llws'] = 'TAF WIND SHEAR GROUPS\n' + STATIONS.filter(st=>per[st.icao].llws).map(st=>{
    const raw = state.tafs[st.icao]?.rawTAF||'';
    const m = raw.match(/WS\d{3}\/\d{5,6}KT/);
    return st.name+': '+(m?m[0]:'WS group in TAF');
  }).join('\n');
  const chips = [];
  EXT.forEach(e=>{
    const stt = extStatus(e, state.ext[e.id]);
    if(stt.cls === 'over') chips.push(e.info
      ? `<span class="chip" data-tip="ext-${e.id}" style="border-color:var(--amber)"><b>${e.name} ${stt.label}</b>, ${esc(e.where||'marine wind')}, no company limit</span>`
      : `<span class="chip imp" data-tip="ext-${e.id}" style="border-color:var(--ifr)"><b>${e.name} OVER ${e.cutoff} kt</b>, cancels ${e.affects}</span>`);
  });
  {
    const fz = faZ.filter(z=>z.fzl !== null && z.fzl !== undefined);
    if(fz.length){
      const lo = Math.min(...fz.map(z=>z.fzl)), hi = Math.max(...fz.map(z=>z.fzl));
      TIPS['haz-fzl'] = (TIPS['haz-fzl'] || '') + '\n\nBY ZONE\n'
        + fz.map(z=>zName(z.id) + ': ' + z.fzl.toLocaleString() + ' ft').join('\n');
      chips.push(`<span class="chip" data-tip="haz-fzl">Freezing level <b>${lo === hi ? lo.toLocaleString() : lo.toLocaleString() + '\u2013' + hi.toLocaleString()} ft</b></span>`);
    } else if(hz.fzl){
      chips.push(`<span class="chip" data-tip="haz-fzl">Freezing level <b>~${hz.fzl.toLocaleString()} ft</b></span>`);
    }
  }
  if(hz.ice) chips.push(`<span class="chip" data-tip="haz-ice">AIRMET icing <b>${hz.ice}</b></span>`);
  const turbZ = faZ.filter(z=>{ const t=z.turb.join(' '); return t && !t.startsWith('NIL'); }).map(z=>zName(z.id));
  {
    const jw = (typeof jawsWorst === 'function') ? jawsWorst() : null;
    const jawsBit = jw && jw.rank >= 2
      ? `JAWS ${jw.worst}` + (jw.hits.length ? ' (' + jw.hits.map(h=>h.label || h.key).slice(0,3).join(', ') + ')' : '') : '';
    if(jw && jw.rank >= 2) TIPS['haz-turb'] = (TIPS['haz-turb'] || '') + '\n\nJAWS (Juneau, sensor based)\n'
      + jw.worst + ' at ' + jw.hits.map(h=>h.label || h.key).join(', ')
      + '\nThresholds are set for a 737; moderate there is worse in our aircraft.';
    const parts = turbZ.slice(); if(jawsBit) parts.push(jawsBit);
    chips.push(`<span class="chip${parts.length ? ' imp' : ''}" data-tip="haz-turb">Turbulence: <b>${parts.length ? parts.join(', ') : (hz.turb ? hz.turb : 'nil sig all zones')}</b></span>`);
  }
  if(hz.llws || STATIONS.some(s=>per[s.icao].llws)) chips.push(`<span class="chip" data-tip="haz-llws">LLWS <b>${[...STATIONS.filter(s=>per[s.icao].llws).map(s=>s.name)].join(', ') || 'AIRMET'}</b></span>`);
  if(hz.ifr) chips.push(`<span class="chip">AIRMET IFR <b>active</b></span>`);
  const tsZones = faZ.map(z=>{
    const za = zoneActive(z, evalT0, evalT1);
    if(![...za.wx].some(t=>t.includes('TS')||t==='CB'||t==='TCU')) return null;
    const tsLine = (z.lines||[]).find(l=>[...l.conds.wx].some(t=>t.includes('TS')||t==='CB'||t==='TCU'));
    const timing = tsLine && tsLine.from && tsLine.from.getTime() > Date.now() ? ' from '+fmtLZ(tsLine.from) : ' active';
    return zName(z.id) + timing;
  }).filter(Boolean);
  TIPS['haz-ts'] = 'THUNDERSTORMS / CB IN THE AREA FORECAST\n' + tsZones.join('\n');
  if(tsZones.length) chips.unshift(`<span class="chip imp" data-tip="haz-ts" style="border-color:var(--ifr)"><b style="color:var(--ifr)">Thunderstorms/CB in window</b> (${tsZones.join(', ')}), FRAT 8 pts, CB implies possible SEV turb/ice, LLWS, IFR</span>`);
{
  const zl = faZ.map(z=>({z, layers: parseIceLayers(z.ice.join(' '))}));
  const line = L => (L.qual ? L.qual + ' ' : '') + L.sev + (L.type ? ' ' + L.type : '')
    + (L.base !== null ? ' ' + fmtLvlFt(L.base) + '\u2013' + fmtLvlFt(L.top) : ' (levels not stated)');
  const lowRows = zl.map(({z, layers})=>{
    const low = layers.filter(L=>L.low !== false);
    if(!low.length) return null;
    return zName(z.id) + ': ' + low.map(line).join(', ')
      + (z.fzl !== null && z.fzl !== undefined ? ' \u00b7 FZLVL ' + z.fzl.toLocaleString() + ' ft' : '');
  }).filter(Boolean);
  const hiRows = zl.map(({z, layers})=>{
    const hi = layers.filter(L=>L.low === false);
    return hi.length ? zName(z.id) + ': ' + hi.map(line).join(', ') : null;
  }).filter(Boolean);
  {
    const zl = faZ.map(z=>({z, layers: parseIceLayers(z.ice.join(' ')).filter(L=>L.low !== false)})).filter(x=>x.layers.length);
    if(zl.length){
      const all = zl.flatMap(x=>x.layers);
      const worst = all.reduce((a,b)=>b.rank > a.rank ? b : a, all[0]);
      const bases = all.map(L=>L.base).filter(n=>n!==null), tops = all.map(L=>L.top).filter(n=>n!==null);
      const band = bases.length ? fmtLvlFt(Math.min(...bases)) + '\u2013' + (tops.length ? fmtLvlFt(Math.max(...tops)) : '?') : 'levels not stated';
      const names = zl.map(x=>zName(x.z.id));
      const zTxt = names.slice(0,4).join(', ') + (names.length > 4 ? ` +${names.length-4} more` : '');
      const sevCol = worst.rank >= 3 ? 'var(--ifr)' : worst.rank === 2 ? 'var(--amber)' : 'var(--ink)';
      chips.push(`<span class="chip${worst.rank >= 2 ? ' imp' : ''}" data-tip="haz-ice"${worst.rank >= 3 ? ' style="border-color:var(--ifr)"' : ''}>Icing \u2264FL150: <b style="color:${sevCol}">${worst.qual ? worst.qual + ' ' : ''}${worst.sev} ${band}</b> (${zTxt})</span>`);
    }
  }
  const fogRisk = STATIONS.filter(st=>{
    const o2 = per[st.icao].obs;
    return o2 && o2.temp!==null && o2.temp!==undefined && o2.dewp!==null && o2.dewp!==undefined && (o2.temp - o2.dewp) < 1;
  }).map(st=>st.name);
  const clsdStns = NOTAM_ICAOS.filter(ic=>((state.notams||{})[ic]||[]).some(n=>n.cat==='closure'));
  TIPS['haz-clsd'] = 'NOTAM CLOSURES\n' + clsdStns.map(ic=>((STATIONS.find(x=>x.icao===ic)||{}).name||ic) + '\n'
    + ((state.notams||{})[ic]||[]).filter(n=>n.cat==='closure').map(n=>'  ' + String(n.raw||'').replace(/\s+/g,' ').trim()).join('\n')).join('\n');
  if(clsdStns.length) chips.unshift(`<span class="chip imp" data-tip="haz-clsd" style="border-color:var(--ifr)"><b style="color:var(--ifr)">NOTAM closures</b> at ${clsdStns.map(ic=>(STATIONS.find(x=>x.icao===ic)||{}).name||ic).join(', ')}</span>`);
  {
    /* precipitation observed now, airport by airport, from the METAR and MADIS */
    const PRE = /(^|[-+]|VC)(SH|TS)?(RA|SN|DZ|PL|GR|GS|UP|SG|IC)/;
    const wet = STATIONS.map(st=>{
      const w2 = per[st.icao]; if(!w2) return null;
      const toks = new Set();
      ((w2.obs && w2.obs.wx) || []).forEach(t=>{ if(PRE.test(t)) toks.add(t); });
      ((state.madis[st.icao] && state.madis[st.icao].wx) || []).forEach(t=>{ if(PRE.test(t)) toks.add(t); });
      return toks.size ? {st, toks:[...toks]} : null;
    }).filter(Boolean);
    if(wet.length){
      TIPS['haz-precip'] = 'PRECIPITATION REPORTED NOW\n' + wet.map(x=>{
        const md2 = state.madis[x.st.icao];
        return x.st.name + ': ' + x.toks.join(' ') + '\n  ' + ((per[x.st.icao].obs||{}).raw || '')
          + (md2 && md2.metar ? '\n  MADIS: ' + md2.metar : '');
      }).join('\n');
      chips.push(`<span class="chip" data-tip="haz-precip">Precip now: <b>${wet.map(x=>x.st.name + ' ' + x.toks.join(' ')).join(', ')}</b></span>`);
    }
    /* precipitation in the area forecast, zone by zone, over the same window */
    const wetZ = faZ.map(z=>{
      const za = zoneActive(z, evalT0, evalT1);
      const t = [...za.wx].filter(x=>PRE.test(x));
      return t.length ? {z, t} : null;
    }).filter(Boolean);
    if(wetZ.length){
      TIPS['haz-precipz'] = 'PRECIPITATION IN THE AREA FORECAST\n' + wetZ.map(x=>zName(x.z.id) + ': ' + x.t.join(' ')).join('\n');
      chips.push(`<span class="chip" data-tip="haz-precipz">Precip in FA: <b>${wetZ.map(x=>zName(x.z.id) + ' ' + x.t.join(' ')).join(', ')}</b></span>`);
    }
  }
  if(fogRisk.length) chips.push(`<span class="chip imp" style="border-color:var(--amber)" data-tip="haz-fog">Fog risk: <b>T/Td spread under 1C</b> at ${fogRisk.join(', ')}</span>`);
  document.getElementById('hazards').innerHTML = chips.join('') || '<span class="chip">No AIRMET hazards in the panhandle box</span>';

  // per-station detail merged into the Stations master block

  // enroute corridors, all starting at Juneau in central southeast
  function evalCorridor(c, t0, t1, currentOnly){
    let cig=null, vis=null, visRaw=null; const wx=new Set(); let llws=false;
    let cigFrom=null, visFrom=null;
    c.via.forEach(icao=>{
      const w = per[icao]; if(!w) return;
      const nm = (STATIONS.find(x=>x.icao===icao)||{}).name || icao;
      const wc = currentOnly ? w.nowCig : w.worstCig, wcs = currentOnly ? w.nowCigSrc : w.worstCigSrc;
      const wv = currentOnly ? w.nowVis : w.worstVis, wvs = currentOnly ? w.nowVisSrc : w.worstVisSrc;
      const wvr = currentOnly ? w.nowVisRaw : w.worstVisRaw;
      if(wc !== null && (cig===null || wc < cig)){ cig = wc; cigFrom = {kind:'stn', icao, src:wcs, starts:(!currentOnly && wcs==='TAF') ? (w.worstCigT||null) : null, label:nm+' '+(wcs||'')}; }
      if(wv !== null && (vis===null || wv < vis)){ vis = wv; visRaw = wvr; visFrom = {kind:'stn', icao, src:wvs, starts:(!currentOnly && wvs==='TAF') ? (w.worstVisT||null) : null, label:nm+' '+(wvs||'')}; }
      if(currentOnly){ if(w.obs) w.obs.wx.forEach(t=>wx.add(t)); }
      else w.wx.forEach(t=>wx.add(t));
      if(w.llws) llws = true;
    });
    (c.zones||[]).forEach(zid=>{
      const z = state.fa.zones[zid]; if(!z) return;
      const za = zoneActive(z, t0, t1);
      if(za.minCig!==null && (cig===null || za.minCig<cig)){ cig = za.minCig; cigFrom = {kind:'fa', zone:zid, snip:za.cigSnip, starts:za.cigStarts, label:'FA '+zid+(za.cigSnip?' "'+za.cigSnip+'"':'')+(za.cigStarts?' begins '+fmtLZ(za.cigStarts):'')}; }
      if(za.minVis!==null && (vis===null || za.minVis<vis)){ vis = za.minVis; visRaw = za.visRaw; visFrom = {kind:'fa', zone:zid, snip:za.visSnip, starts:za.visStarts, label:'FA '+zid+(za.visSnip?' "'+za.visSnip+'"':'')+(za.visStarts?' begins '+fmtLZ(za.visStarts):'')}; }
      za.wx.forEach(t=>wx.add(t));
    });
    return {...c, cig, vis, visRaw, wx, llws, cigFrom, visFrom, cat:flightCat(cig, vis)};
  }
  const corr = CORRIDORS.map(c=>{
    const win = evalCorridor(c, evalT0, evalT1, false);
    const nowR = evalCorridor(c, evalT0, evalT0 + 60000, true);
    return {...win, now:nowR};
  });
  corr.forEach(c=>{
    const hi = 'background:rgba(226,87,75,.16);border-left:3px solid var(--ifr);padding:1px 6px;margin:1px 0;display:block';
    const dim = 'display:block;padding:1px 6px;margin:1px 0;color:var(--mut)';
    const mark = (snip, text) => snip ? esc(text).replace(esc(snip), `<span style="background:var(--ifr);color:#0c1116;font-weight:700;padding:0 3px;border-radius:3px">${esc(snip)}</span>`) : esc(text);
    // The controlling summary, route outlook strip and translated FA outlook that used to
    // live here were syntheses that mixed the sources together. The popup shows sources whole
    // now, so they are gone rather than computed on every render and thrown away.
    const routeHead = `<div style="border:1px solid var(--amber);border-radius:6px;padding:4px 8px">
      <div style="color:var(--amber);font-weight:700">${esc(c.label.toUpperCase())}</div>
      <div style="font-size:11px;color:var(--mut)">Stations ${c.via.join(', ')} \u00b7 zones ${(c.zones||[]).join(', ')}. Each source shown whole and unblended.</div></div>`;
    TIPS['corr-'+c.dest] = {html: corrSummary(c) + routeHead
      + corrSection('METAR AND MADIS \u00b7 current observations', corrMetarBlock(c.via, c))
      + corrSection('TAF \u00b7 full decoded forecast', corrTafBlock(c.via, c))
      + corrSection('AREA FORECAST ZONES \u00b7 verbatim', corrZoneBlock(c.zones, c))};
  });
  document.getElementById('enroute').innerHTML = `<table>
    <tr><th>Corridor</th><th>Via / FA zones</th><th>Cat</th><th>Lowest ceiling</th><th>Lowest vis</th><th>Weather</th></tr>
    ${corr.map(c=>{
      const chTs = [c.cigFrom&&c.cigFrom.starts, c.visFrom&&c.visFrom.starts].filter(Boolean);
      const chT = chTs.length ? Math.min(...chTs) : null;
      const wxAdded = [...c.wx].filter(t=>!c.now.wx.has(t));
      const zBadges = (c.zones||[]).map(z=>{
        const zo = state.fa.zones[z];
        const bad = zo && zo.airmets.some(a=>a.includes('IFR'));
        const nm2 = zo && zo.name ? zo.name.replace(' and ',' & ') : z;
        return `<span style="color:${bad?'var(--ifr)':'var(--amber)'};font-weight:600;font-size:11px" title="${z}">${esc(nm2)}</span>`;
      }).join(' \u00b7 ');
      return `<tr data-tip="corr-${c.dest}">
      <td><b>${c.label}</b></td>
      <td class="mono">${c.via.join(' ')}<br>${zBadges}</td>
      <td>${(function(){
        const worse = (CAT_ORDER[c.cat]??0) > (CAT_ORDER[c.now.cat]??0);
        const nowLine = `<span class="worst cat-${c.now.cat}" style="font-size:12px;padding:2px 9px">${c.now.cat}</span>` +
          (worse ? ` <span style="color:var(--mut);font-size:10.5px">til ${chT?fmtLZ(chT):'?'}</span>` : '');
        const nextLine = worse ? `<br><span style="font-size:10.5px;color:var(--amber);font-weight:700">\u2192</span> <span class="worst cat-${c.cat}" style="font-size:10.5px;padding:0 7px">${c.cat}</span> <span style="color:var(--amber);font-size:10.5px;font-weight:700">${chT?fmtLZ(chT):((c.cigFrom&&c.cigFrom.src==='TAF'?tafSrcNote(c.cigFrom.icao):(c.visFrom&&c.visFrom.src==='TAF'?tafSrcNote(c.visFrom.icao):' (per TAF)')).trim())}\u2013${fmtLZ(evalT1)}</span>` : '';
        return nowLine + nextLine;
      })()}</td>
      <td>${fmtCig(c.now.cig)}${(c.cig!==null && (c.now.cig===null || c.cig < c.now.cig))?`<br><span style="color:var(--amber);font-size:11px;font-weight:700">\u2192 ${fmtCig(c.cig)}${c.cigFrom&&c.cigFrom.starts?' starting '+fmtLZ(c.cigFrom.starts):(c.cigFrom&&c.cigFrom.src==='TAF'?tafSrcNote(c.cigFrom.icao):' later')}</span>`:''}</td>
      <td>${c.now.vis===null?'?':visTxt(c.now.visRaw ?? c.now.vis)+' sm'}${(c.vis!==null && (c.now.vis===null || c.vis < c.now.vis))?`<br><span style="color:var(--amber);font-size:11px;font-weight:700">\u2192 ${visTxt(c.visRaw ?? c.vis)} sm${c.visFrom&&c.visFrom.starts?' starting '+fmtLZ(c.visFrom.starts):(c.visFrom&&c.visFrom.src==='TAF'?tafSrcNote(c.visFrom.icao):' later')}</span>`:''}</td>
      <td style="color:var(--mut)">${corrWxHTML(c, {small:true})}${corrIceHTML(c, {small:true})}${(function(){
        const f2 = c.via.filter(ic=>{ const w3=(window.lastPer||{})[ic]; const o3=w3&&w3.obs; return o3&&o3.temp!==null&&o3.temp!==undefined&&o3.dewp!==null&&o3.dewp!==undefined&&(o3.temp-o3.dewp)<1; });
        return f2.length?' <span class="flag">T/Td&lt;1 '+f2.map(ic=>(STATIONS.find(x=>x.icao===ic)||{}).name||ic).join(', ')+'</span>':'';
      })()}${c.llws?' <span class="flag">LLWS</span>':''}</td>
    </tr>`;}).join('')}
  </table>`;

  // ---- AAWU Area Forecast zone cards ----
  const faOrder = ['JB','JC','JD','JE','JF'];
  const faCards = faOrder.filter(z=>state.fa.zones[z]).map(z=>{
    const zo = state.fa.zones[z];
    return `<div class="detailcard" data-zone="${z}">
      <h3>${z} \u2022 ${zo.name} <span style="font-size:12px;color:var(--mut);font-family:var(--body);font-weight:400">valid til ${zTimeTxt(zo.validUntil)}</span></h3>
      ${zo.airmets.map(a=>{
        const m = String(a).match(/^\*{2,}(.+?)\*{2,}(.*)$/);
        return `<div class="airmetrow">${m ? '<b>'+esc(m[1].trim())+'</b> '+esc(m[2].trim()) : esc(a)}</div>`;
      }).join('')}
      <div class="mono" style="margin-top:4px">${(zo.lines||[]).map(l=>{
        const active = winOverlap(l.from, l.to, evalT0, evalT1);
        const future = l.from && l.from.getTime() > evalT1;
        const expired = l.to && l.to.getTime() < evalT0;
        const tag = future ? ' <i style="color:var(--amber)">[starts '+fmtLZ(l.from)+']</i>' : expired ? ' <i>[expired]</i>' : (l.from && l.from.getTime() > Date.now() ? ' <i style="color:var(--amber)">[from '+fmtLZ(l.from)+']</i>' : '');
        return '<span style="'+(active?'':'opacity:.4')+'">'+hlWx(esc(l.text))+tag+'</span>';
      }).join('<br>')}</div>
      ${zo.passes?`<div class="row">${hlWx(esc(zo.passes))}</div>`:''}
      ${zo.turb.length?`<div class="row">TURB: <b>${hlWx(esc(zo.turb.join(' ')))}</b></div>`:''}
      ${zo.ice.length?`<div class="row">ICE/FZL: <b>${hlWx(esc(zo.ice.join(' '))).replace(/(?<![A-Z>])((?:LGT|MOD|SEV)\s+(?:ICEIC|ICGIC|ICGICIP|ICE))(?![A-Z])/g,'<span style="background:rgba(77,163,232,.3);color:var(--mvfr);font-weight:700;border-radius:3px;padding:0 2px">$1</span>')}</b></div>`:''}
      ${zo.outlook?`<div class="row">Outlook: <b>${hlWx(esc(zo.outlook))}</b></div>`:''}
    </div>`;
  }).join('');
  const faNext = state.fa.airmetsValid ? ddhhmmDate(state.fa.airmetsValid) : null;
  const faHdr = faNext ? `<div class="note" style="margin:0 0 4px;color:var(--amber)">AIRMETs valid thru ${fmtStamp(faNext)} \u00b7 next FA/AIRMET issue expected ${inTxt(faNext)}</div>` : '';
  const faEl = document.getElementById('fasec');
  faEl.innerHTML = faHdr + (state.fa.synopsis?`<div class="note" style="margin:0 0 8px">SYNOPSIS: ${state.fa.synopsis}</div>`:'')
    + (faCards || '<div class="note">FA bulletins not loaded.</div>');
  {
    let top = document.getElementById('fatop');
    const sec = document.getElementById('stationsSection');
    if(!top && sec){ top = document.createElement('div'); top.id = 'fatop'; sec.parentNode.insertBefore(top, sec); }
    if(top){
      const TOPZ = ['JB','JC','JD','JF'];
      top.innerHTML = TOPZ.map(z=>{ const c = faEl.querySelector(`.detailcard[data-zone="${z}"]`); return c ? c.outerHTML : ''; }).join('');
      TOPZ.forEach(z=>{ const c = faEl.querySelector(`.detailcard[data-zone="${z}"]`); if(c) c.style.display = 'none'; });
    }
  }
  // hide the zones that do not touch the operating area
  faEl.querySelectorAll('[data-zone]').forEach(el=>{
    const zid = el.getAttribute('data-zone');
    // JB JC JD JF are shown in the group above the stations, so not repeated here
    el.style.display = ['JB','JC','JD','JF'].includes(zid) ? 'none' : ((state.faStatewide || SE_ZONES.includes(zid)) ? '' : 'none');
  });
  const hidden = faEl.querySelectorAll('[data-zone]:not([style*="display: none"])').length;
  const note = document.getElementById('faScopeNote');
  if(note) note.textContent = state.faStatewide
    ? 'all Alaska zones'
    : 'Southeast zones only, lines scoped to the fields they actually reach';

  // raw dumps
  document.getElementById('rawMetar').textContent = STATIONS.map(s=>state.metars[s.icao]?.rawOb || s.icao+' no observation').join('\n');
  document.getElementById('rawTaf').textContent = STATIONS.map(s=>state.tafs[s.icao]?.rawTAF || s.icao+' no TAF issued').join('\n\n');
  document.getElementById('rawAirmet').textContent = hz.raws.join('\n\n') || 'none in box';
  document.getElementById('rawFA').textContent = state.fa.raw || 'not loaded';

  buildBlurb(per, hz, winHrs, corr);
}

/* ================= NARRATIVE ================= */
}
function listWords(a){
  const x = a.filter(Boolean);
  if(!x.length) return '';
  if(x.length === 1) return x[0];
  if(x.length === 2) return x[0] + ' and ' + x[1];
  return x.slice(0,-1).join(', ') + ' and ' + x[x.length-1];
}
function buildBlurb(per, hz, winHrs, corr){
  const active = STATIONS.map(s=>({s, w:per[s.icao]})).filter(x=>x.w.obs);
  if(!active.length){ document.getElementById('blurb').value = 'No observations loaded yet.'; return; }

  /* A station whose observation has aged out drops out of every calculation below, which is
     how the summary once read "dry across the panhandle, no ceilings reported" while Klawock
     and Yakutat sat at a quarter mile on an expired report. Silence is the wrong answer for
     a field that was last seen in fog, so those are gathered and stated explicitly with the
     age of the reading. */
  const noObs = STATIONS.map(s=>({s, w:per[s.icao]})).filter(x=>!x.w.obs).map(x=>{
    const m = (state.metars||{})[x.s.icao];
    if(!m) return {name:x.s.name, last:null};
    const t = m.obsTime || m.reportTime || null;
    const cig = ceilingOf(m.clouds, m.vertVis);
    const vis = parseVis(m.visib);
    return {name:x.s.name, last:{vis, cig, t}};
  });

  const obsVis = active.map(x=>x.w.obs.vis).filter(v=>v!==null);
  // nowCig is the worst of METAR and MADIS, both current. worstCig folds in the TAF.
  const cigs = active.filter(x=>x.w.nowCig!==null && x.w.nowCig!==undefined);
  const allWx = new Set(); active.forEach(x=>x.w.wx.forEach(t=>allWx.add(t)));
  const wp = worstPrecip(allWx);
  const hasMist = allWx.has('BR') || allWx.has('FG') || allWx.has('FZFG');
  // "in X" clause: worst precip only (FRAT ranking), plus mist if present
  const inWords = [];
  if(wp) inWords.push(wp.word);
  if(hasMist) inWords.push('mist');

  const p = [];
  if(wp && hasMist) p.push(`Looks misty with ${wp.word} through the panhandle.`);
  else if(wp) p.push(wp.word.charAt(0).toUpperCase()+wp.word.slice(1)+' moving through the panhandle.');
  else if(hasMist) p.push('Some mist and fog hanging around the panhandle.');
  else p.push('Dry across the panhandle.');

  // enroute low from corridors (includes MADIS and TAF worst)
  // .now is the current-only corridor evaluation; c.vis is the window value and folds in TAF
  const corrVis = (corr||[]).map(c=>(c.now?c.now.vis:null)).filter(v=>v!==null);
  const enrouteLoVis = corrVis.length ? Math.min(...corrVis) : null;

  if(obsVis.length){
    const lo = Math.min(...obsVis), hi = Math.max(...obsVis);
    let visLine = (lo>=10) ? 'Visibility at all the airports is 10 miles'
      : `Visibility at the airports is ${fmtVis(lo)} to ${fmtVis(hi)} miles`;
    if(enrouteLoVis !== null && enrouteLoVis < lo){
      visLine += ` with enroute visibility down to ${fmtVis(enrouteLoVis)} miles${inWords.length?' in '+inWords.join(' and '):''}`;
    }
    p.push(visLine + '.');
  }

  if(noObs.length){
    const withLast = noObs.filter(x=>x.last && (x.last.vis !== null || x.last.cig !== null));
    const bare = noObs.filter(x=>!withLast.includes(x)).map(x=>x.name);
    if(withLast.length){
      const bits = withLast.map(x=>{
        const parts = [];
        if(x.last.vis !== null) parts.push(fmtVis(x.last.vis) + ' miles');
        if(x.last.cig !== null) parts.push(x.last.cig.toLocaleString() + ' ft');
        const age = x.last.t ? ', ' + agoTxt(x.last.t) : '';
        return `${x.name} last reported ${parts.join(' and ')}${age}`;
      });
      p.push(`No current observation at ${listWords(withLast.map(x=>x.name))}, so ${withLast.length>1?'they are':'it is'} not in the numbers above: ${listWords(bits)}.`);
    }
    if(bare.length) p.push(`No observation at all from ${listWords(bare)}.`);
  }

  if(cigs.length){
    const lo = Math.min(...cigs.map(x=>x.w.nowCig)), hi = Math.max(...cigs.map(x=>x.w.nowCig));
    const lowStn = cigs.reduce((a,b)=>a.w.nowCig<=b.w.nowCig?a:b);
    let cl = lo === hi
      ? `Ceilings are ${lo.toLocaleString()} ft across the board`
      : `Ceilings are anywhere between ${lo.toLocaleString()} ft and ${hi.toLocaleString()} ft`;
    if(lo < 1500 && hi - lo > 1000) cl += ` with the low deck at ${lowStn.s.name} at ${lowStn.w.nowCig.toLocaleString()} ft`;
    p.push(cl + '.');
  } else {
    p.push('No ceilings reported at any airport.');
  }

  /* Weather hold callout, current observations only. Anything reporting 4 miles or less right
     now gets named, then separately any of those that are under published approach minimums,
     which only applies where there is an approach on file. */
  const HOLD_VIS = 4;
  const holds = active.filter(x=>{
    const o = x.w.obs || {};
    return o.vis !== null && o.vis !== undefined && o.vis <= HOLD_VIS;
  });
  if(holds.length){
    const bits = holds.map(x=>{
      const o = x.w.obs;
      // only call the ceiling out when it is genuinely low, otherwise it reads as noise
      const cigTxt = (o.cig !== null && o.cig !== undefined && o.cig < 1000) ? ` and ${o.cig.toLocaleString()} ft` : '';
      return `${x.s.name} at ${fmtVis(o.vis)} miles${cigTxt}`;
    });
    p.push(`There may be a weather hold for ${listWords(bits)} due to low visibility and ceilings.`);

    const below = holds.map(x=>({x, m:minsStatus(x.s.icao, x.w.obs)})).filter(y=>y.m && y.m.visBelow);
    if(below.length){
      p.push(`${listWords(below.map(y=>y.x.s.name))} ${below.length===1?'is':'are'} below approach minimums right now, too low for the approach.`);
    }
    const cigOnly = holds.map(x=>({x, m:minsStatus(x.s.icao, x.w.obs)}))
      .filter(y=>y.m && !y.m.visBelow && y.m.cigBelow);
    if(cigOnly.length){
      p.push(`${listWords(cigOnly.map(y=>y.x.s.name))} ${cigOnly.length===1?'is':'are'} legal on visibility but the ceiling is below the lowest approach, so expect a look and a go around.`);
    }
  }

  const windy = active.map(x=>({name:x.s.name, spd:Math.max(x.w.obs.wspd||0, x.w.obs.wgst||0)})).sort((a,b)=>b.spd-a.spd);
  if(windy[0].spd >= 15){
    const others = windy.filter(w=>w.spd>=15);
    p.push(others.length===1
      ? `${others[0].name} is the only airport with any significant wind blowing ${others[0].spd} knots.`
      : `Winds are up at ${listWords(others.map(w=>w.name+' '+w.spd+' kt'))}.`);
  } else if(windy[0].spd >= 10){
    p.push(`Winds are highest at ${windy[0].name} so far at ${windy[0].spd} knots.`);
  } else {
    p.push('Winds are light everywhere.');
  }

  const hzBits = [];
  const bt0 = Date.now(), bt1 = bt0 + Math.max(winHrs,0.02)*3600000;
  const tsZ = Object.values(state.fa.zones).filter(z=>[...zoneActive(z,bt0,bt1).wx].some(t=>t.includes('TS')||t==='CB'||t==='TCU')).map(z=>z.id);
  const tsStn = active.filter(x=>[...x.w.wx].some(t=>t.includes('TS'))).map(x=>x.s.name);
  if(tsZ.length || tsStn.length) hzBits.push(`Isolated thunderstorms in the picture${tsStn.length?' at '+listWords(tsStn):''}${tsZ.length?' ('+tsZ.map(zName).join(', ')+')':''}, watch for CB`);
  if(hz.fzl) hzBits.push(`Freezing level around ${hz.fzl.toLocaleString()} ft`);
  if(hz.mtnObsc) hzBits.push('Mountain tops occasionally obscured in the clouds and precip');
  if(hz.ice) hzBits.push(`AIRMET for icing ${hz.ice}`);
  /* Turbulence has two independent sources and the blurb only ever read one of them. The
     area forecast carries per-zone TURB lines that the FRAT scorer already uses, so a MOD
     TURB BLW 040 in the FA could sit there while this line claimed there was none. Report
     whichever source has it, and when neither does, say what was actually checked rather
     than asserting nothing is out there. */
  const faTurb = Object.values((state.fa||{}).zones||{})
    .map(z=>({name:z.name||z.id, hit:(z.turb||[]).filter(l=>/\b(MOD|SEV)\b/.test(l)).join(' ')}))
    .filter(t=>t.hit);
  if(hz.turb) hzBits.push(`AIRMET for turbulence ${hz.turb}`);
  if(faTurb.length){
    const worst = faTurb.some(t=>/\bSEV\b/.test(t.hit)) ? 'severe' : 'moderate';
    const alt = (faTurb.map(t=>(t.hit.match(/BLW\s*(\d{3})/)||[])[1]).filter(Boolean)[0]);
    hzBits.push(`Area forecast has ${worst} turbulence${alt?' below '+(parseInt(alt,10)*100).toLocaleString()+' ft':''} in ${listWords(faTurb.map(t=>t.name))}`);
  }
  if(!hz.turb && !faTurb.length) hzBits.push('No turbulence AIRMET and nothing in the area forecast turbulence sections');
  const fogStns = active.filter(x=>x.w.obs.temp!==null && x.w.obs.temp!==undefined && x.w.obs.dewp!==null && x.w.obs.dewp!==undefined && (x.w.obs.temp - x.w.obs.dewp) < 1).map(x=>x.s.name);
  if(fogStns.length) hzBits.push(`Temp/dewpoint spread under 1C at ${listWords(fogStns)}, watch for fog`);
  const llwsStns = STATIONS.filter(s=>per[s.icao].llws).map(s=>s.name);
  if(llwsStns.length) hzBits.push(`Low level wind shear in the ${listWords(llwsStns)} TAF`);
  if(hzBits.length) p.push(hzBits.join('. ') + '.');

  /* Outlook trend. The FA gives each zone an OTLK section and the parser already keeps it;
     DTRT, IMPR and NO CHG are the words that matter for whether this gets better or worse. */
  const zs = Object.values((state.fa||{}).zones||{}).filter(z=>z.outlook);
  if(zs.length){
    const dtrt = zs.filter(z=>/\bDTRT\b/.test(z.outlook)).map(z=>z.name||z.id);
    const impr = zs.filter(z=>/\bIMPR\b/.test(z.outlook)).map(z=>z.name||z.id);
    const same = zs.filter(z=>/\bNO\s*CHG\b|\bNOCHG\b/.test(z.outlook)).map(z=>z.name||z.id);
    const bits = [];
    if(dtrt.length) bits.push(`deteriorating in ${listWords(dtrt)}`);
    if(impr.length) bits.push(`improving in ${listWords(impr)}`);
    if(same.length && !dtrt.length && !impr.length) bits.push('holding steady everywhere');
    else if(same.length) bits.push(`no change in ${listWords(same)}`);
    if(bits.length) p.push(`Outlook has it ${listWords(bits)}.`);
  }
  if((state.fa||{}).synopsis){
    const syn = String(state.fa.synopsis).replace(/\s+/g,' ').trim();
    if(syn) p.push(`Synopsis: ${syn.length > 260 ? syn.slice(0,257).replace(/[,;]?\s+\S*$/,'') + '...' : syn}`);
  }

  document.getElementById('blurb').value = p.join(' ');
}

/* ================= LOAD ================= */
async function loadNow(){
  const st = document.getElementById('status');
  st.className = 'status'; st.textContent = 'Fetching METARs, TAFs and AIRMETs...';
  const wxStns = STATIONS.filter(st=>!st.noMetar);
  const ids = wxStns.map(st=>st.icao).join(',') + ',PAHY';
  const now = new Date();
  const madisT0 = new Date(now.getTime() - 75*60000);
  const ndbcIds = EXT.filter(e=>e.src!=='metar').flatMap(e=>e.fallback?[e.id,e.fallback]:[e.id])
    .concat(STATIONS.filter(st=>st.ndbc).map(st=>st.ndbc));
  try{
    const results = await Promise.all([
      fetchJSON(`${AWC}/metar?ids=${ids}&format=json&hours=12`).catch(()=>null),
      fetchJSON(`${AWC}/taf?ids=${wxStns.map(st=>st.icao).join(',')}&format=json`).catch(()=>null),
      Promise.all([
        fetchJSON(`${AWC}/airsigmet?format=json`).catch(()=>null),
        fetchJSON(`${AWC}/isigmet?format=json&loc=pacific`).catch(()=>null),
        fetchJSON(`${AWC}/isigmet?format=json`).catch(()=>null),
      ]).then(([us, pac, all])=>{
        if(us === null && pac === null && all === null) return null;
        const intl = (Array.isArray(pac) && pac.length) ? pac : (Array.isArray(all) ? all : []);
        /* International SIGMETs use their own field names, so they are normalised into the
           same shape the rest of the code already understands. */
        const norm = intl.filter(x=>{
          const fir = String(x.firId || x.icaoId || '').toUpperCase();
          const raw = String(x.rawSigmet || x.raw || x.rawText || '').toUpperCase();
          // must positively be Anchorage FIR, by field or by the text of the bulletin itself
          return fir.startsWith('PA') || /\bPAZA\b|ANCHORAGE FIR/.test(raw);
        }).map(x=>({
          airSigmetType: 'SIGMET',
          hazard: x.hazard || x.phenom || '',
          alphaChar: x.seriesId || x.alphaChar || null,
          validTimeFrom: x.validTimeFrom, validTimeTo: x.validTimeTo,
          coords: x.coords || x.geom || null,
          rawAirSigmet: x.rawSigmet || x.raw || x.rawText || '',
          __intl: true,
        }));
        return (Array.isArray(us) ? us : []).concat(norm);
      }).catch(()=>null),
      fetchText(iemUrl(madisT0, now)).catch(()=>null),
      fetchFA('FA7H','https://tgftp.nws.noaa.gov/data/raw/fa/faak47.pawu.fa.7h.txt').catch(()=>null),
      fetchFA('FA7W','https://tgftp.nws.noaa.gov/data/raw/fa/faak57.pawu.fa.7w.txt').catch(()=>null),
      SYNOPTIC_TOKEN ? fetchJSON(SYN_URL()).catch(()=>null) : Promise.resolve(null),
      Promise.all(camRefreshSet().map(c=>camFetch(c.id).then(j=>({id:c.id, j})).catch(()=>({id:c.id, j:null})))),
      Promise.resolve(null),
      fetchJSON(TFR_URL).catch(()=>null),
      ...TIDE_STNS.map(t=>fetchJSON(tideURL(t.id)).then(j=>({tid:t.id, pred:(j&&j.predictions)||null})).catch(()=>({tid:t.id, pred:null}))),
      ...ndbcIds.map(id=>fetchText(`https://www.ndbc.noaa.gov/data/realtime2/${id}.txt`).then(t=>({id, ob:parseNDBC(t)})).catch(()=>({id, ob:null}))),
      Promise.resolve(null)   /* slot kept; one-minute archive retired, MADIS-HF runs on its own ticker */
    ]);
    const synJson = results[6];
    const camRes = results[7] || [];
    const notamJson = results[8], tfrJson = results[9];
    const tideRes = results.slice(10, 10+TIDE_STNS.length);
    const ndbc = results.slice(10+TIDE_STNS.length, results.length - 1).filter(x=>x && x.id);
    state.cams = state.cams || {};
    state.camTried = true;
    let camLive = 0, camPend = 0, camFail = 0;
    camRes.forEach(r=>{
      if(!r.j){ camFail++; state.cams[r.id] = state.cams[r.id] || {failed:true}; return; }
      const d = parseCam(r.j);
      state.cams[r.id] = d;
      // a night or stale site is answering correctly, it just has nothing current to report
      if(d.veia || d.wind || d.cams.length) camLive++;
      else if(d.night || d.stale) camPend++;
      else camPend++;
    });
    state.camStat = {live:camLive, pend:camPend, fail:camFail, at:Date.now()};
    const [metars, tafs, sigs, iemText, faH, faW] = results;
    const asos1Text = results[results.length - 1];   // appended last, so nothing renumbers
    if(!state.notams) state.notams = {};
    loadNotams();
    if(tfrJson !== null){
      const arr = Array.isArray(tfrJson) ? tfrJson : (tfrJson && tfrJson.tfrList) || [];
      state.tfrs = arr.filter(t=>String(t.state||t.facility||'').toUpperCase().includes('AK') || String(t.facility||'').toUpperCase().includes('ZAN'));
    } else if(!state.tfrs) state.tfrs = [];
    state.tides = state.tides || {};
    tideRes.forEach(r=>{ if(r && r.pred) state.tides[r.tid] = r.pred; });
    const failed = [];
    if(metars === null){ failed.push('METAR'); }
    else {
      state.metars = state.metars || {}; state.metarHist = {};
      (metars||[]).forEach(m=>{ // newest first from API
        if(!state.metarHist[m.icaoId]) state.metars[m.icaoId] = m;
        (state.metarHist[m.icaoId] = state.metarHist[m.icaoId]||[]).push(m);
      });
    }
    if(tafs === null){ failed.push('TAF'); }
    else { state.tafs = {}; (tafs||[]).forEach(t=>{ if(!state.tafs[t.icaoId]) state.tafs[t.icaoId] = t; }); }
    if(sigs === null){ failed.push('AIRSIGMET'); }
    else {
      const all = Array.isArray(sigs) ? sigs : [];
      state.airmets = all.filter(a=>!isSigmet(a));   // SIGMETs get their own treatment
      state.sigmets = all.filter(isSigmet);
    }
    if(iemText === null){ failed.push('MADIS'); }
    else {
      const iemRows = parseIEM(iemText);
      state.madis = state.madis || {};
      const freshMadis = latestMadisByStation(iemRows);
      Object.keys(freshMadis).forEach(k=>{
        const inc = freshMadis[k], cur = state.madis[k];
        if(cur && cur.hf) return;      // the MADIS slot belongs to MADIS HF; the METAR has its own line
        if(!cur || (toDate(inc.valid) && toDate(cur.valid) && toDate(inc.valid) > toDate(cur.valid)) || !toDate(cur.valid)) state.madis[k] = inc;
      });
      updateSeries(iemRows);
      /* One-minute ASOS overrides the METAR archive at the four sites that produce it.
         Wind, temperature, dewpoint and altimeter only; ceiling and visibility stay with the
         METAR, so the existing values are carried forward rather than blanked. */
      if(asos1Text){
        const a1 = parseAsos1(asos1Text);
        if(a1.length){
          const latest1 = {};
          a1.forEach(r=>{ if(!latest1[r.stn] || r.valid > latest1[r.stn].valid) latest1[r.stn] = r; });
          let applied = 0;
          STATIONS.forEach(st2=>{
            const r = latest1[st2.icao];
            if(!r) return;
            const cur = state.madis[st2.icao] || {};
            state.madis[st2.icao] = Object.assign({}, cur, r, {
              cig: cur.cig !== undefined ? cur.cig : null,     // keep the METAR ceiling
              vis: cur.vis !== undefined ? cur.vis : null,     // and the METAR visibility
              visRaw: cur.visRaw,
            });
            applied++;
          });
          state.a1Diag = `1-min ASOS: ${a1.length} rows, ${applied} stations applied`;
        } else {
          state.a1Diag = '1-min ASOS returned no usable rows';
        }
      } else {
        state.a1Diag = null;
      }
      // Synoptic 5-min layer overrides where present
      if(!SYNOPTIC_TOKEN){
        state.synDiag = 'no Synoptic token set';
      } else if(!synJson){
        state.synDiag = 'Synoptic request returned nothing (blocked, offline or rejected)';
      } else if(synJson && synJson.SUMMARY && Number(synJson.SUMMARY.RESPONSE_CODE) !== 1){
        state.synDiag = 'Synoptic says: ' + String(synJson.SUMMARY.RESPONSE_MESSAGE || 'error').slice(0,70);
      } else if(synJson && !synJson.STATION){
        state.synDiag = 'Synoptic replied with no STATION block';
      }
      if(synJson){
        const synRows = parseSyn(synJson);
        if(!synRows.length && !/Synoptic says|no STATION/.test(state.synDiag || '')){
          state.synDiag = 'Synoptic returned ' + ((synJson.STATION||[]).length) + ' stations but no usable rows';
        }
        if(synRows.length){
          const stns = [...new Set(synRows.map(r=>r.stn))];
          const matched = STATIONS.filter(x=>stns.includes(x.icao)).length;
          const newest = synRows.reduce((a,r)=>(!a || r.valid > a) ? r.valid : a, null);
          state.synDiag = `Synoptic OK: ${synRows.length} rows, ${stns.length} stations, `
            + `${matched} matched to ours, newest ${newest}`
            + (matched === 0 ? '. STATION IDs came back as: ' + stns.slice(0,4).join(',') : '');
          updateSeries(synRows);
          const latest = {};
          synRows.forEach(r=>{ if(!latest[r.stn] || r.valid > latest[r.stn].valid) latest[r.stn] = r; });
          STATIONS.forEach(st2=>{ if(latest[st2.icao]) state.madis[st2.icao] = latest[st2.icao]; });
          iemRows.push(...synRows);
        }
      }
      // measure actual cadence per station instead of assuming 5 min
      state.mcad = {};
      STATIONS.forEach(st2=>{
        const times = iemRows.filter(r=>st2.iem.includes(r.stn)).map(r=>toDate(r.valid)).filter(Boolean).map(d=>d.getTime()).sort((a,b)=>a-b);
        if(times.length >= 3){
          const gaps = [];
          for(let i=1;i<times.length;i++) gaps.push((times[i]-times[i-1])/60000);
          gaps.sort((a,b)=>a-b);
          state.mcad[st2.icao] = Math.round(gaps[Math.floor(gaps.length/2)]);
        }
      });
    }
    if(faH === null && faW === null){ failed.push('FA'); }
    else {
      const pH = parseFA(faH||''), pW = parseFA(faW||'');
      state.fa = {zones:{...pH.zones, ...pW.zones}, synopsis:pH.synopsis || pW.synopsis, airmetsValid:pH.airmetsValid || pW.airmetsValid, raw:[faH, faW].filter(Boolean).join('\n\n=====\n\n')};
    }
    if(metars === null && tafs === null && iemText === null && !state.loadedAt){
      throw new Error('no feeds reachable');
    }
    const ndbcMap = Object.fromEntries(ndbc.map(x=>[x.id, x.ob]));
    state.harbor = {};
    STATIONS.filter(st=>st.ndbc).forEach(st=>{ state.harbor[st.icao] = ndbcMap[st.ndbc] || null; });
    state.ext = {};
    EXT.forEach(e=>{
      if(e.src === 'metar'){
        const m = state.metars['PAHY'];
        state.ext[e.id] = m ? {t:(m.obsTime||m.reportTime), wdir:m.wdir, wspd:m.wspd||0, gust:m.wgst||0, raw:m.rawOb} : null;
      } else {
        state.ext[e.id] = ndbcMap[e.id] || (e.fallback ? ndbcMap[e.fallback] : null);
      }
    });
    state.loadedAt = new Date();
    detectChanges();
    document.getElementById('updated').textContent = 'Updated ' + fmtStamp(state.loadedAt);
    st.textContent = `Loaded ${STATIONS.filter(st=>state.metars[st.icao]).length}/${STATIONS.filter(st=>!st.noMetar).length} METARs, ${Object.keys(state.tafs).length} TAFs, ${Object.keys(state.madis).length} MADIS, ${EXT.filter(e=>state.ext[e.id]).length}/${EXT.length} cutoff stations, ${Object.keys(state.fa.zones).length}/5 FA zones, ${Object.values(state.notams||{}).reduce((a,l)=>a+l.length,0)} NOTAMs at ${Object.keys(state.notams||{}).filter(k=>(state.notams[k]||[]).length).length} airports${state.notamDiag?' ('+state.notamDiag+')':''}, ${(state.tfrs||[]).length} AK TFRs, cams ${(state.camStat||{}).live||0} live/${(state.camStat||{}).pend||0} pending/${(state.camStat||{}).fail||0} blocked at ${fmtStamp(state.loadedAt)}${state.route>0?' (via proxy)':''}. ${sigmetDiag()}.${state.mxDiag?' MXAK: '+state.mxDiag+'.':''}${state.synDiag?' 5-MIN: '+state.synDiag+'.':''}${state.a1Diag?' '+state.a1Diag+'.':''}${state.hfDiag?' '+state.hfDiag+'.':''}`
      + (failed.length ? ` \u26a0 ${failed.join(', ')} feed${failed.length>1?'s':''} failed this cycle, showing last good data. Retrying in 5 min.` : '');
    st.className = failed.length ? 'status err' : 'status';
    /* Marine Exchange refresh, driven from the same cycle as everything else. */
    if(!state.mxBusy && (!state.mxAt || Date.now() - state.mxAt > 80*1000)){
      state.mxBusy = true;
      loadMxak().catch(e=>{ state.mxDiag = 'MXAK fetch failed: ' + String(e && e.message || e).slice(0,60); })
        .finally(()=>{ state.mxBusy = false; if(window.lastPer) renderMaster(window.lastPer); });
    }
    noteTafChanges();
    /* Redraw when the newest change stops being fresh, so the pulse ends on its own rather
       than waiting for the next five minute cycle. */
    if(state.chgFlashTimer) clearTimeout(state.chgFlashTimer);
    const newest = (state.alerts||[])[0];
    if(newest && Date.now() - newest.t < CHG_FLASH_MS){
      state.chgFlashTimer = setTimeout(()=>{ if(window.lastPer) renderMaster(window.lastPer); },
        CHG_FLASH_MS - (Date.now() - newest.t) + 250);
    }
    renderBoard();
    try{
      const gb = document.getElementById('sigmetBanner');
      if(gb) gb.innerHTML = sigmetBannerHTML();
      sigmetNotify();
      const sb = document.getElementById('sensorBanner');
      if(sb) sb.innerHTML = sensorBannerHTML();
      sensorNotify();
    }catch(e){ console.error('sensor check failed', e); }
    renderAlerts();
    renderCamSection();
    if(!state.backfilled){
      state.backfilled = true;
      const bf0 = new Date(Date.now() - 24*3600000);
      fetchText(iemUrl(bf0, new Date())).then(t=>{
        const rows = parseIEM(t);
        updateSeries(rows);
        state.madis = state.madis || {};
        const latestBf = latestMadisByStation(rows);
        Object.keys(latestBf).forEach(k=>{
          const inc = latestBf[k], cur = state.madis[k];
          if(!cur || (toDate(inc.valid) && toDate(cur.valid) && toDate(inc.valid) > toDate(cur.valid))) state.madis[k] = inc;
        });
        renderBoard();
      }).catch(()=>{});
    }
  }catch(e){
    st.className = 'status err';
    const where = (e.stack||'').split('\n')[1] || '';
    st.textContent = 'Load error: ' + e.message + (where ? ' (' + where.trim().slice(0,80) + ')' : '') +
      '. Showing whatever loaded; check the debug panel.';
    console.error('loadNow failed', e);
    // draw with the data that did arrive rather than leaving the page empty
    try{ if(state.metars && Object.keys(state.metars).length){ state.loadedAt = state.loadedAt || Date.now(); renderBoard(); } }
    catch(e2){ console.error('render after load error also failed', e2); }
  }
}

/* ================= FRAT MODE ================= */
function fratLocalToUTC(val){
  // datetime-local has no zone; interpret as America/Juneau by probing the offset
  const guess = new Date(val + ':00Z');
  const off = -offsetMinutes('America/Juneau', guess); // minutes to add to local to get UTC
  return new Date(guess.getTime() + off*60000);
}
function offsetMinutes(tz, date){
  const dtf = new Intl.DateTimeFormat('en-US',{timeZone:tz, hour12:false, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
  const parts = Object.fromEntries(dtf.formatToParts(date).map(p=>[p.type,p.value]));
  const asUTC = Date.UTC(parts.year, parts.month-1, parts.day, parts.hour==='24'?0:parts.hour, parts.minute);
  return (asUTC - date.getTime())/60000;
}
function pad(n){ return String(n).padStart(2,'0'); }

async function loadFrat(){
  const st = document.getElementById('status');
  const val = document.getElementById('fratTime').value;
  if(!val){ st.textContent = 'Pick a date and time first.'; return; }
  const winMin = parseInt(document.getElementById('fratWin').value,10);
  const center = fratLocalToUTC(val);
  const t0 = new Date(center.getTime() - winMin*60000);
  const t1 = new Date(center.getTime() + winMin*60000);
  st.className='status'; st.textContent = 'Pulling IEM archive...';

  const stationParams = STATIONS.flatMap(s=>s.iem.map(id=>'station='+id)).join('&');
  const url = `${IEM}?${stationParams}&data=all&tz=Etc/UTC&format=onlycomma&latlon=no`
    + `&year1=${t0.getUTCFullYear()}&month1=${t0.getUTCMonth()+1}&day1=${t0.getUTCDate()}&hour1=${t0.getUTCHours()}&minute1=${t0.getUTCMinutes()}`
    + `&year2=${t1.getUTCFullYear()}&month2=${t1.getUTCMonth()+1}&day2=${t1.getUTCDate()}&hour2=${t1.getUTCHours()}&minute2=${t1.getUTCMinutes()}`;
  let text;
  try{ text = await fetchText(url); }
  catch(e){ st.className='status err'; st.textContent='IEM fetch failed: '+e.message; return; }

  const lines = text.trim().split('\n').filter(l=>l && !l.startsWith('#'));
  if(lines.length < 2){ st.textContent = 'No archived observations found in that window.'; document.getElementById('fratBoard').innerHTML=''; document.getElementById('fratObs').innerHTML=''; return; }
  const hdr = lines[0].split(',');
  const idx = n => hdr.indexOf(n);
  const rows = lines.slice(1).map(l=>{
    const c = l.split(',');
    return {stn:c[idx('station')], valid:c[idx('valid')], vsby:parseFloat(c[idx('vsby')]),
      sknt:parseFloat(c[idx('sknt')]), gust:parseFloat(c[idx('gust')]), wx:c[idx('wxcodes')],
      skyc:[c[idx('skyc1')],c[idx('skyc2')],c[idx('skyc3')],c[idx('skyc4')]],
      skyl:[c[idx('skyl1')],c[idx('skyl2')],c[idx('skyl3')],c[idx('skyl4')]],
      metar:c.slice(idx('metar')).join(',')};
  });
  const cigOf = r=>{
    let c=null;
    r.skyc.forEach((cv,i)=>{ if(['BKN','OVC','VV'].includes(cv)){ const b=parseFloat(r.skyl[i]); if(!isNaN(b) && (c===null||b<c)) c=b; }});
    return c;
  };
  const byStn = {};
  rows.forEach(r=>{ (byStn[r.stn] = byStn[r.stn]||[]).push(r); });

  const board = [];
  const obsHtml = [];
  STATIONS.forEach(s=>{
    const key = s.iem.find(id=>byStn[id]) ;
    const rs = key ? byStn[key] : [];
    if(!rs.length){
      board.push(`<tr><td>${s.name}</td><td class="mono">${s.icao}</td><td colspan="5" style="color:var(--mut)">no observation in archive (documentation of no official obs)</td></tr>`);
      return;
    }
    rs.sort((a,b)=>new Date(a.valid)-new Date(b.valid));
    let nearest = rs[0], best = Infinity;
    rs.forEach(r=>{ const d = Math.abs(new Date(r.valid+'Z') - center); if(d<best){best=d; nearest=r;} });
    const worstC = rs.map(cigOf).filter(c=>c!==null).sort((a,b)=>a-b)[0] ?? null;
    const worstV = rs.map(r=>r.vsby).filter(v=>!isNaN(v)).sort((a,b)=>a-b)[0] ?? null;
    const cat = flightCat(cigOf(nearest), isNaN(nearest.vsby)?null:nearest.vsby);
    board.push(`<tr><td>${s.name}</td><td class="mono">${s.icao}</td>
      <td><span class="worst cat-${cat}" style="font-size:12px;padding:2px 9px">${cat}</span></td>
      <td>${fmtCig(cigOf(nearest))}</td><td>${isNaN(nearest.vsby)?'?':nearest.vsby+' sm'}</td>
      <td>${worstC===null?'none':worstC.toLocaleString()+' ft'} / ${worstV===null?'?':worstV+' sm'}</td>
      <td class="mono">${fmtStamp(nearest.valid)}</td></tr>`);
    obsHtml.push(`<div class="detailcard"><h3>${s.name} (${s.icao})</h3><pre>${rs.map(r=>r.metar||`${r.valid}Z vis ${r.vsby} cig ${fmtCig(cigOf(r))}`).join('\n')}</pre></div>`);
  });
  document.getElementById('fratBoard').innerHTML = `<table><tr><th>Location</th><th>ID</th><th>Cat</th><th>Ceiling</th><th>Vis</th><th>Lowest in window</th><th>Nearest ob</th></tr>${board.join('')}</table>`;
  document.getElementById('fratObs').innerHTML = obsHtml.join('');
  st.textContent = `Archive loaded for ${localTime(center)} local ±${winMin} min. Grade against the FRAT embedded METAR.`;
}


/* ================= VALUE COLOR CODING ================= */
function catClr(cat){ return cat==='LIFR'?'var(--lifr)':cat==='IFR'?'var(--ifr)':cat==='MVFR'?'var(--mvfr)':cat==='VFR'?'var(--vfr)':'var(--mut)'; }
function catBg(cat){
  const c = cat==='LIFR'?'200,80,220':cat==='IFR'?'226,87,75':cat==='MVFR'?'77,163,232':cat==='VFR'?'60,170,110':null;
  return c ? `linear-gradient(90deg, rgba(${c},0.30) 0%, rgba(${c},0.12) 50%, rgba(${c},0.06) 100%), var(--panel)` : 'var(--panel)';
}
const CAT_RULES = {
  VFR:  'ceiling above 3,000 ft AND visibility above 5 sm',
  MVFR: 'ceiling 1,000 to 3,000 ft OR visibility 3 to 5 sm',
  IFR:  'ceiling 500 to just under 1,000 ft OR visibility 1 to just under 3 sm',
  LIFR: 'ceiling below 500 ft OR visibility below 1 sm',
  NA:   'no ceiling or visibility reported'
};
/* Category is set by whichever of ceiling and visibility is worse, so naming the one
   actually driving it saves reading both numbers off the row. */
function catWhy(cat, cig, vis){
  if(cat === 'NA') return '';
  const cB = cigBand(cig), vB = visBand(vis);
  const drivers = [];
  if(cB === cat && cig !== null && cig !== undefined) drivers.push(`ceiling ${Number(cig).toLocaleString()} ft`);
  if(vB === cat && vis !== null && vis !== undefined) drivers.push(`visibility ${visTxt(vis)} sm`);
  return drivers.length ? ` Driven right now by ${drivers.join(' and ')}.` : '';
}
function catTitle(cat, cig, vis){
  const order = ['VFR','MVFR','IFR','LIFR'];
  const all = order.map(k => `${k}: ${CAT_RULES[k]}`).join('\n');
  return `${cat}: ${CAT_RULES[cat] || CAT_RULES.NA}.${catWhy(cat, cig, vis)}\n\n${all}\n\nCategory is set by whichever of ceiling and visibility is worse.`;
}
function catBadge2(cat, cig, vis){
  return `<span class="catbadge" title="${esc(catTitle(cat, cig, vis))}" style="background:${catClr(cat)};cursor:help">${cat}</span>`;
}
/* Spells out why the badge reads what it reads: what is on the ground now, what the TAF has
   inside the window, and which forecast group is dragging it down. */
function catSplitTitle(w){
  const L = [];
  const obs = w.obsCat || 'NA';
  L.push(`Badge shows ${w.cat}, the worst of observed and forecast inside the look-ahead window.`);
  L.push('');
  L.push(`Observed now: ${obs}${(w.nowCig!==null&&w.nowCig!==undefined)||(w.nowVis!==null&&w.nowVis!==undefined) ? ' (' + [(w.nowCig!==null&&w.nowCig!==undefined)?fmtCig(w.nowCig):null, (w.nowVis!==null&&w.nowVis!==undefined)?visTxt(w.nowVis)+' sm':null].filter(Boolean).join(', ') + ')' : ''}`);
  if(w.tafWorst){
    L.push(`Forecast worst: ${w.tafCat}${(w.tafWorst.cig!==null||w.tafWorst.vis!==null) ? ' (' + [w.tafWorst.cig!==null?fmtCig(w.tafWorst.cig):null, w.tafWorst.vis!==null?visTxt(w.tafWorst.vis)+' sm':null].filter(Boolean).join(', ') + ')' : ''}`);
    const drivers = [];
    if(w.worstCigSrc === 'TAF' && w.worstCigGrp) drivers.push(`ceiling from ${w.worstCigGrp.lbl} ${fmtLZ(w.worstCigGrp.t0)} to ${fmtLZ(w.worstCigGrp.t1)}${w.worstCigGrp.cig!==null?' ('+fmtCig(w.worstCigGrp.cig)+')':''}`);
    if(w.worstVisSrc === 'TAF' && w.worstVisGrp) drivers.push(`visibility from ${w.worstVisGrp.lbl} ${fmtLZ(w.worstVisGrp.t0)} to ${fmtLZ(w.worstVisGrp.t1)}${w.worstVisGrp.vis!==null?' ('+visTxt(w.worstVisGrp.vis)+' sm)':''}`);
    if(drivers.length){ L.push(''); L.push('Driven by ' + drivers.join('; ') + '.'); }
  } else {
    L.push('No TAF on file for this station.');
  }
  L.push('');
  L.push(CAT_RULES[w.cat] ? `${w.cat}: ${CAT_RULES[w.cat]}.` : '');
  return L.filter(x=>x!==undefined).join('\n');
}
/* Shown only when observed and badge disagree, which is exactly when it is worth saying. */
/* The change detector has always recorded what moved and when, but only the alerts panel and
   the compact strip ever showed it. This puts the most recent change on the station itself,
   so a ceiling that dropped twelve minutes ago is visible without going looking for it. */
const CHG_WINDOW_MS = 30 * 60000;
/* How long a new change keeps flashing before it settles into an ordinary chip. */
const CHG_FLASH_MS = 60000;
/* ================= Missing sensor elements =================
   Visibility and sky condition are required elements of an automated report. If a station is
   still issuing METARs but one of them has gone, the sensor has failed, and that failure is
   often not NOTAM'd for hours. A crew can be airborne against a field that has quietly
   stopped reporting the thing their approach depends on, which is exactly what happened at
   Hoonah. A clear sky is a REPORT, not a gap: CLR, SKC, NCD, NSC and CAVOK all count as the
   sensor working. */
/* ================= SIGMETs =================
   The airsigmet feed already carried these; the app was lumping them in with AIRMETs and they
   disappeared into the same list. A SIGMET is a different order of thing: thunderstorms,
   severe turbulence or icing, volcanic ash. It is not advisory, it is hazardous to all
   aircraft, and for a Part 135 operation flying Beavers and Caravans it is closer to a stop
   than a caution. It gets its own banner. */
function isSigmet(a){
  const t = String((a && (a.airSigmetType || a.type)) || '').toUpperCase();
  if(t.includes('SIGMET')) return true;
  const raw = String((a && (a.rawAirSigmet || a.raw || a.rawText)) || '').toUpperCase();
  return /\bSIGMET\b/.test(raw) && !/\bAIRMET\b/.test(raw);
}
function sigmetHazard(a){
  const h = String((a && (a.hazard || a.hazardType)) || '').toUpperCase();
  const raw = String((a && (a.rawAirSigmet || a.raw || a.rawText)) || '').toUpperCase();
  if(h.includes('CONV') || /\bTS\b|THUNDERSTORM|EMBD TS|SQL/.test(raw)) return 'thunderstorms';
  if(h.includes('TURB') || /SEV TURB/.test(raw)) return 'severe turbulence';
  if(h.includes('ICE') || /SEV ICE/.test(raw)) return 'severe icing';
  if(h.includes('ASH') || /VOLCANIC ASH/.test(raw)) return 'volcanic ash';
  if(h.includes('IFR')) return 'IFR conditions';
  if(h.includes('MTW') || /MTN WAVE/.test(raw)) return 'mountain wave';
  return h ? h.toLowerCase() : 'hazardous conditions';
}
function activeSigmets(){
  const now = Date.now();
  const hasSubstance = a => {
    const h = String((a && (a.hazard || a.hazardType)) || '').trim();
    const raw = String((a && (a.rawAirSigmet || a.raw || a.rawText)) || '').trim();
    return !!(h || raw.length > 20);      // nothing to say means nothing to show
  };
  const pool = (state.sigmets || []).concat((state.airmets || []).filter(isSigmet)).filter(hasSubstance);
  const seen = new Set();
  return pool.filter(a=>{
    const k = (a.rawAirSigmet || a.raw || '') + (a.alphaChar || '');
    if(seen.has(k)) return false; seen.add(k); return true;
  }).filter(a=>{
    const end = a.validTimeTo ? (String(a.validTimeTo).length > 12 ? Date.parse(a.validTimeTo) : a.validTimeTo*1000) : null;
    return !end || end > now;
  }).filter(a=>{
    /* Keep only what reaches us. A polygon is authoritative; without one, fall back to the
       Alaska region rather than dropping it, since a SIGMET is the wrong thing to hide. */
    const c = a.coords || a.coordinates || a.area;
    if(Array.isArray(c) && c.length){
      try{
        const ring = c.map(p=>Array.isArray(p) ? p : [p.lon ?? p.longitude, p.lat ?? p.latitude]);
        let laMin=999, laMax=-999, loMin=999, loMax=-999;
        ring.forEach(([lo,la])=>{ if(!Number.isFinite(lo)||!Number.isFinite(la)) return;
          if(lo<loMin)loMin=lo; if(lo>loMax)loMax=lo; if(la<laMin)laMin=la; if(la>laMax)laMax=la; });
        if(loMin<=loMax) return loMax>=BBOX.lonMin && loMin<=BBOX.lonMax && laMax>=BBOX.latMin && laMin<=BBOX.latMax;
      }catch(e){}
    }
    return true;
  });
}
function sigmetDiag(){
  const all = (state.airmets || []).concat(state.sigmets || []);
  const sig = (state.sigmets || []).concat((state.airmets || []).filter(isSigmet));
  const act = activeSigmets();
  state.sigDiag = `airsigmet feed: ${all.length} items, ${sig.length} SIGMET, ${act.length} active here`;
  if(act.length) state.sigDiag += '. ' + act.slice(0,2).map(a=>
    String(a.rawAirSigmet || a.raw || '(no text)').replace(/\s+/g,' ').slice(0,90)).join(' | ');
  if(sig.length && !act.length){
    state.sigDiag += '. Dropped: ' + sig.slice(0,3).map(a=>{
      const end = a.validTimeTo ? (String(a.validTimeTo).length > 12 ? Date.parse(a.validTimeTo) : a.validTimeTo*1000) : null;
      return (end && end < Date.now()) ? 'expired' : 'outside area';
    }).join(', ');
  }
  return state.sigDiag;
}
function sigmetBannerHTML(){
  const list = activeSigmets();
  sigmetDiag();
  if(!list.length) return '';
  const one = list.length === 1;
  const rows = list.slice(0, 4).map(a=>{
    const raw = String(a.rawAirSigmet || a.raw || a.rawText || '').replace(/\s+/g,' ').trim();
    const until = a.validTimeTo ? fmtLZ(String(a.validTimeTo).length > 12 ? Date.parse(a.validTimeTo)/1000 : a.validTimeTo) : null;
    return `<div class="sigrow" title="${esc(raw || 'No raw text held.')}">`
      + `<b>${esc(sigmetHazard(a).toUpperCase())}</b>`
      + (a.alphaChar ? ` <span style="color:var(--ink)">${esc(a.alphaChar)}</span>` : '')
      + (until ? ` <span style="color:var(--mut)">until ${until}</span>` : '')
      + (raw ? ` <span class="sigraw">${esc(raw.slice(0,150))}${raw.length>150?'\u2026':''}</span>` : '')
      + '</div>';
  }).join('');
  return `<div class="sigbanner">
    <b>\u26a0 ${one ? 'SIGMET in effect' : list.length + ' SIGMETs in effect'}</b>
    ${rows}
    <div class="signote">A SIGMET is hazardous to all aircraft, not an advisory. Hover any line for the full text.</div>
  </div>`;
}
function sigmetNotify(){
  const list = activeSigmets();
  if(!list.length){ state.sigSig = null; return; }
  const sig = list.map(a=>(a.airSigmetId || a.alphaChar || '') + sigmetHazard(a)).join('|');
  if(state.sigSig === sig) return;
  state.sigSig = sig;
  state.alerts = state.alerts || [];
  list.forEach(a=>state.alerts.unshift({t:Date.now(), icao:'PAJN', name:'SIGMET', worse:true, better:false,
    msg:`SIGMET: ${sigmetHazard(a)}`}));
  flashTitle();
}
function sensorGap(icao){
  const w = (window.lastPer || {})[icao];
  const o = w && w.obs;
  if(!o) return null;
  if(o.estimated || o.unofficial) return null;      // camera or wind-only sites never report these
  const m = (state.metars || {})[icao];
  const raw = String(o.raw || (m && m.rawOb) || '').toUpperCase();
  if(!raw) return null;

  const missing = [];
  /* Some stations send the group as slashes rather than dropping it, which is the same thing
     said differently. */
  const visSlashed = /\s\/{4}SM\b/.test(raw);
  if(o.vis === null || o.vis === undefined || visSlashed) missing.push('visibility');

  const skyStated = /\b(CLR|SKC|NCD|NSC|CAVOK)\b/.test(raw)
    || /\b(FEW|SCT|BKN|OVC)\d{3}\b/.test(raw) || /\bVV\d{3}\b/.test(raw);
  const skySlashed = /\b(FEW|SCT|BKN|OVC)\/{3}\b/.test(raw) || /\bVV\/{3}\b/.test(raw) || /\/{6}\b/.test(raw);
  if(!skyStated || skySlashed) missing.push('sky condition');

  if(!missing.length) return null;
  return {icao, missing, t:o.t || null, raw};
}
function sensorGaps(){
  return STATIONS.map(st=>sensorGap(st.icao)).filter(Boolean)
    .map(g=>Object.assign(g, {name:(STATIONS.find(s=>s.icao===g.icao)||{}).name || g.icao}));
}
function sensorChip(icao){
  const g = sensorGap(icao);
  if(!g) return '';
  const what = g.missing.join(' and ');
  return `<span class="cutchip sensorbad" title="${esc(
    `${icao} is still issuing reports but ${what} is missing from them, so that sensor has failed. `
    + `This is often not NOTAM'd for hours. Treat the field as having no usable ${what} until it returns.`
    + `\n\n${g.raw}`)}">NO ${g.missing.map(x=>x === 'visibility' ? 'VIS' : 'SKY').join(' / ')}</span>`;
}
/* A banner rather than only a chip, because this is the kind of thing that has to be seen
   before anyone launches, not found while scanning. */
function sensorBannerHTML(){
  const gaps = sensorGaps();
  if(!gaps.length) return '';
  const one = gaps.length === 1;
  const list = gaps.map(g=>`${g.name} (${g.icao}): no ${g.missing.join(' or ')}`).join(' \u00b7 ');
  return `<div class="sensorbanner">
    <b>\u26a0 ${one ? 'A station has stopped reporting a required element' : gaps.length + ' stations have stopped reporting required elements'}</b>
    <div class="sensorsites">${esc(list)}</div>
    <div class="sensornote">The station is still sending reports, so this will not appear as a missing observation
      and is often not NOTAM'd. Anything depending on that element, including the approach, should be treated as
      unavailable there until it returns.</div>
  </div>`;
}
function sensorNotify(){
  const gaps = sensorGaps();
  if(!gaps.length){ state.sensorSig = null; return; }
  const sig = gaps.map(g=>g.icao + ':' + g.missing.join('+')).join('|');
  if(state.sensorSig === sig) return;
  state.sensorSig = sig;
  state.alerts = state.alerts || [];
  gaps.forEach(g=>state.alerts.unshift({t:Date.now(), icao:g.icao, name:g.name, worse:true, better:false,
    msg:`${g.name} has stopped reporting ${g.missing.join(' and ')}. Sensor failure, not NOTAM'd.`}));
  flashTitle();
}
/* Roll up consecutive same-element moves in the same direction. "vis 5 to 4" followed by
   "vis 4 to 3" is one trend, not two events, and two chips for it crowds the row. */
function rollUpChanges(list){
  const parse = m => {
    const t = String(m||'');
    const el = /ceiling/i.test(t) ? 'cig' : (/\bvis\b/i.test(t) ? 'vis' : null);
    const mm = t.match(/([\d,.]+)\s*(?:ft|sm)?\s*\u2192\s*([\d,.]+)\s*(ft|sm)/i);
    if(!el || !mm) return null;
    const val = x => parseFloat(String(x).replace(/[^\d.]/g,''));
    return {el, from: val(mm[1]), to: val(mm[2]), unit: mm[3].toLowerCase(),
      cat: /\b(LIFR|IFR|MVFR|VFR)\s*\u2192\s*(LIFR|IFR|MVFR|VFR)\b/.test(t)};
  };
  const out = [];
  for(const a of list){
    const p = parse(a.msg);
    const prev = out[out.length - 1];
    const pp = prev ? parse(prev.msg) : null;
    /* same element, same direction, and the newer chip starts where the older one ended */
    if(p && pp && p.el === pp.el && !p.cat && !pp.cat
       && Math.sign(p.to - p.from) === Math.sign(pp.to - pp.from)
       && Math.abs(p.to - pp.from) < 0.001){
      const fmt = v => p.unit === 'ft' ? v.toLocaleString() : String(v);
      prev.msg = `${p.el === 'cig' ? 'ceiling' : 'vis'} ${fmt(p.from)} \u2192 ${fmt(pp.to)} ${p.unit}`;
      prev.rolled = (prev.rolled || 1) + 1;
      continue;
    }
    out.push(Object.assign({}, a));
  }
  return out;
}
/* When each element last moved, per station. The change chips show WHAT changed; this shows
   WHEN each element last did, which is the question you ask when a field looks steady and you
   want to know whether it has been steady for five minutes or two hours. */
function lastMoves(icao){
  const rows = (state.alerts || []).filter(a=>a.icao === icao && a.msg);
  const find = re => rows.find(a=>re.test(String(a.msg)));
  const out = [];
  const vis = find(/\bvis\b/i), cig = find(/ceiling/i), wind = find(/wind|gust|kt\b/i);
  const fmt = (label, a) => {
    if(!a) return null;
    const mins = Math.round((Date.now() - a.t)/60000);
    const age = mins < 60 ? mins + 'm' : Math.floor(mins/60) + 'h' + String(mins%60).padStart(2,'0');
    const dir = a.worse ? 'lm-bad' : (a.better ? 'lm-good' : 'lm-neu');
    const arrow = a.worse ? '\u25bc' : (a.better ? '\u25b2' : '\u00b7');
    /* Pull the values out of the message so the chip says what moved, not merely that
       something did. "vis 6 to 7 sm" becomes "vis 6>7sm". */
    let what = '';
    /* A single alert can carry several clauses ("ceiling 4,100 to 3,200 ft, vis 10 to 7 sm");
       read only the clause for this element, and accept "none" for a ceiling that lifted. */
    const seg = String(a.msg).split(/,\s+/).find(p=>
      label === 'vis' ? /\bvis\b/i.test(p) : label === 'cig' ? /ceiling/i.test(p) : /wind|gust|kt\b/i.test(p)) || String(a.msg);
    const mm = seg.match(/([\d,.]+|none)\s*(?:ft|sm)?\s*\u2192\s*([\d,.]+|none)\s*(ft|sm)?/i);
    if(mm){
      const tidy = v => /none/i.test(v) ? 'none' : (String(v).replace(/,/g,'').length > 3 ? (parseFloat(String(v).replace(/,/g,''))/1000) + 'k' : v);
      const to = tidy(mm[2]);
      what = `${tidy(mm[1])}\u2192${to}${to === 'none' ? '' : (mm[3] || (label === 'vis' ? 'sm' : 'ft')).toLowerCase()}`;
    } else {
      const wm = String(a.msg).match(/([\dA-Z]+kt)\s*\u2192\s*([\dA-Z]+kt)/i);
      if(wm) what = `${wm[1]}\u2192${wm[2]}`;
      else {
        const cm = String(a.msg).match(/\b(LIFR|IFR|MVFR|VFR)\s*\u2192\s*(LIFR|IFR|MVFR|VFR)\b/);
        if(cm) what = `${cm[1]}\u2192${cm[2]}`;
      }
    }
    return `<span class="lastmove ${dir}" title="${esc(fmtLZ(a.t) + ': ' + a.msg)}">`
      + `<b>${arrow} ${label}</b> ${what ? what + ' ' : ''}`
      + `<span style="opacity:.65">${fmtLZ(a.t)} ${age}</span></span>`;
  };
  [fmt('vis', vis), fmt('cig', cig), fmt('wind', wind)].forEach(x=>{ if(x) out.push(x); });
  if(!out.length) return '';
  return out.join('');
}
function changeChips(icao){
  const seen = new Set();
  return rollUpChanges((state.alerts||[])
    .filter(x=>x.icao === icao && x.msg)
    .filter(x=>{ const k = x.t + '|' + x.msg; if(seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, 6))
    .slice(0, 3)
    .map(a=>changeChipOne(a)).join('');
}
function changeChipOne(a){
  if(!a) return '';
  const parts = String(a.msg).split(', ');
  // lead with the category move if there was one, it is the part people scan for
  const short = a.short || parts.find(p=>/\u2192/.test(p) && /\b(LIFR|IFR|MVFR|VFR)\b/.test(p)) || parts[0];
  const cls = a.worse ? 'chgbad' : (a.better ? 'chggood' : 'chgneu');
  const arrow = a.worse ? '\u25bc' : (a.better ? '\u25b2' : '\u00b7');
  const title = `Changed ${fmtLZ(a.t)} (${agoTxt(a.t)}): ${a.msg}`;
  const fresh = (Date.now() - a.t) < CHG_FLASH_MS;
  const via = /\(MADIS\)/.test(String(a.msg)) ? ' <span style="opacity:.65;font-size:.85em">MADIS</span>' : '';
  return `<span class="chgchip ${cls}${fresh ? ' chgflash' : ''}" title="${esc(title)}">${arrow} ${fmtLZ(a.t)} ${esc(short.replace(/ \(MADIS\)/,''))}${via}</span>`;
}
function changeChip(icao){ return changeChips(icao); }
function changeChip2(icao){ return changeChips(icao); }
/* A split badge: what the field is doing on the left, what the forecast calls for on the
   right. For IFR planning the pair is the useful thing, since a field that is VFR now and
   LIFR by arrival is a different proposition from one that is simply VFR. Only splits when
   the two differ, so a settled station stays a plain single badge. */
function catBadgeHTML(w){
  const obs = (w.obsCat && w.obsCat !== 'NA') ? w.obsCat : w.cat;
  const fc = w.cat;
  const tip = esc(catSplitTitle(w));
  if(!fc || !obs || fc === obs)
    return `<span class="catbadge" title="${tip}" style="background:${catClr(obs || fc)};cursor:help">${obs || fc}</span>`;
  return `<span class="catbadge catsplit" title="${tip}" style="cursor:help">`
    + `<span class="cshalf" style="background:${catClr(obs)}">${obs}</span>`
    + `<span class="cshalf" style="background:${catClr(fc)}">${fc}</span></span>`;
}
function nowCatChip(w){
  const obs = w.obsCat || 'NA';
  if(!w.cat || obs === 'NA' || obs === w.cat) return '';
  return `<span class="nowcat" title="${esc(catSplitTitle(w))}" style="border-color:${catClr(w.cat)};color:${catClr(w.cat)}">forecast ${w.cat}</span>`;
}
function cigBand(h){ return h===null||h===undefined?'NA':h<500?'LIFR':h<1000?'IFR':h<=3000?'MVFR':'VFR'; }
function visBand(v){ return v===null||v===undefined?'NA':v<1?'LIFR':v<3?'IFR':v<=5?'MVFR':'VFR'; }
function cv(txt, band){ return `<span style="color:${catClr(band)};font-weight:600">${txt}</span>`; }
function layersHTML(clouds, vertVis){
  const ls = (clouds||[]).map(c=>{
    const isCig = ['BKN','OVC','OVX','VV'].includes(c.cover);
    const txt = c.cover + (c.base!==null&&c.base!==undefined?String(Math.round(c.base/100)).padStart(3,'0'):'');
    return {txt, base:c.base, isCig};
  });
  const vvf = vvFeet(vertVis);
  if(vvf !== null) ls.push({txt:'VV'+String(Math.round(vvf/100)).padStart(3,'0'), base:vvf, isCig:true});
  if(!ls.length) return '<span style="color:var(--mut)">CLR</span>';
  const lowestCig = ls.filter(l=>l.isCig).sort((a,b)=>a.base-b.base)[0];
  return ls.map(l=>{
    const c = l.isCig ? catClr(cigBand(l.base)) : 'var(--mut)';
    const bold = lowestCig && l===lowestCig ? 'font-weight:800;text-decoration:underline' : 'font-weight:600';
    return `<span style="color:${c};${bold}">${l.txt}</span>`;
  }).join(' ');
}
function windHTML(icao, wdir, wspd, wgst){
  if(!wspd && !wgst) return '<span style="color:var(--mut)">calm</span>';
  const eff = Math.max(wspd||0, wgst||0);
  const L = LIMITS[icao];
  let lim = null;
  if(L) ['float','c208','pc12'].forEach(k=>(L[k]||[]).forEach(a=>{ if(a.max!==null&&a.max!==undefined&&(lim===null||a.max<lim)) lim=a.max; }));
  const col = lim!==null && eff>lim ? 'var(--ifr)' : (lim!==null && eff>=lim-5 ? 'var(--amber)' : 'var(--ink)');
  /* Shown in MAGNETIC so it lines up with the magnetic runway numbers and with what a pilot
     hears on the AWOS. METAR and MADIS both report true, so the variation comes off here.
     The M suffix matters: the raw METAR text is displayed further down the expanded row and
     still carries the true value, and the two must not be mistaken for each other. */
  const hasDir = Number.isFinite(wdir);
  const wMag = hasDir ? ((wdir - MAGVAR) + 360) % 360 : null;
  const arrow = (hasDir && (wspd||0) > 0)
    ? `<svg width="14" height="14" viewBox="0 0 20 20" style="vertical-align:-2px;margin-left:2px"><g transform="rotate(${wMag} 10 10)" stroke="${col}" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M10 2.5 L10 16"/><path d="M10 16 L6 11.5"/><path d="M10 16 L14 11.5"/></g></svg>`
    : ((wspd||0) > 0 ? `<span style="color:${col};margin-left:2px">\u27f3</span>` : '');
  const wTitle = hasDir
    ? `${String(wMag).padStart(3,'0')}\u00b0 magnetic. Reported ${String(wdir).padStart(3,'0')}\u00b0 true by METAR and MADIS; ${MAGVAR}\u00b0 of easterly variation removed so it lines up with the magnetic runway numbers and with the AWOS broadcast.`
    : 'Direction variable.';
  return `<span title="${wTitle}" style="color:${col};font-weight:700;white-space:nowrap;cursor:help">${hasDir?String(wMag).padStart(3,'0')+'\u00b0M':'VRB'} ${wspd||0}${wgst?'G'+wgst:''}kt${arrow}</span>`;
}
function altimFromRaw(raw){
  const m = (raw||'').match(/\bA(\d{4})\b/);
  return m ? parseInt(m[1],10)/100 : null;
}
const RWYS = {PAHN:[80,260], PAGY:[20,200], PAGS:[110,290,20,200], PAOH:[60,240], PAJN:[80,260], PAFE:[110,290], PASI:[110,290], PAKW:[20,200], PAKT:[110,290], PAPG:[50,230], PAWG:[100,280], PAYA:[110,290,20,200]};
const RWY_DIMS = {PAJN:['8,457 x 150'], PAOH:['3,367 x 75'], PAGS:['6,720 x 150','3,010 x 60'], PAFE:['4,000 x 100'], PASI:['6,500 x 150'], PAKT:['7,500 x 150'], PAKW:['5,000 x 100'], PAPG:['6,400 x 150'], PAWG:['6,000 x 150'], PAYA:['7,745 x 150','5,500 x 150'], PAHN:[''], PAGY:['']};
const BUILD_TAG = 'b248-notamdecode';
/* ================= Crosswind / FRAT calculator =================
   Standalone what-if. Enter any wind against any station's runways and read the
   components. Same crosswind() the warnings use, so the two can never disagree.
   FRAT crosswind limit is 15 kt per the DO; tailwind ceiling comes from GLOBAL_LIMITS. */
const XW_LIMIT = 15;
function xwComponents(windDir, spd, rwyHdg, isTrue){
  const wMag = isTrue ? ((windDir - MAGVAR) + 360) % 360 : ((windDir % 360) + 360) % 360;
  const off = ((wMag - rwyHdg + 540) % 360) - 180;   // signed, -180..180
  const along = spd * Math.cos(off * Math.PI/180);   // positive is headwind
  return {
    off: Math.round(Math.abs(off)),
    hw: Math.round(along),
    xw: Math.abs(Math.round(spd * Math.sin(off * Math.PI/180))),
  };
}
function xwStatus(c){
  if(c.xw >= XW_LIMIT) return {cls:'over', txt:'OVER LIMIT, ' + c.xw + ' kt XW'};
  if(c.hw < 0 && Math.abs(c.hw) > GLOBAL_LIMITS.tailwindMax) return {cls:'appr', txt:'MGMT APPROVAL, ' + Math.abs(c.hw) + ' kt TW'};
  if(c.xw >= XW_LIMIT - 3) return {cls:'caution', txt:'within 3 kt of limit'};
  return {cls:'ok', txt:'OK'};
}
/* LIMITS.rwys and RWYS do not always agree: Gustavus lists 11/29 under limits but also has
   the 02/20 strip in RWYS, and leaving it out can flip the verdict. Evaluate every runway
   on file for the station. */
function xwRunways(icao){
  const a = (LIMITS[icao] && LIMITS[icao].rwys) || [];
  const b = RWYS[icao] || [];
  return [...new Set([...a, ...b])].sort((x,y)=>x-y);
}
function xwCalcRun(){
  const g = id => document.getElementById(id);
  const icao = g('xwSta').value;
  const dir = parseFloat(g('xwDir').value);
  const spd = parseFloat(g('xwSpd').value);
  const gst = parseFloat(g('xwGst').value);
  const isTrue = g('xwRef').value === 'true';
  const out = g('xwOut');
  if(!Number.isFinite(dir) || !Number.isFinite(spd)){
    out.innerHTML = '<div style="color:var(--mut);font-family:var(--mono);font-size:12px">Enter a wind direction and speed.</div>';
    return;
  }
  const rw = xwRunways(icao);
  if(!rw.length){
    out.innerHTML = '<div style="color:var(--mut);font-family:var(--mono);font-size:12px">No runway headings on file for this station.</div>';
    return;
  }
  const useGust = Number.isFinite(gst) && gst > spd;
  const eff = useGust ? gst : spd;
  const rows = rw.map(h => {
    const cS = xwComponents(dir, spd, h, isTrue);
    const cG = xwComponents(dir, eff, h, isTrue);
    const st = xwStatus(cG);
    const id = String(h/10).padStart(2,'0');
    const tw = cG.hw < 0;
    return `<tr>
      <td class="mono" style="font-weight:700;color:var(--ink)">RWY ${id}</td>
      <td class="mono">${String(h).padStart(3,'0')}\u00b0M</td>
      <td class="mono">${cG.off}\u00b0 off</td>
      <td class="mono" style="color:${tw?'var(--amber)':'var(--ink)'}">${tw?'TW '+Math.abs(cG.hw):'HW '+cG.hw} kt</td>
      <td class="mono" style="font-weight:700;color:${cG.xw>=XW_LIMIT?'var(--ifr)':(cG.xw>=XW_LIMIT-3?'var(--amber)':'var(--ink)')}">${cG.xw} kt${useGust&&cG.xw!==cS.xw?' <span style="color:var(--mut);font-weight:400">('+cS.xw+' steady)</span>':''}</td>
      <td><span class="pill ${st.cls}">${st.txt}</span></td>
    </tr>`;
  }).join('');
  const best = Math.min(...rw.map(h => xwComponents(dir, eff, h, isTrue).xw));
  const verdict = best >= XW_LIMIT
    ? `<span class="pill over">Every runway over the ${XW_LIMIT} kt limit</span>`
    : `<span class="pill ok">Best runway ${best} kt crosswind, inside the ${XW_LIMIT} kt limit</span>`;
  out.innerHTML = `<div style="margin:4px 0 8px">${verdict}</div>
    <table class="gridtbl"><thead><tr><th>Runway</th><th>Heading</th><th>Angle</th><th>Along</th><th>Crosswind</th><th>FRAT</th></tr></thead><tbody>${rows}</tbody></table>
    <div style="color:var(--mut);font-family:var(--mono);font-size:10.5px;margin-top:8px;line-height:1.5">
      Crosswind = wind speed \u00d7 sin(angle off runway). Computed on ${useGust?('the gust, '+eff+' kt'):('the steady wind, '+eff+' kt')}${useGust?', steady shown in brackets':''}.
      ${isTrue?('Wind entered as true and corrected '+MAGVAR+'\u00b0 for local variation, since runway headings are magnetic.'):'Wind entered as magnetic, no variation correction applied.'}
      Tailwind ceiling ${GLOBAL_LIMITS.tailwindMax} kt.
    </div>`;
}
function xwPrefill(){
  const icao = document.getElementById('xwSta').value;
  const w = (window.lastPer||{})[icao];
  const o = w && w.obs;
  if(!o || !Number.isFinite(o.wdir)){
    document.getElementById('xwNote').textContent = 'No current wind direction for that station.';
    return;
  }
  document.getElementById('xwDir').value = o.wdir;
  document.getElementById('xwSpd').value = o.wspd || 0;
  document.getElementById('xwGst').value = o.wgst || '';
  document.getElementById('xwRef').value = 'true';
  document.getElementById('xwNote').textContent = 'Loaded current observation.';
  xwCalcRun();
}
function openXwCalc(){
  const md = document.getElementById('modal');
  const opts = STATIONS.filter(st => xwRunways(st.icao).length)
    .map(st => `<option value="${st.icao}">${st.name} (${st.icao})</option>`).join('');
  const inp = 'style="font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"';
  md.innerHTML = `<h2>Crosswind calculator <button class="close" id="mClose">Close</button></h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px 14px;align-items:flex-end;margin-bottom:10px">
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut)">STATION<select id="xwSta" ${inp}>${opts}</select></label>
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut)">WIND DIR<input id="xwDir" type="number" min="0" max="360" step="10" placeholder="210" ${inp} size="5" style="width:80px;font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"></label>
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut)">SPEED KT<input id="xwSpd" type="number" min="0" step="1" placeholder="18" style="width:80px;font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"></label>
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut)">GUST KT<input id="xwGst" type="number" min="0" step="1" placeholder="opt" style="width:80px;font-family:var(--mono);font-size:13px;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:5px;padding:4px 7px"></label>
      <label style="display:flex;flex-direction:column;gap:3px;font-size:10.5px;color:var(--mut)">WIND REF<select id="xwRef" ${inp}><option value="true">true (METAR)</option><option value="mag">magnetic</option></select></label>
      <button id="xwNow" style="font-size:11px;padding:4px 10px">use current obs</button>
      <span id="xwNote" style="font-size:10.5px;color:var(--mut)"></span>
    </div>
    <div id="xwOut"></div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  document.getElementById('xwNow').addEventListener('click', xwPrefill);
  ['xwSta','xwDir','xwSpd','xwGst','xwRef'].forEach(k => {
    const el = document.getElementById(k);
    el.addEventListener('input', xwCalcRun);
    el.addEventListener('change', xwCalcRun);
  });
  xwPrefill();
  if(!document.getElementById('xwDir').value) xwCalcRun();
}
/* Full-width strip above the graph columns, one line per runway pair laid out across the
   width. It used to be a tall box stacked under the wind rose, which made the left column
   overshoot the other two and left a dead area beside it. */
let RWY_HELP = true;
try{ RWY_HELP = localStorage.getItem('wxb_rwyhelp') !== '0'; }catch(err){}
function toggleRwyHelp(){
  RWY_HELP = !RWY_HELP;
  try{ localStorage.setItem('wxb_rwyhelp', RWY_HELP ? '1' : '0'); }catch(err){}
  if(window.lastPer) renderMaster(window.lastPer);
}
/* Horizontal runway strip, numbers on both ends, centreline dashes, wind arrow drawn at its
   angle relative to the pavement. One viewBox, so passing a bigger width scales the whole
   thing up including the numbers. fav is 'A', 'B' or null. */
function rwyStripSVG(idA, idB, fav, rel, eff, hasDir, W, H, cls, title){
  const arrow = hasDir
    ? `<g transform="rotate(${(rel+90)%360} 48 11)" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" fill="none">
        <path d="M48 1.5 L48 20.5"/><path d="M48 20.5 L44.8 16.5"/><path d="M48 20.5 L51.2 16.5"/>
      </g>`
    : (eff > 0 ? `<circle cx="48" cy="11" r="4.5" stroke="var(--amber)" stroke-width="1.8" fill="none"/>`
               : `<circle cx="48" cy="11" r="2" fill="#5c7288"/>`);
  return `<svg class="${cls||'rwyline'}" width="${W}" height="${H}" viewBox="0 0 96 22" style="vertical-align:-5px;flex:none">
      ${title ? `<title>${title}</title>` : ''}
      <text x="10" y="15" text-anchor="middle" font-size="10.5" font-family="Barlow Condensed" font-weight="800" fill="${fav==='A'?'var(--amber)':'#8296aa'}">${idA}</text>
      <line x1="22" y1="11" x2="74" y2="11" stroke="#4a5f76" stroke-width="9.5" stroke-linecap="round"/>
      <line x1="27" y1="11" x2="33" y2="11" stroke="#0d141c" stroke-width="2"/>
      <line x1="39" y1="11" x2="45" y2="11" stroke="#0d141c" stroke-width="2"/>
      <line x1="51" y1="11" x2="57" y2="11" stroke="#0d141c" stroke-width="2"/>
      <line x1="63" y1="11" x2="69" y2="11" stroke="#0d141c" stroke-width="2"/>
      ${arrow}
      <text x="86" y="15" text-anchor="middle" font-size="10.5" font-family="Barlow Condensed" font-weight="800" fill="${fav==='B'?'var(--amber)':'#8296aa'}">${idB}</text>
    </svg>`;
}
function runwayBoxHTML(icao){
  try{
  const rw = RWYS[icao];
  if(!rw) return '';
  const w2 = (window.lastPer||{})[icao];
  const o = w2 && w2.obs;
  const pairs = [];
  for(let i=0;i<rw.length;i+=2) pairs.push([rw[i], rw[i+1]]);
  const dims = RWY_DIMS[icao] || [];
  const live = o && Number.isFinite(o.wdir) && (o.wspd || o.wgst);
  const eff = live ? Math.max(o.wspd||0, o.wgst||0) : 0;
  const wMag = live ? ((o.wdir - MAGVAR) + 360) % 360 : null;

  const ents = pairs.map((pr, pi)=>{
    const idA = String(pr[0]/10).padStart(2,'0'), idB = String(pr[1]/10).padStart(2,'0');
    const dim = dims[pi] ? `<span class="rwystrip">${dims[pi]}</span>` : '';
    let comp = '<span style="color:var(--mut)">calm</span>';
    let favEnd = null;
    if(live){
      const dA = (wMag - pr[0] + 540) % 360 - 180;
      const hwA = eff * Math.cos(dA*Math.PI/180);
      const fav = hwA >= 0 ? pr[0] : pr[1];
      const other = fav === pr[0] ? pr[1] : pr[0];
      const hw = Math.round(Math.abs(hwA));
      const xw = Math.abs(Math.round(eff * Math.sin(dA*Math.PI/180)));
      const xwCol = xw >= XW_LIMIT ? 'var(--ifr)' : (xw >= XW_LIMIT-3 ? 'var(--amber)' : 'var(--mut)');
      const twCol = hw > GLOBAL_LIMITS.tailwindMax ? 'var(--ifr)' : 'var(--amber)';
      favEnd = fav;
      comp = `land <b>R${String(fav/10).padStart(2,'0')}</b> \u00b7 HW ${hw} \u00b7 <span style="color:${xwCol};font-weight:${xw>=XW_LIMIT-3?'700':'400'}">XW ${xw}</span> <span style="color:${twCol};font-size:10.5px">(R${String(other/10).padStart(2,'0')} gives TW ${hw})</span>`;
    }
    const relB = live ? ((wMag - pr[0]) + 360) % 360 : 0;
    const favSide = favEnd === null ? null : (favEnd === pr[0] ? 'A' : 'B');
    const tTitle = live ? `Wind ${String(o.wdir).padStart(3,'0')}\u00b0 true = ${String(wMag).padStart(3,'0')}\u00b0 magnetic. Runway numbers are magnetic, METAR wind is true, so ${MAGVAR}\u00b0 of easterly variation comes off first.` : '';
    return `<span class="rwyent">${rwyStripSVG(idA, idB, favSide, relB, eff, live, 136, 31, 'rwybig', tTitle)}${dim}<span class="rwycomp">${comp}</span></span>`;
  }).join('');

  const legend = RWY_HELP ? `<div class="rwylegend">land = the end the wind favours, the one giving a headwind \u00b7 HW / XW = headwind and crosswind components in knots \u00b7 TW = the tailwind you would get by using the other end instead \u00b7 the strip shows both ends with the favoured one in amber, and the amber arrow crosses it at the wind's angle to the pavement \u00b7 computed on the higher of wind or gust${live?' ('+eff+' kt)':''}, wind shown in magnetic (${MAGVAR}\u00b0 taken off the true value METAR and MADIS report) so it matches the runway numbers \u00b7 crosswind goes amber within 3 kt of the ${XW_LIMIT} kt FRAT limit and red at or over it</div>` : '';
  const tog = `<span class="rwyhelp" onclick="event.stopPropagation();toggleRwyHelp()">${RWY_HELP?'hide help':'what is this?'}</span>`;
  return `<span class="wxbox rwybox"><h4>RUNWAY${pairs.length>1?'S':''} \u00b7 wind components ${tog}</h4><span class="rwygrid">${ents}</span>${legend}</span>`;
  }catch(err){
    return `<span class="wxbox rwybox"><h4>RUNWAY</h4><div style="color:var(--ifr);font-family:var(--mono);font-size:11px">runway box error: ${String(err.message||err).slice(0,80)}</div></span>`;
  }
}
function windCompHTML(icao, wdir, wspd, wgst){
  const rw = RWYS[icao];
  if(!rw) return null;
  const eff = Math.max(wspd||0, wgst||0);
  const hasDir = Number.isFinite(wdir) && eff > 0;
  let best = {a:rw[0], b:rw[1], fav:null, hw:null, xw:null, rel:null};
  if(hasDir){
    const wMag = ((wdir - MAGVAR) + 360) % 360;
    best = null;
    for(let i=0;i<rw.length;i+=2){
      const pr = [rw[i], rw[i+1]];
      const dA = (wMag - pr[0] + 540) % 360 - 180;
      const hwA = eff * Math.cos(dA*Math.PI/180);
      const fav = hwA >= 0 ? pr[0] : pr[1];
      const hw = Math.round(Math.abs(hwA));
      const xw = Math.abs(Math.round(eff * Math.sin(dA*Math.PI/180)));
      if(!best || hw > best.hw) best = {a:pr[0], b:pr[1], fav, hw, xw, rel:((wMag - pr[0]) + 360) % 360};
    }
  }
  const xwCol = best.xw !== null && best.xw >= XW_LIMIT ? 'var(--ifr)' : (best.xw !== null && best.xw >= XW_LIMIT-3 ? 'var(--amber)' : '#9db2c6');
  const idA = String(best.a/10).padStart(2,'0'), idB = String(best.b/10).padStart(2,'0');
  /* Same oriented thumbnail as the expanded runway strip, so the pavement in the row line
     lies at its real compass angle too. The flat 96px strip it replaces could show both end
     numbers, which no longer fit; the favoured end is the one that matters in a one-liner,
     and the full pair is a click away in the runway strip. */
  let stripTitle = '';
  if(hasDir){
    const wMagT = ((wdir - MAGVAR) + 360) % 360;
    const offT = Math.abs(((wMagT - best.fav + 540) % 360) - 180);
    stripTitle = `Wind ${String(wMagT).padStart(3,'0')}\u00b0 magnetic, ${offT}\u00b0 off RWY ${String(best.fav/10).padStart(2,'0')}. Reported ${String(wdir).padStart(3,'0')}\u00b0 true by METAR and MADIS; ${MAGVAR}\u00b0 of easterly variation removed. The arrow shows the wind's angle across the pavement, not a compass bearing.`;
  }
  const icon = rwyStripSVG(idA, idB, hasDir ? (best.fav === best.a ? 'A' : 'B') : null, best.rel, eff, hasDir, 96, 22, null, stripTitle);
  const tail = hasDir
    ? `HW${best.hw} <span style="color:${xwCol};font-weight:${best.xw>=XW_LIMIT-3?'700':'400'}">XW${best.xw}</span>`
    : (eff > 0 ? `VRB ${eff}kt` : 'calm');
  return `<span style="display:inline-flex;align-items:center;gap:4px;white-space:nowrap">
    ${icon}
    <span style="font-family:var(--mono);font-size:11px;color:#9db2c6">${tail}</span>
  </span>`;
}
function presTrendHTML(icao, curInHg){
  if(curInHg===null || curInHg===undefined) return null;
  const pts = seriesFor(icao).filter(p=>p.pres!==null);
  if(pts.length < 2) return null;
  const target = Date.now() - 3*3600000;
  let then = null, bd = Infinity;
  pts.forEach(p=>{ const d = Math.abs(p.t - target); if(d < bd){ bd = d; then = p; } });
  if(!then || bd > 90*60000) return null;
  const delta = Math.round((curInHg - then.pres)*100)/100;
  if(Math.abs(delta) < 0.01) return `<span style="color:var(--mut)">\u2192 steady</span>`;
  const col = delta <= -0.06 ? 'var(--ifr)' : delta <= -0.03 ? 'var(--amber)' : 'var(--mut)';
  return `<span style="color:${col};font-weight:${delta<=-0.03?'700':'400'}">${delta<0?'\u25bc':'\u25b2'}${Math.abs(delta).toFixed(2)}/3h</span>`;
}
function densAltHTML(icao, o){
  const st = STATIONS.find(x=>x.icao===icao);
  if(!st || st.elev===undefined || !o || o.temp===null || o.temp===undefined) return '';
  const inHg = (o.alti!==null && o.alti!==undefined) ? o.alti : altimFromRaw(o.raw);
  if(inHg===null) return '';
  const pa = st.elev + (29.92 - inHg)*1000;
  const isa = 15 - 0.00198*st.elev;
  const da = Math.round(pa + 120*(o.temp - isa));
  const delta = da - st.elev;
  const col = delta > 2000 ? 'var(--amber)' : 'var(--mut)';
  return `<span style="color:${col}">A${(inHg).toFixed(2)} \u00b7 ${Math.round(inHg*33.8639)} mb \u00b7 DA ${da.toLocaleString()} ft, ${Math.abs(delta).toLocaleString()} ${delta>=0?'above':'below'} field</span>`;
}
function wxHTML(toks){
  return (toks||[]).map(t=>{
    const conv = t.includes('TS')||t==='CB'||t==='TCU';
    return `<span style="color:${conv?'var(--ifr)':'var(--amber)'};font-weight:700">${t}</span>`;
  }).join(' ');
}

/* ================= SUN / CIVIL TWILIGHT (Juneau) ================= */
function sunAt(lat, lon, date, zenith){
  const rad = Math.PI/180;
  const day = Math.floor((date - new Date(Date.UTC(date.getUTCFullYear(),0,0)))/86400000);
  const g = 2*Math.PI/365*(day-1+(date.getUTCHours()-12)/24);
  const eq = 229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
  const decl = 0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
  const haArg = Math.cos(zenith*rad)/(Math.cos(lat*rad)*Math.cos(decl))-Math.tan(lat*rad)*Math.tan(decl);
  if(haArg < -1 || haArg > 1) return null;
  const ha = Math.acos(haArg)/rad;
  const base = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return {rise:new Date(base + (720 - 4*(lon + ha) - eq)*60000), set:new Date(base + (720 - 4*(lon - ha) - eq)*60000)};
}
function localMins(d){
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Juneau',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(d);
  const g = t=>parseInt(parts.find(p=>p.type===t).value,10);
  return (g('hour')%24)*60 + g('minute');
}
function renderSun(){
  const jnu = STATIONS.find(s=>s.icao==='PAJN');
  const now = new Date();
  const off = sunAt(jnu.lat, jnu.lon, now, 90.833);
  const civ = sunAt(jnu.lat, jnu.lon, now, 96);
  const el = document.getElementById('suntrack');
  if(!off || !civ){ el.innerHTML=''; return; }
  const W=1000, H=92, pad=6, bandY=30, bandH=20;
  const x = m => pad + (W-2*pad)*m/1440;
  const cd=localMins(civ.rise), sr=localMins(off.rise), ss=localMins(off.set), ck=localMins(civ.set), nm=localMins(now);
  const isDay = nm>=sr && nm<=ss, isTwi = !isDay && nm>=cd && nm<=ck;
  const band=(a,b,fill)=>`<rect x="${x(a)}" y="${bandY}" width="${Math.max(x(b)-x(a),0)}" height="${bandH}" fill="${fill}"/>`;
  const lbl=(m,txt,above)=>`<text x="${Math.min(Math.max(x(m),above?150:40),W-40)}" y="${above?14:26}" text-anchor="middle" font-size="10.5" fill="var(--mut)" font-family="IBM Plex Mono">${txt}</text>`;
  el.innerHTML = `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="display:block">
    <defs>
      <linearGradient id="sgDay" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#245a86"/><stop offset="50%" stop-color="#4d94c9"/><stop offset="100%" stop-color="#245a86"/></linearGradient>
      <linearGradient id="sgTwiL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#141a24"/><stop offset="100%" stop-color="#8a5a1e"/></linearGradient>
      <linearGradient id="sgTwiR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8a5a1e"/><stop offset="100%" stop-color="#141a24"/></linearGradient>
      <clipPath id="sgClip"><rect x="${pad}" y="${bandY}" width="${W-2*pad}" height="${bandH}" rx="${bandH/2}"/></clipPath>
      <filter id="sgGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g clip-path="url(#sgClip)">
      <rect x="${pad}" y="${bandY}" width="${W-2*pad}" height="${bandH}" fill="#0c1119"/>
      ${band(cd,sr,'url(#sgTwiL)')}${band(sr,ss,'url(#sgDay)')}${band(ss,ck,'url(#sgTwiR)')}
    </g>
    ${(function(){
      /* Ticks across the whole 24 hours: full height on the hour, short on the half. */
      let t = '';
      for(let m = 0; m <= 1440; m += 30){
        const hour = m % 60 === 0, X = x(m);
        t += `<line x1="${X.toFixed(1)}" y1="${bandY + bandH + 3}" x2="${X.toFixed(1)}" y2="${bandY + bandH + (hour ? 9 : 5)}" stroke="${hour ? '#3c536b' : '#26364a'}" stroke-width="1"/>`;
        if(hour && m % 120 === 0 && m < 1440)
          t += `<text x="${X.toFixed(1)}" y="${bandY + bandH + 21}" text-anchor="middle" font-size="9.5" fill="#5d7186" font-family="IBM Plex Mono">${String(m/60).padStart(2,'0')}L</text>`;
      }
      return t;
    })()}
    <rect x="${pad}" y="${bandY - 3}" width="${W - 2*pad}" height="${bandH + 6}" rx="6"
      fill="none" stroke="#7ec8f0" stroke-width="1.4" opacity=".8"/>
    <circle cx="${x(nm)}" cy="${bandY+bandH/2}" r="6" fill="${isDay?'#ffd76a':isTwi?'#f2a93b':'#9fb2c4'}" filter="url(#sgGlow)"/>
    ${lbl(cd,'civil '+fmtLZ(civ.rise),true)}${lbl(sr,'\u2600 '+fmtLZ(off.rise),false)}${lbl(ss,'\u2600 '+fmtLZ(off.set),false)}${lbl(ck,'civil '+fmtLZ(civ.set),true)}
    ${(function(){
      /* On its own row under the hour scale, on a filled pill. It used to sit above the band
         where it collided with the hour labels and the daylight caption. */
      const cx = Math.min(Math.max(x(nm), 34), W - 34), y = H - 9, txt = fmtLZ(now);
      const w = Math.max(38, txt.length * 7 + 12);
      return `<line x1="${x(nm)}" y1="${bandY - 3}" x2="${x(nm)}" y2="${y - 11}" stroke="var(--amber)" stroke-width="1" opacity=".5"/>
        <rect x="${(cx - w/2).toFixed(1)}" y="${y - 11}" width="${w}" height="15" rx="7.5" fill="#2a1d08" stroke="var(--amber)" stroke-width="1"/>
        <text x="${cx.toFixed(1)}" y="${y}" text-anchor="middle" font-size="10.5" fill="var(--amber)" font-family="IBM Plex Mono" font-weight="700">${txt}</text>`;
    })()}
    <text x="8" y="14" font-size="10" fill="#7ec8f0" font-family="IBM Plex Mono">${(function(){
      const d = ss - sr, h = Math.floor(d/60), mm = Math.round(d%60);
      return h + 'h ' + String(mm).padStart(2,'0') + 'm of daylight';
    })()}</text>
    <text x="${W-8}" y="${bandY+bandH/2+4}" text-anchor="end" font-size="11.5" fill="#ffd76a" font-family="IBM Plex Mono" font-weight="700">${(function(){
      const mLeft = m2 => { const h = Math.floor(m2/60), mm = Math.round(m2%60); return (h?h+'h ':'')+mm+'m'; };
      if(nm < sr) return 'sunrise in ' + mLeft(sr-nm);
      if(nm <= ss) return mLeft(ss-nm) + ' of daylight left';
      if(nm <= ck) return 'civil ends in ' + mLeft(ck-nm);
      return 'night';
    })()}</text>
  </svg>`;
}

/* ================= MASTER STATION TABLE ================= */
/* ---- TAF freshness and what is in force right now ----
   A TAF quietly replacing itself is easy to miss, and a TEMPO that has just appeared is
   exactly the thing a dispatcher needs to notice. The raw text of each TAF is remembered
   between loads, so a genuine amendment can be distinguished from the same forecast being
   re-fetched, and the change is announced for an hour afterwards. */
const TAF_NEW_MS = 60 * 60000;
function tafSeen(){
  if(!state.tafSeen){
    try{ state.tafSeen = JSON.parse(localStorage.getItem('wxb_tafseen') || '{}') || {}; }
    catch(e){ state.tafSeen = {}; }
  }
  return state.tafSeen;
}
function noteTafChanges(){
  const seen = tafSeen();
  let dirty = false;
  STATIONS.forEach(st=>{
    const t = state.tafs[st.icao];
    if(!t || !t.rawTAF) return;
    const prev = seen[st.icao];
    if(!prev || prev.raw !== t.rawTAF){
      /* First sight of a station is not an amendment, so it is recorded without announcing. */
      seen[st.icao] = {raw:t.rawTAF, at: prev ? Date.now() : 0, issue:t.issueTime || null};
      dirty = true;
    }
  });
  if(dirty){ try{ localStorage.setItem('wxb_tafseen', JSON.stringify(seen)); }catch(e){} }
}
/* The forecast that is actually being broadcast right now, on the collapsed row rather than
   only inside the expanded window. Kept to visibility and the controlling layer so it costs
   one short chip, and a TEMPO gets its own chip beside the base period rather than replacing
   it, because both are in force at the same time. */
/* Three ways to read a row: one dense line, one roomy line that may wrap, or a stacked block
   with the identity, the flying numbers and the pressure each on their own line. Stacked is
   the same layout the phone uses, which was already the easiest of the three to read. */
const ROW_MODES = ['roomy','stacked','compact'];
function rowDensity(){
  if(state.rowMode === undefined){
    try{ state.rowMode = localStorage.getItem('wxb_rows') || 'roomy'; }catch(e){ state.rowMode = 'roomy'; }
    if(state.rowMode === 'true') state.rowMode = 'compact';        // older stored value
    if(!ROW_MODES.includes(state.rowMode)) state.rowMode = 'roomy';
  }
  return state.rowMode;
}
function applyRowDensity(){
  const m = rowDensity();
  document.body.classList.toggle('compactrows', m === 'compact');
  // narrow screens keep their own three-line layout regardless of this choice
  const narrow = window.innerWidth <= 1100;
  document.body.classList.toggle('tri', m === 'stacked' || (narrow && phoneMode() === 'tri'));
  const b = document.getElementById('rowsBtn');
  if(b) b.textContent = 'rows: ' + m;
  try{ fitKiosk(); }catch(e){}
}
function setRowDensity(mode){
  state.rowMode = ROW_MODES.includes(mode) ? mode : 'roomy';
  try{ localStorage.setItem('wxb_rows', state.rowMode); }catch(e){}
  applyRowDensity();
  if(window.lastPer) renderMaster(window.lastPer);
}
/* A decoded TAF for the hover. The raw text is unreadable at a glance and the point of a
   tooltip is to save the reader work, so each period is written out in words with its own
   window, and the one in force right now is marked. */
/* ================= LAMP (Localized Aviation MOS Program) =================
   Statistical guidance re-anchored to the latest observations every hour, out to 38 hours.
   It is the only per-airport forecast available at the fields with no TAF, which for us is
   Kake, Angoon and Hoonah. It is GUIDANCE, not a terminal forecast: the board labels it as
   such and never treats it as a legal forecast source.

   The bulletin is fixed width. After a six-character label each hour occupies three columns,
   which also survives the runs of 999 that appear where an element stops being forecast. */
const LAMP_CIG = [null, 'below 200 ft', '200 to 400 ft', '500 to 900 ft', '1,000 to 1,900 ft',
  '2,000 to 3,000 ft', '3,100 to 6,500 ft', '6,600 to 12,000 ft', 'above 12,000 ft or clear'];
const LAMP_CIG_FT = [null, 100, 300, 700, 1500, 2500, 4800, 9300, 20000];   // midpoints, for the category
const LAMP_VIS = [null, 'below 1/2 sm', '1/2 to 1 sm', '1 to 2 sm', '2 to 3 sm', '3 to 5 sm', '6 sm', 'more than 6 sm'];
const LAMP_VIS_SM = [null, 0.25, 0.75, 1.5, 2.5, 4, 6, 10];
const LAMP_CLD = {CL:'clear', FW:'few', SC:'scattered', BK:'broken', OV:'overcast'};
const LAMP_OBV = {N:'', BR:'mist', FG:'fog', HZ:'haze', BL:'blowing snow'};

function parseLAMP(text){
  const lines = String(text||'').replace(/\r/g,'').split('\n');
  const head = lines.find(l=>/GFS\s+LAMP/i.test(l));
  if(!head) throw new Error('That does not look like a LAMP bulletin. Expect a line containing "GFS LAMP".');
  const hm = head.match(/^\s*([A-Z0-9]{3,4})\s+(.*?)\s+GFS\s+LAMP\s+(\d{4})\s*UTC\s+(\d{1,2}\/\d{1,2}\/\d{4})/i);
  const station = hm ? hm[1].toUpperCase() : '';
  const row = tag => {
    const l = lines.find(x=>new RegExp('^\\s*' + tag + '\\s').test(x));
    if(!l) return null;
    const out = [];
    for(let i = 6; i < l.length; i += 3) out.push(l.slice(i, i+3).trim());
    return out;
  };
  const utc = row('UTC'), tmp = row('TMP'), dpt = row('DPT'), wdr = row('WDR'), wsp = row('WSP'),
        wgs = row('WGS'), cld = row('CLD'), cig = row('CIG'), vis = row('VIS'),
        cvs = row('CVS'), obv = row('OBV');
  if(!utc || !cig || !vis) throw new Error('LAMP bulletin missing the UTC, CIG or VIS rows.');

  /* The bulletin gives the hour but not the date, so walk forward from the issue time and
     roll the day whenever the clock wraps. */
  const now = new Date();
  let cursor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
  const first = parseInt(utc[0], 10);
  if(Number.isFinite(first)){
    while(cursor.getUTCHours() !== first) cursor = new Date(cursor.getTime() + 3600000);
  }
  const num = v => { const n = parseInt(v, 10); return Number.isFinite(n) && n < 999 ? n : null; };

  const hours = utc.map((u, i) => {
    const at = new Date(cursor.getTime() + i*3600000);
    const c = num(cig[i]), v = num(vis[i]);
    return {
      at: at.getTime(),
      tempF: num(tmp && tmp[i]), dewpF: num(dpt && dpt[i]),
      wdir: (()=>{ const d = num(wdr && wdr[i]); return d === null ? null : d * 10; })(),
      wspd: num(wsp && wsp[i]),
      wgst: (wgs && wgs[i] && wgs[i] !== 'NG') ? num(wgs[i]) : null,
      cld: (cld && LAMP_CLD[cld[i]]) || null,
      cigCat: c, cigTxt: c ? LAMP_CIG[c] : null, cigFt: c ? LAMP_CIG_FT[c] : null,
      visCat: v, visTxt: v ? LAMP_VIS[v] : null, visSm: v ? LAMP_VIS_SM[v] : null,
      cvsCat: num(cvs && cvs[i]),
      obv: (obv && LAMP_OBV[obv[i]]) || '',
      cat: (c && v) ? flightCat(LAMP_CIG_FT[c], LAMP_VIS_SM[v]) : 'NA',
    };
  }).filter(h=>h.cigCat !== null || h.visCat !== null);

  return {station, issued: hm ? hm[3] : null, at: Date.now(), hours};
}
function lampNow(icao){
  const L = (state.lamp || {})[icao];
  if(!L || !L.hours.length) return null;
  const t = Date.now();
  return L.hours.find(h=>h.at <= t && t < h.at + 3600000) || L.hours[0];
}
/* The next few hours matter more than the next 38, so the hover carries the run-out and the
   row carries only what is happening now plus the first deterioration ahead. */
function lampWorsening(icao){
  const L = (state.lamp || {})[icao];
  const now = lampNow(icao);
  if(!L || !now) return null;
  const rank = {LIFR:0, IFR:1, MVFR:2, VFR:3, NA:4};
  return L.hours.find(h=>h.at > Date.now() && h.at < Date.now() + 12*3600000
    && (rank[h.cat] ?? 4) < (rank[now.cat] ?? 4)) || null;
}
function lampHoverText(icao){
  const L = (state.lamp || {})[icao];
  if(!L) return '';
  const lines = [`${icao} LAMP guidance, issued ${L.issued || 'unknown'} UTC`,
    'Statistical guidance updated hourly against the latest observation. Not a TAF and not a legal forecast source.', ''];
  L.hours.slice(0, 14).forEach(h=>{
    const bits = [h.cat];
    if(h.cigTxt) bits.push('ceiling ' + h.cigTxt);
    if(h.visTxt) bits.push('visibility ' + h.visTxt);
    if(h.cld) bits.push(h.cld);
    if(h.obv) bits.push(h.obv);
    if(h.wspd !== null) bits.push(`wind ${h.wdir === null ? 'variable' : String(h.wdir).padStart(3,'0') + '\u00b0'} at ${h.wspd} kt`);
    if(h.tempF !== null) bits.push(`${h.tempF}\u00b0F`);
    lines.push(`${fmtLZ(h.at/1000)}  ${bits.join(', ')}`);
  });
  return lines.join('\n');
}
function lampChip(icao, onlyIfDisagrees){
  const n = lampNow(icao);
  if(!n) return '';
  if(onlyIfDisagrees){
    /* Compare against the forecast period actually in force, not the observation, since the
       question is whether the two forecasts tell the same story. */
    const tn = tafNow(icao);
    const f = tn && (tn.overlays[0] || tn.base);
    if(!f) return '';
    const tafCat = flightCat(ceilingOf(f.clouds, f.vertVis), parseVis(f.visib));
    const rank = {LIFR:0, IFR:1, MVFR:2, VFR:3, NA:4};
    if((rank[n.cat] ?? 4) >= (rank[tafCat] ?? 4)) return '';   // agrees, or LAMP is the rosier one
  }
  const worse = lampWorsening(icao);
  const bits = [];
  if(n.visTxt) bits.push(n.visSm >= 7 ? '6+sm' : visTxt(n.visSm) + 'sm');
  if(n.cigCat) bits.push(n.cigCat >= 8 ? 'no ceiling' : Math.round(n.cigFt).toLocaleString() + 'ft');
  if(n.obv) bits.push(n.obv);
  const drop = worse ? ` <span style="color:var(--amber)">\u2193 ${worse.cat} by ${fmtLZ(worse.at/1000)}</span>` : '';
  return `<span class="feed lampsrc" title="${esc((onlyIfDisagrees ? 'LAMP guidance is worse than the TAF in force. Both are shown so the disagreement is visible.\n\n' : '') + lampHoverText(icao))}">`
    + `<b style="color:#b07fd6">LAMP</b> <span style="color:var(--mut)">${onlyIfDisagrees ? 'disagrees:' : 'guidance:'}</span> `
    + `<span style="color:${catClr(n.cat)}">${n.cat}</span> ${bits.join(' ')}${drop}</span>`;
}
function openLampPaste(){
  const md = document.getElementById('modal');
  md.innerHTML = `<h2>Paste LAMP <button class="close" id="mClose">Close</button></h2>
    <div style="font-size:12px;line-height:1.6;margin-bottom:8px">
      Open <a href="https://lamp.mdl.nws.noaa.gov/lamp/statebull.php" target="_blank" class="camlink">LAMP text by state \u2197</a>,
      choose <b>AK</b>, then paste one or more station bulletins below. Guidance only, not a terminal forecast.
    </div>
    <textarea id="lampBox" spellcheck="false" style="width:100%;min-height:200px;font-family:var(--mono);font-size:10.5px;white-space:pre;background:#0a0f14;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:9px"></textarea>
    <div style="display:flex;gap:9px;align-items:center;margin-top:9px">
      <button id="lampGo" style="font-size:11px;padding:4px 12px">load</button>
      <span id="lampMsg" style="font-size:11px;color:var(--mut)"></span>
    </div>`;
  md.style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  document.getElementById('lampGo').addEventListener('click', ()=>{
    const msg = document.getElementById('lampMsg');
    const txt = document.getElementById('lampBox').value;
    // one paste may hold several stations, so split on each bulletin header
    const chunks = txt.split(/\n(?=\s*[A-Z0-9]{3,4}\s+\S.*GFS\s+LAMP)/i).filter(x=>/GFS\s+LAMP/i.test(x));
    state.lamp = state.lamp || {};
    let ok = 0, bad = [];
    (chunks.length ? chunks : [txt]).forEach(c=>{
      try{
        const L = parseLAMP(c);
        const icao = NOTAM_FAC_MAP[L.station] || L.station;
        state.lamp[icao] = L; ok++;
      }catch(e){ bad.push(e.message.slice(0,50)); }
    });
    try{ localStorage.setItem('wxb_lamp', JSON.stringify({at:Date.now(), lamp:state.lamp})); }catch(e){}
    if(window.lastPer) renderMaster(window.lastPer);
    msg.innerHTML = ok ? `<span style="color:var(--vfr)">Loaded ${ok} station${ok>1?'s':''}.</span>`
      : `<span style="color:var(--ifr)">${esc(bad[0] || 'nothing parsed')}</span>`;
  });
}
function loadLampStored(){
  try{
    const j = JSON.parse(localStorage.getItem('wxb_lamp') || 'null');
    // guidance older than six hours is worse than none
    if(j && j.lamp && Date.now() - j.at < 6*3600000) state.lamp = j.lamp;
  }catch(e){}
}
function tafHoverText(icao){
  const t = state.tafs[icao];
  if(!t) return '';
  const lines = [];
  lines.push(`${icao} terminal forecast`);
  if(t.issueTime) lines.push(`Issued ${fmtLZ(t.issueTime)}, valid ${fmtLZ(t.validTimeFrom)} to ${fmtLZ(t.validTimeTo)}`);
  const nowS = Date.now()/1000;
  (t.fcsts||[]).forEach(f=>{
    const live = f.timeFrom <= nowS && nowS <= f.timeTo;
    const label = f.fcstChange || 'From issue';
    const bits = [];
    if(f.wdir !== null && f.wdir !== undefined)
      bits.push(`wind ${f.wdir === 0 && !f.wspd ? 'calm' : String(f.wdir).padStart(3,'0') + '\u00b0 at ' + (f.wspd||0) + ' kt' + (f.wgst ? ', gusting ' + f.wgst : '')}`);
    if(f.visib !== null && f.visib !== undefined && f.visib !== '')
      bits.push(`visibility ${visTxt(f.visib)} sm`);
    if(f.wxString) bits.push(String(f.wxString).split(/\s+/).map(x=>wxWord(x)).join(', '));
    const cig = ceilingOf(f.clouds, f.vertVis);
    if((f.clouds||[]).length) bits.push((f.clouds||[]).map(c=>
      `${String(c.cover||'').toUpperCase()} at ${(c.base||0).toLocaleString()} ft`).join(', '));
    else if(cig === null) bits.push('sky clear');
    if(cig !== null) bits.push(`ceiling ${cig.toLocaleString()} ft`);
    lines.push(`${live ? '\u2192 ' : '  '}${label} ${fmtLZ(f.timeFrom)}\u2013${fmtLZ(f.timeTo)}${f.probability ? ' (' + f.probability + '% probability)' : ''}: ${bits.join(', ') || 'no change stated'}`);
  });
  const raw = String(t.rawTAF || '').replace(/\s+/g,' ').trim();
  if(raw) lines.push('', raw);
  return lines.join('\n');
}
function tafNowChip(icao){
  const t = state.tafs[icao];
  if(!t || !(t.fcsts||[]).length)
    return '<span class="cutchip tafnone" title="No TAF is issued for this airport. The nearest forecast is at the next TAF station along the route.">no TAF</span>';
  const n = tafNow(icao);
  if(!n) return '<span class="cutchip tafnone" title="A TAF is on file but no period covers this moment, which usually means it has run out. Open the station to see the periods.">TAF gap</span>';
  const short = f => {
    const bits = [];
    if(f.visib !== null && f.visib !== undefined && f.visib !== '' && visTxt(f.visib) !== '?')
      bits.push(visTxt(f.visib) + 'sm');
    const cig = ceilingOf(f.clouds, f.vertVis);
    if(cig !== null) bits.push(cigTxtShort(f.clouds, f.vertVis, cig));
    else if(!(f.clouds||[]).length) bits.push('CLR');
    if(f.wgst) bits.push((f.wspd||0) + 'G' + f.wgst);
    return bits.join(' ') || 'no change';
  };
  const out = [];
  if(n.base){
    out.push(`<span class="cutchip tafnow" title="${esc('Forecast in force now. ' + (n.base.fcstChange || 'Initial') + ' group.')}">TAF ${fmtLZ(n.base.timeFrom)}\u2013${fmtLZ(n.base.timeTo)} ${short(n.base)}</span>`);
  }
  n.overlays.forEach(f=>{
    const lbl = (f.fcstChange || 'TEMPO') + (f.probability ? f.probability : '');
    out.push(`<span class="cutchip tafnowtempo" title="${esc(lbl + ' in force now. This overlays the period beside it rather than replacing it.')}">${esc(lbl)} ${fmtLZ(f.timeFrom)}\u2013${fmtLZ(f.timeTo)} ${short(f)}</span>`);
  });
  return out.join('');
}
/* Shortest honest way to write the controlling layer: cover plus hundreds of feet. */
function cigTxtShort(clouds, vertVis, cig){
  const vv = vvFeet(vertVis);
  if(vv !== null && (cig === null || vv <= cig)) return 'VV' + String(Math.round(vv/100)).padStart(3,'0');
  const lay = (clouds||[]).filter(c=>/BKN|OVC/i.test(c.cover||''))
    .sort((a,b)=>(a.base||0)-(b.base||0))[0];
  if(!lay) return cig.toLocaleString() + 'ft';
  return String(lay.cover).toUpperCase() + String(Math.round((lay.base||0)/100)).padStart(3,'0');
}
function tafUpdChip(icao){
  const rec = tafSeen()[icao];
  if(!rec || !rec.at) return '';
  const age = Date.now() - rec.at;
  if(age > TAF_NEW_MS) return '';
  const t = state.tafs[icao];
  const amd = t && /\bTAF (AMD|COR)\b/.test(String(t.rawTAF||''));
  return `<span class="cutchip tafupd" title="${esc('The TAF text changed at ' + fmtLZ(rec.at) + '. Issued ' + (t && t.issueTime ? fmtLZ(t.issueTime) : 'unknown') + '. Open the station to compare the periods.')}">${amd?'TAF AMENDED':'TAF UPDATED'} ${fmtLZ(rec.at)}</span>`;
}
/* Which forecast periods actually apply at this moment. A TEMPO does not replace the period
   it sits inside, it overlays it, so both are reported rather than only the last match. */
function tafNow(icao, when){
  const t = state.tafs[icao];
  if(!t || !(t.fcsts||[]).length) return null;
  const at = (when || Date.now()) / 1000;
  const inWin = f => {
    const a = f.timeFrom, b = f.timeTo;
    return a !== null && a !== undefined && b !== null && b !== undefined && at >= a && at <= b;
  };
  const hits = t.fcsts.filter(inWin);
  if(!hits.length) return null;
  const isOverlay = f => /TEMPO|PROB/i.test(String(f.fcstChange || '')) || f.probability;
  const base = hits.filter(f=>!isOverlay(f)).slice(-1)[0] || null;   // the last FM still running
  const overlays = hits.filter(isOverlay);
  return {base, overlays};
}
/* The whole forecast in one horizontal strip rather than only the period in force. Each group
   is a nowrap block so the eye can scan left to right through the day, and the block covering
   right now is marked. TEMPO and PROB keep their amber treatment because they are the anomaly,
   not the prevailing state. */
function tafStripHTML(icao, maxGroups){
  const taf = state.tafs[icao];
  if(!taf || !(taf.fcsts || []).length) return '';
  const now = Date.now()/1000;
  const groups = taf.fcsts.slice().sort((a,b)=>(a.timeFrom||0) - (b.timeFrom||0));
  const out = [];
  let shown = 0;
  for(const f of groups){
    if(f.timeTo && f.timeTo < now) continue;             // already past
    if(shown >= (maxGroups || 4)) break;
    const isTempo = /TEMPO|PROB/i.test(f.fcstChange || '');
    const inForce = f.timeFrom && f.timeTo && f.timeFrom <= now && f.timeTo >= now;
    const vis = parseVis(f.visib);
    const bits = [];
    if(f.visib !== null && f.visib !== undefined) bits.push(cv(visTxt(f.visib) + 'sm', visBand(vis)));
    const lay = layersHTML(f.clouds, f.vertVis);
    if(lay) bits.push(lay);
    if(f.wspd || f.wgst) bits.push(windHTML(icao, f.wdir, f.wspd, f.wgst));
    if(f.wxString) bits.push(wxHTML(wxTokens(f.wxString)));
    const tag = (f.fcstChange || (shown === 0 ? '' : 'FM')).toUpperCase();
    const span = (f.timeFrom ? fmtLZ(f.timeFrom) : '') + (f.timeTo ? '\u2013' + fmtLZ(f.timeTo) : '');
    out.push(`<span class="tafgrp${isTempo ? ' tg-tempo' : ''}${inForce ? ' tg-now' : ''}">`
      + (tag ? `<b class="tg-tag">${esc(tag)}</b>` : '')
      + `<span class="tg-time">${span}</span> ${bits.filter(Boolean).join(' ')}</span>`);
    shown++;
  }
  if(!out.length) return '';
  return `<span class="tafstrip">${out.join('')}</span>`;
}
function tafNowHTML(icao){
  const n = tafNow(icao);
  if(!n || (!n.base && !n.overlays.length)) return '';
  const one = (f, tag, colour) => {
    const vis = parseVis(f.visib);
    const bits = [layersHTML(f.clouds, f.vertVis)];
    if(f.visib !== null && f.visib !== undefined) bits.push(cv(visTxt(f.visib)+'sm', visBand(vis)));
    if(f.wxString) bits.push(wxHTML(wxTokens(f.wxString)));
    if(f.wspd || f.wgst) bits.push(windHTML(icao, f.wdir, f.wspd, f.wgst));
    return `<span style="white-space:nowrap"><b style="color:${colour}">${tag}</b> `
      + `<span style="color:var(--mut)">to ${fmtLZ(f.timeTo)}</span> ${bits.filter(Boolean).join(' ')}</span>`;
  };
  const out = [];
  if(n.base) out.push(one(n.base, (n.base.fcstChange || 'BASE'), 'var(--amber)'));
  n.overlays.forEach(f=>out.push(one(f, (f.fcstChange || 'TEMPO') + (f.probability ? ' P'+f.probability : ''), 'var(--ifr)')));
  return `<span style="color:var(--mut)">in force now</span> ` + out.join(' <span style="color:var(--line)">+</span> ');
}
function tafGroupsHTML(icao){
  const taf = state.tafs[icao];
  if(!taf || !(taf.fcsts||[]).length) return '<span style="color:var(--mut)">no TAF</span>';
  const n = tafNow(icao);
  const live = new Set([n && n.base, ...((n && n.overlays) || [])].filter(Boolean));
  const head = `<span style="color:var(--mut)">TAF issued <span class="fstamp">${fmtLZ(taf.issueTime)}</span> \u00b7 valid <span class="fstamp">${fmtLZ(taf.validTimeFrom)}\u2013${fmtLZ(taf.validTimeTo)}</span></span> `;
  return head + taf.fcsts.map(f=>{
    const lbl = (f.fcstChange||'BASE') + (f.probability?' P'+f.probability:'');
    const vis = parseVis(f.visib);
    const wind = (f.wspd||f.wgst) ? windHTML(icao, f.wdir, f.wspd, f.wgst) : '';
    const ws = (f.wshearHgt!=null||f.wshearSpd!=null)?` <span class="flag">WS${f.wshearSpd||''}</span>`:'';
    const isNow = live.has(f);
    const body = `<b style="color:var(--amber)">${lbl}</b> <span style="color:var(--mut)">${fmtLZ(f.timeFrom)}\u2013${fmtLZ(f.timeTo)}</span>: ${layersHTML(f.clouds, f.vertVis)}${f.visib!==null&&f.visib!==undefined?' '+cv(visTxt(f.visib)+'sm', visBand(vis)):''}${f.wxString?' '+wxHTML(wxTokens(f.wxString)):''}${wind?' '+wind:''}${ws}`;
    return `<span class="tg${isNow?' tgnow':''}" ${isNow?'title="This group is in force now"':''}>${isNow?'<span class="tgnowlbl">NOW</span> ':''}${body}</span>`;
  }).join(' <span style="color:var(--line)">|</span> ');
}
function openSet(){ try{ return new Set(JSON.parse(localStorage.getItem('wxb_open')||'[]')); }catch(e){ return new Set(); } }
function saveOpen(st2){ try{ localStorage.setItem('wxb_open', JSON.stringify([...st2])); }catch(e){} }
/* NOTAM detail, same treatment as the TFRs. The row used to truncate at 200 characters and
   cap the list at five, which buried the tail of a closure and hid the rest entirely.
   Everything is here now: full text on click, the embedded validity window decoded to local,
   and closures pulled to the front so they cannot be scrolled past. */
const NOTAM_CAT_LABEL = {closure:'RUNWAY OR FIELD CLOSED', approach:'AFFECTS AN APPROACH', airspace:'Airspace activity or hazard', wip:'Work in progress or obstruction', 'closed-other':'Closed', surface:'Surface condition', outage:'Equipment out', other:'Other'};
const NOTAM_CAT_COLOR = {closure:'var(--ifr)', approach:'var(--ifr)', airspace:'var(--amber)', wip:'var(--amber)', 'closed-other':'var(--amber)', surface:'var(--amber)', outage:'var(--amber)', other:'var(--mut)'};
/* NOTAMs carry their window as a 10 digit YYMMDDHHMM pair, often as 2608061400-2608062200. */
function notamWindow(raw){
  const m = String(raw||'').match(/\b(\d{10})\s*-\s*(\d{10}|PERM|EST|UFN)\b/i);
  if(!m) return null;
  const at = v => {
    if(!/^\d{10}$/.test(v)) return null;
    return new Date(Date.UTC(2000 + +v.slice(0,2), +v.slice(2,4) - 1, +v.slice(4,6), +v.slice(6,8), +v.slice(8,10)));
  };
  const a = at(m[1]), b = at(m[2]);
  const rel = d => {
    const mins = Math.round((d.getTime() - Date.now())/60000), n = Math.abs(mins);
    const sp = n >= 60 ? Math.floor(n/60)+'h '+String(n%60).padStart(2,'0')+'m' : n+'m';
    return mins > 0 ? 'in ' + sp : sp + ' ago';
  };
  return {
    from: a, to: b, openEnded: !b,
    toRaw: m[2].toUpperCase(),
    active: a ? (Date.now() >= a.getTime() && (!b || Date.now() <= b.getTime())) : null,
    txt: (a ? `${m[1].slice(4)}Z (${fmtLZ(a)} local, ${rel(a)})` : m[1])
       + ' to ' + (b ? `${m[2].slice(4)}Z (${fmtLZ(b)} local, ${rel(b)})` : m[2].toUpperCase()),
  };
}
function notamKey(icao, i){ return icao + '_' + i; }
/* ---- NOTAM decoder. Translates the codes, timestamps and Q-line abbreviations
   into plain language so a dispatcher does not need the AIM open beside them. */
const NOTAM_Q_MAP = {
  QFAXX:'Field condition', QFWXX:'Wind shear alert system', QFIAU:'IAP not authorized',
  QPIAU:'Procedure not authorized', QPIXX:'Procedure change', QPICG:'Procedure changed',
  QMRXX:'Runway marking', QMRLC:'Runway marking changed', QMAHW:'Apron work',
  QLCAS:'Approach lighting change', QNMAS:'NAVAID unserviceable', QNMXX:'NAVAID change',
  QFALT:'Runway lighting', QFALC:'Runway lighting change', QFATT:'Taxiway lighting',
  QFAAH:'Aerodrome operations', QFAAS:'Aerodrome services', QFUXX:'Fuel',
  QOBCE:'Obstruction change', QXXXX:'General', QOAXX:'Other aerodrome', QOAAS:'Other services',
  QOALS:'Other lighting', QRDXX:'IFR route', QRDAU:'IFR route not authorized',
  QFMXX:'Movement area', QFMAS:'Movement area change',
};
var _NOTAM_LOC_MAP = null;
function NOTAM_LOC_MAP_get(){
  if(!_NOTAM_LOC_MAP){
    _NOTAM_LOC_MAP = Object.assign({},
      ...STATIONS.map(st=>({[st.icao]:st.name})),
      {JNU:'Juneau', HNS:'Haines', HNH:'Hoonah', AGN:'Angoon', AFE:'Kake', SIT:'Sitka',
       PSG:'Petersburg', WRG:'Wrangell', KTN:'Ketchikan', YAK:'Yakutat', GST:'Gustavus',
       SGY:'Skagway', AKW:'Klawock', KLW:'Klawock', PEC:'Pelican', TKE:'Tenakee Springs',
       ELV:'Elfin Cove', HYG:'Hydaburg'});
  }
  return _NOTAM_LOC_MAP;
}
function notamDecode(n){
  const rows = [];
  /* NOTAM number and issuing facility */
  if(n.id) rows.push({k:'NOTAM', v:n.id});
  /* Facility name from the 3-letter or 4-letter location code */
  const locMatch = String(n.raw||'').match(/^!(\w{2,4})\s/);
  if(locMatch){
    const code = locMatch[1].toUpperCase();
    const name = NOTAM_LOC_MAP_get()[code];
    rows.push({k:'Facility', v: name ? name + ' (' + code + ')' : code});
  }
  /* Category decoded from our classifier */
  rows.push({k:'Category', v: NOTAM_CAT_LABEL[n.cat] || n.cat, col: NOTAM_CAT_COLOR[n.cat]});
  /* Q-line selection code (what kind of NOTAM this is per ICAO) */
  if(n.qcode){
    const qName = NOTAM_Q_MAP[n.qcode] || null;
    rows.push({k:'Q-code', v: n.qcode + (qName ? ' = ' + qName : '')});
  }
  /* Effective window decoded to local time with age/countdown */
  const win = notamWindow(n.raw);
  if(win){
    rows.push({k:'Effective', v: win.txt + (win.active === false ? ' (not currently active)' : ' (ACTIVE NOW)')});
  } else if(n.startMs || n.endMs){
    const parts = [];
    if(n.startMs) parts.push('from ' + fmtLZ(n.startMs));
    if(n.endMs === Infinity) parts.push('to PERMANENT');
    else if(n.endMs) parts.push('to ' + fmtLZ(n.endMs));
    if(n.startMs && n.startMs > Date.now()) parts.push('(not yet active, starts ' + agoTxt(n.startMs/1000).replace(' ago','from now') + ')');
    else if(n.endMs && n.endMs !== Infinity && n.endMs < Date.now()) parts.push('(expired)');
    rows.push({k:'Effective', v: parts.join(' ')});
  }
  if(n.issued) rows.push({k:'Issued', v: fmtLZ(n.issued)});
  /* The actual operational text, cleaned up with line breaks */
  const body = String(n.body || n.raw || '').replace(/\n/g, '\n').trim();
  const decoded = body
    .replace(/\bIAP\b/g, 'IAP (Instrument Approach Procedure)')
    .replace(/\bLDA\b/g, 'LDA (Localizer-type Directional Aid)')
    .replace(/\bODP\b/g, 'ODP (Obstacle Departure Procedure)')
    .replace(/\bSID\b/g, 'SID (Standard Instrument Departure)')
    .replace(/\bSTAR\b/g, 'STAR (Standard Terminal Arrival)')
    .replace(/\bRNAV\b(?!\s*\()/g, 'RNAV (Area Navigation)')
    .replace(/\bGPS\b(?!\s*\))/g, 'GPS (Global Positioning System)')
    .replace(/\bLPV\b/g, 'LPV (Localizer Performance with Vertical guidance)')
    .replace(/\bLNAV\b/g, 'LNAV (Lateral Navigation)')
    .replace(/\bVNAV\b/g, 'VNAV (Vertical Navigation)')
    .replace(/\bDA\b(?=\s*\/|\s+\d)/g, 'DA (Decision Altitude)')
    .replace(/\bMDA\b/g, 'MDA (Minimum Descent Altitude)')
    .replace(/\bPROCEDURE NA\b/g, 'PROCEDURE NOT AUTHORIZED')
    .replace(/\bAMDT\b/g, 'AMENDMENT')
    .replace(/\bU\/S\b/g, 'UNSERVICEABLE')
    .replace(/\bOTS\b/g, 'OUT OF SERVICE')
    .replace(/\bDLY\b/g, 'DAILY')
    .replace(/\bWIP\b/g, 'WORK IN PROGRESS')
    .replace(/\bCLSD\b/g, 'CLOSED')
    .replace(/\bFICON\b/g, 'FICON (Field Condition)')
    .replace(/\bLLWAS\b/g, 'LLWAS (Low Level Windshear Alert System)')
    .replace(/\bMALSR\b/g, 'MALSR (Medium Approach Lighting System with Runway alignment)')
    .replace(/\bALSF\b/g, 'ALSF (Approach Lighting System with Sequenced Flashers)')
    .replace(/\bODALS\b/g, 'ODALS (Omni-Directional Approach Lighting)')
    .replace(/\bPAPI\b/g, 'PAPI (Precision Approach Path Indicator)')
    .replace(/\bVASI\b/g, 'VASI (Visual Approach Slope Indicator)')
    .replace(/\bREIL\b/g, 'REIL (Runway End Identifier Lights)')
    .replace(/\bRCLL\b/g, 'RCLL (Runway Centerline Lights)')
    .replace(/\bTDZL\b/g, 'TDZL (Touchdown Zone Lights)')
    .replace(/\bNAVAID\b/g, 'NAVAID (Navigation Aid)')
    .replace(/\bLOC\b(?=\s)/g, 'LOC (Localizer)')
    .replace(/\bDME\b/g, 'DME (Distance Measuring Equipment)')
    .replace(/\bNDB\b/g, 'NDB (Non-Directional Beacon)')
    .replace(/\bVOT\b/g, 'VOT (VOR Receiver Test)')
    .replace(/\bVOR\b/g, 'VOR (VHF Omnidirectional Range)')
    .replace(/\bTACANs?\b/g, 'TACAN (Tactical Air Navigation)')
    .replace(/\bSFC\b/g, 'Surface')
    .replace(/\bAGL\b/g, 'AGL (Above Ground Level)')
    .replace(/\bMSL\b/g, 'MSL (Mean Sea Level)')
    .replace(/\bAD\b(?=\s+CLOSED|\s+CLSD)/g, 'AERODROME')
    .replace(/\bTFR\b/g, 'TFR (Temporary Flight Restriction)')
    .replace(/\bUAS\b/g, 'UAS (Unmanned Aircraft System)')
    .replace(/\bEST\b(?=\s*$|\s*\))/gm, 'EST (estimated end time)');
  rows.push({k:'Decoded text', v: decoded, pre: true});
  return rows;
}
function notamDetailHTML(n, icao, i){
  const dec = notamDecode(n);
  return `<div class="tfrdet">${dec.map(r=>`<div class="tfrrow"><span class="tfrk">${esc(r.k)}</span><span class="tfrv${r.pre?' ntmpre':''}" style="${r.col ? 'color:'+r.col : ''}">${r.pre ? esc(r.v) : esc(r.v)}</span></div>`).join('')}</div>`;
}
function notamRowHTML(icao){
  const list = (state.notams||{})[icao] || [];
  if(!list.length){
    /* "none on file" and "the feed failed" looked identical, which is how a broken NOTAM
       source went unnoticed. Say which one it is. */
    if(state.notamFetchOk === false || (state.notamFetchOk === null && state.lastNotamRun))
      return `<span style="color:var(--ifr)">NOTAM feed unavailable, nothing checked</span>` +
             (state.notamRouteDiag ? ` <span style="color:var(--mut);font-size:10px">${esc(state.notamRouteDiag)}</span>` : '') +
             (state.notamApiDiag ? ` <span style="color:var(--amber);font-size:10px">${esc(state.notamApiDiag)}</span>` : '') +
             (state.notamNoticeDiag ? ` <span style="color:var(--mut);font-size:10px">notices: ${esc(state.notamNoticeDiag)}</span>` : '') +
             ` <a href="https://notams.aim.faa.gov/notamSearch/nsapp.html#/" target="_blank" class="camlink">NOTAM Search \u2197</a>`;
    return '<span style="color:var(--mut)">none on file</span>';
  }
  const closures = list.filter(n=>n.cat==='closure');
  const apch = list.filter(n=>n.cat==='approach');
  const bits = [];
  if(closures.length) bits.push(`${closures.length === 1 ? 'A closure NOTAM is in effect' : closures.length + ' closure NOTAMs are in effect'}`);
  if(apch.length) bits.push(`${apch.length === 1 ? 'an approach is affected' : apch.length + ' NOTAMs affect approaches'}`);
  const head = bits.length
    ? `<div class="notamhead">\u26a0 ${bits.join(' and ')} at ${esc(icao)}. Verify runway, approach and aerodrome status before dispatch.</div>`
    : '';
  const shown = state.notamAll && state.notamAll[icao] ? list : list.slice(0, 6);
  const body = shown.map((n, i)=>{
    const k = notamKey(icao, list.indexOf(n));
    const open = (state.notamOpen||{})[k];
    const col = NOTAM_CAT_COLOR[n.cat] || 'var(--mut)';
    const weight = n.cat === 'closure' ? '700' : '400';
    const win = notamWindow(n.raw);
    const stale = win && win.active === false;
    const txt = open ? '' : (n.raw.length > 190 ? n.raw.slice(0,190) + '\u2026' : n.raw);
    return `<div class="notamline" data-notam="${k}" style="color:${col};font-weight:${weight};${stale?'opacity:.55':''}">`
      + (n.cat === 'closure' ? '<span class="notambadge">CLSD</span>' : '')
      + `<span class="notamtxt">${esc(txt)}</span><span class="tfrexp">${open?'\u25b2 less':'\u25bc full'}</span></div>`
      + (open ? notamDetailHTML(n, icao, i) : '');
  }).join('');
  const more = (!(state.notamAll && state.notamAll[icao]) && list.length > 6)
    ? `<div class="notamline" data-notam="ALL_${esc(icao)}" style="color:var(--mut)">show the other ${list.length - 6}</div>` : '';
  return head + body + more;
}
function rawObParse(raw){
  if(!raw) return null;
  const o = {clouds:[], vis:null, wdir:null, wspd:0, wgst:0, temp:null, dewp:null, vertVis:null};
  let m;
  const cl = /(FEW|SCT|BKN|OVC)(\d{3})/g;
  while((m = cl.exec(raw))) o.clouds.push({cover:m[1], base:parseInt(m[2],10)*100});
  m = raw.match(/\bVV(\d{3})\b/); if(m) o.vertVis = parseInt(m[1],10)*100;
  m = raw.match(/\b(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT\b/);
  if(m){ o.wdir = m[1]==='VRB'?null:parseInt(m[1],10); o.wspd = parseInt(m[2],10); o.wgst = m[3]?parseInt(m[3],10):0; }
  m = raw.match(/\b(P6SM|(\d+)\s(\d\/\d)SM|(\d\/\d)SM|(\d+)SM)\b/);
  if(m){
    if(m[1]==='P6SM') o.vis = 10;
    else if(m[2] && m[3]) o.vis = parseInt(m[2],10) + eval(m[3]);
    else if(m[4]) o.vis = eval(m[4]);
    else if(m[5]) o.vis = parseInt(m[5],10);
  }
  m = raw.match(/\s(M?\d{2})\/(M?\d{2})\s/);
  if(m){ o.temp = parseInt(m[1].replace('M','-'),10); o.dewp = parseInt(m[2].replace('M','-'),10); }
  return o;
}
const TIDE_MAP = {PAGN:'9451895', TKE:'9452386', PEC:'9452611', PAEL:'9452634'};
function tideChip(icao){
  const id = TIDE_MAP[icao];
  if(!id) return '';
  const d = (state.tides||{})[id];
  if(!d || !d.length) return '';
  const parseT = s2 => { const g = new Date(s2.replace(' ','T')+':00Z'); return new Date(g.getTime() - offsetMinutes('America/Juneau', g)*60000); };
  const nowMs = Date.now();
  const next = d.find(x=>parseT(x.t).getTime() > nowMs);
  if(!next) return '';
  const hi = next.type==='H';
  const col = hi ? 'var(--mvfr)' : 'var(--amber)';
  return `<span class="cutchip" style="border:1px solid ${col};color:${col};background:${hi?'rgba(77,163,232,.08)':'rgba(242,169,59,.08)'}">${hi?'\u25b2 hi tide':'\u25bc lo tide'} ${parseFloat(next.v).toFixed(1)}' ${inTxt(parseT(next.t))}</span>`;
}
/* Approach and departure minimums checked against what is actually being reported, surfaced
   on the row instead of only inside the limits panel. Two separate things are flagged and
   they are not the same:
     - visibility against the lowest CAT A published visibility, which is the legal gate
       under 135.225 for beginning an approach;
     - ceiling against the lowest HAT, which is advisory. It is not what makes an approach
       legal to start, but a ceiling below every HAT means you are very unlikely to see the
       runway from the MDA, which is the operationally useful warning.
   Circling lines are excluded from the ceiling test because circling minimums work off the
   circling MDA rather than a straight-in HAT. */
function minsStatus(icao, o){
  const P = PROCS[icao];
  if(!P || !P.apps || !P.apps.length || !o) return null;
  // VEIA is a non-certified estimate. It may raise a weather hold, which is conservative,
  // but it can never be the basis for saying an approach is or is not legal.
  if(o.estimated || o.visEstimated) return null;
  const usable = P.apps.filter(a => !a.verify && a.vis && Number.isFinite(a.vis.A));
  if(!usable.length) return null;
  const bestVis = Math.min(...usable.map(a => a.vis.A));
  const straight = usable.filter(a => !/CIRCLING/i.test(a.line || '') && Number.isFinite(a.hat));
  const bestHat = straight.length ? Math.min(...straight.map(a => a.hat)) : null;
  const visBelow = (o.vis !== null && o.vis !== undefined) && o.vis < bestVis;
  const cigBelow = bestHat !== null && (o.cig !== null && o.cig !== undefined) && o.cig < bestHat;
  let depBelow = false, depReq = null;
  if(P.deps && P.deps.length){
    const ok = P.deps.some(d => {
      if(d.vis === null || d.vis === undefined) return false;
      const visOK = (o.vis !== null && o.vis !== undefined) && o.vis >= d.vis;
      const cigOK = d.cig === null || d.cig === undefined
        || o.cig === null || o.cig === undefined      // clear sky, unlimited, meets any minimum
        || o.cig >= d.cig;
      return visOK && cigOK;
    });
    const anyPublished = P.deps.some(d => d.vis !== null && d.vis !== undefined);
    depBelow = anyPublished && !ok && (o.vis !== null && o.vis !== undefined);
    if(depBelow) depReq = Math.min(...P.deps.filter(d => Number.isFinite(d.vis)).map(d => d.vis));
  }
  return { bestVis, bestHat, visBelow, cigBelow, depBelow, depReq };
}
/* Front-of-row closure marker. Everything else about a NOTAM can wait until the station is
   opened; a closed runway cannot. */
/* Row chips for the two categories a dispatcher needs before opening anything: an approach
   affected, and work on the field. The closure chip already covers the third. */
function notamCatChip(icao, cat, label, cls, title){
  const list = ((state.notams||{})[icao] || []).filter(n=>n.cat === cat);
  if(!list.length) return '';
  const active = list.filter(n=>{ const w = notamWindow(n.raw); return !w || w.active !== false; });
  const use = active.length ? active : list;
  const tip = title + '\n\n' + use.map(n=>String(n.raw).replace(/\s+/g,' ')).join('\n\n');
  return `<span class="cutchip ${cls}" title="${esc(tip)}">${label}${use.length>1?' \u00d7'+use.length:''}${active.length?'':' (not active now)'}</span>`;
}
/* Does this NOTAM touch an approach we actually fly? PROCS holds the procedures on the
   certificate, so a NOTAM naming one of them matters and a NOTAM naming an ILS we are not
   authorised for does not. "APCH x5" on every station had stopped carrying information;
   this is the version that goes quiet most days and means something when it fires. */
function approachTokens(name){
  const u = String(name||'').toUpperCase();
  const out = new Set();
  const rwy = u.match(/RWY\s*0?(\d{1,2})([LRC]?)/);
  if(rwy) out.add('RWY' + rwy[1].padStart(2,'0') + rwy[2]);
  ['RNAV','GPS','LDA','ILS','LOC','VOR','NDB','TACAN','LPV','LNAV','SDF'].forEach(k=>{ if(u.includes(k)) out.add(k); });
  const suffix = u.match(/\b(RNAV|GPS|LDA|ILS|LOC|VOR)[^A-Z0-9]*([A-Z])\s+RWY/);
  if(suffix) out.add(suffix[1] + '-' + suffix[2]);
  return out;
}
function notamHitsOurApproach(icao, txt){
  const P = PROCS[icao];
  if(!P || !(P.apps||[]).length) return null;     // nothing published, so nothing to compare
  const u = String(txt||'').toUpperCase();
  const nt = approachTokens(u);
  if(!nt.size) return null;
  for(const app of P.apps){
    const at = approachTokens(app.name);
    // a runway match plus a matching procedure type is a real hit; runway alone is too loose
    const rwyN = [...nt].find(x=>x.startsWith('RWY'));
    const rwyA = [...at].find(x=>x.startsWith('RWY'));
    if(!rwyN || !rwyA || rwyN !== rwyA) continue;
    const kindsN = [...nt].filter(x=>!x.startsWith('RWY'));
    const kindsA = [...at].filter(x=>!x.startsWith('RWY'));
    if(!kindsN.length || kindsA.some(k=>kindsN.includes(k))) return app.name;
  }
  return false;
}
function approachChip(icao){
  const list = ((state.notams||{})[icao] || []).filter(n=>n.cat === 'approach');
  if(!list.length) return '';
  const ours = [], other = [];
  list.forEach(n=>{
    const hit = notamHitsOurApproach(icao, n.raw);
    if(hit) ours.push({n, app:hit});
    else if(hit === false) other.push(n);
    else ours.push({n, app:null});      // no published list to compare, so keep it loud
  });
  if(ours.length){
    const tip = 'Affects an approach on our certificate:\n\n'
      + ours.map(x=>(x.app ? x.app + '\n' : '') + String(x.n.raw).replace(/\s+/g,' ')).join('\n\n')
      + (other.length ? `\n\n${other.length} further approach NOTAM${other.length>1?'s':''} here affect procedures we do not fly.` : '');
    return `<span class="cutchip apchchip" title="${esc(tip)}">APCH${ours.length>1?' ×'+ours.length:''}</span>`
      + (other.length ? `<span class="cutchip apchother" title="${esc('Approach NOTAMs for procedures not on our certificate:\n\n' + other.map(n=>String(n.raw).replace(/\s+/g,' ')).join('\n\n'))}">+${other.length} other</span>` : '');
  }
  return other.length
    ? `<span class="cutchip apchother" title="${esc('Approach NOTAMs here, none affecting a procedure we fly:' + String.fromCharCode(10,10) + other.map(n=>String(n.raw).replace(/\s+/g,' ')).join(String.fromCharCode(10,10)))}">apch \u00d7${other.length} n/a</span>`
    : '';
}
function approachChipOld(icao){
  return notamCatChip(icao, 'approach', 'APCH', 'apchchip',
    'A NOTAM here affects an instrument approach: a procedure not authorised, amended minimums, or navaid and approach lighting out of service.');
}
function wipChip(icao){
  return notamCatChip(icao, 'wip', 'WIP', 'wipchip',
    'Work in progress or an obstruction at this field: construction, men and equipment, a crane, or an obstacle light out.')
   + notamCatChip(icao, 'airspace', 'AIRSPACE', 'wipchip',
    'An airspace activity or hazard here: a UAS operation, avalanche control, blasting, aerial work or similar.');
}
/* ---- Row flags ----
   Things a dispatcher should see while scanning the board, without opening a station. The
   present weather was only ever a small inline token, so a station calling haze looked the
   same as one calling nothing; it gets a chip now, in words rather than codes. */
const WX_SIG = {FG:3, 'FZFG':3, 'VCFG':2, BR:2, HZ:2, FU:2, 'BLSN':3, 'DRSN':2, SN:3, 'SHSN':3,
  'FZRA':4, 'FZDZ':4, 'PL':3, GR:4, GS:3, TS:4, 'TSRA':4, 'VCTS':3, SQ:4, 'FC':4,
  RA:1, 'SHRA':2, DZ:1, 'VCSH':1, 'UP':1};
function wxChip(icao, toks){
  const list = (toks||[]).filter(Boolean);
  if(!list.length) return '';
  let worst = 0;
  list.forEach(t=>{
    const bare = String(t).replace(/^[-+]/,'').toUpperCase();
    const w = WX_SIG[String(t).toUpperCase()] || WX_SIG[bare] || 1;
    if(w > worst) worst = w;
  });
  const words = list.slice(0,2).map(t=>wxWord(t)).join(', ') + (list.length > 2 ? ' +' + (list.length-2) : '');
  const cls = worst >= 4 ? 'wxsev' : worst >= 2 ? 'wxmod' : 'wxlo';
  return `<span class="cutchip ${cls}" title="${esc('Reported now: ' + words)}">${esc(words.toUpperCase())}</span>`;
}
/* Temperature and dewpoint converging is the single best warning of fog forming, and it
   shows up before the visibility does. One degree C is about two degrees F, so the same
   test covers both. */
function spreadChip(o){
  if(!o || o.temp === null || o.temp === undefined || o.dewp === null || o.dewp === undefined) return '';
  const sp = o.temp - o.dewp;
  if(sp > 1) return '';          // amber inline colouring already covers the 1 to 2 degree band
  const cls = 'wxsev';
  const f = Math.round(sp * 9/5);
  return `<span class="cutchip ${cls}" title="Temperature and dewpoint are ${sp.toFixed(1)}\u00b0C apart, about ${f}\u00b0F. Saturated air, so watch for fog forming or lifting slowly.">SPREAD ${sp.toFixed(1)}\u00b0C</span>`;
}
/* A steady wind and a gusty one fly very differently even at the same average. */
function gustChip(o){
  if(!o) return '';
  const g = o.wgst || 0, w = o.wspd || 0;
  if(!g || g - w < 10) return '';
  return `<span class="cutchip wxmod" title="Gusting ${g - w} kt above the steady wind of ${w} kt.">GUSTY ${w}G${g}</span>`;
}
/* Most of what we fly is day VFR, so the light running out matters as much as the weather. */
function lightChip(st){
  try{
    const now = new Date();
    const t = sunTimes(st.lat, st.lon, now);
    const mins = Math.round((t.sunset.getTime() - now.getTime())/60000);
    if(mins < 0 || mins > 90) return '';
    return `<span class="cutchip ${mins <= 30 ? 'wxsev' : 'wxmod'}" title="Sunset here is at ${fmtLZ(t.sunset)} local.">${mins} MIN LIGHT</span>`;
  }catch(e){ return ''; }
}
function closureChip(icao){
  const list = (state.notams||{})[icao] || [];
  const cl = list.filter(n=>n.cat === 'closure');
  if(!cl.length) return '';
  const active = cl.filter(n=>{ const w = notamWindow(n.raw); return !w || w.active !== false; });
  const use = active.length ? active : cl;
  const first = String(use[0].raw).replace(/\s+/g,' ');
  const tip = use.map(n=>String(n.raw).replace(/\s+/g,' ')).join('\n\n');
  const rwy = (first.match(/\b(?:RWY|RUNWAY)\s*([0-9]{2}[LRC]?(?:\/[0-9]{2}[LRC]?)?)/i) || [])[1];
  const label = rwy ? `RWY ${rwy} CLSD` : 'FIELD CLSD';
  return `<span class="cutchip closurechip" title="${esc(tip)}">${esc(label)}${active.length ? '' : ' (not active now)'}</span>`;
}
function minsChips(icao, o){
  const m = minsStatus(icao, o);
  if(!m) return '';
  const out = [];
  if(m.visBelow) out.push(`<span class="cutchip minsbad" title="Reported visibility ${visTxt(o.vis)} sm is below the lowest published CAT A approach visibility of ${visTxt(m.bestVis)} sm here. Under 135.225 an approach may not be begun with the latest report below authorized landing minimums.">BELOW APCH MINS \u00b7 vis ${visTxt(o.vis)} of ${visTxt(m.bestVis)}</span>`);
  if(m.cigBelow) out.push(`<span class="cutchip minswarn" title="Reported ceiling ${Number(o.cig).toLocaleString()} ft is below the lowest straight-in HAT of ${m.bestHat} ft here. Advisory, not a legality test: visibility is what governs starting the approach. A ceiling below every HAT means you are unlikely to see the runway from the MDA.">CIG BELOW HAT \u00b7 ${Number(o.cig).toLocaleString()} of ${m.bestHat}</span>`);
  if(m.depBelow) out.push(`<span class="cutchip minswarn" title="Reported conditions are below every published departure minimum on file here (lowest is ${visTxt(m.depReq)} sm). Check the plate and your ops specs.">BELOW DEP MINS</span>`);
  return out.join('');
}
/* Everything the marine station reports, not just the wind. The feed carries pressure, air
   and water temperature, dewpoint, wave height and the pressure tendency in the same request
   we were already making, so it costs nothing to show. */
function extDetailText(e, ob){
  if(!ob) return '';
  const L = [];
  const dir = ob.wdir === null ? 'variable' : String(Math.round(ob.wdir)).padStart(3,'0') + '\u00b0T';
  L.push(`Wind ${dir} at ${ob.wspd ?? '?'} kt` + (ob.gust ? `, peak ${ob.gust} kt` : ''));
  L.push(ob.src === 'MXAK'
    ? 'Source: Marine Exchange BlueView, one-minute data.'
    : 'Source: NDBC rebroadcast, which lags Marine Exchange by up to an hour. This station is not yet mapped to a BlueView ID.');
  if(ob.airF !== null) L.push(`Air ${ob.airF}\u00b0F (${ob.airC}\u00b0C)`);
  if(ob.dewF !== null) L.push(`Dewpoint ${ob.dewF}\u00b0F (${ob.dewC}\u00b0C)`);
  if(ob.rh !== null) L.push(`Relative humidity ${ob.rh}%`);
  if(ob.waterF !== null && ob.waterF !== undefined) L.push(`Water ${ob.waterF}\u00b0F`);
  if(ob.pres !== null) L.push(`Pressure ${ob.pres} mb (${ob.presInHg} inHg)`
    + ((ob.ptdy !== null && ob.ptdy !== undefined) ? `, ${ob.ptdy > 0 ? '+' : ''}${ob.ptdy} mb over 3 h` : ''));
  if(ob.waveFt !== null && ob.waveFt !== undefined) L.push(`Seas ${ob.waveFt} ft` + (ob.wavePeriod ? ` at ${ob.wavePeriod} s` : ''));
  if(ob.airF !== null && ob.dewF !== null && (ob.airF - ob.dewF) <= 2)
    L.push('Temperature and dewpoint are within 2\u00b0F, so watch for fog over the water.');
  if(ob.trend) L.push(`Wind ${ob.trend} about ${ob.trendKt} kt over the last ${ob.trendMin} minutes.`);
  if(ob.samples) L.push(`${ob.samples} one-minute samples; peak is a one-minute maximum.`);
  if(state.mxAt) L.push(`Board last checked Marine Exchange ${Math.round((Date.now()-state.mxAt)/60000)} minutes ago.`);
  if(ob.t){
    const ms = extAgeMs(ob);
    const m = ms === null ? null : Math.round(ms/60000);
    L.push(`Reported ${ob.t}` + (m === null ? '' : `, ${m} minute${m === 1 ? '' : 's'} ago`)
      + (m !== null && m >= 60 ? '. This station has stopped updating; treat it as no report.' : ''));
  }
  return L.join('\n');
}
/* Marine stations normally report every six to ten minutes, so an age is a far quicker read
   than a clock time: you can see stagnant data without doing arithmetic. Quiet while it is
   current, amber once it is late, red once it has clearly stopped. */
/* ================= Marine Exchange BlueView =================
   The marine winds were coming from NDBC, which redistributes Marine Exchange data on its own
   slower schedule, so a 45 kt cutoff at Point Retreat was being judged on data that could be
   an hour old. BlueView is the operator's own API and issues every ten minutes with a stated
   expiry, which for Lynn Canal is a different quality of decision.

   Station IDs are opaque, so rather than hardcode a list that will rot, the app asks the API
   for one at load and matches on name. Shape confirmed against a live George Island response. */
const MX_BASE = 'https://blueview.mxak.org/api/trpc/';
const MX_LIST_PROCS = ['weatherStation.all', 'weatherStation.list', 'weatherStation.many',
  'weatherStation.byBounds', 'weatherStation.nearby', 'weatherStation.search'];
const MX_IDS = ['67f7e9283c97c4726c59ffb3', '67f7e9283c97c4726c59ff75',
  '67f7e9283c97c4726c59ffa1', '6a232b35a6e0116db322a3be'];
const MX_KNOWN = { 'George Island': '67f7e9283c97c4726c59ffb3' };

function mxUrl(proc, input){
  return MX_BASE + proc + '?batch=1&input=' + encodeURIComponent(JSON.stringify({0: input || {}}));
}
/* tRPC batches replies as an array of {result:{data:...}}, so unwrap before doing anything. */
function mxUnwrap(j){
  const arr = Array.isArray(j) ? j : [j];
  return arr.map(x=>(x && x.result && x.result.data !== undefined) ? x.result.data : x);
}
function mxVal(o){ return (o && typeof o === 'object' && 'value' in o) ? o.value : null; }
function parseMxStation(d){
  if(!d || !d.properties) return null;
  const md = d.properties.metadata || {}, c = d.properties.conditions || {};
  const kt = mxVal(c.windSpeed), gust = mxVal(c.windPeakSpeed);
  const issued = c.issued ? Date.parse(c.issued) : null;
  const cToF = v => v === null ? null : Math.round(v*9/5+32);
  const airC = mxVal(c.airTemperature), dewC = mxVal(c.dewPointTemperature);
  return {
    id: d.id || null,
    name: String(md.name || '').trim(),
    lat: d.geometry && d.geometry.coordinates ? d.geometry.coordinates[1] : null,
    lon: d.geometry && d.geometry.coordinates ? d.geometry.coordinates[0] : null,
    wdir: mxVal(c.windDirection) === null ? null : Math.round(mxVal(c.windDirection)),
    wspd: kt === null ? null : Math.round(kt),
    gust: gust === null ? null : Math.round(gust),
    gustDir: mxVal(c.windPeakDirection) === null ? null : Math.round(mxVal(c.windPeakDirection)),
    airC, airF: cToF(airC), dewC, dewF: cToF(dewC),
    rh: mxVal(c.humidity), pres: mxVal(c.barometricPressure),
    issued, expires: c.expires ? Date.parse(c.expires) : null,
    elevM: mxVal(md.siteElevation), sensorM: mxVal(md.sensorHeight),
  };
}
/* Ask the API for its own station list. Whichever procedure answers with an array of features
   wins; if none do, the known IDs are still fetched individually. */
/* blueview.mxak.org does not allow cross origin requests, so a direct fetch from the page is
   blocked by the browser and the whole integration failed quietly back to NDBC. Everything
   goes through the same proxy chain the rest of the app uses; a direct attempt is still made
   first in case they open it up later. */
async function mxJson(proc, input){
  const url = mxUrl(proc, input);
  try{
    const r = await fetch(url, {mode:'cors'});
    if(r.ok) return mxUnwrap(await r.json());
  }catch(e){}
  const t = await fetchText(url);
  return mxUnwrap(JSON.parse(t));
}
async function mxDiscover(){
  if(state.mxIndex) return state.mxIndex;
  const tried = [];
  for(const proc of MX_LIST_PROCS){
    for(const input of [{}, {bounds:{south:54, west:-141, north:60.5, east:-129}}]){
      try{
        const data = (await mxJson(proc, input))[0];
        tried.push(proc + ' ok');
        const feats = Array.isArray(data) ? data : (data && Array.isArray(data.features) ? data.features : null);
        if(feats && feats.length){
          const idx = {};
          feats.forEach(f=>{ const st = parseMxStation(f); if(st && st.name) idx[st.name] = st.id || (f && f.id); });
          if(Object.keys(idx).length){
            state.mxIndex = idx; state.mxDiag = `${proc}: ${Object.keys(idx).length} stations`;
            return idx;
          }
        }
      }catch(e){ tried.push(proc + ' err'); }
    }
  }
  /* No list endpoint, so fall back to the captured IDs and learn each station's name from
     its own response rather than assuming it. */
  const idx = Object.assign({}, MX_KNOWN);
  for(const id of MX_IDS){
    try{
      const st = parseMxStation((await mxJson('weatherStation.byId', {id}))[0]);
      if(st && st.name) idx[st.name] = id;
    }catch(e){}
  }
  state.mxIndex = idx;
  state.mxDiag = 'no list endpoint (' + tried.slice(0,3).join(', ') + '); '
    + Object.keys(idx).length + ' from captured IDs: ' + Object.keys(idx).join(', ');
  return idx;
}
/* byId returns one sample per ten minutes, so a reading could be nine minutes stale before
   we even fetched it. The range endpoint returns the same station at ONE MINUTE spacing: the
   ten-minute average is recomputed every minute, and windPeakSpeed there is a one-minute
   rolling maximum rather than a ten-minute one. Taking the newest sample from a short window
   gives a wind that is at most a minute old, and the tail of the series gives a trend for
   free. Confirmed against a live George Island hour, 1 Sept 2026. */
function mxRangeInput(id, minutes){
  const off = -new Date().getTimezoneOffset();
  const sign = off >= 0 ? '+' : '-';
  const pad = n => String(Math.floor(Math.abs(n))).padStart(2,'0');
  const tz = sign + pad(off/60) + ':' + pad(off%60);
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate())
    + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.000' + tz;
  const end = new Date();
  return {id, start: iso(new Date(end.getTime() - (minutes||25)*60000)), end: iso(end)};
}
async function mxLatest(id){
  const rows = (await mxJson('weatherStation.range', mxRangeInput(id, 120)))[0];
  if(!Array.isArray(rows) || !rows.length) return null;
  const withT = rows.filter(r=>r && r.issued).sort((a,b)=>Date.parse(a.issued) - Date.parse(b.issued));
  if(!withT.length) return null;
  const last = withT[withT.length - 1];
  const st = parseMxStation({id, properties:{metadata:{}, conditions:last}, geometry:null});
  if(!st) return null;
  /* Trend over the window, since the series is right there: rising or easing tells you more
     than a single number in a place where the wind builds fast. */
  const first = withT[0];
  const v0 = mxVal(first.windSpeed), v1 = mxVal(last.windSpeed);
  if(v0 !== null && v1 !== null && withT.length > 4){
    const d = v1 - v0;
    st.trend = Math.abs(d) < 2 ? null : (d > 0 ? 'rising' : 'easing');
    st.trendKt = Math.round(Math.abs(d));
    st.trendMin = Math.round((Date.parse(last.issued) - Date.parse(first.issued))/60000);
  }
  st.samples = withT.length;
  return st;
}
/* Marine winds on their own cadence, independent of the five minute board cycle. Two small
   JSON calls, and only the rows are redrawn, so nothing else on screen is disturbed. */
function startMarineTicker(){
  if(state.mxTicker) return;
  state.mxTicker = setInterval(()=>{
    if(state.mxBusy || document.hidden) return;      // no point polling a board nobody is watching
    if(state.mxAt && Date.now() - state.mxAt < 80*1000) return;
    state.mxBusy = true;
    loadMxak()
      .catch(e=>{ state.mxDiag = 'fetch failed: ' + String((e && e.message) || e).slice(0,50); })
      .finally(()=>{ state.mxBusy = false; if(window.lastPer) renderMaster(window.lastPer); });
  }, 90*1000);
}
async function loadMxak(){
  const idx = await mxDiscover();
  const wanted = EXT.map(e=>e.name).concat(Object.values(MX_FOR_STATION));
  const hits = Object.keys(idx).filter(n=>wanted.some(w=>
    n.toLowerCase().includes(w.toLowerCase()) || w.toLowerCase().includes(n.toLowerCase())));
  const prev = state.mx || {};
  const fresh = {};
  let ok = 0;
  for(const name of (hits.length ? hits : Object.keys(idx))){
    try{
      let st = null;
      try{ st = await mxLatest(idx[name]); }catch(e){}
      if(!st) st = parseMxStation((await mxJson('weatherStation.byId', {id: idx[name]}))[0]);
      if(st){ st.name = st.name || name; fresh[st.name] = st; ok++; }
    }catch(e){}
  }
  /* Keep a previous reading only while it is still inside the usable window, so a failed
     fetch degrades to "absent" rather than quietly showing yesterday's wind. */
  Object.keys(prev).forEach(k=>{
    if(!fresh[k] && prev[k] && prev[k].issued && Date.now() - prev[k].issued < 15*60000) fresh[k] = prev[k];
  });
  state.mx = fresh;
  state.mxAt = Date.now();
  state.mxDiag = (state.mxDiag || '') + ` \u00b7 ${ok} loaded`;
  return ok;
}
/* Prefer BlueView over NDBC when it is current, since it is the same sensor sooner. */
/* Match a BlueView station by name for the wind-only float destinations, whose entire
   picture is one wind reading and where an hour of lag matters most. */
function mxByName(name){
  if(!name || !state.mx) return null;
  const want = String(name).toLowerCase();
  const hit = state.mx[name] || Object.values(state.mx).find(x=>{
    const n = String(x.name||'').toLowerCase();
    return n === want || n.includes(want) || want.includes(n);
  });
  if(!hit || !hit.issued || Date.now() - hit.issued > 45*60000) return null;
  return hit;
}
function mxFor(e){
  const m = state.mx && (state.mx[e.name] || Object.values(state.mx).find(x=>
    x.name && (x.name.toLowerCase().includes(e.name.toLowerCase()) || e.name.toLowerCase().includes(x.name.toLowerCase()))));
  if(!m || m.issued === null) return null;
  if(Date.now() - m.issued > 45*60000) return null;
  state.mxUsed = (state.mxUsed || 0) + 1;
  return {wdir:m.wdir, wspd:m.wspd, gust:m.gust, t:new Date(m.issued).toISOString().slice(0,19).replace('T',' ')+'Z',
    airC:m.airC, airF:m.airF, dewC:m.dewC, dewF:m.dewF, rh:m.rh, pres:m.pres,
    presInHg: m.pres === null ? null : Math.round(m.pres*0.02953*100)/100,
    gustDir:m.gustDir, trend:m.trend, trendKt:m.trendKt, trendMin:m.trendMin,
    samples:m.samples, src:'MXAK'};
}
function extAgeMs(ob){
  if(!ob || !ob.t) return null;
  const d = new Date(String(ob.t).replace(' ', 'T').replace(/Z?$/, 'Z'));
  const ms = Date.now() - d.getTime();
  return Number.isFinite(ms) && ms > -3600000 ? ms : null;
}
function extAgeHTML(ob){
  const ms = extAgeMs(ob);
  if(ms === null) return '';
  /* Under two minutes show seconds: 30s versus 110s matters when the wind is building. */
  if(ms < 120000){
    return ` <span style="opacity:.6">${Math.max(0, Math.round(ms/1000))}s</span>`;
  }
  const m = Math.round(ms/60000);
  const txt = m < 1 ? 'now' : (m < 60 ? m + 'm' : Math.floor(m/60) + 'h' + String(m%60).padStart(2,'0'));
  const col = m >= 60 ? 'var(--ifr)' : (m >= 20 ? 'var(--amber)' : 'inherit');
  const weight = m >= 20 ? '700' : '400';
  return ` <span style="opacity:${m >= 20 ? 1 : .6};color:${col};font-weight:${weight}">${txt}</span>`;
}
function cutChips(st){
  const short = n => n.replace('Point','Pt').replace('Eldred Rock','Eldred Rk').replace('George Island','George Is').replace(' Mtn','');
  const ties = EXT.filter(e=>!e.info && e.affects &&
    e.affects.toLowerCase().includes(st.name.split(' ')[0].toLowerCase()));
  if(!ties.length) return '';
  return '<span style="display:inline-flex;gap:5px;flex-wrap:wrap">' + ties.map(e=>{
    const ob = mxFor(e) || state.ext[e.id];
    const spd = ob ? Math.max(ob.wspd||0, ob.gust||0) : null;
    const col = spd===null ? 'var(--mut)' : spd > e.cutoff ? 'var(--ifr)' : spd >= e.cutoff-10 ? 'var(--amber)' : 'var(--vfr)';
    const bg  = spd===null ? 'transparent' : spd > e.cutoff ? 'rgba(226,87,75,.15)' : spd >= e.cutoff-10 ? 'rgba(242,169,59,.12)' : 'rgba(60,170,110,.08)';
    const tip = `${e.name}${e.cutoff ? ', company cutoff ' + e.cutoff + ' kt for ' + e.affects : ''}\n\n${extDetailText(e, ob) || 'No current report.'}`;
    /* Written the way a METAR writes it, direction then sustained then gust, because that is
       what the eye is trained on. Marine stations report true, so it is marked. */
    const w = ob ? ((ob.wdir === null || ob.wdir === undefined) ? 'VRB' : String(Math.round(ob.wdir)).padStart(3,'0') + '\u00b0T')
      + ' ' + (ob.wspd || 0) + (ob.gust ? 'G' + ob.gust : '') + 'kt' : 'no data';
    return `<span class="cutchip${ob ? '' : ' nodata'}" data-tip="ext-${e.id}" title="${esc(tip)}" style="border:1px solid ${col};background:${bg};color:${col};cursor:help">${short(e.name)} ${w}${ob ? `<span style="opacity:.65">/${e.cutoff}</span>${extAgeHTML(ob)}${ob.src === 'MXAK' ? '' : '<span style="opacity:.5;font-size:.85em"> ndbc</span>'}` : ''}</span>`;
  }).join('') + '</span>';
}
function renderGrid(per){
  const rows = [...STATIONS].sort((a,b)=>a.name.localeCompare(b.name)).map(st=>{
    const w = per[st.icao] || {};
    const o = w.obs;
    const cat = w.cat || 'NA';
    const md = state.madis[st.icao];
    const mT = o && o.t ? toDate(o.t) : null;
    const stale = mT ? (Date.now()-mT.getTime())/60000 > (md&&md.syn?20:75) : false;
    const src = !o ? '' : (md && mT && toDate(md.valid) && toDate(md.valid) > mT ? (md.syn?'5-MIN':'MADIS') : 'METAR');
    const age = mT ? agoTxt(mT).replace(' ago','') : '';
    const wdir = o ? o.wdir : null;
    const wspd = o ? (o.wspd||0) : 0, wgst = o ? (o.wgst||0) : 0;
    const wcls = stationWindClass(st.icao, o);
    const wCol = wcls==='over'?'var(--ifr)':wcls==='appr'?'var(--amber)':'var(--ink)';
    const windTxt = !o ? '\u2014' : (Number.isFinite(wdir) ? String(wdir).padStart(3,'0')+'\u00b0/' : (wspd||wgst?'VRB/':'')) + (wspd||wgst ? wspd+(wgst?'G'+wgst:'')+'kt' : (o.wdir===null&&!wspd&&!wgst?'calm':''));
    const cig = o ? fmtCig(o.cig) : '\u2014';
    const vis = o ? (o.vis===null?'?':visTxt(o.visRaw??o.vis)+'sm') : '\u2014';
    const t = o && o.temp!==null && o.temp!==undefined ? o.temp+'\u00b0' : '\u2014';
    const td = o && o.dewp!==null && o.dewp!==undefined ? o.dewp+'\u00b0' : '\u2014';
    const spread = (o && o.temp!==null && o.dewp!==null && o.temp!==undefined && o.dewp!==undefined) ? o.temp-o.dewp : null;
    const tdCol = spread!==null && spread<1 ? 'var(--amber)' : 'var(--ink)';
    const alt = o ? altimFromRaw(o.raw) : null;
    const altTxt = (o && o.alti!==null && o.alti!==undefined) ? o.alti.toFixed(2) : (alt!==null?alt.toFixed(2):'\u2014');
    const notam = ((state.notams||{})[st.icao]||[]).length;
    return `<tr class="gridrow cat-row-${cat}">
      <td class="gname">${st.name}<span class="gicao">${st.icao}</span></td>
      <td><span class="worst cat-${cat}" style="font-size:11px;padding:1px 8px">${cat}</span></td>
      <td class="mono" style="color:${stale?'var(--ifr)':'var(--mut)'}">${src}${age?' '+age+'m':''}${stale?' EXP':''}</td>
      <td class="mono" style="color:${wCol};font-weight:${wcls==='over'||wcls==='appr'?'800':'400'}">${windTxt}</td>
      <td class="mono">${cig}</td>
      <td class="mono">${vis}</td>
      <td class="mono">${t}/<span style="color:${tdCol}">${td}</span></td>
      <td class="mono">${altTxt}</td>
      <td class="mono" style="color:${notam?'var(--amber)':'var(--mut)'}">${notam?notam+' NOTAM':'\u2014'}</td>
    </tr>`;
  }).join('');
  document.getElementById('grid-body').innerHTML = rows;
}
function renderCards(per){
  const rows = [...STATIONS].sort((a,b)=>a.name.localeCompare(b.name)).map(st=>{
    const w = per[st.icao]; if(!w) return '';
    const P = nowLineParts(st, w);
    const shownCat = (w.obsCat && w.obsCat !== 'NA') ? w.obsCat : w.cat;
    const gap = sensorGap(st.icao);
    return `<div class="ccard${gap ? ' cardalarm' : ''}"${gap ? ` title="${esc(st.name + ' has stopped reporting ' + gap.missing.join(' and ') + '. Sensor failure, often not NOTAM\'d.')}"` : ''} style="border-left-color:${catClr(shownCat)};background:${catBg(shownCat)}">
      <div class="cchead">
        <div class="ccbadgewrap">${P.catBadge2}</div>
        <div class="ccidwrap"><b class="ccname">${P.name}</b><span class="ccicao">${P.icao}${P.nowChip}</span><div class="ccsrc">${P.srcTag}</div><span class="ccchg">${changeChips(st.icao)}</span><span class="ccroute">${cutChips(st)}${tideChip(st.icao)}</span></div>
        <div class="ccline ccdata ccstack"><span class="rl rl2">${P.wxLine}</span><span class="rl rl3">${P.fcstLine}${P.restLine}</span></div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('cardsWrap').innerHTML = rows;
  fitKiosk();
}
/* Magnify the card stack as far as it can go while every station still fits on screen.
   Bisection rather than arithmetic because zoom also shrinks the effective CSS width,
   which changes how the data lines wrap, so rendered height is not linear in zoom. */
/* TV text size. fitKiosk shrinks until all 16 stations fit the screen, so on a portrait
   panel the text lands around 21 px however much else is hidden: the limit is the station
   count, not the discussion box. "Large" sets a floor instead and pages through the board
   when the content no longer fits, trading one screenful for readable text across the room. */
const TV_BIG_MIN_ZOOM = 2.0;
const TV_PAGE_MS = 14000;
function tvBig(){
  if(state.tvBig === undefined){
    try{ state.tvBig = localStorage.getItem('wxb_tvbig') === '1'; }catch(e){ state.tvBig = false; }
  }
  return state.tvBig;
}
function setTvBig(on){
  state.tvBig = !!on;
  try{ localStorage.setItem('wxb_tvbig', on ? '1' : '0'); }catch(e){}
  const b = document.getElementById('tvBigBtn');
  if(b) b.textContent = on ? 'TV text: large' : 'TV text: fit all';
  try{ fitKiosk(); }catch(e){}
  tvPageSync();
}
/* Everything above the station board loads on its own clock: the forecast discussion
   arrives seconds after first paint and grows the box, sections fold and unfold, the
   hazard chips change every cycle. Each of those pushes the board down after fitKiosk
   already sized it, which is how stations ended up off the bottom of the TV. Refit
   whenever the height of anything above the board changes. */
(function(){
  if(typeof ResizeObserver === 'undefined') return;
  let t = null;
  const ro = new ResizeObserver(()=>{
    if(!document.body.classList.contains('kiosk')) return;
    clearTimeout(t);
    t = setTimeout(()=>{ try{ fitKiosk(); }catch(e){} }, 150);
  });
  const arm = () => ['afdBody','hazards','alerts','warnbox','jawsBanner','sigmetBanner','sensorBanner','suntrack'].forEach(id=>{
    const n = document.getElementById(id); if(n) ro.observe(n);
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', arm) : arm();
})();
/* Paging only exists because Large deliberately overflows. It scrolls the board a screenful
   at a time and returns to the top, so nothing is lost, it just takes a few seconds longer. */
let tvPageTimer = null;
function tvPageSync(){
  const el = document.getElementById(curView === 'detail' ? 'master' : 'cardsWrap');
  if(tvPageTimer){ clearInterval(tvPageTimer); tvPageTimer = null; }
  document.body.classList.toggle('tvpage', !!(document.body.classList.contains('kiosk') && tvBig()));
  if(!document.body.classList.contains('kiosk') || !tvBig() || !el) return;
  tvPageTimer = setInterval(()=>{
    if(!document.body.classList.contains('kiosk') || !tvBig()){ clearInterval(tvPageTimer); tvPageTimer = null; return; }
    const doc = document.scrollingElement || document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if(max <= 8) return;                       // it all fits, nothing to page
    const next = doc.scrollTop + window.innerHeight - 40;
    doc.scrollTo({top: next > max - 8 ? 0 : next, behavior:'smooth'});
  }, TV_PAGE_MS);
}
function fitKiosk(){
  const ids = { cards:'cardsWrap', detail:'master', grid:'gridWrap' };
  Object.values(ids).forEach(id=>{ const n = document.getElementById(id); if(n) n.style.zoom = ''; });
  if(!document.body.classList.contains('kiosk')) return;
  const el = document.getElementById(ids[curView] || 'cardsWrap');
  if(!el) return;
  // never shrink below the normal desktop size; if a view genuinely cannot fit, let it scroll
  const floor = tvBig() ? TV_BIG_MIN_ZOOM : (curView === 'cards' ? 0.35 : 0.5);
  const bisect = () => {
    el.style.zoom = '1';
    const top = el.getBoundingClientRect().top;
    const avail = Math.max(240, window.innerHeight - top - 8);
    if(el.getBoundingClientRect().height <= 0) return null;
    let lo = floor, hi = 6, best = floor;
    for(let i = 0; i < 11; i++){
      const mid = (lo + hi) / 2;
      el.style.zoom = String(mid);
      if(el.getBoundingClientRect().height <= avail){ best = mid; lo = mid; }
      else { hi = mid; }
    }
    return best;
  };
  /* On the wall the enemy of readable text is TAF depth: three periods wrap the TAF
     onto a second line on half the stations, every card grows a line, and the fit
     shrinks all sixteen stations to pay for it. So detail gives way before text
     size: try the full three periods, and if the resulting zoom would be squint
     territory, drop to two periods, then to just the period in force. The desk
     view is untouched and the full TAF is always one click away. */
  const TV_READABLE_ZOOM = 0.62;
  document.body.classList.remove('tvtaf2','tvtaf1');
  let best = bisect();
  if(best === null) return;
  if(curView === 'cards' && !tvBig()){
    let kept = '';
    for(const lv of ['tvtaf2','tvtaf1']){
      if(best >= TV_READABLE_ZOOM) break;
      document.body.classList.remove('tvtaf2','tvtaf1');
      document.body.classList.add(lv);
      const b2 = bisect();
      if(b2 === null) break;
      if(b2 <= best + 0.01){            // trimming bought nothing, keep the deeper detail
        document.body.classList.remove('tvtaf2','tvtaf1');
        if(kept) document.body.classList.add(kept);
        bisect();
        break;
      }
      best = b2; kept = lv;
    }
  }
  // Large means the floor wins even when the content spills past the bottom; paging covers it
  el.style.zoom = String(Math.round(Math.max(best, floor) * 1000) / 1000);
  // Settling the zoom changes how much CSS width the layout has, and the expanded-row
  // graphs were drawn at an explicit pixel width from the pre-zoom number. One corrective
  // redraw, guarded so it cannot loop.
  if(curView === 'detail' && !fitKiosk._again && window.lastPer && Object.keys(window.lastPer).length && typeof renderMaster === 'function'){
    if(Math.abs((el.clientWidth || 0) - (window.__mlW || 0)) > 40){
      fitKiosk._again = true;
      try{ renderMaster(window.lastPer); fitKiosk(); }
      finally{ fitKiosk._again = false; }
    }
  }
}
/* Front-plate visibility for the two stations that have no certified observation at all.
   It has to read as an estimate at a glance, so the number carries the EST chip, the source
   camera, its confidence and its age, rather than sitting there looking like a METAR. */
function veiaFrontHTML(w){
  if(!w || !w.veia) return null;
  const v = w.veia;
  const low = v.conf !== null && v.conf < 60;
  const tip = `Estimated by the FAA camera VEIA product at ${(camSiteList().find(c=>c.id===STATION_CAM[w.icao])||{}).name || 'the on-field camera'}, `
    + `confidence ${v.conf===null?'unstated':Math.round(v.conf)+'%'}, read ${fmtLZ(v.t)}. `
    + `This station has no METAR or MADIS, so the camera is the only visibility source. Advisory, not a certified observation.`;
  return `<span title="${esc(tip)}" style="cursor:help;white-space:nowrap">`
    + cv(visTxt(v.vis)+'sm', visBand(v.vis))
    + ` <span class="estchip">EST</span>`
    + (v.sky ? ` <span style="color:var(--mut)">${esc(v.sky)}</span>` : '')
    + (v.conf !== null ? ` <span style="color:${low?'var(--amber)':'var(--mut)'};font-size:10.5px">conf ${Math.round(v.conf)}%</span>` : '')
    + (v.crowd ? ' <span style="color:var(--amber);font-size:10.5px">crowdsourced</span>' : '')
    + `</span>`;
}
/* Sections inside an expanded station fold independently. An open Juneau row is a screenful
   of METAR, MADIS, TAF, NOTAMs, camera and graphs, and most of the time a dispatcher wants
   one of those. The choice is a preference, not per station, so it is remembered globally.
   Anything that would be hidden while it matters keeps a marker on its collapsed header. */
const SEC_DEFAULT_OPEN = ['METAR','MADIS','TAF','NOTAM','VEIA','CAMERA','TREND'];
/* Fold or unfold every section at once. Discovering seven separate carets is a lot to ask,
   and most of the time the choice is all-or-nothing anyway. */
function allSectionsOpen(){
  return ['METAR','MADIS','TAF','NOTAM','VEIA','CAMERA','TREND'].some(k=>secOpen(k));
}
function foldAllSections(){
  const collapse = allSectionsOpen();
  secOpen('METAR');
  ['METAR','MADIS','TAF','NOTAM','VEIA','CAMERA','TREND'].forEach(k=>{ state.secOpen[k] = !collapse; });
  try{ localStorage.setItem('wxb_sections', JSON.stringify(state.secOpen)); }catch(e){}
  const b = document.getElementById('foldBtn');
  if(b) b.textContent = collapse ? 'expand sections' : 'fold sections';
  if(window.lastPer) renderMaster(window.lastPer);
}
function secOpen(key){
  if(!state.secOpen){
    try{ state.secOpen = JSON.parse(localStorage.getItem('wxb_sections') || 'null'); }catch(e){ state.secOpen = null; }
    if(!state.secOpen || typeof state.secOpen !== 'object'){
      state.secOpen = {};
      ['METAR','MADIS','TAF','NOTAM','VEIA','CAMERA','TREND','RUNWAY'].forEach(k=>{
        state.secOpen[k] = SEC_DEFAULT_OPEN.includes(k);
      });
    }
  }
  return state.secOpen[key] !== false;
}
function toggleSec(key){
  secOpen(key);
  state.secOpen[key] = !secOpen(key);
  try{ localStorage.setItem('wxb_sections', JSON.stringify(state.secOpen)); }catch(e){}
  if(window.lastPer) renderMaster(window.lastPer);
}
/* A short marker shown on a collapsed header so folding never hides something that matters. */
function secBadge(key, icao){
  const list = (state.notams||{})[icao] || [];
  if(key === 'NOTAM'){
    if(!list.length) return '<span style="color:var(--mut)">none on file</span>';
    const c = list.filter(n=>n.cat==='closure').length, a = list.filter(n=>n.cat==='approach').length;
    const w = list.filter(n=>n.cat==='wip' || n.cat==='airspace').length;
    const bits = [];
    if(c) bits.push(`<b style="color:var(--ifr)">${c} closure${c>1?'s':''}</b>`);
    if(a) bits.push(`<b style="color:var(--ifr)">${a} approach</b>`);
    if(w) bits.push(`<b style="color:var(--amber)">${w} wip or airspace</b>`);
    bits.push(`<span style="color:var(--mut)">${list.length} total</span>`);
    return bits.join(' \u00b7 ');
  }
  if(key === 'METAR'){
    const m = state.metars[icao];
    return m ? '' : '<span style="color:var(--mut)">none</span>';
  }
  return '';
}
function secRow(key, icao, cls, bodyHTML, wrap){
  if(bodyHTML === null || bodyHTML === undefined) return '';
  const open = secOpen(key);
  const tag = `<span class="mtag sectag" data-sec="${key}" title="Click to ${open?'fold':'unfold'} the ${key} section at every airport">`
    + `<span class="seccaret">${open?'\u25be':'\u25b8'}</span>${key}</span>`;
  if(!open){
    const badge = secBadge(key, icao);
    return `<div class="ml ${cls} secfold"><span></span><span></span><span></span>${tag}`
      + `<span class="mdata" style="color:var(--mut);font-size:11px">${badge || 'hidden'}</span></div>`;
  }
  return `<div class="ml ${cls}"><span></span><span></span><span></span>${tag}${wrap ? wrap(bodyHTML) : bodyHTML}</div>`;
}
/* Line one of the row: who this is and when each feed last moved. The TAF update time sits
   next to the METAR update time because they answer the same question, "how current is what
   I am reading", and having them at opposite ends of the row was the main thing making it
   hard to read. */
/* The cameras worth a glance on the way out of here, as links only. The full camera line
   with readings stays in the expanded window; this is just the quick look. */
function camLinksShort(icao){
  const own = STATION_CAM[icao];
  const ties = camSiteList().filter(c=>c.affects.includes(icao) && c.id !== own).slice(0, 3);
  if(!ties.length) return '';
  return ties.map(c=>`<a href="${CAM_LINK(c.id)}" target="_blank" class="camlink camshort" title="Open the FAA camera at ${esc(c.name)} in a new tab">${esc(c.name)}</a>`).join('');
}
/* Each feed labelled with its own age, so it is never ambiguous which reading came from
   where or how old it is. An observation past its issue cycle is called expired outright
   rather than left for the reader to work out from the clock. */
function feedStamp(label, t, expired, colour, tip){
  if(!t) return '';
  const age = agoTxt(t).replace(' ago','');
  return `<b${tip ? ` data-hovertip="${tip}" title="Hover or tap to see the recent history"` : ''} style="color:${expired ? 'var(--ifr)' : (colour || 'var(--ink)')}${tip ? ';cursor:help;border-bottom:1px dotted #46596d' : ''}">${label}</b>`
    + `<span class="fstamp" style="color:${expired ? 'var(--ifr)' : '#c9d7e4'}"> ${fmtLZ(t)} <span style="color:${expired ? 'var(--ifr)' : 'var(--mut)'}">(${age})</span>${expired ? ' EXPIRED' : ''}:</span>`;
}
function srcLineHTML(st, w, srcTag){
  const t = state.tafs[st.icao];
  const seen = tafSeen()[st.icao];
  let taf;
  if(!t || !t.issueTime){
    taf = '<span style="color:var(--mut)">no TAF</span>';
  } else {
    const changed = seen && seen.at ? seen.at/1000 : null;
    const at = changed || t.issueTime;
    const recent = changed && (Date.now() - changed*1000) < 60*60000;
    taf = `<span style="color:${recent?'var(--mvfr)':'var(--mut)'}">TAF ${changed?'updated':'issued'}: `
        + `<b>${fmtLZ(at)}</b> (${agoTxt(at).replace(' ago','')})</span>`;
  }
  return `<span class="srcline">${srcTag}</span>`;
}
/* MADIS and the METAR come from the same observation stream through different routes, and IEM
   lags AWC. So the MADIS line is regularly an EARLIER observation, not a second opinion. Shown
   side by side without saying so, a superseded 1.75sm sits next to a current 6sm and reads as
   two sources disagreeing. Mark it for what it is. */
function madisSuperseded(icao){
  const m = (state.metars||{})[icao], md = (state.madis||{})[icao];
  if(!m || !md || !md.valid) return false;
  const mt = (m.obsTime || m.reportTime);
  if(!mt) return false;
  const dt = (typeof toDate === 'function') ? toDate(md.valid) : new Date(md.valid);
  if(!dt || !Number.isFinite(dt.getTime())) return false;
  return (mt * 1000) - dt.getTime() > 5*60000;      // more than five minutes behind the METAR
}
function nowLineParts(st, w){
    const o = w.obs || {};
    const visEst = !!(o.estimated || o.visEstimated);
    const m = state.metars[st.icao];
    const md = state.madis[st.icao];
    const spread = (o.temp!==null&&o.temp!==undefined&&o.dewp!==null&&o.dewp!==undefined)?(o.temp-o.dewp):null;
    const tdCol = spread!==null && spread<1 ? 'var(--amber)' : 'var(--ink)';
    // freshest source wins the NOW line
    const mT = m ? toDate(m.obsTime||m.reportTime) : null;
    const dT = md ? toDate(md.valid) : null;
    const useMadis = !m && dT && (md.metar || md.syn);
    const src = useMadis ? (md.metar ? rawObParse(md.metar) : {clouds:[], vertVis:null, vis:md.vis, wdir:md.wdir??null, wspd:md.sknt||0, wgst:md.gust||0, temp:md.tmpc??null, dewp:md.dwpc??null, alti:md.alti??null}) : m;
    // fresh ob missing temp/dewpoint: carry forward the last METAR's values rather than showing gaps
    if(useMadis && src){
      if(m){
        if((src.dewp===null || src.dewp===undefined) && m.dewp!==null && m.dewp!==undefined) src.dewp = m.dewp;
        if((src.temp===null || src.temp===undefined) && m.temp!==null && m.temp!==undefined) src.temp = m.temp;
      }
      if(src.dewp===null || src.dewp===undefined || src.temp===null || src.temp===undefined){
        const cut6 = Date.now() - 6*3600000;
        const hist = seriesFor(st.icao).filter(p2=>p2.t > cut6).reverse();
        if(src.dewp===null || src.dewp===undefined){ const h = hist.find(p2=>p2.dewp!==null); if(h) src.dewp = h.dewp; }
        if(src.temp===null || src.temp===undefined){ const h = hist.find(p2=>p2.temp!==null); if(h) src.temp = h.temp; }
      }
    }
    const srcRaw = useMadis ? md.metar : (m ? m.rawOb : null);
    const srcT = useMadis ? md.valid : (m ? (m.obsTime||m.reportTime) : null);
    const srcAge = srcT && toDate(srcT) ? (Date.now() - toDate(srcT).getTime())/60000 : null;
    const expLimit = useMadis ? (md.syn ? 20 : 75) : 75;
    const isExpired = srcAge !== null && srcAge > expLimit;
    const srcTag = src ? `${isExpired?'<span style="color:var(--ifr);font-weight:800">EXPIRED</span> ':''}<span style="color:${isExpired?'var(--ifr)':(useMadis?'var(--amber)':'var(--ink)')};font-weight:700">${useMadis?(md.syn?'5-MIN':'MADIS'):'METAR'}</span> <span style="color:${isExpired?'var(--ifr)':(useMadis?'var(--amber)':'var(--mut)')}">${srcT?fmtLZ(srcT):''}</span> <span style="color:${isExpired?'var(--ifr)':'var(--mut)'};font-size:10px">${srcT?agoTxt(srcT).replace(' ago',''):''}</span>` : (w.veia
        ? `<span style="color:var(--amber);font-weight:700">VEIA</span> <span style="color:var(--amber)">${fmtLZ(w.veia.t)}</span> <span style="color:var(--mut);font-size:10px">${agoTxt(w.veia.t/1000).replace(' ago','')}</span>`
        : '<span style="color:var(--mut);font-weight:700">NO OBS</span>');
    const srcWx = useMadis ? (md.wx||[]) : (m ? wxTokens(m.wxString) : []);
    const srcVis = useMadis ? (src&&src.vis!==null?src.vis:md.vis) : (m ? parseVis(m.visib) : null);
    const sp0 = src && src.temp!==null && src.temp!==undefined && src.dewp!==null && src.dewp!==undefined ? (src.temp-src.dewp) : null;
    const tdCol0 = sp0===null ? 'var(--ink)' : (sp0 <= 1 ? 'var(--ifr)' : (sp0 <= 2 ? 'var(--amber)' : 'var(--ink)'));
    const metarPartsArr = src ? [
        srcVis!==null?cv(visTxt(srcVis)+'sm', visBand(srcVis)) + (visEst?' <span class="estchip" title="Estimated by the FAA camera VEIA product, not a certified observation. This station has no METAR or MADIS.">EST</span>':'') :
          (visEst && o.vis!==null && o.vis!==undefined ? cv(visTxt(o.visRaw??o.vis)+'sm', visBand(o.vis)) + ' <span class="estchip" title="Estimated by the FAA camera VEIA product, not a certified observation. This station has no METAR or MADIS.">EST</span>' : null),
        (src.clouds&&src.clouds.length)||src.vertVis!==null&&src.vertVis!==undefined ? layersHTML(src.clouds, src.vertVis) : (useMadis&&md.cig!==null?cv('CIG '+md.cig.toLocaleString(), cigBand(md.cig)):layersHTML(src.clouds, src.vertVis)),
        windHTML(st.icao, src.wdir, src.wspd, src.wgst),
        windCompHTML(st.icao, src.wdir, src.wspd, src.wgst),
        src.temp!==null&&src.temp!==undefined?`<span style="color:${tdCol0}">${src.temp}/${src.dewp!==null&&src.dewp!==undefined?src.dewp:'?'}\u00b0C \u00b7 ${Math.round(src.temp*9/5+32)}/${src.dewp!==null&&src.dewp!==undefined?Math.round(src.dewp*9/5+32):'?'}\u00b0F</span>`:null,
      ] : null;
    const metarLine = metarPartsArr ? metarPartsArr.filter(Boolean).map((x,i)=>`<span data-part="${i}">${x}</span>`).join(' &nbsp;') 
      : [
        veiaFrontHTML(w),
        o.unofficial ? `MXAK ${windHTML(st.icao, o.wdir, o.wspd, o.wgst)} <span style="color:var(--mut)">wind only \u00b7 ${fmtLZ(o.t)}</span>` : null,
        (!o.unofficial && !w.veia) ? '<span style="color:var(--mut)">no observation</span>' : null,
      ].filter(Boolean).join(' &nbsp;');
    /* The altimeter, density altitude and pressure trend are not an observation of the sky,
       so they are pulled out of the weather string and given their own place on line three. */
    const presParts = src ? [
        densAltHTML(st.icao, {raw:srcRaw, temp:src.temp, alti:src.alti}),
        presTrendHTML(st.icao, (src.alti!==null&&src.alti!==undefined)?src.alti:altimFromRaw(srcRaw)),
      ].filter(Boolean).join(' &nbsp;') : '';
    const madisPartsArr = md ? [
        cv((md.vis===null?'?':visTxt(md.vis)+'sm'), visBand(md.vis)),
        (md.clouds && md.clouds.length) || (md.vertVis !== null && md.vertVis !== undefined)
          ? layersHTML(md.clouds, md.vertVis)
          : md.cig!==null?cv('CIG '+md.cig.toLocaleString(), cigBand(md.cig)):cv('clear','VFR'),
        windHTML(st.icao, (md.wdir === undefined ? null : md.wdir), md.sknt, md.gust),
        wxHTML(md.wx)
      ] : null;
    const madisLine = madisPartsArr ? madisPartsArr.filter(Boolean).join(' &nbsp;') : '<span style="color:var(--mut)">no MADIS</span>';
    const wrap = h => `<span class="mdata">${h}</span>`;
    const exTag = '<b style="color:var(--ifr);font-weight:800">EXPIRED</b> ';
    const mStale = mT ? (Date.now() - mT.getTime())/60000 > 75 : false;
    const dStale = dT ? (Date.now() - dT.getTime())/60000 > (md && md.syn ? 20 : 75) : false;
    const shownCat = (w.obsCat && w.obsCat !== 'NA') ? w.obsCat : w.cat;
    const fcstWorse = w.cat && shownCat && w.cat !== shownCat;
    return {catBadge2: catBadgeHTML(w),
      nowChip: '', chgChip:changeChip(st.icao), name:st.name, icao:st.icao, srcTag, metarLine,
      srcLine: nowCatChip(w),
      /* line two is the weather itself, line three everything that qualifies or restricts it */
      wxLine: (function(){
        const blocks = [];
        const mT = m ? (m.obsTime || m.reportTime) : null;
        const cell = (h, c) => `<span class="oc ${c}">${h || ''}</span>`;
        if(metarPartsArr){
          /* METAR on top, MADIS directly underneath, sharing columns:
             label | visibility | clouds | wind | everything else */
          const mp = metarPartsArr;
          const rest = mp.slice(3).filter(Boolean).join(' ');
          let grid = `<span class="orow">`
            + cell(feedStamp('METAR', mT, !!isExpired, undefined, 'obm-'+st.icao), 'oc-lbl')
            + cell(mp[0], 'oc-vis') + cell(mp[1], 'oc-sky') + cell(mp[2], 'oc-wind')
            + cell(rest + ' ' + changeChips(st.icao), 'oc-rest') + `</span>`;
          if(madisPartsArr && dT){
            const q = madisPartsArr;
            grid += `<span class="orow omadis">`
              + cell(feedStamp('MADIS', dT, false, undefined, 'obd-'+st.icao)
                + (madisSuperseded(st.icao) ? ` <span class="supersede" title="${esc('An earlier observation from the same stream as the METAR, not a separate reading.')}">SUPERSEDED</span>` : ''), 'oc-lbl')
              + cell(q[0], 'oc-vis') + cell(q[1], 'oc-sky') + cell(q[2], 'oc-wind')
              + cell([windCompHTML(st.icao, (md.wdir === undefined ? null : md.wdir), md.sknt || 0, md.gust || 0), q[3]].filter(Boolean).join(' '), 'oc-rest')
              + `</span>`;
          }
          blocks.push(`<span class="obsgrid">${grid}</span>`);
        } else {
          blocks.push(`<span class="feed">${feedStamp('METAR', mT, !!isExpired, undefined, 'obm-'+st.icao)} ${changeChips(st.icao)} ${metarLine}</span>`);
        }
        if(presParts) blocks.push(`<span class="feed presgrp">${presParts}</span>`);
        return blocks.join('');
      })(),
      /* MADIS and the forecast sit together on line three, the observation and the pressure
         group on line two, so each line answers one question. */
      fcstLine: (function(){
        const blocks = [];
        /* MADIS now sits on line two beside the METAR; keep the desk copy only when the
           observation line did not take it. */
        if(false && madisLine && !/no MADIS/i.test(madisLine) && dT)
          blocks.push(`<span class="feed altsrc">${feedStamp('MADIS', dT.getTime()/1000, false, 'var(--amber)')} ${madisLine}</span>`);
        const t = state.tafs[st.icao];
        if(t && t.issueTime){
          const seen = tafSeen()[st.icao];
          const at = (seen && seen.at) ? seen.at/1000 : t.issueTime;
          const gone = t.validTimeTo && (t.validTimeTo * 1000 < Date.now());
          blocks.push(`<span class="feed tafsrc" title="${esc(tafHoverText(st.icao) || 'No forecast text held.')}">`
            + `${feedStamp('TAF', at, !!gone, 'var(--mvfr)')} `
            + `${(tafStripHTML(st.icao, 4) || tafNowChip(st.icao) || '<span style="color:var(--mut)">no period in force</span>').replace(/>TAF /g, '>')}</span>`);
          const lm = lampChip(st.icao, true);
          if(lm) blocks.push(lm);
        } else {
          const lm = lampChip(st.icao);
          if(lm) blocks.push(lm);
        }
        /* Float destinations and the smaller strips have no terminal forecast at all, so the
           line simply omits it rather than carrying a permanent "none issued". */
        return blocks.join('');
      })(),
      /* Line one has room to the right, so the winds along the way and the cameras you would
         actually look at live there rather than crowding the restrictions on line three. */
      routeLine: cutChips(st) + camLinksShort(st.icao) + tideChip(st.icao),
      restLine: lastMoves(st.icao) + ''
        + minsChips(st.icao, o)
        + wxChip(st.icao, (o && o.wx) || []) + spreadChip(o) + gustChip(o) + lightChip(st),
      fcst: tafUpdChip(st.icao) + tafNowChip(st.icao),
      chips: closureChip(st.icao) + approachChip(st.icao) + wipChip(st.icao)
        + minsChips(st.icao, o) + cutChips(st) + tideChip(st.icao)
        + wxChip(st.icao, (o && o.wx) || []) + spreadChip(o) + gustChip(o) + lightChip(st), m, md, madisLine, mStale, dStale, exTag, wrap};
}
/* Sizes for the expanded-row graphs. These are drawn at explicit pixel widths, so the
   number has to match the space actually available or the drawing either overflows its
   cell or gets scaled down to a thumbnail by the mobile max-width rule. The old version
   assumed a 250px rail (really 322px now) and never went below 680px wide, which is why
   it broke on anything narrow. Below the breakpoint .ml is block, so the rail is gone and
   the graphs get the full width. */
/* clientWidth is CSS px, so on a zoomed container it already reports the width the layout
   actually has. That is the number the graphs must be drawn against. */
/* Phone layout. The old behaviour collapsed each row to flowing text below 900 px, which
   turned one Juneau row into most of a screen. Pan mode instead keeps the desktop row shape
   and lets it run off to the right, so the board reads like a spreadsheet you slide sideways.
   The badge, name and ICAO stay pinned to the left edge so you always know which field you
   are looking at while panning. */
const PAN_MIN_PX = 1180;
/* Three narrow-screen layouts, cycled by one button: pan slides sideways, tri gives each
   station a fixed three-line block, stack is the original full reflow. */
const PHONE_MODES = ['pan','tri','stack'];
function phoneMode(){
  if(state.phoneMode === undefined){
    /* Three-line is the default on a phone: it shows a station's whole picture without
       sliding. Pan is there for anyone who wants the full desktop row. */
    try{ state.phoneMode = localStorage.getItem('wxb_phone') || 'tri'; }catch(e){ state.phoneMode = 'tri'; }
    if(!PHONE_MODES.includes(state.phoneMode)) state.phoneMode = 'tri';
  }
  return state.phoneMode;
}
function panMode(){ return phoneMode() === 'pan'; }
function applyPhoneMode(){
  const m = phoneMode();
  document.body.classList.toggle('panmode', m === 'pan');
  document.body.classList.toggle('tri', m === 'tri');
  const b = document.getElementById('panBtn');
  if(b) b.textContent = 'phone: ' + (m === 'tri' ? '3 line' : m);
}
function setPhoneMode(m){
  state.phoneMode = PHONE_MODES.includes(m) ? m : 'pan';
  try{ localStorage.setItem('wxb_phone', state.phoneMode); }catch(e){}
  applyPhoneMode();
  if(window.lastPer) renderMaster(window.lastPer);
}
function cyclePhoneMode(){
  setPhoneMode(PHONE_MODES[(PHONE_MODES.indexOf(phoneMode()) + 1) % PHONE_MODES.length]);
}
function syncML(mEl){
  const w = (mEl && mEl.clientWidth) ? mEl.clientWidth : 1100;
  // in pan mode the row keeps its desktop shape and overflows sideways instead of reflowing
  if(mEl) mEl.classList.toggle('nml', w < 900 && !panMode());
  return (w < 900 && panMode()) ? PAN_MIN_PX : w;
}
function graphWidths(mEl){
  const RAIL = 50 + 88 + 42 + 118 + 24; // four fixed .ml columns plus gaps
  const w = syncML(mEl);
  const narrow = mEl ? mEl.classList.contains('nml') : false;
  /* Guessing this from #master minus a fudge factor was always going to drift: the row,
     the grid and the flex column each take a bite. renderMaster measures what the data
     column actually got and stores it, so from the second pass on this is exact. */
  const inner = Math.max(260, window.__mlAvail || (w - 34));
  /* Open rows no longer carry the label rail, and the graphs only ever appear in open
     rows, so there is no rail to subtract any more. Subtracting it left the graph block
     narrower than the full-width runway strip above it, which read as misaligned. */
  const sw = Math.min(1500, Math.max(300, inner));
  /* Three columns under the long graph: the wind rose is a fixed 172px square, then the
     stacked temp/wind pair, then the altimeter drawn tall enough to match that pair.
     PAD is the .wxbox horizontal padding plus border; GAP is the flex gap. */
  const PAD = 20, GAP = 10, ROSE = 172 + PAD;
  void RAIL;
  const rest = Math.max(200, sw - ROSE - GAP*2 - 8);
  const midCol = Math.floor(rest * 0.54);
  const boxW = narrow
    ? { sw, mid: sw - PAD, right: sw - PAD, tall: 88, stack: true }
    : { sw, mid: Math.max(170, midCol - PAD), right: Math.max(150, rest - midCol - PAD), tall: 88*2 + GAP + 22, stack: false };
  window.__mlW = w;
  return { sw, boxW };
}
function renderMaster(per){
  const opened = openSet();
  const mEl = document.getElementById('master');
  const { sw, boxW } = graphWidths(mEl);
  const rows = [...STATIONS].sort((a,b)=>a.name.localeCompare(b.name)).map(st=>{
    const w = per[st.icao];
    if(!w) return ''; // renderCards already guards this; a partial per used to throw here
    const P = nowLineParts(st, w);
    const shownCat = (w.obsCat && w.obsCat !== 'NA') ? w.obsCat : w.cat;
    const isOpen = opened.has(st.icao);
    return `<div class="mrow${isOpen?' open':''}" data-expand="${st.icao}" style="border-left-color:${catClr(shownCat)};background:${catBg(shownCat)}">
      <div class="ml m1">${P.catBadge2}<b class="mname">${P.name}</b><span class="mid">${P.icao}</span><span class="mtag" style="font-size:11px">${P.srcTag}</span><span class="mdata"><span class="rl rl1">${P.srcLine}<span class="routegrp">${P.routeLine}</span><span class="notamgrp">${sensorChip(st.icao)}${closureChip(st.icao)}${approachChip(st.icao)}${wipChip(st.icao)}</span><button class="panelbtn" data-panel="${st.icao}">limits / FRAT</button><span class="expicon">${isOpen?'\u25b2 less':'\u25bc more'}</span></span><span class="rl rl2">${P.wxLine}</span><span class="rl rl3">${P.fcstLine}${P.restLine}</span></span></div>
      ${secRow('METAR', st.icao, 'm2', (P.m ? `${P.mStale?P.exTag:''}<span style="color:${P.mStale?'var(--ifr)':'var(--amber)'};font-weight:700">${agoTxt(P.m.obsTime||P.m.reportTime).replace(' ago','')}</span> <span style="color:${P.mStale?'var(--ifr)':'var(--mut)'}">${esc(P.m.rawOb)}</span> <span class="fstamp" style="color:${P.mStale?'var(--ifr)':'var(--mut)'}">${fmtLZ(P.m.obsTime||P.m.reportTime)}</span>` : '<span style="color:var(--mut)">no METAR</span>'), P.wrap)}
      ${secRow('MADIS', st.icao, 'm2', ((P.md ? `<span style="color:${P.dStale?'var(--ifr)':'var(--amber)'};font-weight:700">${agoTxt(P.md.valid).replace(' ago','')}</span> ` : '') + (madisSuperseded(st.icao)
        ? `<span class="supersede" title="${esc('An earlier observation from the same stream as the METAR, not a separate reading. The METAR above is newer and supersedes it; the decoded values are on the observation line.')}">SUPERSEDED</span> ` + (P.md && P.md.metar ? `<span style="color:var(--mut)">${esc(P.md.metar)}</span> <span class="fstamp" style="color:var(--mut)">${fmtLZ(P.md.valid)}</span>` : P.madisLine)
        : (P.md && P.dStale ? P.exTag : '') + P.madisLine)), P.wrap)}
      ${secRow('TAF', st.icao, 'm3', tafGroupsHTML(st.icao), P.wrap)}
      ${secRow('NOTAM', st.icao, 'mn', notamRowHTML(st.icao), P.wrap)}
      ${secRow('VEIA', st.icao, 'mn', veiaLineHTML(st.icao), P.wrap)}
      ${secRow('CAMERA', st.icao, 'mn', camLineHTML(st.icao), P.wrap)}
      ${!secOpen('TREND') ? secRow('TREND', st.icao, 'mt', 'x') : `<div class="ml mt"><span></span><span></span><span></span><span class="mtag sectag" data-sec="TREND" title="Click to collapse this section everywhere"><span class="seccaret">\u25be</span>TREND</span><span class="mdata" style="flex-direction:column;align-items:flex-start"><span style="color:var(--mut);font-size:11px">${agesLine(st.icao)}</span><span style="font-size:10.5px;font-family:var(--mono)"><span style="color:var(--amber)">\u2500 cig obs</span> &nbsp;<span style="color:var(--mvfr)">\u2500 vis obs</span> &nbsp;<span style="color:var(--vfr)">\u254c clear</span> &nbsp;<span style="color:#f7cf8a">\u254c TAF cig</span> &nbsp;<span style="color:#9cc8ee">\u254c TAF vis</span></span>${sparkSVG(st.icao, sw, 140)}${wxRow(st.icao, boxW)}</span></div>`}
    </div>`;
  }).join('');
  document.getElementById('master').innerHTML = rows;
  // Measure the width the data column actually received and redraw once if graphWidths
  // guessed wrong, so the graphs and the runway strip land on exactly the same width.
  if(!renderMaster._again){
    const probe = mEl.querySelector('.mrow.open .mt .mdata') || mEl.querySelector('.mrow .m1 .mdata');
    if(probe){
      const z = parseFloat(mEl.style.zoom) || 1;
      const real = Math.round(probe.getBoundingClientRect().width / z);
      if(real > 120 && Math.abs(real - (window.__mlAvail || 0)) > 20){
        window.__mlAvail = real;
        renderMaster._again = true;
        try{ renderMaster(per); } finally { renderMaster._again = false; }
        return;
      }
    }
  }
}

/* ================= TIDES (NOAA CO-OPS) ================= */
function tideURL(id){
  const now = new Date();
  const d0 = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Juneau',year:'numeric',month:'2-digit',day:'2-digit'}).format(now).replace(/-/g,'');
  return `${TIDE_API}?product=predictions&datum=MLLW&station=${id}&time_zone=lst_ldt&units=english&interval=hilo&format=json&begin_date=${d0}&range=48`;
}
function tideSVG(preds, W, H){
  W=W||280; H=H||70;
  const parseT = t => { const g = new Date(t.replace(' ','T')+':00Z'); return new Date(g.getTime() - offsetMinutes('America/Juneau', g)*60000).getTime(); };
  const pts = preds.map(p2=>({t:parseT(p2.t), v:parseFloat(p2.v), type:p2.type})).sort((a,b)=>a.t-b.t);
  if(pts.length < 2) return '';
  const nowMs = Date.now();
  const t0 = nowMs - 4*3600000, t1 = nowMs + 20*3600000;
  const vis2 = pts.filter(p2=>p2.t >= t0 - 8*3600000 && p2.t <= t1 + 8*3600000);
  if(vis2.length < 2) return '';
  const vMin = Math.min(...vis2.map(p2=>p2.v)) - 1, vMax = Math.max(...vis2.map(p2=>p2.v)) + 1;
  const x = t => 6 + (W-12) * (t-t0)/(t1-t0);
  const y = v => 12 + (H-26) * (1 - (v-vMin)/(vMax-vMin));
  // cosine interpolation between extremes
  let d = '';
  for(let i=0;i<vis2.length-1;i++){
    const a = vis2[i], b = vis2[i+1];
    for(let k=0;k<=16;k++){
      const f = k/16;
      const tt = a.t + (b.t-a.t)*f;
      const vv = a.v + (b.v-a.v)*(1-Math.cos(Math.PI*f))/2;
      d += (d?' L ':'M ') + x(tt).toFixed(1) + ' ' + y(vv).toFixed(1);
    }
  }
  const marks = vis2.filter(p2=>p2.t>=t0&&p2.t<=t1).map(p2=>
    `<circle cx="${x(p2.t)}" cy="${y(p2.v)}" r="2.6" fill="${p2.type==='H'?'var(--mvfr)':'var(--amber)'}"/>
     <text x="${Math.min(Math.max(x(p2.t),18),W-18)}" y="${p2.type==='H'?y(p2.v)-5:y(p2.v)+12}" text-anchor="middle" font-size="8.5" fill="${p2.type==='H'?'var(--mvfr)':'var(--amber)'}" font-family="IBM Plex Mono">${p2.v.toFixed(1)}' ${fmtLZ(p2.t)}</text>`).join('');
  return `<svg width="100%" viewBox="0 0 ${W} ${H}" style="display:block">
    <path d="${d}" fill="none" stroke="#4d94c9" stroke-width="1.6"/>
    <line x1="${x(nowMs)}" y1="8" x2="${x(nowMs)}" y2="${H-8}" stroke="var(--amber)" stroke-width="1.4"/>
    ${marks}
  </svg>`;
}
function renderTides(){
  const el = document.getElementById('tides');
  el.innerHTML = TIDE_STNS.map(t=>{
    const d = (state.tides||{})[t.id];
    if(!d || !d.length) return `<div class="ext"><h3>${t.name}</h3><div class="meta">${t.verify?'no data, station id needs verify':'no data'}</div></div>`;
    const parseT = s2 => { const g = new Date(s2.replace(' ','T')+':00Z'); return new Date(g.getTime() - offsetMinutes('America/Juneau', g)*60000); };
    const nowMs = Date.now();
    const next = d.find(x=>parseT(x.t).getTime() > nowMs) || d[d.length-1];
    return `<div class="ext"><h3>${t.name} <span class="pill" style="background:${next.type==='H'?'var(--mvfr)':'var(--amber)'};color:#0c1116">${next.type==='H'?'HIGH':'LOW'} ${parseFloat(next.v).toFixed(1)}' ${inTxt(parseT(next.t))}</span></h3>
      ${tideSVG(d)}
    </div>`;
  }).join('');
}

/* ================= TREND SPARKLINE ================= */
const SPARK_DATA = {};
function smoothPath(runs){
  // runs: array of point-arrays [[x,y],...]; Catmull-Rom to bezier per run
  return runs.map(pts=>{
    if(pts.length === 1) return `M ${pts[0][0]} ${pts[0][1]} l 0.5 0`;
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for(let i=0;i<pts.length-1;i++){
      const p0 = pts[Math.max(i-1,0)], p1 = pts[i], p2 = pts[i+1], p3 = pts[Math.min(i+2,pts.length-1)];
      const c1x = p1[0]+(p2[0]-p0[0])/6, c1y = p1[1]+(p2[1]-p0[1])/6;
      const c2x = p2[0]-(p3[0]-p1[0])/6, c2y = p2[1]-(p3[1]-p1[1])/6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }).join(' ');
}
function runsOf(pts, val, x, y, maxGapMs){
  const runs = []; let cur = []; let prevT = null;
  pts.forEach(p=>{
    const v = val(p);
    if(v===null || v===undefined){ if(cur.length) runs.push(cur); cur=[]; prevT=null; return; }
    if(prevT !== null && maxGapMs && (p.t - prevT) > maxGapMs){ if(cur.length) runs.push(cur); cur=[]; }
    cur.push([+x(p.t).toFixed(1), +y(v).toFixed(1)]);
    prevT = p.t;
  });
  if(cur.length) runs.push(cur);
  return runs;
}
function sparkSVG(icao, W, H){
  const pts = seriesFor(icao);
  if(pts.length < 2) return '';
  W = W||860; H = H||140;
  const padL=44, padR=64, padT=18, padB=20;
  const GAP = 100*60000; // break lines across data gaps over 100 min
  const nowMs = Date.now();
  const t0 = pts[0].t, t1 = Math.max(pts[pts.length-1].t || t0+1, nowMs + 8*3600000);
  const x = t => padL + (W-padL-padR) * (t-t0) / Math.max(t1-t0, 1);
  // y scale includes TAF forecast ceilings so the outlook can never fly off the chart
  const taf = state.tafs[icao];
  const tafCigs = taf ? (taf.fcsts||[]).map(f=>ceilingOf(f.clouds, f.vertVis)).filter(c=>c!==null) : [];
  const cigMax = Math.max(3500, ...pts.map(p=>(p.cig===null||p.cig===-1)?0:Math.min(p.cig,10000)), ...tafCigs.map(c=>Math.min(c,10000)));
  const yC = c => padT + (H-padT-padB) * (1 - Math.min(c,10000)/cigMax);
  const yV = v => padT + (H-padT-padB) * (1 - Math.min(v,10)/10);
  const yClr = padT + 3;
  // night shading
  const st = STATIONS.find(z=>z.icao===icao);
  let night = '';
  if(st){
    const sun = sunAt(st.lat, st.lon, new Date(), 90.833);
    if(sun){
      const shade = (a,b)=>{ a=Math.max(a,t0); b=Math.min(b,t1); if(b>a) night += `<rect x="${x(a)}" y="${padT}" width="${x(b)-x(a)}" height="${H-padT-padB}" fill="#04070b" opacity="0.55"/>`; };
      shade(t0, sun.rise.getTime()); shade(sun.set.getTime(), t1);
      shade(t0, sun.rise.getTime()-86400000); shade(sun.set.getTime()-86400000, sun.rise.getTime());
      shade(sun.set.getTime(), sun.rise.getTime()+86400000);
    }
  }
  const thr = [[500,'var(--lifr)'],[1000,'var(--ifr)'],[3000,'var(--mvfr)']].filter(t=>t[0] < cigMax);
  const grid = thr.map(t=>`<line x1="${padL}" y1="${yC(t[0])}" x2="${W-padR}" y2="${yC(t[0])}" stroke="${t[1]}" stroke-width="0.6" opacity="0.3"/><text x="${padL-4}" y="${yC(t[0])+3}" text-anchor="end" font-size="9" fill="${t[1]}" opacity="0.85" font-family="IBM Plex Mono">${t[0]>=1000?t[0]/1000+'k':t[0]}</text>`).join('')
    + `<text x="${padL-4}" y="${yC(cigMax)+8}" text-anchor="end" font-size="9" fill="var(--amber)" opacity="0.8" font-family="IBM Plex Mono">${(cigMax/1000)}k</text>`
    + [[10,'10'],[5,'5'],[3,'3'],[1,'1']].map(v=>`<text x="${W-padR+3}" y="${yV(v[0])+3}" font-size="8.5" fill="var(--mvfr)" opacity="0.6" font-family="IBM Plex Mono">${v[1]}</text>`).join('');
  // observed: real ceilings amber, clear-sky segments green dashed along the top, vis blue
  const cigOnly = p => (p.cig===null || p.cig===-1) ? null : p.cig;
  const clrOnly = p => p.cig===-1 ? 1 : null;
  const cigRuns = runsOf(pts, cigOnly, x, yC, GAP);
  const clrRuns = runsOf(pts, clrOnly, x, ()=>yClr, GAP);
  const visRuns = runsOf(pts, p=>p.vis, x, yV, GAP);
  const cigPath = smoothPath(cigRuns);
  const visPath = smoothPath(visRuns);
  const clrPath = clrRuns.map(r=>r.length>1?`M ${r[0][0]} ${yClr} L ${r[r.length-1][0]} ${yClr}`:`M ${r[0][0]} ${yClr} l 2 0`).join(' ');
  let area = '';
  cigRuns.forEach(main=>{
    if(main.length > 2) area += `<path d="${smoothPath([main])} L ${main[main.length-1][0]} ${H-padB} L ${main[0][0]} ${H-padB} Z" fill="url(#spa_${icao})" opacity="0.9"/>`;
  });
  // TAF outlook
  const tafSegs = [];
  let tafCig = '', tafVis = '', tempoBits = '';
  if(taf){
    const base = (taf.fcsts||[]).filter(f=>!((f.fcstChange||'').startsWith('TEMPO')||f.probability));
    const tempo = (taf.fcsts||[]).filter(f=>(f.fcstChange||'').startsWith('TEMPO')||f.probability);
    let dC='', dV='';
    base.forEach(f=>{
      const a = Math.max(f.timeFrom*1000, nowMs), b = Math.min(f.timeTo*1000, t1);
      if(b <= a) return;
      const cg = ceilingOf(f.clouds, f.vertVis), vv = parseVis(f.visib);
      tafSegs.push({a,b,cig:cg,vis:vv,lbl:f.fcstChange||'BASE'});
      const yCg = cg!==null ? yC(cg) : yClr;
      dC += (dC?` L ${x(a).toFixed(1)} ${yCg.toFixed(1)}`:`M ${x(a).toFixed(1)} ${yCg.toFixed(1)}`) + ` L ${x(b).toFixed(1)} ${yCg.toFixed(1)}`;
      if(vv!==null) dV += (dV?` L ${x(a).toFixed(1)} ${yV(vv).toFixed(1)}`:`M ${x(a).toFixed(1)} ${yV(vv).toFixed(1)}`) + ` L ${x(b).toFixed(1)} ${yV(vv).toFixed(1)}`;
    });
    tempo.forEach(f=>{
      const a = Math.max(f.timeFrom*1000, nowMs), b = Math.min(f.timeTo*1000, t1);
      if(b <= a) return;
      const cg = ceilingOf(f.clouds, f.vertVis), vv = parseVis(f.visib);
      tafSegs.push({a,b,cig:cg,vis:vv,lbl:(f.fcstChange||'TEMPO')+(f.probability?' P'+f.probability:''), tempo:true});
      if(cg!==null) tempoBits += `<rect x="${x(a)}" y="${yC(cg)-2.5}" width="${x(b)-x(a)}" height="5" fill="var(--amber)" opacity="0.25" rx="2.5"/>`;
      if(vv!==null) tempoBits += `<rect x="${x(a)}" y="${yV(vv)-2.5}" width="${x(b)-x(a)}" height="5" fill="var(--mvfr)" opacity="0.22" rx="2.5"/>`;
    });
    tafCig = dC ? `<path d="${dC}" fill="none" stroke="#f7cf8a" stroke-width="1.8" opacity="0.85" stroke-linejoin="round" stroke-dasharray="2 5" stroke-linecap="round"/>` : '';
    tafVis = dV ? `<path d="${dV}" fill="none" stroke="#9cc8ee" stroke-width="1.6" opacity="0.8" stroke-linejoin="round" stroke-dasharray="2 5" stroke-linecap="round"/>` : '';
  }
  // category-change dots
  let prevCat = null, dots = '';
  pts.forEach(p=>{
    if(p.cig===null && p.vis===null) return;
    const cat = flightCat(p.cig===-1?null:p.cig, p.vis);
    if(cat !== prevCat){
      const yy = p.cig!==null ? (p.cig===-1?yClr:yC(p.cig)) : yV(p.vis);
      dots += `<circle cx="${x(p.t).toFixed(1)}" cy="${yy.toFixed(1)}" r="3.2" fill="${catClr(cat)}" stroke="#0a0f14" stroke-width="1"/>`;
      prevCat = cat;
    }
  });
  // endpoint chips, stacked so they never collide
  const last = [...pts].reverse().find(p=>p.cig!==null || p.vis!==null) || pts[pts.length-1];
  let chipYs = [];
  const chipY = want => { let yy = want; while(chipYs.some(o=>Math.abs(o-yy)<13)) yy += 13; chipYs.push(yy); return yy; };
  const cigChipTxt = last.cig===-1?'CLR':(last.cig===null?'':(last.cig>=1000?(last.cig/1000)+'k':last.cig)+'ft');
  const chips = `${last.cig!==null?`<text x="${W-padR+16}" y="${chipY((last.cig===-1?yClr:yC(last.cig)))+3}" font-size="10.5" font-weight="700" fill="${last.cig===-1?'var(--vfr)':catClr(cigBand(last.cig))}" font-family="IBM Plex Mono">${cigChipTxt}</text>`:''}
    ${last.vis!==null?`<text x="${W-padR+16}" y="${chipY(yV(last.vis))+3}" font-size="10.5" font-weight="700" fill="${catClr(visBand(last.vis))}" font-family="IBM Plex Mono">${visTxt(last.vis)}sm</text>`:''}`;
  SPARK_DATA[icao] = {t0, t1, padL, padR, padT, padB, W, H, pts, tafSegs, nowMs};
  return `<svg class="spark" data-spark="${icao}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" onmousemove="sparkMove(event,'${icao}')" onmouseleave="sparkLeave(event)">
    <defs>
      <linearGradient id="spa_${icao}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2a93b" stop-opacity="0.20"/><stop offset="100%" stop-color="#f2a93b" stop-opacity="0.02"/></linearGradient>
    </defs>
    ${night}${grid}
    <line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="var(--line)"/>
    ${area}
    <path d="${clrPath}" fill="none" stroke="var(--vfr)" stroke-width="2" stroke-dasharray="5 4" opacity="0.9"/>
    <path d="${cigPath}" fill="none" stroke="var(--amber)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="${visPath}" fill="none" stroke="var(--mvfr)" stroke-width="1.7" stroke-linecap="round"/>
    ${tafCig}${tafVis}${tempoBits}
    <line x1="${x(nowMs)}" y1="${padT-4}" x2="${x(nowMs)}" y2="${H-padB}" stroke="var(--amber)" stroke-width="1.2" opacity="0.9"/>
    <text x="${x(nowMs)}" y="${padT-6}" text-anchor="middle" font-size="9" fill="var(--amber)" font-family="IBM Plex Mono">NOW</text>
    <line class="xh" x1="0" y1="${padT}" x2="0" y2="${H-padB}" stroke="#e9f0f6" stroke-width="0.8" opacity="0.55" visibility="hidden"/>
    ${dots}${chips}
    ${(function(){
      let ticks2 = '';
      const start = new Date(t0); start.setUTCMinutes(0,0,0);
      for(let tt = start.getTime(); tt <= t1; tt += 3600000){
        const lm = localMins(new Date(tt));
        if(lm % 120 !== 0) continue;
        if(tt < t0 + 20*60000 || tt > t1 - 20*60000) continue;
        ticks2 += `<line x1="${x(tt)}" y1="${H-padB}" x2="${x(tt)}" y2="${H-padB+4}" stroke="var(--mut)" stroke-width="0.8"/><text x="${x(tt)}" y="${H-5}" text-anchor="middle" font-size="9" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(tt).replace(/:\d\dL/,'L')}</text>`;
      }
      return ticks2;
    })()}
    <text x="${padL}" y="${H-5}" font-size="9.5" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(t0)}</text>
    <text x="${W-padR}" y="${H-5}" text-anchor="end" font-size="9.5" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(t1)}</text>
    <rect x="${padL}" y="${padT}" width="${W-padL-padR}" height="${H-padT-padB}" fill="transparent" style="cursor:crosshair"/>
  </svg>`;
}

const SPARKWX_DATA = {};
function sparkWxBox(icao, kind, W, H){
  const pts = seriesFor(icao);
  if(pts.length < 2) return '';
  W = W||272; H = H||88;
  const padL=36, padR=38, padT=8, padB=16;
  const GAP = 100*60000;
  const nowMs = Date.now();
  const t0 = pts[0].t, t1 = Math.max(pts[pts.length-1].t || t0+1, nowMs);
  const x = t => padL + (W-padL-padR) * (t-t0) / Math.max(t1-t0, 1);
  const defs = {
    td:   {title:'TEMP / DEWPOINT \u00b0C', minSpan:4, fmt:v=>Math.round(v), series:[
            {val:p=>p.temp, color:'#e8746a', w:1.8, unit:'\u00b0'},
            {val:p=>p.dewp, color:'#5ec8b7', w:1.6, unit:'\u00b0'}]},
    wind: {title:'WIND / GUST KT', minSpan:6, fmt:v=>Math.round(v), series:[
            {val:p=>p.ws, color:'#cfdbe6', w:1.8, unit:''},
            {val:p=>(p.wg&&p.wg>0)?p.wg:null, color:'var(--amber)', w:1.4, dash:'4 3', unit:''}]},
    alt:  {title:'ALTIMETER INHG', minSpan:0.12, fmt:v=>v.toFixed(2), series:[
            {val:p=>p.pres, color:'#c9a6e8', w:1.8, unit:''}]},
  };
  const cfg = defs[kind];
  const vals = cfg.series.flatMap(sr=>pts.map(p=>sr.val(p)).filter(v=>v!==null&&v!==undefined));
  SPARKWX_DATA[icao] = SPARKWX_DATA[icao] || {};
  SPARKWX_DATA[icao][kind] = {t0, t1, W, H, padL, padR};
  if(!vals.length) return `<svg class="sparkwx" data-wx="${icao}:${kind}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><text x="${padL}" y="${H/2}" font-size="10" fill="var(--mut)" font-family="IBM Plex Mono">collecting data...</text></svg>`;
  let vMin = Math.min(...vals), vMax = Math.max(...vals);
  if(vMax - vMin < cfg.minSpan){ const mid=(vMax+vMin)/2; vMin=mid-cfg.minSpan/2; vMax=mid+cfg.minSpan/2; }
  const y = v => padT + (H-padT-padB) * (1 - (v-vMin)/(vMax-vMin));
  let body = `<line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="var(--line)"/>
    <text x="${padL-4}" y="${y(vMax)+4}" text-anchor="end" font-size="8.5" fill="var(--mut)" font-family="IBM Plex Mono">${cfg.fmt(vMax)}</text>
    <text x="${padL-4}" y="${y(vMin)+2}" text-anchor="end" font-size="8.5" fill="var(--mut)" font-family="IBM Plex Mono">${cfg.fmt(vMin)}</text>`;
  const start = new Date(t0); start.setUTCMinutes(0,0,0);
  for(let tt = start.getTime(); tt <= t1; tt += 3600000){
    if(localMins(new Date(tt)) % 360 !== 0) continue;
    if(tt < t0 + 30*60000 || tt > t1 - 30*60000) continue;
    body += `<line x1="${x(tt)}" y1="${H-padB}" x2="${x(tt)}" y2="${H-padB+3}" stroke="var(--mut)" stroke-width="0.7"/><text x="${x(tt)}" y="${H-5}" text-anchor="middle" font-size="8.5" fill="var(--mut)" font-family="IBM Plex Mono">${fmtLZ(tt).replace(/:\d\dL/,'L')}</text>`;
  }
  cfg.series.forEach(sr=>{
    const runs = runsOf(pts, sr.val, x, y, GAP);
    if(!runs.length) return;
    body += `<path d="${smoothPath(runs)}" fill="none" stroke="${sr.color}" stroke-width="${sr.w}" ${sr.dash?`stroke-dasharray="${sr.dash}"`:''} stroke-linecap="round"/>`;
    const lastP = [...pts].reverse().find(p=>sr.val(p)!==null && sr.val(p)!==undefined);
    if(lastP) body += `<text x="${W-padR+3}" y="${y(sr.val(lastP))+3}" font-size="9.5" font-weight="700" fill="${sr.color}" font-family="IBM Plex Mono">${cfg.fmt(sr.val(lastP))}${sr.unit}</text>`;
  });
  body += `<line x1="${x(nowMs)}" y1="${padT}" x2="${x(nowMs)}" y2="${H-padB}" stroke="var(--amber)" stroke-width="1" opacity="0.7"/>
    <line class="wxh" x1="0" y1="${padT}" x2="0" y2="${H-padB}" stroke="#e9f0f6" stroke-width="0.8" opacity="0.5" visibility="hidden"/>`;
  return `<svg class="sparkwx" data-wx="${icao}:${kind}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" onmousemove="wxMove(event,'${icao}','${kind}')" onmouseleave="wxLeave(event)" style="cursor:crosshair;display:block">${body}</svg>`;
}
function wxRow(icao, boxW){
  const b = (typeof boxW === 'object' && boxW) ? boxW : {sw:boxW, mid:boxW, right:boxW, tall:88, stack:false};
  return `<span class="wxwrap">${runwayBoxHTML(icao)}<span class="wxrow${b.stack?' stacked':''}" data-wxrow="${icao}">
    <span class="wxcol">
      <span class="wxbox" data-panel="${icao}" style="cursor:pointer"><h4>WIND LIMITS \u00b7 tap for full FRAT</h4>${roseSVG(icao, 172)}</span>
    </span>
    <span class="wxcol">
      <span class="wxbox"><h4>TEMP / DEWPOINT \u00b0C</h4>${sparkWxBox(icao,'td',b.mid)}</span>
      <span class="wxbox"><h4>WIND / GUST KT</h4>${sparkWxBox(icao,'wind',b.mid)}</span>
    </span>
    <span class="wxcol">
      <span class="wxbox"><h4>ALTIMETER INHG</h4>${sparkWxBox(icao,'alt',b.right,b.tall)}</span>
    </span>
  </span></span>`;
}
function wxMove(e, icao, kind){
  const D = (SPARKWX_DATA[icao]||{})[kind];
  if(!D) return;
  const svg = e.currentTarget;
  const r = svg.getBoundingClientRect();
  const fx = (e.clientX - r.left) * (D.W / r.width);
  if(fx < D.padL || fx > D.W - D.padR){ wxLeave(e); return; }
  const frac = (fx - D.padL) / (D.W - D.padL - D.padR);
  const t = D.t0 + frac * (D.t1 - D.t0);
  // synced crosshair across the sibling boxes
  const row = svg.closest('[data-wxrow]');
  if(row) row.querySelectorAll('svg.sparkwx').forEach(sv=>{
    const ln = sv.querySelector('.wxh');
    if(!ln) return;
    const px = D.padL + frac * (D.W - D.padL - D.padR);
    ln.setAttribute('x1', px); ln.setAttribute('x2', px); ln.setAttribute('visibility','visible');
  });
  const need = kind==='td' ? (p=>p.temp!==null) : kind==='wind' ? (p=>p.ws!==null) : (p=>p.pres!==null);
  let best = null, bd = Infinity;
  seriesFor(icao).filter(need).forEach(p=>{ const d2 = Math.abs(p.t - t); if(d2 < bd){ bd = d2; best = p; } });
  if(!best || bd > 90*60000){ sparkTip.innerHTML = `<b style="color:var(--amber)">${fmtLZ(t)}</b> <span style="color:var(--mut)">no ${kind==='td'?'temp':kind==='wind'?'wind':'altimeter'} ob near here</span>`; sparkTip.style.display='block'; }
  else {
    sparkTip.innerHTML = `<b style="color:var(--amber)">${fmtLZ(best.t)}</b>`
      + (kind==='td' ? `  temp <span style="color:#e8746a">${best.temp}\u00b0</span> dp <span style="color:#5ec8b7">${best.dewp!==null?best.dewp:'?'}\u00b0</span>${best.temp!==null&&best.dewp!==null?' <span style="color:var(--mut)">spread '+(Math.round((best.temp-best.dewp)*10)/10)+'\u00b0</span>':''}`
      : kind==='wind' ? `  wind <span style="color:#cfdbe6">${best.ws} kt</span>${best.wg?' gust <span style="color:var(--amber)">'+best.wg+' kt</span> <span style="color:var(--mut)">factor '+(best.wg-best.ws)+'</span>':''}`
      : `  altimeter <span style="color:#c9a6e8">A${best.pres.toFixed(2)}</span>`);
  }
  sparkTip.style.display='block';
  let xx = e.clientX + 14, yy = e.clientY - 34;
  const tr = sparkTip.getBoundingClientRect();
  if(xx + tr.width > window.innerWidth - 8) xx = e.clientX - tr.width - 14;
  sparkTip.style.left = xx+'px'; sparkTip.style.top = Math.max(6,yy)+'px';
}
function wxLeave(e){
  sparkTip.style.display='none';
  const svg = e && e.currentTarget;
  const row = svg && svg.closest ? svg.closest('[data-wxrow]') : null;
  if(row) row.querySelectorAll('.wxh').forEach(ln=>ln.setAttribute('visibility','hidden'));
}

/* ================= DAY AT A GLANCE HEATMAP ================= */
function renderHeat(){
  const el = document.getElementById('heat');
  if(!el) return;
  const now = Date.now();
  const t0 = now - 24*3600000;
  const cells = 48;
  const glow = cat => (cat==='LIFR'||cat==='IFR') ? `box-shadow:0 0 7px ${cat==='LIFR'?'rgba(200,80,220,.55)':'rgba(226,87,75,.5)'};` : '';
  const hdr = ['<span class="hlbl"></span>'];
  for(let i=0;i<cells;i++){
    const t = t0 + i*1800000;
    const lm = localMins(new Date(t));
    const onHour2 = lm % 120 < 30;
    hdr.push(`<span class="hcell hhr">${onHour2 ? fmtLZ(t).replace(/:\d\dL/,'') : ''}</span>`);
  }
  const rows = [...STATIONS].sort((a,b)=>a.name.localeCompare(b.name)).map(st=>{
    const pts = seriesFor(st.icao);
    const w = (window.lastPer||{})[st.icao] || {};
    const row = [`<span class="hlbl" data-panel="${st.icao}" style="cursor:pointer">${st.name} <span style="color:${catClr(w.cat)};font-size:10px;font-weight:700">${w.cat||''}</span></span>`];
    for(let i=0;i<cells;i++){
      const a = t0 + i*1800000, b = a + 1800000;
      const bucket = pts.filter(p=>p.t>=a && p.t<b && (p.cig!==null || p.vis!==null));
      let cat = null;
      bucket.forEach(p=>{
        const c = flightCat(p.cig===-1?null:p.cig, p.vis);
        if(cat===null || (CAT_ORDER[c]??-1) > (CAT_ORDER[cat]??-1)) cat = c;
      });
      const gline = (localMins(new Date(a)) % 240 < 30) ? 'border-left:1px solid #2b3d52;' : '';
      const clr = cat ? catClr(cat) : '#10161f';
      row.push(`<span class="hcell" style="background:${clr};${cat?glow(cat):''}${gline}" data-h="${st.icao}|${a}"></span>`);
    }
    return row.join('');
  }).join('');
  const legend = `<div style="display:flex;gap:10px;align-items:center;margin-top:8px;font-family:var(--mono);font-size:11px">
    <span style="color:var(--mut)">ending ${fmtLZ(now)} \u2192</span>
    ${['VFR','MVFR','IFR','LIFR'].map(c=>`<span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;border-radius:3px;background:${catClr(c)};display:inline-block"></span><span style="color:${catClr(c)};font-weight:700">${c}</span></span>`).join('')}
    <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;border-radius:3px;background:#10161f;border:1px solid var(--line);display:inline-block"></span><span style="color:var(--mut)">no data</span></span>
    <span style="color:var(--mut)">\u00b7 worst category in each half hour \u00b7 click a name for its panel</span>
  </div>`;
  el.innerHTML = `<div class="heatgrid">${hdr.join('')}${rows}</div>` + legend;
}

/* ================= LIMITS PANEL ================= */
function arcTxt(a){ return (a.f===0&&a.t===360) ? 'all directions' : `${String(a.f).padStart(3,'0')}\u00b0-${String(a.t).padStart(3,'0')}\u00b0`; }
function limitRow(name, arcs, wdir, spd){
  if(!arcs) return `<tr><td>${name}</td><td colspan="3" style="color:var(--mut)">no company limit listed</td></tr>`;
  const r = evalClass(arcs, wdir, spd);
  const lim = r.arc ? (r.arc.max==null ? `${arcTxt(r.arc)} pilot discretion` : `${arcTxt(r.arc)} max ${r.arc.max} kt${r.arc.appr&&r.arc.appr<99?', '+r.arc.appr+' with mgmt approval':(r.arc.appr===99?', above with mgmt approval':'')}`) : '';
  return `<tr><td>${name}</td><td>${lim}</td><td>${spd} kt${wdir!==null?' from '+wdir+'\u00b0':' (dir unknown, worst arc used)'}</td><td><span class="pill ${r.cls}">${r.label}</span></td></tr>`;
}
function openPanel(icao, cls){
  cls = cls || 'c208';
  const s = STATIONS.find(x=>x.icao===icao);
  const L = LIMITS[icao];
  const w = (window.lastPer||{})[icao] || {};
  const o = w.obs || {};
  const lw = windForLimits(icao, o);
  const wdir = lw ? lw.wdir : ((o.wdir===undefined)?null:o.wdir);
  const spd = lw ? Math.max(lw.wspd||0, lw.wgst||0) : Math.max(o.wspd||0, o.wgst||0);
  const parts = [];

  if((w.maxWshear||0) > GLOBAL_LIMITS.wsCease)
    parts.push(`<div class="banner">WINDSHEAR ${w.maxWshear} KT IN FORECAST. ABOVE 50 KT = CEASE OPERATIONS AT THIS LOCATION</div>`);

  parts.push(`<div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:0 0 auto">${roseSVG(icao, 300)}</div>
    <div style="flex:1;min-width:260px">
      <h3 style="margin-top:0">Current</h3>
      <div class="row" style="color:var(--mut)">Wind <b style="color:var(--ink)">${wdir!==null?wdir+'\u00b0':'VRB'} at ${o.wspd||0}${o.wgst?' G'+o.wgst:''} kt</b>, ${fmtCig(o.cig)}, ${visTxt(o.visRaw ?? o.vis)} sm, temp <b style="color:var(--ink)">${o.temp!==undefined&&o.temp!==null?o.temp+'\u00b0C':'?'}</b>${o.dewp!==undefined&&o.dewp!==null?' / dp '+o.dewp+'\u00b0C':''}</div>
      <div class="mono" style="margin-top:4px">${o.raw||'no observation'}</div>
      <h3>FRAT class</h3>
      <div style="display:flex;gap:6px">
        ${['float','c208','pc12'].map(k=>`<button class="${k===cls?'primary':''}" data-cls="${k}" data-clsfor="${icao}">${k==='float'?'Floats/Amphibs':k==='c208'?'C208':'PC-12'}</button>`).join('')}
      </div>
    </div>
  </div>`);

  // FRAT weather auto-score
  const fr = fratWeather(icao, cls);
  parts.push(`<h3>FRAT weather points (auto, ${cls==='float'?'Floats/Amphibs':cls==='c208'?'C208':'PC-12'}): ${fr.total}</h3>
    ${fr.flags.map(f=>`<div class="row" style="color:var(--ifr);font-weight:600">${f}</div>`).join('')}
    ${fr.items.length ? `<table><tr><th>Pts</th><th>Item</th></tr>${fr.items.map(i=>`<tr><td><b>${i.pts}</b></td><td>${i.label}</td></tr>`).join('')}</table>` : '<div class="row" style="color:var(--mut)">No weather points triggered.</div>'}
    <div class="note">Auto-scored from current obs, MADIS, TAF window, and the FA. Pilot judgment items (destination familiarity, duty, runway condition) still go on the form.</div>`);

  if(!L){
    parts.push(`<h3>Limits</h3><div class="row" style="color:var(--mut)">No entry in the Wind/Weather Limits doc for this location.</div>`);
  } else {
    parts.push(`<h3>Wind limits (current wind incl. gusts)</h3>
      ${lw ? `<div class="note" style="margin:0 0 4px">Judged on the newest certified wind: <b style="color:var(--ink)">${lw.wdir!==null?String(lw.wdir).padStart(3,'0')+'\u00b0T':'VRB'} ${lw.wspd}${lw.wgst?'G'+lw.wgst:''} kt</b> from the ${lw.src} at ${fmtLZ(lw.t)} (${agoTxt(lw.t)}). Directions here are true; the runway strip shows magnetic.</div>` : ''}<table>
      <tr><th>Class</th><th>Applicable limit</th><th>Now</th><th>Status</th></tr>
      ${limitRow('Floats/Amphibs', L.float, wdir, spd)}
      ${limitRow('C208', L.c208, wdir, spd)}
      ${limitRow('PC-12', L.pc12, wdir, spd)}
    </table>`);

    if(L.rwys){
      const br = bestRunway(L.rwys, wdir, spd);
      const twTxt = br ? `Best runway ${String(Math.round(br.hdg/10)).padStart(2,'0')} with ${br.tw} kt tailwind` : 'Wind direction unknown, tailwind not computed';
      const twStat = br && br.tw > GLOBAL_LIMITS.tailwindMax ? `<span class="pill appr">MGMT APPROVAL, over ${GLOBAL_LIMITS.tailwindMax} kt tailwind</span>` : `<span class="pill ok">OK</span>`;
      parts.push(`<h3>Tailwind (max ${GLOBAL_LIMITS.tailwindMax} kt, C208 and PC-12)</h3><div class="row" style="color:var(--mut)">${twTxt} ${twStat}</div>`);
    }

    parts.push(`<h3>IFR limits vs now</h3>`);
    if(!L.app && !L.dep){
      parts.push(`<div class="row" style="color:var(--mut)">No instrument approaches or departures at this location.</div>`);
    } else {
      const okBad = pass => pass ? '<span class="pill ok">LEGAL</span>' : '<span class="pill over">BELOW MINS</span>';
      let rows = '';
      if(L.app){
        const pass = (o.cig===null || o.cig >= L.app.cig) && (o.vis!==null && o.vis >= L.app.vis);
        rows += `<tr><td>Approach</td><td>${L.app.vis} sm and ${L.app.cig} ft</td><td>${visTxt(o.visRaw ?? o.vis)} sm, ${fmtCig(o.cig)}</td><td>${o.vis===null?'<span class="pill na">NO OBS</span>':okBad(pass)}</td></tr>`;
      }
      (L.dep||[]).forEach(d=>{
        const pass = (d.cig===null || o.cig===null || o.cig >= d.cig) && (o.vis!==null && o.vis >= d.vis);
        rows += `<tr><td>Departure Rwy ${d.rwy}</td><td>${d.vis} sm${d.cig?' and '+d.cig+' ft':', no ceiling limit'}${d.note?' ('+d.note+')':''}</td><td>${visTxt(o.visRaw ?? o.vis)} sm, ${fmtCig(o.cig)}</td><td>${o.vis===null?'<span class="pill na">NO OBS</span>':okBad(pass)}</td></tr>`;
      });
      parts.push(`<table><tr><th>Op</th><th>Mins</th><th>Now</th><th>Status</th></tr>${rows}</table>`);
    }

    // temp limits
    if(o.temp!==undefined && o.temp!==null){
      const tw = o.temp <= GLOBAL_LIMITS.floatWaterTemp, ww = o.temp <= GLOBAL_LIMITS.wheelsTemp;
      if(tw || ww) parts.push(`<h3>Temperature</h3><div class="row" style="color:var(--mut)">${o.temp}\u00b0C: ${tw?'<span class="pill over">AT/BELOW -7\u00b0C FLOAT WATER LIMIT</span> ':''}${ww?'<span class="pill over">AT/BELOW -10\u00b0C WHEELS LIMIT</span>':''}</div>`);
    }

    // tied external cutoffs
    const tied = EXT.filter(e=>(e.affects||'').toLowerCase().includes(s.name.toLowerCase().split(' ')[0]));
    if(tied.length){
      parts.push(`<h3>External cutoffs for ${s.name}</h3><table><tr><th>Station</th><th>Cutoff</th><th>Now</th><th>Status</th></tr>${tied.map(e=>{
        const ob = mxFor(e) || state.ext[e.id]; const stt = extStatus(e, ob);
        return `<tr><td>${e.name}</td><td>${e.cutoff} kt</td><td>${ob&&ob.wspd!==null?ob.wspd+' G'+(ob.gust??'?')+' kt':'no data'}</td><td><span class="pill ${stt.cls}">${stt.label}</span></td></tr>`;
      }).join('')}</table>`);
    }

    // decoded TAF timeline in local and Z
    const taf = state.tafs[icao];
    if(taf && (taf.fcsts||[]).length){
      parts.push(`<h3>TAF timeline</h3><table><tr><th>Group</th><th>From</th><th>Thru</th><th>Cig / Vis / Wx / Wind</th></tr>
        ${taf.fcsts.map(f=>{
          const cg = ceilingOf(f.clouds, f.vertVis), vv = f.visib;
          const wnd = f.wspd ? `${f.wdir??'VRB'}\u00b0 ${f.wspd}${f.wgst?'G'+f.wgst:''} kt` : '';
          const ws = (f.wshearHgt!=null||f.wshearSpd!=null) ? ` <span class="flag">WS${f.wshearSpd||''}</span>` : '';
          return `<tr><td class="mono">${f.fcstChange||'BASE'}${f.probability?' P'+f.probability:''}</td><td class="mono">${fmtStamp(f.timeFrom)}</td><td class="mono">${fmtStamp(f.timeTo)}</td><td>${fmtCig(cg)} / ${visTxt(vv)} sm${f.wxString?' / '+wxTokens(f.wxString).map(wxWord).join(', '):''}${wnd?' / '+wnd:''}${ws}</td></tr>`;
        }).join('')}
      </table><div class="mono" style="margin-top:4px">${taf.rawTAF}</div>`);
    }

    // special procedures from the plates
    const P = PROCS[icao];
    if(P){
      const vf = v => v===null||v===undefined ? '?' : visTxt(v);
      const legal = req => (req===null||req===undefined) ? '<span class="pill na">NA</span>' : (o.vis===null ? '<span class="pill na">NO OBS</span>' : (o.vis >= req ? '<span class="pill ok">LEGAL</span>' : '<span class="pill over">BELOW MINS</span>'));
      if(P.apps.length){
        parts.push(`<h3>Special approaches (P9KA plates)</h3><table><tr><th>Procedure</th><th>Line</th><th>DA/MDA (HAT)</th><th>Vis A / B</th><th>Now</th><th>Status (CAT A vis)</th></tr>
          ${P.apps.map(a=>{
            const cigNote = (a.hat!==null && o.cig!==null && o.cig < a.hat) ? ' <span class="flag">cig below HAT</span>' : '';
            return `<tr><td><b>${a.name}</b>${a.note?'<br><span style="color:var(--mut);font-size:12px">'+a.note+'</span>':''}</td><td>${a.line}</td><td>${a.mda===null?'verify':a.mda.toLocaleString()+' ('+a.hat+')'}</td><td>${vf(a.vis.A)} / ${vf(a.vis.B)}</td><td>${visTxt(o.visRaw ?? o.vis)} sm, ${fmtCig(o.cig)}${cigNote}</td><td>${a.verify?'<span class="pill na">VERIFY</span>':legal(a.vis.A)}</td></tr>`;
          }).join('')}
        </table><div class="note">Approach legality is visibility-controlled. Ceiling vs HAT shown as advisory only.</div>`);
      }
      if(P.deps.length){
        parts.push(`<h3>Special departures</h3><table><tr><th>DP</th><th>Rwy</th><th>Mins</th><th>Now</th><th>Status</th></tr>
          ${P.deps.map(d=>{
            const pass = d.vis===null ? null : ((d.cig===null || o.cig===null || o.cig >= d.cig) && (o.vis!==null && o.vis >= d.vis));
            const st2 = d.vis===null ? '<span class="pill over">NA</span>' : (o.vis===null ? '<span class="pill na">NO OBS</span>' : (pass ? '<span class="pill ok">LEGAL</span>' : '<span class="pill over">BELOW MINS</span>'));
            return `<tr><td><b>${d.name}</b></td><td>${d.rwy}</td><td>${d.cig!==null?d.cig+'-'+visTxt(d.vis):(d.vis!==null?'std, vis '+visTxt(d.vis):'NA')}<br><span style="color:var(--mut);font-size:12px">${d.note}</span></td><td>${visTxt(o.visRaw ?? o.vis)} sm, ${fmtCig(o.cig)}</td><td>${st2}</td></tr>`;
          }).join('')}
        </table>`);
      }
    }

    parts.push(`<h3>Airport diagram</h3><img src="diagrams/${icao}.png" alt="" style="max-width:100%;border:1px solid var(--line);border-radius:6px" onerror="this.parentNode.removeChild(this.previousSibling);this.remove()">`);
    if(L.notes && L.notes.length) parts.push(`<h3>Notes</h3>${L.notes.map(n=>`<div class="row" style="color:var(--mut)">${n}</div>`).join('')}`);
    if(L.phones) parts.push(`<div class="phones" style="margin-top:12px">${L.phones}</div>`);
  }

  document.getElementById('modal').innerHTML = `<h2>${s.name} (${icao}) <button class="close" id="mClose">Close</button></h2>${parts.join('')}
    <div class="note" style="margin-top:14px">Per Wind/Weather Limits updated 05/04/2026. Listed wind speed is maximum allowable, values are current reported winds including gusts.</div>`;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modalBg').style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
}
function closePanel(){
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modalBg').style.display = 'none';
}
document.getElementById('modalBg').addEventListener('click', closePanel);

/* ================= CLICK POPOVER WIRING ================= */
const tipEl = document.getElementById('tip');
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function hideTip(){ tipEl.style.display='none'; }
function showTipAt(el, key){
  const v = TIPS[key];
  if(!v){ hideTip(); return; }
  if(typeof v === 'object' && v.html) tipEl.innerHTML = v.html;
  else tipEl.innerHTML = `<div style="white-space:pre-wrap">${esc(v)}</div>`;
  tipEl.innerHTML = '<div style="text-align:right;margin-bottom:4px"><button id="tipClose" style="padding:1px 9px;font-size:11px">close</button></div>' + tipEl.innerHTML;
  tipEl.style.display = 'block';
  const r = el.getBoundingClientRect();
  const tr = tipEl.getBoundingClientRect();
  let xx = Math.min(r.left, window.innerWidth - tr.width - 10);
  let yy = r.bottom + 8;
  if(yy + tr.height > window.innerHeight - 8) yy = Math.max(8, r.top - tr.height - 8);
  tipEl.style.left = Math.max(6,xx)+'px'; tipEl.style.top = Math.max(6,yy)+'px';
  document.getElementById('tipClose').addEventListener('click', e=>{ e.stopPropagation(); hideTip(); });
}
/* Hovering a METAR or MADIS label shows the recent raw history without a click.
   Moving into the tip keeps it open so long lists can be scrolled; anywhere else
   closes it. Click-opened tips are untouched. */
let hoverTipFrom = null;
document.addEventListener('mouseover', e=>{
  if(!e.target.closest) return;
  const h = e.target.closest('[data-hovertip]');
  if(h){ if(h !== hoverTipFrom){ hoverTipFrom = h; showTipAt(h, h.getAttribute('data-hovertip')); } return; }
  if(hoverTipFrom && !e.target.closest('#tip')){ hoverTipFrom = null; hideTip(); }
});
document.addEventListener('click', e=>{
  if(e.target.closest('#tip')) return;
  const cb = e.target.closest('[data-clsfor]');
  if(cb){ openPanel(cb.getAttribute('data-clsfor'), cb.getAttribute('data-cls')); return; }
  const pnl = e.target.closest('[data-panel]');
  if(pnl){ hideTip(); openPanel(pnl.getAttribute('data-panel')); return; }
  const tEarly = e.target.closest('.cutchip[data-tip]');
  if(tEarly){ showTipAt(tEarly, tEarly.getAttribute('data-tip')); return; }
  const hEarly = e.target.closest('[data-hovertip]');
  if(hEarly){ showTipAt(hEarly, hEarly.getAttribute('data-hovertip')); return; }
  const ex = e.target.closest('[data-expand]');
  if(ex && !e.target.closest('svg') ){
    const icao = ex.getAttribute('data-expand');
    const st2 = openSet();
    if(st2.has(icao)) st2.delete(icao); else st2.add(icao);
    saveOpen(st2);
    ex.classList.toggle('open');
    const ic = ex.querySelector('.expicon');
    if(ic) ic.innerHTML = ex.classList.contains('open') ? '\u25b2 less' : '\u25bc more';
    return;
  }
  const t = e.target.closest('[data-tip]');
  if(t){ showTipAt(t, t.getAttribute('data-tip')); return; }
  hideTip();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closePanel(); });

/* heatmap cell hover: full observation readout */
document.addEventListener('mousemove', e=>{
  const cell = e.target.closest ? e.target.closest('.hcell[data-h]') : null;
  if(!cell){ if(e.target.closest && e.target.closest('#heat')) sparkTip.style.display='none'; return; }
  const [icao, aStr] = cell.getAttribute('data-h').split('|');
  const a = parseInt(aStr,10), b = a + 1800000;
  const st = STATIONS.find(x=>x.icao===icao);
  const bucket = seriesFor(icao).filter(p=>p.t>=a && p.t<b && (p.cig!==null || p.vis!==null));
  let html = `<b style="color:var(--amber)">${st?st.name:icao} ${fmtLZ(a)}</b>`;
  if(!bucket.length){ html += ' <span style="color:var(--mut)">no data recorded</span>'; }
  else {
    let worst = bucket[0], wc = null;
    bucket.forEach(p=>{ const c = flightCat(p.cig===-1?null:p.cig, p.vis); if(wc===null || (CAT_ORDER[c]??-1) > (CAT_ORDER[wc]??-1)){ wc = c; worst = p; } });
    html += ` <span style="color:${catClr(wc)};font-weight:800">${wc}</span>`
      + `  cig <span style="color:${worst.cig===-1?'var(--vfr)':catClr(cigBand(worst.cig))}">${worst.cig===-1?'CLR':(worst.cig===null?'?':worst.cig.toLocaleString()+'ft')}</span>`
      + `  vis <span style="color:${catClr(visBand(worst.vis))}">${worst.vis===null?'?':visTxt(worst.vis)+'sm'}</span>`
      + (worst.ws!==null?`  wind ${worst.ws}${worst.wg?'<span style="color:var(--amber)">G'+worst.wg+'</span>':''}kt`:'')
      + (worst.temp!==null?`  <span style="color:#e8746a">${worst.temp}\u00b0</span>/<span style="color:#5ec8b7">${worst.dewp!==null?worst.dewp:'?'}\u00b0</span>`:'')
      + (worst.pres!==null?`  <span style="color:#c9a6e8">A${worst.pres.toFixed(2)}</span>`:'')
      + `<span style="color:var(--mut)"> \u00b7 ${bucket.length} ob${bucket.length>1?'s':''} this half hr</span>`;
  }
  sparkTip.innerHTML = html;
  sparkTip.style.display = 'block';
  let xx = e.clientX + 14, yy = e.clientY - 34;
  const tr = sparkTip.getBoundingClientRect();
  if(xx + tr.width > window.innerWidth - 8) xx = e.clientX - tr.width - 14;
  sparkTip.style.left = xx+'px'; sparkTip.style.top = Math.max(6,yy)+'px';
});

/* graph crosshair hover */
const sparkTip = document.getElementById('sparkTip');
function sparkLeave(e){ sparkTip.style.display='none'; const xh = e && e.currentTarget && e.currentTarget.querySelector ? e.currentTarget.querySelector('.xh') : null; if(xh) xh.setAttribute('visibility','hidden'); }
function sparkMove(e, icao){
  const svg = e.currentTarget;
  const D = SPARK_DATA[icao];
  if(!D){ sparkTip.style.display='none'; return; }
  const r = svg.getBoundingClientRect();
  const xh = svg.querySelector('.xh');
  const fx = (e.clientX - r.left) * (D.W / r.width); // viewBox coords
  if(fx < D.padL || fx > D.W - D.padR){ sparkTip.style.display='none'; if(xh) xh.setAttribute('visibility','hidden'); return; }
  if(xh){ xh.setAttribute('x1', fx); xh.setAttribute('x2', fx); xh.setAttribute('visibility','visible'); }
  const t = D.t0 + (fx - D.padL) / (D.W - D.padL - D.padR) * (D.t1 - D.t0);
  let html = `<b style="color:var(--amber)">${fmtLZ(t)}</b>`;
  if(t <= D.nowMs){
    let best = null, bd = Infinity;
    D.pts.forEach(p=>{ const d2 = Math.abs(p.t - t); if(d2 < bd){ bd = d2; best = p; } });
    if(best && bd < 45*60000){
      const cat = flightCat(best.cig===-1?null:best.cig, best.vis);
      html += ` <span style="color:${catClr(cat)};font-weight:700">${cat}</span>  cig <span style="color:${best.cig===-1?'var(--vfr)':catClr(cigBand(best.cig))}">${best.cig===-1?'CLR':(best.cig===null?'?':best.cig.toLocaleString()+'ft')}</span>  vis <span style="color:${catClr(visBand(best.vis))}">${best.vis===null?'?':visTxt(best.vis)+'sm'}</span> <span style="color:var(--mut)">obs ${fmtLZ(best.t)}</span>`;
    } else html += ' <span style="color:var(--mut)">no ob near here</span>';
  } else {
    const segs = D.tafSegs.filter(sg=>t >= sg.a && t <= sg.b);
    if(segs.length){
      html += segs.map(sg=>` <b style="color:var(--amber)">${sg.lbl}</b> cig <span style="color:${sg.cig===null?'var(--vfr)':catClr(cigBand(sg.cig))}">${sg.cig===null?'CLR fcst':sg.cig.toLocaleString()+'ft'}</span> vis <span style="color:${catClr(visBand(sg.vis))}">${sg.vis===null?'?':visTxt(sg.vis)+'sm'}</span>`).join(' \u2502');
    } else html += ' <span style="color:var(--mut)">beyond TAF</span>';
  }
  sparkTip.innerHTML = html;
  sparkTip.style.display='block';
  let xx = e.clientX + 14, yy = e.clientY - 34;
  const tr = sparkTip.getBoundingClientRect();
  if(xx + tr.width > window.innerWidth - 8) xx = e.clientX - tr.width - 14;
  sparkTip.style.left = xx+'px'; sparkTip.style.top = Math.max(6,yy)+'px';
}

/* ================= WIRING ================= */
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click', ()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active', x===t));
  document.getElementById('pane-now').classList.toggle('hidden', t.dataset.tab!=='now');
  document.getElementById('pane-frat').classList.toggle('hidden', t.dataset.tab!=='frat');
}));
document.getElementById('refresh').addEventListener('click', loadNow);
document.getElementById('win').addEventListener('change', renderBoard);
document.getElementById('regen').addEventListener('click', renderBoard);
document.getElementById('copy').addEventListener('click', async ()=>{
  await navigator.clipboard.writeText(document.getElementById('blurb').value);
  const b = document.getElementById('copy'); const old = b.textContent;
  b.textContent = 'Copied'; setTimeout(()=>b.textContent = old, 1200);
});
setInterval(loadNow, 5*60*1000);
startMarineTicker();
startHfTicker();
setupHazardBar();
startClock();
/* The sun marker only moves once a minute, so redraw on the minute rather than on the five
   minute data cycle. Cheap, and on a wall display the difference is obvious. */
(function(){
  let lastMin = -1;
  setInterval(()=>{
    const m = Math.floor(Date.now()/60000);
    if(m !== lastMin){ lastMin = m; try{ renderSun(); }catch(e){} }
  }, 5000);
})();
let rszT = null;
window.addEventListener('resize', ()=>{ clearTimeout(rszT); rszT = setTimeout(()=>{ if(state.loadedAt) renderBoard(); else fitKiosk(); }, 400); });
document.addEventListener('fullscreenchange', ()=>setTimeout(fitKiosk, 250));
if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>fitKiosk());
// three views: 'detail' (full expandable rows), 'cards' (dense 2-line colored cards), 'grid' (plain table)
const VIEWS = ['detail','cards','grid'];
const VIEW_LABEL = {detail:'\ud83c\udfaf compact cards', cards:'\ud83d\udcca simple grid', grid:'\ud83d\udccb detailed rows'};
let curView = 'detail';
try{ curView = localStorage.getItem('wxb_view') || 'detail'; }catch(err){}
const qp = new URLSearchParams(location.search);
if(qp.get('tv') === '1'){
  curView = 'cards';
  document.body.classList.add('kiosk');
  setTimeout(()=>{
    document.getElementById('kioskExit').classList.add('show');
    try{ document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(()=>{}); }catch(err){}
    setTimeout(fitKiosk, 500);
  }, 300);
}
function applyGridView(){
  document.getElementById('master').style.display = curView==='detail' ? 'block' : 'none';
  document.getElementById('cardsWrap').style.display = curView==='cards' ? 'flex' : 'none';
  document.getElementById('gridWrap').style.display = curView==='grid' ? 'block' : 'none';
  document.getElementById('viewBtn').textContent = VIEW_LABEL[curView];
  document.getElementById('compactBtn').style.display = curView==='detail' ? 'inline-block' : 'none';
  fitKiosk();
}
applyGridView();
document.getElementById('viewBtn').addEventListener('click', e=>{
  e.stopPropagation();
  curView = VIEWS[(VIEWS.indexOf(curView)+1) % VIEWS.length];
  try{ localStorage.setItem('wxb_view', curView); }catch(err){}
  applyGridView();
});
document.getElementById('kioskBtn').addEventListener('click', e=>{
  e.stopPropagation();
  document.body.classList.add('kiosk');
  document.getElementById('kioskExit').classList.add('show');
  try{ document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(()=>{}); }catch(err){}
  setTimeout(fitKiosk, 120);
  setTimeout(()=>{ fitKiosk(); tvPageSync(); }, 700);
});
document.getElementById('kioskExit').addEventListener('click', e=>{
  e.stopPropagation();
  document.body.classList.remove('kiosk');
  document.getElementById('kioskExit').classList.remove('show');
  try{ document.exitFullscreen && document.fullscreenElement && document.exitFullscreen(); }catch(err){}
  fitKiosk(); tvPageSync();
});
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && document.body.classList.contains('kiosk')){
    document.body.classList.remove('kiosk');
    document.getElementById('kioskExit').classList.remove('show');
    fitKiosk();
  }
});
document.getElementById('master').addEventListener('click', e=>{
  const sec = e.target.closest('.sectag');
  if(sec){
    e.stopPropagation();
    toggleSec(sec.dataset.sec);
    return;
  }
  const line = e.target.closest('.notamline');
  if(!line) return;
  e.stopPropagation();               // do not also collapse the station row
  const k = line.dataset.notam;
  if(k.startsWith('ALL_')){
    state.notamAll = state.notamAll || {};
    state.notamAll[k.slice(4)] = true;
  } else {
    state.notamOpen = state.notamOpen || {};
    state.notamOpen[k] = !state.notamOpen[k];
  }
  if(window.lastPer) renderMaster(window.lastPer);
}, true);
document.getElementById('warnbox').addEventListener('click', e=>{
  const line = e.target.closest('.tfrline');
  if(!line || e.target.closest('a')) return;
  const k = line.dataset.tfr;
  if(k === 'FAR'){ state.tfrShowFar = !state.tfrShowFar; renderWarn(); return; }
  state.tfrOpen = state.tfrOpen || {};
  state.tfrOpen[k] = !state.tfrOpen[k];
  renderWarn();
});
document.getElementById('faRegion').addEventListener('click', e=>{ e.stopPropagation(); faRegionToggle(); });
document.getElementById('nwsWrap').addEventListener('click', e=>{
  const line = e.target.closest('.nwsline');
  if(!line) return;
  state.nwsOpen = state.nwsOpen || {};
  const k = line.dataset.nws;
  state.nwsOpen[k] = !state.nwsOpen[k];
  renderNws();
});
renderNws();
loadNws();
setInterval(loadNws, 5*60*1000);
document.getElementById('lampBtn').addEventListener('click', e=>{ e.stopPropagation(); openLampPaste(); });
loadLampStored();
document.getElementById('jawsInfoBtn').addEventListener('click', e=>{ e.stopPropagation(); openJawsInfo(); });
document.getElementById('jawsPasteBtn').addEventListener('click', e=>{ e.stopPropagation(); openJawsPaste(); });
renderJaws();
loadJaws();
setInterval(loadJaws, 5*60*1000);
document.getElementById('afdCopy').addEventListener('click', async e=>{
  e.stopPropagation();
  /* Plain text rather than the rendered markup, so it pastes cleanly into a message. */
  const a = state.afd || {};
  let txt = '';
  if(a.text){
    const P = parseAFD(a.text);
    const avi = P.sections.find(x=>x.name === 'AVIATION');
    const syn = P.sections.find(x=>x.name === 'SYNOPSIS');
    const bits = [];
    if(P.head.issued) bits.push('NWS Juneau forecast discussion, ' + P.head.issued);
    if(avi) bits.push('AVIATION: ' + afdReflow(avi.body).replace(/\n/g,' '));
    if(syn) afdReflow(syn.body).split('\n').filter(l=>l.trim().startsWith('-'))
      .forEach(k=>bits.push('- ' + k.replace(/^-\s*/,'')));
    txt = bits.join('\n\n');
  }
  const btn = e.currentTarget;
  try{ await navigator.clipboard.writeText(txt); btn.textContent = 'copied'; }
  catch(err){ btn.textContent = 'copy failed'; }
  setTimeout(()=>{ btn.textContent = 'copy'; }, 1800);
});
document.getElementById('panBtn').addEventListener('click', e=>{ e.stopPropagation(); cyclePhoneMode(); });
applyPhoneMode();
document.getElementById('rowsBtn').addEventListener('click', e=>{ e.stopPropagation(); setRowDensity(ROW_MODES[(ROW_MODES.indexOf(rowDensity())+1) % ROW_MODES.length]); });
applyRowDensity();
document.getElementById('foldBtn').addEventListener('click', e=>{ e.stopPropagation(); foldAllSections(); });
try{ document.getElementById('foldBtn').textContent = allSectionsOpen() ? 'fold sections' : 'expand sections'; }catch(e){}
document.getElementById('tvBigBtn').addEventListener('click', e=>{ e.stopPropagation(); setTvBig(!tvBig()); });
if(tvBig()) document.getElementById('tvBigBtn').textContent = 'TV text: large';
document.getElementById('alertCfgBtn').addEventListener('click', e=>{ e.stopPropagation(); openAlertPicker(); });
document.getElementById('notamPasteBtn').addEventListener('click', e=>{ e.stopPropagation(); openNotamPaste(); });
loadNotamPaste();
document.getElementById('afdMore').addEventListener('click', e=>{ e.stopPropagation(); openAFD(); });
/* Hiding the discussion frees a real slice of the screen. On a TV that space was just going
   to waste: fitKiosk sizes the station block to whatever height is left, but it never re-ran
   when the box was folded, so the rows stayed at the size they had when the page loaded.
   Toggling now re-fits, and in kiosk the folded box shrinks to a slim header so the reclaimed
   space is the whole box rather than only its body. */
function setAfdOpen(open){
  const body = document.getElementById('afdBody'), btn = document.getElementById('afdToggle');
  if(!body) return;
  body.style.display = open ? '' : 'none';
  if(btn) btn.textContent = open ? 'hide' : 'show';
  document.body.classList.toggle('afdoff', !open);
  try{ localStorage.setItem('wxb_afdbox', open ? '1' : '0'); }catch(err){}
  // let the layout settle before measuring, then resize the board to the new space
  setTimeout(()=>{ try{ fitKiosk(); }catch(e){} }, 60);
}
document.getElementById('afdToggle').addEventListener('click', e=>{
  e.stopPropagation();
  setAfdOpen(document.getElementById('afdBody').style.display === 'none');
});
try{
  if(localStorage.getItem('wxb_afdbox') === '0'){
    document.getElementById('afdBody').style.display = 'none';
    document.getElementById('afdToggle').textContent = 'show';
    document.body.classList.add('afdoff');
  }
}catch(err){}
initAFDBox();
setInterval(()=>{ loadAFD(false).then(renderAFDBox); }, 20*60*1000);
document.getElementById('camWrap').addEventListener('mousemove', camHoverMove);
document.getElementById('camWrap').addEventListener('mouseleave', camHoverOut);
document.getElementById('camWrap').addEventListener('click', e=>{
  const row = e.target.closest('.camrow');
  if(!row || e.target.closest('a')) return;   // let the camera link through
  const id = parseInt(row.dataset.cam, 10);
  state.camOpen = state.camOpen || {};
  state.camOpen[id] = !state.camOpen[id];
  renderCamSection();
});
function camBtnLabel(){
  const b = document.getElementById('camLoad');
  if(!b) return;
  b.textContent = camAllOn() ? 'on-field only' : 'load all sites';
  b.title = camAllOn()
    ? 'All 43 sites are loading. Click to show only the 15 cameras on the fields we fly to.'
    : 'Only the 15 on-field cameras are loading. Click to load the whole network.';
}
document.getElementById('camLoad').addEventListener('click', e=>{
  e.stopPropagation();
  if(camAllOn()){
    setCamAll(false);
    camBtnLabel();
    renderCamSection();
    return;
  }
  setCamAll(true);
  camBtnLabel();
  loadAllCams();
});
camBtnLabel();
// all sites are the default, so pull the wider set once the board has drawn
if(camAllOn()) setTimeout(()=>{ loadAllCams(); }, 2000);
document.getElementById('afdBtn').addEventListener('click', e=>{ e.stopPropagation(); openAFD(); });
document.getElementById('xwBtn').addEventListener('click', e=>{ e.stopPropagation(); openXwCalc(); });
document.getElementById('csvBtn').addEventListener('click', e=>{
  e.stopPropagation();
  const rows = ['station,time_local,ceiling_ft,visibility_sm,temp_c,dewpoint_c,wind_kt,gust_kt,altimeter_inhg,category'];
  STATIONS.forEach(st=>{
    seriesFor(st.icao).forEach(pt=>{
      const cat = flightCat(pt.cig===-1?null:pt.cig, pt.vis);
      rows.push([st.icao, fmtStamp(pt.t).replace(',',''), pt.cig===-1?'CLR':(pt.cig??''), pt.vis??'', pt.temp??'', pt.dewp??'', pt.ws??'', pt.wg??'', pt.pres??'', cat].join(','));
    });
  });
  const blob = new Blob([rows.join('\n')], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'aks-wx-history-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ===== tiered audible alerts: a distinct subtle tone per event class ===== */
const ALERT_KINDS = {
  cat:  {label:'Station drops to IFR or LIFR',      tone:[[784,0],[523,0.15]],             gain:0.18},
  mvfr: {label:'Station drops to MVFR',             tone:[[587,0]],                        gain:0.10},
  mgmt: {label:'Wind enters management approval',   tone:[[698,0],[698,0.13]],             gain:0.14},
  over: {label:'Wind over company limit',           tone:[[698,0],[880,0.12],[1046,0.24]], gain:0.20},
  cut:  {label:'Cutoff station over its limit',     tone:[[1046,0],[784,0.13],[1046,0.26]],gain:0.18},
};
let sndOn = false;
let alertPrefs = {cat:true, mvfr:false, mgmt:true, over:true, cut:true};
try{
  sndOn = localStorage.getItem('wxb_snd')==='1';
  const sp = JSON.parse(localStorage.getItem('wxb_snd_kinds')||'null');
  if(sp) alertPrefs = Object.assign(alertPrefs, sp);
}catch(err){}
function saveAlertPrefs(){
  try{
    localStorage.setItem('wxb_snd', sndOn?'1':'0');
    localStorage.setItem('wxb_snd_kinds', JSON.stringify(alertPrefs));
  }catch(err){}
}
let audioCtx = null;
function playTone(kind, force){
  const A = ALERT_KINDS[kind];
  if(!A) return;
  if(!force && (!sndOn || !alertPrefs[kind])) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const t0 = audioCtx.currentTime;
    A.tone.forEach(pair=>{
      const f = pair[0], dt = pair[1];
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = f; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, t0+dt);
      g.gain.exponentialRampToValueAtTime(A.gain, t0+dt+0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0+dt+0.15);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t0+dt); o.stop(t0+dt+0.17);
    });
  }catch(err){}
}
function playAlertTone(){ playTone('cat'); }
const sndBtnEl = document.getElementById('sndBtn');
function sndLabel(){ sndBtnEl.textContent = (sndOn?'\ud83d\udd0a':'\ud83d\udd07') + ' alerts'; }
sndLabel();
sndBtnEl.addEventListener('click', e=>{
  e.stopPropagation();
  const rows = Object.keys(ALERT_KINDS).map(k=>{
    const A = ALERT_KINDS[k];
    return `<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-top:1px solid var(--line)">
      <input type="checkbox" class="alrtChk" data-k="${k}" ${alertPrefs[k]?'checked':''} style="width:15px;height:15px;flex:none">
      <span style="flex:1">${A.label}</span>
      <button class="alrtTest" data-k="${k}" style="font-size:11px;padding:1px 9px">hear it</button>
    </div>`;
  }).join('');
  const md = document.getElementById('modal');
  md.innerHTML = `<h2>Audible alerts <button class="close" id="mClose">Close</button></h2>
    <div style="display:flex;align-items:center;gap:10px;padding:4px 0">
      <input type="checkbox" id="alrtMaster" ${sndOn?'checked':''} style="width:15px;height:15px;flex:none">
      <span style="flex:1;font-weight:700;color:var(--amber)">Sound on for this device</span>
    </div>${rows}
    <div class="note">Tones fire on deterioration only, never on improvement, and only from observations, never from TAF or FA forecasts. Each setting is remembered on this device.</div>`;
  md.style.display = 'block';
  document.getElementById('modalBg').style.display = 'block';
  md.addEventListener('click', ev=>ev.stopPropagation());
  document.getElementById('mClose').addEventListener('click', closePanel);
  document.getElementById('alrtMaster').addEventListener('change', ev=>{
    sndOn = ev.target.checked; saveAlertPrefs(); sndLabel();
    if(sndOn) playTone('cat', true);
  });
  md.querySelectorAll('.alrtChk').forEach(el=>el.addEventListener('change', ev=>{
    alertPrefs[ev.target.getAttribute('data-k')] = ev.target.checked;
    saveAlertPrefs();
    if(ev.target.checked) playTone(ev.target.getAttribute('data-k'), true);
  }));
  md.querySelectorAll('.alrtTest').forEach(el=>el.addEventListener('click', ev=>{
    ev.stopPropagation();
    playTone(ev.currentTarget.getAttribute('data-k'), true);
  }));
});
document.getElementById('notamDbg').addEventListener('click', async e=>{
  e.stopPropagation();
  const out = [];
  const probe = async (label, url, opts)=>{
    try{
      const r = await fetch(url, opts);
      let txt = '';
      try{ txt = await r.text(); }catch(err){ txt = '(body read failed: '+err.message+')'; }
      out.push(`=== ${label}\nHTTP ${r.status} ${r.statusText} \u00b7 ${txt.length} bytes\n${txt.slice(0,700).replace(/</g,'&lt;')}\n`);
    }catch(err){
      out.push(`=== ${label}\nFETCH FAILED: ${err.message}\n`);
    }
  };
  document.getElementById('modal').innerHTML = '<h2>NOTAM diagnostics <button class="close" id="mClose">Close</button></h2><div style="font-family:var(--mono);font-size:11px;color:var(--mut)">running probes...</div>';
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modalBg').style.display = 'block';
  document.getElementById('mClose').addEventListener('click', closePanel);
  const probeBig = async (label, url)=>{
    try{
      const r = await fetch(url);
      let txt = '';
      try{ txt = await r.text(); }catch(err){ txt = '(body read failed)'; }
      out.push(`=== ${label}\nHTTP ${r.status} \u00b7 ${txt.length} bytes\n${txt.slice(0,2400).replace(/</g,'&lt;')}\n`);
    }catch(err){ out.push(`=== ${label}\nFETCH FAILED: ${err.message}\n`); }
  };
  for(const c of camSiteList()){
    await probeBig('WeatherCams summary ' + c.name + ' (site ' + c.id + ')', '/api/wxcam?siteId=' + c.id);
  }
  await probeBig('WeatherCams locations directory (raw proxy, expected 401)', '/api/proxy?url=' + encodeURIComponent(CAM_API + 'locations?zoom=4,5,6,7,8&bounds=' + encodeURIComponent(CAM_BOUNDS)));
  for(const base of NOTAM_ROUTES) await probe('NOTAM route probe ' + base, base);
  if(state.notamRoute){
    await probe('NOTAM route diagnostics', state.notamRoute + '?diag=1');
    await probe('NOTAMs single station (PAJN)', state.notamRoute + '?locations=PAJN');
  }
  await probe('DINS via raw proxy (expected 403, the old path)', '/api/proxy?url=' + encodeURIComponent(NOTAM_DINS));
  out.push(`=== current diag string\n${state.notamDiag || '(none yet)'}\n`);
  document.getElementById('modal').innerHTML = '<h2>NOTAM diagnostics <button class="close" id="mClose">Close</button></h2>' +
    '<div style="font-family:var(--mono);font-size:11px;line-height:1.5;white-space:pre-wrap;user-select:all;background:#0a0f14;border:1px solid var(--line);border-radius:6px;padding:10px;max-height:70vh;overflow:auto">' + out.join('\n') + '</div>' +
    '<div class="note">Screenshot or copy this whole box and send it over. It shows the HTTP status and the first 700 bytes from each source, which is exactly enough to identify the wall.</div>';
  document.getElementById('mClose').addEventListener('click', closePanel);
});
document.getElementById('compactBtn').addEventListener('click', e=>{
  e.stopPropagation();
  const all = STATIONS.map(x=>x.icao);
  const cur = openSet();
  const expandAll = cur.size < all.length;
  saveOpen(expandAll ? new Set(all) : new Set());
  renderMaster(window.lastPer||{});
  e.target.textContent = expandAll ? 'collapse all' : 'expand all';
});
document.getElementById('compactBtn').textContent = 'expand all';
document.getElementById('fratGo').addEventListener('click', loadFrat);
(function initFratTime(){
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Juneau',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(now);
  const g = t=>parts.find(p=>p.type===t).value;
  document.getElementById('fratTime').value = `${g('year')}-${g('month')}-${g('day')}T${g('hour')}:${g('minute')}`;
})();
loadNow();
setInterval(()=>{ if(state.loadedAt && document.getElementById('pane-now') && !document.getElementById('pane-now').classList.contains('hidden')) renderBoard(); }, 60000);
</script>
</body>
</html>
