import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/Layout";
import { Container } from "@mui/material";

type Props<T extends React.ElementType> = {
  component?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function MYComponent<T extends React.ElementType>({ component, children, ...props }: Props<T>): React.JSX.Element {
  const Component = component || "div";
  return <Component {...props}>{children}</Component>;
}

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return (
    <Layout headerSticky sx={{}}>
      <Container>
        Lorem ipsum dolor sit amet.
        <MYComponent  component="button" >Привет</MYComponent>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Форма заказа</title>;
