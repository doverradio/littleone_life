import React, { useState } from 'react';
import './VirtualRosary.css'; // We'll create this for the bead styling

const VirtualRosary0 = () => {
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

  // Function to trigger bead animation
  const animateBead = (beadId) => {
    setBeads(beads.map(bead => 
      bead.id === beadId ? { ...bead, glowing: true } : bead
    ));

    setTimeout(() => {
      setBeads(beads.map(bead => ({ ...bead, glowing: false })));
    }, 2000); // Animation lasts for 2 seconds
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

export default VirtualRosary0;