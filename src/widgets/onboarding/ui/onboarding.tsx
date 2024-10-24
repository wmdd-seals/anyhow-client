import { useState, type ReactNode } from 'react'
import { Button } from '../../../shared/ui'
import { useSaveFavoriteTopics } from '../api/use-save-favorite-topics'
import { useNavigate } from 'react-router-dom'

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

export function Onboarding(): ReactNode {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const { save, loading } = useSaveFavoriteTopics()
    const navigate = useNavigate()

    const handleTagClick = (tag: string): void => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const isButtonEnabled = selectedTags.length >= 3

    const handleOnClick = (): void => {
        save({
            favoriteTopics: selectedTags
        })

        navigate('/')
    }

    return (
        <div className="grow flex flex-col">
            <main className="flex flex-col gap-7 grow mx-auto md:max-w-2xl lg:max-w-4xl px-6">
                <div className="flex flex-col gap-6 justify-center grow py-10 text-left md:text-center sticky top-16 lg:top-20 bg-white">
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
                    <Button
                        className={`w-full md:w-1/3 lg:w-1/4 py-2 px-4 rounded-lg text-white font-bold 
                      ${isButtonEnabled ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-400'}`}
                        onClick={handleOnClick}
                        disabled={!isButtonEnabled || loading}
                    >
                        {loading ? 'Saving...' : 'Continue'}
                    </Button>
                </div>
            </main>
        </div>
    )
}
