import React from "react";
import { motion } from "motion/react";
import PageTransition from "../../components/common/PageTransition";

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-lg text-gray-300">
              Crafting premium fishing bait since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At BaitMaster, we're dedicated to creating the highest quality
                fishing baits that help anglers connect with the thrill of the
                perfect catch. Our mission is to combine innovative designs with
                traditional craftsmanship to produce baits that consistently
                outperform the competition.
              </p>
              <p className="text-gray-700">
                We believe that fishing is more than just a hobby—it's a passion
                that connects people with nature and creates lasting memories.
                Every product we create is designed to enhance this experience,
                whether you're a weekend enthusiast or a professional angler.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Fisherman on a lake at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-black"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-1 text-center md:text-right">
                <span className="text-4xl font-bold">2010</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                <p className="text-gray-700">
                  BaitMaster was founded by John Davis, a professional angler
                  with a passion for designing better fishing lures. Starting in
                  his garage workshop, John created the first prototypes of what
                  would become our signature TroutMaster spinner.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-1 text-center md:text-right">
                <span className="text-4xl font-bold">2013</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold mb-2">First Store Opening</h3>
                <p className="text-gray-700">
                  After three years of growing online sales, we opened our first
                  physical store in Portland, Oregon. This allowed us to connect
                  directly with local fishing enthusiasts and gather valuable
                  feedback to improve our products.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-1 text-center md:text-right">
                <span className="text-4xl font-bold">2017</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold mb-2">National Recognition</h3>
                <p className="text-gray-700">
                  Our BassPro worm set was featured in "Angler's Monthly" as the
                  top soft bait of the year. This recognition catapulted our
                  brand into national awareness and helped establish us as a
                  leader in premium fishing bait.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-1 text-center md:text-right">
                <span className="text-4xl font-bold">2020</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold mb-2">Global Expansion</h3>
                <p className="text-gray-700">
                  We began shipping our products internationally, bringing
                  BaitMaster's premium fishing bait to anglers around the world.
                  Our online store now serves customers in over 30 countries.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-1 text-center md:text-right">
                <span className="text-4xl font-bold">Today</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold mb-2">
                  Continuous Innovation
                </h3>
                <p className="text-gray-700">
                  We continue to innovate and expand our product line, always
                  with the same commitment to quality and performance that has
                  defined BaitMaster from the beginning. Our team of anglers and
                  designers work tirelessly to create baits that help you land
                  the catch of a lifetime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="John Davis - Founder & CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">John Davis</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Sarah Johnson - Lead Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-gray-600">Lead Designer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Michael Chen - Product Engineer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Michael Chen</h3>
              <p className="text-gray-600">Product Engineer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Emma Garcia - Marketing Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Emma Garcia</h3>
              <p className="text-gray-600">Marketing Director</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 border border-gray-800 rounded-lg"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-400">
                We never compromise on quality. Every bait we produce undergoes
                rigorous testing to ensure it meets our high standards for
                durability and performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 border border-gray-800 rounded-lg"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-400">
                We're constantly researching new materials, designs, and
                techniques to create baits that give anglers an edge on the
                water.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 border border-gray-800 rounded-lg"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="text-gray-400">
                We're anglers ourselves. We understand the thrill of the catch
                and design our products with the same passion we bring to our
                own fishing adventures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
