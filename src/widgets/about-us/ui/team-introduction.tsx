import { type ReactNode } from 'react'

export function TeamIntroduction(): ReactNode {
    const members = [
        { name: 'Luis Perez', role: 'Lead Designer' },
        { name: 'Rasul Omarov', role: 'Lead Developer' },
        { name: 'Ziruo Zhang', role: 'Designer - Project Manager' },
        { name: 'Tomoki Kaneko', role: 'Designer' },
        { name: 'Carolina Gomes', role: 'Designer' },
        { name: 'Natsuko Ogata', role: 'Developer' },
        { name: 'Raul Diaz', role: 'Developer' },
        { name: 'Uma Voleti', role: 'Developer' },
        { name: 'Hanbee Choi', role: 'Designer' }
    ]

    return (
        <section className="max-w-7xl mx-auto flex flex-col gap-5 items-center px-5">
            <h2 className="text-center text-3xl md:text-5xl font-bold">
                Who built this?
            </h2>
            <div>
                This team is in another lelvel, and they are free to hire!
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="flex md:flex-col rounded-lg shadow-lg "
                    >
                        <img
                            src={`../../avatar-${member.name.toLowerCase().replace(' ', '-')}.webp`}
                            alt={member.name}
                            className="w-1/2 md:w-full h-auto md:h-1/2 object-contain rounded-lg bg-gray-100 p-10"
                        />
                        <div className="flex flex-col gap-2 justify-center w-1/2 md:w-full md:h-1/2 p-4">
                            <h3 className="text-3xl font-bold">
                                {member.name}
                            </h3>
                            <p className="text-gray-600 text-xl">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
