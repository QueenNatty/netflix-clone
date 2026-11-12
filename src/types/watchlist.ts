export interface WatchlistItem {
  id: string;
  user_id: string;
  profile_id: string;
  movie_id: number;
  title: string;
  poster_path: string | null;
  created_at: string;
}