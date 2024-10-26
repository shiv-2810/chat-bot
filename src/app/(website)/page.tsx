"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
  // Ref for all sections
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // State to track the visibility of each section
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target as HTMLElement);
            if (index > -1) {
              setVisibleSections((prevVisibleSections) => {
                const newVisibleSections = [...prevVisibleSections];
                newVisibleSections[index] = true;
                return newVisibleSections;
              });
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b  text-white p-8 px-10">
      <div className=" mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Explore Web Content Like Never Before</h1>
          <p className="text-lg mb-6">
            Our app turns web pages into interactive experiences. Dive into the content, ask questions, and explore in real-time.
          </p>
          <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-center rounded-lg shadow-lg"
            >
              <source src="/review.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className={`transition-opacity duration-1000 ${
            visibleSections[0] ? 'opacity-100' : 'opacity-0'
          }`}
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Simply enter any webpage URL after <code>http://localhost:3000/</code>
              </p>
              <p>
              (for example, <code>/https://en.wikipedia.org/wiki/Tom_Harley</code>) 
              and the app will load the webpage directly within the app interface.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>View the content of the webpage seamlessly.</li>
                <li>Interact with a virtual assistant to ask questions about the page.</li>
                <li>Get detailed responses based on the information provided on the page.</li>
              </ul>
            </div>
            <Image
              src="/one.png"
              alt="How It Works"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Explore Any Web Page Section */}
        <section
          className={`transition-opacity duration-1000 ${
            visibleSections[1] ? 'opacity-100' : 'opacity-0'
          }`}
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Explore Any Web Page</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Image
              src="/two.png"
              alt="Explore Web Pages"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <div>
              <p className="text-lg mb-4">
                Whether it's a Wikipedia article, blog post, or a tutorial, just paste the URL, and the app will fetch 
                the content for you. You can then ask any questions related to the page and get instant answers.
              </p>
              <p className="text-lg">
                For example, to explore the Wikipedia article about <strong>Tom Harley</strong>, visit: 
                <code>http://localhost:3000/https://en.wikipedia.org/wiki/Tom_Harley</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Why Use This App Section */}
        <section
          className={`transition-opacity duration-1000 ${
            visibleSections[2] ? 'opacity-100' : 'opacity-0'
          }`}
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Use This App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                This app is designed to make learning and browsing more interactive. Instead of just reading content, 
                you can engage with it in real-time. It’s a new way to explore, learn, and ask questions directly about the content.
              </p>
              <p className="text-lg mb-4">
                By integrating a chatbot with webpage content, we’ve created a seamless way for you to dive deeper 
                into the information and get a personalized learning experience.
              </p>
            </div>
            <Image
              src="/one.png"
              alt="Why Use This App"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Example Section */}
        <section
          className={`transition-opacity duration-1000 ${
            visibleSections[3] ? 'opacity-100' : 'opacity-0'
          }`}
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Example: Wikipedia Article</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Image
              src="/two.png"
              alt="Example Wikipedia Article"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <div>
              <p className="text-lg mb-4">
                Want to see it in action? Try exploring the Wikipedia article on <strong>Tom Harley</strong>.
                Just visit <code>http://localhost:3000/https://en.wikipedia.org/wiki/Tom_Harley</code> and watch how 
                you can engage with the content interactively.
              </p>
              <p className="text-lg">
                Ask questions like “Who is Tom Harley?” or “What is he known for?” and get immediate responses.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
