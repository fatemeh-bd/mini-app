import React, { useState } from 'react';

interface ClipboardCopyProps {
  title: string;
  activeTitle: string;
  url: string;
  icon?: React.ReactNode;
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ title, activeTitle, url, icon }) => {
  const [displayText, setDisplayText] = useState(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setDisplayText(activeTitle);
      // Reset the text back to the original title after 2 seconds
      setTimeout(() => {
        setDisplayText(title);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div onClick={copyToClipboard} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      {icon}
      <span style={{ marginLeft: '8px' }}>{displayText}</span>
    </div>
  );
};

export default ClipboardCopy;
