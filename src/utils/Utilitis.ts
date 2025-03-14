import WebApp from "@twa-dev/sdk";

export const sizes = ["Byte", "KB", "MB", "GB", "TB"];
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 ";

  const k = 1024;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(2)} ${sizes[i]}`;
}

export const HapticMedium = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.impactOccurred("medium");
  }
};
export const HapticLight = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.impactOccurred("light");
  }
};

export const HapticHeavy = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.impactOccurred("heavy");
  }
};
export const HapticNotificationOccurredWarning = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.notificationOccurred("warning");
  }
};
export const HapticNotificationOccurredError = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.notificationOccurred("error");
  }
};
export const HapticNotificationOccurredSuccess = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.notificationOccurred("success");
  }
};

export const HapticSelectionChanged = () => {
  if (WebApp?.HapticFeedback) {
    WebApp.HapticFeedback.selectionChanged();
  }
};
