/**
 * =========================================================================
 * 【图片资产配置区 - 戈影转盘 5 件道具图片 (错金银八棱棍、铁戟、环首铁刀、青铜长矛、朱漆强弩)】
 * 
 * 资产放置目录：/src/assets/images/ 或自定义路径
 * 
 * 替换说明：
 * 若您有自己制作好的 PNG 透明背景图片，只需将下方对应的变量路径替换为您的图片即可：
 * 示例：
 *   const IMG_BA_LENG_GUN = '/assets/weapons/my_baton.png';
 * =========================================================================
 */

// 导入生成的 5 件大葆台武舞武器高清资产
import imgBaton from '../assets/images/han_gold_baton_1788506325888.jpg';
import imgJi from '../assets/images/han_iron_halberd_1788506340654.jpg';
import imgSword from '../assets/images/han_ring_sword_1788506355356.jpg';
import imgSpear from '../assets/images/han_bronze_spear_1788506369662.jpg';
import imgCrossbow from '../assets/images/han_red_crossbow_1788506384563.jpg';

// 1. 错金银八棱棍 (大葆台西汉墓出土 · 武舞之干 · 护身仪礼)
export const WEAPON_IMG_BA_LENG_GUN = imgBaton;

// 2. 铁戟 (大葆台一号墓出土 · 武舞之戚 · 破阵克敌)
export const WEAPON_IMG_TIE_JI = imgJi;

// 3. 环首铁刀 (汉代精锐近战佩刀 · 环首金饰)
export const WEAPON_IMG_HUAN_SHOU_DAO = imgSword;

// 4. 青铜长矛 (大汉战阵刺兵 · 柳叶形青铜矛头)
export const WEAPON_IMG_QING_TONG_MAO = imgSpear;

// 5. 朱漆强弩 (大葆台出土之高精远射强弩 · 漆臂铜机)
export const WEAPON_IMG_ZHU_QI_NU = imgCrossbow;

/**
 * =========================================================================
 * 导出 5 个道具图片映射字典
 * 在各组件中通过 WEAPON_IMAGES[id] 即可读取
 * =========================================================================
 */
export const WEAPON_IMAGES: Record<string, string> = {
  // 道具 1: 错金银八棱棍
  w_ba_leng_gun: WEAPON_IMG_BA_LENG_GUN,
  // 道具 2: 铁戟
  w_tie_ji: WEAPON_IMG_TIE_JI,
  // 道具 3: 环首铁刀
  w_huan_shou_dao: WEAPON_IMG_HUAN_SHOU_DAO,
  // 道具 4: 青铜长矛
  w_qing_tong_mao: WEAPON_IMG_QING_TONG_MAO,
  // 道具 5: 朱漆强弩
  w_zhu_qi_nu: WEAPON_IMG_ZHU_QI_NU,
};

