import { type ReactNode, useState } from 'react'
import { Button } from 'src/shared/ui'
import { Check } from 'react-feather'
import { useNavigate } from 'react-router-dom'

export function PriceMenu(): ReactNode {
    const [isAnnual, setIsAnnual] = useState(false)
    const navigate = useNavigate()

    return (
        <section className="flex flex-col gap-6 max-w-5xl mx-auto px-5">
            <h2 className="text-center text-3xl md:text-5xl font-bold text-any-purple-600">
                Choose a plan
            </h2>

            {/* Toggle Button for Monthly and Annually */}
            <div className="flex gap-3 justify-center bg-any-purple-600 rounded-full p-2 max-w-64 mx-auto">
                <Button
                    kind={!isAnnual ? 'primary' : 'neutral'}
                    size="medium"
                    className="px-6 py-2"
                    onClick={() => setIsAnnual(false)}
                >
                    Monthly
                </Button>
                <Button
                    kind={isAnnual ? 'primary' : 'neutral'}
                    size="medium"
                    className="px-6 py-2"
                    onClick={() => setIsAnnual(true)}
                >
                    Annually
                </Button>
            </div>

            <p className="text-center text-any-purple-500">
                Save up to 30% with our annual plans
            </p>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto_auto_1fr_auto] gap-8 text-any-purple-500 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="grid gap-y-6 bg-slate-100 shadow-lg rounded-lg p-8 w-full h-full row-span-4 grid-rows-subgrid">
                    <h3 className="text-3xl font-bold">Free</h3>
                    <p className="text-5xl font-bold">$0</p>
                    <ul className="space-y-2 flex flex-col justify-start">
                        <li className="flex items-center gap-2">
                            <Check />3 selected guides per month
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Access to all available categories
                        </li>
                    </ul>
                    <p></p>
                </div>

                {/* Basic Plan */}
                <div className="grid gap-y-6 bg-slate-100 shadow-lg rounded-lg p-8 w-full h-full row-span-4 grid-rows-subgrid">
                    <h3 className="text-3xl font-bold">
                        Basic
                        <span className="text-sm block">Recommended</span>
                    </h3>

                    <p className="text-5xl font-bold">
                        {isAnnual ? '$90' : '$9'}
                    </p>
                    <ul className="space-y-2 flex-grow">
                        <li className="flex items-center gap-2">
                            <Check /> Access to all guides and categories
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Create and monetize content
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Limited AI features
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Save and track your progress
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Fork content*
                        </li>
                    </ul>
                    <Button
                        className="w-full"
                        kind="neutral"
                        size="medium"
                        onClick={() => navigate('/signup')}
                    >
                        Create Account
                    </Button>
                </div>

                {/* Advanced Plan */}
                <div className="grid gap-y-6 bg-slate-100 shadow-lg rounded-lg p-8 w-full h-full row-span-4 grid-rows-subgrid">
                    <h3 className="text-3xl font-bold">Advanced</h3>
                    <p className="text-5xl font-bold">
                        {isAnnual ? '$900' : '$99'}
                    </p>
                    <ul className="space-y-2 flex-grow">
                        <li className="flex items-center gap-2 ">
                            <span>All the starter plan features, plus:</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            AI Q&A and highlighted text
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            AI assistant for content creators
                        </li>
                        <li className="flex items-center gap-2">
                            <Check />
                            Limit forking of your content
                        </li>
                    </ul>
                    <Button
                        className="w-full"
                        kind="neutral"
                        size="medium"
                        onClick={() => navigate('/signup')}
                    >
                        Create Account
                    </Button>
                </div>
            </div>

            <p className="text-center text-lg text-any-purple-500">
                *Only on the public content
            </p>
        </section>
    )
}
