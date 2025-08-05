import { useEffect } from "react";
import WebFont from "webfontloader";

export default function useGoogleFontLoader(fontFamily) {
    useEffect(() => {
        if (!fontFamily) return;
        const fontName = fontFamily.split(",")[0].replace(/'/g, "").trim();

        WebFont.load({
            google: {
                families: [fontName],
            },
        });
    }, [fontFamily]);
}
