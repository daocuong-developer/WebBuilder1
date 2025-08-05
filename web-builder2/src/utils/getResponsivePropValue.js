export default function getResponsivePropValue(propValue, device = "desktop") {
    if (typeof propValue === "object" && propValue !== null) {
        return propValue[device] ?? propValue.desktop ?? Object.values(propValue)[0];
    }
    return propValue;
}