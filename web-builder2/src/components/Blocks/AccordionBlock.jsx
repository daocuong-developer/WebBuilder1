import React, { useState } from "react";
import getDefaultProps from "@/utils/defaultProps";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const AccordionBlock = ({ block, onSelect, isPreview }) => {
    const props = {
        ...getDefaultProps(block.type),
        ...block.props,
    };

    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    const accordionStyle = {
        border: props.border,
        borderRadius: props.borderRadius,
        overflow: "hidden",
        margin: props.margin,
        maxWidth: props.maxWidth,
        boxSizing: "border-box",
    };

    const itemHeaderStyle = {
        backgroundColor: props.headerBgColor,
        color: props.headerTextColor,
        padding: props.headerPadding,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: props.headerFontWeight,
        fontSize: props.headerFontSize,
        borderBottom: props.itemBorder,
    };

    const itemContentStyle = {
        backgroundColor: props.contentBgColor,
        color: props.contentTextColor,
        padding: props.contentPadding,
        fontSize: props.contentFontSize,
        borderBottom: props.itemBorder,
    };

    return (
        <div style={accordionStyle} onClick={!isPreview ? onSelect : undefined}>
            {(props.items || []).length > 0
                ? props.items.map((item, index) => {
                      const isOpen = openItem === index;

                      return (
                          <div key={index}>
                              {/* Header */}
                              <div
                                  style={{
                                      ...itemHeaderStyle,
                                      borderBottom:
                                          isOpen && index === props.items.length - 1 ? "none" : props.itemBorder,
                                  }}
                                  onClick={() => toggleItem(index)}
                              >
                                  <span>{item.title || `Accordion Item ${index + 1}`}</span>
                                  <ChevronDown
                                      size={18}
                                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                      style={{ minWidth: "18px" }}
                                  />
                              </div>

                              {/* Content */}
                              <AnimatePresence initial={false}>
                                  {isOpen && (
                                      <motion.div
                                          key="content"
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3, ease: "easeInOut" }}
                                          style={{ overflow: "hidden" }}
                                      >
                                          <div
                                              style={{
                                                  ...itemContentStyle,
                                                  borderBottom:
                                                      index < props.items.length - 1 ? props.itemBorder : "none",
                                              }}
                                          >
                                              <ReactMarkdown>
                                                  {item.content || "Content for this accordion item."}
                                              </ReactMarkdown>
                                          </div>
                                      </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                      );
                  })
                : !isPreview && (
                      <div
                          className="text-sm text-gray-400 italic text-center p-4"
                          style={{
                              border: "1px dashed #d1d5db",
                              borderRadius: "6px",
                              minHeight: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                          }}
                      >
                          (Empty Accordion – add items in properties)
                      </div>
                  )}
        </div>
    );
};

export default AccordionBlock;
