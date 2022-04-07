import React from "react";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Group,
  Popover,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { Check, ChevronDown, Search, Trash, X } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { isEmpty } from "lodash";

import { allergies, diets, meal_type } from "@utils/constant";
import { useAppDispatch } from "@redux-store/hooks";
import { setFilter, setSearch } from "./home.store/querySlice";
import { FilterTypes } from "@utils/types";

export const SearchRecipe = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const dispatch = useAppDispatch();

  const [search, setStateSearch] = React.useState("");
  const [opened, setOpened] = React.useState(false);
  const [selectedDiets, setSelectedDiets] = React.useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = React.useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = React.useState<string[]>([]);

  const selectedFilters = selectedDiets
    .concat(selectedHealth)
    .concat(selectedMealType);

  const onSearch = () => {
    if (search) {
      dispatch(setSearch(search));
    }
  };

  const onFilter = () => {
    let filters: FilterTypes = {
      diet: [],
      mealType: [],
      health: [],
    };

    if (!isEmpty(selectedFilters)) {
      filters.diet = selectedDiets;
      filters.mealType = selectedMealType;
      filters.health = selectedHealth;
    }

    dispatch(setFilter(filters));
    setOpened(false);
  };

  const onClearSearch = () => {
    // dispatch(setSearch(""));
    setStateSearch("");
  };

  const onClearFilters = (push: boolean = true) => {
    setSelectedDiets([]);
    setSelectedHealth([]);
    setSelectedMealType([]);
    push && dispatch(setFilter({ diet: [], health: [], mealType: [] }));
  };

  return (
    <Group position='center' direction='column' spacing={1}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextInput
          placeholder='Search Recipes'
          sx={(th) => ({
            width: 500,
            [th.fn.smallerThan("sm")]: {
              width: 250,
            },
          })}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          value={search}
          onChange={(e) => setStateSearch(e.target.value)}
          rightSection={
            search && (
              <ActionIcon onClick={onClearSearch}>
                <X size={14} />
              </ActionIcon>
            )
          }
        />
        <ActionIcon
          size='lg'
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          variant='filled'
          color='blue'
          onClick={onSearch}
        >
          <Search size={20} />
        </ActionIcon>
      </Box>
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
          <Group align='center' position='center' spacing={5}>
            <Group align='center' spacing='xs'>
              <Text weight={500} size='sm'>
                REFINE SEARCH BY
              </Text>
              <Group align='center' spacing={2}>
                {isEmpty(selectedFilters) ? (
                  <Text transform='capitalize' weight={700}>
                    Diet, Meal Type, Health
                  </Text>
                ) : (
                  <Text
                    sx={{ maxWidth: 150 }}
                    transform='capitalize'
                    lineClamp={1}
                    weight={700}
                  >
                    {selectedFilters.join(", ")}
                  </Text>
                )}
                <ActionIcon onMouseEnter={() => setOpened(true)}>
                  <ChevronDown color='green' size={18} />
                </ActionIcon>
              </Group>
            </Group>
            {!isEmpty(selectedFilters) && (
              <ActionIcon onClick={() => onClearFilters()} size='xs'>
                <X size={14} />
              </ActionIcon>
            )}
          </Group>
        }
      >
        <Group
        // cols={2}
        // breakpoints={[{ maxWidth: "md", cols: 1, spacing: "md" }]}
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
            label='Health'
            spacing='xs'
            value={selectedHealth}
            onChange={setSelectedHealth}
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
        </Group>
        <Space h='xl' />
        <Group position='apart' mt='xl'>
          <Button
            variant='outline'
            leftIcon={<Trash size={16} />}
            color='gray'
            size='xs'
            disabled={isEmpty(selectedFilters)}
            onClick={() => onClearFilters(false)}
          >
            CLEAR FILTER
          </Button>
          <Button
            leftIcon={<Check size={16} />}
            color='green'
            size='xs'
            onClick={onFilter}
          >
            DONE
          </Button>
        </Group>
      </Popover>
    </Group>
  );
};
