import React, { useState } from 'react';
import './VirtualRosary.css'; // We'll create this for the bead styling

const VirtualRosary1 = ({ animateBead }) => {
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

  const animateBeadCallback = (beadId) => {
    // Get bead index for our father or hail mary sequence
    const beadIndex = beadId === 'our-father' ? 0 : currentBeadIndex;

    // Start glowing the current bead
    setBeads(beads.map((bead, index) => 
      index === beadIndex ? { ...bead, glowing: true } : bead
    ));

    // Stop glowing after 2 seconds and move to the next bead
    setTimeout(() => {
      setBeads(beads.map(bead => ({ ...bead, glowing: false }))); // Added semicolon here
      setCurrentBeadIndex((prevIndex) => (prevIndex + 1) % beads.length); // Move to the next bead
    }, 2000);
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

export default VirtualRosary1;
