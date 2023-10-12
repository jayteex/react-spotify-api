const Spotify = {
  accessToken: '',
  clientId: 'cfb333ab3e0a423ba2dcae33afbbb3ca',
  redirectUri: 'http://localhost:3000/',

  //Fetching the access token 
  async getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the access token after it expires
      setTimeout(() => {
        this.accessToken = '';
      }, expiresIn * 1000);

      // Remove the access token and expires_in from the URL
      window.history.pushState('Access Token', null, '/');

      return this.accessToken;
    } else {
      // Redirect to Spotify authorization
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`;
      window.location.href = authUrl;
    }
  },

  //Search function 
  async search(term) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.tracks) {
        return data.tracks.items.map((track) => ({
          id: track.id,
          artist: track.artists[0].name,
          name: track.name,
          src: track.album.images[0].url,
          album: track.album.name,
          uri: track.uri,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
      throw error; // Rethrow the error for further handling if needed
    }
  },
};

export default Spotify;



/*
const Spotify = {
  async search(term) {
    try {
      // You can replace 'YOUR_API_KEY' with your actual Spotify API key
      const apiKey = 'cfb333ab3e0a423ba2dcae33afbbb3ca';

      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.tracks) {
        return data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          src: track.album.images[0].url,
          album: track.album.name,
          uri: track.uri,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
      throw error; // Rethrow the error for further handling if needed
    }
  },
};

export default Spotify;

*/

/*
return (
	<div className="spotify-search">
		<h1>Spotify Track Search</h1>
		<div className="search-bar">
			<input
				type="text"
				placeholder="Enter a track name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
		<div className="search-results">
			{searchResults.map((track) => (
				<div key={track.id} className="track-info">
					<img
						src={track.album.images[0].url}
						alt={`${track.name} Album Cover`}
					/>
					<div className="track-details">
						<h3>{track.name}</h3>
						<p>Artist: {track.artists[0].name}</p>
						<p>Album: {track.album.name}</p>
						<p>Popularity: {track.popularity}</p>
						<p>Release Date: {track.album.release_date}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);
*/