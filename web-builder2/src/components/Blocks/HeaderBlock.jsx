import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

// NavLink component nhận thêm prop onCloseMenu
const NavLink = ({ link, isMobile, onCloseMenu }) => ( // ADDED onCloseMenu
    <li className={`relative group list-none ${isMobile ? 'w-full' : ''}`}>
        <a
            href={link.href || '#'}
            className={`block px-4 py-2 text-gray-700 rounded-md
                       ${isMobile ? 'hover:bg-gray-200' : 'hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-600'}
                       `}
            onClick={() => { // ADDED onClick handler
                if (isMobile && onCloseMenu) { // Only close menu if it's a mobile link and handler is provided
                    onCloseMenu();
                }
            }}
        >
            {link.text || 'Link'}
        </a>
        {link.submenu && link.submenu.length > 0 && (
            <ul className={`${isMobile ? 'block pl-4' : 'absolute left-0 top-full z-10 hidden group-hover:block'}
                            bg-white ${isMobile ? '' : 'shadow-md rounded-md'} min-w-[160px]`}>
                {link.submenu.map((sub, idx) => (
                    <li key={idx}>
                        <a
                            href={sub.href || '#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => { // ADDED onClick handler for submenu items
                                if (isMobile && onCloseMenu) {
                                    onCloseMenu();
                                }
                            }}
                        >
                            {sub.text}
                        </a>
                    </li>
                ))}
            </ul>
        )}
    </li>
);


export default function HeaderBlock({ block, isPreview, device }) {
    const props = block.props || {};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = props.navLinks || [];

    const onCloseMenu = () => setIsMenuOpen(false); // Helper function to close menu

    return (
        <header
            className="bg-white shadow-sm relative"
            style={{
                backgroundColor: props.backgroundColor,
                color: props.color,
                padding: props.padding || "1rem",
                height: props.height || "auto",
                zIndex: isPreview ? '9999' : 'auto',
            }}
        >
            <div
                className={`flex items-center justify-between mx-auto px-4 ${props.maxWidth && props.maxWidth.startsWith('max-w-') ? props.maxWidth : ''}`}
                style={props.maxWidth && !props.maxWidth.startsWith('max-w-') ? { maxWidth: props.maxWidth } : {}}
            >
                {/* Logo and Brand Name */}
                <div className="flex items-center gap-2">
                    {props.logoSrc && (
                        <img src={props.logoSrc} alt={props.logoAlt || "Logo"} className="h-8 md:h-10" />
                    )}
                    {props.brandName && (
                        <span className="text-xl font-bold">{props.brandName}</span>
                    )}
                </div>

                {/* Main Navigation (hidden on mobile, shown on md and up) */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                    <ul className="flex items-center gap-4 lg:gap-6">
                        {navLinks.map((link, index) => <NavLink key={index} link={link} isMobile={false} />)}
                    </ul>

                    {/* Search Bar (Optional, only visible on desktop if enabled) */}
                    {props.enableSearch && (
                        <div className="hidden md:block relative">
                            <input
                                type="text"
                                placeholder={props.searchPlaceholder || "Search..."}
                                className="pl-8 pr-2 py-1 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    )}

                    {/* Contact Button (Optional, only visible on desktop if enabled) */}
                    {props.enableContactButton && (
                        <a
                            href={props.contactButtonHref || "#"}
                            target={props.contactButtonTarget || "_self"}
                            rel={props.contactButtonTarget === "_blank" ? "noopener noreferrer" : ""}
                            style={{
                                backgroundColor: props.contactButtonBgColor || "#f0f0f0",
                                color: props.contactButtonTextColor || "#000000",
                                padding: props.contactButtonPadding || "8px 16px",
                                borderRadius: props.contactButtonBorderRadius || "4px",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                transition: "background-color 0.2s, color 0.2s",
                            }}
                            className="inline-flex items-center gap-1 group"
                            onMouseEnter={e => { // THÊM LẠI PHẦN NÀY
                                e.currentTarget.style.backgroundColor = props.contactButtonHoverBgColor || "#e0e0e0";
                                e.currentTarget.style.color = props.contactButtonHoverTextColor || "#000000";
                            }}
                            onMouseLeave={e => { // THÊM LẠI PHẦN NÀY
                                e.currentTarget.style.backgroundColor = props.contactButtonBgColor || "#f0f0f0";
                                e.currentTarget.style.color = props.contactButtonTextColor || "#000000";
                            }}
                        >
                            {props.contactButtonText || "Liên hệ ngay"}
                            <svg className="ml-1 w-4 h-4 text-current group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    )}
                </nav>

                {/* Hamburger icon for small screens, shown on mobile, hidden on md and up */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    aria-label="Toggle menu"
                    className="p-2 md:hidden"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile/Tablet Dropdown Menu */}
            <div className={`
                md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}
            `}>
                <ul className="flex flex-col p-4 space-y-2">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            link={link}
                            isMobile={true}
                            onCloseMenu={onCloseMenu} // Pass onCloseMenu handler to NavLink
                        />
                    ))}

                    {/* Mobile Search (if enabled) */}
                    {props.enableSearch && (
                        <li className="w-full pt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={props.searchPlaceholder || "Search..."}
                                    className="w-full pl-8 pr-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </li>
                    )}

                    {/* Mobile Contact Button (if enabled) */}
                    {props.enableContactButton && (
                         <li className="w-full pt-2">
                            <a
                                href={props.contactButtonHref || "#"}
                                target={props.contactButtonTarget || "_self"}
                                rel={props.contactButtonTarget === "_blank" ? "noopener noreferrer" : ""}
                                style={{
                                    backgroundColor: props.contactButtonBgColor || "#f0f0f0",
                                    color: props.contactButtonTextColor || "#000000",
                                    padding: props.contactButtonPadding || "8px 16px",
                                    borderRadius: props.contactButtonBorderRadius || "4px",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    transition: "background-color 0.2s, color 0.2s",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                className="w-full inline-flex items-center gap-1"
                                onClick={onCloseMenu} // Close menu when contact button is clicked
                            >
                                {props.contactButtonText || "Liên hệ ngay"}
                                <svg className="ml-1 w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </a>
                         </li>
                    )}
                </ul>
            </div>
            {/* Overlay để đóng menu khi click ra ngoài */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={onCloseMenu} // Click vào overlay để đóng menu
                ></div>
            )}
        </header>
    );
}