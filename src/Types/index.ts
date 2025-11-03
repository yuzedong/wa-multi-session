import { WAMessageUpdate, proto } from "baileys";

export interface SendMessageTypes {
  to: string | number;
  text?: string;
  sessionId: string;
  isGroup?: boolean;
  answering?: proto.IWebMessageInfo;
}

export interface SendMediaTypes extends SendMessageTypes {
  media?: string | Buffer;
}
export interface SendTypingTypes extends SendMessageTypes {
  duration: number;
}
export interface SendReadTypes {
  sessionId: string;
  key: proto.IMessageKey;
}

export interface MessageReceived extends proto.IWebMessageInfo {
  /**
   * Your Session ID
   */
  sessionId: string;

  /**
   * Message key (required for media operations)
   */
  key: proto.IMessageKey;

  /**
   * @param path save image location path with extension
   * @example "./myimage.jpg"
   */
  saveImage: (path: string) => Promise<void>;
  /**
   * @param path save video location path with extension
   * @example "./myvideo.mp4"
   */
  saveVideo: (path: string) => Promise<void>;
  /**
   * @param path save audio location path with extension
   * @example "./myaudio.mp3"
   */
  saveAudio: (path: string) => Promise<void>;
  /**
   * @param path save image location path without extension
   * @example "./mydocument"
   */
  saveDocument: (path: string) => Promise<void>;
}

export interface StartSessionParams {
  /**
   * Print QR Code into Terminal
   */
  printQR?: boolean;

  // proxy configuration
  /**
   * Enable proxy for WhatsApp connection
   */
  enableProxy?: boolean;
  /**
   * SOCKS proxy configuration
   * @example { host: '127.0.0.1', port: 7891, type: 5 }
   */
  proxy?: {
    host: string;
    port: number;
  };

  // session events
  onQRUpdated?: (qr: string) => void;
  onConnected?: () => void;
  onConnecting?: () => void;
  onDisconnected?: () => void;

  // message events
  onMessageReceived?: (message: MessageReceived) => void;
  onMessageUpdated?: (message: MessageUpdated) => void;
}

export interface StartSessionWithPairingCodeParams {
  /**
   * Phone Number with Country Code
   */
  phoneNumber: string;

  // proxy configuration
  /**
   * Enable proxy for WhatsApp connection
   */
  enableProxy?: boolean;
  /**
   * SOCKS proxy configuration
   * @example { host: '127.0.0.1', port: 7891, type: 5 }
   */
  proxy?: {
    host: string;
    port: number;
  };
}

export type MessageUpdated = WAMessageUpdate & {
  sessionId: string;
  messageStatus:
    | "error"
    | "pending"
    | "server"
    | "delivered"
    | "read"
    | "played";
};
