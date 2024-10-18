import { CreateGuide } from '@widgets/create-guide'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import type { ReactNode } from 'react'

export function CreateGuidePage(): ReactNode {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <CreateGuide className="grow p-8" />

            <Footer />
        </div>
    )
}
