// src/components/ProjectLayoutSettings.jsx
import React, { useState, useEffect } from "react";

const ProjectLayoutSettings = ({ allBlocks, onSave }) => {
  const [headerId, setHeaderId] = useState(null);
  const [footerId, setFooterId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("layoutConfig"));
    if (saved) {
      setHeaderId(saved.headerId || null);
      setFooterId(saved.footerId || null);
    }
  }, []);

  const handleSave = () => {
    const headerBlock = allBlocks.find((b) => b.id === headerId && b.type === "header");
    const footerBlock = allBlocks.find((b) => b.id === footerId && b.type === "footer");

    const layoutConfig = {
      header: headerBlock ? { id: headerBlock.id, props: headerBlock.props } : null,
      footer: footerBlock ? { id: footerBlock.id, props: footerBlock.props } : null,
    };

    localStorage.setItem("layoutConfig", JSON.stringify(layoutConfig));
    onSave && onSave(layoutConfig);
    alert("✅ Layout mặc định đã được lưu!");
  };

  if (!Array.isArray(allBlocks)) {
  return <div className="text-red-500 p-2">❌ allBlocks không hợp lệ</div>;
}
  return (
    
    <div className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">⚙️ Chọn Layout Chung Cho Project</h2>

      <div>
        <label className="block font-medium">Chọn Header:</label>
        <select
          className="border px-2 py-1 rounded w-full"
          value={headerId || ""}
          onChange={(e) => setHeaderId(e.target.value)}
        >
          <option value="">-- Không dùng header --</option>
          {allBlocks
            .filter((b) => b.type === "header")
            .map((b) => (
              <option key={b.id} value={b.id}>
                Header 
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Chọn Footer:</label>
        <select
          className="border px-2 py-1 rounded w-full"
          value={footerId || ""}
          onChange={(e) => setFooterId(e.target.value)}
        >
          <option value="">-- Không dùng footer --</option>
          {allBlocks
            .filter((b) => b.type === "footer")
            .map((b) => (
              <option key={b.id} value={b.id}>
                Footer  
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Lưu làm Layout mặc định
      </button>
    </div>
  );
};

export default ProjectLayoutSettings;
