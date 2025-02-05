import React from 'react';
import ReactDOM from 'react-dom/client'; // Thay đổi đường dẫn import
import './index.css'; // Thêm CSS tùy chỉnh
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Sử dụng createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
