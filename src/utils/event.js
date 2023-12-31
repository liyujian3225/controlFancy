// 判断点击的区域是否在传入的dom节点外面
import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOutSide(elementRef) {
  const isOutSide = ref(false)
  const handler = (e) => {
    if (elementRef.value) {
      isOutSide.value = !elementRef.value.contains(e.target);
    }
  }

  onMounted(() => {
    window.addEventListener('click', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handler)
  })

  return { isOutSide }
}
