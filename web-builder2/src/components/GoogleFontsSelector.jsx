// import { useEffect, useState } from "react";
// import axios from "axios";

// const GOOGLE_FONTS_API_KEY = "AIzaSyCfVp2mL3BWW4B989p6WMZR2lJOThYqQN0"; // 🔒 Dán key tại đây
// const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity`;

// export default function GoogleFontsSelector({ value, onChange }) {
//     const [fonts, setFonts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios
//             .get(API_URL)
//             .then((res) => {
//                 setFonts(res.data.items.slice(0, 50)); // Giới hạn 50 font phổ biến
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error loading fonts:", err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Đang tải fonts...</p>;

//     return (
//         <div className="my-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
//             <select
//                 className="w-full border rounded px-2 py-1"
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//             >
//                 {fonts.map((font) => (
//                     <option
//                         key={font.family}
//                         value={`'${font.family}', ${font.category}`}
//                         style={{ fontFamily: `'${font.family}', ${font.category}` }}
//                     >
//                         {font.family}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import Select from "react-select";

const GOOGLE_FONTS_API = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCfVp2mL3BWW4B989p6WMZR2lJOThYqQN0`;

const GoogleFontsSelector = ({ value, onChange }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch(GOOGLE_FONTS_API)
            .then((res) => res.json())
            .then((data) => {
                const fontOptions = data.items.map((font) => ({
                    value: font.family,
                    label: font.family,
                }));
                setOptions(fontOptions);
            });
    }, []);

    return (
        <Select
            options={options}
            value={options.find((opt) => opt.value === value)}
            onChange={(selected) => onChange(selected.value)}
            placeholder="Chọn font"
            styles={{
                menu: (provided) => ({
                    ...provided,
                    zIndex: 100, // đảm bảo hiện phía trên
                    maxHeight: 200,
                }),
            }}
        />
    );
};

export default GoogleFontsSelector;
