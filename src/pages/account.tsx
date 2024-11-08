import { useAuth } from '@shared/lib'
import { TextInput } from '@shared/ui'
import { Button } from '@shared/ui'
import { Footer } from '@widgets/footer/ui/footer'
import { Header } from '@widgets/header/ui/header'
import type { ReactNode } from 'react'

export function AccountPage(): ReactNode {
    const { user } = useAuth()
    return (
        <>
            <Header />
            <section className="container min-h-screen mx-auto px-7 sm:px-0 box-border flex flex-col gap-4 max-w-[650px]">
                <h1 className="text-3xl font-bold">Account Setting</h1>
                <div className="flex flex-col gap-6 bg-slate-100 p-8 rounded-lg">
                    <div className="flex gap-4 items-center">
                        <div className="rounded-full bg-white w-20 h-20 flex items-center justify-center text-2xl font-bold">
                            {user?.firstName[0].toUpperCase()}
                            {user?.lastName[0].toUpperCase()}
                        </div>
                        <Button className="w-fit h-10">Edit</Button>
                    </div>
                    <TextInput label="First Name" />
                    <TextInput label="Last Name" />
                    <TextInput label="Bio" />
                    <div className="flex justify-end ">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
