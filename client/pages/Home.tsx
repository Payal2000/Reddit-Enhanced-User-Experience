import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  Share, 
  Bookmark,
  Home as HomeIcon,
  Bell,
  User,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    subreddit: "r/technology",
    author: "u/techuser123",
    time: "2h ago",
    title: "New AI breakthrough shows promise for medical diagnosis",
    content: "AI-generated summary: Researchers have developed a new machine learning model that can diagnose rare diseases with 95% accuracy, potentially revolutionizing medical care in underserved areas.",
    upvotes: 2847,
    comments: 234,
    image: null,
  },
  {
    id: 2,
    subreddit: "r/programming",
    author: "u/developer_jane",
    time: "4h ago",
    title: "Why TypeScript is becoming essential for large-scale applications",
    content: "AI-generated summary: This post discusses the benefits of TypeScript in enterprise environments, including better code maintainability, fewer runtime errors, and improved developer experience.",
    upvotes: 1523,
    comments: 189,
    image: null,
  },
  {
    id: 3,
    subreddit: "r/science",
    author: "u/researcher_mike",
    time: "6h ago",
    title: "Climate change study reveals unexpected ecosystem adaptations",
    content: "AI-generated summary: New research shows that certain plant species are adapting to climate change faster than predicted, offering hope for ecosystem resilience.",
    upvotes: 4521,
    comments: 567,
    image: null,
  },
];

const pinnedSubreddits = [
  { name: "r/technology", members: "2.1M" },
  { name: "r/programming", members: "3.8M" },
  { name: "r/science", members: "28.9M" },
  { name: "r/askreddit", members: "42.1M" },
  { name: "r/worldnews", members: "31.2M" },
];

const trendingTopics = [
  "AI breakthrough",
  "Climate change",
  "Space exploration",
  "Electric vehicles",
  "Cryptocurrency",
];

const relatedCommunities = [
  { name: "r/MachineLearning", members: "2.1M", description: "Machine learning discussions and research" },
  { name: "r/ArtificialIntelligence", members: "856K", description: "AI news and discussions" },
  { name: "r/DataScience", members: "1.2M", description: "Data science community" },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden p-2 hover:bg-wireframe-surface-hover rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-reddit-orange flex items-center justify-center">
                  <span className="text-white font-bold text-sm">r</span>
                </div>
                <span className="font-bold text-lg text-wireframe-text-primary hidden sm:block">reddit</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wireframe-text-muted" />
                <Input 
                  placeholder="Search Reddit" 
                  className="pl-10 pr-12 bg-wireframe-surface-secondary border-wireframe-border"
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  asChild
                >
                  <Link to="/search">
                    <Filter className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className={`w-64 border-r border-wireframe-border bg-wireframe-surface-primary p-4 fixed left-0 top-14 h-full z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:top-0 md:transform-none md:block`}>
          {/* Pinned Subreddits */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-wireframe-text-secondary mb-3 uppercase tracking-wide">
              Pinned Communities
            </h3>
            <div className="space-y-1">
              {pinnedSubreddits.map((subreddit) => (
                <Link
                  key={subreddit.name}
                  to={`/r/${subreddit.name.slice(2)}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-wireframe-surface-hover text-wireframe-text-primary"
                >
                  <span className="text-sm">{subreddit.name}</span>
                  <span className="text-xs text-wireframe-text-muted">{subreddit.members}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <h3 className="text-sm font-semibold text-wireframe-text-secondary mb-3 uppercase tracking-wide flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </h3>
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(topic)}`}
                  className="block p-2 text-sm text-wireframe-text-primary hover:bg-wireframe-surface-hover rounded-md"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0 p-4">
          <div className="max-w-2xl">
            {/* Feed Header */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-wireframe-text-primary mb-2">Home Feed</h1>
              <div className="flex space-x-2">
                <Badge variant="default" className="bg-wireframe-text-primary text-white">Hot</Badge>
                <Badge variant="outline">New</Badge>
                <Badge variant="outline">Top</Badge>
                <Badge variant="outline">Rising</Badge>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border border-wireframe-border bg-wireframe-surface-primary">
                  <div className="flex">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center p-3 bg-wireframe-surface-secondary">
                      <Button variant="ghost" size="icon" className="h-8 w-8 mb-1">
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium text-wireframe-text-primary">
                        {formatNumber(post.upvotes)}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 mt-1">
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 p-4">
                      {/* Post Header */}
                      <div className="flex items-center text-sm text-wireframe-text-muted mb-2">
                        <Link to={`/r/${post.subreddit.slice(2)}`} className="font-medium hover:underline">
                          {post.subreddit}
                        </Link>
                        <span className="mx-1">•</span>
                        <span>Posted by</span>
                        <Link to={`/u/${post.author.slice(2)}`} className="ml-1 hover:underline">
                          {post.author}
                        </Link>
                        <span className="mx-1">•</span>
                        <span>{post.time}</span>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-lg font-medium text-wireframe-text-primary mb-3 leading-tight">
                        {post.title}
                      </h2>

                      {/* AI Summary */}
                      <div className="bg-wireframe-surface-secondary p-3 rounded-md mb-4 border-l-4 border-reddit-orange">
                        <div className="flex items-center mb-2">
                          <Badge variant="secondary" className="text-xs bg-reddit-orange text-white">
                            AI Summary
                          </Badge>
                        </div>
                        <p className="text-sm text-wireframe-text-secondary leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center space-x-4 text-wireframe-text-muted">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {formatNumber(post.comments)} Comments
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Bookmark className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden xl:block">
          <Card className="border border-wireframe-border bg-wireframe-surface-primary p-4">
            <h3 className="font-semibold text-wireframe-text-primary mb-4">Related Communities</h3>
            <div className="space-y-3">
              {relatedCommunities.map((community) => (
                <div key={community.name} className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      to={`/r/${community.name.slice(2)}`}
                      className="font-medium text-wireframe-text-primary hover:underline"
                    >
                      {community.name}
                    </Link>
                    <p className="text-xs text-wireframe-text-muted mt-1">{community.description}</p>
                    <p className="text-xs text-wireframe-text-muted">{community.members} members</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-2">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-wireframe-surface-primary border-t border-wireframe-border">
        <div className="flex items-center justify-around h-16">
          <Link to="/home" className="flex flex-col items-center p-2 text-wireframe-text-primary">
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center p-2 text-wireframe-text-muted">
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link to="/create" className="flex flex-col items-center p-2 text-wireframe-text-muted">
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Create</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center p-2 text-wireframe-text-muted">
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Notifications</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2 text-wireframe-text-muted">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
