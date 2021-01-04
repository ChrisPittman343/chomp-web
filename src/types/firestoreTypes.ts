export interface Class {
  id: string;
  name: string;
  section: string;
  description: string;
  role: string;
  channels?: Channel[];
}
export interface Channel {
  id: string;
  name: string;
  messages?: Message[];
}

export interface Message {
  photoUrl: string;
  email: string;
  message: string;
  replies?: Message[];
}
