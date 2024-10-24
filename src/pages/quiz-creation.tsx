import type { ReactNode } from 'react'
import { Header } from '../widgets/header/ui/header'
import { Footer } from '../widgets/footer/ui/footer'
import { QuizCreation } from '../widgets/quiz-creation'

export function QuizCreationPage(): ReactNode {
    return (
        <div className="min-h-screen flex flex-col gap-3">
            <Header />
            <QuizCreation />
            <Footer />
        </div>
    )
}
