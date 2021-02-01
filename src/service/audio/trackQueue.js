const createTrack = (post) => ({
  id: post._id,
  url: post.audio_key,
  title: post.caption,
  artist: post.user.username
});

export { createTrack };