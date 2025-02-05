import React, { useState, useEffect } from 'react';
import danhSachLoiKhuyenMacDinh from './data/danhSachLoiKhuyen';
import LoiKhuyen from './components/LoiKhuyen';
import LoiKhuyenYeuThich from './components/LoiKhuyenYeuThich';
import './App.css';

function App() {
    const [danhSachLoiKhuyen, setDanhSachLoiKhuyen] = useState([]);
    const [danhSachYeuThich, setDanhSachYeuThich] = useState([]);

    useEffect(() => {
        const existingLoiKhuyen = JSON.parse(localStorage.getItem('danhSachLoiKhuyen'));
        if (existingLoiKhuyen && existingLoiKhuyen.length > 0) {
            setDanhSachLoiKhuyen(existingLoiKhuyen);
        } else {
            localStorage.setItem('danhSachLoiKhuyen', JSON.stringify(danhSachLoiKhuyenMacDinh));
            setDanhSachLoiKhuyen(danhSachLoiKhuyenMacDinh);
        }
        const existingYeuThich = JSON.parse(localStorage.getItem('yeuThich')) || [];
        setDanhSachYeuThich(existingYeuThich);
    }, []);

    useEffect(() => {
        localStorage.setItem('yeuThich', JSON.stringify(danhSachYeuThich));
    }, [danhSachYeuThich]);

    const themYeuThich = (loiKhuyenMoi) => {
        if (!danhSachYeuThich.some(loiKhuyen => loiKhuyen.id === loiKhuyenMoi.id)) {
            setDanhSachYeuThich([...danhSachYeuThich, loiKhuyenMoi]);
        }
    };

    const xoaYeuThich = (id) => {
        setDanhSachYeuThich(danhSachYeuThich.filter(loiKhuyen => loiKhuyen.id !== id));
    };

    const themLoiKhuyen = (loiKhuyenMoi) => {
        setDanhSachLoiKhuyen(prevDanhSach => {
            const updatedDanhSach = [...prevDanhSach, loiKhuyenMoi];
            localStorage.setItem('danhSachLoiKhuyen', JSON.stringify(updatedDanhSach));
            return updatedDanhSach;
        });
    };

    return (
        <div className="app-container">
            <h1>Ứng Dụng Tạo Lời Khuyên</h1>
            <div className="button-container">
                <LoiKhuyen themYeuThich={themYeuThich} themLoiKhuyen={themLoiKhuyen} />
                <LoiKhuyenYeuThich danhSachYeuThich={danhSachYeuThich} xoaYeuThich={xoaYeuThich} />
            </div>
        </div>
    );
}

export default App;
