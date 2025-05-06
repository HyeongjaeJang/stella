export type Information = {
  name: string;
  birth_date: string;
  birth_time: string;
  gender: string;
  city_country: string;
};

export type userData = {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  birth_time: string;
  gender: string;
  city_country: string;
};

export type Zinfo = {
  name: string;
  birth_date: string | undefined;
  birth_time: string | undefined;
  gender: string | null;
  city: string | null;
  z_sign: string | null;
};

export type ZodiacGeneratedData = {
  today: {
    number: number;
    color: string;
    item: string;
    text: string;
    total_score: number;
  };
  finance: { income: number; expense: number; invest: number; text: string };
  health: { state: string; activity: string; warning: string; text: string };
  work: {
    productivity: string;
    creativity: string;
    challenge: string;
    text: string;
  };
  relationship: {
    love: string;
    work: string;
    friend: string;
    family: string;
    text: string;
  };
  mood: { mood: string; energy: string; stress: string; text: string };
};

export type ZodiaWeeklyWorkType = {
  summary: string;
  total_score: number;
  productivity: number;
  creativity: number;
  challenge: number;
  energy: number;
  days_analysis: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
  advice: string;
};

export type ZodiacWeeklyPeopleType = {
  summary: string;
  total_score: number;
  love: number;
  friendship: number;
  family: number;
  work: number;
  days_analysis: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
  advice: string;
};

export type ZodiacWeeklyFinanceType = {
  summary: string;
  total_score: number;
  income: number;
  expense: number;
  invest: number;
  days_analysis: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
  advice: string;
};

export type ZodiacWeeklyHealthType = {
  summary: string;
  total_score: number;
  state: number;
  activity: number;
  warning: number;
  days_analysis: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
  advice: string;
};

export type ZodiacWeeklyMoodType = {
  summary: string;
  total_score: number;
  mood: number;
  energy: number;
  stress: number;
  days_analysis: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
  advice: string;
};

export type PropsUser = {
  id: string;
  name: string;
  email: string;
  z_sign: string | null;
};

export type Info = {
  id: number;
  name: string;
  email: string;
  birth_date: Date | null;
  birth_time: Date | null;
  gender: string | null;
  city_country: string | null;
  z_sign: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
