# 微信小程序 Xr-frame 3D 模型预览集成指引 (大葆台重点玉器纵深展柜)

本目录为专为**微信小程序 Xr-frame 框架**定制的 3D 模型预览页面源码，满足在微信小程序端加载 `.glb` 格式模型、单指拖拽 3D 旋转和双指捏合缩放的需求。

---

## 1. 模型文件存放与上传位置 (显眼标出)

请在微信小程序代码根目录中创建资产文件夹，并将 4 个 `.glb` 格式的 3D 模型放置于此：

```text
miniprogram/
└── assets/
    └── models/
        ├── chihu_pendant.glb    // 1. 螭虎纹玉佩 3D 模型文件
        ├── she_pendant.glb      // 2. 龙凤纹韘形佩 3D 模型文件
        ├── dragon_huang.glb     // 3. 龙纹玉璜 3D 模型文件
        └── jade_dancer.glb       // 4. 白玉舞人 3D 模型文件
```

> **提示**：如果模型文件较大（超过小程序包体积限制），建议将 `.glb` 模型上传到微信云开发云存储或自建 CDN，并替换 `index.js` 中 `modelUrls` 的网络链接即可（如：`https://your-domain.com/models/jade_dancer.glb`）。

---

## 2. 微信小程序环境配置

在微信小程序的 `app.json` 中，确保开启了 `xr-frame` 框架支持：

```json
{
  "pages": [
    "pages/relic_xr/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#170E09",
    "navigationBarTitleText": "大葆台重点玉器 3D 展柜",
    "navigationBarTextStyle": "white"
  },
  "lazyCodeLoading": "requiredComponents"
}
```

并在 `project.config.json` 中，基础库版本选择 **v2.27.1** 或更高（推荐最新稳定版）。

---

## 3. 功能特性

1. **GLB 模型加载**：通过 `<xr-asset-load type="gltf">` 快速缓存与渲染。
2. **手势 3D 旋转**：单指在屏幕上滑动，模型以阻尼平滑进行上下左右 3D 视角旋转。
3. **双指捏合缩放**：双指距离变化实时映射为模型的 `scale` 缩放，可细致鉴赏古玉纹理。
4. **文物自述与切换**：点击底部标签一键切换四大重点玉器，自动复位视角。
