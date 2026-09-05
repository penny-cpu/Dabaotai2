/**
 * =============================================================================
 * 微信小程序 Xr-frame 3D 模型交互控制逻辑
 * 文件：pages/relic_xr/index.js
 * 支持：GLB 模型动态加载、手指拖动 3D 旋转 (Pitch & Yaw)、双指捏合缩放 (Scale)
 * =============================================================================
 */

Page({
  data: {
    // 🚨【在此配置您的小程序内 4 个 .glb 模型的上传路径】
    // 微信小程序本地资产推荐路径：/assets/models/*.glb 或 微信云开发云存储路径
    modelUrls: {
      chihu_pendant: '/assets/models/chihu_pendant.glb',
      she_pendant:   '/assets/models/she_pendant.glb',
      dragon_huang:  '/assets/models/dragon_huang.glb',
      jade_dancer:   '/assets/models/jade_dancer.glb',
    },

    activeRelicId: 'chihu_pendant',
    activeAssetId: 'chihu_pendant',

    relicList: [
      { id: 'chihu_pendant', name: '螭虎纹玉佩', tag: '重点玉器 01', dynasty: '西汉 · 广阳王后墓' },
      { id: 'she_pendant',   name: '龙凤纹韘形佩', tag: '重点玉器 02', dynasty: '西汉 · 广阳王后墓' },
      { id: 'dragon_huang',  name: '龙纹玉璜',   tag: '重点玉器 03', dynasty: '西汉 · 广阳王后墓' },
      { id: 'jade_dancer',   name: '白玉舞人',   tag: '国宝玉器 04', dynasty: '西汉 · 广阳王后墓' },
    ],

    currentRelic: {
      name: '螭虎纹玉佩',
      tag: '重点玉器 01',
      dynasty: '西汉 · 广阳王后墓',
    },

    // 模型 3D 变换参数
    modelRotation: '0 0 0',
    modelScale: 1.0,
  },

  // 内部手势记录
  _rotX: 0,
  _rotY: 0,
  _scale: 1.0,
  _lastTouchX: 0,
  _lastTouchY: 0,
  _touchCount: 0,
  _initialDistance: 0,

  onLoad() {
    this.updateCurrentRelic('chihu_pendant');
  },

  handleSceneReady() {
    wx.showToast({ title: '3D 玉器已加载', icon: 'success', duration: 1500 });
  },

  updateCurrentRelic(id) {
    const item = this.data.relicList.find((r) => r.id === id);
    if (item) {
      this.setData({
        activeRelicId: id,
        activeAssetId: id,
        currentRelic: item,
        modelRotation: '0 0 0',
        modelScale: 1.0,
      });
      this._rotX = 0;
      this._rotY = 0;
      this._scale = 1.0;
    }
  },

  switchRelic(e) {
    const id = e.currentTarget.dataset.id;
    this.updateCurrentRelic(id);
  },

  // ---------------------------------------------------------------------------
  // 手势交互处理：单指旋转、双指缩放
  // ---------------------------------------------------------------------------
  onTouchStart(e) {
    const touches = e.touches;
    this._touchCount = touches.length;

    if (touches.length === 1) {
      // 单指开始拖拽
      this._lastTouchX = touches[0].clientX;
      this._lastTouchY = touches[0].clientY;
    } else if (touches.length === 2) {
      // 双指开始缩放计算初始间距
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      this._initialDistance = Math.hypot(dx, dy);
    }
  },

  onTouchMove(e) {
    const touches = e.touches;

    // 单指拖拽：计算 X、Y 轴旋转偏移
    if (touches.length === 1 && this._touchCount === 1) {
      const currentX = touches[0].clientX;
      const currentY = touches[0].clientY;

      const deltaX = currentX - this._lastTouchX;
      const deltaY = currentY - this._lastTouchY;

      // 旋转阻尼灵敏度
      const rotateSpeed = 0.45;
      this._rotY += deltaX * rotateSpeed;
      this._rotX += deltaY * rotateSpeed;

      // 限制俯仰角度在 [-80, 80] 度内防翻滚
      this._rotX = Math.max(-80, Math.min(80, this._rotX));

      this._lastTouchX = currentX;
      this._lastTouchY = currentY;

      this.setData({
        modelRotation: `${this._rotX.toFixed(1)} ${this._rotY.toFixed(1)} 0`,
      });
    }
    // 双指捏合：缩放模型
    else if (touches.length === 2) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const currentDistance = Math.hypot(dx, dy);

      if (this._initialDistance > 0) {
        const factor = currentDistance / this._initialDistance;
        let newScale = this._scale * factor;

        // 缩放范围限制在 0.5 到 2.5 之间
        newScale = Math.max(0.5, Math.min(2.5, newScale));
        this._scale = newScale;
        this._initialDistance = currentDistance;

        this.setData({
          modelScale: parseFloat(newScale.toFixed(2)),
        });
      }
    }
  },

  onTouchEnd() {
    this._touchCount = 0;
    this._initialDistance = 0;
  },

  // 重置 3D 视角
  resetView() {
    this._rotX = 0;
    this._rotY = 0;
    this._scale = 1.0;
    this.setData({
      modelRotation: '0 0 0',
      modelScale: 1.0,
    });
  },
});
