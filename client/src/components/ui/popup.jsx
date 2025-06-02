const PopUp = ({ isOpen, onClose, title, subheading, children }) => {
    // if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black focus:outline-none"
                >
                    &times;
                </button>

                {/* Title and Subheading */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600">{subheading}</p>
                </div>

                {/* Body Content */}
                <div>{children}</div>
            </div>
        </>
    );
}

export default PopUp;