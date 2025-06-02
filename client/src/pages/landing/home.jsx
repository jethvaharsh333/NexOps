import { motion } from "framer-motion";
import Header from "../../components/public-route/header.jsx";
import Footer from "../../components/public-route/footer.jsx";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
            {/* <Header /> */}

            <main className="flex-1 container mx-auto px-6 py-12">
                <motion.section
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl font-bold text-purple-800">
                        Connect. Chat. Collaborate.
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        A feature-packed communication platform with real-time messaging, voice/video calls, live reactions, and more.
                    </p>
                    <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition-transform transform hover:scale-105">
                        Get Started
                    </button>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {[
                        { title: "Real-time Messaging", desc: "Instant communication with no delays." },
                        { title: "Audio/Video Calls", desc: "Crystal-clear calling experiences." },
                        { title: "User Profiles", desc: "Customizable user info and avatars." },
                        { title: "Group Chats", desc: "Stay connected with your teams." },
                        { title: "Message Search", desc: "Find chats and files easily." },
                        { title: "Live Reactions & Polling", desc: "Engage your audience instantly." },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-semibold text-purple-700">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mt-2">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.section>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
