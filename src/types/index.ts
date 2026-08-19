export type Language = 'th' | 'en' | 'zh';

export interface GableSymbol {
  id: string;
  name_th: string;
  name_en: string;
  name_zh?: string;
  badge_th: string;
  badge_en: string;
  badge_zh?: string;
  short_desc_th: string;
  short_desc_en: string;
  short_desc_zh?: string;
  desc_th: string;
  desc_en: string;
  desc_zh?: string;
  meaning_th: string;
  meaning_en: string;
  meaning_zh?: string;
  hotspot: {
    x: number;
    y: number;
  };
  desktop: {
    originX: number;
    originY: number;
    scale: number;
  };
  mobile: {
    top: number;
    left: number;
    size: number;
    scale: number;
  };
}

export interface ArchivePhoto {
  id: number;
  category: 'diplomacy' | 'school' | 'sports' | 'community';
  src: string;
  tag_th: string;
  tag_en: string;
  tag_zh?: string;
  title_th: string;
  title_en: string;
  title_zh?: string;
  caption_th: string;
  caption_en: string;
  caption_zh?: string;
}

export interface EventItem {
  id: string;
  category: 'workshop' | 'exhibition' | 'market' | 'talk';
  image: string;
  tag_th: string;
  tag_en: string;
  tag_zh?: string;
  day_th: string;
  month_th: string;
  day_en: string;
  month_en: string;
  day_zh?: string;
  month_zh?: string;
  title_th: string;
  title_en: string;
  title_zh?: string;
  snippet_th: string;
  snippet_en: string;
  snippet_zh?: string;
  loc_th: string;
  loc_en: string;
  loc_zh?: string;
  time_th: string;
  time_en: string;
  time_zh?: string;
  cap_th: string;
  cap_en: string;
  cap_zh?: string;
  price_th: string;
  price_en: string;
  price_zh?: string;
  isFree?: boolean;
  btnType: 'register' | 'details' | 'shops' | 'reserve' | 'tea_simulator';
  detailed_desc_th?: string;
  detailed_desc_en?: string;
  detailed_desc_zh?: string;
  highlights_th?: string[];
  highlights_en?: string[];
  highlights_zh?: string[];
  schedule_th?: { time: string; activity: string }[];
  schedule_en?: { time: string; activity: string }[];
  schedule_zh?: { time: string; activity: string }[];
  instructor_th?: string;
  instructor_en?: string;
  instructor_zh?: string;
}

export interface CommunityIdea {
  id: number;
  category_th: string;
  category_en: string;
  category_zh?: string;
  title_th: string;
  title_en: string;
  title_zh?: string;
  desc_th: string;
  desc_en: string;
  desc_zh?: string;
  author_th: string;
  author_en: string;
  author_zh?: string;
  date_th: string;
  date_en: string;
  date_zh?: string;
  votes: number;
  hasVoted?: boolean;
}

export interface SpaceZone {
  key: string;
  badge_th: string;
  badge_en: string;
  badge_zh?: string;
  title_th: string;
  title_en: string;
  title_zh?: string;
  desc_th: string;
  desc_en: string;
  desc_zh?: string;
  area_th: string;
  area_en: string;
  area_zh?: string;
  cap_th: string;
  cap_en: string;
  cap_zh?: string;
  equip_th: string;
  equip_en: string;
  equip_zh?: string;
  vent_th: string;
  vent_en: string;
  vent_zh?: string;
}

export type UserRole = 'superadmin' | 'officer' | 'staff' | 'member';
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface SystemUser {
  id: string;
  username: string;
  password: string;
  full_name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  email?: string;
  department?: string;
  created_at: string;
  last_login?: string | null;
  notes?: string;
}

export type AuditActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'AUTH' | 'RESET';

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO 8601 string
  user_id: string;
  username: string;
  full_name: string;
  role: UserRole;
  action_type: AuditActionType;
  module: 'site_copy' | 'gables' | 'timeline' | 'archive' | 'events' | 'users' | 'bookings' | 'ideas' | 'system';
  module_name_th: string;
  description: string;
  details?: string;
}
