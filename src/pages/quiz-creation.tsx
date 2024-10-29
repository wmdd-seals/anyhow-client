import type { ReactNode } from 'react'
import { Header } from '../widgets/header/ui/header'
import { Footer } from '../widgets/footer/ui/footer'
import { QuizCreation } from '../widgets/quiz-creation'
import { useParams } from 'react-router-dom'

export function QuizCreationPage(): ReactNode {
    const { id: guideId } = useParams<{ id: string }>()

    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />

            {!guideId && 'Sorry, quiz not found'}

            {guideId && <QuizCreation className="grow" guideId={guideId} />}
            <Footer />
        </div>
    )
}