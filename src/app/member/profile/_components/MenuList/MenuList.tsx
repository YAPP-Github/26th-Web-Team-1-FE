"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useDeleteSessionMutation } from "@/app/(auth)/_api/auth/auth.queries";
import { AlertModal } from "@/components/ui/AlertModal";
import { Button } from "@/components/ui/Button";
import { VStack } from "@/components/ui/Stack";

import { MENU_LIST } from "../../_constants";
import * as styles from "./MenuList.css";

export const MenuList = () => {
  const router = useRouter();
  const { mutate: logout } = useDeleteSessionMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // TODO: Toast 띄우기
        router.replace("/");
      },
      onError: error => {
        // TODO: Toast 띄우기
        console.error("로그아웃 실패", error);
      },
    });
  };

  return (
    <>
      <VStack as='ul' gap={8} className={styles.wrapper}>
        {MENU_LIST.map(menu => (
          <li key={menu.id} className={styles.list}>
            {menu.type === "link" ? (
              <Link href={menu.link} className={styles.menuItem}>
                {menu.label}
              </Link>
            ) : (
              <AlertModal
                title='로그아웃하시나요?'
                trigger={
                  <button type='button' className={styles.menuItem}>
                    로그아웃
                  </button>
                }
                footer={
                  <>
                    <AlertDialog.Cancel asChild>
                      <Button
                        variant='assistive'
                        size='large'
                        className={styles.modalButton}
                        style={{ borderRadius: "0 0 0 1.2rem" }}
                      >
                        취소
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <Button
                        variant='primary'
                        size='large'
                        onClick={handleLogout}
                        className={styles.modalButton}
                        style={{ borderRadius: "0 0 1.2rem" }}
                      >
                        확인
                      </Button>
                    </AlertDialog.Action>
                  </>
                }
              />
            )}
          </li>
        ))}
      </VStack>
    </>
  );
};
