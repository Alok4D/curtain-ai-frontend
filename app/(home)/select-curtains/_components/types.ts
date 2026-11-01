export type TabType = "specialist" | "curtains" | "sheers" | "rollers" | "all";

export interface CurtainItem {
  id?: number;
  _id?: string;
  name: string;
  image_url: string;
  display_image_url: string;
  category?: string;
  material?: string;
}

