const AlignOptions = ({ label, value, onChange }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            className="w-full border rounded px-2 py-1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
        </select>
    </div>
);
export default AlignOptions;
