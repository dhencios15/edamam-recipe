import React from "react";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Group,
  Popover,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { Check, ChevronDown, Search, X } from "tabler-icons-react";

import { allergies, diets, meal_type } from "@utils/constant";
import { isEmpty } from "lodash";
import { useMediaQuery } from "@mantine/hooks";

export const SearchRecipe = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [opened, setOpened] = React.useState(false);
  const [selectedDiets, setSelectedDiets] = React.useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = React.useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = React.useState<string[]>(
    []
  );

  const selectedFilters = selectedDiets
    .concat(selectedAllergies)
    .concat(selectedMealType);

  const clearFilters = () => {
    setSelectedDiets([]);
    setSelectedAllergies([]);
    setSelectedMealType([]);
  };

  return (
    <Group position='center' direction='column' spacing={1}>
      <TextInput
        placeholder='Search Recipes'
        rightSection={<Search size={20} />}
        sx={{ width: 400 }}
      />
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='center'
        trapFocus={false}
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton
        transition='pop-top-left'
        width={isMobile ? 300 : 600}
        target={
          <Group spacing={5}>
            <Group
              onMouseEnter={() => setOpened(true)}
              align='center'
              spacing='xs'
            >
              <Text weight={500} size='sm'>
                REFINE SEARCH BY
              </Text>
              <Group align='center' spacing={1}>
                <Text
                  sx={{ maxWidth: 150 }}
                  transform='capitalize'
                  lineClamp={1}
                  weight={700}
                >
                  {selectedFilters.join(", ")}
                </Text>
                <ChevronDown size={18} />
              </Group>
            </Group>
            {!isEmpty(selectedFilters) && (
              <ActionIcon onClick={clearFilters} size='xs'>
                <X size={14} />
              </ActionIcon>
            )}
          </Group>
        }
      >
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "md", cols: 1, spacing: "md" }]}
        >
          <CheckboxGroup
            color='green'
            orientation='horizontal'
            label='Diet'
            spacing='xs'
            value={selectedDiets}
            onChange={setSelectedDiets}
          >
            {diets.map((diet) => (
              <Checkbox
                key={diet.value}
                value={diet.value}
                label={diet.label}
              />
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            color='green'
            orientation='horizontal'
            label='Allergies'
            spacing='xs'
            value={selectedAllergies}
            onChange={setSelectedAllergies}
          >
            {allergies.map((allergy) => (
              <Checkbox
                key={allergy.value}
                value={allergy.value}
                label={allergy.label}
              />
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            color='green'
            orientation='horizontal'
            label='Meal type'
            spacing='xs'
            value={selectedMealType}
            onChange={setSelectedMealType}
          >
            {meal_type.map((meal) => (
              <Checkbox
                key={meal.value}
                value={meal.value}
                label={meal.label}
              />
            ))}
          </CheckboxGroup>
        </SimpleGrid>
        <Box mt='lg' sx={{ display: "flex" }}>
          <Button
            leftIcon={<Check size={16} />}
            sx={{ marginLeft: "auto" }}
            color='green'
            size='xs'
            onClick={() => setOpened(false)}
          >
            DONE
          </Button>
        </Box>
      </Popover>
    </Group>
  );
};
