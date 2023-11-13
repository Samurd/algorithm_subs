type Subscription = {
  id: number;
  userId: number;
  subscriptionPlanId: number;
  frequency: string;
  isActive: boolean;
  renewsAt: string | null;
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  createAt: string;
  updatedAt: string;
  subscription: Subscription;
};


type SubscriptionPlan = {
  id: number;
  productId: null; // Cambia el tipo según el tipo real del productId
  variants: any[]; // Cambia el tipo según el tipo real de variants
  typeSubcription: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  hrefMonthly: string;
  hrefYearly: string;
  features: any[]; // Cambia el tipo según el tipo real de features
  mostPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserData = {
  UserData: User;
  SubscriptionPlan: SubscriptionPlan;
};