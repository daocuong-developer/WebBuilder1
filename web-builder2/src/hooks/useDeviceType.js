import { useState, useEffect } from "react";

// Breakpoints tiêu chuẩn (bạn có thể điều chỉnh nếu muốn)
const getDeviceFromWidth = (width) => {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
};

export default function useDeviceType() {
    const [device, setDevice] = useState(getDeviceFromWidth(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setDevice(getDeviceFromWidth(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
}