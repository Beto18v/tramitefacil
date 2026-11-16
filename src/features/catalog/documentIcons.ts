import {
  Award,
  Briefcase,
  Building2,
  CalendarClock,
  Car,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  Handshake,
  Home,
  Key,
  KeyRound,
  Receipt,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  UserMinus,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Briefcase,
  Building2,
  CalendarClock,
  Car,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  Handshake,
  Home,
  Key,
  KeyRound,
  Receipt,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  UserMinus,
};

export const resolveIcon = (iconName?: string): LucideIcon => {
  if (iconName && iconName in ICON_MAP) {
    return ICON_MAP[iconName];
  }
  return FileText;
};
