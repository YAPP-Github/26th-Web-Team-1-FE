"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { storiesQueryOptions } from "@/app/story/_api";
import { Skeleton } from "@/shared/components/ui/Skeleton";

import * as styles from "./StoryList.css";

export const StoryList = () => {
  const router = useRouter();
  const { data: stories } = useSuspenseQuery(storiesQueryOptions(20));

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  return (
    <>
      {stories.stories.map(story => (
        <div
          key={story.storyId}
          className={styles.storyItem}
          onClick={() => handleStoryClick(story.storyId)}
        >
          <div className={styles.storyImageInner}>
            <Image
              src={story.images?.[0]?.url ?? ""}
              width={80}
              height={80}
              alt={`스토리 이미지 ${story.storyId}`}
              className={styles.storyImage}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export const StoryListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.storyItem}>
          <Skeleton width={80} height={80} radius={999} />
        </div>
      ))}
    </>
  );
};
