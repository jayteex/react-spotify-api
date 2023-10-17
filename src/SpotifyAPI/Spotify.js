const clientId = 'cfb333ab3e0a423ba2dcae33afbbb3ca';
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {

  //Fetching the access token 
 getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the access token after it expires
      setTimeout(() => {
        accessToken = '';
      }, expiresIn * 1000);

      // Remove the access token and expires_in from the URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect to Spotify authorization
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
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

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        return response.json();
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to create a new playlist.');
            }
            return response.json();
          })
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to add tracks to the playlist.');
                }
                return response.json();
              });
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


};



export default Spotify;



/*
//This version of the playlist function did not work. Above, I have replaced it with an updated version with error handling

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }


*/