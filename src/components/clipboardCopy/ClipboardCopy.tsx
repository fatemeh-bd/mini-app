import React from 'react';
import { useShowAlert } from '@zakarliuka/react-telegram-web-tools';

interface ClipboardCopyProps {
  title: string;
  url: string; // Ensure this is always a string
  icon?: React.ReactNode;
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ title, url = '', icon }) => {
  
  const showAlert = useShowAlert(); // Get the showAlert function from the hook

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showAlert('لینک با موفقیت کپی شد'); // Use Telegram's showAlert for feedback
    } catch (err) {
      showAlert('مشکلی در کپی لینک وجود دارد'); // Use Telegram's showAlert for feedback
    }
    document.body.removeChild(textArea);
  };

  const copyToClipboard = async () => {
    if (!url) {
      showAlert('مشکلی در کپی لینک وجود دارد'); // Use Telegram's showAlert for feedback
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
   
        showAlert('لینک با موفقیت کپی شد'); // Use Telegram's showAlert for feedback
      } catch (err) {
        fallbackCopyToClipboard(url); // Fallback to the alternative method
      }
    } else {
      fallbackCopyToClipboard(url); // Fallback if Clipboard API is not supported
    }
  };

  return (
    <div dir='rtl' onClick={copyToClipboard} className='pt-1' style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      {icon}
      <span style={{ marginLeft: '4px' }}>{title}</span>
    </div>
  );
};

export default ClipboardCopy;
