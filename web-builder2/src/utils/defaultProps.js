// src/utils/defaultProps.js
import { v4 as uuid } from "uuid";

// Define all supported block types
export const BLOCK_TYPES = [
    "heading",
    "paragraph",
    "button",
    "image",
    "container",
    "quote",
    "richtext",
    "icon",
    "section",
    "columns",
    "divider",
    "gallery",
    "video",
    "audio",
    "form",
    "cta",
    "testimonial",
    "accordion",
    "tabs",
    "social",
    "map",
    "embed",
    "header",
    "footer",
    "spacer", // Added from your previous version
    "input", // Added from your previous version
    "textarea", // Added from your previous version
    "newsletter", // Added from your previous version
    "hero", // Added from your previous version
    "logo",
    "swiper" // Added from your previous version
];

// This function returns the default properties for each block type
export default function getDefaultProps(type) {
    switch (type) {
        case "heading":
            return {
                text: "Your Heading",
                level: "h1",
                fontFamily: "inherit",
                fontSize: "40px",
                color: "#000000",
                textAlign: "left",
                lineHeight: "1.2",
                letterSpacing: "normal",
                bold: false,
                italic: false,
                underline: false,
            };
        case "paragraph":
            return {
                text: "This is a paragraph of text.",
                fontFamily: "inherit",
                fontSize: {
                    desktop: "16px",
                    tablet: "15px",
                    mobile: "14px"
                },
                color: "#000000",
                textAlign: "left",
                lineHeight: "1.5",
                letterSpacing: "normal",
                bold: false,
                italic: false,
                underline: false,
                href: null,
            };
        case "button":
            return {
                text: "Click Me",
                href: "#",
                target: "_self",
                size: "md",
                variant: "primary",
                borderRadius: "0px",
                backgroundColor: "#000",
                color: "#ffffff",
                padding: "10px 20px",
                hoverEffect: true,
                hoverBackgroundColor: "#0056b3",
                hoverTextColor: "#ffffff",
                disabled: false,
                icon: "",
                iconSize: 16,
                textAlign: "center",
                blockAlignment: "left",
            };
        case "image":
            return {
                src: "/image/demoImage.svg",
                alt: "Default Image",
                align: 'flex-start', // <-- THÊM DÒNG NÀY
                width: { // <-- Chuyển sang object
                    desktop: "100%",
                },
                height: { // <-- Chuyển sang object
                    desktop: "auto",
                },
                borderRadius: "8px",
                shadow: "none",
                objectFit: "cover",
                url: "",
                target: "_self",
            };
        case "container":
            return {
                direction: "column",
                gap: "12px",
                padding: "8px",
                minHeight: "200px",
                backgroundColor: "#f9fafb",
                border: "1px dashed #cbd5e1",
                children: [],
                placeholderText: "Container (drag components here)",
                layoutType: "block",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                maxWidth: "100%",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "auto",
            };
        case "quote":
            return {
                text: "This is a profound quote.",
                author: "Anonymous",
                title: "",
                avatarSrc: "",
                textAlign: "center",
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                padding: "30px",
                margin: "20px auto",
                maxWidth: "700px",
                backgroundColor: "transparent",
                borderColor: "#e0e0e0",
                borderWidth: "0px",
                borderRadius: "8px",
                boxShadow: "none",
                variant: "quote",
                showQuotes: true,
                authorImageSize: "80px",
                authorNameColor: "#333333",
                authorTitleColor: "#777777",
                contentColor: "#444444",
                contentFontSize: "18px",
            };
        case "richtext":
            return {
                html: "<p>Your <b>rich text</b> content goes here.</p>",
                color: "#333",
                fontSize: "1rem",
                lineHeight: "1.6",
            };
        case "icon":
            return {
                iconName: "star",
                size: 24,
                color: "#000000",
                textAlign: "center",
                display: "inline-block",
            };
        // case "section":
        //     return {
        //         backgroundColor: "#f0f0f0",
        //         padding: "40px 0",
        //         minHeight: "100px",
        //         margin: "0",
        //         children: [],
        //     };
        case "section": 
            return {
                children: [], // Section sẽ chứa các block con
                style: {
                    padding: "60px 40px", // Padding mặc định cho section
                    margin: "0",
                    backgroundColor: "#f5f5f5", // Màu nền mặc định
                    minHeight: "200px", // Chiều cao tối thiểu để dễ kéo thả
                    border: "1px dashed #ccc", // Border để dễ nhận biết trong editor
                },
            };

        // case "columns": {
        //     const numColumns = 2;
        //     const columns = Array.from({ length: numColumns }, (_, i) => ({
        //         id: "column-" + uuid(),
        //         children: [],
        //         width: "1fr",
        //     }));
        //     return {
        //         numColumns,
        //         gap: "20px",
        //         padding: "0",
        //         margin: "0",
        //         alignItems: "flex-start",
        //         justifyContent: "space-between",
        //         columns,
        //     };
        // }
        case "columns": {
            const numColumns = 2;
            const columns = Array.from({ length: numColumns }, () => ({
                id: uuid(), // Dùng uuid() trực tiếp cho đơn giản
                children: [], // ✅ THÊM DÒNG NÀY
                width: {
                    desktop: "1fr",
                    tablet: "100%",
                    mobile: "100%",
                },
            }));
            return {
                numColumns,
                gap: "20px",
                columns,
                padding: "0",
                margin: "0",
                alignItems: "flex-start",
                justifyContent: "space-between",
            };
        }
        case "divider":
            return {
                thickness: "1px",
                color: "#e5e7eb",
                margin: "16px 0",
                style: "solid",
                width: "100%",
            };
        case "gallery":
            return {
                images: [],
                layout: "grid",
                columns: 3,
                gap: "10px",
                padding: "10px",
                margin: "0",
                imageHeight: "200px",
                objectFit: "cover",
            };
        case "video":
            return {
                src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                width: "100%",
                height: "315px",
                allowFullscreen: true,
                controls: true,
                autoplay: false,
                loop: false,
                muted: false,
                objectFit: "cover",
                poster: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/480725112_1351186172559949_5475490614652208846_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFnaYqvlF1cGUChF_jLUWgCyOpL6nR5m3LI6kvqdHmbckheO0DIu45NRvN5HgkymSxldpBJe6xri9-SFNEiVL7l&_nc_ohc=3M27K7lpavEQ7kNvwEiGJgO&_nc_oc=AdmYIL32H4xJ7NxIL10UnAg4cqOqJ3mpD4Qbfm8kOm--5oNMGnMRzPpL1IV7LWdrS94&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=LRWJttuZnLgf4OFnwHx3nw&oh=00_AfMj1QHcINKRd0mK-tviwCDMlfMLOym6DzBhEDJ8fjMC_Q&oe=6862F05C",
                onClickAction: "",
            };
        case "audio":
            return {
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                autoplay: false,
                controls: true,
                loop: false,
                muted: false,
            };
        case "form":
            return {
                fields: [
                    { id: "name", label: "Name", type: "text", placeholder: "Enter your name", required: true },
                    { id: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
                    { id: "message", label: "Message", type: "textarea", placeholder: "Your message", required: false },
                ],
                formName: "Contact Form",
                formNameSize: "2xl",
                formNamePosition: "center",
                formAlignment: "left",
                action: "#",
                method: "POST",

                // Layout & style
                padding: "24px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                maxWidth: "600px",
                formFontFamily: "'Inter', sans-serif",
                formBoxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",

                // Label / input styles
                labelFontSize: "14px",
                labelColor: "#374151",
                inputFontSize: "15px",
                inputColor: "#111827",
                fieldSpacing: "16px",

                // Submit button
                submitText: "Submit",
                submitAlignment: "center", // 'left' | 'center' | 'right'
                submitMarginTop: "20px",
                buttonBgColor: "#007bff",
                buttonHoverColor: "#0056b3", // Default hover color
                buttonTextColor: "#ffffff",
                buttonBorderRadius: "6px",
                buttonFontSize: "16px",
                buttonPadding: "12px 24px",
            };
        case "cta":
            return {
                headline: "Call to Action Headline",
                description: "Compelling description to drive engagement.",
                buttonText: "Learn More",
                buttonUrl: "#",
                buttonTarget: "_self",
                backgroundColor: "#f5f5f5",
                padding: "40px",
                textAlign: "center",
                borderRadius: "8px",
                margin: "20px auto",
                maxWidth: "800px",
                headlineColor: "#333",
                headlineFontSize: "2rem",
                descriptionColor: "#555",
                descriptionFontSize: "1.1rem",
                buttonBgColor: "#007bff",
                buttonTextColor: "#fff",
                buttonPadding: "12px 25px",
                buttonBorderRadius: "5px",
                buttonHoverBgColor: "#0056b3",
            };
        case "testimonial":
            return {
                content: "This is an amazing product! Highly recommend.",
                authorName: "Jane Doe",
                authorTitle: "CEO, Company A",
                authorImage:
                    "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740",

                padding: "30px",
                margin: "20px auto",
                maxWidth: "600px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                textAlign: "left",
                alignItems: "center",
                fontFamily: "inherit",
                lineHeight: "1.5",

                contentFontSize: "1.1rem",
                contentColor: "#444",

                authorImageSize: "80px",

                authorNameColor: "#333",
                authorNameFontSize: "1rem",

                authorTitleColor: "#777",
                authorTitleFontSize: "0.9rem",
            };
        case "accordion":
            return {
                items: [
                    { title: "Item 1 Title", content: "Content for item 1." },
                    { title: "Item 2 Title", content: "Content for item 2." },
                ],
                border: "1px solid #ddd",
                borderRadius: "8px",
                margin: "20px 0",
                maxWidth: "700px",

                headerBgColor: "#f0f0f0",
                headerTextColor: "#333",
                headerPadding: "15px",

                itemBorder: "1px solid #ddd",

                contentBgColor: "#fff",
                contentTextColor: "#666",
                contentPadding: "15px",
            };
        case "tabs":
            return {
                tabs: [
                    { title: "Tab 1 Title", content: "Content for Tab 1." },
                    { title: "Tab 2 Title", content: "Content for Tab 2." },
                    { title: "Tab 3 Title", content: "Content for Tab 3." },
                ],
                margin: "20px auto",
                maxWidth: "800px",
                tabListBorder: "1px solid #ddd",
                tabListBgColor: "#f8f8f8",
                tabButtonPadding: "10px 15px",
                tabButtonBorderRadius: "4px 4px 0 0",
                tabButtonFontSize: "16px",
                tabButtonFontWeight: "600",
                activeTabBorderColor: "#007bff",
                activeTabBgColor: "#fff",
                activeTabTextColor: "#007bff",
                tabTextColor: "#555",
                tabHoverBgColor: "#e9e9e9",
                tabContentPadding: "20px",
                tabContentBorder: "1px solid #ddd",
                tabContentBorderTop: "none",
                tabContentBgColor: "#fff",
                tabContentTextColor: "#333",
                tabContentFontSize: "15px",
            };
        case "social":
            return {
                alignment: "center",
                padding: "10px",
                margin: "10px 0",
                iconSize: 24,
                iconColor: "#000",
                shareUrl: "",
                shareText: "",
                showFacebook: true,
                showTwitter: true,
                showLinkedIn: true,
                showPinterest: false,
                showEmail: false,
            };
        case "map":
            return {
                location: "Hanoi, Vietnam",
                zoom: 14,
                mapType: "roadmap",
                width: "100%",
                height: "400px",
                borderRadius: "8px",
                shadow: "0 2px 8px rgba(0,0,0,0.1)",
                margin: "20px auto",
                maxWidth: "800px",
            };
        case "embed":
            return {
                code: "",
                padding: "10px",
                margin: "0",
                width: "100%",
                height: "auto",
            };
        case "header":
            return {
                backgroundColor: "#ffffff",
                color: "#333333",
                padding: "15px 20px",
                height: "60px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                isFixed: false,
                logoSrc: "",
                logoAlt: "Logo",
                brandName: "Your Brand",
                logoHeight: "40px",
                logoMaxWidth: "150px",
                navLinks: [
                    { id: "1", text: "Home", href: "/", submenu: [] },
                    { id: "2", text: "About", href: "/about", submenu: [] },
                    {
                    id: "3",
                    text: "Services",
                    href: "#",
                    submenu: [
                        { id: "3-1", text: "Web Design", href: "/services/web-design" },
                        { id: "3-2", text: "SEO", href: "/services/seo" },
                    ],
                    },
                ],
                navLinkColor: "#333333",
                navLinkHoverColor: "#007bff",
                navLinkFontSize: "16px",
                navLinkFontWeight: "normal",
                navAlignment: "right",
                showSearch: false,
                searchPlaceholder: "Search...",
                showSignUp: false,
                signUpText: "Sign Up",
                signUpLink: "/signup",
                signUpBgColor: "#007bff",
                signUpTextColor: "#ffffff",
                showSignIn: false,
                signInText: "Sign In",
                signInLink: "/login",
                signInTextColor: "#333333",
                responsive: true,
                mobileBreakpoint: "768px",
            };
        case "footer":
            return {
                backgroundColor: "#f1f5f9",
                color: "#000",
                padding: "40px",
                fontSize: "14px",
                lineHeight: "1.6",
                textAlign: "center",
                marginTop: "0",
                layout: "three-column", // default layout
                columns: [
                    {
                        title: "About Us",
                        items: ["Company Info", "Careers", "Press"],
                    },
                    {
                        title: "Support",
                        items: ["Help Center", "Contact", "Terms of Service"],
                    },
                    {
                        title: "Follow Us",
                        items: [
                            { icon: "facebook", link: "https://facebook.com" },
                            { icon: "twitter", link: "https://twitter.com" },
                        ],
                    },
                ],
                showCopyright: true,
                copyrightText: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
                copyrightColor: "#555",
            };
        case "spacer":
            return {
                height: 32,
            };
        case "input":
            return {
                label: "Your Name",
                placeholder: "Enter name",
                type: "text",
                required: false,
            };
        case "textarea":
            return {
                label: "Your Message",
                placeholder: "Type your message here...",
                rows: 4,
                required: false,
            };
        case "newsletter":
            return {
                title: "Subscribe to our newsletter",
                placeholder: "Enter your email",
                buttonText: "Subscribe",
            };
        case "hero":
            return {
                title: "Welcome to Our Website",
                subtitle: "We build beautiful websites",
                backgroundImage: "/image/hero-bg.jpg",
                ctaText: "Get Started",
                ctaLink: "#",
                height: "500px",
                textAlign: "center",
                titleColor: "#fff",
                subtitleColor: "#fff",
                ctaBgColor: "#007bff",
                ctaTextColor: "#fff",
            };
        case "logo":
            return {
                src: "/image/logo.svg",
                alt: "Company Logo",
                width: 120,
                height: 60,
            };
        case "videoBackground":
            return {
                videoUrl: "",
                title: "Giải pháp Số hoá & Lưu trữ bằng AI",
                description: "Tự động hoá quy trình lưu trữ tài liệu, hỗ trợ hành chính thông minh.",
                buttonText: "Dùng thử miễn phí",
            };
        default:
            return {};
    }
}
