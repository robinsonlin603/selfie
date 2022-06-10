import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostCollection } from "../../../hooks/usePostCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";

// styels and images
import styles from "../css/Conversation.module.css";
import Smile from "../../../assets/smile.png";

// firebase
import { timestamp } from "../../../firebase/config";

// components
import Avatar from "../../../components/js/Avatar";

export default function Conversation() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: useChatroom } = usePostCollection("chatroom", id);
  const [sendMessage, setSendMessage] = useState("");
  const { updateDocument, response } = useFirestore("chatroom");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addMessage = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      message: sendMessage,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(id, {
      conversation: [...useChatroom[0].conversation, addMessage],
      createdAt: timestamp.fromDate(new Date()),
    });
    if (!response.error) {
      setSendMessage("");
    }
  };

  return (
    <div className={styles.chatroom}>
      {useChatroom.length > 0 && (
        <div className={styles.message}>
          {useChatroom[0].conversation.map((con) =>
            con.uid === user.uid ? (
              <div className={styles.currentuser} key={con.id}>
                <div className={styles.msg}>
                  <p>{con.message}</p>
                </div>
              </div>
            ) : (
              <div className={styles.partner} key={con.id}>
                <div className={styles.photo}>
                  <Avatar src={con.photoURL} />
                </div>
                <div className={styles.msg}>
                  <p>{con.message}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className={styles.sendmessage}>
        <form onSubmit={handleSubmit}>
          <div className={styles.photo}>
            <img src={Smile} alt="smile icon" />
          </div>
          <input
            type="text"
            placeholder="Message..."
            required
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
