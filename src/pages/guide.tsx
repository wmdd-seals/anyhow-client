import type { ReactNode } from 'react'
import { TextEditor } from '@shared/ui'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer/ui/footer'
// import { GuideChat } from '@widgets/guide-chat'

const GUIDE_QUERY = graphql(`
    query Guide($id: ID!) {
        res: guide(id: $id) {
            id
            title
            body
            tags
            user {
                id
                firstName
                lastName
            }
        }
    }
`)

export function GuidePage(): ReactNode {
    const params = useParams<{ id: string }>()

    const { data, loading, error } = useQuery(GUIDE_QUERY, {
        variables: {
            id: params.id!
        },
        skip: !params.id
    })

    if (!params.id) return 'Guide not found'

    if (loading) return 'Loading...'

    if (error || !data) return 'Something went wrong...'

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main
                className="grow grid md:grid-cols-2 lg:grid-cols-3 overflow-hidden"
                style={{
                    gridTemplateColumns: 'minmax(0, 320px) 1fr 320px'
                }}
            >
                <div></div>

                <article className="max-w-[50rem] w-full mx-auto">
                    <h1 className="text-7xl font-bold mb-8">
                        {data.res.title}
                    </h1>

                    <div className="flex items-center gap-3 font-bold mb-8">
                        <div className="size-10 rounded-full bg-gray-200" />
                        <div>
                            {data.res.user.firstName} {data.res.user.lastName}
                        </div>
                    </div>

                    <TextEditor value={data.res.body || ''} editable={false} />
                </article>

                <GuideChat guideId={params.id} className="" />
            </main>

            <Footer />
        </div>
    )
}
