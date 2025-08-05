const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            className="w-full border rounded px-3 py-2"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
export default InputField;
