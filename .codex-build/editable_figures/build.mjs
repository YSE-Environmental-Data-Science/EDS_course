import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const workspaceDir = '/Users/sm3466/Library/CloudStorage/Dropbox-YSE/Sparkle Malone/Teaching/EDS_course';
const SKILL_DIR = '/Users/sm3466/.codex/plugins/cache/openai-primary-runtime/presentations/26.903.11726/skills/presentations';
const TMP_DIR = path.join(workspaceDir, '.codex-build/editable_figures');
const FINAL_PPTX = path.join(workspaceDir, 'outputs/Upland_Methane_Editable_Reconstruction.pptx');
const RUNTIME_PYTHON = '/Users/sm3466/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const { resolvePresentationFont, finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, 'container_tools/artifact_tool_utils.mjs')).href);
const font = resolvePresentationFont();
const p = Presentation.create({ slideSize: { width: 1600, height: 900 } });

const C = { navy:'#173968', blue:'#2D65B3', pale:'#EFF4FA', border:'#B7CCE2', gray:'#899CB5', dark:'#343A42', soil:'#E7D8BC', soilLine:'#C9B183', red:'#C83F5A', teal:'#158D83', green:'#88A968', orange:'#DF8A1B', white:'#FFFFFF', plot:'#F9FBFD' };
function shape(slide, geometry, x,y,w,h, fill='none', line='none', radius=0) {
  const cfg={ geometry, position:{left:x,top:y,width:w,height:h}, fill, line:line==='none'?{fill:'none',width:0}:{style:'solid',fill:line,width:2} };
  if (radius && ['rect','textbox','roundRect'].includes(geometry)) cfg.borderRadius=radius;
  return slide.shapes.add(cfg);
}
function text(slide, value, x,y,w,h, size=22, color=C.dark, bold=false, align='center', valign='middle') {
  const s=shape(slide,'textbox',x,y,w,h,'none','none'); s.text=value; s.text.style={typeface:font,fontSize:size,bold,color,alignment:align,verticalAlignment:valign,autoFit:'shrinkText',wrap:true}; return s;
}
function box(slide,x,y,w,h,fill,line,r=14){return shape(slide,'roundRect',x,y,w,h,fill,line,r)}
function arrow(slide,x,y,w,h,color,dir='right'){return shape(slide,dir==='up'?'upArrow':'rightArrow',x,y,w,h,color,'none')}
function title(slide,t,st){text(slide,t,80,28,1440,52,31,C.navy,true);text(slide,st,120,80,1360,34,19,C.gray,false)}
function addLabeledBox(slide,x,y,w,h,heading,body,accent=C.navy,fill=C.pale){const b=box(slide,x,y,w,h,fill,accent,16);text(slide,heading,x+15,y+12,w-30,34,19,accent,true);text(slide,body,x+22,y+52,w-44,h-64,18,C.dark,false);return b}

// Slide 1
{
 const s=p.slides.add(); s.background.fill=C.white;
 title(s,'A scale-inference error in the global methane budget','The chamber-measured soil sink is treated as the whole upland budget, but they are different quantities');
 box(s,110,145,670,625,C.pale,C.border,18); box(s,945,145,645,625,C.pale,C.border,18);
 text(s,'CHAMBER — measurement domain',230,165,430,38,22,C.blue,true);
 text(s,'ECOSYSTEM — inference domain',1075,165,410,38,22,C.red,true);
 text(s,'sees only the soil surface',348,353,300,30,16,C.dark,false);
 box(s,378,400,130,82,C.white,C.dark,9); text(s,'chamber\ncollar',390,414,106,52,17,C.dark,true);
 shape(s,'rect',138,480,614,245,C.soil,C.soilLine,10); text(s,'aerated soil · methanotrophy',280,497,330,27,16,'#8A7A60');
 arrow(s,424,545,38,100,C.blue,'up'); text(s,'CH₄ uptake',472,582,155,30,18,C.blue,true,'left');
 box(s,165,650,560,68,C.white,C.blue,14); text(s,'Assumed soil sink: −11 to −49 Tg CH₄ yr⁻¹',185,663,520,42,22,C.blue,true);
 text(s,'≠',813,373,75,85,60,C.navy,true);
 shape(s,'rect',972,480,610,245,C.soil,C.soilLine,10);
 // net/source arrow
 arrow(s,1000,260,65,295,C.red,'up'); text(s,'NET',1002,242,62,28,17,C.red,true); text(s,'SOURCE',985,575,95,30,17,C.red,true);
 text(s,'stems · canopy · microsites · transport · lateral flow',1128,238,380,30,15,C.dark,false);
 // trees
 shape(s,'rect',1168,382,12,98,'#896A43','none'); shape(s,'ellipse',1134,310,78,98,C.green,'none'); arrow(s,1166,236,32,86,C.red,'up');
 shape(s,'rect',1308,382,12,98,'#896A43','none'); shape(s,'ellipse',1274,310,78,98,C.green,'none'); arrow(s,1306,236,32,86,C.red,'up');
 // soil + wet spot
 arrow(s,1400,465,34,88,C.blue,'up'); text(s,'soil',1386,579,60,27,16,C.blue,true);
 shape(s,'ellipse',1445,535,90,38,'#A7B4CB','none'); arrow(s,1476,440,32,82,C.red,'up'); text(s,'wet spot',1444,579,92,27,16,C.red,true);
 // tower
 shape(s,'line',1534,264,0,220,'none','#333333'); text(s,'tower',1508,238,70,25,15,C.dark,true);
 for (const yy of [286,333,380,427,474]) shape(s,'line',1520,yy,26,22,'none','#333333');
 box(s,1000,650,555,68,C.white,C.red,14); text(s,'Ecosystem-scale: +22 to +75 Tg CH₄ yr⁻¹',1020,663,515,42,21,C.red,true);
 box(s,110,804,1480,76,C.navy,C.navy,14); text(s,'83% of NEON upland sites (2021–2024) are net CH₄ sources — the soil sink is not the upland budget',145,817,1410,48,21,C.white,true);
}

// Slide 2 (pipeline)
{
 const s=p.slides.add(); s.background.fill=C.white;
 title(s,'The Upland Methane Constraint: from existing observatory data to a budget-ready AI-ready product','No new field stations — value created by pipelining, harmonizing, and physically constraining data that already exist');
 box(s,52,184,270,480,C.pale,C.blue,16); text(s,'EXISTING COMMUNITY DATA',72,205,230,32,19,C.blue,true);
 const inputs=[['NEON gradient profiles','47 towers · vertical CH₄'],['AmeriFlux / FLUXNET-CH₄','EC CH₄ fluxes'],['ICOS + validation towers','EC + gradient'],['Drivers','ERA5 · MODIS · WAD2M']];
 inputs.forEach((d,i)=>{const y=263+i*98;box(s,73,y,228,82,C.white,C.border,10);text(s,d[0],83,y+10,208,30,17,C.navy,true);text(s,d[1],83,y+42,208,25,15,C.gray)}); text(s,'open-licensed · not AI-ready today',80,630,215,22,13,C.gray);
 const xs=[358,638,918,1198], heads=['AIM 1','AIM 2','AIM 3','AIM 4'], accents=[C.teal,C.teal,C.red,C.navy], titles=['Automated GF pipeline','Harmonized corpus','Knowledge-guided ML','Inversion & reconciliation'], bodies=['Reproducible, self-updating\nNEON gradient fluxes with\nuncertainty','Multi-network,\ncross-method, feature-rich\ntraining data','Physics-constrained\nupscaling that transfers to\nunseen sites','Top-down, bottom-up &\nprocess-model constraint'], products=['NEON-GF-CH₄','UMC-Train','UMC-Grid','UMC-Constraint'];
 xs.forEach((x,i)=>{box(s,x,223,255,338,C.pale,C.border,15);shape(s,'roundRect',x,223,255,49,accents[i],'none',15);shape(s,'rect',x,247,255,25,accents[i],'none');text(s,heads[i],x+20,230,215,28,18,C.white,true);text(s,titles[i],x+15,282,225,36,18,accents[i],true);text(s,bodies[i],x+23,323,209,95,16,C.dark);box(s,x+24,480,207,53,C.white,accents[i],10);text(s,'PRODUCT',x+36,487,183,17,12,C.gray,true);text(s,products[i],x+36,504,183,24,18,accents[i],true)});
 [326,616,896,1176,1458].forEach(x=>arrow(s,x,373,38,35,C.navy));
 box(s,1470,223,120,338,C.navy,C.navy,15);text(s,'GLOBAL\nCARBON\nPROJECT',1480,275,100,108,22,C.white,true);text(s,'Global Methane\nBudget',1480,407,100,55,15,'#D6DFEC');text(s,'IPCC · inventories',1480,487,100,25,13,'#AABBD0');
 box(s,358,605,1095,65,C.pale,C.blue,12);text(s,'Governed, versioned, FAIR open release · DOIs & provenance · continuously updated as networks grow',382,620,1047,36,18,C.blue,true);
}

// Slide 3 (KGML)
{
 const s=p.slides.add(); s.background.fill=C.white;
 title(s,'Knowledge-guided machine learning restores site-to-site transferability','Embedding methane process physics into learning fixes the leave-one-site-out collapse of standard models');
 box(s,65,188,230,410,'#E7EFF8',C.blue,16);text(s,'INPUTS',92,215,176,35,18,C.blue,true);text(s,'Harmonized\nAI-ready features\n(UMC-Train)',88,315,182,90,20,C.navy,true);text(s,'climate · soil moisture\naridity · land cover\nsite priors · footprint',86,442,186,82,15,C.gray);
 box(s,340,166,520,170,'#FFF7EE',C.orange,15);text(s,'PROCESS CONSTRAINTS (knowledge)',380,187,440,34,19,'#B86D0C',true);
 const cons=[['Diffusion-limited uptake',365,237],['Moisture & aridity thresholds',365,282],['Methanotroph / methanogen Q₁₀',625,237],['Sign, monotonicity & mass balance',625,282]];
 cons.forEach(([v,x,y])=>{shape(s,'ellipse',x,y+7,10,10,C.orange,'none');text(s,v,x+18,y,225,28,15,C.dark,false,'left')});
 box(s,340,392,235,138,C.pale,C.teal,16); text(s,'Reduced process\nemulator\n(MeMo-informed)',363,422,189,78,18,C.teal,true);
 box(s,640,392,235,138,C.pale,C.red,16); text(s,'ML residual\nnetwork\nlearns the correction',663,422,189,78,18,C.red,true);
 arrow(s,298,385,43,50,C.navy); arrow(s,588,432,38,38,C.navy); text(s,'+',588,421,38,56,41,C.navy,true);
 arrow(s,440,337,34,55,C.orange,'up').position.rotation=180; arrow(s,746,337,34,55,C.orange,'up').position.rotation=180;
 arrow(s,443,530,34,58,C.navy,'up').position.rotation=180; arrow(s,744,530,34,58,C.navy,'up').position.rotation=180;
 box(s,340,598,535,78,C.pale,C.navy,12);text(s,'Constrained prediction = physics baseline + bounded ML residual',360,614,495,46,17,C.navy,true);
 arrow(s,878,619,42,36,C.navy);
 box(s,918,188,672,488,C.navy,C.navy,16);text(s,'OUTPUT',1070,220,380,34,17,'#AFC0D7',true);text(s,'Global gridded\nupland CH₄ flux\n(UMC-Grid)',1120,278,280,115,21,C.white,true);text(s,'+ per-cell uncertainty\n+ source probability\n+ applicability mask',1120,425,280,100,16,'#D6DFEC',false,'left');
 box(s,65,710,1525,155,C.pale,C.border,16);text(s,'Why it matters: recovering skill at unseen sites (leave-one-site-out)',410,726,850,34,19,C.navy,true);
 // mini-plots
 box(s,140,772,280,76,C.white,C.border,10); s.shapes.add({geometry:'line',position:{left:150,top:780,width:255,height:55,verticalFlip:true},fill:'none',line:{style:'dashed',fill:'#8AA3C1',width:1}});
 const redPts=[[158,816],[178,796],[197,797],[218,814],[236,809],[255,810],[275,803],[294,808],[313,810],[331,797],[351,805],[371,805]]; redPts.forEach(([x,y])=>shape(s,'ellipse',x,y,9,9,'#CC5A70','none'));
 text(s,'Standard RF: CCC < 0.1 (flat — predicts the mean)',90,842,400,24,15,C.dark,true);
 text(s,'→',805,779,70,55,40,C.navy,true);
 box(s,1260,772,280,76,C.white,C.border,10); s.shapes.add({geometry:'line',position:{left:1270,top:780,width:255,height:55,verticalFlip:true},fill:'none',line:{style:'dashed',fill:'#8AA3C1',width:1}});
 const greenPts=[[1273,820],[1292,827],[1310,817],[1329,806],[1348,807],[1367,800],[1386,799],[1405,795],[1424,781],[1443,777],[1462,786],[1481,780],[1500,760]]; greenPts.forEach(([x,y])=>shape(s,'ellipse',x,y,9,9,'#319B92','none'));
 text(s,'KGML: constraints restore the 1:1 relationship',1210,842,380,24,15,C.dark,true);
}

for (let i=0;i<p.slides.items.length;i++) p.slides.items[i].speakerNotes.textFrame.setText('Editable reconstruction based on the user-provided screenshot; all diagram elements are native PowerPoint objects.');
await fs.mkdir(path.dirname(FINAL_PPTX),{recursive:true});
const stagingDir=path.join(workspaceDir,'.codex-finalizer'); await fs.mkdir(stagingDir,{recursive:true});
const candidatePath=path.join(stagingDir,'editable_figures_candidate.pptx'); await (await PresentationFile.exportPptx(p)).save(candidatePath);
const result=await finalizePresentation({explicitTotalSlideCount:3,requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],workspaceDir,candidatePath,finalPath:FINAL_PPTX,pythonExecutable:RUNTIME_PYTHON,integrityValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','15240000,8572500','--validate-heading-fit'],fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(stagingDir,'Upland_Methane_Editable_Reconstruction.validation.json')});
console.log(JSON.stringify({font,final:FINAL_PPTX,result},null,2));
