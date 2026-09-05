/* =========================================================================
   🚨【袖舞品鉴 · 三大舞姿无背景黑色剪影图片配置 (参考图1)】🚨
   =========================================================================
   说明：
   此处配置三张纯透明无背景的大汉乐舞黑色剪影资产图片：
   A. 罗衣从风：双袖翻卷如云风回旋
   B. 盘鼓回旋：足踏七盘回转起舞
   C. 翘袖折腰：大葆台汉墓白玉舞人真实姿势（右袖冲霄拂顶，左袖折腰探水）
   
   如需替换为您自己的图片，可将图片放入 public/assets/dance_silhouettes/ 目录下同名替换：
   1. public/assets/dance_silhouettes/dance_sil_luoyi.png
   2. public/assets/dance_silhouettes/dance_sil_pangu.png
   3. public/assets/dance_silhouettes/dance_sil_qiaoxiu.png
   ========================================================================= */

import qiaoxiuImg from '../assets/images/dance_sil_qiaoxiu.png';
import luoyiImg from '../assets/images/dance_sil_luoyi.png';
import panguImg from '../assets/images/dance_sil_pangu.png';

export const DANCE_SILHOUETTE_IMAGES = {
  // 舞姿卡 A · 罗衣从风
  pose_luoyi: luoyiImg || '/assets/dance_silhouettes/dance_sil_luoyi.png',
  // 舞姿卡 B · 盘鼓回旋
  pose_pangu: panguImg || '/assets/dance_silhouettes/dance_sil_pangu.png',
  // 舞姿卡 C · 翘袖折腰 (大葆台玉舞人正确真容舞姿)
  pose_qiaoxiu: qiaoxiuImg || '/assets/dance_silhouettes/dance_sil_qiaoxiu.png',
};
