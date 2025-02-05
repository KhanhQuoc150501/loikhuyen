import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LoiKhuyen = ({ themYeuThich, themLoiKhuyen }) => {
    const [tiemkiem, setTiemkiem] = useState(""); 
    const [loiKhuyen, setLoiKhuyen] = useState("");
    const [loiKhuyenMoi, setLoiKhuyenMoi] = useState("");  
    const [tatCaLoiKhuyen, setTatCaLoiKhuyen] = useState(() => {
        return JSON.parse(localStorage.getItem('danhSachLoiKhuyen')) || [];
    });
    const [hienModal, setHienModal] = useState(false); // State để quản lý việc hiển thị modal

    const layLoiKhuyenNgauNhien = useCallback(() => {
        if (tatCaLoiKhuyen.length > 0) {
            const viTriNgauNhien = Math.floor(Math.random() * tatCaLoiKhuyen.length);
            setLoiKhuyen(tatCaLoiKhuyen[viTriNgauNhien].text);
        } else {
            console.log("Danh sách rỗng.");
        }
    }, [tatCaLoiKhuyen]);

    useEffect(() => {
        layLoiKhuyenNgauNhien();
    }, [layLoiKhuyenNgauNhien]);
    

    const handleThemLoiKhuyen = () => {
        if (loiKhuyenMoi.trim() !== "") {
            const newLoiKhuyen = { id: uuidv4(), text: loiKhuyenMoi };
            setTatCaLoiKhuyen(prevTatCa => {
                const updatedTatCa = [...prevTatCa, newLoiKhuyen];
                localStorage.setItem('danhSachLoiKhuyen', JSON.stringify(updatedTatCa));
                return updatedTatCa;
            });
            setLoiKhuyenMoi("");
            themLoiKhuyen(newLoiKhuyen);
        }
    };
    const handleShowModal = () => {
        console.log("Mở modal");
        setHienModal(true); 
        console.log(hienModal); // Kiểm tra xem trạng thái đã được cập nhật chưa
    };
    const closeModal = () => {
        setHienModal(false);
    };

    return (
            <div>
                <div className="quote-box">
                <h2>Lời Khuyên</h2>
                <p>{loiKhuyen}</p>
                <svg width="100%" height="90%" viewBox="0 0 444 16" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                                    <g transform="translate(212)" fill="#CEE3E9">
                                        <rect width="6" height="6" rx="3" />
                                        <rect x="10" width="6" height="6" rx="3" />
                                    </g>
                                </g>
                            </svg>        
                    <div class="circle" onClick={layLoiKhuyenNgauNhien}>
                         <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                                    fill="#202733" />
                            </svg>
                     </div>
            </div>
            <div className="quote-buttons">
                <button onClick={() => themYeuThich({ id: uuidv4(), text: loiKhuyen })}>Lưu lời khuyên</button>
                <button onClick={handleThemLoiKhuyen}>Thêm lời khuyên</button>
                <input 
                    type="text" 
                    placeholder="Nhập lời khuyên mới..." 
                    value={loiKhuyenMoi} 
                    onChange={(e) => setLoiKhuyenMoi(e.target.value)} 
                />
            </div>  
            
            {/* Nút hiển thị modal */}
            <button onClick={handleShowModal}>
                Hiện tất cả lời khuyên
            </button>
            {/* Modal hiển thị danh sách */}
            {hienModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Tất cả Lời Khuyên</h2>
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm lời khuyên..." 
                            value={tiemkiem} 
                            onChange={(e) => setTiemkiem(e.target.value)} 
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>Lời khuyên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tatCaLoiKhuyen
                                    .filter((loiKhuyen) => 
                                        loiKhuyen.text.toLowerCase().includes(tiemkiem.toLowerCase())
                                    )
                                    .map((loiKhuyen) => (
                                        <tr key={loiKhuyen.id}>
                                            <td>{loiKhuyen.text}</td>
                                        </tr>
                                    ))}
                                {tatCaLoiKhuyen.length === 0 && (
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

export default LoiKhuyen;