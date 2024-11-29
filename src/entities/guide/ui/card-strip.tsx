import { type ReactNode } from 'react'
import { Button } from '@shared/ui'
import { Link, useNavigate } from 'react-router-dom'
import { graphql } from '@gqlgen'
import { useMutation, useQuery, type ApolloQueryResult } from '@apollo/client'
import { getGuideProgress } from '../lib'
import { Eye, ThumbsUp } from 'react-feather'
import type { Guide, GuidesCreatedQuery } from '@gqlgen/graphql'

type CardStripProps = {
    guide: Omit<Guide, 'createdAt'> & { createdAt: string }
    refetch: () => Promise<ApolloQueryResult<GuidesCreatedQuery>>
}
const REMOVE_GUIDE = graphql(`
    mutation Mutation($input: RemoveGuideInput!) {
        removeGuide(input: $input) {
            bookmark
            createdAt
            description
            id
            published
            rating
            tags
            title
            user {
                firstName
                id
                lastName
            }
        }
    }
`)

const GUIDE_VIEW_COUNT_BY_GUIDE_ID = graphql(`
    query GuideViewCountByGuideId($input: GuideViewCountByGuideIdInput!) {
        res: guideViewCountByGuideId(input: $input) {
            count
            guideId
        }
    }
`)

export function CardStrip({ guide, refetch }: CardStripProps): ReactNode {
    const { id, title, createdAt, published, rating } = guide
    const navigate = useNavigate()
    const { data: viewCount } = useQuery(GUIDE_VIEW_COUNT_BY_GUIDE_ID, {
        variables: { input: { guideId: id! } }
    })
    const [removeGuide] = useMutation(REMOVE_GUIDE)
    const progress = getGuideProgress(guide.body || '')
    const minutes = Math.ceil((progress * 60) / 100)

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full border-b-0 lg:border-b rounded-lg lg:rounded-none border-any-gray-200 gap-y-5 lg:gap-y-0 p-4 lg:py-4 lg:px-0 shadow-xl lg:shadow-none">
            <div className="h-16 w-full lg:w-1/3 flex items-center gap-4 overflow-hidden">
                <div className="flex justify-center items-center h-full aspect-[1/0.64] rounded-md overflow-hidden relative bg-any-purple-600">
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
                                '!w-1/2',
                                '!object-contain'
                            )
                        }}
                        alt="Guide cover"
                        className="object-cover w-full h-full"
                    />
                </div>

                {published ? (
                    <Link
                        to={`/${id}`}
                        className="hover:underline text-lg font-semibold w-full text-wrap items-start lg:items-center line-clamp-2"
                    >
                        {title}
                    </Link>
                ) : (
                    <h3 className="text-lg font-semibold w-full flex text-wrap">
                        {title}
                    </h3>
                )}
            </div>
            <div className="flex justify-start gap-4 w-full lg:w-1/4 text-sm lg:text-base">
                <div className="flex justify-start lg:justify-end w-20 text-sm">
                    {new Date(createdAt).toLocaleDateString()}
                </div>
                <div className="flex justify-start w-14 ml-auto lg:ml-0 text-sm">
                    {minutes} min
                </div>
                <div className="flex justify-items-center w-18">
                    {published ? (
                        <span className="text-any-green-500 flex items-center gap-2">
                            <div className="h-4 w-4 bg-any-green-500 rounded-full"></div>
                            <span className="text-any-purple-950">
                                Published
                            </span>
                        </span>
                    ) : (
                        <span className="text-any-red-500 flex items-center gap-2">
                            <div className="h-4 w-4 bg-any-gray-200 rounded-full"></div>
                            <span className="text-any-purple-950">Draft</span>
                        </span>
                    )}
                </div>
            </div>
            <div className="flex justify-between w-full lg:w-5/12">
                <div className="flex justify-start lg:justify-end gap-2 lg:gap-4 w-full lg:w-1/2">
                    <div className="flex items-center justify-start lg:justify-end text-sm lg:text-base w-15 lg:w-20 gap-2">
                        {rating || rating === 0 ? `${rating}%` : '-'}
                        <ThumbsUp width={16} height={16} />
                    </div>
                    <div className="flex items-center justify-start lg:justify-end text-sm lg:text-base w-15 lg:w-20 gap-2">
                        {viewCount?.res.count}
                        <Eye width={16} height={16} />
                    </div>
                </div>
                <div className="flex gap-4 w-full lg:w-1/2 justify-end">
                    <Button
                        onClick={() => navigate(`/${id}/edit`)}
                        kind="secondary"
                        className="h-fit py-2 px-4"
                    >
                        Edit
                    </Button>
                    <Button
                        kind="secondary"
                        className="h-fit py-2 px-4"
                        onClick={async () => {
                            await removeGuide({
                                variables: { input: { id: id! } }
                            })
                            void refetch()
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
