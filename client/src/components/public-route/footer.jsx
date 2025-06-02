export default function Footer() {
    return (
        <footer className="bg-white shadow-inner mt-10 py-6 px-6 text-center text-sm text-gray-600">
            <p>
                © {new Date().getFullYear()} ChatSphere. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
                <a href="#privacy" className="hover:text-purple-700">Privacy Policy</a>
                <a href="#terms" className="hover:text-purple-700">Terms of Service</a>
            </div>
        </footer>
    );
}
