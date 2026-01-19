<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isPlaying = ref(true);
const speed = ref(8); // 旋转周期(秒)
const rotationAngle = ref(0);
let animationFrameId: number | null = null;
let lastTime = 0;

// 检测用户是否偏好减少动画
const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion.value && isPlaying.value) {
    startAnimation();
  }
});

onUnmounted(() => {
  stopAnimation();
});

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;

  if (isPlaying.value && !prefersReducedMotion.value) {
    startAnimation();
  } else {
    stopAnimation();
  }
};

const startAnimation = () => {
  if (animationFrameId !== null) return;

  const animate = (currentTime: number) => {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;

    // 计算旋转角度
    const degreesPerSecond = 360 / speed.value;
    rotationAngle.value = (rotationAngle.value + (degreesPerSecond * deltaTime) / 1000) % 360;

    lastTime = currentTime;
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);
};

const stopAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  lastTime = 0;
};
</script>

<template>
  <div class="taiji-animation-container relative w-full flex flex-col items-center justify-center py-12">
    <!-- 太极动画图片 -->
    <div
      class="relative w-64 h-64 md:w-80 md:h-80 transition-all duration-300"
      :style="{
        transform: `rotate(${rotationAngle}deg)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear'
      }"
    >
      <img
        src="/image/taichi-logo.png"
        alt="太极"
        class="w-full h-full object-contain drop-shadow-2xl"
      />
    </div>

    <!-- 控制面板 -->
    <div class="mt-8 flex flex-col items-center space-y-4 bg-paper dark:bg-ink rounded-lg shadow-lg p-6 max-w-md w-full mx-4 border border-border">
      <!-- 播放/暂停按钮 -->
      <button
        @click="togglePlay"
        class="flex items-center space-x-2 px-6 py-3 bg-ink hover:bg-primary text-paper rounded-lg transition-all duration-200 font-medium hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        :aria-label="isPlaying ? '暂停动画' : '播放动画'"
      >
        <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ isPlaying ? '暂停' : '播放' }}</span>
      </button>

      <!-- 速度控制 -->
      <div class="w-full space-y-2">
        <div class="flex justify-between text-sm text-secondary dark:text-ink-light">
          <label for="speed-control" class="font-medium">旋转速度</label>
          <span>{{ speed.toFixed(1) }}秒/圈</span>
        </div>
        <input
          id="speed-control"
          v-model.number="speed"
          type="range"
          min="2"
          max="15"
          step="0.5"
          class="w-full h-2 bg-mist dark:bg-ink-light rounded-lg appearance-none cursor-pointer accent-accent"
          :disabled="prefersReducedMotion"
        />
        <div class="flex justify-between text-xs text-secondary dark:text-ink-light">
          <span>快</span>
          <span>慢</span>
        </div>
      </div>

      <!-- 说明文字 -->
      <p class="text-xs text-secondary dark:text-ink-light text-center">
        阴阳调和,生生不息
      </p>
    </div>

    <!-- 装饰性背景圆环 -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-accent opacity-10"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent opacity-5"></div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滑块样式 */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #C83232;
  cursor: pointer;
  transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(200, 50, 50, 0.5);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #C83232;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(200, 50, 50, 0.5);
}
</style>
