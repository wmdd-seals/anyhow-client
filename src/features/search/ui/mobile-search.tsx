import { DialogPanel, Input } from '@headlessui/react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'react-feather'

function MobileSearch(): ReactNode {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === 'Enter' && search) {
            navigate('/', { state: { search } })
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-any-gray-950"
            >
                <Search className="w-6 h-6" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 inset-0 "
                    onClose={() => setIsOpen(false)}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40" />
                    </TransitionChild>

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center p-0 w-4/5 mx-auto rounded-lg overflow-hidden">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-4"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-4"
                            >
                                <DialogPanel className="w-full">
                                    <div className="flex items-center relative bg-any-purple-900/90 h-14 rounded-lg">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 rounded-lg">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <Input
                                            ref={inputRef}
                                            placeholder="What do you want to learn today?"
                                            value={search}
                                            onChange={e =>
                                                setSearch(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            className="pl-11 pr-11 bg-transparent placeholder:text-white/50 h-full w-full focus:outline-none focus:ring-0 focus:border-none text-any-purple-100 rounded-lg"
                                        />
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export { MobileSearch }
