import React from 'react';
import { FaHandPointer, FaPlus, FaRegCopy, FaRedo, FaUndo } from 'react-icons/fa';


const LowerBar: React.FC = () => {
  return (
    <div style={styles.lowerBar}>
      <button style={styles.button}>
        <FaHandPointer size={20} color='White' />
      </button>
      <button style={styles.button}>
        <FaPlus size={20} color='White' />
      </button>
      <button style={styles.button}>
        <FaRegCopy size={20} color='White' />
      </button>
      <button style={styles.button}>
        <FaRedo size={20} color='White' />
      </button>
      <button style={styles.button}>
        <FaUndo size={20} color='White'/>
      </button>
    </div>
  );
};

const styles = {
  lowerBar: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  button: {
    margin: '0 10px',
    padding: '10px',
    backgroundColor: 'Transparent',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LowerBar;