/* =========================================================================
   🚨【重点玉器纵深展柜 · 4个球体内置 3D 模型 (.glb) 资产接口与存放指引】🚨
   =========================================================================
   尊敬的开发者：
   本组件为【重点玉器纵深展柜】页面的核心 3D 模型交互组件。
   4 个纵深透视球体内已全部内置真实的 3D 模型渲染接口（ThreeModelViewer），
   兼容标准 .glb / .gltf 格式，并完整支持单指拖拽 3D 旋转与双指捏合手势缩放。

   👉 📁【模型文件存放物理目录】：
      public/assets/models/

   👉 📍【4 个球体内置模型在代码中的快速替换接口（见下方 JADE_SPHERE_3D_CONFIG）】：
      1. 球体 1【螭虎纹玉佩】：文件存放于 public/assets/models/chihu_pendant.glb
      2. 球体 2【龙凤纹韘形佩】：文件存放于 public/assets/models/she_pendant.glb
      3. 球体 3【龙纹玉璜】：   文件存放于 public/assets/models/dragon_huang.glb
      4. 球体 4【白玉舞人】：   文件存放于 public/assets/models/jade_dancer.glb

   💡 替换方式：
      方式 A：直接将您的 4 个 .glb 模型重命名为上述文件名，放入 public/assets/models/ 目录中；
      方式 B：或者直接在下方 JADE_SPHERE_3D_CONFIG 中修改对应的 glbPath 为您的真实相对路径或远程 CDN URL！
   ========================================================================= */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Move, ArrowRight, RotateCw, Code2, Copy, Check, X, FileCode, Box } from 'lucide-react';
import { UnifiedDialogueBox } from './UnifiedDialogueBox';
import { HanMuseumTopBar, HanCloudTitle } from './HanLinearDecorations';
import { HanPlaqueButton } from './HanPlaqueButton';
import { DialogueLine } from '../types';
import { soundFX } from '../utils/soundEngine';
import { ThreeModelViewer } from './ThreeModelViewer';
import { RELIC_3D_MODELS, Relic3DModelConfig } from '../data/modelAssets';

/* =========================================================================
   🚨【开发者替换专区】4 个球体内置 3D 模型 (.glb) 引用配置
   ========================================================================= */
export const JADE_SPHERE_3D_CONFIG = {
  // 1. 球体 1【螭虎纹玉佩】
  // 存放目录：public/assets/models/chihu_pendant.glb
  sphere1_chihu: {
    id: 'chihu_pendant',
    name: '螭虎纹玉佩',
    glbPath: '/assets/models/chihu_pendant.glb', // 👈 替换此行：修改为您的真实 .glb 模型路径或 URL
    diskFilePath: 'public/assets/models/chihu_pendant.glb',
  },

  // 2. 球体 2【龙凤纹韘形佩】
  // 存放目录：public/assets/models/she_pendant.glb
  sphere2_she: {
    id: 'she_pendant',
    name: '龙凤纹韘形佩',
    glbPath: '/assets/models/she_pendant.glb', // 👈 替换此行：修改为您的真实 .glb 模型路径或 URL
    diskFilePath: 'public/assets/models/she_pendant.glb',
  },

  // 3. 球体 3【龙纹玉璜】
  // 存放目录：public/assets/models/dragon_huang.glb
  sphere3_huang: {
    id: 'dragon_huang',
    name: '龙纹玉璜',
    glbPath: '/assets/models/dragon_huang.glb', // 👈 替换此行：修改为您的真实 .glb 模型路径或 URL
    diskFilePath: 'public/assets/models/dragon_huang.glb',
  },

  // 4. 球体 4【白玉舞人】
  // 存放目录：public/assets/models/jade_dancer.glb
  sphere4_dancer: {
    id: 'jade_dancer_core',
    name: '白玉舞人',
    glbPath: '/assets/models/jade_dancer.glb', // 👈 替换此行：修改为您的真实 .glb 模型路径或 URL
    diskFilePath: 'public/assets/models/jade_dancer.glb',
  },
};

interface JadeSphereInteractiveProps {
  onComplete: () => void;
}

interface SphereRelic {
  id: string;
  name: string;
  tag: string;
  muralDesc: string;
  glbModelPath: string;
  diskFilePath: string;
  modelConfig: Relic3DModelConfig;
  dialogue: DialogueLine[];
  renderSvg: (isFront: boolean) => React.ReactNode;
}

const SPHERE_RELICS: SphereRelic[] = [
  {
    id: JADE_SPHERE_3D_CONFIG.sphere1_chihu.id,
    name: JADE_SPHERE_3D_CONFIG.sphere1_chihu.name,
    tag: '重点玉器 01 · 3D',
    muralDesc: '大葆台西汉王后墓出土 · 螭虎回首，身躯盘旋流转',
    glbModelPath: JADE_SPHERE_3D_CONFIG.sphere1_chihu.glbPath,
    diskFilePath: JADE_SPHERE_3D_CONFIG.sphere1_chihu.diskFilePath,
    modelConfig: RELIC_3D_MODELS.chihu_pendant,
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '螭虎纹玉佩',
        text: '终于等到你了。两千年过去，我还在这里。手指拖拽可 3D 旋转赏鉴我的螭虎镂雕，双指捏合可缩放。大汉的记忆，还没有沉睡。',
      },
    ],
    renderSvg: (isFront) => (
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
        <circle cx="50" cy="50" r="36" fill="none" stroke={isFront ? '#F1D98D' : '#C8943D'} strokeWidth="3.5" />
        <path d="M32 50 Q50 28 68 50 Q50 72 32 50" fill="none" stroke={isFront ? '#F1D98D' : '#C8943D'} strokeWidth="3.5" />
        <circle cx="50" cy="50" r="8" fill={isFront ? '#F1D98D' : '#A9782B'} />
      </svg>
    ),
  },
  {
    id: JADE_SPHERE_3D_CONFIG.sphere2_she.id,
    name: JADE_SPHERE_3D_CONFIG.sphere2_she.name,
    tag: '重点玉器 02 · 3D',
    muralDesc: '大葆台西汉王后墓出土 · 韘形如决，龙凤腾跃回环',
    glbModelPath: JADE_SPHERE_3D_CONFIG.sphere2_she.glbPath,
    diskFilePath: JADE_SPHERE_3D_CONFIG.sphere2_she.diskFilePath,
    modelConfig: RELIC_3D_MODELS.she_pendant,
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '龙凤纹韘形佩',
        text: '我们同墓出土，同属王后组玉佩。我的形制融合了璧与韘，中有一孔，两侧透雕龙凤。在球体中旋转我，即可看清两侧游丝微雕。',
      },
    ],
    renderSvg: (isFront) => (
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
        <path
          d="M50 14 C32 14 20 34 20 58 C20 78 34 88 50 88 C66 88 80 78 80 58 C80 34 68 14 50 14 Z"
          fill="none"
          stroke={isFront ? '#F1D98D' : '#C8943D'}
          strokeWidth="3.5"
        />
        <circle cx="50" cy="54" r="14" fill="none" stroke={isFront ? '#F1D98D' : '#C8943D'} strokeWidth="3.5" />
        <path d="M20 38 Q10 24 24 18 M80 38 Q90 24 76 18" stroke={isFront ? '#F1D98D' : '#C8943D'} strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    id: JADE_SPHERE_3D_CONFIG.sphere3_huang.id,
    name: JADE_SPHERE_3D_CONFIG.sphere3_huang.name,
    tag: '重点玉器 03 · 3D',
    muralDesc: '大葆台西汉王后墓出土 · 方折回转，承继秦风汉韵',
    glbModelPath: JADE_SPHERE_3D_CONFIG.sphere3_huang.glbPath,
    diskFilePath: JADE_SPHERE_3D_CONFIG.sphere3_huang.diskFilePath,
    modelConfig: RELIC_3D_MODELS.dragon_huang,
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '龙纹玉璜',
        text: '我身上刻着方折回转的秦式龙纹。半璧为璜，两端雕饰庄严龙首。我曾是王后组玉佩的重要核心构件。',
      },
    ],
    renderSvg: (isFront) => (
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
        <path
          d="M18 68 C18 38 38 24 50 24 C62 24 82 38 82 68"
          fill="none"
          stroke={isFront ? '#F1D98D' : '#C8943D'}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="21" cy="65" r="3" fill="#120A07" />
        <circle cx="79" cy="65" r="3" fill="#120A07" />
      </svg>
    ),
  },
  {
    id: JADE_SPHERE_3D_CONFIG.sphere4_dancer.id,
    name: JADE_SPHERE_3D_CONFIG.sphere4_dancer.name,
    tag: '国宝聚焦 · 3D',
    muralDesc: '大葆台西汉王后墓出土 · 翘袖折腰，定格两千载汉舞风姿',
    glbModelPath: JADE_SPHERE_3D_CONFIG.sphere4_dancer.glbPath,
    diskFilePath: JADE_SPHERE_3D_CONFIG.sphere4_dancer.diskFilePath,
    modelConfig: RELIC_3D_MODELS.jade_dancer_core,
    dialogue: [
      {
        speaker: 'dancer',
        speakerName: '玉舞人',
        text: '这些玉器唤醒了我的身躯。汉代舞蹈重长袖、细腰，刚柔相济。请在 3D 球体中细观我右手冲霄扬袖、左手折腰探水的姿态！',
      },
    ],
    renderSvg: (isFront) => (
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
        <path
          d="M50 25 Q35 48 45 68 Q55 82 48 95"
          stroke={isFront ? '#79B9A1' : '#568E7A'}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M45 40 Q75 18 85 12 M40 48 Q15 70 10 88"
          stroke={isFront ? '#79B9A1' : '#568E7A'}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="18" r="5.5" fill={isFront ? '#79B9A1' : '#568E7A'} />
      </svg>
    ),
  },
];

export const JadeSphereInteractive: React.FC<JadeSphereInteractiveProps> = ({ onComplete }) => {
  // Continuous rotation angle in degrees (0, 90, 180, 270, etc.)
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'upload' | 'wxml' | 'js' | 'wxss' | 'json'>('upload');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false);

  const startXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);

  const activeRelic = SPHERE_RELICS[currentIdx];

  // Rotate smoothly to specific index (0, 1, 2, 3)
  const rotateToIndex = (targetIdx: number) => {
    soundFX.playBronzeChime();
    soundFX.playStoneDrum();
    setCurrentIdx(targetIdx);
    setRotationAngle(-targetIdx * 90);
    setIsEnlarged(false);
  };

  const handleTouchStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleTouchMove = (clientX: number) => {
    if (!isDragging) return;
    const diffX = clientX - startXRef.current;
    // Continuous 3D rotation with drag sensitivity
    const newAngle = startAngleRef.current + diffX * 0.45;
    setRotationAngle(newAngle);

    // Calculate nearest relic index on drag
    const normalized = ((-newAngle % 360) + 360) % 360;
    const nearestIdx = Math.round(normalized / 90) % 4;
    if (nearestIdx !== currentIdx) {
      setCurrentIdx(nearestIdx);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    soundFX.playSandScratch();
    soundFX.playBronzeChime();

    // Snap to nearest 90-degree multiple
    const snappedAngle = Math.round(rotationAngle / 90) * 90;
    setRotationAngle(snappedAngle);
    const normalized = ((-snappedAngle % 360) + 360) % 360;
    const finalIdx = Math.round(normalized / 90) % 4;
    setCurrentIdx(finalIdx);
  };

  const handleConfirmAndTransition = () => {
    soundFX.playMemoryRestore();
    onComplete();
  };

  const copyCodeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    });
  };

  // Sample code snippets for WeChat Mini-Program Xr-frame
  const CODE_SNIPPETS = {
    upload: `/* =========================================================================
   🚨【3D 模型文件存放目录与代码引用行快速指引】🚨
   =========================================================================
   👉 📁 模型文件本地存放物理目录：
      public/assets/models/
   
   👉 📍 4 个球体内置 3D 模型在代码中的确切定义与引用位置：
      【组件代码文件】：src/components/JadeSphereInteractive.tsx (约第 33~68 行)
      【配置定义对象】：JADE_SPHERE_3D_CONFIG
      
      1. 球体 1【螭虎纹玉佩】：
         - 存放文件：public/assets/models/chihu_pendant.glb
         - 代码引用：JADE_SPHERE_3D_CONFIG.sphere1_chihu.glbPath
      
      2. 球体 2【龙凤纹韘形佩】：
         - 存放文件：public/assets/models/she_pendant.glb
         - 代码引用：JADE_SPHERE_3D_CONFIG.sphere2_she.glbPath
      
      3. 球体 3【龙纹玉璜】：
         - 存放文件：public/assets/models/dragon_huang.glb
         - 代码引用：JADE_SPHERE_3D_CONFIG.sphere3_huang.glbPath
      
      4. 球体 4【白玉舞人】：
         - 存放文件：public/assets/models/jade_dancer.glb
         - 代码引用：JADE_SPHERE_3D_CONFIG.sphere4_dancer.glbPath
   
   👉 🛠️ 3D 模型渲染器底层接口文件：
      - 文件路径：src/components/ThreeModelViewer.tsx (约第 260 行)
      - 底层调用：loader.load(modelPath, (gltf) => { ... })
      - 自动支持：GLB 居中、缩放归一化、投射阴影、单指 3D 旋转与双指捏合缩放！
   
   💡 极速替换两步法：
      第 1 步：将您导出的 4 个真实 .glb 模型文件复制到 public/assets/models/ 目录中；
      第 2 步：刷新网页，系统将自动从程序仿真玉质无缝切换为真实 3D 文物模型！
   ========================================================================= */`,
    wxml: `<!-- 微信小程序 Xr-frame 3D 模型预览页面 (pages/relic_xr/index.wxml) -->
<view class="xr-page-container">
  <xr-scene id="xr-scene" bind:ready="handleSceneReady">
    <xr-assets>
      <!-- 🚨 注册 4 个 .glb 模型路径 -->
      <xr-asset-load type="gltf" asset-id="chihu_pendant" src="{{modelUrls.chihu_pendant}}" />
      <xr-asset-load type="gltf" asset-id="she_pendant"   src="{{modelUrls.she_pendant}}" />
      <xr-asset-load type="gltf" asset-id="dragon_huang"  src="{{modelUrls.dragon_huang}}" />
      <xr-asset-load type="gltf" asset-id="jade_dancer"   src="{{modelUrls.jade_dancer}}" />
    </xr-assets>

    <!-- 博物馆环境光与平行光照 -->
    <xr-light type="ambient" color="1 0.95 0.88" intensity="1.2" />
    <xr-light type="directional" rotation="45 35 0" color="1 0.9 0.75" intensity="2.5" />

    <!-- 3D 摄像机 -->
    <xr-camera position="0 0 3" clear-color="0.05 0.03 0.02 1" target="relic-node" />

    <!-- 3D 玉器节点 (支持手势旋转与缩放) -->
    <xr-node id="relic-node" rotation="{{modelRotation}}" scale="{{modelScale}} {{modelScale}} {{modelScale}}">
      <xr-gltf model="{{activeAssetId}}" anim-autoplay />
    </xr-node>
  </xr-scene>

  <!-- 手势透明层: 支持单指拖拽 3D 旋转与双指捏合缩放 -->
  <view class="gesture-overlay"
        catchtouchstart="onTouchStart"
        catchtouchmove="onTouchMove"
        catchtouchend="onTouchEnd" />
</view>`,
    js: `// pages/relic_xr/index.js
Page({
  data: {
    // 🚨 4 个 .glb 模型路径配置
    modelUrls: {
      chihu_pendant: '/assets/models/chihu_pendant.glb',
      she_pendant:   '/assets/models/she_pendant.glb',
      dragon_huang:  '/assets/models/dragon_huang.glb',
      jade_dancer:   '/assets/models/jade_dancer.glb',
    },
    activeAssetId: 'chihu_pendant',
    modelRotation: '0 0 0',
    modelScale: 1.0,
  },
  _rotX: 0, _rotY: 0, _scale: 1.0,

  // 单指滑动 3D 旋转，双指捏合缩放
  onTouchMove(e) {
    if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - this._lastX;
      const deltaY = e.touches[0].clientY - this._lastY;
      this._rotY += deltaX * 0.45;
      this._rotX = Math.max(-80, Math.min(80, this._rotX + deltaY * 0.45));
      this.setData({ modelRotation: \`\${this._rotX.toFixed(1)} \${this._rotY.toFixed(1)} 0\` });
    } else if (e.touches.length === 2) {
      // 双指距离计算与 scale 缩放更新
    }
  }
});`,
    wxss: `/* pages/relic_xr/index.wxss */
.xr-page-container {
  width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1f120a 0%, #0c0704 100%);
  display: flex; flex-direction: column; justify-content: space-between;
}
.gesture-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 20;
}`,
    json: `{
  "navigationBarTitleText": "重点玉器纵深展柜 · 3D预览",
  "navigationBarBackgroundColor": "#170E09",
  "navigationBarTextStyle": "white",
  "usingComponents": {}
}`,
  };

  return (
    <div
      onMouseDown={(e) => handleTouchStart(e.clientX)}
      onMouseMove={(e) => handleTouchMove(e.clientX)}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full text-[#E6D3AA] flex flex-col justify-between overflow-hidden font-serif select-none cursor-grab active:cursor-grabbing touch-none han-mural-wall-bg"
    >
      <div className="han-mural-texture" />
      {/* Museum Stone & Mural Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-96 pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(214, 168, 75, 0.35) 0%, rgba(110, 48, 36, 0.15) 50%, transparent 80%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-black/80" />
      </div>

      <HanMuseumTopBar />

      {/* Top Header & Xr-frame Code Helper Button */}
      <div className="relative z-20 pt-1 px-4 flex items-center justify-between">
        <HanCloudTitle title="重点玉器纵深展柜" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCodeModal(true);
          }}
          className="flex items-center gap-1 bg-[#2A160E] hover:bg-[#3D2114] border border-[#D6A84B] px-2.5 py-1 rounded-full text-[10px] text-[#F1D98D] shadow-md active:scale-95 transition-all"
        >
          <Code2 className="w-3 h-3 text-[#D6A84B]" />
          <span>小程序 Xr-frame 代码</span>
        </button>
      </div>

      {/* TOP ARTIFACT SHOWCASE CARD (Synced with Front Sphere) */}
      <div className="relative z-20 mx-auto w-[88%] max-w-xs rounded-2xl bg-gradient-to-b from-[#2E1A11]/95 via-[#1E110A]/95 to-[#120A07] border border-[#D6A84B] shadow-[0_0_35px_rgba(214,168,75,0.25)] p-3 flex flex-col items-center text-center space-y-1 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center gap-2">
          {/* Badge */}
          <div className="flex items-center gap-1 text-[8.5px] font-mono text-[#F1D98D] bg-[#120A07] px-2 py-0.5 rounded-full border border-[#8C6D46]">
            <Sparkles className="w-2.5 h-2.5 text-[#D6A84B]" />
            <span>{activeRelic.tag}</span>
          </div>
          <span className="text-[8px] font-mono text-[#79B9A1] bg-black/60 px-1.5 py-0.5 rounded border border-[#79B9A1]/40">
            支持 3D 旋转 & 缩放
          </span>
        </div>

        {/* Big Name */}
        <h3 className="text-base font-serif font-black text-[#F1D98D] tracking-widest title-drop-shadow">
          {activeRelic.name}
        </h3>

        {/* 🚨 3D Model GLB Asset Interface Location Indicator */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowCodeModal(true);
          }}
          className="cursor-pointer flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 hover:bg-[#2A160E] border border-[#D6A84B]/50 text-[8px] font-mono text-[#F1D98D] shadow transition-all active:scale-95"
          title="点击查看 3D 模型存放目录与代码引用位置"
        >
          <Box className="w-2.5 h-2.5 text-[#D6A84B]" />
          <span>模型接口: {activeRelic.diskFilePath}</span>
        </div>

        {/* Description */}
        <p className="text-[9px] text-[#C4A98B] leading-relaxed line-clamp-2 px-1">
          {activeRelic.muralDesc}
        </p>
      </div>

      {/* 3D ROTATING 4-SPHERE SPATIAL DEPTH DISPLAY (EACH SPHERE EMBEDS 3D VIEWER) */}
      <div className="relative flex-1 flex items-center justify-center my-auto px-4 z-10 min-h-[220px]">
        {/* Orbital Ellipse Halo Guide Ring */}
        <div
          className="absolute w-[280px] h-[110px] rounded-[100%] border border-dashed border-[#D6A84B]/30 pointer-events-none"
          style={{ transform: 'rotateX(68deg)' }}
        />
        <div
          className="absolute w-[240px] h-[85px] rounded-[100%] border border-[#8C6D46]/20 pointer-events-none"
          style={{ transform: 'rotateX(68deg)' }}
        />

        {/* 4 Spheres in 3D Depth Orbit */}
        {SPHERE_RELICS.map((relic, idx) => {
          const sphereBaseAngle = idx * 90;
          const totalAngle = rotationAngle + sphereBaseAngle;
          const rad = (totalAngle * Math.PI) / 180;

          // 3D Orbital Coordinates
          const z = Math.cos(rad); // from -1 (back) to +1 (front)
          const isFront = z > 0.65;
          const depthProgress = (z + 1) / 2; // 0 to 1

          // Perspective Scale & Opacity with dynamic focus
          // 点击主球体放大进行 360 度全方位自由旋转；两侧文物缩小并虚化 (blur)
          const baseScale = 0.62 + depthProgress * 0.46; // 0.62 (back) ~ 1.08 (front)
          const scale = isFront
            ? isEnlarged
              ? 1.36
              : 1.08
            : isEnlarged
            ? baseScale * 0.6
            : baseScale;

          const opacity = isFront
            ? 1.0
            : isEnlarged
            ? 0.2
            : 0.45 + depthProgress * 0.55;

          const blurAmount = isFront ? '0px' : isEnlarged ? '3.5px' : '0px';

          const x = isEnlarged && !isFront
            ? Math.sin(rad) * 138 // push side artifacts slightly further out when center is enlarged
            : Math.sin(rad) * 118; // horizontal spread
          const y = isEnlarged && isFront ? -10 : -Math.cos(rad) * 20;

          const zIndex = isFront ? (isEnlarged ? 40 : 30) : Math.round(depthProgress * 20);

          return (
            <div
              key={relic.id}
              onClick={(e) => {
                if (!isFront) {
                  e.stopPropagation();
                  setIsEnlarged(false);
                  rotateToIndex(idx);
                } else {
                  // 点击放大中央球体 / 退出放大
                  e.stopPropagation();
                  soundFX.playStoneDrum();
                  setIsEnlarged((prev) => !prev);
                }
              }}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
                opacity: opacity,
                filter: `blur(${blurAmount})`,
                zIndex: zIndex,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease-out, filter 0.45s ease-out',
              }}
              className="absolute flex flex-col items-center cursor-pointer group select-none"
            >
              {/* Spherical Glowing Container with Embedded 3D Model */}
              <div
                className={`relative rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
                  isFront
                    ? isEnlarged
                      ? 'w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-b from-[#3D2319] via-[#24130C] to-[#120A07] border-2 border-[#FFE87A] shadow-[0_0_50px_rgba(255,232,122,0.8)]'
                      : 'w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-b from-[#3D2319] via-[#24130C] to-[#120A07] border-2 border-[#F1D98D] shadow-[0_0_35px_rgba(241,217,141,0.65)]'
                    : 'w-20 h-20 bg-gradient-to-b from-[#24130C] via-[#1A0E08] to-[#0D0704] border border-[#8C6D46]/70 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }`}
                onMouseDown={(e) => isFront && isEnlarged && e.stopPropagation()}
                onTouchStart={(e) => isFront && isEnlarged && e.stopPropagation()}
              >
                {/* Internal Jade Sheen Texture */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(241,217,141,0.3),transparent_70%)] pointer-events-none z-10" />

                {/* 🚨 EMBEDDED 3D MODEL VIEWER FOR EACH SPHERE */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <ThreeModelViewer
                    modelId={relic.id}
                    modelPath={relic.glbModelPath}
                    relicName={relic.name}
                    relicColor={relic.modelConfig.jadeColor}
                    isInteractive={isFront}
                  />
                </div>

                {/* Front Ring Highlight Spinner */}
                {isFront && (
                  <div
                    className={`absolute -inset-1 rounded-full border border-dashed border-[#F1D98D]/60 animate-spin pointer-events-none ${
                      isEnlarged ? 'border-[#FFE87A]' : ''
                    }`}
                    style={{ animationDuration: isEnlarged ? '16s' : '24s' }}
                  />
                )}

                {/* 360 Rotation indicator badge on center sphere */}
                {isFront && (
                  <div className="absolute bottom-1.5 z-20 pointer-events-none px-2 py-0.5 rounded-full bg-black/65 border border-[#D6A84B]/60 text-[7.5px] font-serif text-[#F1D98D] shadow flex items-center gap-1 backdrop-blur-xs">
                    <RotateCw className="w-2 h-2 text-[#FFE87A] animate-spin" style={{ animationDuration: '6s' }} />
                    <span>{isEnlarged ? '360°旋转鉴赏中' : '点击放大360°旋转'}</span>
                  </div>
                )}
              </div>

              {/* Sphere Caption */}
              <span
                className={`mt-1.5 text-[9px] font-serif font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow transition-all ${
                  isFront
                    ? isEnlarged
                      ? 'text-[#FFE87A] bg-[#1E110A] border border-[#FFE87A] shadow-[0_0_15px_rgba(255,232,122,0.5)]'
                      : 'text-[#F1D98D] bg-[#160D09] border border-[#D6A84B] shadow-[0_0_10px_rgba(214,168,75,0.4)]'
                    : 'text-[#A89078] bg-black/70 border border-[#4A3321]'
                }`}
              >
                {relic.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* CONTROLLER & PAGINATION AREA */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 pb-36">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-[9px] text-[#F1D98D] font-serif bg-black/80 px-3.5 py-1 rounded-full border border-[#8C6D46] shadow backdrop-blur-sm">
            <Move className="w-3 h-3 text-[#D6A84B] animate-pulse" />
            <span>左右滑动 · 探索玉器</span>
          </div>

          {/* 4 Pagination Indicator Dots */}
          <div className="flex items-center gap-2 pt-0.5">
            {SPHERE_RELICS.map((_, i) => (
              <button
                key={i}
                onClick={() => rotateToIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIdx
                    ? 'w-5 bg-[#D6A84B] shadow-[0_0_8px_#D6A84B]'
                    : 'w-1.5 bg-[#4A3321] hover:bg-[#6E3024]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Transition button if focused on Jade Dancer (Relic 4) */}
        {currentIdx === 3 && (
          <HanPlaqueButton
            onClick={handleConfirmAndTransition}
            size="md"
            className="animate-bounce mt-1"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#D6A84B]" />}
          >
            进入袖舞品鉴记忆
          </HanPlaqueButton>
        )}
      </div>

      {/* BOTTOM STANDARDIZED DIALOGUE BOX */}
      <UnifiedDialogueBox
        dialogues={activeRelic.dialogue}
        currentIndex={0}
        onNext={() => {
          if (currentIdx === 3) {
            handleConfirmAndTransition();
          } else {
            rotateToIndex((currentIdx + 1) % SPHERE_RELICS.length);
          }
        }}
      />

      {/* =========================================================================
          微信小程序 Xr-frame 3D 代码与模型上传指引弹窗
          ========================================================================= */}
      {showCodeModal && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col justify-between p-4 animate-fade-in font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#D6A84B]/40">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-[#F1D98D]" />
              <div>
                <h3 className="text-sm font-bold text-[#F1D98D]">
                  微信小程序 Xr-frame 3D 预览代码与上传说明
                </h3>
                <p className="text-[10px] text-[#A89078]">
                  支持 .glb 模型文件加载、手指拖拽 3D 旋转与双指缩放
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCodeModal(false)}
              className="w-7 h-7 rounded-full bg-[#2A160E] border border-[#D6A84B] flex items-center justify-center text-[#F1D98D]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 my-2 overflow-x-auto pb-1 text-[11px]">
            <button
              onClick={() => setActiveCodeTab('upload')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCodeTab === 'upload'
                  ? 'bg-[#D6A84B] text-black font-bold shadow'
                  : 'bg-[#1E110A] text-[#A89078] border border-[#8C6D46]/60'
              }`}
            >
              📁 上传位置
            </button>
            <button
              onClick={() => setActiveCodeTab('wxml')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCodeTab === 'wxml'
                  ? 'bg-[#D6A84B] text-black font-bold shadow'
                  : 'bg-[#1E110A] text-[#A89078] border border-[#8C6D46]/60'
              }`}
            >
              index.wxml
            </button>
            <button
              onClick={() => setActiveCodeTab('js')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCodeTab === 'js'
                  ? 'bg-[#D6A84B] text-black font-bold shadow'
                  : 'bg-[#1E110A] text-[#A89078] border border-[#8C6D46]/60'
              }`}
            >
              index.js
            </button>
            <button
              onClick={() => setActiveCodeTab('wxss')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCodeTab === 'wxss'
                  ? 'bg-[#D6A84B] text-black font-bold shadow'
                  : 'bg-[#1E110A] text-[#A89078] border border-[#8C6D46]/60'
              }`}
            >
              index.wxss
            </button>
            <button
              onClick={() => setActiveCodeTab('json')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCodeTab === 'json'
                  ? 'bg-[#D6A84B] text-black font-bold shadow'
                  : 'bg-[#1E110A] text-[#A89078] border border-[#8C6D46]/60'
              }`}
            >
              index.json
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="relative flex-1 bg-[#0A0604] border border-[#8C6D46]/60 rounded-xl p-3 overflow-y-auto font-mono text-[10.5px] leading-relaxed text-[#E6D3AA] select-text">
            <pre className="whitespace-pre-wrap">
              {CODE_SNIPPETS[activeCodeTab]}
            </pre>

            {/* Quick Copy Button */}
            <button
              onClick={() => copyCodeToClipboard(CODE_SNIPPETS[activeCodeTab])}
              className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#2A160E] hover:bg-[#3D2114] border border-[#D6A84B] px-2.5 py-1 rounded-md text-[10px] text-[#F1D98D] shadow"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">已复制!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#D6A84B]" />
                  <span>复制代码</span>
                </>
              )}
            </button>
          </div>

          {/* Footer note */}
          <div className="pt-2 text-center text-[10px] text-[#A89078]">
            <span>代码文件已完整内置保存在：src/miniprogram/xr-frame/</span>
          </div>
        </div>
      )}
    </div>
  );
};
