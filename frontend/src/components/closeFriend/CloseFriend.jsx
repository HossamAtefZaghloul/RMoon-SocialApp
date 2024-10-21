import "./closeFriend.css";

export default function CloseFriend({ profilePicture, username }) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={profilePicture} alt="" />
      <span className="sidebarFriendName">{username}</span>
    </li>
  );
}
