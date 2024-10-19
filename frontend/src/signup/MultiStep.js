// src/signup/MultiStep.js

import React, { useState } from 'react';
import { Button } from 'reactstrap';

const getNavStates = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('doing');
    } else {
      styles.push('todo');
    }
  }
  return { current: indx, styles: styles };
};

const MultiStep = ({ steps, showNavigation }) => {
  const [compState, setCompState] = useState(0);
  const [navState, setNavState] = useState(getNavStates(0, steps.length));

  const setNavStateAndCompState = (next) => {
    setNavState(getNavStates(next, steps.length));
    setCompState(next);
  };

  const next = () => {
    if (compState < steps.length - 1) {
      setNavStateAndCompState(compState + 1);
    }
  };

  const previous = () => {
    if (compState > 0) {
      setNavStateAndCompState(compState - 1);
    }
  };

  const renderSteps = () => {
    return steps.map((step, i) => (
      <li
        className={`form-wizard-step-${navState.styles[i]}`}
        onClick={() => setNavStateAndCompState(i)}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{step.name}</span>
      </li>
    ));
  };

  return (
    <div>
      <ol className='forms-wizard'>{renderSteps()}</ol>
      <div>{steps[compState].component}</div>
      <div className="divider" />
      {showNavigation && (
        <div className="clearfix">
          {/* Show "Previous" button only if it's not the last step */}
          {compState > 0 && compState < steps.length - 1 && (
            <Button color="secondary" className="float-left m-3" onClick={previous}>
              Previous
            </Button>
          )}
          {compState < steps.length - 1 && (
            <Button color='primary' className="float-right m-3" onClick={next}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStep;
