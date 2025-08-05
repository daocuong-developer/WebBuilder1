import React from "react";
import { v4 as uuid } from "uuid";

// Component chỉ cần nhận "block" và "onChange"
export default function ColumnsOptions({ block, onChange }) {
    const { props } = block;

    // Hàm xử lý khi thay đổi SỐ LƯỢNG cột
    const handleNumColumnsChange = (e) => {
        const newNumColumns = parseInt(e.target.value, 10);
        if (isNaN(newNumColumns) || newNumColumns < 1 || newNumColumns > 6) {
            return;
        }

        const currentColumns = props.columns || [];
        const currentNumColumns = currentColumns.length;
        let updatedColumns = [...currentColumns];

        if (newNumColumns > currentNumColumns) {
            // Thêm cột mới
            for (let i = 0; i < newNumColumns - currentNumColumns; i++) {
                updatedColumns.push({
                    id: uuid(),
                    width: "1fr",
                    children: [],
                });
            }
        } else if (newNumColumns < currentNumColumns) {
            // Xóa bớt cột
            updatedColumns = updatedColumns.slice(0, newNumColumns);
        }

        // Tạo một object block HOÀN CHỈNH đã được cập nhật
        const updatedBlock = {
            ...block,
            props: {
                ...props,
                numColumns: newNumColumns,
                columns: updatedColumns,
            },
        };

        // Gọi hàm onChange tổng và truyền toàn bộ block mới lên
        onChange(updatedBlock);
    };

    // Hàm xử lý khi thay đổi CHIỀU RỘNG của một cột
    // const handleColumnWidthChange = (columnIndex, newWidth) => {
    //     const updatedColumns = props.columns.map((col, idx) => {
    //         if (idx === columnIndex) {
    //             return { ...col, width: newWidth };
    //         }
    //         return col;
    //     });

    //     const updatedBlock = {
    //         ...block,
    //         props: { ...props, columns: updatedColumns },
    //     };

    //     onChange(updatedBlock);
    // };
    // Thay vì chỉ cập nhật width chuỗi, giờ cập nhật theo device key
    const handleColumnWidthChange = (columnIndex, device, newWidth) => {
        const updatedColumns = props.columns.map((col, idx) => {
            if (idx === columnIndex) {
                const currentWidth = typeof col.width === "object" ? col.width : { desktop: col.width || "1fr" };
                return {
                    ...col,
                    width: {
                        ...currentWidth,
                        [device]: newWidth,
                    },
                };
            }
            return col;
        });

        const updatedBlock = {
            ...block,
            props: { ...props, columns: updatedColumns },
        };

        onChange(updatedBlock);
    };

    // Hàm xử lý các thay đổi đơn giản khác
    const handleSimpleChange = (propName, value) => {
        const updatedBlock = {
            ...block,
props: { ...props, [propName]: value },
        };
        onChange(updatedBlock);
    };

    return (
        <div className="space-y-4 p-2">
            <h3 className="text-md font-semibold mt-2">Columns Properties</h3>

            <div>
                <label htmlFor="numColumns" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Columns
                </label>
                <input
                    id="numColumns"
                    type="number"
                    min="1"
                    max="6"
                    value={props.numColumns || 1}
                    onChange={handleNumColumnsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            {/* <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Column Widths</label>
                {(props.columns || []).map((column, index) => (
                    <div key={column.id} className="flex items-center mb-2">
                        <span className="text-sm mr-2 w-1/4">Col {index + 1}:</span>
                        <input
                            type="text"
                            value={column.width || "1fr"}
                            onChange={(e) => handleColumnWidthChange(index, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="e.g., 1fr, 200px"
                        />
                    </div>
                ))}
            </div> */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Column Widths (Responsive)</label>

                {(props.columns || []).map((column, index) => (
                    <div key={column.id} className="mb-4 border p-2 rounded bg-gray-50">
                        <p className="font-medium text-sm mb-1">Column {index + 1}</p>
                        {["desktop", "tablet", "mobile"].map((device) => (
                            <div key={device} className="flex items-center mb-2">
                                <span className="text-xs w-20 capitalize text-gray-600">{device}:</span>
                                <input
                                    type="text"
                                    value={
                                        typeof column.width === "object"
                                            ? column.width[device] || ""
                                            : device === "desktop"
                                            ? column.width || ""
                                            : ""
                                    }
onChange={(e) => handleColumnWidthChange(index, device, e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 1fr, 100%, 200px"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <label htmlFor="gap" className="block text-sm font-medium text-gray-700 mb-1">
                    Gap
                </label>
                <input
                    id="gap"
                    type="text"
                    value={props.gap || "16px"}
                    onChange={(e) => handleSimpleChange("gap", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>
    );
}