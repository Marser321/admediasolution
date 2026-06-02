export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  feedbackText: string;
  rating?: number;
  btlConcept?: string; // Concepto Below The Line asociado
}

export interface FeatureItem {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string; // Puede ser "$500/mes" o "$1500 pago único"
  description?: string;
  features: FeatureItem[];
  isPopular?: boolean;
  highlightText?: string; // Ej. "Más Popular", "Consultoría Premium"
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon?: string;
  plans: PricingPlan[];
  nichos?: string[]; // Nichos específicos
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Dirección' | 'Marketing' | 'Comercial' | 'Desarrollo' | 'Producción';
  bio: string;
  photoUrl: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  videoUrl?: string;
  date?: string;
  description?: string;
}
