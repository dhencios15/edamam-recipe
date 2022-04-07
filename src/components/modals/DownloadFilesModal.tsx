import { Button, Group } from "@mantine/core";
import React from "react";
import { CSVLink } from "react-csv";
import { FileCode2, FileText } from "tabler-icons-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { DigestEnty, Recipe } from "@utils/types";
import { ContextModalProps } from "@mantine/modals";
import { toSlug } from "@utils/formatter";
import { PDFDoc } from "./PDFDoc";

export type DownloadProps = {
  recipe: Recipe & { digest: DigestEnty[] };
};

const headers = [
  { label: "Name", key: "name" },
  { label: "Ingredients", key: "ingredients" },
];

type CSVDataType = {
  name?: string;
  ingredients: string;
};

export const DownloadFilesModal = ({
  innerProps,
}: ContextModalProps<DownloadProps>) => {
  const { recipe } = innerProps;

  const csvData = React.useMemo(() => {
    const toDownloadData = recipe.ingredientLines?.reduce<CSVDataType[]>(
      (acc, cum, idx) => {
        idx === 0
          ? acc.push({ name: recipe.label, ingredients: cum })
          : acc.push({ name: "", ingredients: cum });

        return acc;
      },
      []
    );
    return toDownloadData || [];
  }, [recipe]);

  return (
    <Group position='center'>
      <CSVLink
        style={{ color: "white", textDecoration: "none" }}
        data={csvData}
        headers={headers}
        filename={`${toSlug(recipe.label)}.csv`}
      >
        <Button color='green' leftIcon={<FileCode2 />}>
          Download CSV
        </Button>
      </CSVLink>

      {recipe && (
        <Button leftIcon={<FileText />}>
          <PDFDownloadLink
            style={{ color: "white", textDecoration: "none" }}
            document={<PDFDoc recipe={recipe} />}
            fileName={`${toSlug(recipe.label)}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </Button>
      )}
    </Group>
  );
};
