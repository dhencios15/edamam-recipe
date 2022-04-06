import { Badge, Breadcrumbs, createStyles } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "tabler-icons-react";

type LinkItem = {
  title: string;
  href: string;
};

interface Props {
  links: LinkItem[];
}

const useStyles = createStyles((th) => ({
  badge: {
    color: th.colors.gray[8],
    backgroundColor: th.colors.gray[2],

    ":hover": {
      cursor: "pointer",
    },
  },
}));

export const MainBreadcrumbs = ({ links }: Props) => {
  const { classes } = useStyles();

  const items = links.map((link, idx) => (
    <Link href={link.href} key={idx} passHref>
      <Badge size='sm' component='a' className={classes.badge}>
        {link.title}
      </Badge>
    </Link>
  ));

  return (
    <Breadcrumbs separator={<ChevronRight size={14} />}>{items}</Breadcrumbs>
  );
};
