import { useQuery } from "@tanstack/react-query";

import { memberQueryOptions } from "@/app/member/_api/member.queries";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import { useTagSelection } from "./_hooks";
import * as styles from "./TagStep.css";

export const TagStep = ({
  onNext,
  tags,
}: {
  onNext: (tags: string[]) => void;
  tags?: string[];
}) => {
  const { data: member } = useQuery(memberQueryOptions);

  const { selectedTags, selectTag, atmosphereTags, utilityTags } =
    useTagSelection({
      initialTags: tags,
    });

  return (
    <VStack justify='between' style={{ height: "100%" }}>
      <VStack>
        <Spacer size={32} />
        <VStack gap={12}>
          <Text as='h2' typo='title1Bd' color='text.normal'>
            {member?.nickname}님이
            <br />그 가게를 또 가고싶은 이유는?
          </Text>

          <Text as='p' typo='label1Md' color='text.alternative'>
            키워드는 선택사항이에요. 총 4개까지 선택 가능해요.
          </Text>
        </VStack>
        <Spacer size={44} />
        <VStack gap={8}>
          <HStack align='center' gap={4}>
            <Text as='h3' typo='body1Sb' color='text.normal'>
              분위기
            </Text>{" "}
            <Text typo='caption1Md' color='status.negative'>
              * 최대 2개 선택 가능
            </Text>
          </HStack>

          <HStack wrap='wrap' gap={"0.8rem 1.2rem"}>
            {atmosphereTags.map(tag => (
              <button
                key={tag.name}
                className={styles.chipButton({
                  selected: selectedTags.some(({ name }) => name === tag.name),
                })}
                onClick={() => {
                  selectTag(tag.name);
                }}
              >
                {tag.label}
              </button>
            ))}
          </HStack>
        </VStack>
        <Spacer size={44} />

        <VStack gap={8}>
          <HStack align='center' gap={4}>
            <Text as='h3' typo='body1Sb' color='text.normal'>
              실용도
            </Text>
            <Text typo='caption1Md' color='status.negative'>
              * 최대 2개 선택 가능
            </Text>
          </HStack>

          <HStack wrap='wrap' gap={"0.8rem 1.2rem"}>
            {utilityTags.map(tag => (
              <button
                key={tag.name}
                className={styles.chipButton({
                  selected: selectedTags.some(({ name }) => name === tag.name),
                })}
                onClick={() => {
                  selectTag(tag.name);
                }}
              >
                {tag.label}
              </button>
            ))}
          </HStack>
        </VStack>
      </VStack>

      <Button
        variant='primary'
        size='fullWidth'
        type='button'
        onClick={() => onNext(selectedTags.map(({ name }) => name))}
      >
        다음
      </Button>
    </VStack>
  );
};
