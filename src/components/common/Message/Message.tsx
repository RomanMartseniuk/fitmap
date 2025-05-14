import classNames from 'classnames';
import { Message as MessageType } from '../../../app/types/Message';
import styles from './Message.module.scss';

export const Message = ({ mess }: { mess: MessageType }) => {
   return (
      <div
         className={classNames(
            styles.message,
            { [styles.message_error]: mess.type === 'error' },
            { [styles.message_success]: mess.type === 'success' },
         )}
      >
         {mess.text}
      </div>
   );
};

export const MessagesWrapper = ({ messages }: { messages: MessageType[] }) => {
   return (
      <div className={styles.wrapper}>
         {messages.map((mess, index) => (
            <Message key={index} mess={mess} />
         ))}
      </div>
   );
};