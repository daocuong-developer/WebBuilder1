const TextAreaField = ({ label, value, onChange, placeholder }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
export default TextAreaField;
