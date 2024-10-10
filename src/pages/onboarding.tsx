import { useState, type ReactNode } from 'react'

const popularTags = [
    'Arts',
    'Photography',
    'Data Science',
    'Software Development',
    'Accounting & Finance',
    'Entrepreneurship',
    'Health & Wellness',
    'Foreign Languages',
    'Fashion Design',
    'Pet Care & Training',
    'Travel & Tourism',
    'Childcare & Early Education',
    'Psychology',
    'Yoga & Meditation',
    'Makeup & Skincare'
]

export function OnboardingPage(): ReactNode {
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const handleTagClick = (tag: string): void => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const isButtonEnabled = selectedTags.length >= 3

    const handleButtonClick = (): void => {
        if (isButtonEnabled) {
            // Need to implement the logic to save the selected tags
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Will replace the following div with a header component */}
            <div className="w-full h-24 sticky top-0 bg-white"></div>

            <main className="flex flex-col gap-7 grow mx-auto md:max-w-2xl lg:max-w-4xl px-6">
                <div className="flex flex-col gap-6 justify-center grow py-10 text-left md:text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        Welcome to AnyHow!
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl">
                        To personalize your experience, just choose your{' '}
                        <b>top three (or more) topics</b> that you're into, and
                        we'll serve up content just for you!
                    </p>
                </div>
                <div className="flex flex-col justify-center grow">
                    <div className="flex flex-wrap gap-2 justify-start md:justify-center md:gap-3 lg:gap-4">
                        {popularTags.map(tag => (
                            <div
                                key={tag}
                                className={`flex items-center px-4 py-2 rounded-full cursor-pointer border 
                              ${selectedTags.includes(tag) ? 'bg-gray-800 text-white border-none' : 'border-gray-400 text-gray-800'}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {selectedTags.includes(tag) ? (
                                    <span className="mr-2 text-white">✔</span>
                                ) : (
                                    <span className="mr-2">#</span>
                                )}

                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center grow pb-12">
                    {/* Will replace the following button with a button component */}
                    <button
                        className={`w-full md:w-1/3 lg:w-1/4 py-2 px-4 rounded-lg text-white font-bold 
                      ${isButtonEnabled ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-400'}`}
                        onClick={handleButtonClick}
                        disabled={!isButtonEnabled}
                    >
                        Continue
                    </button>
                </div>
            </main>

            {/* Will replace the following div with a Footer component */}
            <div className="w-full h-56 bg-black"></div>
        </div>
    )
}
