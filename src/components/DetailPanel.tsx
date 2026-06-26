import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { graphData } from '../data/graphData';
import type { NodeData } from '../data/graphData';

interface DetailPanelProps {
  node: NodeData | null;
  onClose: () => void;
  onNavigate?: (nodeId: string) => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ node, onClose, onNavigate }) => {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-96 glass-panel text-white p-6 shadow-2xl z-50 flex flex-col border-l border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="mt-8 flex flex-col h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div 
                className="w-12 h-1 mb-4 rounded-full" 
                style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
              />
              <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: node.color, textShadow: `0 0 20px ${node.color}80` }}>
                {node.label}
              </h2>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 mb-6 uppercase tracking-wider">
                {node.group}
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-grow"
            >
              <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Hakkında</h3>
              <p className="text-lg leading-relaxed font-light text-gray-200">
                {node.description}
              </p>
            </motion.div>

            {node.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-6"
              >
                <a 
                  href={node.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/50"
                  style={{ 
                    backgroundColor: `${node.color}40`, 
                    boxShadow: `0 0 15px ${node.color}60`,
                    textShadow: `0 0 10px ${node.color}`
                  }}
                >
                  Projeyi İncele
                </a>
              </motion.div>
            )}
            
            {node.relatedNodes && node.relatedNodes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold">Bağlantılı Alanlar</h3>
                <div className="flex flex-wrap gap-2">
                  {node.relatedNodes.map(related => {
                    const relatedNode = graphData.nodes.find(n => n.id === related);
                    const label = relatedNode ? relatedNode.label : related.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    return (
                      <button 
                        key={related} 
                        onClick={() => onNavigate && onNavigate(related)}
                        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailPanel;
