import { type ReactNode } from 'react'
import { Linkedin, GitHub } from 'react-feather'
import { Globe } from 'react-feather'

export function TeamIntroduction(): ReactNode {
    // to do: add website URL once designers have their own websites
    const members = [
        {
            name: 'Luis Perez',
            role1: 'UI/UI Designer',
            role2: 'Lead Designer',
            linkedIn: 'https://www.linkedin.com/in/is-luisperez/',
            website: 'https://www.luisperez.co'
        },
        {
            name: 'Rasul Omarov',
            role1: 'Full Stack Developer',
            role2: 'Lead Developer',
            linkedIn: 'https://www.linkedin.com/in/rasulomaroff/',
            gitHub: 'https://github.com/rasulomaroff'
        },
        {
            name: 'Ziruo Zhang',
            role1: 'UI/UI Designer',
            role2: 'Project Manager',
            linkedIn: 'lhttps://www.linkedin.com/in/ziruo-zhang/',
            website: ''
        },
        {
            name: 'Tomoki Kaneko',
            role1: 'Full Stack Developer',
            linkedIn: 'https://www.linkedin.com/in/tomoki-kaneko/',
            gitHub: 'https://github.com/tom555-555'
        },
        {
            name: 'Carolina Gomes',
            role1: 'UI/UI Designer',
            linkedIn: 'https://www.linkedin.com/in/carolinafgrocha/',
            website: ''
        },
        {
            name: 'Natsuko Ogata',
            role1: 'Frontend Developer',
            linkedIn: 'https://www.linkedin.com/in/natsuko-ogata/',
            gitHub: 'https://github.com/Summer-Children'
        },
        {
            name: 'Raul Diaz',
            role1: 'UI/UI Designer',
            linkedIn: 'https://www.linkedin.com/in/rauldiazbe/',
            website: ''
        },
        {
            name: 'Uma Voleti',
            role1: 'Backend Developer',
            linkedIn: 'https://www.linkedin.com/in/umavoleti/',
            gitHub: 'https://github.com/uvoleti00'
        },
        {
            name: 'Hanbee Choi',
            role1: 'UI/UI Designer',
            linkedIn: 'https://www.linkedin.com/in/hanbee-choi/',
            website: 'https://www.behance.net/hanbee702e63b'
        }
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
                        className="relative flex md:flex-col rounded-lg border border-any-gray-100 p-2"
                    >
                        {/* top half (left half)*/}
                        <div className="rounded-lg relative bg-[radial-gradient(89.58%_89.58%_at_50%_50%,rgba(255,255,255,0)_24.82%,rgba(30,22,71,0.09)_60.67%)] aspect-[3/4] md:aspect-[4/3] flex justify-center items-center w-1/2 md:w-full h-auto md:h-1/2 overflow-hidden px-3 py-8 md:px-25">
                            {/* avatar */}
                            <img
                                src={`/avatar-${member.name.toLowerCase().replace(' ', '-')}.webp`}
                                alt={member.name}
                                className="object-contain rounded-lg inline-flex max-w-full max-h-full"
                            />
                            {/* top right icon */}
                            <div className="absolute top-2 right-2 bg-any-purple-500 rounded-full p-2">
                                <img
                                    src={
                                        member.role1.includes('Developer')
                                            ? '/code.svg'
                                            : '/pen-tool.svg'
                                    }
                                    alt={
                                        member.role1.includes('Developer')
                                            ? 'Developer Icon'
                                            : 'Designer Icon'
                                    }
                                    className="w-5 h-5"
                                />
                            </div>
                        </div>
                        {/* bottom half (right half)*/}
                        <div className="relative flex flex-col gap-6 md:justify-start md:px-6 md:pb-6 pt-2 w-1/2 md:w-full md:h-1/2 p-4 text-any-purple-500">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold leading-normal md:leading-loose">
                                    {member.name}
                                </h3>
                                <p className="text-sm md:text-base">
                                    {member.role1}
                                    {member.role2 && (
                                        <span> - {member.role2}</span>
                                    )}
                                </p>
                            </div>
                            <div className="absolute bottom-6 left-6 flex gap-2 w-full">
                                <a
                                    href={member.linkedIn}
                                    target="_blank"
                                    className="p-2"
                                >
                                    <Linkedin className=" text-any-purple-400 hover:text-any-purple-500 w-6 h-6" />
                                </a>
                                {member.role1.includes('Developer') ? (
                                    <a
                                        href={member.gitHub}
                                        target="_blank"
                                        className="p-2"
                                    >
                                        <GitHub className=" text-any-purple-400 hover:text-any-purple-500 w-6 h-6" />
                                    </a>
                                ) : (
                                    <a
                                        href={member.website}
                                        target="_blank"
                                        className="p-2"
                                    >
                                        <Globe className=" text-any-purple-400 hover:text-any-purple-500 w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
