interface UseCreateQuiz {
    loading: boolean
}

export function useCreateQuiz(): UseCreateQuiz {
    return {
        loading: false
    }
}
