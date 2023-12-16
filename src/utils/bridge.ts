import type { Messages } from "@/enums/message.enums";

export const sendMessageToContentScript = async (
  message: Messages,
  data: any
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id as number,
        { message, data },
        (response) => {
          if (response) {
            resolve(response);
          } else {
            reject("No response from content script");
          }
        }
      );
    });
  });
};
