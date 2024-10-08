import React, { useState } from 'react'
import { TextInput } from './text-input'

interface SearchBarProps {
    onSearch: (query: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative flex-grow">
                <TextInput
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {/* TODO: need to insert icon here */}◎
                </p>
            </div>
        </form>
    )
}
