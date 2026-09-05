/* =========================================================================
   🚨【3D 模型预览组件 · GLB 接口与手势交互模块】🚨
   =========================================================================
   本组件用于重点玉器展柜纵深球体内的 3D 渲染，深度兼容 .glb / .gltf 格式。
   
   【模型存放物理路径】：
   👉 📁 存放目录：public/assets/models/
   
   【4 个球体内置模型的标准文件名】：
   - 球体 1 (螭虎纹玉佩): public/assets/models/chihu_pendant.glb
   - 球体 2 (龙凤纹韘形佩): public/assets/models/she_pendant.glb
   - 球体 3 (龙纹玉璜):   public/assets/models/dragon_huang.glb
   - 球体 4 (白玉舞人):   public/assets/models/jade_dancer.glb
   
   【手势操作支持】：
   - 🔄 单指拖拽 / 鼠标拖动：3D 全方位自由旋转，带物理惯性与阻尼回弹
   - 🔍 双指捏合 / 滚轮滚动 / UI按钮：实时缩放，倍率 60% ~ 180%
   - 🎯 复位按钮：一键重置旋转与缩放角度
   ========================================================================= */

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

interface ThreeModelViewerProps {
  modelId: string;
  // 🚨 重点：.glb 模型加载路径接口，由外部传入（如 "/assets/models/chihu_pendant.glb"）
  modelPath: string;
  relicName: string;
  relicColor?: string;
  isInteractive?: boolean;
  onUserInteracted?: () => void;
}

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = ({
  modelId,
  modelPath,
  relicName,
  relicColor = '#F5F2E9',
  isInteractive = true,
  onUserInteracted,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGlbLoaded, setIsGlbLoaded] = useState<boolean>(false);
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);

  // References for 3D state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Touch/Mouse interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.005 });
  const pinchDistanceRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);
    cameraRef.current = camera;

    // 3. Renderer with transparency and antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting: Authentic Han Jade Warm & Cool Museum Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    // Key light (Warm Amber)
    const keyLight = new THREE.DirectionalLight(0xffe8ba, 2.8);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    // Fill light (Cool Celadon)
    const fillLight = new THREE.DirectionalLight(0x79b9a1, 1.5);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    // Back rim light (Golden accent)
    const rimLight = new THREE.PointLight(0xd6a84b, 3.0, 10);
    rimLight.position.set(0, 2, -2);
    scene.add(rimLight);

    // 5. Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 6. Jade Physical Material Factory
    const createJadeMaterial = (baseHex: string) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(baseHex),
        emissive: new THREE.Color(0x1a120b),
        roughness: 0.18,
        metalness: 0.08,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        transmission: 0.35, // Translucent jade depth
        ior: 1.58,
        reflectivity: 0.5,
      });
    };

    // Helper: Build procedural 3D Han Jade Relic Mesh
    const buildProceduralJadeRelic = (id: string): THREE.Group => {
      const group = new THREE.Group();
      const jadeMat = createJadeMaterial(relicColor);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xd6a84b,
        metalness: 0.85,
        roughness: 0.25,
      });

      if (id === 'chihu_pendant') {
        // 1. 螭虎纹玉佩: 透雕璧环 + 盘螭曲折
        const torusGeom = new THREE.TorusGeometry(0.75, 0.22, 24, 48);
        const torus = new THREE.Mesh(torusGeom, jadeMat);
        group.add(torus);

        // 内部透雕旋体
        const curveGeom = new THREE.TorusKnotGeometry(0.42, 0.09, 64, 16, 2, 3);
        const curveMesh = new THREE.Mesh(curveGeom, jadeMat);
        group.add(curveMesh);

        // 金扣衔环
        const ringGeom = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
        const ring = new THREE.Mesh(ringGeom, goldMat);
        ring.position.set(0, 0.95, 0);
        group.add(ring);
      } else if (id === 'she_pendant') {
        // 2. 龙凤纹韘形佩: 鸡心佩盾形 + 穿孔 + 龙凤出廓
        const shape = new THREE.Shape();
        shape.moveTo(0, 1.0);
        shape.bezierCurveTo(0.65, 0.8, 0.75, 0.2, 0.55, -0.7);
        shape.bezierCurveTo(0.35, -1.0, -0.35, -1.0, -0.55, -0.7);
        shape.bezierCurveTo(-0.75, 0.2, -0.65, 0.8, 0, 1.0);

        // 中央圆孔
        const holePath = new THREE.Path();
        holePath.absarc(0, 0.05, 0.28, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        const extrudeSettings = { depth: 0.16, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 0.06, bevelThickness: 0.06 };
        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();
        const mesh = new THREE.Mesh(geom, jadeMat);
        group.add(mesh);

        // 龙凤出廓镂空小翼
        const wingGeom = new THREE.TorusGeometry(0.35, 0.06, 16, 32, Math.PI * 1.2);
        const wing1 = new THREE.Mesh(wingGeom, goldMat);
        wing1.position.set(0.6, 0.2, 0);
        wing1.rotation.z = -0.5;
        group.add(wing1);

        const wing2 = new THREE.Mesh(wingGeom, goldMat);
        wing2.position.set(-0.6, 0.2, 0);
        wing2.rotation.z = 2.6;
        group.add(wing2);
      } else if (id === 'dragon_huang') {
        // 3. 龙纹玉璜: 半璧弧形 + 两端龙首
        const huangGeom = new THREE.TorusGeometry(0.9, 0.22, 24, 48, Math.PI * 0.85);
        const huangMesh = new THREE.Mesh(huangGeom, jadeMat);
        huangMesh.rotation.z = Math.PI * 0.575;
        huangMesh.position.y = -0.35;
        group.add(huangMesh);

        // 龙首端饰
        const headGeom = new THREE.CylinderGeometry(0.12, 0.18, 0.28, 16);
        const head1 = new THREE.Mesh(headGeom, goldMat);
        head1.position.set(-0.72, 0.2, 0);
        head1.rotation.z = 0.6;
        group.add(head1);

        const head2 = new THREE.Mesh(headGeom, goldMat);
        head2.position.set(0.72, 0.2, 0);
        head2.rotation.z = -0.6;
        group.add(head2);
      } else {
        // 4. 白玉舞人 (翘袖折腰造型)
        // 优雅折腰躯干
        const bodyCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, 0.6, 0),
          new THREE.Vector3(-0.25, 0.2, 0),
          new THREE.Vector3(0.2, -0.3, 0),
          new THREE.Vector3(0, -0.85, 0)
        );
        const bodyGeom = new THREE.TubeGeometry(bodyCurve, 32, 0.16, 16, false);
        const bodyMesh = new THREE.Mesh(bodyGeom, jadeMat);
        group.add(bodyMesh);

        // 高扬冲霄之右长袖
        const rightSleeveCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.05, 0.35, 0),
          new THREE.Vector3(0.5, 0.75, 0.1),
          new THREE.Vector3(0.75, 0.95, 0)
        );
        const rSleeveGeom = new THREE.TubeGeometry(rightSleeveCurve, 24, 0.13, 14, false);
        const rSleeveMesh = new THREE.Mesh(rSleeveGeom, jadeMat);
        group.add(rSleeveMesh);

        // 垂腰探水之左长袖
        const leftSleeveCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.1, 0.2, 0),
          new THREE.Vector3(-0.45, -0.3, 0.1),
          new THREE.Vector3(-0.55, -0.85, 0)
        );
        const lSleeveGeom = new THREE.TubeGeometry(leftSleeveCurve, 24, 0.12, 14, false);
        const lSleeveMesh = new THREE.Mesh(lSleeveGeom, jadeMat);
        group.add(lSleeveMesh);

        // 玉簪发髻与头部
        const headGeom = new THREE.SphereGeometry(0.19, 20, 20);
        const headMesh = new THREE.Mesh(headGeom, jadeMat);
        headMesh.position.set(0.04, 0.78, 0);
        group.add(headMesh);

        // 金色双臂玉镯与腰带
        const beltGeom = new THREE.TorusGeometry(0.18, 0.035, 12, 24);
        const beltMesh = new THREE.Mesh(beltGeom, goldMat);
        beltMesh.position.set(0.02, -0.05, 0);
        beltMesh.rotation.x = Math.PI / 2;
        group.add(beltMesh);
      }

      return group;
    };

    // =========================================================================
    // 🚨【核心接口】GLTFLoader 载入 GLB 真实模型
    // 此处直接读取外部传入的 modelPath（即 public/assets/models/*.glb）
    // =========================================================================
    const loader = new GLTFLoader();
    setIsLoading(true);

    loader.load(
      modelPath,
      (gltf) => {
        // ✅ 成功加载到真实 .glb 模型文件
        console.log(`[ThreeModelViewer] 成功加载 GLB 模型: ${modelPath}`);
        setIsLoading(false);
        setIsGlbLoaded(true);
        const loadedModel = gltf.scene;

        // 自动计算包围盒并居中、自适应缩放适配球体尺寸
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.8 / maxDim;
        loadedModel.scale.set(scale, scale, scale);
        loadedModel.position.sub(center.multiplyScalar(scale));

        // 遍历开启阴影与光照计算
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        modelGroup.add(loadedModel);
      },
      (xhr) => {
        // 进度监听
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          // console.log(`模型加载进度: ${percentComplete.toFixed(0)}%`);
        }
      },
      (error) => {
        // ⚠️ 备用方案：当用户尚未在 public/assets/models/ 放置对应 .glb 文件时，
        // 自动降级无缝呈现预置的高精度汉代古玉 3D 仿真几何体与玉质材质球，保证页面不空白
        console.info(`[ThreeModelViewer] 未检测到物理 .glb 文件 (${modelPath})，已启动高精度 3D 古玉程序仿真渲染`);
        setIsLoading(false);
        setIsGlbLoaded(false);
        const proceduralMesh = buildProceduralJadeRelic(modelId);
        modelGroup.add(proceduralMesh);
      }
    );

    // 8. Render Animation Loop
    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (modelGroupRef.current) {
        // Apply inertia rotation
        if (!isDraggingRef.current) {
          modelGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          modelGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          // Apply slight damping
          rotationVelocityRef.current.x *= 0.96;
          rotationVelocityRef.current.y = (rotationVelocityRef.current.y - 0.005) * 0.95 + 0.005; // Return to gentle auto spin
        }
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 220;
      const h = container.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      renderer.dispose();
    };
  }, [modelId, modelPath, relicColor]);

  // Handle pointer down (drag rotate)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch (_) {}
    isDraggingRef.current = true;
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    if (onUserInteracted) onUserInteracted();
  };

  // Handle pointer move (3D rotate)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractive || !isDraggingRef.current || !modelGroupRef.current) return;

    const deltaX = e.clientX - previousPointerPositionRef.current.x;
    const deltaY = e.clientY - previousPointerPositionRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.012;
    modelGroupRef.current.rotation.x += deltaY * 0.012;

    rotationVelocityRef.current = {
      x: deltaY * 0.006,
      y: deltaX * 0.006,
    };

    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e?: React.PointerEvent) => {
    isDraggingRef.current = false;
    if (e) {
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
    }
  };

  // Handle Touch for Mobile Single-finger Drag & Pinch-to-Zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInteractive) return;

    // Double-finger pinch-to-zoom
    if (e.touches.length === 2 && cameraRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

      if (pinchDistanceRef.current !== null) {
        const delta = (dist - pinchDistanceRef.current) * 0.006;
        let newZ = cameraRef.current.position.z - delta;
        newZ = Math.max(1.8, Math.min(5.2, newZ));
        cameraRef.current.position.z = newZ;
        setScaleFactor(parseFloat((3.2 / newZ).toFixed(2)));
      }
      pinchDistanceRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    pinchDistanceRef.current = null;
    isDraggingRef.current = false;
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!isInteractive || !cameraRef.current) return;
    e.preventDefault();
    const delta = e.deltaY * 0.0025;
    let newZ = cameraRef.current.position.z + delta;
    newZ = Math.max(1.8, Math.min(5.2, newZ));
    cameraRef.current.position.z = newZ;
    setScaleFactor(parseFloat((3.2 / newZ).toFixed(2)));
  };

  const handleZoom = (zoomIn: boolean) => {
    if (!cameraRef.current) return;
    const delta = zoomIn ? -0.4 : 0.4;
    let newZ = cameraRef.current.position.z + delta;
    newZ = Math.max(1.8, Math.min(5.2, newZ));
    cameraRef.current.position.z = newZ;
    setScaleFactor(parseFloat((3.2 / newZ).toFixed(2)));
  };

  const handleResetRotation = () => {
    if (!modelGroupRef.current || !cameraRef.current) return;
    modelGroupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.set(0, 0, 3.2);
    setScaleFactor(1.0);
    rotationVelocityRef.current = { x: 0, y: 0.005 };
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none flex items-center justify-center overflow-hidden touch-none"
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center pointer-events-none" />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-[#D6A84B] border-t-transparent animate-spin" />
          <span className="text-[9px] font-mono text-[#F1D98D] mt-2">3D 玉料渲染中...</span>
        </div>
      )}

      {/* Interactive Controls Overlay for 3D View */}
      {isInteractive && (
        <div className="absolute bottom-1 inset-x-0 flex items-center justify-between px-2.5 z-20 pointer-events-auto">
          {/* Zoom In / Out controls */}
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-[#D6A84B]/40">
            <button
              onClick={() => handleZoom(true)}
              className="p-1 hover:text-[#FFD700] text-[#E6D3AA] active:scale-95 transition-all"
              title="放大"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <span className="text-[8px] font-mono text-[#F1D98D] min-w-[28px] text-center">
              {Math.round(scaleFactor * 100)}%
            </span>
            <button
              onClick={() => handleZoom(false)}
              className="p-1 hover:text-[#FFD700] text-[#E6D3AA] active:scale-95 transition-all"
              title="缩小"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
          </div>

          {/* Reset Rotation */}
          <button
            onClick={handleResetRotation}
            className="flex items-center gap-1 bg-black/60 hover:bg-[#2A160E] backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#D6A84B]/40 text-[#E6D3AA] hover:text-[#FFD700] text-[8px] active:scale-95 transition-all"
            title="复位视角"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>复位</span>
          </button>
        </div>
      )}

      {/* Model Type Badge */}
      <div className="absolute top-1 right-1 z-20 pointer-events-none">
        <span className="text-[7.5px] font-mono text-[#F1D98D] bg-black/60 border border-[#D6A84B]/40 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
          <Sparkles className="w-2 h-2 text-[#79B9A1]" />
          <span>{isGlbLoaded ? 'GLB 模型已就绪' : '3D 古玉仿真'}</span>
        </span>
      </div>
    </div>
  );
};
