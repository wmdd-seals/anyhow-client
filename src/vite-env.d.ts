interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_API_ENDPOINT: string
    readonly VITE_IMAGES_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
