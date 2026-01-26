interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyFollowers {
  href: string;
  total: number;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface ArtistResponse {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}
