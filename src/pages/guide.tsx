import { useEffect, type ReactNode } from 'react'
import { TextEditor } from '@shared/ui'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer/ui/footer'
import { ADD_GUIDE_TAKEN_MUTATION } from 'src/features/add-guide-taken/api/add-guide-taken'
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
    const [addGuideTakenMutation] = useMutation(ADD_GUIDE_TAKEN_MUTATION)

    const { data, loading, error } = useQuery(GUIDE_QUERY, {
        variables: {
            id: params.id!
        },
        skip: !params.id
    })

    useEffect(() => {
        if (!params.id) return
        void addGuideTakenMutation({
            variables: {
                input: { guideId: params.id }
            }
        })
    }, [params.id])

    if (!params.id) return 'Guide not found'

    if (loading) return 'Loading...'

    if (error || !data) return 'Something went wrong...'

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* <GuideChat guideId={params.id} /> */}

            <main className="max-w-[50rem] w-full mx-auto grow">
                <h1 className="text-7xl font-bold mb-8">{data.res.title}</h1>

                <div className="flex items-center gap-3 font-bold mb-8">
                    <div className="size-10 rounded-full bg-gray-200" />
                    <div>
                        {data.res.user.firstName} {data.res.user.lastName}
                    </div>
                </div>

                <TextEditor value={data.res.body || ''} editable={false} />
            </main>

            <Footer />
        </div>
    )
}
