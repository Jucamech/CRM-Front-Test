import { Base64 } from "./otros.model";

/************** Datos del Chat **************/

export interface GetMsgWhatsApp {
  ack: string | null;
  author: string;
  body: string;
  chatId: string;
  chatName: string;
  fromMe: boolean;
  id: string;
  isForwarded: number;
  messageNumber: string;
  metadata: [];
  quotedMsgBody: string;
  quotedMsgId: string;
  quotedMsgType: string;
  self: number;
  senderName: number;
  time: number;
  type: string;
}

export interface DataChatClient {
  lastMessageNumber: number;
  messages: GetMsgWhatsApp[]
}

/************** Datos del Chat **************/

export interface MsgWhastapp {
  phone: string;
  body?: string;
}

export interface MsgFileWhastapp {
  indicativo: string,
  filename: string,
  body?: Base64['base'] | string,
}


export interface Metadata {
  admins: any[];
  isGroup: boolean;
  participants: any[];
  groupInviteLink?: any;
  participantsInfo: any[];
}

export interface AllChatsWht {
  id: string;
  name: string;
  image: string;
  metadata: Metadata;
  last_time: number;
}
