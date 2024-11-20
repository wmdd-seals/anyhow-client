import { useNavigate } from 'react-router-dom'
import { ThumbsUp, Bookmark, Share2 } from 'react-feather'
import markdownToTxt from 'markdown-to-txt'
import type { Guide } from '@gqlgen/graphql'
import { copyToClipboard } from '../lib'
import { useAuth } from '@shared/lib'
import { getGuideProgress } from 'src/entities/guide'
import { graphql } from '@gqlgen'
import { useMutation } from '@apollo/client'

interface CardComponentProps {
    guide: Guide
    cardType?: 'default' | 'simple'
    isAuthenticated?: boolean
}

const ADD_BOOKMARK_MUTATION = graphql(`
    mutation AddBookmarkOnCard($input: AddBookmarkInput!) {
        res: addBookmark(input: $input)
    }
`)

const REMOVE_BOOKMARK_MUTATION = graphql(`
    mutation RemoveBookmarkOnCard($input: RemoveBookmarkInput!) {
        res: removeBookmark(input: $input)
    }
`)

const Card: React.FC<CardComponentProps> = ({
    guide,
    cardType = 'default',
    isAuthenticated = false
}) => {
    const { setToast } = useAuth()
    const navigate = useNavigate()
    const readingTime = Math.ceil(
        (getGuideProgress(guide.body || '') * 60) / 100
    )

    const [addBookmarkMutation, { loading: addingBookmarkLoading }] =
        useMutation(ADD_BOOKMARK_MUTATION, {
            variables: { input: { guideId: guide.id! } },
            update: (cache, _, { variables }) => {
                if (!variables) return

                const {
                    input: { guideId }
                } = variables

                cache.modify({
                    id: `Guide:${guideId}`,
                    fields: {
                        bookmark: () => true
                    }
                })
            }
        })

    const [removeBookmarkMutation, { loading: removingBookmarkLoading }] =
        useMutation(REMOVE_BOOKMARK_MUTATION, {
            variables: { input: { guideId: guide.id! } },
            update: (cache, _, { variables }) => {
                if (!variables) return

                const {
                    input: { guideId }
                } = variables

                cache.modify({
                    id: `Guide:${guideId}`,
                    fields: {
                        bookmark: () => false
                    }
                })
            }
        })
    return (
        <div
            onClick={(): void => navigate(`/${guide.id}`)}
            className="w-full cursor-pointer grid grid-cols-1 grid-rows-subgrid  row-span-2 overflow-hidden bg-white rounded-2xl border-2 box-border border-gray-100 border-solid relative pb-11 gap-3"
        >
            <div className="relative flex overflow-hidden flex-col justify-center items-center w-full bg-blue-900 bg-gradient-to-b from-blue-900 to-black h-36">
                <img
                    src="/pattern.svg"
                    className="object-cover w-full h-full opacity-50 absolute inset-0"
                />
                <img
                    key={guide.id}
                    loading="lazy"
                    src={`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_IMAGES_ENDPOINT}/${guide.id}`}
                    onError={e => {
                        e.currentTarget.src = `/logo.svg`
                        e.currentTarget.classList.add(
                            '!w-36',
                            '!object-contain'
                        )
                    }}
                    alt="Guide cover"
                    className="object-cover w-full h-full relative"
                />
            </div>
            <div className="grid auto-rows-auto grid-flow-row-dense p-4 w-full">
                {cardType === 'default' && (
                    <div className="w-full">
                        <div className="flex justify-between w-full min-h-[32px]">
                            <div>
                                {guide.user?.firstName} {guide.user?.lastName}
                            </div>
                            <p className="text-any-gray-500">
                                {readingTime} min
                            </p>
                        </div>
                    </div>
                )}
                <div className="text-2xl font-bold leading-tight text-gray-700 h-fit line-clamp-1">
                    {guide.title}
                </div>

                <p className="my-2 text-base tracking-normal leading-6 text-slate-500 h-[72px] line-clamp-3">
                    {markdownToTxt(guide.body ?? '')}
                </p>
                {!!guide.rating && guide.rating > 0 && (
                    <div className="flex items-center gap-2 absolute left-4 bottom-4">
                        <ThumbsUp
                            className="w-5 h-5"
                            fill={
                                typeof guide.liked === 'boolean' && guide.liked
                                    ? '#000'
                                    : '#fff'
                            }
                        />
                        <p className="h-full mt-1 flex items-center text-xs align-middle text-gray-500">
                            {guide.rating}% Positive
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-2 absolute bottom-4 right-4">
                    {isAuthenticated && (
                        <button
                            onClick={(e): void => {
                                e.stopPropagation()

                                if (
                                    addingBookmarkLoading ||
                                    removingBookmarkLoading
                                )
                                    return

                                if (guide.bookmark) {
                                    void removeBookmarkMutation()
                                } else {
                                    void addBookmarkMutation()
                                }
                            }}
                        >
                            <Bookmark
                                className="w-5 h-5"
                                fill={
                                    typeof guide.bookmark === 'boolean' &&
                                    guide.bookmark
                                        ? '#000'
                                        : '#fff'
                                }
                            />
                        </button>
                    )}
                    <button
                        onClick={async e => {
                            e.stopPropagation()
                            await copyToClipboard(
                                `${window.location.origin}/${guide.id}`
                            )
                            setToast({
                                visible: true,
                                message: 'Copied to clipboard'
                            })
                        }}
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Card }
