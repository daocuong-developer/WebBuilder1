// import React, { useRef } from "react";

// const ImageBlock = ({ block, onSelect, onChange }) => {
//     const fileInputRef = useRef(null);

//     const handleFileChange = (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const newSrc = URL.createObjectURL(file);
//             onChange({
//                 ...block,
//                 props: { ...block.props, src: newSrc },
//             });
//         }
//     };

//     return (
//         <div onClick={() => onSelect?.(block.id)} style={{ display: "inline-block", position: "relative" }}>
//             <input
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//                 onClick={(e) => e.stopPropagation()}
//                 onChange={handleFileChange}
//             />
//             <img
//                 src={block.props.src}
//                 alt={block.props.alt || ""}
//                 width={block.props.width}
//                 height={block.props.height}
//                 style={{
//                     borderRadius: block.props.borderRadius || 0,
//                     boxShadow: block.props.shadow || "none",
//                     cursor: "pointer",
//                 }}
//                 onClick={(() => fileInputRef.current?.click(), console.log("File input ref:", fileInputRef.current))}
//             />
//         </div>
//     );
// };

// export default ImageBlock;
