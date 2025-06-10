import { ref } from 'vue';

export function useFormatTime() {
  const formatDisplayTime = (timeStr: string): string => {
    const messageDate = new Date(timeStr.replace(/-/g, '/'));
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const currentYear = now.getFullYear();

    const messageYear = messageDate.getFullYear();
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());

    if (messageDay.getTime() === today.getTime()) {
      // 今天：显示 HH:mm
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else if (messageDay.getTime() === yesterday.getTime()) {
      // 昨天
      return "昨天";
    } else if (messageYear === currentYear) {
      // 今年内，但不是今天或昨天：显示 MM-DD
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const day = messageDate.getDate().toString().padStart(2, '0');
      return `${month}-${day}`;
    } else {
      // 昨天之前且不是今年（即往年）：显示 YYYY-MM-DD
      const year = messageDate.getFullYear();
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const day = messageDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  return { formatDisplayTime };
}