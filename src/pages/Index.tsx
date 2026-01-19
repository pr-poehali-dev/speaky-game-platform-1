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
import { allGames, type Game } from '@/data/games';

const mockGames: Game[] = allGames;

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