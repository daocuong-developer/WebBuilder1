import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectPreview from './pages/ProjectPreview'; // Đường dẫn đến ProjectPreview của bạn
import './index.css'; // Import CSS toàn cục

// Lấy projectId và pageId từ biến môi trường (sẽ được inject vào lúc build)
const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID || 'default_project_id';
const VITE_PAGE_ID = import.meta.env.VITE_PAGE_ID || 'default_page_id';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*
          Route chính cho trang web đã hoàn thành.
          Nó sẽ sử dụng projectId và pageId từ biến môi trường để hiển thị
          đúng trang mà không cần tham số trong URL.
        */}
        <Route path="/" element={<ProjectPreview />} />
        {/*
          Tùy chọn: Giữ lại route preview động để có thể xem các trang khác nếu cần.
          Lưu ý: Route này sẽ hoạt động nếu bạn cấu hình Nginx để rewrite đúng cách.
        */}
        <Route path="/preview/project/:projectId/page/:pageId" element={<ProjectPreview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);