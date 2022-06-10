import { Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useChatCollection } from "../../../hooks/useChatCollection";
import { usePostCollection } from "../../../hooks/usePostCollection";
import { useState } from "react";

// styles and images
import styles from "../css/Chat.module.css";
import Forum from "../../../assets/forum.svg";
import Send from "../../../assets/send.svg";

// components
import PostCard from "./PostCard";
import PostName from "./PostName";
import SwitchPostCard from "./SwitchPostCard";

export default function Chat() {
  const { user } = useAuthContext();
  const { id = "none" } = useParams();
  const { documents } = useChatCollection("chatroom", `members.${user.uid}`);
  const { documents: useChatroom } = usePostCollection("chatroom", id);
  const [changeChat, setChangeChat] = useState(false);

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
          {!changeChat && (
            <>
              <div className={styles.switchuser}>
                <li>
                  <p>{user.displayName}</p>
                </li>
                <li>
                  <img src={Forum} alt="forum icon" />
                </li>
              </div>
              <div className={styles.switchfriendlist}>
                {documents.map((document) => (
                  <SwitchPostCard
                    setChangeChat={setChangeChat}
                    key={document.id}
                    chatroomId={document.id}
                    changeChat={changeChat}
                    member={Object.keys(document.members).filter((m) => {
                      return m !== user.uid;
                    })}
                  />
                ))}
              </div>
            </>
          )}
          {useChatroom[0].id !== "none" && changeChat && (
            <>
              <div className={styles.switchfriend}>
                <PostName
                  setChangeChat={setChangeChat}
                  member={Object.keys(useChatroom[0].members).filter((m) => {
                    return m !== user.uid;
                  })}
                />
              </div>
              <div className={styles.switchuseroom}>
                <Outlet />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
