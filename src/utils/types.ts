export type ImageSizeTypes = "THUMBNAIL" | "SMALL" | "REGULAR" | "LARGE";
export type ImageInfo = {
  url?: string;
  width?: number;
  height?: number;
};
export type Links = {
  self?: Link;
  next?: Link;
};
export type Link = {
  href?: string;
  title?: string;
};
export type Recipe = {
  label?: string;
  images?: Record<ImageSizeTypes, ImageInfo>;
  source?: string;
  url?: string;
  healthLabels?: string[];
  ingredientLines?: string[];
  ingredients?: string[];
  calories?: number;
  totalWeight?: number;
  totalTime?: number;
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  cautions?: string[];
  uri: string;
};

export type Paginate = {
  from?: number;
  to?: number;
  count?: number;
  _links?: Links;
};

export type Recipies = Paginate & { hits: { recipe: Recipe }[] };

export type Filters = "diet" | "mealType" | "health";
export type FilterTypes = Record<Filters, string[]>;
