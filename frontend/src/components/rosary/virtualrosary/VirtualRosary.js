import React, { useState } from 'react';
import './VirtualRosary.css'; // We'll create this for the bead styling

const VirtualRosary = ({ animateBead }) => {
  const [beads, setBeads] = useState([
    { id: 'our-father', type: 'our-father', glowing: false },
    { id: 'hail-mary-1', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-2', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-3', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-4', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-5', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-6', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-7', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-8', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-9', type: 'hail-mary', glowing: false },
    { id: 'hail-mary-10', type: 'hail-mary', glowing: false }
  ]);
  
  const [currentBeadIndex, setCurrentBeadIndex] = useState(0); // Track the current bead

  // This method will animate a specific bead based on the beadId passed
  const animateBeadCallback = (beadId) => {
    // Determine the bead index based on the ID
    const beadIndex = beads.findIndex(bead => bead.id === beadId);

    if (beadIndex >= 0) {
      setBeads(beads.map((bead, index) => 
        index === beadIndex ? { ...bead, glowing: true } : bead
      ));

      setTimeout(() => {
        setBeads(beads.map(bead => ({ ...bead, glowing: false })));
        setCurrentBeadIndex((prevIndex) => (prevIndex + 1) % beads.length); // Move to the next bead
      }, 2000);
    }
  };

  return (
    <div className="virtual-rosary">
      <div className="rosary-container">
        {beads.map((bead, index) => (
          <div
            key={bead.id}
            className={`bead ${bead.glowing ? 'glow' : ''} ${bead.type}`}
            style={index === currentBeadIndex ? { border: '2px solid red' } : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtualRosary;
