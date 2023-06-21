// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io

import React, { memo, useCallback, useEffect, useRef, useState } from "react"

const URL = "https://jsonplaceholder.typicode.com/users"

type Company = {
  bs: string
  catchPhrase: string
  name: string
}

type User = {
  id: number
  email: string
  name: string
  phone: string
  username: string
  website: string
  company: Company
  address: any
}

interface IButtonProps {
  onClick: any
}

/////////////////////////////////////////////////////////////////////

function debounce<F extends (...args: any[]) => void>(f: F, ms: number) {
  let isCooldown = false
  return function (...args: Parameters<F>) {
    if (isCooldown) return
    f.apply(null, args)
    isCooldown = true
    setTimeout(() => (isCooldown = false), ms)
  }
}


const useThrottle = (
  callback: () => void,
  delay: number,
  dependencies: any[],
) => {
  // Для сохранения timeoutId
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current) // очищаем предыдущий.
    }
    // вызываем callback по истечению времени.
    timerRef.current = setTimeout(callback, delay)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, dependencies)
}

/**
 * Для кеширования, можно использовать стандартнный флаг - cache,
 * передав его в аргументе options функции fetch, но для примера
 * напишем свой класс для кеширования, на основании  коллекции Мap.
 */
class CustomCache extends Map<string, { timeout: number; data: any }> {
  // Зададим дефолтное время жизни кеша
  private defailtTimeout = 1000
  /**
   * Записываем кеш - данные
   */
  setData<T extends any>(key: string, data: T): void {
    const newCache: { timeout: number; data: T } = {
      timeout: Date.now() + this.defailtTimeout,
      data,
    }
    this.set(key, newCache)
  }
  /**
   * Получаем данные из кеша.
   */
  getData<T extends any = any>(
    key: string,
  ): { timeout: number; data: T } | null {
    return this.get(key) || null
  }
  /** Устанавливаем новое время жизни кеша. */
  setTimeout(timeout: number): this {
    this.defailtTimeout = timeout
    return this
  }
}

/////////////////////////////////////////////////////////////////////

// Создаем экземпляр класса, с временем жизни кеша 5 сек.
const customCache = new CustomCache().setTimeout(5000)

/**
 * Декомпозируем логику запроса данных в отдельную функцию,
 * для переиспользования или при необходимости изменить метод получения данных.
 * Так же, реализуем кеширование ответов.
 * @param url адрес запроса, типа {@link string}
 * @returns Promise с полезной нагрузкой, типа <T>
 */
function $api<T extends any = any>(url: string): Promise<T> {
  const cacheKey = `${url}`
  const cachedData = customCache.getData<T>(cacheKey)
  if (cachedData && cachedData?.timeout >= Date.now()) {
    console.log(`Use cache for <${url}>`)
    return Promise.resolve(cachedData?.data)
  }
  return fetch(url, { method: "GET" }).then((responce) => {
    if (!responce.ok) {
      throw new Error("Sorry something went wrong")
    }
    const data = responce.json()
    customCache.setData(cacheKey, data)
    return data
  })
}

interface IUserInfoProps {
  user: User | null
}

function Button({ onClick }: IButtonProps): React.JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      get random user
    </button>
  )
}

function UserInfo({ user }: IUserInfoProps) {
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
  )
}

// Передаем вторым аргументом функцию обратного вызова,
// для определения необходимости рендера компонента.
// В данном случае, если выводимые данные совпадают, рендер не целесообразен.
// (Решение в большей степени несет демонстративный характер, функция shallowEqual сработает идентично.)
const MemoizedUserInfo = memo(
  UserInfo,
  ({ user: prevUser }, { user: newUser }) => {
    return !(
      // Пишем свою логику любой сложности.
      (prevUser?.name !== newUser?.name || prevUser?.phone !== newUser?.phone)
    )
  },
)

function App(): JSX.Element {
  // Не увидел целесообразности использовать утилиту Record
  // поэтому в качестве дженерика указал тип User или null
  const [item, setItem] = useState<User | null>(null)
  // Создаем дополнительный стейт для вывода текста ошибки запроса.
  const [error, setError] = useState<string>("")

  // Используем хук useCallback, для предотствращения
  // создания новой функции receiveRandomUser при каждом рендере.
  const receiveRandomUser = useCallback(async () => {
    try {
      const id = Math.floor(Math.random() * (10 - 1)) + 1
      const _user = await $api<User>(`${URL}/${id}`)
      setItem(_user)
      setError("")
    } catch (err: any) {
      setError(err.message) // Задаем текст ошибки.
      setItem(null)
    }
  }, [])

  // Так же оборачиваем в функцию useCallback, во избежании
  // перерендера дочернего компонента Button. В качестве зависимостей,
  // передадим функцию receiveRandomUser.
  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      useThrottle(receiveRandomUser, 2000, [])
    },
    [receiveRandomUser],
  )

  return (
    <div>
      <header>Get a random user</header>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button onClick={handleButtonClick} />
      <MemoizedUserInfo user={item} />
    </div>
  )
}

export default App
