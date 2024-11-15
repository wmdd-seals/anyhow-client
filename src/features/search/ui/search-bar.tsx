import { Input } from '@headlessui/react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'react-feather'

function SearchBar(): ReactNode {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [isShortcutVisible, setIsShortcutVisible] = useState(true)

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === 'Enter' && search) {
            navigate('/', { state: { search } })
        }
        // Escキーが押されたら、フォーカスを外す
        if (event.key === 'Escape') {
            inputRef.current?.blur()
        }
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent): void => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault()
                inputRef.current?.focus()
            }
        }

        const input = inputRef.current
        if (!input) return

        const handleFocus = (): void => setIsShortcutVisible(false)
        const handleBlur = (): void => setIsShortcutVisible(true)

        input.addEventListener('focus', handleFocus)
        input.addEventListener('blur', handleBlur)

        document.addEventListener('keydown', handleKeyPress)
        return (): void => {
            document.removeEventListener('keydown', handleKeyPress)
            input.removeEventListener('focus', handleFocus)
            input.removeEventListener('blur', handleBlur)
        }
    }, [])

    return (
        <div className="flex items-center relative bg-any-gray-100 h-10 rounded-lg overflow-hidden">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-any-gray-400 text-xs">
                <Search className="w-6 h-6" />
            </div>
            <Input
                ref={inputRef}
                placeholder="What do you want to learn today?"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-transparent placeholder:text-any-gray-400 h-full w-96 focus:outline-none focus:ring-0 focus:border-none focus:cursor-default cursor-text text-any-gray-950"
            />
            {isShortcutVisible && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-any-gray-400 text-sm">
                    ⌘+K
                </span>
            )}
        </div>
    )
}
export { SearchBar }
