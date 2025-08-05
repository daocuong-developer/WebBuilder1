import React from "react";
import HeaderBlock from "@/components/Blocks/HeaderBlock";
import FooterBlock from "@/components/Blocks/FooterBlock";

const SiteLayout = ({ headerData, footerData, children, isPreview = false, device = 'desktop' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {headerData && (
        <HeaderBlock
          block={{ type: "header", props: headerData }}
          isPreview={isPreview}
          device={device}
        />
      )}

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {footerData && (
        <FooterBlock block={{ type: "footer", props: footerData }} />
      )}
    </div>
  );
};

export default SiteLayout;
