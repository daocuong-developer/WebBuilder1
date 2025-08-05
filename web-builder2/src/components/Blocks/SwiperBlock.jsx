import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import * as Icons from "lucide-react"; // Vẫn giữ import này phòng trường hợp sau này bạn muốn thêm icon lại

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const SwiperBlock = ({ block, onSelect, isPreview }) => {
    const props = block.props || {};
    const slides = props.slides || [];

    const {
        height = 450, // Chiều cao tổng thể của toàn bộ khối Swiper
        autoplay = false,
        delay = 3000,
        loop = true,
        navigation = true,
        pagination = true,
        slidesPerView = 3,
        spaceBetween = 20,
    } = props;

    const modules = [A11y];
    if (navigation) modules.push(Navigation);
    if (pagination) modules.push(Pagination);
    if (autoplay) modules.push(Autoplay);

    const breakpoints = {
        320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
        768: { slidesPerView: 2, spaceBetween: 15 }, // Tablet
        1024: { slidesPerView: slidesPerView, spaceBetween: spaceBetween }, // Desktop dựa trên prop
    };

    const handleClick = (e) => {
        if (!isPreview) {
            e.stopPropagation();
            onSelect(block.id);
        }
    };

    return (
        <div
            className="relative cursor-pointer group"
            onClick={handleClick}
            style={{ height: `${height}px`, overflow: 'hidden' }}
        >
            <Swiper
                modules={modules}
                loop={loop}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                breakpoints={breakpoints}

                navigation={navigation ? {
                    nextEl: `.swiper-button-next-${block.id}`,
                    prevEl: `.swiper-button-prev-${block.id}`,
                } : false}

                pagination={pagination ? {
                    el: `.swiper-pagination-${block.id}`,
                    clickable: true,
                } : false}

                autoplay={autoplay ? {
                    delay: delay,
                    disableOnInteraction: false,
                } : false}

                style={{ width: '100%', height: '100%' }}
            >
                {slides.length > 0 ? (
                    slides.map((slide, index) => {
                        return (
                            <SwiperSlide key={slide.id || index}>
                                {/* Outer box/card styling */}
                                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md h-full border border-gray-200 overflow-hidden">
                                    {/* Image at the very top of the card, now filling the entire card if no other content */}
                                    {slide.image && (
                                        <div className="w-full h-full overflow-hidden rounded-lg"> {/* Container for image to handle overflow, now fills entire card */}
                                            <img
                                                src={slide.image}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover" // Image fills container, covers
                                            />
                                        </div>
                                    )}

                                    {/* Nếu không có ảnh, hiển thị thông báo */}
                                    {!slide.image && (
                                        <div className="flex items-center justify-center h-full w-full text-gray-500 text-lg font-medium">
                                            Không có ảnh cho slide này.
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <SwiperSlide>
                        <div
                            className="flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-medium rounded-lg shadow-md h-full"
                            style={{ height: '100%' }}
                        >
                            Không có slide nào được thêm. Vui lòng thêm hình ảnh.
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>

            {/* Custom Navigation Buttons (conditionally rendered) */}
            {navigation && slides.length > (slidesPerView || 1) && !isPreview && (
                <>
                    <div
                        className={`swiper-button-prev-${block.id} absolute top-1/2 left-2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition`}
                        style={{ ["--swiper-navigation-size"]: "0px" }}
                    >
                        <svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>

                    <div
                        className={`swiper-button-next-${block.id} absolute top-1/2 right-2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition`}
                        style={{ ["--swiper-navigation-size"]: "0px" }}
                    >
                        <svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </>
            )}

            {/* Custom Pagination Dots (conditionally rendered) */}
            {pagination && slides.length > (slidesPerView || 1) && (
                <div className={`swiper-pagination-${block.id} absolute bottom-2 w-full text-center z-10`} style={{ '--swiper-pagination-color': '#007bff' }}>
                    {/* Swiper will render dots here */}
                </div>
            )}
        </div>
    );
};

export default SwiperBlock;