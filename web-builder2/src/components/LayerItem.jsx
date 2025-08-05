import React from "react";
import {
    CubeTransparentIcon,
    PhotoIcon,
    Squares2X2Icon,
    RectangleStackIcon,
    MegaphoneIcon,
    Bars3BottomLeftIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    MinusIcon,
    VideoCameraIcon,
    ViewColumnsIcon,
    InboxIcon,
    PencilIcon,
    EnvelopeIcon,
    SparklesIcon,
    IdentificationIcon,
    DocumentDuplicateIcon,
    BoltIcon,
    MicrophoneIcon,
    SpeakerWaveIcon,
    PuzzlePieceIcon,
    FolderOpenIcon,
    UserGroupIcon,
    MapPinIcon,
    CodeBracketIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const getIconForType = (type) => {
    switch (type) {
        case "button":
            return <RectangleStackIcon className="h-4 w-4 mr-2 text-blue-500" />;
        case "heading":
            return <MegaphoneIcon className="h-4 w-4 mr-2 text-green-500" />;
        case "paragraph":
            return <Bars3BottomLeftIcon className="h-4 w-4 mr-2 text-purple-500" />;
        case "image":
            return <PhotoIcon className="h-4 w-4 mr-2 text-orange-500" />;
        case "container":
            return <Squares2X2Icon className="h-4 w-4 mr-2 text-indigo-500" />;
        case "quote":
            return <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-gray-500" />;
        case "divider":
            return <MinusIcon className="h-4 w-4 mr-2 text-gray-500" />;
        case "video":
            return <VideoCameraIcon className="h-4 w-4 mr-2 text-red-500" />;
        case "spacer":
            return <ViewColumnsIcon className="h-4 w-4 mr-2 text-gray-400" />;
        case "footer":
            return <InboxIcon className="h-4 w-4 mr-2 text-neutral-500" />;
        case "form":
            return <DocumentTextIcon className="h-4 w-4 mr-2 text-cyan-500" />;
        case "input":
            return <PencilIcon className="h-4 w-4 mr-2 text-yellow-500" />;
        case "textarea":
            return <DocumentDuplicateIcon className="h-4 w-4 mr-2 text-yellow-600" />;
        case "newsletter":
            return <EnvelopeIcon className="h-4 w-4 mr-2 text-teal-500" />;
        case "hero":
            return <SparklesIcon className="h-4 w-4 mr-2 text-pink-500" />;
        case "logo":
            return <IdentificationIcon className="h-4 w-4 mr-2 text-amber-500" />;
        case "richtext":
            return <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-700" />;
        case "icon":
            return <BoltIcon className="h-4 w-4 mr-2 text-gray-500" />;
        case "section":
            return <Squares2X2Icon className="h-4 w-4 mr-2 text-blue-400" />;
        case "columns":
            return <ViewColumnsIcon className="h-4 w-4 mr-2 text-purple-400" />;
        case "gallery":
            return <PhotoIcon className="h-4 w-4 mr-2 text-fuchsia-500" />;
        case "audio":
            return <SpeakerWaveIcon className="h-4 w-4 mr-2 text-lime-500" />;
        case "cta":
            return <PuzzlePieceIcon className="h-4 w-4 mr-2 text-emerald-500" />;
        case "testimonial":
            return <UserGroupIcon className="h-4 w-4 mr-2 text-blue-600" />;
        case "accordion":
            return <FolderOpenIcon className="h-4 w-4 mr-2 text-slate-500" />;
        case "tabs":
            return <ViewColumnsIcon className="h-4 w-4 mr-2 text-gray-600" />;
        case "socials":
            return <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-blue-400" />;
        case "map":
            return <MapPinIcon className="h-4 w-4 mr-2 text-rose-500" />;
        case "embed":
            return <CodeBracketIcon className="h-4 w-4 mr-2 text-indigo-500" />;
        case "header":
            return <Cog6ToothIcon className="h-4 w-4 mr-2 text-gray-800" />;
        default:
            return <CubeTransparentIcon className="h-4 w-4 mr-2 text-gray-500" />;
    }
};

const LayerItem = ({ element, isSelected, onSelectElement, children }) => {
    const handleSelect = (e) => {
        e.stopPropagation();
        onSelectElement(element);
    };

    return (
        <div
            className={`
            flex flex-col rounded text-sm mb-1
            ${isSelected ? " border-blue-500" : "bg-white hover:bg-gray-50"}
        `}
        >
            <button className="flex items-center w-full p-2 text-left" onClick={handleSelect}>
                {getIconForType(element.type)}
                <span className="flex-grow capitalize">
                    {element.type} {element.type === "container" && element.children && `(${element.children.length})`}
                </span>
            </button>
            {children}
        </div>
    );
};

export default LayerItem;
