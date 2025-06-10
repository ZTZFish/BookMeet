import { onActivated, onDeactivated, ref, nextTick, onMounted } from 'vue';

export function useScrollPosition(containerRef?: any) {
  const savePosition = ref(0);

  // 获取滚动位置
  const getScrollTop = () => {
    if (containerRef?.value) {
      return containerRef.value.scrollTop || 0;
    }
    return 0;
  };

  // 设置滚动位置
  const setScrollTop = (top: number) => {
    if (containerRef?.value) {
      containerRef.value.scrollTop = top;
    }
  };

  onActivated(() => {
    // 使用 nextTick 确保 DOM 已经渲染完成
    nextTick(() => {
      // 稍微延迟一下，确保内容完全加载
      setTimeout(() => {
        setScrollTop(savePosition.value);
      }, 100);
    });
  });

  onDeactivated(() => {
    // 保存当前滚动位置
    savePosition.value = getScrollTop();
  });

  // 手动保存位置的方法
  const saveCurrentPosition = () => {
    savePosition.value = getScrollTop();
  };

  // 手动恢复位置的方法
  const restorePosition = () => {
    setScrollTop(savePosition.value);
  };

  return {
    savePosition,
    saveCurrentPosition,
    restorePosition
  };
}