import React, { useState, useEffect } from 'react';
import './VirtualRosary.css'; // For bead styling

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

  // Trigger the animation when `animateBead` prop is called
  useEffect(() => {
    if (animateBead) {
      animateBeadCallback(animateBead);
    }
  }, [animateBead]);

  const animateBeadCallback = (beadId) => {
    // Start glowing the correct bead
    setBeads(beads.map(bead => 
      bead.id === beadId ? { ...bead, glowing: true } : bead
    ));

    // Stop glowing after 2 seconds
    setTimeout(() => {
      setBeads(beads.map(bead => ({ ...bead, glowing: false })));
    }, 2000); // <- Missing semicolon added here
  };

  return (
    <div className="virtual-rosary">
      <div className="rosary-container">
        {beads.map(bead => (
          <div
            key={bead.id}
            className={`bead ${bead.glowing ? 'glow' : ''} ${bead.type}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtualRosary;
