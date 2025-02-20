export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId?: string;
  dmId?: string;
  senderName: string;
  timestamp: number;
  parentId?: string;
  hasReplies?: boolean;
  replyCount?: number;
  reactions?: Record<string, string[]>; // emoji -> array of userIds
}

export interface TypingUser {
  userId: string;
  username: string;
}

export interface WebSocketMessage {
  type: "message" | "typing" | "read" | "error" | "auth";
  id?: string;
  channelId: string;
  content?: string;
  timestamp?: number;
  senderId?: string;
  senderName?: string;
  error?: string;
  userId?: string;
  username?: string;
  token?: string;
  isDM?: boolean;
  parentId?: string;
}
