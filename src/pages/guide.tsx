import type { ReactNode } from 'react'
import { TextEditor } from '@shared/ui'

export function GuidePage(): ReactNode {
    return (
        <div>
            Guide page
            <TextEditor editable onChange={console.log} />
        </div>
    )
}
