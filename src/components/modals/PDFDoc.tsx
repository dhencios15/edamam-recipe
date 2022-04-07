import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { DownloadProps } from "./DownloadFilesModal";

export const PDFDoc = ({ recipe }: DownloadProps) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Eyarecipe by Edaman ~
        </Text>
        <Text style={styles.title}>{recipe?.label || ""}</Text>
        <Link src={recipe?.url || "/"} style={styles.author}>
          By {recipe?.source}
        </Link>
        <Text style={styles.text}>Ingredients</Text>
        <View style={{ flexDirection: "column" }}>
          {recipe?.ingredientLines?.map((ingredient, idx) => (
            <Text key={idx} style={styles.list}>
              - {ingredient}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    margin: 12,
    marginLeft: 0,
    fontSize: 18,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  list: {
    fontSize: 12,
    flexDirection: "column",
    marginBottom: 16,
  },
});
