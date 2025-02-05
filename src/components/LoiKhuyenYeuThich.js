import React, { useState, useEffect } from 'react';
import danhSachLoiKhuyen from '../data/danhSachLoiKhuyen'; // Đảm bảo đường dẫn chính xác

const LoiKhuyenYeuThich = ({ danhSachYeuThich, xoaYeuThich }) => {
    const [tiemkiem, setTiemkiem] = useState(""); 
    const [hienDanhSach, setHienDanhSach] = useState(false); 
    const [data, setData] = useState([]); 

    useEffect(() => {
        // Lấy dữ liệu từ danhSachLoiKhuyen.js
        setData(danhSachLoiKhuyen);
    }, [data]);

    // Lọc danh sách
    const filteredData = (danhSachYeuThich || []).filter(loiKhuyen => 
        loiKhuyen.text.toLowerCase().includes(tiemkiem.toLowerCase())
    );

    const chiaSeFacebook = (text) => {
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`;
        window.open(facebookShareURL, '_blank');
    };

    return (
        <div>
            <div className="buttons-container">
                <button onClick={() => setHienDanhSach(!hienDanhSach)}>
                    {hienDanhSach ? "Ẩn danh sách" : "Danh sách yêu thích"}
                </button>
            </div>
            
            {hienDanhSach && (
                <div className="modal show">
                    <div className="modal-content">
                        <span className="close" onClick={() => setHienDanhSach(false)}>&times;</span>
                        <h3>Lời khuyên yêu thích</h3>
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm lời khuyên..." 
                            value={tiemkiem} 
                            onChange={(e) => setTiemkiem(e.target.value)} 
                        />
                        {/* Table for displaying quotes */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Lời khuyên</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(loiKhuyen => (
                                    <tr key={loiKhuyen.id}>
                                        <td>{loiKhuyen.text}</td>
                                        <td>
                                            <button onClick={() => xoaYeuThich(loiKhuyen.id)}>Xóa</button>
                                            <button onClick={() => chiaSeFacebook(loiKhuyen.text)}>Chia sẻ lên Facebook</button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan="2">Không tìm thấy lời khuyên nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoiKhuyenYeuThich;
