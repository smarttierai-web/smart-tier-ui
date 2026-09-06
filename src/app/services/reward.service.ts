import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';

export interface Reward {
  id?: string;
  tier: number;
  title: string;
  type: 'image' | 'icon';
  image?: string;
  iconBg?: string;
  iconSvg?: string;
  badge?: string;
  description?: string;
  category?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private authService = inject(AuthService);

  rewards = signal<Reward[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private defaultRewards: Reward[] = [
    // Tier 2500
    {
      tier: 2500,
      title: 'Gourmet Chocolate Box',
      type: 'icon',
      iconBg: '#FEF3C7',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>',
      badge: 'Curated',
      category: 'Food & Dining'
    },
    {
      tier: 2500,
      title: 'Book Store Gift Card',
      type: 'icon',
      iconBg: '#EFF6FF',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>',
      badge: 'Curated',
      category: 'Lifestyle'
    },
    {
      tier: 2500,
      title: 'Artisan Coffee Roasters Bag',
      type: 'icon',
      iconBg: '#FEF2F2',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>',
      badge: 'Curated',
      category: 'Food & Dining'
    },
    {
      tier: 2500,
      title: 'Movie Nights Duo Pass',
      type: 'icon',
      iconBg: '#F3E8FF',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>',
      badge: 'Popular',
      category: 'Entertainment'
    },

    // Tier 5000
    {
      tier: 5000,
      title: 'Amazon / Flipkart Voucher',
      type: 'icon',
      iconBg: '#EEF2FF',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>',
      badge: 'Most Claimed',
      category: 'Shopping'
    },
    {
      tier: 5000,
      title: 'Premium Coffee Machine Set',
      type: 'icon',
      iconBg: '#ECFDF5',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></svg>',
      badge: 'Curated',
      category: 'Appliances'
    },
    {
      tier: 5000,
      title: 'Luxury Spa & Wellness Pass',
      type: 'icon',
      iconBg: '#FDF2F8',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" /><path d="M12 7v5l3 3" /></svg>',
      badge: 'Trending',
      category: 'Wellness'
    },
    {
      tier: 5000,
      title: 'Noise Cancelling Headphones',
      type: 'icon',
      iconBg: '#F0FDF4',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>',
      badge: 'Staff Pick',
      category: 'Electronics'
    },

    // Tier 10000
    {
      tier: 10000,
      title: 'Smart Watch Active Pro',
      type: 'icon',
      iconBg: '#EEF2FF',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="3" /><path d="M9 1h6" /><path d="M9 23h6" /></svg>',
      badge: 'Curated',
      category: 'Gadgets'
    },
    {
      tier: 10000,
      title: 'Weekend Getaway Experience',
      type: 'icon',
      iconBg: '#FEF3C7',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>',
      badge: 'Premium',
      category: 'Travel'
    },
    {
      tier: 10000,
      title: 'Smart Home Speaker Hub',
      type: 'icon',
      iconBg: '#ECFDF5',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></svg>',
      badge: 'Curated',
      category: 'Smart Home'
    },
    {
      tier: 10000,
      title: 'Fine Dining 5-Course Voucher',
      type: 'icon',
      iconBg: '#FDF2F8',
      iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /></svg>',
      badge: 'Curated',
      category: 'Fine Dining'
    }
  ];

  async loadRewards(): Promise<Reward[]> {
    this.isLoading.set(true);
    this.error.set(null);

    const client = this.authService.getClient();

    if (!client) {
      this.rewards.set(this.defaultRewards);
      this.isLoading.set(false);
      return this.defaultRewards;
    }

    try {
      const { data, error } = await client
        .from('rewards')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.warn('Supabase rewards query note:', error.message);
        this.rewards.set(this.defaultRewards);
        return this.defaultRewards;
      }

      if (data && data.length > 0) {
        const mapped: Reward[] = data.map((item: any) => ({
          id: item.id,
          tier: item.tier,
          title: item.title,
          type: item.type || 'icon',
          image: item.image,
          iconBg: item.icon_bg || '#EEF2FF',
          iconSvg: item.icon_svg,
          description: item.description || '',
          badge: item.badge || 'Curated',
          category: item.category || 'General',
          created_at: item.created_at
        }));
        this.rewards.set(mapped);
        return mapped;
      } else {
        this.rewards.set(this.defaultRewards);
        return this.defaultRewards;
      }
    } catch (err: any) {
      console.error('Error fetching rewards from Supabase:', err);
      this.rewards.set(this.defaultRewards);
      return this.defaultRewards;
    } finally {
      this.isLoading.set(false);
    }
  }

  getRewardsForTier(tier: number): Reward[] {
    const list = this.rewards().filter(r => r.tier === tier);
    if (list.length > 0) return list;
    return this.defaultRewards.filter(r => r.tier === tier);
  }

  async addReward(reward: Omit<Reward, 'id'>): Promise<Reward> {
    const client = this.authService.getClient();
    const newReward: Reward = { ...reward };

    if (!client) {
      this.rewards.update(list => [...list, newReward]);
      return newReward;
    }

    try {
      const { data, error } = await client
        .from('rewards')
        .insert([{
          tier: reward.tier,
          title: reward.title,
          type: reward.type,
          image: reward.image,
          icon_bg: reward.iconBg,
          icon_svg: reward.iconSvg,
          description: reward.description,
          badge: reward.badge,
          category: reward.category
        }])
        .select()
        .single();

      if (!error && data) {
        const inserted: Reward = {
          id: data.id,
          tier: data.tier,
          title: data.title,
          type: data.type,
          image: data.image,
          iconBg: data.icon_bg,
          iconSvg: data.icon_svg,
          description: data.description,
          badge: data.badge,
          category: data.category,
          created_at: data.created_at
        };
        this.rewards.update(list => [...list, inserted]);
        return inserted;
      }
    } catch (e) {
      console.error('Error inserting reward:', e);
    }

    this.rewards.update(list => [...list, newReward]);
    return newReward;
  }
}
