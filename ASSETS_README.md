# 大葆台汉墓小程序 · 多媒体与三维数字资产操作指南 (ASSETS_README)

欢迎查阅本指南！本项目专为北京大葆台西汉墓遗址博物馆打造。为了方便您后续将原型素材一键替换为您馆内的高清实拍图、视频、展厅录音与文物3D模型，我们在项目中建立了统一的资产注册中心并预留了标准路径。

---

## 目录结构总览

所有外部多媒体文件推荐放置于项目的 `public/assets/` 静态资源目录下（浏览器可直接寻址）：

```text
├── public/
│   └── assets/
│       ├── videos/      <-- 存放各章节视频文件 (.mp4 / .webm)
│       ├── audio/       <-- 存放背景音乐与音效文件 (.mp3 / .wav)
│       └── models/      <-- 存放文物三维模型文件 (.glb / .gltf)
└── src/
    ├── assets/
    │   └── images/      <-- 存放章节背景图、切图底图与插画 (.png / .jpg)
    └── config/
        └── assetRegistry.ts <-- 【核心】全局资产一键注册与映射文件
```

---

## 一、如何替换各章节的背景底图与图片资产

所有背景底图统一由 `src/config/assetRegistry.ts` 集中管理。

### 1. 资产清单与对应页面

| 变量名称 (在 assetRegistry.ts 中) | 对应页面/功能 | 建议尺寸与格式 |
| :--- | :--- | :--- |
| `CHAPTER_BACKGROUNDS.stage2_banquet_guide` | **第二章引导页**：汉代宴乐画像砖局部（宴乐百戏图） | 1080x1920 (9:16) JPG/PNG |
| `CHAPTER_BACKGROUNDS.stage2_queen_skirt` | **第二章玉佩缺失页**：汉代王后腰部特写（虚线玉舞人） | 1080x1920 (9:16) PNG/JPG |
| `CHAPTER_BACKGROUNDS.stage3_dancer_shadow` | **第三章记忆恢复页**：左下角玉舞人剪影虚影（占1/3） | 800x1200 透明 PNG |
| `CHAPTER_BACKGROUNDS.stage4_cuju_ball` | **第四章百戏跳丸**：7颗真实皮缝质感蹴丸图片 | 512x512 透明 PNG |
| `CHAPTER_BACKGROUNDS.stage6_huangchang_guide`| **第六章黄肠题凑引导页**：墓道入口视角看层层木椁 | 1080x1920 (9:16) JPG/PNG |
| `CHAPTER_BACKGROUNDS.stage6_timber_task` | **第六章柏木任务页**：木料结构底图（从上到下减淡） | 1080x1920 (9:16) JPG/PNG |
| `CHAPTER_BACKGROUNDS.modern_hall_exhibition` | **终章前现代展厅**：展厅实景大图（占屏65%） | 1200x1600 (3:4) JPG/PNG |
| `CHAPTER_BACKGROUNDS.bamboo_slip_texture` | **通用记忆竹简**：汉代深色刻木竹简高清质感图 | 600x1800 (1:3) 透明 PNG |

### 2. 替换操作步骤

1. 将您的高清图片文件复制到 `src/assets/images/` 目录下（例如命名为 `my_banquet_mural.png`）。
2. 打开 `src/config/assetRegistry.ts` 文件。
3. 找到对应的 import 语句，将路径更改为您上传的文件：
   ```typescript
   // 举例：修改第二章引导页背景
   import bgStage2Banquet from '../assets/images/my_banquet_mural.png';
   ```
4. 保存文件，界面将自动刷新并展示您的新图！

---

## 二、如何加入视频资产 (.mp4 / .webm)

本项目中所有视频播放组件均已预留本地播放逻辑。

### 1. 视频文件存放位置

将各章节视频放入 `public/assets/videos/` 文件夹中：
- 第一章：`public/assets/videos/prologue_tomb.mp4`
- 第二章：`public/assets/videos/banquet_dance.mp4`
- 第三章：`public/assets/videos/qiaoxiu_dance.mp4`
- 第四章：`public/assets/videos/baixi_video.mp4`
- 第五章：`public/assets/videos/funerary_video.mp4`
- 第六章：`public/assets/videos/huangchang_video.mp4`
- 第七章：`public/assets/videos/star_ascension.mp4`

### 2. 代码中的配置

在 `src/config/assetRegistry.ts` 中可以一键修改视频文件名：
```typescript
export const STAGE_VIDEO_PATHS = {
  stage2: '/assets/videos/banquet_dance.mp4',
  stage6: '/assets/videos/huangchang_video.mp4',
  // ... 其余章节
};
```
在视频播放组件 `VideoPlayerPlaceholder.tsx` 中，如果本地存在上述视频文件，播放器会直接读取该文件进行高清全屏播放；若未放入视频文件，则自动显示精美的大葆台汉墓古代风格封面与跳过按钮，保证程序平稳运行不报错。

---

## 三、如何加入真实音频/音效资产 (.mp3 / .wav)

本项目内置了基于 Web Audio API 的即时古乐合成器（青铜编钟、石磬古鼓、竹简轻击等），同时也支持直接外挂高品质真实录音：

### 1. 音频文件存放位置

将音乐文件放入 `public/assets/audio/` 目录下：
- `tomb_ambient.mp3`（神秘墓室环境背景音）
- `court_music.mp3`（汉代宫廷盛宴背景音乐）
- `bronze_chime.wav`（青铜古钟声）
- `stone_drum.wav`（石磬厚重击节声）
- `bamboo_slip.wav`（竹简碰撞木质声）

### 2. 代码中的绑定

在 `src/utils/soundEngine.ts` 中，已配置好 `Audio` 对象的加载与容错 fallback。您只需将音频文件复制进对应目录即可直接听到真实的古乐悠扬！

---

## 四、如何接入文物 3D 模型 (.glb / .gltf)

本项目支持通过 Three.js / React Three Fiber 加载文物三维模型：

### 1. 模型文件存放位置

将使用 3D 激光扫描或倾斜摄影生成的模型放置于 `public/assets/models/` 目录：
- `public/assets/models/jade_dancer.glb`（西汉白玉舞人 3D 扫描模型）
- `public/assets/models/caihui_pot.glb`（西汉彩绘云气陶壶 3D 扫描模型）
- `public/assets/models/huangchang_tomb.glb`（大葆台一号墓黄肠题凑复原三维空间模型）

### 2. 调用 3D 模型的组件

在 `src/components/ThreeArtifactViewer.tsx` 或对应章节中，直接指定路径：
```tsx
<Artifact3DViewer 
  modelUrl="/assets/models/jade_dancer.glb" 
  autoRotate={true}
  ambientIntensity={0.8}
/>
```

---

如在替换过程中有任何疑问，请查阅 `src/config/assetRegistry.ts` 中的详细中文说明！
