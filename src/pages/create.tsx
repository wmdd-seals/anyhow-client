import { CreateGuide } from '@widgets/create-guide'
import type { ReactNode } from 'react'

export function CreateGuidePage(): ReactNode {
    return (
        <div className="flex flex-col max-w-[50rem] mx-auto p-8">
            <CreateGuide />
        </div>
    )
}
