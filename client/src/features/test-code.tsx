// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io

import React, { useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

interface IButtonProps {
  onClick: any;
}

function Button({ onClick }: IButtonProps): React.JSX.Element {
  return (
    <button type='button' onClick={onClick}>
      get random user
    </button>
  );
}

interface IUserInfoProps {
  user: any;
}

function UserInfo({ user }: IUserInfoProps): React.JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user?.name}</td>
          <td>{user?.phone}</td>
        </tr>
      </tbody>
    </table>
  );
}

function AppTest(): JSX.Element {
  const [item, setItem] = useState<Record<number, User> | null>(null);

  const receiveRandomUser = async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;

    const response = await fetch(`${URL}/${id}`, { method: "GET", cache: "force-cache" });
    console.log("response", response);

    const _user = (await response.json()) as User;
    console.log("_user", _user);
    setItem(_user);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    receiveRandomUser();
  };

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick} />

      <UserInfo user={item} />
    </div>
  );
}

export default AppTest;
