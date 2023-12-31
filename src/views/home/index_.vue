<template>
  <div class="photoAlbum">
    <div id="container"></div>
    <div id='popup'></div>
  </div>
</template>
<script setup>
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const pictureList = [
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%8F%98%E8%89%B2%E9%BE%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%AD%94%E9%9B%80.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E6%B5%B7%E8%B1%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%97.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%AE%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%9E%AA%E7%BE%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%80%81%E8%99%8E.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%99%8E%E9%B2%B8.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9C%82.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9D%B4%E8%9D%B6.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9E%83%E8%9F%B9.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%B1%A1.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%9D%92%E8%9B%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%AA%86%E9%A9%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B2%A8%E9%B1%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B8%BD%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%A6%E9%B9%89.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%BE%9F.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%8F%98%E8%89%B2%E9%BE%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%AD%94%E9%9B%80.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E6%B5%B7%E8%B1%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%97.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%AE%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%9E%AA%E7%BE%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%80%81%E8%99%8E.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%99%8E%E9%B2%B8.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9C%82.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9D%B4%E8%9D%B6.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9E%83%E8%9F%B9.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%B1%A1.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%9D%92%E8%9B%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%AA%86%E9%A9%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B2%A8%E9%B1%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B8%BD%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%A6%E9%B9%89.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%BE%9F.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%8F%98%E8%89%B2%E9%BE%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E5%AD%94%E9%9B%80.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E6%B5%B7%E8%B1%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%86%8A%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%97.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8B%AE%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%8C%AB.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E7%9E%AA%E7%BE%9A.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%80%81%E8%99%8E.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%99%8E%E9%B2%B8.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9C%82.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9D%B4%E8%9D%B6.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%9E%83%E8%9F%B9.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E8%B1%A1.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%9D%92%E8%9B%99.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%AA%86%E9%A9%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B2%A8%E9%B1%BC.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B8%BD%E5%AD%90.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%A6%E9%B9%89.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%B9%B0.png",
  "http://aigcassset.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%8A%A8%E7%89%A9%E5%9B%BE%E7%89%87/%E7%94%9F%E6%88%90%E5%89%8D%E5%9B%BE%E7%89%87/%E9%BE%9F.png",
];
let scene, camera, renderer, controls;
let vector, spherical;

onMounted(() => {
  initScene();
  initAlbum(); //初始化并形成球体照片墙
  animate();//每隔一段时间渲染
})

const initScene = () => {
  scene = new THREE.Scene();
  // 镜头
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 3400;
  // 渲染器
  renderer = new CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'container' ).appendChild( renderer.domElement );
  //坐标初始化
  vector = new THREE.Vector3(); //三维坐标
  spherical = new THREE.Spherical();//球坐标
  //轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true; //为true时，相机自动围绕目标旋转,但必须在animation循环中调用update()
}

let objects = []; //存放转化为3D的照片对象
let spheres=[] //用来存放目标对象的位置
function initAlbum() {
  //放图片
  const len = pictureList.length;
  for (i = 0; i < len; i++ ) { //125为照片的个数，随便放多少，不过要适中
    var element = document.createElement( 'div' );
    element.className = 'element'; //给图片加类名即设置对应的图片大小
    element.style.backgroundImage = `url(${pictureList[i]})`;
    element.style.backgroundSize = 'cover'; //保持图像的宽高比例，将图片缩放到正好完全覆盖定义的背景区域
    element.name = i ; // 给元素的name属性赋值，以便获取鼠标点击的当前值
    let object = new CSS3DObject( element );//可以将HTML元素作为纹理添加到3D对象中，从而创建有趣的3D特效
    scene.add( object );
    objects.push( object );//为了知道被添加到照片元素的个数
  }

  // 根据球形排列公式计算每个元素的位置
  var l = objects.length
  for( var i = 0; i <= l; i ++ ) {
    //该部分为固定的数学公式
    var phi = Math.acos( -1 + ( 2 * i ) / l );
    var theta = Math.sqrt( l * Math.PI ) * phi;
    // 计算元素在球面上的坐标,800代表球的半径
    const radius = 500;
    var x = radius * Math.cos(theta) * Math.sin(phi);
    var y = radius * Math.sin(theta) * Math.sin(phi);
    var z = radius * Math.cos(phi);

    var object = new THREE.Object3D();
    //设置对象的位置
    object.position.set(x,y,z)
    //将该向量与所传入的标量2进行相乘。
    vector.copy( object.position ).multiplyScalar( 2 );
    object.lookAt( vector );//vector这个变量的作用，它用来作为'目标位置'，使用这个方法让这个位置的对象object看向vector这一点所在的方向
    spheres.push( object );
  }
  transform( spheres, 1000 );//动画转换
}

function transform( spheres, duration ) {
  for ( var i = 0; i < objects.length; i ++ ) {
    var object = objects[ i ];
    var target = spheres[ i ];
    new TWEEN.Tween( object.position ) //过渡图片移动的位置
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )//改变当前模型的位置
      .easing( TWEEN.Easing.Exponential.InOut )//运动曲线
      .start();//开启动画

    new TWEEN.Tween( object.rotation )//过渡图片旋转
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();
  }
}

function animate() {
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame( animate );
}

// 监听鼠标单击事件
window.addEventListener('mousedown', clickMouse);

// 鼠标单击事件
function clickMouse(e) {
  if(!e){
    let e = window.event;
  }
  let tname = e.target.name; //获取点击图片的名称
  if (typeof(tname) == "undefined" || tname =='') {//鼠标点击的不是照片
    let div = document.getElementById("popup");
    div.style.display = 'none'; //隐藏元素
  }else{
    Popup(tname);
  }
  // 放大的图片
  function Popup(tname) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let div = document.getElementById("popup");
    div.style.display = 'block'; //显示元素
    div.style.backgroundImage = `url(${pictureList[tname]})`;
    div.style.backgroundSize = 'cover';
    div.style.height = h*0.7 + 'px';
    div.style.width = h*0.6 +'px';
    div.style.position = 'absolute';
    div.style.left = '0px';
    div.style.right = '0px';
    div.style.top = '0px';
    div.style.bottom = '0px';
    div.style.margin = 'auto';	//居中位置
    div.style.borderRadius = '5px'; // 圆角
  }
}

</script>
<style lang="scss">
div.photoAlbum {
  width: 100%;
  height: 100%;
  background: #000000;
}
.element {
  width: 120px;
  height: 160px;
}
.element:hover {
  box-shadow: 0 0 12px rgba(0,255,255,0.75);
  border: 1px solid rgba(127,255,255,0.75);
}
</style>
