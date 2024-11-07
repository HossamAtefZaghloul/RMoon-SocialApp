import { Post } from '../models/Posts.js';
import { Friends } from '../models/Friends.js';

export const get_user_posts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const  profilepage  = req.params.profilepage;
    // console.log("asdasdadasdasdasv")
    // console.log(profilepage)


    const friends = await Friends.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: 'accepted',
    });

    const friendIds = friends.map(friend => 
      friend.requester.toString() === userId ? friend.recipient : friend.requester
    );

    // Combine the userId with friendIds
    const userAndFriendIds = [userId, ...friendIds];

    let posts;
    if (profilepage == 'true') {[]
      posts = await Post.find({ user: userId })
        .select('-user') // Exclude the user field from the results
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find({ user: { $in: userAndFriendIds } })
        .populate('user', 'username image')
        .sort({ createdAt: -1 });
    }

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user and friends' });
    }

    return res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: err.message });
  }
};
