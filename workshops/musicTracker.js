function flattenPlaylists(playlists) {
  if (!Array.isArray(playlists)) return [];
  const flat = [];
  playlists.forEach((list, pIndex) => {
    list.forEach((track, tIndex) => {
      flat.push({ ...track, source: [pIndex, tIndex] });
    });
  });
  return flat;
}

function scoreTracks(tracks) {
  return tracks.map(track => ({
    ...track,
    score: track.votes * 10 - Math.abs(track.bpm - 120)
  }));
}

function dedupeTracks(tracks) {
  const seen = new Set();
  return tracks.filter(track => {
    if (seen.has(track.trackId)) return false;
    seen.add(track.trackId);
    return true;
  });
}

function enforceArtistQuota(tracks, maxPerArtist) {
  const artistCounts = {};
  return tracks.filter(track => {
    // PART 1: Update the Tally
    artistCounts[track.artist] = (artistCounts[track.artist] || 0) + 1;
    // PART 2: Make the Decision
    return artistCounts[track.artist] <= maxPerArtist;
  });
}

function buildSchedule(tracks) {
  return tracks.map((track, index) => ({
    slot: index + 1,
    trackId: track.trackId
  }));
}

function remixPlaylist(playlists, maxPerArtist) {
  const flattened = flattenPlaylists(playlists);
  const scored = scoreTracks(flattened);
  const deduped = dedupeTracks(scored);
  const quotaEnforced = enforceArtistQuota(deduped, maxPerArtist);
  return buildSchedule(quotaEnforced);
}