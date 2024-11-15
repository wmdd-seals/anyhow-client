import { useMutation, useQuery } from '@apollo/client'
import { useCallback, useState, type ReactNode } from 'react'
import { GET_CHAT_MESSAGES } from '../api/get-chat-messages'
import { ASK_AI_MUTATION } from '../api/ask-ai'
import { TextInput } from '@shared/ui'
import cn from 'clsx'
import { apolloClient } from '@shared/api'
import type { ChatMessagesQuery } from '@gqlgen/graphql'

type GuideChatProps = {
    guideId: string
    className?: string
}

function appendToCacheMessages(
    guideId: string,
    entry: ChatMessagesQuery['res'][number]
): void {
    apolloClient.cache.updateQuery(
        { query: GET_CHAT_MESSAGES, variables: { guideId } },
        data => {
            return {
                res: [...(data?.res || []), entry]
            }
        }
    )
}

export function GuideChat(props: GuideChatProps): ReactNode {
    const { guideId, className } = props

    const { data, loading } = useQuery(GET_CHAT_MESSAGES, {
        variables: { guideId }
    })

    const [input, setInput] = useState('')
    const [ask, { loading: askPending }] = useMutation(ASK_AI_MUTATION, {
        variables: { input: { guideId, prompt: input } }
    })

    const askAI = useCallback(
        async (question: string) => {
            appendToCacheMessages(guideId, { role: 'user', content: question })

            const response = await ask()

            if (!response.data?.res) return

            appendToCacheMessages(guideId, {
                role: 'assistant',
                content: response.data.res.content
            })
        },
        [guideId]
    )

    return (
        <div
            className={cn(
                'grow bg-any-gray-50 flex flex-col overflow-hidden',
                className
            )}
        >
            <span className="text-2xl font-bold mb-6">Ask Any anything...</span>

            <div className="grow flex flex-col-reverse md:flex-col gap-4 overflow-hidden">
                <TextInput
                    placeholder="What means Maecenas?"
                    value={input}
                    onChange={e => setInput(e.currentTarget.value)}
                    onKeyDown={e => {
                        const { key } = e

                        if (key !== 'Enter' || askPending || loading) return

                        void askAI(input)
                        setInput('')
                    }}
                />

                <div className="grow flex flex-col-reverse md:flex-col gap-3 overflow-auto">
                    {data?.res.length ? (
                        data.res.map((message, i) => {
                            const { role, content } = message

                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        'w-[80%] rounded-xl p-4 bg-[#F2F2F3]',
                                        role === 'user'
                                            ? 'self-end'
                                            : 'self-start'
                                    )}
                                >
                                    {content}
                                </div>
                            )
                        })
                    ) : (
                        <p className="font-bold text-xl m-auto">
                            Start by asking a first question
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
