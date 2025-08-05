import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        proxy: {
            "/api": {
                // Thay đổi target từ localhost:8000 thành tên dịch vụ backend của bạn (thường là 'backend' hoặc 'django')
                target: "http://BackendDjango:8000", // <-- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG
                changeOrigin: true,
                // Thêm dòng rewrite nếu backend Django của bạn không có tiền tố /api/ trong URL của nó
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});