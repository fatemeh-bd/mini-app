import React from 'react';
import Badge from '../badges/Badge';
import ClipboardCopy from '../clipboardCopy/ClipboardCopy';
interface Config {
  subLink: string;
  userName: string;
  consumptionVolume: number;
  totalVolume: number;
  planeEnName: string;
}

interface BadgeComponentProps {
  config: Config;
}

const ConfigCard: React.FC<BadgeComponentProps> = ({ config }) => {
  const progressPercentage = (config.consumptionVolume / config.totalVolume) * 100;

  return (
    <Badge key={config.subLink} className="p-2 py-4 rounded-lg">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center gap-2">
          <span>{config.userName}</span>
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
      <div>
        {config.subLink}
        <ClipboardCopy
        title="Copy Link"
        activeTitle="Copied!"
        url="https://example.com"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"></path></svg>}
      />
      </div>
    </Badge>
  );
};

export default ConfigCard;
