import { type ReactNode, useState } from 'react'
import { Button } from 'src/shared/ui'
import { Check } from 'react-feather'
import { useNavigate } from 'react-router-dom'

export function PriceMenu(): ReactNode {
    const [isAnnual, setIsAnnual] = useState(false)
    const navigate = useNavigate()

    return (
        <section className="flex flex-col gap-6 max-w-5xl mx-auto px-5">
            <h2 className="text-center text-3xl md:text-5xl font-bold">
                Choose a plan
            </h2>

            {/* Toggle Button for Monthly and Annually */}
            <div className="flex gap-3 justify-center bg-indigo-950 rounded-full p-2 max-w-64 mx-auto">
                <Button
                    kind={!isAnnual ? 'primary' : 'neutral'}
                    size="medium"
                    className=" px-6 py-2"
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

            <p className="text-center text-gray-600">
                Save up to 30% with our annual plans
            </p>

            {/* Pricing Cards */}
            <div className="flex flex-col lg:flex-row justify-center gap-8">
                {/* Free Plan */}
                <div className="flex flex-col gap-5 justify-around items-start bg-gray-100 shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h3 className="text-3xl font-bold">Free</h3>
                    <p className="text-5xl font-bold">$0</p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex gap-2">
                            <Check /> 3 selected guides per month
                        </li>
                        <li className="flex gap-2">
                            <Check /> Access to all available categories
                        </li>
                    </ul>
                </div>

                {/* Basic Plan */}
                <div className="flex flex-col gap-5 justify-around items-start bg-gray-100  shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h3 className="text-3xl font-bold">Basic</h3>
                    <span className="text-sm">Recommended</span>
                    <p className="text-5xl font-bold">
                        {isAnnual ? '$90' : '$9'}
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex gap-2">
                            <Check /> Access to all guides and categories
                        </li>
                        <li className="flex gap-2">
                            <Check /> Create and monetize content
                        </li>
                        <li className="flex gap-2">
                            <Check /> Limited AI features
                        </li>
                        <li className="flex gap-2">
                            <Check /> Save and track your progress
                        </li>
                        <li className="flex gap-2">
                            <Check /> Fork content*
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
                <div className="flex flex-col gap-5 justify-around items-start bg-gray-100  shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h3 className="text-3xl font-bold">Advanced</h3>
                    <p className="text-5xl font-bold">
                        {isAnnual ? '$900' : '$99'}
                    </p>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex gap-2">
                            All the starter plan features, plus:
                        </li>
                        <li className="flex gap-2">
                            <Check /> AI Q&A and highlighted text
                        </li>
                        <li className="flex gap-2">
                            <Check /> AI assistant for content creators
                        </li>
                        <li className="flex gap-2">
                            <Check /> Limit forking of your content
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
            <p className="text-center text-lg text-gray-600">
                *Only on the public content
            </p>
        </section>
    )
}
