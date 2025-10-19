// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// const containerVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { 
//       when: "beforeChildren", 
//       staggerChildren: 0.15, 
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" }
//   },
// };

// const buttonVariants = {
//   hover: { scale: 1.05 },
//   tap: { scale: 0.95 },
// };

// const Contact = () => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(backendUrl + '/api/send-email', formData);
//       alert(res.data.message);
//       setFormData({ name: '', email: '', message: '' });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const whatsappNumber = '918882374849';
//   const whatsappMessage = encodeURIComponent(`Hello, I am ${formData.name || 'interested'}. ${formData.message || ''}`);

//   return (
//     <motion.div
//       id="contact"
//       className="min-h-screen px-5 py-20 text-center font-inter
//                  bg-white text-black
//                  dark:bg-[#0F011F] dark:text-white
//                  transition-colors duration-500"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.h5 variants={itemVariants} className="mb-2 text-gray-500 dark:text-gray-400">
//         Connect with me
//       </motion.h5>

//       <motion.h1 variants={itemVariants} className="text-4xl mb-4 font-bold">
//         Get in touch
//       </motion.h1>

//       <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
//         I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
//       </motion.p>

//       <motion.form
//         onSubmit={sendEmail}
//         className="max-w-3xl mx-auto mt-10 flex flex-col gap-6"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           visible: {
//             transition: { staggerChildren: 0.15 }
//           }
//         }}
//       >
//         <motion.div
//           variants={itemVariants}
//           className="flex flex-wrap gap-5 justify-center"
//         >
//           <motion.input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             disabled={loading}
//             aria-label="Name"
//             className="flex-1 min-w-[280px] p-4 rounded-lg border border-gray-300 bg-gray-50 text-black
//                        focus:outline-none focus:ring-2 focus:ring-purple-600
//                        dark:bg-[#1b0b28] dark:border-gray-600 dark:text-white dark:placeholder-gray-400
//                        dark:focus:ring-purple-400 transition-colors duration-300"
//           />
//           <motion.input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={loading}
//             aria-label="Email"
//             className="flex-1 min-w-[280px] p-4 rounded-lg border border-gray-300 bg-gray-50 text-black
//                        focus:outline-none focus:ring-2 focus:ring-purple-600
//                        dark:bg-[#1b0b28] dark:border-gray-600 dark:text-white dark:placeholder-gray-400
//                        dark:focus:ring-purple-400 transition-colors duration-300"
//           />
//         </motion.div>

//         <motion.textarea
//           name="message"
//           placeholder="Enter your message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           rows="6"
//           disabled={loading}
//           aria-label="Message"
//           className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-black
//                      focus:outline-none focus:ring-2 focus:ring-purple-600
//                      dark:bg-[#1b0b28] dark:border-gray-600 dark:text-white dark:placeholder-gray-400
//                      dark:focus:ring-purple-400 transition-colors duration-300"
//           variants={itemVariants}
//         ></motion.textarea>

//         <motion.button
//           type="submit"
//           disabled={loading}
//           className={`self-center px-10 py-3 rounded-full bg-purple-600 text-white font-semibold
//                       hover:bg-purple-700 transition-colors duration-300
//                       ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
//           variants={buttonVariants}
//           whileHover="hover"
//           whileTap="tap"
//         >
//           {loading ? 'Sending...' : 'Submit now →'}
//         </motion.button>
//       </motion.form>

//       <motion.a
//         href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-10 inline-block px-8 py-3 rounded-full bg-green-500 text-white font-semibold
//                    hover:bg-green-600 transition-colors duration-300"
//         aria-label="Contact via WhatsApp"
//         variants={buttonVariants}
//         whileHover="hover"
//         whileTap="tap"
//       >
//         Contact via WhatsApp
//       </motion.a>
//     </motion.div>
//   );
// };

// export default Contact;





// NEW for PORTFOLIO SITE 


import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const Contact = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + '/api/send-email', formData);
      alert(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = '918882374849';
  const whatsappMessage = encodeURIComponent(`Hello, I am ${formData.name || 'interested'}. ${formData.message || ''}`);

  return (
    <motion.div
      id="contact"
      className="min-h-screen px-5 py-20 max-w-4xl mx-auto
                 bg-gray-900 text-gray-100 font-inter text-center
                 transition-colors duration-500"
      style={{ fontFamily: "'Inter', sans-serif" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h5
        variants={itemVariants}
        className="mb-2 text-sm uppercase tracking-widest text-purple-400"
      >
        Connect with me
      </motion.h5>

      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight"
      >
        Get in touch
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-lg text-gray-400 max-w-xl mx-auto"
      >
        I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
      </motion.p>

      <motion.form
        onSubmit={sendEmail}
        className="mt-10 flex flex-col gap-6 items-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-3xl">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            aria-label="Name"
            className="flex-1 min-w-[280px] p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100
                       placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       transition-colors duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            aria-label="Email"
            className="flex-1 min-w-[280px] p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100
                       placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       transition-colors duration-300"
          />
        </motion.div>

        <motion.textarea
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          disabled={loading}
          aria-label="Message"
          className="w-full max-w-3xl p-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-100
                     placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     transition-colors duration-300"
          variants={itemVariants}
        />

        <motion.button
          type="submit"
          disabled={loading}
          className={`px-12 py-3 rounded-full bg-purple-600 text-white font-extrabold tracking-wide uppercase
                      hover:bg-purple-700 transition-colors duration-300
                      ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {loading ? 'Sending...' : 'Submit now →'}
        </motion.button>
      </motion.form>

      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block px-8 py-3 rounded-full bg-green-600 text-white font-extrabold tracking-wide uppercase
                   hover:bg-green-700 transition-colors duration-300"
        aria-label="Contact via WhatsApp"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Contact via WhatsApp
      </motion.a>
    </motion.div>
  );
};

export default Contact;
