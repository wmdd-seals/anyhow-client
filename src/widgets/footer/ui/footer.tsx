import { Button } from 'src/shared/ui'
import type { ReactNode } from 'react'
export function Footer(): ReactNode {
    return (
        <footer className="flex flex-col justify-between bg-slate-800 text-white items-center p-4 gap-4">
            <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex items-center mb-4 sm:mb-0 sm:justify-items-start w-full">
                    <span className="text-lg font-bold w-32 border-white border-2 rounded-lg px-4 py-2 text-center">
                        LOGO
                    </span>
                </div>
                <div className="flex flex-col w-full sm:flex-row sm:w-fit items-center gap-4">
                    <Button className="w-full bg-white text-slate-800 rounded-lg text-nowrap px-4 py-2 max-w-[300px]">
                        Sign up
                    </Button>
                    <Button className="w-full bg-slate-800 text-white rounded-lg text-nowrap px-4 py-2 max-w-[300px]">
                        Sign in
                    </Button>
                </div>
            </div>
            <div className="mt-4 sm:mt-0 w-full text-center flex flex-col sm:flex-row justify-between">
                <p className="text-sm">© 2024 AnyHow.</p>
                <p className="text-sm">
                    Created by{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-700">
                        About Us
                    </a>
                </p>
            </div>
        </footer>
    )
}
