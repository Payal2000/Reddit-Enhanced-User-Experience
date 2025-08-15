import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search as SearchIcon,
  Filter,
  ChevronLeft,
  ArrowUp,
  MessageCircle,
  Users,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const searchResults = {
  posts: [
    {
      id: 1,
      subreddit: "r/technology",
      author: "u/techuser123",
      time: "2h ago",
      title: "AI breakthrough in medical diagnosis shows 95% accuracy",
      snippet:
        "Researchers have developed a new machine learning model that can diagnose rare diseases with unprecedented accuracy...",
      upvotes: 2847,
      comments: 234,
    },
    {
      id: 2,
      subreddit: "r/science",
      author: "u/researcher_mike",
      time: "5h ago",
      title:
        "New AI algorithm predicts protein structures with remarkable precision",
      snippet:
        "Scientists at DeepMind have created an AI system that can predict how proteins fold, solving a 50-year-old problem...",
      upvotes: 4521,
      comments: 567,
    },
    {
      id: 3,
      subreddit: "r/MachineLearning",
      author: "u/ml_enthusiast",
      time: "1d ago",
      title: "GPT-4 vs Claude: A comprehensive comparison of AI capabilities",
      snippet:
        "This detailed analysis compares the latest language models across various benchmarks and real-world applications...",
      upvotes: 1892,
      comments: 156,
    },
  ],
  subreddits: [
    {
      name: "r/ArtificialIntelligence",
      members: "856K",
      description:
        "A subreddit dedicated to discussing artificial intelligence, machine learning, and related technologies.",
      joined: false,
    },
    {
      name: "r/MachineLearning",
      members: "2.1M",
      description:
        "Machine learning research papers, implementations, and discussions.",
      joined: true,
    },
    {
      name: "r/deeplearning",
      members: "425K",
      description:
        "Deep learning news, papers, and tutorials for researchers and practitioners.",
      joined: false,
    },
  ],
  users: [
    {
      username: "u/ai_researcher",
      karma: "125K",
      description: "PhD in AI, working on computer vision and NLP",
      avatar: null,
    },
    {
      username: "u/ml_expert",
      karma: "89K",
      description: "Machine learning engineer at tech company",
      avatar: null,
    },
    {
      username: "u/data_scientist",
      karma: "67K",
      description: "Data scientist passionate about AI ethics",
      avatar: null,
    },
  ],
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [engagementFilter, setEngagementFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("posts");

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-4 h-14">
            <Link
              to="/home"
              className="p-2 hover:bg-wireframe-surface-hover rounded-md"
            >
              <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wireframe-text-muted" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Reddit"
                  className="pl-10 bg-wireframe-surface-secondary border-wireframe-border"
                />
              </div>
            </div>

            <Button
              variant="default"
              className="bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
            >
              Search
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Search Info */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-wireframe-text-primary mb-2">
            Search results for "{query || "AI"}"
          </h1>
          <p className="text-wireframe-text-muted text-sm">
            Found{" "}
            {searchResults.posts.length +
              searchResults.subreddits.length +
              searchResults.users.length}{" "}
            results
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 p-4 border border-wireframe-border bg-wireframe-surface-primary">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-wireframe-text-muted" />
              <span className="text-wireframe-text-secondary font-medium">
                Filters:
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-wireframe-text-muted" />
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="day">Past 24 hours</SelectItem>
                  <SelectItem value="week">Past week</SelectItem>
                  <SelectItem value="month">Past month</SelectItem>
                  <SelectItem value="year">Past year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-wireframe-text-muted">Type:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-wireframe-text-muted" />
              <Select
                value={engagementFilter}
                onValueChange={setEngagementFilter}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All posts</SelectItem>
                  <SelectItem value="high">High engagement</SelectItem>
                  <SelectItem value="medium">Medium engagement</SelectItem>
                  <SelectItem value="low">Low engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-wireframe-surface-secondary">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Posts ({searchResults.posts.length})
            </TabsTrigger>
            <TabsTrigger
              value="subreddits"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Subreddits ({searchResults.subreddits.length})
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Users ({searchResults.users.length})
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            {searchResults.posts.map((post) => (
              <Card
                key={post.id}
                className="border border-wireframe-border bg-wireframe-surface-primary"
              >
                <div className="flex">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center p-3 bg-wireframe-surface-secondary">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mb-1"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium text-wireframe-text-primary">
                      {formatNumber(post.upvotes)}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 p-4">
                    {/* Post Header */}
                    <div className="flex items-center text-sm text-wireframe-text-muted mb-2">
                      <Link
                        to={`/r/${post.subreddit.slice(2)}`}
                        className="font-medium hover:underline"
                      >
                        {post.subreddit}
                      </Link>
                      <span className="mx-1">•</span>
                      <span>Posted by</span>
                      <Link
                        to={`/u/${post.author.slice(2)}`}
                        className="ml-1 hover:underline"
                      >
                        {post.author}
                      </Link>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-lg font-medium text-wireframe-text-primary mb-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Post Snippet */}
                    <p className="text-wireframe-text-secondary text-sm mb-3 leading-relaxed">
                      {post.snippet}
                    </p>

                    {/* Post Actions */}
                    <div className="flex items-center space-x-4 text-wireframe-text-muted text-sm">
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {formatNumber(post.comments)} comments
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Subreddits Tab */}
          <TabsContent value="subreddits" className="space-y-4">
            {searchResults.subreddits.map((subreddit) => (
              <Card
                key={subreddit.name}
                className="border border-wireframe-border bg-wireframe-surface-primary p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-wireframe-surface-secondary flex items-center justify-center">
                        <span className="text-wireframe-text-primary font-medium">
                          {subreddit.name.slice(2, 4).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/r/${subreddit.name.slice(2)}`}
                          className="font-semibold text-wireframe-text-primary hover:underline"
                        >
                          {subreddit.name}
                        </Link>
                        <div className="flex items-center text-sm text-wireframe-text-muted">
                          <Users className="w-4 h-4 mr-1" />
                          {subreddit.members} members
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-wireframe-text-secondary leading-relaxed">
                      {subreddit.description}
                    </p>
                  </div>
                  <Button
                    variant={subreddit.joined ? "secondary" : "default"}
                    size="sm"
                    className={
                      subreddit.joined
                        ? ""
                        : "bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
                    }
                  >
                    {subreddit.joined ? "Joined" : "Join"}
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            {searchResults.users.map((user) => (
              <Card
                key={user.username}
                className="border border-wireframe-border bg-wireframe-surface-primary p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-wireframe-surface-secondary">
                        {user.username.slice(2, 4).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        to={`/u/${user.username.slice(2)}`}
                        className="font-semibold text-wireframe-text-primary hover:underline"
                      >
                        {user.username}
                      </Link>
                      <div className="flex items-center text-sm text-wireframe-text-muted mb-2">
                        <span>{user.karma} karma</span>
                      </div>
                      <p className="text-sm text-wireframe-text-secondary">
                        {user.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
