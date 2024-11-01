import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:4000',
    // schema: 'https://anyhow-graphql-server-21299b417ab2.herokuapp.com',
    verbose: true,
    documents: ['./src/**/*.{ts,tsx}'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/_gqlgen/': {
            preset: 'client'
        }
    },
    config: {
        useTypeImports: true
    }
}

export default config
