import React, { useState } from "react";
import * as Icons from "lucide-react";

const iconList = [
    // Basic / Common Icons
    "Star", "Heart", "Check", "Smile", "Sun", "Moon", "Home", "User",
    "AlertCircle", "Bell", "Camera", "Cloud", "Download", "Edit", "Eye",
    "File", "Gift", "Globe", "Image", "Key", "Lock", "MapPin", "Phone",
    "Search", "Settings", "Info", "HelpCircle", "Minus", "Plus", "X",
    "CheckCircle", "XCircle", "MessageSquare", "Mail", "Link", "Paperclip",
    "Trash", "Save", "Folder", "Calendar", "Clock", "Hash", "Tag", "Bookmark",
    "Share2", "ExternalLink", "MoreVertical", "MoreHorizontal", "Menu", "Grid",

    // Navigation / Direction Icons
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ChevronUp", "ChevronDown",
    "ChevronLeft", "ChevronRight", "ChevronsUp", "ChevronsDown", "ChevronsLeft",
    "ChevronsRight", "CornerUpLeft", "CornerUpRight", "CornerDownLeft", "CornerDownRight",
    "Move", "Maximize", "Minimize", "RotateCcw", "RotateCw", "Repeat", "RefreshCw",

    // Media / Playback
    "Play", "Pause", "Stop", "SkipForward", "SkipBack", "Volume2", "VolumeX",
    "Mic", "Film", "Music", "Video", "Monitor", "Tv",

    // Development / Code
    "Code", "Terminal", "GitBranch", "GitCommit", "GitMerge", "GitPullRequest",
    "Bug", "Database", "Server", "Cpu", "HardDrive", "Dna",

    // Business / Finance
    "Briefcase", "DollarSign", "CreditCard", "ShoppingCart", "BarChart2", "PieChart",
    "TrendingUp", "TrendingDown", "Percent", "Wallet",

    // UI / Controls
    "List", "Table", "Columns", "Sliders", "Filter", "AlignLeft", "AlignCenter",
    "AlignRight", "AlignJustify", "Bold", "Italic", "Underline", "ListOrdered",
    "ListUnordered", "Code", "Link2", "Maximize2", "Minimize2",

    // User / People
    "Users", "UserPlus", "UserMinus", "UserCheck", "UserX", "UserCircle", "UserCog",
    "Laugh", "SmilePlus", "Frown",

    // Devices
    "Laptop", "Tablet", "Smartphone", "Watch", "Printer", "Usb",

    // Location / Maps
    "Map", "Compass", "Navigation", "Car", "Bike", "Bus", "Train", "Plane",

    // Weather / Nature
    "CloudRain", "CloudSnow", "CloudLightning", "Droplet", "Leaf", "TreePalm", "Wind",

    // Miscellaneous
    "Zap", "Coffee", "Feather", "Anchor", "Target", "Rss", "Award", "Flag",
    "Tool", "Box", "Package", "Truck", "Cubes", "Gauge", "Fingerprint", "Waypoints"
];


const IconOptions = ({ block, handleChange }) => {
    const selectedIconName = block.props.iconName || "Star";
    const IconComponent = Icons[selectedIconName] || Icons["Star"];
    const [searchTerm, setSearchTerm] = useState("");

    const filteredIcons = iconList.filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tìm và chọn Icon</label>
                <input
                    type="text"
                    placeholder="Tìm icon (e.g., star, user...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded px-2 py-1 mb-2"
                />

                <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
                    {filteredIcons.map((name) => {
                        const Icon = Icons[name];
                        // Ensure Icon is a valid component before rendering
                        if (!Icon) return null;
                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => handleChange("iconName", name)}
                                className={`flex flex-col items-center justify-center p-2 border rounded text-xs hover:bg-gray-100 ${
                                    selectedIconName === name ? "bg-blue-100 border-blue-500" : ""
                                }`}
                            >
                                <Icon size={24} />
                                <span>{name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Size (px)</label>
                <input
                    type="number"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.size || 24}
                    onChange={(e) => handleChange("size", parseInt(e.target.value))}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Color</label>
                <input
                    type="color"
                    className="w-full border rounded px-2 py-1"
                    value={block.props.color || "#000000"}
                    onChange={(e) => handleChange("color", e.target.value)}
                />
            </div>
        </div>
    );
};

export default IconOptions;