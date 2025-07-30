import Bapurit from "@/assets/logo/symbol.svg";
import NotificationIcon from "@/assets/notification.svg";
import { HStack } from "@/components/ui/Stack";

import * as styles from "./AddStoryAvatar.css";

export type AddStoryAvatarProps = {
  onClick?: () => void;
  className?: string;
};

export const AddStoryAvatar = ({ onClick, className }: AddStoryAvatarProps) => {
  return (
    <div
      className={`${styles.addStoryContainer} ${className || ""}`}
      onClick={onClick}
    >
      <div className={styles.backgroundCircle}>
        <HStack
          justify='center'
          align='center'
          className={styles.logoContainer}
        >
          <Bapurit width={70} height={70} />
        </HStack>

        <HStack justify='center' align='center' className={styles.addButton}>
          <NotificationIcon
            width={11}
            height={11}
            className={styles.plusIcon}
          />
        </HStack>
      </div>
    </div>
  );
};
