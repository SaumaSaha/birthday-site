import { motion } from "framer-motion";

const SectionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.section
      className="h-screen flex items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
