import { Badge, Flex } from '@chakra-ui/react';
import { getCategoryNames } from '../utils/event-utils';
import { colorPalette, radius, tag, transitions } from '../theme/theme';

export const CategoryTags = ({ categories, categoryIds }) => {
    const categoryNames = getCategoryNames(categoryIds, categories);

    if (categoryNames.length === 0) {
        return (
            <Badge
                bg={colorPalette.neutralSoft}
                borderColor={colorPalette.border}
                borderRadius={radius.pill}
                borderWidth="1px"
                transition={transitions.fast}
                color={colorPalette.textMuted}
                fontSize="xs"
                fontWeight="medium"
                px="2.5"
                py="1"
                _hover={{
                    bg: colorPalette.neutralSoftHover,
                    borderColor: colorPalette.primaryBorder,
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
                    {...tag}
                    borderRadius={radius.pill}
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
