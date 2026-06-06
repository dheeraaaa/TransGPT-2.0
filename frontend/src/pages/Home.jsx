import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white pt-20 pb-10 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Break Language
            <span className="text-cyan-400"> Barriers</span>
          </h1>

          <p className="text-lg text-gray-400 mb-6">
            Real-time AI voice translation powered by speech recognition,
            translation intelligence, and natural voice synthesis.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 px-7 py-3 rounded-xl font-semibold">
              Get Started
            </button>

            <button className="border border-gray-600 px-7 py-3 rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-950 text-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Voice Translation"
              description="Speak naturally and get instant translations."
            />

            <FeatureCard
              title="AI Grammar Fix"
              description="Corrects grammar before translation."
            />

            <FeatureCard
              title="Translation History"
              description="Access all your past translations."
            />

            <FeatureCard
              title="100+ Languages"
              description="Translate between major world languages."
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;