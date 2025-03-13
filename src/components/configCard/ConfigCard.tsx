import React, { useState } from 'react';
import Badge from '../badges/Badge';
import ClipboardCopy from '../clipboardCopy/ClipboardCopy';
interface Config {
  subLink: string;
  userName: string;
  consumptionVolume: number;
  totalVolume: number;
  planeEnName: string;
  connections: string[];
}

interface BadgeComponentProps {
  config: Config;
}

const ConfigCard: React.FC<BadgeComponentProps> = ({ config }) => {
  const progressPercentage = (config.consumptionVolume / config.totalVolume) * 100;
const [isOpen, setIsOpen]= useState(false);
  return (
    <Badge key={config.subLink} className="p-2 py-4 rounded-lg">
      <div onClick={()=>{
        setIsOpen(!isOpen);
      }} className="flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center gap-2">
          <span className='font-medium'>{config.userName}</span>
          <div className="w-full">
            <div className="w-full bg-gray-200 h-2 rounded-lg">
              <div
                className="bg-blue-500 h-2 rounded-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <span>{config.planeEnName}</span>
      </div>
      {isOpen && 
      <div className='pt-1'>
        <ClipboardCopy
        title="Copy Subscription"
        url={config.subLink}
        icon={<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304c1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 0 0 1.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838c-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 1 0 1.063-1.058c-1.164-1.168-1.132-3.28.303-4.72z"></path><path fill="currentColor" d="M14.485 9.47a.75.75 0 0 0-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304c-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 0 0-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838c1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837"></path></svg>}
        />
        {config.connections.length > 0 && config.connections.map((connection) => (<ClipboardCopy url={String(connection.link)} title='Copy Link' icon={<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M15.729 3.884c1.434-1.44 3.532-1.47 4.693-.304c1.164 1.168 1.133 3.28-.303 4.72l-2.423 2.433a.75.75 0 0 0 1.062 1.059l2.424-2.433c1.911-1.919 2.151-4.982.303-6.838c-1.85-1.857-4.907-1.615-6.82.304L9.819 7.692c-1.911 1.919-2.151 4.982-.303 6.837a.75.75 0 1 0 1.063-1.058c-1.164-1.168-1.132-3.28.303-4.72z"></path><path fill="currentColor" d="M14.485 9.47a.75.75 0 0 0-1.063 1.06c1.164 1.168 1.133 3.279-.303 4.72l-4.847 4.866c-1.435 1.44-3.533 1.47-4.694.304c-1.164-1.168-1.132-3.28.303-4.72l2.424-2.433a.75.75 0 0 0-1.063-1.059l-2.424 2.433c-1.911 1.92-2.151 4.982-.303 6.838c1.85 1.858 4.907 1.615 6.82-.304l4.847-4.867c1.911-1.918 2.151-4.982.303-6.837"></path></svg>}/>))}
      </div>
      }
    </Badge>
  );
};

export default ConfigCard;
