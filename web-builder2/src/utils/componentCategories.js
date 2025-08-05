

const componentCategories = [
    {
        id: "basic",
        label: "Basic Components",
        icon: "square",
        components: [
            { type: "heading", label: "Heading", icon: "heading" },
            { type: "paragraph", label: "Paragraph", icon: "text" },
            { type: "button", label: "Button", icon: "mouse" },
            { type: "quote", label: "Quote", icon: "quote" },
            { type: "richtext", label: "Rich Text", icon: "italic" },
            { type: "icon", label: "Icon", icon: "star" },
        ],
    },
    {
        id: "media",
        label: "Media",
        icon: "image",
        components: [
            { type: "image", label: "Image", icon: "image" },
            { type: "gallery", label: "Image Gallery", icon: "images" },
            { type: "video", label: "Video", icon: "video" },
            { type: "videoBackground", label: "Video Background", icon: "video" },
            { type: "audio", label: "Audio", icon: "music" },
            {
                type: "swiper",
                label: "Image Slider",
                icon: "sliders",
                props: {
                    // General Swiper options (from SwiperOptions.jsx)
                    height: 300,        // Adjust as needed
                    autoplay: false,
                    delay: 3000,
                    loop: true,
                    navigation: true,
                    pagination: true,
                    slidesPerView: 3,   // Matches your 3-column layout
                    spaceBetween: 20,   // Matches your 3-column layout

                    slides: [
                        {
                            id: 1, // Unique ID
                            image: "https://placehold.co/600x300/a0d8e6/ffffff?text=Slide+1", // Example image 1
                            iconName: "Share2", // Example Lucide Icon name
                            // No title for this design, so omit the 'title' property
                            description: "Chia sẻ và xử lý tài liệu giữa các phòng ban nhanh chóng, và đồng bộ thời gian thực.",
                        },
                        {
                            id: 2,
                            image: "https://placehold.co/600x300/90ee90/000000?text=Slide+2", // Example image 2
                            iconName: "Lock",
                            // No title
                            description: "Chuyển đổi tài liệu giấy sang tài liệu điện tử, tuân thủ quy định bảo mật.",
                        },
                        {
                            id: 3,
                            image: "https://placehold.co/600x300/f5a623/ffffff?text=Slide+3", // Example image 3
                            iconName: "Server", // Another example icon
                            // No title
                            description: "Tùy chỉnh quyền truy cập theo vai trò người dùng – tránh rò rỉ, sai sót, thao tác nhầm.",
                        },
                        // Add more slides with iconName and description as needed
                    ],
                },
            },
        ],
    },
    
    {
        id: "layout",
        label: "Layout",
        icon: "layout",
        components: [
            { type: "container", label: "Container", icon: "layout" },
            { type: "section", label: "Section", icon: "square" },
            { type: "columns", label: "Column Layout", icon: "columns" },
            { type: "spacer", label: "Spacer", icon: "arrow-down" },
            { type: "divider", label: "Divider", icon: "minus" },
        ],
    },
    {
        id: "interactive",
        label: "Interactive",
        icon: "cursor",
        components: [
            { type: "form", label: "Form", icon: "form-input" },
            { type: "cta", label: "Call to Action", icon: "megaphone" },
            { type: "testimonial", label: "Testimonial", icon: "message-square" },
            { type: "accordion", label: "Accordion", icon: "chevron-down" },
            { type: "tabs", label: "Tabs", icon: "layout-panel-top" },
        ],
    },
    {
        id: "utility",
        label: "Utility",
        icon: "settings",
        components: [
            { type: "social", label: "Social Share", icon: "share-2" },
            { type: "map", label: "Map", icon: "map-pin" },
            { type: "embed", label: "Embed Code", icon: "code" },
        ],
    },
    {
        id: "navigation",
        label: "Header & Footer",
        icon: "menu",
        components: [
            { type: "header", label: "Header", icon: "menu" },
            { type: "footer", label: "Footer Block", icon: "layout-panel-top" },
        ],
    },
    
];

export default componentCategories;
