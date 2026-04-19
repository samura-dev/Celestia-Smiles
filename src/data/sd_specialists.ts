import doc1 from '../assets/hero-block-4/About _ Omni Sculpt MD 1.jpg';
import doc2 from '../assets/hero-block-4/About _ Omni Sculpt MD 2.jpg';
import doc3 from '../assets/hero-block-4/About _ Omni Sculpt MD 3.jpg';
import doc4 from '../assets/hero-block-4/About _ Omni Sculpt MD 4.jpg';
import sd_specialistsJson from './sd_specialists.json';

export type SdCategoryId =
  | 'therapy'
  | 'orthodontics'
  | 'implants'
  | 'surgery'
  | 'esthetics'
  | 'prosthetics'
  | 'hygiene'
  | 'children';

type SdImageKey = 'doc1' | 'doc2' | 'doc3' | 'doc4';

interface SdSpecialistJsonItem {
  id: number;
  role: string;
  name: string;
  description: string;
  imgKey: SdImageKey;
  experience?: string;
  education?: string[];
  specialization?: string[];
  categoryIds: SdCategoryId[];
}

export interface SdSpecialist {
  id: number;
  role: string;
  name: string;
  description: string;
  img: string;
  experience?: string;
  education?: string[];
  specialization?: string[];
  categoryIds: SdCategoryId[];
}

const sd_imagesByKey: Record<SdImageKey, string> = {
  doc1,
  doc2,
  doc3,
  doc4,
};

const sd_specialistsRaw = sd_specialistsJson as SdSpecialistJsonItem[];

export const sd_specialistsData: SdSpecialist[] = sd_specialistsRaw.map((item) => ({
  id: item.id,
  role: item.role,
  name: item.name,
  description: item.description,
  img: sd_imagesByKey[item.imgKey],
  experience: item.experience,
  education: item.education,
  specialization: item.specialization,
  categoryIds: item.categoryIds,
}));
