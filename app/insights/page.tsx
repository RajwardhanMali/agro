"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
}

export default function InsightsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsPage, setNewsPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        setLoading(true);

        // Fetch agriculture-related news
        const newsResponse = await fetch(
          `https://newsapi.org/v2/everything?q=india+crops+agriculture&page=${newsPage}&pageSize=6&apiKey=ecde43627fec4eb98a64d6aae96b697e`
        );
        const newsData = await newsResponse.json();
        if (newsData.articles.length === 0) {
          setHasMoreNews(false);
        } else {
          setNews((prevNews) => {
            const newArticles = newsData.articles.filter(
              (article: { url: string }) =>
                !prevNews.some((prevArticle) => prevArticle.url === article.url)
            );
            return [...prevNews, ...newArticles];
          });
        }

        // Fetch trending YouTube videos on agriculture (only on the first load)
        if (newsPage === 1) {
          const youtubeResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=india+agriculture+news&type=video&maxResults=6&key=AIzaSyAb_B8OusCFdlv95SZhpSaFWesTCEtWKy8`
          );
          const youtubeData = await youtubeResponse.json();
          setVideos(youtubeData.items || []);
        }
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, [newsPage]);

  const loadMoreNews = () => {
    setNewsPage((prevPage) => prevPage + 1);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agriculture Insights</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest news and trends in agriculture.
          </p>
        </div>
        {loading && newsPage === 1 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-12">
            {/* News Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.map((article, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <img
                        src={article.urlToImage || "/placeholder.jpg"}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {article.description}
                      </p>
                      <Button size="sm" asChild>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {hasMoreNews && (
                <div className="flex justify-center mt-6">
                  <Button onClick={loadMoreNews} disabled={loading}>
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </div>

            {/* YouTube Videos Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Trending Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {video.snippet.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {video.snippet.channelTitle}
                      </p>
                      <Button size="sm" asChild>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch Video
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
