const API_URL = 'http://localhost:3000/api';

interface Channel {
  id: string;
  name: string;
  is_dm: boolean;
  created_at: string;
}

interface CreateChannelData {
  name: string;
  is_dm?: boolean;
}

export async function getChannels(token: string): Promise<Channel[]> {
  const response = await fetch(`${API_URL}/channels/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch channels');
  }

  const channels = await response.json();
  return channels.filter((channel: Channel) => !channel.is_dm);
}

export async function getAllChannels(token: string): Promise<Channel[]> {
  const response = await fetch(`${API_URL}/channels`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch all channels');
  }

  const channels = await response.json();
  return channels.filter((channel: Channel) => !channel.is_dm);
}

export async function createChannel(token: string, data: CreateChannelData): Promise<Channel> {
  const response = await fetch(`${API_URL}/channels`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, is_dm: false })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create channel');
  }

  return response.json();
}

export async function joinChannel(token: string, channelId: string): Promise<void> {
  const response = await fetch(`${API_URL}/channels/${channelId}/join`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to join channel');
  }
}

export async function leaveChannel(token: string, channelId: string): Promise<void> {
  const response = await fetch(`${API_URL}/channels/${channelId}/leave`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to leave channel');
  }
} 