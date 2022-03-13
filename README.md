# GraphQL의 자료형

## 스칼라 타입

GraphQL의 내장 자료형

```gql
type ExampleType {
  id: ID!
  used_by: String!
  count: Int!
  use_rate: Float
  is_new: Boolean!
}
```

- ID: 기본적으로는 String, 고유 식별자의 역할임을 나타낸다.
- String: utf-8 문자열
- Int: 부호가 있는 32비트 정수
- Float: 부호가 있는 부동소수점 값
- Boolean: 참/거짓

> !: Non null
> null을 반환할 수 없음 (= 반드시 값이 있음)

## 열거 타입(Enum)

이미 지정된 값들 중에서 반환

## 리스트 타입

특정 타입의 배열을 반환

```gpl
type Equipment {
  ...
  users: [String!]
}
```

\* users = [String] | [String!] | [String]! | [String!]!

> (users 내 요소를 user라고 칭함)

- users = [String] <br/>
  users와 user 모두 null이 될 수 없다.
- users = [String!]<br/>
  users는 null이 될 수 있지만 user는 null이 될 수 없다.<br/>
  (users = [..., null] ❌)<br/>
- users = [String]!
  users는 null이 될 수없지만 user는 null이 될 수 있다.<br/>
- users = [String!]!
  users와 null 모두 null이 될 수 있다.<br/>

  +) 위 경우 모두 [](빈 배열) 가능!

- 객체 타입

사용자에 의해 정의된 타입들

- Union

여러 개의 타입을 한 배열에 반환하고자할 때 사용

주어진 데이터에 Equipment항목이 있으면 count, used_by 반환,

주어진 데이터에 Supply항목이 있으면 id 반환

```gql
query {
  givens {
    __typename
    ... on Equipment {
      count
      used_by
    }
    ... on Supply {
      id
    }
  }
}
```

- Interface

유사한 객체 타입을 만들기 위한 공통 필드 타입

- 인자와 인풋 타입

- 별칭으로 받아오기
