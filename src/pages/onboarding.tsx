import { type ReactNode } from 'react'
import { Footer } from '../widgets/footer/ui/footer'
import { Header } from '../widgets/header/index'
import { Onboarding } from '../widgets/onboarding/index'

export function OnboardingPage(): ReactNode {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Onboarding />
            <Footer />
        </div>
    )
}
