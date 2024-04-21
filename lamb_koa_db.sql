/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.192.19_mysql
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : lamb_koa_db

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 18/04/2024 08:36:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_file_list
-- ----------------------------
DROP TABLE IF EXISTS `t_file_list`;
CREATE TABLE `t_file_list`  (
  `fileid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名称',
  `filesize` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件大小',
  `filetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件类型'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_file_list
-- ----------------------------
INSERT INTO `t_file_list` VALUES ('1713335336347_漫画算法-小灰的算法之旅.pdf', '漫画算法-小灰的算法之旅.pdf', '36332028', 'application/pdf');

-- ----------------------------
-- Table structure for t_logistics_line
-- ----------------------------
DROP TABLE IF EXISTS `t_logistics_line`;
CREATE TABLE `t_logistics_line`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '线路名称',
  `pathway` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '途径',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `state` int(255) NULL DEFAULT NULL COMMENT '置顶',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_logistics_line
-- ----------------------------
INSERT INTO `t_logistics_line` VALUES (1, '北京廊坊专线', '廊坊、北京、大兴、海淀', '10栋28号', '13614479257', 2);
INSERT INTO `t_logistics_line` VALUES (5, 'test', 'tets', 'test', '12345678911', 2);

-- ----------------------------
-- Table structure for t_user_list
-- ----------------------------
DROP TABLE IF EXISTS `t_user_list`;
CREATE TABLE `t_user_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_list
-- ----------------------------
INSERT INTO `t_user_list` VALUES (1, 'admin', '1');
INSERT INTO `t_user_list` VALUES (2, 'zhangsan', '123456');
INSERT INTO `t_user_list` VALUES (3, 'admin2', '2');
INSERT INTO `t_user_list` VALUES (4, 'admin3', '2');
INSERT INTO `t_user_list` VALUES (5, 'admin4', '2');
INSERT INTO `t_user_list` VALUES (6, 'admin5', '2');

SET FOREIGN_KEY_CHECKS = 1;
