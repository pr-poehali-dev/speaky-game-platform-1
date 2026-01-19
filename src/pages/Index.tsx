import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  title: string;
  price: number;
  platform: 'PC' | 'Mobile' | 'VR';
  genre: string;
  rating: number;
  image: string;
}

const mockGames: Game[] = [
  { id: 1, title: 'Cyberpunk 2077', price: 59.99, platform: 'PC', genre: 'RPG', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Cyberpunk+2077' },
  { id: 2, title: 'Half-Life: Alyx', price: 59.99, platform: 'VR', genre: 'Action', rating: 4.9, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Half-Life+Alyx' },
  { id: 3, title: 'Genshin Impact', price: 0, platform: 'Mobile', genre: 'RPG', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Genshin+Impact' },
  { id: 4, title: 'Elden Ring', price: 49.99, platform: 'PC', genre: 'RPG', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Elden+Ring' },
  { id: 5, title: 'Beat Saber', price: 29.99, platform: 'VR', genre: 'Rhythm', rating: 4.9, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Beat+Saber' },
  { id: 6, title: 'PUBG Mobile', price: 0, platform: 'Mobile', genre: 'Battle Royale', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=PUBG+Mobile' },
  { id: 7, title: 'Red Dead Redemption 2', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=RDR2' },
  { id: 8, title: 'Resident Evil 4 VR', price: 39.99, platform: 'VR', genre: 'Horror', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=RE4+VR' },
  { id: 9, title: 'Call of Duty Mobile', price: 0, platform: 'Mobile', genre: 'Shooter', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=COD+Mobile' },
  { id: 10, title: 'Baldur\'s Gate 3', price: 69.99, platform: 'PC', genre: 'RPG', rating: 4.9, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=BG3' },
  { id: 11, title: 'The Witcher 3', price: 39.99, platform: 'PC', genre: 'RPG', rating: 4.9, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=The+Witcher+3' },
  { id: 12, title: 'GTA V', price: 29.99, platform: 'PC', genre: 'Action', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=GTA+V' },
  { id: 13, title: 'Minecraft', price: 26.95, platform: 'PC', genre: 'Sandbox', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Minecraft' },
  { id: 14, title: 'Counter-Strike 2', price: 0, platform: 'PC', genre: 'Shooter', rating: 4.6, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=CS2' },
  { id: 15, title: 'Dota 2', price: 0, platform: 'PC', genre: 'MOBA', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Dota+2' },
  { id: 16, title: 'League of Legends', price: 0, platform: 'PC', genre: 'MOBA', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=LoL' },
  { id: 17, title: 'Valorant', price: 0, platform: 'PC', genre: 'Shooter', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Valorant' },
  { id: 18, title: 'Fortnite', price: 0, platform: 'PC', genre: 'Battle Royale', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Fortnite' },
  { id: 19, title: 'Apex Legends', price: 0, platform: 'PC', genre: 'Battle Royale', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Apex+Legends' },
  { id: 20, title: 'Overwatch 2', price: 0, platform: 'PC', genre: 'Shooter', rating: 4.2, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Overwatch+2' },
  { id: 21, title: 'Hogwarts Legacy', price: 59.99, platform: 'PC', genre: 'RPG', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Hogwarts+Legacy' },
  { id: 22, title: 'Starfield', price: 69.99, platform: 'PC', genre: 'RPG', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Starfield' },
  { id: 23, title: 'Palworld', price: 29.99, platform: 'PC', genre: 'Survival', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Palworld' },
  { id: 24, title: 'Lethal Company', price: 9.99, platform: 'PC', genre: 'Horror', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Lethal+Company' },
  { id: 25, title: 'Resident Evil 4 Remake', price: 59.99, platform: 'PC', genre: 'Horror', rating: 4.8, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=RE4+Remake' },
  { id: 26, title: 'Dark Souls III', price: 59.99, platform: 'PC', genre: 'RPG', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Dark+Souls+III' },
  { id: 27, title: 'Sekiro', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.8, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Sekiro' },
  { id: 28, title: 'Dying Light 2', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Dying+Light+2' },
  { id: 29, title: 'Far Cry 6', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Far+Cry+6' },
  { id: 30, title: 'Assassin\'s Creed Valhalla', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=AC+Valhalla' },
  { id: 31, title: 'God of War', price: 49.99, platform: 'PC', genre: 'Action', rating: 4.9, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=God+of+War' },
  { id: 32, title: 'Spider-Man Remastered', price: 59.99, platform: 'PC', genre: 'Action', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Spider-Man' },
  { id: 33, title: 'Horizon Zero Dawn', price: 49.99, platform: 'PC', genre: 'Action', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Horizon' },
  { id: 34, title: 'Death Stranding', price: 39.99, platform: 'PC', genre: 'Action', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Death+Stranding' },
  { id: 35, title: 'Control', price: 39.99, platform: 'PC', genre: 'Action', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Control' },
  { id: 36, title: 'Hades', price: 24.99, platform: 'PC', genre: 'Roguelike', rating: 4.9, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Hades' },
  { id: 37, title: 'Stardew Valley', price: 14.99, platform: 'PC', genre: 'Simulation', rating: 4.8, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Stardew+Valley' },
  { id: 38, title: 'Terraria', price: 9.99, platform: 'PC', genre: 'Sandbox', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Terraria' },
  { id: 39, title: 'Valheim', price: 19.99, platform: 'PC', genre: 'Survival', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Valheim' },
  { id: 40, title: 'Among Us', price: 4.99, platform: 'PC', genre: 'Party', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Among+Us' },
  { id: 41, title: 'Fall Guys', price: 0, platform: 'PC', genre: 'Party', rating: 4.2, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Fall+Guys' },
  { id: 42, title: 'Rocket League', price: 0, platform: 'PC', genre: 'Sports', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Rocket+League' },
  { id: 43, title: 'FIFA 24', price: 69.99, platform: 'PC', genre: 'Sports', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=FIFA+24' },
  { id: 44, title: 'NBA 2K24', price: 69.99, platform: 'PC', genre: 'Sports', rating: 4.2, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=NBA+2K24' },
  { id: 45, title: 'Rust', price: 39.99, platform: 'PC', genre: 'Survival', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Rust' },
  { id: 46, title: 'DayZ', price: 44.99, platform: 'PC', genre: 'Survival', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=DayZ' },
  { id: 47, title: 'ARK: Survival Evolved', price: 29.99, platform: 'PC', genre: 'Survival', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=ARK' },
  { id: 48, title: 'The Forest', price: 19.99, platform: 'PC', genre: 'Survival', rating: 4.6, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=The+Forest' },
  { id: 49, title: 'Sons of the Forest', price: 29.99, platform: 'PC', genre: 'Survival', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Sons+Forest' },
  { id: 50, title: 'Subnautica', price: 29.99, platform: 'PC', genre: 'Survival', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Subnautica' },
  { id: 51, title: 'Mobile Legends', price: 0, platform: 'Mobile', genre: 'MOBA', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Mobile+Legends' },
  { id: 52, title: 'Clash of Clans', price: 0, platform: 'Mobile', genre: 'Strategy', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Clash+Clans' },
  { id: 53, title: 'Clash Royale', price: 0, platform: 'Mobile', genre: 'Strategy', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Clash+Royale' },
  { id: 54, title: 'Brawl Stars', price: 0, platform: 'Mobile', genre: 'Action', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Brawl+Stars' },
  { id: 55, title: 'Candy Crush Saga', price: 0, platform: 'Mobile', genre: 'Puzzle', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Candy+Crush' },
  { id: 56, title: 'Subway Surfers', price: 0, platform: 'Mobile', genre: 'Arcade', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Subway+Surfers' },
  { id: 57, title: 'Temple Run', price: 0, platform: 'Mobile', genre: 'Arcade', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Temple+Run' },
  { id: 58, title: 'Roblox', price: 0, platform: 'Mobile', genre: 'Sandbox', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Roblox' },
  { id: 59, title: 'Minecraft PE', price: 6.99, platform: 'Mobile', genre: 'Sandbox', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Minecraft+PE' },
  { id: 60, title: 'Among Us Mobile', price: 0, platform: 'Mobile', genre: 'Party', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Among+Us' },
  { id: 61, title: 'Free Fire', price: 0, platform: 'Mobile', genre: 'Battle Royale', rating: 4.2, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Free+Fire' },
  { id: 62, title: 'Fortnite Mobile', price: 0, platform: 'Mobile', genre: 'Battle Royale', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Fortnite+Mobile' },
  { id: 63, title: 'Pokémon GO', price: 0, platform: 'Mobile', genre: 'AR', rating: 4.1, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Pokemon+GO' },
  { id: 64, title: 'Honkai: Star Rail', price: 0, platform: 'Mobile', genre: 'RPG', rating: 4.6, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Honkai+Star+Rail' },
  { id: 65, title: 'Diablo Immortal', price: 0, platform: 'Mobile', genre: 'RPG', rating: 4.2, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Diablo+Immortal' },
  { id: 66, title: 'Raid: Shadow Legends', price: 0, platform: 'Mobile', genre: 'RPG', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Raid' },
  { id: 67, title: 'AFK Arena', price: 0, platform: 'Mobile', genre: 'RPG', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=AFK+Arena' },
  { id: 68, title: 'Marvel Snap', price: 0, platform: 'Mobile', genre: 'Card', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Marvel+Snap' },
  { id: 69, title: 'Hearthstone', price: 0, platform: 'Mobile', genre: 'Card', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Hearthstone' },
  { id: 70, title: 'Yu-Gi-Oh! Master Duel', price: 0, platform: 'Mobile', genre: 'Card', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=YuGiOh' },
  { id: 71, title: 'Stumble Guys', price: 0, platform: 'Mobile', genre: 'Party', rating: 4.2, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Stumble+Guys' },
  { id: 72, title: 'Garena Speed Drifters', price: 0, platform: 'Mobile', genre: 'Racing', rating: 4.3, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Speed+Drifters' },
  { id: 73, title: 'Asphalt 9', price: 0, platform: 'Mobile', genre: 'Racing', rating: 4.5, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Asphalt+9' },
  { id: 74, title: 'Real Racing 3', price: 0, platform: 'Mobile', genre: 'Racing', rating: 4.4, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Real+Racing+3' },
  { id: 75, title: 'FIFA Mobile', price: 0, platform: 'Mobile', genre: 'Sports', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=FIFA+Mobile' },
  { id: 76, title: 'NBA 2K Mobile', price: 0, platform: 'Mobile', genre: 'Sports', rating: 4.2, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=NBA+2K+Mobile' },
  { id: 77, title: 'Madden NFL Mobile', price: 0, platform: 'Mobile', genre: 'Sports', rating: 4.1, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Madden+Mobile' },
  { id: 78, title: 'eFootball Mobile', price: 0, platform: 'Mobile', genre: 'Sports', rating: 4.0, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=eFootball' },
  { id: 79, title: 'Geometry Dash', price: 3.99, platform: 'Mobile', genre: 'Arcade', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Geometry+Dash' },
  { id: 80, title: 'Monument Valley', price: 3.99, platform: 'Mobile', genre: 'Puzzle', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Monument+Valley' },
  { id: 81, title: 'Boneworks', price: 29.99, platform: 'VR', genre: 'Action', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Boneworks' },
  { id: 82, title: 'Bonelab', price: 39.99, platform: 'VR', genre: 'Action', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Bonelab' },
  { id: 83, title: 'Superhot VR', price: 24.99, platform: 'VR', genre: 'Action', rating: 4.8, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Superhot+VR' },
  { id: 84, title: 'Pavlov VR', price: 24.99, platform: 'VR', genre: 'Shooter', rating: 4.6, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Pavlov+VR' },
  { id: 85, title: 'Into the Radius', price: 29.99, platform: 'VR', genre: 'Survival', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Into+Radius' },
  { id: 86, title: 'The Walking Dead: Saints & Sinners', price: 39.99, platform: 'VR', genre: 'Horror', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=TWD+VR' },
  { id: 87, title: 'Population: One', price: 29.99, platform: 'VR', genre: 'Battle Royale', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Population+One' },
  { id: 88, title: 'Contractors VR', price: 19.99, platform: 'VR', genre: 'Shooter', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Contractors+VR' },
  { id: 89, title: 'Blade & Sorcery', price: 19.99, platform: 'VR', genre: 'Action', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Blade+Sorcery' },
  { id: 90, title: 'No Man\'s Sky VR', price: 59.99, platform: 'VR', genre: 'Exploration', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=No+Mans+Sky+VR' },
  { id: 91, title: 'Moss', price: 29.99, platform: 'VR', genre: 'Adventure', rating: 4.8, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Moss' },
  { id: 92, title: 'Astro Bot Rescue Mission', price: 19.99, platform: 'VR', genre: 'Platformer', rating: 4.9, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Astro+Bot' },
  { id: 93, title: 'Synth Riders', price: 12.99, platform: 'VR', genre: 'Rhythm', rating: 4.6, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Synth+Riders' },
  { id: 94, title: 'Pistol Whip', price: 24.99, platform: 'VR', genre: 'Rhythm', rating: 4.7, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Pistol+Whip' },
  { id: 95, title: 'Arizona Sunshine', price: 39.99, platform: 'VR', genre: 'Shooter', rating: 4.4, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=Arizona+Sunshine' },
  { id: 96, title: 'The Room VR', price: 29.99, platform: 'VR', genre: 'Puzzle', rating: 4.8, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=The+Room+VR' },
  { id: 97, title: 'I Expect You To Die', price: 24.99, platform: 'VR', genre: 'Puzzle', rating: 4.7, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=I+Expect+Die' },
  { id: 98, title: 'Job Simulator', price: 19.99, platform: 'VR', genre: 'Simulation', rating: 4.5, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Job+Simulator' },
  { id: 99, title: 'VRChat', price: 0, platform: 'VR', genre: 'Social', rating: 4.3, image: 'https://via.placeholder.com/400x225/8B5CF6/FFFFFF?text=VRChat' },
  { id: 100, title: 'Rec Room', price: 0, platform: 'VR', genre: 'Social', rating: 4.2, image: 'https://via.placeholder.com/400x225/D946EF/FFFFFF?text=Rec+Room' },
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [library, setLibrary] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'PC' | 'Mobile' | 'VR'>('All');
  const [genreFilter, setGenreFilter] = useState('All');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const { toast } = useToast();

  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || game.platform === platformFilter;
    const matchesGenre = genreFilter === 'All' || game.genre === genreFilter;
    return matchesSearch && matchesPlatform && matchesGenre;
  });

  const genres = ['All', ...Array.from(new Set(mockGames.map(g => g.genre)))];
  const libraryGames = mockGames.filter(g => library.includes(g.id));

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    setUser({ name: name || email.split('@')[0], email, avatar: '' });
    setIsLoggedIn(true);
    setShowAuthDialog(false);
    toast({ title: isLogin ? 'Добро пожаловать!' : 'Аккаунт создан!', description: 'Вы успешно вошли в Speaky' });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    setUser({ ...user, name });
    setShowProfileDialog(false);
    toast({ title: 'Профиль обновлен', description: 'Изменения сохранены' });
  };

  const toggleLibrary = (gameId: number) => {
    setLibrary(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
    toast({ 
      title: library.includes(gameId) ? 'Удалено из библиотеки' : 'Добавлено в библиотеку',
      description: mockGames.find(g => g.id === gameId)?.title 
    });
  };

  const GameCard = ({ game }: { game: Game }) => (
    <Card className="group overflow-hidden border-muted bg-card hover:border-primary transition-all duration-300 hover:scale-105">
      <div className="aspect-video overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg">{game.title}</h3>
          <Badge variant="outline" className="shrink-0">{game.platform}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Gamepad2" size={16} />
          <span>{game.genre}</span>
          <Icon name="Star" size={16} className="ml-2 fill-primary text-primary" />
          <span>{game.rating}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary">
            {game.price === 0 ? 'Бесплатно' : `$${game.price}`}
          </span>
          <Button 
            size="sm"
            variant={library.includes(game.id) ? "secondary" : "default"}
            onClick={() => toggleLibrary(game.id)}
          >
            <Icon name={library.includes(game.id) ? "Check" : "Plus"} size={16} className="mr-1" />
            {library.includes(game.id) ? 'В библиотеке' : 'Добавить'}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Speaky
            </h1>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="font-medium">Магазин</Button>
              <Button variant="ghost" className="font-medium">Библиотека</Button>
              <Button variant="ghost" className="font-medium">Сообщество</Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="font-bold">{user.name[0]?.toUpperCase()}</span>
                    </div>
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактировать профиль</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="profile-name">Имя</Label>
                      <Input id="profile-name" name="name" defaultValue={user.name} required />
                    </div>
                    <div>
                      <Label htmlFor="profile-email">Email</Label>
                      <Input id="profile-email" value={user.email} disabled />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Button type="button" variant="destructive" onClick={() => {
                        setIsLoggedIn(false);
                        setLibrary([]);
                        setShowProfileDialog(false);
                        toast({ title: 'Выход выполнен' });
                      }}>
                        Выйти
                      </Button>
                      <Button type="submit">Сохранить</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                <DialogTrigger asChild>
                  <Button>Войти</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{isLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" name="name" placeholder="Ваше имя" />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="email@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="password">Пароль</Label>
                      <Input id="password" name="password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full">{isLogin ? 'Войти' : 'Создать аккаунт'}</Button>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="w-full" 
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="store" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="store">Магазин</TabsTrigger>
            <TabsTrigger value="library">
              Библиотека {library.length > 0 && `(${library.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Поиск игр..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Платформа</Label>
                  <div className="flex gap-2">
                    {(['All', 'PC', 'Mobile', 'VR'] as const).map(platform => (
                      <Button
                        key={platform}
                        size="sm"
                        variant={platformFilter === platform ? 'default' : 'outline'}
                        onClick={() => setPlatformFilter(platform)}
                      >
                        {platform === 'All' ? 'Все' : platform}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Жанр</Label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <Button
                        key={genre}
                        size="sm"
                        variant={genreFilter === genre ? 'default' : 'outline'}
                        onClick={() => setGenreFilter(genre)}
                      >
                        {genre === 'All' ? 'Все' : genre}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">Игры не найдены</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            {libraryGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {libraryGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="Library" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-2">Ваша библиотека пуста</p>
                <p className="text-sm text-muted-foreground">Добавьте игры из магазина</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}