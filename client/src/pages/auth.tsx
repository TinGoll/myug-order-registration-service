import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";

import AuthPage from "../blocks/auth-form/auth-page";

const IndexPage: React.FC<PageProps> = ({ uri }) => {
  return <AuthPage />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Массив-Юг: Вход в систему.</title>;
