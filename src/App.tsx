import { useState } from 'react';
import NetworkGraph from './components/NetworkGraph';
import DetailPanel from './components/DetailPanel';
import BackgroundEffects from './components/BackgroundEffects';
import IntroAnimation from './components/IntroAnimation';
import { graphData, type NodeData } from './data/graphData';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-purple-500/30">
      {/* Background is always rendered */}
      <BackgroundEffects />
      
      {/* Intro Animation Overlay */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {/* Main Content fades in after Intro is done */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <NetworkGraph 
              onNodeClick={(node) => setSelectedNode(node)}
              selectedNode={selectedNode}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Panel renders on top */}
      <DetailPanel 
        node={selectedNode} 
        onClose={() => setSelectedNode(null)} 
        onNavigate={(nodeId) => {
          const targetNode = graphData.nodes.find(n => n.id === nodeId);
          if (targetNode) {
            setSelectedNode(targetNode);
          }
        }}
      />
    </div>
  );
}

export default App;
