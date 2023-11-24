import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig( async () => ( {
    clearScreen: false,
    plugins: [ react() ],
    server: {
        port: 1420,
        strictPort: true
    }
} ) )
