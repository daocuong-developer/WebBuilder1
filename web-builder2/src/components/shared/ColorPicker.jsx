const ColorPicker = ({ label, value, onChange }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="color"
            className="w-full h-10 rounded border"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
export default ColorPicker;
