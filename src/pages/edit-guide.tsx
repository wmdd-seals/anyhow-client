import { EditGuide } from '@widgets/edit-guide'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

export function EditGuidePage(): ReactNode {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {!id && 'Sorry, guide not found'}

            {id && <EditGuide className="grow p-8" id={id} />}

            <Footer />
        </div>
    )
}
