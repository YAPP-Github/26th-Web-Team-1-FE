"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        toast.success("로그아웃이 완료되었어요.");
        router.replace("/");
      },
      onError: error => {
        toast.error("로그아웃에 실패했어요. 다시 시도해주세요.");
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
              <AlertModal.Root>
                <AlertModal.Trigger asChild>
                  <button type='button' className={styles.menuItem}>
                    로그아웃
                  </button>
                </AlertModal.Trigger>
                <AlertModal.Content>
                  <AlertModal.Header>
                    <AlertModal.Title>로그아웃하시나요?</AlertModal.Title>
                  </AlertModal.Header>
                  <AlertModal.Footer>
                    <AlertModal.Cancel asChild>
                      <Button
                        variant='assistive'
                        size='large'
                        className={styles.modalButton}
                        style={{ borderRadius: "0 0 0 1.2rem" }}
                        onClick={() =>
                          toast.error(
                            "로그아웃에 실패했어요. 다시 시도해주세요."
                          )
                        }
                      >
                        취소
                      </Button>
                    </AlertModal.Cancel>
                    <AlertModal.Action asChild>
                      <Button
                        variant='primary'
                        size='large'
                        onClick={handleLogout}
                        className={styles.modalButton}
                        style={{ borderRadius: "0 0 1.2rem" }}
                      >
                        확인
                      </Button>
                    </AlertModal.Action>
                  </AlertModal.Footer>
                </AlertModal.Content>
              </AlertModal.Root>
            )}
          </li>
        ))}
      </VStack>
    </>
  );
};
