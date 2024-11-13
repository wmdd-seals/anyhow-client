import { useEffect } from 'react'

const Toast = ({
    toast,
    setToast
}: {
    toast: { visible: boolean; message: string }
    setToast: (toast: { visible: boolean; message: string }) => void
}): React.ReactNode => {
    useEffect(() => {
        if (!toast.visible) return
        const timer = setTimeout(() => {
            setToast({ visible: false, message: '' })
        }, 3000)

        return (): void => clearTimeout(timer)
    }, [toast.visible])

    return (
        <div
            className={`fixed inset-x-1/2 inset-y-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-any-green-700 bg-opacity-90 font-semibold text-white px-5 py-2.5 rounded-lg z-1000 text-center transition-opacity duration-300 ease-linear w-56 h-12 ${
                toast.visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {toast.message}
        </div>
    )
}

export default Toast
