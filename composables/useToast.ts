export interface Toast {
  id: string
  title: string
  message?: string
  type: 'success' | 'info' | 'error'
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const duration = toast.duration ?? 3500

    const newToast: Toast = {
      ...toast,
      id,
    }

    toasts.value.push(newToast)

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id)
      }, duration)
    }
  }

  const dismissToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts: readonly(toasts),
    showToast,
    dismissToast,
  }
}
