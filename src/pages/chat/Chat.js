import { Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useChatCollection } from "../../hooks/useChatCollection";
import { usePostCollection } from "../../hooks/usePostCollection";

// styles and images
import styles from "./Chat.module.css";
import Forum from "../../assets/forum.svg";
import Send from "../../assets/send.svg";

// components
import PostCard from "./PostCard";
import PostName from "./PostName";

export default function Chat() {
  const { user } = useAuthContext();
  const { id = "none" } = useParams();
  const { documents } = useChatCollection("chatroom", `members.${user.uid}`);
  const { documents: useChatroom } = usePostCollection("chatroom", id);

  return (
    <div className={styles.chatroom}>
      {documents && (
        <>
          <div className={styles.user}>
            <li>
              <p>{user.displayName}</p>
            </li>
            <li>
              <img src={Forum} alt="forum icon" />
            </li>
          </div>
          <div className={styles.friendlist}>
            {documents.map((document) => (
              <PostCard
                key={document.id}
                chatroomId={document.id}
                member={Object.keys(document.members).filter((m) => {
                  return m !== user.uid;
                })}
              />
            ))}
          </div>
          {useChatroom[0].id === "none" && (
            <div className={styles.only}>
              <img src={Send} alt="send icon" />
              <h2>Your Messages</h2>
              <p>Send private messages to a friend or group.</p>
            </div>
          )}
          {useChatroom[0].id !== "none" && (
            <>
              <div className={styles.friend}>
                <PostName
                  member={Object.keys(useChatroom[0].members).filter((m) => {
                    return m !== user.uid;
                  })}
                />
              </div>
              <div className={styles.useroom}>
                <Outlet />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
