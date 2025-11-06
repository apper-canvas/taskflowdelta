import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-card p-6 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-5 h-5 bg-gray-200 rounded border-2 flex-shrink-0 mt-1"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;