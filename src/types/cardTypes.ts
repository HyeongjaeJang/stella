export type Today = {
  color: string | null;
  id: number;
  item: string | null;
  text: string | null;
  number: number | null;
  total_score: number | null;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type Work = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  text: string | null;
  productivity: string | null;
  creativity: string | null;
  challenge: string | null;
};

export type People = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  text: string | null;
  love: string | null;
  work: string | null;
  family: string | null;
  friend: string | null;
};

export type Finance = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  income: number | null;
  expense: number | null;
  invest: number | null;
  text: string | null;
};

export type Health = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  state: string | null;
  activity: string | null;
  warning: string | null;
  text: string | null;
};

export type Mood = {
  id: number;
  user_id: number | null;
  created_at: Date | null;
  updated_at: Date | null;
  mood: string | null;
  energy: string | null;
  stress: string | null;
  text: string | null;
};
