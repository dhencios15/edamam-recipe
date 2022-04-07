import { Grid, List, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { DigestEnty } from "@utils/types";
import { isEmpty } from "lodash";
import React from "react";

interface Props {
  digest: DigestEnty[];
}

export const RecipeNutritionFacts = ({ digest }: Props) => (
  <ScrollArea offsetScrollbars style={{ maxHeight: 800, overflowX: "hidden" }}>
    <Stack>
      <Title
        order={3}
        align='center'
        sx={(th) => ({
          color: th.colors.green[7],
        })}
      >
        NUTRITION FACTS
      </Title>
      <List spacing='sm' withPadding listStyleType='none'>
        {!isEmpty(digest) &&
          digest.map((facts, idx) => (
            <List.Item key={idx}>
              <Grid>
                <Grid.Col span={6}>
                  <Text size='md' weight={500}>
                    {facts.label}
                  </Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text size='sm'>{facts.total?.toFixed()}g</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text size='sm'>{facts.daily?.toFixed()}%</Text>
                </Grid.Col>
              </Grid>
              {!isEmpty(facts.sub) &&
                facts.sub?.map((fact, idx) => (
                  <List key={idx} withPadding spacing='xs' listStyleType='none'>
                    <Grid>
                      <Grid.Col span={6}>
                        <Text size='md'>{fact.label}</Text>
                      </Grid.Col>
                      <Grid.Col ml={-13} span={3}>
                        <Text size='sm'>{fact.total?.toFixed()}g</Text>
                      </Grid.Col>
                      <Grid.Col ml={7} span={3}>
                        <Text size='sm'>{fact.daily?.toFixed()}%</Text>
                      </Grid.Col>
                    </Grid>
                  </List>
                ))}
            </List.Item>
          ))}
      </List>
    </Stack>
  </ScrollArea>
);
