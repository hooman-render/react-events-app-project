import { Badge, Flex } from "@chakra-ui/react";
import { getCategoryNames } from "../utils/event-utils";
import { appColors, appRadii, appTagStyles, appTransitions } from "../theme/appTheme";

export const CategoryTags = ({ categories, categoryIds }) => {
  const categoryNames = getCategoryNames(categoryIds, categories);

  if (categoryNames.length === 0) {
    return (
      <Badge
        bg="rgba(158, 178, 181, 0.14)"
        borderColor={appColors.border}
        borderRadius={appRadii.pill}
        borderWidth="1px"
        transition={appTransitions.fast}
        color={appColors.textMuted}
        fontSize="xs"
        fontWeight="medium"
        px="2.5"
        py="1"
        _hover={{
          bg: "rgba(158, 178, 181, 0.18)",
          borderColor: "rgba(180, 255, 245, 0.22)",
        }}
      >
        Uncategorized
      </Badge>
    );
  }

  return (
    <Flex align="center" gap="2" wrap="wrap">
      {categoryNames.map((categoryName) => (
        <Badge
          key={categoryName}
          {...appTagStyles}
          borderRadius={appRadii.pill}
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="0.01em"
          px="3"
          py="1"
          whiteSpace="nowrap"
          textTransform="capitalize"
        >
          {categoryName}
        </Badge>
      ))}
    </Flex>
  );
};
